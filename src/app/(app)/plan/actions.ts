"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generatePlan } from "@/lib/domain/plan";
import { getWeaknesses } from "@/lib/queries";
import { createPracticeSession } from "@/lib/practice";
import { redirect } from "next/navigation";
import type { SessionKind } from "@/lib/domain/enums";

const GenerateSchema = z.object({
  testDate: z.string().min(1, "Choose your test date."),
  daysPerWeek: z.coerce.number().int().min(1).max(7),
  minutesPerDay: z.coerce.number().int().min(20).max(360),
  targetScore: z.coerce.number().int().min(400).max(1600),
});

export interface PlanState {
  error?: string;
  ok?: boolean;
}

export async function generatePlanAction(
  _prev: PlanState,
  formData: FormData,
): Promise<PlanState> {
  const user = await requireUser();

  const parsed = GenerateSchema.safeParse({
    testDate: formData.get("testDate"),
    daysPerWeek: formData.get("daysPerWeek"),
    minutesPerDay: formData.get("minutesPerDay"),
    targetScore: formData.get("targetScore"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the plan settings." };
  }

  const testDate = new Date(`${parsed.data.testDate}T00:00:00`);
  if (Number.isNaN(testDate.getTime())) return { error: "That test date could not be read." };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (testDate.getTime() <= today.getTime()) {
    return { error: "Your test date needs to be in the future." };
  }

  const weaknesses = await getWeaknesses(user.id, parsed.data.targetScore);
  const prioritySkills = weaknesses
    .filter((w) => w.expectedGain > 0 || w.blindSpot)
    .slice(0, 10)
    .map((w) => ({ skillId: w.skillId, skillName: w.skillName, section: w.section }));

  const generated = generatePlan({
    startDate: today,
    testDate,
    daysPerWeek: parsed.data.daysPerWeek,
    minutesPerDay: parsed.data.minutesPerDay,
    targetScore: parsed.data.targetScore,
    prioritySkills,
  });

  // Replacing a plan deactivates the old one rather than deleting it, so past
  // completion history survives.
  await prisma.studyPlan.updateMany({
    where: { userId: user.id, active: true },
    data: { active: false },
  });

  const plan = await prisma.studyPlan.create({
    data: {
      userId: user.id,
      name: `Plan to ${testDate.toLocaleDateString("en-GB", { day: "numeric", month: "long" })}`,
      startDate: today,
      testDate,
      daysPerWeek: parsed.data.daysPerWeek,
      minutesPerDay: parsed.data.minutesPerDay,
      targetScore: parsed.data.targetScore,
      active: true,
    },
  });

  for (const day of generated.days) {
    await prisma.planDay.create({
      data: {
        planId: plan.id,
        date: day.date,
        weekIndex: day.weekIndex,
        dayIndex: day.dayIndex,
        focus: day.focus,
        theme: day.theme,
        targetMinutes: day.targetMinutes,
        assignments: {
          create: day.assignments.map((assignment) => ({
            kind: assignment.kind,
            title: assignment.title,
            skillId: assignment.skillId,
            questionCount: assignment.questionCount,
            targetMinutes: assignment.targetMinutes,
            order: assignment.order,
          })),
        },
      },
    });
  }

  // Keep the profile in step with the plan the student just committed to.
  await prisma.userSettings.upsert({
    where: { userId: user.id },
    update: {
      testDate,
      targetScore: parsed.data.targetScore,
      dailyMinutes: parsed.data.minutesPerDay,
      studyDaysPerWeek: parsed.data.daysPerWeek,
    },
    create: {
      userId: user.id,
      testDate,
      targetScore: parsed.data.targetScore,
      dailyMinutes: parsed.data.minutesPerDay,
      studyDaysPerWeek: parsed.data.daysPerWeek,
    },
  });

  revalidatePath("/plan");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function startAssignmentAction(assignmentId: string): Promise<void> {
  const user = await requireUser();

  const assignment = await prisma.assignment.findFirst({
    where: { id: assignmentId, planDay: { plan: { userId: user.id } } },
    select: { id: true, kind: true, questionCount: true, skillId: true, title: true, sessionId: true },
  });
  if (!assignment) throw new Error("Assignment not found.");

  if (assignment.sessionId) redirect(`/practice/${assignment.sessionId}`);

  if (assignment.kind === "full_exam" || assignment.kind === "module_exam") {
    redirect("/exam");
  }

  const kindMap: Record<string, SessionKind> = {
    drill: "drill",
    pattern_trainer: "pattern_trainer",
    review: "review",
    weakness: "weakness",
  };

  const session = await createPracticeSession({
    userId: user.id,
    targetScore: user.settings.targetScore,
    kind: kindMap[assignment.kind] ?? "drill",
    count: assignment.questionCount,
    skillIds: assignment.skillId ? [assignment.skillId] : undefined,
    requirePatternGuess: assignment.kind === "pattern_trainer",
    label: assignment.title,
    assignmentId: assignment.id,
  });

  redirect(`/practice/${session.id}`);
}

export async function togglePlanDayAction(dayId: string): Promise<void> {
  const user = await requireUser();
  const day = await prisma.planDay.findFirst({
    where: { id: dayId, plan: { userId: user.id } },
    select: { id: true, status: true },
  });
  if (!day) return;

  const done = day.status === "done";
  await prisma.planDay.update({
    where: { id: day.id },
    data: { status: done ? "pending" : "done", completedAt: done ? null : new Date() },
  });
  revalidatePath("/plan");
}
