import {
  getFilteredEvents,
  getFilterOptions,
  EventCard,
} from "@/features/events";
import { TimelineFilters } from "@/features/events/components/timeline-filters";

export default async function TimelinePage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; category?: string; tag?: string }>;
}) {
  const filters = await searchParams;
  const [events, options] = await Promise.all([
    getFilteredEvents(filters),
    getFilterOptions(),
  ]);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-flamingo">Timeline</h1>

      <TimelineFilters
        cities={options.cities}
        categories={options.categories}
        active={filters}
      />

      {events.length === 0 ? (
        <p className="text-muted-foreground">No events match these filters.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}
