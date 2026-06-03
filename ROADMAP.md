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

- [x] ~**M4a.** “La gaufre, elle juge pas” supprimée — 2 fichiers (404.html, affiliation.html)~
- [x] ~**M4b.** “Sans carte bancaire” → “Accès complet · 7 jours gratuits” — 7 fichiers~
- [x] ~**M4c.** Liens relatifs → absolus dans les pages sous-dossiers (mapping 35 patterns)~
- [ ] **M4d-prep.** ⚠️ TON JOB (Jonathan) : générer les 33 images via Grok (prompts dans WAFFY_GUIDE.md) → les déposer dans `/img/waffy/` · renommer IMG_5202.png → `/img/waffy-logo.png` et IMG_5208.png → `/img/waffy-avatar.png`
  
  Checklist images à générer :
  - [ ] `waffy-logo.png` (renommer IMG_5202)
  - [ ] `waffy-avatar.png` (renommer IMG_5208)
  - [ ] `waffy-professeur.png` · `waffy-accueil.png`
  - [ ] `waffy-economiste.png` · `waffy-banquier.png`
  - [ ] `waffy-analyste.png` · `waffy-graphiste.png`
  - [ ] `waffy-collectionneur.png` · `waffy-sommelier.png`
  - [ ] `waffy-proprio.png` · `waffy-locatif.png` · `waffy-renovateur.png`
  - [ ] `waffy-deducteur.png` · `waffy-declarant.png`
  - [ ] `waffy-freelance.png` · `waffy-tva.png`
  - [ ] `waffy-dirigeant.png` · `waffy-holding.png`
  - [ ] `waffy-crypto.png` · `waffy-securite.png`
  - [ ] `waffy-investisseur.png` · `waffy-radar.png`
  - [ ] `waffy-zen.png` · `waffy-rente.png`
  - [ ] `waffy-calculateur.png` · `waffy-resultat.png`
  - [ ] `waffy-guide.png` · `waffy-pilote.png`
  - [ ] `waffy-oups.png` · `waffy-bienvenue.png`
  - [ ] `waffy-inquiet.png` · `waffy-celebration.png`
  - [ ] `waffy-email.png` · `waffy-debutant.png`
- [x] ~**M4d-liens.** IMG_5202→/img/waffy-logo.png · IMG_5208→/img/waffy-avatar.png — 103 fichiers~
- [ ] **M4d-pages-1.** MON JOB : placer les images Waffy dans les pages parcours + budget + invest (Waffy-professeur, Waffy-economiste, Waffy-analyste) · 1 par page · 7 emplacements validés (voir WAFFY_GUIDE.md) · ~10 pages
- [ ] **M4d-pages-2.** MON JOB : placer les images Waffy dans les pages immo + fiscal + indépendants (Waffy-proprio, Waffy-deducteur, Waffy-freelance) · ~10 pages
- [ ] **M4d-pages-3.** MON JOB : placer les images Waffy dans les pages sociétés + crypto + radar + outils (Waffy-dirigeant, Waffy-crypto, Waffy-investisseur, Waffy-calculateur) · ~10 pages
- [ ] **M4d-pages-4.** MON JOB : placer Waffy dans les pages spéciales — 404, onboarding, résultats simulateurs, doctrine, index.html (Waffy-oups, Waffy-guide, Waffy-bienvenue, Waffy-celebration, Waffy-inquiet)
- [x] ~**M5.** Système `data-ww` injection — déjà complet (3 modes : data-ww, data-ww-tpl, data-ww-calc + formateurs eur/pct/num/txt)~ : `<span data-ww="clé"></span>` → injecté par `ww-bundle.js` · couvre IS 25%, PM 30%, franchise 10K€, Tax Shelter 45%, PLCI 8,17%…
- [x] ~**14.** Deux boutons thème Clair/Sombre dans nav desktop + mobile · `applyTheme(t)` + `ww-theme-active` CSS~ (même style que Débutant/Avancé)
- [x] ~**67.** CSS `.ww-cta-box` + variantes `.cta-box-pilote/radar/socle` dans `ww-all.css`~ — style unifié pour tous les encadrés premium/pilote/radar
- [x] ~**68.** `initCTASystem()` — `data-ww-cta="pilote|radar|socle"` · masqué si plan suffisant · texte dynamique depuis WW_DATA.prix~ — injection dynamique des textes CTA selon le plan actuel
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

