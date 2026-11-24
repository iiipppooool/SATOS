"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { finishExam, startExam, submitModule } from "@/lib/exam-service";
import { ExamShape } from "@/lib/domain/enums";

export interface ExamState {
  error?: string;
}

export async function startExamAction(
  _prev: ExamState,
  formData: FormData,
): Promise<ExamState> {
  const user = await requireUser();

  const shape = ExamShape.safeParse(formData.get("shape") ?? "full");
  if (!shape.success) return { error: "Choose a valid exam shape." };

  const open = await prisma.examAttempt.findFirst({
    where: { userId: user.id, finishedAt: null, abandoned: false },
    select: { id: true },
  });
  if (open) redirect(`/exam/${open.id}`);

  let examId: string;
  try {
    const result = await startExam(user.id, shape.data);
    examId = result.examId;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Could not build that exam.",
    };
  }

  redirect(`/exam/${examId}`);
}

const AnswerSchema = z.object({
  examId: z.string().min(1),
  itemId: z.string().min(1),
  choiceId: z.string().nullable().optional(),
  answerText: z.string().max(100).nullable().optional(),
  flagged: z.boolean().optional(),
  timeMs: z.coerce.number().int().min(0).max(3_600_000).optional(),
});

export async function saveExamAnswerAction(
  input: unknown,
): Promise<{ ok: boolean; error?: string }> {
  const user = await requireUser();
  const parsed = AnswerSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Could not save that answer." };

  const item = await prisma.examItem.findFirst({
    where: {
      id: parsed.data.itemId,
      module: { examAttemptId: parsed.data.examId, examAttempt: { userId: user.id } },
    },
    select: { id: true, module: { select: { finishedAt: true } } },
  });
  if (!item) return { ok: false, error: "Item not found." };
  if (item.module.finishedAt) return { ok: false, error: "That module is already submitted." };

  await prisma.examItem.update({
    where: { id: item.id },
    data: {
      ...(parsed.data.choiceId !== undefined ? { choiceId: parsed.data.choiceId } : {}),
      ...(parsed.data.answerText !== undefined ? { answerText: parsed.data.answerText } : {}),
      ...(parsed.data.flagged !== undefined ? { flagged: parsed.data.flagged } : {}),
      ...(parsed.data.timeMs !== undefined ? { timeMs: parsed.data.timeMs } : {}),
    },
  });

  return { ok: true };
}

export async function submitModuleAction(examId: string, moduleId: string): Promise<void> {
  const user = await requireUser();

  const exam = await prisma.examAttempt.findFirst({
    where: { id: examId, userId: user.id },
    select: { id: true },
  });
  if (!exam) throw new Error("Exam not found.");

  await submitModule(examId, moduleId);
  revalidatePath(`/exam/${examId}`);
}

export async function finishExamAction(examId: string): Promise<void> {
  const user = await requireUser();
  await finishExam(examId, user.id);
  redirect(`/exam/${examId}`);
}

export async function abandonExamAction(examId: string): Promise<void> {
  const user = await requireUser();
  await prisma.examAttempt.updateMany({
    where: { id: examId, userId: user.id, finishedAt: null },
    data: { abandoned: true, finishedAt: new Date() },
  });
  redirect("/exam");
}

export async function markModuleStartedAction(moduleId: string): Promise<void> {
  const user = await requireUser();
  await prisma.examModule.updateMany({
    where: { id: moduleId, startedAt: null, examAttempt: { userId: user.id } },
    data: { startedAt: new Date() },
  });
}
