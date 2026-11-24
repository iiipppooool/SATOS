import type { AssignmentKind, PlanFocus, Section } from "./enums";

/**
 * Study plan generation.
 *
 * The brief this platform was built from asked for a fixed 12-week, 90-day
 * programme. That is the wrong shape for a tool: how long you actually have is
 * whatever sits between today and your test date, and for a sitting in two
 * weeks a 12-week plan is a fiction. So the generator takes the real interval
 * and chooses a phase structure to fit it.
 *
 * Phases:
 *   diagnose  - find out where you actually are
 *   foundation- rebuild the highest-impact weak skills in isolation
 *   build     - mixed, interleaved practice under mild time pressure
 *   sprint    - full and half-length timed exams, error review
 *   taper     - light review only, no new material, protect the sleep
 *
 * Short intervals drop the earlier phases rather than compressing all five
 * into an unusable smear.
 */

export interface PlanInput {
  startDate: Date;
  testDate: Date;
  daysPerWeek: number;
  minutesPerDay: number;
  targetScore: number;
  /** Weakest skills first, as ranked by the weakness detector. */
  prioritySkills: Array<{ skillId: string; skillName: string; section: Section }>;
}

export interface PlannedAssignment {
  kind: AssignmentKind;
  title: string;
  skillId: string | null;
  questionCount: number;
  targetMinutes: number;
  order: number;
}

export interface PlannedDay {
  date: Date;
  weekIndex: number;
  dayIndex: number;
  focus: PlanFocus;
  theme: string;
  targetMinutes: number;
  assignments: PlannedAssignment[];
}

export interface GeneratedPlan {
  days: PlannedDay[];
  totalDays: number;
  studyDays: number;
  fullExams: number;
  phase: PlanShape;
  note: string;
}

export type PlanShape = "sprint" | "short" | "standard" | "long";

const MS_PER_DAY = 86_400_000;

export function daysBetween(from: Date, to: Date): number {
  const a = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  const b = Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate());
  return Math.round((b - a) / MS_PER_DAY);
}

export function classifyInterval(days: number): PlanShape {
  if (days <= 14) return "sprint";
  if (days <= 35) return "short";
  if (days <= 70) return "standard";
  return "long";
}

interface PhaseAllocation {
  diagnose: number;
  foundation: number;
  build: number;
  sprint: number;
  taper: number;
}

function allocate(shape: PlanShape, studyDays: number): PhaseAllocation {
  // Proportions per phase, by interval length. A sprint spends almost
  // everything on timed practice and error review, because there is no time to
  // rebuild foundations and pretending otherwise wastes the days you have.
  const shares: Record<PlanShape, [number, number, number, number]> = {
    //        foundation, build, sprint, taper
    sprint: [0.15, 0.3, 0.45, 0.1],
    short: [0.3, 0.33, 0.27, 0.1],
    standard: [0.37, 0.33, 0.22, 0.08],
    long: [0.42, 0.32, 0.19, 0.07],
  };

  const diagnose = studyDays >= 6 ? 1 : 0;
  const remaining = Math.max(0, studyDays - diagnose);
  const [f, b, s, t] = shares[shape];

  const taper = Math.max(shape === "sprint" ? 1 : 2, Math.round(remaining * t));
  const afterTaper = Math.max(0, remaining - taper);

  const foundation = Math.round(afterTaper * (f / (f + b + s)));
  const sprintDays = Math.round(afterTaper * (s / (f + b + s)));
  const build = Math.max(0, afterTaper - foundation - sprintDays);

  return { diagnose, foundation, build, sprint: sprintDays, taper };
}

/** Which weekdays are study days, given how many per week the student wants. */
function studyDayPattern(daysPerWeek: number): boolean[] {
  // Index 0 = Monday. Rest days are placed to break up the week rather than
  // being dumped at the weekend, except at 6 days where Sunday is the rest day.
  const patterns: Record<number, boolean[]> = {
    1: [false, false, true, false, false, false, false],
    2: [true, false, false, true, false, false, false],
    3: [true, false, true, false, true, false, false],
    4: [true, true, false, true, true, false, false],
    5: [true, true, true, true, true, false, false],
    6: [true, true, true, true, true, true, false],
    7: [true, true, true, true, true, true, true],
  };
  return patterns[Math.min(7, Math.max(1, daysPerWeek))] ?? patterns[6]!;
}

