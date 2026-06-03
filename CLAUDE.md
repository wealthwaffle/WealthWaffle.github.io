# CLAUDE.md — WealthWaffle

## Règles absolues

- Lire le fichier avant de modifier · modifier uniquement la zone concernée · minimiser les diffs
- Jamais de nav/footer/head en dur dans une page
- Jamais de valeur fiscale en dur — utiliser `data.js`
- Jamais de prix programme en dur — utiliser `WW_DATA.prix`
- Jamais de variable d’environnement en dur
- Jamais renommer/déplacer un fichier sans demande explicite
- Zéro CSS inline — tout dans `ww-all.css` avec commentaire de section
- Zéro duplication de logique, contenu ou données
- Expliquer les impacts avant tout changement structurel

## Format de la ROADMAP — obligatoire

La ROADMAP est structurée en **groupes par fichiers touchés**, pas en liste plate numérotée.

**Structure de chaque groupe :**

```
## 🟠 GROUPE X — Nom du groupe (fichiers concernés)
> Description courte de ce qui est groupé et pourquoi

- [ ] **N.** Description courte · détails techniques si besoin
- [ ] **N.** ...
```

**Règles de format :**

- Un groupe = des points qui touchent les mêmes fichiers → 1 seul commit possible
- Emoji de priorité : 🔴 critique · 🟠 court terme · 🟡 moyen terme · 🔵 long terme · 🟣 dédié · ⚪ futur
- Les sous-listes de pages vont sous le point parent (pas de points séparés par page)
- Les points faits vont dans `## ✅ Fait` en bas, avec `~~texte~~`
- Ne jamais renuméroter les points — garder les numéros d’origine même s’ils ne sont plus dans l’ordre
- Ajouter les nouveaux points dans le bon groupe avec le prochain numéro disponible

## Mise à jour obligatoire des docs à chaque session

> **RÈGLE PERMANENTE — s’applique automatiquement, sans qu’on ait besoin de le demander**

Après chaque tâche complétée, mettre à jour immédiatement :

**`ROADMAP.md`** :

- Barrer les points complétés avec `- [x] ~~**N.** ...~~`
- Ajouter les nouveaux points découverts avec le prochain numéro disponible
- Déplacer les points complétés dans la section `## ✅ Fait`
- La roadmap doit refléter l’état réel du projet à tout moment

**`CLAUDE.md`** :

- Mettre à jour si une règle change, une convention évolue, ou une décision structurelle est prise
- Ajouter les nouvelles conventions dès qu’elles sont décidées

**`PAGE_NAMES.md`** :

- Mettre à jour si un nom/emoji de page change
- Consulter avant de créer ou modifier une page (titre H1 = libellé nav)

**`STATUS.md`** :

- Mettre à jour l’état de mise en ligne et les blocages actuels

## Images — dossier `/img/`

- **Toutes les images** vont dans `/img/` à la racine du repo — jamais à la racine, jamais dans `/assets/`
- Chemins toujours absolus : `/img/waffy-logo.png` jamais `IMG_5202.png` ni `../img/waffy.png`
- Nommage : kebab-case descriptif (`waffy-logo.png`, `waffy-avatar.png`, `og-image.jpg`)
- Images actuelles à migrer : `IMG_5202.png` → `/img/waffy-logo.png` · `IMG_5208.png` → `/img/waffy-avatar.png`

## Conventions de code

- Chemins : absolus uniquement (`/assets/`, `/invest/`)
- IDs outils : underscores (`t_urgence` jamais `t-urgence`)
- `data-level` : `"debutant"` ou `"avance"` uniquement
- Ordre scripts : `tools.js` → `data.js` → `ww-bundle.js`
- Init outils : `window.addEventListener('load', ...)` — jamais `DOMContentLoaded`
- Plan utilisateur : `localStorage.getItem('ww_plan')` — pas du DOM
- Liens : toujours absolus dans les pages HTML (`/invest/etf.html` jamais `etf.html`)

## Sur chaque page créée ou modifiée — checklist obligatoire

1. **Point 11** — simulateurs adéquats intégrés avec résultat inline
1. **Point 12** — affichage progressif au scroll (IntersectionObserver + classe `reveal`)
1. **Point 15** — zéro CSS inline, tout dans `ww-all.css` avec commentaire
1. **Point 77** — graphiques/animations JS ou CSS en rapport avec le contenu
1. **Point 78** — encadrés Waffy `.waffy-tip` pour les infos qui ressortent
1. **PAGE_NAMES.md** — titre H1 conforme au libellé officiel
1. **Liens absolus** — aucun lien relatif

