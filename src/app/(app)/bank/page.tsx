import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { DOMAINS } from "@/lib/domain/taxonomy";
import {
  SECTION_LABEL,
  SOURCE_LABEL,
  SOURCE_NOTE,
  type QuestionSource,
  type Section,
} from "@/lib/domain/enums";
import { BankBrowser, type BankQuestion } from "./browser";
import {
  Card,
  CardBody,
  Notice,
  SectionHeading,
  Stat,
  buttonClass,
} from "@/components/ui";

export const metadata = { title: "Question Bank" };
export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

export default async function BankPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    section?: string;
    skill?: string;
    source?: string;
    collection?: string;
    page?: string;
  }>;
}) {
  const user = await requireUser();
  const params = await searchParams;

  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const search = (params.q ?? "").trim();

  const where = {
    active: true,
    ...(params.section === "math" || params.section === "reading_writing"
      ? { section: params.section }
      : {}),
    ...(params.skill ? { skillId: params.skill } : {}),
    ...(params.source ? { source: params.source } : {}),
    ...(search
      ? {
          OR: [
            { stem: { contains: search } },
            { stimulus: { contains: search } },
            { patternName: { contains: search } },
            { concept: { contains: search } },
          ],
        }
      : {}),
    ...(params.collection
      ? { collectionItems: { some: { collection: { userId: user.id, name: params.collection } } } }
      : {}),
  };

  const [total, questions, counts, collections, attempts] = await Promise.all([
    prisma.question.count({ where }),
    prisma.question.findMany({
      where,
      orderBy: [{ section: "asc" }, { difficulty: "asc" }, { id: "asc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        stem: true,
        section: true,
        difficulty: true,
        format: true,
        patternName: true,
        concept: true,
        source: true,
        sourceRef: true,
        verified: true,
        expectedSeconds: true,
        skill: { select: { id: true, name: true } },
      },
    }),
    prisma.question.groupBy({
      by: ["source"],
      where: { active: true },
      _count: { _all: true },
    }),
    prisma.questionCollection.findMany({
      where: { userId: user.id },
      select: { name: true, _count: { select: { items: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.attempt.findMany({
      where: { userId: user.id },
      select: { questionId: true, isCorrect: true },
    }),
  ]);

  // Per-question history for the "you got this wrong" marker.
  const history = new Map<string, { seen: number; correct: number }>();
  for (const attempt of attempts) {
    const bucket = history.get(attempt.questionId) ?? { seen: 0, correct: 0 };
    bucket.seen += 1;
    if (attempt.isCorrect) bucket.correct += 1;
    history.set(attempt.questionId, bucket);
  }

  const rows: BankQuestion[] = questions.map((question) => {
    const stats = history.get(question.id);
    const source = question.source as QuestionSource;
    return {
      id: question.id,
      stem: question.stem,
      section: question.section as Section,
      sectionLabel: SECTION_LABEL[question.section as Section],
      difficulty: question.difficulty,
      format: question.format,
      patternName: question.patternName,
      concept: question.concept,
      skillId: question.skill.id,
      skillName: question.skill.name,
      source,
      sourceLabel: SOURCE_LABEL[source] ?? source,
      sourceNote: SOURCE_NOTE[source] ?? "",
      sourceRef: question.sourceRef,
      verified: question.verified,
      expectedSeconds: question.expectedSeconds,
      seen: stats?.seen ?? 0,
      correct: stats?.correct ?? 0,
    };
  });

  const skillOptions = DOMAINS.flatMap((domain) =>
    domain.skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      domain: domain.name,
      section: domain.section,
    })),
  );

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const authored = counts.find((c) => c.source === "original_authored")?._count._all ?? 0;
  const imported = counts
    .filter((c) => c.source !== "original_authored")
    .reduce((sum, c) => sum + c._count._all, 0);

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Question Bank"
        description="Every question carries its provenance. Nothing here is presented as an official College Board item unless it genuinely is, and reconstructed or AI-generated material is labelled as such wherever it appears."
        action={
          <Link href="/bank/import" className={buttonClass("primary", "sm")}>
            Import questions
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody>
            <Stat label="Questions" value={total} sub={`${PAGE_SIZE} shown per page`} />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat label="Authored for SAT OS" value={authored} sub="Written for this platform" />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Imported or external"
              value={imported}
              sub={imported === 0 ? "Nothing imported yet" : "From your own material"}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat
              label="Collections"
              value={collections.length}
              sub={`${collections.reduce((s, c) => s + c._count.items, 0)} saved questions`}
            />
          </CardBody>
        </Card>
      </div>

      <Notice>
        <span className="font-medium">On historical exam archives.</span> The original brief for
        this platform asked for September, October and November 2026 question archives. Those
        cannot be built lawfully: College Board does not release recent operational forms, and
        reconstructions circulating online are both copyright infringements and unreliable as
        answer keys. What this bank does instead is import material you already hold a licence to,
        keep its provenance attached, and never let an unverified item claim to be an exam paper.
      </Notice>

      <BankBrowser
        questions={rows}
        skills={skillOptions}
        collections={collections.map((c) => ({ name: c.name, count: c._count.items }))}
        total={total}
        page={page}
        totalPages={totalPages}
        filters={{
          q: search,
          section: params.section ?? "",
          skill: params.skill ?? "",
          source: params.source ?? "",
          collection: params.collection ?? "",
        }}
      />
    </div>
  );
}
