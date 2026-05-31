# WealthWaffle — Todo

*Numéroter chaque point. Barrer quand fait, déplacer en section “Fait”.*

-----

## 🔴 Bugs

- [ ] **1.** Tester les outils sur GitHub Pages après fix IDs (tirets → underscores)
- [ ] **2.** Vérifier que l’ordre de chargement tools.js → init fonctionne bien en prod

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