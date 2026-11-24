/**
 * Spaced repetition.
 *
 * A modified SM-2. The classic algorithm grades recall 0-5 from a self-report;
 * here the grade is derived from objective signals we already capture, which
 * removes the main weakness of self-graded review (students are generous).
 *
 * Signals, in order of weight:
 *   - correctness
 *   - whether the pattern was recognised before solving
 *   - time taken against the item's expected time
 *   - stated confidence
 *
 * A correct answer that took three times as long as it should is not mastery,
 * and this grading says so.
 */

export interface GradeInput {
  correct: boolean;
  totalMs: number;
  expectedSeconds: number;
  patternGuessCorrect?: boolean | null;
  confidence?: "guess" | "unsure" | "confident" | null;
}

/** SM-2 grade, 0-5. Below 3 counts as a lapse and resets the interval. */
export function deriveGrade(input: GradeInput): number {
  const { correct, totalMs, expectedSeconds, patternGuessCorrect, confidence } = input;

  if (!correct) {
    // A wrong answer is a lapse. How bad depends on whether it was a guess.
    if (confidence === "confident") return 0; // confidently wrong is the worst case
    if (confidence === "guess") return 1;
    return 2;
  }

  const expectedMs = Math.max(1, expectedSeconds * 1000);
  const ratio = totalMs / expectedMs;

  let grade: number;
  if (ratio <= 0.75) grade = 5;
  else if (ratio <= 1.15) grade = 4.5;
  else if (ratio <= 1.75) grade = 4;
  else if (ratio <= 2.5) grade = 3.5;
  else grade = 3;

  // Recognising the pattern first is the thing we are actually training.
  if (patternGuessCorrect === true) grade += 0.5;
  else if (patternGuessCorrect === false) grade -= 1;

  if (confidence === "guess") grade -= 1.5;
  else if (confidence === "unsure") grade -= 0.5;

  return Math.min(5, Math.max(0, grade));
}

export interface SchedulerState {
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  lapses: number;
}

export interface SchedulerResult extends SchedulerState {
  dueAt: Date;
  grade: number;
  lapsed: boolean;
}

export const INITIAL_STATE: SchedulerState = {
  intervalDays: 0,
  easeFactor: 2.5,
  repetitions: 0,
  lapses: 0,
};

const MIN_EASE = 1.3;
const MAX_EASE = 2.8;
/** Cap intervals so nothing disappears past a test date months away. */
const MAX_INTERVAL_DAYS = 120;

export function schedule(
  state: SchedulerState,
  grade: number,
  now: Date = new Date(),
): SchedulerResult {
  const lapsed = grade < 3;

  let { intervalDays, easeFactor, repetitions, lapses } = state;

  // SM-2 ease update, using the standard polynomial.
  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  easeFactor = Math.min(MAX_EASE, Math.max(MIN_EASE, easeFactor));

  if (lapsed) {
    repetitions = 0;
    lapses += 1;
    // Same-day re-exposure for a lapse, rather than SM-2's next-day default:
    // with a test close, a missed item needs to come back fast.
    intervalDays = 0.25;
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 3;
    else intervalDays = Math.min(MAX_INTERVAL_DAYS, intervalDays * easeFactor);
  }

  const dueAt = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  return { intervalDays, easeFactor, repetitions, lapses, dueAt, grade, lapsed };
}

/**
 * Compress a schedule so nothing falls due after the test. There is no point
 * in a 60-day interval when the exam is in three weeks.
 */
export function clampToTestDate(
  result: SchedulerResult,
  testDate: Date | null,
  now: Date = new Date(),
): SchedulerResult {
  if (!testDate) return result;
  const daysLeft = (testDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000);
  if (daysLeft <= 0) return result;

  // Keep every card in rotation at least twice more before the test.
  const maxInterval = Math.max(0.25, daysLeft / 2);
  if (result.intervalDays <= maxInterval) return result;

  return {
    ...result,
    intervalDays: maxInterval,
    dueAt: new Date(now.getTime() + maxInterval * 24 * 60 * 60 * 1000),
  };
}

/**
 * Exponentially weighted accuracy. Recent performance should dominate, because
 * the whole point of practice is that old performance stops being true.
 */
export function updateRecentAccuracy(
  previous: number,
  correct: boolean,
  attempts: number,
  halfLife = 8,
): number {
  if (attempts <= 1) return correct ? 1 : 0;
  const alpha = 1 - Math.pow(0.5, 1 / halfLife);
  return previous + alpha * ((correct ? 1 : 0) - previous);
}

/** Running mean that does not need the full history in memory. */
export function updateRunningMean(
  previousMean: number,
  previousCount: number,
  value: number,
): number {
  if (previousCount <= 0) return value;
  return previousMean + (value - previousMean) / (previousCount + 1);
}

export interface MasteryInput {
  recentAccuracy: number;
  attempts: number;
  avgSolveMs: number;
  expectedMs: number;
  patternHitRate: number;
}

/**
 * Mastery, 0-100. Accuracy alone overstates readiness: on a timed, adaptive
 * test, "right but slow" and "right without knowing why" both fail under
 * pressure. So speed and recognition each carry weight.
 */
export function computeMastery(input: MasteryInput): number {
  const { recentAccuracy, attempts, avgSolveMs, expectedMs, patternHitRate } = input;

  if (attempts === 0) return 0;

  const accuracyPart = recentAccuracy;

  const speedPart =
    avgSolveMs <= 0 || expectedMs <= 0
      ? 0.5
      : Math.min(1, Math.max(0, 1.3 - avgSolveMs / expectedMs / 1.6));

  const recognitionPart = patternHitRate;

  const blended = 0.6 * accuracyPart + 0.25 * speedPart + 0.15 * recognitionPart;

  // Confidence ramp: four attempts cannot demonstrate mastery, so hold the
  // ceiling down until there is enough evidence.
  const evidence = Math.min(1, attempts / 12);

  return Math.round(blended * evidence * 100);
}
