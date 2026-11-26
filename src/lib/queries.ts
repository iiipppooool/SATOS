import "server-only";
import { prisma } from "./db";
import { DOMAINS, ALL_SKILLS } from "./domain/taxonomy";
import { computeQuestionShares, rankWeaknesses, type SkillStat } from "./domain/weakness";
import { estimateTotal, type ScoredResponse, type TotalEstimate } from "./domain/scoring";
import {
  analyseSectionPacing,
  analyseSkillPacing,
  pacingAdvice,
  type SectionPacing,
  type SkillPacing,
  type TimedAttempt,
} from "./domain/pacing";
import type { Section } from "./domain/enums";

const SHARES = computeQuestionShares(DOMAINS);
const SKILL_INDEX = new Map(ALL_SKILLS.map((s) => [s.id, s]));
const DOMAIN_INDEX = new Map(DOMAINS.map((d) => [d.id, d]));

/** How many recent attempts feed the score estimate. */
const ESTIMATE_WINDOW = 220;

export async function getScoreEstimate(userId: string): Promise<TotalEstimate> {
  const attempts = await prisma.attempt.findMany({
    where: { userId, skipped: false },
    orderBy: { createdAt: "desc" },
    take: ESTIMATE_WINDOW,
    select: {
      isCorrect: true,
      question: {
        select: { section: true, difficulty: true, calibratedDifficulty: true },
      },
    },
  });

  const bySection = (section: Section): ScoredResponse[] =>
    attempts
      .filter((a) => a.question.section === section)
      .map((a) => ({
        difficulty: a.question.difficulty,
        calibratedDifficulty: a.question.calibratedDifficulty,
        correct: a.isCorrect,
      }));

  return estimateTotal(bySection("reading_writing"), bySection("math"));
}

export async function getSkillStats(userId: string): Promise<SkillStat[]> {
  const [mastery, errorCounts, expectedTimes] = await Promise.all([
    prisma.skillMastery.findMany({ where: { userId } }),
    prisma.errorLogEntry.groupBy({
      by: ["questionId"],
      where: { userId, resolved: false },
      _count: { _all: true },
    }),
    // Mean authored time per skill, used as the speed benchmark.
    prisma.question.groupBy({
      by: ["skillId"],
      where: { active: true },
      _avg: { expectedSeconds: true },
    }),
  ]);

  // Map unresolved errors onto skills.
  const errorQuestionIds = errorCounts.map((row) => row.questionId);
  const errorQuestions = errorQuestionIds.length
    ? await prisma.question.findMany({
        where: { id: { in: errorQuestionIds } },
        select: { id: true, skillId: true },
      })
    : [];
  const questionToSkill = new Map(errorQuestions.map((q) => [q.id, q.skillId]));
  const openErrorsBySkill = new Map<string, number>();
  for (const row of errorCounts) {
    const skillId = questionToSkill.get(row.questionId);
    if (!skillId) continue;
    openErrorsBySkill.set(skillId, (openErrorsBySkill.get(skillId) ?? 0) + row._count._all);
  }

  const expectedBySkill = new Map(
    expectedTimes.map((row) => [row.skillId, (row._avg.expectedSeconds ?? 75) * 1000]),
  );
  const masteryBySkill = new Map(mastery.map((m) => [m.skillId, m]));

  return ALL_SKILLS.map((skill) => {
    const row = masteryBySkill.get(skill.id);
    const domain = DOMAIN_INDEX.get(skill.domainId);
    return {
      skillId: skill.id,
      skillName: skill.name,
      domainId: skill.domainId,
      domainName: domain?.name ?? skill.domainId,
      section: skill.section,
      questionShare: SHARES.get(skill.id) ?? 0,
      attempts: row?.attempts ?? 0,
      recentAccuracy: row?.recentAccuracy ?? 0,
      mastery: row?.mastery ?? 0,
      avgSolveMs: row?.avgSolveMs ?? 0,
      expectedMs: expectedBySkill.get(skill.id) ?? 75_000,
      patternHitRate: row?.patternHitRate ?? 0,
      openErrors: openErrorsBySkill.get(skill.id) ?? 0,
      lastSeenAt: row?.lastSeenAt ?? null,
    } satisfies SkillStat;
  });
}