- [x] ~**M8.** Stripe trial 7j — `subscription_data.trial_period_days:7` à passer au moment du checkout session (pas sur le Price) · logique dans la page doctrine.html~
- [x] ~**16.** Parrainage webhook `invoice.upcoming` → coupon Stripe proportionnel (7j × tarif/jour) · `customer.subscription.updated` → reset bonus~ → `bonus_days_remaining > 0` → créer coupon one-time → reset à 0
- [x] ~**39.** Crédit Radar géré dans `checkout.session.completed` mode payment~ · webhook → incrémenter `credits_prives` + `credits_transactions`
- [x] ~**93.** `billing_interval` déjà présent dans profiles (vérifié)~ (déjà dans schema, à exécuter)
- [x] ~**104.** Produit Conformité Crypto créé : `prod_UdK80Tj6nphtWT` · Price ID : `price_1Te3U0Bn70qxtmXd9FUrlqMZ` (49€/an)~
- [x] ~**105.** Table `exchange_rates` + colonne `has_crypto_addon` dans profiles · 10 taux 2024 seedés~ (taux journaliers EUR/crypto) + colonne `has_crypto_addon` dans profiles
- [x] ~**106.** Edge Function `update-exchange-rates` déployée — CoinGecko 15 coins, upsert par symbol+year~ — cron 1er janvier · appel CoinGecko taux moyen journalier année N-1

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

- [x] ~`invest/etf.html` — sections complètes, graphique DCA animé, simulateur DCA inline, Waffy analyste, data-ww-cta pilote, liens absolus~
- [x] ~`invest/allocation.html` — section #classes ajoutée, graphique barres 3 profils animé, Waffy graphiste, data-ww-cta pilote, CSS → ww-all.css, simulateur FIRE opérationnel~
- [x] ~`fiscal/independants.html` — nav orpheline supprimée, zéro CSS inline, kpi-grid, compare-2col PP/SRL, waffy-freelance PLCI, graphique barres PP vs SRL animé, simulateurPLCI, statuts spéciaux compare-2col, data-ww-cta pilote~
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

- [x] ~**M3.** `doctrine.html` — bloc add-on Conformité Crypto 49€/an · WW_DATA.prix via data.js · “sans carte bancaire” supprimé~
- [x] ~**7b.** Section “Pourquoi payer” réécrite avec exemples concrets (PLCI, locatif net, salaire vs dividendes)~
- [x] ~**7c.** CTA concrets dans la value prop + bouton “Accès complet · 7 jours gratuits” sur Pilote et Radar~
- [x] ~**7d.** Tableau comparatif Socle/Pilote/Radar ajouté avec add-on Crypto~
- [x] ~**7e.** 🇧🇪 mentionné dans chips hero, notes plans, proof chips~

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
- [x] ~**76.** 3 sections ajoutées : coût inaction (chiffres 10K€), les 10% (4 comportements), chemin le plus court (4 étapes)~

-----

-----

## 🟡 GROUPE J — Nouvelles pages de contenu (backlog futur)

> Pages à créer quand le contenu de base est stabilisé

**Indépendants & Sociétés**

- [ ] **J1.** `/fiscal/aides-independants.html` — 🆘 Aides & subsides indépendants · ASBL, CPAS, Wallonie Entreprendre, aides sociales · cotisations minimales · éviter de payer trop plus tard
- [ ] **J2.** `/fiscal/aides-societes.html` — 🏗️ Aides & subsides pour sociétés · Activa, aides régionales, déductions d’investissement
- [ ] **J3.** `/fiscal/couts-creation.html` — 💶 Coûts réels de création · comptable · notaire · fiscaliste · création société SRL/SA · comparatif prestataires
- [ ] **J4.** `/fiscal/investir-independant-societe.html` — ⚖️ Investir en tant qu’indépendant vs en société · quel compte, quelle fiscalité, quelle stratégie
- [ ] **J5.** `/parcours/entreprendre.html` — 🚀 Entreprendre en Belgique · Actya · Wallonie Entreprendre · Partena · UCM · étapes de création

**Immobilier**

- [ ] **J6.** `/immo/subsides.html` — 🏘️ Prêts à 0% et subsides · Prêt Vert wallon · PIVERT · RENoWatt · Myprime · primes PAE · par région

**Investissement & Patrimoine**

- [ ] **J7.** `/invest/portefeuilles.html` — 🗂️ Mes portefeuilles · créer plusieurs portefeuilles · export/import · lien plateformes belges (Bolero, Keytrade, Finary)
- [ ] **J8.** `/invest/ia-finance.html` — 🤖 Finance & IA · outils IA pour gérer ses finances · robo-advisors · limites réglementaires · Easyvest · Spreds
- [ ] **J9.** `/invest/incubateurs.html` — 🌱 Incubateurs & startups · LeanSquare · Chèque-Entreprise · Wex · Blast · Spreds · Wallons-y
- [ ] **J10.** `/invest/club-investissement.html` — 🤝 Club d’investissement · investissement collectif · cadre légal belge · Blast · Spreds

