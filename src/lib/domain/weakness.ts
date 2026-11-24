import { SCALED_MAX, SCALED_MIN, type DomainSeed } from "./taxonomy";
import type { Section } from "./enums";

/**
 * Weakness detection and prioritisation.
 *
 * The useful question is not "what am I worst at?" but "where will an hour of
 * work buy the most marks?". Those are different, and confusing them is the
 * most common way a strong student plateaus: they grind the topic that annoys
 * them rather than the one that is costing them points.
 *
 * Expected gain for a skill is modelled as
 *
 *     questionShare x accuracyHeadroom x pointsPerSection
 *
 * where questionShare is the fraction of the section's questions the skill is
 * expected to carry, and accuracyHeadroom is how far current accuracy sits
 * below the accuracy the target score demands. A skill you have never
 * attempted is treated as a blind spot: it gets a conservative assumed
 * accuracy rather than being silently scored as perfect or as zero.
 */

const POINTS_PER_SECTION = SCALED_MAX - SCALED_MIN; // 600

/** Accuracy an unattempted skill is assumed to sit at, pending evidence. */
const BLIND_SPOT_ASSUMED_ACCURACY = 0.55;

export interface SkillStat {
  skillId: string;
  skillName: string;
  domainId: string;
  domainName: string;
  section: Section;
  /** Share of the section's questions, 0..1. */
  questionShare: number;
  attempts: number;
  recentAccuracy: number;
  mastery: number;
  avgSolveMs: number;
  expectedMs: number;
  patternHitRate: number;
  /** Count of unresolved error-log entries attached to this skill. */
  openErrors: number;
  lastSeenAt: Date | null;
}

export interface WeaknessRanking extends SkillStat {
  /** Accuracy the target score implies for this skill. */
  requiredAccuracy: number;
  /** How far short of that the student currently is, 0..1. */
  headroom: number;
  /** Expected scale points recoverable by fixing this skill. */
  expectedGain: number;
  /** True when there is not enough data to judge the skill. */
  blindSpot: boolean;
  /** True when accuracy is adequate but speed is not. */
  speedProblem: boolean;
  priority: number;
  reason: string;
}

/**
 * Accuracy implied by a target score. A 1550 total needs roughly 775 a
 * section, which on a 54-question section leaves almost no room for error, so
 * the curve is steep at the top -- as it is in reality.
 */
export function requiredAccuracyForTarget(targetTotal: number): number {
  const perSection = targetTotal / 2;
  const proportion = (perSection - SCALED_MIN) / POINTS_PER_SECTION;
  // Inverse of the shaping used in rawToScaled, with a small safety margin so
  // the plan does not aim at the bare minimum.
  const required = Math.pow(Math.min(1, Math.max(0, proportion)), 1 / 0.88);
  return Math.min(0.98, required + 0.03);
}

export function rankWeaknesses(
  stats: SkillStat[],
  targetTotal: number,
): WeaknessRanking[] {
  const requiredAccuracy = requiredAccuracyForTarget(targetTotal);

  const ranked = stats.map((stat) => {
    const blindSpot = stat.attempts < 4;
    const effectiveAccuracy = blindSpot
      ? stat.attempts === 0
        ? BLIND_SPOT_ASSUMED_ACCURACY
        : // Blend the thin evidence we have towards the assumed value.
          (stat.recentAccuracy * stat.attempts +
            BLIND_SPOT_ASSUMED_ACCURACY * (4 - stat.attempts)) /
          4
      : stat.recentAccuracy;

    const headroom = Math.max(0, requiredAccuracy - effectiveAccuracy);
    const expectedGain = stat.questionShare * headroom * POINTS_PER_SECTION;

    const speedProblem =
      !blindSpot &&
      effectiveAccuracy >= requiredAccuracy - 0.05 &&
      stat.expectedMs > 0 &&
      stat.avgSolveMs > stat.expectedMs * 1.6;

    // Priority is expected gain, nudged by three things that expected gain
    // alone misses: unknown risk, a logged error the student never resolved,
    // and a skill that is accurate but too slow to survive the real clock.
    let priority = expectedGain;
    if (blindSpot) priority *= 1.15;
    if (stat.openErrors > 0) priority += Math.min(12, stat.openErrors * 2.5);
    if (speedProblem) priority += 10;

    return {
      ...stat,
      requiredAccuracy,
      headroom,
      expectedGain,
      blindSpot,
      speedProblem,
      priority,
      reason: explain({
        blindSpot,
        speedProblem,
        headroom,
        expectedGain,
        openErrors: stat.openErrors,
        accuracy: effectiveAccuracy,
        requiredAccuracy,
        attempts: stat.attempts,
      }),
    };
  });

  return ranked.sort((a, b) => b.priority - a.priority);
}

