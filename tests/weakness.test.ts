import { describe, expect, it } from "vitest";
import {
  computeQuestionShares,
  rankWeaknesses,
  requiredAccuracyForTarget,
  summariseBySection,
  type SkillStat,
} from "@/lib/domain/weakness";
import { DOMAINS } from "@/lib/domain/taxonomy";

function stat(overrides: Partial<SkillStat> = {}): SkillStat {
  return {
    skillId: "skill-a",
    skillName: "Skill A",
    domainId: "algebra",
    domainName: "Algebra",
    section: "math",
    questionShare: 0.07,
    attempts: 20,
    recentAccuracy: 0.8,
    mastery: 60,
    avgSolveMs: 70_000,
    expectedMs: 75_000,
    patternHitRate: 0.7,
    openErrors: 0,
    lastSeenAt: null,
    ...overrides,
  };
}

describe("requiredAccuracyForTarget", () => {
  it("demands more accuracy for a higher target", () => {
    expect(requiredAccuracyForTarget(1550)).toBeGreaterThan(requiredAccuracyForTarget(1300));
  });

  it("stays a probability", () => {
    for (const target of [400, 800, 1200, 1550, 1600]) {
      const required = requiredAccuracyForTarget(target);
      expect(required).toBeGreaterThanOrEqual(0);
      expect(required).toBeLessThanOrEqual(1);
    }
  });

  it("asks for near-perfection at 1550+", () => {
    expect(requiredAccuracyForTarget(1550)).toBeGreaterThan(0.85);
  });
});

describe("rankWeaknesses", () => {
  it("puts the bigger score opportunity first, not the lower accuracy", () => {
    // A slightly weak skill carrying many questions should outrank a very weak
    // skill that barely appears on the test.
    const ranked = rankWeaknesses(
      [
        stat({ skillId: "big", skillName: "Big", questionShare: 0.2, recentAccuracy: 0.75 }),
        stat({ skillId: "tiny", skillName: "Tiny", questionShare: 0.01, recentAccuracy: 0.3 }),
      ],
      1550,
    );
    expect(ranked[0]!.skillId).toBe("big");
  });

  it("flags an unattempted skill as a blind spot rather than scoring it perfect", () => {
    const ranked = rankWeaknesses([stat({ attempts: 0, recentAccuracy: 0 })], 1550);
    expect(ranked[0]!.blindSpot).toBe(true);
    expect(ranked[0]!.expectedGain).toBeGreaterThan(0);
    expect(ranked[0]!.reason).toContain("never attempted");
  });

  it("does not treat a thin sample as settled evidence", () => {
    const ranked = rankWeaknesses([stat({ attempts: 2, recentAccuracy: 0 })], 1550);
    expect(ranked[0]!.blindSpot).toBe(true);
    expect(ranked[0]!.reason).toContain("provisional");
  });

  it("identifies accuracy-fine-but-too-slow as a speed problem", () => {
    const ranked = rankWeaknesses(
      [stat({ recentAccuracy: 0.99, avgSolveMs: 200_000, expectedMs: 75_000 })],
      1300,
    );
    expect(ranked[0]!.speedProblem).toBe(true);
    expect(ranked[0]!.reason).toContain("over the expected time");
  });

  it("reports no headroom for a skill already at the required level", () => {
    const ranked = rankWeaknesses([stat({ recentAccuracy: 1 })], 1200);
    expect(ranked[0]!.headroom).toBe(0);
    expect(ranked[0]!.expectedGain).toBe(0);
  });

  it("raises priority when unresolved errors are logged", () => {
    const without = rankWeaknesses([stat({ openErrors: 0 })], 1550)[0]!;
    const with5 = rankWeaknesses([stat({ openErrors: 5 })], 1550)[0]!;
    expect(with5.priority).toBeGreaterThan(without.priority);
  });

  it("returns results sorted by descending priority", () => {
    const ranked = rankWeaknesses(
      [
        stat({ skillId: "a", recentAccuracy: 0.95, questionShare: 0.02 }),
        stat({ skillId: "b", recentAccuracy: 0.4, questionShare: 0.2 }),
        stat({ skillId: "c", recentAccuracy: 0.7, questionShare: 0.1 }),
      ],
      1550,
    );
    for (let i = 1; i < ranked.length; i += 1) {
      expect(ranked[i - 1]!.priority).toBeGreaterThanOrEqual(ranked[i]!.priority);
    }
  });

  it("handles an empty input", () => {
    expect(rankWeaknesses([], 1550)).toEqual([]);
  });

  it("always supplies a human-readable reason", () => {
    const ranked = rankWeaknesses(
      [stat(), stat({ attempts: 0 }), stat({ recentAccuracy: 1 }), stat({ openErrors: 3 })],
      1550,
    );
    for (const row of ranked) {
      expect(row.reason.length).toBeGreaterThan(10);
    }
  });
});

describe("computeQuestionShares", () => {
  it("splits each domain weight across its skills", () => {
    const shares = computeQuestionShares(DOMAINS);
    const algebra = DOMAINS.find((d) => d.id === "algebra")!;
    const perSkill = shares.get(algebra.skills[0]!.id)!;
    expect(perSkill).toBeCloseTo(algebra.weight / algebra.skills.length);
  });

  it("gives every skill a share", () => {
    const shares = computeQuestionShares(DOMAINS);
    for (const domain of DOMAINS) {
      for (const skill of domain.skills) {
        expect(shares.get(skill.id)).toBeGreaterThan(0);
      }
    }
  });

  it("sums to about 1 per section", () => {
    const shares = computeQuestionShares(DOMAINS);
    for (const section of ["reading_writing", "math"] as const) {
      const total = DOMAINS.filter((d) => d.section === section)
        .flatMap((d) => d.skills)
        .reduce((sum, s) => sum + (shares.get(s.id) ?? 0), 0);
      expect(total).toBeCloseTo(1, 2);
    }
  });
});

describe("summariseBySection", () => {
  it("summarises both sections even when one has no data", () => {
    const ranked = rankWeaknesses([stat({ section: "math" })], 1550);
    const summary = summariseBySection(ranked);
    expect(summary).toHaveLength(2);
    const rw = summary.find((s) => s.section === "reading_writing")!;
    expect(rw.attempts).toBe(0);
    expect(rw.accuracy).toBe(0);
  });

  it("names a weak skill when one exists", () => {
    const ranked = rankWeaknesses(
      [stat({ section: "math", skillName: "Circles", recentAccuracy: 0.4 })],
      1550,
    );
    const math = summariseBySection(ranked).find((s) => s.section === "math")!;
    expect(math.weakestSkillName).toBe("Circles");
    expect(math.recoverablePoints).toBeGreaterThan(0);
  });
});
