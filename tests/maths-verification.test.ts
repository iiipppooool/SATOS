import { describe, expect, it } from "vitest";
import { ALL_SEED_QUESTIONS } from "@/lib/content/questions";
import { ALL_SKILLS } from "@/lib/domain/taxonomy";
import { evaluateNumeric, gradeTypedAnswer, normaliseAnswer } from "@/lib/content/types";

/**
 * Independent verification of every computable maths answer in the bank.
 *
 * Each entry below re-derives the answer from first principles in code, with
 * no reference to the stored value. If an authored answer and the derivation
 * disagree, the test fails and names the question. This catches the class of
 * error that no schema check can: a question whose stated answer is simply
 * wrong, which would actively teach the wrong method.
 */

const byId = new Map(ALL_SEED_QUESTIONS.map((q) => [q.id, q]));
const sectionOf = new Map(ALL_SKILLS.map((s) => [s.id, s.section]));

/** Solve the linear equation a*x + b = c*x + d. */
function solveLinear(a: number, b: number, c: number, d: number): number {
  return (d - b) / (a - c);
}

/** Roots of ax^2 + bx + c = 0, ascending. */
function quadraticRoots(a: number, b: number, c: number): number[] {
  const disc = b * b - 4 * a * c;
  if (disc < 0) return [];
  const root = Math.sqrt(disc);
  return [(-b - root) / (2 * a), (-b + root) / (2 * a)].sort((x, y) => x - y);
}

function slope(x1: number, y1: number, x2: number, y2: number): number {
  return (y2 - y1) / (x2 - x1);
}

/**
 * id -> independently computed answer. Expressed as the computation, not as a
 * literal, so the test is a derivation rather than a copy of the answer key.
 */
