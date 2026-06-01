# ROADMAP.md — WealthWaffle

*Commande : “attaque le point N”. Barrer quand fait, déplacer en ✅ Fait.*

-----

## 🔴 Critique — mise en ligne

- [ ] **18.** Env vars Cloudflare (SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_KEY, 6 Price IDs, BREVO_KEY) · exécuter `supabase-schema.sql` · configurer webhook Stripe

-----

## 🟠 Court terme — site principal

**Pages à créer**

- [ ] **3.** `/fiscal/tax-shelter-startup.html` — Tax Shelter startups pour particuliers · lié à `equity.html` · chaque page mentionne l’autre en 1 phrase avec lien · suit la structure des pages fiscales existantes (débutant/avancé, toc-sidebar, disclaimer)
- [ ] **4.** `/fiscal/tax-shelter-audiovisuel.html` — Tax Shelter audiovisuel pour entreprises · idem structure · lien vers point 3
- [ ] **5.** `/sitemap.html` — liste toutes les pages du site avec liens · utile SEO
- [ ] **6.** `/outils/result.html` — page résultat générique après calcul simulateur : résultat personnalisé + explication + liens “pour aller plus loin” + autres simulateurs en bas

**Contenu & UX**

- [x] ~**7.** `/doctrine.html` — one-pager terminé~ · Points restants à améliorer :
  - [ ] **7b.** Réponse explicite “pourquoi payer si le site est gratuit” — section dédiée avec exemples concrets
  - [ ] **7c.** CTA concrets — dire ce qu’on gagne (“Calculer mon PLCI optimal” plutôt que “Commencer”)
  - [ ] **7d.** Saut de valeur Socle→Pilote→Radar — tableau comparatif visuel clair
  - [ ] **7e.** Mention Belgique dans les CTA (“Fait pour les Belges” · “Fiscalité belge réelle” · etc.)
- [ ] **7-old.** — retravailler design et texte de conversion · toggle mensuel/annuel existant à garder · 3 cartes Socle/Pilote/Radar · CTA “Commencer gratuit”
- [ ] **8.** `/parcours/glossaire.html` — ajouter nav A-Z cliquable (ancres), compteur automatique du nombre de termes, unifier le design (premiers éléments bien designés, suite incohérente), ajouter termes du Radar (GP, ROIC, Moat, etc.)
- [ ] **9.** Waffy chatbot — widget sur toutes les pages · pose une question → réponse succincte + orientation vers la bonne page · utilise l’API Claude · déjà présent sur `index.html` comme référence
- [ ] **10.** Bouton “Marquer comme lu” en bas de chaque page contenu → si connecté : enregistre dans `page_views` Supabase · si non connecté : modal invite à créer un compte
- [ ] **11.** Intégrer simulateurs dans les pages adéquates : `t_credit` → `immo/financement.html` · `t_fire` → `budget/rente.html` · `t_plci` → `fiscal/independants.html` · `t_isvipp` → `fiscal/societes.html` · `t_vvpr` → `fiscal/societes.html` · `t_resliq` → `fiscal/societes.html` · `t_pension` → `budget/retraite.html` · `t_locatif` → `immo/locatif.html`
- [ ] **12.** Affichage progressif — les sections révèlent au scroll (`.reveal` existe déjà dans `ww-all.css`) · réduire le nombre de sections visibles immédiatement à l’arrivée · l’objectif est que la page ne “fasse pas peur” au premier coup d’œil
- [ ] **13.** Newsletter copilote — intégrer dans `invest/` une section expliquant le concept en 7 étapes (contenu à fournir par Jonathan)
- [ ] **65.** `/contenu/downloads.html` + bandeau lead magnet — refonte flux de livraison :
  - **Sans compte** : champ email + case opt-in newsletter (décochée par défaut) → Brevo envoie le PDF/Excel + confirmation → enregistrement `lead_magnet_requests` Supabase
  - **Avec compte** : bouton “Recevoir” (email prérempli depuis profil, modifiable) → même flux Brevo → pas de téléchargement direct
  - **RGPD** : case opt-in décochée par défaut · libellé exact : *“Je souhaite recevoir les actualités WealthWaffle — conseils pratiques, nouveaux guides et outils. Désinscription en un clic à tout moment.”*
  - **Brevo** : si opt-in coché → ajouter contact à la liste newsletter + déclencher séquence J+1 · si décoché → email transactionnel uniquement (livraison du document)
  - **Champ `lead_magnet_requests`** : ajouter colonne `newsletter_optin boolean default false`
  - Appliquer ce flux sur : bandeau sous-nav · `/contenu/downloads.html` · toute modal lead magnet du site

