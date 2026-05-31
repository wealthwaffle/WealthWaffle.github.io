-- ═══════════════════════════════════════════════════════════════════════
-- WealthWaffle — Schema Supabase complet
-- À exécuter dans l'éditeur SQL de Supabase (Settings → SQL Editor)
-- Mis à jour : Juin 2026
-- ═══════════════════════════════════════════════════════════════════════

-- Extensions nécessaires
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ───────────────────────────────────────────────────────────────────────
-- 1. PROFILES — profil utilisateur étendu (lié à auth.users)
-- ───────────────────────────────────────────────────────────────────────
create table if not exists profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  prenom        text,
  nom           text,
  email         text,
  plan          text default 'socle' check (plan in ('socle','pilote','radar')),
  level         text default 'debutant' check (level in ('debutant','avance')),
  profile       text default 'particulier' check (profile in ('particulier','independant','dirigeant')),
  topic         text default 'budget',
  stripe_id     text,                          -- Stripe Customer ID
  trial_ends_at timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- RLS
alter table profiles enable row level security;
create policy "Utilisateur voit son propre profil"
  on profiles for all using (auth.uid() = id);

-- Trigger : créer automatiquement un profil à l'inscription
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, email, prenom, nom)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'prenom',
    new.raw_user_meta_data->>'nom'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ───────────────────────────────────────────────────────────────────────
-- 2. PAGE_VIEWS — suivi de la progression de lecture
-- ───────────────────────────────────────────────────────────────────────
create table if not exists page_views (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references profiles(id) on delete cascade not null,
  page_slug  text not null,                    -- ex: /invest/etf.html
  viewed_at  timestamptz default now(),
  unique (user_id, page_slug)                  -- une seule entrée par page par user
);

