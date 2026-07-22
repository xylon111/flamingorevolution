import { searchEvents, EventCard } from "@/features/events";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const term = q ?? "";
  const results = term ? await searchEvents(term) : [];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-flamingo">Search</h1>

      <form method="get" className="mb-8 flex gap-2">
        <Input
          name="q"
          defaultValue={term}
          placeholder="Search events…"
          className="max-w-md"
        />
        <Button type="submit">Search</Button>
      </form>

      {term && (
        <p className="mb-4 text-sm text-muted-foreground">
          {results.length} result{results.length === 1 ? "" : "s"} for “{term}”
        </p>
      )}

      {results.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {results.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
}