## Composants injectés automatiquement

`nav.html` · `footer.html` · `ui-components.html` — chargés via `fetch` dans `ww-bundle.js`.
`<div id="ww-ui-placeholder"></div>` suffit dans chaque page.

## Mode lecture débutant/avancé

- **Avancé global** : blocs `debutant` + `avance` visibles · bouton `🌱 Simplifier cette section` avant chaque bloc avancé
- **Débutant global** : bloc `debutant` + bouton `🚀 Voir la version avancée` après chaque bloc débutant (toujours visible)
- Toggle global : `setLevelNav(level)` dans `ww-bundle.js`
- Les toggles locaux sont indépendants du global et se reset au changement global

## Preview sans Supabase

- `?ww_preview=radar|pilote|socle|admin` — cookie 7 jours, URL nettoyée
- `?ww_preview=off` — efface cookie + localStorage
- `admin` = plan radar + role admin + addon crypto + 999 crédits

## Noms officiels des pages

Référence dans `/PAGE_NAMES.md` — emoji + libellé = titre H1.
Exemples clés : `immo/achat` → 🔑 Devenir propriétaire · `fiscal/` → 💡 Payer moins d’impôts · `invest/` → 🗺️ Quel placement choisir ?

## Prix — source unique

Tous les prix dans `WW_DATA.prix` (data.js). Ne jamais écrire 14,99€ ou 99€ en dur dans une page.

```js
WW_DATA.prix.pilote_mensuel    // 14.99
WW_DATA.prix.pilote_annuel     // 99
WW_DATA.prix.radar_mensuel     // 24.99
WW_DATA.prix.radar_annuel      // 199
WW_DATA.prix.crypto_addon      // 49
WW_DATA.prix.trial_days        // 7
```

## Trial Stripe

7 jours gratuits sur tous les plans. Carte requise mais non débitée. Jamais “sans carte bancaire” — toujours “7 jours gratuits, résiliation avant pour ne rien payer”.

## Fiscalité (immuable jusqu’en janvier)

- Taxe PV 10% : actifs financiers — pas l’immobilier direct
- Revente immo < 5 ans (hors résidence principale) : 16,5%
- Terrain < 8 ans : 33% · Toutes les valeurs dans `data.js`

## Slogans

- ✅ “La finance, ça se déguste.” · “Dans 10 ans, tu te remercieras.”
- ❌ “La gaufre, elle juge pas.” · “Mange une gaufre, investis l’autre.” · “Sans carte bancaire”

## Disclaimer obligatoire

Crypto, fiscalité, immo, investissement → voix off vidéo + description écrite :
*“Cette page est à titre informatif uniquement et ne constitue pas un conseil financier personnalisé.”*

## Format de commit

Toujours une commande terminal complète :

```
git commit -m "feat(scope): titre" -m "description des changements"
```

Jamais de texte brut. Jamais d’explication autour.

## Checklist avant modification

1. Lire le fichier · 2. Zone concernée uniquement · 3. Pas de nav/footer en dur
1. Conventions OK · 5. `node --check` si bundle modifié · 6. Mettre à jour ROADMAP.md

## Template de page minimal

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Emoji] [Libellé PAGE_NAMES.md] — WealthWaffle</title>
  <meta name="description" content="[Description]">
  <link rel="manifest" href="/manifest.json"><meta name="theme-color" content="#E87CC3">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/ww-all.css">
  <script>window.WW_PAGE_META = { updated: "Juin 2026", name: "[Nom page]", basePath: "/[dossier]/" };</script>
</head>
<body>
<div id="ww-ui-placeholder"></div>
<div class="bg-mesh"><div class="bg-orb orb1"></div><div class="bg-orb orb2"></div><div class="bg-orb orb3"></div></div>
<button class="back-to-top" id="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑</button>

<div class="page" style="padding-top:80px;">
  <!-- contenu ici -->
</div>

