import { SCALED_MAX, SCALED_MIN, TOTAL_MAX, TOTAL_MIN } from "./taxonomy";

/**
 * Score estimation.
 *
 * READ THIS BEFORE TRUSTING A NUMBER FROM THIS FILE.
 *
 * The real digital SAT is scored with equated, item-response-theory-calibrated
 * forms. We cannot replicate that: we do not have the item parameters, and our
 * question pool is not the operational pool. So this module does the most
 * defensible thing available, and reports its own uncertainty honestly.
 *
 * Method: a one-parameter logistic (Rasch) model. Each question has a
 * difficulty b on a logit scale; the student has an ability theta. The
 * probability of a correct response is logistic(theta - b). We estimate theta
 * by maximum a posteriori with a weak normal prior, which keeps the estimate
 * finite when every answer is right or every answer is wrong, then map theta
 * linearly onto the 200-800 section scale.
 *
 * Two sources of error are reported together:
 *   1. Sampling error, from the Fisher information of the responses. Shrinks
 *      as you answer more questions.
 *   2. Calibration error, a fixed floor. Our item difficulties are
 *      author-assigned until enough attempts accumulate to calibrate them, and
 *      our pool is not the real pool. This term does NOT shrink with practice,
 *      which is why the band never collapses to a point.
 *
 * Consequence: treat the midpoint as a direction of travel, not a prediction.
 * Only a full official practice test, taken under timed conditions, gives a
 * number worth planning around.
 */

/** Minimum attempts in a section before we will show any estimate at all. */
export const MIN_ATTEMPTS_FOR_ESTIMATE = 12;

/** Attempts beyond this add little; used to describe estimate quality. */
export const ATTEMPTS_FOR_GOOD_ESTIMATE = 60;

/** Standard deviation of the prior on theta. Weak, but enough to regularise. */
const PRIOR_SD = 1.6;

/** Scale points per logit. theta = 0 maps to 500, theta = 3 maps to 800. */
const POINTS_PER_LOGIT = 100;
const SCALE_CENTRE = 500;

/**
 * Irreducible uncertainty in scale points, per section, from the fact that our
 * difficulties and our pool are not the real test's. Deliberately generous.
 */
const CALIBRATION_SD_POINTS = 28;

export interface ScoredResponse {
  /** Author-assigned difficulty, 1 (easiest) to 5 (hardest). */
  difficulty: number;
  /** Calibrated difficulty on the same 1-5 scale, if attempt data exists. */
  calibratedDifficulty?: number | null;
  correct: boolean;
}

export interface SectionEstimate {
  /** Ability on the logit scale. */
  theta: number;
  /** Combined standard error, already expressed in scale points. */
  standardErrorPoints: number;
  /** Rounded to the nearest 10, as the real test reports. */
  scaled: number;
  lower: number;
  upper: number;
  sampleSize: number;
  accuracy: number;
  /** False when sampleSize < MIN_ATTEMPTS_FOR_ESTIMATE. */
  reliable: boolean;
  quality: "insufficient" | "rough" | "indicative" | "settled";
}

/** Map a 1-5 difficulty onto the logit scale, centred on 3. */
export function difficultyToLogit(difficulty: number): number {
  const clamped = Math.min(5, Math.max(1, difficulty));
  return (clamped - 3) * 0.9;
}

function logistic(x: number): number {
  // Guard against overflow at the tails.
  if (x > 35) return 1;
  if (x < -35) return 0;
  return 1 / (1 + Math.exp(-x));
}

function clampScaled(value: number): number {
  return Math.min(SCALED_MAX, Math.max(SCALED_MIN, value));
}

function roundToTen(value: number): number {
  return Math.round(value / 10) * 10;
}

/**
 * MAP estimate of theta by Newton-Raphson on the penalised log-likelihood.
 * Returns the estimate and the Fisher information at that point.
 */
export function estimateTheta(responses: ScoredResponse[]): {
  theta: number;
  information: number;
} {
  if (responses.length === 0) return { theta: 0, information: 0 };

  const items = responses.map((r) => ({
    b: difficultyToLogit(r.calibratedDifficulty ?? r.difficulty),
    x: r.correct ? 1 : 0,
  }));

  const priorPrecision = 1 / (PRIOR_SD * PRIOR_SD);
  let theta = 0;

  for (let iteration = 0; iteration < 60; iteration += 1) {
    let gradient = -priorPrecision * theta; // d/dtheta of the log prior
    let hessian = -priorPrecision;

    for (const item of items) {
      const p = logistic(theta - item.b);
      gradient += item.x - p;
      hessian -= p * (1 - p);
    }

    if (hessian === 0) break;
    const step = gradient / hessian;
    theta -= step;

    // Keep the iterate in a sane range; the prior makes divergence unlikely
    // but a pathological input should not produce Infinity.
    theta = Math.min(6, Math.max(-6, theta));

    if (Math.abs(step) < 1e-9) break;
  }

  let information = 0;
  for (const item of items) {
    const p = logistic(theta - item.b);
    information += p * (1 - p);
  }

  return { theta, information };
}

