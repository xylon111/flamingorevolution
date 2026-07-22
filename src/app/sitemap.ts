import type { MetadataRoute } from "next";
import { env } from "@/shared/env";
import { getPublishedEvents } from "@/features/events";
import { routing } from "@/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_SITE_URL;
  const staticPaths = ["", "/events", "/timeline", "/map", "/search"];

  const staticEntries = routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
    })),
  );

  const events = await getPublishedEvents();
  const eventEntries = routing.locales.flatMap((locale) =>
    events.map((e) => ({
      url: `${base}/${locale}/events/${e.slug}`,
      lastModified: new Date(),
    })),
  );

  return [...staticEntries, ...eventEntries];
}
