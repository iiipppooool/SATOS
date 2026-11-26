import type { Section } from "./enums";

/**
 * The digital SAT content taxonomy: Section -> Domain -> Skill.
 *
 * PROVENANCE WARNING. The domain weights and blueprint counts below are taken
 * from the College Board digital SAT assessment specification as best known to
 * the author of this file, but they were NOT verified against the live
 * specification when this file was written (the build environment had no
 * network access to collegeboard.org).
 *
 * They are therefore seeded into the database as editable rows rather than
 * being hardcoded into the scoring logic, and Settings -> Blueprint exposes
 * them for correction. Before trusting a score estimate, check these against
 * the current "Assessment Framework for the Digital SAT Suite" and correct any
 * that have drifted. Everything downstream reads the database, so fixing a
 * number there fixes the whole app.
 */

export const BLUEPRINT_UNVERIFIED_NOTE =
  "Blueprint figures follow the College Board digital SAT specification but have not been machine-verified. Check them in Settings before relying on score estimates.";

export interface SkillSeed {
  id: string;
  name: string;
  blurb: string;
}

export interface DomainSeed {
  id: string;
  section: Section;
  name: string;
  /** Share of the section's operational questions, 0..1. */
  weight: number;
  skills: SkillSeed[];
}

export const DOMAINS: DomainSeed[] = [
  // --- Reading and Writing ------------------------------------------------
  {
    id: "information-and-ideas",
    section: "reading_writing",
    name: "Information and Ideas",
    weight: 0.26,
    skills: [
      {
        id: "central-ideas-and-details",
        name: "Central Ideas and Details",
        blurb: "Identify the main claim of a text, or a detail that the text explicitly states.",
      },
      {
        id: "command-of-evidence-textual",
        name: "Command of Evidence (Textual)",
        blurb: "Choose the quotation that most directly supports or weakens a given claim.",
      },
      {
        id: "command-of-evidence-quantitative",
        name: "Command of Evidence (Quantitative)",
        blurb: "Read a table or graph and pick the data point that completes an argument.",
      },
      {
        id: "inferences",
        name: "Inferences",
        blurb: "Complete a text with the conclusion it most logically supports.",
      },
    ],
  },
  {
    id: "craft-and-structure",
    section: "reading_writing",
    name: "Craft and Structure",
    weight: 0.28,
    skills: [
      {
        id: "words-in-context",
        name: "Words in Context",
        blurb: "Choose the word or phrase that best fits the sentence's logic and register.",
      },
      {
        id: "text-structure-and-purpose",
        name: "Text Structure and Purpose",
        blurb: "Describe how a text is organised, or what a sentence is doing within it.",
      },
      {
        id: "cross-text-connections",
        name: "Cross-Text Connections",
        blurb: "Compare how two texts treat the same topic, usually where they disagree.",
      },
    ],
  },
  {
    id: "expression-of-ideas",
    section: "reading_writing",
    name: "Expression of Ideas",
    weight: 0.20,
    skills: [
      {
        id: "rhetorical-synthesis",
        name: "Rhetorical Synthesis",
        blurb: "Select the sentence that uses given notes to achieve a stated rhetorical goal.",
      },
      {
        id: "transitions",
        name: "Transitions",
        blurb: "Choose the transition that matches the logical relationship between two ideas.",
      },
    ],
  },
  {
    id: "standard-english-conventions",
    section: "reading_writing",
    name: "Standard English Conventions",
    weight: 0.26,
    skills: [
      {
        id: "boundaries",
        name: "Boundaries",
        blurb: "Punctuate sentence boundaries: splices, fragments, semicolons, colons and dashes.",
      },
      {
        id: "form-structure-and-sense",
        name: "Form, Structure, and Sense",
        blurb: "Agreement, verb tense and form, pronouns, modifiers and parallel structure.",
      },
    ],
  },

  // --- Maths --------------------------------------------------------------
  {
    id: "algebra",
    section: "math",
    name: "Algebra",
    weight: 0.35,
    skills: [
      {
        id: "linear-equations-one-variable",
        name: "Linear equations in one variable",
        blurb: "Solve, and recognise when an equation has no solution or infinitely many.",
      },
      {
        id: "linear-equations-two-variables",
        name: "Linear equations in two variables",
        blurb: "Slope, intercepts, and translating between equations, tables, graphs and words.",
      },
      {
        id: "linear-functions",
        name: "Linear functions",
        blurb: "Interpret linear models in context, including the meaning of rate and intercept.",
      },
      {
        id: "systems-two-linear-equations",
        name: "Systems of two linear equations in two variables",
        blurb: "Solve by substitution or elimination, and reason about numbers of solutions.",
      },
      {
        id: "linear-inequalities",
        name: "Linear inequalities in one or two variables",
        blurb: "Solve inequalities and interpret shaded regions and feasible sets.",
      },
    ],
  },
  {
    id: "advanced-math",
    section: "math",
    name: "Advanced Math",
    weight: 0.35,
    skills: [
      {
        id: "equivalent-expressions",
        name: "Equivalent expressions",
        blurb: "Factor, expand, and rewrite expressions, including rational and radical forms.",
      },
      {
        id: "nonlinear-equations-and-systems",
        name: "Nonlinear equations in one variable and systems of equations in two variables",
        blurb: "Quadratics and higher-order equations, and systems mixing lines with curves.",
      },
      {
        id: "nonlinear-functions",
        name: "Nonlinear functions",
        blurb: "Quadratic, exponential and other nonlinear models, their graphs and parameters.",
      },
    ],
  },
  {
    id: "problem-solving-and-data-analysis",
    section: "math",
    name: "Problem-Solving and Data Analysis",
    weight: 0.15,
    skills: [
      {
        id: "ratios-rates-proportions-units",
        name: "Ratios, rates, proportional relationships, and units",
        blurb: "Scale quantities and convert units, including compound units.",
      },
      {
        id: "percentages",
        name: "Percentages",
        blurb: "Percentage change, reverse percentages and successive changes.",
      },
      {
        id: "one-variable-data",
        name: "One-variable data: distributions and measures of centre and spread",
        blurb: "Mean, median, range and standard deviation, and how outliers move them.",
      },
      {
        id: "two-variable-data",
        name: "Two-variable data: models and scatterplots",
        blurb: "Lines and curves of best fit, and predicting from a model.",
      },
      {
        id: "probability",
        name: "Probability and conditional probability",
        blurb: "Read two-way tables and compute conditional probabilities.",
      },
      {
        id: "inference-and-margin-of-error",
        name: "Inference from sample statistics and margin of error",
        blurb: "Interpret confidence intervals and what widens or narrows them.",
      },
      {
        id: "evaluating-statistical-claims",
        name: "Evaluating statistical claims: observational studies and experiments",
        blurb: "Judge whether a design supports a causal claim or only an association.",
      },
    ],
  },
  {
    id: "geometry-and-trigonometry",
    section: "math",
    name: "Geometry and Trigonometry",
    weight: 0.15,
    skills: [
      {
        id: "area-and-volume",
        name: "Area and volume",
        blurb: "Composite figures, scaling in two and three dimensions, and solids.",
      },
      {
        id: "lines-angles-triangles",
        name: "Lines, angles, and triangles",
        blurb: "Parallel-line angles, triangle rules and similarity.",
      },
      {
        id: "right-triangles-and-trigonometry",
        name: "Right triangles and trigonometry",
        blurb: "Pythagoras, special right triangles, and sine, cosine and tangent.",
      },
      {
        id: "circles",
        name: "Circles",
        blurb: "Arcs, sectors, radians, tangents and the equation of a circle.",
      },
    ],
  },
];

