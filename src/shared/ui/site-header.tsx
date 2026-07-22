import { getTranslations } from "next-intl/server";
import { getCurrentUser, signOut } from "@/features/auth";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { LanguageSwitcher } from "@/shared/ui/language-switcher";

export async function SiteHeader() {
  const user = await getCurrentUser();
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");

  const navLink = "text-nature hover:text-nature/80 text-sm font-medium";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-bold text-flamingo">
            Flamingo Revolution
          </Link>
          <Link href="/events" className={navLink}>
            {tn("events")}
          </Link>
          <Link href="/timeline" className={navLink}>
            {tn("timeline")}
          </Link>
          <Link href="/map" className={navLink}>
            {tn("map")}
          </Link>
          <Link href="/search" className={navLink}>
            {tn("search")}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          {user ? (
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                {tc("signOut")}
              </Button>
            </form>
          ) : (
            <Link href="/sign-in">
              <Button size="sm">{tc("signIn")}</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