**Tech**

- [ ] **14.** Nav — bouton thème : remplacer l’icône 🌙 par deux boutons séparés “Clair” / “Sombre” · même style visuel que les boutons Débutant/Avancé dans le drawer ⚙️
- [ ] **15.** CSS inline résiduel — zéro CSS inline dans toute modification future · migrer l’existant au fil des retouches uniquement (pas de migration en bloc)
- [ ] **16.** Stripe + parrainage — webhook `invoice.upcoming` → si `bonus_days_remaining > 0` dans `profiles` → créer coupon Stripe one-time → remettre `bonus_days_remaining` à 0
- [ ] **17.** Uploader les 8 fichiers lead magnets sur Cloudflare quand créés · URLs à mettre dans `contenu/downloads.html`

**Lead magnets — fichiers à créer**

- [ ] **47.** `budget-belge.xlsx` — tableau budget/épargne/investissement prêt à l’emploi
- [ ] **48.** `guide-etf-belge.pdf` — les 5 ETF à connaître + fiscalité 2026 + DCA
- [ ] **49.** `allocation-portefeuille.xlsx` — simulateur répartition selon profil et horizon
- [ ] **50.** `checklist-achat-immo.pdf` — étapes, documents, pièges, questions notaire
- [ ] **51.** `checklist-fiscale-2026.pdf` — toutes les déductions IPP par profil (salarié/indépendant/dirigeant)
- [ ] **52.** `guide-crypto-belge.pdf` — wallets, exchanges, fiscalité belge 2026, déclaration BNB
- [ ] **53.** `guide-tax-shelter.pdf` — réduire l’impôt de 45% via startups belges
- [ ] **54.** `guide-or-belgique.pdf` — lingots, pièces, ETF or, TVA 0%, fiscalité 2026

**Emails Brevo — séquence à rédiger**

- [ ] **19.** J+0 — confirmation inscription (immédiat)
- [ ] **20.** J+1 — bienvenue selon profil (particulier/indépendant/dirigeant) + “commence par là”
- [ ] **21.** J+3 — lead magnet contextuel selon `topic` choisi à l’inscription
- [ ] **22.** J+7 — “tu as lu X pages, voici la suite logique”
- [ ] **23.** J+14 — invitation Pilote si toujours Socle
- [ ] **24.** J+30 — récap mensuel de progression
- [ ] **25.** Relance inactif — J+7 sans connexion
- [ ] **26.** Notification correction erreur — “on a corrigé grâce à toi”
- [ ] **27.** Parrainage — filleul actif → “ton ami a souscrit, voici ta récompense”
- [ ] **28.** Rappel lead magnet non ouvert J+3
- [ ] **29.** Upsell Pilote → Radar pour membres Pilote actifs depuis 30j

-----

## 🔵 Moyen terme — Radar V2

**Pages**

- [ ] **30.** `/radar/index.html` — feed projets publics publiés · cards avec : nom, plateforme, secteur, verdict (🟢/🟡/🔴/❌), score/79, Moat Tier, ticket recommandé · filtrables par secteur/verdict
- [ ] **31.** `/radar/projet.html` — fiche récap sticky en haut (toujours visible) + 14 volets accordéon fermés par défaut (un par chapitre de `radar_analyse.md`) + table des matières cliquable · contenu généré par l’IA et relu par admin
- [ ] **32.** `/radar/soumettre.html` — formulaire : nom entreprise + URL plateforme + type (public gratuit / privé 9,99€) · anti-doublon autocomplete · rate limiting 2/jour 4/semaine public · paiement Stripe si privé
- [ ] **33.** `/radar/boussole.html` — accessible Pilote + Radar · l’utilisateur saisit ses investissements passés (nom, montant, secteur, pays, date) + objectifs (capital total, max par ticket, secteurs exclus) · graphiques diversification sectorielle + géographique · simulateur : “si j’investis X€ dans ce projet, voici l’impact sur ma diversification” · 100% mathématique, zéro conseil subjectif
- [x] ~**34.** `/admin/index.html`~ — dashboard mobile-first · auth : vérification `session.user.user_metadata.role === 'admin'` au chargement · redirection `/compte/connexion.html` si non admin · 4 sections :
  - KPI financiers : nb Socle / Pilote / Radar + MRR estimé (mensuel/annuel selon `billing_interval`)
  - Performances tunnels : top 5 pages de conversion + top campagnes Brevo (depuis `user_conversion_metrics`)
  - File d’attente Radar : projets `status = 'en_attente_relecture'` · bouton ✔ → publié · bouton ✖ → refusé · animation disparition ligne sans reload
  - Logs erreurs système : erreurs JS + webhooks Stripe + scripts scraping affichés en bas
  - Chargement en parallèle (`Promise.all`) pour performance mobile · `billing_interval` dans `profiles`
