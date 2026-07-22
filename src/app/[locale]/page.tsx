import { getTranslations } from "next-intl/server";
import { getLatestEvents, EventCard } from "@/features/events";
import { Link } from "@/i18n/navigation";

export default async function Home() {
  const t = await getTranslations("home");
  const events = await getLatestEvents(6);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <section className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-bold text-flamingo">{t("title")}</h1>
        <p className="mx-auto max-w-prose text-muted-foreground">
          An information hub for the Albanian Flamingo Revolution.
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Latest events</h2>
          <Link
            href="/events"
            className="text-sm font-medium text-nature hover:text-nature/80"
          >
            View all →
          </Link>
        </div>

        {events.length === 0 ? (
          <p className="text-muted-foreground">No events yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
