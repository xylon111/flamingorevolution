import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getEventBySlug, ConfidenceBadge } from "@/features/events";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Event not found — Flamingo Revolution" };
  }

  const description =
    event.editor_summary ?? event.ai_summary ?? "Flamingo Revolution event";

  return {
    title: `${event.title} — Flamingo Revolution`,
    description,
    openGraph: { title: event.title, description, type: "article" },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description,
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const locale = await getLocale();
  const cityName = locale === "sq" ? event.city?.name_sq : event.city?.name_en;
  const categoryName =
    locale === "sq" ? event.category?.name_sq : event.category?.name_en;
  const summary = event.editor_summary ?? event.ai_summary;
  const tags = event.event_tags
    .map((et) => et.tags)
    .filter((t): t is NonNullable<typeof t> => t !== null);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link
        href="/events"
        className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        ← Events
      </Link>

      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {event.event_date && <span>{event.event_date}</span>}
        {cityName && <span>· {cityName}</span>}
        {categoryName && (
          <span className="rounded-full bg-nature/15 px-2 py-0.5 text-xs text-nature">
            {categoryName}
          </span>
        )}
        <ConfidenceBadge confidence={event.confidence} />
      </div>

      <h1 className="mb-4 text-3xl font-bold text-flamingo">{event.title}</h1>

      {summary && (
        <p className="mb-6 leading-relaxed text-foreground/90">{summary}</p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.slug}
              className="rounded-full bg-muted px-2 py-0.5 text-xs"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}
    </main>
  );
}