- [ ] **34b.** `/admin/radar.html` — liste projets `en_attente_relecture` · bouton “Lancer analyse IA” · champs éditables pour corriger le rapport IA · boutons “Valider et publier” / “Refuser”
- [ ] **34c.** `/admin/erreurs.html` — liste `error_reports` par statut (nouveau/en_cours/corrigé/refusé) · bouton changer statut
- [ ] **34d.** `/admin/leads.html` — liste `lead_magnet_requests` avec email, magnet, page source, date
- [ ] **34e.** `/admin/users.html` — liste utilisateurs avec plan, date inscription, stats soumissions
- [ ] **35.** `/dashboard/index.html` — ajouter section : solde crédits privés + bouton acheter · historique soumissions + statuts · portefeuille (investments) si Pilote+

**Backend**

- [ ] **36.** Edge Function `notify-admin` — déclenchée à chaque soumission · email à `radar@wealthwaffle.be` avec : nom projet, type (public/privé), profil soumetteur (nom, date inscription, plan, ratio_sérieux depuis `user_moderation_stats`) · lien vers `/admin/radar.html`
- [ ] **37.** Edge Function `analyze-project` — déclenchée manuellement par admin · scraping URL (Jina Reader en primaire, Firecrawl si JS-heavy) ou lecture PDF uploadé · filtre anti-spam Claude Haiku 4.5 (“est-ce un vrai projet equity ?”) · si OK → analyse complète Claude Sonnet 4.5 avec prompt `radar_analyse.md` → stockage JSON exhaustif dans `rapport_ia` · statut → `en_attente_relecture`
- [ ] **38.** Edge Function `notify-user` — déclenchée à la publication · email à l’utilisateur : “votre analyse est disponible” + lien projet
- [ ] **39.** Stripe — product “crédit privé” à 9,99€ · webhook `payment_intent.succeeded` → incrémenter `credits_prives` dans `profiles` + enregistrer dans `credits_transactions`
- [ ] **40.** Rate limiting — JS vérifie `user_moderation_stats.submissions_today` et `submissions_week` avant soumission · bouton désactivé si limite atteinte avec message + date de réinitialisation
- [ ] **41.** Anti-doublon — autocomplete sur le champ nom/URL lors de la soumission · requête Supabase `projects_submissions` · si match > 90% → redirection vers l’analyse existante · sinon → bouton “lancer l’analyse”
- [ ] **55.** Cron scraping — quotidien · 50 plateformes equity (Spreds, Raizers, Ecco Nova, Lita, Crowdcube, Republic, Eyevestor, Bolero, Look&Fin…) · détection nouveaux projets vs `scraping_snapshots` de la veille · flag `is_new = true` si nouveau
- [ ] **56.** JSON `rapport_ia` — structure exhaustive calée sur `radar_analyse.md` : fiche_recap · etape0 · criteres[14] · modules_optionnels · pre_mortem · epreuve_feu[7] · simulation_sortie · ticket_conclusion · meta
- [ ] **57.** Table des matières cliquable sur `/radar/projet.html` — ancres vers chaque volet accordéon · sticky sidebar sur desktop
- [ ] **58.** Cron reset compteurs — `submissions_today = 0` à minuit · `submissions_week = 0` le lundi 00h00

-----

## 🟡 Long terme — fonctionnalités transversales

