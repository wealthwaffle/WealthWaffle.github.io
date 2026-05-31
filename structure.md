# WealthWaffle — Arborescence & Todo complet

*Mise à jour : Juin 2026*

-----

## Arborescence actuelle

```
wealthwaffle.be/
│
├── index.html
├── 404.html
├── manifest.json / sw.js
├── programme.html                ← landing Programme Doctrine
├── supabase-schema.sql           ← schema SQL à exécuter
├── structure.md                  ← ce fichier
│
├── assets/
│   ├── ww-all.css
│   ├── ww-bundle.js
│   ├── data.js
│   ├── tools.js
│   ├── search-index.js
│   ├── nav.html
│   ├── footer.html
│   └── ui-components.html
│
├── budget/
│   ├── index.html
│   ├── epargne.html
│   ├── retraite.html
│   ├── rente.html
│   └── banques.html
│
├── invest/
│   ├── index.html
│   ├── panorama.html
│   ├── etf.html                  ← + section ETF sectoriels
│   ├── allocation.html
│   ├── actions.html
│   ├── obligations.html
│   ├── fonds.html
│   ├── equity.html
│   ├── alternatives.html         ← restructuré (or/ETF sect./equity → renvois)
│   ├── or.html                   ← NOUVEAU
│   ├── crypto.html               ← 11 cryptos en accordéons
│   └── comparateurs.html
│
├── immo/
│   ├── index.html
│   ├── achat.html
│   ├── locatif.html
│   ├── financement.html
│   ├── regions.html
│   ├── alternatif.html
│   └── renovation.html           ← NOUVEAU
│
├── fiscal/
│   ├── index.html
│   ├── independants.html
│   ├── societes.html
│   ├── management.html
│   ├── remuneration.html
│   ├── frais.html
│   ├── tva.html
│   ├── succession.html
│   ├── tax-shelter.html          ← à scinder (voir todo)
│   ├── assurances.html
│   └── fiscaliste.html
│
├── outils/
│   └── index.html                ← hub 23 outils
│
├── parcours/
│   ├── index.html
│   ├── bases.html
│   ├── glossaire.html            ← à améliorer (voir todo)
│   └── psychologie.html
│
├── contenu/
│   ├── videos.html
│   ├── newsletter.html
│   ├── concept-semaine.html
│   └── downloads.html            ← centre téléchargement 9 lead magnets
│
├── a-propos/
│   ├── index.html
│   ├── faq.html
│   ├── sources.html
│   └── affiliation.html
│
├── legal/
│   ├── cgu.html
│   ├── privacy.html
│   └── cookies.html
│
├── compte/
│   ├── connexion.html
│   ├── inscription.html
│   ├── mot-de-passe.html
│   ├── callback.html
│   └── parrainage.html
│
├── dashboard/
│   └── index.html
│
└── radar/
    ├── index.html
    └── watchlist.html
```

-----

## Pages à créer

|Page                                  |Description                                          |Priorité|
|--------------------------------------|-----------------------------------------------------|--------|
|`/fiscal/tax-shelter-startup.html`    |Tax Shelter startups particuliers (lié equity.html)  |🔴       |
|`/fiscal/tax-shelter-audiovisuel.html`|Tax Shelter audiovisuel entreprises                  |🔴       |
|`/sitemap.html`                       |SEO                                                  |🟠       |
|`/outils/result.html`                 |Page résultat simulateur → liens pour aller plus loin|🟠       |

-----

## Todo technique — par priorité

### 🔴 En cours / immédiat

**Point 4 — Mode débutant/avancé**

- Avancé doit montrer débutant + avancé (pas seulement avancé)
- Débutant : bouton “Voir la version avancée” par section (toggle local)
- Modifier le CSS dans ww-all.css uniquement (zéro CSS inline)

**Points 1 & 2 — Bugs JS simulateurs**

- Fonds d’urgence : ne se met pas à jour
- Traducteur de jargon bancaire : ne fonctionne pas

**Point 10 — Simulateurs fiscaux pro dans tools.js**

- PLCI (cotisation optimale indépendant)
- IS vs IPP (PP ou société ?)
- VVPRbis (PM réduit dividendes)
- Réserve de liquidation

### 🟠 À faire prochainement

**Page programme**

- Retravailler la page /programme.html (design, contenu, conversion)

**Bouton thème dans le nav**

- Remplacer l’icône 🌙 par deux boutons séparés Clair / Sombre (même logique que Débutant / Avancé)

**Point 3 — CSS inline à centraliser**

- Zéro CSS inline dans les pages (nouvelles pages uniquement)
- Tout dans ww-all.css avec commentaires succincts par section

**Point 9 — Glossaire**

- Compléter les termes (actuellement ~28 affichés, à corriger)
- Navigation par lettres A-Z
- Compteur automatique de termes
- Unifier le design (premiers éléments bien designés, suite non)

