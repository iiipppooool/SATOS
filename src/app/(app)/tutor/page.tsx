import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { providerStatuses } from "@/lib/ai";
import { getQuestionView } from "@/lib/question-view";
import { TutorConsole } from "./console";
import { TutorGenerator, type GeneratorSkill } from "./generator";
import { getWeaknesses } from "@/lib/queries";
import { SECTION_LABEL } from "@/lib/domain/enums";
import { Notice, SectionHeading } from "@/components/ui";
import type { AiProvider } from "@/lib/domain/enums";

export const metadata = { title: "AI Tutor" };
export const dynamic = "force-dynamic";

export default async function TutorPage({
  searchParams,
}: {
  searchParams: Promise<{ question?: string; thread?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;

  const statuses = providerStatuses();
  const current = user.settings.aiProvider as AiProvider;
  const active = statuses.find((s) => s.provider === current);
  const configured = Boolean(active?.configured) && current !== "none" && user.settings.aiEnabled;

  const [question, threads, thread, weaknesses] = await Promise.all([
    params.question ? getQuestionView(params.question) : Promise.resolve(null),
    prisma.tutorThread.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      take: 20,
      select: { id: true, title: true, intent: true, updatedAt: true },
    }),
    params.thread
      ? prisma.tutorThread.findFirst({
          where: { id: params.thread, userId: user.id },
          include: { messages: { orderBy: { createdAt: "asc" } } },
        })
      : Promise.resolve(null),
    getWeaknesses(user.id, user.settings.targetScore),
  ]);

  // Offer the highest-value skills first; the generator is most useful aimed
  // at a real gap rather than at whatever is alphabetically first.
  const generatorSkills: GeneratorSkill[] = weaknesses
    .slice(0, 16)
    .map((w) => ({
      id: w.skillId,
      name: w.skillName,
      section: SECTION_LABEL[w.section],
      accuracy: w.recentAccuracy,
      attempts: w.attempts,
      expectedGain: w.expectedGain,
    }));

  return (
    <div className="space-y-6">
      <SectionHeading
        title="AI Tutor"
        description="Explanations, alternative methods, generated variants and analysis of your own recurring mistakes. The provider is configurable, so the underlying model can change without touching the rest of the platform."
      />

      {!user.settings.aiEnabled ? (
        <Notice tone="warning">
          The AI tutor is switched off for this account. Turn it on in Settings.
        </Notice>
      ) : current === "none" ? (
        <Notice tone="warning">
          No AI provider is selected. Choose one in Settings, and make sure the matching API key is
          set in your environment.
        </Notice>
      ) : !configured ? (
        <Notice tone="warning">
          {active?.label ?? current} is selected but no API key was found in the environment. Set{" "}
          <code className="font-mono">
            {current === "anthropic" ? "ANTHROPIC_API_KEY" : "OPENAI_API_KEY"}
          </code>{" "}
          and restart the server. Everything else in the platform works without it.
        </Notice>
      ) : null}

      <Notice>
        <span className="font-medium">What the tutor will not do.</span> Anything it writes is
        practice material, never an official College Board question, and it is instructed to say so
        when it generates one. Treat a generated answer key as unverified until you have checked
        the reasoning yourself.
      </Notice>

      <TutorGenerator
        enabled={configured}
        skills={generatorSkills}
        providerLabel={active?.label ?? current}
      />

      <TutorConsole
        enabled={configured}
        question={question}
        threads={threads.map((t) => ({
          id: t.id,
          title: t.title,
          intent: t.intent,
          updatedAt: t.updatedAt.toISOString(),
        }))}
        activeThread={
          thread
            ? {
                id: thread.id,
                title: thread.title,
                messages: thread.messages.map((m) => ({
                  id: m.id,
                  role: m.role,
                  content: m.content,
                })),
              }
            : null
        }
        providerLabel={active?.label ?? current}
      />
    </div>
  );
}
