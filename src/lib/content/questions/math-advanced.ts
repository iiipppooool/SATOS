import type { SeedQuestion } from "../types";

export const ADVANCED_MATH_QUESTIONS: SeedQuestion[] = [
  // --- Equivalent expressions --------------------------------------------
  {
    id: "adv-equiv-001",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "For x not equal to -5, which expression is equivalent to (2x^2 + 7x - 15)/(x + 5)?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "x - 3",
        distractorType: "partial_solution",
        rationale: "The leading coefficient has been dropped. Since the numerator starts with 2x^2 and the denominator with x, the quotient must start with 2x.",
      },
      { label: "B", text: "2x - 3", isCorrect: true, rationale: "2x^2 + 7x - 15 factorises as (2x - 3)(x + 5), and the (x + 5) cancels." },
      {
        label: "C",
        text: "2x + 3",
        distractorType: "sign_error",
        rationale: "Check by expanding: (2x + 3)(x + 5) = 2x^2 + 13x + 15, which is not the numerator.",
      },
      {
        label: "D",
        text: "2x - 15",
        distractorType: "wrong_operation",
        rationale: "This comes from cancelling term by term, which is not valid. Only whole factors cancel.",
      },
    ],
    explanation:
      "Factorise the numerator. Looking for factors of the form (2x + a)(x + b) with ab = -15 and 2b + a = 7, take a = -3 and b = 5: (2x - 3)(x + 5) = 2x^2 + 10x - 3x - 15 = 2x^2 + 7x - 15. The (x + 5) cancels with the denominator, leaving 2x - 3. If factorising is slow, substitute a convenient value such as x = 1: the original gives (2 + 7 - 15)/6 = -1, and only 2x - 3 gives -1 at x = 1.",
    patternName: "Factor and cancel",
    concept: "Simplifying a rational expression by factorising",
    recognitionCues: [
      "A quadratic over a linear expression",
      "A restriction such as x not equal to some value, which hints the denominator cancels",
      "Options that are all linear",
    ],
    fastestMethod:
      "Substitute a simple value such as x = 1 or x = 2 into the original and into the options. One substitution usually eliminates three options and is faster than factorising.",
    alternativeMethod: "Factorise the numerator properly, or use polynomial long division.",
    commonTraps: [
      "Cancelling individual terms instead of whole factors",
      "Losing the leading coefficient",
      "Sign errors when choosing the factor pair",
    ],
    expectedSeconds: 70,
  },
  {
    id: "adv-equiv-002",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "Which expression is equivalent to (8x^6)^(1/3), where x > 0?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "2x^3",
        distractorType: "wrong_operation",
        rationale: "The exponent 6 should be divided by 3, not halved. Dividing gives x^2.",
      },
      { label: "B", text: "2x^2", isCorrect: true, rationale: "The cube root of 8 is 2 and the cube root of x^6 is x^(6/3) = x^2." },
      {
        label: "C",
        text: "8x^2",
        distractorType: "partial_solution",
        rationale: "The cube root was applied to the variable but not to the 8. Both factors take the root.",
      },
      {
        label: "D",
        text: "2x^18",
        distractorType: "wrong_operation",
        rationale: "The exponents have been multiplied instead of divided. A fractional power divides.",
      },
    ],
    explanation:
      "A power applies to every factor inside the brackets: (8x^6)^(1/3) = 8^(1/3) times (x^6)^(1/3). The cube root of 8 is 2, and raising a power to a power multiplies the exponents, so (x^6)^(1/3) = x^2. The result is 2x^2. Check numerically with x = 1: (8)^(1/3) = 2, and 2(1)^2 = 2.",
    patternName: "Fractional exponent on a product",
    concept: "Laws of exponents with rational powers",
    recognitionCues: [
      "A fractional exponent outside a bracket",
      "A perfect cube or square as the numerical coefficient",
      "A restriction such as x > 0 to avoid sign complications",
    ],
    fastestMethod:
      "Deal with the number and the variable separately, then check with x = 1 or x = 2.",
    commonTraps: [
      "Applying the root to only one factor",
      "Multiplying exponents when the rule requires division by the denominator",
      "Confusing a cube root with a square root",
    ],
    expectedSeconds: 55,
  },
  {
    id: "adv-equiv-003",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "Which expression is equivalent to 1/(x - 2) - 1/(x + 2), where x is not equal to 2 or -2?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "0",
        distractorType: "wrong_operation",
        rationale: "The two fractions are not equal, so they do not cancel. Try x = 0: the expression is -1/2 - 1/2 = -1, not 0.",
      },
      {
        label: "B",
        text: "2/(x^2 - 4)",
        distractorType: "partial_solution",
        rationale: "The numerator is wrong. Subtracting (x - 2) from (x + 2) gives 4, not 2.",
      },
      { label: "C", text: "4/(x^2 - 4)", isCorrect: true, rationale: "Over the common denominator (x - 2)(x + 2), the numerator is (x + 2) - (x - 2) = 4." },
      {
        label: "D",
        text: "-4/(x^2 - 4)",
        distractorType: "sign_error",
        rationale: "The subtraction has been done in the wrong order. The first fraction's denominator supplies the second numerator.",
      },
    ],
    explanation:
      "The common denominator is (x - 2)(x + 2) = x^2 - 4. Rewriting: (x + 2)/(x^2 - 4) - (x - 2)/(x^2 - 4). The numerator is (x + 2) - (x - 2) = x + 2 - x + 2 = 4, so the result is 4/(x^2 - 4). Checking with x = 0 gives -1/2 - 1/2 = -1 in the original, and 4/(0 - 4) = -1 in the answer.",
    patternName: "Combine fractions over a difference of two squares",
    concept: "Adding and subtracting rational expressions",
    recognitionCues: [
      "Two fractions with denominators that differ only in sign",
      "Excluded values that are negatives of each other",
      "Options with x^2 - 4 as the denominator",
    ],
    fastestMethod:
      "Spot that the denominators multiply to a difference of two squares, then just compute the numerator. Verify with x = 0 if there is any doubt.",
    commonTraps: [
      "Distributing the minus sign over only part of the second numerator",
      "Assuming similar-looking fractions cancel",
      "Getting the subtraction the wrong way round",
    ],
    expectedSeconds: 85,
  },

  // --- Nonlinear equations and systems -----------------------------------
  {
    id: "adv-nleq-001",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "What is the sum of the solutions to x^2 - 6x + 8 = 0?",
    difficulty: 3,
    acceptedAnswers: ["6"],
    explanation:
      "Factorising gives (x - 2)(x - 4) = 0, so the solutions are 2 and 4 and their sum is 6. Faster: for ax^2 + bx + c = 0 the sum of the roots is -b/a, which here is 6 with no factorising at all.",
    patternName: "Sum of roots",
    concept: "Relationship between coefficients and roots of a quadratic",
    recognitionCues: [
      "A quadratic set equal to zero",
      "The question asks for the sum or product of the solutions, not the solutions themselves",
      "No need to identify which root is which",
    ],
    fastestMethod:
      "Use sum of roots = -b/a and product of roots = c/a. This skips the factorising entirely.",
    alternativeMethod: "Factorise or use the quadratic formula, then add.",
    commonTraps: [
      "Giving one root instead of the sum",
      "Getting the sign of -b/a wrong",
      "Reporting the product by mistake",
    ],
    expectedSeconds: 45,
  },
  {
    id: "adv-nleq-002",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "The graphs of y = x^2 - 4x + 3 and y = x - 1 intersect at two points. What is the sum of the x-coordinates of those points?",
    difficulty: 4,
    acceptedAnswers: ["5"],
    explanation:
      "Set the expressions equal: x^2 - 4x + 3 = x - 1, so x^2 - 5x + 4 = 0. The sum of the roots is -(-5)/1 = 5. Factorising confirms it: (x - 1)(x - 4) = 0 gives x = 1 and x = 4, which sum to 5.",
    patternName: "Set equal, then sum of roots",
    concept: "Intersection of a parabola and a line",
    recognitionCues: [
      "Two equations both equal to y",
      "The word intersect",
      "A request for a sum rather than the individual points",
    ],
    fastestMethod:
      "Equate the right-hand sides, collect into a quadratic equal to zero, then read the sum of the roots off the coefficients.",
    commonTraps: [
      "Forgetting to move the linear terms across, so the quadratic is wrong",
      "Summing y-coordinates when x-coordinates were asked for",
      "Sign error when subtracting x - 1 from both sides",
    ],
    relatedConcepts: ["nonlinear-functions"],
    expectedSeconds: 80,
  },
  {
    id: "adv-nleq-003",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "In the equation x^2 + kx + 16 = 0, k is a positive constant. If the equation has exactly one real solution, what is the value of k?",
    difficulty: 5,
    acceptedAnswers: ["8"],
    explanation:
      "Exactly one real solution means the discriminant is zero: b^2 - 4ac = 0, so k^2 - 4(1)(16) = 0 and k^2 = 64. That gives k = 8 or k = -8, and since k is stated to be positive, k = 8. Sense check: x^2 + 8x + 16 = (x + 4)^2, which indeed has the single root x = -4.",
    patternName: "Discriminant equals zero",
    concept: "Using the discriminant to count real solutions",
    recognitionCues: [
      "The phrase exactly one real solution, or a repeated root",
      "An unknown constant in the equation",
      "A perfect square as the constant term is a hint",
    ],
    fastestMethod:
      "Apply b^2 - 4ac = 0 straight away, then use any stated sign condition to pick between the two values.",
    alternativeMethod:
      "Recognise that the quadratic must be a perfect square, so x^2 + kx + 16 = (x + 4)^2 and k = 8.",
    commonTraps: [
      "Ignoring the condition that k is positive and giving -8",
      "Using b^2 - 4ac > 0, which is the condition for two solutions",
      "Dropping the factor of 4 in the discriminant",
    ],
    expectedSeconds: 85,
  },

  // --- Nonlinear functions -----------------------------------------------
  {
    id: "adv-nlfn-001",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "The function f is defined by f(x) = (x - 3)^2 - 4. What is the minimum value of f?",
    difficulty: 3,
    acceptedAnswers: ["-4"],
    explanation:
      "A squared term is never negative, so (x - 3)^2 is at least 0 and is exactly 0 when x = 3. The smallest value of f is therefore 0 - 4 = -4, reached at x = 3. In vertex form f(x) = a(x - h)^2 + k, the vertex is (h, k) and k is the minimum when a is positive.",
    patternName: "Read the vertex from vertex form",
    concept: "Minimum of a quadratic in completed-square form",
    recognitionCues: [
      "A bracket squared plus or minus a constant",
      "The words minimum or maximum value",
      "No expansion required",
    ],
    fastestMethod:
      "Read k directly from a(x - h)^2 + k. Do not expand; expanding is the slow route and invites errors.",
    commonTraps: [
      "Giving 3, which is where the minimum occurs rather than the minimum itself",
      "Giving 4 instead of -4",
      "Expanding and then losing track of the constant",
    ],
    expectedSeconds: 45,
  },
  {
    id: "adv-nlfn-002",
    skillId: "nonlinear-functions",
    format: "mcq",
    stem: "The function f is defined by f(x) = (x + 1)(x - 5). What is the minimum value of f?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "-9",
        isCorrect: true,
        rationale: "The roots are -1 and 5, so the vertex is at x = 2, and f(2) = (3)(-3) = -9.",
      },
      {
        label: "B",
        text: "-5",
        distractorType: "true_but_irrelevant",
        rationale: "This is the value of f(0), not the minimum. The vertex is at x = 2, not x = 0.",
      },
      {
        label: "C",
        text: "2",
        distractorType: "partial_solution",
        rationale: "This is the x-coordinate of the vertex. The question asks for the minimum value of the function.",
      },
      {
        label: "D",
        text: "-4",
        distractorType: "wrong_operation",
        rationale: "This comes from averaging the roots and then mishandling the substitution.",
      },
    ],
    explanation:
      "A parabola is symmetric about its vertex, so the vertex sits midway between the roots. The roots are x = -1 and x = 5, whose midpoint is x = 2. Substituting: f(2) = (2 + 1)(2 - 5) = (3)(-3) = -9. Since the coefficient of x^2 is positive, the parabola opens upwards and -9 is the minimum.",
    patternName: "Midpoint of the roots gives the vertex",
    concept: "Finding the vertex of a quadratic from factored form",
    recognitionCues: [
      "A quadratic given as a product of two linear factors",
      "A request for a minimum or maximum",
      "Roots that are easy to read off",
    ],
    fastestMethod:
      "Average the two roots to get the x-coordinate of the vertex, then substitute once. Two short steps, no expanding.",
    alternativeMethod: "Expand to x^2 - 4x - 5 and complete the square, or use x = -b/2a.",
    commonTraps: [
      "Reporting the x-coordinate of the vertex instead of the minimum value",
      "Substituting x = 0 out of habit",
      "Sign errors when multiplying two negatives",
    ],
    expectedSeconds: 75,
  },
  {
    id: "adv-nlfn-003",
    skillId: "nonlinear-functions",
    format: "mcq",
    stem: "A bacterial culture starts with 400 cells and doubles every 6 hours. Which function models the number of cells, N, after t hours?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "N(t) = 400 times 2^(6t)",
        distractorType: "reciprocal",
        rationale: "This doubles six times every hour. The 6 belongs in the denominator of the exponent.",
      },
      { label: "B", text: "N(t) = 400 times 2^(t/6)", isCorrect: true, rationale: "At t = 6 the exponent is 1, giving one doubling, which is exactly what the question describes." },
      {
        label: "C",
        text: "N(t) = 400 times 6^(t/2)",
        distractorType: "swapped_values",
        rationale: "The growth factor and the period have swapped places. The quantity doubles, so the base must be 2.",
      },
      {
        label: "D",
        text: "N(t) = 400 + 2^(t/6)",
        distractorType: "wrong_operation",
        rationale: "This is additive, so it models almost no growth. Exponential growth multiplies the starting amount.",
      },
    ],
    explanation:
      "Exponential growth has the form N(t) = N0 times b^(t/p), where N0 is the starting amount, b is the growth factor and p is the time for one application of that factor. Here N0 = 400, b = 2 and p = 6, giving N(t) = 400 times 2^(t/6). Test it: at t = 6, N = 400 times 2 = 800, a single doubling, as required.",
    patternName: "Exponential model from a doubling period",
    concept: "Building an exponential growth function from a verbal description",
    recognitionCues: [
      "A starting amount plus a repeated multiplication",
      "A phrase such as doubles every, triples every or halves every",
      "Options differing in where the period sits in the exponent",
    ],
    fastestMethod:
      "Write N0 times b^(t/p) from the description, then substitute t = p and check you get exactly one application of the growth factor.",
    commonTraps: [
      "Multiplying rather than dividing t by the period",
      "Swapping the base and the period",
      "Adding the exponential term instead of multiplying by it",
    ],
    expectedSeconds: 70,
  },
];