<script src="/assets/data.js"></script>
<script src="/assets/tools.js"></script><!-- si outils -->
<script src="/assets/ww-bundle.js" defer></script>
</body>
</html>
```

## Workflow de livraison

- Présenter les fichiers modifiés après chaque modification sans attendre
- Sur “commit + fichiers” : commande git exacte + `present_files` — rien d’autre
- Jamais d’explication de ce qui a été fait sauf demande explicite

## Architecture page d’accueil — décisions structurelles

### Principe source unique

`WW_DATA.pages` dans `data.js` = source unique de toutes les pages.
Nav, footer, accueil, et pages hub lisent tous ce tableau — ajouter une page = modifier `data.js` uniquement.

### Onboarding — 4 questions (fusionné avec popup actuel)

1. “Tu es…” → Salarié · Indépendant · Dirigeant
1. “Ton objectif ?” → Épargner · Investir · Réduire mes impôts · Acheter un bien · Retraite
1. “Tu débutes ou tu as des bases ?” → Je débute · J’ai déjà des notions
1. “Thème ?” → ☀️ Clair · 🌙 Sombre
   → 4 clics → résultat immédiat → message final : “À tout moment, Waffy en bas à droite peut te guider”
   → Stocké dans localStorage (ww_profile, ww_level, ww_theme)

### Visiteur arrivant sur une page spécifique (pas l’accueil)

Si onboarding non fait ET page ≠ index.html → modal légère après 8 secondes :
“Tu es sur [nom page]. C’est bien ce que tu cherches ?” → [Oui, je reste] [Non, guidez-moi →]
Si “Non” → ouvrir le questionnaire guidage.

### Structure page d’accueil (1 seule page, tout en scroll)

1. Hero — slogan + 2 boutons : [Je sais ce que je veux ↓] [Guidez-moi ↓]
1. Section A “Je sais” — barre recherche (déjà codée) + sitemap visuelle par thème
1. Section B “Guidez-moi” — même questionnaire que onboarding (réutiliser le composant)
1. Section scroll — thèmes condensés pour les non-cliqueurs

### Sitemap visuelle — règle mobile-first

- Desktop : 6 thèmes en grille, 3 pages principales par thème + “Voir tout →”
- Mobile : accordéon par thème, 3 pages visible, “+” pour dérouler
- “Voir tout →” pointe vers la page hub du thème (ex: /invest/, /fiscal/, /budget/)
- Les pages hub de thème existent déjà (index.html dans chaque dossier) — les enrichir avec le même composant JS qui liste les pages du thème depuis WW_DATA.pages

### Hero — pas de compteurs froids

Ne pas afficher “58 pages” ou “27 outils” en chiffres.
Dire à la place : “Des outils interactifs pour calculer, pas juste lire” — l’idée c’est que c’est actif, pas encyclopédique.

## Partenaires & outils tiers à évaluer

- **Easyvest** — robo-advisor belge · potentiel partenariat ou affiliation
- **Spreds** — plateforme equity belge · intégration Radar possible
- **Blast** — plateforme investissement · contenu + affiliation
- **Finary** — agrégateur de portefeuille · API pour portefeuilles J7
- **Wallons-y** — levées de fonds wallonnes · partenariat contenu + distribution
- **Odoo** — évaluer pour back-office / CRM interne WW (K5)
- **Wallonie Entreprendre / Actya / UCM / Partena** — référencer dans J5

## Pages futures commentées dans data.js

Quand une page du Groupe J est créée :

1. Créer le fichier HTML
1. Décommenter la ligne dans `WW_DATA.pages`
1. La page apparaît automatiquement dans le footer, les hubs et l’accueil

## Mode guidé — règles de conversion (K1a + K1b)

- Parcours 5 étapes depuis WW_DATA.pages selon profil+objectif · tout localStorage au départ
- Barre de progression sous la nav sur chaque page du parcours
- Bouton “Étape suivante →” en bas de chaque page du parcours
- **Conversion douce — timing précis :**
  - Étape 2/5 : bandeau discret “Sauvegarde ta progression” (pas de modal)
  - Étape 3/5 : mini-modal si non connecté — pas agressive, “Continuer quand même” disponible
  - Étape 5/5 : page félicitations + CTA Pilote “Accès complet · 7 jours gratuits”
- **Règle absolue :** jamais de prix avant la fin du parcours. D’abord la valeur, ensuite l’offre.
- Le guidé est le client Pilote idéal — il a prouvé sa motivation. Le trial 7j est la conversion naturelle.