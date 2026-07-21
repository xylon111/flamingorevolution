import { getTranslations } from "next-intl/server";
import { getCurrentUser, signOut } from "@/features/auth";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await getCurrentUser();
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-3xl font-bold text-flamingo">{t("title")}</h1>

      {user ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">
            {t("signedInAs", { email: user.email ?? "" })}
          </p>
          <form action={signOut}>
            <Button type="submit" variant="outline">
              {tc("signOut")}
            </Button>
          </form>
        </div>
      ) : (
        <Link href="/sign-in">
          <Button>{tc("signIn")}</Button>
        </Link>
      )}
    </main>
  );
}
