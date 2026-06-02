# ROADMAP WealthWaffle — État juin 2026

> **Format :** groupé par fichiers touchés · commande : “attaque le point N” ou “attaque le groupe X”
> **Règle :** barrer quand fait `- [x] ~~**N.**~~` · déplacer en ✅ Fait en bas · mettre à jour après chaque session

-----

## 🔴 GROUPE 0 — Mise en ligne (à faire manuellement)

- [x] ~**18a.** Supabase — 15 tables créées et actives~
- [x] ~**18b.** Stripe — 3 produits + 5 prix créés (live)~
- [x] ~**18c.** Edge Function `stripe-webhook` déployée~
- [ ] **18d.** Variables Cloudflare Pages → Settings → Environment variables :
  
  ```
  SUPABASE_URL           = https://klhhztxvgudefxmciwfz.supabase.co
  SUPABASE_ANON_KEY      = [Supabase → Settings → API → anon public]
  STRIPE_KEY             = [Stripe → Developers → API keys → Publishable key]
  STRIPE_SECRET_KEY      = [Stripe → Developers → API keys → Secret key]  ← Encrypt
  PRICE_PILOTE_MONTHLY   = price_1TdMWMBn70qxtmXd3YeHsxLM
  PRICE_PILOTE_ANNUAL    = price_1TdMWQBn70qxtmXdbzv5V6Vz
  PRICE_RADAR_MONTHLY    = price_1TdMWWBn70qxtmXdBk9pxfSa
  PRICE_RADAR_ANNUAL     = price_1TdMWaBn70qxtmXdIZgMN94o
  PRICE_RADAR_CREDIT     = price_1TdMWfBn70qxtmXdqXwABotQ
  BREVO_KEY              = [Brevo → Settings → API Keys]
  ```
- [ ] **18e.** Webhook Stripe → Stripe → Developers → Webhooks → Add endpoint :
  - URL : `https://klhhztxvgudefxmciwfz.supabase.co/functions/v1/stripe-webhook`
  - Événements : `checkout.session.completed` · `customer.subscription.deleted` · `invoice.payment_failed` · `invoice.upcoming` · `payment_intent.succeeded`
  - Secrets à ajouter dans Supabase → Edge Functions → stripe-webhook :
    
    ```
    STRIPE_WEBHOOK_SECRET     = whsec_...
    SUPABASE_SERVICE_ROLE_KEY = [Supabase → Settings → API → service_role]
    ```

-----

## 🟠 GROUPE A — `ww-bundle.js` + `ww-all.css` (fichiers communs — 1 commit)

> Faire ensemble — même fichiers, même commit

- [ ] **M4a.** Batch Python : supprimer “La gaufre, elle juge pas” dans tous les fichiers HTML
- [ ] **M4b.** Batch Python : supprimer “Sans carte bancaire” → remplacer par “7 jours gratuits, résiliation avant pour ne rien payer”
- [ ] **M4c.** Batch Python : passer tous les liens relatifs en absolus sur toutes les pages HTML
- [ ] **M4d.** Batch Python : migration images → renommer `IMG_5202.png` → `/img/waffy-logo.png` · `IMG_5208.png` → `/img/waffy-avatar.png` · corriger tous les liens dans les 107 fichiers concernés · créer dossier `/img/`
- [ ] **M5.** Système `data-ww` injection : `<span data-ww="clé"></span>` → injecté par `ww-bundle.js` · couvre IS 25%, PM 30%, franchise 10K€, Tax Shelter 45%, PLCI 8,17%…
- [ ] **14.** Nav ⚙️ — remplacer icône 🌙 par deux boutons séparés “Clair” / “Sombre” (même style que Débutant/Avancé)
- [ ] **67.** CSS `.cta-box-premium` dans `ww-all.css` — style unifié pour tous les encadrés premium/pilote/radar
- [ ] **68.** Système `data-ww-cta` dans `ww-bundle.js` — injection dynamique des textes CTA selon le plan actuel
- [ ] **88.** Matomo — snippet dans `ww-bundle.js` + anonymisation RGPD par défaut
- [ ] **89.** User ID Stitching — à l’inscription : `_paq.push(['setUserId', supabaseUserId])` + `matomoVisitorId` → `user_conversion_metrics`
- [ ] **90.** Capture UTM — lire `utm_source`, `utm_medium`, `utm_campaign` depuis URL → stocker dans `user_conversion_metrics`
- [ ] **92.** Modal RGPD cookies — `legal/cookies.html` · Matomo anonyme sans consentement · stitching si consentement OK