- [ ] **60.** Autocomplétion recherche — suggestions temps réel depuis `search-index.js` + projets Radar Supabase
- [ ] **61.** Traducteur jargon — corriger bug résiduel · enrichir dictionnaire avec termes PE/Radar (GP, ROIC, Burn Multiple, NRR, CAC, LTV, Moat, TRL, EBITDA, CAC, Runway…)
- [ ] **62.** Waffy chatbot — API Claude · répond à une question en langage naturel · propose 1-2 pages pertinentes · widget discret en bas à droite
- [ ] **63.** Autocomplétion unifiée — même source de données pour recherche + traducteur + Waffy + champ soumission Radar
- [ ] **64.** Dictionnaire commun — fichier unique partagé (glossaire + search-index + termes Radar)
- [ ] **66.** `/fiscal/tax-shelter.html` — scinder en deux (points 3 et 4) et remplacer par redirections

-----

## 💡 Idées futures

Affiliations trackées (Trade Republic, DEGIRO, Bolero, Keytrade) · TikTok/YouTube ads · Newsletter premium · Formations · Merch 🧇

-----

## ✅ Fait

- ~`/admin/index.html` — dashboard mobile-first (KPI, analytics, Radar queue, leads, erreurs, logs)~
- ~1-2. Bugs simulateurs (IDs tirets→underscores, ordre scripts) — confirmé OK en prod~
- ~Mode débutant/avancé — avancé montre les deux blocs, débutant a toggle local par section~
- ~Signalement erreur — modal structurée + Supabase `error_reports` + Brevo~
- ~Variable preview URL `?ww_preview=radar|pilote|socle`~
- ~4 simulateurs fiscaux pro — PLCI, IS vs IPP, VVPRbis, Réserve liquidation~
- ~Nav restructurée — 3 menus thématiques + Programme Doctrine + ⚙️~
- ~Bandeau lead magnet contextuel sous nav (9 magnets selon page, dès la 1ère visite)~
- ~Centre téléchargement `/contenu/downloads.html`~
- ~Page `/invest/or.html` — guide complet or belge~
- ~`/invest/alternatives.html` restructuré — or/ETF sect./equity → renvois~
- ~Supabase schema — 13 tables~
- ~`doctrine.html` — landing Doctrine avec toggle mensuel/annuel~
- ~Dashboard — profil + préférences (niveau, topic, profil)~
- ~`/compte/parrainage.html` — code unique, 4 boutons partage, tableau filleuls~
- ~`/contenu/concept-semaine.html` — 52 concepts calés sur calendrier fiscal~
- ~`/invest/etf.html` — section ETF sectoriels ajoutée (mode avancé)~
- ~`/immo/renovation.html` — primes 2026 par région, TVA 6%, 9 subtilités~
- ~`/immo/financement.html` — section levier hypothécaire 2ème bien~
- ~`/budget/banques.html` — comparatif 7 banques + 4 néobanques + 6 brokers~
- ~`/parcours/psychologie.html` — section actifs anti-fragiles~
- ~`/invest/alternatives.html` — coopératives par région (Investcoop, ConcertES, Winwinlening)~
- ~`/budget/retraite.html` — section pension 2050 (3 scénarios)~
- ~`/invest/crypto.html` — 11 cryptos en accordéons, 4 catégories~

-----

## 📝 Notes techniques

- **GSAP vs JS vanille** : `IntersectionObserver` + transitions CSS suffisent pour tous les reveals au scroll. GSAP uniquement si animations séquencées complexes (mot par mot, parallaxe fin). Ne pas importer GSAP pour des reveals simples.

-----

## 🟠 Conversion & CTA contextuels

- [ ] **67.** CSS `.cta-box-premium` dans `ww-all.css` — style unifié pour tous les CTA de conversion (fond bleu nuit, accent cyan/rose, bordure terracotta)
- [ ] **68.** Système `data-ww-cta` dans `ww-bundle.js` — injection dynamique des textes CTA selon l’attribut `data-ww-cta="pilote-etf"` etc. · 18 variantes · lien vers `/doctrine.html?plan=xxx`
- [ ] **69.** Intégrer `data-ww-cta` dans les 18 pages existantes (voir détail ci-dessous)
  - `budget/index.html` + `budget/epargne.html` → `pilote-budget`
  - `budget/banques.html` → `pilote-banques`
  - `budget/retraite.html` → `pilote-retraite`
  - `invest/etf.html` + `invest/comparateurs.html` → `pilote-boussole` (aperçu flouté Boussole)
  - `invest/equity.html` → `radar-equity` (3 derniers projets flouté — dépend Radar V2)
  - `invest/crypto.html` → `pilote-crypto`
  - `invest/actions.html` → `pilote-actions`
  - `invest/fonds.html` → `pilote-fonds`
  - `invest/obligations.html` → `pilote-obligations`
  - `invest/alternatives.html` + `immo/alternatif.html` → `radar-immo-alternatif`
  - `immo/achat.html` → `pilote-immo-achat`
  - `immo/financement.html` + `immo/locatif.html` → `pilote-immo-locatif`
  - `fiscal/tax-shelter.html` → `radar-taxshelter`
  - `fiscal/societes.html` + `fiscal/independants.html` → `radar-societes`
  - `fiscal/remuneration.html` → `radar-remuneration`
  - `fiscal/frais.html` → `radar-frais`
  - `fiscal/succession.html` → `pilote-succession`
  - `parcours/psychologie.html` → `pilote-psychologie`