function describeQuality(sampleSize: number): SectionEstimate["quality"] {
  if (sampleSize < MIN_ATTEMPTS_FOR_ESTIMATE) return "insufficient";
  if (sampleSize < 30) return "rough";
  if (sampleSize < ATTEMPTS_FOR_GOOD_ESTIMATE) return "indicative";
  return "settled";
}

export function estimateSection(responses: ScoredResponse[]): SectionEstimate {
  const sampleSize = responses.length;
  const correct = responses.filter((r) => r.correct).length;
  const accuracy = sampleSize > 0 ? correct / sampleSize : 0;

  const { theta, information } = estimateTheta(responses);

  // Posterior precision = Fisher information + prior precision.
  const posteriorPrecision = information + 1 / (PRIOR_SD * PRIOR_SD);
  const samplingSdLogits = Math.sqrt(1 / posteriorPrecision);
  const samplingSdPoints = samplingSdLogits * POINTS_PER_LOGIT;

  // Independent error sources add in quadrature.
  const standardErrorPoints = Math.sqrt(
    samplingSdPoints * samplingSdPoints + CALIBRATION_SD_POINTS * CALIBRATION_SD_POINTS,
  );

  const centre = SCALE_CENTRE + theta * POINTS_PER_LOGIT;
  const margin = 1.96 * standardErrorPoints;

  return {
    theta,
    standardErrorPoints,
    scaled: roundToTen(clampScaled(centre)),
    lower: roundToTen(clampScaled(centre - margin)),
    upper: roundToTen(clampScaled(centre + margin)),
    sampleSize,
    accuracy,
    reliable: sampleSize >= MIN_ATTEMPTS_FOR_ESTIMATE,
    quality: describeQuality(sampleSize),
  };
}

export interface TotalEstimate {
  readingWriting: SectionEstimate;
  math: SectionEstimate;
  total: number;
  lower: number;
  upper: number;
  reliable: boolean;
  /** Plain-English caveat to render next to the number. Never hide this. */
  caveat: string;
}

export function estimateTotal(
  rwResponses: ScoredResponse[],
  mathResponses: ScoredResponse[],
): TotalEstimate {
  const readingWriting = estimateSection(rwResponses);
  const math = estimateSection(mathResponses);

  const total = Math.min(
    TOTAL_MAX,
    Math.max(TOTAL_MIN, readingWriting.scaled + math.scaled),
  );

  // Section errors are independent, so the total's error adds in quadrature
  // rather than summing -- summing would overstate the band.
  const totalMargin =
    1.96 *
    Math.sqrt(
      readingWriting.standardErrorPoints ** 2 + math.standardErrorPoints ** 2,
    );

  const reliable = readingWriting.reliable && math.reliable;

  return {
    readingWriting,
    math,
    total: roundToTen(total),
    lower: roundToTen(Math.max(TOTAL_MIN, total - totalMargin)),
    upper: roundToTen(Math.min(TOTAL_MAX, total + totalMargin)),
    reliable,
    caveat: reliable
      ? "Estimated from your practice accuracy on this platform's question pool, not from an official test. Expect a real score to differ."
      : `Not enough data yet. Answer at least ${MIN_ATTEMPTS_FOR_ESTIMATE} questions in each section before this means anything.`,
  };
}

/**
 * Convert a raw correct count on a simulated exam into a section score.
 *
 * This is a deliberately crude linear-with-shoulders mapping, not an equating
 * table: we do not have the real conversion charts, and they differ per form.
 * It exists so that the exam simulator can report something on the familiar
 * 200-800 scale, and it is always labelled as a simulator estimate.
 */
export function rawToScaled(raw: number, operational: number): number {
  if (operational <= 0) return SCALED_MIN;
  const proportion = Math.min(1, Math.max(0, raw / operational));

  // Floor of 200 at zero correct, and diminishing returns near the top, which
  // is the shape every published conversion table has.
  const shaped = Math.pow(proportion, 0.88);
  return roundToTen(clampScaled(SCALED_MIN + shaped * (SCALED_MAX - SCALED_MIN)));
}

/** Points needed to reach a target, or 0 when already there. */
export function gapToTarget(current: number, target: number): number {
  return Math.max(0, target - current);
}