**Partenariats & Outils tiers**

- [ ] **J11.** `/a-propos/partenaires.html` — 🤝 Partenaires · fiscalistes · comptables · Easyvest · Spreds · Finary · banques partenaires · qu’est-ce qu’ils m’apportent
- [ ] **J12.** `/contenu/newsletter-archive.html` — 📬 Archives newsletter · contenu newsletter intégré dans une page du site

**RGPD**

- [ ] **J13.** Audit RGPD newsletter — double opt-in · consentement explicite · désinscription 1 clic · archivage · Brevo conforme · formulaires

-----

## ⚪ GROUPE K — Fonctionnalités avancées (vision long terme)

**Guidage interactif**

- [ ] **K1a.** Mode “Rails” — parcours guidé personnalisé :
  - Après le quiz guidage (I4/I6) → générer un parcours de 5 pages dans l’ordre logique selon profil+objectif depuis WW_DATA.pages
  - Barre de progression persistante sous la nav : [Étape 1 ✓] → [Étape 2 ✓] → [Étape 3 →] → … · stockée en localStorage
  - Bouton “Étape suivante →” en bas de chaque page de parcours
  - Tout en localStorage au départ, bascule Supabase à l’inscription
- [ ] **K1b.** Conversion douce mode guidé → compte + Pilote :
  - Après étape 2/5 → nudge léger : “Sauvegarde ta progression — crée ton compte gratuit” (pas de modal, juste un bandeau en bas)
  - Après étape 3/5 → si pas connecté → mini-modal : “Tu veux continuer ? Ton parcours s’arrête ici sans compte.” → [Créer mon compte gratuit] [Continuer quand même]
  - Après étape 5/5 (fin du parcours) → page de félicitations + CTA Pilote : “Tu as posé les bases. Passe à Pilote pour aller plus loin — Accès complet · 7 jours gratuits” → bouton vers doctrine.html#pilote
  - Logique : guidé = client Pilote idéal. Il a prouvé sa motivation en suivant 5 étapes. Le trial 7j à ce moment-là c’est la conversion naturelle.
  - Le CTA Pilote ne mentionne jamais de prix avant la fin du parcours — d’abord la valeur, ensuite l’offre
- [ ] **K2.** `/parcours/aide.html` — 🧭 Comment utiliser le site · mode interactif · répondre à des questions → trouver ce qu’on cherche · guide pas à pas

**Portefeuille guidé**

- [ ] **K3.** Portefeuille guidé automatique (si réglementairement possible) · achat ETF programmé · seuils de retrait définis · opportunités sur pics · partenaire gestionnaire de fonds

**IA & Automatisation**

- [ ] **K4.** IAwaffle — accompagnement IA en 3 modes : débutant · avancé · expert · intégré à Waffy ou module séparé
- [ ] **K5.** Odoo — évaluer si utile pour gestion back-office / CRM / comptabilité interne WW
- [ ] **K6.** Gestion de portefeuille liée aux plateformes belges (API Bolero, Keytrade, Finary)
- [ ] **K7.** API crypto — gestion du problème API · import automatique trades · calcul fiscal automatique

**Multilangue**

- [ ] **K8.** Barre de menu multilangue : FR · NL · DE · EN · architecture i18n à définir

**Partenariats commerciaux**

- [ ] **K9.** Partenariat gestionnaire de fonds / banque · définir ce qu’ils apportent (rendement, légitimité, distribution)
- [ ] **K10.** Plateforme equity directe — WealthWaffle comme intermédiaire de levées de fonds · cadre légal FSMA · Wallons-y · Walterre
- [ ] **K11.** Incubateur startup WW — programme d’accompagnement · partenaires · modèle de revenus

-----

## ✅ Fait

- ~`fiscal/independants.html` — refonte complète Groupe D~
- ~`invest/etf.html` + `invest/allocation.html` — zéro CSS inline · classes génériques ww-all.css (kpi-grid, sim-input, sim-result, chart-container, steps-list, waffy-tip, profil-grid, compare-2col, eyebrow-*, source-pill-active-*, txt-*, dot-*)~
- ~`invest/allocation.html` — refonte complète Groupe D~
- ~`invest/etf.html` — refonte complète Groupe D~
- ~**M4a** gaufre supprimée · **M4b** sans carte→7j gratuits · **M4c** liens relatifs→absolus · **M4d-liens** IMG_52xx→/img/waffy~

