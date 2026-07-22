-- ============================================================
-- Enums for map markers
-- ============================================================
create type marker_type as enum (
  'protest', 'roadblock', 'medical_aid', 'water',
  'meeting_point', 'police_presence', 'press'
);

create type marker_status as enum ('unverified', 'active', 'expired');

-- ============================================================
-- map_markers
-- ============================================================
create table public.map_markers (
  id          uuid primary key default gen_random_uuid(),
  event_id    uuid references public.events (id) on delete set null,
  type        marker_type not null,
  lat         double precision not null,
  lng         double precision not null,
  label       text,
  status      marker_status not null default 'unverified',
  valid_from  timestamptz,
  valid_until timestamptz,
  verified_by uuid references public.profiles (id) on delete set null,
  created_at  timestamptz not null default now()
);

create index markers_type_status_idx on public.map_markers (type, status);

-- ============================================================
-- announcements
-- ============================================================
create table public.announcements (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  body         text,
  is_pinned    boolean not null default false,
  created_by   uuid references public.profiles (id) on delete set null,
  published_at timestamptz,
  created_at   timestamptz not null default now()
);

-- ============================================================
-- audit_log
-- ============================================================
create table public.audit_log (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references public.profiles (id) on delete set null,
  action      text not null,
  entity_type text not null,
  entity_id   uuid,
  before      jsonb,
  after       jsonb,
  reason      text,
  created_at  timestamptz not null default now()
);

create index audit_log_created_idx on public.audit_log (created_at desc);

-- ============================================================
-- Row-Level Security
-- ============================================================
-- Markers: only ACTIVE and non-police markers are public; moderators see all.
alter table public.map_markers enable row level security;
create policy "Active markers are viewable by everyone"
  on public.map_markers for select
  using (
    public.is_moderator()
    or (status = 'active' and type <> 'police_presence')
  );
create policy "Moderators manage markers"
  on public.map_markers for all
  using (public.is_moderator()) with check (public.is_moderator());

-- Announcements: published ones are public; moderators manage.
alter table public.announcements enable row level security;
create policy "Published announcements are viewable by everyone"
  on public.announcements for select
  using (published_at is not null or public.is_moderator());
create policy "Moderators manage announcements"
  on public.announcements for all
  using (public.is_moderator()) with check (public.is_moderator());

-- Audit log: only admins can read; writes happen via server (service role).
alter table public.audit_log enable row level security;
create policy "Admins can read the audit log"
  on public.audit_log for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );