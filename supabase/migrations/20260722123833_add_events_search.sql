-- Add a generated full-text search vector over title + summaries.
alter table public.events
  add column search_vector tsvector
  generated always as (
    to_tsvector(
      'simple',
      coalesce(title, '') || ' ' ||
      coalesce(editor_summary, '') || ' ' ||
      coalesce(ai_summary, '')
    )
  ) stored;

create index events_search_idx on public.events using gin (search_vector);
