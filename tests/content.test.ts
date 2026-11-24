import { describe, expect, it } from "vitest";
import { ALL_SEED_QUESTIONS, validateSeedQuestions } from "@/lib/content/questions";
import { ALL_SKILLS, DOMAINS } from "@/lib/domain/taxonomy";
import { gradeTypedAnswer, normaliseAnswer } from "@/lib/content/types";
import { DISTRACTOR_TYPE_LABEL } from "@/lib/domain/enums";

const skillIds = new Set(ALL_SKILLS.map((s) => s.id));

describe("seed question bank", () => {
  it("passes schema validation with no errors", () => {
    expect(validateSeedQuestions()).toEqual([]);
  });

  it("contains a usable number of questions", () => {
    expect(ALL_SEED_QUESTIONS.length).toBeGreaterThanOrEqual(80);
  });

  it("uses only skill ids that exist in the taxonomy", () => {
    const unknown = ALL_SEED_QUESTIONS
      .filter((q) => !skillIds.has(q.skillId))
      .map((q) => `${q.id} -> ${q.skillId}`);
    expect(unknown).toEqual([]);
  });

  it("covers every skill in the taxonomy", () => {
    const covered = new Set(ALL_SEED_QUESTIONS.map((q) => q.skillId));
    const missing = [...skillIds].filter((id) => !covered.has(id));
    expect(missing).toEqual([]);
  });

  it("gives every skill at least two questions so a drill is possible", () => {
    const counts = new Map<string, number>();
    for (const q of ALL_SEED_QUESTIONS) {
      counts.set(q.skillId, (counts.get(q.skillId) ?? 0) + 1);
    }
    const thin = [...counts.entries()].filter(([, n]) => n < 2);
    expect(thin).toEqual([]);
  });

  it("covers both sections", () => {
    const sections = new Map(ALL_SKILLS.map((s) => [s.id, s.section]));
    const bySection = new Map<string, number>();
    for (const q of ALL_SEED_QUESTIONS) {
      const section = sections.get(q.skillId)!;
      bySection.set(section, (bySection.get(section) ?? 0) + 1);
    }
    expect(bySection.get("math")).toBeGreaterThan(20);
    expect(bySection.get("reading_writing")).toBeGreaterThan(20);
  });

  it("spans a range of difficulties", () => {
    const difficulties = new Set(ALL_SEED_QUESTIONS.map((q) => q.difficulty));
    expect(difficulties.size).toBeGreaterThanOrEqual(3);
    expect(Math.min(...difficulties)).toBeLessThanOrEqual(2);
    expect(Math.max(...difficulties)).toBeGreaterThanOrEqual(4);
  });

  it("uses recognised distractor types", () => {
    const unknown: string[] = [];
    for (const q of ALL_SEED_QUESTIONS) {
      for (const choice of q.choices ?? []) {
        if (choice.distractorType && !(choice.distractorType in DISTRACTOR_TYPE_LABEL)) {
          unknown.push(`${q.id}/${choice.label}: ${choice.distractorType}`);
        }
      }
    }
    expect(unknown).toEqual([]);
  });

  it("gives every option a rationale, including the correct one", () => {
    const missing: string[] = [];
    for (const q of ALL_SEED_QUESTIONS) {
      for (const choice of q.choices ?? []) {
        if (!choice.rationale || choice.rationale.trim().length < 15) {
          missing.push(`${q.id}/${choice.label}`);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it("gives every question a substantive explanation", () => {
    const thin = ALL_SEED_QUESTIONS
      .filter((q) => q.explanation.trim().length < 80)
      .map((q) => q.id);
    expect(thin).toEqual([]);
  });

  it("gives every question the full pattern-recognition payload", () => {
    const incomplete: string[] = [];
    for (const q of ALL_SEED_QUESTIONS) {
      if (!q.patternName || !q.concept || !q.fastestMethod) incomplete.push(q.id);
      if ((q.recognitionCues?.length ?? 0) < 2) incomplete.push(`${q.id} (cues)`);
      if ((q.commonTraps?.length ?? 0) < 2) incomplete.push(`${q.id} (traps)`);
    }
    expect(incomplete).toEqual([]);
  });

  it("sets plausible expected times", () => {
    for (const q of ALL_SEED_QUESTIONS) {
      expect(q.expectedSeconds).toBeGreaterThanOrEqual(20);
      expect(q.expectedSeconds).toBeLessThanOrEqual(180);
    }
  });

  it("gives harder questions more time on average than easier ones", () => {
    const mean = (ds: number[]) => {
      const rows = ALL_SEED_QUESTIONS.filter((q) => ds.includes(q.difficulty));
      return rows.reduce((s, q) => s + q.expectedSeconds, 0) / rows.length;
    };
    expect(mean([4, 5])).toBeGreaterThan(mean([1, 2]));
  });

  it("references only real skill ids in relatedConcepts", () => {
    const unknown: string[] = [];
    for (const q of ALL_SEED_QUESTIONS) {
      for (const related of q.relatedConcepts ?? []) {
        if (!skillIds.has(related)) unknown.push(`${q.id} -> ${related}`);
      }
    }
    expect(unknown).toEqual([]);
  });

  it("uses globally unique option labels per question", () => {
    for (const q of ALL_SEED_QUESTIONS) {
      if (!q.choices) continue;
      const labels = q.choices.map((c) => c.label).sort();
      expect(labels).toEqual(["A", "B", "C", "D"]);
    }
  });

  it("includes type-in questions in the maths section", () => {
    const spr = ALL_SEED_QUESTIONS.filter((q) => q.format === "spr");
    expect(spr.length).toBeGreaterThan(5);
    const sections = new Map(ALL_SKILLS.map((s) => [s.id, s.section]));
    expect(spr.every((q) => sections.get(q.skillId) === "math")).toBe(true);
  });

  it("keeps every domain represented", () => {
    const skillToDomain = new Map(ALL_SKILLS.map((s) => [s.id, s.domainId]));
    const covered = new Set(ALL_SEED_QUESTIONS.map((q) => skillToDomain.get(q.skillId)));
    for (const domain of DOMAINS) {
      expect(covered.has(domain.id)).toBe(true);
    }
  });
});

describe("normaliseAnswer", () => {
  it("strips whitespace and trailing zeros", () => {
    expect(normaliseAnswer(" 7 ")).toBe("7");
    expect(normaliseAnswer("7.0")).toBe("7");
    expect(normaliseAnswer("0.50")).toBe("0.5");
  });

  it("keeps fractions as written but removes spacing", () => {
    expect(normaliseAnswer("3 / 4")).toBe("3/4");
  });

  it("handles a leading plus sign", () => {
    expect(normaliseAnswer("+12")).toBe("12");
  });

  it("returns an empty string for blank input", () => {
    expect(normaliseAnswer("   ")).toBe("");
  });
});

describe("gradeTypedAnswer", () => {
  it("accepts an exact match", () => {
    expect(gradeTypedAnswer("12", ["12"])).toBe(true);
  });

  it("accepts equivalent decimal forms", () => {
    expect(gradeTypedAnswer("7.0", ["7"])).toBe(true);
    expect(gradeTypedAnswer("7", ["7.0"])).toBe(true);
  });

  it("accepts a decimal equivalent of an accepted fraction", () => {
    expect(gradeTypedAnswer("0.75", ["3/4"])).toBe(true);
    expect(gradeTypedAnswer("3/4", ["0.75"])).toBe(true);
  });

  it("accepts an unreduced equivalent fraction", () => {
    expect(gradeTypedAnswer("12/16", ["3/4"])).toBe(true);
  });

  it("rejects a wrong answer", () => {
    expect(gradeTypedAnswer("13", ["12"])).toBe(false);
  });

  it("rejects a blank answer", () => {
    expect(gradeTypedAnswer("", ["12"])).toBe(false);
    expect(gradeTypedAnswer("   ", ["12"])).toBe(false);
  });

  it("handles negative numbers", () => {
    expect(gradeTypedAnswer("-4", ["-4"])).toBe(true);
    expect(gradeTypedAnswer("4", ["-4"])).toBe(false);
  });

  it("does not divide by zero on a malformed fraction", () => {
    expect(gradeTypedAnswer("3/0", ["3/4"])).toBe(false);
  });

  it("rejects non-numeric noise", () => {
    expect(gradeTypedAnswer("twelve", ["12"])).toBe(false);
  });

  it("grades every type-in question in the bank against its own answer", () => {
    for (const q of ALL_SEED_QUESTIONS) {
      if (q.format !== "spr") continue;
      const accepted = q.acceptedAnswers!;
      for (const answer of accepted) {
        expect(gradeTypedAnswer(answer, accepted), `${q.id} should accept ${answer}`).toBe(true);
      }
    }
  });
});