function explain(input: {
  blindSpot: boolean;
  speedProblem: boolean;
  headroom: number;
  expectedGain: number;
  openErrors: number;
  accuracy: number;
  requiredAccuracy: number;
  attempts: number;
}): string {
  const pct = (n: number) => `${Math.round(n * 100)}%`;

  if (input.blindSpot && input.attempts === 0) {
    return "You have never attempted this skill. Untested ground is risk, not strength.";
  }
  if (input.blindSpot) {
    return `Only ${input.attempts} attempt${input.attempts === 1 ? "" : "s"} so far, so this reading is provisional. Drill it to find out where you really stand.`;
  }
  if (input.speedProblem) {
    return `Accuracy is fine at ${pct(input.accuracy)}, but you are well over the expected time. On a timed module that becomes wrong answers elsewhere.`;
  }
  if (input.headroom <= 0.01) {
    return `At ${pct(input.accuracy)} you are already at the level your target needs. Maintain it with spaced review rather than fresh drilling.`;
  }
  if (input.openErrors > 0) {
    return `${pct(input.accuracy)} against a required ${pct(input.requiredAccuracy)}, with ${input.openErrors} unresolved error${input.openErrors === 1 ? "" : "s"} logged here.`;
  }
  return `${pct(input.accuracy)} against the ${pct(input.requiredAccuracy)} your target implies. Worth about ${Math.round(input.expectedGain)} points.`;
}

/**
 * Work out each skill's share of its section's questions.
 *
 * The published blueprint gives percentages per domain, not per skill, so
 * within a domain the share is split evenly. That is an approximation and it
 * is flagged as one in the UI; if College Board ever publishes per-skill
 * weights, this is the single place to change.
 */
export function computeQuestionShares(
  domains: DomainSeed[],
): Map<string, number> {
  const shares = new Map<string, number>();
  for (const domain of domains) {
    const perSkill = domain.skills.length > 0 ? domain.weight / domain.skills.length : 0;
    for (const skill of domain.skills) {
      shares.set(skill.id, perSkill);
    }
  }
  return shares;
}

export interface SectionSummary {
  section: Section;
  attempts: number;
  accuracy: number;
  weakestSkillName: string | null;
  recoverablePoints: number;
}

export function summariseBySection(ranked: WeaknessRanking[]): SectionSummary[] {
  const sections: Section[] = ["reading_writing", "math"];
  return sections.map((section) => {
    const rows = ranked.filter((r) => r.section === section);
    const attempts = rows.reduce((sum, r) => sum + r.attempts, 0);
    const weightedCorrect = rows.reduce(
      (sum, r) => sum + r.recentAccuracy * r.attempts,
      0,
    );
    const withHeadroom = rows.filter((r) => r.headroom > 0.01 && !r.blindSpot);
    return {
      section,
      attempts,
      accuracy: attempts > 0 ? weightedCorrect / attempts : 0,
      weakestSkillName: withHeadroom[0]?.skillName ?? rows[0]?.skillName ?? null,
      recoverablePoints: Math.round(
        rows.reduce((sum, r) => sum + r.expectedGain, 0),
      ),
    };
  });
}
