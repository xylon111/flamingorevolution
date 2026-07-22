import { createSupabaseServerClient } from "@/shared/supabase/server";

/** Fetch published events, newest first, with city + category names. */
export async function getPublishedEvents() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("events")
    .select(
      `
      id,
      slug,
      title,
      editor_summary,
      event_date,
      confidence,
      is_featured,
      city:cities ( name_sq, name_en ),
      category:categories ( slug, name_sq, name_en )
    `,
    )
    .eq("status", "published")
    .order("event_date", { ascending: false });

  if (error) {
    throw new Error(`Failed to load events: ${error.message}`);
  }

  return data ?? [];
}

type EventsResult = Awaited<ReturnType<typeof getPublishedEvents>>;
export type EventListItem = EventsResult[number];
