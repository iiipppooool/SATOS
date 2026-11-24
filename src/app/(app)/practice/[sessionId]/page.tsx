import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { readSessionConfig } from "@/lib/practice";
import { getPatternNames, getQuestionView } from "@/lib/question-view";
import { SESSION_KIND_LABEL, type SessionKind } from "@/lib/domain/enums";
import { SessionRunner } from "./runner";
import { Card, CardBody, EmptyState, buttonClass } from "@/components/ui";

export const metadata = { title: "Session" };
export const dynamic = "force-dynamic";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const user = await requireUser();

  const session = await prisma.practiceSession.findFirst({
    where: { id: sessionId, userId: user.id },
  });
  if (!session) notFound();

  if (session.finishedAt) redirect(`/practice/${sessionId}/summary`);

  const config = readSessionConfig(session.config);
  if (!config) {
    return (
      <EmptyState
        title="This session is unreadable"
        description="Its question list could not be loaded, which usually means it was created by an older version of the app. Start a fresh session instead."
        action={
          <Link href="/practice" className={buttonClass("primary", "sm")}>
            Back to practice
          </Link>
        }
      />
    );
  }

  // Progress is derived from recorded attempts, so a refresh or a lost
  // connection never loses a student's place in the session.
  const answered = await prisma.attempt.findMany({
    where: { sessionId: session.id },
    select: { questionId: true },
  });
  const answeredIds = new Set(answered.map((a) => a.questionId));
  const remaining = config.questionIds.filter((id) => !answeredIds.has(id));

  if (remaining.length === 0) {
    redirect(`/practice/${sessionId}/summary`);
  }

  const currentId = remaining[0]!;
  const index = config.questionIds.indexOf(currentId);

  const [question, starredItem, patternNames] = await Promise.all([
    getQuestionView(currentId),
    prisma.collectionItem.findFirst({
      where: {
        questionId: currentId,
        collection: { userId: user.id, name: "Starred" },
      },
      select: { id: true },
    }),
    config.requirePatternGuess ? getPatternNames() : Promise.resolve([]),
  ]);

  if (!question) notFound();

  // Offer the true pattern plus a handful of decoys, shuffled deterministically
  // by question id so the position of the right answer is stable on refresh.
  const patternOptions = config.requirePatternGuess
    ? buildPatternOptions(question.pattern.patternName, patternNames, question.id)
    : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle">
            {SESSION_KIND_LABEL[session.kind as SessionKind] ?? session.kind}
          </p>
          <h1 className="text-base font-semibold tracking-tight">
            {session.label ?? "Practice session"}
          </h1>
        </div>
        <Link href="/practice" className={buttonClass("ghost", "sm")}>
          Leave session
        </Link>
      </div>

      <SessionRunner
        sessionId={session.id}
        question={question}
        index={index}
        total={config.questionIds.length}
        requirePatternGuess={config.requirePatternGuess ?? false}
        patternOptions={patternOptions}
        starred={Boolean(starredItem)}
      />

      <Card>
        <CardBody className="py-3">
          <p className="text-[11px] leading-relaxed text-text-subtle">
            Your progress is saved after every answer. You can close this page and the session
            will resume exactly where you left it.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

/** Deterministic shuffle so the correct option does not move on a refresh. */
function buildPatternOptions(
  correct: string | null,
  all: string[],
  seed: string,
): string[] {
  if (!correct) return [];
  const others = all.filter((name) => name !== correct);

  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 2147483647;
  }

  const picked: string[] = [];
  const pool = [...others];
  while (picked.length < Math.min(5, others.length) && pool.length > 0) {
    hash = (hash * 1103515245 + 12345) % 2147483647;
    const index = hash % pool.length;
    picked.push(pool.splice(index, 1)[0]!);
  }

  const options = [correct, ...picked];
  // Fisher-Yates with the same seeded generator.
  for (let i = options.length - 1; i > 0; i -= 1) {
    hash = (hash * 1103515245 + 12345) % 2147483647;
    const j = hash % (i + 1);
    [options[i], options[j]] = [options[j]!, options[i]!];
  }
  return options;
}
