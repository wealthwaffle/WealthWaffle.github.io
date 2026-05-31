# CLAUDE.md — WealthWaffle

## Règles absolues

- Lire le fichier avant de modifier · modifier uniquement la zone concernée · minimiser les diffs
- Jamais de nav/footer/head en dur dans une page
- Jamais de valeur fiscale en dur — utiliser `data.js`
- Jamais de variable d’environnement en dur
- Jamais renommer/déplacer un fichier sans demande explicite
- Zéro CSS inline — tout dans `ww-all.css` avec commentaire de section
- Zéro duplication de logique, contenu ou données
- Expliquer les impacts avant tout changement structurel

## Conventions de code

- Chemins : absolus uniquement (`/assets/`, `/invest/`)
- IDs outils : underscores (`t_urgence` jamais `t-urgence`)
- `data-level` : `"debutant"` ou `"avance"` uniquement
- Ordre scripts : `tools.js` → `data.js` → `ww-bundle.js`
- Init outils : `window.addEventListener('load', ...)` — jamais `DOMContentLoaded`
- Plan utilisateur : `localStorage.getItem('ww_plan')` — pas du DOM

## Composants injectés

`nav.html` · `footer.html` · `ui-components.html` — chargés via `fetch('/assets/xxx.html')` dans `ww-bundle.js`.  
`<div id="ww-ui-placeholder"></div>` suffit dans chaque page.

## Mode lecture

- Avancé : blocs `debutant` + `avance` visibles simultanément
- Débutant : bloc `debutant` + bouton `.ww-toggle-avance` par section (classe `.ww-local-avance`)
- Toggle global : `setLevelNav(level)` dans `ww-bundle.js`

## Preview sans Supabase

`?ww_preview=radar|pilote|socle` · `?ww_preview=off` pour quitter

## Fiscalité (immuable jusqu’en janvier)

- Taxe PV 10% : actifs financiers uniquement — pas l’immobilier direct
- Revente immo < 5 ans (hors résidence principale) : IPP 16,5%
- Terrain < 8 ans : 33% · Valeurs dans `data.js`

## Slogans

- ✅ “La finance, ça se déguste.” · “Dans 10 ans, tu te remercieras.”
- ❌ “La gaufre, elle juge pas.” · “Mange une gaufre, investis l’autre.”

## Disclaimer obligatoire

Crypto, fiscalité, immo, investissement : *“Cette page est à titre informatif uniquement et ne constitue pas un conseil financier personnalisé.”*

## Format de commit

`feat(scope): desc` · `fix(scope): desc` · `docs(scope): desc`

## Checklist avant modification

1. Lire le fichier · 2. Zone concernée uniquement · 3. Pas de nav/footer en dur · 4. Conventions OK · 5. `node --check` si bundle modifié

## Template de page minimal

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Titre] — WealthWaffle</title>
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
<div class="progress-bar"><div class="progress-fill"></div></div>

<div class="page" style="padding-top:80px;">
  <!-- contenu ici -->
</div>

<script src="/assets/data.js"></script>
<script src="/assets/tools.js"></script>
<script src="/assets/ww-bundle.js" defer></script>
</body>
</html>
```

`tools.js` uniquement si la page contient des outils. `data-level` sur `.level-section > [data-level]`. Pas de CSS inline.

## Workflow de livraison

- Modifications en arrière-plan sans livraison automatique
- Livraison uniquement sur demande explicite **“commit + fichiers”**
- Sur “commit + fichiers” : message de commit GitHub + `present_files` des fichiers modifiés uniquement
- Jamais d’explication de ce qui a été fait sauf demande explicite

## Mode Dev (optimisé mobile)

- **Brainstorming** : si flou/complexe, pas de code immédiat — questions + challenge + alternatives (mode Tech Lead)
- **Suivi auto** : après chaque tâche/bug, fournir les blocs exacts à copier-coller pour `STATUS.md` et `ROADMAP.md`
- **Format** : ultra-concis — jamais de réécriture complète, uniquement les lignes modifiées
- **Contexte** : analyser l’arborescence via connecteur GitHub avant chaque modification