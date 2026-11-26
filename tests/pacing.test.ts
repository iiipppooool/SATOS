import { describe, expect, it } from "vitest";
import {
  MIN_ATTEMPTS_FOR_PACING,
  analyseSectionPacing,
  analyseSkillPacing,
  median,
  pacingAdvice,
  type TimedAttempt,
} from "@/lib/domain/pacing";
import { computeQuestionShares } from "@/lib/domain/weakness";
import { DOMAINS } from "@/lib/domain/taxonomy";

function attempt(overrides: Partial<TimedAttempt> = {}): TimedAttempt {
  return {
    section: "reading_writing",
    skillId: "transitions",
    skillName: "Transitions",
    totalMs: 60_000,
    expectedSeconds: 60,
    isCorrect: true,
    difficulty: 3,
    ...overrides,
  };
}

function many(count: number, overrides: Partial<TimedAttempt> = {}): TimedAttempt[] {
  return Array.from({ length: count }, () => attempt(overrides));
}

describe("median", () => {
  it("returns the middle value of an odd-length list", () => {
    expect(median([5, 1, 3])).toBe(3);
  });

  it("averages the two middle values of an even-length list", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });

  it("returns zero for an empty list", () => {
    expect(median([])).toBe(0);
  });

  it("is unmoved by a single extreme value, unlike the mean", () => {
    const withOutlier = [50, 55, 60, 65, 100000];
    expect(median(withOutlier)).toBe(60);
  });
});

describe("analyseSectionPacing", () => {
  it("uses the real module budget for the section", () => {
    const rw = analyseSectionPacing(many(20), "reading_writing");
    expect(rw.questionsPerModule).toBe(27);
    expect(rw.minutesPerModule).toBe(32);
    expect(rw.targetSeconds).toBe(71);

    const maths = analyseSectionPacing(many(20, { section: "math" }), "math");
    expect(maths.questionsPerModule).toBe(22);
    expect(maths.minutesPerModule).toBe(35);
    expect(maths.targetSeconds).toBe(95);
  });

  it("reports on pace when comfortably inside the budget", () => {
    const pacing = analyseSectionPacing(many(20, { totalMs: 50_000 }), "reading_writing");
    expect(pacing.verdict).toBe("on_pace");
    expect(pacing.questionsAtRisk).toBe(0);
    expect(pacing.minutesOverBudget).toBeLessThan(0);
  });

  it("reports over when the projected module exceeds the budget", () => {
    // 100s a question over 27 questions is 45 minutes against 32 allowed.
    const pacing = analyseSectionPacing(many(20, { totalMs: 100_000 }), "reading_writing");
    expect(pacing.verdict).toBe("over");
    expect(pacing.minutesOverBudget).toBeGreaterThan(3);
    expect(pacing.questionsAtRisk).toBeGreaterThan(0);
  });

  it("counts unreached questions, which is what actually costs marks", () => {
    // 160s each: only 12 of 27 fit into 1920 seconds, so 15 go unreached.
    const pacing = analyseSectionPacing(many(20, { totalMs: 160_000 }), "reading_writing");
    expect(pacing.questionsAtRisk).toBe(27 - Math.floor(1920 / 160));
  });

  it("uses the median so one long stare does not define the pace", () => {
    const rows = [...many(19, { totalMs: 55_000 }), attempt({ totalMs: 900_000 })];
    const pacing = analyseSectionPacing(rows, "reading_writing");
    expect(pacing.medianSeconds).toBe(55);
    expect(pacing.meanSeconds).toBeGreaterThan(80);
    expect(pacing.verdict).toBe("on_pace");
  });

  it("withholds a verdict until there are enough attempts", () => {
    const pacing = analyseSectionPacing(
      many(MIN_ATTEMPTS_FOR_PACING - 1, { totalMs: 300_000 }),
      "reading_writing",
    );
    expect(pacing.attempts).toBeLessThan(MIN_ATTEMPTS_FOR_PACING);
    expect(pacing.verdict).toBe("on_pace");
  });

  it("ignores attempts from the other section", () => {
    const rows = [...many(10), ...many(10, { section: "math" })];
    expect(analyseSectionPacing(rows, "reading_writing").attempts).toBe(10);
    expect(analyseSectionPacing(rows, "math").attempts).toBe(10);
  });

  it("reports the share of attempts that ran well over their own target", () => {
    const rows = [
      ...many(5, { totalMs: 40_000, expectedSeconds: 60 }),
      ...many(5, { totalMs: 200_000, expectedSeconds: 60 }),
    ];
    expect(analyseSectionPacing(rows, "reading_writing").slowShare).toBeCloseTo(0.5);
  });

  it("handles no attempts without dividing by zero", () => {
    const pacing = analyseSectionPacing([], "math");
    expect(pacing.attempts).toBe(0);
    expect(Number.isFinite(pacing.projectedMinutes)).toBe(true);
    expect(pacing.questionsAtRisk).toBe(0);
  });
});

