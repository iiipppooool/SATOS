import type { SeedQuestion } from "../types";

export const DATA_ANALYSIS_QUESTIONS: SeedQuestion[] = [
  // --- Ratios, rates, proportional relationships, units ------------------
  {
    id: "psda-ratio-001",
    skillId: "ratios-rates-proportions-units",
    format: "spr",
    stem: "A train travels 180 kilometres in 2.5 hours. Travelling at the same average speed, how many kilometres does it travel in 4 hours?",
    difficulty: 2,
    acceptedAnswers: ["288"],
    explanation:
      "The average speed is 180/2.5 = 72 kilometres per hour, so in 4 hours it covers 72 times 4 = 288 kilometres. A proportion works just as well: 180/2.5 = d/4, so d = 180 times 4 / 2.5 = 288.",
    patternName: "Constant rate scaling",
    concept: "Proportional reasoning with a constant rate",
    recognitionCues: [
      "A quantity per unit time, with a different time asked about",
      "The phrase at the same rate or same average speed",
      "Two numbers given and one unknown",
    ],
    fastestMethod:
      "Find the unit rate first, then multiply. It is one extra division but makes the arithmetic much easier to check.",
    alternativeMethod: "Set up a proportion and cross-multiply.",
    commonTraps: [
      "Multiplying by 2.5 instead of dividing",
      "Setting the proportion up with mismatched units",
      "Rounding the unit rate early and losing accuracy",
    ],
    expectedSeconds: 45,
  },
  {
    id: "psda-ratio-002",
    skillId: "ratios-rates-proportions-units",
    format: "spr",
    stem: "A cyclist travels at 15 metres per second. What is this speed in kilometres per hour?",
    difficulty: 3,
    acceptedAnswers: ["54"],
    explanation:
      "There are 3600 seconds in an hour and 1000 metres in a kilometre, so multiply by 3600 and divide by 1000, which is the same as multiplying by 3.6. That gives 15 times 3.6 = 54 kilometres per hour. Sense check: 54 km/h is a realistic cycling sprint, whereas 5400 or 0.54 clearly are not.",
    patternName: "Compound unit conversion",
    concept: "Converting a rate between unit systems",
    recognitionCues: [
      "A rate with two units, both of which change",
      "Metres and seconds converting to kilometres and hours, or the reverse",
      "No other data in the question",
    ],
    fastestMethod:
      "Remember that metres per second times 3.6 gives kilometres per hour. Otherwise chain the conversion factors and cancel units as you go.",
    commonTraps: [
      "Dividing when you should multiply, giving about 4.17",
      "Converting only one of the two units",
      "Losing a factor of 10 or 100 in the arithmetic",
    ],
    expectedSeconds: 55,
  },

  // --- Percentages -------------------------------------------------------
  {
    id: "psda-pct-001",
    skillId: "percentages",
    format: "mcq",
    stem: "The price of a jacket is increased by 20 per cent. Some weeks later, the new price is reduced by 20 per cent. Compared with the original price, the final price is",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "the same.",
        distractorType: "wrong_relationship",
        rationale: "The two 20 per cents are taken of different amounts, so they do not cancel. The reduction is applied to the larger, increased price.",
      },
      { label: "B", text: "4 per cent lower.", isCorrect: true, rationale: "1.20 times 0.80 = 0.96, which is 4 per cent below the original." },
      {
        label: "C",
        text: "4 per cent higher.",
        distractorType: "sign_error",
        rationale: "The direction is wrong. Multiplying by 0.96 makes the price lower, not higher.",
      },
      {
        label: "D",
        text: "40 per cent lower.",
        distractorType: "wrong_operation",
        rationale: "This adds the percentages. Successive percentage changes multiply.",
      },
    ],
    explanation:
      "Successive percentage changes multiply rather than add. An increase of 20 per cent means multiplying by 1.20, and a decrease of 20 per cent means multiplying by 0.80. Together that is 1.20 times 0.80 = 0.96, so the final price is 96 per cent of the original, a 4 per cent fall. Try it with 100 pounds: it rises to 120, then falls by 24 to 96.",
    patternName: "Successive percentage change",
    concept: "Multiplying percentage multipliers",
    recognitionCues: [
      "Two percentage changes applied one after the other",
      "The same percentage up and then down, which is always a net loss",
      "Options that include the same and the sum of the percentages",
    ],
    fastestMethod:
      "Multiply the multipliers. If the arithmetic feels risky, start from 100 and follow the money.",
    commonTraps: [
      "Assuming equal up-and-down percentages cancel",
      "Adding percentage changes",
      "Applying the second change to the original rather than the new amount",
    ],
    expectedSeconds: 55,
  },
  {
    id: "psda-pct-002",
    skillId: "percentages",
    format: "spr",
    stem: "After a discount of 15 per cent, a pair of headphones costs 68 pounds. What was the price in pounds before the discount?",
    difficulty: 4,
    acceptedAnswers: ["80"],
    explanation:
      "After a 15 per cent discount the customer pays 85 per cent of the original price, so 0.85 times the original equals 68. The original is 68/0.85 = 80 pounds. Check: 15 per cent of 80 is 12, and 80 - 12 = 68. The trap is to add 15 per cent to 68, which gives 78.20 and is wrong because the percentage refers to the larger original price.",
    patternName: "Reverse percentage",
    concept: "Recovering an original amount after a percentage change",
    recognitionCues: [
      "The final amount is given and the original is wanted",
      "Words such as after a discount or following an increase",
      "A single percentage applied once",
    ],
    fastestMethod:
      "Divide by the multiplier. A 15 per cent discount means dividing by 0.85, never multiplying by 1.15.",
    commonTraps: [
      "Adding the percentage back to the reduced price",
      "Using 1.15 instead of 0.85",
      "Taking the percentage of the wrong base",
    ],
    expectedSeconds: 60,
  },

  // --- One-variable data -------------------------------------------------
  {
    id: "psda-1var-001",
    skillId: "one-variable-data",
    format: "mcq",
    stimulusTitle: "Data set",
    stimulus: "4, 5, 6, 6, 7, 8",
    stem: "A seventh value, 40, is added to the data set shown. Which statistic changes the least?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "The mean",
        distractorType: "wrong_relationship",
        rationale: "The mean is pulled strongly by an extreme value: it rises from 6 to about 10.9.",
      },
      { label: "B", text: "The median", isCorrect: true, rationale: "The median moves only from 6 to 6, since the new value simply extends the top of the ordered list." },
      {
        label: "C",
        text: "The range",
        distractorType: "wrong_relationship",
        rationale: "The range jumps from 4 to 36, which is the largest change of the four.",
      },
      {
        label: "D",
        text: "The standard deviation",
        distractorType: "wrong_relationship",
        rationale: "Standard deviation measures spread about the mean, and an extreme value increases it sharply.",
      },
    ],
    explanation:
      "The original ordered set is 4, 5, 6, 6, 7, 8 with mean 6 and median 6. Adding 40 gives 4, 5, 6, 6, 7, 8, 40. The new median is the fourth of seven values, which is 6, so it does not move at all. The mean rises to 76/7, about 10.9, the range goes from 4 to 36, and the standard deviation grows substantially. The median is resistant to outliers, which is the general principle being tested.",
    patternName: "Outlier resistance",
    concept: "How measures of centre and spread respond to an outlier",
    recognitionCues: [
      "A small data set with one extreme value added or removed",
      "A question about which statistic changes most or least",
      "Options listing mean, median, range and standard deviation",
    ],
    fastestMethod:
      "Apply the principle rather than computing: the median is resistant to outliers, while mean, range and standard deviation are all sensitive to them.",
    commonTraps: [
      "Computing all four statistics when the principle answers it immediately",
      "Confusing resistant with unchanged in every case",
      "Forgetting to re-order the data before finding the median",
    ],
    expectedSeconds: 60,
  },
  {
    id: "psda-1var-002",
    skillId: "one-variable-data",
    format: "mcq",
    stimulusTitle: "Two data sets",
    stimulus: "Set P: 10, 10, 10, 10, 10\nSet Q: 2, 6, 10, 14, 18",
    stem: "Which statement about the two data sets is true?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "The means differ and the standard deviations are equal.",
        distractorType: "swapped_values",
        rationale: "This is exactly the wrong way round: the means are equal and the standard deviations differ.",
      },
      { label: "B", text: "The means are equal and Set Q has the greater standard deviation.", isCorrect: true, rationale: "Both means are 10, but Set P has no spread at all while Set Q is widely spread." },
      {
        label: "C",
        text: "Set P has the greater standard deviation.",
        distractorType: "wrong_relationship",
        rationale: "Every value in Set P is identical, so its standard deviation is zero, the smallest possible.",
      },
      {
        label: "D",
        text: "Both the means and the standard deviations are equal.",
        distractorType: "wrong_relationship",
        rationale: "The means match, but a set with identical values cannot have the same spread as one ranging from 2 to 18.",
      },
    ],
    explanation:
      "Set P has every value equal to 10, so its mean is 10 and its standard deviation is 0. Set Q is symmetric about 10, so its mean is also 10, but its values range from 2 to 18, giving a clearly positive standard deviation. The means are equal and Set Q has the larger standard deviation. No calculation is needed: standard deviation measures spread about the mean, and identical values have none.",
    patternName: "Compare spread at equal centre",
    concept: "Standard deviation as a measure of spread",
    recognitionCues: [
      "Two small data sets presented side by side",
      "One set with identical or near-identical values",
      "Options comparing means and standard deviations",
    ],
    fastestMethod:
      "Check the centres by symmetry, then judge spread by eye. The SAT never requires you to compute a standard deviation by hand.",
    commonTraps: [
      "Trying to calculate standard deviation rather than reasoning about spread",
      "Assuming a larger mean implies a larger standard deviation",
      "Mixing up which set is which",
    ],
    expectedSeconds: 55,
  },

  // --- Two-variable data -------------------------------------------------
  {
    id: "psda-2var-001",
    skillId: "two-variable-data",
    format: "mcq",
    stem: "A scatterplot relating study hours, h, to test score, s, is modelled by the line of best fit s = 42 + 5.5h. Which is the best interpretation of 5.5 in this model?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "A student who does not study is predicted to score 5.5.",
        distractorType: "swapped_values",
        rationale: "That describes the intercept, which is 42 in this model.",
      },
      { label: "B", text: "Each additional hour of study is associated with a predicted increase of 5.5 points.", isCorrect: true, rationale: "The slope is the predicted change in the response for a one-unit change in the predictor." },
      {
        label: "C",
        text: "Each additional hour of study causes a 5.5 point rise in score.",
        distractorType: "wrong_relationship",
        rationale: "The wording claims causation. Observational data of this kind supports association only, so the careful option is preferred.",
      },
      {
        label: "D",
        text: "Students study 5.5 hours on average.",
        distractorType: "unit_error",
        rationale: "5.5 is measured in points per hour, not in hours. Checking units rules this out immediately.",
      },
    ],
    explanation:
      "In a line of best fit, the slope gives the predicted change in the response variable for each one-unit increase in the predictor, so 5.5 means about 5.5 extra points per extra hour of study. Note the wording of the correct option: associated with rather than causes. A line of best fit through observational data cannot establish causation, and the SAT consistently rewards the more cautious phrasing.",
    patternName: "Interpret the slope of a best-fit line",
    concept: "Slope as a rate of predicted change, and association versus causation",
    recognitionCues: [
      "A line of best fit given as an equation",
      "A question asking for the meaning of a coefficient",
      "One option phrased as association and another as causation",
    ],
    fastestMethod:
      "Attach units to the coefficient, then prefer the option worded as association over one claiming cause, unless the study was a randomised experiment.",
    commonTraps: [
      "Choosing the causal wording",
      "Swapping slope and intercept",
      "Ignoring the units of the coefficient",
    ],
    relatedConcepts: ["evaluating-statistical-claims", "linear-functions"],
    expectedSeconds: 60,
  },
  {
    id: "psda-2var-002",
    skillId: "two-variable-data",
    format: "spr",
    stem: "The line of best fit for a set of data is y = 12.4 + 3.2x. What value does the model predict for y when x = 15?",
    difficulty: 3,
    acceptedAnswers: ["60.4"],
    explanation:
      "Substitute x = 15: y = 12.4 + 3.2(15) = 12.4 + 48 = 60.4. The only real risks here are mis-keying the multiplication and adding the intercept to the wrong term, so write the intermediate value down.",
    patternName: "Predict from a best-fit line",
    concept: "Using a linear model to predict a value",
    recognitionCues: [
      "A best-fit equation and a specific predictor value",
      "The word predict or estimate",
      "A straightforward substitution",
    ],
    fastestMethod: "Substitute and evaluate, writing down the product before adding the intercept.",
    commonTraps: [
      "Multiplying the intercept by x as well",
      "Rounding part way and losing the decimal",
      "Reading the coefficients the wrong way round",
    ],
    expectedSeconds: 40,
  },

  // --- Probability -------------------------------------------------------
  {
    id: "psda-prob-001",
    skillId: "probability",
    format: "mcq",
    stimulusTitle: "Students by year group and language studied",
    stimulus:
      "                French   Spanish   Total\nYear 12            24        36        60\nYear 13            30        10        40\nTotal              54        46       100",
    stem: "One of the 100 students is selected at random. Given that the student is in Year 13, what is the probability that the student studies French?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "30/100",
        distractorType: "wrong_relationship",
        rationale: "This is the probability of being both in Year 13 and studying French, not the conditional probability. The condition restricts the denominator.",
      },
      {
        label: "B",
        text: "30/54",
        distractorType: "swapped_values",
        rationale: "This conditions on studying French rather than on being in Year 13. The two conditional probabilities are different.",
      },
      { label: "C", text: "30/40", isCorrect: true, rationale: "Given Year 13, the sample space is the 40 Year 13 students, of whom 30 study French." },
      {
        label: "D",
        text: "54/100",
        distractorType: "true_but_irrelevant",
        rationale: "This is the overall proportion studying French, ignoring the condition entirely.",
      },
    ],
    explanation:
      "The word given tells you to restrict attention to one row or column. Here the condition is Year 13, so the denominator is the Year 13 total of 40, not 100. Of those 40, the number studying French is 30, so the probability is 30/40, which is 0.75. Always locate the conditioning group first, then read the numerator from inside it.",
    patternName: "Conditional probability from a two-way table",
    concept: "Conditioning restricts the sample space",
    recognitionCues: [
      "A two-way table with row and column totals",
      "The word given, or a phrase such as among those who",
      "Options with different denominators",
    ],
    fastestMethod:
      "Find the conditioning total and use it as the denominator, then read the overlapping cell as the numerator. Scanning the options by denominator alone often eliminates two immediately.",
    commonTraps: [
      "Using the grand total as the denominator",
      "Conditioning on the wrong variable",
      "Reading the wrong cell from the table",
    ],
    expectedSeconds: 65,
  },
  {
    id: "psda-prob-002",
    skillId: "probability",
    format: "spr",
    stimulusTitle: "Results of a quality check on 200 components",
    stimulus:
      "                Passed   Failed   Total\nFactory A          76        4        80\nFactory B         108       12       120\nTotal             184       16       200",
    stem: "A component is selected at random from those that failed. What is the probability that it came from Factory B? Give your answer as a fraction or a decimal.",
    difficulty: 4,
    acceptedAnswers: ["12/16", "3/4", "0.75", ".75"],
    explanation:
      "Restricting to failed components gives a sample space of 16. Of those, 12 came from Factory B, so the probability is 12/16 = 3/4 = 0.75. The tempting error is to use 120/200, the overall share from Factory B, or 12/120, the failure rate within Factory B. Both answer different questions.",
    patternName: "Reverse conditional from a table",
    concept: "Conditioning on the outcome rather than the group",
    recognitionCues: [
      "Selection made from within a subgroup defined by the outcome",
      "The phrase selected from those that",
      "A table where one margin is much smaller than the other",
    ],
    fastestMethod:
      "Write down the conditioning total before anything else, then find the single cell that belongs to both categories.",
    commonTraps: [
      "Conditioning on the factory instead of on failure",
      "Using the grand total",
      "Confusing this with the probability of failing given Factory B",
    ],
    expectedSeconds: 70,
  },

  // --- Inference and margin of error -------------------------------------
  {
    id: "psda-inf-001",
    skillId: "inference-and-margin-of-error",
    format: "mcq",
    stem: "A random sample of 400 adults in a city found that the mean weekly commuting time was 4.2 hours, with an associated margin of error of 0.3 hours at the 95 per cent confidence level. Which conclusion is most appropriate?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Every adult in the city commutes between 3.9 and 4.5 hours each week.",
        distractorType: "too_broad",
        rationale: "A confidence interval is about the population mean, not about every individual. Individual times vary far more widely.",
      },
      { label: "B", text: "It is plausible that the mean weekly commuting time for all adults in the city is between 3.9 and 4.5 hours.", isCorrect: true, rationale: "The interval estimates the population mean, and 4.2 plus or minus 0.3 gives 3.9 to 4.5." },
      {
        label: "C",
        text: "The mean weekly commuting time for all adults in the city is exactly 4.2 hours.",
        distractorType: "too_narrow",
        rationale: "The sample mean is an estimate. Asserting an exact population value ignores the margin of error entirely.",
      },
      {
        label: "D",
        text: "95 per cent of adults in the city commute between 3.9 and 4.5 hours each week.",
        distractorType: "wrong_relationship",
        rationale: "The 95 per cent refers to the long-run reliability of the method, not to the proportion of individuals inside the interval.",
      },
    ],
    explanation:
      "A margin of error produces an interval estimate for a population parameter, here the mean commuting time of all adults in the city: 4.2 plus or minus 0.3 gives 3.9 to 4.5 hours. Two distinctions matter. First, the interval is about the population mean, not about individuals. Second, the 95 per cent describes the procedure's reliability, not a percentage of people. The cautious wording in option B, it is plausible that the mean, is what the statistics support.",
    patternName: "Interpret a confidence interval",
    concept: "What a margin of error does and does not claim",
    recognitionCues: [
      "A sample statistic quoted with a margin of error",
      "Options that differ in whether they describe individuals or the population mean",
      "A stated confidence level",
    ],
    fastestMethod:
      "Check two things in each option: does it talk about the population mean rather than individuals, and does it allow uncertainty rather than asserting an exact value?",
    commonTraps: [
      "Applying the interval to individuals",
      "Reading 95 per cent as a proportion of the population",
      "Treating the sample mean as the exact population mean",
    ],
    expectedSeconds: 70,
  },
  {
    id: "psda-inf-002",
    skillId: "inference-and-margin-of-error",
    format: "mcq",
    stem: "A polling organisation wants to reduce the margin of error in its estimate while keeping the confidence level at 95 per cent. Which change would achieve this?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Increasing the size of the random sample",
        isCorrect: true,
        rationale: "Margin of error shrinks as the sample size grows, roughly in proportion to one over the square root of the sample size.",
      },
      {
        label: "B",
        text: "Decreasing the size of the random sample",
        distractorType: "wrong_relationship",
        rationale: "A smaller sample carries more sampling variability, so the margin of error widens.",
      },
      {
        label: "C",
        text: "Raising the confidence level to 99 per cent",
        distractorType: "wrong_relationship",
        rationale: "Greater confidence requires a wider interval. It also changes the confidence level, which the question fixes at 95 per cent.",
      },
      {
        label: "D",
        text: "Surveying only people who respond to an online advertisement",
        distractorType: "true_but_irrelevant",
        rationale: "This introduces selection bias. Bias is a different problem from margin of error and is not fixed by it.",
      },
    ],
    explanation:
      "The margin of error depends on the sample size and the confidence level. Holding the confidence level fixed, the only way to narrow the interval is to collect more data: the margin of error falls roughly as one over the square root of the sample size, so quadrupling the sample halves the margin. Raising the confidence level widens the interval, and switching to a self-selected sample introduces bias, which no sample size can repair.",
    patternName: "What moves the margin of error",
    concept: "Relationship between sample size, confidence level and precision",
    recognitionCues: [
      "A question about reducing or increasing a margin of error",
      "Options mentioning sample size and confidence level",
      "A distractor describing a non-random sample",
    ],
    fastestMethod:
      "Remember the two levers: bigger sample narrows, higher confidence widens. Anything about how respondents were chosen is a bias issue, not a precision one.",
    commonTraps: [
      "Thinking higher confidence means greater precision",
      "Confusing bias with margin of error",
      "Assuming a larger population rather than a larger sample is what matters",
    ],
    expectedSeconds: 60,
  },

  // --- Evaluating statistical claims -------------------------------------
  {
    id: "psda-claims-001",
    skillId: "evaluating-statistical-claims",
    format: "mcq",
    stem: "Researchers recorded the sleep and the exam results of 2,000 volunteers and found that those who slept more scored higher. Which conclusion is best supported?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Sleeping more causes exam scores to rise.",
        distractorType: "too_broad",
        rationale: "This is an observational study with volunteers, so a causal claim is not supported. Some other factor could drive both.",
      },
      { label: "B", text: "Among these volunteers, more sleep was associated with higher exam scores.", isCorrect: true, rationale: "It claims association and limits itself to the group actually studied, which is exactly what the design supports." },
      {
        label: "C",
        text: "Students who sleep fewer than six hours will fail their exams.",
        distractorType: "too_broad",
        rationale: "Nothing in the data supports a prediction about individuals, let alone a threshold for failure.",
      },
      {
        label: "D",
        text: "The results apply to all students worldwide.",
        distractorType: "too_broad",
        rationale: "The participants were volunteers, not a random sample of any larger population, so the findings cannot be generalised that way.",
      },
    ],
    explanation:
      "Two limits apply. Because the researchers observed rather than randomly assigned sleep, the study can show association but not causation: a third factor such as conscientiousness could plausibly raise both sleep and scores. And because the participants volunteered, they are not a random sample of a wider population, so the result cannot be generalised beyond the group studied. Option B respects both limits.",
    patternName: "Observational study limits",
    concept: "Causation requires random assignment; generalisation requires random sampling",
    recognitionCues: [
      "Data that was recorded or observed rather than assigned",
      "Volunteers or a self-selected group",
      "Options that vary between association and causation",
    ],
    fastestMethod:
      "Ask two questions: was treatment randomly assigned, which licenses causal language, and was the sample random from the target population, which licenses generalisation. Here both answers are no, so pick the narrowest, most cautious option.",
    commonTraps: [
      "Choosing the causal option because the association is strong",
      "Generalising from a volunteer sample",
      "Rejecting the correct option for sounding too weak",
    ],
    relatedConcepts: ["two-variable-data"],
    expectedSeconds: 70,
  },
  {
    id: "psda-claims-002",
    skillId: "evaluating-statistical-claims",
    format: "mcq",
    stem: "A school wants to estimate how long its students spend on homework. Which sampling method is most likely to produce a reliable estimate for the whole school?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Surveying every student in the school library after lessons",
        distractorType: "wrong_relationship",
        rationale: "Students in the library are more likely to be the studious ones, which biases the estimate upwards.",
      },
      {
        label: "B",
        text: "Surveying 100 students selected at random from the full school register",
        isCorrect: true,
        rationale: "A random sample from the whole population is the only option here that gives every student an equal chance of selection.",
      },
      {
        label: "C",
        text: "Asking students to complete an optional online form",
        distractorType: "wrong_relationship",
        rationale: "Optional response means the sample self-selects, and those with strong feelings reply disproportionately.",
      },
      {
        label: "D",
        text: "Surveying the 100 students with the highest attendance",
        distractorType: "wrong_relationship",
        rationale: "This deliberately picks an unrepresentative subgroup, so the result cannot describe the school as a whole.",
      },
    ],
    explanation:
      "To generalise to a population, the sample must be randomly selected from that population. Only option B does so. The other three each introduce a predictable bias: library users study more, voluntary respondents are self-selected, and high-attendance students are not typical. Sample size does not fix bias, which is why the 100 high-attendance students are no better than the random 100.",
    patternName: "Choose the unbiased sample",
    concept: "Random sampling and generalisability",
    recognitionCues: [
      "A question about which method gives a reliable estimate",
      "Options describing where or how respondents were found",
      "At least one option using the word random",
    ],
    fastestMethod:
      "Find the option that samples at random from the entire target population. Reject anything tied to a place, a behaviour or a voluntary response.",
    commonTraps: [
      "Being swayed by a large sample that is biased",
      "Treating convenience sampling as random",
      "Assuming a voluntary survey is representative",
    ],
    expectedSeconds: 60,
  },
];
