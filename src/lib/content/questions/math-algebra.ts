import type { SeedQuestion } from "../types";

export const ALGEBRA_QUESTIONS: SeedQuestion[] = [
  // --- Linear equations in one variable ----------------------------------
  {
    id: "alg-lin1-001",
    skillId: "linear-equations-one-variable",
    format: "mcq",
    stem: "If 3(2x - 5) = 4x + 7, what is the value of x?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: "-4",
        distractorType: "sign_error",
        rationale: "This comes from distributing as 6x + 15, then solving 2x = -8. The 3 multiplies -5 to give -15, not +15.",
      },
      {
        label: "B",
        text: "6",
        distractorType: "wrong_operation",
        rationale: "This comes from multiplying only the 2x and leaving the -5 alone: 6x - 5 = 4x + 7 gives x = 6. The 3 must reach both terms.",
      },
      { label: "C", text: "11", isCorrect: true, rationale: "6x - 15 = 4x + 7, so 2x = 22 and x = 11." },
      {
        label: "D",
        text: "22",
        distractorType: "partial_solution",
        rationale: "This is 2x, not x. One more division finishes it.",
      },
    ],
    explanation:
      "Distribute first: 3(2x - 5) = 6x - 15, so 6x - 15 = 4x + 7. Collect the x terms on one side and the numbers on the other: 2x = 22, so x = 11. Substituting back gives 3(22 - 5) = 51 and 4(11) + 7 = 51, which confirms it.",
    patternName: "Distribute, collect, divide",
    concept: "Solving a linear equation with brackets on one side",
    recognitionCues: [
      "A bracket multiplied by a number, with x on both sides",
      "No fractions and no squared terms",
      "The question asks for a single value of x",
    ],
    fastestMethod:
      "Distribute the bracket, move all x terms left and all constants right in one step, then divide once.",
    alternativeMethod:
      "If the options are clean integers, substitute them. With four options this takes about as long, so only fall back on it if the algebra goes wrong.",
    commonTraps: [
      "Multiplying the bracket by only its first term",
      "Losing the sign when the number multiplies a negative",
      "Stopping at 2x = 22 and selecting 22",
    ],
    relatedConcepts: ["linear-inequalities"],
    expectedSeconds: 45,
  },
  {
    id: "alg-lin1-002",
    skillId: "linear-equations-one-variable",
    format: "spr",
    stem: "In the equation 4(x + 3) - 2x = 2x + c, c is a constant. If the equation has infinitely many solutions, what is the value of c?",
    difficulty: 4,
    acceptedAnswers: ["12"],
    explanation:
      "Simplify the left side: 4x + 12 - 2x = 2x + 12. The equation is now 2x + 12 = 2x + c. Infinitely many solutions means the two sides are the same expression, so the constants must match and c = 12. For any other value of c the x terms cancel and you are left with a false statement, which means no solution.",
    patternName: "Identical-sides condition",
    concept: "When a linear equation has no solution or infinitely many",
    recognitionCues: [
      "The words infinitely many solutions or no solution",
      "A letter standing for a constant rather than an unknown to solve for",
      "The x coefficients turn out equal once you simplify",
    ],
    fastestMethod:
      "Simplify both sides fully. Infinitely many solutions means both the x coefficients and the constants match; no solution means the x coefficients match but the constants do not.",
    commonTraps: [
      "Solving for x instead of for the constant",
      "Confusing the condition for no solution with the condition for infinitely many",
      "Forgetting to combine 4x and -2x before comparing",
    ],
    expectedSeconds: 70,
  },
  {
    id: "alg-lin1-003",
    skillId: "linear-equations-one-variable",
    format: "mcq",
    stem: "What value of x satisfies 2(x - 4)/3 = (x + 1)/2?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "-13",
        distractorType: "sign_error",
        rationale: "This comes from 4x + 16 = 3x + 3. Distributing 4 across (x - 4) gives 4x - 16.",
      },
      {
        label: "B",
        text: "14",
        distractorType: "swapped_values",
        rationale: "This comes from cross-multiplying as 3(x - 4) = 2(x + 1), which drops the 2 in the numerator on the left.",
      },
      {
        label: "C",
        text: "17",
        distractorType: "wrong_operation",
        rationale: "This comes from 4x - 16 = 3x + 1, where the 3 was not distributed across the +1.",
      },
      { label: "D", text: "19", isCorrect: true, rationale: "Cross-multiplying gives 4(x - 4) = 3(x + 1), so 4x - 16 = 3x + 3 and x = 19." },
    ],
    explanation:
      "Cross-multiply: 2(x - 4) times 2 = 3(x + 1), which is 4(x - 4) = 3(x + 1). Expand carefully on both sides: 4x - 16 = 3x + 3. Then x = 19. Check: the left side is 2(15)/3 = 10 and the right side is 20/2 = 10.",
    patternName: "Cross-multiply a single fraction equation",
    concept: "Clearing denominators in a linear equation",
    recognitionCues: [
      "Exactly one fraction on each side of the equals sign",
      "Linear expressions in both numerators",
      "Small numerical denominators",
    ],
    fastestMethod:
      "Cross-multiply, then expand both brackets completely before collecting terms. Write the expansion out; this is where most marks are lost.",
    alternativeMethod:
      "Multiply both sides by the lowest common denominator, 6. Slightly longer but harder to get wrong with the signs.",
    commonTraps: [
      "Dropping a numerator coefficient when cross-multiplying",
      "Distributing to only the first term inside a bracket",
      "Sign slips when a bracket contains a subtraction",
    ],
    expectedSeconds: 65,
  },

  // --- Linear equations in two variables ---------------------------------
  {
    id: "alg-lin2-001",
    skillId: "linear-equations-two-variables",
    format: "mcq",
    stem: "A line in the xy-plane passes through the points (2, 7) and (6, 19). Which equation describes this line?",
    difficulty: 2,
    choices: [
      { label: "A", text: "y = 3x + 1", isCorrect: true, rationale: "The slope is (19 - 7)/(6 - 2) = 3, and 7 = 3(2) + 1 confirms the intercept." },
      {
        label: "B",
        text: "y = 3x + 7",
        distractorType: "wrong_relationship",
        rationale: "The slope is right but 7 is the y-value at x = 2, not the y-intercept. Substitute a point to find the intercept.",
      },
      {
        label: "C",
        text: "y = (1/3)x + 1",
        distractorType: "reciprocal",
        rationale: "The slope has been inverted. Slope is the change in y over the change in x, not the other way round.",
      },
      {
        label: "D",
        text: "y = 3x - 1",
        distractorType: "sign_error",
        rationale: "A sign slip when rearranging 7 = 6 + b. Here b = +1.",
      },
    ],
    explanation:
      "Slope = (19 - 7)/(6 - 2) = 12/4 = 3. Substitute either point into y = 3x + b: 7 = 3(2) + b gives b = 1. So y = 3x + 1. Always test the second point as a check: 3(6) + 1 = 19.",
    patternName: "Two points to an equation",
    concept: "Finding the equation of a line from two points",
    recognitionCues: [
      "Two coordinate pairs given",
      "Answer options in y = mx + b form",
      "No graph provided",
    ],
    fastestMethod:
      "Compute the slope, eliminate any option with the wrong slope, then test one point against the survivors. This usually leaves one option after two steps.",
    alternativeMethod:
      "Substitute both points into each option, but that is four times the work.",
    commonTraps: [
      "Inverting the slope",
      "Treating a given y-value as the y-intercept",
      "Subtracting the coordinates in inconsistent order",
    ],
    relatedConcepts: ["linear-functions"],
    expectedSeconds: 50,
  },
  {
    id: "alg-lin2-002",
    skillId: "linear-equations-two-variables",
    format: "spr",
    stem: "The equation 2x + 5y = 20 is graphed in the xy-plane. What is the x-coordinate of the point where the graph crosses the x-axis?",
    difficulty: 2,
    acceptedAnswers: ["10"],
    explanation:
      "The graph crosses the x-axis where y = 0. Substituting gives 2x = 20, so x = 10. The point is (10, 0). The common mistake is to set x = 0 instead, which gives the y-intercept of 4.",
    patternName: "Intercept by substitution",
    concept: "Reading intercepts from standard form",
    recognitionCues: [
      "An equation in the form Ax + By = C",
      "The words crosses the x-axis or x-intercept",
      "No rearranging actually needed",
    ],
    fastestMethod: "Set the other variable to zero and solve in one line.",
    commonTraps: [
      "Setting the wrong variable to zero",
      "Reporting the whole coordinate pair when only one number is wanted",
      "Dividing by the wrong coefficient",
    ],
    expectedSeconds: 35,
  },
  {
    id: "alg-lin2-003",
    skillId: "linear-equations-two-variables",
    format: "mcq",
    stem: "What is the slope of the line given by 3x - 4y = 12?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "-4/3",
        distractorType: "reciprocal",
        rationale: "This is the negative reciprocal, which would be the slope of a perpendicular line, not this one.",
      },
      {
        label: "B",
        text: "-3/4",
        distractorType: "sign_error",
        rationale: "Dividing by -4 flips the sign of the x term as well. Rearranging carefully gives a positive slope.",
      },
      { label: "C", text: "3/4", isCorrect: true, rationale: "Rearranged, -4y = -3x + 12, so y = (3/4)x - 3." },
      {
        label: "D",
        text: "4/3",
        distractorType: "reciprocal",
        rationale: "The coefficients have been read straight off in the wrong order. Rearrange into y = mx + b first.",
      },
    ],
    explanation:
      "Isolate y: 3x - 4y = 12 gives -4y = -3x + 12, and dividing every term by -4 gives y = (3/4)x - 3. The slope is 3/4. A quicker route for Ax + By = C is that the slope is -A/B, here -3/(-4) = 3/4, but only use that if you are confident about the two minus signs.",
    patternName: "Standard form to slope",
    concept: "Converting between standard form and slope-intercept form",
    recognitionCues: [
      "Ax + By = C with y not isolated",
      "The question asks only for the slope",
      "Options are fractions and their variants",
    ],
    fastestMethod: "Use slope = -A/B, then sanity-check the sign against the equation.",
    alternativeMethod: "Rearrange fully into y = mx + b. Slower but safer under pressure.",
    commonTraps: [
      "Forgetting that dividing by a negative changes both terms",
      "Giving the negative reciprocal, which belongs to a perpendicular line",
      "Reading the slope as A/B without the minus sign",
    ],
    expectedSeconds: 50,
  },

  // --- Linear functions --------------------------------------------------
  {
    id: "alg-linf-001",
    skillId: "linear-functions",
    format: "mcq",
    stem: "A plumber charges a fixed call-out fee plus an hourly rate. The total cost in pounds for a job lasting h hours is modelled by C(h) = 45 + 32h. Which statement is the best interpretation of 32 in this model?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: "The plumber charges 32 pounds to attend, before any work begins.",
        distractorType: "swapped_values",
        rationale: "That describes the fixed fee, which is 45 in this model.",
      },
      { label: "B", text: "The cost increases by 32 pounds for each additional hour worked.", isCorrect: true, rationale: "The coefficient of h is the rate of change: cost per hour." },
      {
        label: "C",
        text: "A job costs 32 pounds in total.",
        distractorType: "true_but_irrelevant",
        rationale: "No job costs 32 pounds in total here; the minimum is 45 pounds for zero hours.",
      },
      {
        label: "D",
        text: "The plumber works for 32 hours.",
        distractorType: "wrong_relationship",
        rationale: "32 multiplies the hours; it is not a number of hours itself. Watch the units.",
      },
    ],
    explanation:
      "In C(h) = 45 + 32h the constant 45 is the value when h = 0, so it is the call-out fee. The coefficient 32 multiplies the hours, so it is the cost per hour: every extra hour adds 32 pounds. Checking units settles it, since 32 is in pounds per hour and 45 is in pounds.",
    patternName: "Interpret slope in context",
    concept: "Meaning of slope and intercept in a linear model",
    recognitionCues: [
      "A real-world model written as a formula",
      "The question asks what a number means rather than for a calculation",
      "Options describe quantities in words",
    ],
    fastestMethod:
      "Attach units to the number. A coefficient carries per-something units and is therefore a rate; the constant carries the bare unit and is a starting value.",
    commonTraps: [
      "Swapping the roles of the rate and the starting value",
      "Choosing an option that is arithmetically true but does not describe the number asked about",
      "Ignoring units",
    ],
    expectedSeconds: 45,
  },
  {
    id: "alg-linf-002",
    skillId: "linear-functions",
    format: "spr",
    stem: "A linear function f satisfies f(3) = 11 and f(7) = 23. What is the value of f(0)?",
    difficulty: 3,
    acceptedAnswers: ["2"],
    explanation:
      "The rate of change is (23 - 11)/(7 - 3) = 12/4 = 3. Going back from f(3) = 11 to f(0) means going down three steps of 3, so f(0) = 11 - 9 = 2. Equivalently f(x) = 3x + 2, and f(0) is the constant term.",
    patternName: "Linear function from two values",
    concept: "Using a constant rate of change to extrapolate",
    recognitionCues: [
      "The word linear with two input-output pairs",
      "A request for the value at a different input",
      "f(0) asked for, which is just the y-intercept",
    ],
    fastestMethod:
      "Find the rate of change, then step from a known point to the target input. For f(0) specifically you are finding the intercept.",
    commonTraps: [
      "Stepping in the wrong direction and getting 20",
      "Dividing the change in x by the change in y",
      "Assuming f(0) = 0",
    ],
    expectedSeconds: 55,
  },
  {
    id: "alg-linf-003",
    skillId: "linear-functions",
    format: "mcq",
    stimulusTitle: "Table of values",
    stimulus:
      "x:  1   4   7   10\nf(x):  -2   7   16   25",
    stem: "The table gives values of the linear function f. What is the value of f(13)?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "28",
        distractorType: "off_by_one",
        rationale: "This adds 3 rather than 9. The step in x from 10 to 13 is 3, and each unit of x adds 3 to f(x), so the total increase is 9.",
      },
      { label: "B", text: "34", isCorrect: true, rationale: "The rate of change is 3 per unit, and 25 + 3(3) = 34." },
      {
        label: "C",
        text: "37",
        distractorType: "wrong_operation",
        rationale: "This continues the pattern by one extra step. Count the gap from 10 to 13 carefully.",
      },
      {
        label: "D",
        text: "43",
        distractorType: "unit_error",
        rationale: "This treats each table row as one unit of x rather than three.",
      },
    ],
    explanation:
      "Each time x increases by 3 the output increases by 9, so the rate of change is 3 per unit of x. From x = 10 to x = 13 is another 3 units, so f(13) = 25 + 9 = 34. The explicit rule is f(x) = 3x - 5, which also gives 34.",
    patternName: "Extend a linear table",
    concept: "Constant rate of change in tabulated data",
    recognitionCues: [
      "A table with evenly spaced x values",
      "Differences in f(x) that are constant",
      "A request for a value beyond the table",
    ],
    fastestMethod:
      "Work out the change in f(x) per unit of x, not per row, then extend from the last entry.",
    commonTraps: [
      "Confusing the per-row change with the per-unit change",
      "Miscounting how many steps the target is beyond the table",
      "Assuming the x values increase by one",
    ],
    expectedSeconds: 55,
  },

  // --- Systems of two linear equations -----------------------------------
  {
    id: "alg-sys-001",
    skillId: "systems-two-linear-equations",
    format: "spr",
    stem: "If 2x + y = 11 and x - y = 1, what is the value of y?",
    difficulty: 2,
    acceptedAnswers: ["3"],
    explanation:
      "The y terms are already opposites, so adding the equations eliminates y: 3x = 12 and x = 4. Substituting into x - y = 1 gives 4 - y = 1, so y = 3. Check both equations: 2(4) + 3 = 11 and 4 - 3 = 1.",
    patternName: "Elimination by adding",
    concept: "Solving a two-by-two linear system",
    recognitionCues: [
      "Two equations, two unknowns",
      "Coefficients of one variable are already opposites or equal",
      "Only one of the two unknowns is asked for",
    ],
    fastestMethod:
      "Add or subtract the equations to kill a variable immediately, then back-substitute. Check which variable the question actually wants before writing your answer down.",
    alternativeMethod: "Substitution, which is better when one equation already isolates a variable.",
    commonTraps: [
      "Solving for x and reporting it when y was asked for",
      "Subtracting when adding was needed, reintroducing the variable",
      "Arithmetic slips in the back-substitution",
    ],
    expectedSeconds: 45,
  },
  {
    id: "alg-sys-002",
    skillId: "systems-two-linear-equations",
    format: "spr",
    stem: "In the system kx + 6y = 12 and 2x + 3y = 5, k is a constant. If the system has no solution, what is the value of k?",
    difficulty: 4,
    acceptedAnswers: ["4"],
    explanation:
      "No solution means the lines are parallel but not identical, so the coefficients are proportional while the constants are not. Matching ratios: k/2 = 6/3 = 2, so k = 4. Checking that it is genuinely no solution rather than infinitely many: with k = 4 the first equation is 4x + 6y = 12, which is 2x + 3y = 6, and that contradicts 2x + 3y = 5. Parallel and distinct, so no solution.",
    patternName: "Parallel-lines condition",
    concept: "When a linear system has no solution",
    recognitionCues: [
      "A constant in a coefficient rather than a value to solve for",
      "The phrase no solution or infinitely many solutions",
      "Two equations that can be scaled onto each other",
    ],
    fastestMethod:
      "Set the coefficient ratios equal and solve for the constant, then verify the constant terms do not also match, which would mean infinitely many solutions instead.",
    commonTraps: [
      "Stopping before checking it is not the infinitely-many case",
      "Comparing a coefficient with a constant term",
      "Setting up the ratio upside down",
    ],
    relatedConcepts: ["linear-equations-two-variables"],
    expectedSeconds: 75,
  },
  {
    id: "alg-sys-003",
    skillId: "systems-two-linear-equations",
    format: "mcq",
    stem: "A theatre sells 30 tickets for a performance and takes 290 pounds in total. Adult tickets cost 12 pounds and child tickets cost 7 pounds. How many child tickets were sold?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "12",
        distractorType: "true_but_irrelevant",
        rationale: "12 is the adult ticket price, not a count of tickets. Check what the variable stands for.",
      },
      { label: "B", text: "14", isCorrect: true, rationale: "With a + c = 30 and 12a + 7c = 290, solving gives a = 16 and c = 14." },
      {
        label: "C",
        text: "16",
        distractorType: "swapped_values",
        rationale: "This is the number of adult tickets. The question asks for child tickets.",
      },
      {
        label: "D",
        text: "18",
        distractorType: "sign_error",
        rationale: "This comes from an arithmetic slip when expanding 7(30 - a).",
      },
    ],
    explanation:
      "Let a and c be the numbers of adult and child tickets. Then a + c = 30 and 12a + 7c = 290. Substituting c = 30 - a gives 12a + 210 - 7a = 290, so 5a = 80 and a = 16. Then c = 14. Check: 16(12) + 14(7) = 192 + 98 = 290.",
    patternName: "Count and value system",
    concept: "Translating a word problem into two equations",
    recognitionCues: [
      "A total count and a total value given together",
      "Two item types at different prices",
      "A question asking how many of one type",
    ],
    fastestMethod:
      "Write the count equation and the value equation, substitute the count equation into the value equation, then make sure you report the quantity asked for.",
    commonTraps: [
      "Answering with the other variable",
      "Using a price as if it were a quantity",
      "Forgetting to distribute across the bracket after substituting",
    ],
    expectedSeconds: 70,
  },

  // --- Linear inequalities -----------------------------------------------
  {
    id: "alg-ineq-001",
    skillId: "linear-inequalities",
    format: "mcq",
    stem: "Which of the following is equivalent to -3x + 7 > 22?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: "x > -5",
        distractorType: "sign_error",
        rationale: "The direction of the inequality must flip when dividing by a negative number. This is the single most common error in the topic.",
      },
      { label: "B", text: "x < -5", isCorrect: true, rationale: "-3x > 15, and dividing by -3 flips the sign to give x < -5." },
      {
        label: "C",
        text: "x < 5",
        distractorType: "sign_error",
        rationale: "The sign of the 5 is wrong. 15 divided by -3 is -5.",
      },
      {
        label: "D",
        text: "x > 5",
        distractorType: "wrong_operation",
        rationale: "Both the sign of the answer and the direction of the inequality are wrong here.",
      },
    ],
    explanation:
      "Subtract 7 from both sides: -3x > 15. Now divide by -3, and because -3 is negative the inequality reverses: x < -5. Test a value to be sure: x = -6 gives -3(-6) + 7 = 25, which is greater than 22, so values below -5 do work.",
    patternName: "Negative coefficient flip",
    concept: "Solving a linear inequality with a negative coefficient",
    recognitionCues: [
      "An inequality sign rather than an equals sign",
      "A negative coefficient on the variable",
      "Options that differ only in the direction of the sign",
    ],
    fastestMethod:
      "Solve as you would an equation, flip the sign the moment you multiply or divide by a negative, then test one value from your answer region.",
    alternativeMethod:
      "Move the variable to the side that keeps it positive: 7 - 22 > 3x gives -15 > 3x, so x < -5 with no flip needed.",
    commonTraps: [
      "Forgetting to reverse the inequality",
      "Flipping the sign when only adding or subtracting",
      "Losing the minus sign on the final value",
    ],
    expectedSeconds: 40,
  },
  {
    id: "alg-ineq-002",
    skillId: "linear-inequalities",
    format: "spr",
    stem: "A student must satisfy 3x + 5y <= 60, where x and y are non-negative. If x = 5, what is the greatest possible value of y?",
    difficulty: 3,
    acceptedAnswers: ["9"],
    explanation:
      "Substituting x = 5 gives 15 + 5y <= 60, so 5y <= 45 and y <= 9. The greatest value allowed is therefore 9. Because the inequality is less than or equal to, 9 itself is permitted; with a strict inequality the answer would be different.",
    patternName: "Substitute then bound",
    concept: "Finding an extreme value in a linear constraint",
    recognitionCues: [
      "An inequality with two variables and one value supplied",
      "The words greatest or least possible value",
      "A non-negativity condition",
    ],
    fastestMethod:
      "Substitute the known value, reduce to a one-variable inequality, and read off the boundary. Check whether the boundary itself is included.",
    commonTraps: [
      "Treating the inequality as strict and answering 8",
      "Forgetting to substitute and bounding the wrong variable",
      "Dividing before subtracting the constant",
    ],
    expectedSeconds: 50,
  },
  {
    id: "alg-ineq-003",
    skillId: "linear-inequalities",
    format: "mcq",
    stem: "Which ordered pair (x, y) satisfies both y > 2x - 1 and y <= -x + 5?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "(3, 2)",
        distractorType: "partial_solution",
        rationale: "It satisfies the second inequality, since 2 <= 2, but fails the first: 2 is not greater than 5.",
      },
      { label: "B", text: "(1, 3)", isCorrect: true, rationale: "3 > 2(1) - 1 = 1 is true, and 3 <= -1 + 5 = 4 is true, so both hold." },
      {
        label: "C",
        text: "(0, -2)",
        distractorType: "partial_solution",
        rationale: "It satisfies the second inequality but not the first, since -2 is not greater than -1.",
      },
      {
        label: "D",
        text: "(4, 6)",
        distractorType: "wrong_relationship",
        rationale: "It satisfies the first inequality but not the second, since 6 is not less than or equal to 1.",
      },
    ],
    explanation:
      "Test each pair in both inequalities and reject as soon as one fails. For (1, 3): the first gives 3 > 1, true; the second gives 3 <= 4, true. Both hold, so (1, 3) is the answer. The other three each satisfy exactly one of the two conditions, which is what makes them tempting.",
    patternName: "Test the point in both constraints",
    concept: "Solutions to a system of linear inequalities",
    recognitionCues: [
      "Two inequalities and four coordinate pairs",
      "The word both",
      "No graph supplied",
    ],
    fastestMethod:
      "Substitute into whichever inequality looks more restrictive first and discard failures immediately. Do not bother finishing a pair once it has failed one condition.",
    commonTraps: [
      "Checking only one inequality",
      "Confusing a strict inequality with one that allows equality",
      "Arithmetic slips with negative coordinates",
    ],
    expectedSeconds: 65,
  },
];