alter table page_views enable row level security;
create policy "Utilisateur voit ses propres vues"
  on page_views for all using (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- 3. REFERRALS — codes de parrainage
-- ───────────────────────────────────────────────────────────────────────
create table if not exists referrals (
  id          uuid default gen_random_uuid() primary key,
  referrer_id uuid references profiles(id) on delete cascade not null,
  code        text not null unique,            -- ex: WW4F2A1B
  created_at  timestamptz default now()
);

alter table referrals enable row level security;
create policy "Utilisateur voit son propre code"
  on referrals for all using (auth.uid() = referrer_id);

-- ───────────────────────────────────────────────────────────────────────
-- 4. REFERRAL_CONVERSIONS — filleuls et récompenses
-- ───────────────────────────────────────────────────────────────────────
create table if not exists referral_conversions (
  id             uuid default gen_random_uuid() primary key,
  referrer_id    uuid references profiles(id) on delete cascade not null,
  filleul_id     uuid references profiles(id) on delete set null,
  filleul_email  text,
  filleul_prenom text,
  filleul_plan   text,                         -- pilote_monthly | pilote_annual | radar_monthly | radar_annual
  status         text default 'trial'
                 check (status in ('trial','active','cancelled','expired')),
  reward_type    text check (reward_type in ('week','month')),
  rewarded       boolean default false,
  rewarded_at    timestamptz,
  created_at     timestamptz default now()
);

alter table referral_conversions enable row level security;
create policy "Parrain voit ses conversions"
  on referral_conversions for select using (auth.uid() = referrer_id);

-- ───────────────────────────────────────────────────────────────────────
-- 5. LEAD_MAGNET_REQUESTS — téléchargements et captures email
-- ───────────────────────────────────────────────────────────────────────
create table if not exists lead_magnet_requests (
  id         uuid default gen_random_uuid() primary key,
  email      text not null,
  magnet     text not null,                    -- guide-etf | checklist-fiscal | excel-budget | etc.
  user_id    uuid references profiles(id) on delete set null,
  page       text,                             -- page où la demande a été faite
  source     text,                             -- nudge_bar | downloads_page | downloads_direct
  created_at timestamptz default now()
);

-- Pas de RLS sur cette table — les non-connectés peuvent insérer
alter table lead_magnet_requests enable row level security;
create policy "Insert public"
  on lead_magnet_requests for insert with check (true);
create policy "Lecture admin uniquement"
  on lead_magnet_requests for select using (auth.uid() is not null);

-- ───────────────────────────────────────────────────────────────────────
-- 6. WATCHLIST — projets suivis dans le Radar
-- ───────────────────────────────────────────────────────────────────────
create table if not exists watchlist (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references profiles(id) on delete cascade not null,
  project_id uuid not null,
  created_at timestamptz default now(),
  unique (user_id, project_id)
);

alter table watchlist enable row level security;
create policy "Utilisateur gère sa watchlist"
  on watchlist for all using (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- 7. PROJECTS — feed projets Radar
-- ───────────────────────────────────────────────────────────────────────
create table if not exists projects (
  id               uuid default gen_random_uuid() primary key,
  name             text not null,
  platform         text,                       -- Raizers | Spreds | Look&Fin | etc.
  type             text,                       -- equity | crowdlending | immo
  verdict          text check (verdict in ('interessant','surveiller','insuffisant','trop_risque')),
  summary          text,
  url              text,
  min_invest       numeric,
  rate             numeric,                    -- taux annuel si crowdlending
  score_risque     integer check (score_risque between 1 and 10),
  score_conviction integer check (score_conviction between 1 and 10),
  score_liquidite  integer check (score_liquidite between 1 and 10),
  active           boolean default true,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- Lecture publique pour les membres Radar (gérée côté app)
alter table projects enable row level security;
create policy "Lecture authentifiée"
  on projects for select using (auth.uid() is not null);
create policy "Écriture admin"
  on projects for all using (auth.role() = 'service_role');


-- ───────────────────────────────────────────────────────────────────────
-- 8. ERROR_REPORTS — signalements d'erreurs de contenu
-- ───────────────────────────────────────────────────────────────────────
create table if not exists error_reports (
  id          uuid default gen_random_uuid() primary key,
  page        text not null,                   -- ex: "Guide ETF (/invest/etf.html)"
  description text not null,                  -- l'erreur décrite par l'utilisateur
  correction  text,                           -- correction suggérée
  source      text,                           -- lien ou référence
  email       text,                           -- email du signalant (optionnel)
  user_id     uuid references profiles(id) on delete set null,
  status      text default 'nouveau'
              check (status in ('nouveau','en_cours','corrige','refuse')),
  created_at  timestamptz default now()
);

-- Insert public (non-connectés peuvent signaler)
alter table error_reports enable row level security;
create policy "Insert public erreurs"
  on error_reports for insert with check (true);
create policy "Lecture admin erreurs"
  on error_reports for select using (auth.uid() is not null);

create index if not exists idx_error_reports_status on error_reports (status);
create index if not exists idx_error_reports_page   on error_reports (page);

-- ───────────────────────────────────────────────────────────────────────
-- INDEX pour les performances
-- ───────────────────────────────────────────────────────────────────────
create index if not exists idx_page_views_user    on page_views (user_id);
create index if not exists idx_page_views_slug    on page_views (page_slug);
create index if not exists idx_referrals_code     on referrals (code);
create index if not exists idx_conversions_ref    on referral_conversions (referrer_id);
create index if not exists idx_leadmagnet_email   on lead_magnet_requests (email);
create index if not exists idx_leadmagnet_magnet  on lead_magnet_requests (magnet);
create index if not exists idx_watchlist_user     on watchlist (user_id);
create index if not exists idx_projects_type      on projects (type);
create index if not exists idx_projects_verdict   on projects (verdict);

-- ═══════════════════════════════════════════════════════════════════════
-- FIN DU SCHEMA
-- Tables : profiles | page_views | referrals | referral_conversions |
--          lead_magnet_requests | watchlist | projects | error_reports
-- ═══════════════════════════════════════════════════════════════════════