**Points 5 & 6 — Tax Shelter scindé**

- `/fiscal/tax-shelter-startup.html` — particuliers (lié equity.html)
- `/fiscal/tax-shelter-audiovisuel.html` — entreprises
- Chaque page mentionne l’autre en une phrase avec lien

**Point 7 — Signalement erreur** ✅ fait

- Modal structurée remplace le mailto
- Supabase error_reports + Brevo

**Point 8 — Waffy chatbot**

- Sur toutes les pages (déjà sur index.html)
- Orientation vers la bonne page + explication succincte

**Point 11 — Texte annexe newsletter copilote**

- Structure en 7 étapes à intégrer dans invest/

**Point 12 — Affichage progressif**

- Reveal au scroll plus prononcé
- Réduire l’effet densité à l’arrivée sur une page

**Point 13 — Bouton “Marquer comme lu”**

- En bas de chaque page
- Si connecté → enregistre dans page_views Supabase
- Si non connecté → invite à créer un compte

**Point 14 — Stripe + parrainage**

- Gérer les semaines/mois gratuits dans Supabase (bonus_days_remaining)
- Webhook Stripe invoice.upcoming → créer coupon one-time

**Point 15 — Outils : page résultat simulateur**

- Après calcul → redirect vers page résultat personnalisée
- Résultat + explication + liens pour aller plus loin
- Autres simulateurs en dessous

### 🟡 Marketing / conversion

**Séquence email à rédiger (Brevo)**

1. Confirmation inscription (immédiat)
1. Bienvenue J+1 — “Commence par là selon ton profil”
1. J+3 — Lead magnet contextuel selon topic choisi
1. J+7 — “Tu as lu X pages — voici la suite logique”
1. J+14 — Invitation à passer à Pilote (si toujours Socle)
1. J+30 — Récap mensuel de progression
1. Relance inactif J+7 sans connexion — “Tu as téléchargé X, est-ce que ça t’a aidé ?”
1. Remerciement signalement erreur (immédiat) ✅ fait
1. Notification correction erreur — “On a corrigé grâce à toi”
1. Email parrainage filleul actif — “Ton ami a souscrit, voici ta récompense”
1. Rappel lead magnet non ouvert J+3
1. Upsell Pilote → Radar (membres Pilote actifs depuis 30j)

**Stratégie conversion à implémenter**

- Popup profil + niveau dès l’arrivée (J0) ✅ fait
- Bandeau lead magnet sous nav dès J0 ✅ fait
- Trigger compte après X pages vues ✅ fait
- Bouton “Marquer comme lu” → invite compte (à faire)
- Waffy chatbot → orientation → conversion (à faire)
- Page résultat simulateur → invite compte (à faire)

-----

## Lead magnets — fichiers à créer

|ID                   |Fichier                     |Type |Statut   |
|---------------------|----------------------------|-----|---------|
|guide-10-erreurs     |10-erreurs-belges.pdf       |PDF  |✅ existe |
|excel-budget         |budget-belge.xlsx           |Excel|⏳ à créer|
|guide-etf            |guide-etf-belge.pdf         |PDF  |⏳ à créer|
|simulateur-allocation|allocation-portefeuille.xlsx|Excel|⏳ à créer|
|checklist-immo       |checklist-achat-immo.pdf    |PDF  |⏳ à créer|
|checklist-fiscal     |checklist-fiscale-2026.pdf  |PDF  |⏳ à créer|
|guide-crypto         |guide-crypto-belge.pdf      |PDF  |⏳ à créer|
|guide-taxshelter     |guide-tax-shelter.pdf       |PDF  |⏳ à créer|
|guide-or             |guide-or-belgique.pdf       |PDF  |⏳ à créer|

-----

## Supabase — Tables (8)

|Table                 |Usage                                                   |Statut|
|----------------------|--------------------------------------------------------|------|
|`profiles`            |Profil utilisateur (plan, niveau, profil, topic, Stripe)|✅     |
|`page_views`          |Progression lecture                                     |✅     |
|`referrals`           |Codes parrainage                                        |✅     |
|`referral_conversions`|Filleuls et récompenses                                 |✅     |
|`lead_magnet_requests`|Téléchargements et captures email                       |✅     |
|`watchlist`           |Projets Radar suivis                                    |✅     |
|`projects`            |Feed projets Radar                                      |✅     |
|`error_reports`       |Signalements erreurs contenu                            |✅     |

**Colonnes à ajouter dans `profiles` (parrainage Stripe) :**

```sql
alter table profiles add column if not exists bonus_days_remaining integer default 0;
alter table profiles add column if not exists bonus_applied_until timestamptz;
```

-----

## 3 actions restantes pour la mise en ligne

1. Remplir les variables Cloudflare env (SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_KEY, 6 Price IDs, BREVO_KEY)
1. Exécuter `supabase-schema.sql` dans l’éditeur SQL Supabase
1. Configurer le webhook Stripe