describe("analyseSkillPacing", () => {
  const shares = computeQuestionShares(DOMAINS);

  it("ignores skills with only one attempt", () => {
    const rows = analyseSkillPacing([attempt()], shares);
    expect(rows).toEqual([]);
  });

  it("ranks by projected cost over a module, not by raw overrun", () => {
    // Transitions carries half of Expression of Ideas, so it appears far more
    // often than Cross-text Connections carries of Craft and Structure.
    const rows = analyseSkillPacing(
      [
        ...many(4, {
          skillId: "transitions",
          skillName: "Transitions",
          totalMs: 90_000,
          expectedSeconds: 60,
        }),
        ...many(4, {
          skillId: "cross-text-connections",
          skillName: "Cross-Text Connections",
          totalMs: 120_000,
          expectedSeconds: 100,
        }),
      ],
      shares,
    );
    expect(rows).toHaveLength(2);
    // Transitions is 30s over and frequent; cross-text is 20s over and rarer.
    expect(rows[0]!.skillId).toBe("transitions");
    expect(rows[0]!.projectedCostSeconds).toBeGreaterThan(rows[1]!.projectedCostSeconds);
  });

  it("reports a ratio against the question's own target", () => {
    const rows = analyseSkillPacing(
      many(4, { totalMs: 120_000, expectedSeconds: 60 }),
      shares,
    );
    expect(rows[0]!.ratio).toBeCloseTo(2);
  });

  it("costs nothing when inside the target", () => {
    const rows = analyseSkillPacing(
      many(4, { totalMs: 30_000, expectedSeconds: 60 }),
      shares,
    );
    expect(rows[0]!.projectedCostSeconds).toBe(0);
  });

  it("reports accuracy alongside pace", () => {
    const rows = analyseSkillPacing(
      [
        ...many(2, { isCorrect: true }),
        ...many(2, { isCorrect: false }),
      ],
      shares,
    );
    expect(rows[0]!.accuracy).toBeCloseTo(0.5);
  });

  it("handles an unknown skill share without producing NaN", () => {
    const rows = analyseSkillPacing(
      many(3, { skillId: "not-a-real-skill", skillName: "Unknown" }),
      new Map(),
    );
    expect(Number.isFinite(rows[0]!.projectedCostSeconds)).toBe(true);
    expect(rows[0]!.projectedCostSeconds).toBe(0);
  });
});

describe("pacingAdvice", () => {
  const shares = computeQuestionShares(DOMAINS);

  it("says so plainly when there is not enough data", () => {
    const pacing = analyseSectionPacing(many(3), "reading_writing");
    expect(pacingAdvice(pacing, [])).toContain("Not enough timed attempts");
  });

  it("tells a fast student that accuracy is the constraint, not pace", () => {
    const pacing = analyseSectionPacing(many(20, { totalMs: 50_000 }), "reading_writing");
    expect(pacingAdvice(pacing, [])).toContain("accuracy");
  });

  it("quantifies the loss in questions when over the budget", () => {
    const pacing = analyseSectionPacing(many(20, { totalMs: 160_000 }), "reading_writing");
    const advice = pacingAdvice(pacing, []);
    expect(advice).toMatch(/unreached/);
    expect(advice).toMatch(/marks lost/);
  });

  it("names the skills responsible when it can", () => {
    const rows = many(20, {
      skillId: "transitions",
      skillName: "Transitions",
      totalMs: 160_000,
      expectedSeconds: 60,
    });
    const pacing = analyseSectionPacing(rows, "reading_writing");
    const skills = analyseSkillPacing(rows, shares);
    expect(pacingAdvice(pacing, skills)).toContain("Transitions");
  });

  it("never mentions a skill from the other section", () => {
    const rwRows = many(20, { totalMs: 160_000 });
    const pacing = analyseSectionPacing(rwRows, "reading_writing");
    const mathSkills = analyseSkillPacing(
      many(4, {
        section: "math",
        skillId: "circles",
        skillName: "Circles",
        totalMs: 200_000,
        expectedSeconds: 60,
      }),
      shares,
    );
    expect(pacingAdvice(pacing, mathSkills)).not.toContain("Circles");
  });
});
