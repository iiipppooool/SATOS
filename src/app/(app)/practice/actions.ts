"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  createPracticeSession,
  finishSession,
  recalibrateQuestionDifficulty,
  recordAttempt,
} from "@/lib/practice";
import { getQuestionReveal, type QuestionReveal } from "@/lib/question-view";
import { Confidence, ErrorCategory, Section, SessionKind } from "@/lib/domain/enums";

const StartSchema = z.object({
  kind: SessionKind.default("drill"),
  count: z.coerce.number().int().min(1).max(50).default(12),
  section: z.union([Section, z.literal("both")]).default("both"),
  skillIds: z.array(z.string()).default([]),
  minDifficulty: z.coerce.number().int().min(1).max(5).default(1),
  maxDifficulty: z.coerce.number().int().min(1).max(5).default(5),
  requirePatternGuess: z.coerce.boolean().default(false),
});

export interface StartState {
  error?: string;
}

export async function startSessionAction(
  _prev: StartState,
  formData: FormData,
): Promise<StartState> {
  const user = await requireUser();

  const parsed = StartSchema.safeParse({
    kind: formData.get("kind") ?? undefined,
    count: formData.get("count") ?? undefined,
    section: formData.get("section") ?? undefined,
    skillIds: formData.getAll("skillIds").filter((v): v is string => typeof v === "string"),
    minDifficulty: formData.get("minDifficulty") ?? undefined,
    maxDifficulty: formData.get("maxDifficulty") ?? undefined,
    requirePatternGuess: formData.get("requirePatternGuess") === "on" ? true : undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the session settings." };
  }

  const { minDifficulty, maxDifficulty } = parsed.data;
  if (minDifficulty > maxDifficulty) {
    return { error: "The minimum difficulty cannot be above the maximum." };
  }

  let sessionId: string;
  try {
    const session = await createPracticeSession({
      userId: user.id,
      targetScore: user.settings.targetScore,
      kind: parsed.data.kind,
      count: parsed.data.count,
      section: parsed.data.section,
      skillIds: parsed.data.skillIds.length > 0 ? parsed.data.skillIds : undefined,
      difficultyRange: [minDifficulty, maxDifficulty],
      requirePatternGuess: parsed.data.requirePatternGuess,
    });
    sessionId = session.id;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Could not build that session.",
    };
  }

  redirect(`/practice/${sessionId}`);
}

const AnswerSchema = z.object({
  sessionId: z.string().min(1),
  questionId: z.string().min(1),
  choiceId: z.string().optional().nullable(),
  answerText: z.string().optional().nullable(),
  totalMs: z.coerce.number().int().min(0).max(3_600_000),
  recognitionMs: z.coerce.number().int().min(0).max(3_600_000).optional().nullable(),
  patternGuess: z.string().optional().nullable(),
  confidence: Confidence.optional().nullable(),
  skipped: z.boolean().default(false),
});

export interface AnswerResult {
  ok: boolean;
  error?: string;
  isCorrect?: boolean;
  correctChoiceId?: string | null;
  patternGuessCorrect?: boolean | null;
  reveal?: QuestionReveal;
  attemptId?: string;
  nextDueInDays?: number;
}

export async function submitAnswerAction(input: unknown): Promise<AnswerResult> {
  const user = await requireUser();

  const parsed = AnswerSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "That answer could not be read. Try again." };
  }

  const data = parsed.data;

  const session = await prisma.practiceSession.findFirst({
    where: { id: data.sessionId, userId: user.id },
    select: { id: true, finishedAt: true },
  });
  if (!session) return { ok: false, error: "Session not found." };
  if (session.finishedAt) return { ok: false, error: "That session is already finished." };

  // Guard against a double submit for the same question in one session.
  const already = await prisma.attempt.findFirst({
    where: { sessionId: session.id, questionId: data.questionId },
    select: { id: true },
  });
  if (already) {
    const reveal = await getQuestionReveal(data.questionId);
    return {
      ok: true,
      isCorrect: undefined,
      reveal: reveal ?? undefined,
      error: "That question was already answered in this session.",
    };
  }

  const outcome = await recordAttempt({
    userId: user.id,
    sessionId: session.id,
    questionId: data.questionId,
    choiceId: data.choiceId ?? null,
    answerText: data.answerText ?? null,
    totalMs: data.totalMs,
    recognitionMs: data.recognitionMs ?? null,
    solveMs:
      data.recognitionMs != null ? Math.max(0, data.totalMs - data.recognitionMs) : data.totalMs,
    patternGuess: data.patternGuess ?? null,
    confidence: data.confidence ?? null,
    skipped: data.skipped,
    testDate: user.settings.testDate,
  });

  // Fire and forget would lose errors, so this is awaited; it is a cheap query.
  await recalibrateQuestionDifficulty(data.questionId);

  const reveal = await getQuestionReveal(data.questionId);

  /*
   * Deliberately no revalidatePath here. Revalidating would re-render the
   * session page immediately, which swaps in the *next* question and wipes the
   * explanation the student is meant to read. The client advances explicitly
   * via router.refresh() when Next is pressed.
   */

  return {
    ok: true,
    isCorrect: outcome.isCorrect,
    correctChoiceId: outcome.correctChoiceId,
    patternGuessCorrect: outcome.patternGuessCorrect,
    attemptId: outcome.attemptId,
    reveal: reveal ?? undefined,
    nextDueInDays: Math.max(
      0,
      Math.round((outcome.nextDueAt.getTime() - Date.now()) / 86_400_000),
    ),
  };
}

export async function finishSessionAction(sessionId: string): Promise<void> {
  const user = await requireUser();
  await finishSession(sessionId, user.id);
  redirect(`/practice/${sessionId}/summary`);
}

const ClassifySchema = z.object({
  attemptId: z.string().min(1),
  category: ErrorCategory,
  note: z.string().max(1000).optional(),
});

export async function classifyErrorAction(input: unknown): Promise<{ ok: boolean; error?: string }> {
  const user = await requireUser();
  const parsed = ClassifySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Could not record that classification." };

  const entry = await prisma.errorLogEntry.findFirst({
    where: { attemptId: parsed.data.attemptId, userId: user.id },
    select: { id: true },
  });
  if (!entry) return { ok: false, error: "No error log entry for that attempt." };

  await prisma.errorLogEntry.update({
    where: { id: entry.id },
    data: { category: parsed.data.category, note: parsed.data.note ?? null },
  });

  return { ok: true };
}

export async function toggleStarAction(questionId: string): Promise<{ starred: boolean }> {
  const user = await requireUser();

  const collection = await prisma.questionCollection.upsert({
    where: { userId_name: { userId: user.id, name: "Starred" } },
    update: {},
    create: {
      userId: user.id,
      name: "Starred",
      description: "Questions you marked to revisit.",
      system: true,
    },
  });

  const existing = await prisma.collectionItem.findUnique({
    where: {
      collectionId_questionId: { collectionId: collection.id, questionId },
    },
  });

  if (existing) {
    await prisma.collectionItem.delete({ where: { id: existing.id } });
    return { starred: false };
  }

  await prisma.collectionItem.create({
    data: { collectionId: collection.id, questionId },
  });
  return { starred: true };
}
