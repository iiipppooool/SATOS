import type { SeedQuestion } from "../types";

/** Second batch of Geometry and Trigonometry items. */
export const GEOMETRY_QUESTIONS_2: SeedQuestion[] = [
  {
    id: "geo-vol-004",
    skillId: "area-and-volume",
    format: "spr",
    stem: "A rectangle has a perimeter of 54 and a length that is twice its width. What is the area of the rectangle?",
    difficulty: 3,
    acceptedAnswers: ["162"],
    explanation:
      "Let the width be w, so the length is 2w. The perimeter is 2(w + 2w) = 6w = 54, giving w = 9 and a length of 18. The area is 9 times 18 = 162. Checking the perimeter: 2(9 + 18) = 54, as required.",
    patternName: "Express both dimensions in one variable",
    concept: "Perimeter and area of a rectangle",
    recognitionCues: [
      "A perimeter given with a relationship between the sides",
      "A phrase such as twice its width or three times as long",
      "An area requested",
    ],
    fastestMethod:
      "Write both dimensions in terms of one variable, solve the perimeter equation, then multiply. Do not try to find the area directly from the perimeter.",
    commonTraps: [
      "Setting the perimeter equal to w + 2w and forgetting the factor of 2",
      "Reporting the width or the length rather than the area",
      "Swapping which dimension is doubled",
    ],
    expectedSeconds: 60,
  },
  {
    id: "geo-circ-004",
    skillId: "circles",
    format: "spr",
    stem: "In the xy-plane, a circle has its centre at (-1, 4) and passes through the point (3, 7). What is the radius of the circle?",
    difficulty: 4,
    acceptedAnswers: ["5"],
    explanation:
      "The radius is the distance from the centre to any point on the circle. The horizontal difference is 3 - (-1) = 4 and the vertical difference is 7 - 4 = 3, so the radius is the square root of 4 squared plus 3 squared, which is the square root of 25, or 5. Spotting the 3-4-5 triple avoids the arithmetic entirely.",
    patternName: "Distance formula as Pythagoras",
    concept: "Radius from the centre and a point on the circle",
    recognitionCues: [
      "A centre and a point on the circle given as coordinates",
      "The radius or diameter requested",
      "Differences that form a familiar triple",
    ],
    fastestMethod:
      "Take the horizontal and vertical differences, then check for a Pythagorean triple before reaching for a calculator.",
    commonTraps: [
      "Sign error when subtracting a negative coordinate",
      "Adding the differences instead of squaring them",
      "Giving the diameter instead of the radius",
    ],
    expectedSeconds: 60,
  },
];
