import { EXAM_BLUEPRINT, type ModuleBlueprint } from "./taxonomy";
import { SECTION_LABEL, type Section } from "./enums";

/**
 * Pacing analysis.
 *
 * Accuracy on untimed practice tells you what you know. It does not tell you
 * whether you can produce it inside 32 or 35 minutes, and at the top of the
 * scale that is usually the binding constraint: a student who is accurate but
 * 20% slow does not lose marks on the questions they were slow on, they lose
 * them on the three questions at the end they never reached.
 *
 * So this module projects measured per-question times onto the real module
 * budget and reports the shortfall in questions, not just in seconds.
 */

export interface TimedAttempt {
  section: Section;
  skillId: string;
  skillName: string;
  /** Total time on the question, in milliseconds. */
  totalMs: number;
  /** The question's authored target, in seconds. */
  expectedSeconds: number;
  isCorrect: boolean;
  difficulty: number;
}

export interface SectionPacing {
  section: Section;
  sectionLabel: string;
  /** Questions and minutes in one real module of this section. */
  questionsPerModule: number;
  minutesPerModule: number;
  /** Seconds per question the real module allows. */
  targetSeconds: number;
  attempts: number;
  /** Median is used, not mean: one 6-minute stare should not define pacing. */
  medianSeconds: number;
  meanSeconds: number;
  /** Projected minutes to complete a full module at the observed median. */
  projectedMinutes: number;
  /** Positive means over budget. */
  minutesOverBudget: number;
  /**
   * How many questions would be left unreached if the module ended on time at
   * the observed pace. This is the number that actually costs marks.
   */
  questionsAtRisk: number;
  verdict: "on_pace" | "tight" | "over";
  /** Share of attempts that took more than 1.5x the question's own target. */
  slowShare: number;
}

export interface SkillPacing {
  skillId: string;
  skillName: string;
  section: Section;
  attempts: number;
  medianSeconds: number;
  targetSeconds: number;
  /** Observed median divided by the question's own target. */
  ratio: number;
  accuracy: number;
  /**
   * Seconds this skill costs over target across a whole module, weighted by how
   * often it is likely to appear. The triage list is sorted by this.
   */
  projectedCostSeconds: number;
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1]! + sorted[middle]!) / 2
    : sorted[middle]!;
}

function blueprintFor(section: Section): ModuleBlueprint {
  const found = EXAM_BLUEPRINT.find((b) => b.section === section);
  if (!found) throw new Error(`No blueprint for section ${section}`);
  return found;
}

/** Minimum attempts in a section before pacing is worth reporting. */
export const MIN_ATTEMPTS_FOR_PACING = 8;

export function analyseSectionPacing(
  attempts: TimedAttempt[],
  section: Section,
): SectionPacing {
  const blueprint = blueprintFor(section);
  const rows = attempts.filter((a) => a.section === section);

  const questionsPerModule = blueprint.questionCount;
  const minutesPerModule = Math.round(blueprint.durationSec / 60);
  const targetSeconds = Math.round(blueprint.durationSec / questionsPerModule);

  const seconds = rows.map((a) => a.totalMs / 1000);
  const medianSeconds = median(seconds);
  const meanSeconds =
    seconds.length > 0 ? seconds.reduce((s, v) => s + v, 0) / seconds.length : 0;

  const projectedSeconds = medianSeconds * questionsPerModule;
  const projectedMinutes = projectedSeconds / 60;
  const minutesOverBudget = projectedMinutes - minutesPerModule;

  // At the observed median, how many questions fit in the real budget?
  const questionsThatFit =
    medianSeconds > 0 ? Math.floor(blueprint.durationSec / medianSeconds) : questionsPerModule;
  const questionsAtRisk = Math.max(0, questionsPerModule - questionsThatFit);

  const slow = rows.filter((a) => a.totalMs > a.expectedSeconds * 1000 * 1.5).length;

  const verdict: SectionPacing["verdict"] =
    questionsAtRisk >= 3 || minutesOverBudget > 3
      ? "over"
      : minutesOverBudget > 0 || questionsAtRisk > 0
        ? "tight"
        : "on_pace";

  return {
    section,
    sectionLabel: SECTION_LABEL[section],
    questionsPerModule,
    minutesPerModule,
    targetSeconds,
    attempts: rows.length,
    medianSeconds: Math.round(medianSeconds),
    meanSeconds: Math.round(meanSeconds),
    projectedMinutes: Math.round(projectedMinutes * 10) / 10,
    minutesOverBudget: Math.round(minutesOverBudget * 10) / 10,
    questionsAtRisk,
    verdict: rows.length < MIN_ATTEMPTS_FOR_PACING ? "on_pace" : verdict,
    slowShare: rows.length > 0 ? slow / rows.length : 0,
  };
}

