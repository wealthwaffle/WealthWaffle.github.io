# ARBORESCENCE WEALTHWAFFLE — Structure complète

> Généré automatiquement — Juin 2026
> Convention : ✅ page existante dans le bon dossier · ⚠️ à déplacer · 🆕 à créer · 🔴 doublon à supprimer

-----

## ÉTAT DU PROBLÈME

La racine `/` contient ~50 pages HTML qui devraient être dans leurs sous-dossiers.
**Règle : chaque page doit être dans son sous-dossier thématique.**
Seules restent à la racine : `index.html`, `doctrine.html`, `404.html`, `sitemap.html`.

-----

## ARBORESCENCE CIBLE

```
wealthwaffle.be/
│
├── index.html                          ✅ Accueil
├── doctrine.html                       ✅ Programme / Pricing
├── 404.html                            ✅ Page d'erreur
├── sitemap.html                        ✅ Plan du site
│
├── /assets/                            ✅ Composants partagés
│   ├── ww-all.css                      ✅ CSS unique global
│   ├── ww-bundle.js                    ✅ JS unique global
│   ├── data.js                         ✅ Données & WW_CONFIG
│   ├── tools.js                        ✅ Outils / simulateurs
│   ├── nav.html                        ✅ Nav injectée
│   ├── footer.html                     ✅ Footer injecté
│   └── ui-components.html              ✅ Modals, cookie banner
│
├── /parcours/                          Hub "Par où commencer"
│   ├── index.html                      ✅ Hub parcours
│   ├── bases.html                      ✅ Les bases
│   ├── psychologie.html                ✅ Mindset investisseur
│   ├── glossaire.html                  ✅ Glossaire
│   ├── entreprendre.html               ✅ Créer son entreprise
│   └── progression.html                ✅ Arbre de compétences
│   # À déplacer depuis racine :
│   ├── parcours.html → ⚠️ doublon de index.html
│   ├── bases.html → ⚠️ doublon
│   ├── psychologie.html → ⚠️ doublon
│   └── glossaire.html → ⚠️ doublon
│
├── /budget/                            Hub "Budget & Épargne"
│   ├── index.html                      ✅ Hub budget
│   ├── epargne.html                    ✅ Épargne long terme
│   ├── banques.html                    ✅ Banques
│   ├── assurances.html                 ✅ Assurances
│   ├── retraite.html                   ✅ Retraite
│   └── rente.html                      ✅ Vivre de son capital
│   # À déplacer depuis racine :
│   ├── budget.html → ⚠️ doublon de index.html
│   ├── assurances.html → ⚠️ doublon
│   ├── rente.html → ⚠️ doublon
│   ├── epargne-long-terme.html → ⚠️ doublon de epargne.html
│   └── epargne-retraite.html → ⚠️ doublon de retraite.html
│
├── /invest/                            Hub "Investir"
│   ├── index.html                      ✅ Hub investir
│   ├── etf.html                        ✅ Guide ETF
│   ├── allocation.html                 ✅ Allocation portefeuille
│   ├── actions.html                    ✅ Actions / stock picking
│   ├── fonds.html                      ✅ Fonds actifs vs ETF
│   ├── obligations.html                ✅ Obligations
│   ├── or.html                         ✅ Or
│   ├── crypto.html                     ✅ Crypto guide
│   ├── crypto-plateformes.html         ✅ Plateformes crypto
│   ├── equity.html                     ✅ Equity / Tax Shelter
│   ├── alternatives.html               ✅ Investissements alternatifs
│   ├── panorama.html                   ✅ Vue d'ensemble placements
│   ├── sectoriels.html                 ✅ ETF sectoriels
│   ├── comparateurs.html               ✅ Comparateurs brokers
│   └── frais-caches.html               ✅ Frais cachés & spread
│   # À déplacer depuis racine :
│   ├── invest.html → ⚠️ doublon de index.html
│   ├── invest-etf.html → ⚠️ doublon
│   ├── invest-actions.html → ⚠️ doublon
│   ├── invest-allocation.html → ⚠️ doublon
│   ├── invest-equity.html → ⚠️ doublon
│   ├── invest-fonds.html → ⚠️ doublon
│   ├── invest-obligations.html → ⚠️ doublon
│   ├── invest-panorama.html → ⚠️ doublon
│   ├── alternatives.html → ⚠️ doublon
│   ├── comparateurs.html → ⚠️ doublon
│   ├── bons-etat.html → ⚠️ → /invest/bons-etat.html 🆕 à déplacer
│   └── simulateur-apport.html → ⚠️ → /outils/simulateur-apport.html
│
├── /immo/                              Hub "Immobilier"
│   ├── index.html                      ✅ Hub immo
│   ├── achat.html                      ✅ Acheter
│   ├── financement.html                ✅ Financement
│   ├── locatif.html                    ✅ Investissement locatif
│   ├── regions.html                    ✅ Par région
│   ├── renovation.html                 ✅ Rénover
│   ├── alternatif.html                 ✅ Immo alternatif
│   ├── societe.html                    ✅ Immo via société
│   └── subsides.html                   ✅ Subsides régionaux
│   # À supprimer (doublons racine) :
│   ├── immo.html → ⚠️ doublon de index.html
│   ├── immo-achat.html → 🔴 doublon (version legacy blur-gate)
│   ├── immo-locatif.html → 🔴 doublon legacy
│   ├── immo-financement.html → 🔴 doublon legacy
│   ├── immo-alternatif.html → 🔴 doublon legacy
│   └── immo-regions.html → 🔴 doublon legacy
│
├── /fiscal/                            Hub "Fiscalité"
│   ├── index.html                      ✅ Hub fiscal
│   ├── declaration.html                ✅ Déclaration IPP
│   ├── independants.html               ✅ Indépendants
│   ├── societes.html                   ✅ Sociétés / IS
│   ├── remuneration.html               ✅ Salaire vs dividendes
│   ├── deductions.html                 ✅ Déductions
│   ├── frais.html                      ✅ Frais déductibles
│   ├── crypto.html                     ✅ Fiscalité crypto
│   ├── immo.html                       ✅ Fiscalité immo
│   ├── plus-values.html                ✅ Plus-values
│   ├── succession.html                 ✅ Succession
│   ├── management.html                 ✅ Holding / management
│   ├── assurances.html                 ✅ Assurances fiscales
│   ├── fiscaliste.html                 ✅ Trouver un fiscaliste
│   ├── tva.html                        ✅ TVA
│   ├── tax-shelter.html                ✅ Tax Shelter global
│   ├── tax-shelter-startup.html        ✅ Tax Shelter startups
│   ├── tax-shelter-audiovisuel.html    ✅ Tax Shelter audiovisuel
│   ├── aides-independants.html         ✅ Aides indépendants
│   ├── aides-societes.html             ✅ Aides sociétés
│   ├── couts-creation.html             ✅ Coûts création société
│   └── investir-independant-societe.html ✅ Investir PP vs société
│   # À déplacer depuis racine :
│   ├── tax.html → ⚠️ doublon de index.html
│   ├── crypto.html → ⚠️ doublon de crypto.html
│   ├── independants.html → ⚠️ doublon
│   ├── societes.html → ⚠️ doublon
│   ├── frais-deductibles.html → ⚠️ doublon de frais.html
│   ├── succession.html → ⚠️ doublon
│   ├── tva.html → ⚠️ doublon
│   ├── tax-shelter.html → ⚠️ doublon
│   ├── salaire-vs-dividende.html → ⚠️ doublon de remuneration.html
│   ├── societe-management.html → ⚠️ doublon de management.html
│   └── avocat-fiscaliste.html → ⚠️ doublon de fiscaliste.html
│
├── /outils/                            Hub "Outils & Simulateurs"
│   ├── index.html                      ✅ Hub outils
│   ├── fiscal-crypto.html              ✅ Calculateur fiscal crypto
│   # À déplacer depuis racine :
│   ├── outils.html → ⚠️ doublon de index.html
│   ├── outils-fiscaux.html → ⚠️ → /outils/fiscal-belge.html
│   ├── calculateur-retraite.html → ⚠️ → /outils/retraite.html
│   └── simulateur-apport.html → ⚠️ → /outils/apport-immo.html
│
├── /contenu/                           Hub "Contenu"
│   ├── index.html                      ✅ Hub contenu
│   ├── videos.html                     ✅ Vidéos YouTube
│   ├── downloads.html                  ✅ Guides PDF
│   ├── newsletter.html                 ✅ Newsletter
│   └── concept-semaine.html            ✅ Concept de la semaine
│   # Doublons racine :
│   ├── videos.html → 🔴 doublon
│   ├── newsletter.html → 🔴 doublon
│   └── concept-semaine.html → 🔴 doublon
│
├── /a-propos/                          Hub "À propos"
│   ├── index.html                      ✅ À propos
│   ├── faq.html                        ✅ FAQ
│   ├── sources.html                    ✅ Sources
│   └── affiliation.html                ✅ Affiliation
│   # Doublons racine :
│   ├── apropos.html → 🔴 doublon
│   ├── affiliation.html → 🔴 doublon
│   ├── faq.html → 🔴 doublon
│   └── sources.html → 🔴 doublon
│
├── /legal/                             Pages légales
│   ├── cgu.html                        ✅ CGU
│   ├── cookies.html                    ✅ Cookies
│   └── privacy.html                    ✅ Vie privée
│   # Doublons racine :
│   ├── cgu.html → 🔴 doublon
│   ├── cookies.html → 🔴 doublon
│   └── privacy.html → 🔴 doublon
│
├── /compte/                            Espace compte utilisateur
│   ├── inscription.html                ✅ Créer un compte
│   ├── connexion.html                  ✅ Se connecter
│   ├── callback.html                   ✅ Auth callback
│   ├── mot-de-passe.html               ✅ Reset mot de passe
│   ├── profil.html                     ✅ Données personnelles
│   ├── abonnement.html                 ✅ Mon abonnement
│   └── parrainage.html                 ✅ Parrainage
│   # À créer :
│   └── parametres.html                 🆕 Préférences rappels/mode
│
├── /dashboard/                         Espace connecté
│   └── index.html                      ✅ Dashboard principal
│
├── /radar/                             Outil Radar (Pilote+ / Radar+)
│   ├── index.html                      ✅ Hub radar
│   ├── projet.html                     ✅ Fiche projet
│   └── watchlist.html                  ✅ Ma watchlist
│   # À créer :
│   └── soumettre.html                  🆕 Soumettre un projet
│
├── /admin/                             Back-office (admin only)
│   ├── index.html                      ✅ Dashboard admin
│   ├── users.html                      ✅ Gestion utilisateurs
│   ├── radar.html                      ✅ Gestion Radar
│   ├── leads.html                      ✅ Leads & emails
│   ├── analytics.html                  ✅ Analytics
│   └── erreurs.html                    ✅ Erreurs signalées
│
└── /doctrine-app/                      App Doctrine (plans Pilote/Radar)
    ├── index.html                      ✅ Landing doctrine-app
    ├── pages/
    │   ├── _shell.html                 ✅ Layout partagé
    │   ├── pricing.html                ✅ Pricing
    │   ├── waitlist.html               ✅ Waitlist
    │   ├── /auth/
    │   │   ├── login.html              ✅
    │   │   ├── register.html           ✅
    │   │   ├── callback.html           ✅
    │   │   └── forgot-password.html    ✅
    │   ├── /account/
    │   │   ├── index.html              ✅ Mon compte doctrine
    │   │   └── success.html            ✅ Paiement réussi
    │   ├── /socle/
    │   │   ├── index.html              ✅ Hub socle
    │   │   ├── budget.html             ✅
    │   │   ├── epargne.html            ✅
    │   │   ├── objectifs.html          ✅
    │   │   ├── optimisation.html       ✅
    │   │   ├── outils.html             ✅
    │   │   ├── admin.html              ✅
    │   │   └── download.html           ✅
    │   ├── /pilote/
    │   │   ├── index.html              ✅ Hub pilote
    │   │   ├── methode.html            ✅
    │   │   ├── etf.html                ✅
    │   │   ├── obligations.html        ✅
    │   │   ├── assurance-vie.html      ✅
    │   │   ├── crowdlending.html       ✅
    │   │   ├── crypto.html             ✅
    │   │   ├── fiscalite.html          ✅
    │   │   ├── brokers.html            ✅
    │   │   ├── outils.html             ✅
    │   │   └── syntheses.html          ✅
    │   └── /radar/
    │       ├── index.html              ✅ Hub radar doctrine
    │       └── watchlist.html          ✅
```