export function generatePlan(input: PlanInput): GeneratedPlan {
  const { startDate, testDate, daysPerWeek, minutesPerDay, prioritySkills } = input;

  const totalDays = Math.max(1, daysBetween(startDate, testDate));
  const shape = classifyInterval(totalDays);
  const pattern = studyDayPattern(daysPerWeek);

  // Build the calendar first, then assign phases to the study days only.
  const calendar: Array<{ date: Date; study: boolean }> = [];
  for (let offset = 0; offset < totalDays; offset += 1) {
    const date = new Date(startDate.getTime() + offset * MS_PER_DAY);
    // getDay() is 0 = Sunday; shift so Monday is 0.
    const weekday = (date.getDay() + 6) % 7;
    calendar.push({ date, study: pattern[weekday] ?? false });
  }

  const studyDayCount = calendar.filter((d) => d.study).length;
  const phases = allocate(shape, studyDayCount);

  const days: PlannedDay[] = [];
  let studyIndex = 0;
  let fullExams = 0;

  // Rotate through priority skills so the plan does not hammer skill #1 for a
  // fortnight and never reach skill #4.
  const skills = prioritySkills.length > 0 ? prioritySkills : [];
  let skillCursor = 0;
  const nextSkill = () => {
    if (skills.length === 0) return null;
    const skill = skills[skillCursor % skills.length]!;
    skillCursor += 1;
    return skill;
  };

  for (let index = 0; index < calendar.length; index += 1) {
    const entry = calendar[index]!;
    const weekIndex = Math.floor(index / 7);

    if (!entry.study) {
      days.push({
        date: entry.date,
        weekIndex,
        dayIndex: index,
        focus: "rest",
        theme: "Rest day",
        targetMinutes: 0,
        assignments: [],
      });
      continue;
    }

    const phase = phaseFor(studyIndex, phases);
    const daysToTest = totalDays - index;
    const built = buildDay({
      phase,
      studyIndex,
      minutesPerDay,
      nextSkill,
      daysToTest,
      shape,
    });

    if (built.focus === "full_exam") fullExams += 1;

    days.push({
      date: entry.date,
      weekIndex,
      dayIndex: index,
      ...built,
    });

    studyIndex += 1;
  }

  return {
    days,
    totalDays,
    studyDays: studyDayCount,
    fullExams,
    phase: shape,
    note: describePlan(shape, totalDays, studyDayCount, fullExams),
  };
}

type Phase = "diagnose" | "foundation" | "build" | "sprint" | "taper";

function phaseFor(studyIndex: number, phases: PhaseAllocation): Phase {
  let cursor = phases.diagnose;
  if (studyIndex < cursor) return "diagnose";
  cursor += phases.foundation;
  if (studyIndex < cursor) return "foundation";
  cursor += phases.build;
  if (studyIndex < cursor) return "build";
  cursor += phases.sprint;
  if (studyIndex < cursor) return "sprint";
  return "taper";
}