-----

## 🟠 GROUPE B — `data.js` uniquement

- [x] ~**84.** `lead_magnets` dans `data.js` — 8 guides, id/key/titre/emoji/file/url_cdn/autoroute/brevo_tag/theme~
- [x] ~**85.** `prix_fondateurs` dans `data.js` — pilote futur 149€, radar futur 299€, message “bloqué à vie” · NE PAS afficher encore sur le site~

-----

## 🟠 GROUPE C — Supabase + Stripe (connecteurs — 1 session)

- [ ] **M8.** Stripe trial 7j — activer `trial_period_days: 7` sur les 5 Price IDs existants dans le dashboard
- [ ] **16.** Stripe parrainage — webhook `invoice.upcoming` → `bonus_days_remaining > 0` → créer coupon one-time → reset à 0
- [ ] **39.** Stripe — produit crédit privé 9,99€ · webhook → incrémenter `credits_prives` + `credits_transactions`
- [ ] **93.** Supabase — colonne `billing_interval` dans `profiles` (déjà dans schema, à exécuter)
- [ ] **104.** Stripe — produit “Conformité Crypto” 49€/an récurrent · 5 rapports/mois max
- [ ] **105.** Supabase — table `exchange_rates` (taux journaliers EUR/crypto) + colonne `has_crypto_addon` dans profiles
- [ ] **106.** Edge Function `update-exchange-rates` — cron 1er janvier · appel CoinGecko taux moyen journalier année N-1

-----

-----

## 🟠 GROUPE I — Page d’accueil + système source unique (gros chantier)

> Dépend du Groupe B (data.js) — faire B d’abord

- [x] ~**I1.** `data.js` — `WW_DATA.pages` : 60 pages, 9 thèmes, emoji+titre+description+level~ : tableau structuré de toutes les pages avec `{url, emoji, titre, description, theme, level}` · source unique nav + footer + accueil + hubs
- [x] ~**I2.** `ww-bundle.js` + `footer.html` — `generateFooter()` lit `WW_DATA.pages`, `setActiveNav()` sur pathname complet, footer conteneur dynamique~
- [x] ~**I3.** Composant `data-ww-hub="theme"` dans ww-bundle.js · injecté dans invest/fiscal/budget/immo/index.html · grilles statiques supprimées~
- [x] ~**I4.** Onboarding 4 questions (profil, objectif, niveau, thème) — recommandations depuis WW_DATA.pages · tip Waffy · `WW_buildOnboarding` exposé pour réutilisation en I6~
- [x] ~**I5.** Modal “tu es au bon endroit ?” — après 8s · affiche emoji+titre de la page · [Oui je reste] [Non guidez-moi → ouvre onboarding] · fermeture auto 20s · 1x par session~
- [ ] **I6.** `index.html` — refonte page d’accueil :
  - Hero : slogan + 2 boutons [Je sais ↓] [Guidez-moi ↓] · Waffy Guide · pas de compteurs froids
  - Section A “Je sais” : barre recherche (réutiliser code existant) + sitemap visuelle 6 thèmes · 3 pages/thème + “Voir tout →” · mobile = accordéons
  - Section B “Guidez-moi” : réutiliser composant onboarding (I4) · même questionnaire, même logique
  - Section scroll : thèmes condensés pour non-cliqueurs (même data que A, présentation différente)
  - Hero copy : “Des outils interactifs pour calculer, pas juste lire” — jamais “58 pages”

