import { describe, expect, it } from "vitest";
import {
  DEFAULT_ROUTING_THRESHOLD,
  isExpired,
  isFirstModule,
  pace,
  pairedFirstModule,
  planFirstModules,
  planSecondModule,
  remainingSeconds,
  routeSecondModule,
  scoreExam,
  slotsForShape,
  type ModuleResult,
} from "@/lib/domain/exam";
import { EXAM_BLUEPRINT, operationalCount, sectionDurationSec } from "@/lib/domain/taxonomy";

describe("slotsForShape", () => {
  it("returns four modules for a full exam", () => {
    expect(slotsForShape("full")).toEqual(["rw1", "rw2", "math1", "math2"]);
  });

  it("returns section-only shapes", () => {
    expect(slotsForShape("rw_only")).toEqual(["rw1", "rw2"]);
    expect(slotsForShape("math_only")).toEqual(["math1", "math2"]);
  });

  it("returns one module for a single-module run", () => {
    expect(slotsForShape("single_module")).toHaveLength(1);
  });
});

describe("module relationships", () => {
  it("knows which slots are first modules", () => {
    expect(isFirstModule("rw1")).toBe(true);
    expect(isFirstModule("math1")).toBe(true);
    expect(isFirstModule("rw2")).toBe(false);
    expect(isFirstModule("math2")).toBe(false);
  });

  it("pairs second modules back to their router", () => {
    expect(pairedFirstModule("rw2")).toBe("rw1");
    expect(pairedFirstModule("math2")).toBe("math1");
    expect(pairedFirstModule("rw1")).toBeNull();
  });
});

describe("blueprint", () => {
  it("matches the published shape of the digital SAT", () => {
    expect(EXAM_BLUEPRINT).toHaveLength(4);
    const totalQuestions = EXAM_BLUEPRINT.reduce((s, m) => s + m.questionCount, 0);
    expect(totalQuestions).toBe(98);
  });

  it("counts operational questions excluding pretest items", () => {
    expect(operationalCount("reading_writing")).toBe(50);
    expect(operationalCount("math")).toBe(40);
  });

  it("totals 64 minutes for Reading and Writing and 70 for Maths", () => {
    expect(sectionDurationSec("reading_writing")).toBe(64 * 60);
    expect(sectionDurationSec("math")).toBe(70 * 60);
  });
});

describe("planFirstModules", () => {
  it("plans only the routing modules", () => {
    const modules = planFirstModules("full");
    expect(modules).toHaveLength(2);
    expect(modules.every((m) => m.tier === "routing")).toBe(true);
  });

  it("distributes a difficulty mix summing to the question count", () => {
    for (const plan of planFirstModules("full")) {
      const total = Object.values(plan.difficultyMix).reduce((a, b) => a + b, 0);
      expect(total).toBe(plan.questionCount);
    }
  });

  it("includes type-in questions in Maths only", () => {
    const modules = planFirstModules("full");
    const math = modules.find((m) => m.section === "math")!;
    const rw = modules.find((m) => m.section === "reading_writing")!;
    expect(math.sprCount).toBeGreaterThan(0);
    expect(rw.sprCount).toBe(0);
  });
});

describe("routeSecondModule", () => {
  it("routes strong performance to the hard module", () => {
    expect(routeSecondModule(24, 27)).toBe("hard");
  });

  it("routes weak performance to the easy module", () => {
    expect(routeSecondModule(10, 27)).toBe("easy");
  });

  it("routes exactly at the threshold to the hard module", () => {
    expect(routeSecondModule(18, 27, 2 / 3)).toBe("hard");
  });

  it("accepts a custom threshold", () => {
    expect(routeSecondModule(14, 27, 0.5)).toBe("hard");
    expect(routeSecondModule(14, 27, 0.9)).toBe("easy");
  });

  it("does not divide by zero", () => {
    expect(routeSecondModule(0, 0)).toBe("easy");
  });

  it("uses two-thirds by default", () => {
    expect(DEFAULT_ROUTING_THRESHOLD).toBeCloseTo(2 / 3);
  });
});

