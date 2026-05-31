# WealthWaffle — Todo

*Numéroter chaque point. Barrer quand fait, déplacer en section “Fait”.*

-----

## 🔴 Bugs

- [x] ~**1.** Tester les outils sur GitHub Pages après fix IDs (tirets → underscores)~
- [x] ~**2.** Vérifier que l’ordre de chargement tools.js → init fonctionne bien en prod~

-----

## 🟠 Pages à créer

- [ ] **3.** `/fiscal/tax-shelter-startup.html` — Tax Shelter startups particuliers (lié equity.html)
- [ ] **4.** `/fiscal/tax-shelter-audiovisuel.html` — Tax Shelter audiovisuel entreprises
- [ ] **5.** `/sitemap.html` — SEO
- [ ] **6.** `/outils/result.html` — Page résultat simulateur → liens pour aller plus loin

-----

## 🟠 Améliorations pages existantes

- [ ] **7.** Page `/programme` — retravailler design et conversion
- [ ] **8.** Glossaire — navigation A-Z, compteur auto, compléter les termes, unifier le design
- [ ] **9.** Waffy chatbot — ajouter sur toutes les pages (déjà sur index.html)
- [ ] **10.** Bouton “Marquer comme lu” en bas de chaque page → invite à créer un compte si non connecté
- [ ] **11.** Intégrer les outils dans les pages adéquates (simulateur crédit dans immo/financement, FIRE dans budget/rente, etc.)
- [ ] **12.** Affichage progressif des pages — réduire l’effet densité à l’arrivée
- [ ] **13.** Texte annexe newsletter copilote — intégrer structure 7 étapes dans invest/

-----

## 🟡 Tech

- [ ] **14.** Nav — bouton thème : remplacer 🌙 par deux boutons Clair / Sombre (comme Débutant/Avancé)
- [ ] **15.** CSS inline — zéro CSS inline dans les nouvelles pages/modifs (tout dans ww-all.css)
- [ ] **16.** Stripe + parrainage — bonus_days_remaining dans profiles + webhook invoice.upcoming
- [ ] **17.** Créer les 8 fichiers lead magnets (PDF/Excel) et les uploader sur Cloudflare
- [ ] **18.** Configurer les 3 actions mise en ligne (env vars Cloudflare, SQL Supabase, webhook Stripe)

-----

## 🟡 Emails Brevo à rédiger

- [ ] **19.** Confirmation inscription (immédiat)
- [ ] **20.** Bienvenue J+1 — “Commence par là selon ton profil”
- [ ] **21.** J+3 — Lead magnet contextuel selon topic choisi
- [ ] **22.** J+7 — “Tu as lu X pages — voici la suite logique”
- [ ] **23.** J+14 — Invitation Pilote (si toujours Socle)
- [ ] **24.** J+30 — Récap mensuel progression
- [ ] **25.** Relance inactif J+7 sans connexion
- [ ] **26.** Notification correction erreur — “On a corrigé grâce à toi”
- [ ] **27.** Email parrainage filleul actif — “Ton ami a souscrit, voici ta récompense”
- [ ] **28.** Rappel lead magnet non ouvert J+3
- [ ] **29.** Upsell Pilote → Radar (membres Pilote actifs depuis 30j)

-----

## ✅ Fait

- ~Bugs simulateurs (IDs tirets→underscores, ordre chargement scripts) — confirmé OK en prod~
- ~Mode débutant/avancé — avancé montre les deux blocs, débutant a bouton toggle local par section~
- ~Signalement erreur — modal structurée + Supabase error_reports + Brevo~
- ~Variable preview URL `?ww_preview=radar|pilote|socle`~
- ~Bug traducteur jargon + fonds d’urgence — IDs tirets → underscores, ordre chargement scripts~
- ~4 simulateurs fiscaux pro — PLCI, IS vs IPP, VVPRbis, Réserve liquidation~
- ~Nav restructurée — 3 menus thématiques + Programme Doctrine + ⚙️~
- ~Bandeau lead magnet contextuel sous nav — 9 magnets selon page~
- ~Centre téléchargement /contenu/downloads.html~
- ~Page /invest/or.html~
- ~Alternatives.html restructuré~
- ~Supabase schema — 8 tables~
- ~Programme.html — landing Doctrine~
- ~Dashboard — profil + préférences~
- ~Parrainage — /compte/parrainage.html~

-----

## 🔵 Radar V2 — À construire