## 🟡 GROUPE D — Pages HTML une par une (règle 11+12+15+77+78 sur chacune)

> Pour chaque page : CSS inline → ww-all.css · Waffy tips · graphiques animés · simulateurs inline · titre H1 conforme PAGE_NAMES.md
> Waffy : 1 seul par page · taille 80-140px · placement selon WAFFY_GUIDE.md · jamais dans texte dense

**Priorité 1 — pages phares**

- [ ] `invest/etf.html`
- [ ] `invest/allocation.html`
- [ ] `fiscal/independants.html`
- [ ] `immo/achat.html`
- [ ] `budget/epargne.html`

**Priorité 2 — pages nouvellement créées**

- [ ] `fiscal/declaration.html`
- [ ] `invest/sectoriels.html`
- [ ] `budget/assurances.html`
- [ ] `fiscal/crypto.html`
- [ ] `invest/crypto-plateformes.html`
- [ ] `outils/fiscal-crypto.html`

**Priorité 3 — reste des pages contenu**

- [ ] `budget/index.html`
- [ ] `budget/retraite.html`
- [ ] `budget/banques.html`
- [ ] `budget/rente.html`
- [ ] `invest/index.html`
- [ ] `invest/actions.html`
- [ ] `invest/obligations.html`
- [ ] `invest/fonds.html`
- [ ] `invest/equity.html`
- [ ] `invest/crypto.html`
- [ ] `invest/or.html`
- [ ] `invest/alternatives.html`
- [ ] `invest/comparateurs.html`
- [ ] `immo/index.html`
- [ ] `immo/financement.html`
- [ ] `immo/locatif.html`
- [ ] `immo/regions.html`
- [ ] `immo/alternatif.html`
- [ ] `immo/renovation.html`
- [ ] `fiscal/index.html`
- [ ] `fiscal/societes.html`
- [ ] `fiscal/management.html`
- [ ] `fiscal/remuneration.html`
- [ ] `fiscal/frais.html`
- [ ] `fiscal/tva.html`
- [ ] `fiscal/succession.html`
- [ ] `fiscal/assurances.html`
- [ ] `fiscal/fiscaliste.html`
- [ ] `parcours/index.html`
- [ ] `parcours/bases.html`
- [ ] `parcours/glossaire.html`
- [ ] `parcours/psychologie.html`
- [ ] `contenu/videos.html`
- [ ] `contenu/downloads.html`
- [ ] `a-propos/index.html`

-----

## 🟡 GROUPE E — Pages spéciales + fonctionnalités autonomes

**Pages à créer**

- [ ] **5.** `/sitemap.html` — liste toutes les pages avec liens · SEO
- [ ] **94.** `/immo/societe.html` — 🏢 Passer son immo en société · avantages IS vs PP · seuil de bascule · exit strategy
- [ ] **95.** `/fiscal/plus-value.html` — 📉 Limiter l’impôt sur ses gains · taux belge 10%/16,5%/33% · exonérations · stratégies

**Doctrine**

- [ ] **M3.** `doctrine.html` — ajouter bloc add-on Conformité Crypto 49€/an · vérifier WW_DATA.prix partout
- [ ] **7b.** Réponse “pourquoi payer si gratuit” — section dédiée avec exemples concrets
- [ ] **7c.** CTA concrets — “Calculer mon PLCI optimal” plutôt que “Commencer”
- [ ] **7d.** Tableau comparatif visuel Socle → Pilote → Radar clair
- [ ] **7e.** Mention Belgique dans les CTA

**Waffy — intégration sur le site**

