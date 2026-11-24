import { describe, expect, it } from "vitest";
import {
  INITIAL_STATE,
  clampToTestDate,
  computeMastery,
  deriveGrade,
  schedule,
  updateRecentAccuracy,
  updateRunningMean,
} from "@/lib/domain/scheduling";

const DAY = 86_400_000;

describe("deriveGrade", () => {
  it("scores a confidently wrong answer worst of all", () => {
    const confident = deriveGrade({ correct: false, totalMs: 5000, expectedSeconds: 60, confidence: "confident" });
    const guessed = deriveGrade({ correct: false, totalMs: 5000, expectedSeconds: 60, confidence: "guess" });
    expect(confident).toBeLessThan(guessed);
    expect(confident).toBe(0);
  });

  it("treats every wrong answer as a lapse", () => {
    for (const confidence of ["guess", "unsure", "confident", null] as const) {
      expect(deriveGrade({ correct: false, totalMs: 1000, expectedSeconds: 60, confidence })).toBeLessThan(3);
    }
  });

  it("rewards a fast correct answer", () => {
    const fast = deriveGrade({ correct: true, totalMs: 30_000, expectedSeconds: 60 });
    const slow = deriveGrade({ correct: true, totalMs: 200_000, expectedSeconds: 60 });
    expect(fast).toBeGreaterThan(slow);
    expect(fast).toBe(5);
  });

  it("does not treat right-but-very-slow as mastery", () => {
    const grade = deriveGrade({ correct: true, totalMs: 300_000, expectedSeconds: 60 });
    expect(grade).toBeLessThanOrEqual(3);
  });

  it("rewards recognising the pattern first", () => {
    const recognised = deriveGrade({ correct: true, totalMs: 60_000, expectedSeconds: 60, patternGuessCorrect: true });
    const notRecognised = deriveGrade({ correct: true, totalMs: 60_000, expectedSeconds: 60, patternGuessCorrect: false });
    expect(recognised).toBeGreaterThan(notRecognised);
  });

  it("downgrades a correct answer that was a guess", () => {
    const guessed = deriveGrade({ correct: true, totalMs: 60_000, expectedSeconds: 60, confidence: "guess" });
    const confident = deriveGrade({ correct: true, totalMs: 60_000, expectedSeconds: 60, confidence: "confident" });
    expect(guessed).toBeLessThan(confident);
  });

  it("stays within the 0-5 range in all combinations", () => {
    for (const correct of [true, false]) {
      for (const ms of [1, 1000, 60_000, 10_000_000]) {
        for (const pattern of [true, false, null]) {
          for (const confidence of ["guess", "unsure", "confident", null] as const) {
            const grade = deriveGrade({
              correct, totalMs: ms, expectedSeconds: 60,
              patternGuessCorrect: pattern, confidence,
            });
            expect(grade).toBeGreaterThanOrEqual(0);
            expect(grade).toBeLessThanOrEqual(5);
          }
        }
      }
    }
  });

  it("does not divide by zero on a nonsense expected time", () => {
    const grade = deriveGrade({ correct: true, totalMs: 1000, expectedSeconds: 0 });
    expect(Number.isFinite(grade)).toBe(true);
  });
});

describe("schedule", () => {
  const now = new Date("2026-11-24T09:00:00Z");

  it("expands the interval across successful repetitions", () => {
    let state = INITIAL_STATE;
    const intervals: number[] = [];
    for (let i = 0; i < 5; i += 1) {
      const result = schedule(state, 5, now);
      intervals.push(result.intervalDays);
      state = result;
    }
    expect(intervals[0]).toBe(1);
    expect(intervals[1]).toBe(3);
    for (let i = 2; i < intervals.length; i += 1) {
      expect(intervals[i]!).toBeGreaterThan(intervals[i - 1]!);
    }
  });

  it("brings a lapsed card back the same day", () => {
    const state = { intervalDays: 30, easeFactor: 2.5, repetitions: 4, lapses: 0 };
    const result = schedule(state, 1, now);
    expect(result.lapsed).toBe(true);
    expect(result.intervalDays).toBeLessThan(1);
    expect(result.repetitions).toBe(0);
    expect(result.lapses).toBe(1);
  });

  it("keeps the ease factor inside its bounds", () => {
    let state = INITIAL_STATE;
    for (let i = 0; i < 40; i += 1) state = schedule(state, 0, now);
    expect(state.easeFactor).toBeGreaterThanOrEqual(1.3);

    let good = INITIAL_STATE;
    for (let i = 0; i < 40; i += 1) good = schedule(good, 5, now);
    expect(good.easeFactor).toBeLessThanOrEqual(2.8);
  });

  it("caps the interval so nothing vanishes for months", () => {
    let state = INITIAL_STATE;
    for (let i = 0; i < 40; i += 1) state = schedule(state, 5, now);
    expect(state.intervalDays).toBeLessThanOrEqual(120);
  });

  it("sets dueAt consistently with the interval", () => {
    const result = schedule(INITIAL_STATE, 5, now);
    const expected = now.getTime() + result.intervalDays * DAY;
    expect(result.dueAt.getTime()).toBe(expected);
  });
});

