import { NextResponse, type NextRequest } from "next/server";

/**
 * Routes the admin.adcefy.com subdomain straight to /admin/* internally,
 * so hPanel/DNS can point that subdomain at this same deployment without
 * a separate app or build.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isAdminSubdomain = host === "admin.adcefy.com" || host.startsWith("admin.localhost");

  if (isAdminSubdomain && !request.nextUrl.pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = `/admin${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};
