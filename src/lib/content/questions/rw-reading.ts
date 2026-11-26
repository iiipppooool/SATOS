import type { SeedQuestion } from "../types";

/**
 * All passages below are original compositions written for SAT OS. They
 * imitate the register and length of digital SAT stimuli but reproduce no
 * published text.
 */
export const RW_READING_QUESTIONS: SeedQuestion[] = [
  // --- Central ideas and details -----------------------------------------
  {
    id: "rw-central-001",
    skillId: "central-ideas-and-details",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Fungi that colonise plant roots have long been described as partners in a straightforward exchange: the plant supplies sugars, the fungus supplies minerals. Recent work complicates that picture. Researchers tracking carbon moving between neighbouring trees found that the amount transferred varied sharply depending on which fungal species mediated the connection, and that some fungi retained most of the carbon they received rather than passing it onward. The relationship, it now appears, is less a shared economy than a negotiation in which the fungus holds considerable leverage.",
    stem: "Which choice best states the main idea of the text?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: "Fungi provide minerals to plants in return for sugars the plants produce.",
        distractorType: "true_but_irrelevant",
        rationale: "This states the older view that the passage sets up in order to complicate. It is accurate as background but it is not what the text is arguing.",
      },
      {
        label: "B",
        text: "New evidence suggests the plant-fungus relationship is more unequal than the traditional exchange model implies.",
        isCorrect: true,
        rationale: "This captures the pivot at Recent work complicates that picture and the conclusion about leverage.",
      },
      {
        label: "C",
        text: "Carbon movement between neighbouring trees is too variable to measure reliably.",
        distractorType: "plausible_paraphrase",
        rationale: "The researchers did measure it successfully. Variable is not the same as unmeasurable.",
      },
      {
        label: "D",
        text: "Researchers now doubt that fungi benefit plants in any way.",
        distractorType: "too_broad",
        rationale: "Far stronger than the text. It says the exchange is uneven, not that there is no benefit.",
      },
    ],
    explanation:
      "The structure gives the answer. The first sentence presents a long-held view, the second announces that new work complicates it, and the final sentence delivers the verdict: a negotiation in which the fungus holds considerable leverage. The main idea must be the revision, not the view being revised, which rules out A. C misreads variability as unmeasurability, and D overstates a claim about imbalance into a claim about no benefit.",
    patternName: "Old view, pivot, new claim",
    concept: "Identifying the main idea in a passage that revises a prior belief",
    recognitionCues: [
      "A phrase such as have long been described, traditionally, or it was once thought",
      "A pivot word such as however, recent work, or but",
      "A final sentence that evaluates rather than describes",
    ],
    fastestMethod:
      "Find the pivot, then read only the material after it. The main idea of this structure is always the new claim, and the pre-pivot view is the most tempting wrong answer.",
    commonTraps: [
      "Selecting the view the passage is arguing against",
      "Choosing an option that overstates the conclusion",
      "Choosing a detail from the middle of the passage",
    ],
    expectedSeconds: 70,
  },
  {
    id: "rw-central-002",
    skillId: "central-ideas-and-details",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "When the architect Mina Okonjo was commissioned to design a public library in a coastal town facing regular flooding, she declined to raise the building on stilts, the conventional response. Instead she designed a ground floor that could be emptied and sealed within hours, with the collection housed above. Critics called the approach an evasion of the real problem. Okonjo's reply was that a building which merely survives a flood teaches nothing, whereas one that visibly prepares for it makes the risk part of civic life.",
    stem: "Which choice best describes the function of Okonjo's reply in the text as a whole?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "It concedes that her critics identified a genuine weakness in the design.",
        distractorType: "wrong_relationship",
        rationale: "Her reply rejects the criticism rather than conceding to it.",
      },
      {
        label: "B",
        text: "It reframes the purpose of the building so that the critics' standard no longer applies.",
        isCorrect: true,
        rationale: "She shifts the measure of success from surviving the flood to teaching the public about the risk, which makes the criticism beside the point.",
      },
      {
        label: "C",
        text: "It provides technical evidence that the sealed ground floor will withstand flooding.",
        distractorType: "true_but_irrelevant",
        rationale: "No technical evidence appears anywhere in the passage. Her reply is about purpose, not engineering.",
      },
      {
        label: "D",
        text: "It demonstrates that raising buildings on stilts is ineffective against flooding.",
        distractorType: "too_broad",
        rationale: "She never claims stilts fail. She declines the convention for a different reason.",
      },
    ],
    explanation:
      "The critics judge the design by whether it solves the flooding problem. Okonjo answers on a different axis entirely: a building that merely survives teaches nothing, while one that visibly prepares makes risk part of civic life. She is changing what counts as success, which is reframing, not conceding, not providing engineering evidence, and not attacking stilts. Function questions ask what a sentence does, not what it says, so the answer should be a verb describing a move in the argument.",
    patternName: "Function of a quoted reply",
    concept: "Analysing the rhetorical role of a statement within an argument",
    recognitionCues: [
      "The question asks about function or purpose rather than content",
      "A named person responding to criticism",
      "Options beginning with verbs such as concedes, reframes, demonstrates",
    ],
    fastestMethod:
      "Describe in your own words what the sentence is doing before you read the options, then match. Deciding after reading the options is how you get talked into a plausible-sounding wrong answer.",
    commonTraps: [
      "Choosing an option that summarises content instead of identifying function",
      "Choosing an option referring to evidence the passage never supplies",
      "Mistaking a rebuttal for a concession",
    ],
    expectedSeconds: 85,
  },
  {
    id: "rw-central-003",
    skillId: "central-ideas-and-details",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Mediaeval European manuscripts were often recycled. Parchment was costly, so scribes scraped away existing text and wrote over it, producing what scholars call a palimpsest. For centuries the erased layer was considered lost. Multispectral imaging has changed that: by photographing a page under different wavelengths, researchers can recover traces of the removed ink without touching the page. Several works known previously only by title have been read again this way, though the technique works poorly where the original ink contained little iron.",
    stem: "According to the text, which statement about multispectral imaging is true?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "It recovers erased writing without physical contact, but not equally well on all inks.",
        isCorrect: true,
        rationale: "Both halves are stated: without touching the page, and works poorly where the original ink contained little iron.",
      },
      {
        label: "B",
        text: "It has allowed scholars to recover every mediaeval work previously thought lost.",
        distractorType: "too_broad",
        rationale: "The text says several works, and names a limitation. Every is far too strong.",
      },
      {
        label: "C",
        text: "It requires scraping away the upper layer of text before the lower layer can be read.",
        distractorType: "wrong_relationship",
        rationale: "The opposite. Scraping is what mediaeval scribes did; the imaging technique is non-contact.",
      },
      {
        label: "D",
        text: "It works by detecting the iron content of parchment rather than of ink.",
        distractorType: "swapped_values",
        rationale: "The iron is in the ink, not the parchment. The two have been swapped.",
      },
    ],
    explanation:
      "Detail questions reward precision about scope. The passage makes two claims about the imaging: it is non-contact, and it struggles with low-iron ink. A states both accurately. B inflates several works into every work and ignores the stated limitation. C reverses the direction of the technique. D moves the iron from the ink to the parchment. Checking each option against the exact wording, rather than against a general impression, is the whole skill here.",
    patternName: "Detail with a scope limit",
    concept: "Matching an option precisely to stated detail",
    recognitionCues: [
      "The phrase according to the text",
      "A passage containing an explicit limitation or exception",
      "Options using absolute words such as every, all, or never",
    ],
    fastestMethod:
      "Note the limitation sentence before reading the options. The right answer almost always respects it, and absolute words are usually a quick elimination.",
    commonTraps: [
      "Choosing an overstated version of a true claim",
      "Swapping two nouns from the passage",
      "Confusing what the historical actors did with what the modern technique does",
    ],
    expectedSeconds: 75,
  },

  // --- Command of evidence (textual) -------------------------------------
  {
    id: "rw-evtext-001",
    skillId: "command-of-evidence-textual",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "A researcher studying urban crow populations hypothesised that crows in busier districts would be bolder around humans than those in quiet suburbs, because repeated harmless encounters should reduce wariness. She measured flight initiation distance, the distance at which a bird takes off as a person approaches, across twelve districts.",
    stem: "Which finding, if true, would most directly support the researcher's hypothesis?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Crows in the busiest districts had shorter flight initiation distances than those in quiet suburbs.",
        isCorrect: true,
        rationale: "Bolder means allowing a person to get closer, which is a shorter flight initiation distance. This is exactly what the hypothesis predicts.",
      },
      {
        label: "B",
        text: "Crows in the busiest districts had longer flight initiation distances than those in quiet suburbs.",
        distractorType: "wrong_relationship",
        rationale: "This is the opposite result and would undermine the hypothesis.",
      },
      {
        label: "C",
        text: "Crows in busy districts were more numerous than crows in quiet suburbs.",
        distractorType: "true_but_irrelevant",
        rationale: "Population size says nothing about boldness. The hypothesis concerns behaviour, not abundance.",
      },
      {
        label: "D",
        text: "Flight initiation distance was similar across all twelve districts.",
        distractorType: "wrong_relationship",
        rationale: "A null result neither supports the hypothesis nor matches its prediction.",
      },
    ],
    explanation:
      "Work out what the hypothesis predicts in the units actually being measured before looking at the options. Bolder birds let people approach more closely, so boldness means a smaller flight initiation distance. The hypothesis therefore predicts shorter distances in busier districts, which is A. B is the reverse, D is a null result, and C changes the variable from behaviour to population size. The inverse relationship between the word bolder and the number measured is the trap this item is built around.",
    patternName: "Translate the hypothesis into the measured variable",
    concept: "Selecting evidence that matches a prediction",
    recognitionCues: [
      "A stated hypothesis followed by a described measurement",
      "The phrase would most directly support",
      "A measured quantity that runs opposite to the everyday word for the trait",
    ],
    fastestMethod:
      "Write the prediction as an inequality in the measured variable before reading the options, then find the option that matches it.",
    commonTraps: [
      "Reversing the direction because the variable is inverse to the trait",
      "Picking a result about a different variable",
      "Treating a null result as supporting evidence",
    ],
    expectedSeconds: 75,
  },
  {
    id: "rw-evtext-002",
    skillId: "command-of-evidence-textual",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "In her study of nineteenth-century letter writing, the historian Pauline Reyes argues that the penny post did not simply make correspondence cheaper but changed what people felt able to say. Before the reform, postage was usually paid by the recipient, so a letter imposed a cost on the person who received it.",
    stem: "Which quotation from a nineteenth-century source would best support Reyes's argument?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "\"I write now without the old anxiety that my chatter will cost you a shilling you can ill spare.\"",
        isCorrect: true,
        rationale: "It ties the reform directly to a change in what the writer feels able to say, which is precisely Reyes's claim.",
      },
      {
        label: "B",
        text: "\"The new rate has reduced my yearly outlay on postage considerably.\"",
        distractorType: "partial_solution",
        rationale: "This supports only the cheaper half, which Reyes says is not the interesting part of the story.",
      },
      {
        label: "C",
        text: "\"The volume of letters passing through this office has trebled since the reform.\"",
        distractorType: "true_but_irrelevant",
        rationale: "Volume is consistent with her argument but says nothing about the content or freedom of expression.",
      },
      {
        label: "D",
        text: "\"I have received three letters this week, each from a correspondent unknown to me.\"",
        distractorType: "true_but_irrelevant",
        rationale: "It describes an effect on who writes, not on what writers felt able to express.",
      },
    ],
    explanation:
      "Reyes makes a specific claim: the reform changed what people felt able to say, not merely what it cost. The supporting quotation must therefore speak to expression, not price or volume. A does exactly that, naming the old anxiety about imposing a cost and its disappearance. B supports the cheaper claim that Reyes explicitly sets aside. C and D describe quantity and novelty of correspondence, which are real effects but not the one argued for.",
    patternName: "Evidence for the precise claim",
    concept: "Distinguishing the argued claim from an adjacent true claim",
    recognitionCues: [
      "An argument phrased as not simply X but Y",
      "Options that each support something plausible",
      "A quotation task rather than a data task",
    ],
    fastestMethod:
      "Underline the Y half of the not simply X but Y structure. Every wrong option will support X or something near it; only one supports Y.",
    commonTraps: [
      "Choosing evidence for the claim the author is setting aside",
      "Choosing a true statement that addresses a different variable",
      "Assuming any period-appropriate quotation counts as support",
    ],
    expectedSeconds: 90,
  },
  {
    id: "rw-evtext-003",
    skillId: "command-of-evidence-textual",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "A student is writing about the composer Florence Price, whose orchestral works were performed in the 1930s but largely disappeared from concert programmes for decades afterwards. The student wants to argue that the neglect of Price's music reflected institutional habits rather than any judgement about its quality.",
    stem: "Which piece of evidence would most strengthen the student's argument?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Contemporary reviews of Price's symphonies were warm, yet major orchestras programmed almost exclusively from a fixed canon of earlier European composers for the following forty years.",
        isCorrect: true,
        rationale: "It separates quality judgements, which were positive, from programming practice, which was habitual. That is exactly the distinction the argument needs.",
      },
      {
        label: "B",
        text: "Price composed more than three hundred works across many genres.",
        distractorType: "true_but_irrelevant",
        rationale: "Productivity is not evidence about why her work was neglected.",
      },
      {
        label: "C",
        text: "Several of Price's manuscripts were rediscovered in an abandoned house in 2009.",
        distractorType: "true_but_irrelevant",
        rationale: "This explains how the music resurfaced, not why it was neglected in the first place.",
      },
      {
        label: "D",
        text: "Price's music has recently been recorded by several leading ensembles.",
        distractorType: "true_but_irrelevant",
        rationale: "Present-day revival says nothing about the cause of the earlier neglect.",
      },
    ],
    explanation:
      "The argument has two parts that must both be addressed: neglect was not about quality, and it was about institutional habit. Only A speaks to both, pairing warm contemporary reviews with four decades of fixed programming. The others are all true-sounding facts about Price that leave the causal claim untouched. When an argument contrasts two explanations, the strongest evidence rules one out while supporting the other.",
    patternName: "Evidence that rules out the rival explanation",
    concept: "Strengthening a causal claim by eliminating an alternative",
    recognitionCues: [
      "An argument of the form X rather than Y",
      "Options that are biographical facts",
      "A request to strengthen rather than to describe",
    ],
    fastestMethod:
      "Identify both halves of the X rather than Y claim and keep only an option that touches both. Biographical trivia is the standard filler here.",
    commonTraps: [
      "Choosing a fact that is interesting but causally silent",
      "Choosing evidence about the revival instead of the neglect",
      "Supporting only one half of the claim",
    ],
    expectedSeconds: 90,
  },

  // --- Command of evidence (quantitative) --------------------------------
  {
    id: "rw-evquant-001",
    skillId: "command-of-evidence-quantitative",
    format: "mcq",
    stimulusTitle: "Average germination rate of seeds after cold storage",
    stimulus:
      "Storage period      Species M      Species N\n0 months              92%            88%\n6 months              90%            71%\n12 months             87%            54%\n24 months             81%            22%",
    stem: "A botanist claims that the two species differ markedly in how well their seeds tolerate extended cold storage. Which choice best uses data from the table to support this claim?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "After 24 months, germination had fallen by 11 percentage points for Species M but by 66 percentage points for Species N.",
        isCorrect: true,
        rationale: "It compares the change over the full period for both species, which is what tolerance of extended storage means.",
      },
      {
        label: "B",
        text: "At 0 months, Species M germinated at 92 per cent and Species N at 88 per cent.",
        distractorType: "true_but_irrelevant",
        rationale: "Accurate, but a baseline comparison says nothing about tolerance over time.",
      },
      {
        label: "C",
        text: "Species N germinated at 54 per cent after 12 months of storage.",
        distractorType: "partial_solution",
        rationale: "A single figure for one species cannot support a claim about a difference between two.",
      },
      {
        label: "D",
        text: "Both species showed lower germination after 24 months than at 0 months.",
        distractorType: "too_broad",
        rationale: "True of both, and therefore evidence of similarity rather than of a marked difference.",
      },
    ],
    explanation:
      "The claim is comparative and about change over time, so the supporting data must be comparative and about change. A gives both declines over the full 24 months, 11 points against 66, which is exactly the marked difference claimed. B compares the species at a single point, before storage has had any effect. C cites one species only. D describes what the two have in common, which is the opposite of what the claim needs.",
    patternName: "Match the data to the shape of the claim",
    concept: "Selecting quantitative evidence for a comparative claim",
    recognitionCues: [
      "A table with two groups measured repeatedly",
      "A claim containing a comparison word such as differ, more, or faster",
      "Options that each quote the table accurately",
    ],
    fastestMethod:
      "Decide what shape the evidence must take, here a comparison of changes, and reject any option that is a single value or a shared trend, however accurate.",
    commonTraps: [
      "Choosing an accurate figure that does not address the comparison",
      "Choosing data from the baseline row",
      "Choosing a statement of similarity to support a claim of difference",
    ],
    expectedSeconds: 80,
  },
  {
    id: "rw-evquant-002",
    skillId: "command-of-evidence-quantitative",
    format: "mcq",
    stimulusTitle: "Reported weekly cycling, by city, before and after new cycle lanes",
    stimulus:
      "City      Lanes added (km)      Mean trips per week, before      after\nAlderby          48                        1.8                      3.1\nBrightmoor        6                        2.0                      2.1\nCastlewood       52                        1.5                      2.9\nDunmere          4                        1.7                      1.6",
    stem: "Which statement about the data in the table is accurate?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "The two cities that added the most lane kilometres also showed the largest increases in mean weekly trips.",
        isCorrect: true,
        rationale: "Alderby at 48 km rose by 1.3 and Castlewood at 52 km rose by 1.4, both far larger than Brightmoor's 0.1 and Dunmere's decline.",
      },
      {
        label: "B",
        text: "Every city in the table recorded an increase in mean weekly trips.",
        distractorType: "too_broad",
        rationale: "Dunmere fell from 1.7 to 1.6. One counterexample is enough to reject an every claim.",
      },
      {
        label: "C",
        text: "Adding cycle lanes causes a proportional rise in weekly cycling trips.",
        distractorType: "too_broad",
        rationale: "Two problems: the table cannot establish causation, and the rises are not proportional to the kilometres added.",
      },
      {
        label: "D",
        text: "Brightmoor added more lane kilometres than Castlewood.",
        distractorType: "swapped_values",
        rationale: "Brightmoor added 6 km and Castlewood 52 km. The values have been read from the wrong rows.",
      },
    ],
    explanation:
      "Check each option against the rows. A holds: the two large-investment cities, Alderby and Castlewood, show rises of 1.3 and 1.4 trips, while the two small-investment cities show 0.1 and a fall of 0.1. B fails on Dunmere alone. C makes a causal and proportional claim the data cannot support, since this is observational and 52 km produced about the same rise as 48 km. D simply misreads the table. Note how A is carefully worded as an association and so stays within what the data shows.",
    patternName: "Accurate statement about a table",
    concept: "Reading a table without overclaiming",
    recognitionCues: [
      "A multi-column table with before and after values",
      "An option containing every, all, or causes",
      "The question asks which statement is accurate",
    ],
    fastestMethod:
      "Hunt for a counterexample to any absolute option first, since one row usually settles it, then check the remaining options row by row.",
    commonTraps: [
      "Accepting a causal claim from observational data",
      "Missing the single row that breaks an every claim",
      "Confusing two rows when the table is dense",
    ],
    expectedSeconds: 95,
  },
  {
    id: "rw-evquant-003",
    skillId: "command-of-evidence-quantitative",
    format: "mcq",
    stimulusTitle: "Share of households owning a radio set, selected years",
    stimulus:
      "Year      Urban households      Rural households\n1925            18%                   4%\n1930            46%                  14%\n1935            68%                  38%\n1940            81%                  65%",
    stem: "A historian argues that radio ownership spread to rural households later but then closed much of the gap with urban households. Which choice best completes the argument with data from the table?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "In 1925 rural ownership trailed urban ownership by 14 percentage points, and by 1940 the gap had narrowed to 16 points.",
        distractorType: "wrong_relationship",
        rationale: "The arithmetic contradicts the argument: a move from 14 points to 16 points is a widening, not a narrowing.",
      },
      {
        label: "B",
        text: "Rural ownership stood at just 4 per cent in 1925, well behind the urban 18 per cent, but by 1940 it had reached 65 per cent against an urban 81 per cent.",
        isCorrect: true,
        rationale: "It shows the late start and then the near-convergence in both proportional and absolute terms, matching both halves of the argument.",
      },
      {
        label: "C",
        text: "Urban ownership rose steadily from 18 per cent in 1925 to 81 per cent in 1940.",
        distractorType: "partial_solution",
        rationale: "Only urban data. The argument is about the relationship between the two groups.",
      },
      {
        label: "D",
        text: "By 1935 rural ownership had reached 38 per cent, more than twice its 1930 level.",
        distractorType: "partial_solution",
        rationale: "True and relevant to rural growth, but it makes no comparison with urban households and so cannot show a gap closing.",
      },
    ],
    explanation:
      "The argument has two parts: rural adoption started later, and the gap then largely closed. B covers both, moving from 4 against 18 to 65 against 81. A is the sharpest trap, because the raw percentage-point gap actually widens slightly from 14 to 16 points; what closed was the proportional gap, from rural ownership being under a quarter of the urban figure to being about four fifths of it. Since A asserts a narrowing that its own numbers contradict, it is wrong on its face. C and D each give only one group.",
    patternName: "Complete the argument with paired data",
    concept: "Supporting a two-part claim about convergence",
    recognitionCues: [
      "A table with two groups tracked over time",
      "A claim about a gap widening or narrowing",
      "Options quoting one group only",
    ],
    fastestMethod:
      "Check whether the claim is about absolute or proportional change, compute both at the endpoints, and keep only an option that covers both groups.",
    commonTraps: [
      "Confusing a proportional gap with a percentage-point gap",
      "Accepting an option whose numbers contradict its own description",
      "Choosing single-group data for a comparative claim",
    ],
    expectedSeconds: 100,
  },

  // --- Inferences --------------------------------------------------------
  {
    id: "rw-infer-001",
    skillId: "inferences",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Several island bird species that evolved without ground predators lost the ability to fly. On islands where rats were later introduced, these species declined sharply. Yet on a handful of islands where rats arrived but steep terrain kept nesting sites inaccessible, flightless populations persisted at close to their original numbers. This suggests that the decline elsewhere was driven less by the mere presence of rats than by _______",
    stem: "Which choice most logically completes the text?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "the loss of flight itself, which left the birds unable to escape any threat.",
        distractorType: "wrong_relationship",
        rationale: "If flightlessness alone were the cause, the protected island populations would have declined too. The passage is designed to rule this out.",
      },
      {
        label: "B",
        text: "whether rats could physically reach the places where the birds nested.",
        isCorrect: true,
        rationale: "Accessibility of nesting sites is precisely what distinguishes the islands where the birds survived from those where they did not.",
      },
      {
        label: "C",
        text: "the number of rats that were introduced to each island.",
        distractorType: "plausible_paraphrase",
        rationale: "Plausible in general, but the passage gives no data on rat numbers. The stated difference is terrain.",
      },
      {
        label: "D",
        text: "competition between rats and other introduced mammals.",
        distractorType: "true_but_irrelevant",
        rationale: "No other introduced mammals are mentioned anywhere in the text.",
      },
    ],
    explanation:
      "The passage sets up a controlled comparison. Rats were present on both sets of islands, so their presence cannot be the discriminating factor. The only stated difference is that steep terrain made nesting sites inaccessible on the islands where the birds survived. The inference must therefore turn on physical access to nests, which is B. A is ruled out by the surviving populations, and C and D introduce variables the text never mentions.",
    patternName: "Inference from a natural experiment",
    concept: "Drawing a conclusion from the one variable that differs",
    recognitionCues: [
      "A blank at the end of the passage following a word such as suggests or therefore",
      "Two groups described with one stated difference",
      "The construction less by X than by Y",
    ],
    fastestMethod:
      "Find the variable that differs between the two groups, which is almost always named in the sentence just before the blank, and pick the option built on it. Reject anything the passage never mentions.",
    commonTraps: [
      "Choosing a cause the passage explicitly rules out",
      "Introducing outside knowledge that sounds reasonable",
      "Picking an option about a variable the text never measures",
    ],
    expectedSeconds: 80,
  },
  {
    id: "rw-infer-002",
    skillId: "inferences",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Conservators examining a sixteenth-century portrait found that the sitter's hands had been painted over a layer of lead white that extended beyond the current outline of the sleeves. Analysis dated both layers to within a few years of each other, and the pigments in the upper layer matched those used elsewhere in the painting. It is therefore likely that _______",
    stem: "Which choice most logically completes the text?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "the alteration was made by the original artist rather than by a later restorer.",
        isCorrect: true,
        rationale: "Both the close dating and the matching pigments point to the same workshop and period, which is what distinguishes an original revision from a later intervention.",
      },
      {
        label: "B",
        text: "the portrait depicts a different sitter from the one previously identified.",
        distractorType: "too_broad",
        rationale: "Nothing in the evidence concerns the sitter's identity.",
      },
      {
        label: "C",
        text: "the painting was left unfinished for several decades.",
        distractorType: "wrong_relationship",
        rationale: "The dating evidence says the opposite: the layers are within a few years of each other.",
      },
      {
        label: "D",
        text: "lead white was an unusual choice of pigment for the period.",
        distractorType: "true_but_irrelevant",
        rationale: "The passage treats lead white as unremarkable and offers no comparison with other works.",
      },
    ],
    explanation:
      "Two pieces of evidence point the same way: the layers were made within a few years of each other, and the upper pigments match those used elsewhere in the painting. Together these indicate the same hand and the same materials, so the change was a revision by the original artist, not a later restoration. That is A. C contradicts the dating, while B and D concern matters the evidence never touches.",
    patternName: "Converging evidence to a single conclusion",
    concept: "Inferring authorship from technical evidence",
    recognitionCues: [
      "Two or more independent findings reported together",
      "A blank introduced by it is therefore likely that",
      "Technical or scientific detail in a humanities context",
    ],
    fastestMethod:
      "Ask what both findings have in common. The answer is the conclusion they jointly support, and options resting on only one finding or on none are the distractors.",
    commonTraps: [
      "Choosing a conclusion that one piece of evidence contradicts",
      "Drifting to a topic the evidence does not address",
      "Over-reading a single detail",
    ],
    expectedSeconds: 90,
  },
  {
    id: "rw-infer-003",
    skillId: "inferences",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "A manufacturer tested two coatings intended to reduce drag on wind turbine blades. In a wind tunnel, Coating A outperformed Coating B by a wide margin. After eighteen months on operating turbines, however, blades treated with Coating A showed no measurable advantage over untreated blades, while Coating B retained most of its benefit. The most likely explanation is that _______",
    stem: "Which choice most logically completes the text?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Coating A degrades under real operating conditions that the wind tunnel did not reproduce.",
        isCorrect: true,
        rationale: "It explains both results at once: strong initially in a clean test, then no better than nothing after real-world exposure.",
      },
      {
        label: "B",
        text: "the wind tunnel measurements were recorded incorrectly.",
        distractorType: "plausible_paraphrase",
        rationale: "Possible but unsupported, and it fails to explain why Coating B behaved consistently across both settings.",
      },
      {
        label: "C",
        text: "Coating B reduces drag more than Coating A under all conditions.",
        distractorType: "wrong_relationship",
        rationale: "Contradicted directly by the wind tunnel result, where A outperformed B by a wide margin.",
      },
      {
        label: "D",
        text: "drag has little effect on the output of operating turbines.",
        distractorType: "wrong_relationship",
        rationale: "If that were so, Coating B could not have retained a measurable benefit in the field.",
      },
    ],
    explanation:
      "A good explanation has to account for every result, not just the surprising one. Here there are three facts: A beat B in the tunnel, A lost all advantage in the field, and B kept most of its advantage. Only A fits all three, by attributing the collapse to real-world conditions the tunnel left out. C contradicts the tunnel result, D contradicts B's field performance, and B leaves the contrast between the two coatings unexplained.",
    patternName: "Explanation that fits all the results",
    concept: "Choosing a hypothesis consistent with every reported finding",
    recognitionCues: [
      "Laboratory results that conflict with field results",
      "A blank introduced by the most likely explanation is that",
      "Two treatments behaving differently across settings",
    ],
    fastestMethod:
      "List the findings, then test each option against all of them. Discard any option that contradicts even one.",
    commonTraps: [
      "Choosing an explanation that covers only the surprising finding",
      "Blaming measurement error when the data is internally consistent",
      "Picking an option that contradicts a stated result",
    ],
    expectedSeconds: 90,
  },

  // --- Words in context --------------------------------------------------
  {
    id: "rw-words-001",
    skillId: "words-in-context",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Early accounts of the expedition were written by its sponsors and are accordingly _______; they omit the disputes recorded in the crew's private journals and present the voyage as a model of discipline.",
    stem: "Which choice completes the text with the most logical and precise word?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "partial",
        isCorrect: true,
        rationale: "Partial means biased or one-sided, which is exactly what omitting the disputes amounts to. It also fits the formal register.",
      },
      {
        label: "B",
        text: "inscrutable",
        distractorType: "plausible_paraphrase",
        rationale: "Inscrutable means impossible to interpret. The accounts are perfectly clear; the problem is that they are slanted.",
      },
      {
        label: "C",
        text: "exhaustive",
        distractorType: "wrong_relationship",
        rationale: "The opposite of what the semicolon establishes: these accounts leave things out.",
      },
      {
        label: "D",
        text: "tentative",
        distractorType: "plausible_paraphrase",
        rationale: "Tentative means hesitant or provisional. Presenting the voyage as a model of discipline is confident, not hesitant.",
      },
    ],
    explanation:
      "The semicolon introduces an explanation of the blank, so the second clause defines the word needed. Accounts that omit inconvenient material and present a flattering picture are one-sided, which is the sense of partial. Exhaustive contradicts the omission, inscrutable misdescribes clear but slanted writing, and tentative misdescribes a confident account. Note that partial here carries its sense of biased rather than incomplete, and this double meaning is the point of the question.",
    patternName: "Blank defined by the following clause",
    concept: "Using sentence logic to fix a word's meaning",
    recognitionCues: [
      "A semicolon or colon right after the blank",
      "A second clause that explains or illustrates the first",
      "Options at a similar formal register",
    ],
    fastestMethod:
      "Cover the options, read the explaining clause, and write your own word in the blank. Then pick the closest match, which defeats the near-synonyms.",
    commonTraps: [
      "Choosing a word that contradicts the explaining clause",
      "Choosing a hard word because it sounds academic",
      "Missing a secondary meaning of a common word",
    ],
    expectedSeconds: 65,
  },
  {
    id: "rw-words-002",
    skillId: "words-in-context",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Although the composer's late quartets were initially dismissed as formless, later critics came to regard their unusual structures as _______ rather than careless: every apparent digression, they argued, returns transformed in the final movement.",
    stem: "Which choice completes the text with the most logical and precise word?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "ornate",
        distractorType: "plausible_paraphrase",
        rationale: "Ornate describes decoration, not design. The argument is about purposeful structure, not elaborateness.",
      },
      {
        label: "B",
        text: "deliberate",
        isCorrect: true,
        rationale: "The contrast with careless demands a word meaning intentional, and the evidence that digressions return transformed supports exactly that.",
      },
      {
        label: "C",
        text: "conventional",
        distractorType: "wrong_relationship",
        rationale: "The structures are described as unusual, so conventional contradicts the sentence.",
      },
      {
        label: "D",
        text: "derivative",
        distractorType: "wrong_relationship",
        rationale: "Derivative means borrowed from others, which is unrelated to the careless-versus-intentional contrast.",
      },
    ],
    explanation:
      "The phrase rather than careless sets up a direct opposition, so the blank needs the antonym of careless in this context, which is intentional or planned. Deliberate fits, and the colon supplies the proof: digressions that return transformed are evidence of design. Conventional contradicts unusual, ornate shifts the topic to decoration, and derivative is about originality rather than intent.",
    patternName: "Blank fixed by an explicit contrast",
    concept: "Using rather than or instead of to pin down meaning",
    recognitionCues: [
      "The structure X rather than Y, where Y is given",
      "A colon supplying supporting evidence",
      "Options that are all plausible critical vocabulary",
    ],
    fastestMethod:
      "Find the word the blank is being contrasted with, then look for its opposite. The contrast word is handed to you, so this should be quick.",
    commonTraps: [
      "Choosing a word that contradicts another part of the sentence",
      "Picking a term from the same subject area that does not fit the logic",
      "Ignoring the explicit contrast marker",
    ],
    expectedSeconds: 70,
  },
  {
    id: "rw-words-003",
    skillId: "words-in-context",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The committee's report stops short of endorsing the proposal outright, but its praise for the pilot scheme and its silence on the objections raised last year together _______ a shift in position.",
    stem: "Which choice completes the text with the most logical and precise word?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "proclaim",
        distractorType: "too_broad",
        rationale: "Proclaim is loud and explicit, which clashes with a report that stops short of endorsing anything outright.",
      },
      {
        label: "B",
        text: "intimate",
        isCorrect: true,
        rationale: "To intimate is to indicate indirectly, which matches evidence consisting of praise and silence rather than a stated endorsement.",
      },
      {
        label: "C",
        text: "dispute",
        distractorType: "wrong_relationship",
        rationale: "The evidence points towards the shift, not against it.",
      },
      {
        label: "D",
        text: "mandate",
        distractorType: "wrong_relationship",
        rationale: "Mandate means require or authorise. A report cannot require a shift that it has already undergone.",
      },
    ],
    explanation:
      "The sentence turns on indirectness: the report avoids an outright endorsement, and the evidence is praise plus silence. The verb must therefore mean to suggest without stating, which is intimate. Proclaim is too strong for a document being careful not to commit itself, dispute reverses the direction, and mandate is the wrong kind of verb entirely. Matching the strength of a word to the hedging in the sentence is the skill being tested.",
    patternName: "Match verb strength to hedged evidence",
    concept: "Choosing a word with the right degree of force",
    recognitionCues: [
      "Hedging language such as stops short of or does not quite",
      "Evidence described as indirect, including silence or omission",
      "Options ranging from weak to emphatic",
    ],
    fastestMethod:
      "Gauge how strong the sentence allows the claim to be. Indirect evidence takes a tentative verb, so eliminate the emphatic options first.",
    commonTraps: [
      "Choosing a word that overstates a deliberately cautious claim",
      "Reversing the direction of the inference",
      "Choosing a verb whose grammar does not fit the sentence",
    ],
    expectedSeconds: 75,
  },

  // --- Text structure and purpose ----------------------------------------
  {
    id: "rw-structure-001",
    skillId: "text-structure-and-purpose",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Economists once treated commuting time as a straightforward cost that workers accept in exchange for cheaper housing. The model predicts that people will move until the saving on rent just balances the burden of travel. Surveys, though, repeatedly find commuters reporting lower life satisfaction than the model implies they should tolerate. One response is that the balance is struck not once but continually, and that households systematically underestimate how much a long journey will wear on them.",
    stem: "Which choice best describes the overall structure of the text?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "It presents a model, notes evidence that conflicts with it, and offers an explanation for the discrepancy.",
        isCorrect: true,
        rationale: "That is the sequence exactly: the trade-off model, the survey findings that sit awkwardly with it, then the underestimation account.",
      },
      {
        label: "B",
        text: "It describes a long-running debate and takes a side in it.",
        distractorType: "wrong_relationship",
        rationale: "No two camps are described, and the final sentence is offered as one response rather than as the author's verdict.",
      },
      {
        label: "C",
        text: "It defines a technical term and illustrates it with survey data.",
        distractorType: "partial_solution",
        rationale: "No term is defined, and the survey data creates a problem rather than illustrating anything.",
      },
      {
        label: "D",
        text: "It rejects an economic model and proposes replacing it with survey evidence.",
        distractorType: "too_broad",
        rationale: "The model is complicated, not rejected, and survey evidence is not proposed as a replacement for a model.",
      },
    ],
    explanation:
      "Track the moves sentence by sentence. Sentences one and two set out a model and its prediction. Sentence three introduces conflicting evidence, flagged by though. Sentence four offers a reconciliation, flagged by one response is. That is model, then tension, then explanation, which is A. D overstates complication into rejection, a very common wrong answer in structure questions.",
    patternName: "Model, tension, reconciliation",
    concept: "Identifying the organisational pattern of a passage",
    recognitionCues: [
      "The question asks about overall structure",
      "Transition words such as though, however, or one response",
      "Options phrased as sequences of moves",
    ],
    fastestMethod:
      "Label each sentence with a one-word move, such as claim, evidence, objection or resolution, then match the resulting sequence to an option.",
    commonTraps: [
      "Choosing an option that overstates qualification as rejection",
      "Choosing a structure that describes only part of the passage",
      "Inventing a debate where only one account is given",
    ],
    expectedSeconds: 90,
  },
  {
    id: "rw-structure-002",
    skillId: "text-structure-and-purpose",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The following text is from a nineteenth-century naturalist's field notebook.\n\nI had expected the colony to abandon the ledge once the gulls arrived. It did not. For three days the smaller birds held their ground, crowding together at the approach of each intruder and dispersing the moment it withdrew. I record this because every account I had read led me to expect flight, and I would rather set down what I saw than what I was prepared to see.",
    stem: "Which choice best describes the function of the final sentence in the text as a whole?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "It explains why the writer considers the observation worth reporting despite conflicting with existing accounts.",
        isCorrect: true,
        rationale: "The sentence gives the reason for recording the episode, namely that evidence should outrank expectation.",
      },
      {
        label: "B",
        text: "It concedes that the writer's observation was probably mistaken.",
        distractorType: "wrong_relationship",
        rationale: "The opposite: the writer trusts the observation over the received accounts.",
      },
      {
        label: "C",
        text: "It summarises the behaviour of the smaller birds over the three days.",
        distractorType: "partial_solution",
        rationale: "That is the job of the preceding sentence. The final sentence is about the writer's reasons, not the birds.",
      },
      {
        label: "D",
        text: "It proposes a hypothesis to explain why the colony did not abandon the ledge.",
        distractorType: "true_but_irrelevant",
        rationale: "No explanation of the birds' behaviour is offered anywhere in the text.",
      },
    ],
    explanation:
      "The final sentence turns from the birds to the writer's own practice: I record this because, and then a statement of method, preferring what was seen to what was expected. Its function is to justify reporting an anomalous observation, which is A. C describes the previous sentence, B inverts the writer's attitude, and D supplies a hypothesis the text never gives. Function questions are about the role a sentence plays, so look for what changes when it appears.",
    patternName: "Function of a closing justification",
    concept: "Role of a methodological aside in a first-person account",
    recognitionCues: [
      "A first-person narrator commenting on their own record-keeping",
      "A question about the function of a specific sentence",
      "A phrase such as I record this because",
    ],
    fastestMethod:
      "Ask what would be lost if the sentence were deleted. Here you would lose the writer's reason for including a surprising observation.",
    commonTraps: [
      "Describing the content of a neighbouring sentence instead",
      "Mistaking confidence for concession",
      "Assuming an explanation is offered when none is",
    ],
    expectedSeconds: 85,
  },
  {
    id: "rw-structure-003",
    skillId: "text-structure-and-purpose",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "A city council published a plan to plant twenty thousand trees over a decade. The plan sets out species choices, planting locations and a maintenance budget for the first three years. It does not say who becomes responsible for watering in years four to ten, nor what happens if a planted tree dies. Since roughly a third of urban saplings fail within five years, these omissions are not administrative details.",
    stem: "What is the main rhetorical purpose of the text?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "To argue that a specific gap in a published plan is consequential rather than minor",
        isCorrect: true,
        rationale: "The final sentence makes exactly this move, using the sapling failure rate to show the omissions matter.",
      },
      {
        label: "B",
        text: "To praise the council for the thoroughness of its planting plan",
        distractorType: "wrong_relationship",
        rationale: "The text credits the plan's detail only to set up the criticism that follows.",
      },
      {
        label: "C",
        text: "To explain why urban saplings fail at such high rates",
        distractorType: "true_but_irrelevant",
        rationale: "The failure rate is cited as evidence, not explained. No causes are given.",
      },
      {
        label: "D",
        text: "To recommend a specific maintenance budget for years four to ten",
        distractorType: "too_broad",
        rationale: "No recommendation of any kind is made. The text identifies a gap without proposing a figure.",
      },
    ],
    explanation:
      "The passage spends two sentences establishing what the plan covers, one on what it omits, and a final sentence insisting those omissions are not administrative details. The purpose is therefore to argue that a particular gap matters, which is A. B mistakes setup for endorsement, C treats the evidence as the topic, and D supplies a recommendation the text never makes.",
    patternName: "Setup then critique",
    concept: "Distinguishing rhetorical purpose from topic",
    recognitionCues: [
      "The question asks for main rhetorical purpose",
      "A passage that describes something before turning on it",
      "A final sentence beginning with since, yet, or but",
    ],
    fastestMethod:
      "Read the last sentence first. In a short argumentative passage it almost always carries the purpose, and the earlier sentences are groundwork.",
    commonTraps: [
      "Reading descriptive setup as the author's own endorsement",
      "Confusing a piece of supporting evidence with the subject of the text",
      "Choosing an option that proposes a solution the text withholds",
    ],
    expectedSeconds: 75,
  },

  // --- Cross-text connections --------------------------------------------
  {
    id: "rw-crosstext-001",
    skillId: "cross-text-connections",
    format: "mcq",
    stimulusTitle: "Text 1 and Text 2",
    stimulus:
      "Text 1\nMuseums holding artefacts acquired during colonial rule should return them to their countries of origin. Ownership obtained under coercion is not ownership, and no amount of subsequent care converts it into a legitimate title.\n\nText 2\nThe case for return is strong where acquisition was plainly coercive. But many objects reached European collections through purchase, gift or exchange whose circumstances are now impossible to reconstruct. Treating every colonial-era acquisition as theft collapses distinctions that the historical record, where it survives, actually supports.",
    stem: "Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "By agreeing with its moral principle but objecting that it is applied too indiscriminately",
        isCorrect: true,
        rationale: "Text 2 grants that coercive acquisition warrants return, then objects to treating every acquisition as coercive.",
      },
      {
        label: "B",
        text: "By rejecting the principle that coercive acquisition undermines ownership",
        distractorType: "wrong_relationship",
        rationale: "Text 2 explicitly accepts it: the case for return is strong where acquisition was plainly coercive.",
      },
      {
        label: "C",
        text: "By arguing that museums provide better care for artefacts than their countries of origin",
        distractorType: "true_but_irrelevant",
        rationale: "Text 2 makes no claim about standards of care. That argument appears nowhere in either text.",
      },
      {
        label: "D",
        text: "By insisting that the historical record is too fragmentary to support any conclusions",
        distractorType: "too_broad",
        rationale: "Text 2 appeals to the historical record where it survives, so it treats the record as partly usable, not useless.",
      },
    ],
    explanation:
      "Separate what Text 2 concedes from what it disputes. It concedes the moral principle, granting that plainly coercive acquisition justifies return. It disputes the scope, arguing that many acquisitions cannot be shown to be coercive and that treating them all as theft erases real distinctions. That combination is A. B contradicts the concession, D overstates the point about records, and C imports an argument neither text makes.",
    patternName: "Concede the principle, dispute the scope",
    concept: "Comparing the positions of two authors",
    recognitionCues: [
      "Two short texts on the same issue",
      "A question about how one author would respond to the other",
      "Text 2 opening with a concession such as the case is strong where",
    ],
    fastestMethod:
      "Write down what Text 2 agrees with and what it rejects before reading the options. Most wrong answers either erase the concession or invent a disagreement.",
    commonTraps: [
      "Treating a partial agreement as a flat rejection",
      "Importing a familiar argument that neither text makes",
      "Overstating a qualified claim about evidence",
    ],
    expectedSeconds: 100,
  },
  {
    id: "rw-crosstext-002",
    skillId: "cross-text-connections",
    format: "mcq",
    stimulusTitle: "Text 1 and Text 2",
    stimulus:
      "Text 1\nStudies of bilingual children consistently report an advantage in tasks requiring attention to be switched between rules. The usual explanation is that managing two languages exercises the same control mechanisms the tasks measure.\n\nText 2\nWhen the bilingual advantage is tested in large samples drawn without regard to who volunteers, the effect shrinks and often disappears. Small studies finding large effects are easier to publish than small studies finding none, and the literature reflects that filter rather than the underlying phenomenon.",
    stem: "Which choice best describes a difference in how the two texts treat the bilingual advantage?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "Text 1 reports it as an established finding, whereas Text 2 argues the published record overstates it.",
        isCorrect: true,
        rationale: "Text 1 says studies consistently report it; Text 2 attributes the apparent consistency to publication bias.",
      },
      {
        label: "B",
        text: "Text 1 explains its cause, whereas Text 2 proposes a different cause for the same effect.",
        distractorType: "wrong_relationship",
        rationale: "Text 2 questions whether the effect is real at the reported size; it does not offer a rival cause for it.",
      },
      {
        label: "C",
        text: "Text 1 relies on large samples, whereas Text 2 relies on small ones.",
        distractorType: "swapped_values",
        rationale: "Reversed. It is Text 2 that invokes large samples, and it criticises the small studies.",
      },
      {
        label: "D",
        text: "Both texts reject the advantage, but for different reasons.",
        distractorType: "wrong_relationship",
        rationale: "Text 1 does not reject it at all; it reports and explains it.",
      },
    ],
    explanation:
      "Text 1 treats the advantage as a settled result and moves on to explaining the mechanism. Text 2 attacks the evidential base itself: in large, non-volunteer samples the effect shrinks or vanishes, and the literature is shaped by what gets published. So the difference is established finding against overstated record, which is A. B misreads a challenge to the evidence as an alternative explanation, the subtlest trap here. C reverses which text appeals to large samples.",
    patternName: "Disagreement about evidence, not mechanism",
    concept: "Identifying the level at which two texts disagree",
    recognitionCues: [
      "One text explaining a phenomenon and another questioning the evidence for it",
      "Mentions of sample size, publication or replication",
      "Options distinguishing cause from existence",
    ],
    fastestMethod:
      "Decide whether the disagreement is about whether the effect is real or about why it happens. That single distinction usually eliminates three options.",
    commonTraps: [
      "Confusing a methodological critique with a rival explanation",
      "Swapping which text relies on which kind of evidence",
      "Assuming both authors must disagree with the finding",
    ],
    expectedSeconds: 110,
  },
  {
    id: "rw-crosstext-003",
    skillId: "cross-text-connections",
    format: "mcq",
    stimulusTitle: "Text 1 and Text 2",
    stimulus:
      "Text 1\nRemote working reduces commuting and therefore emissions. A workforce at home is a smaller environmental burden than one travelling daily to a shared office.\n\nText 2\nHome working moves energy use rather than removing it. Heating and cooling many small dwellings is less efficient than conditioning one building, and remote workers in surveys report more non-commuting car journeys and more long-distance travel.",
    stem: "Based on the texts, the author of Text 2 would most likely characterise the reasoning in Text 1 as",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "incomplete, because it counts the emissions avoided without counting those created elsewhere.",
        isCorrect: true,
        rationale: "Text 2's two points, dwelling efficiency and extra journeys, are both emissions Text 1 leaves out of the ledger.",
      },
      {
        label: "B",
        text: "mistaken, because remote working does not in fact reduce commuting.",
        distractorType: "wrong_relationship",
        rationale: "Text 2 never disputes that commuting falls. It disputes that the net effect follows.",
      },
      {
        label: "C",
        text: "sound, but applicable only to large organisations.",
        distractorType: "true_but_irrelevant",
        rationale: "Organisation size is not raised by either text.",
      },
      {
        label: "D",
        text: "irrelevant, because emissions are not a useful measure of environmental burden.",
        distractorType: "too_broad",
        rationale: "Text 2 argues in terms of energy use and emissions itself, so it cannot be rejecting the measure.",
      },
    ],
    explanation:
      "Text 1 reasons from one true premise, commuting falls, to a conclusion about total burden. Text 2 accepts the premise but adds offsetting costs: less efficient heating of many homes, plus more non-commuting and long-distance travel. The objection is therefore that the accounting is partial, which is A. B attacks a premise Text 2 actually grants, and D would undercut Text 2's own argument.",
    patternName: "Incomplete accounting objection",
    concept: "Recognising an objection that adds omitted costs rather than denying a premise",
    recognitionCues: [
      "Text 1 drawing a net conclusion from a single effect",
      "Text 2 introducing additional effects in the opposite direction",
      "Options distinguishing incomplete from mistaken",
    ],
    fastestMethod:
      "Check whether the second text denies the first text's premise or adds something to it. Adding means incomplete; denying means mistaken.",
    commonTraps: [
      "Choosing mistaken when the premise is actually conceded",
      "Choosing an option that would undermine the critic's own argument",
      "Introducing a distinction neither text draws",
    ],
    expectedSeconds: 95,
  },
];
