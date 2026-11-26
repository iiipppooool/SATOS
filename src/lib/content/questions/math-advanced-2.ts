import type { SeedQuestion } from "../types";

/** Second batch of Advanced Math items. Answers re-derived in tests/maths-verification.test.ts. */
export const ADVANCED_MATH_QUESTIONS_2: SeedQuestion[] = [
  // --- Equivalent expressions ---------------------------------------------
  {
    id: "adv-equiv-004",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "Which expression is equivalent to (x + 5)(x - 3)?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: "x^2 - 15",
        distractorType: "partial_solution",
        rationale: "Only the first and last terms were multiplied. The two middle products are missing.",
      },
      { label: "B", text: "x^2 + 2x - 15", isCorrect: true, rationale: "The middle terms give -3x + 5x = 2x, and 5 times -3 is -15." },
      {
        label: "C",
        text: "x^2 - 2x - 15",
        distractorType: "sign_error",
        rationale: "The middle terms were combined the wrong way round: +5x - 3x is +2x, not -2x.",
      },
      {
        label: "D",
        text: "x^2 + 8x + 15",
        distractorType: "sign_error",
        rationale: "This expands (x + 5)(x + 3). The second bracket has a minus sign.",
      },
    ],
    explanation:
      "Multiply every term in the first bracket by every term in the second: x times x gives x^2, x times -3 gives -3x, 5 times x gives 5x, and 5 times -3 gives -15. Combining the middle terms, -3x + 5x = 2x, so the result is x^2 + 2x - 15. A quick check is to substitute x = 1: the original gives (6)(-2) = -12, and 1 + 2 - 15 = -12.",
    patternName: "Expand a pair of binomials",
    concept: "Multiplying two linear expressions",
    recognitionCues: [
      "Two brackets side by side",
      "Options that are all quadratics",
      "Options differing in the middle term",
    ],
    fastestMethod:
      "Get the constant term first, since it eliminates most options instantly, then work out the middle term.",
    alternativeMethod: "Substitute x = 1 or x = 2 into the original and into each option.",
    commonTraps: [
      "Multiplying only the first and last terms",
      "Combining the middle terms with the wrong sign",
      "Missing the minus in the second bracket",
    ],
    expectedSeconds: 40,
  },
  {
    id: "adv-equiv-005",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "Which expression is equivalent to x^2 - 9x + 20?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "(x - 2)(x - 10)",
        distractorType: "wrong_operation",
        rationale: "These multiply to 20 but add to -12, not -9.",
      },
      { label: "B", text: "(x - 4)(x - 5)", isCorrect: true, rationale: "-4 and -5 multiply to 20 and add to -9, which matches the quadratic." },
      {
        label: "C",
        text: "(x + 4)(x + 5)",
        distractorType: "sign_error",
        rationale: "These give a middle term of +9x rather than -9x.",
      },
      {
        label: "D",
        text: "(x - 1)(x - 20)",
        distractorType: "wrong_operation",
        rationale: "These multiply to 20 but add to -21.",
      },
    ],
    explanation:
      "Look for two numbers that multiply to the constant, 20, and add to the coefficient of x, which is -9. Both must be negative because their product is positive and their sum negative. The pairs multiplying to 20 are 1 and 20, 2 and 10, and 4 and 5; only 4 and 5 add to 9. So the factorisation is (x - 4)(x - 5).",
    patternName: "Factorise by finding a sum and product",
    concept: "Factorising a monic quadratic",
    recognitionCues: [
      "A quadratic with leading coefficient 1",
      "Options that are all pairs of brackets",
      "A small constant term with few factor pairs",
    ],
    fastestMethod:
      "List the factor pairs of the constant and test which pair sums to the middle coefficient. Decide the signs from whether the constant and middle term are positive or negative.",
    commonTraps: [
      "Finding a pair with the right product but the wrong sum",
      "Getting the signs the wrong way round",
      "Forgetting that a positive constant with a negative middle term means both factors are negative",
    ],
    expectedSeconds: 50,
  },
  {
    id: "adv-equiv-006",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "Which expression is equivalent to (3x^2 y)^3?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "9x^6 y^3",
        distractorType: "wrong_operation",
        rationale: "The 3 was squared rather than cubed. Every factor takes the outer power.",
      },
      { label: "B", text: "27x^6 y^3", isCorrect: true, rationale: "3 cubed is 27, (x^2)^3 is x^6, and y cubed is y^3." },
      {
        label: "C",
        text: "27x^5 y^3",
        distractorType: "wrong_operation",
        rationale: "The exponents were added rather than multiplied. A power raised to a power multiplies.",
      },
      {
        label: "D",
        text: "3x^6 y^3",
        distractorType: "partial_solution",
        rationale: "The outer power was applied to the variables but not to the coefficient 3.",
      },
    ],
    explanation:
      "An outer power applies to every factor inside the brackets. The coefficient 3 becomes 3^3 = 27. For x^2 the exponents multiply, giving x^6. The y becomes y^3. The result is 27x^6 y^3. Checking with x = y = 1 confirms the coefficient: (3)^3 = 27.",
    patternName: "Power of a product",
    concept: "Applying an exponent to every factor",
    recognitionCues: [
      "A bracket containing a coefficient and variables, raised to a power",
      "Options differing in the coefficient and in one exponent",
      "No fractional powers",
    ],
    fastestMethod:
      "Handle the coefficient first, since it eliminates half the options, then multiply the variable exponents.",
    commonTraps: [
      "Leaving the coefficient untouched",
      "Adding the exponents instead of multiplying",
      "Using the wrong power on the coefficient",
    ],
    expectedSeconds: 45,
  },
  {
    id: "adv-equiv-007",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "For x not equal to 4, which expression is equivalent to (x^2 - 16)/(x^2 - 8x + 16)?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "(x - 4)/(x + 4)",
        distractorType: "reciprocal",
        rationale: "This is the reciprocal of the correct answer. Check which factor cancels from which part.",
      },
      { label: "B", text: "(x + 4)/(x - 4)", isCorrect: true, rationale: "The numerator factorises to (x - 4)(x + 4) and the denominator to (x - 4)^2, so one (x - 4) cancels." },
      {
        label: "C",
        text: "x + 4",
        distractorType: "wrong_operation",
        rationale: "This cancels both factors of (x - 4) from the denominator, but only one is available in the numerator.",
      },
      {
        label: "D",
        text: "(x - 16)/(x - 8)",
        distractorType: "wrong_operation",
        rationale: "This cancels term by term, which is not valid. Only whole factors cancel.",
      },
    ],
    explanation:
      "Factorise both parts. The numerator is a difference of two squares: x^2 - 16 = (x - 4)(x + 4). The denominator is a perfect square: x^2 - 8x + 16 = (x - 4)^2. Cancelling one (x - 4) from each leaves (x + 4)/(x - 4). Substituting x = 0 confirms it: the original is -16/16 = -1, and 4/(-4) = -1.",
    patternName: "Factorise both parts, then cancel",
    concept: "Simplifying a rational expression",
    recognitionCues: [
      "A difference of two squares in the numerator",
      "A perfect square trinomial in the denominator",
      "An excluded value hinting at what cancels",
    ],
    fastestMethod:
      "Substitute a convenient value such as x = 0 into the original and into each option. One substitution usually leaves a single survivor.",
    commonTraps: [
      "Cancelling terms rather than whole factors",
      "Cancelling the squared factor twice",
      "Inverting the final fraction",
    ],
    expectedSeconds: 75,
  },
  {
    id: "adv-equiv-008",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "Which expression is equivalent to the square root of 50 plus the square root of 18?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "the square root of 68",
        distractorType: "wrong_operation",
        rationale: "Square roots cannot be added by adding what is inside them. Check numerically: root 68 is about 8.25, but the original is about 11.31.",
      },
      { label: "B", text: "8 times the square root of 2", isCorrect: true, rationale: "Root 50 is 5 root 2 and root 18 is 3 root 2, so together they make 8 root 2." },
      {
        label: "C",
        text: "15 times the square root of 2",
        distractorType: "wrong_operation",
        rationale: "The coefficients were multiplied rather than added. Like terms are added.",
      },
      {
        label: "D",
        text: "4 times the square root of 17",
        distractorType: "wrong_operation",
        rationale: "This averages the numbers inside the roots, which is not a valid operation.",
      },
    ],
    explanation:
      "Simplify each surd by extracting square factors. 50 = 25 times 2, so its root is 5 root 2. 18 = 9 times 2, so its root is 3 root 2. They now share the same surd, so they add like terms: 5 root 2 + 3 root 2 = 8 root 2. Numerically that is about 11.31, which matches 7.07 + 4.24.",
    patternName: "Simplify surds to a common radical",
    concept: "Adding square roots",
    recognitionCues: [
      "Two square roots added, with numbers that have square factors",
      "Options mixing a single root and a coefficient times a root",
      "No variables involved",
    ],
    fastestMethod:
      "Pull out the largest square factor from each root, then add the coefficients. If the surds do not match, they cannot be combined.",
    commonTraps: [
      "Adding the numbers inside the roots",
      "Multiplying the coefficients instead of adding",
      "Failing to extract the square factor first",
    ],
    expectedSeconds: 65,
  },
  {
    id: "adv-equiv-009",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "Which expression is equivalent to (2x^3)^2 times 3x, where x is positive?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "6x^7",
        distractorType: "wrong_operation",
        rationale: "The 2 inside the bracket was not squared. (2x^3)^2 gives 4x^6, not 2x^6.",
      },
      { label: "B", text: "12x^7", isCorrect: true, rationale: "(2x^3)^2 = 4x^6, and multiplying by 3x gives 12x^7." },
      {
        label: "C",
        text: "12x^6",
        distractorType: "wrong_operation",
        rationale: "The final x was not counted. Multiplying x^6 by x gives x^7.",
      },
      {
        label: "D",
        text: "6x^6",
        distractorType: "wrong_operation",
        rationale: "Two errors: the coefficient was not squared and the final x was dropped.",
      },
    ],
    explanation:
      "Deal with the bracket first: (2x^3)^2 means 2^2 times x^(3 times 2), which is 4x^6. Then multiply by 3x: the coefficients give 4 times 3 = 12, and the powers add, giving x^(6+1) = x^7. The answer is 12x^7. Substituting x = 1 confirms the coefficient, since (2)^2 times 3 = 12.",
    patternName: "Bracket power then multiply",
    concept: "Combining the power and product rules",
    recognitionCues: [
      "A bracket raised to a power multiplied by another term",
      "Options differing in both coefficient and exponent",
      "A positivity condition to avoid sign complications",
    ],
    fastestMethod:
      "Resolve the bracket completely before multiplying, and check the coefficient with x = 1.",
    commonTraps: [
      "Forgetting to raise the coefficient to the power",
      "Dropping the single x when adding exponents",
      "Multiplying exponents where they should be added",
    ],
    expectedSeconds: 50,
  },
  {
    id: "adv-equiv-010",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "For non-zero x and y, which single fraction is equivalent to 1/x + 1/y?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "1/(x + y)",
        distractorType: "wrong_operation",
        rationale: "Denominators are not added. Test with x = y = 2: the original is 1, but 1/4 is not.",
      },
      {
        label: "B",
        text: "2/(xy)",
        distractorType: "wrong_operation",
        rationale: "This only works when x and y are equal, so it is not an identity.",
      },
      { label: "C", text: "(x + y)/(xy)", isCorrect: true, rationale: "Over the common denominator xy, the numerators become y and x, so the sum is (x + y)/(xy)." },
      {
        label: "D",
        text: "(xy)/(x + y)",
        distractorType: "reciprocal",
        rationale: "This is the reciprocal of the correct answer, and is the formula for combining resistances rather than adding fractions.",
      },
    ],
    explanation:
      "The common denominator is xy. Rewriting, 1/x becomes y/(xy) and 1/y becomes x/(xy). Adding the numerators gives (y + x)/(xy), which is the same as (x + y)/(xy). Check with x = 2 and y = 3: the original is 1/2 + 1/3 = 5/6, and (2 + 3)/6 = 5/6.",
    patternName: "Combine reciprocals over a common denominator",
    concept: "Adding algebraic fractions",
    recognitionCues: [
      "Two reciprocals added",
      "Options including both a fraction and its reciprocal",
      "Non-zero conditions stated",
    ],
    fastestMethod:
      "Test with x = 2 and y = 3. Any option that fails on those numbers is out, which usually leaves one.",
    commonTraps: [
      "Adding the denominators",
      "Choosing the reciprocal of the right answer",
      "Choosing an option that only works when x equals y",
    ],
    expectedSeconds: 70,
  },

  // --- Nonlinear equations and systems -------------------------------------
  {
    id: "adv-nleq-004",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "If 2x^2 - 18 = 0 and x > 0, what is the value of x?",
    difficulty: 2,
    acceptedAnswers: ["3"],
    explanation:
      "Add 18 and divide by 2 to get x^2 = 9, so x = 3 or x = -3. The condition x > 0 selects 3. The common error is to forget that a squared term has two roots and then ignore the stated condition; here the condition is what makes the answer unique.",
    patternName: "Isolate the square, then apply the condition",
    concept: "Solving a simple quadratic with a sign condition",
    recognitionCues: [
      "A squared term and a constant, with no linear term",
      "A condition such as x > 0 or x < 0",
      "A single value requested",
    ],
    fastestMethod:
      "Isolate x^2, take both roots, then use the stated condition to choose between them.",
    commonTraps: [
      "Dividing by 2 before adding 18",
      "Giving the negative root",
      "Forgetting the square root altogether and answering 9",
    ],
    expectedSeconds: 40,
  },
  {
    id: "adv-nleq-005",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "What is the sum of the solutions to (x - 4)(x + 7) = 0?",
    difficulty: 2,
    acceptedAnswers: ["-3"],
    explanation:
      "A product is zero when either factor is zero, so x = 4 or x = -7, and their sum is -3. Reading the roots off a factorised quadratic means changing the sign of each constant: the factor (x - 4) gives the root +4, and (x + 7) gives -7.",
    patternName: "Roots from factorised form",
    concept: "The zero product property",
    recognitionCues: [
      "A quadratic already given as a product of brackets",
      "Equals zero on the right",
      "A sum or product of the roots requested",
    ],
    fastestMethod:
      "Flip the sign of each constant inside the brackets to get the roots, then add.",
    commonTraps: [
      "Reading the roots as -4 and +7",
      "Multiplying the roots when the sum was asked for",
      "Expanding unnecessarily before reading the roots",
    ],
    expectedSeconds: 35,
  },
  {
    id: "adv-nleq-006",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "If x^2 + 5x = 36 and x > 0, what is the value of x?",
    difficulty: 3,
    acceptedAnswers: ["4"],
    explanation:
      "Move everything to one side: x^2 + 5x - 36 = 0. Two numbers multiplying to -36 and adding to 5 are 9 and -4, so the factorisation is (x + 9)(x - 4) = 0 and the roots are -9 and 4. The condition x > 0 gives 4. Checking: 16 + 20 = 36.",
    patternName: "Rearrange to zero, then factorise",
    concept: "Solving a quadratic that is not yet set to zero",
    recognitionCues: [
      "A quadratic with a constant on the right-hand side",
      "A sign condition on x",
      "A constant that factorises easily",
    ],
    fastestMethod:
      "Always move everything to one side first. Factorising against a non-zero right-hand side is the most common error here.",
    commonTraps: [
      "Trying to factorise before rearranging",
      "Getting the signs of the factor pair the wrong way round",
      "Giving the negative root despite the condition",
    ],
    expectedSeconds: 60,
  },
  {
    id: "adv-nleq-007",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "In the equation x^2 - 6x + c = 0, c is a constant. If the equation has two distinct real solutions, what is the greatest integer value of c?",
    difficulty: 5,
    acceptedAnswers: ["8"],
    explanation:
      "Two distinct real solutions means the discriminant is strictly positive: b^2 - 4ac > 0, so 36 - 4c > 0 and c < 9. The greatest integer strictly less than 9 is 8. Checking the boundary matters: at c = 9 the discriminant is zero, which gives one repeated solution rather than two, so 9 is excluded.",
    patternName: "Discriminant inequality",
    concept: "Using the discriminant to constrain a coefficient",
    recognitionCues: [
      "The phrase two distinct real solutions",
      "An unknown constant in the equation",
      "A greatest or least integer value requested",
    ],
    fastestMethod:
      "Write b^2 - 4ac > 0, solve for the constant, then take the largest integer strictly inside the range.",
    commonTraps: [
      "Using greater than or equal to and answering 9",
      "Confusing the conditions for two, one and no solutions",
      "Sign error on the -6 when squaring",
    ],
    expectedSeconds: 80,
  },
  {
    id: "adv-nleq-008",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "The graphs of y = x^2 and y = 2x + 3 intersect at two points. What is the greater of the two y-coordinates?",
    difficulty: 4,
    acceptedAnswers: ["9"],
    explanation:
      "Set the expressions equal: x^2 = 2x + 3, so x^2 - 2x - 3 = 0 and (x - 3)(x + 1) = 0, giving x = 3 or x = -1. The corresponding y values come from y = x^2: 9 and 1. The greater is 9. Note the question asks for a y-coordinate, not an x-coordinate, which is where marks are most often lost.",
    patternName: "Intersection, then read the requested coordinate",
    concept: "Parabola meeting a line",
    recognitionCues: [
      "Two equations both equal to y",
      "The word intersect",
      "A y-coordinate rather than an x-coordinate requested",
    ],
    fastestMethod:
      "Equate, solve for x, then substitute back into whichever equation is simpler. Check which coordinate the question wants before writing anything down.",
    commonTraps: [
      "Reporting the x-coordinate",
      "Substituting into the wrong equation and making an arithmetic slip",
      "Choosing the smaller value",
    ],
    expectedSeconds: 75,
  },
  {
    id: "adv-nleq-009",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "What is the sum of the solutions to 2x^2 + 5x - 3 = 0?",
    difficulty: 4,
    acceptedAnswers: ["-2.5", "-5/2"],
    explanation:
      "For ax^2 + bx + c = 0 the sum of the roots is -b/a, which here is -5/2 = -2.5. Factorising confirms it: (2x - 1)(x + 3) = 0 gives x = 1/2 and x = -3, and 0.5 + (-3) = -2.5. Using -b/a avoids the factorising entirely, which matters when the leading coefficient is not 1.",
    patternName: "Sum of roots with a leading coefficient",
    concept: "Relationship between coefficients and roots",
    recognitionCues: [
      "A leading coefficient other than 1",
      "The sum or product of the solutions requested",
      "No need to identify individual roots",
    ],
    fastestMethod:
      "Use sum = -b/a and product = c/a. Both are faster and safer than factorising a non-monic quadratic.",
    commonTraps: [
      "Forgetting to divide by a and answering -5",
      "Getting the sign of -b/a wrong",
      "Giving the product instead of the sum",
    ],
    expectedSeconds: 65,
  },
  {
    id: "adv-nleq-010",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "In the equation x^2 + bx + 36 = 0, b is a constant. If the equation has exactly one real solution and b < 0, what is the value of b?",
    difficulty: 5,
    acceptedAnswers: ["-12"],
    explanation:
      "Exactly one real solution means the discriminant is zero: b^2 - 4(1)(36) = 0, so b^2 = 144 and b = 12 or b = -12. The stated condition b < 0 selects -12. Sense check: x^2 - 12x + 36 = (x - 6)^2, which indeed has the single root x = 6.",
    patternName: "Discriminant zero with a sign condition",
    concept: "Repeated roots and perfect squares",
    recognitionCues: [
      "The phrase exactly one real solution",
      "A perfect square as the constant term",
      "A sign condition on the unknown coefficient",
    ],
    fastestMethod:
      "Set b^2 - 4ac = 0, solve, then use the sign condition. Recognising the perfect square gives the same answer in one line.",
    commonTraps: [
      "Ignoring the condition and giving +12",
      "Using the condition for two solutions",
      "Dropping the factor of 4 in the discriminant",
    ],
    expectedSeconds: 80,
  },

  // --- Nonlinear functions --------------------------------------------------
  {
    id: "adv-nlfn-004",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "The function f is defined by f(x) = x^2 - 6x + 5. What is the x-coordinate of the vertex of the graph of f?",
    difficulty: 3,
    acceptedAnswers: ["3"],
    explanation:
      "The axis of symmetry is at x = -b/(2a), which here is 6/2 = 3. Alternatively, factorise to (x - 1)(x - 5), note the roots at 1 and 5, and take their midpoint, which is also 3. Both routes are quick; the midpoint of the roots is usually faster when the quadratic factorises neatly.",
    patternName: "Vertex x-coordinate",
    concept: "Axis of symmetry of a parabola",
    recognitionCues: [
      "A quadratic in standard form",
      "The vertex or axis of symmetry requested",
      "No completing the square needed",
    ],
    fastestMethod:
      "Use x = -b/(2a). If the quadratic factorises easily, averaging the roots is an equally fast check.",
    commonTraps: [
      "Forgetting the minus sign in -b/(2a)",
      "Giving the y-coordinate of the vertex instead",
      "Dividing by a rather than by 2a",
    ],
    expectedSeconds: 45,
  },
  {
    id: "adv-nlfn-005",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "The function f is defined by f(x) = 2(x + 1)^2 - 8. What is the y-intercept of the graph of f?",
    difficulty: 3,
    acceptedAnswers: ["-6"],
    explanation:
      "The y-intercept is the value when x = 0: f(0) = 2(0 + 1)^2 - 8 = 2(1) - 8 = -6. The trap is to read -8 straight off as the intercept, but in vertex form a(x - h)^2 + k the constant k is the y-value of the vertex, not of the y-intercept.",
    patternName: "Substitute zero for the y-intercept",
    concept: "Reading vertex form correctly",
    recognitionCues: [
      "A function in completed-square form",
      "The y-intercept requested rather than the minimum",
      "A bracket that is not simply x",
    ],
    fastestMethod:
      "Substitute x = 0 and evaluate. Never read the constant term of vertex form as the y-intercept.",
    commonTraps: [
      "Answering -8, the minimum value",
      "Forgetting to square before multiplying by 2",
      "Answering -1, the x-coordinate of the vertex",
    ],
    expectedSeconds: 45,
  },
  {
    id: "adv-nlfn-006",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "A radioactive sample has a mass of 240 grams and a half-life of 5 years. What is its mass in grams after 15 years?",
    difficulty: 4,
    acceptedAnswers: ["30"],
    explanation:
      "Fifteen years is three half-lives, since 15 divided by 5 is 3. Each half-life halves the mass: 240 to 120 to 60 to 30 grams. Using the formula, mass = 240 times (1/2)^(15/5) = 240 times 1/8 = 30. Counting the halvings is faster and harder to get wrong than substituting into the formula.",
    patternName: "Count the halvings",
    concept: "Exponential decay with a half-life",
    recognitionCues: [
      "A half-life given alongside a total elapsed time",
      "The elapsed time is a whole multiple of the half-life",
      "A remaining amount requested",
    ],
    fastestMethod:
      "Divide the elapsed time by the half-life to count the halvings, then halve repeatedly.",
    commonTraps: [
      "Halving once rather than three times",
      "Dividing 240 by 3 instead of by 2^3",
      "Treating the decay as linear and subtracting a fixed amount",
    ],
    expectedSeconds: 55,
  },
  {
    id: "adv-nlfn-007",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "The function f is defined by f(x) = (x - 2)(x + 6). What is the x-coordinate of the vertex of the graph of f?",
    difficulty: 3,
    acceptedAnswers: ["-2"],
    explanation:
      "A parabola is symmetric about its vertex, so the vertex sits midway between the roots. The roots are x = 2 and x = -6, whose midpoint is (2 + (-6))/2 = -2. Expanding to x^2 + 4x - 12 and using -b/(2a) = -4/2 = -2 gives the same answer with more work.",
    patternName: "Midpoint of the roots",
    concept: "Axis of symmetry from factored form",
    recognitionCues: [
      "A quadratic given as a product of brackets",
      "The vertex or axis of symmetry requested",
      "Roots that are easy to read off",
    ],
    fastestMethod:
      "Average the two roots. No expansion is needed.",
    commonTraps: [
      "Reading the roots as -2 and 6",
      "Averaging the constants inside the brackets without flipping their signs",
      "Giving the y-coordinate instead",
    ],
    expectedSeconds: 45,
  },
  {
    id: "adv-nlfn-008",
    skillId: "nonlinear-functions",
    format: "mcq",
    stem: "The value in pounds of a car t years after purchase is modelled by V(t) = 18000(0.85)^t. Which statement is the best interpretation of 0.85 in this model?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "The car loses 85 per cent of its value each year.",
        distractorType: "wrong_relationship",
        rationale: "A multiplier of 0.85 means 85 per cent is retained, so 15 per cent is lost.",
      },
      { label: "B", text: "The car retains 85 per cent of its value each year.", isCorrect: true, rationale: "Multiplying by 0.85 annually leaves 85 per cent of the previous value." },
      {
        label: "C",
        text: "The car loses 0.85 pounds of value each year.",
        distractorType: "unit_error",
        rationale: "0.85 is a multiplier with no units, not an amount of money.",
      },
      {
        label: "D",
        text: "The car will be worth nothing after 0.85 years.",
        distractorType: "wrong_relationship",
        rationale: "The base of an exponential model is not a time. Exponential decay never reaches exactly zero.",
      },
    ],
    explanation:
      "In V(t) = V0 times b^t the base b is the factor the quantity is multiplied by each period. A base below 1 means decay, and 0.85 means 85 per cent of the value is kept, so 15 per cent is lost annually. Check it: after one year the car is worth 18000 times 0.85 = 15300 pounds, which is a loss of 2700, or 15 per cent.",
    patternName: "Interpret the base of an exponential model",
    concept: "Retained proportion against lost proportion",
    recognitionCues: [
      "A model of the form a times b^t with b between 0 and 1",
      "A question asking what the base means",
      "Options offering both the retained and the lost percentage",
    ],
    fastestMethod:
      "Compute one year explicitly. The arithmetic settles whether the base is the share kept or the share lost.",
    commonTraps: [
      "Reading the base as the percentage lost",
      "Treating a dimensionless multiplier as an amount",
      "Confusing the base with a time",
    ],
    expectedSeconds: 60,
  },
  {
    id: "adv-nlfn-009",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "A parabola with equation y = a(x - 3)^2 - 4 passes through the point (1, 8). What is the value of a?",
    difficulty: 5,
    acceptedAnswers: ["3"],
    explanation:
      "Substitute the point: 8 = a(1 - 3)^2 - 4 = a(-2)^2 - 4 = 4a - 4. So 4a = 12 and a = 3. Checking: with a = 3 the equation is y = 3(x - 3)^2 - 4, and at x = 1 that gives 3(4) - 4 = 8.",
    patternName: "Substitute a point into vertex form",
    concept: "Finding the stretch factor of a parabola",
    recognitionCues: [
      "An equation in vertex form with an unknown coefficient",
      "One point on the curve given",
      "The coefficient requested",
    ],
    fastestMethod:
      "Substitute and solve in one line. Square the bracket before multiplying by a.",
    commonTraps: [
      "Squaring after multiplying by a",
      "Sign error on (1 - 3)",
      "Forgetting to add 4 to both sides",
    ],
    expectedSeconds: 70,
  },
  {
    id: "adv-nlfn-010",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "The function g is defined by g(x) = x^2 + 4x + k, where k is a constant. If the minimum value of g is 1, what is the value of k?",
    difficulty: 5,
    acceptedAnswers: ["5"],
    explanation:
      "The minimum occurs at x = -b/(2a) = -4/2 = -2. There, g(-2) = 4 - 8 + k = k - 4. Setting that equal to 1 gives k = 5. Completing the square gives the same result: x^2 + 4x + k = (x + 2)^2 + (k - 4), whose minimum is k - 4.",
    patternName: "Minimum value constrains a constant",
    concept: "Completing the square to find a minimum",
    recognitionCues: [
      "An unknown constant term",
      "A stated minimum or maximum value",
      "A quadratic with leading coefficient 1",
    ],
    fastestMethod:
      "Complete the square mentally: half the x coefficient, squared, is subtracted. Here that is 4, so the minimum is k - 4.",
    commonTraps: [
      "Setting k itself equal to the minimum",
      "Using x = +2 rather than -2",
      "Adding 4 instead of subtracting it when completing the square",
    ],
    expectedSeconds: 85,
  },
];
