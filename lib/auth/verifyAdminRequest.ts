import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "./session";

/** Re-checks the admin session inside a Route Handler (defense in depth alongside middleware). */
export async function isAuthenticatedAdminRequest(request: NextRequest): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET || adminPassword;
  if (!secret) return false;

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token, secret);
}
