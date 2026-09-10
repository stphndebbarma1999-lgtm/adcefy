import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Server-side Supabase client for Server Components, Route Handlers and
 * Server Actions. Uses only the public URL and anon key — RLS policies
 * enforce access control. Returns null when Supabase is not configured,
 * so callers should fall back to the demo data layer in lib/data.
 *
 * NEVER use the service role key here or in any client-reachable code path.
 */
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component without a mutable cookie store —
          // safe to ignore when middleware handles session refresh.
        }
      },
    },
  });
}
