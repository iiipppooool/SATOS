import type { SeedQuestion } from "../types";

/** Second batch of Algebra items. Every answer is re-derived in tests/maths-verification.test.ts. */
export const ALGEBRA_QUESTIONS_2: SeedQuestion[] = [
  // --- Linear equations in one variable ----------------------------------
  {
    id: "alg-lin1-004",
    skillId: "linear-equations-one-variable",
    format: "mcq",
    stem: "If 4(x - 3) = 2x + 2, what is the value of x?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: "-5",
        distractorType: "sign_error",
        rationale: "This comes from distributing as 4x + 12. The 4 multiplies -3 to give -12, not +12.",
      },
      {
        label: "B",
        text: "5",
        distractorType: "wrong_operation",
        rationale: "An arithmetic slip adding 2 and 12 as 10 rather than 14 at the collecting step.",
      },
      { label: "C", text: "7", isCorrect: true, rationale: "4x - 12 = 2x + 2, so 2x = 14 and x = 7." },
      {
        label: "D",
        text: "14",
        distractorType: "partial_solution",
        rationale: "This is 2x rather than x. One more division finishes it.",
      },
    ],
    explanation:
      "Distribute first: 4(x - 3) = 4x - 12, so 4x - 12 = 2x + 2. Subtract 2x from both sides and add 12 to both sides in one move: 2x = 14, giving x = 7. Substituting back confirms it, since 4(7 - 3) = 16 and 2(7) + 2 = 16.",
    patternName: "Distribute, collect, divide",
    concept: "Linear equation with brackets and x on both sides",
    recognitionCues: [
      "A bracket multiplied by a number on one side",
      "x terms on both sides of the equals sign",
      "A single numerical answer requested",
    ],
    fastestMethod:
      "Distribute, move all x terms one way and all numbers the other in a single step, then divide once.",
    alternativeMethod: "Substitute the options; with clean integers this takes about the same time.",
    commonTraps: [
      "Losing the sign when distributing across a subtraction",
      "Arithmetic slips when collecting the constants",
      "Reporting 2x instead of x",
    ],
    expectedSeconds: 45,
  },
  {
    id: "alg-lin1-005",
    skillId: "linear-equations-one-variable",
    format: "mcq",
    stem: "What value of x satisfies (3x - 1)/4 = (x + 5)/2?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "3.5",
        distractorType: "wrong_operation",
        rationale: "This comes from 2(3x - 1) = 4x + 5, where the 4 was not distributed across the +5.",
      },
      {
        label: "B",
        text: "9",
        distractorType: "sign_error",
        rationale: "This comes from 6x + 2 = 4x + 20. Distributing 2 across (3x - 1) gives 6x - 2.",
      },
      { label: "C", text: "11", isCorrect: true, rationale: "Cross-multiplying gives 2(3x - 1) = 4(x + 5), so 6x - 2 = 4x + 20 and x = 11." },
      {
        label: "D",
        text: "22",
        distractorType: "partial_solution",
        rationale: "This is 2x, not x.",
      },
    ],
    explanation:
      "Cross-multiply: (3x - 1) times 2 = (x + 5) times 4, so 6x - 2 = 4x + 20. Collecting gives 2x = 22 and x = 11. Check it: the left side is (33 - 1)/4 = 8 and the right side is 16/2 = 8.",
    patternName: "Cross-multiply a single fraction equation",
    concept: "Clearing denominators",
    recognitionCues: [
      "One fraction on each side",
      "Linear numerators",
      "Small numerical denominators",
    ],
    fastestMethod:
      "Cross-multiply, then expand both sides fully before collecting. Write the expansion out rather than doing it mentally.",
    commonTraps: [
      "Distributing to only the first term in a bracket",
      "Sign slips with a subtraction inside a bracket",
      "Stopping before the final division",
    ],
    expectedSeconds: 60,
  },
  {
    id: "alg-lin1-006",
    skillId: "linear-equations-one-variable",
    format: "spr",
    stem: "If (2/3)x + 5 = (1/2)x + 9, what is the value of x?",
    difficulty: 4,
    acceptedAnswers: ["24"],
    explanation:
      "Multiply every term by 6, the lowest common denominator, to clear the fractions: 4x + 30 = 3x + 54. Then x = 24. Checking: two thirds of 24 is 16, and 16 + 5 = 21; half of 24 is 12, and 12 + 9 = 21.",
    patternName: "Clear fractions with the lowest common denominator",
    concept: "Linear equation with fractional coefficients",
    recognitionCues: [
      "Fractional coefficients on x rather than whole fractions",
      "x on both sides",
      "Denominators with a small common multiple",
    ],
    fastestMethod:
      "Multiply through by the lowest common denominator at the very start. Working with the fractions in place is where errors come from.",
    commonTraps: [
      "Multiplying only some of the terms by the denominator",
      "Using a common denominator that is not the lowest and mishandling the arithmetic",
      "Subtracting the x terms in the wrong order",
    ],
    expectedSeconds: 65,
  },

  // --- Linear equations in two variables ---------------------------------
  {
    id: "alg-lin2-004",
    skillId: "linear-equations-two-variables",
    format: "spr",
    stem: "Line m is parallel to the line y = -2x + 7 and passes through the point (3, 4). What is the y-intercept of line m?",
    difficulty: 3,
    acceptedAnswers: ["10"],
    explanation:
      "Parallel lines have equal slopes, so line m has slope -2 and the form y = -2x + b. Substituting the point: 4 = -2(3) + b = -6 + b, so b = 10. The y-intercept is 10, and the line is y = -2x + 10.",
    patternName: "Parallel slope then substitute a point",
    concept: "Finding a line parallel to a given line",
    recognitionCues: [
      "The word parallel with a given equation",
      "A point the new line passes through",
      "The y-intercept requested",
    ],
    fastestMethod:
      "Copy the slope straight across, then substitute the point once to find b. Two steps, no rearranging.",
    commonTraps: [
      "Using the negative reciprocal, which belongs to a perpendicular line",
      "Sign error when substituting a positive x into a negative slope",
      "Reporting the whole equation when only the intercept is wanted",
    ],
    expectedSeconds: 50,
  },
  {
    id: "alg-lin2-005",
    skillId: "linear-equations-two-variables",
    format: "mcq",
    stem: "Line p is perpendicular to the line 2x + 3y = 12. What is the slope of line p?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "-2/3",
        distractorType: "wrong_relationship",
        rationale: "This is the slope of the given line itself, not of a line perpendicular to it.",
      },
      {
        label: "B",
        text: "2/3",
        distractorType: "sign_error",
        rationale: "The sign of the original slope has been dropped before taking the reciprocal.",
      },
      { label: "C", text: "3/2", isCorrect: true, rationale: "The given line has slope -2/3, and the negative reciprocal of -2/3 is 3/2." },
      {
        label: "D",
        text: "-3/2",
        distractorType: "sign_error",
        rationale: "The reciprocal is right but the sign is not. Two negatives give a positive here.",
      },
    ],
    explanation:
      "Rearrange to find the slope: 3y = -2x + 12, so y = (-2/3)x + 4 and the slope is -2/3. Perpendicular slopes are negative reciprocals, so flip to -3/2 and change the sign to get 3/2. A quick check: the product of perpendicular slopes is -1, and (-2/3) times (3/2) = -1.",
    patternName: "Negative reciprocal for perpendicular",
    concept: "Perpendicular slopes from standard form",
    recognitionCues: [
      "The word perpendicular",
      "An equation in Ax + By = C form",
      "Options that are a fraction and its variants",
    ],
    fastestMethod:
      "Find the original slope, flip it, change the sign, then verify the product is -1.",
    commonTraps: [
      "Giving the original slope",
      "Flipping without changing the sign",
      "Changing the sign without flipping",
    ],
    expectedSeconds: 55,
  },
  {
    id: "alg-lin2-006",
    skillId: "linear-equations-two-variables",
    format: "spr",
    stem: "A line passes through the points (-2, 5) and (4, -7). At what value of x does this line cross the x-axis?",
    difficulty: 4,
    acceptedAnswers: ["0.5", ".5", "1/2"],
    explanation:
      "The slope is (-7 - 5)/(4 - (-2)) = -12/6 = -2. Using the point (-2, 5): 5 = -2(-2) + b = 4 + b, so b = 1 and the line is y = -2x + 1. It crosses the x-axis where y = 0, so 0 = -2x + 1 and x = 1/2.",
    patternName: "Two points to an equation, then an intercept",
    concept: "Finding an x-intercept from two points",
    recognitionCues: [
      "Two coordinate pairs given",
      "The phrase crosses the x-axis",
      "No equation supplied",
    ],
    fastestMethod:
      "Slope, then intercept, then set y = 0. Three short steps, each checkable against one of the given points.",
    commonTraps: [
      "Subtracting coordinates in inconsistent order when finding the slope",
      "Setting x = 0 instead of y = 0",
      "Sign errors with the negative coordinate",
    ],
    expectedSeconds: 75,
  },

  // --- Linear functions ---------------------------------------------------
  {
    id: "alg-linf-004",
    skillId: "linear-functions",
    format: "spr",
    stem: "The function f is defined by f(x) = 8 - 3x. What is the value of f(-2)?",
    difficulty: 2,
    acceptedAnswers: ["14"],
    explanation:
      "Substitute -2 for x: f(-2) = 8 - 3(-2) = 8 + 6 = 14. The only real risk is the double negative, since subtracting a negative adds. Writing the substitution out as 8 - (-6) before simplifying prevents the usual slip.",
    patternName: "Substitute a negative value",
    concept: "Evaluating a linear function",
    recognitionCues: [
      "A function rule given explicitly",
      "A negative input",
      "A single value requested",
    ],
    fastestMethod: "Write the brackets in, then simplify the double negative deliberately.",
    commonTraps: [
      "Treating -3 times -2 as -6",
      "Subtracting 6 instead of adding it",
      "Reading 8 - 3x as (8 - 3)x",
    ],
    expectedSeconds: 30,
  },
  {
    id: "alg-linf-005",
    skillId: "linear-functions",
    format: "mcq",
    stem: "A tank is being drained. The volume of water in litres after t minutes is modelled by V(t) = 450 - 12t. Which statement is the best interpretation of 450 in this model?",
    difficulty: 2,
    choices: [
      { label: "A", text: "The tank held 450 litres when draining began.", isCorrect: true, rationale: "450 is the value of V when t = 0, which is the starting volume." },
      {
        label: "B",
        text: "The tank drains at 450 litres per minute.",
        distractorType: "swapped_values",
        rationale: "That describes the coefficient of t, which is 12, and in the wrong units.",
      },
      {
        label: "C",
        text: "The tank takes 450 minutes to empty.",
        distractorType: "unit_error",
        rationale: "450 is measured in litres, not minutes. Emptying takes 450 divided by 12, which is 37.5 minutes.",
      },
      {
        label: "D",
        text: "The tank holds 450 litres when it is full.",
        distractorType: "plausible_paraphrase",
        rationale: "The model only tells you the volume when draining started, which need not be the tank's capacity.",
      },
    ],
    explanation:
      "In V(t) = 450 - 12t the constant is the value at t = 0, so 450 litres is the volume when draining began. The coefficient 12 is the rate, in litres per minute. Option D is the subtle one: the starting volume is not necessarily the full capacity, and the model says nothing about capacity.",
    patternName: "Interpret the constant term in context",
    concept: "Meaning of the intercept in a linear model",
    recognitionCues: [
      "A real-world model given as a formula",
      "A question asking what a number means",
      "Options describing quantities in words",
    ],
    fastestMethod:
      "Attach units. A bare unit means a starting value; a per-something unit means a rate. Then check the option does not claim more than the model supports.",
    commonTraps: [
      "Swapping the rate and the starting value",
      "Ignoring units and reading litres as minutes",
      "Reading a starting value as a maximum capacity",
    ],
    expectedSeconds: 50,
  },
  {
    id: "alg-linf-006",
    skillId: "linear-functions",
    format: "spr",
    stem: "The function g is linear, with g(2) = -1 and g(6) = 11. For what value of x does g(x) = 26?",
    difficulty: 4,
    acceptedAnswers: ["11"],
    explanation:
      "The rate of change is (11 - (-1))/(6 - 2) = 12/4 = 3. Using g(2) = -1: -1 = 3(2) + b, so b = -7 and g(x) = 3x - 7. Setting 3x - 7 = 26 gives 3x = 33 and x = 11. Checking: g(11) = 33 - 7 = 26.",
    patternName: "Build the rule, then solve backwards",
    concept: "Finding an input from a required output",
    recognitionCues: [
      "Two input-output pairs for a linear function",
      "A target output rather than an input",
      "The word linear stated explicitly",
    ],
    fastestMethod:
      "Find the slope, build the explicit rule, then solve. Trying to step up from a known point works but is slower when the target is far away.",
    commonTraps: [
      "Reporting g(26) instead of solving for x",
      "Sign error finding b from a negative output",
      "Dividing the change in x by the change in y",
    ],
    expectedSeconds: 75,
  },

  // --- Systems of two linear equations ------------------------------------
  {
    id: "alg-sys-004",
    skillId: "systems-two-linear-equations",
    format: "spr",
    stem: "If 3x + 2y = 16 and x = 2y, what is the value of x?",
    difficulty: 2,
    acceptedAnswers: ["4"],
    explanation:
      "The second equation already isolates x, so substitute it into the first: 3(2y) + 2y = 16, giving 8y = 16 and y = 2. Then x = 2y = 4. Check both: 3(4) + 2(2) = 16 and 4 = 2(2).",
    patternName: "Substitution when a variable is already isolated",
    concept: "Solving a two-by-two system",
    recognitionCues: [
      "One equation of the form x = something",
      "Two unknowns, two equations",
      "Only one variable requested",
    ],
    fastestMethod:
      "Substitute immediately when a variable is isolated, then check which variable the question actually wants before writing an answer.",
    commonTraps: [
      "Solving for y and reporting it as x",
      "Forgetting to multiply the whole substituted expression by the coefficient",
      "Stopping at y without finding x",
    ],
    expectedSeconds: 45,
  },
  {
    id: "alg-sys-005",
    skillId: "systems-two-linear-equations",
    format: "spr",
    stem: "If 4x - y = 11 and 2x + 3y = 9, what is the value of x?",
    difficulty: 3,
    acceptedAnswers: ["3"],
    explanation:
      "Rearrange the first equation to y = 4x - 11, then substitute: 2x + 3(4x - 11) = 9, so 2x + 12x - 33 = 9 and 14x = 42, giving x = 3. Alternatively multiply the first equation by 3 and add: 12x - 3y = 33 plus 2x + 3y = 9 gives 14x = 42. Check: 4(3) - 1 = 11 and 2(3) + 3(1) = 9.",
    patternName: "Eliminate by scaling one equation",
    concept: "Two-by-two system with no ready-made cancellation",
    recognitionCues: [
      "Coefficients that are neither equal nor opposite",
      "One variable with a coefficient of 1, which makes substitution easy",
      "A single variable requested",
    ],
    fastestMethod:
      "Scale the equation whose y coefficient is 1 so the y terms cancel on adding. That avoids fractions entirely.",
    commonTraps: [
      "Forgetting to multiply the constant term when scaling",
      "Adding when subtracting was needed",
      "Reporting y instead of x",
    ],
    expectedSeconds: 65,
  },
  {
    id: "alg-sys-006",
    skillId: "systems-two-linear-equations",
    format: "spr",
    stem: "In the system 6x + ky = 18 and 2x + 3y = 6, k is a constant. If the system has infinitely many solutions, what is the value of k?",
    difficulty: 4,
    acceptedAnswers: ["9"],
    explanation:
      "Infinitely many solutions means the two equations describe the same line, so one must be a multiple of the other. Multiplying the second by 3 gives 6x + 9y = 18, which matches the first exactly when k = 9. Note that the constants already agree at 18, which is what makes this infinitely many rather than no solution.",
    patternName: "Identical-equations condition",
    concept: "When a system has infinitely many solutions",
    recognitionCues: [
      "An unknown constant in a coefficient",
      "The phrase infinitely many solutions",
      "One equation that scales neatly onto the other",
    ],
    fastestMethod:
      "Find the factor that maps one equation onto the other by looking at the x terms, then apply it to the y term.",
    commonTraps: [
      "Confusing the condition with the one for no solution",
      "Scaling only part of the equation",
      "Comparing a coefficient against a constant term",
    ],
    expectedSeconds: 70,
  },

  // --- Linear inequalities -------------------------------------------------
  {
    id: "alg-ineq-004",
    skillId: "linear-inequalities",
    format: "mcq",
    stem: "Which of the following is equivalent to 5 - 2x <= 13?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: "x <= -4",
        distractorType: "sign_error",
        rationale: "Dividing by a negative reverses the inequality, and this keeps the original direction.",
      },
      { label: "B", text: "x >= -4", isCorrect: true, rationale: "-2x <= 8, and dividing by -2 flips the sign to give x >= -4." },
      {
        label: "C",
        text: "x >= 4",
        distractorType: "sign_error",
        rationale: "The direction is right but the sign of the value is wrong: 8 divided by -2 is -4.",
      },
      {
        label: "D",
        text: "x <= 9",
        distractorType: "wrong_operation",
        rationale: "This comes from subtracting rather than dividing, treating -2x as -2 + x.",
      },
    ],
    explanation:
      "Subtract 5 from both sides: -2x <= 8. Dividing by -2 reverses the inequality, giving x >= -4. Test a value from the answer region to be sure: x = 0 gives 5 - 0 = 5, which is at most 13, and 0 is indeed greater than -4.",
    patternName: "Negative coefficient flip",
    concept: "Solving an inequality with a negative coefficient",
    recognitionCues: [
      "A negative coefficient on the variable",
      "Options differing in the direction of the sign",
      "An inequality rather than an equation",
    ],
    fastestMethod:
      "Solve as an equation, flip the moment you divide by a negative, then test one value from your region.",
    commonTraps: [
      "Forgetting to reverse the inequality",
      "Losing the minus sign on the value",
      "Treating the coefficient as a term to subtract",
    ],
    expectedSeconds: 40,
  },
  {
    id: "alg-ineq-005",
    skillId: "linear-inequalities",
    format: "mcq",
    stem: "If -3 < 2x + 1 < 9, which of the following describes all possible values of x?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "-1 < x < 5",
        distractorType: "wrong_operation",
        rationale: "The 1 was subtracted but the division by 2 was applied to only part of the inequality.",
      },
      { label: "B", text: "-2 < x < 4", isCorrect: true, rationale: "Subtracting 1 throughout gives -4 < 2x < 8, and halving throughout gives -2 < x < 4." },
      {
        label: "C",
        text: "-4 < x < 8",
        distractorType: "partial_solution",
        rationale: "This stops after subtracting 1 and never divides by 2.",
      },
      {
        label: "D",
        text: "-2 < x < 5",
        distractorType: "wrong_operation",
        rationale: "The lower bound is right but the upper one was not divided.",
      },
    ],
    explanation:
      "Treat a compound inequality as two inequalities solved at once, applying every operation to all three parts. Subtract 1 throughout: -4 < 2x < 8. Divide throughout by 2: -2 < x < 4. Since 2 is positive, the directions do not change. Test a value: x = 0 gives 1, which lies between -3 and 9.",
    patternName: "Operate on all three parts",
    concept: "Compound inequalities",
    recognitionCues: [
      "Two inequality signs with the variable in the middle",
      "Options giving ranges rather than single bounds",
      "The same operation needed on each part",
    ],
    fastestMethod:
      "Do each operation to all three parts in turn, then sanity-check with a value inside your range.",
    commonTraps: [
      "Applying an operation to only one end",
      "Stopping before the final division",
      "Flipping the signs when dividing by a positive",
    ],
    expectedSeconds: 55,
  },
  {
    id: "alg-ineq-006",
    skillId: "linear-inequalities",
    format: "spr",
    stem: "A goods lift can carry a total of at most 600 kilograms. The operator weighs 80 kilograms and each crate weighs 45 kilograms. What is the greatest number of crates the operator can take in one trip?",
    difficulty: 4,
    acceptedAnswers: ["11"],
    explanation:
      "Let c be the number of crates. The load must satisfy 80 + 45c <= 600, so 45c <= 520 and c <= 11.56 to two decimal places. Crates come whole, so the greatest possible number is 11. Checking: 11 crates give 80 + 495 = 575 kilograms, within the limit, while 12 would give 620, over it.",
    patternName: "Inequality with a whole-number answer",
    concept: "Rounding a bound down to a realistic quantity",
    recognitionCues: [
      "A limit phrased as at most or no more than",
      "A fixed amount plus a repeated amount",
      "A count of physical objects requested",
    ],
    fastestMethod:
      "Set up the inequality, solve to a decimal, then round down because a part-crate is not possible. Always verify the next whole number up breaks the limit.",
    commonTraps: [
      "Rounding up instead of down",
      "Forgetting to subtract the operator's weight",
      "Treating the limit as exact and solving an equation",
    ],
    expectedSeconds: 70,
  },
];
