import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/features/auth";

export default async function Home() {
  const user = await getCurrentUser();
  const t = await getTranslations("home");

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-flamingo">{t("title")}</h1>
      <p className="max-w-prose text-muted-foreground">
        An information hub for the Albanian Flamingo Revolution.
      </p>
      {user && (
        <p className="text-sm text-muted-foreground">
          {t("signedInAs", { email: user.email ?? "" })}
        </p>
      )}
    </main>
  );
}
