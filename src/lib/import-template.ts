/**
 * A worked example of the import format, offered as a download so the shape is
 * unambiguous.
 *
 * This lives apart from src/lib/import.ts because that module is server-only
 * (it touches Prisma), and the import form is a client component that needs
 * the template to build a download. Keeping the data here lets both use it.
 */
export const IMPORT_TEMPLATE = {
  questions: [
    {
      skillId: "linear-equations-one-variable",
      format: "mcq",
      difficulty: 2,
      stem: "If 5x - 8 = 27, what is the value of x?",
      explanation: "Add 8 to both sides to get 5x = 35, then divide by 5 to get x = 7.",
      choices: [
        { label: "A", text: "5", isCorrect: false, distractorType: "wrong_operation", rationale: "Comes from dividing 27 by 5 and ignoring the -8." },
        { label: "B", text: "7", isCorrect: true, rationale: "5(7) - 8 = 27." },
        { label: "C", text: "35", isCorrect: false, distractorType: "partial_solution", rationale: "This is 5x, not x." },
        { label: "D", text: "-7", isCorrect: false, distractorType: "sign_error", rationale: "A sign slip when moving the -8 across." },
      ],
      patternName: "Isolate the variable",
      concept: "Two-step linear equation",
      recognitionCues: ["One variable, no brackets", "Asks for a single value"],
      fastestMethod: "Undo the addition first, then the multiplication.",
      commonTraps: ["Stopping at 5x = 35", "Sign error on the constant"],
      expectedSeconds: 35,
      sourceRef: "My revision notebook, page 12",
    },
    {
      skillId: "percentages",
      format: "spr",
      difficulty: 3,
      stem: "A jacket costing 90 pounds is reduced by 35 per cent. What is the sale price in pounds?",
      explanation: "A 35 per cent reduction leaves 65 per cent, and 0.65 times 90 is 58.50.",
      acceptedAnswers: ["58.5", "58.50"],
      patternName: "Percentage multiplier",
      concept: "Applying a single percentage decrease",
      recognitionCues: ["A single percentage change", "Asks for the resulting amount"],
      fastestMethod: "Multiply by (1 minus the percentage) in one step.",
      commonTraps: ["Giving the discount rather than the price"],
      expectedSeconds: 45,
    },
  ],
};
