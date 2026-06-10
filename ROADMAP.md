# ROADMAP WealthWaffle — Juin 2026

> Groupé par priorité · “attaque le groupe X” ou “attaque le point N”

-----

## 🔴 GROUPE 0 — Mise en ligne (actions manuelles Jonathan)

- [ ] **0a.** Variables Cloudflare Pages → Settings → Environment variables :
  
  ```
  SUPABASE_URL           = https://klhhztxvgudefxmciwfz.supabase.co
  SUPABASE_ANON_KEY      = [Supabase → Settings → API → anon public]
  STRIPE_KEY             = [Stripe → Developers → API keys → Publishable key]
  STRIPE_SECRET_KEY      = [Stripe → Developers → API keys → Secret key]  ← Encrypt
  BREVO_KEY              = [Brevo → Settings → API Keys]
  ADMIN_SECRET           = ww-admin-2026
  ```
  - Price IDs Stripe après invocation de `create-stripe-products` (voir 0d)
- [ ] **0b.** Webhook Stripe → endpoint `https://klhhztxvgudefxmciwfz.supabase.co/functions/v1/stripe-webhook`
  - Events : `checkout.session.completed` · `customer.subscription.deleted` · `invoice.payment_failed` · `invoice.upcoming`
  - Secrets Supabase : `STRIPE_WEBHOOK_SECRET` · `SUPABASE_SERVICE_ROLE_KEY` · `STRIPE_SECRET_KEY`
- [ ] **0c.** Passer son propre compte en admin après inscription :
  
  ```sql
  UPDATE public.profiles SET plan = 'admin', is_admin = true WHERE email = 'TON@EMAIL.BE';
  ```
- [ ] **0d.** Créer les produits Stripe (one-shot) :
  - Ajouter `STRIPE_SECRET_KEY` dans Supabase → Edge Functions → Secrets
  - `curl -X POST https://klhhztxvgudefxmciwfz.supabase.co/functions/v1/create-stripe-products -H "x-admin-secret: ww-admin-2026"`
  - Copier les Price IDs retournés → Cloudflare + `data.js`
- [ ] **0e.** Générer les 33 images Waffy via Grok → `/img/waffy/`

-----

## 🟠 GROUPE B — Edge Functions (bloquantes pour le business)

- [x] ~~**EF1.** `create-checkout-session` — Stripe checkout trial 7j · 5 plans + addon crypto
- [x] ~~**EF2.** `create-portal-session` — Stripe billing portal (annulation, changement plan)
- [ ] **EF3.** `notify-admin` — email Brevo à chaque soumission Radar
- [ ] **EF4.** `analyze-project` — scraping Jina+Firecrawl → filtre Haiku → analyse Sonnet → JSON `rapport_ia`
- [ ] **EF5.** `notify-user` — email Brevo à la publication d’un projet Radar
- [ ] **EF6.** `analyze-portfolio` — calcul diversification geo/secteur/type → recommandations JSON → email Brevo
- [ ] **EF7.** `update-asset-prices` — cron quotidien · ETF/crypto/actions via APIs publiques

-----

## 🟠 GROUPE C — Compte & Abonnement (bloquant pour les paiements)

- [x] ~~**C1.** `compte/abonnement.html` — connecter EF1 + EF2 · afficher les 5 plans · toggle mensuel/annuel · addon crypto 49€/29€
- [ ] **C2.** `dashboard/index.html` — tester avec un vrai compte · valider flux complet inscription → dashboard

-----

## 🟡 GROUPE D — Waffy contextuel (après 0e — images générées)

- [ ] Parcours + Budget + Invest : `waffy-professeur` · `waffy-economiste` · `waffy-analyste` (~10 pages)
- [ ] Immo + Fiscal + Indépendants : `waffy-proprio` · `waffy-deducteur` · `waffy-freelance` (~10 pages)
- [ ] Sociétés + Crypto + Radar + Outils : `waffy-dirigeant` · `waffy-crypto` · `waffy-investisseur` (~10 pages)
- [ ] Pages spéciales : `404.html` · onboarding · doctrine · simulateurs résultats

-----

## 🟡 GROUPE E — Pages de contenu restantes

- [ ] **E1.** `/sitemap.html` — liste toutes les pages · SEO
- [ ] **E9.** `/invest/portefeuilles.html` — Mes portefeuilles · comparatif Bolero/Keytrade/Finary
- [ ] **E10.** `/invest/ia-finance.html` — Finance & IA · robo-advisors · Easyvest
- [ ] **E11.** `/invest/incubateurs.html` — Incubateurs & startups belges
- [ ] **E12.** `/invest/club-investissement.html` — Club d’investissement · comment créer
- [ ] **E13.** `/a-propos/partenaires.html` — Partenaires · Easyvest · Spreds · Finary
- [ ] **E14.** `/contenu/newsletter-archive.html` — Archives newsletter
- [ ] **E15.** `/parcours/aide.html` — Comment utiliser WealthWaffle

-----

## 🟡 GROUPE F — Outils & Simulateurs

