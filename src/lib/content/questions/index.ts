import { SeedQuestionSchema, type SeedQuestion } from "../types";
import { ALGEBRA_QUESTIONS } from "./math-algebra";
import { ALGEBRA_QUESTIONS_2 } from "./math-algebra-2";
import { ALGEBRA_QUESTIONS_3 } from "./math-algebra-3";
import { ADVANCED_MATH_QUESTIONS } from "./math-advanced";
import { ADVANCED_MATH_QUESTIONS_2 } from "./math-advanced-2";
import { ADVANCED_MATH_QUESTIONS_3 } from "./math-advanced-3";
import { DATA_ANALYSIS_QUESTIONS } from "./math-data";
import { DATA_GEOMETRY_QUESTIONS_2 } from "./math-data-2";
import { GEOMETRY_QUESTIONS } from "./math-geometry";
import { GEOMETRY_QUESTIONS_2 } from "./math-geometry-2";
import { RW_READING_QUESTIONS } from "./rw-reading";
import { RW_READING_QUESTIONS_2 } from "./rw-reading-2";
import { RW_WRITING_QUESTIONS } from "./rw-writing";
import { RW_WRITING_QUESTIONS_2 } from "./rw-writing-2";

export const ALL_SEED_QUESTIONS: SeedQuestion[] = [
  ...ALGEBRA_QUESTIONS,
  ...ALGEBRA_QUESTIONS_2,
  ...ALGEBRA_QUESTIONS_3,
  ...ADVANCED_MATH_QUESTIONS,
  ...ADVANCED_MATH_QUESTIONS_2,
  ...ADVANCED_MATH_QUESTIONS_3,
  ...DATA_ANALYSIS_QUESTIONS,
  ...DATA_GEOMETRY_QUESTIONS_2,
  ...GEOMETRY_QUESTIONS,
  ...GEOMETRY_QUESTIONS_2,
  ...RW_READING_QUESTIONS,
  ...RW_READING_QUESTIONS_2,
  ...RW_WRITING_QUESTIONS,
  ...RW_WRITING_QUESTIONS_2,
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
  ALGEBRA_QUESTIONS_2,
  ALGEBRA_QUESTIONS_3,
  ADVANCED_MATH_QUESTIONS,
  ADVANCED_MATH_QUESTIONS_2,
  ADVANCED_MATH_QUESTIONS_3,
  DATA_ANALYSIS_QUESTIONS,
  DATA_GEOMETRY_QUESTIONS_2,
  GEOMETRY_QUESTIONS,
  GEOMETRY_QUESTIONS_2,
  RW_READING_QUESTIONS,
  RW_READING_QUESTIONS_2,
  RW_WRITING_QUESTIONS,
  RW_WRITING_QUESTIONS_2,
};