describe("clampToTestDate", () => {
  const now = new Date("2026-11-24T09:00:00Z");

  it("compresses intervals that overshoot the test", () => {
    const testDate = new Date(now.getTime() + 20 * DAY);
    const result = schedule({ intervalDays: 60, easeFactor: 2.5, repetitions: 5, lapses: 0 }, 5, now);
    const clamped = clampToTestDate(result, testDate, now);
    expect(clamped.intervalDays).toBeLessThanOrEqual(10);
    expect(clamped.dueAt.getTime()).toBeLessThan(testDate.getTime());
  });

  it("leaves short intervals untouched", () => {
    const testDate = new Date(now.getTime() + 90 * DAY);
    const result = schedule(INITIAL_STATE, 5, now);
    expect(clampToTestDate(result, testDate, now)).toEqual(result);
  });

  it("is a no-op without a test date", () => {
    const result = schedule(INITIAL_STATE, 5, now);
    expect(clampToTestDate(result, null, now)).toEqual(result);
  });

  it("is a no-op once the test date has passed", () => {
    const result = schedule(INITIAL_STATE, 5, now);
    const past = new Date(now.getTime() - DAY);
    expect(clampToTestDate(result, past, now)).toEqual(result);
  });
});

describe("updateRecentAccuracy", () => {
  it("returns the first observation outright", () => {
    expect(updateRecentAccuracy(0, true, 1)).toBe(1);
    expect(updateRecentAccuracy(0, false, 1)).toBe(0);
  });

  it("moves towards recent performance", () => {
    let accuracy = 0.2;
    for (let i = 0; i < 20; i += 1) accuracy = updateRecentAccuracy(accuracy, true, i + 2);
    expect(accuracy).toBeGreaterThan(0.7);
  });

  it("stays inside 0..1", () => {
    let accuracy = 0.5;
    for (let i = 0; i < 100; i += 1) {
      accuracy = updateRecentAccuracy(accuracy, i % 3 === 0, i + 2);
      expect(accuracy).toBeGreaterThanOrEqual(0);
      expect(accuracy).toBeLessThanOrEqual(1);
    }
  });

  it("reacts faster than a lifetime average would", () => {
    // 10 wrong then 10 right: weighted accuracy should exceed the plain 50%.
    let weighted = 0;
    let count = 1;
    for (let i = 0; i < 10; i += 1) weighted = updateRecentAccuracy(weighted, false, count++);
    for (let i = 0; i < 10; i += 1) weighted = updateRecentAccuracy(weighted, true, count++);
    expect(weighted).toBeGreaterThan(0.5);
  });
});

describe("updateRunningMean", () => {
  it("matches a plain average", () => {
    const values = [10, 20, 30, 40];
    let mean = 0;
    values.forEach((v, i) => {
      mean = updateRunningMean(mean, i, v);
    });
    expect(mean).toBeCloseTo(25);
  });

  it("returns the value on the first observation", () => {
    expect(updateRunningMean(0, 0, 42)).toBe(42);
  });
});

describe("computeMastery", () => {
  const base = {
    recentAccuracy: 0.9,
    attempts: 20,
    avgSolveMs: 60_000,
    expectedMs: 75_000,
    patternHitRate: 0.8,
  };

  it("is zero with no attempts", () => {
    expect(computeMastery({ ...base, attempts: 0 })).toBe(0);
  });

  it("holds the ceiling down until there is evidence", () => {
    const thin = computeMastery({ ...base, attempts: 3 });
    const thick = computeMastery({ ...base, attempts: 20 });
    expect(thin).toBeLessThan(thick);
  });

  it("penalises being slow even at full accuracy", () => {
    const fast = computeMastery({ ...base, recentAccuracy: 1, avgSolveMs: 40_000 });
    const slow = computeMastery({ ...base, recentAccuracy: 1, avgSolveMs: 200_000 });
    expect(slow).toBeLessThan(fast);
  });

  it("rewards pattern recognition", () => {
    const recognises = computeMastery({ ...base, patternHitRate: 1 });
    const doesNot = computeMastery({ ...base, patternHitRate: 0 });
    expect(recognises).toBeGreaterThan(doesNot);
  });

  it("stays within 0..100", () => {
    const max = computeMastery({
      recentAccuracy: 1, attempts: 500, avgSolveMs: 1, expectedMs: 75_000, patternHitRate: 1,
    });
    const min = computeMastery({
      recentAccuracy: 0, attempts: 500, avgSolveMs: 999_999, expectedMs: 75_000, patternHitRate: 0,
    });
    expect(max).toBeLessThanOrEqual(100);
    expect(min).toBeGreaterThanOrEqual(0);
  });

  it("does not divide by zero on missing timing data", () => {
    const value = computeMastery({ ...base, avgSolveMs: 0, expectedMs: 0 });
    expect(Number.isFinite(value)).toBe(true);
  });
});
