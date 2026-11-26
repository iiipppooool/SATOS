import "server-only";
import { prisma } from "./db";
import { parseStringList } from "./json-fields";
import { gradeTypedAnswer } from "./content/types";
import {
  clampToTestDate,
  computeMastery,
  deriveGrade,
  schedule,
  updateRecentAccuracy,
  updateRunningMean,
  INITIAL_STATE,
} from "./domain/scheduling";
import {
  selectQuestions,
  thetaToDifficulty,
  type CandidateQuestion,
  type SelectionOptions,
  type SelectionWeights,
} from "./domain/selection";
import { estimateTheta } from "./domain/scoring";
import { getWeaknesses } from "./queries";
import type { Section, SessionKind } from "./domain/enums";

export interface SessionConfig {
  questionIds: string[];
  kind: SessionKind;
  section?: Section | "both";
  skillIds?: string[];
  difficultyRange?: [number, number];
  /** Pattern trainer only: the student names the pattern before solving. */
  requirePatternGuess?: boolean;
}

/** Candidate pool for selection, scoped to the user's history. */
async function buildCandidatePool(
  userId: string,
  filter: { section?: Section | "both"; skillIds?: string[] },
): Promise<CandidateQuestion[]> {
  const questions = await prisma.question.findMany({
    where: {
      active: true,
      ...(filter.section && filter.section !== "both" ? { section: filter.section } : {}),
      ...(filter.skillIds?.length ? { skillId: { in: filter.skillIds } } : {}),
    },
    select: {
      id: true,
      skillId: true,
      section: true,
      difficulty: true,
      calibratedDifficulty: true,
    },
  });

  const questionIds = questions.map((q) => q.id);

  const [cards, lastAttempts] = await Promise.all([
    prisma.questionCard.findMany({
      where: { userId, questionId: { in: questionIds } },
      select: { questionId: true, dueAt: true, retired: true },
    }),
    prisma.attempt.findMany({
      where: { userId, questionId: { in: questionIds } },
      orderBy: { createdAt: "desc" },
      select: { questionId: true, createdAt: true, isCorrect: true },
    }),
  ]);

  const cardByQuestion = new Map(cards.map((c) => [c.questionId, c]));
  const seenCount = new Map<string, number>();
  const latest = new Map<string, { createdAt: Date; isCorrect: boolean }>();
  for (const attempt of lastAttempts) {
    seenCount.set(attempt.questionId, (seenCount.get(attempt.questionId) ?? 0) + 1);
    if (!latest.has(attempt.questionId)) {
      latest.set(attempt.questionId, {
        createdAt: attempt.createdAt,
        isCorrect: attempt.isCorrect,
      });
    }
  }

  return questions.map((question) => {
    const card = cardByQuestion.get(question.id);
    const last = latest.get(question.id);
    return {
      id: question.id,
      skillId: question.skillId,
      section: question.section as Section,
      difficulty: question.difficulty,
      calibratedDifficulty: question.calibratedDifficulty,
      timesSeen: seenCount.get(question.id) ?? 0,
      dueAt: card && !card.retired ? card.dueAt : null,
      lastAttemptedAt: last?.createdAt ?? null,
      lastAttemptCorrect: last?.isCorrect ?? null,
    } satisfies CandidateQuestion;
  });
}

async function buildSelectionWeights(
  userId: string,
  targetScore: number,
): Promise<SelectionWeights> {
  const [weaknesses, attempts] = await Promise.all([
    getWeaknesses(userId, targetScore),
    prisma.attempt.findMany({
      where: { userId, skipped: false },
      orderBy: { createdAt: "desc" },
      take: 160,
      select: {
        isCorrect: true,
        question: { select: { section: true, difficulty: true, calibratedDifficulty: true } },
      },
    }),
  ]);

  const skillPriority = new Map(weaknesses.map((w) => [w.skillId, w.priority]));

  const abilityBySection = new Map<Section, number>();
  for (const section of ["reading_writing", "math"] as Section[]) {
    const responses = attempts
      .filter((a) => a.question.section === section)
      .map((a) => ({
        difficulty: a.question.difficulty,
        calibratedDifficulty: a.question.calibratedDifficulty,
        correct: a.isCorrect,
      }));
    // With no history, start mid-scale rather than guessing high or low.
    const theta = responses.length >= 5 ? estimateTheta(responses).theta : 0;
    abilityBySection.set(section, thetaToDifficulty(theta));
  }

  return { skillPriority, abilityBySection };
}

