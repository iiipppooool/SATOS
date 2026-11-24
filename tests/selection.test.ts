import { describe, expect, it } from "vitest";
import {
  interleave,
  selectQuestions,
  thetaToDifficulty,
  type CandidateQuestion,
  type SelectionWeights,
} from "@/lib/domain/selection";
import type { Section } from "@/lib/domain/enums";

const NOW = new Date("2026-11-24T10:00:00Z");
const DAY = 86_400_000;

function question(overrides: Partial<CandidateQuestion> = {}): CandidateQuestion {
  return {
    id: Math.random().toString(36).slice(2),
    skillId: "skill-a",
    section: "math",
    difficulty: 3,
    calibratedDifficulty: null,
    timesSeen: 0,
    dueAt: null,
    lastAttemptedAt: null,
    lastAttemptCorrect: null,
    ...overrides,
  };
}

function weights(ability = 3, priority: Record<string, number> = {}): SelectionWeights {
  const abilityBySection = new Map<Section, number>([
    ["math", ability],
    ["reading_writing", ability],
  ]);
  return { skillPriority: new Map(Object.entries(priority)), abilityBySection };
}

function pool(count: number, overrides: Partial<CandidateQuestion> = {}): CandidateQuestion[] {
  return Array.from({ length: count }, (_, i) =>
    question({ id: `q${i}-${overrides.skillId ?? "a"}`, ...overrides }),
  );
}

