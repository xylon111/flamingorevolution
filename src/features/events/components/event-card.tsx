import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { EventListItem } from "@/features/events/queries";

export async function EventCard({ event }: { event: EventListItem }) {
  const locale = await getLocale();
  const cityName = locale === "sq" ? event.city?.name_sq : event.city?.name_en;
  const categoryName =
    locale === "sq" ? event.category?.name_sq : event.category?.name_en;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="block rounded-lg border border-border p-5 transition-colors hover:border-flamingo/60"
    >
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {event.event_date && <span>{event.event_date}</span>}
        {cityName && <span>· {cityName}</span>}
        {categoryName && (
          <span className="rounded-full bg-nature/15 px-2 py-0.5 text-nature">
            {categoryName}
          </span>
        )}
      </div>
      <h2 className="mb-1 text-lg font-semibold">{event.title}</h2>
      {event.editor_summary && (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {event.editor_summary}
        </p>
      )}
    </Link>
  );
}
