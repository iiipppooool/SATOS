# Deploying SAT OS

The app runs anywhere Next.js 16 runs. These notes cover the path most people
want: Vercel for hosting, a managed Postgres for data.

SQLite is fine for local use but not for a deployment: Vercel's filesystem is
read-only apart from a scratch directory, and it is thrown away on every
redeploy, so a SQLite file there would lose every answer you had logged.

**There is no code to change.** The schema deliberately avoids native enums and
scalar list columns, so the same models run on both engines, and the driver
adapter and the datasource provider are both chosen from the shape of
`DATABASE_URL`:

- `file:./prisma/dev.db` → SQLite, through `@prisma/adapter-better-sqlite3`
- `postgresql://…` → Postgres, through `@prisma/adapter-pg`

`scripts/set-db-provider.mjs` writes the matching `provider` into
`prisma/schema.prisma` before `prisma generate` runs, because Prisma will only
read that one value from the schema file. It runs from `postinstall`, `build`
and `setup`, so it is never something you have to remember.

---

## 1. Create the database

Any Postgres works. Neon, Supabase and Vercel Postgres all have a free tier.

Take the **pooled** connection string, not the direct one: serverless functions
open a connection per invocation and will exhaust a direct limit quickly.

- **Neon** — the default string already points at the pooler
  (`…-pooler.…neon.tech`).
- **Supabase** — Connect → *Connection pooling*, port `6543`.
- **Vercel Postgres** — use `POSTGRES_PRISMA_URL`.

Make sure it ends with `?sslmode=require`. Managed providers all require TLS,
and `node-postgres` verifies the certificate properly when you ask for it
through the connection string.

---

## 2. Set the environment variables

On Vercel: Project → Settings → Environment Variables. Only the first two are
required.

| Variable | Required | What it is |
|---|---|---|
| `DATABASE_URL` | yes | Pooled Postgres connection string |
| `AUTH_SECRET` | yes | 32+ random bytes; signs the session cookie |
| `ALLOW_SIGNUP` | first deploy | `true` opens the one-time signup page; remove it afterwards |
| `ANTHROPIC_API_KEY` | no | Enables the AI tutor on Anthropic |
| `OPENAI_API_KEY` | no | Enables the AI tutor on OpenAI |
| `ANTHROPIC_MODEL` / `OPENAI_MODEL` | no | Override the default model |

Generate the secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

**Rotating `AUTH_SECRET` invalidates every existing session.** That is the
intended way to sign everyone out.

Set all of them for Production *and* Preview if you want preview deployments to
work, and give previews their own database unless you want them writing to your
real attempt history.

---

## 3. Deploy

Import the GitHub repository on Vercel and deploy. Every default is correct:
the framework is detected as Next.js, and because `package.json` contains a
`vercel-build` script, Vercel runs that instead of `build`:

```
node scripts/set-db-provider.mjs   # provider = postgresql
prisma generate
prisma db push                     # create or update the tables
npm run db:seed                    # taxonomy + question bank, idempotent
next build
```

So the first deploy creates the schema and loads all 291 questions by itself,
and later deploys bring the bank up to date with whatever is in the repository.
The seed only ever upserts; it does not touch user accounts or attempt history.

If you would rather keep migrations out of the build, delete the
`vercel-build` script and run this once from your machine instead:

```bash
DATABASE_URL="<your production url>" npm run db:push
```

```bash
DATABASE_URL="<your production url>" npm run db:seed
```

> The committed baseline in `prisma/migrations/0_init` is SQLite dialect,
> because that is what local development uses. Deployment uses `prisma db push`,
> which reads the schema and ignores the migrations directory, so the dialect
> mismatch does not matter. If you want a real Postgres migration history,
> regenerate the baseline with `prisma migrate diff` against a Postgres
> provider and use `prisma migrate deploy` instead.

---

## 4. Create your account

Visit `/signup` on the deployed URL while `ALLOW_SIGNUP` is set. The route
refuses to run once any user exists, so there is no race to win, but remove the
variable afterwards anyway and redeploy.

To create the account from the seed instead:

```bash
SEED_OWNER_EMAIL="you@example.com" SEED_OWNER_PASSWORD="a-long-password" npm run db:seed
```

---

## Checklist before you call it done

- [ ] `AUTH_SECRET` is set and is not the example value
- [ ] `DATABASE_URL` is the *pooled* string and ends with `?sslmode=require`
- [ ] `ALLOW_SIGNUP` is removed once your account exists
- [ ] You can sign in, run a drill, and see the dashboard update
- [ ] `npm test`, `npm run typecheck` and `npm run lint` all pass
- [ ] Your test date is set in Settings, so the planner knows the interval
- [ ] You have checked the exam blueprint figures in Settings against the
      current College Board assessment specification (see below)

---

## Known limitations, stated plainly

**The blueprint figures are unverified.** Domain weights, module counts and
timings follow the College Board digital SAT specification as best known to the
author, but they were not machine-verified against the live specification when
this was built. They are seeded as *editable database rows*, not hardcoded
constants, and Settings shows them with a warning. Correct them there if they
have drifted; everything downstream reads the database.

**The routing threshold is a guess.** The cut score that sends you to the
harder second module is not published. The simulator uses two-thirds of the
first module, which is where most published analyses land. It is a single
constant in `src/lib/domain/exam.ts`.

**Repeated full exams still overlap.** A fresh instance holds 291 questions,
115 Reading and Writing and 176 Maths, which is enough for a complete
98-question adaptive exam with no repeats inside it, verified end to end. Two
full exams back to back share some material, because a single exam uses about a
third of the bank. Import or generate more before sitting several timed mocks.
The simulator warns you if the bank ever drops below what a full section needs.

**Score estimates are not predictions.** See the README for how the estimate is
produced and why the confidence band never collapses.

---

## Backups

Everything a user has is exportable as JSON from **Settings → Export all my
data**: attempts, sessions, error log, plans, exams, spaced repetition state,
mastery, collections and tutor threads. Passwords are never included.

For the database itself, use your provider's snapshots, or:

```bash
pg_dump "$DATABASE_URL" > satos-backup-$(date +%F).sql
```
