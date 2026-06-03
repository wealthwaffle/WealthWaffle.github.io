-- ═══════════════════════════════════════════════════════════════════════
-- WealthWaffle — Schéma complet Supabase
-- Projet : klhhztxvgudefxmciwfz
-- Généré : Juin 2026
-- Usage  : recréer la base depuis zéro si besoin
-- ═══════════════════════════════════════════════════════════════════════

-- Extensions requises
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : profiles
-- Profil utilisateur lié à auth.users (Supabase Auth)
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.profiles (
  id                  uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  prenom              text,
  nom                 text,
  email               text,
  plan                text        DEFAULT 'socle'
                                  CHECK (plan IN ('socle','pilote','radar')),
  level               text        DEFAULT 'debutant'
                                  CHECK (level IN ('debutant','avance')),
  profile             text        DEFAULT 'particulier'
                                  CHECK (profile IN ('particulier','independant','dirigeant')),
  topic               text        DEFAULT 'budget',
  stripe_id           text,                          -- Stripe customer ID (cus_xxx)
  trial_ends_at       timestamptz,                   -- fin du trial Stripe
  has_crypto_addon    boolean     NOT NULL DEFAULT false,
  credits_prives      integer     DEFAULT 0,         -- crédits Radar achetés
  capital_total       numeric     DEFAULT 0,         -- capital déclaré (Radar Boussole)
  montant_max_ticket  numeric     DEFAULT 0,
  pct_max_ticket      numeric     DEFAULT 0,
  secteurs_exclus     text[]      DEFAULT '{}',
  bonus_days_remaining integer    DEFAULT 0,         -- jours parrainage restants
  bonus_applied_until timestamptz,
  brevo_autoroute     text,                          -- 'A' | 'B' | 'C'
  last_lead_id        integer,                       -- dernier lead magnet téléchargé
  brevo_tags          text[],
  matomo_visitor_id   text,
  billing_interval    text        DEFAULT 'yearly'
                                  CHECK (billing_interval IN ('monthly','yearly')),
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_own" ON public.profiles
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : page_views
-- Suivi des pages vues par utilisateur connecté
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.page_views (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  page_slug   text        NOT NULL,
  viewed_at   timestamptz DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "page_views_own" ON public.page_views
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : referrals
-- Codes de parrainage générés par les utilisateurs
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.referrals (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  code        text        NOT NULL UNIQUE,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "referrals_own" ON public.referrals
  USING (auth.uid() = referrer_id);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : referral_conversions
-- Suivi des filleuls par code de parrainage
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.referral_conversions (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id     uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  filleul_id      uuid        REFERENCES public.profiles(id),
  filleul_email   text,
  filleul_prenom  text,
  filleul_plan    text,
  status          text        DEFAULT 'trial'
                              CHECK (status IN ('trial','active','cancelled','expired')),
  reward_type     text        CHECK (reward_type IN ('week','month')),
  rewarded        boolean     DEFAULT false,
  rewarded_at     timestamptz,
  created_at      timestamptz DEFAULT now()
);

ALTER TABLE public.referral_conversions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "referral_conversions_own" ON public.referral_conversions
  USING (auth.uid() = referrer_id);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : lead_magnet_requests
-- Demandes de téléchargement de guides PDF
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.lead_magnet_requests (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email           text        NOT NULL,
  magnet          text        NOT NULL,          -- clé du lead magnet (ex: 'guide-etf')
  user_id         uuid        REFERENCES public.profiles(id),
  page            text,
  source          text,
  newsletter_optin boolean    DEFAULT false,
  optin_date      timestamptz,
  created_at      timestamptz DEFAULT now()
);

ALTER TABLE public.lead_magnet_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lead_magnet_requests_insert" ON public.lead_magnet_requests
  FOR INSERT WITH CHECK (true);
CREATE POLICY "lead_magnet_requests_own" ON public.lead_magnet_requests
  FOR SELECT USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : watchlist
-- Projets suivis par un utilisateur Radar
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.watchlist (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id  uuid        NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "watchlist_own" ON public.watchlist
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : projects
-- Projets equity analysés par le Radar
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.projects (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name              text        NOT NULL,
  platform          text,
  type              text,
  verdict           text        CHECK (verdict IN ('interessant','surveiller','insuffisant','trop_risque')),
  summary           text,
  url               text,
  min_invest        numeric,
  rate              numeric,
  score_risque      integer     CHECK (score_risque BETWEEN 1 AND 10),
  score_conviction  integer     CHECK (score_conviction BETWEEN 1 AND 10),
  score_liquidite   integer     CHECK (score_liquidite BETWEEN 1 AND 10),
  active            boolean     DEFAULT true,
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_read" ON public.projects FOR SELECT USING (true);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : projects_submissions
-- Soumissions de projets par les utilisateurs Radar
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.projects_submissions (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_by        uuid        REFERENCES public.profiles(id),
  nom_entreprise      text        NOT NULL,
  url_plateforme      text,
  document_path       text,
  type_analyse        text        DEFAULT 'publique'
                                  CHECK (type_analyse IN ('publique','privee')),
  statut              text        DEFAULT 'en_attente_validation'
                                  CHECK (statut IN ('en_attente_validation','ia_en_cours',
                                    'en_attente_relecture','publie','publie_prive','refuse')),
  credits_debites     integer     DEFAULT 0,
  rapport_ia          jsonb,
  admin_notes         text,
  published_at        timestamptz,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

ALTER TABLE public.projects_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "submissions_own" ON public.projects_submissions
  USING (auth.uid() = submitted_by) WITH CHECK (auth.uid() = submitted_by);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : error_reports
-- Signalements d'erreurs sur les pages de contenu
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.error_reports (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  page        text        NOT NULL,
  description text        NOT NULL,
  correction  text,
  source      text,
  email       text,
  user_id     uuid        REFERENCES public.profiles(id),
  status      text        DEFAULT 'nouveau'
                          CHECK (status IN ('nouveau','en_cours','corrige','refuse')),
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.error_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "error_reports_insert" ON public.error_reports
  FOR INSERT WITH CHECK (true);
CREATE POLICY "error_reports_own" ON public.error_reports
  FOR SELECT USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : credits_transactions
-- Historique des achats de crédits Radar
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.credits_transactions (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount      integer     NOT NULL,
  reason      text,                              -- 'achat_stripe' | 'bonus_parrainage'
  stripe_pi   text,                              -- Stripe PaymentIntent ID
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.credits_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "credits_own" ON public.credits_transactions
  USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : user_investments
-- Investissements déclarés par l'utilisateur (Radar Boussole)
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.user_investments (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  entreprise_name   text        NOT NULL,
  amount_invested   numeric     NOT NULL DEFAULT 0,
  sector            text        NOT NULL,
  country           text        NOT NULL,
  investment_date   date,
  created_at        timestamptz DEFAULT now()
);

ALTER TABLE public.user_investments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_investments_own" ON public.user_investments
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : user_moderation_stats
-- Compteurs de soumissions pour rate limiting
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.user_moderation_stats (
  user_id           uuid        PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_submitted   integer     DEFAULT 0,
  public_accepted   integer     DEFAULT 0,
  private_accepted  integer     DEFAULT 0,
  total_rejected    integer     DEFAULT 0,
  last_submission   timestamptz,
  submissions_today integer     DEFAULT 0,
  submissions_week  integer     DEFAULT 0,
  updated_at        timestamptz DEFAULT now()
);

ALTER TABLE public.user_moderation_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "moderation_stats_own" ON public.user_moderation_stats
  USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : scraping_snapshots
-- Projets scrappés automatiquement depuis les plateformes equity
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.scraping_snapshots (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  platform      text        NOT NULL,
  platform_url  text        NOT NULL,
  project_name  text,
  project_url   text,
  raw_data      jsonb,
  is_new        boolean     DEFAULT true,
  scraping_date date        DEFAULT CURRENT_DATE,
  processed     boolean     DEFAULT false,
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE public.scraping_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "scraping_read_admin" ON public.scraping_snapshots
  FOR SELECT USING (true);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : user_conversion_metrics
-- Analytics de conversion (Matomo + UTM)
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.user_conversion_metrics (
  user_id                   uuid  PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  matomo_visitor_id         text,
  landing_page              text,
  conversion_page           text,
  total_pages_viewed_before integer DEFAULT 1,
  utm_source                text,
  utm_medium                text,
  utm_campaign              text,
  created_at                timestamptz DEFAULT now()
);

ALTER TABLE public.user_conversion_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "conversion_metrics_own" ON public.user_conversion_metrics
  USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : user_downloads
-- Téléchargements de lead magnets (avec ou sans compte)
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.user_downloads (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid        REFERENCES public.profiles(id),
  email             text,
  lead_magnet_id    integer     NOT NULL,
  lead_magnet_key   text        NOT NULL,
  autoroute         text        NOT NULL,          -- 'A' | 'B' | 'C'
  page_source       text,
  newsletter_optin  boolean     DEFAULT false,
  downloaded_at     timestamptz DEFAULT now()
);

ALTER TABLE public.user_downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_downloads_insert" ON public.user_downloads
  FOR INSERT WITH CHECK (true);
CREATE POLICY "user_downloads_own" ON public.user_downloads
  FOR SELECT USING (auth.uid() = user_id);

-- ───────────────────────────────────────────────────────────────────────
-- TABLE : exchange_rates
-- Taux EUR/crypto annuels pour calcul step-up fiscal (Conformité Crypto)
-- Alimentée par Edge Function update-exchange-rates chaque 1er janvier
-- ───────────────────────────────────────────────────────────────────────
CREATE TABLE public.exchange_rates (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol      text        NOT NULL,              -- 'BTC' | 'ETH' | 'SOL' ...
  year        integer     NOT NULL,              -- année fiscale (ex: 2024)
  rate_eur    numeric     NOT NULL,              -- taux moyen annuel en EUR
  source      text        NOT NULL DEFAULT 'coingecko',
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (symbol, year)
);

ALTER TABLE public.exchange_rates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "exchange_rates_read_all" ON public.exchange_rates
  FOR SELECT USING (true);

CREATE INDEX idx_exchange_rates_symbol_year ON public.exchange_rates (symbol, year);

-- Données initiales 2024 (approximatives — mises à jour par le cron)
INSERT INTO public.exchange_rates (symbol, year, rate_eur) VALUES
  ('BTC',  2024, 54000), ('ETH',  2024, 2900), ('SOL',  2024, 130),
  ('BNB',  2024, 400),   ('XRP',  2024, 0.55), ('ADA',  2024, 0.48),
  ('AVAX', 2024, 28),    ('DOT',  2024, 7),    ('MATIC',2024, 0.85),
  ('LINK', 2024, 12)
ON CONFLICT (symbol, year) DO NOTHING;

-- ───────────────────────────────────────────────────────────────────────
-- TRIGGER : updated_at automatique sur profiles
-- ───────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ───────────────────────────────────────────────────────────────────────
-- TRIGGER : créer un profil automatiquement à l'inscription
-- ───────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, prenom, nom)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'prenom',
    NEW.raw_user_meta_data->>'nom'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
