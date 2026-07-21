"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/shared/supabase/server";
import { magicLinkSchema } from "./schema";

/** Best-effort current origin (works on localhost and in production). */
async function getOrigin() {
  const h = await headers();
  const origin = h.get("origin");
  if (origin) return origin;
  const host = h.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

/** Start Google OAuth: returns a URL we must redirect the browser to. */
export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const origin = await getOrigin();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${origin}/auth/callback` },
  });

  if (error || !data.url) {
    redirect("/auth/auth-error");
  }

  redirect(data.url);
}

/** Send a magic-link email. Redirects back to /sign-in with a status flag. */
export async function signInWithMagicLink(formData: FormData) {
  const parsed = magicLinkSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    redirect("/sign-in?error=invalid-email");
  }

  const supabase = await createSupabaseServerClient();
  const origin = await getOrigin();

  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });

  if (error) {
    redirect("/sign-in?error=send-failed");
  }

  redirect("/sign-in?sent=true");
}

/** Sign the current user out and return home. */
export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
