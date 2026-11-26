import { describe, expect, it } from "vitest";
import { ImportPayloadSchema, ImportRowSchema } from "@/lib/import-schema";
import { IMPORT_TEMPLATE } from "@/lib/import-template";
import { looksTabular } from "@/components/stimulus";

/**
 * The importer's validation is pure, so it is tested directly without a
 * database. The write path is exercised through the UI walkthrough.
 */

function row(overrides: Record<string, unknown> = {}) {
  return {
    skillId: "percentages",
    format: "mcq",
    difficulty: 3,
    stem: "What is 20 per cent of 80?",
    explanation: "0.2 times 80 is 16.",
    choices: [
      { label: "A", text: "16", isCorrect: true, rationale: "Correct." },
      { label: "B", text: "4", isCorrect: false, distractorType: "wrong_operation", rationale: "No." },
      { label: "C", text: "160", isCorrect: false, distractorType: "unit_error", rationale: "No." },
      { label: "D", text: "60", isCorrect: false, distractorType: "wrong_operation", rationale: "No." },
    ],
    ...overrides,
  };
}

describe("ImportRowSchema", () => {
  it("accepts a well-formed multiple-choice row", () => {
    expect(ImportRowSchema.safeParse(row()).success).toBe(true);
  });

  it("rejects an unknown skill id", () => {
    const result = ImportRowSchema.safeParse(row({ skillId: "not-a-skill" }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(JSON.stringify(result.error.issues)).toContain("unknown skillId");
    }
  });

  it("rejects a difficulty outside 1 to 5", () => {
    expect(ImportRowSchema.safeParse(row({ difficulty: 0 })).success).toBe(false);
    expect(ImportRowSchema.safeParse(row({ difficulty: 9 })).success).toBe(false);
  });

  it("rejects a multiple-choice row without four choices", () => {
    const result = ImportRowSchema.safeParse(row({ choices: row().choices.slice(0, 3) }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(JSON.stringify(result.error.issues)).toContain("exactly four choices");
    }
  });

  it("rejects a multiple-choice row with no correct answer", () => {
    const choices = row().choices.map((c) => ({ ...c, isCorrect: false }));
    const result = ImportRowSchema.safeParse(row({ choices }));
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(JSON.stringify(result.error.issues)).toContain("exactly one correct choice");
    }
  });

  it("rejects a multiple-choice row with two correct answers", () => {
    const choices = row().choices.map((c, i) => ({ ...c, isCorrect: i < 2 }));
    expect(ImportRowSchema.safeParse(row({ choices })).success).toBe(false);
  });

  it("rejects a type-in row with no accepted answers", () => {
    const result = ImportRowSchema.safeParse(
      row({ format: "spr", choices: undefined, acceptedAnswers: [] }),
    );
    expect(result.success).toBe(false);
  });

  it("accepts a well-formed type-in row", () => {
    const result = ImportRowSchema.safeParse(
      row({ format: "spr", choices: undefined, acceptedAnswers: ["16"] }),
    );
    expect(result.success).toBe(true);
  });

  it("rejects a stem that is too short to be a question", () => {
    expect(ImportRowSchema.safeParse(row({ stem: "hi" })).success).toBe(false);
  });

  it("coerces numeric strings, since CSV conversions produce them", () => {
    const result = ImportRowSchema.safeParse(row({ difficulty: "4" }));
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.difficulty).toBe(4);
  });

  it("defaults the expected time when none is supplied", () => {
    const result = ImportRowSchema.safeParse(row());
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.expectedSeconds).toBe(75);
  });

  it("defaults format to multiple choice", () => {
    const result = ImportRowSchema.safeParse(row({ format: undefined }));
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.format).toBe("mcq");
  });
});

describe("ImportPayloadSchema", () => {
  it("requires a questions array", () => {
    expect(ImportPayloadSchema.safeParse({}).success).toBe(false);
    expect(ImportPayloadSchema.safeParse({ questions: [] }).success).toBe(false);
    expect(ImportPayloadSchema.safeParse({ questions: [{}] }).success).toBe(true);
  });

  it("rejects a bare array", () => {
    expect(ImportPayloadSchema.safeParse([{}]).success).toBe(false);
  });
});

describe("IMPORT_TEMPLATE", () => {
  it("is itself valid against the schema, so the worked example actually works", () => {
    const parsed = ImportPayloadSchema.safeParse(IMPORT_TEMPLATE);
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    for (const question of parsed.data.questions) {
      const result = ImportRowSchema.safeParse(question);
      expect(result.success, JSON.stringify(result.error?.issues)).toBe(true);
    }
  });

  it("demonstrates both question formats", () => {
    const formats = IMPORT_TEMPLATE.questions.map((q) => q.format);
    expect(formats).toContain("mcq");
    expect(formats).toContain("spr");
  });
});

describe("looksTabular", () => {
  it("detects a column-aligned table", () => {
    const table = [
      "Year      Urban      Rural",
      "1925       18%         4%",
      "1930       46%        14%",
    ].join("\n");
    expect(looksTabular(table)).toBe(true);
  });

  it("treats prose as prose", () => {
    const prose =
      "Fungi that colonise plant roots have long been described as partners in a straightforward exchange.\nRecent work complicates that picture considerably.";
    expect(looksTabular(prose)).toBe(false);
  });

  it("treats a single line as prose", () => {
    expect(looksTabular("A single sentence with  a double space.")).toBe(false);
  });

  it("handles an empty string", () => {
    expect(looksTabular("")).toBe(false);
  });
});