/**
 * Operational blueprint used by the exam simulator.
 *
 * Each section is delivered as two modules. The first module is the same mix
 * for everyone; the second is selected by performance on the first, which is
 * why the test is called multistage adaptive rather than item-adaptive.
 */
export interface ModuleBlueprint {
  slot: "rw1" | "rw2" | "math1" | "math2";
  section: Section;
  /** Questions shown, including the pretest items that do not count. */
  questionCount: number;
  /** Of those, how many are unscored pretest items. */
  pretestCount: number;
  durationSec: number;
  order: number;
}

export const EXAM_BLUEPRINT: ModuleBlueprint[] = [
  { slot: "rw1", section: "reading_writing", questionCount: 27, pretestCount: 2, durationSec: 32 * 60, order: 0 },
  { slot: "rw2", section: "reading_writing", questionCount: 27, pretestCount: 2, durationSec: 32 * 60, order: 1 },
  { slot: "math1", section: "math", questionCount: 22, pretestCount: 2, durationSec: 35 * 60, order: 2 },
  { slot: "math2", section: "math", questionCount: 22, pretestCount: 2, durationSec: 35 * 60, order: 3 },
];

/** A 10-minute break falls between the Reading and Writing and Maths sections. */
export const SECTION_BREAK_SEC = 10 * 60;

/** Roughly a quarter of Maths questions are type-in rather than multiple choice. */
export const MATH_SPR_SHARE = 0.25;

export const SCALED_MIN = 200;
export const SCALED_MAX = 800;
export const TOTAL_MIN = 400;
export const TOTAL_MAX = 1600;

export function operationalCount(section: Section): number {
  return EXAM_BLUEPRINT.filter((m) => m.section === section).reduce(
    (sum, m) => sum + m.questionCount - m.pretestCount,
    0,
  );
}

export function sectionDurationSec(section: Section): number {
  return EXAM_BLUEPRINT.filter((m) => m.section === section).reduce(
    (sum, m) => sum + m.durationSec,
    0,
  );
}

export const ALL_SKILLS: ReadonlyArray<SkillSeed & { domainId: string; section: Section }> =
  DOMAINS.flatMap((d) =>
    d.skills.map((s) => ({ ...s, domainId: d.id, section: d.section })),
  );

export function skillById(id: string) {
  return ALL_SKILLS.find((s) => s.id === id);
}

export function domainById(id: string) {
  return DOMAINS.find((d) => d.id === id);
}
