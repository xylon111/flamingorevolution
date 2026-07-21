import { getTranslations } from "next-intl/server";
import { signInWithGoogle, signInWithMagicLink } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const params = await searchParams;
  const t = await getTranslations("signIn");

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        {params.sent && (
          <p className="rounded-md bg-muted p-3 text-center text-sm">
            {t("checkEmail")}
          </p>
        )}
        {params.error && (
          <p className="rounded-md bg-destructive/10 p-3 text-center text-sm text-destructive">
            {params.error === "invalid-email" ? t("invalidEmail") : t("error")}
          </p>
        )}

        <form action={signInWithGoogle}>
          <Button type="submit" variant="outline" className="w-full">
            {t("google")}
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">{t("or")}</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form action={signInWithMagicLink} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {t("sendLink")}
          </Button>
        </form>
      </div>
    </main>
  );
}