export interface CreateSessionInput {
  userId: string;
  targetScore: number;
  kind: SessionKind;
  count: number;
  section?: Section | "both";
  skillIds?: string[];
  difficultyRange?: [number, number];
  reviewShare?: number;
  requirePatternGuess?: boolean;
  label?: string;
  assignmentId?: string;
}

export async function createPracticeSession(input: CreateSessionInput) {
  const pool = await buildCandidatePool(input.userId, {
    section: input.section,
    skillIds: input.skillIds,
  });

  if (pool.length === 0) {
    throw new Error(
      "No questions match those filters. Widen the section or skill selection, or import more material.",
    );
  }

  const weights = await buildSelectionWeights(input.userId, input.targetScore);

  const options: SelectionOptions = {
    count: input.count,
    section: input.section,
    skillIds: input.skillIds,
    difficultyRange: input.difficultyRange,
    // A pure review session is all due cards; otherwise use the supplied share.
    reviewShare: input.kind === "review" ? 1 : input.reviewShare,
  };

  let selected = selectQuestions(pool, weights, options);

  // A review session with nothing due should fall back to weak-skill practice
  // rather than presenting an empty session.
  if (selected.length === 0 && input.kind === "review") {
    selected = selectQuestions(pool, weights, { ...options, reviewShare: 0 });
  }

  if (selected.length === 0) {
    throw new Error(
      "Nothing to practise right now. Every matching question was answered too recently; try another skill or come back later.",
    );
  }

  const config: SessionConfig = {
    questionIds: selected.map((s) => s.question.id),
    kind: input.kind,
    section: input.section,
    skillIds: input.skillIds,
    difficultyRange: input.difficultyRange,
    requirePatternGuess: input.requirePatternGuess,
  };

  const session = await prisma.practiceSession.create({
    data: {
      userId: input.userId,
      kind: input.kind,
      label: input.label ?? null,
      config: JSON.stringify(config),
      questionCount: config.questionIds.length,
    },
  });

  if (input.assignmentId) {
    await prisma.assignment.update({
      where: { id: input.assignmentId },
      data: { sessionId: session.id },
    });
  }

  return session;
}

export function readSessionConfig(raw: string | null): SessionConfig | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object") return null;
    const object = parsed as Record<string, unknown>;
    const ids = Array.isArray(object.questionIds)
      ? object.questionIds.filter((id): id is string => typeof id === "string")
      : [];
    if (ids.length === 0) return null;
    return {
      questionIds: ids,
      kind: (typeof object.kind === "string" ? object.kind : "drill") as SessionKind,
      section: object.section as SessionConfig["section"],
      skillIds: Array.isArray(object.skillIds)
        ? object.skillIds.filter((id): id is string => typeof id === "string")
        : undefined,
      difficultyRange: Array.isArray(object.difficultyRange)
        ? (object.difficultyRange as [number, number])
        : undefined,
      requirePatternGuess: object.requirePatternGuess === true,
    };
  } catch {
    return null;
  }
}

export interface RecordAttemptInput {
  userId: string;
  sessionId: string | null;
  questionId: string;
  choiceId?: string | null;
  answerText?: string | null;
  recognitionMs?: number | null;
  solveMs?: number | null;
  totalMs: number;
  patternGuess?: string | null;
  confidence?: "guess" | "unsure" | "confident" | null;
  skipped?: boolean;
  testDate?: Date | null;
}

export interface AttemptOutcome {
  attemptId: string;
  isCorrect: boolean;
  correctChoiceId: string | null;
  correctLabel: string | null;
  patternGuessCorrect: boolean | null;
  grade: number;
  nextDueAt: Date;
}

/**
 * Grade one answer and update every derived record it touches: the attempt
 * itself, the per-question spaced repetition card, the skill mastery row, and
 * the error log when the answer was wrong.
 */
