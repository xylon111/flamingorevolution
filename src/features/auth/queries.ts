import { createSupabaseServerClient } from "@/shared/supabase/server";

/** Returns the currently authenticated user, or null if signed out. */
export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