- [ ] **30.** `/radar/index.html` — Liste projets publics publiés (cards avec score, verdict, secteur)
- [ ] **31.** `/radar/projet.html` — Page détail projet analysé (template à définir par Jonathan)
- [ ] **32.** `/radar/soumettre.html` — Formulaire soumission projet (public / 48h / privé)
- [ ] **33.** `/radar/boussole.html` — Simulateur portefeuille personnel (diversification mathématique)
- [ ] **34.** `/radar/admin.html` — Interface admin relecture (accès par lien secret dans l’email)
- [ ] **35.** `/dashboard/index.html` — Ajouter section crédits + portefeuille + historique soumissions
- [ ] **36.** Supabase Edge Function — Notification email admin à chaque soumission (avec stats anti-guignol)
- [ ] **37.** Supabase Edge Function — Lancer l’analyse IA (scraping URL + analyse GPT + stockage rapport_ia)
- [ ] **38.** Supabase Edge Function — Notifier l’utilisateur quand son projet est publié
- [ ] **39.** Stripe — Achat de crédits privés (9,99€ / crédit ou pack)
- [ ] **40.** Rate limiting soumissions — Public : max 2/jour + 4/semaine · Privé : illimité tant que crédits dispo (côté JS + Supabase)
- [ ] **41.** Anti-doublon — autocomplete sur le nom/URL lors de la soumission
- [ ] **42.** Filtre anti-spam IA — GPT-4o-mini avant l’analyse complète (“est-ce un vrai projet equity ?”)
- [ ] **43.** ~Jonathan fournit le template d’analyse~ → Template reçu (radar_analyse.md). Page projet : résumé visible + volets accordéon JS par chapitre (14 critères + Pre-Mortem + Simulation sortie + Ticket)
- [ ] **44.** Scraping : 50 sites/jour en cron job, détection des nouveaux projets vs veille. Jina Reader (gratuit) + Firecrawl fallback pour JS-heavy. Upload PDF possible en complément.
- [ ] **45.** Prix : analyse privée = 9,99€ · Mode 48h supprimé · 2 modes uniquement : Public (gratuit) / Privé (9,99€)
- [ ] **46.** ~Choix modèle IA~ → Claude Sonnet 4.5 (analyse complète) + Claude Haiku 4.5 (filtre anti-spam). Compte Anthropic payant Jonathan.
- [ ] **55.** Cron job scraping — 50 plateformes equity/jour, détection nouveaux projets vs veille en Supabase
- [ ] **56.** JSON rapport_ia exhaustif — structure complète calée sur radar_analyse.md (14 critères + kill-switches + Pre-Mortem + simulation sortie + question critique + acquéreurs)
- [ ] **57.** Page `/radar/projet.html` — résumé sticky en haut + 14 volets accordéon JS (un par chapitre du template) + simulation sortie + ticket recommandé
- [ ] **58.** Table des matières cliquable sur la page projet (ancres vers chaque volet accordéon)
- [ ] **59.** Cron job reset compteurs soumissions (submissions_today à minuit, submissions_week le lundi)

-----

## 🟡 Lead magnets — fichiers à créer

- [ ] **47.** `excel-budget` — budget-belge.xlsx (Excel)
- [ ] **48.** `guide-etf` — guide-etf-belge.pdf (PDF)
- [ ] **49.** `simulateur-allocation` — allocation-portefeuille.xlsx (Excel)
- [ ] **50.** `checklist-immo` — checklist-achat-immo.pdf (PDF)
- [ ] **51.** `checklist-fiscal` — checklist-fiscale-2026.pdf (PDF)
- [ ] **52.** `guide-crypto` — guide-crypto-belge.pdf (PDF)
- [ ] **53.** `guide-taxshelter` — guide-tax-shelter.pdf (PDF)
- [ ] **54.** `guide-or` — guide-or-belgique.pdf (PDF)

-----

## 🔍 Fonctionnalités transversales — saisie de texte

- [ ] **60.** Autocomplétion barre de recherche — suggestions en temps réel depuis search-index.js + Supabase (titres pages + projets Radar)
- [ ] **61.** Traducteur jargon bancaire — corriger le bug JS (IDs) + enrichir le dictionnaire avec les termes du template Radar (GP, ROIC, Burn Multiple, NRR, CAC, LTV, Moat, TRL, etc.)
- [ ] **62.** Waffy chatbot — intégrer sur toutes les pages, répondre aux questions et orienter vers la bonne page ou le bon volet
- [ ] **63.** Toutes les barres de saisie texto (recherche, traducteur, Waffy, soumission projet) — autocomplétion cohérente avec le contenu du site
- [ ] **64.** Dictionnaire commun partagé entre recherche + traducteur + Waffy (source unique : glossaire + search-index + termes Radar)