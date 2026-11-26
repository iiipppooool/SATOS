"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { complete, AiNotConfiguredError, AiRequestError } from "@/lib/ai";
import {
  TUTOR_SYSTEM_PROMPT,
  buildTutorPrompt,
  summariseMistakes,
  type TutorContext,
} from "@/lib/ai/prompts";
import { getQuestionReveal, getQuestionView } from "@/lib/question-view";
import { TutorIntent, type AiProvider } from "@/lib/domain/enums";
import { ERROR_CATEGORY_LABEL, type ErrorCategory } from "@/lib/domain/enums";

const AskSchema = z.object({
  threadId: z.string().optional().nullable(),
  questionId: z.string().optional().nullable(),
  intent: TutorIntent.default("free"),
  message: z.string().max(4000).default(""),
});

export interface TutorResponse {
  ok: boolean;
  error?: string;
  threadId?: string;
  reply?: string;
  model?: string;
  provider?: string;
}

export async function askTutorAction(input: unknown): Promise<TutorResponse> {
  const user = await requireUser();

  if (!user.settings.aiEnabled) {
    return {
      ok: false,
      error: "The AI tutor is switched off for this account. Turn it on in Settings.",
    };
  }

  const parsed = AskSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Could not read that request." };

  const { intent, message } = parsed.data;
  if (intent === "free" && message.trim().length === 0) {
    return { ok: false, error: "Type a question first." };
  }

  const provider = user.settings.aiProvider as AiProvider;

  // Gather context before spending a request.
  const context: TutorContext = {};
  if (parsed.data.questionId) {
    const [question, reveal] = await Promise.all([
      getQuestionView(parsed.data.questionId),
      getQuestionReveal(parsed.data.questionId),
    ]);
    context.question = question;
    context.reveal = reveal;

    const lastAttempt = await prisma.attempt.findFirst({
      where: { userId: user.id, questionId: parsed.data.questionId },
      orderBy: { createdAt: "desc" },
      include: { choice: { select: { label: true, text: true } } },
    });
    if (lastAttempt) {
      context.studentAnswer =
        lastAttempt.choice?.label
          ? `${lastAttempt.choice.label}. ${lastAttempt.choice.text}`
          : lastAttempt.answerText;
      context.studentWasCorrect = lastAttempt.isCorrect;
    }
  }

  if (intent === "mistake_review") {
    const entries = await prisma.errorLogEntry.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 80,
      include: { question: { select: { skill: { select: { name: true } } } } },
    });
    const tally = new Map<string, { category: string; skillName: string; count: number }>();
    for (const entry of entries) {
      const key = `${entry.category}|${entry.question.skill.name}`;
      const row = tally.get(key) ?? {
        category: ERROR_CATEGORY_LABEL[entry.category as ErrorCategory] ?? entry.category,
        skillName: entry.question.skill.name,
        count: 0,
      };
      row.count += 1;
      tally.set(key, row);
    }
    context.mistakeSummary = summariseMistakes(
      [...tally.values()].sort((a, b) => b.count - a.count).slice(0, 12),
    );
  }

  // Create or continue a thread.
  let threadId = parsed.data.threadId ?? null;
  if (threadId) {
    const existing = await prisma.tutorThread.findFirst({
      where: { id: threadId, userId: user.id },
      select: { id: true },
    });
    if (!existing) threadId = null;
  }

  if (!threadId) {
    const thread = await prisma.tutorThread.create({
      data: {
        userId: user.id,
        questionId: parsed.data.questionId ?? null,
        intent,
        provider,
        model: user.settings.aiModel,
        title: buildTitle(intent, message, context.question?.skillName ?? null),
      },
    });
    threadId = thread.id;
  }

  const history = await prisma.tutorMessage.findMany({
    where: { threadId },
    orderBy: { createdAt: "asc" },
    take: 20,
    select: { role: true, content: true },
  });

  const prompt = buildTutorPrompt(intent, message, context);

  await prisma.tutorMessage.create({
    data: { threadId, role: "user", content: message.trim() || prompt.slice(0, 500) },
  });

  try {
    const result = await complete(
      provider,
      {
        messages: [
          { role: "system", content: TUTOR_SYSTEM_PROMPT },
          ...history.map((m) => ({
            role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
            content: m.content,
          })),
          { role: "user", content: prompt },
        ],
        maxTokens: 1600,
        temperature: 0.3,
      },
      user.settings.aiModel,
    );

    await prisma.tutorMessage.create({
      data: {
        threadId,
        role: "assistant",
        content: result.text,
        tokensIn: result.tokensIn ?? null,
        tokensOut: result.tokensOut ?? null,
      },
    });

    await prisma.tutorThread.update({
      where: { id: threadId },
      data: { updatedAt: new Date(), model: result.model, provider: result.provider },
    });

    revalidatePath("/tutor");

    return {
      ok: true,
      threadId,
      reply: result.text,
      model: result.model,
      provider: result.provider,
    };
  } catch (error) {
    // Remove the orphaned user turn so a retry does not duplicate it.
    await prisma.tutorMessage.deleteMany({
      where: { threadId, role: "user", content: message.trim() || prompt.slice(0, 500) },
    });

    if (error instanceof AiNotConfiguredError) {
      return { ok: false, threadId, error: error.message };
    }
    if (error instanceof AiRequestError) {
      return {
        ok: false,
        threadId,
        error: `The ${provider} API rejected that request. ${error.message}`,
      };
    }
    return {
      ok: false,
      threadId,
      error:
        error instanceof Error
          ? `Could not reach the AI provider: ${error.message}`
          : "Could not reach the AI provider.",
    };
  }
}

function buildTitle(intent: string, message: string, skillName: string | null): string {
  if (message.trim()) return message.trim().slice(0, 70);
  if (skillName) return `${intent.replace(/_/g, " ")}: ${skillName}`;
  return intent.replace(/_/g, " ");
}

export async function deleteThreadAction(threadId: string): Promise<void> {
  const user = await requireUser();
  await prisma.tutorThread.deleteMany({ where: { id: threadId, userId: user.id } });
  revalidatePath("/tutor");
}
