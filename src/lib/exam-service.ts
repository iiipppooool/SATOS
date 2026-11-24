import "server-only";
import { prisma } from "./db";
import {
  DEFAULT_ROUTING_THRESHOLD,
  planFirstModules,
  planSecondModule,
  routeSecondModule,
  scoreExam,
  slotsForShape,
  type ExamPlanModule,
  type ModuleResult,
} from "./domain/exam";
import { MATH_SPR_SHARE } from "./domain/taxonomy";
import { recordAttempt } from "./practice";
import type { ExamShape, ModuleTier, Section } from "./domain/enums";

/**
 * Assembling a module from the bank.
 *
 * The blueprint asks for a specific difficulty mix. Our bank will not always
 * have enough questions at every level, so the filler logic walks outwards
 * from the wanted difficulty rather than failing: a 27-question module is
 * still a useful rehearsal even if its mix is imperfect, and the UI says so
 * when the bank was too thin to match the blueprint.
 */
async function pickQuestionsForModule(
  plan: ExamPlanModule,
  excludeIds: Set<string>,
): Promise<{ ids: string[]; shortfall: number }> {
  const pool = await prisma.question.findMany({
    where: { active: true, section: plan.section },
    select: { id: true, difficulty: true, format: true },
  });

  const available = pool.filter((q) => !excludeIds.has(q.id));
  const byDifficulty = new Map<number, string[]>();
  for (const question of available) {
    const list = byDifficulty.get(question.difficulty) ?? [];
    list.push(question.id);
    byDifficulty.set(question.difficulty, list);
  }
  for (const list of byDifficulty.values()) shuffle(list);

  const chosen: string[] = [];
  const take = (band: number): string | null => {
    const list = byDifficulty.get(band);
    if (!list || list.length === 0) return null;
    return list.pop() ?? null;
  };

  for (const [bandText, wanted] of Object.entries(plan.difficultyMix)) {
    const band = Number(bandText);
    for (let i = 0; i < wanted; i += 1) {
      let id = take(band);
      // Walk outwards to the nearest band that still has questions.
      for (let distance = 1; !id && distance <= 4; distance += 1) {
        id = take(band - distance) ?? take(band + distance);
      }
      if (id) chosen.push(id);
    }
  }

  return { ids: chosen, shortfall: Math.max(0, plan.questionCount - chosen.length) };
}

function shuffle<T>(items: T[]): void {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j]!, items[i]!];
  }
}

export interface StartExamResult {
  examId: string;
  shortfalls: Array<{ slot: string; missing: number }>;
}

export async function startExam(
  userId: string,
  shape: ExamShape,
  label?: string,
): Promise<StartExamResult> {
  const session = await prisma.practiceSession.create({
    data: {
      userId,
      kind: "exam",
      label: label ?? "Practice exam",
      config: JSON.stringify({ shape }),
    },
  });

  const exam = await prisma.examAttempt.create({
    data: {
      userId,
      sessionId: session.id,
      label: label ?? "Practice exam",
      shape,
    },
  });

  // Only the first module of each section is built now. The second depends on
  // how the first goes, which is the whole point of a multistage test.
  const firstModules = planFirstModules(shape);
  const used = new Set<string>();
  const shortfalls: Array<{ slot: string; missing: number }> = [];

  for (const plan of firstModules) {
    const { ids, shortfall } = await pickQuestionsForModule(plan, used);
    ids.forEach((id) => used.add(id));
    if (shortfall > 0) shortfalls.push({ slot: plan.slot, missing: shortfall });

    await prisma.examModule.create({
      data: {
        examAttemptId: exam.id,
        slot: plan.slot,
        section: plan.section,
        tier: plan.tier,
        order: plan.order,
        durationSec: plan.durationSec,
        items: {
          create: ids.map((questionId, order) => ({ questionId, order })),
        },
      },
    });
  }

  return { examId: exam.id, shortfalls };
}

/**
 * Build the second module of a section once the first has been submitted.
 * Returns null when it already exists, so this is safe to call twice.
 */
export async function buildSecondModule(
  examId: string,
  firstSlot: "rw1" | "math1",
  threshold = DEFAULT_ROUTING_THRESHOLD,
): Promise<ModuleTier | null> {
  const first = await prisma.examModule.findFirst({
    where: { examAttemptId: examId, slot: firstSlot },
    include: { items: true },
  });
  if (!first) return null;

  const secondSlot = firstSlot === "rw1" ? "rw2" : "math2";
  const existing = await prisma.examModule.findFirst({
    where: { examAttemptId: examId, slot: secondSlot },
    select: { id: true, tier: true },
  });
  if (existing) return existing.tier as ModuleTier;

  const correct = first.items.filter((item) => item.isCorrect === true).length;
  const tier = routeSecondModule(correct, first.items.length, threshold);

  const plan = planSecondModule(firstSlot, tier);
  if (!plan) return null;

  const usedRows = await prisma.examItem.findMany({
    where: { module: { examAttemptId: examId } },
    select: { questionId: true },
  });
  const used = new Set(usedRows.map((row) => row.questionId));

  const { ids } = await pickQuestionsForModule(plan, used);

  await prisma.examModule.create({
    data: {
      examAttemptId: examId,
      slot: plan.slot,
      section: plan.section,
      tier: plan.tier,
      order: plan.order,
      durationSec: plan.durationSec,
      items: { create: ids.map((questionId, order) => ({ questionId, order })) },
    },
  });

  return tier;
}

