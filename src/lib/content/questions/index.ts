import { SeedQuestionSchema, type SeedQuestion } from "../types";
import { ALGEBRA_QUESTIONS } from "./math-algebra";
import { ADVANCED_MATH_QUESTIONS } from "./math-advanced";
import { DATA_ANALYSIS_QUESTIONS } from "./math-data";
import { GEOMETRY_QUESTIONS } from "./math-geometry";
import { RW_READING_QUESTIONS } from "./rw-reading";
import { RW_WRITING_QUESTIONS } from "./rw-writing";

export const ALL_SEED_QUESTIONS: SeedQuestion[] = [
  ...ALGEBRA_QUESTIONS,
  ...ADVANCED_MATH_QUESTIONS,
  ...DATA_ANALYSIS_QUESTIONS,
  ...GEOMETRY_QUESTIONS,
  ...RW_READING_QUESTIONS,
  ...RW_WRITING_QUESTIONS,
];

/**
 * Validate the whole bank. Called by the seed script and by the test suite, so
 * a malformed question fails the build rather than reaching the app.
 */
export function validateSeedQuestions(questions: SeedQuestion[] = ALL_SEED_QUESTIONS) {
  const errors: string[] = [];
  const seen = new Set<string>();

  for (const question of questions) {
    const result = SeedQuestionSchema.safeParse(question);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push(`${question.id}: ${issue.path.join(".")} ${issue.message}`);
      }
    }
    if (seen.has(question.id)) errors.push(`Duplicate question id: ${question.id}`);
    seen.add(question.id);
  }

  return errors;
}

export {
  ALGEBRA_QUESTIONS,
  ADVANCED_MATH_QUESTIONS,
  DATA_ANALYSIS_QUESTIONS,
  GEOMETRY_QUESTIONS,
  RW_READING_QUESTIONS,
  RW_WRITING_QUESTIONS,
};
