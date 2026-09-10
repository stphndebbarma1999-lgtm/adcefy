import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client. Uses only the public URL and anon key —
 * safe to call from Client Components. Returns null when Supabase is not
 * configured yet, so the storefront can keep running against the demo
 * data layer in lib/data until real credentials are provided.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createBrowserClient(url, key);
}

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