const DERIVATIONS: Record<string, () => number> = {
  // --- batch one ---------------------------------------------------------
  // 4(x + 3) - 2x = 2x + c  =>  2x + 12 = 2x + c  =>  c = 12
  "alg-lin1-002": () => 4 * 3,
  // 2x + 5y = 20 at y = 0
  "alg-lin2-002": () => 20 / 2,
  // f(3) = 11, f(7) = 23; f(0) = 11 - 3 * slope
  "alg-linf-002": () => 11 - 3 * slope(3, 11, 7, 23),
  // 2x + y = 11, x - y = 1  =>  y
  "alg-sys-001": () => {
    const x = (11 + 1) / 3;
    return x - 1;
  },
  // kx + 6y = 12 parallel to 2x + 3y = 5  =>  k / 2 = 6 / 3
  "alg-sys-002": () => 2 * (6 / 3),
  // 3x + 5y <= 60 at x = 5  =>  greatest y
  "alg-ineq-002": () => (60 - 3 * 5) / 5,
  // sum of roots of x^2 - 6x + 8
  "alg-sys-003-unused": () => 0,
  "adv-nleq-001": () => quadraticRoots(1, -6, 8).reduce((s, r) => s + r, 0),
  // x^2 - 4x + 3 = x - 1  =>  x^2 - 5x + 4 = 0, sum of x
  "adv-nleq-002": () => quadraticRoots(1, -5, 4).reduce((s, r) => s + r, 0),
  // x^2 + kx + 16 has one solution, k > 0
  "adv-nleq-003": () => Math.sqrt(4 * 16),
  // minimum of (x - 3)^2 - 4
  "adv-nlfn-001": () => -4,
  // 180 km in 2.5 h, distance in 4 h
  "psda-ratio-001": () => (180 / 2.5) * 4,
  // 15 m/s to km/h
  "psda-ratio-002": () => (15 * 3600) / 1000,
  // 68 after a 15% discount
  "psda-pct-002": () => 68 / 0.85,
  // y = 12.4 + 3.2x at x = 15
  "psda-2var-002": () => 12.4 + 3.2 * 15,
  // 12 of 16 failed components came from factory B
  "psda-prob-002": () => 12 / 16,
  // cylinder: radius doubled, height halved
  "geo-vol-001": () => (2 * 2) / 2,
  // 6-8-10 scaled so the shortest side is 9
  "geo-lines-002": () => 10 * (9 / 6),
  // exterior angle 120 = x + 2x
  "geo-lines-003": () => 120 / 3,
  // legs 9 and 12
  "geo-trig-001": () => Math.hypot(9, 12),

  // --- batch two ---------------------------------------------------------
  // (2/3)x + 5 = (1/2)x + 9
  "alg-lin1-006": () => solveLinear(2 / 3, 5, 1 / 2, 9),
  // parallel to y = -2x + 7 through (3, 4); intercept
  "alg-lin2-004": () => 4 - -2 * 3,
  // through (-2, 5) and (4, -7); x-intercept
  "alg-lin2-006": () => {
    const m = slope(-2, 5, 4, -7);
    const b = 5 - m * -2;
    return -b / m;
  },
  // f(x) = 8 - 3x at x = -2
  "alg-linf-004": () => 8 - 3 * -2,
  // g(2) = -1, g(6) = 11; solve g(x) = 26
  "alg-linf-006": () => {
    const m = slope(2, -1, 6, 11);
    const b = -1 - m * 2;
    return (26 - b) / m;
  },
  // 3x + 2y = 16 with x = 2y; find x
  "alg-sys-004": () => {
    const y = 16 / (3 * 2 + 2);
    return 2 * y;
  },
  // 4x - y = 11, 2x + 3y = 9; find x
  "alg-sys-005": () => (11 * 3 + 9) / (4 * 3 + 2),
  // 6x + ky = 18 identical to 2x + 3y = 6
  "alg-sys-006": () => 3 * 3,
  // 80 + 45c <= 600, greatest whole c
  "alg-ineq-006": () => Math.floor((600 - 80) / 45),
  // 2x^2 - 18 = 0, positive root
  "adv-nleq-004": () => Math.sqrt(18 / 2),
  // (x - 4)(x + 7) = 0, sum of roots
  "adv-nleq-005": () => 4 + -7,
  // x^2 + 5x = 36, positive root
  "adv-nleq-006": () => Math.max(...quadraticRoots(1, 5, -36)),
  // x^2 - 6x + c has two distinct roots: 36 - 4c > 0, greatest integer c
  "adv-nleq-007": () => {
    let greatest = -Infinity;
    for (let c = -50; c <= 50; c += 1) {
      if ((-6) ** 2 - 4 * 1 * c > 0) greatest = c;
    }
    return greatest;
  },
  // y = x^2 meets y = 2x + 3; greater y-coordinate
  "adv-nleq-008": () => Math.max(...quadraticRoots(1, -2, -3).map((x) => x * x)),
  // sum of roots of 2x^2 + 5x - 3
  "adv-nleq-009": () => quadraticRoots(2, 5, -3).reduce((s, r) => s + r, 0),
  // x^2 + bx + 36 has one solution, b < 0
  "adv-nleq-010": () => -Math.sqrt(4 * 36),
  // vertex x of x^2 - 6x + 5
  "adv-nlfn-004": () => 6 / 2,
  // y-intercept of 2(x + 1)^2 - 8
  "adv-nlfn-005": () => 2 * (0 + 1) ** 2 - 8,
  // 240 g, half-life 5 y, after 15 y
  "adv-nlfn-006": () => 240 * 0.5 ** (15 / 5),
  // vertex x of (x - 2)(x + 6)
  "adv-nlfn-007": () => (2 + -6) / 2,
  // y = a(x - 3)^2 - 4 through (1, 8)
  "adv-nlfn-009": () => (8 + 4) / (1 - 3) ** 2,
  // minimum of x^2 + 4x + k is 1
  "adv-nlfn-010": () => 1 + 4 ** 2 / 4,
  // perimeter 54, length twice width; area
  "geo-vol-004": () => {
    const w = 54 / 6;
    return w * (2 * w);
  },
  // radius from (-1, 4) to (3, 7)
  "geo-circ-004": () => Math.hypot(3 - -1, 7 - 4),

  // --- batch three -------------------------------------------------------
  // 150 g for 12 biscuits, scaled to 30
  "psda-ratio-003": () => (150 / 12) * 30,
  // 8 cm at 1:25000, in km
  "psda-ratio-004": () => (8 * 25000) / 100 / 1000,
  // 4500 -> 5940 percentage increase
  "psda-pct-003": () => ((5940 - 4500) / 4500) * 100,
  // mean minus median of 3, 7, 7, 9, 14
  "psda-1var-003": () => {
    const data = [3, 7, 7, 9, 14];
    const mean = data.reduce((s, v) => s + v, 0) / data.length;
    const med = data[Math.floor(data.length / 2)]!;
    return mean - med;
  },
  // y = 7 + 2.5x at x = 12
  "psda-2var-003": () => 7 + 2.5 * 12,
  // residual: observed 45, predicted 3(12) + 5
  "psda-2var-004": () => 45 - (3 * 12 + 5),
  // 135 of 150 treated seedlings survived
  "psda-prob-004": () => 135 / 150,
  // cube of volume 64: surface area
  "geo-vol-005": () => 6 * Math.cbrt(64) ** 2,
  // all three dimensions scaled by 3
  "geo-vol-007": () => 3 ** 3,
  // angles in ratio 3:4:5, smallest
  "geo-lines-004": () => (180 / (3 + 4 + 5)) * 3,
  // isosceles with a 40 degree apex
  "geo-lines-005": () => (180 - 40) / 2,
  // similar triangles 2:5, smaller area 12
  "geo-lines-007": () => 12 * (5 / 2) ** 2,
  // legs 5 and 12
  "geo-trig-004": () => Math.hypot(5, 12),
  // hypotenuse 20, leg 16
  "geo-trig-005": () => Math.sqrt(20 ** 2 - 16 ** 2),
  // tan A with opposite 9, adjacent 12
  "geo-trig-007": () => 9 / 12,
  // sector area 6pi in a circle of radius 6
  "geo-circ-007": () => ((6 * Math.PI) / (Math.PI * 6 ** 2)) * 360,
};