export async function getWeaknesses(userId: string, targetScore: number) {
  const stats = await getSkillStats(userId);
  return rankWeaknesses(stats, targetScore);
}

export interface ActivitySummary {
  attemptsToday: number;
  minutesToday: number;
  attemptsThisWeek: number;
  minutesThisWeek: number;
  dueReviewCount: number;
  openErrorCount: number;
  totalAttempts: number;
  streakDays: number;
  lastSevenDays: Array<{ date: string; attempts: number; accuracy: number; minutes: number }>;
}

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export async function getActivitySummary(userId: string): Promise<ActivitySummary> {
  const now = new Date();
  const today = startOfDay(now);
  const weekStart = new Date(today.getTime() - 6 * 86_400_000);
  const historyStart = new Date(today.getTime() - 59 * 86_400_000);

  const [recent, dueReviewCount, openErrorCount, totalAttempts] = await Promise.all([
    prisma.attempt.findMany({
      where: { userId, createdAt: { gte: historyStart } },
      select: { createdAt: true, isCorrect: true, totalMs: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.questionCard.count({
      where: { userId, retired: false, dueAt: { lte: now } },
    }),
    prisma.errorLogEntry.count({ where: { userId, resolved: false } }),
    prisma.attempt.count({ where: { userId } }),
  ]);

  const dayKey = (date: Date) => startOfDay(date).toISOString().slice(0, 10);

  const byDay = new Map<string, { attempts: number; correct: number; ms: number }>();
  for (const attempt of recent) {
    const key = dayKey(attempt.createdAt);
    const bucket = byDay.get(key) ?? { attempts: 0, correct: 0, ms: 0 };
    bucket.attempts += 1;
    if (attempt.isCorrect) bucket.correct += 1;
    bucket.ms += attempt.totalMs;
    byDay.set(key, bucket);
  }

  const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart.getTime() + index * 86_400_000);
    const key = dayKey(date);
    const bucket = byDay.get(key);
    return {
      date: key,
      attempts: bucket?.attempts ?? 0,
      accuracy: bucket && bucket.attempts > 0 ? bucket.correct / bucket.attempts : 0,
      minutes: bucket ? Math.round(bucket.ms / 60_000) : 0,
    };
  });

  const todayBucket = byDay.get(dayKey(now));

  const weekAttempts = recent.filter((a) => a.createdAt >= weekStart);

  // Streak: consecutive days with at least one attempt, counting back from
  // today. A day with no practice ends the streak.
  let streakDays = 0;
  for (let offset = 0; offset < 60; offset += 1) {
    const key = dayKey(new Date(today.getTime() - offset * 86_400_000));
    const bucket = byDay.get(key);
    if (bucket && bucket.attempts > 0) streakDays += 1;
    else if (offset > 0) break;
    else continue; // today being empty does not break a run ending yesterday
  }

  return {
    attemptsToday: todayBucket?.attempts ?? 0,
    minutesToday: todayBucket ? Math.round(todayBucket.ms / 60_000) : 0,
    attemptsThisWeek: weekAttempts.length,
    minutesThisWeek: Math.round(weekAttempts.reduce((s, a) => s + a.totalMs, 0) / 60_000),
    dueReviewCount,
    openErrorCount,
    totalAttempts,
    streakDays,
    lastSevenDays,
  };
}

export interface SectionAccuracy {
  section: Section;
  attempts: number;
  correct: number;
  accuracy: number;
  avgSeconds: number;
}

