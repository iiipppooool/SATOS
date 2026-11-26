import { describe, expect, it } from "vitest";
import {
  classifyInterval,
  daysBetween,
  generatePlan,
  type PlanInput,
} from "@/lib/domain/plan";
import type { Section } from "@/lib/domain/enums";

const DAY = 86_400_000;
const START = new Date("2026-11-24T00:00:00Z");

function skills(count: number): Array<{ skillId: string; skillName: string; section: Section }> {
  return Array.from({ length: count }, (_, i) => ({
    skillId: `skill-${i}`,
    skillName: `Skill ${i}`,
    section: i % 2 === 0 ? "math" : "reading_writing",
  }));
}

function input(days: number, overrides: Partial<PlanInput> = {}): PlanInput {
  return {
    startDate: START,
    testDate: new Date(START.getTime() + days * DAY),
    daysPerWeek: 6,
    minutesPerDay: 105,
    targetScore: 1550,
    prioritySkills: skills(6),
    ...overrides,
  };
}

describe("daysBetween", () => {
  it("counts whole days", () => {
    expect(daysBetween(new Date("2026-11-24T23:00:00Z"), new Date("2026-12-05T01:00:00Z"))).toBe(11);
  });

  it("returns zero for the same day regardless of time", () => {
    expect(daysBetween(new Date("2026-11-24T01:00:00Z"), new Date("2026-11-24T23:00:00Z"))).toBe(0);
  });

  it("goes negative for a past date", () => {
    expect(daysBetween(new Date("2026-11-24T00:00:00Z"), new Date("2026-11-20T00:00:00Z"))).toBe(-4);
  });
});

describe("classifyInterval", () => {
  it("classifies by length", () => {
    expect(classifyInterval(11)).toBe("sprint");
    expect(classifyInterval(30)).toBe("short");
    expect(classifyInterval(60)).toBe("standard");
    expect(classifyInterval(120)).toBe("long");
  });

  it("puts the real December window in the sprint band", () => {
    // 24 Nov 2026 to the early-December sitting is about 11 days.
    expect(classifyInterval(daysBetween(START, new Date("2026-12-05T00:00:00Z")))).toBe("sprint");
  });
});

describe("generatePlan", () => {
  it("covers every day up to the test", () => {
    const plan = generatePlan(input(30));
    expect(plan.days).toHaveLength(30);
    expect(plan.totalDays).toBe(30);
  });

  it("works for an 11-day window without inventing time", () => {
    const plan = generatePlan(input(11));
    expect(plan.days).toHaveLength(11);
    expect(plan.phase).toBe("sprint");
    expect(plan.note).toContain("timed practice");
  });

  it("does not crash on a single day", () => {
    const plan = generatePlan(input(1));
    expect(plan.days).toHaveLength(1);
  });

  it("handles a test date in the past by producing at least one day", () => {
    const plan = generatePlan(input(-5));
    expect(plan.days.length).toBeGreaterThanOrEqual(1);
  });

  it("gives the requested number of study days per week", () => {
    for (const perWeek of [3, 5, 6, 7]) {
      const plan = generatePlan(input(28, { daysPerWeek: perWeek }));
      const studyDays = plan.days.filter((d) => d.focus !== "rest").length;
      expect(studyDays).toBe(perWeek * 4);
    }
  });

  it("assigns rest days no work", () => {
    const plan = generatePlan(input(28, { daysPerWeek: 5 }));
    for (const day of plan.days.filter((d) => d.focus === "rest")) {
      expect(day.assignments).toHaveLength(0);
      expect(day.targetMinutes).toBe(0);
    }
  });

  it("gives every study day at least one assignment", () => {
    const plan = generatePlan(input(45));
    for (const day of plan.days.filter((d) => d.focus !== "rest")) {
      expect(day.assignments.length).toBeGreaterThan(0);
      expect(day.targetMinutes).toBeGreaterThan(0);
    }
  });

  it("opens a long plan with a diagnostic exam", () => {
    const plan = generatePlan(input(84));
    const firstStudyDay = plan.days.find((d) => d.focus !== "rest")!;
    expect(firstStudyDay.focus).toBe("full_exam");
  });

  it("schedules at least one full exam when there is room", () => {
    expect(generatePlan(input(60)).fullExams).toBeGreaterThan(0);
  });

  it("never schedules a full exam in the final two days", () => {
    const plan = generatePlan(input(45));
    const lastTwo = plan.days.slice(-2);
    for (const day of lastTwo) {
      expect(day.focus).not.toBe("full_exam");
    }
  });

  it("tapers at the end rather than cramming", () => {
    const plan = generatePlan(input(45));
    const finalDay = plan.days[plan.days.length - 1]!;
    if (finalDay.focus !== "rest") {
      expect(["review", "final_review"]).toContain(finalDay.focus);
      expect(finalDay.targetMinutes).toBeLessThan(105);
    }
  });

  it("spends proportionally more of a sprint on timed work than a long plan", () => {
    const sprint = generatePlan(input(12));
    const long = generatePlan(input(120));
    const timedShare = (p: ReturnType<typeof generatePlan>) => {
      const study = p.days.filter((d) => d.focus !== "rest");
      const timed = study.filter((d) => d.focus === "module_exam" || d.focus === "full_exam");
      return timed.length / study.length;
    };
    expect(timedShare(sprint)).toBeGreaterThan(timedShare(long));
  });

  it("rotates through the priority skills instead of repeating the first", () => {
    const plan = generatePlan(input(60, { prioritySkills: skills(5) }));
    const used = new Set(
      plan.days.flatMap((d) => d.assignments.map((a) => a.skillId)).filter(Boolean),
    );
    expect(used.size).toBeGreaterThan(1);
  });

  it("works with no priority skills supplied", () => {
    const plan = generatePlan(input(30, { prioritySkills: [] }));
    expect(plan.days.filter((d) => d.focus !== "rest").length).toBeGreaterThan(0);
  });

  it("keeps daily minutes near the requested budget on ordinary days", () => {
    const plan = generatePlan(input(45, { minutesPerDay: 90 }));
    const ordinary = plan.days.filter(
      (d) => d.focus === "drill" || d.focus === "mixed",
    );
    for (const day of ordinary) {
      expect(day.targetMinutes).toBe(90);
      const sum = day.assignments.reduce((t, a) => t + a.targetMinutes, 0);
      expect(sum).toBeGreaterThan(70);
      expect(sum).toBeLessThan(115);
    }
  });

  it("numbers weeks and days consistently", () => {
    const plan = generatePlan(input(21));
    plan.days.forEach((day, index) => {
      expect(day.dayIndex).toBe(index);
      expect(day.weekIndex).toBe(Math.floor(index / 7));
    });
  });

  it("orders assignments within a day", () => {
    const plan = generatePlan(input(45));
    for (const day of plan.days) {
      day.assignments.forEach((a, i) => expect(a.order).toBe(i));
    }
  });

  it("produces dates in ascending order starting at the start date", () => {
    const plan = generatePlan(input(30));
    expect(plan.days[0]!.date.getTime()).toBe(START.getTime());
    for (let i = 1; i < plan.days.length; i += 1) {
      expect(plan.days[i]!.date.getTime()).toBeGreaterThan(plan.days[i - 1]!.date.getTime());
    }
  });

  it("warns honestly that a sprint will not transform a score", () => {
    expect(generatePlan(input(10)).note).toMatch(/hold your score|sharpen/i);
  });
});
