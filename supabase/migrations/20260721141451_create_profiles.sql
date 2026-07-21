-- ============================================================
-- Enums: fixed, database-enforced value sets
-- ============================================================
create type user_role as enum ('user', 'moderator', 'admin');

-- ============================================================
-- profiles: app-level user data, 1:1 with auth.users
-- ============================================================
create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  username     text unique,
  display_name text,
  avatar_url   text,
  role         user_role not null default 'user',
  created_at   timestamptz not null default now()
);

comment on table public.profiles is 'App-level user profile, one row per auth user.';

-- ============================================================
-- Row-Level Security: locked down by default
-- ============================================================
alter table public.profiles enable row level security;

-- Anyone (even logged-out) may read profiles. Public display data only.
create policy "Profiles are viewable by everyone"
  on public.profiles
  for select
  using (true);

-- A logged-in user may update ONLY their own profile.
create policy "Users can update their own profile"
  on public.profiles
  for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);