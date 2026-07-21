import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/shared/ui/theme-provider";
import { SiteHeader } from "@/shared/ui/site-header";
import { SiteFooter } from "@/shared/ui/site-footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flamingo Revolution",
  description:
    "An information hub for the Albanian Flamingo Revolution — events, timeline, media, and verified sources.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
