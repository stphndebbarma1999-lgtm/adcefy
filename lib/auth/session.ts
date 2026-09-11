/**
 * Minimal signed-session helper for gating /admin behind a shared password.
 *
 * Uses Web Crypto (available in both the Node runtime and Edge middleware)
 * so the same code protects the admin panel regardless of where it's hosted.
 * This is a lightweight single-password gate, not multi-user auth — once
 * Supabase is connected, replace this with real Supabase Auth + roles.
 */

const encoder = new TextEncoder();

async function getKey(secret: string) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(secret: string): Promise<string> {
  const issuedAt = Date.now().toString();
  const key = await getKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(issuedAt));
  return `${issuedAt}.${toHex(signature)}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
  secret: string,
  maxAgeMs = 1000 * 60 * 60 * 24 * 7
): Promise<boolean> {
  if (!token) return false;
  const [issuedAt, signatureHex] = token.split(".");
  if (!issuedAt || !signatureHex) return false;
  if (!/^\d+$/.test(issuedAt)) return false;
  if (Date.now() - Number(issuedAt) > maxAgeMs) return false;

  const key = await getKey(secret);
  const expectedSignature = await crypto.subtle.sign("HMAC", key, encoder.encode(issuedAt));
  return timingSafeEqual(toHex(expectedSignature), signatureHex);
}

export const ADMIN_SESSION_COOKIE = "adcefy_admin_session";