-----

## RÉSUMÉ DES ACTIONS À FAIRE

### 🔴 Supprimer (doublons legacy dans la racine)

Pages dans `/` qui ont leur version propre dans un sous-dossier :

```
immo-achat.html immo-locatif.html immo-financement.html immo-alternatif.html immo-regions.html
apropos.html affiliation.html faq.html sources.html
cgu.html cookies.html privacy.html
videos.html newsletter.html concept-semaine.html
```

### ⚠️ Rediriger (ou supprimer après vérif SEO)

Pages racine qui ont un équivalent dans le bon dossier — à 301 redirect :

```
budget.html → /budget/
invest.html → /invest/
immo.html → /immo/
tax.html → /fiscal/
outils.html → /outils/
parcours.html → /parcours/
[etc. — voir liste complète ci-dessus]
```

### 🆕 Pages à créer

```
/compte/parametres.html         Préférences rappels / mode / thème
/radar/soumettre.html           Formulaire soumission projet
/outils/retraite.html           Calculateur retraite (depuis racine)
/outils/apport-immo.html        Simulateur apport immobilier
/invest/bons-etat.html          Bons d'État (depuis racine)
```

-----

## NAVIGATION PAR ÉTAT UTILISATEUR

### 🔓 Non connecté

```
Nav principale :  Je démarre · J'investis · Aller plus loin · Programme
Nav droite    :   🔍 Search · ⚙️ Réglages · [Connexion] [Commencer gratuit]
Mobile        :   Réglages (mode + thème) · [Commencer gratuitement] · [Se connecter]
              :   + menus accordéon (Je démarre / J'investis / Aller plus loin / Programme)
```

