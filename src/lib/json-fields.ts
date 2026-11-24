/**
 * The Prisma schema stores list fields as JSON text so that one schema works
 * on both SQLite and Postgres. These helpers are the only place that knows,
 * and they never throw on malformed data: a corrupt field degrades to an empty
 * list rather than taking down the page that renders it.
 */

export function parseStringList(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function serialiseStringList(value: readonly string[] | null | undefined): string | null {
  if (!value || value.length === 0) return null;
  return JSON.stringify(value);
}

export function parseJsonObject<T extends Record<string, unknown>>(
  value: string | null | undefined,
): T | null {
  if (!value) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as T;
  } catch {
    return null;
  }
}