- [ ] **W1.** Générer les 33 visuels Waffy via Grok (prompts dans `WAFFY_GUIDE.md`) → dossier `/img/waffy/`
- [ ] **W2.** Intégrer Waffy dans les 7 emplacements validés : `.waffy-tip` · résultats simulateurs · CTA fin de page · 404 · bloc débutant · onboarding · toasts email
- [ ] **W3.** CSS `.waffy-tip` finalisé dans `ww-all.css` avec les tailles (80/100/120/140/150/200px) et positions (inline-left, inline-right, centré)

**Outils**

- [ ] **M7.** `/outils/index.html` — résultat inline sous chaque outil + lien page associée (pas de results.html)
- [ ] **M9.** CTA calculateur crypto dans `invest/crypto.html` et `fiscal/crypto.html` à la section fiscalité
- [ ] **10.** Bouton “Marquer comme lu” bas de page → `page_views` Supabase si connecté · sinon modal inscription
- [ ] **71.** Guillomètre — questionnaire 5 questions → diagnostic “où tu perds de l’argent”
- [ ] **72.** Simulateur enveloppe — salaire + épargne mensuelle → matelas sécurité + investissement possible
- [ ] **73.** Simulateur Tax Shelter — impôt estimé + réduction selon montant investi
- [ ] **100.** `sitemap.xml` généré automatiquement — améliorer indexation Google

**Admin**

- [x] ~**34.** `/admin/index.html` — dashboard KPI + tunnels + Radar queue + logs~
- [ ] **34b.** `/admin/radar.html` — liste projets en attente · bouton “Lancer analyse IA” · champs éditables · Valider/Refuser
- [ ] **34c.** `/admin/erreurs.html` — liste `error_reports` par statut · bouton changer statut
- [ ] **34d.** `/admin/leads.html` — liste `lead_magnet_requests`
- [ ] **34e.** `/admin/users.html` — liste utilisateurs avec plan, stats
- [ ] **35.** `/dashboard/index.html` — crédits privés + historique soumissions + portefeuille si Pilote+
- [ ] **91.** `/admin/index.html` — encadré “Performances Marketing” Matomo+Brevo (à intégrer quand 88-90 faits)

-----

## 🔵 GROUPE F — Radar V2 (pages + backend)

**Pages**

- [ ] **30.** `/radar/index.html` — feed projets publics · cards verdict + score/79 · filtrables secteur/verdict
- [ ] **31.** `/radar/projet.html` — fiche récap sticky + 14 accordéons + TDM cliquable · contenu IA relu admin
- [ ] **32.** `/radar/soumettre.html` — formulaire soumission · anti-doublon · rate limiting · Stripe si privé
- [ ] **33.** `/radar/boussole.html` — saisie investissements passés + objectifs · graphiques diversification · simulateur impact

**Backend Radar**

- [ ] **36.** Edge Function `notify-admin` — email à chaque soumission avec profil soumetteur + lien admin
- [ ] **37.** Edge Function `analyze-project` — scraping (Jina+Firecrawl) · filtre Haiku · analyse Sonnet → JSON `rapport_ia`
- [ ] **38.** Edge Function `notify-user` — email à la publication
- [ ] **40.** Rate limiting — JS vérifie `submissions_today` / `submissions_week` avant soumission
- [ ] **41.** Anti-doublon — autocomplete URL/nom · si match → redirection vers analyse existante
- [ ] **55.** Cron scraping — quotidien · 50 plateformes equity · flag `is_new` si nouveau projet
- [ ] **56.** JSON `rapport_ia` — structure complète : fiche_recap · 14 critères · pre_mortem · épreuve_feu · simulation_sortie
- [ ] **57.** TDM cliquable `/radar/projet.html` — ancres accordéons · sticky sidebar desktop
- [ ] **58.** Cron reset compteurs — `submissions_today = 0` minuit · `submissions_week = 0` lundi 00h00
- [ ] **74.** Radar flouté — projets scrapés visibles pour tous (nom + plateforme) · verdict et score floutés → CTA Radar

-----

