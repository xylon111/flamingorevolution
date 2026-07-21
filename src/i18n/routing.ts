import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Albanian is primary; English secondary.
  locales: ["sq", "en"],
  defaultLocale: "sq",
});
