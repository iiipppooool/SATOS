import type { SeedQuestion } from "../types";

/** Third batch of Algebra. Answers re-derived in tests/maths-verification.test.ts. */
export const ALGEBRA_QUESTIONS_3: SeedQuestion[] = [
  // --- Linear equations in one variable ----------------------------------
  {
    id: "alg-lin1-007",
    skillId: "linear-equations-one-variable",
    format: "spr",
    stem: "If 7 - 2(x + 1) = 3x - 8, what is the value of x?",
    difficulty: 3,
    acceptedAnswers: ["2.6", "13/5"],
    explanation:
      "Distribute the negative: 7 - 2x - 2 = 5 - 2x, so 5 - 2x = 3x - 8. Collecting gives 13 = 5x and x = 13/5 = 2.6. The step that costs marks is the sign on the second term: minus 2 times plus 1 is minus 2, not plus 2.",
    patternName: "Distribute a negative, then collect",
    concept: "Linear equation with a subtracted bracket",
    recognitionCues: [
      "A minus sign directly before a bracket",
      "x terms on both sides",
      "No fractions in the original",
    ],
    fastestMethod:
      "Write out the distribution of the negative on its own line before touching anything else.",
    commonTraps: [
      "Distributing the minus to only the first term",
      "Getting the sign of the constant wrong",
      "Collecting x terms onto the side that leaves a negative coefficient",
    ],
    expectedSeconds: 60,
  },
  {
    id: "alg-lin1-008",
    skillId: "linear-equations-one-variable",
    format: "spr",
    stem: "In the equation 5(x - 2) = ax - 10, a is a constant. For what value of a does the equation have infinitely many solutions?",
    difficulty: 4,
    acceptedAnswers: ["5"],
    explanation:
      "Expanding the left side gives 5x - 10, so the equation reads 5x - 10 = ax - 10. Infinitely many solutions means the two sides are the same expression, which happens exactly when a = 5. The constants already agree at -10, which is what makes this the infinitely-many case rather than no solution.",
    patternName: "Identical-sides condition",
    concept: "When a linear equation holds for every value of x",
    recognitionCues: [
      "A letter standing for a constant rather than an unknown",
      "The phrase infinitely many solutions",
      "Constant terms that already match once expanded",
    ],
    fastestMethod:
      "Expand fully, then compare the x coefficients and the constants separately. Matching both means infinitely many solutions; matching only the coefficients means none.",
    commonTraps: [
      "Solving for x rather than for the constant",
      "Confusing the condition with the one for no solution",
      "Forgetting to expand before comparing",
    ],
    expectedSeconds: 65,
  },
  {
    id: "alg-lin1-009",
    skillId: "linear-equations-one-variable",
    format: "spr",
    stem: "A taxi charges a fixed fee of 3.50 pounds plus 1.20 pounds a mile. A journey cost 17.90 pounds. How many miles was the journey?",
    difficulty: 3,
    acceptedAnswers: ["12"],
    explanation:
      "Let m be the miles: 3.50 + 1.20m = 17.90. Subtracting the fixed fee gives 1.20m = 14.40, so m = 12. Check it: 12 times 1.20 is 14.40, plus 3.50 is 17.90. The error to avoid is dividing the whole 17.90 by 1.20, which ignores the fixed fee.",
    patternName: "Fixed fee plus a rate",
    concept: "Translating a two-part charge into an equation",
    recognitionCues: [
      "A fixed charge plus a per-unit charge",
      "A total given and the quantity requested",
      "Money with two decimal places",
    ],
    fastestMethod:
      "Subtract the fixed part first, then divide by the rate. Never divide the total by the rate.",
    commonTraps: [
      "Dividing the total by the rate and ignoring the fee",
      "Adding the fee instead of subtracting it",
      "Decimal slips in the division",
    ],
    expectedSeconds: 55,
  },
  {
    id: "alg-lin1-010",
    skillId: "linear-equations-one-variable",
    format: "mcq",
    stem: "For which value of k does the equation 3x + k = 3x + 7 have no solution?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Only k = 7",
        distractorType: "wrong_relationship",
        rationale: "k = 7 makes the two sides identical, which gives infinitely many solutions rather than none.",
      },
      { label: "B", text: "Any value of k other than 7", isCorrect: true, rationale: "The x terms cancel, leaving k = 7. If k is anything else that statement is false, so there is no solution." },
      {
        label: "C",
        text: "Only k = 0",
        distractorType: "partial_solution",
        rationale: "k = 0 is one of the values that gives no solution, but it is not the only one.",
      },
      {
        label: "D",
        text: "No value of k",
        distractorType: "wrong_relationship",
        rationale: "Almost every value of k gives no solution here; only k = 7 does not.",
      },
    ],
    explanation:
      "Subtracting 3x from both sides removes x entirely and leaves k = 7. That is a statement about k, not about x. If k equals 7 the statement is always true, so every x works and there are infinitely many solutions. If k is anything else the statement is always false, so no x works and there is no solution. The question asks for no solution, so the answer is every value except 7.",
    patternName: "Variable cancels, leaving a statement about the constant",
    concept: "No solution against infinitely many",
    recognitionCues: [
      "Identical x terms on both sides",
      "A constant to be determined",
      "Options phrased as ranges rather than single values",
    ],
    fastestMethod:
      "Cancel the x terms and read what is left. A true statement means every x works; a false one means none does.",
    commonTraps: [
      "Swapping the two conditions",
      "Giving a single value when the answer is every value but one",
      "Assuming cancelling x means there is no answer to give",
    ],
    expectedSeconds: 70,
  },
  {
    id: "alg-lin1-011",
    skillId: "linear-equations-one-variable",
    format: "spr",
    stem: "If (x + 9)/4 - (x - 3)/6 = 2, what is the value of x?",
    difficulty: 5,
    acceptedAnswers: ["-9"],
    explanation:
      "Multiply every term by 12, the lowest common denominator: 3(x + 9) - 2(x - 3) = 24. Expanding gives 3x + 27 - 2x + 6 = 24, so x + 33 = 24 and x = -9. Check: (0)/4 - (-12)/6 = 0 + 2 = 2. The sign on the second expansion is the whole difficulty, since minus 2 times minus 3 is plus 6.",
    patternName: "Clear two denominators, watch the signs",
    concept: "Subtracting algebraic fractions in an equation",
    recognitionCues: [
      "Two fractions subtracted on one side",
      "Different denominators with a small common multiple",
      "A whole number on the other side",
    ],
    fastestMethod:
      "Multiply through by the lowest common denominator, then expand each bracket on its own line before collecting.",
    commonTraps: [
      "Distributing the minus sign to only the first term",
      "Multiplying only the fractions and not the right-hand side",
      "Using a common denominator but forgetting to multiply the numerators",
    ],
    expectedSeconds: 90,
  },
  {
    id: "alg-lin1-012",
    skillId: "linear-equations-one-variable",
    format: "spr",
    stem: "If 0.4(x - 5) = 0.25x + 1, what is the value of x?",
    difficulty: 4,
    acceptedAnswers: ["20"],
    explanation:
      "Expanding gives 0.4x - 2 = 0.25x + 1, so 0.15x = 3 and x = 20. Multiplying through by 100 first turns it into 40(x - 5) = 25x + 100, which avoids decimal arithmetic entirely and is usually the safer route: 40x - 200 = 25x + 100, so 15x = 300 and x = 20.",
    patternName: "Clear decimals before solving",
    concept: "Linear equations with decimal coefficients",
    recognitionCues: [
      "Decimal coefficients on both sides",
      "A bracket multiplied by a decimal",
      "No fractions written as fractions",
    ],
    fastestMethod:
      "Multiply everything by 10 or 100 so the coefficients become whole numbers, then solve normally.",
    commonTraps: [
      "Multiplying only some terms when clearing decimals",
      "Decimal slips in 0.4 minus 0.25",
      "Forgetting to distribute the decimal across the bracket",
    ],
    expectedSeconds: 70,
  },

  // --- Linear equations in two variables ---------------------------------
  {
    id: "alg-lin2-007",
    skillId: "linear-equations-two-variables",
    format: "spr",
    stem: "A line passes through the points (1, 9) and (5, 1). What is the y-intercept of the line?",
    difficulty: 3,
    acceptedAnswers: ["11"],
    explanation:
      "The slope is (1 - 9)/(5 - 1) = -8/4 = -2. Substituting (1, 9) into y = -2x + b gives 9 = -2 + b, so b = 11. Checking with the other point: -2(5) + 11 = 1, as required. Always test the second point; it catches slope-sign errors immediately.",
    patternName: "Two points to an intercept",
    concept: "Finding the y-intercept from two points",
    recognitionCues: [
      "Two coordinate pairs given",
      "The y-intercept requested specifically",
      "A negative slope, judging by the y values falling",
    ],
    fastestMethod:
      "Slope, substitute, then verify with the point you did not use.",
    commonTraps: [
      "Subtracting coordinates in inconsistent order",
      "Sign error substituting a positive x with a negative slope",
      "Reporting the slope instead of the intercept",
    ],
    expectedSeconds: 55,
  },
  {
    id: "alg-lin2-008",
    skillId: "linear-equations-two-variables",
    format: "mcq",
    stem: "Which equation represents a line parallel to the line 4x - 2y = 9?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "y = -2x + 1",
        distractorType: "sign_error",
        rationale: "The given line has slope +2, not -2.",
      },
      { label: "B", text: "y = 2x - 7", isCorrect: true, rationale: "Rearranged, the given line is y = 2x - 4.5, so any line of slope 2 is parallel to it." },
      {
        label: "C",
        text: "y = -0.5x + 3",
        distractorType: "reciprocal",
        rationale: "That is the negative reciprocal, so this line is perpendicular rather than parallel.",
      },
      {
        label: "D",
        text: "y = 4x - 2",
        distractorType: "partial_solution",
        rationale: "This reads the coefficients straight off the standard form without dividing by the coefficient of y.",
      },
    ],
    explanation:
      "Rearrange to find the slope: 4x - 2y = 9 gives -2y = -4x + 9, so y = 2x - 4.5 and the slope is 2. Parallel lines share a slope, so any line with slope 2 qualifies. Option D is the trap for anyone who reads 4 straight off the standard form without dividing through by the coefficient of y.",
    patternName: "Parallel means equal slope",
    concept: "Extracting a slope from standard form",
    recognitionCues: [
      "The word parallel",
      "A line given as Ax + By = C",
      "Options in slope-intercept form",
    ],
    fastestMethod:
      "Rearrange to y = mx + b, read the slope, then match. The intercept is irrelevant for parallelism.",
    commonTraps: [
      "Reading the x coefficient as the slope",
      "Choosing the negative reciprocal",
      "Dividing by the wrong coefficient",
    ],
    expectedSeconds: 55,
  },
  {
    id: "alg-lin2-009",
    skillId: "linear-equations-two-variables",
    format: "spr",
    stem: "The graph of 5x - 2y = 20 crosses the y-axis at the point (0, k). What is the value of k?",
    difficulty: 2,
    acceptedAnswers: ["-10"],
    explanation:
      "The graph crosses the y-axis where x = 0, so -2y = 20 and y = -10. The sign is the whole question: dividing 20 by -2 gives -10, not 10. Setting y = 0 instead would give the x-intercept of 4, which answers a different question.",
    patternName: "Intercept by substitution",
    concept: "Reading an intercept from standard form",
    recognitionCues: [
      "An equation in Ax + By = C form",
      "The phrase crosses the y-axis",
      "A point written with a zero coordinate",
    ],
    fastestMethod: "Set the other variable to zero and solve in one line.",
    commonTraps: [
      "Setting y = 0 and giving the x-intercept",
      "Dropping the negative when dividing",
      "Reporting the whole coordinate pair",
    ],
    expectedSeconds: 35,
  },
  {
    id: "alg-lin2-010",
    skillId: "linear-equations-two-variables",
    format: "spr",
    stem: "Line j has a slope of 3 and passes through the point (-2, 1). At what value of x does line j cross the x-axis?",
    difficulty: 4,
    acceptedAnswers: ["-7/3", "-2.333"],
    explanation:
      "Substituting the point into y = 3x + b gives 1 = -6 + b, so b = 7 and the line is y = 3x + 7. It crosses the x-axis where y = 0, so 3x = -7 and x = -7/3, which is about -2.333. Leaving the answer as the fraction -7/3 is exact and is accepted.",
    patternName: "Point and slope to an x-intercept",
    concept: "Building a line then finding where it crosses an axis",
    recognitionCues: [
      "A slope and a single point given",
      "The x-intercept requested",
      "An answer that will not be a whole number",
    ],
    fastestMethod:
      "Find b from the point, then set y = 0. Keep the answer as a fraction rather than rounding early.",
    commonTraps: [
      "Setting x = 0 instead of y = 0",
      "Sign error substituting the negative x coordinate",
      "Rounding to -2.3 and losing accuracy",
    ],
    expectedSeconds: 70,
  },
  {
    id: "alg-lin2-011",
    skillId: "linear-equations-two-variables",
    format: "spr",
    stem: "A line passes through (0, 4) and (6, 4). What is the slope of this line?",
    difficulty: 3,
    acceptedAnswers: ["0"],
    explanation:
      "The slope is (4 - 4)/(6 - 0) = 0/6 = 0. The two points share a y value, so the line is horizontal and its slope is zero. The distinction worth holding: a horizontal line has slope 0, while a vertical line has no defined slope at all, because the denominator would be zero.",
    patternName: "Horizontal line has zero slope",
    concept: "Slope of horizontal and vertical lines",
    recognitionCues: [
      "Two points with the same y coordinate",
      "A slope requested",
      "No equation given",
    ],
    fastestMethod:
      "Check whether the y values match, which means slope zero, or the x values match, which means undefined.",
    commonTraps: [
      "Answering undefined, which belongs to a vertical line",
      "Dividing the wrong way round and getting undefined",
      "Assuming a line through two points must have a non-zero slope",
    ],
    expectedSeconds: 40,
  },
  {
    id: "alg-lin2-012",
    skillId: "linear-equations-two-variables",
    format: "spr",
    stem: "In the xy-plane, line p is perpendicular to the line y = (2/5)x + 3 and passes through the origin. What is the value of y on line p when x = 10?",
    difficulty: 5,
    acceptedAnswers: ["-25"],
    explanation:
      "Perpendicular slopes are negative reciprocals, so line p has slope -5/2. Passing through the origin means b = 0, giving y = -(5/2)x. At x = 10 that is -(5/2)(10) = -25. Two checks: the product of the slopes is (2/5)(-5/2) = -1, and passing through the origin means no intercept term to find.",
    patternName: "Perpendicular through the origin",
    concept: "Negative reciprocal slopes",
    recognitionCues: [
      "The word perpendicular with a fractional slope",
      "Through the origin, so no intercept to compute",
      "A specific x value to evaluate at",
    ],
    fastestMethod:
      "Flip the fraction and change the sign, then evaluate. Confirm the slopes multiply to -1.",
    commonTraps: [
      "Using the same slope rather than the negative reciprocal",
      "Flipping without changing the sign",
      "Forgetting that through the origin means b = 0",
    ],
    expectedSeconds: 75,
  },

  // --- Linear functions ----------------------------------------------------
  {
    id: "alg-linf-007",
    skillId: "linear-functions",
    format: "spr",
    stem: "The function f is defined by f(x) = 4x - 11. For what value of x does f(x) = 25?",
    difficulty: 2,
    acceptedAnswers: ["9"],
    explanation:
      "Set the rule equal to the target: 4x - 11 = 25, so 4x = 36 and x = 9. Check: f(9) = 36 - 11 = 25. The common slip is to evaluate f(25) instead, which answers the opposite question.",
    patternName: "Solve backwards from an output",
    concept: "Finding an input from a required output",
    recognitionCues: [
      "An explicit function rule",
      "A target output rather than an input",
      "f(x) = a number, rather than f(number)",
    ],
    fastestMethod: "Set the rule equal to the target and solve. Read which way round the question is first.",
    commonTraps: [
      "Substituting 25 for x",
      "Sign error when moving the constant",
      "Dividing before adding the constant across",
    ],
    expectedSeconds: 35,
  },
  {
    id: "alg-linf-008",
    skillId: "linear-functions",
    format: "mcq",
    stem: "A gym membership costs 25 pounds to join plus 18 pounds a month. The total cost in pounds after m months is C(m) = 25 + 18m. Which statement is the best interpretation of C(0) = 25?",
    difficulty: 2,
    choices: [
      { label: "A", text: "The joining fee is 25 pounds, payable before any month has passed.", isCorrect: true, rationale: "C(0) is the cost at zero months, which is the one-off joining fee." },
      {
        label: "B",
        text: "The membership costs 25 pounds a month.",
        distractorType: "swapped_values",
        rationale: "That describes the coefficient of m, which is 18.",
      },
      {
        label: "C",
        text: "The membership is free for the first month.",
        distractorType: "wrong_relationship",
        rationale: "C(0) = 25 means 25 pounds is owed before any month, which is the opposite of free.",
      },
      {
        label: "D",
        text: "25 months of membership are included.",
        distractorType: "unit_error",
        rationale: "25 is in pounds, not months. Checking units rules this out at once.",
      },
    ],
    explanation:
      "C(0) is the value of the model at zero months, which is the fixed cost incurred before any monthly charge applies: the joining fee of 25 pounds. The coefficient 18 is the monthly rate. Attaching units settles it, since 25 is in pounds and 18 is in pounds per month.",
    patternName: "Interpret a function value in context",
    concept: "Meaning of the intercept in a cost model",
    recognitionCues: [
      "A model with a fixed cost plus a rate",
      "A specific function value quoted",
      "Options describing quantities in words",
    ],
    fastestMethod:
      "Attach units to the number, then check the option does not claim more than the model says.",
    commonTraps: [
      "Swapping the fixed cost and the rate",
      "Reading pounds as months",
      "Inferring a free period from a zero input",
    ],
    expectedSeconds: 45,
  },
  {
    id: "alg-linf-009",
    skillId: "linear-functions",
    format: "spr",
    stimulusTitle: "Table of values",
    stimulus: "x:     2     5     8    11\nf(x):  17    11     5    -1",
    stem: "The table gives values of the linear function f. What is the value of f(0)?",
    difficulty: 3,
    acceptedAnswers: ["21"],
    explanation:
      "Each increase of 3 in x lowers f(x) by 6, so the rate of change is -2 per unit. Going back from x = 2 to x = 0 is two units, raising the value by 4: f(0) = 17 + 4 = 21. The explicit rule is f(x) = -2x + 21, which also gives 21 at x = 0.",
    patternName: "Extend a table backwards",
    concept: "Constant rate of change in tabulated data",
    recognitionCues: [
      "A table with evenly spaced x values",
      "Differences in f(x) that are constant and negative",
      "A value requested outside the table",
    ],
    fastestMethod:
      "Find the change per unit of x, not per row, then step back from the nearest entry.",
    commonTraps: [
      "Using the per-row change of -6 as the rate",
      "Stepping in the wrong direction and giving 13",
      "Assuming the x values increase by one",
    ],
    expectedSeconds: 60,
  },
  {
    id: "alg-linf-010",
    skillId: "linear-functions",
    format: "spr",
    stem: "A linear function h satisfies h(-1) = 8 and h(3) = -4. What is the value of h(5)?",
    difficulty: 4,
    acceptedAnswers: ["-10"],
    explanation:
      "The rate of change is (-4 - 8)/(3 - (-1)) = -12/4 = -3. From h(3) = -4, moving two more units in x lowers the value by 6: h(5) = -4 - 6 = -10. Building the rule gives the same thing, since h(x) = -3x + 5 and h(5) = -15 + 5 = -10.",
    patternName: "Linear function from two values",
    concept: "Extrapolating at a constant rate",
    recognitionCues: [
      "Two input-output pairs with the word linear",
      "A third input requested",
      "A negative rate of change",
    ],
    fastestMethod:
      "Find the rate, then step from the nearest known point. Stepping beats building the whole rule when the target is close.",
    commonTraps: [
      "Sign error in the denominator with a negative input",
      "Stepping in the wrong direction",
      "Dividing the change in x by the change in y",
    ],
    expectedSeconds: 65,
  },
  {
    id: "alg-linf-011",
    skillId: "linear-functions",
    format: "spr",
    stem: "A phone plan charges a fixed monthly fee plus a set amount per gigabyte of data. A month using 4 GB cost 22 pounds and a month using 9 GB cost 32 pounds. What is the fixed monthly fee, in pounds?",
    difficulty: 4,
    acceptedAnswers: ["14"],
    explanation:
      "The cost per gigabyte is the change in cost over the change in data: (32 - 22)/(9 - 4) = 10/5 = 2 pounds a gigabyte. The fixed fee is then the cost with the data charge removed: 22 - 4 times 2 = 14 pounds. Checking the other month: 14 + 9 times 2 = 32, as required.",
    patternName: "Rate then fixed fee from two observations",
    concept: "Separating a fixed charge from a variable one",
    recognitionCues: [
      "Two totals at two different usage levels",
      "A fixed fee plus a per-unit charge described in words",
      "The fixed part requested",
    ],
    fastestMethod:
      "Find the per-unit rate from the differences first, then subtract the usage charge from either total. Verify against the other total.",
    commonTraps: [
      "Dividing a total by its usage and treating that as the rate",
      "Forgetting to remove the usage charge when finding the fee",
      "Using only one of the two observations",
    ],
    expectedSeconds: 75,
  },
  {
    id: "alg-linf-012",
    skillId: "linear-functions",
    format: "mcq",
    stem: "For a linear function g, g(4) = g(10). Which statement must be true?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "g has a positive rate of change.",
        distractorType: "wrong_relationship",
        rationale: "A positive rate would make g(10) larger than g(4), not equal to it.",
      },
      { label: "B", text: "g is constant, so g(x) is the same for every x.", isCorrect: true, rationale: "A linear function with two equal outputs at different inputs must have a rate of change of zero, so it is constant everywhere." },
      {
        label: "C",
        text: "g(7) is greater than g(4).",
        distractorType: "wrong_relationship",
        rationale: "A constant function takes the same value at 7 as anywhere else.",
      },
      {
        label: "D",
        text: "g has a y-intercept of zero.",
        distractorType: "too_broad",
        rationale: "The constant could be any value. Nothing here fixes it at zero.",
      },
    ],
    explanation:
      "For a linear function the rate of change is (g(10) - g(4))/(10 - 4). If the two outputs are equal the numerator is zero, so the rate is zero and the function is constant: its graph is a horizontal line. That makes every output equal, which is B. Note this reasoning depends on g being linear; a quadratic can easily take the same value at two different inputs without being constant.",
    patternName: "Equal outputs force a zero rate",
    concept: "What a constant rate of change implies",
    recognitionCues: [
      "Two function values stated as equal",
      "The word linear",
      "Options making claims about other inputs",
    ],
    fastestMethod:
      "Write the rate of change as a fraction. A zero numerator forces a zero slope, and for a linear function that means constant.",
    commonTraps: [
      "Reasoning as though the function could be a parabola",
      "Concluding something about the intercept",
      "Assuming a line through two points must rise or fall",
    ],
    expectedSeconds: 70,
  },

  // --- Systems of two linear equations --------------------------------------
  {
    id: "alg-sys-007",
    skillId: "systems-two-linear-equations",
    format: "spr",
    stem: "If 3x + 4y = 25 and 3x - 2y = 7, what is the value of y?",
    difficulty: 2,
    acceptedAnswers: ["3"],
    explanation:
      "The x terms are identical, so subtracting the second equation from the first eliminates x: 6y = 18 and y = 3. Substituting back gives 3x = 13, so x is not a whole number, which is fine because the question only asks for y. Checking which variable is wanted before solving saves time here.",
    patternName: "Eliminate by subtracting",
    concept: "Two-by-two system with a matching coefficient",
    recognitionCues: [
      "Identical coefficients on one variable",
      "Only one variable requested",
      "Subtraction will cancel rather than addition",
    ],
    fastestMethod:
      "Subtract to cancel the matching variable, then stop as soon as you have the one you were asked for.",
    commonTraps: [
      "Adding when the coefficients match in sign",
      "Solving for x unnecessarily",
      "Sign error subtracting a negative term",
    ],
    expectedSeconds: 45,
  },
  {
    id: "alg-sys-008",
    skillId: "systems-two-linear-equations",
    format: "spr",
    stem: "If 2x + 3y = 18 and 5x - y = 11, what is the value of x + y?",
    difficulty: 4,
    acceptedAnswers: ["7"],
    explanation:
      "From the second equation, y = 5x - 11. Substituting: 2x + 3(5x - 11) = 18, so 2x + 15x - 33 = 18, giving 17x = 51 and x = 3. Then y = 4, so x + y = 7. Checking both: 6 + 12 = 18 and 15 - 4 = 11.",
    patternName: "Solve both, then combine",
    concept: "Two-by-two system where a combination is requested",
    recognitionCues: [
      "A coefficient of 1 or -1 on one variable, making substitution easy",
      "x + y or x - y requested rather than a single variable",
      "Both variables needed",
    ],
    fastestMethod:
      "Isolate the variable whose coefficient is 1, substitute, then compute the requested combination rather than stopping at one variable.",
    commonTraps: [
      "Stopping after finding x",
      "Sign error isolating y from 5x - y = 11",
      "Forgetting to distribute the 3 across both terms",
    ],
    expectedSeconds: 75,
  },
  {
    id: "alg-sys-009",
    skillId: "systems-two-linear-equations",
    format: "spr",
    stem: "A shop sells pens at 80 pence and notebooks at 2.50 pounds. A customer buys 11 items in total and pays 15.60 pounds. How many notebooks did they buy?",
    difficulty: 4,
    acceptedAnswers: ["4"],
    explanation:
      "Work in pence to keep everything whole. Let n be notebooks and p pens: p + n = 11 and 80p + 250n = 1560. Substituting p = 11 - n gives 880 - 80n + 250n = 1560, so 170n = 680 and n = 4. Check: 4 notebooks at 250p is 1000p, 7 pens at 80p is 560p, and together that is 1560p, or 15.60 pounds. A quicker route is to start from all pens, which would cost 880p, and note that each swap of a pen for a notebook adds 170p; the excess of 680p therefore needs 4 swaps.",
    patternName: "Count and value system",
    concept: "Two equations from a total count and a total value",
    recognitionCues: [
      "A total number of items and a total cost",
      "Two item types at different prices",
      "A count of one type requested",
    ],
    fastestMethod:
      "Work in the smaller unit, then use the swap method: cost if all were the cheap item, divide the excess by the price difference.",
    commonTraps: [
      "Mixing pounds and pence in one equation",
      "Answering with the other item type",
      "Not checking the result against the stated total",
    ],
    expectedSeconds: 85,
  },
  {
    id: "alg-sys-010",
    skillId: "systems-two-linear-equations",
    format: "mcq",
    stem: "The system 3x + 6y = 12 and x + 2y = 7 has how many solutions?",
    difficulty: 3,
    choices: [
      { label: "A", text: "No solutions", isCorrect: true, rationale: "Dividing the first by 3 gives x + 2y = 4, which contradicts x + 2y = 7, so the lines are parallel and distinct." },
      {
        label: "B",
        text: "Exactly one solution",
        distractorType: "wrong_relationship",
        rationale: "One solution requires different slopes, but these lines have the same slope.",
      },
      {
        label: "C",
        text: "Infinitely many solutions",
        distractorType: "wrong_relationship",
        rationale: "That would need the equations to be multiples of each other including the constants, and 12 is not 3 times 7.",
      },
      {
        label: "D",
        text: "Exactly two solutions",
        distractorType: "wrong_relationship",
        rationale: "Two straight lines cannot meet at exactly two points.",
      },
    ],
    explanation:
      "Divide the first equation by 3: x + 2y = 4. The second says x + 2y = 7. The same expression cannot equal both 4 and 7, so the lines are parallel and never meet, giving no solutions. Had the first reduced to x + 2y = 7 the two equations would be identical and there would be infinitely many. The quick test is to scale one equation and compare both the coefficients and the constant.",
    patternName: "Scale one equation and compare",
    concept: "Counting solutions of a linear system",
    recognitionCues: [
      "Coefficients that are simple multiples of each other",
      "A question asking how many solutions",
      "Constants that are not in the same ratio",
    ],
    fastestMethod:
      "Scale one equation so the coefficients match, then compare the constants. Same constant means infinitely many, different means none.",
    commonTraps: [
      "Checking the coefficients but not the constants",
      "Assuming every system has one solution",
      "Offering two solutions, which straight lines cannot have",
    ],
    expectedSeconds: 60,
  },
  {
    id: "alg-sys-011",
    skillId: "systems-two-linear-equations",
    format: "spr",
    stem: "The graphs of y = 2x - 1 and y = -x + 8 intersect at a point. What is the sum of the coordinates of that point?",
    difficulty: 3,
    acceptedAnswers: ["8"],
    explanation:
      "Set the expressions equal: 2x - 1 = -x + 8, so 3x = 9 and x = 3. Then y = 2(3) - 1 = 5, and the point is (3, 5). The sum of the coordinates is 8. Substituting into the other equation checks it: -3 + 8 = 5.",
    patternName: "Equate two expressions for y",
    concept: "Intersection of two lines",
    recognitionCues: [
      "Two equations both given as y equals something",
      "The word intersect",
      "A combination of the coordinates requested",
    ],
    fastestMethod:
      "Set the right-hand sides equal, solve for x, substitute into the simpler equation, then answer the question actually asked.",
    commonTraps: [
      "Giving only the x coordinate",
      "Substituting into the wrong equation and not checking",
      "Sign error collecting -x onto the left",
    ],
    expectedSeconds: 55,
  },
  {
    id: "alg-sys-012",
    skillId: "systems-two-linear-equations",
    format: "spr",
    stem: "In the system 4x + ky = 20 and 2x + 5y = 9, k is a constant. For what value of k does the system have no solution?",
    difficulty: 5,
    acceptedAnswers: ["10"],
    explanation:
      "No solution means the lines are parallel but distinct, so the coefficients are proportional while the constants are not. The x coefficients give a factor of 4/2 = 2, so k must be 2 times 5 = 10. Checking it is genuinely no solution rather than infinitely many: with k = 10 the first equation is 4x + 10y = 20, which halves to 2x + 5y = 10, and that contradicts 2x + 5y = 9. Parallel and distinct, so no solution.",
    patternName: "Parallel-lines condition",
    concept: "When a system has no solution",
    recognitionCues: [
      "An unknown constant in a coefficient",
      "The phrase no solution",
      "Coefficients in a clean ratio",
    ],
    fastestMethod:
      "Find the scale factor from the x coefficients, apply it to the y coefficient, then confirm the constants do not also scale.",
    commonTraps: [
      "Stopping before checking it is not the infinitely-many case",
      "Comparing a coefficient against a constant",
      "Inverting the scale factor",
    ],
    expectedSeconds: 85,
  },

  // --- Linear inequalities ---------------------------------------------------
  {
    id: "alg-ineq-007",
    skillId: "linear-inequalities",
    format: "mcq",
    stem: "Which of the following is equivalent to 4 - 3x > 19?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: "x > -5",
        distractorType: "sign_error",
        rationale: "Dividing by a negative reverses the inequality, and this keeps the original direction.",
      },
      { label: "B", text: "x < -5", isCorrect: true, rationale: "-3x > 15, and dividing by -3 flips the sign to give x < -5." },
      {
        label: "C",
        text: "x < 5",
        distractorType: "sign_error",
        rationale: "The direction is right but 15 divided by -3 is -5, not 5.",
      },
      {
        label: "D",
        text: "x > 5",
        distractorType: "wrong_operation",
        rationale: "Both the direction and the sign of the value are wrong here.",
      },
    ],
    explanation:
      "Subtract 4 from both sides: -3x > 15. Dividing by -3 reverses the inequality, giving x < -5. Test a value from the answer region: x = -6 gives 4 + 18 = 22, which is greater than 19, so values below -5 do satisfy it.",
    patternName: "Negative coefficient flip",
    concept: "Inequalities with a negative coefficient",
    recognitionCues: [
      "A negative coefficient on the variable",
      "Options differing only in direction and sign",
      "An inequality rather than an equation",
    ],
    fastestMethod:
      "Solve as an equation, flip the moment you divide by a negative, then test one value from your region.",
    commonTraps: [
      "Forgetting to reverse the inequality",
      "Losing the minus on the value",
      "Flipping when only subtracting",
    ],
    expectedSeconds: 40,
  },
  {
    id: "alg-ineq-008",
    skillId: "linear-inequalities",
    format: "spr",
    stem: "A student needs a mean of at least 80 across four tests. Their first three scores are 72, 85 and 78. What is the lowest score they can get on the fourth test and still reach the target?",
    difficulty: 4,
    acceptedAnswers: ["85"],
    explanation:
      "A mean of at least 80 over four tests needs a total of at least 320. The first three sum to 235, so the fourth must be at least 320 - 235 = 85. Checking: 72 + 85 + 78 + 85 = 320, which is a mean of exactly 80. The phrase at least means the boundary value itself is allowed.",
    patternName: "Required value to reach a mean",
    concept: "Working backwards from a mean constraint",
    recognitionCues: [
      "A target mean with some values already known",
      "The phrase at least or no less than",
      "A missing value requested",
    ],
    fastestMethod:
      "Convert the mean into a required total, subtract what you already have, and remember that at least includes the boundary.",
    commonTraps: [
      "Averaging the three known scores and comparing to 80",
      "Adding one to the boundary because of the word least",
      "Dividing by three rather than four",
    ],
    expectedSeconds: 70,
  },
  {
    id: "alg-ineq-009",
    skillId: "linear-inequalities",
    format: "mcq",
    stem: "Which ordered pair (x, y) satisfies both 2x + y <= 10 and y > x - 2?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "(4, 4)",
        distractorType: "partial_solution",
        rationale: "It satisfies the second inequality, since 4 > 2, but fails the first: 8 + 4 = 12, which is more than 10.",
      },
      { label: "B", text: "(2, 3)", isCorrect: true, rationale: "4 + 3 = 7 is at most 10, and 3 > 0, so both conditions hold." },
      {
        label: "C",
        text: "(3, 1)",
        distractorType: "wrong_relationship",
        rationale: "It satisfies the first inequality, since 7 is at most 10, but fails the second: 1 is not greater than 1.",
      },
      {
        label: "D",
        text: "(6, 1)",
        distractorType: "wrong_relationship",
        rationale: "It fails both: 13 is more than 10, and 1 is not greater than 4.",
      },
    ],
    explanation:
      "Test each pair in both inequalities and discard as soon as one fails. For (2, 3): the first gives 4 + 3 = 7, at most 10, and the second gives 3 > 0. Both hold. Each wrong option is instructive: (4, 4) passes the second but not the first, (3, 1) passes the first but not the second, and notice how close (3, 1) is, failing only because the sign is strict and 1 is not greater than 1.",
    patternName: "Test the point in both constraints",
    concept: "Solutions to a system of inequalities",
    recognitionCues: [
      "Two inequalities and four coordinate pairs",
      "The word both",
      "A mix of strict and non-strict signs",
    ],
    fastestMethod:
      "Substitute into whichever inequality is quicker to evaluate and discard failures immediately. Pay attention to strict signs at the boundary.",
    commonTraps: [
      "Checking only one inequality",
      "Treating a strict inequality as allowing equality",
      "Arithmetic slips with the larger coordinates",
    ],
    expectedSeconds: 65,
  },
  {
    id: "alg-ineq-010",
    skillId: "linear-inequalities",
    format: "spr",
    stem: "A delivery van can carry a load of no more than 1,200 kilograms. It is already carrying 340 kilograms of equipment, and each parcel weighs 26 kilograms. What is the greatest number of parcels it can carry?",
    difficulty: 3,
    acceptedAnswers: ["33"],
    explanation:
      "Let p be the parcels: 340 + 26p is at most 1,200, so 26p is at most 860 and p is at most 33.08. Parcels are whole, so the greatest number is 33. Checking: 33 parcels weigh 858 kg, giving 1,198 kg in total, while 34 would give 1,224 kg and exceed the limit.",
    patternName: "Inequality with a whole-number answer",
    concept: "Rounding a bound down to a realistic count",
    recognitionCues: [
      "A limit phrased as no more than or at most",
      "A fixed load plus a repeated load",
      "A count of objects requested",
    ],
    fastestMethod:
      "Subtract the fixed load, divide by the unit load, round down. Always verify the next whole number up breaks the limit.",
    commonTraps: [
      "Rounding up",
      "Forgetting to subtract the equipment already loaded",
      "Treating the limit as an equation",
    ],
    expectedSeconds: 65,
  },
  {
    id: "alg-ineq-011",
    skillId: "linear-inequalities",
    format: "mcq",
    stem: "If -2 <= 3x - 5 < 7, which of the following describes all possible values of x?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "-1 <= x < 4",
        distractorType: "wrong_operation",
        rationale: "This divides only part of the inequality by 3.",
      },
      { label: "B", text: "1 <= x < 4", isCorrect: true, rationale: "Adding 5 throughout gives 3 <= 3x < 12, and dividing throughout by 3 gives 1 <= x < 4." },
      {
        label: "C",
        text: "3 <= x < 12",
        distractorType: "partial_solution",
        rationale: "This stops after adding 5 and never divides by 3.",
      },
      {
        label: "D",
        text: "1 < x <= 4",
        distractorType: "wrong_relationship",
        rationale: "The strict and non-strict signs have been swapped. The original is non-strict on the left.",
      },
    ],
    explanation:
      "Apply every operation to all three parts. Adding 5 throughout gives 3 <= 3x < 12, and dividing throughout by 3 gives 1 <= x < 4. Since 3 is positive the directions do not change, and the strictness of each end carries through unchanged: the left stays inclusive and the right stays exclusive. Test x = 1: 3 - 5 = -2, which satisfies the non-strict left end.",
    patternName: "Operate on all three parts",
    concept: "Compound inequalities and strictness",
    recognitionCues: [
      "Two inequality signs with the variable in the middle",
      "One strict and one non-strict sign",
      "Options differing in which end is inclusive",
    ],
    fastestMethod:
      "Do each operation to all three parts, keep each end's strictness unchanged, then test a boundary value.",
    commonTraps: [
      "Dividing only one end",
      "Swapping which end is inclusive",
      "Stopping before the division",
    ],
    expectedSeconds: 70,
  },
  {
    id: "alg-ineq-012",
    skillId: "linear-inequalities",
    format: "spr",
    stem: "For the inequality 7x - 4 >= 2x + 26, what is the least possible integer value of x?",
    difficulty: 3,
    acceptedAnswers: ["6"],
    explanation:
      "Collecting gives 5x >= 30, so x >= 6. The least integer satisfying that is 6 itself, because the sign allows equality. Checking: at x = 6 the left side is 38 and the right side is 38, so they are equal and the condition holds. With a strict inequality the answer would have been 7.",
    patternName: "Least integer satisfying a bound",
    concept: "Whether the boundary value is included",
    recognitionCues: [
      "A greater-than-or-equal sign",
      "The words least or greatest integer value",
      "Variables on both sides",
    ],
    fastestMethod:
      "Solve for the bound, then check the sign: inclusive means the boundary itself qualifies, strict means the next integer.",
    commonTraps: [
      "Giving 7 by treating the sign as strict",
      "Flipping the inequality when no negative division occurs",
      "Collecting the x terms to leave a negative coefficient",
    ],
    expectedSeconds: 50,
  },
];