describe("planSecondModule", () => {
  it("plans a harder second module with more hard questions", () => {
    const hard = planSecondModule("math1", "hard")!;
    const easy = planSecondModule("math1", "easy")!;
    expect(hard.difficultyMix[5]!).toBeGreaterThan(easy.difficultyMix[5]!);
    expect(easy.difficultyMix[1]!).toBeGreaterThan(hard.difficultyMix[1]!);
  });

  it("returns the matching slot", () => {
    expect(planSecondModule("rw1", "hard")!.slot).toBe("rw2");
    expect(planSecondModule("math1", "easy")!.slot).toBe("math2");
  });

  it("returns null when given a second module", () => {
    expect(planSecondModule("rw2", "hard")).toBeNull();
  });
});

describe("scoreExam", () => {
  const full = (rw1: number, rw2: number, m1: number, m2: number, tier: "easy" | "hard"): ModuleResult[] => [
    { slot: "rw1", section: "reading_writing", tier: "routing", rawCorrect: rw1, questionCount: 27 },
    { slot: "rw2", section: "reading_writing", tier, rawCorrect: rw2, questionCount: 27 },
    { slot: "math1", section: "math", tier: "routing", rawCorrect: m1, questionCount: 22 },
    { slot: "math2", section: "math", tier, rawCorrect: m2, questionCount: 22 },
  ];

  it("caps a section routed to the easy module", () => {
    const score = scoreExam(full(20, 27, 16, 22, "easy"));
    expect(score.rwScaled).toBeLessThanOrEqual(650);
    expect(score.mathScaled).toBeLessThanOrEqual(650);
  });

  it("lets the hard route reach the top of the scale", () => {
    const score = scoreExam(full(27, 27, 22, 22, "hard"));
    expect(score.rwScaled).toBe(800);
    expect(score.mathScaled).toBe(800);
    expect(score.total).toBe(1600);
  });

  it("scores the same raw total higher on the hard route", () => {
    const easy = scoreExam(full(18, 18, 15, 15, "easy"));
    const hard = scoreExam(full(18, 18, 15, 15, "hard"));
    expect(hard.rwScaled!).toBeGreaterThan(easy.rwScaled!);
  });

  it("sums the raw marks across both modules", () => {
    const score = scoreExam(full(20, 21, 15, 16, "hard"));
    expect(score.rwRaw).toBe(41);
    expect(score.mathRaw).toBe(31);
  });

  it("returns null scores for a section that was not attempted", () => {
    const score = scoreExam([
      { slot: "rw1", section: "reading_writing", tier: "routing", rawCorrect: 20, questionCount: 27 },
      { slot: "rw2", section: "reading_writing", tier: "hard", rawCorrect: 20, questionCount: 27 },
    ]);
    expect(score.mathScaled).toBeNull();
    expect(score.total).toBeNull();
  });

  it("handles a single routing module with no second module", () => {
    const score = scoreExam([
      { slot: "rw1", section: "reading_writing", tier: "routing", rawCorrect: 20, questionCount: 27 },
    ]);
    expect(score.rwScaled).not.toBeNull();
  });

  it("stays within the reportable scale", () => {
    const score = scoreExam(full(0, 0, 0, 0, "easy"));
    expect(score.rwScaled!).toBeGreaterThanOrEqual(200);
    expect(score.mathScaled!).toBeGreaterThanOrEqual(200);
  });

  it("always reports its own limitations", () => {
    expect(scoreExam(full(20, 20, 15, 15, "hard")).caveat).toContain("Simulator estimate");
  });

  it("handles an empty module list", () => {
    const score = scoreExam([]);
    expect(score.total).toBeNull();
    expect(score.rwRaw).toBe(0);
  });
});

describe("timing", () => {
  const startedAt = new Date("2026-11-24T10:00:00Z");

  it("counts down", () => {
    expect(remainingSeconds({
      durationSec: 1920, startedAt, now: new Date("2026-11-24T10:10:00Z"),
    })).toBe(1320);
  });

  it("never goes negative", () => {
    expect(remainingSeconds({
      durationSec: 60, startedAt, now: new Date("2026-11-24T11:00:00Z"),
    })).toBe(0);
  });

  it("reports expiry", () => {
    expect(isExpired({ durationSec: 60, startedAt, now: new Date("2026-11-24T10:00:30Z") })).toBe(false);
    expect(isExpired({ durationSec: 60, startedAt, now: new Date("2026-11-24T10:01:00Z") })).toBe(true);
  });

  it("computes a per-question pace", () => {
    expect(pace(27, 32 * 60)).toBe(71);
    expect(pace(22, 35 * 60)).toBe(95);
    expect(pace(0, 1920)).toBe(0);
  });
});
