import type { SeedQuestion } from "../types";

/**
 * Second batch of Problem-Solving and Data Analysis, and Geometry and
 * Trigonometry. These two domains had the thinnest coverage in the bank at two
 * to four questions per skill, which made a single-skill drill almost
 * meaningless. Answers are re-derived in tests/maths-verification.test.ts.
 */
export const DATA_GEOMETRY_QUESTIONS_2: SeedQuestion[] = [
  // --- Ratios, rates, proportional relationships, units -------------------
  {
    id: "psda-ratio-003",
    skillId: "ratios-rates-proportions-units",
    format: "spr",
    stem: "A recipe uses 150 grams of flour to make 12 biscuits. At the same rate, how many grams of flour are needed for 30 biscuits?",
    difficulty: 2,
    acceptedAnswers: ["375"],
    explanation:
      "Find the rate first: 150 divided by 12 is 12.5 grams a biscuit. For 30 biscuits that is 12.5 times 30 = 375 grams. A proportion gives the same thing: 150/12 = x/30, so x = 150 times 30 / 12 = 375.",
    patternName: "Constant rate scaling",
    concept: "Proportional reasoning",
    recognitionCues: [
      "A quantity per a number of items",
      "The phrase at the same rate",
      "A larger or smaller count asked about",
    ],
    fastestMethod:
      "Work out the unit rate, then multiply. Checking that the answer moves in the sensible direction catches most errors.",
    commonTraps: [
      "Multiplying by 12 rather than dividing",
      "Scaling by the difference rather than the ratio",
      "Rounding the unit rate before multiplying",
    ],
    expectedSeconds: 40,
  },
  {
    id: "psda-ratio-004",
    skillId: "ratios-rates-proportions-units",
    format: "spr",
    stem: "On a map drawn to a scale of 1 to 25,000, two landmarks are 8 centimetres apart. What is the actual distance between them, in kilometres?",
    difficulty: 4,
    acceptedAnswers: ["2"],
    explanation:
      "A scale of 1 to 25,000 means 1 cm on the map is 25,000 cm on the ground, so 8 cm represents 200,000 cm. Converting: 200,000 cm is 2,000 m, which is 2 km. The conversions are where this is lost, so do them one step at a time rather than in one jump.",
    patternName: "Map scale with a unit conversion",
    concept: "Scale factors and metric conversion",
    recognitionCues: [
      "A scale written as 1 to a large number",
      "A map measurement in centimetres",
      "An answer requested in a different unit",
    ],
    fastestMethod:
      "Multiply by the scale first, then convert, and write each conversion on its own line. Centimetres to metres is divide by 100, metres to kilometres is divide by 1,000.",
    commonTraps: [
      "Converting before applying the scale and losing a factor",
      "Dividing by 100,000 instead of 100,000 in two steps",
      "Answering in metres",
    ],
    expectedSeconds: 70,
  },

  // --- Percentages ---------------------------------------------------------
  {
    id: "psda-pct-003",
    skillId: "percentages",
    format: "spr",
    stem: "The population of a town grew from 4,500 to 5,940. What was the percentage increase?",
    difficulty: 3,
    acceptedAnswers: ["32"],
    explanation:
      "The increase is 5,940 minus 4,500, which is 1,440. As a fraction of the original that is 1,440/4,500 = 0.32, so 32 per cent. The denominator must be the original figure, not the new one: dividing by 5,940 would give about 24 per cent, which answers a different question.",
    patternName: "Percentage change from two values",
    concept: "Percentage increase relative to the original",
    recognitionCues: [
      "A before and an after figure",
      "A percentage increase or decrease requested",
      "No percentage given in the question",
    ],
    fastestMethod:
      "Change divided by original, then times 100. Say the word original to yourself as you write the denominator.",
    commonTraps: [
      "Dividing by the new value",
      "Giving the ratio 5940/4500 as 132 rather than the increase of 32",
      "Forgetting to convert the decimal to a percentage",
    ],
    expectedSeconds: 55,
  },
  {
    id: "psda-pct-004",
    skillId: "percentages",
    format: "mcq",
    stem: "A price is increased by 25 per cent and the new price is then reduced by 20 per cent. Compared with the original price, the final price is",
    difficulty: 4,
    choices: [
      { label: "A", text: "unchanged.", isCorrect: true, rationale: "1.25 times 0.80 = 1.00 exactly, so the two changes cancel." },
      {
        label: "B",
        text: "5 per cent higher.",
        distractorType: "wrong_operation",
        rationale: "This subtracts the percentages, which is not how successive changes combine.",
      },
      {
        label: "C",
        text: "5 per cent lower.",
        distractorType: "sign_error",
        rationale: "Also from subtracting the percentages, in the other direction.",
      },
      {
        label: "D",
        text: "45 per cent higher.",
        distractorType: "wrong_operation",
        rationale: "This adds the percentages. Successive changes multiply.",
      },
    ],
    explanation:
      "Successive percentage changes multiply. A 25 per cent rise is a multiplier of 1.25 and a 20 per cent fall is 0.80, and 1.25 times 0.80 = 1.00, so the price returns exactly to where it started. Following 100 pounds through makes it obvious: up to 125, then down by 25 to 100. Note this is the one pairing where equal-looking changes do cancel, because one fifth of 125 is exactly 25.",
    patternName: "Successive percentage change",
    concept: "Multiplying percentage multipliers",
    recognitionCues: [
      "Two percentage changes applied in sequence",
      "An option saying unchanged",
      "Percentages that are not equal",
    ],
    fastestMethod:
      "Multiply the multipliers, or follow 100 through the two steps. Never add or subtract the percentages.",
    commonTraps: [
      "Adding or subtracting the two percentages",
      "Assuming a rise then a fall must leave you down",
      "Applying the second change to the original price",
    ],
    expectedSeconds: 60,
  },

  // --- One-variable data ---------------------------------------------------
  {
    id: "psda-1var-003",
    skillId: "one-variable-data",
    format: "spr",
    stimulusTitle: "Data set",
    stimulus: "3, 7, 7, 9, 14",
    stem: "For the data set shown, what is the mean minus the median?",
    difficulty: 3,
    acceptedAnswers: ["1"],
    explanation:
      "The mean is (3 + 7 + 7 + 9 + 14)/5 = 40/5 = 8. The data is already in order, so the median is the middle of five values, which is 7. The difference is 8 minus 7 = 1. The mean sits above the median here because the single large value of 14 pulls it up, which is the general signature of a right-skewed set.",
    patternName: "Mean against median",
    concept: "Measures of centre and the effect of skew",
    recognitionCues: [
      "A small ordered or nearly ordered data set",
      "Both mean and median requested",
      "One value noticeably larger or smaller than the rest",
    ],
    fastestMethod:
      "Sum and divide for the mean, count to the middle for the median. Check the data is ordered before reading the median off.",
    commonTraps: [
      "Reading the median from unordered data",
      "Dividing the sum by the wrong count",
      "Subtracting in the wrong order",
    ],
    expectedSeconds: 50,
  },
  {
    id: "psda-1var-004",
    skillId: "one-variable-data",
    format: "mcq",
    stem: "A data set has a mean of 20. A new value of exactly 20 is added to the set. Which statement about the new set is true?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "The mean increases and the standard deviation increases.",
        distractorType: "wrong_relationship",
        rationale: "Adding a value equal to the mean cannot move the mean.",
      },
      { label: "B", text: "The mean is unchanged and the standard deviation decreases.", isCorrect: true, rationale: "The mean stays at 20, and a value with zero deviation dilutes the average squared deviation." },
      {
        label: "C",
        text: "The mean is unchanged and the standard deviation is unchanged.",
        distractorType: "wrong_relationship",
        rationale: "The mean is right, but spread is an average over more values now, and the new value contributes nothing to it.",
      },
      {
        label: "D",
        text: "The mean is unchanged and the standard deviation increases.",
        distractorType: "wrong_relationship",
        rationale: "A value sitting exactly at the centre cannot increase the spread about that centre.",
      },
    ],
    explanation:
      "Adding a value equal to the mean leaves the mean exactly where it was, since the total and the count rise in proportion. Standard deviation measures typical distance from the mean, and this new value is zero distance away, so the average distance falls: the same total deviation is now spread across more values. No calculation is needed, only the definition.",
    patternName: "Adding a value at the mean",
    concept: "How centre and spread respond to a new observation",
    recognitionCues: [
      "A value added that equals the existing mean",
      "Options pairing a mean claim with a spread claim",
      "No actual data given",
    ],
    fastestMethod:
      "Settle the mean first, which eliminates options quickly, then reason about spread from the definition rather than computing anything.",
    commonTraps: [
      "Assuming any new value changes the mean",
      "Assuming spread is unchanged because the new value is typical",
      "Trying to calculate a standard deviation by hand",
    ],
    expectedSeconds: 65,
  },

  // --- Two-variable data ---------------------------------------------------
  {
    id: "psda-2var-003",
    skillId: "two-variable-data",
    format: "spr",
    stem: "The line of best fit for a scatterplot is y = 7 + 2.5x. What value does the model predict for y when x = 12?",
    difficulty: 2,
    acceptedAnswers: ["37"],
    explanation:
      "Substitute x = 12: y = 7 + 2.5(12) = 7 + 30 = 37. Write the product down before adding the intercept; combining both in one step is where the slip usually happens.",
    patternName: "Predict from a best-fit line",
    concept: "Using a linear model to predict",
    recognitionCues: [
      "A best-fit equation given",
      "A specific predictor value",
      "The word predict or estimate",
    ],
    fastestMethod: "Multiply first, then add. One line of working each.",
    commonTraps: [
      "Multiplying the intercept by x as well",
      "Reading the coefficients the wrong way round",
      "Adding before multiplying",
    ],
    expectedSeconds: 35,
  },
  {
    id: "psda-2var-004",
    skillId: "two-variable-data",
    format: "spr",
    stem: "For a scatterplot with line of best fit y = 3x + 5, one data point has x = 12 and an observed y value of 45. What is the residual for this point?",
    difficulty: 4,
    acceptedAnswers: ["4"],
    explanation:
      "A residual is the observed value minus the predicted value. The model predicts y = 3(12) + 5 = 41, and the observation is 45, so the residual is 45 minus 41 = 4. A positive residual means the point sits above the line. Reversing the subtraction gives -4, which describes a point below the line and so answers the opposite question.",
    patternName: "Residual as observed minus predicted",
    concept: "Residuals and fit",
    recognitionCues: [
      "A best-fit line plus a specific observed value",
      "The word residual",
      "Both an x and a y given for the same point",
    ],
    fastestMethod:
      "Predict first, then subtract in the order observed minus predicted. Say that phrase as you write it.",
    commonTraps: [
      "Subtracting observed from predicted and giving the wrong sign",
      "Using the x value in place of the prediction",
      "Forgetting the intercept",
    ],
    expectedSeconds: 60,
  },

  // --- Probability ---------------------------------------------------------
  {
    id: "psda-prob-003",
    skillId: "probability",
    format: "mcq",
    stimulusTitle: "Members of a sports club, by age group and membership type",
    stimulus:
      "                 Full    Off-peak    Total\nUnder 25           48         72        120\n25 and over       132         48        180\nTotal             180        120        300",
    stem: "A member is selected at random. What is the probability that the member is under 25 or has off-peak membership?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "240/300",
        distractorType: "wrong_operation",
        rationale: "This adds the two totals, 120 and 120, counting the 72 who are both under 25 and off-peak twice.",
      },
      { label: "B", text: "168/300", isCorrect: true, rationale: "120 + 120 - 72 = 168, subtracting the overlap counted twice." },
      {
        label: "C",
        text: "72/300",
        distractorType: "wrong_relationship",
        rationale: "That is the probability of being both, which is the and case rather than the or case.",
      },
      {
        label: "D",
        text: "192/300",
        distractorType: "wrong_operation",
        rationale: "This subtracts the overlap only once from one of the totals rather than from the sum.",
      },
    ],
    explanation:
      "Or means either category or both, so add the two counts and subtract the overlap, which would otherwise be counted twice: 120 under 25, plus 120 off-peak, minus the 72 who are in both, gives 168 out of 300. Checking by direct count gives the same thing: 48 full under 25, plus all 120 off-peak, is 168.",
    patternName: "Either-or with an overlap",
    concept: "Addition rule for non-exclusive events",
    recognitionCues: [
      "The word or joining two categories",
      "A two-way table where the categories intersect",
      "An option that is simply the two totals added",
    ],
    fastestMethod:
      "Add the margins and subtract the overlapping cell. If the arithmetic feels risky, count the cells that qualify directly.",
    commonTraps: [
      "Double counting the overlap",
      "Answering the and question instead",
      "Using the wrong cell as the overlap",
    ],
    expectedSeconds: 80,
  },
  {
    id: "psda-prob-004",
    skillId: "probability",
    format: "spr",
    stimulusTitle: "Seedlings by treatment and outcome",
    stimulus:
      "                Survived    Died    Total\nTreated              135       15      150\nUntreated             60       40      100\nTotal                195       55      250",
    stem: "A seedling is selected at random from those that were treated. What is the probability that it survived? Give your answer as a decimal.",
    difficulty: 3,
    acceptedAnswers: ["0.9", ".9", "9/10", "135/150"],
    explanation:
      "Selecting from those that were treated restricts the sample space to the 150 treated seedlings. Of those, 135 survived, so the probability is 135/150 = 0.9. The common error is to use the grand total of 250, which answers the different question of how likely a randomly chosen seedling is to be both treated and surviving.",
    patternName: "Conditional probability from a two-way table",
    concept: "Conditioning restricts the denominator",
    recognitionCues: [
      "The phrase selected from those that",
      "A two-way table with row and column totals",
      "One group named as the pool",
    ],
    fastestMethod:
      "Write the conditioning total down before anything else, then read the overlapping cell as the numerator.",
    commonTraps: [
      "Using the grand total as the denominator",
      "Conditioning on survival rather than on treatment",
      "Reading the untreated row by mistake",
    ],
    expectedSeconds: 55,
  },

  // --- Inference and margin of error ---------------------------------------
  {
    id: "psda-inf-003",
    skillId: "inference-and-margin-of-error",
    format: "mcq",
    stem: "A random sample of 900 commuters found that 62 per cent use public transport at least twice a week, with a margin of error of 3 percentage points. Which conclusion is best supported?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Exactly 62 per cent of all commuters use public transport at least twice a week.",
        distractorType: "too_narrow",
        rationale: "A sample gives an estimate. Asserting an exact population value ignores the margin of error entirely.",
      },
      { label: "B", text: "It is plausible that between 59 and 65 per cent of all commuters use public transport at least twice a week.", isCorrect: true, rationale: "62 plus or minus 3 gives the interval, and the claim is appropriately hedged." },
      {
        label: "C",
        text: "Between 59 and 65 per cent of the 900 surveyed commuters use public transport at least twice a week.",
        distractorType: "wrong_relationship",
        rationale: "The sample proportion is known exactly at 62 per cent; the interval estimates the population, not the sample.",
      },
      {
        label: "D",
        text: "Increasing the sample to 1,800 would eliminate the margin of error.",
        distractorType: "too_broad",
        rationale: "A larger sample narrows the margin but never removes it. Only a census would, and even then not from sampling alone.",
      },
    ],
    explanation:
      "A margin of error produces an interval estimate for the population value: 62 plus or minus 3 gives 59 to 65 per cent. Two distinctions decide this question. The interval is about all commuters, not the 900 surveyed, whose proportion is known exactly. And it supports a plausible range rather than an exact figure, so the hedged wording in B is what the statistics actually license.",
    patternName: "Interpret a margin of error",
    concept: "What an interval estimate claims",
    recognitionCues: [
      "A sample percentage quoted with a margin of error",
      "Options that differ in whether they describe the sample or the population",
      "An option asserting an exact value",
    ],
    fastestMethod:
      "Check two things in each option: is it about the population rather than the sample, and does it allow uncertainty?",
    commonTraps: [
      "Applying the interval to the sample itself",
      "Asserting the sample value as the exact population value",
      "Thinking a big enough sample removes sampling error",
    ],
    expectedSeconds: 70,
  },
  {
    id: "psda-inf-004",
    skillId: "inference-and-margin-of-error",
    format: "mcq",
    stem: "Two surveys estimate the same population proportion at the same confidence level. Survey A sampled 400 people and Survey B sampled 1,600. Which statement is true?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Survey B's margin of error is about one quarter of Survey A's.",
        distractorType: "wrong_relationship",
        rationale: "Margin of error falls with the square root of the sample size, not with the sample size itself.",
      },
      { label: "B", text: "Survey B's margin of error is about half of Survey A's.", isCorrect: true, rationale: "Quadrupling the sample halves the margin, since the margin scales with one over the square root of n." },
      {
        label: "C",
        text: "Both surveys have the same margin of error, since the confidence level is the same.",
        distractorType: "wrong_relationship",
        rationale: "The confidence level is one input; the sample size is the other, and it differs fourfold here.",
      },
      {
        label: "D",
        text: "Survey B is more likely to be biased because it is larger.",
        distractorType: "true_but_irrelevant",
        rationale: "Size and bias are unrelated. Bias comes from how respondents were selected, not how many there were.",
      },
    ],
    explanation:
      "Margin of error is proportional to one over the square root of the sample size. Going from 400 to 1,600 multiplies n by 4, and the square root of 4 is 2, so the margin halves rather than quartering. The practical consequence is worth remembering: halving your margin of error costs four times the data, which is why surveys stop where they do.",
    patternName: "Square-root relationship with sample size",
    concept: "How precision scales with n",
    recognitionCues: [
      "Two sample sizes with a clean ratio",
      "The same confidence level stated for both",
      "Options offering both the ratio and its square root",
    ],
    fastestMethod:
      "Take the ratio of the sample sizes, then its square root. That square root is the factor by which the margin shrinks.",
    commonTraps: [
      "Scaling the margin by the sample ratio directly",
      "Thinking equal confidence levels imply equal margins",
      "Confusing precision with bias",
    ],
    expectedSeconds: 70,
  },

  // --- Evaluating statistical claims ---------------------------------------
  {
    id: "psda-claims-003",
    skillId: "evaluating-statistical-claims",
    format: "mcq",
    stem: "Researchers randomly assigned 600 volunteers to either a new revision technique or their usual method, then measured test performance. The new technique group scored significantly higher. Which conclusion is best supported?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "The new technique caused the improvement among these volunteers.",
        isCorrect: true,
        rationale: "Random assignment to groups is exactly what licenses a causal claim, and the claim is limited to the volunteers studied.",
      },
      {
        label: "B",
        text: "The new technique is associated with higher scores, but no causal claim is possible.",
        distractorType: "too_narrow",
        rationale: "This is the right caution for an observational study, but random assignment was used here, so causation is supported.",
      },
      {
        label: "C",
        text: "The new technique will raise scores for all students everywhere.",
        distractorType: "too_broad",
        rationale: "The participants were volunteers, not a random sample of all students, so the result cannot be generalised that widely.",
      },
      {
        label: "D",
        text: "Students who score highly are more likely to adopt new techniques.",
        distractorType: "wrong_relationship",
        rationale: "This reverses the direction, which random assignment specifically rules out.",
      },
    ],
    explanation:
      "The two questions to ask are whether treatment was randomly assigned, which licenses causal language, and whether the sample was randomly drawn from a wider population, which licenses generalisation. Here the first is yes and the second is no: assignment was random, so causation within the study is supported, but the participants volunteered, so the finding cannot be extended to all students. A is the only option that gets both halves right, and note that the cautious-sounding B is wrong precisely because the design is stronger than it assumes.",
    patternName: "Randomised experiment licenses causation",
    concept: "Random assignment against random sampling",
    recognitionCues: [
      "The phrase randomly assigned, as distinct from randomly selected",
      "Volunteers as participants",
      "Options ranging from association to universal causation",
    ],
    fastestMethod:
      "Separate assignment from sampling. Random assignment gives causation within the study; random sampling gives generalisation beyond it.",
    commonTraps: [
      "Defaulting to the association answer whenever statistics appear",
      "Generalising from a volunteer sample",
      "Missing that assignment and selection are different things",
    ],
    expectedSeconds: 75,
  },
  {
    id: "psda-claims-004",
    skillId: "evaluating-statistical-claims",
    format: "mcq",
    stem: "A researcher surveyed a random sample of 300 pupils at one secondary school about screen time. Which conclusion is best supported?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Conclusions can be drawn about pupils at that school.",
        isCorrect: true,
        rationale: "The sample was randomly drawn from that school, so it generalises to that school and no further.",
      },
      {
        label: "B",
        text: "Conclusions can be drawn about secondary pupils nationally.",
        distractorType: "too_broad",
        rationale: "The sampling frame was a single school, which may differ from schools generally in many ways.",
      },
      {
        label: "C",
        text: "No conclusions can be drawn, because 300 is too small a sample.",
        distractorType: "too_narrow",
        rationale: "300 is a perfectly workable sample. The limit here is the population it was drawn from, not its size.",
      },
      {
        label: "D",
        text: "Screen time causes the outcomes measured in the survey.",
        distractorType: "wrong_relationship",
        rationale: "A survey observes rather than assigns, so it cannot establish causation whatever its size.",
      },
    ],
    explanation:
      "Random sampling licenses generalisation to the population that was sampled, and here that population is the pupils of one school. It does not extend to pupils nationally, because the school itself was not randomly chosen. C mistakes the issue for sample size, which is a common reflex: 300 is ample, and the constraint is the sampling frame. D asks for causation from an observational survey, which no sample size can supply.",
    patternName: "Generalise only to the sampled population",
    concept: "Sampling frame sets the limit of a conclusion",
    recognitionCues: [
      "A random sample drawn from one institution or area",
      "Options offering a wider population",
      "An option blaming sample size",
    ],
    fastestMethod:
      "Name the population the sample was actually drawn from. The conclusion reaches exactly that far, no further.",
    commonTraps: [
      "Extending the conclusion to a wider population",
      "Treating a workable sample size as too small",
      "Reading causation into a survey",
    ],
    expectedSeconds: 70,
  },

  // --- Area and volume ------------------------------------------------------
  {
    id: "geo-vol-005",
    skillId: "area-and-volume",
    format: "spr",
    stem: "A cube has a volume of 64 cubic centimetres. What is its total surface area, in square centimetres?",
    difficulty: 3,
    acceptedAnswers: ["96"],
    explanation:
      "Volume of a cube is the side cubed, so the side is the cube root of 64, which is 4 cm. A cube has six square faces, each 4 times 4 = 16, so the surface area is 6 times 16 = 96 square centimetres. The step people skip is finding the side: you cannot move between volume and surface area without it.",
    patternName: "Volume to side to surface area",
    concept: "Relating a cube's measures through its side length",
    recognitionCues: [
      "A cube with one measure given and another requested",
      "A volume that is a perfect cube",
      "Units changing from cubic to square",
    ],
    fastestMethod:
      "Find the side first, always. Then apply whichever formula is wanted.",
    commonTraps: [
      "Trying to convert volume to surface area directly",
      "Using four faces rather than six",
      "Taking the square root instead of the cube root",
    ],
    expectedSeconds: 55,
  },
  {
    id: "geo-vol-006",
    skillId: "area-and-volume",
    format: "mcq",
    stem: "A right circular cylinder has a radius of 5 and a height of 12. What is its volume?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "60pi",
        distractorType: "wrong_operation",
        rationale: "This uses r rather than r squared. Volume squares the radius.",
      },
      { label: "B", text: "300pi", isCorrect: true, rationale: "pi times 5 squared times 12 = pi times 25 times 12 = 300pi." },
      {
        label: "C",
        text: "100pi",
        distractorType: "wrong_operation",
        rationale: "This is the area of a circle of radius 10, or r squared times 4, neither of which is the volume.",
      },
      {
        label: "D",
        text: "900pi",
        distractorType: "wrong_operation",
        rationale: "This squares the height instead of the radius.",
      },
    ],
    explanation:
      "Volume of a cylinder is pi times r squared times h. With r = 5 and h = 12 that is pi times 25 times 12 = 300pi. The formula is on the reference sheet provided with the test, so marks here are lost to arithmetic rather than recall: square the radius before multiplying by the height.",
    patternName: "Apply a given solid formula",
    concept: "Volume of a cylinder",
    recognitionCues: [
      "A named solid with radius and height",
      "Options all carrying pi",
      "A formula that appears on the reference sheet",
    ],
    fastestMethod:
      "Square the radius, multiply by the height, keep pi symbolic to the end.",
    commonTraps: [
      "Squaring the height instead of the radius",
      "Forgetting to square at all",
      "Multiplying the radius and height before squaring",
    ],
    expectedSeconds: 45,
  },
  {
    id: "geo-vol-007",
    skillId: "area-and-volume",
    format: "spr",
    stem: "The dimensions of a rectangular box are each multiplied by 3. The volume of the new box is how many times the volume of the original?",
    difficulty: 4,
    acceptedAnswers: ["27"],
    explanation:
      "Volume depends on three dimensions, so scaling every one of them by 3 multiplies the volume by 3 cubed, which is 27. The general rule is worth holding: scaling all linear dimensions by k multiplies lengths by k, areas by k squared and volumes by k cubed. Checking with a 1 by 1 by 1 cube makes it concrete, since it becomes 3 by 3 by 3 = 27.",
    patternName: "Cubic scaling of volume",
    concept: "How scaling affects length, area and volume",
    recognitionCues: [
      "All dimensions multiplied by the same factor",
      "A ratio requested rather than an absolute volume",
      "No numerical dimensions given",
    ],
    fastestMethod:
      "Cube the scale factor for a volume, square it for an area. Verify with a unit cube if unsure.",
    commonTraps: [
      "Multiplying the volume by 3 rather than 27",
      "Squaring instead of cubing",
      "Applying the factor to only one dimension",
    ],
    expectedSeconds: 55,
  },

  // --- Lines, angles and triangles ------------------------------------------
  {
    id: "geo-lines-004",
    skillId: "lines-angles-triangles",
    format: "spr",
    stem: "The three interior angles of a triangle are in the ratio 3 to 4 to 5. What is the measure, in degrees, of the smallest angle?",
    difficulty: 2,
    acceptedAnswers: ["45"],
    explanation:
      "Let the angles be 3x, 4x and 5x. They sum to 180, so 12x = 180 and x = 15. The smallest is 3x = 45 degrees, and the others are 60 and 75, which do sum to 180. Reading the question matters here: the largest would be 75.",
    patternName: "Ratio of angles summing to a total",
    concept: "Angle sum of a triangle",
    recognitionCues: [
      "Angles given as a ratio rather than values",
      "A triangle, so the parts sum to 180",
      "Smallest or largest requested",
    ],
    fastestMethod:
      "Add the ratio parts, divide 180 by that sum, then multiply by the part asked for.",
    commonTraps: [
      "Giving the largest angle when the smallest was asked for",
      "Dividing 180 by 3 rather than by 12",
      "Reporting x rather than 3x",
    ],
    expectedSeconds: 45,
  },
  {
    id: "geo-lines-005",
    skillId: "lines-angles-triangles",
    format: "spr",
    stem: "An isosceles triangle has an apex angle of 40 degrees. What is the measure, in degrees, of each base angle?",
    difficulty: 2,
    acceptedAnswers: ["70"],
    explanation:
      "The two base angles of an isosceles triangle are equal. They share what remains after the apex: 180 minus 40 = 140, so each is 70 degrees. The check is that 40 + 70 + 70 = 180.",
    patternName: "Equal base angles",
    concept: "Isosceles triangles and the angle sum",
    recognitionCues: [
      "The word isosceles",
      "One angle given, two requested",
      "An apex or vertex angle named",
    ],
    fastestMethod:
      "Subtract the known angle from 180 and halve. Two steps.",
    commonTraps: [
      "Halving 40 rather than the remainder",
      "Forgetting that the base angles are the equal pair",
      "Giving the total of 140 rather than each angle",
    ],
    expectedSeconds: 40,
  },
  {
    id: "geo-lines-006",
    skillId: "lines-angles-triangles",
    format: "mcq",
    stem: "In a triangle, the exterior angle at one vertex measures 110 degrees. One of the two non-adjacent interior angles measures 45 degrees. What is the measure of the other non-adjacent interior angle?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "25 degrees",
        distractorType: "wrong_operation",
        rationale: "This comes from subtracting 45 from 70, the interior angle adjacent to the exterior one.",
      },
      { label: "B", text: "65 degrees", isCorrect: true, rationale: "The exterior angle equals the sum of the two non-adjacent interior angles, so the other is 110 minus 45." },
      {
        label: "C",
        text: "70 degrees",
        distractorType: "wrong_relationship",
        rationale: "That is the interior angle adjacent to the exterior one, which is 180 minus 110.",
      },
      {
        label: "D",
        text: "135 degrees",
        distractorType: "wrong_operation",
        rationale: "This adds 45 to 90 and would make the angle sum exceed 180.",
      },
    ],
    explanation:
      "The exterior angle theorem says an exterior angle equals the sum of the two interior angles not adjacent to it. So 110 = 45 plus the unknown, giving 65 degrees. Checking the whole triangle: the adjacent interior angle is 180 minus 110 = 70, and 70 + 45 + 65 = 180.",
    patternName: "Exterior angle theorem",
    concept: "Exterior angle as the sum of remote interior angles",
    recognitionCues: [
      "An exterior angle given rather than an interior one",
      "The phrase non-adjacent interior angles",
      "Options including the supplement of the exterior angle",
    ],
    fastestMethod:
      "Subtract the known remote interior angle from the exterior angle directly. Do not convert to the adjacent interior angle first.",
    commonTraps: [
      "Using the supplement of the exterior angle as the target",
      "Including the adjacent angle in the sum",
      "Adding when subtracting was needed",
    ],
    expectedSeconds: 60,
  },
  {
    id: "geo-lines-007",
    skillId: "lines-angles-triangles",
    format: "spr",
    stem: "Two similar triangles have corresponding sides in the ratio 2 to 5. The area of the smaller triangle is 12. What is the area of the larger triangle?",
    difficulty: 4,
    acceptedAnswers: ["75"],
    explanation:
      "Areas of similar figures scale with the square of the side ratio, so the areas are in the ratio 2 squared to 5 squared, which is 4 to 25. If the smaller area is 12, then 12/4 = 3 is one part and the larger area is 25 times 3 = 75. The frequent error is scaling the area by 5/2 instead of 25/4, which would give 30.",
    patternName: "Area scales with the square of the ratio",
    concept: "Similar figures and area",
    recognitionCues: [
      "Similar figures with a side ratio",
      "An area given for one and requested for the other",
      "A ratio that is not 1 to 1",
    ],
    fastestMethod:
      "Square the side ratio to get the area ratio, then scale. Lengths use k, areas k squared, volumes k cubed.",
    commonTraps: [
      "Scaling the area by the side ratio",
      "Inverting the ratio and shrinking instead of growing",
      "Squaring only one side of the ratio",
    ],
    expectedSeconds: 70,
  },

  // --- Right triangles and trigonometry -------------------------------------
  {
    id: "geo-trig-004",
    skillId: "right-triangles-and-trigonometry",
    format: "spr",
    stem: "A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?",
    difficulty: 2,
    acceptedAnswers: ["13"],
    explanation:
      "By Pythagoras the hypotenuse squared is 25 + 144 = 169, so the hypotenuse is 13. This is the 5-12-13 triple, and recognising it avoids the arithmetic entirely. The triples worth knowing are 3-4-5, 5-12-13, 8-15-17 and 7-24-25, along with their multiples.",
    patternName: "Pythagorean triple",
    concept: "Pythagoras in a right triangle",
    recognitionCues: [
      "Both legs given in a right triangle",
      "Numbers from a familiar triple",
      "The hypotenuse requested",
    ],
    fastestMethod: "Check for a known triple before computing anything.",
    commonTraps: [
      "Adding the legs rather than squaring them",
      "Forgetting the final square root",
      "Treating a leg as the hypotenuse",
    ],
    expectedSeconds: 30,
  },
  {
    id: "geo-trig-005",
    skillId: "right-triangles-and-trigonometry",
    format: "spr",
    stem: "A right triangle has a hypotenuse of 20 and one leg of 16. What is the length of the other leg?",
    difficulty: 3,
    acceptedAnswers: ["12"],
    explanation:
      "Here Pythagoras is used in reverse: the missing leg squared is 20 squared minus 16 squared, which is 400 minus 256 = 144, so the leg is 12. Subtracting rather than adding is the whole difficulty, and it follows from the hypotenuse being the largest side. This is the 3-4-5 triple scaled by 4.",
    patternName: "Pythagoras for a missing leg",
    concept: "Subtracting when the hypotenuse is known",
    recognitionCues: [
      "The hypotenuse given together with one leg",
      "The other leg requested",
      "Numbers that are multiples of a familiar triple",
    ],
    fastestMethod:
      "Identify the hypotenuse first, then subtract the known leg's square from it. Check the answer is smaller than the hypotenuse.",
    commonTraps: [
      "Adding the squares and getting a leg longer than the hypotenuse",
      "Subtracting in the wrong order",
      "Missing the 3-4-5 scaling",
    ],
    expectedSeconds: 45,
  },
  {
    id: "geo-trig-006",
    skillId: "right-triangles-and-trigonometry",
    format: "mcq",
    stem: "In a right triangle, both acute angles measure 45 degrees and each leg has length 7. What is the length of the hypotenuse?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "7",
        distractorType: "wrong_relationship",
        rationale: "The hypotenuse is always the longest side, so it cannot equal a leg.",
      },
      {
        label: "B",
        text: "14",
        distractorType: "wrong_operation",
        rationale: "Doubling applies to the shorter leg in a 30-60-90 triangle, not here.",
      },
      { label: "C", text: "7 times the square root of 2", isCorrect: true, rationale: "In a 45-45-90 triangle the sides are in the ratio 1 : 1 : root 2, so the hypotenuse is the leg times root 2." },
      {
        label: "D",
        text: "7 times the square root of 3",
        distractorType: "wrong_relationship",
        rationale: "Root 3 belongs to the 30-60-90 triangle, not the 45-45-90.",
      },
    ],
    explanation:
      "A 45-45-90 triangle has sides in the ratio 1 : 1 : root 2, so the hypotenuse is a leg times root 2, giving 7 root 2, which is about 9.9. Pythagoras confirms it: 49 + 49 = 98, and the square root of 98 is 7 root 2. Keeping the two special triangles apart matters: root 2 goes with 45-45-90 and root 3 with 30-60-90.",
    patternName: "45-45-90 side ratios",
    concept: "Special right triangles",
    recognitionCues: [
      "Two 45 degree angles, or equal legs in a right triangle",
      "Options containing root 2 and root 3",
      "No calculator work needed",
    ],
    fastestMethod:
      "Multiply the leg by root 2. If unsure which surd belongs, Pythagoras settles it in one line.",
    commonTraps: [
      "Using root 3 from the other special triangle",
      "Doubling the leg",
      "Choosing an option no longer than the leg",
    ],
    expectedSeconds: 50,
  },
  {
    id: "geo-trig-007",
    skillId: "right-triangles-and-trigonometry",
    format: "spr",
    stem: "In a right triangle, the side opposite angle A has length 9 and the side adjacent to angle A has length 12. What is the value of tan A? Give your answer as a decimal.",
    difficulty: 3,
    acceptedAnswers: ["0.75", ".75", "3/4", "9/12"],
    explanation:
      "Tangent is opposite over adjacent, so tan A = 9/12 = 0.75. No Pythagoras is needed, because tangent is the one ratio that does not involve the hypotenuse. Had the question asked for sine or cosine, the hypotenuse of 15 would have been required first.",
    patternName: "Tangent needs no hypotenuse",
    concept: "Trigonometric ratios in a right triangle",
    recognitionCues: [
      "Opposite and adjacent sides given, with no hypotenuse",
      "Tangent specifically requested",
      "Numbers from the 3-4-5 family",
    ],
    fastestMethod:
      "Opposite over adjacent, then simplify. Only reach for Pythagoras if sine or cosine is wanted.",
    commonTraps: [
      "Inverting to adjacent over opposite",
      "Computing the hypotenuse unnecessarily and using it",
      "Confusing tangent with sine",
    ],
    expectedSeconds: 45,
  },

  // --- Circles ---------------------------------------------------------------
  {
    id: "geo-circ-005",
    skillId: "circles",
    format: "mcq",
    stem: "A circle has a diameter of 14. What is its circumference?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: "7pi",
        distractorType: "partial_solution",
        rationale: "This uses the radius in place of the diameter. Circumference is pi times the diameter.",
      },
      { label: "B", text: "14pi", isCorrect: true, rationale: "Circumference is pi times the diameter, which is 14pi." },
      {
        label: "C",
        text: "28pi",
        distractorType: "wrong_operation",
        rationale: "This treats 14 as the radius and doubles it, which double counts.",
      },
      {
        label: "D",
        text: "49pi",
        distractorType: "wrong_relationship",
        rationale: "That is the area of a circle of radius 7, not a circumference.",
      },
    ],
    explanation:
      "Circumference is 2 pi r, and since the diameter is twice the radius this is the same as pi times the diameter. With a diameter of 14 the circumference is 14pi. The trap is the habit of doubling: the doubling is already done when you are given a diameter rather than a radius.",
    patternName: "Circumference from a diameter",
    concept: "Relationship between radius, diameter and circumference",
    recognitionCues: [
      "A diameter given rather than a radius",
      "Options that are the value, its half and its double",
      "An option that is actually an area",
    ],
    fastestMethod:
      "Note whether you were given r or d. Circumference is pi d, or equivalently 2 pi r.",
    commonTraps: [
      "Doubling a diameter that is already doubled",
      "Halving when no halving is needed",
      "Confusing area with circumference",
    ],
    expectedSeconds: 35,
  },
  {
    id: "geo-circ-006",
    skillId: "circles",
    format: "mcq",
    stem: "A circle in the xy-plane is given by the equation x^2 + y^2 - 6x + 8y = 0. What are the coordinates of its centre?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "(-3, 4)",
        distractorType: "sign_error",
        rationale: "Both signs are flipped. Completing the square on x^2 - 6x gives (x - 3)^2, so the centre's x coordinate is +3.",
      },
      { label: "B", text: "(3, -4)", isCorrect: true, rationale: "Completing the square gives (x - 3)^2 + (y + 4)^2 = 25, so the centre is (3, -4)." },
      {
        label: "C",
        text: "(6, -8)",
        distractorType: "partial_solution",
        rationale: "These are the coefficients themselves. Each must be halved when completing the square.",
      },
      {
        label: "D",
        text: "(-6, 8)",
        distractorType: "sign_error",
        rationale: "The coefficients unhalved and with the signs flipped.",
      },
    ],
    explanation:
      "Complete the square in each variable. For x: x^2 - 6x becomes (x - 3)^2 minus 9. For y: y^2 + 8y becomes (y + 4)^2 minus 16. The equation becomes (x - 3)^2 + (y + 4)^2 - 25 = 0, so (x - 3)^2 + (y + 4)^2 = 25. The centre is (3, -4) and the radius is 5. The two steps people miss are halving each coefficient and flipping its sign.",
    patternName: "Complete the square for a circle",
    concept: "Converting general form to standard form",
    recognitionCues: [
      "x squared and y squared with linear terms and no brackets",
      "Equal coefficients on the squared terms",
      "Options offering the coefficients both halved and unhalved",
    ],
    fastestMethod:
      "Halve each linear coefficient and flip its sign to read the centre straight off. Only complete the square fully if the radius is also wanted.",
    commonTraps: [
      "Using the coefficients without halving",
      "Keeping the sign as it appears in the equation",
      "Forgetting to subtract the squared terms when balancing",
    ],
    expectedSeconds: 80,
  },
  {
    id: "geo-circ-007",
    skillId: "circles",
    format: "spr",
    stem: "A sector of a circle of radius 6 has an area of 6pi. What is the measure of its central angle, in degrees?",
    difficulty: 4,
    acceptedAnswers: ["60"],
    explanation:
      "The whole circle has area pi times 6 squared = 36pi. The sector is 6pi, which is 6pi/36pi = 1/6 of the circle. A sixth of 360 degrees is 60 degrees. Working with the fraction of the whole is quicker and safer than rearranging the sector formula.",
    patternName: "Sector as a fraction of the circle",
    concept: "Relating sector area to central angle",
    recognitionCues: [
      "A sector area given with a radius",
      "An angle requested rather than an area",
      "Areas that divide cleanly",
    ],
    fastestMethod:
      "Divide the sector area by the whole circle's area to get the fraction, then multiply by 360.",
    commonTraps: [
      "Using the circumference rather than the area",
      "Multiplying by 180 instead of 360",
      "Forgetting to square the radius for the whole area",
    ],
    expectedSeconds: 70,
  },
];