## 🟣 GROUPE G — Brevo + Lead magnets (1 session dédiée)

**Fichiers à créer**

- [ ] **47.** `budget-belge.xlsx` — tableau budget 50/30/20 prêt à l’emploi
- [ ] **48.** `guide-etf-belge.pdf` — 5 ETF à connaître + fiscalité 2026 + DCA
- [ ] **49.** `allocation-portefeuille.xlsx` — simulateur répartition selon profil et horizon
- [ ] **50.** `checklist-achat-immo.pdf` — étapes, documents, pièges, questions notaire
- [ ] **51.** `checklist-fiscale-2026.pdf` — déductions IPP par profil
- [ ] **52.** `guide-crypto-belge.pdf` — exchanges, fiscalité, déclaration BNB
- [ ] **53.** `guide-tax-shelter.pdf` — réduire l’impôt via startups belges
- [ ] **54.** `guide-or-belgique.pdf` — lingots, ETF or, fiscalité

**Flux livraison**

- [ ] **17.** Uploader les 8 fichiers sur Cloudflare · URLs dans `contenu/downloads.html`
- [ ] **65.** `contenu/downloads.html` + bandeau lead magnet — sans compte : email + opt-in → Brevo envoie PDF · avec compte : 1 clic → Brevo envoie · RGPD : opt-in décoché par défaut
- [ ] **81.** Route sans compte — modal email + opt-in → Brevo → “Email en route, crée ton compte…”
- [ ] **82.** Route avec compte — session Supabase détectée → envoi Brevo background → toast “✅ Email envoyé !”
- [ ] **83.** Brevo tags — `plan_socle/pilote/radar` + `autoroute_A/B/C` + `last_lead_id` · mise à jour si changement plan
- [ ] **86.** Brevo — 2 listes : `transactionnel` (sans consentement) et `newsletter` (opt-in explicite)

**Séquence emails onboarding**

- [ ] **19.** J+0 — confirmation inscription (immédiat)
- [ ] **20.** J+1 — bienvenue selon profil + “commence par là”
- [ ] **21.** J+3 — lead magnet selon `topic` choisi à l’inscription
- [ ] **22.** J+7 — “tu as lu X pages, voici la suite logique”
- [ ] **23.** J+14 — invitation Pilote si toujours Socle
- [ ] **24.** J+30 — récap mensuel de progression
- [ ] **25.** Relance inactif — J+7 sans connexion
- [ ] **26.** Notification correction erreur — “on a corrigé grâce à toi”
- [ ] **27.** Parrainage — filleul actif → récompense
- [ ] **28.** Rappel lead magnet non ouvert J+3
- [ ] **29.** Upsell Pilote → Radar après 30j

**Autoroutes Brevo**

- [ ] **79.** 3 autoroutes selon le lead magnet : A (budget) → Pilote · B (invest) → Pilote · C (fiscal) → Radar
- [ ] **80.** Séquence : J+0 transactionnel · J+2 coût inaction · J+5 pont Pilote · J+7 pont Radar

-----

## ⚪ GROUPE H — Fonctionnalités futures / nice-to-have

- [ ] **13.** Newsletter copilote — section dans `invest/` expliquant le concept en 7 étapes
- [ ] **69.** Intégrer `data-ww-cta` dans les 18 pages existantes (après point 68)
- [ ] **70.** Vérifier que chaque CTA ne mentionne pas une fonctionnalité absente du plan actuel
- [ ] **75.** `/a-propos/index.html` — retravailler en “Qui est derrière ce site ?” · story · valeurs · approche
- [ ] **76.** `doctrine.html` — ajouter 3 sections : “Le coût de l’inaction” · “Ce que font les 10% qui s’en sortent” · “Le chemin le plus court”

-----

## ✅ Fait