/** Grade one module, then build the next one if this was a routing module. */
export async function submitModule(examId: string, moduleId: string): Promise<void> {
  const target = await prisma.examModule.findFirst({
    where: { id: moduleId, examAttemptId: examId },
    include: { items: { include: { question: { include: { choices: true } } } } },
  });
  if (!target || target.finishedAt) return;

  let rawCorrect = 0;
  for (const item of target.items) {
    let isCorrect = false;
    if (item.choiceId) {
      isCorrect = item.question.choices.some((c) => c.id === item.choiceId && c.isCorrect);
    } else if (item.answerText) {
      const { gradeTypedAnswer } = await import("./content/types");
      const { parseStringList } = await import("./json-fields");
      isCorrect = gradeTypedAnswer(
        item.answerText,
        parseStringList(item.question.acceptedAnswers),
      );
    }
    if (isCorrect) rawCorrect += 1;
    await prisma.examItem.update({ where: { id: item.id }, data: { isCorrect } });
  }

  await prisma.examModule.update({
    where: { id: target.id },
    data: { finishedAt: new Date(), rawCorrect },
  });

  if (target.slot === "rw1" || target.slot === "math1") {
    await buildSecondModule(examId, target.slot);
  }
}

/**
 * Finish the exam: score it, then replay every item as a normal Attempt so
 * that exam work feeds the weakness detector and spaced repetition exactly
 * like practice does. Without this, a full mock would teach the system
 * nothing, which is the most common gap in prep tools.
 */
export async function finishExam(examId: string, userId: string) {
  const exam = await prisma.examAttempt.findFirst({
    where: { id: examId, userId },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: { items: { include: { question: true } } },
      },
    },
  });
  if (!exam) throw new Error("Exam not found.");
  if (exam.finishedAt) return exam;

  const settings = await prisma.userSettings.findUnique({ where: { userId } });

  const results: ModuleResult[] = exam.modules.map((row) => ({
    slot: row.slot as ModuleResult["slot"],
    section: row.section as Section,
    tier: row.tier as ModuleTier,
    rawCorrect: row.rawCorrect,
    questionCount: row.items.length,
  }));

  const score = scoreExam(results);

  for (const row of exam.modules) {
    for (const item of row.items) {
      // Unanswered items still count: leaving a question blank under time
      // pressure is data about pacing, not an absence of data.
      await recordAttempt({
        userId,
        sessionId: exam.sessionId,
        questionId: item.questionId,
        choiceId: item.choiceId,
        answerText: item.answerText,
        totalMs: item.timeMs,
        skipped: !item.choiceId && !item.answerText,
        testDate: settings?.testDate ?? null,
      });
    }
  }

  const updated = await prisma.examAttempt.update({
    where: { id: exam.id },
    data: {
      finishedAt: new Date(),
      rwRaw: score.rwRaw,
      mathRaw: score.mathRaw,
      rwScaled: score.rwScaled,
      mathScaled: score.mathScaled,
      total: score.total,
    },
  });

  if (exam.sessionId) {
    const answered = exam.modules.reduce((sum, m) => sum + m.items.length, 0);
    const correct = exam.modules.reduce((sum, m) => sum + m.rawCorrect, 0);
    await prisma.practiceSession.update({
      where: { id: exam.sessionId },
      data: {
        finishedAt: new Date(),
        questionCount: answered,
        correctCount: correct,
      },
    });
  }

  // Record a score snapshot so the analytics trend has a real data point.
  if (score.total !== null && score.rwScaled !== null && score.mathScaled !== null) {
    await prisma.scoreSnapshot.create({
      data: {
        userId,
        source: "exam_simulator",
        rwScaled: score.rwScaled,
        mathScaled: score.mathScaled,
        total: score.total,
        // The simulator does not equate, so the band is deliberately wide.
        lowerBound: Math.max(400, score.total - 60),
        upperBound: Math.min(1600, score.total + 60),
        sampleSize: exam.modules.reduce((sum, m) => sum + m.items.length, 0),
      },
    });
  }

  return updated;
}

export function sprShareNote(): string {
  return `About ${Math.round(MATH_SPR_SHARE * 100)}% of Maths questions on the real test are type-in rather than multiple choice.`;
}

export function moduleLabel(slot: string): string {
  switch (slot) {
    case "rw1":
      return "Reading and Writing, Module 1";
    case "rw2":
      return "Reading and Writing, Module 2";
    case "math1":
      return "Maths, Module 1";
    case "math2":
      return "Maths, Module 2";
    default:
      return slot;
  }
}

export { slotsForShape };
