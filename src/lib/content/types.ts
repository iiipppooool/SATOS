import { z } from "zod";

/**
 * Authoring format for seed questions.
 *
 * Every item in this repository is written specifically for SAT OS. None of it
 * is reproduced from a real exam, and none of it should ever be relabelled as
 * official material. The importer (src/lib/import) handles material the owner
 * has their own licence to, and keeps its provenance separate.
 */

export const SeedChoiceSchema = z.object({
  label: z.enum(["A", "B", "C", "D"]),
  /**
   * Never empty. Punctuation questions whose answer is "insert nothing here"
   * must spell that out as the literal string "no punctuation", otherwise the
   * option renders as a blank row that the student cannot read or click.
   */
  text: z.string().min(1),
  isCorrect: z.boolean().default(false),
  /** Why a student lands here. Keys match DISTRACTOR_TYPE_LABEL. */
  distractorType: z.string().optional(),
  rationale: z.string().min(1),
});

export type SeedChoice = z.input<typeof SeedChoiceSchema>;

export const SeedQuestionSchema = z
  .object({
    /** Stable slug, so reseeding updates rather than duplicates. */
    id: z.string().min(1),
    skillId: z.string().min(1),
    format: z.enum(["mcq", "spr"]).default("mcq"),

    stimulusTitle: z.string().optional(),
    stimulus: z.string().optional(),
    stem: z.string().min(1),

    choices: z.array(SeedChoiceSchema).optional(),
    acceptedAnswers: z.array(z.string()).optional(),

    difficulty: z.number().int().min(1).max(5),
    explanation: z.string().min(1),

    // --- Pattern recognition payload -------------------------------------
    patternName: z.string().min(1),
    concept: z.string().min(1),
    recognitionCues: z.array(z.string()).min(1),
    fastestMethod: z.string().min(1),
    alternativeMethod: z.string().optional(),
    commonTraps: z.array(z.string()).min(1),
    relatedConcepts: z.array(z.string()).optional(),
    expectedSeconds: z.number().int().positive(),
  })
  .superRefine((q, ctx) => {
    if (q.format === "mcq") {
      if (!q.choices || q.choices.length !== 4) {
        ctx.addIssue({
          code: "custom",
          message: `Question ${q.id}: a multiple-choice item needs exactly four options.`,
        });
        return;
      }
      const correct = q.choices.filter((c) => c.isCorrect);
      if (correct.length !== 1) {
        ctx.addIssue({
          code: "custom",
          message: `Question ${q.id}: expected exactly one correct option, found ${correct.length}.`,
        });
      }
      const labels = new Set(q.choices.map((c) => c.label));
      if (labels.size !== 4) {
        ctx.addIssue({
          code: "custom",
          message: `Question ${q.id}: option labels must be A, B, C and D with no repeats.`,
        });
      }
      for (const choice of q.choices) {
        if (!choice.isCorrect && !choice.distractorType) {
          ctx.addIssue({
            code: "custom",
            message: `Question ${q.id}, option ${choice.label}: every wrong option needs a distractorType so trap analysis works.`,
          });
        }
      }
    } else {
      if (!q.acceptedAnswers || q.acceptedAnswers.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: `Question ${q.id}: a type-in item needs at least one accepted answer.`,
        });
      }
      if (q.choices && q.choices.length > 0) {
        ctx.addIssue({
          code: "custom",
          message: `Question ${q.id}: a type-in item must not carry options.`,
        });
      }
    }
  });

export type SeedQuestion = z.input<typeof SeedQuestionSchema>;

/** Normalise a typed answer so "7.0", " 7 " and "7" all match. */
export function normaliseAnswer(raw: string): string {
  const trimmed = raw.trim().replace(/\s+/g, "").replace(/^\+/, "");
  if (trimmed === "") return "";

  // Fractions stay as written but lose any spacing, so 3/4 matches 3 / 4.
  if (trimmed.includes("/")) return trimmed;

  const asNumber = Number(trimmed);
  if (Number.isFinite(asNumber)) {
    // Strip trailing zeros: 7.0 -> 7, 0.50 -> 0.5
    return String(asNumber);
  }
  return trimmed.toLowerCase();
}

/**
 * Grade a typed answer. Accepts any of the listed forms, and additionally
 * accepts a decimal that matches an accepted fraction, because the real test
 * accepts equivalent forms.
 */
export function gradeTypedAnswer(raw: string, accepted: string[]): boolean {
  const given = normaliseAnswer(raw);
  if (given === "") return false;

  for (const candidate of accepted) {
    if (normaliseAnswer(candidate) === given) return true;
  }

  const givenValue = evaluateNumeric(given);
  if (givenValue === null) return false;

  for (const candidate of accepted) {
    const candidateValue = evaluateNumeric(normaliseAnswer(candidate));
    if (candidateValue === null) continue;
    // The real test accepts answers that round or truncate to three places.
    if (Math.abs(candidateValue - givenValue) < 1e-4) return true;
  }
  return false;
}

export function evaluateNumeric(value: string): number | null {
  if (value.includes("/")) {
    const parts = value.split("/");
    if (parts.length !== 2) return null;
    const numerator = Number(parts[0]);
    const denominator = Number(parts[1]);
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
      return null;
    }
    return numerator / denominator;
  }
  const asNumber = Number(value);
  return Number.isFinite(asNumber) ? asNumber : null;
}
