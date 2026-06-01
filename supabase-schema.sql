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

-- ═══════════════════════════════════════════════════════════════════════
-- RADAR V2 — Nouvelles tables
-- ═══════════════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────────────
-- 9. USER_INVESTMENTS — Portefeuille personnel (Boussole)
-- ───────────────────────────────────────────────────────────────────────
create table if not exists user_investments (
  id              uuid default gen_random_uuid() primary key,
  user_id         uuid references profiles(id) on delete cascade not null,
  entreprise_name text not null,
  amount_invested numeric not null default 0,
  sector          text not null,   -- Immobilier | Énergie & Transition | Tech & Logiciels | Santé & Biotech | Consommation & Retail | Industrie | Autre
  country         text not null,   -- Belgique | France | Luxembourg | Pays-Bas | Autre Europe | Hors Europe
  investment_date date,
  created_at      timestamptz default now()
);

alter table user_investments enable row level security;
create policy "Utilisateur gère ses investissements"
  on user_investments for all using (auth.uid() = user_id);

create index if not exists idx_investments_user on user_investments (user_id);
create index if not exists idx_investments_sector on user_investments (sector);

-- ───────────────────────────────────────────────────────────────────────
-- 10. PROJECTS_SUBMISSIONS — Flux de soumission communautaire
-- ───────────────────────────────────────────────────────────────────────
create table if not exists projects_submissions (
  id              uuid default gen_random_uuid() primary key,
  submitted_by    uuid references profiles(id) on delete set null,
  nom_entreprise  text not null,
  url_plateforme  text,                    -- obligatoire pour flux public
  document_path   text,                   -- chemin PDF dans Supabase Storage (analyse privée)
  type_analyse    text default 'publique'
                  check (type_analyse in ('publique','avantage_48h','privee')),
  statut          text default 'en_attente_validation'
                  check (statut in (
                    'en_attente_validation',
                    'ia_en_cours',
                    'en_attente_relecture',
                    'publie',
                    'publie_prive',
                    'refuse'
                  )),
  credits_debites integer default 0,       -- 0 (public) | 1 (48h) | 2 (privé)
  rapport_ia      jsonb,                   -- {note, forces, faiblesses, risques, synthese, data_financieres}
  admin_notes     text,                    -- notes de relecture admin
  published_at    timestamptz,
  embargo_until   timestamptz,             -- pour avantage 48h
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table projects_submissions enable row level security;
create policy "Utilisateur voit ses soumissions"
  on projects_submissions for select using (auth.uid() = submitted_by);
create policy "Utilisateur insère ses soumissions"
  on projects_submissions for insert with check (auth.uid() = submitted_by);
create policy "Admin full access"
  on projects_submissions for all using (auth.role() = 'service_role');

-- Lecture publique des projets publiés
create policy "Lecture projets publiés"
  on projects_submissions for select using (
    statut = 'publie' and type_analyse != 'privee'
  );

create index if not exists idx_submissions_statut  on projects_submissions (statut);
create index if not exists idx_submissions_user    on projects_submissions (submitted_by);
create index if not exists idx_submissions_type    on projects_submissions (type_analyse);

-- ───────────────────────────────────────────────────────────────────────
-- 11. USER_MODERATION_STATS — Anti-guignol
-- ───────────────────────────────────────────────────────────────────────
create table if not exists user_moderation_stats (
  user_id          uuid primary key references profiles(id) on delete cascade,
  total_submitted  integer default 0,
  public_accepted  integer default 0,
  private_accepted integer default 0,
  total_rejected   integer default 0,
  last_submission  timestamptz,            -- pour le rate limiting
  submissions_today    integer default 0, -- reset quotidien
  submissions_week     integer default 0, -- reset hebdomadaire
  updated_at       timestamptz default now()
);

alter table user_moderation_stats enable row level security;
create policy "Utilisateur voit ses stats"
  on user_moderation_stats for select using (auth.uid() = user_id);
create policy "Système met à jour les stats"
  on user_moderation_stats for all using (auth.role() = 'service_role');

create index if not exists idx_modstats_user on user_moderation_stats (user_id);

-- ───────────────────────────────────────────────────────────────────────
-- 12. CREDITS_TRANSACTIONS — Historique des achats de crédits
-- ───────────────────────────────────────────────────────────────────────
create table if not exists credits_transactions (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references profiles(id) on delete cascade not null,
  amount      integer not null,            -- +N (achat) ou -N (consommation)
  reason      text,                        -- 'achat_stripe' | 'analyse_privee' | 'analyse_48h'
  stripe_pi   text,                        -- Stripe Payment Intent ID
  created_at  timestamptz default now()
);

alter table credits_transactions enable row level security;
create policy "Utilisateur voit ses transactions"
  on credits_transactions for select using (auth.uid() = user_id);
create policy "Système insère les transactions"
  on credits_transactions for insert with check (auth.uid() = user_id or auth.role() = 'service_role');

create index if not exists idx_credits_user on credits_transactions (user_id);

-- ───────────────────────────────────────────────────────────────────────
-- Colonnes à ajouter dans profiles pour Radar V2
-- ───────────────────────────────────────────────────────────────────────
alter table profiles add column if not exists credits_prives     integer default 0;
alter table profiles add column if not exists capital_total      numeric default 0;
alter table profiles add column if not exists montant_max_ticket numeric default 0;
alter table profiles add column if not exists pct_max_ticket     numeric default 0;
alter table profiles add column if not exists secteurs_exclus    text[] default '{}';
alter table profiles add column if not exists bonus_days_remaining integer default 0;
alter table profiles add column if not exists bonus_applied_until  timestamptz;

-- INDEX supplémentaires
create index if not exists idx_user_investments_user   on user_investments (user_id);
create index if not exists idx_credits_transactions_user on credits_transactions (user_id);

-- ───────────────────────────────────────────────────────────────────────
-- AJOUTS V2 — Décisions Radar juin 2026
-- ───────────────────────────────────────────────────────────────────────

-- Rate limiting : reset quotidien et hebdomadaire via cron job Supabase
-- Cron : "0 0 * * *" → reset submissions_today = 0
-- Cron : "0 0 * * 1" → reset submissions_week = 0

-- Scraping : table pour tracker les snapshots quotidiens des plateformes
create table if not exists scraping_snapshots (
  id              uuid default gen_random_uuid() primary key,
  platform        text not null,               -- 'spreds' | 'raizers' | 'ecco-nova' | etc.
  platform_url    text not null,
  project_name    text,
  project_url     text,
  raw_data        jsonb,                        -- données brutes extraites
  is_new          boolean default true,         -- nouveau par rapport à la veille
  scraping_date   date default current_date,
  processed       boolean default false,        -- soumis à analyse IA ?
  created_at      timestamptz default now()
);

alter table scraping_snapshots enable row level security;
create policy "Admin lecture snapshots"
  on scraping_snapshots for all using (auth.role() = 'service_role');

create index if not exists idx_snapshots_date     on scraping_snapshots (scraping_date);
create index if not exists idx_snapshots_platform on scraping_snapshots (platform);
create index if not exists idx_snapshots_new      on scraping_snapshots (is_new) where is_new = true;

-- rapport_ia structure JSON attendue (documentation) :
-- {
--   "fiche_recap":        { score_classique, base, score_pct, score_hors_ts, delta_ts, moat_tier, verdict, ticket, cout_reel, downside_protection, roic_projete, top3_forces, top3_risques, pre_mortem, acquéreurs, question_critique },
--   "etape0":             { mode, instrument, cercle_competence, power_law, pourquoi_crowdfunding, kill_switches_declenches, anti_portfolio },
--   "criteres": [
--     { id, nom, score, max, sous_criteres: [...], commentaire }   -- 14 critères
--   ],
--   "modules_optionnels": { deeptech, d2c, dnvb, impact, geo },
--   "pre_mortem":         { angle_mort, fast_follower, capital_starvation, optionnalite, antagoniste },
--   "epreuve_feu":        [ 7 vérifications ],
--   "simulation_sortie":  { conservateur, base, optimiste },
--   "ticket_conclusion":  { ticket, cout_reel, downside_pct, breakeven_pct, roic, moat_tier, multiple_cible, acquéreurs, question_critique },
--   "meta":               { score_confiance, donnees_manquantes, criteres_exclusion, plateforme, tax_shelter_taux, devise }
-- }

-- Ajout colonne newsletter_optin sur lead_magnet_requests (RGPD — consentement explicite)
alter table lead_magnet_requests add column if not exists newsletter_optin boolean default false;
alter table lead_magnet_requests add column if not exists optin_date timestamptz;

-- ───────────────────────────────────────────────────────────────────────
-- 14. USER_DOWNLOADS — historique téléchargements lead magnets
-- ───────────────────────────────────────────────────────────────────────
create table if not exists user_downloads (
  id              uuid default gen_random_uuid() primary key,
  user_id         uuid references profiles(id) on delete cascade,
  email           text,                        -- si pas de compte
  lead_magnet_id  integer not null,            -- 47 à 54
  lead_magnet_key text not null,               -- 'budget' | 'etf' | 'allocation' | etc.
  autoroute       text not null,               -- 'fondations' | 'invest' | 'fiscalite'
  page_source     text,                        -- ex: 'fiscal/tax-shelter'
  newsletter_optin boolean default false,
  downloaded_at   timestamptz default now()
);

alter table user_downloads enable row level security;
create policy "Utilisateur voit ses téléchargements"
  on user_downloads for select using (auth.uid() = user_id);
create policy "Insert public téléchargements"
  on user_downloads for insert with check (true);

create index if not exists idx_downloads_user   on user_downloads (user_id);
create index if not exists idx_downloads_magnet on user_downloads (lead_magnet_id);
create index if not exists idx_downloads_route  on user_downloads (autoroute);

-- Colonnes supplémentaires dans profiles pour Brevo
alter table profiles add column if not exists brevo_autoroute text;   -- 'fondations' | 'invest' | 'fiscalite'
alter table profiles add column if not exists last_lead_id    integer;
alter table profiles add column if not exists brevo_tags      text[];

-- ───────────────────────────────────────────────────────────────────────
-- 15. USER_CONVERSION_METRICS — analytics & attribution marketing
-- ───────────────────────────────────────────────────────────────────────
create table if not exists user_conversion_metrics (
  user_id                     uuid primary key references profiles(id) on delete cascade,
  matomo_visitor_id           text,
  landing_page                text,          -- première page vue
  conversion_page             text,          -- page où l'inscription a eu lieu
  total_pages_viewed_before   integer default 1,
  utm_source                  text,          -- 'brevo' | 'tiktok' | 'instagram' | etc.
  utm_medium                  text,          -- 'email' | 'social' | 'direct'
  utm_campaign                text,          -- ex: 'autoroute_fiscalite_j7'
  created_at                  timestamptz default now()
);

alter table user_conversion_metrics enable row level security;
create policy "Admin lecture conversion metrics"
  on user_conversion_metrics for all using (auth.role() = 'service_role');

create index if not exists idx_conv_page     on user_conversion_metrics (conversion_page);
create index if not exists idx_conv_campaign on user_conversion_metrics (utm_campaign);

-- Colonne matomo_visitor_id dans profiles (lien Matomo ↔ Supabase)
alter table profiles add column if not exists matomo_visitor_id text;
alter table profiles add column if not exists billing_interval text default 'yearly' check (billing_interval in ('monthly','yearly'));

-- ───────────────────────────────────────────────────────────────────────
-- 16. CRYPTO_REPORTS — résumés fiscaux crypto (sauvegarde volontaire)
-- ───────────────────────────────────────────────────────────────────────
create table if not exists crypto_reports (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references profiles(id) on delete cascade not null,
  fiscal_year integer not null,
  net_gain    numeric,
  taxable_gain numeric,
  summary     jsonb,
  created_at  timestamptz default now(),
  unique (user_id, fiscal_year)
);
alter table crypto_reports enable row level security;
create policy "Utilisateur gère ses rapports crypto"
  on crypto_reports for all using (auth.uid() = user_id);

-- Colonnes add-on dans profiles
alter table profiles add column if not exists has_crypto_addon boolean default false;
alter table profiles add column if not exists crypto_reports_this_month integer default 0;
alter table profiles add column if not exists crypto_reports_reset_at timestamptz;