### 🔐 Connecté (Socle)

```
Nav principale :  Je démarre · J'investis · Aller plus loin · Programme
Nav droite    :   🌙 Toggle thème · 📊 Dashboard · [Prénom ▾]
Dropdown compte:  📊 Dashboard · 🌳 Progression · 👤 Données personnelles
               :  ✈️ Abonnement · Mode [Débutant] [Avancé] · 🚪 Déconnexion
Mobile        :   [📊 Mon Dashboard →] · Progression · Profil · Abonnement · Déconnexion
```

### ✈️ Connecté (Pilote / Pilote Auto)

```
Même chose + accès doctrine-app/pages/pilote/*
Dashboard     :   Parcours guidé Pilote · Outils Pilote · Boussole (Auto uniquement)
```

### 📡 Connecté (Radar / Radar Auto)

```
Même chose + accès /radar/* · doctrine-app/pages/radar/*
Dashboard     :   Parcours guidé Radar · Watchlist · Boussole (Auto uniquement)
```

### 🛡️ Admin

```
Nav droite    :   + lien /admin/
Dashboard     :   Accès complet + panneau admin intégré
```

-----

## RÈGLE DE CONSTRUCTION D’UNE PAGE

Chaque page suit ce template (CLAUDE.md) :

```
1. head : ww-all.css + WW_PAGE_META
2. body : #ww-ui-placeholder (nav injectée)
3. .page > breadcrumb + pill-nav + contenu
4. Scripts en bas : CDN supabase → data.js → tools.js → ww-bundle.js → script inline
```

Chaque page expose via pill-nav :

- ← Hub parent
- Page courante (active)
- Pages sœurs (2-4 max)

-----

## CE QUI CONNECTE TOUT

|Composant           |Rôle                                          |Fichier                     |
|--------------------|----------------------------------------------|----------------------------|
|`ww-bundle.js`      |Nav, session, gamification, grimoire, tracking|`/assets/ww-bundle.js`      |
|`ww-all.css`        |Tout le CSS (7132 lignes)                     |`/assets/ww-all.css`        |
|`data.js`           |WW_CONFIG + WW_DATA (prix, XP, niveaux)       |`/assets/data.js`           |
|`nav.html`          |Menu injecté sur toutes les pages             |`/assets/nav.html`          |
|`footer.html`       |Pied de page injecté                          |`/assets/footer.html`       |
|`ui-components.html`|Modals légales + cookie banner                |`/assets/ui-components.html`|