import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/shared/env";

/**
 * ADMIN Supabase client using the SECRET key. BYPASSES Row Level Security.
 * SERVER-ONLY — never import this into client code.
 * Use only in trusted server contexts (e.g. the background worker).
 */
export function createSupabaseServiceClient() {
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
