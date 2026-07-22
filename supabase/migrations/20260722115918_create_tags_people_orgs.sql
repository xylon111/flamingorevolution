-- ============================================================
-- Enums for people
-- ============================================================
create type person_kind as enum (
  'public_official',
  'organization_rep',
  'public_figure',
  'private'
);

create type person_visibility as enum ('public', 'restricted', 'redacted');

create type organization_type as enum (
  'ngo',
  'party',
  'gov',
  'police',
  'media',
  'business',
  'other'
);

-- ============================================================
-- tags
-- ============================================================
create table public.tags (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,
  name       text not null,
  created_at timestamptz not null default now()
);

create table public.event_tags (
  event_id uuid not null references public.events (id) on delete cascade,
  tag_id   uuid not null references public.tags (id) on delete cascade,
  primary key (event_id, tag_id)
);

-- ============================================================
-- people (privacy-sensitive: default to redacted)
-- ============================================================
create table public.people (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  display_name     text not null,
  role_description text,
  kind             person_kind not null default 'private',
  visibility       person_visibility not null default 'redacted',
  is_verified      boolean not null default false,
  created_at       timestamptz not null default now()
);

create table public.event_people (
  event_id        uuid not null references public.events (id) on delete cascade,
  person_id       uuid not null references public.people (id) on delete cascade,
  mention_context text,
  primary key (event_id, person_id)
);

-- ============================================================
-- organizations
-- ============================================================
create table public.organizations (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  type        organization_type not null default 'other',
  website     text,
  is_verified boolean not null default false,
  created_at  timestamptz not null default now()
);

create table public.event_organizations (
  event_id        uuid not null references public.events (id) on delete cascade,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  role            text,
  primary key (event_id, organization_id)
);

-- ============================================================
-- Row-Level Security
-- ============================================================
alter table public.tags enable row level security;
create policy "Tags are viewable by everyone"
  on public.tags for select using (true);
create policy "Moderators manage tags"
  on public.tags for all
  using (public.is_moderator()) with check (public.is_moderator());

alter table public.event_tags enable row level security;
create policy "Event tags are viewable by everyone"
  on public.event_tags for select using (true);
create policy "Moderators manage event tags"
  on public.event_tags for all
  using (public.is_moderator()) with check (public.is_moderator());

-- People: only PUBLIC people are visible to visitors; moderators see all.
alter table public.people enable row level security;
create policy "Public people are viewable by everyone"
  on public.people for select
  using (visibility = 'public' or public.is_moderator());
create policy "Moderators manage people"
  on public.people for all
  using (public.is_moderator()) with check (public.is_moderator());

alter table public.event_people enable row level security;
create policy "Event people are viewable by everyone"
  on public.event_people for select using (true);
create policy "Moderators manage event people"
  on public.event_people for all
  using (public.is_moderator()) with check (public.is_moderator());

alter table public.organizations enable row level security;
create policy "Organizations are viewable by everyone"
  on public.organizations for select using (true);
create policy "Moderators manage organizations"
  on public.organizations for all
  using (public.is_moderator()) with check (public.is_moderator());

alter table public.event_organizations enable row level security;
create policy "Event organizations are viewable by everyone"
  on public.event_organizations for select using (true);
create policy "Moderators manage event organizations"
  on public.event_organizations for all
  using (public.is_moderator()) with check (public.is_moderator());