- [ ] **70.** Vérifier que chaque CTA ne mentionne pas une fonctionnalité absente de la page cible · si absent → ajouter dans roadmap
- [ ] **71.** Guillomètre — questionnaire 5 questions → diagnostic factuel “où tu perds de l’argent” + pages Socle à lire en priorité · outil interactif dans `tools.js` · placé sur `parcours/index.html` et `index.html`
- [ ] **72.** Simulateur enveloppe — salaire + épargne mensuelle → matelas de sécurité idéal + montant investissable sans risque · dans `tools.js` · placé sur `budget/epargne.html`
- [ ] **73.** Simulateur Tax Shelter — impôt estimé ou salaire brut (+ précompte professionnel optionnel) → montant investissable Tax Shelter optimal selon taux 25/30/45% · dans `tools.js` · placé sur `fiscal/tax-shelter.html` et `fiscal/independants.html`
- [ ] **74.** Radar flouté — liste projets scrapés visible pour tous (nom + plateforme) · note + résumé IA + rapport = flouté + cadenas · CTA “Débloquer” → `/doctrine.html?plan=radar` · pas de trial Radar — accès découverte permanent limité
- [ ] **75.** Page `/a-propos/index.html` — retravailler en “Qui est derrière ce site” · philosophie BRAND.md · pourquoi pas d’influenceur · pourquoi Waffy · fait par un Belge pour les Belges · pas pour en vivre
- [ ] **76.** Argumentaire doctrine.html — ajouter 3 sections : “Le coût de l’inaction” (calcul inflation vs 99€) · “Indépendance totale” (zéro commission plateforme) · “Le gain de temps” (50 pages → 5 min)
- [ ] **77.** Graphiques et animations par page — rendre le contenu plus dynamique · voir détail ROADMAP
- [ ] **78.** Encadrés Waffy — vulgarisation visuelle des concepts complexes · composant `.waffy-tip` dans `ui-components.html` · injecter sur les pages à fort jargon

-----

## 📊 Graphiques & animations par page (point 77)

- [ ] **77a.** `invest/etf.html` — graphique performance ETF monde vs inflation belge (Chart.js, données statiques)
- [ ] **77b.** `invest/allocation.html` — donut chart répartition portefeuille type (interactif selon profil)
- [ ] **77c.** `invest/crypto.html` — timeline prix BTC/ETH stylisée + zones fiscales belges annotées
- [ ] **77d.** `budget/retraite.html` — graphique capital accumulé selon taux d’épargne (3 courbes : banque / ETF / inaction)
- [ ] **77e.** `fiscal/tax-shelter.html` — barre d’économie fiscale selon taux d’imposition (animée au scroll)
- [ ] **77f.** `immo/financement.html` — graphique remboursement crédit mensuel vs capital restant dû
- [ ] **77g.** `invest/obligations.html` — comparatif rendement bon d’État vs ETF obligations (barres)
- [ ] **77h.** `parcours/glossaire.html` — animation révélation définition au clic (déjà accordéon — améliorer l’effet)
- [ ] **77i.** `index.html` — compteur animé (ex: “X projets analysés · X termes au glossaire · X outils disponibles”)

-----

## 📧 Emails & tunnels de conversion

- [ ] **79.** Brevo — 3 autoroutes de conversion selon le lead magnet téléchargé :
  - **Autoroute A “Fondations”** (budget-belge.xlsx · allocation-portefeuille.xlsx) → cible Pilote
  - **Autoroute B “Investissement”** (guide-etf · checklist-immo · guide-crypto · guide-or) → cible Pilote
  - **Autoroute C “Fiscalité”** (checklist-fiscale · guide-tax-shelter) → cible Radar
  - Priorité : C > B > A — si l’utilisateur télécharge un magnet de priorité supérieure, il bascule dans la séquence supérieure et quitte la séquence inférieure
  - Livraisons J+0 toujours transactionnelles (indépendantes de la séquence active)
