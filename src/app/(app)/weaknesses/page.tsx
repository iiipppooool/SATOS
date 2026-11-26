import Link from "next/link";
import { AlertTriangle, Clock, Target } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getWeaknesses } from "@/lib/queries";
import { summariseBySection } from "@/lib/domain/weakness";
import { SECTION_LABEL } from "@/lib/domain/enums";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Notice,
  ProgressBar,
  SectionHeading,
  Stat,
  buttonClass,
} from "@/components/ui";

export const metadata = { title: "Weakness Detector" };
export const dynamic = "force-dynamic";

export default async function WeaknessesPage() {
  const user = await requireUser();
  const ranked = await getWeaknesses(user.id, user.settings.targetScore);
  const summary = summariseBySection(ranked);

  const actionable = ranked.filter((row) => row.expectedGain > 0 || row.blindSpot);
  const solid = ranked.filter((row) => !row.blindSpot && row.headroom <= 0.01 && row.attempts >= 4);
  const requiredPct = Math.round((ranked[0]?.requiredAccuracy ?? 0) * 100);

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Weakness Detector"
        description={`Ranked by the points each skill is costing you against a ${user.settings.targetScore} target, not by raw accuracy. A skill you are 10% short on that carries a fifth of the section is worth more than one you are 40% short on that appears twice a paper.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((section) => (
          <Card key={section.section}>
            <CardBody>
              <Stat
                label={SECTION_LABEL[section.section]}
                value={
                  section.attempts > 0 ? `${Math.round(section.accuracy * 100)}%` : "--"
                }
                sub={
                  section.attempts > 0
                    ? `${section.attempts} attempts · about ${section.recoverablePoints} points recoverable`
                    : "No attempts recorded"
                }
              />
            </CardBody>
          </Card>
        ))}
        <Card>
          <CardBody>
            <Stat
              label="Blind spots"
              tone={ranked.filter((r) => r.blindSpot).length > 0 ? "warning" : "correct"}
              value={ranked.filter((r) => r.blindSpot).length}
              sub="Skills with fewer than four attempts"
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Accuracy required"
              value={`${requiredPct}%`}
              sub={`Implied by a ${user.settings.targetScore} target`}
            />
          </CardBody>
        </Card>
      </div>

      <Notice>
        <span className="font-medium">How the ranking is computed.</span> Expected gain is the
        share of the section a skill carries, multiplied by how far your accuracy sits below the
        level your target implies, multiplied by the 600 points available in a section. Skills you
        have barely attempted are treated as unknown rather than assumed strong, and an unresolved
        error log entry or a speed problem pushes a skill up the list. Per-skill shares are
        approximate: College Board publishes weights per domain, not per skill, so a domain&apos;s
        weight is split evenly across its skills.
      </Notice>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Priority order</CardTitle>
            <p className="mt-1 text-xs text-text-muted">
              Work down this list. The number on the right is the estimated points on the table.
            </p>
          </div>
        </CardHeader>
        <CardBody className="pt-3">
          {actionable.length === 0 ? (
            <p className="py-6 text-center text-xs text-text-subtle">
              Nothing to rank yet. Answer questions across a range of skills and the detector will
              have something to work with.
            </p>
          ) : (
            <ul className="space-y-2">
              {actionable.map((row, index) => (
                <li
                  key={row.skillId}
                  className="rounded-[var(--radius-control)] border bg-bg-sunken p-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="numeric text-[11px] font-semibold text-text-subtle">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-xs font-medium text-text-base">{row.skillName}</p>
                        <Badge tone="neutral">{SECTION_LABEL[row.section]}</Badge>
                        <Badge tone="neutral">{row.domainName}</Badge>
                        {row.blindSpot ? (
                          <Badge tone="warning">
                            <AlertTriangle className="h-3 w-3" />
                            Blind spot
                          </Badge>
                        ) : null}
                        {row.speedProblem ? (
                          <Badge tone="warning">
                            <Clock className="h-3 w-3" />
                            Too slow
                          </Badge>
                        ) : null}
                        {row.openErrors > 0 ? (
                          <Badge tone="wrong">{row.openErrors} open errors</Badge>
                        ) : null}
                      </div>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-text-muted">
                        {row.reason}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <ProgressBar
                          className="max-w-xs"
                          value={row.attempts > 0 ? row.recentAccuracy * 100 : 0}
                          max={100}
                          tone={
                            row.recentAccuracy >= row.requiredAccuracy
                              ? "correct"
                              : row.recentAccuracy >= 0.6
                                ? "warning"
                                : "wrong"
                          }
                          label={`Recent accuracy for ${row.skillName}`}
                        />
                        <span className="numeric shrink-0 text-[11px] text-text-subtle">
                          {row.attempts > 0
                            ? `${Math.round(row.recentAccuracy * 100)}% of ${row.attempts}`
                            : "no attempts"}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <div className="text-right">
                        <p className="numeric text-sm font-semibold text-accent">
                          +{Math.round(row.expectedGain)}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider text-text-subtle">
                          points
                        </p>
                      </div>
                      <Link
                        href={`/practice?skill=${row.skillId}`}
                        className={buttonClass("secondary", "sm")}
                      >
                        <Target className="h-3.5 w-3.5" />
                        Drill
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>

      {solid.length > 0 ? (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Already at the required level</CardTitle>
              <p className="mt-1 text-xs text-text-muted">
                Maintain these with spaced review rather than fresh drilling. Practising what you
                are already good at is the most comfortable way to waste a week.
              </p>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            <div className="flex flex-wrap gap-1.5">
              {solid.map((row) => (
                <span
                  key={row.skillId}
                  className="rounded-full border border-[var(--correct)]/40 bg-correct-soft px-2.5 py-1 text-[11px] text-correct"
                >
                  {row.skillName} {Math.round(row.recentAccuracy * 100)}%
                </span>
              ))}
            </div>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
