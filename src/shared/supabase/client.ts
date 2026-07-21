import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/shared/env";

/**
 * Supabase client for the browser (Client Components).
 * Uses the publishable key (safe to expose). RLS still applies.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
