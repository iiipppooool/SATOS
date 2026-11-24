import type { SeedQuestion } from "../types";

export const RW_WRITING_QUESTIONS: SeedQuestion[] = [
  // --- Rhetorical synthesis ----------------------------------------------
  {
    id: "rw-synth-001",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- Lichens are composite organisms made of a fungus and an alga or cyanobacterium.\n- They grow extremely slowly, often less than one millimetre a year.\n- Because growth rates are predictable, lichen size can be used to date rock surfaces.\n- This dating method is called lichenometry.\n- Lichenometry has been used to date glacial moraines in Norway and Iceland.",
    stem: "The student wants to explain why lichens are useful for dating rock surfaces. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Lichens are composite organisms made of a fungus and an alga or cyanobacterium.",
        distractorType: "true_but_irrelevant",
        rationale: "Accurate, but it says nothing about dating. The goal is to explain the usefulness for dating.",
      },
      {
        label: "B",
        text: "Because lichens grow slowly at predictable rates, their size can be used to date rock surfaces, a method known as lichenometry.",
        isCorrect: true,
        rationale: "It supplies the cause, predictable slow growth, and connects it to the use, which is exactly the stated goal.",
      },
      {
        label: "C",
        text: "Lichenometry has been used to date glacial moraines in Norway and Iceland.",
        distractorType: "partial_solution",
        rationale: "An application of the method, not an explanation of why it works.",
      },
      {
        label: "D",
        text: "Lichens, which grow less than one millimetre a year, are found on rock surfaces in Norway and Iceland.",
        distractorType: "true_but_irrelevant",
        rationale: "It combines two true notes but never mentions dating, so it misses the goal entirely.",
      },
    ],
    explanation:
      "Read the goal first, then test each option against it alone. The goal is to explain why lichens are useful for dating, so the answer needs the mechanism, predictable slow growth, linked to the outcome, dating rock surfaces. B does both. A defines lichens, C gives an application, and D merges facts without addressing dating. All four options are factually accurate, so accuracy is not the test; fitness for the stated goal is.",
    patternName: "Match the sentence to the stated goal",
    concept: "Selecting information that serves a specific rhetorical aim",
    recognitionCues: [
      "A bulleted set of notes followed by a stated goal",
      "Options that are all factually consistent with the notes",
      "A goal containing a purpose word such as explain, emphasise or compare",
    ],
    fastestMethod:
      "Underline the goal verb and its object, then reject any option that does not do that specific job. Never pick on the basis that an option is true.",
    commonTraps: [
      "Choosing a true statement that serves a different purpose",
      "Choosing an example when an explanation was requested",
      "Choosing the option that uses the most notes",
    ],
    expectedSeconds: 75,
  },
  {
    id: "rw-synth-002",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- The Antikythera mechanism is a geared bronze device recovered from a shipwreck in 1901.\n- It dates from roughly the second century BCE.\n- X-ray imaging in 2006 revealed at least thirty interlocking gears.\n- It modelled the positions of the sun and moon and predicted eclipses.\n- No comparable geared device is known from the following thousand years.",
    stem: "The student wants to emphasise how unusual the mechanism's sophistication was for its period. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "The Antikythera mechanism, recovered from a shipwreck in 1901, dates from roughly the second century BCE.",
        distractorType: "true_but_irrelevant",
        rationale: "Dates and discovery, but no comparison and no indication of sophistication.",
      },
      {
        label: "B",
        text: "X-ray imaging carried out in 2006 revealed that the mechanism contains at least thirty interlocking gears.",
        distractorType: "partial_solution",
        rationale: "It establishes complexity but offers nothing about the period, so the unusualness is left unstated.",
      },
      {
        label: "C",
        text: "With at least thirty interlocking gears, the second-century BCE mechanism has no known counterpart for the next thousand years.",
        isCorrect: true,
        rationale: "It pairs the complexity with the absence of comparable devices, which is what makes the sophistication unusual for its period.",
      },
      {
        label: "D",
        text: "The mechanism modelled the positions of the sun and moon and predicted eclipses.",
        distractorType: "partial_solution",
        rationale: "It describes function rather than unusualness, and again makes no comparison.",
      },
    ],
    explanation:
      "To emphasise that something was unusual for its period you need two things: evidence of the quality in question, and a comparison that shows it standing out. C has both, putting the thirty gears next to the thousand-year absence of anything comparable. B gives only the complexity, D only the function, A only the provenance. When a goal uses a comparative word such as unusual, unprecedented or exceptional, the correct option almost always contains an explicit comparison.",
    patternName: "Comparative goal needs a comparison",
    concept: "Combining notes to achieve a comparative emphasis",
    recognitionCues: [
      "A goal using a word such as unusual, remarkable, or unprecedented",
      "One note that provides a contrast or an absence",
      "Options that each use one or two notes",
    ],
    fastestMethod:
      "Find the note containing the contrast, often phrased as an absence or a first, and keep only options that use it.",
    commonTraps: [
      "Choosing an option that establishes the quality but not its rarity",
      "Choosing the most technically detailed option",
      "Ignoring the note that supplies the comparison",
    ],
    expectedSeconds: 80,
  },
  {
    id: "rw-synth-003",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- Saffron is harvested from the stigmas of the Crocus sativus flower.\n- Each flower produces three stigmas, which must be removed by hand.\n- About 150,000 flowers are needed to produce one kilogram of dried saffron.\n- Harvesting takes place over two to three weeks in autumn.\n- Saffron is the most expensive spice by weight.",
    stem: "The student wants to explain the reason for saffron's high price. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Saffron is the most expensive spice by weight, and it is harvested in autumn over two to three weeks.",
        distractorType: "wrong_relationship",
        rationale: "It restates the price and adds timing, but timing is not presented as the reason. It states the fact to be explained rather than explaining it.",
      },
      {
        label: "B",
        text: "Saffron comes from the stigmas of the Crocus sativus flower, of which each plant produces three.",
        distractorType: "partial_solution",
        rationale: "Botanical detail without the scale that makes the labour cost clear.",
      },
      {
        label: "C",
        text: "Because around 150,000 hand-picked flowers are required for a single kilogram, saffron is the most expensive spice by weight.",
        isCorrect: true,
        rationale: "It gives the cause, enormous hand labour per kilogram, and links it explicitly to the high price.",
      },
      {
        label: "D",
        text: "Saffron harvesting takes place over two to three weeks in autumn, when the flowers bloom.",
        distractorType: "true_but_irrelevant",
        rationale: "Seasonality alone does not explain the price, and the note does not connect them.",
      },
    ],
    explanation:
      "An explanation needs a because, whether stated or implied. The notes supply one: 150,000 hand-picked flowers per kilogram is an enormous labour input, and that is what makes the spice costly. C states that relationship directly. A simply repeats the fact that needs explaining, which is the most common trap in this question type, and B and D give details that do not bear on price.",
    patternName: "Explanatory goal needs a causal link",
    concept: "Using notes to supply a reason rather than a restatement",
    recognitionCues: [
      "A goal using the word explain or reason",
      "A note quantifying an input such as labour, time or material",
      "An option that merely restates the thing to be explained",
    ],
    fastestMethod:
      "Ask which note could follow the word because. That note belongs in the answer, and any option that just restates the outcome is out.",
    commonTraps: [
      "Restating the fact instead of explaining it",
      "Choosing descriptive detail with no causal bearing",
      "Picking an option that joins two notes with no logical link",
    ],
    expectedSeconds: 70,
  },

  // --- Transitions -------------------------------------------------------
  {
    id: "rw-trans-001",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Nearly all the heat absorbed by the planet's surface each year is radiated back out again. _______ a small persistent imbalance between what arrives and what leaves is enough to warm the oceans measurably over decades.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Nevertheless,",
        isCorrect: true,
        rationale: "The second sentence runs against the expectation created by the first, so a contrast transition is needed.",
      },
      {
        label: "B",
        text: "Consequently,",
        distractorType: "wrong_relationship",
        rationale: "The imbalance is not a consequence of the heat balancing out. The relationship is contrastive.",
      },
      {
        label: "C",
        text: "For example,",
        distractorType: "wrong_relationship",
        rationale: "A persistent imbalance is not an example of heat being radiated back out; it is the exception to it.",
      },
      {
        label: "D",
        text: "Similarly,",
        distractorType: "wrong_relationship",
        rationale: "The two sentences point in opposite directions, so similarly misdescribes the link.",
      },
    ],
    explanation:
      "Strip each sentence to its claim. First: almost all the heat leaves again, which implies nothing much changes. Second: a small imbalance warms the oceans measurably, which is a significant change. The second cuts against what the first leads you to expect, so the link is concessive and Nevertheless fits. The reliable method is to decide the relationship in your own words, same direction, opposite direction, cause, or example, before reading any option.",
    patternName: "Opposite-direction transition",
    concept: "Identifying a contrastive logical relationship",
    recognitionCues: [
      "A sentence that sets up an expectation followed by one that undercuts it",
      "Words such as small, persistent, or enough in the second sentence",
      "Options spanning contrast, cause and exemplification",
    ],
    fastestMethod:
      "Label the relationship yourself in one word before looking at the options, then choose the transition in that category. Four plausible transitions become one quickly.",
    commonTraps: [
      "Choosing a cause transition where the link is contrast",
      "Treating an exception as an example",
      "Choosing by which transition sounds most academic",
    ],
    expectedSeconds: 55,
  },
  {
    id: "rw-trans-002",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The team's first attempt used a single camera and could not judge distance reliably. The second added a laser rangefinder, which solved the distance problem but failed in bright sunlight. _______ the third design combined two cameras set a fixed distance apart, recovering depth from the difference between the two images.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "In contrast,",
        distractorType: "wrong_relationship",
        rationale: "The third design continues a sequence of attempts rather than contrasting with the second as a category.",
      },
      {
        label: "B",
        text: "Finally,",
        isCorrect: true,
        rationale: "The passage lists attempts in order, first, second, third, so a sequencing transition is what the structure calls for.",
      },
      {
        label: "C",
        text: "Admittedly,",
        distractorType: "wrong_relationship",
        rationale: "Admittedly signals a concession, but nothing is being conceded here.",
      },
      {
        label: "D",
        text: "Because of this,",
        distractorType: "wrong_relationship",
        rationale: "This asserts causation. The third design follows the second in sequence but is not caused by it.",
      },
    ],
    explanation:
      "The giveaway is the explicit ordinal sequence: first attempt, second, then third. That is a list, so the transition should mark position in the list, and Finally does. In contrast would be right if the third design were being set against the others as a type rather than as the next item, Because of this asserts a causal link the text does not make, and Admittedly introduces a concession that never arrives.",
    patternName: "Sequencing transition in an ordered list",
    concept: "Recognising sequence rather than contrast or cause",
    recognitionCues: [
      "Ordinal words such as first, second, third in the passage",
      "A series of attempts, stages or steps",
      "Options mixing sequence, contrast and causation",
    ],
    fastestMethod:
      "Scan for ordinals before reading the options. If the passage is counting, the transition marks the count.",
    commonTraps: [
      "Choosing contrast because consecutive items differ",
      "Asserting causation between items in a sequence",
      "Choosing a concessive transition with nothing to concede",
    ],
    expectedSeconds: 55,
  },
  {
    id: "rw-trans-003",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Archivists had assumed the collection was catalogued in the order the documents were received. The dates on the folders, however, run backwards through the middle third of the sequence. _______ the arrangement must reflect some principle other than date of arrival.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "By contrast,",
        distractorType: "wrong_relationship",
        rationale: "The third sentence draws a conclusion from the second rather than contrasting with it. The contrast has already happened at however.",
      },
      {
        label: "B",
        text: "Thus,",
        isCorrect: true,
        rationale: "The final sentence is the inference that follows from the backwards dates, so a conclusive transition is needed.",
      },
      {
        label: "C",
        text: "Granted,",
        distractorType: "wrong_relationship",
        rationale: "Granted concedes a point to an opponent, but the sentence states the author's own conclusion.",
      },
      {
        label: "D",
        text: "Meanwhile,",
        distractorType: "wrong_relationship",
        rationale: "Meanwhile marks simultaneity in time, which is irrelevant to a logical inference.",
      },
    ],
    explanation:
      "Watch where the contrast already sits. Sentence two overturns the assumption in sentence one, and however does that work. Sentence three then draws the consequence: the arrangement must follow some other principle. That is an inference, so Thus is correct. Choosing By contrast duplicates a relationship that has already been marked, which is the trap. If a transition is already present nearby, the next connective usually plays a different role.",
    patternName: "Conclusion after the contrast is already marked",
    concept: "Distinguishing inference from contrast",
    recognitionCues: [
      "A transition such as however already present in the previous sentence",
      "A final sentence containing must, therefore, or cannot",
      "Options offering a second contrast",
    ],
    fastestMethod:
      "Note any transition already in the passage. The blank almost never repeats the same relationship, and a sentence containing must is an inference.",
    commonTraps: [
      "Marking contrast twice in a row",
      "Confusing a logical consequence with a temporal one",
      "Choosing a concession for the author's own conclusion",
    ],
    expectedSeconds: 65,
  },

  // --- Boundaries --------------------------------------------------------
  {
    id: "rw-bound-001",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The storm had moved offshore by dawn _______ the harbour wall was still closed to the public while engineers assessed the damage.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: ", however",
        distractorType: "comma_splice",
        rationale: "However is not a conjunction, so a comma on each side of it leaves two independent clauses joined by a comma: a splice.",
      },
      {
        label: "B",
        text: "; however,",
        isCorrect: true,
        rationale: "A semicolon can join two independent clauses, and however then works as an adverb introducing the second.",
      },
      {
        label: "C",
        text: ", however;",
        distractorType: "comma_splice",
        rationale: "The punctuation is the wrong way round. The semicolon must come at the boundary between the clauses, before however.",
      },
      {
        label: "D",
        text: "however",
        distractorType: "comma_splice",
        rationale: "With no punctuation at all the two independent clauses run together.",
      },
    ],
    explanation:
      "Check whether each side of the blank can stand alone. The storm had moved offshore by dawn is a complete sentence, and the harbour wall was still closed to the public is a complete sentence. Two independent clauses need a full stop, a semicolon, or a comma plus a coordinating conjunction such as and, but or so. However is an adverb, not a conjunction, so it cannot do the joining. The semicolon does the work and however follows with its comma.",
    patternName: "Two independent clauses with a transitional adverb",
    concept: "Punctuating sentence boundaries around however, therefore and moreover",
    recognitionCues: [
      "A word such as however, therefore, moreover or consequently at the boundary",
      "Complete sentences on both sides of the blank",
      "Options differing only in punctuation",
    ],
    fastestMethod:
      "Test both sides for independence first. If both stand alone, you need a full stop or a semicolon; a comma alone is never enough unless a true conjunction is present.",
    commonTraps: [
      "Treating however as if it were a coordinating conjunction",
      "Putting the semicolon after however instead of before",
      "Choosing the option that sounds smoothest when read aloud",
    ],
    expectedSeconds: 55,
  },
  {
    id: "rw-bound-002",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The exhibition brings together three artists working in very different materials _______ glass, reclaimed steel and handmade paper.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: ":",
        isCorrect: true,
        rationale: "The first part is a complete sentence and what follows is a list that specifies the materials, which is exactly what a colon introduces.",
      },
      {
        label: "B",
        text: ";",
        distractorType: "fragment",
        rationale: "A semicolon joins two independent clauses, but glass, reclaimed steel and handmade paper is a list, not a clause.",
      },
      {
        label: "C",
        text: ",",
        distractorType: "comma_splice",
        rationale: "A bare comma cannot introduce a specifying list after a complete statement, and it reads as though the artists are being listed.",
      },
      {
        label: "D",
        text: "no punctuation",
        distractorType: "fragment",
        rationale: "With no punctuation, materials runs straight into glass and the sentence becomes ungrammatical.",
      },
    ],
    explanation:
      "A colon introduces something that specifies or completes what precedes it, and the material before the colon must be a complete sentence. Here it is: the exhibition brings together three artists working in very different materials. What follows names those materials, so the colon is correct. The semicolon fails because the list is not an independent clause, and the comma leaves the relationship ambiguous.",
    patternName: "Colon before a specifying list",
    concept: "When a colon rather than a semicolon or comma is required",
    recognitionCues: [
      "A complete statement followed by a list or an explanation",
      "A noun such as materials, reasons or features just before the blank",
      "Options offering colon, semicolon, comma and nothing",
    ],
    fastestMethod:
      "Confirm the left side is a complete sentence and that the right side specifies it. That combination is a colon every time.",
    commonTraps: [
      "Using a semicolon before a list",
      "Using a comma where the list specifies rather than continues",
      "Checking only the right-hand side of the punctuation",
    ],
    expectedSeconds: 50,
  },
  {
    id: "rw-bound-003",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Having spent two seasons mapping the cave system _______ the surveyors produced the first accurate plan of its lower galleries.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: ",",
        isCorrect: true,
        rationale: "A comma correctly separates the introductory participial phrase from the main clause that follows.",
      },
      {
        label: "B",
        text: ";",
        distractorType: "fragment",
        rationale: "Having spent two seasons mapping the cave system is not an independent clause, so it cannot sit on its own before a semicolon.",
      },
      {
        label: "C",
        text: ":",
        distractorType: "fragment",
        rationale: "A colon also requires a complete sentence before it, and this opening phrase is not one.",
      },
      {
        label: "D",
        text: "no punctuation",
        distractorType: "comma_splice",
        rationale: "Omitting the comma makes the reader run the introductory phrase into the subject, which Standard English does not allow here.",
      },
    ],
    explanation:
      "The opening is a participial phrase beginning with Having, which cannot stand alone. Semicolons and colons both demand a complete sentence to their left, so both are out. An introductory phrase of this kind is separated from the main clause by a comma. The quick diagnostic is to read only what is to the left of the blank and ask whether it could be a sentence on its own; here it could not, so heavy punctuation is impossible.",
    patternName: "Comma after an introductory phrase",
    concept: "Punctuating a non-clause opening element",
    recognitionCues: [
      "An opening beginning with a participle such as Having, Using or Following",
      "No subject and verb in the opening element",
      "Options offering comma, semicolon, colon and nothing",
    ],
    fastestMethod:
      "Read only the left-hand side. If it cannot stand as a sentence, the semicolon and colon are both wrong, which usually leaves one answer.",
    commonTraps: [
      "Choosing a semicolon because the opening phrase is long",
      "Choosing a colon because a result follows",
      "Omitting the comma after a lengthy introductory phrase",
    ],
    expectedSeconds: 50,
  },
  {
    id: "rw-bound-004",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The violinist Ines Haddad _______ whose recordings of the Bach partitas were made over three decades _______ continued performing into her eighties.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: ", ... ,",
        isCorrect: true,
        rationale: "A non-essential relative clause takes a comma at each end. Removing it leaves a grammatical sentence, which is the test.",
      },
      {
        label: "B",
        text: ", ... (no punctuation)",
        distractorType: "comma_splice",
        rationale: "Punctuation of a parenthetical element must be symmetrical. Opening with a comma and not closing it is an error.",
      },
      {
        label: "C",
        text: "(no punctuation) ... ,",
        distractorType: "comma_splice",
        rationale: "The same asymmetry in reverse. The interruption needs a mark at both ends.",
      },
      {
        label: "D",
        text: "; ... ;",
        distractorType: "fragment",
        rationale: "Semicolons would require independent clauses on both sides, and whose recordings were made over three decades is a dependent clause.",
      },
    ],
    explanation:
      "The clause beginning whose adds information that the sentence does not need in order to make sense or to identify its subject, since she is already named. That makes it non-essential, and non-essential elements are enclosed by a matching pair of punctuation marks, here two commas. Test it by deleting the clause: The violinist Ines Haddad continued performing into her eighties, which is complete. The asymmetrical options are wrong whatever the rest of the sentence does.",
    patternName: "Paired punctuation around a non-essential clause",
    concept: "Symmetrical punctuation of parenthetical elements",
    recognitionCues: [
      "Two blanks surrounding a descriptive clause",
      "A relative pronoun such as who, whose or which",
      "A subject already identified by name",
    ],
    fastestMethod:
      "Delete the middle section. If the sentence still works, the element is non-essential and takes a matching pair of marks, so reject every asymmetrical option immediately.",
    commonTraps: [
      "Using only one comma for an interruption",
      "Treating a non-essential clause as essential and omitting punctuation",
      "Using semicolons around a dependent clause",
    ],
    expectedSeconds: 65,
  },

  // --- Form, structure and sense -----------------------------------------
  {
    id: "rw-form-001",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The collection of maps that the library acquired last spring _______ now available to researchers.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "are",
        distractorType: "agreement_error",
        rationale: "This agrees with maps, which sits inside a prepositional phrase and cannot be the subject.",
      },
      { label: "B", text: "is", isCorrect: true, rationale: "The subject is collection, which is singular, so the verb must be is." },
      {
        label: "C",
        text: "were",
        distractorType: "agreement_error",
        rationale: "Wrong in both number and tense: the subject is singular and now signals the present.",
      },
      {
        label: "D",
        text: "have been",
        distractorType: "agreement_error",
        rationale: "Plural, and the perfect aspect conflicts with now available.",
      },
    ],
    explanation:
      "Find the subject by removing the modifiers. The collection of maps that the library acquired last spring reduces to the collection, which is singular, so the verb is is. The plural maps is the object of the preposition of and can never be the subject. Crossing out every prepositional phrase and relative clause before choosing the verb makes these items almost automatic.",
    patternName: "Subject-verb agreement across an interrupting phrase",
    concept: "Locating the true subject",
    recognitionCues: [
      "A singular head noun followed by of plus a plural noun",
      "A relative clause between the subject and the verb",
      "Options differing in number and tense",
    ],
    fastestMethod:
      "Cross out everything between the subject and the verb, then read the two together. Check tense markers such as now or last year separately.",
    commonTraps: [
      "Agreeing with the nearest noun rather than the subject",
      "Being pulled into the past tense by a date in the modifier",
      "Changing aspect as well as number",
    ],
    expectedSeconds: 50,
  },
  {
    id: "rw-form-002",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "_______ the river at dawn, the team recorded water temperatures every hundred metres.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Wading into",
        isCorrect: true,
        rationale: "The participle attaches to the team, who both waded and recorded, so the modifier is correctly placed.",
      },
      {
        label: "B",
        text: "The water being cold in",
        distractorType: "misplaced_modifier",
        rationale: "This makes the water the subject of the opening phrase while the main clause belongs to the team, leaving the modifier dangling.",
      },
      {
        label: "C",
        text: "Having been waded into",
        distractorType: "misplaced_modifier",
        rationale: "The passive construction implies the team was waded into, which reverses the action.",
      },
      {
        label: "D",
        text: "To have waded into",
        distractorType: "misplaced_modifier",
        rationale: "The perfect infinitive does not describe an action accompanying the recording and reads as a purpose, which makes no sense here.",
      },
    ],
    explanation:
      "An introductory participial phrase must describe the subject of the main clause. The subject is the team, so the phrase has to say what the team did: wading into the river at dawn. B gives the phrase a different subject, the water, which leaves it dangling. C reverses the action through the passive, and D turns the phrase into an unintelligible purpose. The check is simple: ask who or what performed the action in the opening phrase and make sure that is the subject that follows.",
    patternName: "Dangling modifier check",
    concept: "Matching an introductory phrase to the subject of the main clause",
    recognitionCues: [
      "A blank at the very start of the sentence followed by a comma",
      "A main clause with a clear human subject",
      "Options offering different participial and infinitive forms",
    ],
    fastestMethod:
      "Read the main clause subject first, then pick the option whose opening phrase describes that subject performing the action.",
    commonTraps: [
      "Choosing a phrase whose implied subject differs from the main clause subject",
      "Accepting a passive form that reverses who acts",
      "Judging by sound rather than by which noun the phrase modifies",
    ],
    expectedSeconds: 65,
  },
  {
    id: "rw-form-003",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "By the time the final volume appeared in 1934, the lexicographers _______ for more than forty years on the dictionary.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "have worked",
        distractorType: "tense_shift",
        rationale: "The present perfect connects to now, but the sentence is anchored in 1934.",
      },
      {
        label: "B",
        text: "had been working",
        isCorrect: true,
        rationale: "The past perfect progressive expresses action continuing up to a specified point in the past, which is exactly what by the time requires.",
      },
      {
        label: "C",
        text: "are working",
        distractorType: "tense_shift",
        rationale: "The present progressive contradicts the completed past context.",
      },
      {
        label: "D",
        text: "will have worked",
        distractorType: "tense_shift",
        rationale: "The future perfect looks forward from the present, which cannot apply to 1934.",
      },
    ],
    explanation:
      "By the time the final volume appeared in 1934 fixes a reference point in the past, and the work went on for forty years up to that point. Describing an action continuing until a past moment calls for the past perfect, and the ongoing sense makes the progressive form the best fit: had been working. The present perfect in A would be right only if the work continued up to the present day.",
    patternName: "Past perfect with a past reference point",
    concept: "Choosing tense from the time frame the sentence establishes",
    recognitionCues: [
      "A phrase such as by the time, by 1934, or before that with a past date",
      "A duration such as for more than forty years",
      "Options spanning present, past and future forms",
    ],
    fastestMethod:
      "Find the sentence's time anchor first. A past anchor with a duration running up to it means past perfect; the progressive adds the sense of continuing action.",
    commonTraps: [
      "Using the present perfect when the anchor is in the past",
      "Ignoring the duration phrase",
      "Choosing a future form because the volume appeared later than the work began",
    ],
    expectedSeconds: 60,
  },
  {
    id: "rw-form-004",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The new process is valued less for the speed with which it works than for _______",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "it produces very little waste.",
        distractorType: "redundant",
        rationale: "A clause cannot balance the noun phrase the speed. The comparison requires matching grammatical forms.",
      },
      {
        label: "B",
        text: "the small amount of waste it produces.",
        isCorrect: true,
        rationale: "A noun phrase that parallels the speed with which it works, completing the less for X than for Y structure correctly.",
      },
      {
        label: "C",
        text: "because it produces very little waste.",
        distractorType: "redundant",
        rationale: "For and because both mark reason, so using them together is redundant and ungrammatical.",
      },
      {
        label: "D",
        text: "producing very little waste is what it does.",
        distractorType: "redundant",
        rationale: "Grammatically tangled and not parallel with the noun phrase on the other side of the comparison.",
      },
    ],
    explanation:
      "The construction valued less for X than for Y requires X and Y to be the same kind of phrase. X here is the speed with which it works, a noun phrase, so Y must be a noun phrase too: the small amount of waste it produces. A and D supply clauses, and C duplicates the reason marker by adding because after for. Checking that both sides of a comparison have the same grammatical shape is the whole of this skill.",
    patternName: "Parallel structure in a comparison",
    concept: "Maintaining parallelism across less for X than for Y",
    recognitionCues: [
      "A correlative structure such as less for than for, not only but also, or both and",
      "One side of the structure already given as a noun phrase",
      "Options mixing clauses, phrases and gerunds",
    ],
    fastestMethod:
      "Identify the grammatical form on the given side, then pick the option that matches it exactly. Ignore meaning until the forms match.",
    commonTraps: [
      "Choosing a clause to balance a noun phrase",
      "Doubling the reason marker with because after for",
      "Choosing the option that sounds most natural in isolation",
    ],
    expectedSeconds: 65,
  },
];
