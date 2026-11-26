# Migrations

`0_init` is the baseline, generated from `schema.prisma` in **SQLite** dialect,
which is what local development uses.

**It will not run on PostgreSQL.** SQLite and Postgres differ in column types
(`DATETIME` against `TIMESTAMP(3)`, and so on), so when you switch the
datasource provider for a deployment you must regenerate the baseline:

```bash
rm -rf prisma/migrations/0_init
```

```bash
mkdir -p prisma/migrations/0_init && npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```

Run that *after* changing `provider` to `postgresql` in `prisma/schema.prisma`,
then `npx prisma migrate deploy` against the production database.

See DEPLOYMENT.md for the full sequence.
