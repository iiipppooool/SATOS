import type { SeedQuestion } from "../types";

/**
 * Second batch of Information and Ideas and Craft and Structure items.
 * All passages are original compositions written for this platform.
 */
export const RW_READING_QUESTIONS_2: SeedQuestion[] = [
  // --- Words in context --------------------------------------------------
  {
    id: "rw-words-004",
    skillId: "words-in-context",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The first edition of the atlas was _______ in its coverage of the interior: whole river systems appear as single speculative lines, and several mountain ranges are placed hundreds of kilometres from where they stand.",
    stem: "Which choice completes the text with the most logical and precise word?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "meticulous",
        distractorType: "wrong_relationship",
        rationale: "The colon introduces evidence of carelessness, so a word meaning painstaking contradicts the sentence.",
      },
      { label: "B", text: "unreliable", isCorrect: true, rationale: "Speculative rivers and misplaced mountains are exactly what makes coverage unreliable." },
      {
        label: "C",
        text: "exhaustive",
        distractorType: "wrong_relationship",
        rationale: "Exhaustive means complete. The problem described is inaccuracy, not incompleteness.",
      },
      {
        label: "D",
        text: "derivative",
        distractorType: "plausible_paraphrase",
        rationale: "Derivative means copied from elsewhere, which the evidence after the colon does not show.",
      },
    ],
    explanation:
      "The colon means the second half defines the blank. Rivers drawn as guesses and ranges in the wrong place describe information you cannot trust, which is unreliable. Meticulous and exhaustive both point the opposite way, and derivative is about originality rather than accuracy. Cover the options, write your own word from the evidence, then match.",
    patternName: "Blank defined by the following clause",
    concept: "Using the evidence after a colon to fix meaning",
    recognitionCues: [
      "A colon immediately after the clause containing the blank",
      "Concrete examples that illustrate the missing word",
      "Options that are all plausible critical vocabulary",
    ],
    fastestMethod:
      "Read the evidence first and supply your own word before looking at the options. That defeats the near-synonyms.",
    commonTraps: [
      "Choosing a word that contradicts the evidence",
      "Confusing inaccuracy with incompleteness",
      "Picking the most academic-sounding option",
    ],
    expectedSeconds: 60,
  },
  {
    id: "rw-words-005",
    skillId: "words-in-context",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Far from settling the question, the excavation _______ it: the new pottery sequence fits neither of the two chronologies previously proposed.",
    stem: "Which choice completes the text with the most logical and precise word?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "resolved",
        distractorType: "wrong_relationship",
        rationale: "Far from settling the question rules this out directly.",
      },
      { label: "B", text: "complicated", isCorrect: true, rationale: "A sequence fitting neither existing chronology makes the question harder, not easier, which is what complicated means here." },
      {
        label: "C",
        text: "dismissed",
        distractorType: "plausible_paraphrase",
        rationale: "The question was not set aside; it became more difficult.",
      },
      {
        label: "D",
        text: "anticipated",
        distractorType: "wrong_relationship",
        rationale: "Anticipated means expected in advance, which has nothing to do with the effect of the excavation on the debate.",
      },
    ],
    explanation:
      "Far from settling tells you the word must mean something close to the opposite of settling, and the colon explains how: the evidence matches neither existing theory. Complicated captures both. Resolved is the direct contradiction, dismissed implies the question was dropped rather than made harder, and anticipated is about timing rather than difficulty.",
    patternName: "Far from X signals the opposite",
    concept: "Reading a built-in contrast marker",
    recognitionCues: [
      "The phrase far from, rather than, or instead of before the blank",
      "A colon supplying the explanation",
      "An option that is the direct opposite of the answer",
    ],
    fastestMethod:
      "Spot the contrast marker, name what the word must oppose, then check the evidence after the colon confirms it.",
    commonTraps: [
      "Choosing the word the sentence explicitly rules out",
      "Treating made harder as set aside",
      "Ignoring the far from construction",
    ],
    expectedSeconds: 65,
  },
  {
    id: "rw-words-006",
    skillId: "words-in-context",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Reviewers praised the production's restraint: where other stagings fill the interval with spectacle, this one offers a bare platform and a single lamp, a _______ that the director defends as a way of forcing attention onto the text.",
    stem: "Which choice completes the text with the most logical and precise word?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "lapse",
        distractorType: "wrong_relationship",
        rationale: "A lapse is an accidental failure. The passage presents the choice as deliberate and defended.",
      },
      {
        label: "B",
        text: "flourish",
        distractorType: "wrong_relationship",
        rationale: "A flourish is an ornamental addition, the opposite of a bare platform and a single lamp.",
      },
      { label: "C", text: "austerity", isCorrect: true, rationale: "Austerity names the deliberate plainness the sentence has just described and that the director defends." },
      {
        label: "D",
        text: "concession",
        distractorType: "plausible_paraphrase",
        rationale: "A concession is something yielded to an opponent, but nothing is being given up here.",
      },
    ],
    explanation:
      "The blank is a noun summing up what precedes it: restraint, a bare platform, a single lamp. Austerity is the noun for that deliberate plainness, and it fits the director defending it as a choice. Lapse and concession both imply the plainness was unintended or forced, which the sentence contradicts, and flourish describes decoration the staging conspicuously lacks.",
    patternName: "Noun summarising the preceding description",
    concept: "Choosing a noun that names what has just been described",
    recognitionCues: [
      "A blank preceded by a or an and followed by a relative clause",
      "A concrete description earlier in the sentence",
      "Options that are abstract nouns",
    ],
    fastestMethod:
      "Ask what single noun names the thing just described, then check it also fits the clause after the blank.",
    commonTraps: [
      "Choosing a word implying the choice was accidental",
      "Choosing the opposite of the description",
      "Ignoring the second half of the sentence",
    ],
    expectedSeconds: 70,
  },
  {
    id: "rw-words-007",
    skillId: "words-in-context",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Although the two populations are separated by less than forty kilometres of open water, their songs have _______ to the point where recordings from one island provoke no response from birds on the other.",
    stem: "Which choice completes the text with the most logical and precise word?",
    difficulty: 4,
    choices: [
      { label: "A", text: "diverged", isCorrect: true, rationale: "The songs have grown apart far enough that the two groups no longer recognise each other, which is divergence." },
      {
        label: "B",
        text: "converged",
        distractorType: "wrong_relationship",
        rationale: "Converged means grown more alike, which would produce a response rather than none.",
      },
      {
        label: "C",
        text: "deteriorated",
        distractorType: "plausible_paraphrase",
        rationale: "Nothing suggests the songs have got worse, only that they differ between islands.",
      },
      {
        label: "D",
        text: "proliferated",
        distractorType: "wrong_relationship",
        rationale: "Proliferated means increased in number, which does not explain the lack of response.",
      },
    ],
    explanation:
      "The evidence after to the point where is the test: birds on one island ignore recordings from the other, so the two song types must have become different enough to be unrecognisable. That is divergence. Converged is the exact opposite, and the although at the start signals that the result is surprising given how close the islands are, which fits divergence rather than similarity.",
    patternName: "Evidence clause fixes the direction",
    concept: "Using a result clause to choose between opposites",
    recognitionCues: [
      "The construction to the point where introducing a consequence",
      "An although clause setting up a surprise",
      "Two options that are direct opposites",
    ],
    fastestMethod:
      "Read the result clause and ask which direction produces it. When two options are opposites, one of them is almost always right.",
    commonTraps: [
      "Choosing the opposite because the sentence mentions closeness",
      "Reading difference as decline",
      "Missing that although signals an unexpected outcome",
    ],
    expectedSeconds: 65,
  },
  {
    id: "rw-words-008",
    skillId: "words-in-context",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The committee's final report is _______ about costs: it gives a total, a contingency figure and a line-by-line breakdown for each of the five years.",
    stem: "Which choice completes the text with the most logical and precise word?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "evasive",
        distractorType: "wrong_relationship",
        rationale: "The colon lists detailed figures, which is the opposite of evasive.",
      },
      {
        label: "B",
        text: "speculative",
        distractorType: "plausible_paraphrase",
        rationale: "Speculative means based on guesswork. A line-by-line breakdown is the opposite of guesswork.",
      },
      { label: "C", text: "explicit", isCorrect: true, rationale: "Totals, contingencies and annual breakdowns are costs set out in full and in the open." },
      {
        label: "D",
        text: "indifferent",
        distractorType: "wrong_idiom",
        rationale: "A report cannot be indifferent about costs in this sense, and the detail shows close attention rather than none.",
      },
    ],
    explanation:
      "The colon supplies three pieces of evidence, all of them detailed figures. A document that states costs in that much detail is explicit. Evasive and speculative both run against the evidence, and indifferent does not fit either the meaning or the idiom. When a colon follows the blank, the words after it define the answer.",
    patternName: "Colon evidence confirms the word",
    concept: "Matching a word to concrete supporting detail",
    recognitionCues: [
      "A colon directly after the clause with the blank",
      "A list of specifics as evidence",
      "Options including the opposite of the answer",
    ],
    fastestMethod:
      "Decide from the evidence whether the word should be positive or negative before reading the options. That halves the field immediately.",
    commonTraps: [
      "Choosing a negative word when the evidence is positive",
      "Confusing detailed with uncertain",
      "Choosing a word that does not take the following preposition",
    ],
    expectedSeconds: 55,
  },

  // --- Text structure and purpose ----------------------------------------
  {
    id: "rw-structure-004",
    skillId: "text-structure-and-purpose",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Standard accounts credit the 1854 Broad Street pump with proving that cholera spread through water. The pump handle was removed and the outbreak subsided. Parish records, however, show that deaths had already been falling for several days before the handle came off, as residents fled the district. The pump evidence was real, but it was the painstaking mapping of cases, not the handle, that carried the argument.",
    stem: "Which choice best describes the function of the third sentence in the text as a whole?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "It supplies the statistical evidence that confirms the standard account.",
        distractorType: "wrong_relationship",
        rationale: "The records cut against the standard account rather than confirming it.",
      },
      { label: "B", text: "It introduces evidence that undermines the causal story told in the first two sentences.", isCorrect: true, rationale: "If deaths were already falling before the handle was removed, the removal cannot have caused the decline." },
      {
        label: "C",
        text: "It concludes that the pump played no part in the outbreak.",
        distractorType: "too_broad",
        rationale: "The final sentence explicitly grants that the pump evidence was real. The third sentence makes no such sweeping claim.",
      },
      {
        label: "D",
        text: "It explains why residents left the district during the outbreak.",
        distractorType: "true_but_irrelevant",
        rationale: "The flight of residents is mentioned in passing as an explanation of the falling figures, not as the sentence's purpose.",
      },
    ],
    explanation:
      "Sentences one and two set out the familiar story: handle off, outbreak over. The third begins with however and supplies a timing problem, namely that the decline had started first. Its function is therefore to undermine the causal claim, which is B. C overshoots, because the passage goes on to say the pump evidence was real, and the test of a function question is what the sentence does in the argument, not what it mentions.",
    patternName: "Timing evidence against a causal claim",
    concept: "Function of a sentence that complicates a received account",
    recognitionCues: [
      "A familiar story told first, with a however in the following sentence",
      "Dates or sequence used as the counter-evidence",
      "Options ranging from confirms to refutes",
    ],
    fastestMethod:
      "Describe what the sentence does in your own words before reading the options, then pick the match. Check the last sentence to see how far the passage actually goes.",
    commonTraps: [
      "Choosing an option that overstates the challenge as outright refutation",
      "Treating a passing detail as the sentence's purpose",
      "Confusing undermining with confirming",
    ],
    expectedSeconds: 85,
  },
  {
    id: "rw-structure-005",
    skillId: "text-structure-and-purpose",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "A thermometer in a sunlit street records the temperature of the thermometer, not of the air. The instrument absorbs radiation, warms, and reports its own state. Meteorological screens exist to break that link: white louvred boxes that shade the sensor while letting air pass freely over it. What looks like a piece of Victorian furniture is in fact a solution to a measurement problem.",
    stem: "Which choice best describes the overall structure of the text?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "It traces the history of an instrument from its invention to its modern form.",
        distractorType: "wrong_relationship",
        rationale: "No history is given. The single date-like reference, Victorian, is an aside about appearance.",
      },
      { label: "B", text: "It identifies a problem, explains its cause, and then presents a device designed to solve it.", isCorrect: true, rationale: "That is the sequence exactly: faulty reading, the reason for it, then the screen as the remedy." },
      {
        label: "C",
        text: "It compares two competing methods of measuring air temperature.",
        distractorType: "wrong_relationship",
        rationale: "Only one method is described. The sunlit thermometer is the failure case, not a rival method.",
      },
      {
        label: "D",
        text: "It argues that air temperature cannot be measured accurately.",
        distractorType: "too_broad",
        rationale: "The passage presents a working solution, so it claims the opposite.",
      },
    ],
    explanation:
      "Label the sentences: problem, cause, solution, reframing. That gives problem-cause-solution, which is B. D inverts the conclusion, and C invents a comparison the passage never makes. Structure questions are answered by the sequence of moves, so tag each sentence with a single word before you look at the options.",
    patternName: "Problem, cause, solution",
    concept: "Identifying an organisational pattern",
    recognitionCues: [
      "A failure described first",
      "A because-style explanation second",
      "A device or method introduced third",
    ],
    fastestMethod:
      "Give each sentence a one-word label, then match the resulting sequence to an option.",
    commonTraps: [
      "Reading a single period reference as a history",
      "Inventing a comparison from a contrast of right and wrong",
      "Choosing an option that contradicts the final sentence",
    ],
    expectedSeconds: 80,
  },
  {
    id: "rw-structure-006",
    skillId: "text-structure-and-purpose",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The following text is from a letter written by a nineteenth-century surveyor.\n\nYou ask why the chain must be re-measured each morning before work begins. The honest answer is that it lengthens. Sixty-six feet of iron links, carried over rough ground and corrected a hundred times a day, will stretch perhaps an inch in a season. An inch is nothing until it is multiplied by the four thousand chains of a county boundary, at which point it is a field.",
    stem: "What is the main rhetorical purpose of the final sentence?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "To concede that the daily re-measurement is probably unnecessary",
        distractorType: "wrong_relationship",
        rationale: "The sentence does the opposite: it justifies the practice by showing the error matters.",
      },
      { label: "B", text: "To show that a negligible error becomes significant when accumulated", isCorrect: true, rationale: "An inch is nothing until multiplied, at which point it is a field, which is precisely an argument about accumulation." },
      {
        label: "C",
        text: "To explain the physical process by which iron links stretch",
        distractorType: "true_but_irrelevant",
        rationale: "The mechanism is in the previous sentence; the final one is about consequences.",
      },
      {
        label: "D",
        text: "To criticise the accuracy of existing county boundaries",
        distractorType: "too_broad",
        rationale: "No existing boundary is criticised. The example is hypothetical, illustrating why care is taken.",
      },
    ],
    explanation:
      "The letter answers a question about a daily routine. The last sentence takes the tiny error established earlier and scales it up, ending on the vivid image of a whole field. Its purpose is to justify the routine by showing that small errors compound. C describes the preceding sentence, and A reverses the writer's position, which is a standard trap in purpose questions.",
    patternName: "Scaling a small error to justify a practice",
    concept: "Purpose of a closing illustration",
    recognitionCues: [
      "A question answered at the start of the passage",
      "A small quantity multiplied in the final sentence",
      "A vivid concrete image at the end",
    ],
    fastestMethod:
      "Ask what would be lost if the sentence were deleted. Here you would lose the reason the routine is worth the trouble.",
    commonTraps: [
      "Choosing the option that describes a neighbouring sentence",
      "Reversing the writer's stance",
      "Reading a hypothetical example as a criticism of real cases",
    ],
    expectedSeconds: 85,
  },
  {
    id: "rw-structure-007",
    skillId: "text-structure-and-purpose",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Three explanations have been offered for the collapse of the herring fishery. The first blames overfishing by the new steam trawlers. The second points to a shift in water temperature recorded across the same decade. The third, less often discussed, notes that the shore-based curing houses closed two years before the catch figures fell, which would have depressed landings regardless of how many fish were in the sea.",
    stem: "Which choice best describes the function of the final sentence?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "It combines the first two explanations into a single account.",
        distractorType: "wrong_relationship",
        rationale: "It introduces a third, independent explanation rather than merging the earlier two.",
      },
      { label: "B", text: "It raises a neglected possibility that the recorded decline reflects how fish were landed rather than how many existed.", isCorrect: true, rationale: "The closure of the curing houses would reduce landings without reducing the fish population, which is a different kind of explanation from the first two." },
      {
        label: "C",
        text: "It provides evidence that overfishing was the primary cause.",
        distractorType: "wrong_relationship",
        rationale: "The sentence offers an alternative to overfishing, not support for it.",
      },
      {
        label: "D",
        text: "It concludes that the catch figures for the period are worthless.",
        distractorType: "too_broad",
        rationale: "It suggests the figures may measure something other than abundance, which is far short of calling them worthless.",
      },
    ],
    explanation:
      "The first two explanations both concern how many fish were in the water. The third is different in kind: it questions whether the catch figures measure abundance at all, since landings depend on the shore infrastructure too. The phrase less often discussed flags it as neglected. D is the sharpest trap, converting a measured point about what the data represent into a sweeping dismissal.",
    patternName: "A third explanation of a different kind",
    concept: "Recognising a measurement-level alternative",
    recognitionCues: [
      "A numbered list of explanations",
      "A phrase such as less often discussed before the last one",
      "The final item questions the data rather than the phenomenon",
    ],
    fastestMethod:
      "Check whether the last item is another cause of the same type or a challenge to what the evidence measures. That distinction decides the answer.",
    commonTraps: [
      "Treating the third explanation as supporting one of the first two",
      "Overstating a caveat about data into a dismissal",
      "Missing that the sentence changes the level of the argument",
    ],
    expectedSeconds: 95,
  },
  {
    id: "rw-structure-008",
    skillId: "text-structure-and-purpose",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "It is tempting to describe the printing press as the cause of the Reformation. Presses existed in Mainz from the 1450s, and the theses were posted in 1517. But presses were also busy in Venice, Paris and Seville throughout those decades without producing anything comparable, and the pamphlet war that followed 1517 drew on a network of vernacular preachers that long predated movable type.",
    stem: "Which choice best describes the overall structure of the text?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "It states a claim, offers apparent support for it, then gives two reasons to doubt it.",
        isCorrect: true,
        rationale: "The dates look supportive, and the but sentence supplies both the counter-examples and the pre-existing network.",
      },
      {
        label: "B",
        text: "It states a claim and then provides increasingly strong evidence in its favour.",
        distractorType: "wrong_relationship",
        rationale: "The final sentence argues against the claim, not for it.",
      },
      {
        label: "C",
        text: "It contrasts the Reformation with comparable movements in Venice, Paris and Seville.",
        distractorType: "partial_solution",
        rationale: "Those cities appear as counter-examples within one sentence, not as the organising comparison of the whole text.",
      },
      {
        label: "D",
        text: "It rejects the printing press as having any role in the Reformation.",
        distractorType: "too_broad",
        rationale: "The passage questions the press as the cause. It never denies it played a part.",
      },
    ],
    explanation:
      "Sentence one names a tempting claim, flagged by it is tempting. Sentence two gives the dates that make it look right. Sentence three begins with but and supplies two separate objections: other cities had presses without a Reformation, and the pamphlet network predated printing. That is claim, apparent support, two doubts. D is the classic overreach, converting a challenge to a causal claim into a denial of any role.",
    patternName: "Tempting claim then two objections",
    concept: "Tracking an argument that undercuts its own opening",
    recognitionCues: [
      "An opening phrase such as it is tempting to say",
      "Supporting dates or figures in the second sentence",
      "A but sentence carrying more than one objection",
    ],
    fastestMethod:
      "Count the objections in the final sentence. Options that say one are usually incomplete, and options that say rejects entirely are usually too strong.",
    commonTraps: [
      "Reading the setup as the author's own position",
      "Converting a challenge to causation into total denial",
      "Mistaking an in-sentence example for the text's structure",
    ],
    expectedSeconds: 95,
  },

  // --- Cross-text connections --------------------------------------------
  {
    id: "rw-crosstext-004",
    skillId: "cross-text-connections",
    format: "mcq",
    stimulusTitle: "Text 1 and Text 2",
    stimulus:
      "Text 1\nCities should replace on-street parking with protected cycle lanes. Street space is finite, a parking bay moves almost nobody, and the same width of road carries several thousand cyclists an hour.\n\nText 2\nThroughput is the wrong measure on its own. A delivery van occupying a bay for ten minutes supplies a shop that serves hundreds of people, and a disabled driver's space may be the only way a particular person reaches the street at all. The question is not how many bodies a strip of tarmac moves, but what the street is for.",
    stem: "Based on the texts, how would the author of Text 2 most likely respond to the argument in Text 1?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "By disputing the claim that cycle lanes carry more people per metre than parking",
        distractorType: "wrong_relationship",
        rationale: "Text 2 never challenges the throughput figure. It argues that the figure is not the only thing that matters.",
      },
      { label: "B", text: "By arguing that throughput alone is too narrow a criterion for allocating street space", isCorrect: true, rationale: "That is exactly the move Text 2 makes, with the van and the disabled driver as illustrations." },
      {
        label: "C",
        text: "By claiming that cycle lanes are unsafe for the people who use them",
        distractorType: "true_but_irrelevant",
        rationale: "Safety is not mentioned anywhere in either text.",
      },
      {
        label: "D",
        text: "By agreeing fully and suggesting the change be made faster",
        distractorType: "wrong_relationship",
        rationale: "Text 2 raises objections; it does not endorse the proposal.",
      },
    ],
    explanation:
      "Separate the factual claim from the evaluative one. Text 1 asserts a fact, that cycle lanes move more people per metre, and draws a conclusion from it. Text 2 lets the fact stand and attacks the inference, arguing that access and function matter alongside throughput. That is a disagreement about the criterion, not about the number, which is B.",
    patternName: "Disputing the criterion, not the fact",
    concept: "Locating the level at which two authors disagree",
    recognitionCues: [
      "Text 1 reasons from a single metric",
      "Text 2 introduces cases the metric ignores",
      "Text 2 contains a phrase such as the wrong measure",
    ],
    fastestMethod:
      "Decide whether the second text denies the first text's facts or its reasoning. Here it concedes the facts, so every option about disputing the figure is out.",
    commonTraps: [
      "Reading a challenge to reasoning as a challenge to the data",
      "Importing a familiar argument neither text makes",
      "Treating a qualified objection as agreement",
    ],
    expectedSeconds: 95,
  },
  {
    id: "rw-crosstext-005",
    skillId: "cross-text-connections",
    format: "mcq",
    stimulusTitle: "Text 1 and Text 2",
    stimulus:
      "Text 1\nAnalysis of the hoard's silver shows isotope ratios matching ores from a single valley in central Europe, three thousand kilometres from where it was buried. The objects must therefore have been carried along a long-distance trade route.\n\nText 2\nIsotope work identifies where metal was mined, not where an object was made or how it travelled. Silver was melted and recast repeatedly; a single ingot could pass through a dozen workshops. The ratios establish an origin for the material and nothing about the route it took.",
    stem: "Which choice best describes the relationship between the two texts?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "Text 2 accepts Text 1's evidence but argues that it does not support the conclusion drawn from it.",
        isCorrect: true,
        rationale: "Text 2 grants that the isotope ratios identify the ore source and denies only that this establishes the route.",
      },
      {
        label: "B",
        text: "Text 2 presents different isotope data that contradict Text 1's findings.",
        distractorType: "wrong_relationship",
        rationale: "No new data appear in Text 2. It reasons about what the existing data can show.",
      },
      {
        label: "C",
        text: "Text 2 argues that the hoard was produced locally rather than imported.",
        distractorType: "too_broad",
        rationale: "Text 2 makes no claim about where the objects were made. It says the method cannot tell us.",
      },
      {
        label: "D",
        text: "Text 2 confirms Text 1's conclusion using an independent method.",
        distractorType: "wrong_relationship",
        rationale: "It does the opposite: it questions whether the conclusion follows.",
      },
    ],
    explanation:
      "Text 1 moves from an isotope match to a claim about a trade route. Text 2 accepts the match and attacks the inferential step, pointing out that recasting breaks any link between where metal was mined and how a finished object travelled. That is conceding evidence while denying the conclusion, which is A. C is tempting but goes further than Text 2 does: saying a method cannot establish something is not the same as asserting the opposite.",
    patternName: "Evidence granted, inference denied",
    concept: "Distinguishing data from the conclusion drawn from it",
    recognitionCues: [
      "Text 1 draws a conclusion from one technique",
      "Text 2 discusses the limits of that technique",
      "No new evidence is introduced in Text 2",
    ],
    fastestMethod:
      "Ask whether the second text brings new data or reasons about the old data. Reasoning about limits means the disagreement is over the inference.",
    commonTraps: [
      "Thinking a limitation argument asserts the opposite conclusion",
      "Inventing new data in the second text",
      "Reading a methodological objection as agreement",
    ],
    expectedSeconds: 100,
  },
  {
    id: "rw-crosstext-006",
    skillId: "cross-text-connections",
    format: "mcq",
    stimulusTitle: "Text 1 and Text 2",
    stimulus:
      "Text 1\nSchools that abolished homework for under-elevens reported no fall in attainment after two years, and teachers described better-rested classes. Homework at that age achieves little and should be dropped.\n\nText 2\nThe schools that abolished homework were not chosen at random; they were mostly well-resourced schools with small classes and high parental involvement. In such settings children read at home anyway. Whether the same result would follow in schools without those advantages is precisely what the study cannot tell us.",
    stem: "Based on the texts, the author of Text 2 would most likely characterise the recommendation in Text 1 as",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "well supported, since the attainment data are clear.",
        distractorType: "wrong_relationship",
        rationale: "Text 2 raises a sampling problem, so it does not regard the recommendation as well supported.",
      },
      { label: "B", text: "premature, because the schools studied may not represent schools generally.", isCorrect: true, rationale: "That is the selection-bias objection Text 2 makes, and premature captures its cautious scope." },
      {
        label: "C",
        text: "mistaken, because homework demonstrably raises attainment at that age.",
        distractorType: "too_broad",
        rationale: "Text 2 offers no evidence that homework raises attainment. It argues the question is unresolved.",
      },
      {
        label: "D",
        text: "irrelevant, because attainment is the wrong outcome to measure.",
        distractorType: "wrong_relationship",
        rationale: "Text 2 does not dispute attainment as a measure; it disputes who was measured.",
      },
    ],
    explanation:
      "Text 2 makes one specific objection: the schools were self-selected and unusually advantaged, so the finding may not generalise. It does not claim the opposite conclusion is true, which rules out C, and it does not challenge the outcome measure, which rules out D. The correct word is premature: the recommendation may yet be right, but the evidence does not establish it.",
    patternName: "Generalisability objection",
    concept: "Sampling bias and the limits of a recommendation",
    recognitionCues: [
      "A recommendation drawn from a set of volunteer or self-selected institutions",
      "Text 2 describing how the sample differs from the population",
      "Options ranging from well supported through premature to mistaken",
    ],
    fastestMethod:
      "Check whether the critic asserts the opposite or merely withholds judgement. Withholding judgement means the answer is the cautious middle option.",
    commonTraps: [
      "Escalating a sampling objection into a claim that the recommendation is wrong",
      "Confusing who was measured with what was measured",
      "Choosing the strongest-sounding option",
    ],
    expectedSeconds: 100,
  },
  {
    id: "rw-crosstext-007",
    skillId: "cross-text-connections",
    format: "mcq",
    stimulusTitle: "Text 1 and Text 2",
    stimulus:
      "Text 1\nMachine translation has reached the point where human translators are needed only for literary work. For technical documentation, the output is already accurate enough to publish with light editing.\n\nText 2\nLight editing is doing a great deal of work in that sentence. In a safety manual, the difference between must not and need not is a single word, and a system that is right ninety-nine times in a hundred will produce several such errors in a long document. The editor who catches them is doing translation, whatever the job is called.",
    stem: "Which choice best states the main point of disagreement between the two texts?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "Whether machine translation produces accurate output for literary texts",
        distractorType: "true_but_irrelevant",
        rationale: "Both texts set literary work aside; Text 1 concedes it and Text 2 never raises it.",
      },
      { label: "B", text: "Whether the editing required to make technical output publishable still amounts to translation work", isCorrect: true, rationale: "Text 1 treats it as light editing; Text 2 argues the editor catching critical errors is translating." },
      {
        label: "C",
        text: "Whether machine translation is improving",
        distractorType: "wrong_relationship",
        rationale: "Neither text disputes that it has improved. Text 2 accepts a high accuracy rate.",
      },
      {
        label: "D",
        text: "Whether safety manuals should be translated at all",
        distractorType: "too_broad",
        rationale: "Neither text questions whether such documents should be translated.",
      },
    ],
    explanation:
      "Find the phrase the second text picks up. Text 2 quotes light editing back and argues that in high-stakes documents this editing is itself skilled translation, because a single wrong modal verb matters and a 99 per cent system will still produce several. The disagreement is therefore about what that editing amounts to, not about accuracy rates, which Text 2 effectively concedes.",
    patternName: "Disagreement over how to classify the remaining work",
    concept: "Identifying the precise point at issue",
    recognitionCues: [
      "Text 2 quoting or echoing a phrase from Text 1",
      "A concession about accuracy alongside an objection about consequences",
      "Options naming topics both texts agree on",
    ],
    fastestMethod:
      "Find the phrase Text 2 repeats from Text 1. The disagreement is almost always about that phrase.",
    commonTraps: [
      "Choosing a topic both texts actually agree on",
      "Treating a concession as the disagreement",
      "Overlooking the quoted phrase",
    ],
    expectedSeconds: 105,
  },
  {
    id: "rw-crosstext-008",
    skillId: "cross-text-connections",
    format: "mcq",
    stimulusTitle: "Text 1 and Text 2",
    stimulus:
      "Text 1\nThe fossil's elongated forelimb bones indicate gliding. No living mammal has limbs of these proportions without a membrane between them.\n\nText 2\nThe inference is reasonable but rests on living mammals alone. Proportions outside the modern range are common in extinct groups, and the specimen preserves no soft tissue. Until a membrane or its attachment scars are found, gliding remains the best available guess rather than a finding.",
    stem: "Based on the texts, the author of Text 2 would most likely agree with which statement about Text 1's inference?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "It is unreasonable, because limb proportions say nothing about locomotion.",
        distractorType: "too_broad",
        rationale: "Text 2 explicitly calls the inference reasonable. It disputes its status, not its sense.",
      },
      { label: "B", text: "It is plausible but not yet established, because the comparison rests only on living species and no soft tissue survives.", isCorrect: true, rationale: "This matches both the concession and the two reasons Text 2 gives for withholding the stronger label." },
      {
        label: "C",
        text: "It is confirmed by the absence of soft tissue in the specimen.",
        distractorType: "wrong_relationship",
        rationale: "Absent evidence cannot confirm anything. Text 2 treats it as the reason for doubt.",
      },
      {
        label: "D",
        text: "It should be replaced by the hypothesis that the animal climbed rather than glided.",
        distractorType: "too_broad",
        rationale: "Text 2 proposes no alternative. It asks for more evidence before the claim is accepted.",
      },
    ],
    explanation:
      "Text 2 opens with a concession, the inference is reasonable, then gives two grounds for caution: the comparison uses only modern mammals, and no soft tissue is preserved. It ends by downgrading the claim from finding to best available guess. B reproduces both halves. A ignores the concession, and D invents a rival hypothesis the text never offers.",
    patternName: "Concede plausibility, withhold confirmation",
    concept: "Reading a measured scientific objection",
    recognitionCues: [
      "An opening concession such as the inference is reasonable",
      "Two distinct grounds for caution",
      "A closing phrase that downgrades the claim's status",
    ],
    fastestMethod:
      "Note the concession and the grounds separately, then choose the option that keeps both. Options that drop the concession are usually wrong.",
    commonTraps: [
      "Ignoring the concession and choosing a flat rejection",
      "Treating missing evidence as supporting evidence",
      "Inventing an alternative hypothesis",
    ],
    expectedSeconds: 95,
  },

  // --- Central ideas and details -----------------------------------------
  {
    id: "rw-central-004",
    skillId: "central-ideas-and-details",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Coral colonies bleached by a marine heatwave are often described as dead, but bleaching is the expulsion of symbiotic algae, not the death of the animal. A bleached colony that cools within a few weeks can reacquire algae and recover, sometimes with a more heat-tolerant strain than before. What determines the outcome is less the peak temperature than how long the heat persists.",
    stem: "Which choice best states the main idea of the text?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Marine heatwaves cause coral colonies to expel their symbiotic algae.",
        distractorType: "partial_solution",
        rationale: "True, and stated in the passage, but it is the setup rather than the point being made.",
      },
      { label: "B", text: "Bleaching is survivable, and duration of heat matters more than peak temperature in deciding whether a colony recovers.", isCorrect: true, rationale: "It captures the correction of the common view and the final sentence's verdict about duration." },
      {
        label: "C",
        text: "Bleached corals always recover if the water cools.",
        distractorType: "too_broad",
        rationale: "The passage says can recover, and makes recovery conditional on a short exposure. Always overstates it.",
      },
      {
        label: "D",
        text: "Heat-tolerant algal strains are now more common than they once were.",
        distractorType: "true_but_irrelevant",
        rationale: "The passage mentions a more tolerant strain as a possible outcome, not as a trend over time.",
      },
    ],
    explanation:
      "The structure is correction then criterion. The first sentence corrects the equation of bleaching with death; the second explains recovery; the third says what decides the outcome. A main idea has to carry both the correction and the criterion, which only B does. C turns a conditional into an absolute, the most common way a wrong answer is built in this question type.",
    patternName: "Correction followed by a criterion",
    concept: "Main idea of a passage that revises a common belief",
    recognitionCues: [
      "A phrase such as often described as, which signals the view being corrected",
      "A final sentence beginning what determines or what matters",
      "An option containing always or never",
    ],
    fastestMethod:
      "Read the first and last sentences. The main idea is usually the correction plus the verdict, and absolute words in an option are a quick elimination.",
    commonTraps: [
      "Choosing the setup sentence",
      "Choosing an absolute version of a conditional claim",
      "Choosing a detail mentioned in passing",
    ],
    expectedSeconds: 70,
  },
  {
    id: "rw-central-005",
    skillId: "central-ideas-and-details",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "In 1900 the Paris Metro commissioned Hector Guimard to design its station entrances. Guimard produced cast-iron frames that could be assembled in several configurations from the same small set of moulded parts, so that each station looked particular while the manufacturing stayed uniform. Later critics praised the entrances as handmade in spirit; they were in fact an early exercise in mass production.",
    stem: "According to the text, which statement about Guimard's entrances is true?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Each entrance was individually designed and built by hand.",
        distractorType: "wrong_relationship",
        rationale: "The final sentence says the opposite: they were an early exercise in mass production.",
      },
      { label: "B", text: "They achieved varied appearances while using the same standardised components.", isCorrect: true, rationale: "This restates the middle sentence precisely: several configurations from one set of moulded parts." },
      {
        label: "C",
        text: "Critics correctly identified them as the product of handcraft.",
        distractorType: "wrong_relationship",
        rationale: "The passage says critics praised them as handmade in spirit and then corrects that impression.",
      },
      {
        label: "D",
        text: "Guimard designed the entrances to reduce the cost of building the Metro.",
        distractorType: "true_but_irrelevant",
        rationale: "Cost is never mentioned. The passage discusses variety and standardisation, not expense.",
      },
    ],
    explanation:
      "Detail questions reward exact matching. The middle sentence states the key fact: a small set of moulded parts, assembled in several configurations, giving particular-looking stations from uniform manufacturing. B restates that without adding anything. A and C both contradict the final sentence, and D introduces a motive the text never supplies.",
    patternName: "Detail with a corrective final sentence",
    concept: "Matching an option to stated detail",
    recognitionCues: [
      "The phrase according to the text",
      "A final sentence correcting an impression",
      "Options that restate the corrected impression as fact",
    ],
    fastestMethod:
      "Locate the sentence carrying the fact, then check each option against its exact wording rather than your general impression.",
    commonTraps: [
      "Choosing the view the passage corrects",
      "Importing a plausible motive the text omits",
      "Reading in fact as confirming what preceded it",
    ],
    expectedSeconds: 75,
  },
  {
    id: "rw-central-006",
    skillId: "central-ideas-and-details",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The poet Lorna Goodison has said that she writes in two registers at once: the formal English of her schooling and the Jamaican speech of her household. She does not treat the second as decoration applied to the first. In her work a line may begin in one and end in the other, and the switch typically carries the argument rather than ornamenting it.",
    stem: "Which choice best states the main idea of the text?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Goodison learned formal English at school and Jamaican speech at home.",
        distractorType: "partial_solution",
        rationale: "Biographical background from the first sentence, not the claim the passage develops.",
      },
      {
        label: "B",
        text: "Goodison's poems are difficult for readers unfamiliar with Jamaican speech.",
        distractorType: "true_but_irrelevant",
        rationale: "Difficulty for readers is never discussed anywhere in the passage.",
      },
      { label: "C", text: "In Goodison's poetry the movement between two registers does argumentative work rather than serving as ornament.", isCorrect: true, rationale: "This is the point the second and third sentences build to, with carries the argument as the key phrase." },
      {
        label: "D",
        text: "Goodison prefers Jamaican speech to formal English in her poetry.",
        distractorType: "wrong_relationship",
        rationale: "The passage describes the two registers working together, not one being preferred.",
      },
    ],
    explanation:
      "The first sentence supplies background. The second rules out a reading, that the second register is decoration. The third states what the switching actually does: it carries the argument. The main idea is therefore the function of the code-switching, which is C. A stops at the background, and D invents a hierarchy the passage explicitly avoids by describing the two as simultaneous.",
    patternName: "Background, rejected reading, actual claim",
    concept: "Finding the main idea past the biographical setup",
    recognitionCues: [
      "A first sentence of biography",
      "A second sentence beginning she does not or it is not",
      "A third sentence saying what the thing actually does",
    ],
    fastestMethod:
      "Skip the biography and read the sentence that says what something does rather than what it is. That is normally the main idea.",
    commonTraps: [
      "Choosing the biographical setup",
      "Inventing a preference or hierarchy",
      "Choosing an option about readers when the passage is about technique",
    ],
    expectedSeconds: 80,
  },

  // --- Command of evidence (textual) -------------------------------------
  {
    id: "rw-evtext-004",
    skillId: "command-of-evidence-textual",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "A conservation team hypothesised that otters had returned to the river because water quality improved, rather than because prey fish became more abundant. They have twenty years of monthly data on dissolved pollutants, fish counts and otter sightings.",
    stem: "Which finding would most strongly support the team's hypothesis?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Otter sightings rose in the years following improvements in water quality, in stretches where fish counts stayed flat.",
        isCorrect: true,
        rationale: "It isolates the variable: quality changed, prey did not, and otters still returned.",
      },
      {
        label: "B",
        text: "Otter sightings and fish counts both rose over the twenty-year period.",
        distractorType: "wrong_relationship",
        rationale: "This is consistent with the rival explanation the team is arguing against, so it does not discriminate between them.",
      },
      {
        label: "C",
        text: "Dissolved pollutants fell steadily across all stretches of the river.",
        distractorType: "partial_solution",
        rationale: "It confirms that water quality improved but says nothing about otters, so it cannot support a claim about why they returned.",
      },
      {
        label: "D",
        text: "Otters were absent from the river for the thirty years before the study began.",
        distractorType: "true_but_irrelevant",
        rationale: "Background that establishes the return happened, not evidence about its cause.",
      },
    ],
    explanation:
      "The hypothesis is comparative: water quality rather than prey abundance. Supporting evidence must therefore separate the two. A does exactly that by finding stretches where quality improved, prey did not, and otters returned anyway. B is the trap, because a rise in both is precisely what the rival explanation predicts too. When a hypothesis says X rather than Y, look for the finding that holds Y constant.",
    patternName: "Evidence that separates two candidate causes",
    concept: "Supporting a comparative causal claim",
    recognitionCues: [
      "A hypothesis phrased as X rather than Y",
      "Several variables measured over the same period",
      "An option in which both variables rise together",
    ],
    fastestMethod:
      "Find the option that holds the rival cause constant. Anything where both variables move together supports neither side.",
    commonTraps: [
      "Choosing the finding consistent with both explanations",
      "Choosing evidence about only one variable",
      "Choosing background information",
    ],
    expectedSeconds: 90,
  },
  {
    id: "rw-evtext-005",
    skillId: "command-of-evidence-textual",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "In her study of early radio drama, the historian Aditi Rao argues that the medium's distinctive technique was not the sound effect but the deliberate silence, which forced listeners to supply the scene themselves.",
    stem: "Which quotation from a 1930s production script would best support Rao's argument?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "\"Effects: door slams, footsteps recede on gravel, distant dog.\"",
        distractorType: "partial_solution",
        rationale: "A sound-effect cue, which is the technique Rao explicitly sets aside as not the distinctive one.",
      },
      { label: "B", text: "\"Hold the pause four full seconds here. The listener must be allowed to picture the empty room before she speaks.\"", isCorrect: true, rationale: "A silence specified in the script, with a stated purpose of making the listener construct the scene, which is Rao's claim exactly." },
      {
        label: "C",
        text: "\"Orchestra: sustain chord under the closing speech.\"",
        distractorType: "true_but_irrelevant",
        rationale: "A music cue, which concerns neither silence nor listener construction.",
      },
      {
        label: "D",
        text: "\"This play was broadcast twice, on the Tuesday and again on the Saturday.\"",
        distractorType: "true_but_irrelevant",
        rationale: "A scheduling note with no bearing on dramatic technique.",
      },
    ],
    explanation:
      "Rao's claim has two parts: the technique is silence, not sound effects, and its function is to make listeners build the scene. The supporting quotation must show both. B gives a timed pause and states its purpose in those terms. A illustrates the technique Rao rejects as distinctive, which is the deliberate trap in a not X but Y argument.",
    patternName: "Evidence for the Y half of not X but Y",
    concept: "Supporting the precise claim rather than an adjacent one",
    recognitionCues: [
      "An argument phrased as not X but Y",
      "Options illustrating X",
      "A quotation task rather than a data task",
    ],
    fastestMethod:
      "Underline the Y half of the claim. Every wrong option will illustrate X or something unrelated.",
    commonTraps: [
      "Choosing evidence for the technique the author sets aside",
      "Choosing a vivid quotation that misses the claim",
      "Treating any period-appropriate source as support",
    ],
    expectedSeconds: 90,
  },
  {
    id: "rw-evtext-006",
    skillId: "command-of-evidence-textual",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "A student is writing about urban beekeeping. She wants to argue that the recent growth in city hives has not helped wild pollinators, and may have harmed them.",
    stem: "Which piece of evidence would most strengthen the student's argument?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "Surveys in three cities found that as managed honeybee hives increased, wild bee species richness within a two-kilometre radius declined, with the steepest falls where forage was scarcest.",
        isCorrect: true,
        rationale: "It links the growth in hives to a measured decline in wild pollinators and identifies competition for forage as the mechanism.",
      },
      {
        label: "B",
        text: "The number of registered urban hives in the United Kingdom has roughly tripled since 2008.",
        distractorType: "partial_solution",
        rationale: "It establishes the growth but says nothing about any effect on wild pollinators.",
      },
      {
        label: "C",
        text: "Honeybees are not native to many of the regions where they are now kept.",
        distractorType: "true_but_irrelevant",
        rationale: "A fact about origins, which on its own demonstrates no harm.",
      },
      {
        label: "D",
        text: "Urban beekeeping has become popular as a way of raising awareness of pollinator decline.",
        distractorType: "circular",
        rationale: "This describes the motivation for the practice rather than its ecological effect.",
      },
    ],
    explanation:
      "The argument has two components: no benefit to wild pollinators, and possible harm. Only A addresses both, pairing a rise in managed hives with a measured fall in wild species richness, and adding a plausible mechanism through forage scarcity. B supplies only the premise that hives increased, which the student already assumes. When an argument asserts harm, the evidence must measure the thing harmed.",
    patternName: "Evidence must measure the harmed party",
    concept: "Strengthening a claim of ecological harm",
    recognitionCues: [
      "A claim that something has not helped and may have harmed",
      "Options giving only the growth figure",
      "One option pairing the cause with a measured outcome",
    ],
    fastestMethod:
      "Ask which option measures the outcome the claim is about. Growth figures and motivations are the standard filler.",
    commonTraps: [
      "Choosing the premise the argument already assumes",
      "Choosing a background fact about the species",
      "Confusing motivation with effect",
    ],
    expectedSeconds: 95,
  },

  // --- Command of evidence (quantitative) --------------------------------
  {
    id: "rw-evquant-004",
    skillId: "command-of-evidence-quantitative",
    format: "mcq",
    stimulusTitle: "Median time to first fix, by navigation method (seconds)",
    stimulus:
      "Condition          Method A      Method B\nOpen sky              12            31\nLight tree cover      19            34\nDense tree cover      88            38\nUrban canyon         140            41",
    stem: "A researcher claims that Method B is more consistent across conditions than Method A, though slower in the easiest ones. Which choice best uses data from the table to support this claim?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Method B ranged from 31 to 41 seconds across all four conditions, while Method A ranged from 12 to 140 seconds.",
        isCorrect: true,
        rationale: "The ranges capture consistency directly, and the figures also show B starting slower in open sky.",
      },
      {
        label: "B",
        text: "In open sky, Method A took 12 seconds and Method B took 31 seconds.",
        distractorType: "partial_solution",
        rationale: "It supports only the slower in the easiest conditions half, saying nothing about consistency.",
      },
      {
        label: "C",
        text: "In the urban canyon, Method A took 140 seconds.",
        distractorType: "partial_solution",
        rationale: "A single figure for one method cannot support a comparative claim about consistency.",
      },
      {
        label: "D",
        text: "Both methods took longer in dense tree cover than in open sky.",
        distractorType: "too_broad",
        rationale: "A shared trend, which speaks to similarity rather than to the difference in consistency being claimed.",
      },
    ],
    explanation:
      "Consistency across conditions is a statement about spread, so the supporting data must be a range or a comparison of extremes. A gives both ranges, 31 to 41 against 12 to 140, which makes the difference in spread unmistakable and incidentally shows B slower in open sky. B and C each give a single comparison, and D describes what the two methods have in common.",
    patternName: "Match the data to a claim about spread",
    concept: "Supporting a consistency claim with ranges",
    recognitionCues: [
      "A claim using consistent, stable or variable",
      "A table with several conditions per group",
      "Options quoting single cells",
    ],
    fastestMethod:
      "A claim about consistency needs a range or a max-minus-min comparison. Reject any option giving one cell.",
    commonTraps: [
      "Choosing an accurate single data point",
      "Supporting only one half of a two-part claim",
      "Using a shared trend to support a claimed difference",
    ],
    expectedSeconds: 90,
  },
  {
    id: "rw-evquant-005",
    skillId: "command-of-evidence-quantitative",
    format: "mcq",
    stimulusTitle: "Seeds dispersed per visit, by disperser",
    stimulus:
      "Disperser        Visits per day    Seeds per visit    Seeds moved over 50 m (%)\nFruit bat               4.2                31                     82\nHornbill                9.6                14                     35\nCivet                   1.1                96                     11",
    stem: "Which statement about the data in the table is accurate?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "The hornbill moves the most seeds per day of the three dispersers.",
        distractorType: "wrong_operation",
        rationale: "Hornbill moves 9.6 times 14, about 134 seeds a day, but fruit bat moves 4.2 times 31, about 130, and civet 1.1 times 96, about 106. Hornbill is highest, but only just, and the claim needs the multiplication to check.",
      },
      {
        label: "B",
        text: "The civet carries the most seeds per visit but disperses the smallest proportion of them beyond 50 metres.",
        isCorrect: true,
        rationale: "Both halves read straight off the table: 96 seeds per visit is the highest, and 11 per cent is the lowest long-distance share.",
      },
      {
        label: "C",
        text: "The fruit bat makes more visits per day than the hornbill.",
        distractorType: "swapped_values",
        rationale: "Reversed: the hornbill makes 9.6 visits a day and the fruit bat 4.2.",
      },
      {
        label: "D",
        text: "Dispersers that visit more often always move a greater proportion of seeds beyond 50 metres.",
        distractorType: "too_broad",
        rationale: "The hornbill visits most often yet moves only 35 per cent beyond 50 metres, against the fruit bat's 82 per cent. One counterexample is enough.",
      },
    ],
    explanation:
      "Work through the options against the rows. B is directly readable: 96 is the largest value in the seeds-per-visit column and 11 the smallest in the final column. D fails on the hornbill alone, which is the fastest check since absolute claims need only one counterexample. C simply misreads the table, and A, while arithmetically close, requires a multiplication the question does not need you to trust.",
    patternName: "Accurate statement across multiple columns",
    concept: "Reading a three-column table without overclaiming",
    recognitionCues: [
      "Three or more measured columns",
      "An option containing always or never",
      "Options requiring a product of two columns",
    ],
    fastestMethod:
      "Test absolute claims first with a single counterexample, then verify the directly readable options before any that need arithmetic.",
    commonTraps: [
      "Accepting an always claim without checking every row",
      "Reversing two rows",
      "Assuming a correlation the table does not show",
    ],
    expectedSeconds: 105,
  },

  // --- Inferences --------------------------------------------------------
  {
    id: "rw-infer-004",
    skillId: "inferences",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Two groups of volunteers learned the same list of sixty words. One group slept for eight hours before being tested; the other stayed awake for the same interval in a dimly lit room, with no demanding tasks to perform. The sleeping group recalled substantially more. Because the waking group was neither tired nor distracted, the difference is unlikely to be explained by fatigue or interference, and instead suggests that _______",
    stem: "Which choice most logically completes the text?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "sleep plays an active role in consolidating newly learned material.",
        isCorrect: true,
        rationale: "With fatigue and interference ruled out, what remains is that sleep itself does something to the memories.",
      },
      {
        label: "B",
        text: "the waking group had less motivation to perform well on the test.",
        distractorType: "plausible_paraphrase",
        rationale: "Motivation is never measured or mentioned, and the passage has set up the comparison to exclude outside factors.",
      },
      {
        label: "C",
        text: "word lists are an unreliable way to measure memory.",
        distractorType: "wrong_relationship",
        rationale: "Both groups used the same list, so the method cannot explain a difference between them.",
      },
      {
        label: "D",
        text: "the two groups differed in how well they learned the list initially.",
        distractorType: "wrong_relationship",
        rationale: "Both groups learned the same list under the same conditions, so this is excluded by the design.",
      },
    ],
    explanation:
      "The passage is built as an elimination argument. Fatigue is ruled out because the waking group was rested, and interference is ruled out because the room was dim and undemanding. The design also holds the learning phase and the material constant. What is left is that sleep does something positive rather than merely preventing something negative, which is A. B introduces an unmeasured variable, a standard wrong answer in inference questions.",
    patternName: "Elimination argument",
    concept: "Inferring from a design that excludes rival explanations",
    recognitionCues: [
      "Two groups matched on everything but one variable",
      "Explicit statements ruling out alternatives",
      "A blank following suggests that or indicates that",
    ],
    fastestMethod:
      "List what the design rules out, then pick the only explanation left standing. Reject anything the passage never measures.",
    commonTraps: [
      "Introducing an unmeasured variable such as motivation",
      "Choosing an option the design already excludes",
      "Attacking the method when both groups shared it",
    ],
    expectedSeconds: 90,
  },
  {
    id: "rw-infer-005",
    skillId: "inferences",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The ledger records payments to the workshop in two hands. Entries in the first hand stop abruptly in May 1623 and the second begins the following week, continuing in the same format and using the same abbreviations. The second hand also corrects three arithmetical errors made by the first, in entries dating from the previous autumn. It therefore appears that the second scribe _______",
    stem: "Which choice most logically completes the text?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "had access to the earlier entries and understood the system already in use.",
        isCorrect: true,
        rationale: "Correcting old arithmetic requires reading the earlier entries, and continuing the format and abbreviations shows familiarity with the system.",
      },
      {
        label: "B",
        text: "was the same person as the first scribe, writing in a different style.",
        distractorType: "wrong_relationship",
        rationale: "The passage treats them as two hands and two scribes, and a scribe correcting their own months-old arithmetic in a new hand is not what the evidence suggests.",
      },
      {
        label: "C",
        text: "had been trained at a different workshop before arriving.",
        distractorType: "plausible_paraphrase",
        rationale: "Nothing in the passage concerns where the second scribe trained.",
      },
      {
        label: "D",
        text: "found the ledger system confusing and attempted to redesign it.",
        distractorType: "wrong_relationship",
        rationale: "The second hand keeps the same format and abbreviations, which is continuity rather than redesign.",
      },
    ],
    explanation:
      "Two observations point the same way. Continuing the same format and abbreviations shows the second scribe knew the existing system, and correcting errors in entries from the previous autumn shows they read back through earlier work. Together these give A. D contradicts the continuity of format directly, and B and C concern matters the evidence does not touch.",
    patternName: "Converging details about a single actor",
    concept: "Inferring from two independent observations",
    recognitionCues: [
      "Two separate pieces of evidence about the same subject",
      "A blank introduced by it therefore appears that",
      "Documentary or archival detail",
    ],
    fastestMethod:
      "Ask what both observations have in common, and choose the conclusion they jointly support. Reject anything resting on neither.",
    commonTraps: [
      "Choosing an option that one observation contradicts",
      "Speculating about background the text never gives",
      "Over-reading a single detail",
    ],
    expectedSeconds: 95,
  },
];