export async function recordAttempt(input: RecordAttemptInput): Promise<AttemptOutcome> {
  const question = await prisma.question.findUnique({
    where: { id: input.questionId },
    include: { choices: { orderBy: { order: "asc" } } },
  });
  if (!question) throw new Error("That question no longer exists.");

  const correctChoice = question.choices.find((c) => c.isCorrect) ?? null;

  let isCorrect = false;
  if (!input.skipped) {
    if (question.format === "spr") {
      const accepted = parseStringList(question.acceptedAnswers);
      isCorrect = gradeTypedAnswer(input.answerText ?? "", accepted);
    } else {
      isCorrect = Boolean(input.choiceId) && input.choiceId === correctChoice?.id;
    }
  }

  const patternGuessCorrect =
    input.patternGuess && question.patternName
      ? normalisePattern(input.patternGuess) === normalisePattern(question.patternName)
      : null;

  const grade = deriveGrade({
    correct: isCorrect,
    totalMs: input.totalMs,
    expectedSeconds: question.expectedSeconds,
    patternGuessCorrect,
    confidence: input.confidence ?? null,
  });

  const attempt = await prisma.attempt.create({
    data: {
      userId: input.userId,
      questionId: question.id,
      sessionId: input.sessionId,
      choiceId: input.choiceId ?? null,
      answerText: input.answerText ?? null,
      isCorrect,
      skipped: input.skipped ?? false,
      recognitionMs: input.recognitionMs ?? null,
      solveMs: input.solveMs ?? null,
      totalMs: input.totalMs,
      patternGuess: input.patternGuess ?? null,
      patternGuessCorrect,
      confidence: input.confidence ?? null,
    },
  });

  const nextDueAt = await updateSpacedRepetition({
    userId: input.userId,
    questionId: question.id,
    grade,
    testDate: input.testDate ?? null,
  });

  await updateSkillMastery({
    userId: input.userId,
    skillId: question.skillId,
    isCorrect,
    totalMs: input.totalMs,
    recognitionMs: input.recognitionMs ?? null,
    expectedSeconds: question.expectedSeconds,
    patternGuessCorrect,
  });

  if (input.sessionId) {
    await prisma.practiceSession.update({
      where: { id: input.sessionId },
      data: {
        correctCount: { increment: isCorrect ? 1 : 0 },
        totalTimeMs: { increment: input.totalMs },
      },
    });
  }

  // A wrong answer opens an error log entry, unclassified until the student
  // says why. Leaving it unclassified is itself useful signal.
  if (!isCorrect) {
    await prisma.errorLogEntry.create({
      data: {
        userId: input.userId,
        questionId: question.id,
        attemptId: attempt.id,
        category: input.skipped ? "ran_out_of_time" : "unknown",
      },
    });
  }

  return {
    attemptId: attempt.id,
    isCorrect,
    correctChoiceId: correctChoice?.id ?? null,
    correctLabel: correctChoice?.label ?? null,
    patternGuessCorrect,
    grade,
    nextDueAt,
  };
}