describe("selectQuestions", () => {
  it("returns the requested number when the pool allows", () => {
    const candidates = [
      ...pool(10, { skillId: "s1" }),
      ...pool(10, { skillId: "s2" }),
      ...pool(10, { skillId: "s3" }),
    ];
    const selected = selectQuestions(candidates, weights(), { count: 9, now: NOW });
    expect(selected).toHaveLength(9);
  });

  it("never returns more than the pool holds", () => {
    const selected = selectQuestions(pool(4), weights(), { count: 20, now: NOW });
    expect(selected.length).toBeLessThanOrEqual(4);
  });

  it("returns nothing from an empty pool", () => {
    expect(selectQuestions([], weights(), { count: 10, now: NOW })).toEqual([]);
  });

  it("filters by section", () => {
    const candidates = [
      ...pool(6, { skillId: "m", section: "math" }),
      ...pool(6, { skillId: "r", section: "reading_writing" }),
    ];
    const selected = selectQuestions(candidates, weights(), {
      count: 6, section: "math", now: NOW,
    });
    expect(selected.every((s) => s.question.section === "math")).toBe(true);
  });

  it("filters by skill", () => {
    const candidates = [...pool(6, { skillId: "wanted" }), ...pool(6, { skillId: "other" })];
    const selected = selectQuestions(candidates, weights(), {
      count: 6, skillIds: ["wanted"], now: NOW,
    });
    expect(selected.every((s) => s.question.skillId === "wanted")).toBe(true);
  });

  it("respects a difficulty window", () => {
    const candidates = [1, 2, 3, 4, 5].flatMap((d) =>
      pool(4, { difficulty: d, skillId: `d${d}` }),
    );
    const selected = selectQuestions(candidates, weights(), {
      count: 8, difficultyRange: [4, 5], now: NOW,
    });
    expect(selected.every((s) => s.question.difficulty >= 4)).toBe(true);
  });

  it("prefers calibrated difficulty over the authored value when filtering", () => {
    const candidates = pool(6, { difficulty: 1, calibratedDifficulty: 5, skillId: "x" });
    const selected = selectQuestions(candidates, weights(), {
      count: 3, difficultyRange: [4, 5], now: NOW,
    });
    expect(selected).toHaveLength(3);
  });

  it("puts due review cards ahead of fresh questions", () => {
    const candidates = [
      ...pool(5, { skillId: "fresh" }),
      ...pool(5, { skillId: "due", dueAt: new Date(NOW.getTime() - 2 * DAY) }),
    ];
    const selected = selectQuestions(candidates, weights(), {
      count: 6, reviewShare: 0.5, now: NOW,
    });
    expect(selected.filter((s) => s.kind === "review").length).toBeGreaterThanOrEqual(3);
  });

  it("honours the cooldown on recently attempted questions", () => {
    const candidates = pool(6, {
      skillId: "recent",
      lastAttemptedAt: new Date(NOW.getTime() - 3600_000),
    });
    const selected = selectQuestions(candidates, weights(), {
      count: 6, cooldownHours: 18, now: NOW,
    });
    expect(selected).toHaveLength(0);
  });

  it("ignores the cooldown for cards that are due", () => {
    const candidates = pool(6, {
      skillId: "recent",
      lastAttemptedAt: new Date(NOW.getTime() - 3600_000),
      dueAt: new Date(NOW.getTime() - 1000),
    });
    const selected = selectQuestions(candidates, weights(), {
      count: 3, cooldownHours: 18, now: NOW,
    });
    expect(selected).toHaveLength(3);
  });

  it("aims difficulty near, and slightly above, current ability", () => {
    const candidates = [1, 2, 3, 4, 5].flatMap((d) =>
      pool(8, { difficulty: d, skillId: `d${d}` }),
    );
    const selected = selectQuestions(candidates, weights(2), { count: 10, now: NOW });
    const mean =
      selected.reduce((sum, s) => sum + s.question.difficulty, 0) / selected.length;
    expect(mean).toBeGreaterThan(1.5);
    expect(mean).toBeLessThan(3.6);
  });

  it("weights high-priority skills more heavily", () => {
    const candidates = [...pool(10, { skillId: "urgent" }), ...pool(10, { skillId: "calm" })];
    const selected = selectQuestions(
      candidates,
      weights(3, { urgent: 60 }),
      { count: 6, maxPerSkill: 6, now: NOW },
    );
    const urgent = selected.filter((s) => s.question.skillId === "urgent").length;
    expect(urgent).toBeGreaterThan(selected.length / 2);
  });

  it("favours questions previously answered wrong", () => {
    const candidates = [
      ...pool(8, { skillId: "wrong", lastAttemptCorrect: false, lastAttemptedAt: new Date(NOW.getTime() - 5 * DAY) }),
      ...pool(8, { skillId: "unseen" }),
    ];
    const selected = selectQuestions(candidates, weights(), { count: 6, maxPerSkill: 6, now: NOW });
    expect(selected.filter((s) => s.question.lastAttemptCorrect === false).length).toBeGreaterThan(0);
  });

  it("caps questions per skill so one topic cannot fill the session", () => {
    const candidates = [
      ...pool(20, { skillId: "a" }),
      ...pool(20, { skillId: "b" }),
      ...pool(20, { skillId: "c" }),
    ];
    const selected = selectQuestions(candidates, weights(), {
      count: 9, maxPerSkill: 3, now: NOW,
    });
    const counts = new Map<string, number>();
    for (const s of selected) {
      counts.set(s.question.skillId, (counts.get(s.question.skillId) ?? 0) + 1);
    }
    for (const count of counts.values()) expect(count).toBeLessThanOrEqual(3);
  });

  it("relaxes the per-skill cap rather than returning a short session", () => {
    const candidates = pool(20, { skillId: "only" });
    const selected = selectQuestions(candidates, weights(), {
      count: 10, maxPerSkill: 3, now: NOW,
    });
    expect(selected).toHaveLength(10);
  });

  it("never returns the same question twice", () => {
    const candidates = [...pool(10, { skillId: "a" }), ...pool(10, { skillId: "b" })];
    const selected = selectQuestions(candidates, weights(), { count: 15, now: NOW });
    const ids = selected.map((s) => s.question.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("interleave", () => {
  it("keeps every item", () => {
    const items = [
      ...pool(3, { skillId: "a" }),
      ...pool(3, { skillId: "b" }),
    ].map((question) => ({ question, score: 1, kind: "fresh" as const }));
    expect(interleave(items)).toHaveLength(6);
  });

  it("avoids long runs of the same skill", () => {
    const items = [
      ...pool(4, { skillId: "a" }),
      ...pool(4, { skillId: "b" }),
    ].map((question) => ({ question, score: 1, kind: "fresh" as const }));
    const order = interleave(items).map((i) => i.question.skillId);
    let longestRun = 1;
    let run = 1;
    for (let i = 1; i < order.length; i += 1) {
      run = order[i] === order[i - 1] ? run + 1 : 1;
      longestRun = Math.max(longestRun, run);
    }
    expect(longestRun).toBeLessThanOrEqual(2);
  });

  it("handles a single skill without looping forever", () => {
    const items = pool(5, { skillId: "solo" }).map((question) => ({
      question, score: 1, kind: "fresh" as const,
    }));
    expect(interleave(items)).toHaveLength(5);
  });

  it("handles an empty list", () => {
    expect(interleave([])).toEqual([]);
  });
});

describe("thetaToDifficulty", () => {
  it("maps theta 0 to the middle of the scale", () => {
    expect(thetaToDifficulty(0)).toBeCloseTo(3);
  });

  it("stays within 1..5", () => {
    expect(thetaToDifficulty(-99)).toBe(1);
    expect(thetaToDifficulty(99)).toBe(5);
  });

  it("is monotonic", () => {
    expect(thetaToDifficulty(-1)).toBeLessThan(thetaToDifficulty(1));
  });
});