describe("maths answers are independently verifiable", () => {
  const entries = Object.entries(DERIVATIONS).filter(([id]) => byId.has(id));

  it("covers every type-in maths question in the bank", () => {
    const sprMathsIds = ALL_SEED_QUESTIONS.filter(
      (q) => q.format === "spr" && sectionOf.get(q.skillId) === "math",
    ).map((q) => q.id);
    const uncovered = sprMathsIds.filter((id) => !(id in DERIVATIONS));
    expect(uncovered, "these type-in maths answers are not independently checked").toEqual([]);
  });

  it.each(entries)("%s matches an independent derivation", (id, derive) => {
    const question = byId.get(id)!;
    const expected = derive();

    expect(Number.isFinite(expected), `${id}: derivation did not produce a number`).toBe(true);

    if (question.format === "spr") {
      const accepted = question.acceptedAnswers ?? [];
      expect(accepted.length, `${id}: no accepted answers stored`).toBeGreaterThan(0);

      // Every stored form must equal the derived value.
      for (const stored of accepted) {
        const value = evaluateNumeric(normaliseAnswer(stored));
        expect(value, `${id}: stored answer "${stored}" is not numeric`).not.toBeNull();
        expect(
          Math.abs((value as number) - expected),
          `${id}: stored "${stored}" but derivation gives ${expected}`,
        ).toBeLessThan(1e-9);
      }

      // And the derived value must be accepted by the grader a student hits.
      expect(
        gradeTypedAnswer(String(expected), accepted),
        `${id}: grader rejects the correct value ${expected}`,
      ).toBe(true);
    } else {
      const correct = question.choices?.find((c) => c.isCorrect);
      expect(correct, `${id}: no correct choice`).toBeTruthy();
      const value = evaluateNumeric(normaliseAnswer(correct!.text));
      expect(value, `${id}: correct option "${correct!.text}" is not numeric`).not.toBeNull();
      expect(
        Math.abs((value as number) - expected),
        `${id}: correct option is "${correct!.text}" but derivation gives ${expected}`,
      ).toBeLessThan(1e-9);
    }
  });
});

describe("maths distractors are genuinely wrong", () => {
  it("no maths multiple-choice question repeats an option value", () => {
    const duplicates: string[] = [];
    for (const question of ALL_SEED_QUESTIONS) {
      if (question.format !== "mcq") continue;
      if (sectionOf.get(question.skillId) !== "math") continue;
      const texts = (question.choices ?? []).map((c) => c.text.trim().toLowerCase());
      if (new Set(texts).size !== texts.length) duplicates.push(question.id);
    }
    expect(duplicates).toEqual([]);
  });

  it("no type-in question accepts two numerically different answers", () => {
    const inconsistent: string[] = [];
    for (const question of ALL_SEED_QUESTIONS) {
      if (question.format !== "spr") continue;
      const values = (question.acceptedAnswers ?? [])
        .map((a) => evaluateNumeric(normaliseAnswer(a)))
        .filter((v): v is number => v !== null);
      if (values.length < 2) continue;
      const first = values[0]!;
      if (values.some((v) => Math.abs(v - first) > 1e-9)) inconsistent.push(question.id);
    }
    expect(inconsistent).toEqual([]);
  });
});
