import { getEventMapPoints } from "@/features/events";
import { EventMap } from "@/features/map/event-map";

export default async function MapPage() {
  const points = await getEventMapPoints();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-flamingo">Map</h1>
      <EventMap points={points} />
    </main>
  );
}
