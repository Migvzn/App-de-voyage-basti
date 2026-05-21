-- ════════════════════════════════════════════════════════════
--  Wanderly — schéma Supabase / PostgreSQL
--  À exécuter dans l'éditeur SQL Supabase, ou via la CLI :
--    supabase db push
-- ════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── Profils (étend auth.users de Supabase) ──────────────────
create table public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  name          text not null default 'Voyageur',
  email         text unique,
  xp            integer not null default 0,
  plan          text not null default 'free'
                  check (plan in ('free', 'explorer', 'globetrotter')),
  points        integer not null default 0,
  km_travelled  integer not null default 0,
  created_at    timestamptz not null default now()
);

-- ── Profil de goûts implicite (alimenté par l'IA) ───────────
create table public.user_preferences (
  user_id        uuid primary key references public.profiles (id) on delete cascade,
  vibe           text check (vibe in ('chill', 'adventure', 'culture', 'foodie')),
  moods          text[] not null default '{}',
  typical_budget integer,
  typical_length integer,
  transport_pref text,
  dietary        text[] not null default '{}',
  updated_at     timestamptz not null default now()
);

-- ── Voyages ─────────────────────────────────────────────────
create table public.trips (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles (id) on delete cascade,
  title        text not null,
  city         text not null,
  country      text not null,
  country_code text,
  start_date   date not null,
  end_date     date not null,
  travelers    integer not null default 1,
  budget       numeric(10,2) not null default 0,
  scenario     text check (scenario in ('eco', 'balanced', 'premium')),
  status       text not null default 'draft'
                 check (status in ('draft', 'planned', 'booked', 'completed')),
  cover_image  text,
  created_at   timestamptz not null default now()
);
create index trips_user_idx on public.trips (user_id);

-- ── Éléments d'itinéraire ───────────────────────────────────
create table public.trip_items (
  id        uuid primary key default gen_random_uuid(),
  trip_id   uuid not null references public.trips (id) on delete cascade,
  kind      text not null check (kind in ('flight', 'stay', 'restaurant', 'activity')),
  ref_id    text,
  title     text not null,
  subtitle  text,
  day       integer not null default 1,
  time      text,
  price     numeric(10,2) not null default 0,
  deep_link text,
  booked    boolean not null default false
);
create index trip_items_trip_idx on public.trip_items (trip_id);

-- ── Dépenses (budget intelligent) ───────────────────────────
create table public.expenses (
  id         uuid primary key default gen_random_uuid(),
  trip_id    uuid not null references public.trips (id) on delete cascade,
  label      text not null,
  category   text not null check (category in
               ('Vols','Hébergement','Restos','Activités','Transport','Shopping','Imprévus')),
  amount     numeric(10,2) not null,
  day        integer not null default 1,
  planned    boolean not null default false,
  created_at timestamptz not null default now()
);
create index expenses_trip_idx on public.expenses (trip_id);

-- ── Réservations (lien Stripe / fournisseur) ────────────────
create table public.bookings (
  id           uuid primary key default gen_random_uuid(),
  trip_item_id uuid references public.trip_items (id) on delete set null,
  user_id      uuid not null references public.profiles (id) on delete cascade,
  provider     text,
  amount       numeric(10,2) not null,
  currency     text not null default 'EUR',
  stripe_pi    text,
  status       text not null default 'pending'
                 check (status in ('pending', 'confirmed', 'failed', 'refunded')),
  created_at   timestamptz not null default now()
);

-- ── Avis & communauté ───────────────────────────────────────
create table public.reviews (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  trip_id    uuid references public.trips (id) on delete set null,
  city       text,
  country    text,
  rating     integer not null check (rating between 1 and 5),
  body       text not null,
  photos     text[] not null default '{}',
  tags       text[] not null default '{}',
  likes      integer not null default 0,
  created_at timestamptz not null default now()
);

-- ── Badges (catalogue + déblocages) ─────────────────────────
create table public.badges (
  id   text primary key,
  name text not null,
  description text,
  icon text,
  xp   integer not null default 0
);

create table public.user_badges (
  user_id     uuid not null references public.profiles (id) on delete cascade,
  badge_id    text not null references public.badges (id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

-- ── Grand livre des points ──────────────────────────────────
create table public.points_ledger (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  delta      integer not null,
  reason     text not null,
  created_at timestamptz not null default now()
);

-- ── Abonnements Stripe ──────────────────────────────────────
create table public.subscriptions (
  user_id              uuid primary key references public.profiles (id) on delete cascade,
  plan                 text not null default 'free',
  stripe_customer_id   text,
  stripe_subscription_id text,
  status               text not null default 'active',
  current_period_end   timestamptz,
  updated_at           timestamptz not null default now()
);

-- ── Pays visités (carte gamifiée) ───────────────────────────
create table public.visited_countries (
  user_id             uuid not null references public.profiles (id) on delete cascade,
  country_name        text not null,
  country_code        text,
  cities_visited      integer not null default 0,
  major_cities        integer not null default 1,
  days_spent          integer not null default 0,
  activities_validated integer not null default 0,
  trips               integer not null default 0,
  primary key (user_id, country_name)
);

-- ════════════════════════════════════════════════════════════
--  Row Level Security — chacun ne voit que ses données
--  (les avis publiés restent lisibles par tous)
-- ════════════════════════════════════════════════════════════
alter table public.profiles          enable row level security;
alter table public.user_preferences  enable row level security;
alter table public.trips             enable row level security;
alter table public.trip_items        enable row level security;
alter table public.expenses          enable row level security;
alter table public.bookings          enable row level security;
alter table public.reviews           enable row level security;
alter table public.user_badges       enable row level security;
alter table public.points_ledger     enable row level security;
alter table public.subscriptions     enable row level security;
alter table public.visited_countries enable row level security;

create policy "own profile"      on public.profiles
  for all using (auth.uid() = id);
create policy "own preferences"  on public.user_preferences
  for all using (auth.uid() = user_id);
create policy "own trips"        on public.trips
  for all using (auth.uid() = user_id);
create policy "own trip items"   on public.trip_items
  for all using (exists (
    select 1 from public.trips t
    where t.id = trip_items.trip_id and t.user_id = auth.uid()));
create policy "own expenses"     on public.expenses
  for all using (exists (
    select 1 from public.trips t
    where t.id = expenses.trip_id and t.user_id = auth.uid()));
create policy "own bookings"     on public.bookings
  for all using (auth.uid() = user_id);
create policy "reviews readable" on public.reviews
  for select using (true);
create policy "own reviews write" on public.reviews
  for all using (auth.uid() = user_id);
create policy "own badges"       on public.user_badges
  for all using (auth.uid() = user_id);
create policy "own ledger"       on public.points_ledger
  for all using (auth.uid() = user_id);
create policy "own subscription" on public.subscriptions
  for all using (auth.uid() = user_id);
create policy "own countries"    on public.visited_countries
  for all using (auth.uid() = user_id);

-- Le catalogue de badges est public en lecture
alter table public.badges enable row level security;
create policy "badges readable" on public.badges for select using (true);

-- ════════════════════════════════════════════════════════════
--  Seed — 3 voyages démo (voir aussi src/lib/mock-data.ts)
--  Remplace <DEMO_USER> par un uuid auth.users réel.
-- ════════════════════════════════════════════════════════════
-- insert into public.trips (user_id, title, city, country, start_date, end_date, travelers, budget, scenario, status)
-- values
--   ('<DEMO_USER>', 'Lisbonne au soleil de mars', 'Lisbonne', 'Portugal', '2026-03-12', '2026-03-17', 2, 1180, 'balanced', 'booked'),
--   ('<DEMO_USER>', 'Rome en amoureux',           'Rome',     'Italie',   '2026-05-28', '2026-06-01', 2, 1640, 'premium',  'planned'),
--   ('<DEMO_USER>', 'Tokyo, première fois',        'Tokyo',    'Japon',    '2026-10-04', '2026-10-13', 1, 2870, 'balanced', 'draft');
