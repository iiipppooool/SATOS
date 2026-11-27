import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { DOMAINS, ALL_SKILLS } from "../src/lib/domain/taxonomy";
import { createAdapter } from "../src/lib/prisma-adapter";
import { ALL_SEED_QUESTIONS, validateSeedQuestions } from "../src/lib/content/questions";
import type { SeedQuestion } from "../src/lib/content/types";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set. Run `npm run setup` first.");
const adapter = createAdapter(url);
const prisma = new PrismaClient({ adapter });

function json(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  return JSON.stringify(value);
}

function sectionForSkill(skillId: string): string {
  const skill = ALL_SKILLS.find((s) => s.id === skillId);
  if (!skill) throw new Error(`Unknown skill id in seed data: ${skillId}`);
  return skill.section;
}

async function seedTaxonomy() {
  for (const [domainIndex, domain] of DOMAINS.entries()) {
    await prisma.domain.upsert({
      where: { id: domain.id },
      update: {
        section: domain.section,
        name: domain.name,
        weight: domain.weight,
        order: domainIndex,
      },
      create: {
        id: domain.id,
        section: domain.section,
        name: domain.name,
        weight: domain.weight,
        order: domainIndex,
      },
    });

    for (const [skillIndex, skill] of domain.skills.entries()) {
      await prisma.skill.upsert({
        where: { id: skill.id },
        update: { domainId: domain.id, name: skill.name, blurb: skill.blurb, order: skillIndex },
        create: {
          id: skill.id,
          domainId: domain.id,
          name: skill.name,
          blurb: skill.blurb,
          order: skillIndex,
        },
      });
    }
  }
  console.log(`  domains: ${DOMAINS.length}, skills: ${ALL_SKILLS.length}`);
}

async function seedQuestion(question: SeedQuestion) {
  const section = sectionForSkill(question.skillId);

  const data = {
    skillId: question.skillId,
    section,
    format: question.format ?? "mcq",
    stimulus: question.stimulus ?? null,
    stimulusTitle: question.stimulusTitle ?? null,
    stem: question.stem,
    acceptedAnswers: json(question.acceptedAnswers),
    difficulty: question.difficulty,
    explanation: question.explanation,
    patternName: question.patternName,
    concept: question.concept,
    recognitionCues: json(question.recognitionCues),
    fastestMethod: question.fastestMethod,
    alternativeMethod: question.alternativeMethod ?? null,
    commonTraps: json(question.commonTraps),
    relatedConcepts: json(question.relatedConcepts),
    expectedSeconds: question.expectedSeconds,
    // Every seeded item is authored for this platform. Nothing here is, or is
    // presented as, a College Board question.
    source: "original_authored",
    sourceRef: "SAT OS authored practice bank",
    licenceNote: "Written for SAT OS. Free to use within this instance.",
    verified: true,
    restrictedText: false,
    active: true,
  };

  await prisma.question.upsert({
    where: { id: question.id },
    update: data,
    create: { id: question.id, ...data },
  });

  // Replace choices wholesale so edits to the bank propagate cleanly.
  await prisma.choice.deleteMany({ where: { questionId: question.id } });
  if (question.choices?.length) {
    await prisma.choice.createMany({
      data: question.choices.map((choice, index) => ({
        questionId: question.id,
        label: choice.label,
        text: choice.text,
        isCorrect: choice.isCorrect ?? false,
        distractorType: choice.distractorType ?? null,
        rationale: choice.rationale,
        order: index,
      })),
    });
  }
}

async function seedQuestions() {
  const errors = validateSeedQuestions();
  if (errors.length > 0) {
    console.error("Seed question bank failed validation:");
    for (const error of errors) console.error(`  - ${error}`);
    throw new Error(`${errors.length} invalid seed question(s); nothing was written.`);
  }

  for (const question of ALL_SEED_QUESTIONS) {
    await seedQuestion(question);
  }
  console.log(`  questions: ${ALL_SEED_QUESTIONS.length}`);
}

/**
 * Create the owner account only when ALLOW_SIGNUP is set and no user exists.
 * Otherwise the app's own signup route handles it, so that a password is never
 * baked into the repository.
 */
async function seedOwner() {
  const existing = await prisma.user.count();
  if (existing > 0) {
    console.log("  owner: already present, left untouched");
    return;
  }

  const email = process.env.SEED_OWNER_EMAIL;
  const password = process.env.SEED_OWNER_PASSWORD;

  if (!email || !password) {
    console.log(
      "  owner: none created. Visit /signup to create your account, or set SEED_OWNER_EMAIL and SEED_OWNER_PASSWORD and reseed.",
    );
    return;
  }

  if (password.length < 10) {
    throw new Error("SEED_OWNER_PASSWORD must be at least 10 characters.");
  }

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      name: process.env.SEED_OWNER_NAME ?? null,
      passwordHash: await hash(password, 12),
      role: "admin",
      settings: { create: {} },
    },
  });

  await prisma.questionCollection.createMany({
    data: [
      { userId: user.id, name: "Starred", description: "Questions you marked to revisit.", system: true },
      { userId: user.id, name: "Needs another look", description: "Questions you got wrong and have not yet resolved.", system: true },
    ],
  });

  console.log(`  owner: created ${user.email}`);
}

async function main() {
  console.log("Seeding SAT OS...");
  await seedTaxonomy();
  await seedQuestions();
  await seedOwner();
  console.log("Done.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