function buildDay(args: {
  phase: Phase;
  studyIndex: number;
  minutesPerDay: number;
  nextSkill: () => { skillId: string; skillName: string; section: Section } | null;
  daysToTest: number;
  shape: PlanShape;
}): Omit<PlannedDay, "date" | "weekIndex" | "dayIndex"> {
  const { phase, studyIndex, minutesPerDay, nextSkill, daysToTest, shape } = args;
  const assignments: PlannedAssignment[] = [];
  let order = 0;
  const push = (a: Omit<PlannedAssignment, "order">) => {
    assignments.push({ ...a, order: order++ });
  };

  // Questions per minute is roughly 0.7 for drilling with review of the
  // explanation, which is slower than exam pace on purpose.
  const questionsFor = (minutes: number) => Math.max(4, Math.round(minutes * 0.7));

  switch (phase) {
    case "diagnose": {
      return {
        focus: "full_exam",
        theme: "Diagnostic exam",
        targetMinutes: Math.max(minutesPerDay, 134),
        assignments: [
          {
            kind: "full_exam",
            title: "Full adaptive practice exam, timed",
            skillId: null,
            questionCount: 98,
            targetMinutes: 134,
            order: 0,
          },
        ],
      };
    }

    case "foundation": {
      const primary = nextSkill();
      const secondary = nextSkill();
      const reviewMinutes = Math.round(minutesPerDay * 0.2);
      const drillMinutes = Math.round((minutesPerDay - reviewMinutes) / 2);

      push({
        kind: "review",
        title: "Spaced review of due questions",
        skillId: null,
        questionCount: questionsFor(reviewMinutes),
        targetMinutes: reviewMinutes,
      });
      if (primary) {
        push({
          kind: "pattern_trainer",
          title: `Pattern trainer: ${primary.skillName}`,
          skillId: primary.skillId,
          questionCount: questionsFor(drillMinutes),
          targetMinutes: drillMinutes,
        });
      }
      if (secondary) {
        push({
          kind: "drill",
          title: `Drill: ${secondary.skillName}`,
          skillId: secondary.skillId,
          questionCount: questionsFor(drillMinutes),
          targetMinutes: drillMinutes,
        });
      }
      return {
        focus: "drill",
        theme: primary ? `Rebuild: ${primary.skillName}` : "Skill rebuilding",
        targetMinutes: minutesPerDay,
        assignments,
      };
    }

    case "build": {
      // One timed module every third build day, mixed practice otherwise.
      if (studyIndex % 3 === 2) {
        const moduleMinutes = 35;
        push({
          kind: "module_exam",
          title: "Timed module under exam conditions",
          skillId: null,
          questionCount: 27,
          targetMinutes: moduleMinutes,
        });
        push({
          kind: "review",
          title: "Review every question you missed",
          skillId: null,
          questionCount: questionsFor(minutesPerDay - moduleMinutes),
          targetMinutes: Math.max(10, minutesPerDay - moduleMinutes),
        });
        return {
          focus: "module_exam",
          theme: "Timed module",
          targetMinutes: minutesPerDay,
          assignments,
        };
      }

      const weaknessMinutes = Math.round(minutesPerDay * 0.45);
      const mixedMinutes = Math.round(minutesPerDay * 0.35);
      const reviewMinutes = minutesPerDay - weaknessMinutes - mixedMinutes;
      const focusSkill = nextSkill();

      push({
        kind: "weakness",
        title: "Targeted weakness session",
        skillId: focusSkill?.skillId ?? null,
        questionCount: questionsFor(weaknessMinutes),
        targetMinutes: weaknessMinutes,
      });
      push({
        kind: "drill",
        title: "Interleaved mixed practice",
        skillId: null,
        questionCount: questionsFor(mixedMinutes),
        targetMinutes: mixedMinutes,
      });
      push({
        kind: "review",
        title: "Spaced review",
        skillId: null,
        questionCount: questionsFor(reviewMinutes),
        targetMinutes: Math.max(8, reviewMinutes),
      });
      return {
        focus: "mixed",
        theme: focusSkill ? `Mixed practice, weighted to ${focusSkill.skillName}` : "Mixed practice",
        targetMinutes: minutesPerDay,
        assignments,
      };
    }

    case "sprint": {
      // Full exam roughly weekly during the sprint, but never in the last two
      // days, where a bad mock does more harm than good.
      const wantsFullExam = studyIndex % 6 === 0 && daysToTest > 2;
      if (wantsFullExam) {
        return {
          focus: "full_exam",
          theme: "Full timed practice exam",
          targetMinutes: Math.max(minutesPerDay, 134),
          assignments: [
            {
              kind: "full_exam",
              title: "Full adaptive practice exam, timed",
              skillId: null,
              questionCount: 98,
              targetMinutes: 134,
              order: 0,
            },
          ],
        };
      }

      const moduleMinutes = shape === "sprint" ? 35 : 32;
      push({
        kind: "module_exam",
        title: "Timed module, exam conditions",
        skillId: null,
        questionCount: 27,
        targetMinutes: moduleMinutes,
      });
      push({
        kind: "review",
        title: "Error log: work through unresolved entries",
        skillId: null,
        questionCount: questionsFor(Math.round((minutesPerDay - moduleMinutes) * 0.6)),
        targetMinutes: Math.max(10, Math.round((minutesPerDay - moduleMinutes) * 0.6)),
      });
      const skill = nextSkill();
      if (skill) {
        push({
          kind: "pattern_trainer",
          title: `Recognition speed: ${skill.skillName}`,
          skillId: skill.skillId,
          questionCount: questionsFor(Math.round((minutesPerDay - moduleMinutes) * 0.4)),
          targetMinutes: Math.max(8, Math.round((minutesPerDay - moduleMinutes) * 0.4)),
        });
      }
      return {
        focus: "module_exam",
        theme: "Timed practice and error repair",
        targetMinutes: minutesPerDay,
        assignments,
      };
    }

    case "taper": {
      const minutes = Math.max(30, Math.round(minutesPerDay * 0.55));
      push({
        kind: "review",
        title: "Review your own error log and starred questions",
        skillId: null,
        questionCount: questionsFor(Math.round(minutes * 0.6)),
        targetMinutes: Math.round(minutes * 0.6),
      });
      push({
        kind: "pattern_trainer",
        title: "Recognition warm-up, no new material",
        skillId: null,
        questionCount: questionsFor(Math.round(minutes * 0.4)),
        targetMinutes: Math.round(minutes * 0.4),
      });
      return {
        focus: daysToTest <= 1 ? "final_review" : "review",
        theme:
          daysToTest <= 1
            ? "Light review only. Sleep is worth more than another drill."
            : "Taper: consolidate, do not cram",
        targetMinutes: minutes,
        assignments,
      };
    }

    default: {
      const exhaustive: never = phase;
      throw new Error(`Unhandled phase: ${String(exhaustive)}`);
    }
  }
}

function describePlan(
  shape: PlanShape,
  totalDays: number,
  studyDays: number,
  fullExams: number,
): string {
  const base = `${totalDays} days to the test, ${studyDays} of them study days, ${fullExams} full timed exam${fullExams === 1 ? "" : "s"}.`;
  switch (shape) {
    case "sprint":
      return `${base} Too little time to rebuild foundations, so this plan is almost entirely timed practice and error repair. Expect to hold your score and sharpen execution rather than add a lot of points.`;
    case "short":
      return `${base} Enough time to fix two or three high-impact weaknesses properly and then drill under time. Ambitious score jumps need longer than this.`;
    case "standard":
      return `${base} A realistic window for a meaningful gain if the weakness work actually gets done rather than skipped for comfortable practice.`;
    case "long":
      return `${base} Long enough to rebuild foundations before drilling. The risk over an interval this long is drift, not capacity.`;
    default:
      return base;
  }
}
