import type { SeedQuestion } from "../types";

/** Third batch of Advanced Math. Answers re-derived in tests/maths-verification.test.ts. */
export const ADVANCED_MATH_QUESTIONS_3: SeedQuestion[] = [
  // --- Equivalent expressions ---------------------------------------------
  {
    id: "adv-equiv-011",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "Which expression is equivalent to (2x - 3)(2x + 3)?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: "4x^2 - 9",
        isCorrect: true,
        rationale: "A difference of two squares: the middle terms cancel, leaving (2x) squared minus 3 squared.",
      },
      {
        label: "B",
        text: "4x^2 + 9",
        distractorType: "sign_error",
        rationale: "The product of -3 and +3 is -9, not +9.",
      },
      {
        label: "C",
        text: "4x^2 - 12x - 9",
        distractorType: "wrong_operation",
        rationale: "The middle terms are -6x and +6x, which cancel rather than combining.",
      },
      {
        label: "D",
        text: "2x^2 - 9",
        distractorType: "wrong_operation",
        rationale: "2x times 2x is 4x squared, not 2x squared.",
      },
    ],
    explanation:
      "This is the difference of two squares pattern (a - b)(a + b) = a squared minus b squared, with a = 2x and b = 3. The middle terms, -6x and +6x, cancel exactly, leaving 4x^2 - 9. Spotting the pattern avoids expanding at all, and the giveaway is two brackets identical except for the sign.",
    patternName: "Difference of two squares",
    concept: "Recognising a conjugate pair",
    recognitionCues: [
      "Two brackets identical except for one sign",
      "No middle term in the options",
      "A perfect square constant",
    ],
    fastestMethod:
      "Square the first term, square the second, subtract. No expansion needed once the pattern is recognised.",
    commonTraps: [
      "Keeping a middle term that cancels",
      "Getting the sign of the constant wrong",
      "Forgetting to square the coefficient of x",
    ],
    expectedSeconds: 35,
  },
  {
    id: "adv-equiv-012",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "Which expression is equivalent to 2x^2 + 7x + 3?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "(2x + 3)(x + 1)",
        distractorType: "wrong_operation",
        rationale: "Expanding gives 2x^2 + 5x + 3, so the middle term is wrong.",
      },
      { label: "B", text: "(2x + 1)(x + 3)", isCorrect: true, rationale: "Expanding gives 2x^2 + 6x + x + 3 = 2x^2 + 7x + 3." },
      {
        label: "C",
        text: "(2x - 1)(x - 3)",
        distractorType: "sign_error",
        rationale: "This gives a middle term of -7x. All signs here are positive.",
      },
      {
        label: "D",
        text: "(x + 1)(x + 3)",
        distractorType: "partial_solution",
        rationale: "This gives x^2, not 2x^2. The leading coefficient has been dropped.",
      },
    ],
    explanation:
      "With a leading coefficient of 2 the brackets must be (2x + a)(x + b) where ab = 3 and 2b + a = 7. Taking a = 1 and b = 3 gives 2(3) + 1 = 7, which works. Expanding to check: 2x^2 + 6x + x + 3 = 2x^2 + 7x + 3. A faster route when options are given is to substitute x = 1: the original gives 12, and only option B gives 3 times 4 = 12.",
    patternName: "Factorise with a leading coefficient",
    concept: "Non-monic quadratic factorisation",
    recognitionCues: [
      "A leading coefficient other than 1",
      "Options that are all pairs of brackets",
      "A small constant term",
    ],
    fastestMethod:
      "Substitute x = 1 into the original and into each option. One substitution usually leaves a single survivor.",
    commonTraps: [
      "Placing the factors of the constant the wrong way round",
      "Dropping the leading coefficient",
      "Getting the signs wrong when all terms are positive",
    ],
    expectedSeconds: 55,
  },
  {
    id: "adv-equiv-013",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "For x greater than 0, which expression is equivalent to x^(3/2)?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "the square root of (x cubed)",
        isCorrect: true,
        rationale: "A fractional exponent puts the numerator as the power and the denominator as the root.",
      },
      {
        label: "B",
        text: "the cube root of (x squared)",
        distractorType: "reciprocal",
        rationale: "That is x^(2/3). The numerator and denominator have been swapped.",
      },
      {
        label: "C",
        text: "3 times the square root of x",
        distractorType: "wrong_operation",
        rationale: "The 3 is an exponent, not a multiplier.",
      },
      {
        label: "D",
        text: "x times 3 divided by 2",
        distractorType: "wrong_operation",
        rationale: "This treats the exponent as ordinary multiplication and division.",
      },
    ],
    explanation:
      "In x^(m/n) the numerator m is the power and the denominator n is the root, so x^(3/2) is the square root of x cubed, equivalently (root x) cubed. Checking with x = 4: x^(3/2) is 8, and the square root of 64 is also 8, while the cube root of 16 is about 2.52. Substituting a perfect square settles which way round the fraction goes.",
    patternName: "Fractional exponent as power over root",
    concept: "Rational exponents",
    recognitionCues: [
      "A fractional exponent",
      "Options offering both the fraction and its reciprocal",
      "A positivity condition to avoid sign issues",
    ],
    fastestMethod:
      "Remember numerator is the power, denominator is the root, then verify with x = 4 or x = 9.",
    commonTraps: [
      "Swapping the power and the root",
      "Treating the exponent as a coefficient",
      "Ignoring that the root must be taken at all",
    ],
    expectedSeconds: 50,
  },
  {
    id: "adv-equiv-014",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "For x not equal to -3, which expression is equivalent to (x^2 + 7x + 12)/(x + 3)?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "x + 4",
        isCorrect: true,
        rationale: "The numerator factorises as (x + 3)(x + 4), and the (x + 3) cancels.",
      },
      {
        label: "B",
        text: "x + 12",
        distractorType: "wrong_operation",
        rationale: "This cancels term by term, which is not valid; only whole factors cancel.",
      },
      {
        label: "C",
        text: "x - 4",
        distractorType: "sign_error",
        rationale: "The factors of +12 that sum to +7 are both positive.",
      },
      {
        label: "D",
        text: "x^2 + 4",
        distractorType: "wrong_operation",
        rationale: "Cancelling a linear factor reduces the degree by one, so a quadratic cannot remain.",
      },
    ],
    explanation:
      "Factorise the numerator: two numbers multiplying to 12 and adding to 7 are 3 and 4, so it is (x + 3)(x + 4). The (x + 3) cancels with the denominator, leaving x + 4. The excluded value of -3 is the hint that this is what cancels. Substituting x = 0 confirms it: 12/3 = 4, and 0 + 4 = 4.",
    patternName: "Factor and cancel",
    concept: "Simplifying a rational expression",
    recognitionCues: [
      "A quadratic over a linear factor",
      "An excluded value matching a factor of the numerator",
      "Options that are all linear",
    ],
    fastestMethod:
      "Substitute x = 0 into the original and into the options; that usually settles it faster than factorising.",
    commonTraps: [
      "Cancelling terms rather than whole factors",
      "Sign errors choosing the factor pair",
      "Keeping the degree too high",
    ],
    expectedSeconds: 55,
  },
  {
    id: "adv-equiv-015",
    skillId: "equivalent-expressions",
    format: "spr",
    stem: "If (x + 5)^2 = x^2 + bx + 25 for all values of x, what is the value of b?",
    difficulty: 3,
    acceptedAnswers: ["10"],
    explanation:
      "Expanding the left side gives x^2 + 10x + 25, so comparing with x^2 + bx + 25 gives b = 10. The general pattern is (x + a)^2 = x^2 + 2ax + a^2, so the middle coefficient is always twice the constant inside the bracket. The usual error is to give 25 or 5 rather than 2 times 5.",
    patternName: "Perfect square middle term",
    concept: "Expanding a squared binomial",
    recognitionCues: [
      "A bracket squared set equal to a quadratic",
      "A constant term that is a perfect square",
      "The phrase for all values of x",
    ],
    fastestMethod:
      "The middle coefficient is twice the number inside the bracket. No full expansion needed.",
    commonTraps: [
      "Answering with the constant inside the bracket",
      "Answering with the squared constant",
      "Forgetting the factor of 2",
    ],
    expectedSeconds: 45,
  },
  {
    id: "adv-equiv-016",
    skillId: "equivalent-expressions",
    format: "spr",
    stem: "If x^2 - 14x + 40 = (x - 7)^2 + k for all values of x, what is the value of k?",
    difficulty: 4,
    acceptedAnswers: ["-9"],
    explanation:
      "Completing the square: x^2 - 14x becomes (x - 7)^2 minus 49, so x^2 - 14x + 40 = (x - 7)^2 - 49 + 40 = (x - 7)^2 - 9. Hence k = -9. The rule is to halve the x coefficient for the bracket, then subtract that half squared to compensate.",
    patternName: "Completing the square",
    concept: "Rewriting a quadratic in vertex form",
    recognitionCues: [
      "A quadratic set equal to a squared bracket plus a constant",
      "An even coefficient of x",
      "The phrase for all values of x",
    ],
    fastestMethod:
      "Halve the x coefficient for the bracket, square it, subtract it from the constant. Here 40 minus 49 gives -9.",
    commonTraps: [
      "Adding the squared half rather than subtracting it",
      "Forgetting to halve before squaring",
      "Giving the vertex x coordinate instead of k",
    ],
    expectedSeconds: 70,
  },
  {
    id: "adv-equiv-017",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "For positive x and y, which expression is equivalent to (x^6 y^3)^(1/3)?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "x^2 y",
        isCorrect: true,
        rationale: "Each exponent divides by 3: 6/3 = 2 and 3/3 = 1.",
      },
      {
        label: "B",
        text: "x^3 y",
        distractorType: "wrong_operation",
        rationale: "6 divided by 3 is 2, not 3. Halving has been used instead of dividing by 3.",
      },
      {
        label: "C",
        text: "x^2 y^3",
        distractorType: "partial_solution",
        rationale: "The root was applied to x but not to y.",
      },
      {
        label: "D",
        text: "x^18 y^9",
        distractorType: "wrong_operation",
        rationale: "The exponents have been multiplied by 3 rather than divided.",
      },
    ],
    explanation:
      "A power applies to every factor, and raising a power to a power multiplies the exponents, so each exponent is multiplied by 1/3: x^(6/3) y^(3/3) = x^2 y. Checking with x = y = 1 does not discriminate, so try x = 2, y = 1: the original is (64)^(1/3) = 4, and x^2 = 4.",
    patternName: "Fractional power over a product",
    concept: "Rational exponents applied to several factors",
    recognitionCues: [
      "A bracket with several variables raised to a fractional power",
      "Exponents divisible by the denominator",
      "Options differing in one exponent",
    ],
    fastestMethod:
      "Divide each exponent by the denominator, checking you have done every factor.",
    commonTraps: [
      "Applying the root to only one variable",
      "Multiplying instead of dividing the exponents",
      "Halving rather than dividing by 3",
    ],
    expectedSeconds: 55,
  },
  {
    id: "adv-equiv-018",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "Which expression is equivalent to (3/(x - 2)) divided by (6/(x + 1)), where x is not 2, -1 or any value making a denominator zero?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "(x + 1)/(2(x - 2))",
        isCorrect: true,
        rationale: "Dividing by a fraction multiplies by its reciprocal: 3/(x - 2) times (x + 1)/6, and 3/6 simplifies to 1/2.",
      },
      {
        label: "B",
        text: "18/((x - 2)(x + 1))",
        distractorType: "wrong_operation",
        rationale: "This multiplies the two fractions instead of dividing by the second.",
      },
      {
        label: "C",
        text: "(2(x - 2))/(x + 1)",
        distractorType: "reciprocal",
        rationale: "This is the reciprocal of the correct answer, from flipping the wrong fraction.",
      },
      {
        label: "D",
        text: "(x + 1)/(x - 2)",
        distractorType: "partial_solution",
        rationale: "The numerical factor 3/6 has been dropped.",
      },
    ],
    explanation:
      "Dividing by a fraction is multiplying by its reciprocal, so this becomes 3/(x - 2) times (x + 1)/6. Multiplying gives 3(x + 1) / (6(x - 2)), and the numbers simplify since 3/6 is 1/2, leaving (x + 1)/(2(x - 2)). Testing with x = 0 confirms it: the original is (3/-2) divided by (6/1) = -1.5/6 = -0.25, and the answer gives 1/(2 times -2) = -0.25.",
    patternName: "Divide by multiplying by the reciprocal",
    concept: "Dividing algebraic fractions",
    recognitionCues: [
      "One algebraic fraction divided by another",
      "Numerical factors that simplify",
      "Options including the reciprocal of the answer",
    ],
    fastestMethod:
      "Flip the second fraction and multiply, then simplify the numbers. Verify with x = 0 if it is in the domain.",
    commonTraps: [
      "Multiplying instead of dividing",
      "Flipping the first fraction rather than the second",
      "Leaving 3/6 unsimplified or dropping it entirely",
    ],
    expectedSeconds: 90,
  },
  {
    id: "adv-equiv-019",
    skillId: "equivalent-expressions",
    format: "spr",
    stem: "If 3x^2 - 12x = 3(x^2 - 4x) and this equals 3(x - 2)^2 + c for all values of x, what is the value of c?",
    difficulty: 5,
    acceptedAnswers: ["-12"],
    explanation:
      "Inside the bracket, x^2 - 4x becomes (x - 2)^2 minus 4. Multiplying by 3 gives 3(x - 2)^2 minus 12, so c = -12. The step that catches people is that the compensating term is inside the bracket and so is also multiplied by 3: the -4 becomes -12, not -4.",
    patternName: "Complete the square with a common factor",
    concept: "Factoring out before completing the square",
    recognitionCues: [
      "A common factor in front of the quadratic",
      "A squared bracket in the target form with the same factor",
      "A constant to determine",
    ],
    fastestMethod:
      "Factor out first, complete the square inside, then multiply the compensating term by the factor you removed.",
    commonTraps: [
      "Forgetting to multiply the compensating term by the common factor",
      "Adding rather than subtracting the compensation",
      "Halving the coefficient after factoring rather than before",
    ],
    expectedSeconds: 95,
  },
  {
    id: "adv-equiv-020",
    skillId: "equivalent-expressions",
    format: "mcq",
    stem: "Which expression is equivalent to (x^2 - 5x - 14)/(x^2 - 49), for values of x where the denominator is not zero?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "(x + 2)/(x + 7)",
        isCorrect: true,
        rationale: "The numerator is (x - 7)(x + 2) and the denominator is (x - 7)(x + 7), so the (x - 7) cancels.",
      },
      {
        label: "B",
        text: "(x - 2)/(x - 7)",
        distractorType: "sign_error",
        rationale: "The factor pair of -14 summing to -5 is -7 and +2, so the surviving numerator factor is (x + 2).",
      },
      {
        label: "C",
        text: "(x + 2)/(x - 7)",
        distractorType: "wrong_operation",
        rationale: "The cancelled factor has been kept in the denominator and the surviving one discarded.",
      },
      {
        label: "D",
        text: "(5x + 14)/49",
        distractorType: "wrong_operation",
        rationale: "This cancels term by term, which is never valid.",
      },
    ],
    explanation:
      "Factorise both. The numerator needs two numbers multiplying to -14 and adding to -5: those are -7 and +2, giving (x - 7)(x + 2). The denominator is a difference of two squares, (x - 7)(x + 7). Cancelling the shared (x - 7) leaves (x + 2)/(x + 7). Substituting x = 0 checks it: -14/-49 = 2/7, and the answer gives 2/7.",
    patternName: "Factorise both parts, cancel the shared factor",
    concept: "Simplifying with a difference of two squares",
    recognitionCues: [
      "A difference of two squares in the denominator",
      "A factorisable quadratic numerator",
      "Options differing only in signs",
    ],
    fastestMethod:
      "Factorise the denominator first, since a difference of two squares is instant, then look for that factor in the numerator. Verify with x = 0.",
    commonTraps: [
      "Getting the signs of the factor pair wrong",
      "Keeping the cancelled factor instead of the surviving one",
      "Cancelling terms rather than factors",
    ],
    expectedSeconds: 95,
  },

  // --- Nonlinear equations and systems -------------------------------------
  {
    id: "adv-nleq-011",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "If (x - 6)^2 = 49 and x is less than 0, what is the value of x?",
    difficulty: 3,
    acceptedAnswers: ["-1"],
    explanation:
      "Taking the square root of both sides gives x - 6 = 7 or x - 6 = -7, so x = 13 or x = -1. The condition x < 0 selects -1. Forgetting the negative root is the classic error here: a squared expression always yields two cases.",
    patternName: "Square root both sides, take both cases",
    concept: "Solving a squared binomial equation",
    recognitionCues: [
      "A bracket squared equal to a perfect square",
      "A sign condition on x",
      "No expansion needed",
    ],
    fastestMethod:
      "Square-root both sides into a plus and a minus case, solve each, then apply the condition.",
    commonTraps: [
      "Taking only the positive root and answering 13",
      "Expanding unnecessarily and introducing errors",
      "Adding 6 to only one of the two cases",
    ],
    expectedSeconds: 55,
  },
  {
    id: "adv-nleq-012",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "What is the product of the solutions to x^2 - 3x - 28 = 0?",
    difficulty: 3,
    acceptedAnswers: ["-28"],
    explanation:
      "For ax^2 + bx + c = 0 the product of the roots is c/a, which here is -28/1 = -28. Factorising confirms it: (x - 7)(x + 4) = 0 gives roots 7 and -4, and 7 times -4 is -28. Using c/a avoids factorising entirely.",
    patternName: "Product of roots",
    concept: "Coefficients and roots of a quadratic",
    recognitionCues: [
      "A quadratic set equal to zero",
      "The product or sum of the solutions requested",
      "No need to identify individual roots",
    ],
    fastestMethod:
      "Product of roots is c/a, sum is -b/a. With a = 1 the product is simply the constant term.",
    commonTraps: [
      "Giving the sum instead of the product",
      "Dropping the sign of the constant",
      "Factorising unnecessarily and slipping on signs",
    ],
    expectedSeconds: 45,
  },
  {
    id: "adv-nleq-013",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "If 3x^2 = 12x, what is the greatest possible value of x?",
    difficulty: 3,
    acceptedAnswers: ["4"],
    explanation:
      "Move everything to one side: 3x^2 - 12x = 0, so 3x(x - 4) = 0 and x = 0 or x = 4. The greatest is 4. Dividing both sides by 3x at the start would lose the solution x = 0 entirely, which is why factorising rather than dividing matters: dividing by an expression that might be zero discards a root.",
    patternName: "Factorise rather than divide by a variable",
    concept: "Quadratic with no constant term",
    recognitionCues: [
      "x squared on one side and a multiple of x on the other",
      "No constant term once rearranged",
      "Greatest or least value requested",
    ],
    fastestMethod:
      "Bring everything to one side and factor out the common x. Never divide both sides by x.",
    commonTraps: [
      "Dividing by 3x and losing the root x = 0",
      "Giving 0 when the greatest was requested",
      "Trying the quadratic formula unnecessarily",
    ],
    expectedSeconds: 55,
  },
  {
    id: "adv-nleq-014",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "The equation x^2 + kx + 25 = 0 has no real solutions. What is the greatest integer value of k?",
    difficulty: 5,
    acceptedAnswers: ["9"],
    explanation:
      "No real solutions means a negative discriminant: k^2 - 100 < 0, so k^2 < 100 and -10 < k < 10. The greatest integer strictly inside that range is 9. Checking the boundary matters: at k = 10 the discriminant is zero, which gives one repeated real solution rather than none, so 10 is excluded.",
    patternName: "Negative discriminant",
    concept: "Condition for no real solutions",
    recognitionCues: [
      "The phrase no real solutions",
      "An unknown coefficient",
      "A greatest or least integer requested",
    ],
    fastestMethod:
      "Write b^2 - 4ac < 0, solve for the range, then take the extreme integer strictly inside it.",
    commonTraps: [
      "Including the boundary and answering 10",
      "Using the condition for two real solutions",
      "Forgetting the range is two-sided",
    ],
    expectedSeconds: 85,
  },
  {
    id: "adv-nleq-015",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "The graphs of y = x^2 - 4 and y = 3x intersect at two points. What is the sum of the x-coordinates of those points?",
    difficulty: 4,
    acceptedAnswers: ["3"],
    explanation:
      "Setting the expressions equal gives x^2 - 4 = 3x, so x^2 - 3x - 4 = 0. The sum of the roots is -b/a = 3. Factorising confirms it: (x - 4)(x + 1) = 0 gives roots 4 and -1, which sum to 3.",
    patternName: "Equate, then sum the roots",
    concept: "Intersection of a parabola and a line",
    recognitionCues: [
      "Two equations both equal to y",
      "The word intersect",
      "A sum requested rather than the points themselves",
    ],
    fastestMethod:
      "Equate, rearrange to zero, then read the sum of roots off the coefficients rather than solving.",
    commonTraps: [
      "Forgetting to move the 3x across",
      "Summing y-coordinates instead",
      "Sign error on the constant when rearranging",
    ],
    expectedSeconds: 70,
  },
  {
    id: "adv-nleq-016",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "If the square root of (2x + 7) equals 5, what is the value of x?",
    difficulty: 3,
    acceptedAnswers: ["9"],
    explanation:
      "Square both sides: 2x + 7 = 25, so 2x = 18 and x = 9. Always check a radical equation back in the original, since squaring can introduce false solutions: the square root of (18 + 7) is the square root of 25, which is 5, so this one is genuine.",
    patternName: "Square both sides of a radical equation",
    concept: "Solving equations containing a square root",
    recognitionCues: [
      "A square root containing the variable",
      "A numerical value on the other side",
      "A single radical, so one squaring clears it",
    ],
    fastestMethod:
      "Isolate the radical, square both sides, solve, then substitute back to confirm the solution is not extraneous.",
    commonTraps: [
      "Squaring only part of the equation",
      "Skipping the check for extraneous solutions",
      "Dividing before subtracting the constant",
    ],
    expectedSeconds: 50,
  },
  {
    id: "adv-nleq-017",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "If x^2 + y^2 = 58 and x + y = 10, what is the value of xy?",
    difficulty: 5,
    acceptedAnswers: ["21"],
    explanation:
      "Square the second equation: (x + y)^2 = x^2 + 2xy + y^2 = 100. Substituting x^2 + y^2 = 58 gives 58 + 2xy = 100, so 2xy = 42 and xy = 21. This identity avoids solving for x and y individually, which here would mean a quadratic; for the record the values are 3 and 7.",
    patternName: "Square the sum to reach the product",
    concept: "Using the identity (x + y)^2 = x^2 + 2xy + y^2",
    recognitionCues: [
      "A sum of squares and a plain sum both given",
      "The product requested, not the individual values",
      "Two unknowns with only two equations, one nonlinear",
    ],
    fastestMethod:
      "Square the linear equation and substitute the sum of squares. No need to find x and y at all.",
    commonTraps: [
      "Assuming (x + y)^2 equals x^2 + y^2",
      "Forgetting to halve after finding 2xy",
      "Solving the full system and making arithmetic errors",
    ],
    expectedSeconds: 100,
  },
  {
    id: "adv-nleq-018",
    skillId: "nonlinear-equations-and-systems",
    format: "mcq",
    stem: "How many real solutions does the equation x^2 + 4x + 9 = 0 have?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "None",
        isCorrect: true,
        rationale: "The discriminant is 16 - 36 = -20, which is negative, so there are no real solutions.",
      },
      {
        label: "B",
        text: "Exactly one",
        distractorType: "wrong_relationship",
        rationale: "One solution requires a discriminant of exactly zero.",
      },
      {
        label: "C",
        text: "Exactly two",
        distractorType: "wrong_relationship",
        rationale: "Two solutions require a positive discriminant.",
      },
      {
        label: "D",
        text: "Infinitely many",
        distractorType: "wrong_relationship",
        rationale: "A quadratic can never have infinitely many solutions; its graph is a parabola.",
      },
    ],
    explanation:
      "The discriminant b^2 - 4ac is 16 minus 36 = -20. A negative discriminant means no real solutions, because the parabola never crosses the x-axis. Completing the square shows why: x^2 + 4x + 9 = (x + 2)^2 + 5, and a square plus 5 can never be zero.",
    patternName: "Count solutions from the discriminant",
    concept: "Sign of the discriminant",
    recognitionCues: [
      "A question asking how many real solutions",
      "A constant term large relative to the x coefficient",
      "No factorisation that obviously works",
    ],
    fastestMethod:
      "Compute b^2 - 4ac and read the sign. Positive gives two, zero gives one, negative gives none.",
    commonTraps: [
      "Dropping the minus sign and concluding there are two",
      "Forgetting the factor of 4 in 4ac",
      "Offering infinitely many for a quadratic",
    ],
    expectedSeconds: 55,
  },
  {
    id: "adv-nleq-019",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "What is the positive solution to x^2 - 2x - 15 = 0?",
    difficulty: 2,
    acceptedAnswers: ["5"],
    explanation:
      "Two numbers multiplying to -15 and adding to -2 are -5 and +3, so the factorisation is (x - 5)(x + 3) = 0 and the roots are 5 and -3. The positive one is 5. Checking: 25 - 10 - 15 = 0.",
    patternName: "Factorise and select by sign",
    concept: "Factorising a monic quadratic",
    recognitionCues: [
      "A quadratic equal to zero with a negative constant",
      "A sign condition selecting one root",
      "A constant with few factor pairs",
    ],
    fastestMethod:
      "Find the factor pair multiplying to the constant and adding to the middle coefficient, then pick the root the condition requires.",
    commonTraps: [
      "Getting the signs of the pair the wrong way round",
      "Giving the negative root",
      "Reading the roots without flipping the bracket signs",
    ],
    expectedSeconds: 40,
  },
  {
    id: "adv-nleq-020",
    skillId: "nonlinear-equations-and-systems",
    format: "spr",
    stem: "The solutions to 2x^2 - 11x + 12 = 0 are p and q, with p greater than q. What is the value of p minus q?",
    difficulty: 5,
    acceptedAnswers: ["2.5", "5/2"],
    explanation:
      "Factorising gives (2x - 3)(x - 4) = 0, so the roots are 1.5 and 4. With p = 4 and q = 1.5, p minus q is 2.5. Alternatively the difference of the roots is the square root of the discriminant divided by a: the discriminant is 121 - 96 = 25, and the square root of 25 over 2 is 2.5.",
    patternName: "Difference of the roots",
    concept: "Relating the discriminant to the gap between roots",
    recognitionCues: [
      "A non-monic quadratic",
      "The difference of the solutions requested",
      "Roots labelled with the larger named first",
    ],
    fastestMethod:
      "Use root of the discriminant divided by a, which avoids factorising a non-monic quadratic entirely.",
    commonTraps: [
      "Subtracting in the wrong order and giving a negative",
      "Forgetting to divide by a",
      "Misplacing the factors of 12 when factorising",
    ],
    expectedSeconds: 100,
  },

  // --- Nonlinear functions ---------------------------------------------------
  {
    id: "adv-nlfn-011",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "The function f is defined by f(x) = x^2 - 8x + 12. What is the minimum value of f?",
    difficulty: 4,
    acceptedAnswers: ["-4"],
    explanation:
      "The minimum occurs at x = -b/(2a) = 8/2 = 4. There, f(4) = 16 - 32 + 12 = -4. Completing the square gives the same answer in one line: x^2 - 8x + 12 = (x - 4)^2 - 4, whose minimum is clearly -4.",
    patternName: "Minimum value of a quadratic",
    concept: "Vertex of a parabola opening upwards",
    recognitionCues: [
      "A quadratic in standard form with a positive leading coefficient",
      "The minimum value requested rather than where it occurs",
      "An even x coefficient",
    ],
    fastestMethod:
      "Complete the square: halve the x coefficient for the bracket, then adjust the constant. Faster than finding the vertex and substituting.",
    commonTraps: [
      "Giving 4, the x coordinate of the vertex",
      "Sign error substituting into the original",
      "Adding the compensating term instead of subtracting",
    ],
    expectedSeconds: 70,
  },
  {
    id: "adv-nlfn-012",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "An investment of 2,000 pounds grows by 8 per cent each year. To the nearest pound, what is it worth after 3 years?",
    difficulty: 4,
    acceptedAnswers: ["2519"],
    explanation:
      "Each year multiplies the value by 1.08, so after three years it is 2000 times 1.08 cubed. That is 2000 times 1.259712 = 2519.424, which is 2,519 pounds to the nearest pound. Adding 8 per cent three times as simple interest would give 2,480, which understates it because compound growth applies the percentage to the new balance each year.",
    patternName: "Compound growth",
    concept: "Repeated percentage increase",
    recognitionCues: [
      "A percentage applied each year rather than once",
      "A small number of periods",
      "A rounded answer requested",
    ],
    fastestMethod:
      "Raise the multiplier to the power of the number of periods and multiply once. Do not add the percentage repeatedly.",
    commonTraps: [
      "Treating it as simple interest and getting 2,480",
      "Multiplying by 1.08 only once or twice",
      "Rounding part way and losing pounds",
    ],
    expectedSeconds: 75,
  },
  {
    id: "adv-nlfn-013",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "The function f is defined by f(x) = (x + 3)(x - 7). What is the minimum value of f?",
    difficulty: 4,
    acceptedAnswers: ["-25"],
    explanation:
      "The roots are -3 and 7, so by symmetry the vertex is at their midpoint, x = 2. Substituting: f(2) = (5)(-5) = -25. Since the coefficient of x^2 is positive the parabola opens upwards, so -25 is the minimum rather than a maximum.",
    patternName: "Midpoint of the roots, then substitute",
    concept: "Minimum from factored form",
    recognitionCues: [
      "A quadratic given as a product of brackets",
      "The minimum value requested",
      "Roots easy to read off",
    ],
    fastestMethod:
      "Average the roots, substitute once. Two steps, no expansion.",
    commonTraps: [
      "Giving 2, the x coordinate of the vertex",
      "Reading the roots as 3 and -7",
      "Sign error multiplying two numbers of opposite sign",
    ],
    expectedSeconds: 70,
  },
  {
    id: "adv-nlfn-014",
    skillId: "nonlinear-functions",
    format: "mcq",
    stem: "The number of bacteria in a culture is modelled by N(t) = 500 times 3^(t/4), where t is measured in hours. What does the 4 represent?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "The number of hours it takes for the population to triple.",
        isCorrect: true,
        rationale: "At t = 4 the exponent is 1, so the population is multiplied by 3 exactly once.",
      },
      {
        label: "B",
        text: "The number of times the population triples each hour.",
        distractorType: "reciprocal",
        rationale: "That would require the exponent to be 4t rather than t/4.",
      },
      {
        label: "C",
        text: "The starting number of bacteria, in hundreds.",
        distractorType: "swapped_values",
        rationale: "The starting number is 500, the coefficient outside the power.",
      },
      {
        label: "D",
        text: "The number of hours the culture survives.",
        distractorType: "wrong_relationship",
        rationale: "The model describes growth and says nothing about an end point.",
      },
    ],
    explanation:
      "In N0 times b^(t/p) the value p is the time needed for one application of the growth factor b. Substituting t = 4 gives N = 500 times 3^1 = 1500, which is exactly triple the starting 500, so 4 hours is the tripling time. Testing t = p is the quickest way to settle what the denominator means.",
    patternName: "Period in an exponential model",
    concept: "Reading the growth period from the exponent",
    recognitionCues: [
      "An exponent of the form t over a number",
      "A base other than 2, so doubling language will not apply",
      "A question asking what one number represents",
    ],
    fastestMethod:
      "Substitute t equal to the denominator. If the quantity multiplies by the base exactly once, that denominator is the period.",
    commonTraps: [
      "Reading the denominator as a rate per hour",
      "Confusing it with the starting amount",
      "Inverting the relationship between period and rate",
    ],
    expectedSeconds: 65,
  },
  {
    id: "adv-nlfn-015",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "The function g is defined by g(x) = 2x^2 - 12x + 23. What is the x-coordinate of the vertex of the graph of g?",
    difficulty: 3,
    acceptedAnswers: ["3"],
    explanation:
      "The axis of symmetry is at x = -b/(2a) = 12/(2 times 2) = 3. The leading coefficient matters here: dividing 12 by 2 alone would give 6, which is the common error. For the record the minimum value is g(3) = 18 - 36 + 23 = 5.",
    patternName: "Vertex with a leading coefficient",
    concept: "Axis of symmetry when a is not 1",
    recognitionCues: [
      "A quadratic with a leading coefficient other than 1",
      "The vertex or axis of symmetry requested",
      "An even x coefficient",
    ],
    fastestMethod:
      "Use -b/(2a) and remember the 2a, not just 2. Writing the denominator out prevents the usual slip.",
    commonTraps: [
      "Dividing by 2 rather than 2a",
      "Forgetting the minus sign",
      "Giving the minimum value instead of where it occurs",
    ],
    expectedSeconds: 50,
  },
  {
    id: "adv-nlfn-016",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "The graph of y = x^2 + bx + 9 touches the x-axis at exactly one point, and b is negative. What is the value of b?",
    difficulty: 5,
    acceptedAnswers: ["-6"],
    explanation:
      "Touching the x-axis at exactly one point means a repeated root, so the discriminant is zero: b^2 - 36 = 0, giving b = 6 or b = -6. The condition that b is negative selects -6. Sense check: x^2 - 6x + 9 = (x - 3)^2, which touches the axis at x = 3 and nowhere else.",
    patternName: "Tangent to the x-axis means zero discriminant",
    concept: "Repeated roots and perfect squares",
    recognitionCues: [
      "The phrase touches the x-axis at exactly one point",
      "A perfect square as the constant term",
      "A sign condition on the unknown coefficient",
    ],
    fastestMethod:
      "Set b^2 - 4ac = 0, solve, then use the sign condition. Recognising the perfect square gives it in one line.",
    commonTraps: [
      "Ignoring the sign condition and giving 6",
      "Using the condition for crossing at two points",
      "Dropping the factor of 4 in the discriminant",
    ],
    expectedSeconds: 85,
  },
  {
    id: "adv-nlfn-017",
    skillId: "nonlinear-functions",
    format: "mcq",
    stem: "A ball is thrown upwards and its height in metres after t seconds is h(t) = 20t - 5t^2. At what time does it reach its greatest height?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "2 seconds",
        isCorrect: true,
        rationale: "The vertex is at t = -b/(2a) = -20/(2 times -5) = 2 seconds.",
      },
      {
        label: "B",
        text: "4 seconds",
        distractorType: "wrong_relationship",
        rationale: "That is when the ball lands, since h(4) = 80 - 80 = 0. The greatest height is at the midpoint of the flight.",
      },
      {
        label: "C",
        text: "20 seconds",
        distractorType: "partial_solution",
        rationale: "This reads the coefficient of t as a time. It is a velocity in metres a second.",
      },
      {
        label: "D",
        text: "5 seconds",
        distractorType: "partial_solution",
        rationale: "This reads the coefficient of t squared as a time.",
      },
    ],
    explanation:
      "The height is a downward parabola, so the greatest height is at the vertex: t = -b/(2a) with a = -5 and b = 20, giving t = -20/-10 = 2 seconds. The symmetry check is reassuring: the ball is at ground level at t = 0 and t = 4, and the peak sits exactly midway at t = 2, where the height is 20 metres.",
    patternName: "Vertex of a projectile model",
    concept: "Maximum of a downward parabola",
    recognitionCues: [
      "A negative coefficient on t squared",
      "The greatest height or maximum requested",
      "A physical context with a start and an end",
    ],
    fastestMethod:
      "Find the two times when the height is zero and halve the gap, or use -b/(2a). Both take one line.",
    commonTraps: [
      "Giving the landing time rather than the peak",
      "Reading a coefficient as a time",
      "Sign error dividing by a negative value of 2a",
    ],
    expectedSeconds: 70,
  },
  {
    id: "adv-nlfn-018",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "A substance decays so that 20 per cent of it is lost every hour. If 250 grams remain after 2 hours, how many grams were there at the start? Give your answer to the nearest gram.",
    difficulty: 5,
    acceptedAnswers: ["391"],
    explanation:
      "Losing 20 per cent an hour means multiplying by 0.8 each hour, so after two hours the amount is the original times 0.64. Hence the original is 250 divided by 0.64 = 390.625, which is 391 grams to the nearest gram. Dividing by 0.8 only once, or subtracting 40 per cent, both give the wrong answer because the decay compounds.",
    patternName: "Reverse compound decay",
    concept: "Working backwards through repeated percentage change",
    recognitionCues: [
      "A percentage lost per period with a later amount given",
      "The original amount requested",
      "More than one period elapsed",
    ],
    fastestMethod:
      "Raise the multiplier to the power of the periods, then divide. Never subtract the percentages.",
    commonTraps: [
      "Subtracting 40 per cent for two hours",
      "Dividing by 0.8 once rather than by 0.64",
      "Multiplying instead of dividing when going backwards",
    ],
    expectedSeconds: 95,
  },
  {
    id: "adv-nlfn-019",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "The function f is defined by f(x) = -(x - 4)^2 + 11. What is the maximum value of f?",
    difficulty: 3,
    acceptedAnswers: ["11"],
    explanation:
      "A squared term is never negative, so -(x - 4)^2 is never positive and is zero exactly when x = 4. The largest value of f is therefore 0 + 11 = 11, reached at x = 4. The leading minus sign is what makes this a maximum rather than a minimum.",
    patternName: "Read the vertex from vertex form",
    concept: "Maximum of a downward parabola in completed-square form",
    recognitionCues: [
      "A negative sign in front of a squared bracket",
      "The maximum value requested",
      "No expansion needed",
    ],
    fastestMethod:
      "Read the constant straight off. With a leading minus it is the maximum; with a plus it is the minimum.",
    commonTraps: [
      "Giving 4, which is where the maximum occurs",
      "Reporting -11 by mishandling the sign",
      "Assuming a parabola always has a minimum",
    ],
    expectedSeconds: 45,
  },
  {
    id: "adv-nlfn-020",
    skillId: "nonlinear-functions",
    format: "spr",
    stem: "For the function f(x) = x^2 - 6x + k, the minimum value of f is -4. What is the value of k?",
    difficulty: 5,
    acceptedAnswers: ["5"],
    explanation:
      "Completing the square gives x^2 - 6x + k = (x - 3)^2 + (k - 9), so the minimum value is k - 9. Setting k - 9 = -4 gives k = 5. Checking: x^2 - 6x + 5 = (x - 3)^2 - 4, whose minimum is indeed -4 at x = 3.",
    patternName: "Minimum value constrains the constant",
    concept: "Completing the square with an unknown constant",
    recognitionCues: [
      "An unknown constant term",
      "A stated minimum or maximum value",
      "A leading coefficient of 1",
    ],
    fastestMethod:
      "Halve the x coefficient, square it, and subtract: the minimum is k minus that square. Here k minus 9.",
    commonTraps: [
      "Setting k equal to the minimum directly",
      "Adding 9 rather than subtracting it",
      "Using x = 6 rather than x = 3 as the vertex",
    ],
    expectedSeconds: 90,
  },
];
