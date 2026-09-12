import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Stateless anon-key Supabase client for public, read-only queries (e.g. the
 * product catalog) that don't need a user's Supabase Auth session. Unlike
 * lib/supabase/server.ts, this never touches cookies(), so it's safe to call
 * from contexts with no request scope — generateStaticParams, sitemap, build
 * time, etc. — where the cookie-aware client would throw.
 *
 * RLS still applies (this uses the anon key), so it can only read what the
 * "Public can read active products" policy allows.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createSupabaseClient(url, key, { auth: { persistSession: false } });
}