- [ ] **F1.** Guillomètre — 5 questions → diagnostic “où tu perds de l’argent”
- [ ] **F2.** Simulateur enveloppe — salaire + épargne → matelas sécurité + capacité d’investissement
- [ ] **F3.** Simulateur Tax Shelter — impôt estimé + réduction selon montant et type
- [ ] **F4.** `sitemap.xml` — généré automatiquement
- [ ] **F5.** `window.ww_markAsRead()` en fin de chaque simulateur dans `tools.js`

-----

## 🟠 GROUPE A — Analytics & Matomo

- [ ] **88.** Matomo — configurer l’instance · `WW_MATOMO_URL` + `WW_MATOMO_SITE_ID` dans Cloudflare (snippet déjà dans `ww-bundle.js`)
- [ ] **91.** `/admin/index.html` — ajouter encadré “Performances Marketing” Matomo + Brevo (après 88)

-----

## 🔵 GROUPE L — Boussole (Pilote Auto + Radar Auto)

> Tables `portfolio_assets` + `boussole_analyses` déjà créées en Supabase.

**Phase 1 — MVP**

- [ ] **L1.** `/radar/boussole.html` — saisie actifs (ticker · quantité · prix d’achat · date) · valeur auto / manuelle equity privé
- [ ] **L2.** Import CSV DEGIRO / Trade Republic — parseur côté client JS
- [ ] **L3.** EF7 `update-asset-prices` — voir Groupe B
- [ ] **L4.** EF6 `analyze-portfolio` — voir Groupe B
- [ ] **L5.** Affichage analyse — graphiques diversification · score · recommandations

**Phase 2 — Radar Auto**

- [ ] **L6.** Suggestions equity personnalisées — croiser profil risque + Feed Radar
- [ ] **L7.** Email hebdomadaire Boussole + suggestions equity (Brevo)
- [ ] **L8.** Import automatique Bolero/Keytrade/Finary (CSV standardisé)

**Phase 3 — Post-agrément FSMA**

- [ ] **L9.** Agrément FSMA · L10. Dépôt fonds + ordres automatiques · L11. Reporting réglementaire

-----

## 🔵 GROUPE R — Radar V2

- [ ] **R1.** `/radar/soumettre.html` — formulaire soumission · anti-doublon · rate limiting
- [ ] **R3.** Cron scraping — 50 plateformes equity belges quotidiennement
- [ ] **R4.** JSON `rapport_ia` — 14 critères · pre_mortem · simulation_sortie
- [ ] **R5.** TDM cliquable `radar/projet.html` — accordéons · sticky sidebar
- [ ] **R6.** Radar flouté public — nom/plateforme visible · verdict flouté → CTA
- [ ] **R7.** Cron reset compteurs — submissions_today minuit · submissions_week lundi

-----

## 🟣 GROUPE G — Brevo + Lead magnets

**Fichiers à créer**

- [ ] **G1–G8.** 8 guides PDF/Excel : budget-belge.xlsx · guide-etf-belge.pdf · allocation-portefeuille.xlsx · checklist-achat-immo.pdf · checklist-fiscale-2026.pdf · guide-crypto-belge.pdf · guide-tax-shelter.pdf · guide-or-belgique.pdf
- [ ] **G9.** Uploader sur Cloudflare R2 · URLs dans `contenu/downloads.html`

**Flux livraison**

- [ ] **G10.** Sans compte → modal email + opt-in → Brevo envoie PDF
- [ ] **G11.** Avec compte → envoi background Brevo → toast “✅ Email envoyé !”
- [ ] **G12.** Brevo tags : plans + autoroutes + last_lead_id
- [ ] **G13.** Brevo 2 listes : transactionnel + newsletter · double opt-in RGPD

**Séquences onboarding**

- [ ] **G14–G20.** J+0 confirmation · J+1 bienvenue profil · J+3 lead magnet · J+7 suite logique · J+14 upsell Pilote · J+30 récap mensuel · relance inactif J+7
- [ ] **G21–G24.** Parrainage récompense · rappel lead J+3 · upsell Pilote→Radar 30j · upsell Auto 60j
- [ ] **G25–G26.** 3 autoroutes Brevo (A=budget/B=invest/C=fiscal) · séquence mode guidé

-----

## ⚪ GROUPE K — Vision long terme

- [ ] **K1.** Mode “Rails” — parcours guidé · barre progression · nudge compte + Pilote
- [ ] **K2.** IAwaffle V2 — 3 modes (guide / analyste / simulateur)
- [ ] **K3.** Multilangue FR · NL · DE · EN
- [ ] **K4.** API Bolero / Keytrade / Finary — import automatique portefeuille
- [ ] **K5.** API crypto — import trades · calcul fiscal · Koinly
- [ ] **K6.** Partenariat gestionnaire de fonds / banque belge
- [ ] **K7.** Plateforme equity directe — agrément FSMA
- [ ] **K8.** Incubateur startup WW
- [ ] **K9.** Odoo — back-office / CRM