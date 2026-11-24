import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DOMAINS } from "@/lib/domain/taxonomy";
import { getActivitySummary, getWeaknesses } from "@/lib/queries";
import { SECTION_LABEL } from "@/lib/domain/enums";
import { PracticeBuilder } from "./builder";
import { Card, CardBody, CardHeader, CardTitle, SectionHeading } from "@/components/ui";

export const metadata = { title: "Practice" };
export const dynamic = "force-dynamic";

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ skill?: string; mode?: string; section?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;

  const [counts, activity, weaknesses, recent] = await Promise.all([
    prisma.question.groupBy({
      by: ["skillId"],
      where: { active: true },
      _count: { _all: true },
    }),
    getActivitySummary(user.id),
    getWeaknesses(user.id, user.settings.targetScore),
    prisma.practiceSession.findMany({
      where: { userId: user.id, finishedAt: { not: null } },
      orderBy: { startedAt: "desc" },
      take: 5,
      select: {
        id: true,
        kind: true,
        label: true,
        startedAt: true,
        questionCount: true,
        correctCount: true,
        totalTimeMs: true,
      },
    }),
  ]);

  const countBySkill = new Map(counts.map((row) => [row.skillId, row._count._all]));

  const skillGroups = DOMAINS.map((domain) => ({
    id: domain.id,
    name: domain.name,
    section: domain.section,
    sectionLabel: SECTION_LABEL[domain.section],
    skills: domain.skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      available: countBySkill.get(skill.id) ?? 0,
      mastery: Math.round(weaknesses.find((w) => w.skillId === skill.id)?.mastery ?? 0),
    })),
  }));

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Practice"
        description="Build a session from any combination of section, skill and difficulty. Questions are chosen adaptively: due review items first, then the skills with the most points on the table, pitched just above your current level and interleaved so you have to identify each question before solving it."
      />

      <PracticeBuilder
        skillGroups={skillGroups}
        dueReviewCount={activity.dueReviewCount}
        initialSkillId={params.skill}
        initialMode={params.mode}
        initialSection={params.section}
        defaultMinutes={user.settings.dailyMinutes}
      />

      {recent.length > 0 ? (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Recent sessions</CardTitle>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            <ul className="divide-y">
              {recent.map((session) => {
                const accuracy =
                  session.questionCount > 0
                    ? Math.round((session.correctCount / session.questionCount) * 100)
                    : 0;
                return (
                  <li key={session.id} className="flex items-center justify-between gap-4 py-2.5">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-text-base">
                        {session.label ?? session.kind.replace(/_/g, " ")}
                      </p>
                      <p className="text-[11px] text-text-subtle">
                        {session.startedAt.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}{" "}
                        &middot; {session.questionCount} questions &middot;{" "}
                        {Math.round(session.totalTimeMs / 60000)} min
                      </p>
                    </div>
                    <span className="numeric text-sm font-semibold text-text-base">
                      {accuracy}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
