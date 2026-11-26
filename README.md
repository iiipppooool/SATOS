# SAT OS

A private SAT preparation platform built around pattern recognition, spaced
repetition and honest score estimation.

It is designed for a single student on one instance, but the data model is
multi-user from the start, so it can become a shared product without a rewrite.

---

## What it does

| Module | What it is for |
|---|---|
| **Command Centre** | Where you stand, what today's work is, and what is costing you marks |
| **Practice** | Adaptive drills built from any section, skill or difficulty window |
| **Pattern Recognition Trainer** | Name the question type *before* you may solve it, so recognition speed is measured separately from solving speed |
| **Exam Simulator** | Full digital SAT format with the real multistage routing between modules |
| **Weakness Detector** | Skills ranked by *points recoverable*, not by raw accuracy |
| **Error Log** | Every mistake, classified by cause, with a specific fix per cause |
| **Question Bank** | Search, filter and collect, with provenance attached to every item |
| **AI Tutor** | Explanations, alternative methods, generated variants, mistake analysis |
| **Study Plan** | A schedule built from the time you actually have |
| **Analytics** | Accuracy, timing, recognition speed, calibration and consistency |

---

## Quick start

```bash
npm install
```

```bash
cp .env.example .env
```

Generate a session secret and paste it into `AUTH_SECRET` in `.env`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Create the database and load the question bank:

```bash
npm run setup
```

Start the dev server:

```bash
npm run dev
```

Then open http://localhost:3000 and create your account. Signup closes
automatically once one account exists, unless `ALLOW_SIGNUP=true` is set.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (runs `prisma generate` first) |
| `npm start` | Serve the production build |
| `npm test` | Unit tests |
| `npm run typecheck` | TypeScript, no emit |
| `npm run lint` | ESLint |
| `npm run setup` | Generate client, create the database, seed it |
| `npm run db:studio` | Browse the database |
| `npm run db:reset` | Drop everything and reseed |

---

## Three things to know before you trust a number

**1. The score estimate is an estimate, and it says so everywhere.**
It comes from a Rasch (one-parameter logistic) model fitted to your recent
attempts, with a weak prior so that a perfect or disastrous run still yields a
finite answer. The reported range combines sampling error, which shrinks as you
practise, with a fixed calibration floor that does not — because this
platform's item difficulties are author-assigned and its question pool is not
the operational one. The band never collapses to a point, by design. Only a
full official practice test taken under timed conditions gives a number worth
planning around.

**2. The exam simulator does not equate.**
It reproduces the structure faithfully: module counts, timings, the routing
decision that picks your second module, flagging, and per-module lockout. It
cannot reproduce equating, because the per-form conversion tables are not
published. Reaching the harder second module matters more than the headline
number; the review screen says so.

**3. There are no 2026 exam archives, and there cannot be.**
The original brief for this project asked for September, October and November
2026 question archives. College Board does not release recent operational
forms, and the reconstructions circulating online are both copyright
infringements and unreliable as answer keys. What exists instead:

- **173 questions written for this platform** (85 Reading and Writing, 88
  Maths), covering all 30 skills across all 8 content domains, each with full
  pattern metadata and a rationale for every wrong option. That is enough for a
  complete 98-question adaptive exam with no repeats, with spare capacity on
  top.
- **An import pipeline** for material you already hold a licence to, which
  keeps provenance attached and never silently upgrades it. An item imported as
  "recalled, unverified" stays labelled that way everywhere it appears,
  including a warning on the answer key during practice.

---

## How the interesting parts work

### Weakness ranking

The useful question is not "what am I worst at?" but "where will an hour buy
the most marks?". Expected gain for a skill is:

```
questionShare  x  accuracyHeadroom  x  600 points per section
```

So a 10% gap in a skill carrying a fifth of the section outranks a 40% gap in
one that appears twice a paper. A skill you have barely attempted is treated as
an unknown rather than assumed strong, and an unresolved error-log entry or a
speed problem pushes a skill up the list.

Per-skill shares are approximate: College Board publishes weights per domain,
not per skill, so a domain's weight is split evenly across its skills. That
approximation is flagged in the UI.

### Spaced repetition

A modified SM-2. The novelty is that the grade is derived from objective
signals rather than self-report, which is the usual weakness of graded review:

- correctness
- whether the pattern was recognised *before* solving
- time taken against the item's expected time
- stated confidence

A correct answer that took three times as long as it should is not mastery, and
the scheduler says so. Intervals are compressed so nothing falls due after your
test date.

### Study plan

The brief asked for a fixed 12-week, 90-day programme. That is the wrong shape:
how long you have is whatever sits between today and your test date. The
generator takes the real interval and picks a phase structure to fit —
*diagnose, foundation, build, sprint, taper* — and short intervals **drop** the
earlier phases rather than compressing all five into an unusable smear. A
two-week run is told plainly that it will sharpen execution rather than add a
lot of points.

### Adaptive selection

Three jobs in priority order: bring back due review cards, target the
highest-ranked weaknesses, and pitch difficulty just above current ability
where information per question is maximised. Questions are then **interleaved**,
because a session of twelve items on one sub-skill trains pattern-matching on
phrasing rather than on the underlying maths.

---

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for Vercel plus Postgres, including the
two-line change that switches the database engine.

---

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 ·
Prisma 7 with driver adapters · Zod 4 · Recharts · Vitest

- **Auth** is a signed JWT session cookie (jose) with bcrypt password hashing.
  The proxy redirect is a convenience; every page and server action
  independently calls `requireUser`, so it is not the security boundary.
- **Database** is SQLite locally and Postgres in production from the *same*
  schema: no native enums and no scalar lists, so nothing has to change.
- **AI** sits behind one adapter interface. Anthropic and OpenAI ship; adding a
  provider is one file. The whole platform works with AI switched off.

### Chart colours

The two chart palettes were checked with a colour-vision-deficiency validator
against the app's real surface colours in both themes. Every slot clears the
lightness band, the chroma floor, a CVD separation of ΔE 8, the normal-vision
floor of 15, and 3:1 contrast against the surface. Magnitude comparisons use a
single hue; the only two-hue palette is Reading and Writing against Maths,
which is a genuine categorical distinction. Both are directly labelled as well
as coloured, so identity never rests on hue alone.

---

## Testing

254 unit tests cover the domain logic: score estimation, spaced repetition,
weakness ranking, adaptive selection, plan generation, exam blueprint and
routing, answer grading, and import validation. The whole question bank is
validated too, so a malformed question fails the build rather than reaching a
study session.

Every computable maths answer is **independently re-derived in code** by
`tests/maths-verification.test.ts`, which recomputes the result from the
question's own numbers and compares it with the stored answer key. A typo in an
answer fails the suite by name. This matters more than it sounds: a wrong
answer key that a student trusts actively teaches the wrong method.

```bash
npm test
```

---

## Licence and content

Code is yours to do as you like with. The seeded questions were written for
this platform and are free to use within it. Nothing in this repository is
reproduced from a College Board exam, and nothing should ever be relabelled as
one.
