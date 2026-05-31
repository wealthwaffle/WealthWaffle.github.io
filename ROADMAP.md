# ROADMAP.md — WealthWaffle

*Les tâches sont numérotées. Commande : “attaque le point N”. Barrer quand fait, déplacer en section ✅ Fait.*

-----

## 🔴 Critique — mise en ligne

- [ ] **18.** Env vars Cloudflare (SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_KEY, 6 Price IDs, BREVO_KEY) · SQL Supabase · Webhook Stripe

-----

## 🟠 Court terme — site principal

**Pages à créer**

- [ ] **3.** `/fiscal/tax-shelter-startup.html` — particuliers, lié à equity.html
- [ ] **4.** `/fiscal/tax-shelter-audiovisuel.html` — entreprises
- [ ] **5.** `/sitemap.html`
- [ ] **6.** `/outils/result.html` — résultat simulateur + liens

**Contenu & UX**

- [ ] **7.** `/programme.html` — retravailler design et conversion
- [ ] **8.** Glossaire — nav A-Z · compteur auto · termes Radar · design unifié
- [ ] **9.** Waffy chatbot — sur toutes les pages
- [ ] **10.** Bouton “Marquer comme lu” en bas de page → invite compte si non connecté
- [ ] **11.** Intégrer simulateurs dans les pages (crédit → financement · FIRE → rente · PLCI → independants · etc.)
- [ ] **12.** Affichage progressif — réduire densité à l’arrivée
- [ ] **13.** Newsletter copilote — intégrer structure 7 étapes dans invest/

**Tech**

- [ ] **14.** Nav thème — deux boutons Clair/Sombre (comme Débutant/Avancé)
- [ ] **15.** CSS inline résiduel → migrer vers `ww-all.css` au fil des modifications
- [ ] **16.** Stripe + parrainage — webhook `invoice.upcoming` → coupon depuis `bonus_days_remaining`
- [ ] **17.** Uploader 8 fichiers lead magnets sur Cloudflare

**Lead magnets (8 fichiers à créer)**

- [ ] **47.** `budget-belge.xlsx`
- [ ] **48.** `guide-etf-belge.pdf`
- [ ] **49.** `allocation-portefeuille.xlsx`
- [ ] **50.** `checklist-achat-immo.pdf`
- [ ] **51.** `checklist-fiscale-2026.pdf`
- [ ] **52.** `guide-crypto-belge.pdf`
- [ ] **53.** `guide-tax-shelter.pdf`
- [ ] **54.** `guide-or-belgique.pdf`

**Emails Brevo (11 à rédiger)**

- [ ] **19.** J+0 confirmation inscription
- [ ] **20.** J+1 bienvenue selon profil
- [ ] **21.** J+3 lead magnet contextuel
- [ ] **22.** J+7 progression + suite logique
- [ ] **23.** J+14 invitation Pilote (si Socle)
- [ ] **24.** J+30 récap mensuel
- [ ] **25.** Relance inactif J+7 sans connexion
- [ ] **26.** Notification correction erreur
- [ ] **27.** Email parrainage filleul actif
- [ ] **28.** Rappel lead magnet non ouvert J+3
- [ ] **29.** Upsell Pilote → Radar (actifs Pilote 30j)

-----

## 🔵 Moyen terme — Radar V2

**Pages**

- [ ] **30.** `/radar/index.html` — liste projets publiés
- [ ] **31.** `/radar/projet.html` — fiche récap sticky + 14 accordéons + simulation + ticket
- [ ] **32.** `/radar/soumettre.html` — public (gratuit) / privé (9,99€)
- [ ] **33.** `/radar/boussole.html` — diversification portefeuille (Pilote + Radar)
- [ ] **34.** `/admin/index.html` · `/admin/radar.html` · `/admin/erreurs.html` · `/admin/leads.html` · `/admin/users.html`
- [ ] **35.** `/dashboard/` — section crédits + portefeuille + historique soumissions

**Backend**

- [ ] **36.** Edge Function — notif email admin à chaque soumission (stats anti-guignol incluses)
- [ ] **37.** Edge Function — filtre Haiku + analyse Sonnet → `rapport_ia` JSON exhaustif
- [ ] **38.** Edge Function — notif utilisateur à la publication
- [ ] **39.** Stripe — achat crédits 9,99€
- [ ] **40.** Rate limiting — 2 soumissions publiques/jour · 4/semaine · illimité si crédits
- [ ] **41.** Anti-doublon — autocomplete nom/URL à la soumission
- [ ] **42.** Filtre anti-spam Claude Haiku avant analyse complète
- [ ] **55.** Cron scraping — 50 plateformes/jour → `scraping_snapshots`
- [ ] **56.** JSON `rapport_ia` — structure calée sur `radar_analyse.md` (14 critères + kill-switches + Pre-Mortem + simulation + ticket)
- [ ] **57.** Table des matières cliquable sur page projet
- [ ] **58.** Cron reset compteurs (minuit + lundi)

-----

## 🟡 Long terme — fonctionnalités transversales

- [ ] **60.** Autocomplétion recherche — temps réel depuis `search-index.js` + Supabase
- [ ] **61.** Traducteur jargon — enrichir dictionnaire avec termes Radar (GP, ROIC, Burn Multiple, Moat, TRL…)
- [ ] **62.** Waffy chatbot — répondre + orienter vers la bonne page
- [ ] **63.** Autocomplétion unifiée toutes barres de saisie
- [ ] **64.** Dictionnaire commun (recherche + traducteur + Waffy)

-----

## 💡 Idées futures

Affiliations trackées · TikTok/YouTube ads · Newsletter premium · Formations · Merch

-----

## ✅ Fait

- ~1-2. Bugs simulateurs (IDs tirets→underscores, ordre scripts) — confirmé OK en prod~
- ~Mode débutant/avancé — avancé montre les deux blocs, débutant a toggle local par section~
- ~Signalement erreur — modal + Supabase error_reports + Brevo~
- ~Variable preview URL `?ww_preview=radar|pilote|socle`~
- ~4 simulateurs fiscaux pro — PLCI, IS vs IPP, VVPRbis, Réserve liquidation~
- ~Nav restructurée — 3 menus thématiques + Programme Doctrine + ⚙️~
- ~Bandeau lead magnet contextuel sous nav (9 magnets selon page)~
- ~Centre téléchargement `/contenu/downloads.html`~
- ~Page `/invest/or.html`~
- ~`alternatives.html` restructuré~
- ~Supabase schema — 13 tables~
- ~`programme.html` — landing Doctrine~
- ~Dashboard — profil + préférences~
- ~`/compte/parrainage.html`~