- ~**I5.** Modal contextuelle 8s — “Tu es au bon endroit ?” avec nom page depuis WW_DATA.pages · guidez-moi → WW_buildOnboarding()~
- ~**I4.** Onboarding 4 questions — profil/objectif/niveau/thème · recommandations WW_DATA.pages · tip Waffy · WW_buildOnboarding exposé~
- ~**I3.** `initHubComponents()` — composant hub dynamique depuis WW_DATA.pages, grilles statiques remplacées dans 4 hubs, CSS injecté, badge niveau pilote/radar~
- ~**I2.** `generateFooter()` depuis `WW_DATA.pages` · `setActiveNav()` corrigé pathname complet · `footer.html` → conteneur `#ww-footer-nav` dynamique~
- ~**I1.** `WW_DATA.pages` dans data.js — 60 pages, 9 thèmes (parcours/budget/invest/immo/fiscal/outils/contenu/programme/apropos), emoji+titre+description+level~
- ~**84.** `lead_magnets` dans `data.js` — 8 guides complets avec autoroute Brevo~
- ~**85.** `prix_fondateurs` dans `data.js` — stockés, non affichés~
- ~**3.** `fiscal/tax-shelter-startup.html` — réduction IPP 25-45%, plateformes, risques, CTA Radar~
- ~**4.** `fiscal/tax-shelter-audiovisuel.html` — exonération IS 310%, intermédiaires, comparatif~
- ~**8.** Glossaire — nav A-Z, compteur auto, termes Radar (via WW_TERMS)~
- ~**9.** Waffy — widget statique déguisé en dynamique, 20 catégories, pattern matching~
- ~**15.** CSS inline — règle permanente zéro CSS inline, tout dans ww-all.css~
- ~**34.** `/admin/index.html` — dashboard mobile-first, KPI, analytics, Radar queue, leads, erreurs, logs~
- ~**60.** Recherche enrichie avec WW_TERMS (fallback si search-index absent)~
- ~**61.** Traducteur jargon — +15 termes fiscaux belges + Radar/PE~
- ~**62.** Waffy widget — 20 catégories, délai simulé, chips suggestion~
- ~**63.** Autocomplétion unifiée — `data-ww-autocomplete` dans ww-bundle.js~
- ~**64.** Dictionnaire commun — `window.WW_TERMS` partagé recherche + autocomplétion~
- ~**66.** `fiscal/tax-shelter.html` — page désambiguïsation vers startup + audiovisuel~
- ~**77/78.** Règle permanente graphiques+Waffy tips sur chaque page créée/modifiée~
- ~**88-93 analytics.** `user_conversion_metrics` dans schema Supabase~
- ~**96.** `fiscal/declaration.html` — guide IPP, délais, codes, déductions, erreurs~
- ~**97.** `invest/sectoriels.html` — ETF thématiques, ISIN, TER, TOB, intégration~
- ~**98.** `budget/assurances.html` — quoi garder/couper, budgets par profil~
- ~**99.** `immo/renovation.html` — déjà existante~
- ~**101.** `invest/crypto-plateformes.html` — 11 exchanges + cold/hot wallets + checklist sécurité + MiCA~
- ~**102.** `fiscal/crypto.html` — 3 régimes + FIFO + step-up + franchise + MyMinfin + CTA~
- ~**103.** `outils/fiscal-crypto.html` — calculateur FIFO, drag-drop CSV, step-up CoinGecko, Excel~
- ~**M1.** Fixes JS : toggleMob, mode lecture supprimé, Waffy mobile, preview timing, back-to-top gauche~
- ~**M1.** `data.js` : WW_DATA.prix + WW_DATA.stats~
- ~**M1.** Preview mode cookie 7j : admin/radar/pilote/socle~
- ~**M1.** Toggles débutant/avancé par section refaits~
- ~**M2.** `nav.html` + `footer.html` : réécriture complète, liens absolus, emojis uniques, libellés bénéfice~
- ~**M2.** `PAGE_NAMES.md` : table officielle emoji + libellé + H1~