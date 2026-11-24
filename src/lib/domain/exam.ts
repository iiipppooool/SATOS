import { EXAM_BLUEPRINT, MATH_SPR_SHARE, operationalCount, type ModuleBlueprint } from "./taxonomy";
import { rawToScaled } from "./scoring";
import type { ExamShape, ExamSlot, ModuleTier, Section } from "./enums";

/**
 * Digital SAT exam simulation.
 *
 * The real test is multistage adaptive: everyone sees the same first module in
 * a section, and performance on it selects the difficulty tier of the second.
 * It is NOT adaptive question by question. Simulating it correctly matters,
 * because the second-module tier is where most of the score separation
 * happens, and students who have only used linear mocks are surprised by it.
 *
 * What this simulator does faithfully: module structure, counts, timing, the
 * routing decision, flagging, and per-module review lockout.
 *
 * What it cannot do faithfully: equating. We do not have the conversion tables
 * and they differ per form, so the reported score is labelled as a simulator
 * estimate everywhere it appears.
 */

export interface ExamPlanModule {
  slot: ExamSlot;
  section: Section;
  tier: ModuleTier;
  order: number;
  questionCount: number;
  durationSec: number;
  /** Target difficulty mix, as counts per 1-5 difficulty band. */
  difficultyMix: Record<number, number>;
  /** How many should be student-produced response, for Maths modules. */
  sprCount: number;
}

export function slotsForShape(shape: ExamShape): ExamSlot[] {
  switch (shape) {
    case "full":
      return ["rw1", "rw2", "math1", "math2"];
    case "rw_only":
      return ["rw1", "rw2"];
    case "math_only":
      return ["math1", "math2"];
    case "single_module":
      return ["rw1"];
    default:
      return ["rw1", "rw2", "math1", "math2"];
  }
}

export function isFirstModule(slot: ExamSlot): boolean {
  return slot === "rw1" || slot === "math1";
}

export function pairedFirstModule(slot: ExamSlot): ExamSlot | null {
  if (slot === "rw2") return "rw1";
  if (slot === "math2") return "math1";
  return null;
}

/**
 * Difficulty mix per module tier.
 *
 * The routing module is centred, the easy tier skews low, the hard tier skews
 * high. These are reasonable approximations of the published descriptions, not
 * measured distributions from real forms.
 */
const MIX: Record<ModuleTier, Record<number, number>> = {
  routing: { 1: 0.16, 2: 0.26, 3: 0.3, 4: 0.2, 5: 0.08 },
  easy: { 1: 0.3, 2: 0.32, 3: 0.24, 4: 0.1, 5: 0.04 },
  hard: { 1: 0.04, 2: 0.12, 3: 0.26, 4: 0.34, 5: 0.24 },
};

function distribute(total: number, weights: Record<number, number>): Record<number, number> {
  const counts: Record<number, number> = {};
  let assigned = 0;
  const bands = [1, 2, 3, 4, 5];

  for (const band of bands) {
    const count = Math.floor(total * (weights[band] ?? 0));
    counts[band] = count;
    assigned += count;
  }

  // Hand out the remainder to the bands with the largest fractional parts, so
  // the mix stays as close to the intended shape as integer counts allow.
  const remainders = bands
    .map((band) => ({
      band,
      fraction: total * (weights[band] ?? 0) - Math.floor(total * (weights[band] ?? 0)),
    }))
    .sort((a, b) => b.fraction - a.fraction);

  let cursor = 0;
  while (assigned < total) {
    const band = remainders[cursor % remainders.length]!.band;
    counts[band] = (counts[band] ?? 0) + 1;
    assigned += 1;
    cursor += 1;
  }

  return counts;
}

export function planModule(
  blueprint: ModuleBlueprint,
  tier: ModuleTier,
): ExamPlanModule {
  return {
    slot: blueprint.slot,
    section: blueprint.section,
    tier,
    order: blueprint.order,
    questionCount: blueprint.questionCount,
    durationSec: blueprint.durationSec,
    difficultyMix: distribute(blueprint.questionCount, MIX[tier]),
    sprCount:
      blueprint.section === "math"
        ? Math.round(blueprint.questionCount * MATH_SPR_SHARE)
        : 0,
  };
}

