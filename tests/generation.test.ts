import { describe, expect, it } from "vitest";
import {
  buildGenerationPrompt,
  extractJson,
  parseGeneratedQuestions,
} from "@/lib/ai/generation";

/**
 * The generation path is tested without a model: what matters is that whatever
 * a model returns is parsed defensively and validated exactly as an imported
 * file would be, so a malformed or mis-keyed question cannot reach the bank.
 */

function validRow(overrides: Record<string, unknown> = {}) {
  return {
    skillId: "percentages",
    format: "mcq",
    difficulty: 3,
    stem: "What is 30 per cent of 120?",
    explanation: "0.3 times 120 is 36.",
    choices: [
      { label: "A", text: "36", isCorrect: true, rationale: "0.3 x 120 = 36." },
      { label: "B", text: "40", isCorrect: false, distractorType: "wrong_operation", rationale: "No." },
      { label: "C", text: "3.6", isCorrect: false, distractorType: "unit_error", rationale: "No." },
      { label: "D", text: "90", isCorrect: false, distractorType: "wrong_operation", rationale: "No." },
    ],
    patternName: "Percentage of an amount",
    concept: "Direct percentage",
    recognitionCues: ["per cent of", "single step"],
    fastestMethod: "Multiply by the decimal.",
    commonTraps: ["Dividing instead", "Misplacing the decimal"],
    expectedSeconds: 35,
    ...overrides,
  };
}

describe("extractJson", () => {
  it("parses a bare JSON object", () => {
    expect(extractJson('{"a":1}')).toEqual({ a: 1 });
  });

  it("parses JSON inside a fenced code block", () => {
    expect(extractJson('```json\n{"a":1}\n```')).toEqual({ a: 1 });
  });

  it("parses JSON inside an unlabelled fence", () => {
    expect(extractJson('```\n{"a":1}\n```')).toEqual({ a: 1 });
  });

  it("parses JSON wrapped in prose, which models do constantly", () => {
    expect(extractJson('Here are your questions:\n\n{"a":1}\n\nHope that helps.')).toEqual({ a: 1 });
  });

  it("returns null when there is no JSON at all", () => {
    expect(extractJson("I cannot help with that.")).toBeNull();
  });

  it("returns null for truncated JSON rather than throwing", () => {
    expect(extractJson('{"questions": [{"stem": "oops"')).toBeNull();
  });
});

describe("parseGeneratedQuestions", () => {
  it("accepts a well-formed question", () => {
    const outcome = parseGeneratedQuestions(JSON.stringify({ questions: [validRow()] }));
    expect(outcome.accepted).toHaveLength(1);
    expect(outcome.rejected).toEqual([]);
  });

  it("reports a parse failure instead of throwing", () => {
    const outcome = parseGeneratedQuestions("not json at all");
    expect(outcome.accepted).toEqual([]);
    expect(outcome.rejected[0]!.errors[0]).toContain("valid JSON");
  });

  it("rejects a payload without a questions array", () => {
    const outcome = parseGeneratedQuestions(JSON.stringify({ items: [] }));
    expect(outcome.accepted).toEqual([]);
    expect(outcome.rejected).toHaveLength(1);
  });

  it("rejects a question with an unknown skill id", () => {
    const outcome = parseGeneratedQuestions(
      JSON.stringify({ questions: [validRow({ skillId: "invented-skill" })] }),
    );
    expect(outcome.accepted).toEqual([]);
    expect(JSON.stringify(outcome.rejected)).toContain("unknown skillId");
  });

  it("rejects a question with two correct options", () => {
    const row = validRow();
    const choices = (row.choices as Array<{ isCorrect: boolean }>).map((c, i) => ({
      ...c,
      isCorrect: i < 2,
    }));
    const outcome = parseGeneratedQuestions(JSON.stringify({ questions: [{ ...row, choices }] }));
    expect(outcome.accepted).toEqual([]);
    expect(JSON.stringify(outcome.rejected)).toContain("exactly one correct choice");
  });

  it("rejects a question with three options", () => {
    const row = validRow();
    const choices = (row.choices as unknown[]).slice(0, 3);
    const outcome = parseGeneratedQuestions(JSON.stringify({ questions: [{ ...row, choices }] }));
    expect(outcome.accepted).toEqual([]);
    expect(JSON.stringify(outcome.rejected)).toContain("exactly four choices");
  });

  it("rejects a type-in question with no accepted answers", () => {
    const outcome = parseGeneratedQuestions(
      JSON.stringify({
        questions: [validRow({ format: "spr", choices: undefined, acceptedAnswers: [] })],
      }),
    );
    expect(outcome.accepted).toEqual([]);
  });

  it("keeps the good rows and rejects only the bad ones", () => {
    const outcome = parseGeneratedQuestions(
      JSON.stringify({
        questions: [validRow(), validRow({ skillId: "nope" }), validRow({ difficulty: 99 })],
      }),
    );
    expect(outcome.accepted).toHaveLength(1);
    expect(outcome.rejected).toHaveLength(2);
    expect(outcome.rejected.map((r) => r.index)).toEqual([1, 2]);
  });

  it("keeps the raw text so a failure can be shown rather than swallowed", () => {
    const outcome = parseGeneratedQuestions("garbage");
    expect(outcome.raw).toBe("garbage");
  });
});

describe("buildGenerationPrompt", () => {
  const base = {
    skillId: "circles",
    skillName: "Circles",
    domainName: "Geometry and Trigonometry",
    section: "math" as const,
    difficulty: 4,
    count: 3,
    weakPatterns: ["Radian sector formulas"],
  };

  it("names the skill, difficulty and count", () => {
    const prompt = buildGenerationPrompt(base);
    expect(prompt).toContain("Circles");
    expect(prompt).toContain("Geometry and Trigonometry");
    expect(prompt).toContain("3 new SAT practice questions");
    expect(prompt).toContain("4 on a 1 to 5 scale");
  });

  it("passes the student's weak patterns through", () => {
    expect(buildGenerationPrompt(base)).toContain("Radian sector formulas");
  });

  it("allows type-in only for Maths", () => {
    expect(buildGenerationPrompt(base)).toContain("acceptedAnswers");
    const rw = buildGenerationPrompt({
      ...base,
      section: "reading_writing",
      skillId: "transitions",
      skillName: "Transitions",
    });
    expect(rw).toContain('"mcq"');
    expect(rw).not.toContain('"acceptedAnswers": ["7"');
  });

  it("forbids presenting generated questions as real SAT questions", () => {
    const prompt = buildGenerationPrompt(base);
    expect(prompt).toContain("not real or past SAT");
  });

  it("instructs the model to check its own answer key", () => {
    expect(buildGenerationPrompt(base)).toContain("Check your own answer key");
  });
});
