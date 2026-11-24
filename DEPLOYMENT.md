# Deploying SAT OS

The app runs anywhere Next.js 16 runs. These notes cover the path most people
want: Vercel for hosting, a managed Postgres for data.

SQLite is fine for local use, but not for a deployment: most hosts have an
ephemeral filesystem, so a SQLite file is wiped on every redeploy.

---

## 1. Switch the database to Postgres

Two changes, and no model edits — the schema deliberately avoids native enums
and scalar lists so it is portable as written.

**`prisma/schema.prisma`**

```prisma
datasource db {
  provider = "postgresql"
}
```

**`src/lib/db.ts`** — swap the driver adapter:

```ts
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
```

Then install the adapter and drop the SQLite one:

```bash
npm install @prisma/adapter-pg && npm uninstall @prisma/adapter-better-sqlite3 better-sqlite3
```

---

## 2. Create the database

Any Postgres works. Supabase, Neon and Vercel Postgres are all one-click.

If you use **Supabase**, take the *connection pooling* string for
`DATABASE_URL` and the direct string for migrations. Add the direct URL to
`prisma.config.ts`:

```ts
datasource: {
  url: env("DATABASE_URL"),
  directUrl: env("DIRECT_DATABASE_URL"),
},
```

---

## 3. Environment variables

Set these on the host. Everything except the first two is optional.

| Variable | Required | What it is |
|---|---|---|
| `DATABASE_URL` | yes | Postgres connection string |
| `AUTH_SECRET` | yes | 32+ random bytes; signs the session cookie |
| `DIRECT_DATABASE_URL` | if pooling | Direct connection, for migrations |
| `ALLOW_SIGNUP` | no | `true` opens signup; remove it once your account exists |
| `ANTHROPIC_API_KEY` | no | Enables the AI tutor on Anthropic |
| `OPENAI_API_KEY` | no | Enables the AI tutor on OpenAI |
| `ANTHROPIC_MODEL` / `OPENAI_MODEL` | no | Override the default model |

Generate the secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

**Rotating `AUTH_SECRET` invalidates every existing session.** That is the
intended way to sign everyone out.

---

## 4. Regenerate the baseline migration, then run it

The committed baseline in `prisma/migrations/0_init` is **SQLite dialect**,
because that is what local development uses. It will not run on Postgres, so
regenerate it after changing the provider in step 1:

```bash
rm -rf prisma/migrations/0_init
```

```bash
mkdir -p prisma/migrations/0_init && npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```

Then apply it, pointed at the production database:

```bash
DATABASE_URL="<your production url>" npx prisma migrate deploy
```

```bash
DATABASE_URL="<your production url>" npm run db:seed
```

The seed is idempotent: it upserts the taxonomy and the question bank, and it
will not touch an existing user account.

To create the owner account from the seed instead of through the signup page:

```bash
SEED_OWNER_EMAIL="you@example.com" SEED_OWNER_PASSWORD="a-long-password" npm run db:seed
```

---

## 5. Deploy

```bash
npx vercel --prod
```

`npm run build` runs `prisma generate` first, and `postinstall` runs it too, so
the client is always generated against the current schema on the host.

After the first successful deploy, **remove `ALLOW_SIGNUP`** so nobody else can
create an account on your instance.

---

## Checklist before you call it done

- [ ] `AUTH_SECRET` is set and is not the example value
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

**The bank is small for full-length exams.** A real sitting needs 54 Reading
and Writing questions and 44 Maths questions. A fresh instance has 85 in total,
so a full mock will have short modules and some repeats. The simulator warns
you when this is the case. Import your own material to fix it.

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