export async function getSectionAccuracy(userId: string): Promise<SectionAccuracy[]> {
  const rows = await prisma.attempt.findMany({
    where: { userId },
    select: { isCorrect: true, totalMs: true, question: { select: { section: true } } },
  });

  return (["reading_writing", "math"] as Section[]).map((section) => {
    const forSection = rows.filter((r) => r.question.section === section);
    const correct = forSection.filter((r) => r.isCorrect).length;
    const totalMs = forSection.reduce((s, r) => s + r.totalMs, 0);
    return {
      section,
      attempts: forSection.length,
      correct,
      accuracy: forSection.length > 0 ? correct / forSection.length : 0,
      avgSeconds: forSection.length > 0 ? Math.round(totalMs / forSection.length / 1000) : 0,
    };
  });
}

export async function getActivePlan(userId: string) {
  return prisma.studyPlan.findFirst({
    where: { userId, active: true },
    orderBy: { createdAt: "desc" },
    include: {
      days: {
        orderBy: { date: "asc" },
        include: { assignments: { orderBy: { order: "asc" } } },
      },
    },
  });
}

export async function getTodayPlanDay(userId: string) {
  const plan = await prisma.studyPlan.findFirst({
    where: { userId, active: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, testDate: true, targetScore: true },
  });
  if (!plan) return null;

  const today = startOfDay(new Date());
  const tomorrow = new Date(today.getTime() + 86_400_000);

  const day = await prisma.planDay.findFirst({
    where: { planId: plan.id, date: { gte: today, lt: tomorrow } },
    include: { assignments: { orderBy: { order: "asc" } } },
  });

  return day ? { plan, day } : { plan, day: null };
}

export function skillName(skillId: string | null | undefined): string | null {
  if (!skillId) return null;
  return SKILL_INDEX.get(skillId)?.name ?? skillId;
}

export async function getQuestionCounts() {
  const [total, bySection, bySource] = await Promise.all([
    prisma.question.count({ where: { active: true } }),
    prisma.question.groupBy({
      by: ["section"],
      where: { active: true },
      _count: { _all: true },
    }),
    prisma.question.groupBy({
      by: ["source"],
      where: { active: true },
      _count: { _all: true },
    }),
  ]);
  return { total, bySection, bySource };
}

export function daysUntil(date: Date | null | undefined, now: Date = new Date()): number | null {
  if (!date) return null;
  const a = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const b = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.round((b - a) / 86_400_000);
}


export interface PacingReport {
  sections: Array<SectionPacing & { advice: string }>;
  skills: SkillPacing[];
  totalTimedAttempts: number;
}

/**
 * Pacing across recent work.
 *
 * Only non-skipped attempts count: a skipped question records no thinking
 * time, and including it would flatter the median.
 */
export async function getPacingReport(userId: string): Promise<PacingReport> {
  const rows = await prisma.attempt.findMany({
    where: { userId, skipped: false, totalMs: { gt: 0 } },
    orderBy: { createdAt: "desc" },
    take: 400,
    select: {
      totalMs: true,
      isCorrect: true,
      question: {
        select: {
          section: true,
          difficulty: true,
          expectedSeconds: true,
          skillId: true,
          skill: { select: { name: true } },
        },
      },
    },
  });

  const attempts: TimedAttempt[] = rows.map((row) => ({
    section: row.question.section as Section,
    skillId: row.question.skillId,
    skillName: row.question.skill.name,
    totalMs: row.totalMs,
    expectedSeconds: row.question.expectedSeconds,
    isCorrect: row.isCorrect,
    difficulty: row.question.difficulty,
  }));

  const skills = analyseSkillPacing(attempts, SHARES);

  const sections = (["reading_writing", "math"] as Section[]).map((section) => {
    const pacing = analyseSectionPacing(attempts, section);
    return { ...pacing, advice: pacingAdvice(pacing, skills) };
  });

  return { sections, skills, totalTimedAttempts: attempts.length };
}
