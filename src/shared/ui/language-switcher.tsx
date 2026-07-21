"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const other = locale === "sq" ? "en" : "sq";

  return (
    <Button
      variant="outline"
      size="sm"
      aria-label="Change language"
      onClick={() => router.replace(pathname, { locale: other })}
    >
      {other.toUpperCase()}
    </Button>
  );
}
