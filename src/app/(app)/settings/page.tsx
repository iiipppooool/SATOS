import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { providerStatuses } from "@/lib/ai";
import { DOMAINS, BLUEPRINT_UNVERIFIED_NOTE, EXAM_BLUEPRINT } from "@/lib/domain/taxonomy";
import { SECTION_LABEL } from "@/lib/domain/enums";
import { SettingsForm } from "./form";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  KeyValue,
  Notice,
  SectionHeading,
} from "@/components/ui";

export const metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await requireUser();
  const statuses = providerStatuses();

  const [attempts, questions] = await Promise.all([
    prisma.attempt.count({ where: { userId: user.id } }),
    prisma.question.count({ where: { active: true } }),
  ]);

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Settings"
        description="Profile, study targets, appearance and the AI provider. Everything here is stored only in this instance."
      />

      <SettingsForm
        name={user.name}
        email={user.email}
        settings={{
          theme: user.settings.theme,
          targetScore: user.settings.targetScore,
          testDate: user.settings.testDate ? user.settings.testDate.toISOString() : null,
          dailyMinutes: user.settings.dailyMinutes,
          studyDaysPerWeek: user.settings.studyDaysPerWeek,
          timezone: user.settings.timezone,
          aiProvider: user.settings.aiProvider,
          aiModel: user.settings.aiModel,
          aiEnabled: user.settings.aiEnabled,
          recognitionTimeoutSec: user.settings.recognitionTimeoutSec,
        }}
        providers={statuses}
      />

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Exam blueprint</CardTitle>
            <p className="mt-1 text-xs text-text-muted">
              The structure and weights the simulator and the score estimator use.
            </p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4 pt-3">
          <Notice tone="warning">{BLUEPRINT_UNVERIFIED_NOTE}</Notice>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                Modules
              </p>
              {EXAM_BLUEPRINT.map((module) => (
                <KeyValue key={module.slot} label={module.slot.toUpperCase()}>
                  {module.questionCount} questions ({module.pretestCount} unscored) ·{" "}
                  {Math.round(module.durationSec / 60)} min
                </KeyValue>
              ))}
            </div>
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
                Domain weights
              </p>
              {DOMAINS.map((domain) => (
                <KeyValue key={domain.id} label={domain.name}>
                  {Math.round(domain.weight * 100)}% of {SECTION_LABEL[domain.section]}
                </KeyValue>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>This instance</CardTitle>
          </div>
        </CardHeader>
        <CardBody className="pt-3">
          <KeyValue label="Signed in as">{user.email}</KeyValue>
          <KeyValue label="Questions in bank">{questions}</KeyValue>
          <KeyValue label="Attempts recorded">{attempts}</KeyValue>
          <KeyValue label="Role">{user.role}</KeyValue>
        </CardBody>
      </Card>
    </div>
  );
}
