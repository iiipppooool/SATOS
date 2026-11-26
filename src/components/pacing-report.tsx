import { AlertTriangle, Check, Clock } from "lucide-react";
import type { PacingReport } from "@/lib/queries";
import { SECTION_LABEL } from "@/lib/domain/enums";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Notice,
  Stat,
} from "@/components/ui";
import { cn } from "@/lib/cn";

const VERDICT: Record<
  "on_pace" | "tight" | "over",
  { label: string; tone: "correct" | "warning" | "wrong" }
> = {
  on_pace: { label: "On pace", tone: "correct" },
  tight: { label: "Tight", tone: "warning" },
  over: { label: "Over budget", tone: "wrong" },
};

export function PacingReportView({ report }: { report: PacingReport }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {report.sections.map((section) => {
          const verdict = VERDICT[section.verdict];
          const enoughData = section.attempts >= 8;

          return (
            <Card key={section.section}>
              <CardHeader>
                <div>
                  <CardTitle>{section.sectionLabel}</CardTitle>
                  <p className="mt-1 text-xs text-text-muted">
                    {section.questionsPerModule} questions in {section.minutesPerModule} minutes,
                    so {section.targetSeconds}s each.
                  </p>
                </div>
                {enoughData ? (
                  <Badge tone={verdict.tone}>
                    {section.verdict === "on_pace" ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                    {verdict.label}
                  </Badge>
                ) : (
                  <Badge tone="neutral">Not enough data</Badge>
                )}
              </CardHeader>

              <CardBody className="space-y-4 pt-3">
                <div className="grid grid-cols-3 gap-4">
                  <Stat
                    label="Your median"
                    tone={
                      !enoughData
                        ? "neutral"
                        : section.medianSeconds <= section.targetSeconds
                          ? "correct"
                          : "warning"
                    }
                    value={section.attempts > 0 ? `${section.medianSeconds}s` : "--"}
                    sub={`target ${section.targetSeconds}s`}
                  />
                  <Stat
                    label="Projected module"
                    value={section.attempts > 0 ? `${section.projectedMinutes}m` : "--"}
                    sub={`allowed ${section.minutesPerModule}m`}
                  />
                  <Stat
                    label="Unreached"
                    tone={section.questionsAtRisk > 0 ? "wrong" : "correct"}
                    value={section.attempts > 0 ? section.questionsAtRisk : "--"}
                    sub="questions at this pace"
                  />
                </div>

                {/*
                 * A budget bar rather than a chart: there is one number and one
                 * threshold, so a bar reads faster than axes would.
                 */}
                {section.attempts > 0 ? (
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-[11px] text-text-subtle">
                      <span>Time used against the module budget</span>
                      <span className="numeric">
                        {section.projectedMinutes}m / {section.minutesPerModule}m
                      </span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-bg-sunken">
                      <div
                        className={cn(
                          "h-full rounded-full transition-[width] duration-500",
                          section.minutesOverBudget > 0 ? "bg-wrong" : "bg-correct",
                        )}
                        style={{
                          width: `${Math.min(
                            100,
                            (section.projectedMinutes / section.minutesPerModule) * 100,
                          )}%`,
                          backgroundColor:
                            section.minutesOverBudget > 0 ? "var(--wrong)" : "var(--correct)",
                        }}
                      />
                    </div>
                  </div>
                ) : null}

                <Notice tone={section.verdict === "over" ? "warning" : "neutral"}>
                  {section.advice}
                </Notice>

                {section.attempts > 0 ? (
                  <p className="text-[11px] text-text-subtle">
                    Based on {section.attempts} timed attempts.{" "}
                    {Math.round(section.slowShare * 100)}% ran more than half as long again as the
                    question&apos;s own target. Median is used rather than mean, so one long stare
                    does not define your pace.
                  </p>
                ) : null}
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Where the time goes</CardTitle>
            <p className="mt-1 text-xs text-text-muted">
              Ranked by seconds each skill is projected to cost over a full module, which weights
              how slow you are by how often the skill appears. A skill 40 seconds over that turns
              up once matters less than one 15 seconds over that turns up five times.
            </p>
          </div>
          <Clock className="h-4 w-4 shrink-0 text-text-subtle" />
        </CardHeader>
        <CardBody className="pt-3">
          {report.skills.length === 0 ? (
            <p className="py-6 text-center text-xs text-text-subtle">
              Not enough timed attempts yet. A skill needs at least two before its pace means
              anything.
            </p>
          ) : (
            <div className="-mx-5 overflow-x-auto px-5">
              <table className="w-full min-w-[620px] text-left text-xs">
                <thead>
                  <tr className="border-b text-[10px] uppercase tracking-wider text-text-subtle">
                    <th className="pb-2 font-semibold">Skill</th>
                    <th className="pb-2 font-semibold">Section</th>
                    <th className="pb-2 text-right font-semibold">Median</th>
                    <th className="pb-2 text-right font-semibold">Target</th>
                    <th className="pb-2 text-right font-semibold">Accuracy</th>
                    <th className="pb-2 text-right font-semibold">Costs a module</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {report.skills.slice(0, 15).map((skill) => (
                    <tr key={skill.skillId}>
                      <td className="py-2 pr-3 text-text-base">{skill.skillName}</td>
                      <td className="py-2 pr-3 text-text-subtle">
                        {SECTION_LABEL[skill.section]}
                      </td>
                      <td
                        className={cn(
                          "numeric py-2 text-right",
                          skill.ratio > 1.5 ? "text-wrong" : "text-text-muted",
                        )}
                      >
                        {skill.medianSeconds}s
                      </td>
                      <td className="numeric py-2 text-right text-text-subtle">
                        {skill.targetSeconds}s
                      </td>
                      <td className="numeric py-2 text-right text-text-muted">
                        {Math.round(skill.accuracy * 100)}%
                      </td>
                      <td className="numeric py-2 text-right">
                        {skill.projectedCostSeconds > 0 ? (
                          <span className="text-warning">+{skill.projectedCostSeconds}s</span>
                        ) : (
                          <span className="text-correct">on target</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>

      <Notice>
        <span className="font-medium">Why pace is measured separately from accuracy.</span> Untimed
        accuracy tells you what you know. It does not tell you whether you can produce it inside 32
        or 35 minutes, and at the top of the scale that is usually the binding constraint. A
        student who is accurate but twenty per cent slow does not lose marks on the questions they
        were slow on; they lose them on the questions at the end they never reach.
      </Notice>
    </div>
  );
}
