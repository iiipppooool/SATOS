"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AiProvider, Theme } from "@/lib/domain/enums";

const SettingsSchema = z.object({
  name: z.string().trim().max(80).optional(),
  theme: Theme,
  targetScore: z.coerce.number().int().min(400).max(1600),
  testDate: z.string().optional(),
  dailyMinutes: z.coerce.number().int().min(15).max(360),
  studyDaysPerWeek: z.coerce.number().int().min(1).max(7),
  timezone: z.string().trim().max(64),
  aiProvider: AiProvider,
  aiModel: z.string().trim().max(120).optional(),
  aiEnabled: z.boolean(),
  recognitionTimeoutSec: z.coerce.number().int().min(5).max(120),
});

export interface SettingsState {
  error?: string;
  saved?: boolean;
}

export async function saveSettingsAction(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const user = await requireUser();

  const parsed = SettingsSchema.safeParse({
    name: formData.get("name") || undefined,
    theme: formData.get("theme"),
    targetScore: formData.get("targetScore"),
    testDate: formData.get("testDate") || undefined,
    dailyMinutes: formData.get("dailyMinutes"),
    studyDaysPerWeek: formData.get("studyDaysPerWeek"),
    timezone: formData.get("timezone") || "Europe/London",
    aiProvider: formData.get("aiProvider"),
    aiModel: formData.get("aiModel") || undefined,
    aiEnabled: formData.get("aiEnabled") === "on",
    recognitionTimeoutSec: formData.get("recognitionTimeoutSec"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your settings." };
  }

  let testDate: Date | null = null;
  if (parsed.data.testDate) {
    const candidate = new Date(`${parsed.data.testDate}T00:00:00`);
    if (Number.isNaN(candidate.getTime())) return { error: "That test date could not be read." };
    testDate = candidate;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name ?? null },
  });

  const settings = {
    theme: parsed.data.theme,
    targetScore: parsed.data.targetScore,
    testDate,
    dailyMinutes: parsed.data.dailyMinutes,
    studyDaysPerWeek: parsed.data.studyDaysPerWeek,
    timezone: parsed.data.timezone,
    aiProvider: parsed.data.aiProvider,
    aiModel: parsed.data.aiModel ?? null,
    aiEnabled: parsed.data.aiEnabled,
    recognitionTimeoutSec: parsed.data.recognitionTimeoutSec,
  };

  await prisma.userSettings.upsert({
    where: { userId: user.id },
    update: settings,
    create: { userId: user.id, ...settings },
  });

  revalidatePath("/", "layout");
  return { saved: true };
}

/** Full data export. Everything the instance holds about this user. */
export async function exportDataAction(): Promise<string> {
  const user = await requireUser();

  const [profile, attempts, sessions, errors, plans, exams, cards, mastery, collections, threads] =
    await Promise.all([
      prisma.user.findUnique({
        where: { id: user.id },
        select: { email: true, name: true, createdAt: true, settings: true },
      }),
      prisma.attempt.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "asc" },
        include: { question: { select: { id: true, stem: true, skillId: true, section: true } } },
      }),
      prisma.practiceSession.findMany({ where: { userId: user.id }, orderBy: { startedAt: "asc" } }),
      prisma.errorLogEntry.findMany({ where: { userId: user.id }, orderBy: { createdAt: "asc" } }),
      prisma.studyPlan.findMany({
        where: { userId: user.id },
        include: { days: { include: { assignments: true } } },
      }),
      prisma.examAttempt.findMany({
        where: { userId: user.id },
        include: { modules: { include: { items: true } } },
      }),
      prisma.questionCard.findMany({ where: { userId: user.id } }),
      prisma.skillMastery.findMany({ where: { userId: user.id } }),
      prisma.questionCollection.findMany({
        where: { userId: user.id },
        include: { items: true },
      }),
      prisma.tutorThread.findMany({
        where: { userId: user.id },
        include: { messages: true },
      }),
    ]);

  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      format: "sat-os-export-v1",
      note: "Your complete data from this SAT OS instance. Passwords are not included.",
      profile: profile
        ? { email: profile.email, name: profile.name, createdAt: profile.createdAt, settings: profile.settings }
        : null,
      attempts,
      sessions,
      errors,
      plans,
      exams,
      spacedRepetitionCards: cards,
      skillMastery: mastery,
      collections,
      tutorThreads: threads,
    },
    null,
    2,
  );
}
