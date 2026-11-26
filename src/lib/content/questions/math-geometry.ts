import type { SeedQuestion } from "../types";

export const GEOMETRY_QUESTIONS: SeedQuestion[] = [
  // --- Area and volume ---------------------------------------------------
  {
    id: "geo-vol-001",
    skillId: "area-and-volume",
    format: "spr",
    stem: "A right circular cylinder has radius r and height h. A second cylinder has twice the radius and half the height of the first. The volume of the second cylinder is how many times the volume of the first?",
    difficulty: 3,
    acceptedAnswers: ["2"],
    explanation:
      "The volume of a cylinder is pi times r squared times h. Doubling the radius multiplies the volume by 2 squared, which is 4, and halving the height multiplies it by one half. Together the factor is 4 times one half, which is 2. The key point is that radius is squared in the formula, so a change to the radius has twice the leverage of the same change to the height.",
    patternName: "Scaling a volume formula",
    concept: "How volume responds to changes in each dimension",
    recognitionCues: [
      "A shape described twice with dimensions scaled by simple factors",
      "The question asks for a ratio or how many times, not an absolute volume",
      "No numerical dimensions given",
    ],
    fastestMethod:
      "Apply the scale factor to each dimension as it appears in the formula, squaring or cubing where the formula does, then multiply the factors.",
    alternativeMethod: "Substitute convenient numbers such as r = 1 and h = 2 and compute both volumes.",
    commonTraps: [
      "Doubling the volume for the radius change instead of quadrupling it",
      "Cancelling the two changes and answering 1",
      "Using the surface area formula by mistake",
    ],
    expectedSeconds: 60,
  },
  {
    id: "geo-vol-002",
    skillId: "area-and-volume",
    format: "mcq",
    stem: "A shape consists of a rectangle measuring 10 by 6 with a semicircle attached along one of the shorter sides, so that the diameter of the semicircle is 6. What is the total area of the shape?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "60 + 9pi",
        distractorType: "wrong_operation",
        rationale: "This uses the area of a full circle of radius 3. Only half the circle is attached.",
      },
      { label: "B", text: "60 + 4.5pi", isCorrect: true, rationale: "The rectangle contributes 60 and the semicircle contributes half of pi times 3 squared, which is 4.5pi." },
      {
        label: "C",
        text: "60 + 18pi",
        distractorType: "unit_error",
        rationale: "This uses 6 as the radius. The 6 is the diameter, so the radius is 3.",
      },
      {
        label: "D",
        text: "60 + 3pi",
        distractorType: "wrong_operation",
        rationale: "This looks like half the circumference rather than half the area. Area uses r squared.",
      },
    ],
    explanation:
      "Split the shape. The rectangle has area 10 times 6 = 60. The semicircle sits on a side of length 6, so that side is the diameter and the radius is 3. A full circle of radius 3 has area 9pi, so the semicircle has area 4.5pi. The total is 60 + 4.5pi, about 74.1.",
    patternName: "Composite area by decomposition",
    concept: "Splitting a compound shape into standard pieces",
    recognitionCues: [
      "A described shape made from two standard shapes",
      "A dimension shared between the pieces",
      "Options that differ by factors of two or by r against r squared",
    ],
    fastestMethod:
      "Decompose, note whether a given length is a radius or a diameter, then add. The diameter-radius confusion is the single most common error here.",
    commonTraps: [
      "Using the diameter as the radius",
      "Forgetting to halve the circle",
      "Mixing up area and circumference formulas",
    ],
    expectedSeconds: 70,
  },
  {
    id: "geo-vol-003",
    skillId: "area-and-volume",
    format: "mcq",
    stem: "A right circular cone has radius 3 and height 8. What is its volume?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "24pi",
        isCorrect: true,
        rationale: "One third times pi times 3 squared times 8 equals one third times 72pi, which is 24pi.",
      },
      {
        label: "B",
        text: "72pi",
        distractorType: "partial_solution",
        rationale: "This is the cylinder of the same radius and height. A cone is one third of that.",
      },
      {
        label: "C",
        text: "8pi",
        distractorType: "wrong_operation",
        rationale: "This comes from using r rather than r squared somewhere in the calculation.",
      },
      {
        label: "D",
        text: "48pi",
        distractorType: "wrong_operation",
        rationale: "This uses one half rather than one third. The cone factor is one third.",
      },
    ],
    explanation:
      "The volume of a cone is one third times pi times r squared times h. With r = 3 and h = 8 that is one third times pi times 9 times 8 = one third times 72pi = 24pi. The reference sheet supplied with the test includes this formula, so the marks are lost on arithmetic rather than recall: compute r squared times h first, then take a third.",
    patternName: "Apply a given solid formula",
    concept: "Volume of a cone",
    recognitionCues: [
      "A named solid with its dimensions given",
      "Answer options all carrying pi",
      "A formula that appears on the provided reference sheet",
    ],
    fastestMethod:
      "Compute r squared times h first, then multiply by the fraction. Doing the fraction last keeps the arithmetic clean.",
    commonTraps: [
      "Omitting the one third and giving the cylinder volume",
      "Using one half instead of one third",
      "Squaring the height instead of the radius",
    ],
    expectedSeconds: 55,
  },

  // --- Lines, angles and triangles ---------------------------------------
  {
    id: "geo-lines-001",
    skillId: "lines-angles-triangles",
    format: "mcq",
    stem: "Two parallel lines are cut by a transversal. One of the eight angles formed measures 65 degrees. What is the measure of the co-interior angle on the same side of the transversal as that angle?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: "65 degrees",
        distractorType: "wrong_relationship",
        rationale: "That is the alternate or corresponding angle. Co-interior angles are supplementary, not equal.",
      },
      { label: "B", text: "115 degrees", isCorrect: true, rationale: "Co-interior angles between parallel lines sum to 180, and 180 - 65 = 115." },
      {
        label: "C",
        text: "25 degrees",
        distractorType: "wrong_relationship",
        rationale: "This treats the angles as complementary, summing to 90. The relationship here is supplementary.",
      },
      {
        label: "D",
        text: "130 degrees",
        distractorType: "wrong_operation",
        rationale: "This doubles the angle rather than subtracting it from 180.",
      },
    ],
    explanation:
      "When a transversal crosses parallel lines, angles come in just two sizes, and every pair is either equal or supplementary. Corresponding, alternate and vertically opposite angles are equal; co-interior angles, which lie between the parallel lines on the same side of the transversal, add to 180 degrees. So the answer is 180 - 65 = 115 degrees.",
    patternName: "Equal or supplementary with parallel lines",
    concept: "Angle relationships formed by a transversal",
    recognitionCues: [
      "The word parallel with a transversal",
      "One angle given and another requested",
      "Options containing both the original angle and its supplement",
    ],
    fastestMethod:
      "Remember that only two angle sizes exist in the figure: the given one and its supplement. Decide which of the two is wanted and you are done.",
    commonTraps: [
      "Confusing co-interior with alternate angles",
      "Using 90 instead of 180",
      "Assuming lines are parallel when the question has not said so",
    ],
    expectedSeconds: 40,
  },
  {
    id: "geo-lines-002",
    skillId: "lines-angles-triangles",
    format: "spr",
    stem: "A triangle has sides of length 6, 8 and 10. A similar triangle has its shortest side of length 9. What is the length of the longest side of the similar triangle?",
    difficulty: 3,
    acceptedAnswers: ["15"],
    explanation:
      "Similar triangles have corresponding sides in a constant ratio. The shortest side goes from 6 to 9, a scale factor of 1.5. The longest side therefore goes from 10 to 10 times 1.5 = 15. Checking the whole triangle: 9, 12, 15, which is the 3-4-5 triple scaled by 3, as expected.",
    patternName: "Scale factor between similar figures",
    concept: "Corresponding sides of similar triangles",
    recognitionCues: [
      "The word similar",
      "One pair of corresponding sides known in both figures",
      "A request for another side",
    ],
    fastestMethod:
      "Divide the two corresponding known sides to get the scale factor, then multiply the side you want. Make sure you pair up corresponding sides, not just any two.",
    commonTraps: [
      "Adding the difference rather than multiplying by the ratio",
      "Pairing the shortest side with the longest",
      "Applying the scale factor to area without squaring it",
    ],
    expectedSeconds: 50,
  },
  {
    id: "geo-lines-003",
    skillId: "lines-angles-triangles",
    format: "spr",
    stem: "In a triangle, two of the interior angles measure x degrees and 2x degrees. The exterior angle at the third vertex measures 120 degrees. What is the value of x?",
    difficulty: 4,
    acceptedAnswers: ["40"],
    explanation:
      "An exterior angle and its adjacent interior angle are supplementary, so the third interior angle is 180 - 120 = 60 degrees. The three interior angles sum to 180: x + 2x + 60 = 180, so 3x = 120 and x = 40. A faster route uses the exterior angle theorem directly, since the exterior angle equals the sum of the two non-adjacent interior angles: x + 2x = 120 gives x = 40 in one step.",
    patternName: "Exterior angle theorem",
    concept: "Relationship between an exterior angle and the remote interior angles",
    recognitionCues: [
      "An exterior angle given rather than an interior one",
      "Interior angles expressed in terms of a variable",
      "A triangle with one vertex described differently from the others",
    ],
    fastestMethod:
      "Use the exterior angle theorem: the exterior angle equals the sum of the two interior angles not next to it. That skips the supplementary step entirely.",
    alternativeMethod: "Convert the exterior angle to its interior partner, then use the 180 degree sum.",
    commonTraps: [
      "Treating the 120 degrees as an interior angle",
      "Including the third angle when applying the exterior angle theorem",
      "Solving for 2x and reporting that",
    ],
    expectedSeconds: 70,
  },

  // --- Right triangles and trigonometry ----------------------------------
  {
    id: "geo-trig-001",
    skillId: "right-triangles-and-trigonometry",
    format: "spr",
    stem: "A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?",
    difficulty: 2,
    acceptedAnswers: ["15"],
    explanation:
      "By Pythagoras, the hypotenuse squared is 9 squared plus 12 squared, which is 81 + 144 = 225, so the hypotenuse is 15. Recognising that 9, 12, 15 is the 3-4-5 triple multiplied by 3 gets there with no arithmetic at all, and spotting these triples saves real time on the test.",
    patternName: "Pythagorean triple",
    concept: "Pythagoras in a right triangle",
    recognitionCues: [
      "A right triangle with both legs given",
      "Numbers that are multiples of a familiar triple such as 3-4-5 or 5-12-13",
      "A request for the third side",
    ],
    fastestMethod:
      "Check for a known triple first: 3-4-5, 5-12-13, 8-15-17, 7-24-25 and their multiples cover most test items.",
    commonTraps: [
      "Adding the legs instead of squaring them",
      "Treating a given leg as the hypotenuse",
      "Forgetting the square root at the end",
    ],
    expectedSeconds: 35,
  },
  {
    id: "geo-trig-002",
    skillId: "right-triangles-and-trigonometry",
    format: "mcq",
    stem: "In a right triangle, the side opposite angle A has length 7 and the hypotenuse has length 25. What is the value of cos A?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "7/25",
        distractorType: "swapped_values",
        rationale: "That is sin A, the opposite over the hypotenuse. Cosine uses the adjacent side.",
      },
      { label: "B", text: "24/25", isCorrect: true, rationale: "The adjacent side is 24 by Pythagoras, and cosine is adjacent over hypotenuse." },
      {
        label: "C",
        text: "7/24",
        distractorType: "swapped_values",
        rationale: "That is tan A, the opposite over the adjacent.",
      },
      {
        label: "D",
        text: "25/24",
        distractorType: "reciprocal",
        rationale: "This is upside down. In a right triangle the hypotenuse is the longest side, so sine and cosine are never greater than 1.",
      },
    ],
    explanation:
      "Cosine is the adjacent side over the hypotenuse, so the adjacent side is needed. By Pythagoras it is the square root of 25 squared minus 7 squared, which is the square root of 625 - 49 = 576, so 24. This is the 7-24-25 triple. Hence cos A = 24/25. A useful check: sine and cosine of an acute angle always lie strictly between 0 and 1, which immediately eliminates any option greater than 1.",
    patternName: "Find the third side, then the ratio",
    concept: "Trigonometric ratios in a right triangle",
    recognitionCues: [
      "Two sides given and a trigonometric ratio requested",
      "The side needed for the requested ratio is the missing one",
      "Options that are the same digits in different arrangements",
    ],
    fastestMethod:
      "Work out which side the requested ratio needs, find it by Pythagoras, then write the ratio. Discard any option above 1 straight away.",
    commonTraps: [
      "Giving sine when cosine was asked for",
      "Inverting the ratio",
      "Forgetting to find the missing side first",
    ],
    expectedSeconds: 60,
  },
  {
    id: "geo-trig-003",
    skillId: "right-triangles-and-trigonometry",
    format: "mcq",
    stem: "In a right triangle, one acute angle measures 30 degrees and the leg adjacent to it has length 6 times the square root of 3. What is the length of the hypotenuse?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "12",
        isCorrect: true,
        rationale: "In a 30-60-90 triangle the sides are in the ratio 1 to root 3 to 2. The longer leg is 6 root 3, so the shorter leg is 6 and the hypotenuse is 12.",
      },
      {
        label: "B",
        text: "6",
        distractorType: "partial_solution",
        rationale: "This is the shorter leg, not the hypotenuse. One more step is needed.",
      },
      {
        label: "C",
        text: "12 times the square root of 3",
        distractorType: "wrong_operation",
        rationale: "This doubles the given leg. Doubling applies to the shorter leg, not the longer one.",
      },
      {
        label: "D",
        text: "18",
        distractorType: "wrong_operation",
        rationale: "This comes from multiplying by root 3 instead of dividing by it.",
      },
    ],
    explanation:
      "A 30-60-90 triangle has sides in the ratio 1 to root 3 to 2, where 1 is opposite the 30 degree angle, root 3 is opposite 60, and 2 is the hypotenuse. The leg adjacent to the 30 degree angle is the longer leg, which corresponds to root 3. Since it measures 6 root 3, the scale factor is 6, so the shorter leg is 6 and the hypotenuse is 12. Using cosine gives the same thing: cos 30 = adjacent over hypotenuse, so hypotenuse = 6 root 3 divided by root 3 over 2 = 12.",
    patternName: "Special right triangle ratios",
    concept: "The 30-60-90 side ratios",
    recognitionCues: [
      "A 30 or 60 degree angle in a right triangle",
      "A side length containing root 3",
      "Options mixing surds and integers",
    ],
    fastestMethod:
      "Write the ratio 1 to root 3 to 2, identify which position the given side occupies, find the scale factor, then read off the side you need.",
    alternativeMethod: "Use sine or cosine directly, which is safer if you are unsure which leg is which.",
    commonTraps: [
      "Treating the adjacent leg as the shorter one",
      "Stopping at the shorter leg",
      "Multiplying by root 3 where you should divide",
    ],
    expectedSeconds: 80,
  },

  // --- Circles -----------------------------------------------------------
  {
    id: "geo-circ-001",
    skillId: "circles",
    format: "mcq",
    stem: "A circle in the xy-plane has the equation (x - 3)^2 + (y + 2)^2 = 25. What are the coordinates of its centre and the length of its radius?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Centre (3, 2), radius 25",
        distractorType: "sign_error",
        rationale: "Two errors: the sign of the y-coordinate, and using the right-hand side as the radius rather than its square.",
      },
      { label: "B", text: "Centre (3, -2), radius 5", isCorrect: true, rationale: "In (x - h)^2 + (y - k)^2 = r^2 the centre is (h, k) and the radius is the square root of the right-hand side." },
      {
        label: "C",
        text: "Centre (-3, 2), radius 5",
        distractorType: "sign_error",
        rationale: "Both signs have been flipped. The form subtracts the centre coordinates, so (x - 3) gives h = 3 and (y + 2) gives k = -2.",
      },
      {
        label: "D",
        text: "Centre (3, -2), radius 25",
        distractorType: "partial_solution",
        rationale: "The centre is right, but 25 is r squared, so the radius is 5.",
      },
    ],
    explanation:
      "The standard form is (x - h)^2 + (y - k)^2 = r^2 with centre (h, k) and radius r. Matching terms: x - 3 gives h = 3, and y + 2 is y - (-2), so k = -2. The right-hand side is r squared = 25, so r = 5. The centre is (3, -2) with radius 5. Both classic errors appear among the options, so read the signs carefully.",
    patternName: "Read the circle equation",
    concept: "Standard form of a circle",
    recognitionCues: [
      "Two squared brackets added and set equal to a constant",
      "Equal coefficients on the squared terms",
      "Options differing only in signs and in radius against radius squared",
    ],
    fastestMethod:
      "Rewrite any plus inside a bracket as minus a negative, read the centre off directly, then square-root the right-hand side.",
    commonTraps: [
      "Keeping the sign as it appears inside the bracket",
      "Giving r squared as the radius",
      "Confusing this with the equation of an ellipse when coefficients differ",
    ],
    expectedSeconds: 50,
  },
  {
    id: "geo-circ-002",
    skillId: "circles",
    format: "mcq",
    stem: "A circle has radius 9. What is the length of an arc subtended by a central angle of 40 degrees?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "2pi",
        isCorrect: true,
        rationale: "The arc is 40/360 = 1/9 of the circumference, and the circumference is 18pi, so the arc is 2pi.",
      },
      {
        label: "B",
        text: "9pi",
        distractorType: "wrong_operation",
        rationale: "This is half the circumference, which corresponds to a 180 degree angle.",
      },
      {
        label: "C",
        text: "4.5pi",
        distractorType: "wrong_operation",
        rationale: "This is the sector area divided by something, not an arc length. Arc length is a fraction of the circumference.",
      },
      {
        label: "D",
        text: "20pi",
        distractorType: "unit_error",
        rationale: "This uses 9 as the diameter or mishandles the fraction. Check the fraction of the full turn.",
      },
    ],
    explanation:
      "An arc is the same fraction of the circumference as its central angle is of a full turn. Here 40/360 = 1/9. The circumference is 2 times pi times 9 = 18pi, so the arc length is 18pi divided by 9 = 2pi. Keep the distinction clear: arc length uses the circumference, sector area uses the area.",
    patternName: "Fraction of a full turn",
    concept: "Arc length from a central angle",
    recognitionCues: [
      "A central angle in degrees with a radius",
      "The words arc length",
      "Options that are all multiples of pi",
    ],
    fastestMethod:
      "Write the angle over 360, then multiply by 2 pi r. Simplify the fraction before multiplying to keep the numbers small.",
    commonTraps: [
      "Using the area formula instead of the circumference",
      "Forgetting to convert the angle to a fraction of the full turn",
      "Using the diameter where the radius belongs",
    ],
    expectedSeconds: 55,
  },
  {
    id: "geo-circ-003",
    skillId: "circles",
    format: "mcq",
    stem: "A sector of a circle of radius 6 has a central angle of pi/3 radians. What is the area of the sector?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "2pi",
        distractorType: "wrong_operation",
        rationale: "This is the arc length of the sector, r times theta, not its area.",
      },
      { label: "B", text: "6pi", isCorrect: true, rationale: "Sector area is one half r squared theta, which is one half times 36 times pi/3 = 6pi." },
      {
        label: "C",
        text: "12pi",
        distractorType: "partial_solution",
        rationale: "This omits the factor of one half. The sector area formula halves r squared theta.",
      },
      {
        label: "D",
        text: "36pi",
        distractorType: "wrong_relationship",
        rationale: "That is the area of the whole circle. A pi/3 angle is only one sixth of a full turn.",
      },
    ],
    explanation:
      "With the angle in radians the sector area is one half times r squared times theta: one half times 36 times pi/3 = 18 times pi/3 = 6pi. As a sanity check, pi/3 is one sixth of 2pi, and one sixth of the whole circle area 36pi is indeed 6pi. Note that the radian formulas, one half r squared theta for area and r theta for arc length, are much quicker than converting to degrees.",
    patternName: "Radian sector formulas",
    concept: "Sector area with the angle in radians",
    recognitionCues: [
      "An angle expressed as a multiple or fraction of pi",
      "The word sector or segment",
      "A radius given as a small integer",
    ],
    fastestMethod:
      "Use one half r squared theta directly in radians, then check it against the fraction of the whole circle.",
    alternativeMethod: "Convert the angle to degrees and take that fraction of pi r squared.",
    commonTraps: [
      "Dropping the factor of one half",
      "Using the arc length formula instead",
      "Converting radians to degrees incorrectly",
    ],
    expectedSeconds: 70,
  },
];