- [ ] **80.** Brevo — séquence onboarding complète par autoroute :
  - J+0 : livraison fichier (transactionnel) · objet exact selon tableau ci-dessous
  - J+2 : coût de l’inaction (compte d’épargne belge à 1% vs inflation)
  - J+5 : pont vers Pilote (automatisation ETF + La Boussole)
  - J+7 : pont vers Radar (Tax Shelter + analyse indépendante)
  - Si passage au plan payant en cours de séquence → arrêt immédiat de la séquence gratuite
  - Objets emails :
    - budget-belge.xlsx → “📊 Ton tableur budget 50/30/20 est prêt”
    - guide-etf-belge.pdf → “📈 Les 5 ETF et la fiscalité belge 2026”
    - allocation-portefeuille.xlsx → “🎛️ Ton simulateur d’allocation patrimoniale”
    - checklist-achat-immo.pdf → “🏢 Achat immo en Belgique : la checklist anti-pièges”
    - checklist-fiscale-2026.pdf → “📜 IPP 2026 : Le guide des déductions fiscales”
    - guide-crypto-belge.pdf → “🪙 Crypto & Fisc : Déclaration BNB et règles 2026”
    - guide-tax-shelter.pdf → “📉 Investir dans les startups belges (Tax Shelter)”
    - guide-or-belgique.pdf → “👑 Investir dans l’or en Belgique : Règles & Fiscalité”
- [ ] **81.** Route téléchargement sans compte — modal email + prénom + opt-in newsletter (décoché par défaut) → Brevo envoie fichier → message “C’est en route ! Pendant que le mail arrive, crée ton compte…” → email contient CTA “Activer mon compte gratuit”
- [ ] **82.** Route téléchargement avec compte — détection session Supabase → envoi Brevo en tâche de fond → toast “✅ Email envoyé !” → pas de modal · email contient CTA contextuel selon plan actuel
- [ ] **83.** Brevo tags — chaque inscrit tagué `plan_socle` / `plan_pilote` / `plan_radar` + `autoroute_A/B/C` + `last_lead_id` · mise à jour automatique si changement de plan
- [ ] **84.** Données dans `data.js` — ajouter objet `LEAD_MAGNETS` avec id, file, autoroute par magnet (source unique de vérité pour tout le JS)
- [ ] **85.** Tarification fondateur — afficher sur `doctrine.html` : “Tarif fondateur bloqué à vie pour les premiers inscrits · augmentation prévue après lancement” · Pilote 99€/an → 149€/an · Radar 199€/an → 299€/an
- [ ] **86.** Brevo — 2 listes distinctes : `transactionnel` (livraison fichiers, pas de consentement requis) et `newsletter` (opt-in explicite uniquement) · désinscription newsletter ne coupe pas les transactionnels

-----

## 📊 Analytics & tracking

- [ ] **88.** Intégrer Matomo sur toutes les pages via `ww-bundle.js` — snippet standard + anonymisation RGPD par défaut
- [ ] **89.** User ID Stitching — au moment de l’inscription réussie : `_paq.push(['setUserId', supabaseUserId])` + récupération `matomoVisitorId` + insert dans `user_conversion_metrics`
- [ ] **90.** Capture UTM au moment inscription/paiement — lire `utm_source`, `utm_medium`, `utm_campaign` depuis l’URL → stocker dans `user_conversion_metrics` · Brevo tagge tous ses liens avec UTM automatiquement
- [ ] **91.** `/admin/index.html` — encadré “Performances Marketing” : top 5 pages de conversion + top campagnes Brevo (requêtes SQL sur `user_conversion_metrics`) · données injectées dynamiquement via Supabase JS
- [ ] **93.** Ajouter colonne `billing_interval text` (valeurs : ‘monthly’ | ‘yearly’) dans `profiles` — nécessaire pour calcul MRR admin
- [ ] **92.** RGPD cookies — modal de consentement propre sur `legal/cookies.html` · Matomo en mode anonyme sans consentement · stitching activé uniquement si consentement accepté · géré dans `ww-bundle.js`