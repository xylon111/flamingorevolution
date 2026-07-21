"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { createSupabaseServerClient } from "@/shared/supabase/server";
import { magicLinkSchema } from "./schema";

async function getOrigin() {
  const h = await headers();
  const origin = h.get("origin");
  if (origin) return origin;
  const host = h.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const origin = await getOrigin();
  const locale = await getLocale();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${origin}/${locale}/auth/callback` },
  });

  if (error || !data.url) {
    redirect("/auth/auth-error");
  }

  redirect(data.url);
}

export async function signInWithMagicLink(formData: FormData) {
  const parsed = magicLinkSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    redirect("/sign-in?error=invalid-email");
  }

  const supabase = await createSupabaseServerClient();
  const origin = await getOrigin();
  const locale = await getLocale();

  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: { emailRedirectTo: `${origin}/${locale}/auth/callback` },
  });

  if (error) {
    redirect("/sign-in?error=send-failed");
  }

  redirect("/sign-in?sent=true");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
