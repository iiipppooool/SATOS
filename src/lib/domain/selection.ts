import type { Section } from "./enums";

/**
 * Adaptive question selection.
 *
 * Three jobs, in priority order:
 *   1. Bring back due spaced-repetition cards, because forgetting is the
 *      default and review beats new volume.
 *   2. Target the skills the weakness detector ranked highest.
 *   3. Pitch difficulty just above current ability, which is where learning
 *      per question is maximised. Standard IRT result: information peaks when
 *      the item difficulty sits near the student's ability, so we aim slightly
 *      above it to keep pushing.
 *
 * It also enforces variety. A session of twelve questions on one sub-skill
 * teaches pattern-matching on question phrasing rather than on the underlying
 * maths, which is the opposite of the point.
 */

export interface CandidateQuestion {
  id: string;
  skillId: string;
  section: Section;
  difficulty: number;
  calibratedDifficulty: number | null;
  /** Times this user has already attempted it. */
  timesSeen: number;
  /** Set when a spaced-repetition card for this question is due. */
  dueAt: Date | null;
  lastAttemptedAt: Date | null;
  lastAttemptCorrect: boolean | null;
}

export interface SelectionWeights {
  /** Priority per skill id, from the weakness ranking. Higher is more urgent. */
  skillPriority: Map<string, number>;
  /** Ability per section, on the 1-5 difficulty scale. */
  abilityBySection: Map<Section, number>;
}

export interface SelectionOptions {
  count: number;
  section?: Section | "both";
  skillIds?: string[];
  /** Hard difficulty window, if the student chose one. */
  difficultyRange?: [number, number];
  /** Share of the session reserved for due review cards, 0..1. */
  reviewShare?: number;
  /** Maximum questions from any one skill. */
  maxPerSkill?: number;
  /** Do not re-show a question attempted within this many hours. */
  cooldownHours?: number;
  now?: Date;
}

export interface ScoredCandidate {
  question: CandidateQuestion;
  score: number;
  kind: "review" | "targeted" | "fresh";
}

const DEFAULTS = {
  reviewShare: 0.3,
  maxPerSkill: 3,
  cooldownHours: 18,
};

/** How far above current ability to aim, in difficulty units. */
const STRETCH = 0.4;

export function selectQuestions(
  candidates: CandidateQuestion[],
  weights: SelectionWeights,
  options: SelectionOptions,
): ScoredCandidate[] {
  const now = options.now ?? new Date();
  const reviewShare = options.reviewShare ?? DEFAULTS.reviewShare;
  const maxPerSkill = options.maxPerSkill ?? DEFAULTS.maxPerSkill;
  const cooldownMs = (options.cooldownHours ?? DEFAULTS.cooldownHours) * 3600_000;

  const pool = candidates.filter((q) => {
    if (options.section && options.section !== "both" && q.section !== options.section) {
      return false;
    }
    if (options.skillIds?.length && !options.skillIds.includes(q.skillId)) {
      return false;
    }
    const difficulty = q.calibratedDifficulty ?? q.difficulty;
    if (options.difficultyRange) {
      const [lo, hi] = options.difficultyRange;
      if (difficulty < lo || difficulty > hi) return false;
    }
    // Respect the cooldown unless the card is explicitly due for review.
    const isDue = q.dueAt !== null && q.dueAt.getTime() <= now.getTime();
    if (!isDue && q.lastAttemptedAt) {
      if (now.getTime() - q.lastAttemptedAt.getTime() < cooldownMs) return false;
    }
    return true;
  });

  const scored: ScoredCandidate[] = pool.map((question) => {
    const difficulty = question.calibratedDifficulty ?? question.difficulty;
    const ability = weights.abilityBySection.get(question.section) ?? 3;
    const target = ability + STRETCH;

    // Difficulty fit: a bell centred on the target difficulty.
    const fit = Math.exp(-Math.pow(difficulty - target, 2) / 2.0);

    const priority = weights.skillPriority.get(question.skillId) ?? 0;
    // Normalise priority into roughly 0..1 so it does not swamp the other terms.
    const priorityPart = Math.min(1, priority / 60);

    const isDue = question.dueAt !== null && question.dueAt.getTime() <= now.getTime();
    const overdueDays = isDue
      ? (now.getTime() - (question.dueAt as Date).getTime()) / 86_400_000
      : 0;

    // Previously wrong items are worth more than unseen ones of equal fit.
    const previouslyWrong = question.lastAttemptCorrect === false ? 0.35 : 0;

    // Mild penalty for repetition so fresh material still surfaces.
    const familiarity = Math.min(0.4, question.timesSeen * 0.12);

    let score = 0.45 * fit + 0.4 * priorityPart + previouslyWrong - familiarity;
    if (isDue) score += 0.6 + Math.min(0.4, overdueDays * 0.08);

    return {
      question,
      score,
      kind: isDue ? "review" : priorityPart > 0.25 ? "targeted" : "fresh",
    };
  });

  scored.sort((a, b) => b.score - a.score);

  // Fill the review quota first, then everything else, honouring the per-skill
  // cap throughout so no single skill dominates.
  const reviewQuota = Math.min(
    Math.round(options.count * reviewShare),
    scored.filter((s) => s.kind === "review").length,
  );

  const chosen: ScoredCandidate[] = [];
  const perSkill = new Map<string, number>();

  const take = (candidate: ScoredCandidate): boolean => {
    const used = perSkill.get(candidate.question.skillId) ?? 0;
    if (used >= maxPerSkill) return false;
    if (chosen.some((c) => c.question.id === candidate.question.id)) return false;
    perSkill.set(candidate.question.skillId, used + 1);
    chosen.push(candidate);
    return true;
  };

  for (const candidate of scored) {
    if (chosen.length >= reviewQuota) break;
    if (candidate.kind === "review") take(candidate);
  }

  for (const candidate of scored) {
    if (chosen.length >= options.count) break;
    take(candidate);
  }

  // If the per-skill cap left the session short, relax it rather than hand
  // back a half-empty session.
  if (chosen.length < options.count) {
    for (const candidate of scored) {
      if (chosen.length >= options.count) break;
      if (chosen.some((c) => c.question.id === candidate.question.id)) continue;
      chosen.push(candidate);
    }
  }

  return interleave(chosen);
}

/**
 * Spread skills through the session instead of grouping them, so the student
 * has to identify what each question is before solving it. Grouped practice
 * inflates accuracy and trains nothing transferable.
 */
export function interleave(items: ScoredCandidate[]): ScoredCandidate[] {
  const bySkill = new Map<string, ScoredCandidate[]>();
  for (const item of items) {
    const list = bySkill.get(item.question.skillId) ?? [];
    list.push(item);
    bySkill.set(item.question.skillId, list);
  }

  // Largest groups first so they get spread widest.
  const groups = [...bySkill.values()].sort((a, b) => b.length - a.length);
  const result: ScoredCandidate[] = [];
  let placed = 0;
  const total = items.length;

  while (placed < total) {
    for (const group of groups) {
      const next = group.shift();
      if (next) {
        result.push(next);
        placed += 1;
      }
    }
  }

  return result;
}

/**
 * Convert a theta estimate (logit scale) into the 1-5 difficulty scale the
 * question pool uses, so selection and scoring speak the same language.
 */
export function thetaToDifficulty(theta: number): number {
  return Math.min(5, Math.max(1, theta / 0.9 + 3));
}