### ✅ DOCTRINE — Complet

- ~**M3** add-on Crypto · **7b** pourquoi payer · **7c** CTAs concrets · **7d** tableau comparatif · **7e** 🇧🇪 mentions · **76** 3 nouvelles sections~

### ✅ GROUPE C — Complet

- ~**M8.** Trial 7j → `subscription_data.trial_period_days:7` au checkout~
- ~**16.** Coupon parrainage Stripe dans `invoice.upcoming`~
- ~**39.** Crédit Radar géré dans checkout mode payment~
- ~**93.** `billing_interval` déjà présent~
- ~**104.** Produit Conformité Crypto `prod_UdK80Tj6nphtWT` · `price_1Te3U0Bn70qxtmXd9FUrlqMZ`~
- ~**105.** Table `exchange_rates` + `has_crypto_addon` + 10 taux 2024~
- ~**106.** Edge Function `update-exchange-rates` active~

### ✅ GROUPE I — Complet

- ~**I1.** `WW_DATA.pages` dans data.js — 60 pages, 9 thèmes~
- ~**I2.** `generateFooter()` + `setActiveNav()` pathname complet~
- ~**I3.** `initHubComponents()` — `data-ww-hub` dans 4 hubs~
- ~**I4.** Onboarding 4 questions — profil/objectif/niveau/thème~
- ~**I5.** Modal contextuelle “tu es au bon endroit ?” — 8s~
- ~**I6.** `index.html` — 4 sections, grilles dynamiques, quiz inline~
- ~**M5.** Moteur data-ww déjà complet — 3 modes, formateurs fr-BE~
- ~**14.** Boutons thème Clair/Sombre nav · applyTheme() · ww-theme-active~
- ~**67.** CSS ww-cta-box + variantes pilote/radar/socle~
- ~**68.** initCTASystem() — data-ww-cta, masquage selon plan, texte dynamique~
- ~**I6.** `index.html` refonte complète — 4 sections, grilles dynamiques WW_DATA.pages, quiz inline, CSS dans la page (à migrer en M6)~
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

-----

## 📋 SUIVI LIVRAISON — Fichiers sortis en version finale

> Un fichier est “livré” uniquement quand il a été présenté via present_files APRÈS toutes les actions roadmap appliquées.
> Zéro CSS inline · Zéro éléments en dur · Classes ww-all.css uniquement

### ✅ Livrés (version finale confirmée)

- `invest/etf.html` — zéro style= · classes ww-all.css · toutes sections · simulateur DCA · graphique canvas · waffy-analyste
- `invest/allocation.html` — zéro style= · classes ww-all.css · graphique 3 profils · waffy-graphiste · simulateur FIRE
- `fiscal/independants.html` — zéro style= · classes ww-all.css · compare-2col · waffy-freelance · graphique PP vs SRL · simulateur PLCI
- `doctrine.html` — M3+7b+7c+7d+7e+76 appliqués · waffy-guide · prix via WW_DATA
- `index.html` — I6 refonte complète · quiz inline · grilles dynamiques WW_DATA.pages
- `assets/ww-all.css` — classes génériques (kpi-grid, sim-*, chart-*, steps-*, waffy-tip, profil-grid, compare-2col, dot-*, eyebrow-*, source-pill-active-*, txt-*)
- `assets/ww-bundle.js` — I2+I3+I4+I5 · generateFooter · initHubComponents · onboarding · modal contextuelle · applyTheme · initCTASystem · generateFooter
- `assets/nav.html` — 2 boutons thème Clair/Sombre
- `assets/footer.html` — conteneur dynamique #ww-footer-nav
- `assets/data.js` — WW_DATA.pages 60 pages · prix · prix fondateurs · crypto_addon_price_id
- `ROADMAP.md` — à jour
- `WAFFY_GUIDE.md` — tableau placement 33 images validé
- `DATABASE.sql` — schéma complet 16 tables
- `STRIPE_REFERENCE.md` — référence complète

### ⏳ Pages traitées mais PAS encore livrées en version finale

> Ces fichiers ont eu des modifications batch (M4a/b/c/d) mais n’ont PAS encore reçu le traitement complet Groupe D (zéro CSS inline, Waffy, graphiques, simulateurs)

