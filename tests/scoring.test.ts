import { describe, expect, it } from "vitest";
import {
  MIN_ATTEMPTS_FOR_ESTIMATE,
  difficultyToLogit,
  estimateSection,
  estimateTheta,
  estimateTotal,
  gapToTarget,
  rawToScaled,
  type ScoredResponse,
} from "@/lib/domain/scoring";
import { SCALED_MAX, SCALED_MIN } from "@/lib/domain/taxonomy";

function responses(spec: Array<[number, boolean]>): ScoredResponse[] {
  return spec.map(([difficulty, correct]) => ({ difficulty, correct }));
}

function uniform(count: number, difficulty: number, correct: boolean): ScoredResponse[] {
  return Array.from({ length: count }, () => ({ difficulty, correct }));
}

describe("difficultyToLogit", () => {
  it("centres difficulty 3 on zero", () => {
    expect(difficultyToLogit(3)).toBe(0);
  });

  it("is monotonic increasing", () => {
    expect(difficultyToLogit(1)).toBeLessThan(difficultyToLogit(2));
    expect(difficultyToLogit(4)).toBeLessThan(difficultyToLogit(5));
  });

  it("clamps out-of-range difficulties", () => {
    expect(difficultyToLogit(-4)).toBe(difficultyToLogit(1));
    expect(difficultyToLogit(99)).toBe(difficultyToLogit(5));
  });
});

describe("estimateTheta", () => {
  it("returns a neutral estimate with no responses", () => {
    expect(estimateTheta([])).toEqual({ theta: 0, information: 0 });
  });

  it("stays finite when every answer is correct", () => {
    const { theta } = estimateTheta(uniform(40, 5, true));
    expect(Number.isFinite(theta)).toBe(true);
    expect(theta).toBeGreaterThan(1);
  });

  it("stays finite when every answer is wrong", () => {
    const { theta } = estimateTheta(uniform(40, 1, false));
    expect(Number.isFinite(theta)).toBe(true);
    expect(theta).toBeLessThan(-1);
  });

  it("ranks a student who solves hard items above one who solves easy ones", () => {
    const strong = estimateTheta(responses([
      [5, true], [5, true], [4, true], [4, true], [5, true], [4, true],
    ]));
    const weak = estimateTheta(responses([
      [1, true], [1, true], [2, true], [2, true], [1, true], [2, true],
    ]));
    expect(strong.theta).toBeGreaterThan(weak.theta);
  });

  it("penalises missing easy items more than missing hard ones", () => {
    const missedEasy = estimateTheta(responses([
      [1, false], [1, false], [3, true], [3, true],
    ]));
    const missedHard = estimateTheta(responses([
      [5, false], [5, false], [3, true], [3, true],
    ]));
    expect(missedEasy.theta).toBeLessThan(missedHard.theta);
  });

  it("gains information as responses accumulate", () => {
    const few = estimateTheta(uniform(5, 3, true));
    const many = estimateTheta(uniform(50, 3, true));
    expect(many.information).toBeGreaterThan(few.information);
  });

  it("prefers the maximum-likelihood point over neighbouring thetas", () => {
    // The MAP estimate should beat nearby values on the penalised likelihood.
    const data = responses([[2, true], [3, true], [4, false], [3, true], [5, false]]);
    const { theta } = estimateTheta(data);
    const logPosterior = (t: number) => {
      let total = -(t * t) / (2 * 1.6 * 1.6);
      for (const r of data) {
        const b = difficultyToLogit(r.difficulty);
        const p = 1 / (1 + Math.exp(-(t - b)));
        total += r.correct ? Math.log(p) : Math.log(1 - p);
      }
      return total;
    };
    expect(logPosterior(theta)).toBeGreaterThan(logPosterior(theta + 0.1));
    expect(logPosterior(theta)).toBeGreaterThan(logPosterior(theta - 0.1));
  });
});

