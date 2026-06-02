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