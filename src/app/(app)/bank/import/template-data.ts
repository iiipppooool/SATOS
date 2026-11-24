import { IMPORT_TEMPLATE } from "@/lib/import-template";

/**
 * Serialised once at module load so the client bundle carries the template
 * without pulling in the server-only import module.
 *
 * Named template-data rather than template because `template.tsx` is a
 * reserved App Router file convention: Next would try to render this module
 * as a route template component and fail.
 */
export const IMPORT_TEMPLATE_JSON = JSON.stringify(IMPORT_TEMPLATE, null, 2);