/** First modules only: the second module's tier is decided at runtime. */
export function planFirstModules(shape: ExamShape): ExamPlanModule[] {
  const slots = slotsForShape(shape);
  return EXAM_BLUEPRINT.filter(
    (b) => slots.includes(b.slot) && isFirstModule(b.slot),
  ).map((b) => planModule(b, "routing"));
}

/**
 * The routing decision.
 *
 * College Board does not publish the cut score, so this uses a proportion of
 * the routing module answered correctly. Two-thirds is the figure most
 * published analyses converge on; it is configurable for exactly that reason.
 */
export const DEFAULT_ROUTING_THRESHOLD = 2 / 3;

export function routeSecondModule(
  correct: number,
  total: number,
  threshold: number = DEFAULT_ROUTING_THRESHOLD,
): ModuleTier {
  if (total <= 0) return "easy";
  return correct / total >= threshold ? "hard" : "easy";
}

export function planSecondModule(
  firstSlot: ExamSlot,
  tier: ModuleTier,
): ExamPlanModule | null {
  const secondSlot: ExamSlot | null =
    firstSlot === "rw1" ? "rw2" : firstSlot === "math1" ? "math2" : null;
  if (!secondSlot) return null;
  const blueprint = EXAM_BLUEPRINT.find((b) => b.slot === secondSlot);
  if (!blueprint) return null;
  return planModule(blueprint, tier);
}

export interface ModuleResult {
  slot: ExamSlot;
  section: Section;
  tier: ModuleTier;
  rawCorrect: number;
  questionCount: number;
}

export interface ExamScore {
  rwRaw: number;
  mathRaw: number;
  rwScaled: number | null;
  mathScaled: number | null;
  total: number | null;
  /** Always shown with the score. The simulator does not pretend to equate. */
  caveat: string;
}

/**
 * Score an exam.
 *
 * Reaching the hard second module is itself evidence of ability, and a student
 * routed to the easy module cannot reach the top of the scale however well
 * they do on it -- that is how the real test behaves. The adjustment below
 * reproduces that behaviour: an easy-tier route caps the section, and a
 * hard-tier route lifts it.
 */
export function scoreExam(modules: ModuleResult[]): ExamScore {
  const score = (section: Section): { raw: number; scaled: number | null } => {
    const rows = modules.filter((m) => m.section === section);
    if (rows.length === 0) return { raw: 0, scaled: null };

    const raw = rows.reduce((sum, m) => sum + m.rawCorrect, 0);
    const operational = operationalCount(section);
    const base = rawToScaled(raw, Math.max(1, operational));

    const secondModule = rows.find((m) => m.tier !== "routing");
    if (!secondModule) return { raw, scaled: base };

    if (secondModule.tier === "easy") {
      // Routed to the easier module: the section ceiling drops. 650 is a
      // commonly cited practical cap; treated as an approximation.
      return { raw, scaled: Math.min(650, base) };
    }
    // Routed to the harder module: raw marks there are worth more.
    return { raw, scaled: Math.min(800, Math.round(base * 1.08 / 10) * 10) };
  };

  const rw = score("reading_writing");
  const math = score("math");

  const total =
    rw.scaled !== null && math.scaled !== null ? rw.scaled + math.scaled : null;

  return {
    rwRaw: rw.raw,
    mathRaw: math.raw,
    rwScaled: rw.scaled,
    mathScaled: math.scaled,
    total,
    caveat:
      "Simulator estimate. Real digital SAT scores are equated per form using conversion tables College Board does not publish, so treat this as a progress signal rather than a prediction.",
  };
}

export interface TimingState {
  durationSec: number;
  startedAt: Date;
  now: Date;
}

export function remainingSeconds({ durationSec, startedAt, now }: TimingState): number {
  const elapsed = Math.floor((now.getTime() - startedAt.getTime()) / 1000);
  return Math.max(0, durationSec - elapsed);
}

export function isExpired(state: TimingState): boolean {
  return remainingSeconds(state) <= 0;
}

/** Seconds per question, the number worth watching during a module. */
export function pace(questionCount: number, durationSec: number): number {
  return questionCount > 0 ? Math.round(durationSec / questionCount) : 0;
}
