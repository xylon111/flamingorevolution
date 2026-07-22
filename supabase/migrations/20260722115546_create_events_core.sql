-- ============================================================
-- Role helper: is the current user a moderator or admin?
-- Used by RLS policies across the app.
-- ============================================================
create function public.is_moderator()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('moderator', 'admin')
  );
$$;

-- ============================================================
-- Enum: the lifecycle status of an event
-- ============================================================
create type event_status as enum (
  'draft',
  'needs_review',
  'published',
  'rejected',
  'archived'
);

-- ============================================================
-- cities: reference data (Albanian cities/locations)
-- ============================================================
create table public.cities (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  name_sq    text not null,
  name_en    text not null,
  lat        double precision,
  lng        double precision,
  country    text not null default 'AL',
  created_at timestamptz not null default now()
);

-- ============================================================
-- categories: reference data (kinds of events)
-- ============================================================
create table public.categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name_sq     text not null,
  name_en     text not null,
  description text,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- events: the central entity
-- ============================================================
create table public.events (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  status         event_status not null default 'draft',
  title          text not null,
  ai_summary     text,
  editor_summary text,
  summary_lang   text,
  event_date     date,
  starts_at      timestamptz,
  city_id        uuid references public.cities (id) on delete set null,
  lat            double precision,
  lng            double precision,
  category_id    uuid references public.categories (id) on delete set null,
  confidence     numeric,
  is_featured    boolean not null default false,
  is_pinned      boolean not null default false,
  view_count     integer not null default 0,
  created_by     uuid references public.profiles (id) on delete set null,
  published_at   timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index events_status_date_idx on public.events (status, event_date desc);
create index events_city_idx on public.events (city_id);
create index events_category_idx on public.events (category_id);

-- ============================================================
-- Row-Level Security
-- ============================================================
alter table public.cities enable row level security;
create policy "Cities are viewable by everyone"
  on public.cities for select using (true);
create policy "Moderators manage cities"
  on public.cities for all
  using (public.is_moderator()) with check (public.is_moderator());

alter table public.categories enable row level security;
create policy "Categories are viewable by everyone"
  on public.categories for select using (true);
create policy "Moderators manage categories"
  on public.categories for all
  using (public.is_moderator()) with check (public.is_moderator());

alter table public.events enable row level security;
-- Anyone can read PUBLISHED events; moderators can read everything.
create policy "Published events are viewable by everyone"
  on public.events for select
  using (status = 'published' or public.is_moderator());
-- Only moderators can create/edit/delete events.
create policy "Moderators manage events"
  on public.events for all
  using (public.is_moderator()) with check (public.is_moderator());