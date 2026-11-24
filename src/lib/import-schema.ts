import { z } from "zod";
import { ALL_SKILLS } from "./domain/taxonomy";

/**
 * Pure validation for imported question rows.
 *
 * Kept separate from src/lib/import.ts because that module is server-only (it
 * writes through Prisma). These schemas have no runtime dependencies beyond
 * Zod and the taxonomy, so they can be unit tested directly and reused
 * wherever validation is needed.
 */

const skillIds = new Set(ALL_SKILLS.map((s) => s.id));

export const ImportRowSchema = z
  .object({
    stem: z.string().trim().min(5, "stem is too short"),
    skillId: z
      .string()
      .trim()
      .refine((id) => skillIds.has(id), { message: "unknown skillId" }),
    difficulty: z.coerce.number().int().min(1).max(5),
    format: z.enum(["mcq", "spr"]).default("mcq"),

    stimulus: z.string().trim().optional(),
    stimulusTitle: z.string().trim().optional(),
    explanation: z.string().trim().default(""),

    choices: z
      .array(
        z.object({
          label: z.enum(["A", "B", "C", "D"]),
          text: z.string().trim().min(1),
          isCorrect: z.coerce.boolean().default(false),
          distractorType: z.string().trim().optional(),
          rationale: z.string().trim().optional(),
        }),
      )
      .optional(),
    acceptedAnswers: z.array(z.string().trim()).optional(),

    patternName: z.string().trim().optional(),
    concept: z.string().trim().optional(),
    recognitionCues: z.array(z.string().trim()).optional(),
    fastestMethod: z.string().trim().optional(),
    alternativeMethod: z.string().trim().optional(),
    commonTraps: z.array(z.string().trim()).optional(),
    expectedSeconds: z.coerce.number().int().min(10).max(600).default(75),

    sourceRef: z.string().trim().optional(),
    sourceUrl: z.string().trim().optional(),
    testAdministration: z.string().trim().optional(),
  })
  .superRefine((row, ctx) => {
    if (row.format === "mcq") {
      if (!row.choices || row.choices.length !== 4) {
        ctx.addIssue({ code: "custom", message: "an mcq row needs exactly four choices" });
        return;
      }
      const correct = row.choices.filter((c) => c.isCorrect).length;
      if (correct !== 1) {
        ctx.addIssue({
          code: "custom",
          message: `an mcq row needs exactly one correct choice, found ${correct}`,
        });
      }
    } else if (!row.acceptedAnswers || row.acceptedAnswers.length === 0) {
      ctx.addIssue({ code: "custom", message: "an spr row needs at least one accepted answer" });
    }
  });

export type ImportRow = z.input<typeof ImportRowSchema>;

export const ImportPayloadSchema = z.object({
  questions: z.array(z.unknown()).min(1, "the file contains no questions"),
});