describe("estimateSection", () => {
  it("marks small samples unreliable", () => {
    const estimate = estimateSection(uniform(MIN_ATTEMPTS_FOR_ESTIMATE - 1, 3, true));
    expect(estimate.reliable).toBe(false);
    expect(estimate.quality).toBe("insufficient");
  });

  it("marks adequate samples reliable", () => {
    const estimate = estimateSection(uniform(MIN_ATTEMPTS_FOR_ESTIMATE, 3, true));
    expect(estimate.reliable).toBe(true);
    expect(estimate.quality).not.toBe("insufficient");
  });

  it("reports scores in ten-point increments inside the scale", () => {
    const estimate = estimateSection(uniform(30, 4, true));
    expect(estimate.scaled % 10).toBe(0);
    expect(estimate.scaled).toBeGreaterThanOrEqual(SCALED_MIN);
    expect(estimate.scaled).toBeLessThanOrEqual(SCALED_MAX);
  });

  it("never collapses the confidence band to a point away from the scale ends", () => {
    // Half right at middling difficulty puts theta near zero, so the band sits
    // mid-scale and cannot be narrowed by clamping.
    const mixed: ScoredResponse[] = Array.from({ length: 2000 }, (_, i) => ({
      difficulty: 3,
      correct: i % 2 === 0,
    }));
    const estimate = estimateSection(mixed);
    expect(estimate.scaled).toBeGreaterThan(SCALED_MIN + 100);
    expect(estimate.scaled).toBeLessThan(SCALED_MAX - 100);
    expect(estimate.upper - estimate.lower).toBeGreaterThan(50);
  });

  it("keeps a calibration floor under the standard error at any sample size", () => {
    // Sampling error shrinks with n, but pool-calibration error does not, so
    // the reported error must never fall below the floor.
    for (const n of [12, 100, 1000, 10_000]) {
      const estimate = estimateSection(uniform(n, 3, true));
      expect(estimate.standardErrorPoints).toBeGreaterThanOrEqual(28);
    }
  });

  it("narrows the band as the sample grows", () => {
    const few = estimateSection(uniform(15, 3, true));
    const many = estimateSection(uniform(200, 3, true));
    expect(many.standardErrorPoints).toBeLessThan(few.standardErrorPoints);
  });

  it("keeps the band inside the reportable scale", () => {
    const top = estimateSection(uniform(300, 5, true));
    const bottom = estimateSection(uniform(300, 1, false));
    expect(top.upper).toBeLessThanOrEqual(SCALED_MAX);
    expect(bottom.lower).toBeGreaterThanOrEqual(SCALED_MIN);
  });

  it("computes accuracy from the responses", () => {
    const estimate = estimateSection(responses([
      [3, true], [3, true], [3, false], [3, false],
    ]));
    expect(estimate.accuracy).toBeCloseTo(0.5);
  });

  it("handles an empty section without throwing", () => {
    const estimate = estimateSection([]);
    expect(estimate.sampleSize).toBe(0);
    expect(estimate.reliable).toBe(false);
    expect(Number.isFinite(estimate.scaled)).toBe(true);
  });
});

describe("estimateTotal", () => {
  it("requires both sections to be reliable", () => {
    const estimate = estimateTotal(uniform(40, 3, true), uniform(2, 3, true));
    expect(estimate.reliable).toBe(false);
    expect(estimate.caveat).toContain("Not enough data");
  });

  it("sums the two section scores", () => {
    const estimate = estimateTotal(uniform(40, 4, true), uniform(40, 4, true));
    expect(estimate.total).toBe(
      estimate.readingWriting.scaled + estimate.math.scaled,
    );
  });

  it("adds section errors in quadrature rather than summing them", () => {
    const estimate = estimateTotal(uniform(40, 3, true), uniform(40, 3, true));
    const naiveSum =
      estimate.readingWriting.standardErrorPoints +
      estimate.math.standardErrorPoints;
    const actualHalfWidth = (estimate.upper - estimate.lower) / 2;
    expect(actualHalfWidth).toBeLessThan(1.96 * naiveSum);
  });

  it("stays inside 400-1600", () => {
    const top = estimateTotal(uniform(200, 5, true), uniform(200, 5, true));
    const bottom = estimateTotal(uniform(200, 1, false), uniform(200, 1, false));
    expect(top.upper).toBeLessThanOrEqual(1600);
    expect(bottom.lower).toBeGreaterThanOrEqual(400);
  });

  it("always carries a caveat", () => {
    const estimate = estimateTotal(uniform(40, 3, true), uniform(40, 3, true));
    expect(estimate.caveat.length).toBeGreaterThan(20);
  });
});

describe("rawToScaled", () => {
  it("floors at the bottom of the scale", () => {
    expect(rawToScaled(0, 40)).toBe(SCALED_MIN);
  });

  it("tops out at the ceiling", () => {
    expect(rawToScaled(40, 40)).toBe(SCALED_MAX);
  });

  it("is monotonic in the raw score", () => {
    let previous = -1;
    for (let raw = 0; raw <= 40; raw += 1) {
      const scaled = rawToScaled(raw, 40);
      expect(scaled).toBeGreaterThanOrEqual(previous);
      previous = scaled;
    }
  });

  it("guards against a zero operational count", () => {
    expect(rawToScaled(5, 0)).toBe(SCALED_MIN);
  });

  it("clamps a raw score above the operational count", () => {
    expect(rawToScaled(99, 40)).toBe(SCALED_MAX);
  });
});

describe("gapToTarget", () => {
  it("reports the shortfall", () => {
    expect(gapToTarget(1390, 1550)).toBe(160);
  });

  it("reports zero once the target is met", () => {
    expect(gapToTarget(1570, 1550)).toBe(0);
  });
});
