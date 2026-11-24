import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/session-edge";

const PUBLIC_PATHS = ["/login", "/signup"];

/**
 * Edge gate on the authenticated area. Named `proxy` and living in proxy.ts,
 * which is the Next 16 convention that replaced `middleware`.
 *
 * This is a redirect for convenience, not the security boundary: every page and
 * server action independently calls requireUser, so a bypass here still cannot
 * read another user's data.
 */
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("satos_session")?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Everything except Next internals, static assets and the API health
     * route. The root path is handled by its own page, which redirects.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
