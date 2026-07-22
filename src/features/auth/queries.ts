import { createSupabaseServerClient } from "@/shared/supabase/server";

/** Returns the currently authenticated user, or null if signed out. */
export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** The current user's profile row (including role), or null if signed out. */
export async function getCurrentProfile() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, username, display_name, role")
    .eq("id", user.id)
    .maybeSingle();

  return data;
}

/** True if the current user is a moderator or admin. */
export async function currentUserIsModerator() {
  const profile = await getCurrentProfile();
  return profile?.role === "moderator" || profile?.role === "admin";
}
