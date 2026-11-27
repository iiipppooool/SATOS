import type { SeedQuestion } from "../types";

/**
 * Third batch of Standard English Conventions and Expression of Ideas.
 * All passages are original compositions written for this platform.
 */
export const RW_WRITING_QUESTIONS_3: SeedQuestion[] = [
  // --- Boundaries ---------------------------------------------------------
  {
    id: "rw-bound-012",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The lighthouse was decommissioned in 1987 _______ its lamp room now houses a weather station.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 2,
    choices: [
      {
        label: "A",
        text: ", and",
        isCorrect: true,
        rationale: "A comma plus a coordinating conjunction correctly joins two independent clauses.",
      },
      {
        label: "B",
        text: ", also",
        distractorType: "comma_splice",
        rationale: "Also is an adverb, not a conjunction, so a comma before it leaves a splice.",
      },
      {
        label: "C",
        text: "; and,",
        distractorType: "run_on",
        rationale: "A semicolon already joins the clauses, so adding a conjunction and another comma is redundant and wrong.",
      },
      {
        label: "D",
        text: " and",
        distractorType: "run_on",
        rationale: "Two independent clauses joined by a conjunction still need the comma before it.",
      },
    ],
    explanation:
      "Both sides stand alone as sentences, so they need a full stop, a semicolon, or a comma plus one of the coordinating conjunctions: and, but, or, nor, for, so, yet. Option A supplies exactly that. B uses an adverb where a conjunction is required, and C doubles up two different joining devices.",
    patternName: "Comma plus coordinating conjunction",
    concept: "Joining two independent clauses",
    recognitionCues: [
      "Complete sentences on both sides",
      "A conjunction offered in at least one option",
      "Options differing in punctuation around that conjunction",
    ],
    fastestMethod:
      "Confirm both sides are sentences, then look for comma plus a true conjunction. Memorise the seven: and, but, or, nor, for, so, yet.",
    commonTraps: [
      "Treating also, however or therefore as conjunctions",
      "Combining a semicolon with a conjunction",
      "Dropping the comma before the conjunction",
    ],
    expectedSeconds: 45,
  },
  {
    id: "rw-bound-013",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Archaeologists working at the site have recovered glass beads, bone pins and iron nails _______ none of which had been catalogued before 2019.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      { label: "A", text: ",", isCorrect: true, rationale: "A comma correctly attaches a non-essential relative clause beginning with none of which." },
      {
        label: "B",
        text: ";",
        distractorType: "fragment",
        rationale: "The material after the blank is a relative clause, not an independent one, so it cannot follow a semicolon.",
      },
      {
        label: "C",
        text: ":",
        distractorType: "fragment",
        rationale: "A colon introduces something that specifies the statement before it. A relative clause commenting on the list does not.",
      },
      {
        label: "D",
        text: "no punctuation",
        distractorType: "run_on",
        rationale: "Without the comma the clause runs into the list and the sentence becomes unreadable.",
      },
    ],
    explanation:
      "The giveaway is none of which. A relative clause introduced by which cannot stand alone, so the semicolon and the colon are both out, since each demands more. It adds information about the whole list rather than identifying it, so it is non-essential and takes a comma.",
    patternName: "Comma before a which clause",
    concept: "Attaching a non-essential relative clause",
    recognitionCues: [
      "The phrase all of which, none of which, or some of which",
      "A list immediately before the blank",
      "Options offering comma, semicolon, colon and nothing",
    ],
    fastestMethod:
      "Check whether what follows could be a sentence. A which clause never can, which removes the semicolon and colon at once.",
    commonTraps: [
      "Using a semicolon before a relative clause",
      "Reading the clause as a specification and choosing a colon",
      "Omitting punctuation after a list",
    ],
    expectedSeconds: 55,
  },
  {
    id: "rw-bound-014",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Because the kiln had to reach 1,280 degrees _______ firing a single batch took almost two days.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 2,
    choices: [
      { label: "A", text: ",", isCorrect: true, rationale: "An introductory subordinate clause is separated from the main clause by a comma." },
      {
        label: "B",
        text: ";",
        distractorType: "fragment",
        rationale: "The opening clause begins with because and cannot stand alone, so it cannot precede a semicolon.",
      },
      {
        label: "C",
        text: ":",
        distractorType: "fragment",
        rationale: "A colon also needs a complete sentence to its left, and a because clause is not one.",
      },
      {
        label: "D",
        text: "no punctuation",
        distractorType: "run_on",
        rationale: "A long introductory clause needs the comma to mark where the main clause begins.",
      },
    ],
    explanation:
      "Read only what is to the left of the blank: Because the kiln had to reach 1,280 degrees is not a sentence, since because makes it dependent. That removes the semicolon and the colon immediately, both of which require an independent clause before them. A dependent clause coming first takes a comma.",
    patternName: "Comma after an introductory subordinate clause",
    concept: "Dependent clause in first position",
    recognitionCues: [
      "An opening word such as because, although, when, since or if",
      "A complete main clause after the blank",
      "Options offering the four punctuation choices",
    ],
    fastestMethod:
      "Test the left side alone. If it cannot be a sentence, semicolon and colon are both impossible.",
    commonTraps: [
      "Choosing a semicolon because the clause is long",
      "Choosing a colon because a result follows",
      "Omitting the comma entirely",
    ],
    expectedSeconds: 40,
  },
  {
    id: "rw-bound-015",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The surveyor recorded three readings at each station _______ one at dawn, one at noon and one after dusk.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: ";",
        distractorType: "fragment",
        rationale: "The material after the blank is a list of noun phrases, not an independent clause.",
      },
      { label: "B", text: ":", isCorrect: true, rationale: "A complete statement precedes the blank and a list specifying the three readings follows, which is what a colon introduces." },
      {
        label: "C",
        text: ",",
        distractorType: "unnecessary_comma",
        rationale: "A bare comma makes the list read as a continuation of the sentence rather than a specification of the readings.",
      },
      {
        label: "D",
        text: "no punctuation",
        distractorType: "run_on",
        rationale: "Without punctuation, station runs straight into one and the structure collapses.",
      },
    ],
    explanation:
      "The structure is a complete sentence followed by material that specifies a noun in it. The word three immediately before the blank signals that the three items are about to be named, which is the clearest case for a colon. A semicolon fails because a list of phrases is not a clause.",
    patternName: "Colon before a specifying list",
    concept: "Colon after a complete statement",
    recognitionCues: [
      "A counting word such as three or several before the blank",
      "A list of phrases after it",
      "A complete sentence to the left",
    ],
    fastestMethod:
      "Confirm the left side is a sentence and the right side names what the left side counted. That is a colon.",
    commonTraps: [
      "Using a semicolon before a list",
      "Reading the list as a continuation",
      "Not checking that the left side is independent",
    ],
    expectedSeconds: 45,
  },
  {
    id: "rw-bound-016",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Ada Lovelace _______ whose notes on the Analytical Engine ran to three times the length of the paper she was translating _______ is often described as the first programmer.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      { label: "A", text: ", ... ,", isCorrect: true, rationale: "The subject is already named, so the whose clause is non-essential and takes a matching pair of commas." },
      {
        label: "B",
        text: "no punctuation ... no punctuation",
        distractorType: "essential_clause",
        rationale: "Leaving it unpunctuated treats the clause as identifying which Ada Lovelace is meant, which a proper name makes unnecessary.",
      },
      {
        label: "C",
        text: ", ... no punctuation",
        distractorType: "comma_splice",
        rationale: "Punctuation around an interruption must be symmetrical; one comma on its own is never right.",
      },
      {
        label: "D",
        text: "; ... ;",
        distractorType: "fragment",
        rationale: "Semicolons would require independent clauses either side, which a whose clause is not.",
      },
    ],
    explanation:
      "A proper name identifies its subject completely, so any clause describing it afterwards is additional rather than identifying, and additional material is enclosed by a matching pair of marks. Delete the clause to check: Ada Lovelace is often described as the first programmer still works. Compare the earlier item about a novel, where that introduced an essential clause and took no commas at all.",
    patternName: "Paired commas around a non-essential clause",
    concept: "Essential and non-essential clauses after a proper name",
    recognitionCues: [
      "A named person or place as the subject",
      "Two blanks around a descriptive clause",
      "A relative pronoun such as who or whose",
    ],
    fastestMethod:
      "If the subject is a proper name, the clause is non-essential and takes paired commas. Reject any asymmetrical option straight away.",
    commonTraps: [
      "Using a single comma for an interruption",
      "Treating a clause after a name as identifying",
      "Using semicolons around a dependent clause",
    ],
    expectedSeconds: 60,
  },
  {
    id: "rw-bound-017",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The results were consistent across all four trials _______ therefore, the team published without repeating the experiment.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: ",",
        distractorType: "comma_splice",
        rationale: "Therefore is an adverb, not a conjunction, so a comma on each side of it leaves two sentences joined by a comma.",
      },
      { label: "B", text: ";", isCorrect: true, rationale: "A semicolon joins the two independent clauses, with therefore then working as an adverb introducing the second." },
      {
        label: "C",
        text: ":",
        distractorType: "wrong_relationship",
        rationale: "A colon introduces material that specifies what precedes it. The second clause is a consequence, not a specification.",
      },
      {
        label: "D",
        text: "no punctuation",
        distractorType: "run_on",
        rationale: "The two sentences run together with nothing between them.",
      },
    ],
    explanation:
      "The pattern to learn is that however, therefore, moreover, consequently and nevertheless are adverbs rather than conjunctions, so they cannot join two sentences. Both sides here stand alone, so a semicolon does the joining and the adverb follows with its own comma. This is the single most frequently tested boundary rule on the section.",
    patternName: "Semicolon before a conjunctive adverb",
    concept: "Adverbs cannot join independent clauses",
    recognitionCues: [
      "Therefore, however, moreover or consequently at the boundary",
      "Complete sentences on both sides",
      "Options differing only in the mark before the adverb",
    ],
    fastestMethod:
      "Check both sides for independence, then remember that only the seven coordinating conjunctions can join with a comma. Everything else needs a semicolon or a full stop.",
    commonTraps: [
      "Treating therefore as a conjunction",
      "Choosing a colon for a consequence",
      "Running the clauses together",
    ],
    expectedSeconds: 50,
  },
  {
    id: "rw-bound-018",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "After weeks of rehearsal the quartet finally recorded the piece _______ in a single unbroken take.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      { label: "A", text: "no punctuation", isCorrect: true, rationale: "The closing phrase tells you how the piece was recorded and is essential to the verb, so nothing separates it." },
      {
        label: "B",
        text: ",",
        distractorType: "unnecessary_comma",
        rationale: "A comma wrongly marks the manner of recording as an aside, when it is the point of the sentence.",
      },
      {
        label: "C",
        text: ";",
        distractorType: "fragment",
        rationale: "A semicolon needs an independent clause after it, and a prepositional phrase is not one.",
      },
      {
        label: "D",
        text: ":",
        distractorType: "fragment",
        rationale: "A colon also needs more than a prepositional phrase to follow it in this construction.",
      },
    ],
    explanation:
      "The phrase in a single unbroken take modifies recorded and completes the thought rather than commenting on it, so it attaches directly with no punctuation. Semicolon and colon both demand a clause they are not given. The useful instinct is that a short closing phrase answering how, when or where is usually essential and takes nothing.",
    patternName: "No punctuation before an essential closing phrase",
    concept: "When a trailing modifier needs no comma",
    recognitionCues: [
      "A short prepositional phrase at the end",
      "A phrase answering how, when or where",
      "Options offering nothing, a comma, a semicolon and a colon",
    ],
    fastestMethod:
      "Ask whether the phrase is a clause. If not, semicolon and colon are out, and the question becomes whether the phrase is essential, which a manner phrase usually is.",
    commonTraps: [
      "Adding a comma because the sentence feels long",
      "Treating a phrase as a clause",
      "Punctuating a natural pause in speech",
    ],
    expectedSeconds: 55,
  },
  {
    id: "rw-bound-019",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The exhibition features work from three cities _______ Lagos, where the collective began; Berlin, where it first showed abroad; and Sao Paulo, where it is based today.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 5,
    choices: [
      { label: "A", text: ":", isCorrect: true, rationale: "A complete statement precedes the blank and a list naming the three cities follows, so a colon introduces it." },
      {
        label: "B",
        text: ";",
        distractorType: "fragment",
        rationale: "Semicolons already separate the items within this list; using one here as well would not introduce the list at all.",
      },
      {
        label: "C",
        text: ",",
        distractorType: "unnecessary_comma",
        rationale: "With commas already inside each item, a comma here makes the structure impossible to parse.",
      },
      {
        label: "D",
        text: "no punctuation",
        distractorType: "run_on",
        rationale: "The list needs to be introduced; without punctuation cities runs into Lagos.",
      },
    ],
    explanation:
      "Two things are happening. The list items each contain internal commas, so semicolons separate the items, which the sentence already shows. The blank is a different job: introducing the list after a complete statement, which is a colon. Distinguishing the mark that introduces a list from the marks that separate its items is the whole of this question.",
    patternName: "Colon introduces, semicolons separate",
    concept: "Punctuating a complex list",
    recognitionCues: [
      "List items that each contain a comma",
      "Semicolons already visible between items",
      "A counting word before the blank",
    ],
    fastestMethod:
      "Separate the two roles. The blank introduces the list, so a colon; the marks inside the list are already there.",
    commonTraps: [
      "Copying the semicolons used inside the list",
      "Using a comma and losing the structure",
      "Not noticing the list is already punctuated",
    ],
    expectedSeconds: 65,
  },
  {
    id: "rw-bound-020",
    skillId: "boundaries",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The samples were stored at minus eighty degrees _______ a temperature at which cellular activity effectively stops.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 3,
    choices: [
      { label: "A", text: ",", isCorrect: true, rationale: "The phrase renames the temperature just given, which is an appositive and takes a comma." },
      {
        label: "B",
        text: ";",
        distractorType: "fragment",
        rationale: "What follows is a noun phrase describing the temperature, not an independent clause.",
      },
      {
        label: "C",
        text: "no punctuation",
        distractorType: "run_on",
        rationale: "Without the comma, degrees runs into a temperature and the appositive is lost.",
      },
      {
        label: "D",
        text: "and",
        distractorType: "wrong_relationship",
        rationale: "And implies a second, separate item, but this phrase renames the same temperature rather than adding another.",
      },
    ],
    explanation:
      "The phrase a temperature at which cellular activity effectively stops does not add a new thing; it renames minus eighty degrees. That is an appositive, and an appositive following what it renames is set off by a comma. The semicolon fails for the usual reason, since a noun phrase is not a clause, and and would wrongly suggest two different temperatures.",
    patternName: "Comma before an appositive",
    concept: "Renaming a noun just mentioned",
    recognitionCues: [
      "A noun phrase beginning with a or the after the blank",
      "The phrase describes the same thing as what precedes it",
      "A relative clause inside that phrase",
    ],
    fastestMethod:
      "Ask whether the phrase renames or adds. Renaming means an appositive and a comma; adding would need a conjunction.",
    commonTraps: [
      "Using a semicolon before a noun phrase",
      "Omitting the comma and creating a run-on",
      "Reading an appositive as a second item in a list",
    ],
    expectedSeconds: 50,
  },

  // --- Form, structure and sense --------------------------------------------
  {
    id: "rw-form-012",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The series of lectures that the department scheduled for the spring term _______ been postponed until October.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 3,
    choices: [
      { label: "A", text: "has", isCorrect: true, rationale: "The subject is series, which is singular, so the verb is singular." },
      {
        label: "B",
        text: "have",
        distractorType: "agreement_error",
        rationale: "This agrees with lectures, which sits inside a prepositional phrase and cannot be the subject.",
      },
      {
        label: "C",
        text: "were",
        distractorType: "agreement_error",
        rationale: "Plural, and were been is not a possible construction.",
      },
      {
        label: "D",
        text: "having",
        distractorType: "fragment",
        rationale: "A participle leaves the sentence without a finite verb at all.",
      },
    ],
    explanation:
      "Strip the modifiers: the series has been postponed. The plural lectures is the object of of and can never be the subject, and the relative clause that follows it is another layer of distraction. Collective nouns such as series, collection, group and number of this kind take singular verbs when treated as a single unit.",
    patternName: "Subject-verb agreement across an interrupting phrase",
    concept: "Locating the true subject",
    recognitionCues: [
      "A singular head noun followed by of plus a plural",
      "A relative clause between subject and verb",
      "Options differing in number",
    ],
    fastestMethod:
      "Cross out every of phrase and every relative clause, then read subject and verb together.",
    commonTraps: [
      "Agreeing with the nearest plural noun",
      "Being pulled into the past by a date in the modifier",
      "Choosing a participle and leaving no main verb",
    ],
    expectedSeconds: 50,
  },
  {
    id: "rw-form-013",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The conservation team documented every stage of the repair, from the initial survey to _______ of the final varnish layer.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "when they applied",
        distractorType: "parallelism_error",
        rationale: "A clause cannot balance the noun phrase the initial survey on the other side of from and to.",
      },
      { label: "B", text: "the application", isCorrect: true, rationale: "A noun phrase that parallels the initial survey, completing the from X to Y structure." },
      {
        label: "C",
        text: "applying",
        distractorType: "parallelism_error",
        rationale: "A gerund does not match the plain noun phrase on the other side of the comparison.",
      },
      {
        label: "D",
        text: "they applied",
        distractorType: "parallelism_error",
        rationale: "A clause again, which breaks the parallel and leaves the preposition to without a noun.",
      },
    ],
    explanation:
      "The construction from X to Y requires X and Y to be the same kind of phrase. X is the initial survey, a noun phrase, so Y must be a noun phrase too: the application. Checking the grammar of the preposition settles it as well, since to needs a noun rather than a clause after it in this pattern.",
    patternName: "Parallel structure across from X to Y",
    concept: "Matching grammatical forms in a correlative pair",
    recognitionCues: [
      "A correlative structure such as from X to Y or not only but also",
      "One side already given as a noun phrase",
      "Options mixing nouns, gerunds and clauses",
    ],
    fastestMethod:
      "Identify the form on the given side and match it exactly. Ignore which option sounds most natural alone.",
    commonTraps: [
      "Choosing a clause to balance a noun phrase",
      "Choosing a gerund because it sounds smoother",
      "Reading only the second half of the structure",
    ],
    expectedSeconds: 60,
  },
  {
    id: "rw-form-014",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "By the time the fieldwork concluded in 1974, the team _______ more than nine thousand specimens.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "has collected",
        distractorType: "tense_shift",
        rationale: "The present perfect connects to now, but the sentence is anchored in 1974.",
      },
      { label: "B", text: "had collected", isCorrect: true, rationale: "The past perfect describes action completed before a specified point in the past, which by the time requires." },
      {
        label: "C",
        text: "collects",
        distractorType: "tense_shift",
        rationale: "The present tense contradicts the completed past context.",
      },
      {
        label: "D",
        text: "will have collected",
        distractorType: "tense_shift",
        rationale: "The future perfect looks forward from the present and cannot apply to 1974.",
      },
    ],
    explanation:
      "By the time the fieldwork concluded in 1974 fixes a reference point in the past, and the collecting happened before it. Describing an action completed before a past moment calls for the past perfect. The present perfect in A would be correct only if the collecting continued up to today.",
    patternName: "Past perfect with a past reference point",
    concept: "Choosing tense from the sentence's time anchor",
    recognitionCues: [
      "A phrase such as by the time or before that with a past date",
      "A completed quantity or total",
      "Options spanning present, past and future forms",
    ],
    fastestMethod:
      "Find the time anchor first. A past anchor with an earlier completed action means past perfect.",
    commonTraps: [
      "Using the present perfect with a past anchor",
      "Ignoring the date",
      "Choosing a future form because the total sounds like an endpoint",
    ],
    expectedSeconds: 55,
  },
  {
    id: "rw-form-015",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Every one of the twelve manuscripts in the bequest _______ its own leather case.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      { label: "A", text: "has", isCorrect: true, rationale: "The subject is every one, which is singular, and the later pronoun its confirms it." },
      {
        label: "B",
        text: "have",
        distractorType: "agreement_error",
        rationale: "This agrees with manuscripts, which is inside a prepositional phrase and cannot be the subject.",
      },
      {
        label: "C",
        text: "are having",
        distractorType: "number_agreement",
        rationale: "Plural, and the progressive is wrong for a state of possession.",
      },
      {
        label: "D",
        text: "having",
        distractorType: "fragment",
        rationale: "A participle leaves the sentence with no main verb.",
      },
    ],
    explanation:
      "Every one is singular however plural the following noun looks, and the singular its later in the sentence confirms the reading. Note the difference from everyone as a single word, which is also singular, and from all of the manuscripts, which would be plural. Crossing out of the twelve manuscripts in the bequest leaves every one has its own case.",
    patternName: "Every one is singular",
    concept: "Agreement with quantifying expressions",
    recognitionCues: [
      "Every one, each one or any one followed by of",
      "A plural noun in the prepositional phrase",
      "A singular pronoun later in the sentence",
    ],
    fastestMethod:
      "Cross out the of phrase, then check the later pronoun. A singular pronoun settles the verb.",
    commonTraps: [
      "Agreeing with the nearest plural noun",
      "Confusing every one with all",
      "Choosing a progressive form for a state",
    ],
    expectedSeconds: 55,
  },
  {
    id: "rw-form-016",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "_______ almost entirely from recycled aluminium, the pavilion was dismantled and rebuilt three times.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      { label: "A", text: "Constructed", isCorrect: true, rationale: "The past participle describes the pavilion, which is the subject of the main clause." },
      {
        label: "B",
        text: "Constructing",
        distractorType: "misplaced_modifier",
        rationale: "The active participle says the pavilion did the constructing, which reverses the sense.",
      },
      {
        label: "C",
        text: "The architects constructed it",
        distractorType: "comma_splice",
        rationale: "This is an independent clause, so joining it to the main clause with only a comma creates a splice.",
      },
      {
        label: "D",
        text: "Having constructed",
        distractorType: "misplaced_modifier",
        rationale: "This also makes the pavilion the builder rather than the thing built.",
      },
    ],
    explanation:
      "An introductory participial phrase must describe the subject of the main clause, which here is the pavilion. The pavilion was constructed rather than doing any constructing, so the past participle is needed. Options B and D both give the pavilion an action it cannot perform, and C changes the grammar of the sentence entirely.",
    patternName: "Passive participle for a subject that receives the action",
    concept: "Matching an opening phrase to the main subject",
    recognitionCues: [
      "A blank at the very start followed by a comma",
      "A main clause whose subject is an object rather than a person",
      "Options offering both active and passive participles",
    ],
    fastestMethod:
      "Read the main clause subject first, then ask whether it performed or received the action in the phrase.",
    commonTraps: [
      "Choosing the active participle by default",
      "Introducing an independent clause after a comma",
      "Judging by sound rather than by who acts",
    ],
    expectedSeconds: 60,
  },
  {
    id: "rw-form-017",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The output of the northern turbines exceeded _______ by a margin of almost forty per cent.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "the southern array",
        distractorType: "comparison_error",
        rationale: "This compares an output with an array. The two sides of a comparison must be the same kind of thing.",
      },
      { label: "B", text: "that of the southern array", isCorrect: true, rationale: "That stands in for the output, so output is compared with output." },
      {
        label: "C",
        text: "those of the southern array",
        distractorType: "number_agreement",
        rationale: "Output is singular here, so the stand-in must be that rather than those.",
      },
      {
        label: "D",
        text: "the southern array did",
        distractorType: "comparison_error",
        rationale: "This leaves the comparison grammatically incomplete, since exceeded needs an object rather than a clause.",
      },
    ],
    explanation:
      "Comparisons must put like against like. As written, the sentence compares the output of one set of turbines with something belonging to another, and that something must also be an output. The pronoun that supplies it, and it is singular to match output. Those would be correct if the sentence compared plural quantities, such as the yields of the northern turbines.",
    patternName: "Logical comparison with that or those",
    concept: "Comparing like with like",
    recognitionCues: [
      "A comparison verb such as exceeded, surpassed or outperformed",
      "Two groups or places being compared",
      "Options offering both that and those",
    ],
    fastestMethod:
      "Name the two things being compared aloud. If they are different kinds of thing, you need that or those, matched in number to the first.",
    commonTraps: [
      "Comparing a quantity with a place or an object",
      "Getting the number of that or those wrong",
      "Turning the second half into a clause",
    ],
    expectedSeconds: 70,
  },
  {
    id: "rw-form-018",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Neither the director nor the lead actors _______ willing to discuss the ending before the premiere.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "was",
        distractorType: "agreement_error",
        rationale: "With neither and nor the verb agrees with the nearer subject, and actors is plural.",
      },
      { label: "B", text: "were", isCorrect: true, rationale: "The nearer subject is actors, which is plural, so the verb is plural." },
      {
        label: "C",
        text: "has been",
        distractorType: "agreement_error",
        rationale: "Singular, and the perfect aspect does not fit the past situation described.",
      },
      {
        label: "D",
        text: "is",
        distractorType: "tense_shift",
        rationale: "The present tense clashes with the completed past the sentence describes.",
      },
    ],
    explanation:
      "In a neither-nor pairing the verb agrees with whichever subject stands closer to it, which here is the plural actors. Reversing the order to neither the lead actors nor the director would make the answer was. The rule is about proximity, not about which subject seems more important, and it applies equally to either-or.",
    patternName: "Proximity agreement with neither-nor",
    concept: "Verb agreement with paired subjects",
    recognitionCues: [
      "The pairing neither ... nor or either ... or",
      "One singular and one plural subject",
      "The blank immediately after the second subject",
    ],
    fastestMethod:
      "Find the subject nearest the verb and agree with that one. Ignore the first entirely.",
    commonTraps: [
      "Agreeing with the first subject",
      "Assuming neither always takes a singular verb",
      "Changing tense as well as number",
    ],
    expectedSeconds: 55,
  },
  {
    id: "rw-form-019",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The museum returned the bronze to the community from which it had been taken, acknowledging that _______ claim to it had never lapsed.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "it's",
        distractorType: "possessive_error",
        rationale: "It's is the contraction of it is, which makes no sense before a noun here.",
      },
      {
        label: "B",
        text: "their",
        distractorType: "number_agreement",
        rationale: "The antecedent is community, a singular noun, so a plural pronoun does not agree.",
      },
      { label: "C", text: "its", isCorrect: true, rationale: "The singular possessive, agreeing with community and correctly showing possession of the claim." },
      {
        label: "D",
        text: "its'",
        distractorType: "possessive_error",
        rationale: "Its' is not a word in Standard English in any context.",
      },
    ],
    explanation:
      "Two decisions in sequence. Possession is involved, since the claim belongs to the community, and the possessive form of it is its with no apostrophe, because it's always means it is. Then agreement: community is singular, so their is wrong. The form its' does not exist at all.",
    patternName: "Its against it's",
    concept: "Possessive pronouns and apostrophes",
    recognitionCues: [
      "Options offering its, it's and their",
      "A singular collective noun as the antecedent",
      "A noun immediately after the blank",
    ],
    fastestMethod:
      "Read it is in place of the blank. If that is nonsense, the apostrophe is wrong. Then check the antecedent's number.",
    commonTraps: [
      "Using it's for possession",
      "Treating a collective noun as plural",
      "Writing its' which is never correct",
    ],
    expectedSeconds: 50,
  },
  {
    id: "rw-form-020",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The committee praised the proposal for its clarity, its costings and _______",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 4,
    choices: [
      { label: "A", text: "its realistic timetable.", isCorrect: true, rationale: "A noun phrase matching its clarity and its costings, keeping all three items parallel." },
      {
        label: "B",
        text: "the timetable was realistic.",
        distractorType: "parallelism_error",
        rationale: "A clause cannot sit alongside two noun phrases in a list.",
      },
      {
        label: "C",
        text: "because its timetable was realistic.",
        distractorType: "parallelism_error",
        rationale: "A subordinate clause breaks the series and duplicates the sense of for.",
      },
      {
        label: "D",
        text: "having a realistic timetable.",
        distractorType: "parallelism_error",
        rationale: "A gerund phrase does not match the two possessive noun phrases before it.",
      },
    ],
    explanation:
      "A list joined by and must have items of the same grammatical form. The first two are possessive noun phrases, its clarity and its costings, so the third must be one too. Options B, C and D each introduce a different structure, and C additionally repeats the reason already carried by for.",
    patternName: "Parallel items in a list",
    concept: "Keeping list items grammatically identical",
    recognitionCues: [
      "Two items given before the blank sharing an obvious form",
      "A list joined by and",
      "Options offering clauses and gerunds",
    ],
    fastestMethod:
      "Read the first two items, note their shape, and pick the option that matches. Judge form before meaning.",
    commonTraps: [
      "Choosing a clause to complete a list of phrases",
      "Doubling the reason marker",
      "Choosing the option that reads most smoothly alone",
    ],
    expectedSeconds: 60,
  },
  {
    id: "rw-form-021",
    skillId: "form-structure-and-sense",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Neither of the two translations _______ the wordplay of the original, though both are otherwise faithful.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    difficulty: 5,
    choices: [
      { label: "A", text: "preserves", isCorrect: true, rationale: "Neither used alone as a pronoun is singular, so the verb is singular." },
      {
        label: "B",
        text: "preserve",
        distractorType: "agreement_error",
        rationale: "This agrees with translations, which sits inside the of phrase and cannot be the subject.",
      },
      {
        label: "C",
        text: "have preserved",
        distractorType: "agreement_error",
        rationale: "Plural, and the perfect aspect sits oddly with the present-tense both are later in the sentence.",
      },
      {
        label: "D",
        text: "are preserving",
        distractorType: "number_agreement",
        rationale: "Plural and progressive, neither of which fits a singular subject describing a fixed property.",
      },
    ],
    explanation:
      "Neither on its own is a singular pronoun, so neither of the two translations preserves is correct, in the same way as neither is acceptable rather than neither are acceptable. This differs from the neither-nor construction, where the verb follows whichever subject is nearer. The later both are refers to the two translations directly, so it is correctly plural and is not evidence about the verb in the blank.",
    patternName: "Neither alone is singular",
    concept: "Neither as a pronoun against neither-nor as a pairing",
    recognitionCues: [
      "Neither followed by of rather than by nor",
      "A plural noun inside the of phrase",
      "A later plural verb that refers to something else",
    ],
    fastestMethod:
      "Check whether a nor appears. Without one, neither is a singular pronoun and takes a singular verb.",
    commonTraps: [
      "Agreeing with the plural noun after of",
      "Applying the neither-nor proximity rule where there is no nor",
      "Taking the later plural verb as a guide",
    ],
    expectedSeconds: 65,
  },

  // --- Transitions ----------------------------------------------------------
  {
    id: "rw-trans-010",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Peat bogs cover only three per cent of the land surface. _______ they hold roughly twice as much carbon as all the world's forests combined.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 3,
    choices: [
      { label: "A", text: "Nevertheless,", isCorrect: true, rationale: "A small area against an outsized carbon store is a contrast, and nevertheless marks it." },
      {
        label: "B",
        text: "Therefore,",
        distractorType: "wrong_relationship",
        rationale: "Holding more carbon is not a consequence of covering little land.",
      },
      {
        label: "C",
        text: "For example,",
        distractorType: "wrong_relationship",
        rationale: "The carbon figure is not an instance of the area figure; the two measure different things.",
      },
      {
        label: "D",
        text: "Similarly,",
        distractorType: "wrong_relationship",
        rationale: "The two sentences pull against each other rather than agreeing.",
      },
    ],
    explanation:
      "Reduce each sentence to its claim. First: bogs are a small part of the land. Second: they store an enormous share of the carbon. Small area but huge effect is a contrast, so a concessive transition is needed. Deciding the relationship in your own words before reading the options defeats the three plausible-sounding transitions in the wrong category.",
    patternName: "Small cause, large effect contrast",
    concept: "Concessive transitions",
    recognitionCues: [
      "Two figures that pull in opposite directions",
      "Words such as only or just in the first sentence",
      "Options spanning contrast, cause and example",
    ],
    fastestMethod:
      "Label each sentence small or large, then check whether the pairing is surprising. Surprise means contrast.",
    commonTraps: [
      "Reaching for a cause transition between two statistics",
      "Treating a second measurement as an example of the first",
      "Choosing similarly when the figures conflict",
    ],
    expectedSeconds: 50,
  },
  {
    id: "rw-trans-011",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The alloy is difficult to cast, expensive to machine and prone to cracking under thermal cycling. _______ it remains the only material qualified for the application.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Consequently,",
        distractorType: "wrong_relationship",
        rationale: "Remaining the only qualified material is not a consequence of being difficult and expensive.",
      },
      { label: "B", text: "For all that,", isCorrect: true, rationale: "Three drawbacks are conceded and then overridden, which is exactly what this concessive transition signals." },
      {
        label: "C",
        text: "In particular,",
        distractorType: "wrong_relationship",
        rationale: "This narrows to a specific case, but the second sentence widens to a general conclusion.",
      },
      {
        label: "D",
        text: "In addition,",
        distractorType: "wrong_relationship",
        rationale: "An additive transition implies another drawback, whereas the second sentence runs the other way.",
      },
    ],
    explanation:
      "The first sentence lists three disadvantages and the second says the material is used anyway. Conceding problems and then overriding them is concessive, so For all that is right. The trap is Consequently, which would be correct only if the second sentence followed from the drawbacks, and In addition, which would be correct only if a fourth drawback followed.",
    patternName: "Concede drawbacks then override them",
    concept: "Concessive against additive and causal transitions",
    recognitionCues: [
      "A list of negatives in the first sentence",
      "A word such as remains, still or nonetheless in the second",
      "Options mixing concession, cause and addition",
    ],
    fastestMethod:
      "Mark each sentence plus or minus. Opposite signs mean concession, however formal the wording of the option.",
    commonTraps: [
      "Choosing a causal transition after a list of problems",
      "Choosing an additive transition when the direction reverses",
      "Reading a general conclusion as a specific instance",
    ],
    expectedSeconds: 60,
  },
  {
    id: "rw-trans-012",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The first attempt to date the timbers used radiocarbon, which placed them in the twelfth century with a margin of several decades. _______ dendrochronology narrowed the felling date to a single year, 1173.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Likewise,",
        distractorType: "wrong_relationship",
        rationale: "The two methods gave very different precisions, so likewise misdescribes the relationship.",
      },
      { label: "B", text: "By contrast,", isCorrect: true, rationale: "Several decades against a single year is a direct contrast in precision between the two methods." },
      {
        label: "C",
        text: "Because of this,",
        distractorType: "wrong_relationship",
        rationale: "The tree-ring result does not follow from the radiocarbon result; it is an alternative to it.",
      },
      {
        label: "D",
        text: "For instance,",
        distractorType: "wrong_relationship",
        rationale: "Dendrochronology is not an example of radiocarbon dating; it is a different technique.",
      },
    ],
    explanation:
      "The two sentences describe two methods and the point is how differently precise they are: several decades against one year. That is a contrast. Because of this would require the second result to depend on the first, and For instance would require the second to be a case of the first, but the two techniques are independent.",
    patternName: "Contrast between two methods",
    concept: "Comparing precision as a contrast",
    recognitionCues: [
      "Two techniques or approaches described in sequence",
      "Figures showing very different precision",
      "Options offering similarity, cause and example",
    ],
    fastestMethod:
      "Ask whether the second sentence agrees with, follows from, or differs from the first. Differing precision is a contrast.",
    commonTraps: [
      "Choosing likewise because both are dating methods",
      "Inferring causation between independent results",
      "Treating a second method as an example of the first",
    ],
    expectedSeconds: 60,
  },
  {
    id: "rw-trans-013",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Soil samples were taken at six depths. Each was sieved, dried at 105 degrees and weighed. _______ the organic fraction was removed by combustion and the residue weighed again.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 3,
    choices: [
      { label: "A", text: "Next,", isCorrect: true, rationale: "The passage is describing a procedure in order, so a sequencing transition is what the structure calls for." },
      {
        label: "B",
        text: "However,",
        distractorType: "wrong_relationship",
        rationale: "Nothing is being contrasted; the second stage follows the first in a method.",
      },
      {
        label: "C",
        text: "Alternatively,",
        distractorType: "wrong_relationship",
        rationale: "This suggests a substitute step, but combustion was performed in addition rather than instead.",
      },
      {
        label: "D",
        text: "In conclusion,",
        distractorType: "wrong_relationship",
        rationale: "This signals the end of an argument, not the next step in a procedure.",
      },
    ],
    explanation:
      "The passage is a method written in order: sieved, dried, weighed, then combusted and weighed again. A sequencing transition marks the move to the next step. Methods sections are the most reliable place to expect sequencing rather than contrast, and the giveaway here is the chain of past-tense procedural verbs.",
    patternName: "Sequencing in a method",
    concept: "Recognising procedural order",
    recognitionCues: [
      "A chain of procedural verbs in order",
      "Measurements, temperatures or quantities for each step",
      "Options mixing sequence, contrast and conclusion",
    ],
    fastestMethod:
      "If the passage is describing how something was done, expect a sequencing transition unless a step genuinely contradicts an earlier one.",
    commonTraps: [
      "Reaching for however by default",
      "Reading an additional step as an alternative one",
      "Treating the final step as a conclusion to an argument",
    ],
    expectedSeconds: 50,
  },
  {
    id: "rw-trans-014",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "Supporters of the reform point to the fall in waiting times since 2021. _______ that fall began eighteen months before the reform took effect.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "Accordingly,",
        distractorType: "wrong_relationship",
        rationale: "The timing point does not follow from the supporters' claim; it undercuts it.",
      },
      {
        label: "B",
        text: "Similarly,",
        distractorType: "wrong_relationship",
        rationale: "The second sentence opposes the first rather than paralleling it.",
      },
      { label: "C", text: "In fact,", isCorrect: true, rationale: "It introduces a correction to the preceding claim, which is exactly what the timing evidence does." },
      {
        label: "D",
        text: "To that end,",
        distractorType: "wrong_relationship",
        rationale: "This signals a purpose or means, which has no bearing on a dispute about timing.",
      },
    ],
    explanation:
      "The first sentence reports what supporters claim; the second supplies a fact that undermines it, since a fall beginning before the reform cannot have been caused by it. The transition must signal correction, which In fact does. Watch for the frame supporters point to, because what follows very often pushes back against the reported view rather than endorsing it.",
    patternName: "Reported claim then corrective evidence",
    concept: "Corrective transitions",
    recognitionCues: [
      "A claim attributed to supporters, critics or advocates",
      "A timing or sequencing fact in the following sentence",
      "Options offering agreement and consequence",
    ],
    fastestMethod:
      "Separate what is being reported from what the author states. If the author's fact undercuts the reported claim, the transition is corrective.",
    commonTraps: [
      "Treating a reported view as the author's own",
      "Choosing an additive or causal transition for contradicting evidence",
      "Missing that the dates make causation impossible",
    ],
    expectedSeconds: 70,
  },
  {
    id: "rw-trans-015",
    skillId: "transitions",
    format: "mcq",
    stimulusTitle: "Passage",
    stimulus:
      "The device must operate unattended for a decade, survive temperatures from minus forty to sixty degrees, and run on a single battery. _______ the engineering constraints rule out almost every commercially available sensor.",
    stem: "Which choice completes the text with the most logical transition?",
    difficulty: 4,
    choices: [
      { label: "A", text: "Taken together,", isCorrect: true, rationale: "The conclusion follows from all three requirements combined rather than from any one of them." },
      {
        label: "B",
        text: "On the other hand,",
        distractorType: "wrong_relationship",
        rationale: "The second sentence follows from the first rather than opposing it.",
      },
      {
        label: "C",
        text: "Admittedly,",
        distractorType: "wrong_relationship",
        rationale: "Admittedly concedes something to an opposing view, and no opposing view is in play.",
      },
      {
        label: "D",
        text: "Meanwhile,",
        distractorType: "wrong_relationship",
        rationale: "Meanwhile marks simultaneity in time, which is irrelevant to a logical conclusion.",
      },
    ],
    explanation:
      "The first sentence lists three requirements and the second states what they jointly imply. A summarising transition signals that the conclusion rests on the whole set rather than on any single item. Simply Therefore would also be defensible, but Taken together is more precise about the three constraints acting in combination, and none of the other options describes the relationship at all.",
    patternName: "Several conditions then their joint consequence",
    concept: "Summarising transitions",
    recognitionCues: [
      "A list of requirements or findings",
      "A conclusion depending on all of them",
      "Words such as combined, together or jointly in the context",
    ],
    fastestMethod:
      "Check whether the conclusion depends on one item or on all of them. Depending on all means a summarising transition.",
    commonTraps: [
      "Choosing a contrast transition after a demanding list",
      "Using a concessive with nothing to concede",
      "Confusing simultaneity with consequence",
    ],
    expectedSeconds: 65,
  },

  // --- Rhetorical synthesis -------------------------------------------------
  {
    id: "rw-synth-009",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- The Svalbard Global Seed Vault opened in 2008.\n- It stores duplicate samples of seeds held in gene banks worldwide.\n- The vault is cut into permafrost about 130 metres above sea level.\n- Seeds are kept at minus 18 degrees Celsius.\n- In 2015 a withdrawal was made for the first time, to restore collections lost in Aleppo.",
    stem: "The student wants to explain why the vault's location was chosen. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 3,
    choices: [
      {
        label: "A",
        text: "The Svalbard Global Seed Vault, which opened in 2008, stores duplicate samples of seeds from gene banks worldwide.",
        distractorType: "true_but_irrelevant",
        rationale: "This explains what the vault does, not why it is where it is.",
      },
      { label: "B", text: "Cut into permafrost about 130 metres above sea level, the vault stays naturally frozen and sits well clear of rising seas.", isCorrect: true, rationale: "It uses the two location facts, permafrost and elevation, and draws out why each matters." },
      {
        label: "C",
        text: "Seeds in the vault are kept at minus 18 degrees Celsius.",
        distractorType: "partial_solution",
        rationale: "A storage condition rather than a reason for the site, and it says nothing about where the vault is.",
      },
      {
        label: "D",
        text: "In 2015 the vault made its first withdrawal, restoring collections lost in Aleppo.",
        distractorType: "true_but_irrelevant",
        rationale: "An important fact about the vault's use, with no bearing on the choice of location.",
      },
    ],
    explanation:
      "Read the goal first and test each option against it alone. Only two notes concern location, the permafrost and the elevation, and B uses both while making their significance explicit. A describes function, C describes a storage condition, and D describes an event. All four are accurate, so accuracy is not the test; fitness for the stated goal is.",
    patternName: "Goal asks why a choice was made",
    concept: "Selecting notes that answer the specific question",
    recognitionCues: [
      "A goal asking why something was chosen or done",
      "Notes mixing function, conditions and events",
      "Only one or two notes bearing on the goal",
    ],
    fastestMethod:
      "Underline the goal, identify which notes could possibly answer it, and reject every option built on the others.",
    commonTraps: [
      "Choosing a true statement about function",
      "Choosing a detail that sounds technical",
      "Choosing the option that uses the most notes",
    ],
    expectedSeconds: 75,
  },
  {
    id: "rw-synth-010",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- Mary Anning collected fossils on the Dorset coast in the early nineteenth century.\n- She identified the first correctly described ichthyosaur skeleton at the age of about twelve.\n- Her finds were bought and published by male geologists, usually without crediting her.\n- She was not eligible to join the Geological Society of London.\n- Her letters show detailed anatomical reasoning about the specimens.",
    stem: "The student wants to emphasise the gap between Anning's expertise and her formal recognition. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "Mary Anning collected fossils on the Dorset coast in the early nineteenth century.",
        distractorType: "true_but_irrelevant",
        rationale: "Biographical background that addresses neither her expertise nor her recognition.",
      },
      { label: "B", text: "Anning's letters show detailed anatomical reasoning about her specimens, yet she could not join the Geological Society and her finds were published by others without credit.", isCorrect: true, rationale: "It sets the evidence of expertise directly against the two facts about denied recognition, which is the gap the goal names." },
      {
        label: "C",
        text: "Anning identified the first correctly described ichthyosaur skeleton at about the age of twelve.",
        distractorType: "partial_solution",
        rationale: "Striking evidence of ability, but with nothing about recognition it cannot show a gap.",
      },
      {
        label: "D",
        text: "Anning was not eligible to join the Geological Society of London.",
        distractorType: "partial_solution",
        rationale: "One half of the gap. Without the expertise alongside it, there is no contrast.",
      },
    ],
    explanation:
      "A gap needs both sides in the same sentence. B pairs the evidence of expertise, her anatomical reasoning, with the two facts about recognition being withheld, and the word yet makes the contrast explicit. C gives only expertise and D only exclusion, so neither can show a gap, however striking each is on its own.",
    patternName: "Goal asks for a gap or contrast",
    concept: "Both sides of a contrast in one sentence",
    recognitionCues: [
      "A goal using gap, contrast, tension or despite",
      "Notes that split into two opposing groups",
      "Options giving only one side",
    ],
    fastestMethod:
      "Sort the notes into the two sides the goal names, then keep only an option that draws from both.",
    commonTraps: [
      "Choosing the most striking single fact",
      "Choosing an option with only one side of the contrast",
      "Choosing background biography",
    ],
    expectedSeconds: 85,
  },
  {
    id: "rw-synth-011",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- Cochineal is a red dye made from an insect that feeds on prickly pear cactus.\n- About 70,000 insects are needed to produce one kilogram of dye.\n- It was a major export from colonial Mexico, second only to silver.\n- Synthetic red dyes largely replaced it in the late nineteenth century.\n- It is used again today in cosmetics and some foods, listed as carmine.",
    stem: "The student wants to present the history of cochineal's commercial importance to an audience unfamiliar with the dye. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "About 70,000 insects are needed to produce one kilogram of cochineal dye.",
        distractorType: "partial_solution",
        rationale: "A vivid production fact, but it assumes the reader knows what cochineal is and says nothing about commercial history.",
      },
      { label: "B", text: "Cochineal, a red dye made from an insect that feeds on prickly pear, was once colonial Mexico's second most valuable export after silver, before synthetic dyes largely replaced it in the late nineteenth century.", isCorrect: true, rationale: "It identifies the dye for a new reader and then traces its commercial rise and decline, which is what the goal asks for." },
      {
        label: "C",
        text: "Synthetic red dyes largely replaced cochineal in the late nineteenth century, though it is used again today as carmine.",
        distractorType: "partial_solution",
        rationale: "It covers decline and revival but never says what cochineal is or why it mattered commercially.",
      },
      {
        label: "D",
        text: "Cochineal is used today in cosmetics and some foods, where it is listed as carmine.",
        distractorType: "true_but_irrelevant",
        rationale: "Present-day use only, with no history and no identification of the dye for an unfamiliar reader.",
      },
    ],
    explanation:
      "Two constraints operate. The audience is unfamiliar, so the sentence must say what cochineal is, and the goal is commercial history, so it must cover how its importance changed. Only B does both, identifying the dye and then tracing it from a top colonial export to displacement by synthetics. When a goal names an unfamiliar audience, the right answer almost always carries the identifying detail.",
    patternName: "Unfamiliar audience plus a historical goal",
    concept: "Combining identification with the stated aim",
    recognitionCues: [
      "A goal naming an unfamiliar audience",
      "A goal also naming a specific aspect such as history or importance",
      "Options that assume prior knowledge",
    ],
    fastestMethod:
      "Require two things: could a reader who knows nothing follow it, and does it address the named aspect? Few options satisfy both.",
    commonTraps: [
      "Choosing the most vivid statistic",
      "Choosing an option that covers the aspect but not the identification",
      "Choosing present-day use when history was asked for",
    ],
    expectedSeconds: 85,
  },
  {
    id: "rw-synth-012",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- Two groups measured the thermal conductivity of the same ceramic.\n- Group A used a laser flash method and reported 2.1 watts per metre-kelvin.\n- Group B used a steady-state method and reported 2.9.\n- Laser flash heats a thin sample briefly; steady state holds a gradient for hours.\n- Later work attributed the gap to microcracking that only affects the steady-state measurement.",
    stem: "The student wants to explain why the two measurements differed. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 5,
    choices: [
      {
        label: "A",
        text: "Group A reported 2.1 watts per metre-kelvin and Group B reported 2.9.",
        distractorType: "partial_solution",
        rationale: "It states that the measurements differed without offering any reason, which is what the goal asks for.",
      },
      {
        label: "B",
        text: "Laser flash heats a thin sample briefly, whereas steady state holds a temperature gradient for hours.",
        distractorType: "partial_solution",
        rationale: "A real difference between the methods, but on its own it does not explain the gap; the notes attribute that to microcracking.",
      },
      { label: "C", text: "Later work attributed the gap to microcracking, which affects the steady-state measurement but not the brief heating used in laser flash.", isCorrect: true, rationale: "It names the cause the notes identify and connects it to the specific method it affects." },
      {
        label: "D",
        text: "Two groups measured the same ceramic using different methods and obtained different results.",
        distractorType: "circular",
        rationale: "This restates the situation the goal asks to explain, adding nothing.",
      },
    ],
    explanation:
      "An explanation needs a cause, and the notes supply exactly one: microcracking affecting only the steady-state measurement. C names it and links it to the method it affects. A and D restate the discrepancy without explaining it, which is the commonest wrong answer to a why question, and B gives a methodological difference that the notes do not themselves identify as the cause.",
    patternName: "Explanatory goal needs the stated cause",
    concept: "Using the note that supplies the reason",
    recognitionCues: [
      "A goal asking why something happened or differed",
      "One note beginning later work attributed or researchers found",
      "Options that restate the phenomenon",
    ],
    fastestMethod:
      "Find the note that could follow the word because, then keep only options built on it.",
    commonTraps: [
      "Restating the discrepancy instead of explaining it",
      "Choosing a difference that is not identified as the cause",
      "Choosing the option with the most numbers in it",
    ],
    expectedSeconds: 90,
  },
  {
    id: "rw-synth-013",
    skillId: "rhetorical-synthesis",
    format: "mcq",
    stimulusTitle: "Notes",
    stimulus:
      "While researching a topic, a student has taken the following notes.\n\n- The Antikythera wreck was found by sponge divers in 1900.\n- Recovery work was dangerous: one diver died and two were paralysed.\n- Among the finds were bronze and marble statues and a corroded geared device.\n- The geared device was largely ignored for fifty years.\n- Modern imaging has since shown it modelled astronomical cycles.",
    stem: "The student wants to emphasise how long the device's significance went unrecognised. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    difficulty: 4,
    choices: [
      {
        label: "A",
        text: "The wreck was found by sponge divers in 1900, and recovery work killed one diver and paralysed two others.",
        distractorType: "true_but_irrelevant",
        rationale: "The human cost of the recovery, which has nothing to do with how the device was regarded afterwards.",
      },
      { label: "B", text: "Recovered in 1900 among statues of bronze and marble, the corroded geared device was largely ignored for fifty years before modern imaging showed it modelled astronomical cycles.", isCorrect: true, rationale: "It names the fifty-year neglect and contrasts it with what the device turned out to be, which is the emphasis the goal asks for." },
      {
        label: "C",
        text: "Modern imaging has shown that the device modelled astronomical cycles.",
        distractorType: "partial_solution",
        rationale: "The eventual finding, with no indication of how long it took to arrive.",
      },
      {
        label: "D",
        text: "The finds included bronze and marble statues as well as a corroded geared device.",
        distractorType: "partial_solution",
        rationale: "An inventory of the finds that says nothing about recognition or delay.",
      },
    ],
    explanation:
      "Emphasising how long something went unrecognised needs both the duration and what was eventually recognised, otherwise there is nothing to measure the delay against. B supplies both: fifty years ignored, then the astronomical function revealed. C gives the discovery without the delay, D gives neither, and A describes a different aspect of the story entirely.",
    patternName: "Emphasise a delay",
    concept: "Pairing a duration with the eventual outcome",
    recognitionCues: [
      "A goal using how long, delay or overlooked",
      "A note giving a span of years",
      "A note giving the eventual finding",
    ],
    fastestMethod:
      "Require the duration and the outcome in the same option. Either alone cannot convey a delay.",
    commonTraps: [
      "Choosing the dramatic human-interest detail",
      "Choosing the eventual finding without the delay",
      "Choosing an inventory of the finds",
    ],
    expectedSeconds: 80,
  },
];
