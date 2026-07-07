import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The backend sets an httpOnly `refreshToken` cookie on login. If it is missing
// the visitor has no session at all, so we redirect to /login before wasting an
// SSR pass and a /auth/refresh round trip on a page that can only fail.
//
// A *stale* cookie (present but rejected by the backend) still passes this
// check — that case is caught server-side by requireServerAuth(), which
// validates the token against the backend during render.
export function proxy(req: NextRequest) {
  const hasSession = req.cookies.has("refreshToken");

  if (!hasSession) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Protect every route except the auth pages and static assets. Route groups
// like (apps) don't appear in the URL, so we match by the real paths.
export const config = {
  matcher: [
    "/((?!login|register|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};