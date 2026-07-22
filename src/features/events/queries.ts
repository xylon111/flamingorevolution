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

/** Fetch a single published event by slug, with related data. Null if not found. */
export async function getEventBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("events")
    .select(
      `
      id,
      slug,
      title,
      editor_summary,
      ai_summary,
      event_date,
      confidence,
      lat,
      lng,
      city:cities ( name_sq, name_en ),
      category:categories ( slug, name_sq, name_en ),
      event_tags ( tags ( slug, name ) )
    `,
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load event: ${error.message}`);
  }

  return data;
}

/** Latest published events for the home feed (limited count). */
export async function getLatestEvents(limit = 6) {
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
    .order("event_date", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to load latest events: ${error.message}`);
  }

  return data ?? [];
}

export type EventFilters = {
  city?: string;
  category?: string;
  tag?: string;
};

/** Published events filtered by city/category/tag slugs (all optional). */
export async function getFilteredEvents(filters: EventFilters) {
  const supabase = await createSupabaseServerClient();

  let query = supabase
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
      city:cities!inner ( slug, name_sq, name_en ),
      category:categories!inner ( slug, name_sq, name_en ),
      event_tags!left ( tags!inner ( slug ) )
    `,
    )
    .eq("status", "published");

  if (filters.city) query = query.eq("city.slug", filters.city);
  if (filters.category) query = query.eq("category.slug", filters.category);
  if (filters.tag) query = query.eq("event_tags.tags.slug", filters.tag);

  const { data, error } = await query.order("event_date", {
    ascending: false,
  });

  if (error) {
    throw new Error(`Failed to load filtered events: ${error.message}`);
  }

  return data ?? [];
}

/** Cities and categories for the filter dropdowns. */
export async function getFilterOptions() {
  const supabase = await createSupabaseServerClient();

  const [cities, categories] = await Promise.all([
    supabase.from("cities").select("slug, name_sq, name_en").order("name_en"),
    supabase
      .from("categories")
      .select("slug, name_sq, name_en")
      .order("name_en"),
  ]);

  return {
    cities: cities.data ?? [],
    categories: categories.data ?? [],
  };
}

/** Full-text search over published events (title + summaries). */
export async function searchEvents(term: string) {
  const trimmed = term.trim();
  if (!trimmed) return [];

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
    .textSearch("search_vector", trimmed, {
      type: "websearch",
      config: "simple",
    })
    .limit(30);

  if (error) {
    throw new Error(`Search failed: ${error.message}`);
  }

  return data ?? [];
}