/**
 * Per-skill pacing, sorted by the time each skill is projected to cost over a
 * module. A skill that is 40 seconds slow but appears once costs less than one
 * that is 15 seconds slow and appears five times, and the triage order should
 * reflect that rather than the raw overrun.
 */
export function analyseSkillPacing(
  attempts: TimedAttempt[],
  questionShares: Map<string, number>,
): SkillPacing[] {
  const bySkill = new Map<string, TimedAttempt[]>();
  for (const attempt of attempts) {
    const list = bySkill.get(attempt.skillId) ?? [];
    list.push(attempt);
    bySkill.set(attempt.skillId, list);
  }

  const rows: SkillPacing[] = [];

  for (const [skillId, list] of bySkill) {
    if (list.length < 2) continue; // one attempt is noise, not a pattern

    const first = list[0]!;
    const blueprint = blueprintFor(first.section);
    const seconds = list.map((a) => a.totalMs / 1000);
    const medianSeconds = median(seconds);
    const targetSeconds = median(list.map((a) => a.expectedSeconds));
    const correct = list.filter((a) => a.isCorrect).length;

    const share = questionShares.get(skillId) ?? 0;
    const expectedAppearances = share * blueprint.questionCount;
    const overPerQuestion = Math.max(0, medianSeconds - targetSeconds);

    rows.push({
      skillId,
      skillName: first.skillName,
      section: first.section,
      attempts: list.length,
      medianSeconds: Math.round(medianSeconds),
      targetSeconds: Math.round(targetSeconds),
      ratio: targetSeconds > 0 ? medianSeconds / targetSeconds : 1,
      accuracy: correct / list.length,
      projectedCostSeconds: Math.round(overPerQuestion * expectedAppearances),
    });
  }

  return rows.sort((a, b) => b.projectedCostSeconds - a.projectedCostSeconds);
}

/**
 * Plain advice derived from the numbers. Deliberately specific: "work on
 * pacing" is useless, "you are losing four questions a module to Advanced
 * Math" is actionable.
 */
export function pacingAdvice(
  pacing: SectionPacing,
  worstSkills: SkillPacing[],
): string {
  if (pacing.attempts < MIN_ATTEMPTS_FOR_PACING) {
    return `Not enough timed attempts in ${pacing.sectionLabel} yet. Answer at least ${MIN_ATTEMPTS_FOR_PACING} before reading anything into the pace.`;
  }

  const named = worstSkills
    .filter((s) => s.section === pacing.section && s.projectedCostSeconds > 0)
    .slice(0, 2)
    .map((s) => s.skillName);

  if (pacing.verdict === "on_pace") {
    return `At your median of ${pacing.medianSeconds}s you would finish a ${pacing.questionsPerModule}-question module in about ${pacing.projectedMinutes} minutes, inside the ${pacing.minutesPerModule} you get. Pace is not your constraint here; accuracy is.`;
  }

  const costDetail =
    named.length > 0
      ? ` Most of the overrun comes from ${named.join(" and ")}, so triage there first: on the real test, leave those and come back.`
      : "";

  if (pacing.verdict === "tight") {
    return `At your median of ${pacing.medianSeconds}s a full module takes about ${pacing.projectedMinutes} minutes against the ${pacing.minutesPerModule} allowed. That is survivable but leaves no room to check anything.${costDetail}`;
  }

  return `At your median of ${pacing.medianSeconds}s you would run out of time with about ${pacing.questionsAtRisk} question${pacing.questionsAtRisk === 1 ? "" : "s"} unreached, which is ${pacing.questionsAtRisk} marks lost before difficulty even matters.${costDetail}`;
}
