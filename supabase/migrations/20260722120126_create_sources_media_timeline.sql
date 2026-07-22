-- ============================================================
-- Enums for sources & media
-- ============================================================
create type source_platform as enum (
  'instagram', 'facebook', 'youtube', 'tiktok',
  'news', 'photo', 'video', 'pdf', 'witness', 'other'
);

create type source_reliability as enum (
  'government', 'major_news', 'verified_journalist', 'verified_organizer',
  'citizen_video', 'citizen_photo', 'anonymous', 'unknown'
);

create type source_status as enum (
  'pending', 'processing', 'needs_review', 'approved',
  'rejected', 'duplicate', 'error'
);

create type media_type as enum ('photo', 'video', 'document');
create type media_storage as enum ('external', 'supabase');

-- ============================================================
-- sources: submitted links/reports folded into events
-- ============================================================
create table public.sources (
  id             uuid primary key default gen_random_uuid(),
  event_id       uuid references public.events (id) on delete set null,
  url            text not null,
  platform       source_platform not null default 'other',
  reliability    source_reliability not null default 'unknown',
  status         source_status not null default 'pending',
  submitted_by   uuid references public.profiles (id) on delete set null,
  raw_metadata   jsonb,
  ai_title       text,
  ai_summary     text,
  ai_tags        text[],
  ai_category    text,
  detected_city  text,
  detected_date  date,
  is_relevant    boolean,
  created_at     timestamptz not null default now(),
  processed_at   timestamptz
);

create index sources_status_idx on public.sources (status, created_at desc);
create index sources_event_idx on public.sources (event_id);

-- ============================================================
-- media: photos/videos/documents (external ref or stored)
-- ============================================================
create table public.media (
  id            uuid primary key default gen_random_uuid(),
  event_id      uuid references public.events (id) on delete cascade,
  source_id     uuid references public.sources (id) on delete set null,
  type          media_type not null,
  storage       media_storage not null default 'external',
  external_url  text,
  storage_path  text,
  thumbnail_path text,
  caption       text,
  credit        text,
  license       text,
  exif_stripped boolean not null default false,
  width         integer,
  height        integer,
  created_at    timestamptz not null default now()
);

create index media_event_idx on public.media (event_id);

-- ============================================================
-- event timeline entries
-- ============================================================
create table public.event_timeline_entries (
  id          uuid primary key default gen_random_uuid(),
  event_id    uuid not null references public.events (id) on delete cascade,
  occurred_at timestamptz not null,
  title       text not null,
  description text,
  source_id   uuid references public.sources (id) on delete set null,
  created_by  uuid references public.profiles (id) on delete set null,
  created_at  timestamptz not null default now()
);

create index timeline_event_idx on public.event_timeline_entries (event_id, occurred_at);

-- ============================================================
-- Row-Level Security
-- ============================================================
-- Sources: anyone may SUBMIT; only moderators may read/edit/delete.
alter table public.sources enable row level security;
create policy "Anyone can submit a source"
  on public.sources for insert with check (true);
create policy "Moderators can read sources"
  on public.sources for select using (public.is_moderator());
create policy "Moderators can update sources"
  on public.sources for update
  using (public.is_moderator()) with check (public.is_moderator());
create policy "Moderators can delete sources"
  on public.sources for delete using (public.is_moderator());

-- Media: readable if its event is published (or