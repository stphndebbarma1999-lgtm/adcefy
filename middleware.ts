import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

/**
 * 1. Routes the admin.adcefy.com subdomain straight to /admin/* internally,
 *    so hPanel/DNS can point that subdomain at this same deployment without
 *    a separate app or build (currently unused — see middleware notes in git
 *    history — but harmless to keep for when hosting supports it).
 * 2. Gates every /admin/* route behind a signed session cookie set by
 *    /api/admin-login, so the admin panel isn't wide open on a public URL.
 */
export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isAdminSubdomain = host === "admin.adcefy.com" || host.startsWith("admin.localhost");

  const url = request.nextUrl.clone();
  if (isAdminSubdomain && !url.pathname.startsWith("/admin")) {
    url.pathname = `/admin${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
  }

  const isAdminRoute = url.pathname.startsWith("/admin");
  if (isAdminRoute) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SESSION_SECRET || adminPassword;
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const authed = Boolean(secret) && (await verifySessionToken(token, secret!));

    if (!authed) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin-login";
      loginUrl.search = `?next=${encodeURIComponent(url.pathname)}`;
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isAdminSubdomain && url.pathname !== request.nextUrl.pathname) {
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|robots.txt|sitemap.xml|api/admin-login|admin-login).*)"],
};
