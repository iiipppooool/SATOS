/**
 * Creates .env from .env.example on first run, with a freshly generated
 * AUTH_SECRET.
 *
 * This exists so that getting the app running is `npm install`, `npm run
 * setup`, `npm run dev` and nothing else. Hand-editing a dotenv file and
 * pasting in a generated secret is a reliable way to lose a beginner before
 * they have seen the app work.
 *
 * It never overwrites an existing .env.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

const ENV = ".env";
const EXAMPLE = ".env.example";
const PLACEHOLDER = "replace-me-with-a-32-byte-random-string";

if (existsSync(ENV)) {
  console.log(`  ${ENV} already exists, leaving it alone.`);
  process.exit(0);
}

if (!existsSync(EXAMPLE)) {
  console.error(`  ${EXAMPLE} is missing, so ${ENV} cannot be created from it.`);
  process.exit(1);
}

const secret = randomBytes(32).toString("base64url");
const contents = readFileSync(EXAMPLE, "utf8").replace(PLACEHOLDER, secret);

if (contents.includes(PLACEHOLDER)) {
  console.error(`  Could not find the AUTH_SECRET placeholder in ${EXAMPLE}.`);
  process.exit(1);
}

writeFileSync(ENV, contents);
console.log(`  ${ENV} created with a freshly generated AUTH_SECRET.`);