- `budget/epargne.html` — batch M4 fait · Groupe D PAS fait
- `budget/banques.html` — batch M4 fait · Groupe D PAS fait
- `budget/retraite.html` — batch M4 fait · Groupe D PAS fait
- `budget/rente.html` — batch M4 fait · Groupe D PAS fait
- `budget/assurances.html` — batch M4 fait · Groupe D PAS fait
- `budget/index.html` — data-ww-hub injecté · Groupe D PAS fait
- `fiscal/declaration.html` — batch M4 fait · Groupe D PAS fait
- `fiscal/societes.html` — batch M4 fait · Groupe D PAS fait
- `fiscal/frais.html` — batch M4 fait · Groupe D PAS fait
- `fiscal/tva.html` — batch M4 fait · Groupe D PAS fait
- `fiscal/succession.html` — batch M4 fait · Groupe D PAS fait
- `fiscal/management.html` — batch M4 fait · Groupe D PAS fait
- `fiscal/remuneration.html` — batch M4 fait · Groupe D PAS fait
- `fiscal/crypto.html` — batch M4 fait · Groupe D PAS fait
- `fiscal/index.html` — data-ww-hub injecté · Groupe D PAS fait
- `immo/achat.html` — batch M4 fait · Groupe D PAS fait (prochain)
- `immo/locatif.html` — batch M4 fait · Groupe D PAS fait
- `immo/renovation.html` — batch M4 fait · Groupe D PAS fait
- `immo/financement.html` — batch M4 fait · Groupe D PAS fait
- `immo/regions.html` — batch M4 fait · Groupe D PAS fait
- `immo/alternatif.html` — batch M4 fait · Groupe D PAS fait
- `immo/index.html` — data-ww-hub injecté · Groupe D PAS fait
- `invest/actions.html` — batch M4 fait · Groupe D PAS fait
- `invest/obligations.html` — batch M4 fait · Groupe D PAS fait
- `invest/fonds.html` — batch M4 fait · Groupe D PAS fait
- `invest/crypto.html` — batch M4 fait · prix en dur · Groupe D PAS fait
- `invest/equity.html` — batch M4 fait · Groupe D PAS fait
- `invest/or.html` — batch M4 fait · Groupe D PAS fait
- `invest/alternatives.html` — batch M4 fait · Groupe D PAS fait
- `invest/panorama.html` — batch M4 fait · Groupe D PAS fait
- `invest/comparateurs.html` — batch M4 fait · prix en dur · Groupe D PAS fait
- `invest/index.html` — data-ww-hub injecté · Groupe D PAS fait
- `parcours/bases.html` — batch M4 fait · Groupe D PAS fait
- `parcours/glossaire.html` — batch M4 fait · Groupe D PAS fait
- `parcours/psychologie.html` — batch M4 fait · Groupe D PAS fait
- `outils/index.html` — batch M4 fait · prix en dur · Groupe D PAS fait (M7)
- `radar/index.html` — batch M4 fait · data.js manquant · Groupe D PAS fait
- `radar/watchlist.html` — batch M4 fait · Groupe D PAS fait
- `contenu/downloads.html` — batch M4 fait · Groupe D PAS fait
- `contenu/newsletter.html` — batch M4 fait · Groupe D PAS fait
- `contenu/videos.html` — batch M4 fait · Groupe D PAS fait
- `contenu/concept-semaine.html` — batch M4 fait · Groupe D PAS fait
- `a-propos/affiliation.html` — batch M4 fait · Groupe D PAS fait
- `a-propos/faq.html` — batch M4 fait · tools.js manquant · Groupe D PAS fait
- `a-propos/index.html` — batch M4 fait · Groupe D PAS fait
- `a-propos/sources.html` — batch M4 fait · Groupe D PAS fait
- `compte/inscription.html` — batch M4 fait · Groupe D PAS fait
- `compte/connexion.html` — batch M4 fait · Groupe D PAS fait
- `compte/callback.html` — batch M4 fait · Groupe D PAS fait
- `compte/parrainage.html` — batch M4 fait · Groupe D PAS fait
- `compte/mot-de-passe.html` — batch M4 fait · Groupe D PAS fait
- `dashboard/index.html` — batch M4 fait · prix en dur · data.js manquant · Groupe D PAS fait
- `404.html` — batch M4 fait · Groupe D PAS fait
- `legal/cgu.html` — batch M4 fait · Groupe D PAS fait
- `legal/privacy.html` — batch M4 fait · Groupe D PAS fait
- `legal/cookies.html` — batch M4 fait · Groupe D PAS fait

### 🔧 À corriger en batch AVANT Groupe D (à faire maintenant)

- [x] ~**BATCH-1** : progress-bar + back-to-top → injectés par ww-bundle.js (injectPageChrome) · retirés de 33/55/60 fichiers · padding-top dans ww-all.css .page~
- [x] ~**BATCH-2** : data.js ajouté dans 10 fichiers manquants~
- [x] ~**BATCH-3** : tools.js ajouté dans a-propos/faq.html~