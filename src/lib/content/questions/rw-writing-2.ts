import type { SeedQuestion } from "../types";

/**
 * Second batch of Expression of Ideas and Standard English Conventions items.
 *
 * Written to bring the Reading and Writing bank up to the 54 questions a full
 * two-module section needs, with enough spare that two exams in a row do not
 * repeat. All original compositions.
 */
export const RW_WRITING_QUESTIONS_2: SeedQuestion[] = [
  // --- Boundaries --------------------------------------------------------
  {
    id: "rw-bound-005",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The museum reopened to the public in March _______ visitor numbers have since doubled.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: "March,",
        distractorType: "comma_splice",
        rationale: "Both sides are complete sentences, and a comma alone cannot join two of them.",
      },
      { label: "B", text: "March;", isCorrect: true, rationale: "A semicolon is the correct link between two closely related independent clauses." },
      {
        label: "C",
        text: "March:",
        distractorType: "wrong_relationship",
        rationale: "A colon introduces something that specifies or completes what precedes it. The second clause is a consequence, not a specification.",
      },
      {
        label: "D",
        text: "March",
        distractorType: "run_on",
        rationale: "With no punctuation the two sentences run straight into each other.",
      },
    ],
    explanation:
      "Test each side of the blank for independence. The museum reopened to the public in March stands alone, and visitor numbers have since doubled stands alone. Two independent clauses need a full stop, a semicolon, or a comma plus a coordinating conjunction. Only the semicolon is offered, so B is correct.",
    patternName: "Two independent clauses with no conjunction",
    concept: "Joining independent clauses correctly",
    recognitionCues: [
      "Complete sentences on both sides of the blank",
      "No coordinating conjunction such as and, but or so",
      "Options differ only in the punctuation mark",
    ],
    fastestMethod:
      "Cover the blank and read each side aloud. If both are sentences and there is no conjunction, you need a semicolon or a full stop.",
    commonTraps: [
      "Choosing the comma because the clauses feel closely linked",
      "Choosing a colon when the second clause does not specify the first",
      "Leaving the clauses unpunctuated",
    ],
    expectedSeconds: 45,
  },
  {
    id: "rw-bound-006",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The delay had three causes _______ a misrouted shipment, a customs hold and a shortage of qualified staff.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 3,
    choices: [
      { label: "A", text: ":", isCorrect: true, rationale: "A complete statement precedes the blank and a list specifying the causes follows, which is exactly what a colon introduces." },
      {
        label: "B",
        text: ";",
        distractorType: "fragment",
        rationale: "A semicolon needs an independent clause on each side, and a list of three noun phrases is not a clause.",
      },
      {
        label: "C",
        text: ",",
        distractorType: "unnecessary_comma",
        rationale: "A bare comma makes the list read as though it continues the sentence rather than specifying the three causes.",
      },
      {
        label: "D",
        text: "no punctuation",
        distractorType: "run_on",
        rationale: "Without punctuation, causes runs directly into a misrouted shipment and the sentence breaks down.",
      },
    ],
    explanation:
      "A colon introduces material that specifies or completes what comes before it, and it requires a complete sentence on its left. The delay had three causes is complete, and what follows names those three causes. The semicolon fails because the right-hand side is a list, not a clause.",
    patternName: "Colon before a specifying list",
    concept: "Choosing between a colon, a semicolon and a comma",
    recognitionCues: [
      "A counting word such as three causes, two reasons or several features before the blank",
      "A list of noun phrases after it",
      "A complete sentence on the left of the blank",
    ],
    fastestMethod:
      "Check that the left side is a sentence and the right side specifies it. That combination is always a colon.",
    commonTraps: [
      "Using a semicolon before a list",
      "Treating the list as a continuation rather than a specification",
      "Not checking that the left side is independent",
    ],
    expectedSeconds: 45,
  },
  {
    id: "rw-bound-007",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The novel _______ that won the prize last year _______ has been translated into twelve languages.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: ", ... ,",
        distractorType: "essential_clause",
        rationale: "Commas mark a clause as optional. This clause identifies which novel is meant, so removing it leaves the sentence unclear.",
      },
      { label: "B", text: "no punctuation ... no punctuation", isCorrect: true, rationale: "A that clause is always essential and therefore never separated by commas." },
      {
        label: "C",
        text: ", ... no punctuation",
        distractorType: "comma_splice",
        rationale: "Punctuation around an interruption has to be symmetrical. One comma on its own is never right.",
      },
      {
        label: "D",
        text: "no punctuation ... ,",
        distractorType: "subject_verb_split",
        rationale: "A single closing comma here separates the subject from its verb, which Standard English does not allow.",
      },
    ],
    explanation:
      "The clue is the word that. A relative clause introduced by that is restrictive: it narrows down which thing is being discussed and is never set off by commas. Compare the version with which, which would take commas and would imply the novel is already identified. Here the clause tells you which novel, so no punctuation is used at either end.",
    patternName: "That clauses take no commas",
    concept: "Essential and non-essential relative clauses",
    recognitionCues: [
      "A relative clause beginning with that rather than which or who",
      "Two blanks surrounding the clause",
      "A subject that is not otherwise identified",
    ],
    fastestMethod:
      "If the clause starts with that, the answer is no commas. If it starts with which or a name follows, consider the paired-comma option.",
    commonTraps: [
      "Adding commas because the clause feels like extra information",
      "Using one comma rather than a matched pair",
      "Separating the subject from its verb",
    ],
    expectedSeconds: 55,
  },
  {
    id: "rw-bound-008",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Three of the four prototypes _______ the fourth was never completed _______ passed the stress test.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      { label: "A", text: "-- ... --", isCorrect: true, rationale: "A pair of dashes can enclose an interruption that is itself a complete sentence, which commas cannot do." },
      {
        label: "B",
        text: ", ... ,",
        distractorType: "comma_splice",
        rationale: "The interruption is an independent clause, so commas around it produce a splice.",
      },
      {
        label: "C",
        text: "; ... ;",
        distractorType: "fragment",
        rationale: "Semicolons would cut the sentence into pieces, leaving Three of the four prototypes and passed the stress test as fragments.",
      },
      {
        label: "D",
        text: "-- ... ,",
        distractorType: "comma_splice",
        rationale: "Enclosing punctuation must match. A dash cannot be closed with a comma.",
      },
    ],
    explanation:
      "The inserted material, the fourth was never completed, is a full sentence dropped into the middle of another one. Commas are not strong enough to enclose an independent clause, and semicolons would break the surrounding sentence apart. A matched pair of dashes, or brackets, is the correct device. Check symmetry too: whatever opens the interruption must close it.",
    patternName: "Dashes around an interrupting clause",
    concept: "Punctuating an interruption that is itself a sentence",
    recognitionCues: [
      "Two blanks with an aside between them",
      "The aside has its own subject and verb",
      "Options mixing dashes, commas and semicolons",
    ],
    fastestMethod:
      "Delete the middle. If what remains is a sentence and the middle was also a sentence, you need dashes, and both ends must match.",
    commonTraps: [
      "Using commas around an independent clause",
      "Mismatching the opening and closing marks",
      "Breaking the host sentence with semicolons",
    ],
    expectedSeconds: 60,
  },
  {
    id: "rw-bound-009",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The second phase of the excavation never began _______ because the funding was withdrawn in June.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 3,
    choices: [
      { label: "A", text: "no punctuation", isCorrect: true, rationale: "A because clause at the end of a sentence is essential to its meaning and takes no comma." },
      {
        label: "B",
        text: ",",
        distractorType: "unnecessary_comma",
        rationale: "A comma here wrongly marks the reason as an afterthought. Reversed, as an opening clause, it would need one.",
      },
      {
        label: "C",
        text: ";",
        distractorType: "fragment",
        rationale: "The right-hand side is a dependent clause, so it cannot stand after a semicolon.",
      },
      {
        label: "D",
        text: ":",
        distractorType: "fragment",
        rationale: "A colon needs the material after it to specify the statement before it. A because clause explains rather than specifies, and is not punctuated this way.",
      },
    ],
    explanation:
      "Word order decides this. When a subordinate clause comes first, as in Because the funding was withdrawn, the second phase never began, a comma separates it from the main clause. When it comes last, as here, no comma is used. Semicolons and colons both require more on their right than a dependent clause provides.",
    patternName: "Trailing subordinate clause takes no comma",
    concept: "How clause order changes the punctuation",
    recognitionCues: [
      "A subordinating word such as because, although, when or since after the blank",
      "A complete main clause before the blank",
      "Options offering nothing, a comma, a semicolon and a colon",
    ],
    fastestMethod:
      "Subordinate clause first means comma; subordinate clause last means none. Check which order you are looking at before anything else.",
    commonTraps: [
      "Adding a comma out of habit before because",
      "Treating a dependent clause as independent",
      "Reading the rule in only one direction",
    ],
    expectedSeconds: 45,
  },
  {
    id: "rw-bound-010",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The delegates travelled from Lima, Peru _______ Accra, Ghana; and Hanoi, Vietnam.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      { label: "A", text: ";", isCorrect: true, rationale: "When list items already contain commas, semicolons separate the items so the groupings stay clear." },
      {
        label: "B",
        text: ",",
        distractorType: "unnecessary_comma",
        rationale: "A comma makes it impossible to tell where one city-and-country pair ends and the next begins.",
      },
      {
        label: "C",
        text: ":",
        distractorType: "wrong_relationship",
        rationale: "A colon introduces a list; it does not separate items inside one.",
      },
      {
        label: "D",
        text: "no punctuation",
        distractorType: "run_on",
        rationale: "With nothing between them, Peru and Accra run together.",
      },
    ],
    explanation:
      "Each item in this list is itself a pair separated by a comma, so plain commas between the items would be ambiguous. Semicolons act as the higher-level separator, which the later part of the sentence already shows with Ghana; and Hanoi. Matching that pattern gives a semicolon after Peru.",
    patternName: "Semicolons in a list with internal commas",
    concept: "Separating complex list items",
    recognitionCues: [
      "List items that each contain a comma",
      "A semicolon already visible elsewhere in the list",
      "Place names, titles or dates as items",
    ],
    fastestMethod:
      "Look at how the rest of the list is punctuated and match it. The sentence usually shows you the pattern.",
    commonTraps: [
      "Using commas throughout and losing the groupings",
      "Missing the semicolon already present later in the list",
      "Using a colon mid-list",
    ],
    expectedSeconds: 50,
  },
  {
    id: "rw-bound-011",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The committee that reviewed the proposals over a period of three months _______ recommended only two of them for funding.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 3,
    choices: [
      { label: "A", text: "no punctuation", isCorrect: true, rationale: "Nothing may separate a subject from its verb, however long the material in between." },
      {
        label: "B",
        text: ",",
        distractorType: "subject_verb_split",
        rationale: "This puts a comma between the subject, the committee, and its verb, recommended.",
      },
      {
        label: "C",
        text: ";",
        distractorType: "fragment",
        rationale: "Everything before the blank is a noun phrase, not a clause, so it cannot precede a semicolon.",
      },
      {
        label: "D",
        text: ":",
        distractorType: "fragment",
        rationale: "A colon also needs a complete sentence before it, and there is none here.",
      },
    ],
    explanation:
      "Strip out the modifier: the committee recommended only two of them. Subject and verb sit next to each other and nothing is allowed between them. The long relative clause in the middle tempts you towards a comma, which is exactly why the question is written that way. Note also that the clause begins with that, so it takes no commas at either end.",
    patternName: "Never separate subject from verb",
    concept: "Punctuation around a long subject",
    recognitionCues: [
      "A long modifier between the subject and the verb",
      "The blank sits immediately before the main verb",
      "No conjunction anywhere near the blank",
    ],
    fastestMethod:
      "Delete everything between the subject and the verb and read them together. If they are adjacent, no punctuation goes between them.",
    commonTraps: [
      "Inserting a comma because the subject is long",
      "Treating a noun phrase as a clause",
      "Pausing for breath and punctuating the pause",
    ],
    expectedSeconds: 50,
  },

  // --- Form, structure and sense -----------------------------------------
  {
    id: "rw-form-005",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "After six weeks of trials, the _______ results were published in an open-access journal.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "researchers",
        distractorType: "possessive_error",
        rationale: "This is a plain plural. The results belong to the researchers, so a possessive is needed.",
      },
      {
        label: "B",
        text: "researcher's",
        distractorType: "number_agreement",
        rationale: "A singular possessive, but trials run by one person would not normally be described this way, and the sentence treats them as a group.",
      },
      { label: "C", text: "researchers'", isCorrect: true, rationale: "A plural possessive: the results belonging to more than one researcher." },
      {
        label: "D",
        text: "researchers's",
        distractorType: "possessive_error",
        rationale: "A plural already ending in s takes only an apostrophe, never an extra s.",
      },
    ],
    explanation:
      "Ask two questions in order. Is possession involved? Yes, the results belong to the researchers, so an apostrophe is needed and the plain plural is out. Is the owner singular or plural? Plural, so the apostrophe goes after the s already there: researchers'. Adding another s after that apostrophe is never correct for a regular plural.",
    patternName: "Plural possessive",
    concept: "Apostrophes with singular and plural owners",
    recognitionCues: [
      "Options differing only in apostrophe placement",
      "A noun immediately followed by another noun it owns",
      "No verb directly after the blank",
    ],
    fastestMethod:
      "Decide possession first, then count the owners. Apostrophe before the s for one owner, after it for several.",
    commonTraps: [
      "Choosing the plain plural when ownership is involved",
      "Adding an extra s after the apostrophe",
      "Confusing a possessive with a contraction",
    ],
    expectedSeconds: 45,
  },
  {
    id: "rw-form-006",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Each of the surveyed households _______ asked to record its water use for a fortnight.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      { label: "A", text: "was", isCorrect: true, rationale: "The subject is each, which is singular, so the verb is singular too." },
      {
        label: "B",
        text: "were",
        distractorType: "agreement_error",
        rationale: "This agrees with households, which sits inside a prepositional phrase and cannot be the subject.",
      },
      {
        label: "C",
        text: "have been",
        distractorType: "agreement_error",
        rationale: "Plural, and the perfect aspect does not fit the single completed instruction being described.",
      },
      {
        label: "D",
        text: "are",
        distractorType: "tense_shift",
        rationale: "Present tense, which clashes with the completed past action the sentence reports.",
      },
    ],
    explanation:
      "Each, every, either and neither are singular however plural the noun after them looks. The subject here is each, not households, because of the surveyed households is a prepositional phrase and a subject never lives inside one. Crossing that phrase out leaves each was asked, which sounds right because it is. Note that the later pronoun its confirms the singular reading.",
    patternName: "Each and every are singular",
    concept: "Subject-verb agreement with indefinite pronouns",
    recognitionCues: [
      "A sentence starting with each, every, either or neither",
      "A plural noun inside an of phrase",
      "A later singular pronoun such as its or his or her",
    ],
    fastestMethod:
      "Cross out every of phrase, then read subject and verb together. Memorise that each and every are always singular.",
    commonTraps: [
      "Agreeing with the nearest plural noun",
      "Missing that the subject sits before the of phrase",
      "Changing tense as well as number",
    ],
    expectedSeconds: 50,
  },
  {
    id: "rw-form-007",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The restoration team cleaned the fresco, stabilised the plaster and _______ the missing section in a reversible pigment.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "were repainting",
        distractorType: "parallelism_error",
        rationale: "The other two verbs are simple past. A progressive form breaks the series.",
      },
      { label: "B", text: "repainted", isCorrect: true, rationale: "Simple past, matching cleaned and stabilised, so all three items in the list have the same form." },
      {
        label: "C",
        text: "repainting",
        distractorType: "parallelism_error",
        rationale: "A participle cannot sit alongside two finite past-tense verbs.",
      },
      {
        label: "D",
        text: "had repainted",
        distractorType: "tense_shift",
        rationale: "The past perfect would place this action before the other two, which the sentence does not indicate.",
      },
    ],
    explanation:
      "A list joined by and must have items of the same grammatical form. Here the first two are simple past verbs, cleaned and stabilised, so the third must be too: repainted. The past perfect in D is not wrong in isolation, but it asserts a sequence the passage never establishes, and it breaks the parallel series.",
    patternName: "Parallel verbs in a series",
    concept: "Keeping list items grammatically identical",
    recognitionCues: [
      "Three or more actions joined by and",
      "The first items share an obvious form",
      "Options offering several tenses of one verb",
    ],
    fastestMethod:
      "Read the items already given, note their form, and pick the option that matches. Ignore which sounds most natural on its own.",
    commonTraps: [
      "Choosing a progressive or participle form",
      "Introducing a sequence with the past perfect that the text does not support",
      "Judging the item in isolation rather than against the series",
    ],
    expectedSeconds: 55,
  },
  {
    id: "rw-form-008",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The rainfall recorded at the upland station was far greater than _______ at the coastal one.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "the coastal station",
        distractorType: "comparison_error",
        rationale: "This compares rainfall with a station. The two sides of a comparison must be the same kind of thing.",
      },
      { label: "B", text: "that recorded", isCorrect: true, rationale: "That stands in for the rainfall, so rainfall is compared with rainfall." },
      {
        label: "C",
        text: "those recorded",
        distractorType: "number_agreement",
        rationale: "Rainfall is singular, so the stand-in pronoun must be that rather than those.",
      },
      {
        label: "D",
        text: "it was recorded",
        distractorType: "comparison_error",
        rationale: "This creates a clause that leaves the comparison grammatically incomplete.",
      },
    ],
    explanation:
      "Comparisons must be between like things. As written, the sentence compares the rainfall at one station with something at another, and that something has to be rainfall as well. The pronoun that does the job, and it must be singular to match rainfall. Those would be right if the sentence compared plural amounts, for example the readings recorded at the upland station.",
    patternName: "Logical comparison with that or those",
    concept: "Comparing like with like",
    recognitionCues: [
      "The words greater than, more than or higher than followed by a blank",
      "Two places, groups or periods being compared",
      "Options offering that and those",
    ],
    fastestMethod:
      "Name the two things being compared out loud. If they are not the same kind of thing, you need that or those, matched in number to the first one.",
    commonTraps: [
      "Comparing a quantity with a place",
      "Getting the number of that or those wrong",
      "Turning the second half into a clause",
    ],
    expectedSeconds: 70,
  },
  {
    id: "rw-form-009",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The archive holds thousands of glass plate negatives, many of _______ have never been catalogued.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      { label: "A", text: "which", isCorrect: true, rationale: "A relative pronoun is needed to link the clause to the negatives, and which is the form used after a preposition for things." },
      {
        label: "B",
        text: "them",
        distractorType: "comma_splice",
        rationale: "An object pronoun leaves two independent clauses joined by a comma.",
      },
      {
        label: "C",
        text: "whom",
        distractorType: "pronoun_case",
        rationale: "Whom refers to people. Negatives are things.",
      },
      {
        label: "D",
        text: "these",
        distractorType: "comma_splice",
        rationale: "Like them, this produces a second main clause and so a comma splice.",
      },
    ],
    explanation:
      "The second part of the sentence has to attach to the first as a relative clause, not stand as a sentence of its own. Many of which have never been catalogued does that; many of them have never been catalogued does not, and joined by a comma it is a splice. Which is used for things and whom for people, so which is correct here.",
    patternName: "Relative pronoun after a quantifier",
    concept: "Many of which against many of them",
    recognitionCues: [
      "A comma followed by a quantity word such as many, some or several",
      "The word of immediately before the blank",
      "Options mixing relative and personal pronouns",
    ],
    fastestMethod:
      "If the second part would be a complete sentence with them, you need which to keep it attached. Use whom only for people.",
    commonTraps: [
      "Choosing them and creating a splice",
      "Using whom for an inanimate noun",
      "Missing that the comma rules out a second main clause",
    ],
    expectedSeconds: 55,
  },
  {
    id: "rw-form-010",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "_______ for nearly a century, the mechanism was finally reassembled using scans of every fragment.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Having studied it",
        distractorType: "misplaced_modifier",
        rationale: "This says the mechanism did the studying, which reverses the sense.",
      },
      { label: "B", text: "Studied by specialists", isCorrect: true, rationale: "The participial phrase describes the mechanism, which is the subject of the main clause." },
      {
        label: "C",
        text: "Specialists having studied it",
        distractorType: "misplaced_modifier",
        rationale: "This gives the opening phrase its own subject, specialists, while the main clause belongs to the mechanism.",
      },
      {
        label: "D",
        text: "To study it",
        distractorType: "misplaced_modifier",
        rationale: "An infinitive of purpose does not fit: the reassembly was not done in order to study the mechanism for a century.",
      },
    ],
    explanation:
      "An introductory participial phrase has to describe the subject of the main clause. That subject is the mechanism, so the phrase must say something about the mechanism: it was studied by specialists for nearly a century. Option A makes the mechanism the one doing the studying, and C gives the phrase a different subject entirely, which leaves it dangling.",
    patternName: "Dangling modifier, passive repair",
    concept: "Matching an opening phrase to the main subject",
    recognitionCues: [
      "A blank at the very start, followed by a comma",
      "A time span such as for nearly a century inside the opening phrase",
      "Options offering active and passive participles",
    ],
    fastestMethod:
      "Read the main clause first and find its subject. Then choose the opening phrase that describes that subject, not some other actor.",
    commonTraps: [
      "Choosing an active participle when the subject receives the action",
      "Giving the opening phrase its own subject",
      "Choosing by sound rather than by what the phrase modifies",
    ],
    expectedSeconds: 60,
  },
  {
    id: "rw-form-011",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Neither the curator nor the conservators _______ willing to date the panel before the pigment analysis was complete.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "was",
        distractorType: "agreement_error",
        rationale: "With neither and nor, the verb agrees with the nearer subject, and conservators is plural.",
      },
      { label: "B", text: "were", isCorrect: true, rationale: "The subject nearer the verb is conservators, which is plural, so the verb is plural." },
      {
        label: "C",
        text: "has been",
        distractorType: "agreement_error",
        rationale: "Singular, and the perfect aspect does not match the past situation being described.",
      },
      {
        label: "D",
        text: "is",
        distractorType: "tense_shift",
        rationale: "Present tense, which clashes with was complete later in the sentence.",
      },
    ],
    explanation:
      "In a neither-nor or either-or construction the verb agrees with whichever subject is closer to it. Here that is conservators, which is plural, so were is correct. Reverse the order to neither the conservators nor the curator and the answer would become was. The rule is about proximity, not about which subject seems more important.",
    patternName: "Proximity agreement with neither-nor",
    concept: "Verb agreement with paired subjects",
    recognitionCues: [
      "The pairing neither ... nor or either ... or",
      "One singular and one plural subject",
      "The blank sits immediately after the second subject",
    ],
    fastestMethod:
      "Find the subject nearest the verb and agree with that one. Ignore the first subject entirely.",
    commonTraps: [
      "Agreeing with the first subject",
      "Assuming neither always takes a singular verb",
      "Changing tense as well as number",
    ],
    expectedSeconds: 60,
  },

  // --- Transitions -------------------------------------------------------
  {
    id: "rw-trans-004",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The alloy keeps its strength at temperatures where most steels soften. _______ it is used in the hottest sections of jet engines, where weight savings matter most.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 3,
    choices: [
      { label: "A", text: "Accordingly,", isCorrect: true, rationale: "The second sentence states a consequence of the property described in the first, so a result transition is needed." },
      {
        label: "B",
        text: "Nonetheless,",
        distractorType: "wrong_relationship",
        rationale: "Nothing is being contrasted. The second sentence follows naturally from the first rather than cutting against it.",
      },
      {
        label: "C",
        text: "In contrast,",
        distractorType: "wrong_relationship",
        rationale: "Also contrastive, and there is no opposing idea here.",
      },
      {
        label: "D",
        text: "Likewise,",
        distractorType: "wrong_relationship",
        rationale: "Likewise signals that two parallel things behave the same way, but only one material is under discussion.",
      },
    ],
    explanation:
      "Reduce each sentence to its claim. First: the alloy stays strong when hot. Second: it is therefore used in hot engine sections. The second is a consequence of the first, so the link is causal and Accordingly fits. Decide the relationship in your own words before reading the options, because three of the four here are plausible-sounding transitions in the wrong category.",
    patternName: "Result transition",
    concept: "Identifying a cause-and-effect link",
    recognitionCues: [
      "A property stated first and an application stated second",
      "The second sentence could begin with so",
      "Options spanning contrast, similarity and result",
    ],
    fastestMethod:
      "Try inserting so between the sentences. If it works, you want a result transition and every contrast option can go.",
    commonTraps: [
      "Reaching for a contrast transition by default",
      "Confusing likewise with therefore",
      "Choosing by formality rather than by logic",
    ],
    expectedSeconds: 50,
  },
  {
    id: "rw-trans-005",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Several island languages have been documented only through word lists compiled by visiting traders. _______ the entire record of Nguna as spoken in 1880 consists of 212 words and no sentences.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "However,",
        distractorType: "wrong_relationship",
        rationale: "The second sentence supports the first rather than opposing it.",
      },
      { label: "B", text: "For example,", isCorrect: true, rationale: "Nguna is a specific instance of the general claim about island languages made in the first sentence." },
      {
        label: "C",
        text: "Therefore,",
        distractorType: "wrong_relationship",
        rationale: "The Nguna record is not a consequence of the general statement; it is an illustration of it.",
      },
      {
        label: "D",
        text: "Instead,",
        distractorType: "wrong_relationship",
        rationale: "Instead signals a replacement or alternative, and nothing is being replaced.",
      },
    ],
    explanation:
      "The first sentence makes a general claim about several languages; the second narrows to one named language with exact figures. Moving from general to specific is exemplification, so For example is correct. A useful test: if the second sentence could begin with a phrase such as take Nguna, the transition is an example marker.",
    patternName: "General claim followed by an instance",
    concept: "Exemplification",
    recognitionCues: [
      "A general statement followed by a named case",
      "Specific numbers or a proper noun in the second sentence",
      "The second sentence narrows rather than redirects",
    ],
    fastestMethod:
      "Ask whether the second sentence is a case of the first. If it is, choose the example transition and reject every contrast and result option.",
    commonTraps: [
      "Choosing however because the detail is striking",
      "Mistaking an illustration for a consequence",
      "Choosing instead when nothing is being replaced",
    ],
    expectedSeconds: 50,
  },
  {
    id: "rw-trans-006",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The new filtration method removes almost all microplastics from the sample. _______ it is slow, and processing a single litre takes over an hour.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Indeed,",
        distractorType: "wrong_relationship",
        rationale: "Indeed intensifies agreement with the previous point, but the second sentence is a drawback.",
      },
      {
        label: "B",
        text: "As a result,",
        distractorType: "wrong_relationship",
        rationale: "Slowness is not caused by the method's effectiveness as far as the text says; it is a separate limitation.",
      },
      { label: "C", text: "It is, however,", isCorrect: true, rationale: "A strength is followed by a weakness, which is a contrast." },
      {
        label: "D",
        text: "Similarly,",
        distractorType: "wrong_relationship",
        rationale: "The two sentences point in opposite directions, so similarly misdescribes the link.",
      },
    ],
    explanation:
      "The first sentence is a positive, almost all microplastics removed, and the second is a negative, over an hour per litre. A strength followed by a weakness is a contrast, so the concessive however is right. Note that the correct option integrates the transition into the sentence rather than placing it at the front, which is a common way for this question type to disguise the answer.",
    patternName: "Strength then weakness",
    concept: "Concessive contrast",
    recognitionCues: [
      "A positive claim followed by a limitation",
      "Words such as slow, expensive or limited in the second sentence",
      "At least one option that embeds the transition mid-sentence",
    ],
    fastestMethod:
      "Label each sentence plus or minus. Opposite signs mean a contrast transition, wherever in the sentence the word sits.",
    commonTraps: [
      "Overlooking an option because the transition is not at the start",
      "Choosing a result transition for an unrelated drawback",
      "Reading indeed as a contrast marker",
    ],
    expectedSeconds: 55,
  },
  {
    id: "rw-trans-007",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Critics of the scheme argue that it rewards landowners who were already planting hedgerows. _______ the data show a sharp rise in new planting among farms that had done none before.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Consequently,",
        distractorType: "wrong_relationship",
        rationale: "The data do not follow from the criticism; they count against it.",
      },
      {
        label: "B",
        text: "In other words,",
        distractorType: "wrong_relationship",
        rationale: "This signals a restatement, but the second sentence introduces new evidence that cuts the other way.",
      },
      { label: "C", text: "In fact,", isCorrect: true, rationale: "It introduces evidence that corrects the preceding claim, which is exactly the relationship here." },
      {
        label: "D",
        text: "Moreover,",
        distractorType: "wrong_relationship",
        rationale: "Moreover adds support to the previous point, but this evidence undermines it.",
      },
    ],
    explanation:
      "The first sentence reports what critics say; the second supplies data pointing the other way. The transition therefore has to signal correction, which is what in fact does. Moreover and consequently both assume the second sentence supports or follows from the first, and in other words assumes it repeats it. Watch for the frame someone argues X, because the sentence after it very often pushes back.",
    patternName: "Reported criticism then counter-evidence",
    concept: "Corrective transitions",
    recognitionCues: [
      "A claim attributed to critics or sceptics",
      "Data or findings in the following sentence",
      "The two sentences disagree",
    ],
    fastestMethod:
      "Separate what the critics claim from what the author reports. If the evidence undercuts the claim, you need a corrective or contrastive transition.",
    commonTraps: [
      "Treating a reported view as the author's own",
      "Choosing an additive transition for contradicting evidence",
      "Mistaking new evidence for a restatement",
    ],
    expectedSeconds: 65,
  },
  {
    id: "rw-trans-008",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The treatment reduced symptoms in the trial group. The trial was small, lasted eight weeks and had no control arm. _______ the result should be treated as preliminary.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 4,
    choices: [
      { label: "A", text: "For these reasons,", isCorrect: true, rationale: "The third sentence draws a conclusion from the limitations listed in the second." },
      {
        label: "B",
        text: "Even so,",
        distractorType: "wrong_relationship",
        rationale: "Even so would concede the limitations and then assert the result anyway, which is the opposite of what follows.",
      },
      {
        label: "C",
        text: "For instance,",
        distractorType: "wrong_relationship",
        rationale: "Treating the result as preliminary is a judgement, not an example of a limitation.",
      },
      {
        label: "D",
        text: "Meanwhile,",
        distractorType: "wrong_relationship",
        rationale: "Meanwhile marks things happening at the same time, which is irrelevant to a logical conclusion.",
      },
    ],
    explanation:
      "The second sentence lists three weaknesses in the study, and the third says what follows from them. That is an inference, so a conclusive transition is needed. The trap is Even so, which would be right if the third sentence defended the finding despite the weaknesses; instead it accepts them. Read the sentence after the blank before choosing, not just the one before it.",
    patternName: "Limitations then conclusion",
    concept: "Drawing a conclusion from listed caveats",
    recognitionCues: [
      "A list of study weaknesses",
      "A hedging word such as preliminary, tentative or provisional after the blank",
      "Options including both a concessive and a conclusive transition",
    ],
    fastestMethod:
      "Read what comes after the blank first. If it agrees with the caveats, use a conclusive transition; if it overrides them, use a concessive one.",
    commonTraps: [
      "Choosing even so without reading the following clause",
      "Treating a judgement as an example",
      "Confusing simultaneity with consequence",
    ],
    expectedSeconds: 65,
  },
  {
    id: "rw-trans-009",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Most urban foxes in the study avoided roads with heavy night-time traffic. A minority crossed them repeatedly, and these animals had noticeably larger territories. _______ the behaviour appears to carry both a cost and a benefit.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "By contrast,",
        distractorType: "wrong_relationship",
        rationale: "The contrast has already been made between the majority and the minority. This sentence synthesises rather than contrasts.",
      },
      {
        label: "B",
        text: "Admittedly,",
        distractorType: "wrong_relationship",
        rationale: "Admittedly concedes a point to an imagined opponent, and no opposing view is in play.",
      },
      { label: "C", text: "Taken together,", isCorrect: true, rationale: "The final sentence draws a single conclusion from both of the preceding observations." },
      {
        label: "D",
        text: "Nevertheless,",
        distractorType: "wrong_relationship",
        rationale: "Nothing is being overridden; the conclusion follows from both earlier sentences rather than against them.",
      },
    ],
    explanation:
      "The first two sentences give two observations, and the third combines them into one judgement about cost and benefit. A summarising transition such as Taken together is what signals that combination. By contrast is tempting because the first two sentences do differ from each other, but the contrast has already been drawn; the blank introduces the synthesis, not another opposition.",
    patternName: "Synthesis of two observations",
    concept: "Summarising transitions",
    recognitionCues: [
      "Two observations followed by a single judgement",
      "Words such as both, overall or appears in the final sentence",
      "The contrast is already complete before the blank",
    ],
    fastestMethod:
      "Check whether the final sentence depends on one earlier sentence or on both. Depending on both means a summarising transition.",
    commonTraps: [
      "Marking a contrast that the text has already made",
      "Using a concessive transition with nothing to concede",
      "Linking the blank only to the sentence immediately before it",
    ],
    expectedSeconds: 70,
  },

  // --- Rhetorical synthesis ----------------------------------------------
  {
    id: "rw-synth-004",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- Tidal mills use the rise and fall of the tide to drive a waterwheel.\n- A pond is filled on the incoming tide and released through the wheel as the tide falls.\n- The Eling tidal mill in Hampshire has operated on and off since the eleventh century.\n- Tidal mills can only grind for a few hours either side of low tide.\n- Windmills, by contrast, can run whenever there is wind.",
    stem: "The student wants to explain a limitation of tidal mills. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Tidal mills use the rise and fall of the tide to drive a waterwheel, filling a pond on the incoming tide.",
        distractorType: "true_but_irrelevant",
        rationale: "This explains how they work. The goal is to explain a limitation.",
      },
      {
        label: "B",
        text: "The Eling tidal mill in Hampshire has operated on and off since the eleventh century.",
        distractorType: "true_but_irrelevant",
        rationale: "A historical fact that says nothing about any constraint.",
      },
      { label: "C", text: "Because a tidal mill can grind only for a few hours either side of low tide, it cannot run on demand as a windmill can.", isCorrect: true, rationale: "It names the constraint and makes its significance clear through the comparison the notes supply." },
      {
        label: "D",
        text: "Windmills can run whenever there is wind, unlike tidal mills.",
        distractorType: "partial_solution",
        rationale: "It gestures at a difference but never states what the tidal mill's limitation actually is.",
      },
    ],
    explanation:
      "Read the goal first and test each option against it alone. The goal is to explain a limitation, so the answer must state the constraint, which is the few-hour grinding window, and ideally show why it matters. C does both. A describes the mechanism, B offers history, and D names the comparison without ever stating the limitation itself. All four are consistent with the notes, so truth is not the test; fitness for the stated goal is.",
    patternName: "Goal asks for a limitation",
    concept: "Selecting notes that serve a specific rhetorical aim",
    recognitionCues: [
      "A goal naming a limitation, drawback or constraint",
      "At least one note stating a restriction",
      "Other notes describing mechanism or history",
    ],
    fastestMethod:
      "Find the note that states the restriction and keep only options built on it. Descriptive and historical notes are the standard filler.",
    commonTraps: [
      "Choosing an accurate description instead of the limitation",
      "Choosing an option that implies the limitation without stating it",
      "Choosing the option that uses the most notes",
    ],
    expectedSeconds: 75,
  },
  {
    id: "rw-synth-005",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- Hedy Lamarr was a film actor who also worked as an inventor.\n- In 1941 she and composer George Antheil patented a frequency-hopping system.\n- The system was intended to stop radio-controlled torpedoes being jammed.\n- The patent expired before the technique was used commercially.\n- Frequency hopping underlies parts of modern wireless communication.",
    stem: "The student wants to introduce Hedy Lamarr's invention to an audience unfamiliar with her. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "The patent expired before the technique was used commercially.",
        distractorType: "partial_solution",
        rationale: "This assumes the reader already knows who she was and what the technique is. It cannot serve as an introduction.",
      },
      { label: "B", text: "Hedy Lamarr, a film actor and inventor, patented a frequency-hopping system with George Antheil in 1941 to prevent radio-controlled torpedoes from being jammed.", isCorrect: true, rationale: "It identifies who she was, what she made, when, with whom, and what it was for, which is what an unfamiliar reader needs." },
      {
        label: "C",
        text: "Frequency hopping underlies parts of modern wireless communication.",
        distractorType: "true_but_irrelevant",
        rationale: "A statement about the technology's legacy that never mentions Lamarr at all.",
      },
      {
        label: "D",
        text: "In 1941 a frequency-hopping system was patented, and the patent later expired.",
        distractorType: "partial_solution",
        rationale: "It drops the inventor entirely, which is precisely what an introduction to her must include.",
      },
    ],
    explanation:
      "An introduction for an unfamiliar audience has to supply identity and context before anything else. B names Lamarr, says what she did, and explains the purpose of the invention, so a reader meeting her for the first time can follow. A and D presuppose knowledge the reader does not have, and C discusses the technology without the person. When a goal mentions an unfamiliar audience, the right answer is almost always the one carrying the most identifying detail.",
    patternName: "Introduce to an unfamiliar audience",
    concept: "Supplying identifying context",
    recognitionCues: [
      "A goal mentioning an audience that is unfamiliar or new to the topic",
      "Notes containing both identity and legacy details",
      "Options that assume prior knowledge",
    ],
    fastestMethod:
      "Ask which option a reader who knows nothing could follow on its own. Reject anything that presupposes the subject is already known.",
    commonTraps: [
      "Choosing a legacy statement because it sounds significant",
      "Choosing an option that omits the person being introduced",
      "Assuming the most detailed technical option is best",
    ],
    expectedSeconds: 80,
  },
  {
    id: "rw-synth-006",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- Two teams measured the mass of the same exoplanet, Kepler-10c.\n- Team A used radial velocity and reported about 17 Earth masses.\n- Team B used transit timing and reported about 7 Earth masses.\n- The two methods measure different observable effects.\n- Later work supported the lower figure.",
    stem: "The student wants to emphasise the disagreement between the two measurements. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Two teams measured the mass of the exoplanet Kepler-10c using different methods.",
        distractorType: "partial_solution",
        rationale: "It sets up the comparison but never states that the results differed, let alone by how much.",
      },
      { label: "B", text: "Measuring Kepler-10c by radial velocity gave about 17 Earth masses, while transit timing gave about 7, a difference of more than a factor of two.", isCorrect: true, rationale: "It places both figures side by side and quantifies the gap, which is what emphasising a disagreement requires." },
      {
        label: "C",
        text: "Later work supported the lower figure of about 7 Earth masses.",
        distractorType: "partial_solution",
        rationale: "This resolves the disagreement rather than emphasising it, and gives only one of the two measurements.",
      },
      {
        label: "D",
        text: "Radial velocity and transit timing measure different observable effects.",
        distractorType: "true_but_irrelevant",
        rationale: "It explains why the methods might differ without reporting that they did.",
      },
    ],
    explanation:
      "To emphasise a disagreement you need both competing values in the same sentence and, ideally, a sense of how far apart they are. Only B does that. A introduces the situation, C settles it, and D explains a possible cause. When a goal uses a word such as emphasise, contrast or highlight, the correct option nearly always contains both sides of the comparison explicitly.",
    patternName: "Emphasise a disagreement",
    concept: "Putting both sides of a contrast in one sentence",
    recognitionCues: [
      "A goal using emphasise, contrast or highlight",
      "Two competing figures in the notes",
      "Options that give only one figure",
    ],
    fastestMethod:
      "Count the figures in each option. Emphasising a disagreement needs both of them, so single-value options can go immediately.",
    commonTraps: [
      "Choosing the option that resolves the disagreement",
      "Choosing the explanation of why results differ",
      "Choosing a setup sentence that omits the numbers",
    ],
    expectedSeconds: 80,
  },
  {
    id: "rw-synth-007",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- Dendrochronology dates wood by matching patterns of annual growth rings.\n- Ring width varies with rainfall and temperature in a given year.\n- A regional master sequence is built from overlapping samples of known age.\n- An undated sample is matched against the master sequence.\n- The method can give a felling date accurate to a single year.",
    stem: "The student wants to explain how dendrochronology produces a date. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "Dendrochronology can give a felling date accurate to a single year.",
        distractorType: "partial_solution",
        rationale: "This states the outcome without describing any part of the process.",
      },
      {
        label: "B",
        text: "Ring width varies with rainfall and temperature in a given year.",
        distractorType: "partial_solution",
        rationale: "One component of the method, but on its own it does not explain how a date is produced.",
      },
      { label: "C", text: "Because ring widths vary year by year with the weather, an undated sample can be matched against a regional master sequence built from wood of known age.", isCorrect: true, rationale: "It links the underlying variation to the matching step, which together are how the date is produced." },
      {
        label: "D",
        text: "A regional master sequence is built from overlapping samples of known age, and dendrochronology is widely used in archaeology.",
        distractorType: "true_but_irrelevant",
        rationale: "The second half is not in the notes and adds nothing about the procedure.",
      },
    ],
    explanation:
      "A how question wants the mechanism, which here has two linked parts: ring widths vary with the weather, so the pattern acts as a signature, and that signature is matched against a dated master sequence. C joins both. A gives only the result, B only the first half, and D wanders off into an application. Note that D also introduces a claim the notes never make, which is always a reason to reject an option.",
    patternName: "Goal asks how something works",
    concept: "Combining notes into a mechanism",
    recognitionCues: [
      "A goal using the word how or explain the process",
      "Notes that split a method into steps",
      "Options giving only the outcome",
    ],
    fastestMethod:
      "Identify the two or three notes that form the chain, then keep the option that links them. Reject anything stating only the result.",
    commonTraps: [
      "Choosing the outcome instead of the process",
      "Choosing a single step in isolation",
      "Accepting an option that adds a claim the notes do not contain",
    ],
    expectedSeconds: 75,
  },
  {
    id: "rw-synth-008",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- The Antonine Wall ran across central Scotland for about 60 kilometres.\n- It was built of turf on a stone base, not of stone throughout.\n- Hadrian's Wall, further south, was largely stone and about 117 kilometres long.\n- The Antonine Wall was occupied for roughly twenty years before being abandoned.\n- Hadrian's Wall remained in use for close to three centuries.",
    stem: "The student wants to compare the two walls for an audience already familiar with Hadrian's Wall. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "Hadrian's Wall was largely stone, about 117 kilometres long, and remained in use for close to three centuries.",
        distractorType: "wrong_relationship",
        rationale: "It describes only the wall the audience already knows, so it informs them of nothing and makes no comparison.",
      },
      { label: "B", text: "Unlike Hadrian's Wall, the Antonine Wall was built of turf on a stone base, ran only about 60 kilometres, and was abandoned after roughly twenty years.", isCorrect: true, rationale: "It uses the familiar wall as the reference point and gives the unfamiliar one's contrasting details, which is what this audience needs." },
      {
        label: "C",
        text: "The Antonine Wall ran across central Scotland for about 60 kilometres and was built of turf on a stone base.",
        distractorType: "partial_solution",
        rationale: "Accurate about the Antonine Wall, but it never refers to Hadrian's Wall, so no comparison is made.",
      },
      {
        label: "D",
        text: "Both walls were Roman frontier works in Britain, though they differed in several respects.",
        distractorType: "too_broad",
        rationale: "It announces that differences exist without naming any of them, and the opening claim is not in the notes.",
      },
    ],
    explanation:
      "Two constraints operate here. The goal asks for a comparison, so the answer must mention both walls, which removes A and C. And the audience already knows Hadrian's Wall, so the useful move is to treat it as the baseline and describe how the Antonine Wall differs. B does exactly that across three dimensions. D mentions both but supplies no actual content, and also asserts something the notes never state.",
    patternName: "Compare against a known reference point",
    concept: "Using audience knowledge to structure a comparison",
    recognitionCues: [
      "A goal naming what the audience already knows",
      "Notes giving parallel facts about two subjects",
      "Options describing only one subject",
    ],
    fastestMethod:
      "Require both subjects in the sentence, then prefer the option that treats the familiar one as the baseline and details the unfamiliar one.",
    commonTraps: [
      "Describing the subject the audience already knows",
      "Choosing an option that asserts a difference without naming it",
      "Forgetting that a comparison needs both sides",
    ],
    expectedSeconds: 90,
  },
];