function normalisePattern(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

async function updateSpacedRepetition(args: {
  userId: string;
  questionId: string;
  grade: number;
  testDate: Date | null;
}): Promise<Date> {
  const existing = await prisma.questionCard.findUnique({
    where: { userId_questionId: { userId: args.userId, questionId: args.questionId } },
  });

  const state = existing
    ? {
        intervalDays: existing.intervalDays,
        easeFactor: existing.easeFactor,
        repetitions: existing.repetitions,
        lapses: existing.lapses,
      }
    : INITIAL_STATE;

  const result = clampToTestDate(schedule(state, args.grade), args.testDate);

  await prisma.questionCard.upsert({
    where: { userId_questionId: { userId: args.userId, questionId: args.questionId } },
    update: {
      intervalDays: result.intervalDays,
      easeFactor: result.easeFactor,
      repetitions: result.repetitions,
      lapses: result.lapses,
      dueAt: result.dueAt,
      lastGrade: Math.round(args.grade),
      // Retire a card once it is reliably known and the interval is long.
      retired: result.intervalDays >= 90 && result.lapses === 0,
    },
    create: {
      userId: args.userId,
      questionId: args.questionId,
      intervalDays: result.intervalDays,
      easeFactor: result.easeFactor,
      repetitions: result.repetitions,
      lapses: result.lapses,
      dueAt: result.dueAt,
      lastGrade: Math.round(args.grade),
    },
  });

  return result.dueAt;
}

async function updateSkillMastery(args: {
  userId: string;
  skillId: string;
  isCorrect: boolean;
  totalMs: number;
  recognitionMs: number | null;
  expectedSeconds: number;
  patternGuessCorrect: boolean | null;
}): Promise<void> {
  const existing = await prisma.skillMastery.findUnique({
    where: { userId_skillId: { userId: args.userId, skillId: args.skillId } },
  });

  const attempts = (existing?.attempts ?? 0) + 1;
  const correct = (existing?.correct ?? 0) + (args.isCorrect ? 1 : 0);

  const recentAccuracy = updateRecentAccuracy(
    existing?.recentAccuracy ?? 0,
    args.isCorrect,
    attempts,
  );

  const avgSolveMs = Math.round(
    updateRunningMean(existing?.avgSolveMs ?? 0, existing?.attempts ?? 0, args.totalMs),
  );

  const avgRecognitionMs =
    args.recognitionMs !== null
      ? Math.round(
          updateRunningMean(
            existing?.avgRecognitionMs ?? 0,
            existing?.attempts ?? 0,
            args.recognitionMs,
          ),
        )
      : (existing?.avgRecognitionMs ?? 0);

  const patternHitRate =
    args.patternGuessCorrect !== null
      ? updateRecentAccuracy(existing?.patternHitRate ?? 0, args.patternGuessCorrect, attempts)
      : (existing?.patternHitRate ?? 0);

  const mastery = computeMastery({
    recentAccuracy,
    attempts,
    avgSolveMs,
    expectedMs: args.expectedSeconds * 1000,
    patternHitRate,
  });

  await prisma.skillMastery.upsert({
    where: { userId_skillId: { userId: args.userId, skillId: args.skillId } },
    update: {
      attempts,
      correct,
      recentAccuracy,
      avgSolveMs,
      avgRecognitionMs,
      patternHitRate,
      mastery,
      lastSeenAt: new Date(),
    },
    create: {
      userId: args.userId,
      skillId: args.skillId,
      attempts,
      correct,
      recentAccuracy,
      avgSolveMs,
      avgRecognitionMs,
      patternHitRate,
      mastery,
      lastSeenAt: new Date(),
    },
  });
}

export async function finishSession(sessionId: string, userId: string) {
  const session = await prisma.practiceSession.findFirst({
    where: { id: sessionId, userId },
  });
  if (!session) throw new Error("Session not found.");
  if (session.finishedAt) return session;

  const updated = await prisma.practiceSession.update({
    where: { id: sessionId },
    data: { finishedAt: new Date() },
  });

  // Mark the linked assignment done, if this session came from the study plan.
  await prisma.assignment.updateMany({
    where: { sessionId },
    data: { status: "done", completedAt: new Date() },
  });

  await recordScoreSnapshot(userId);

  return updated;
}

/**
 * Record at most one practice-derived score snapshot a day.
 *
 * Without this the score trend would only ever have points from the exam
 * simulator, which most students run rarely. Capping at one a day keeps the
 * chart readable and stops a heavy practice day from dominating the line.
 */
export async function recordScoreSnapshot(userId: string): Promise<void> {
  const { getScoreEstimate } = await import("./queries");
  const estimate = await getScoreEstimate(userId);
  if (!estimate.reliable) return;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const existing = await prisma.scoreSnapshot.findFirst({
    where: { userId, source: "practice_estimate", takenAt: { gte: startOfToday } },
    select: { id: true },
  });

  const data = {
    rwScaled: estimate.readingWriting.scaled,
    mathScaled: estimate.math.scaled,
    total: estimate.total,
    lowerBound: estimate.lower,
    upperBound: estimate.upper,
    sampleSize: estimate.readingWriting.sampleSize + estimate.math.sampleSize,
  };

  if (existing) {
    // Overwrite today's point rather than stacking several onto one date.
    await prisma.scoreSnapshot.update({ where: { id: existing.id }, data });
    return;
  }

  await prisma.scoreSnapshot.create({
    data: { userId, source: "practice_estimate", ...data },
  });
}

/**
 * Recalibrate authored difficulty against observed performance.
 *
 * Author-assigned difficulty is a guess. Once an item has enough attempts
 * across the instance, the observed success rate is better evidence, so the
 * calibrated value replaces it for selection and scoring.
 */
export async function recalibrateQuestionDifficulty(questionId: string): Promise<void> {
  const attempts = await prisma.attempt.findMany({
    where: { questionId, skipped: false },
    select: { isCorrect: true },
  });

  const MIN_ATTEMPTS = 8;
  if (attempts.length < MIN_ATTEMPTS) return;

  const correctRate = attempts.filter((a) => a.isCorrect).length / attempts.length;
  // Map success rate onto the 1-5 scale: 95% correct is easy, 25% is hard.
  const calibrated = Math.min(5, Math.max(1, 1 + (0.95 - correctRate) * (4 / 0.7)));

  await prisma.question.update({
    where: { id: questionId },
    data: { calibratedDifficulty: Number(calibrated.toFixed(2)) },
  });
}
