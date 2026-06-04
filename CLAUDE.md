# CLAUDE.md — WealthWaffle

## ⚡ RÈGLES ABSOLUES — s’appliquent sans exception, sans demande

### CSS — LA RÈGLE LA PLUS IMPORTANTE

**ZÉRO `style=""` dans le HTML.** Sans aucune exception.

- Tout le CSS va dans `ww-all.css`
- Chaque propriété visuelle = une classe réutilisable
- Si la classe n’existe pas encore → l’ajouter dans `ww-all.css` avec un commentaire de section
- Les classes sont **génériques et réutilisables sur toutes les pages** — jamais de classe `.ma-page-truc-specifique` s’il existe déjà `.kpi-card`
- Avant d’écrire du HTML, lister les classes nécessaires et vérifier qu’elles existent dans `ww-all.css`

**Avant chaque nouveau fichier HTML : audit des classes**

```python
# Vérifier que toutes les classes utilisées existent dans ww-all.css
# Ajouter les manquantes AVANT d'écrire le HTML
```

**Après chaque fichier livré : vérification automatique**

```python
import re
c = open('fichier.html').read()
css = open('assets/ww-all.css').read()
inlines = re.findall(r'style="[^"]*"', c)
assert len(inlines) == 0, f"CSS inline trouvé : {inlines}"
```

-----

### Éléments interdits en dur dans le HTML

|Élément           |Interdit                      |Solution                                        |
|------------------|------------------------------|------------------------------------------------|
|CSS inline        |`style="..."`                 |Classe dans `ww-all.css`                        |
|Progress bar      |`<div class="progress-bar">`  |Injecté par `ww-bundle.js`                      |
|Back-to-top       |`<button class="back-to-top">`|Injecté par `ww-bundle.js`                      |
|Nav / Footer      |tout HTML nav/footer          |Injecté par `ww-bundle.js`                      |
|Prix programme    |`14,99€`, `99€`, etc.         |`data-ww="prix.pilote_annuel"` ou `WW_DATA.prix`|
|Valeurs fiscales  |taux, plafonds, seuils        |`data-ww="ep_a_plafond"` ou `WW_DATA`           |
|Variables d’env   |clés API, secrets             |Variables Cloudflare                            |
|Liens relatifs    |`../invest/etf.html`          |Toujours absolus `/invest/etf.html`             |
|padding-top:80px  |`style="padding-top:80px"`    |La classe `.page` gère déjà le padding          |
|`DOMContentLoaded`|scripts en milieu de body     |`window.addEventListener('load', ...)` en bas   |

-----

### Autres règles absolues

- Jamais renommer/déplacer un fichier sans demande explicite
- Zéro duplication de logique, contenu ou données
- Expliquer les impacts avant tout changement structurel
- `data.js` = source unique de vérité pour toutes les valeurs fiscales

-----

## 📄 TEMPLATE DE PAGE — copier tel quel pour chaque nouveau fichier

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Emoji] [Libellé PAGE_NAMES.md] — WealthWaffle</title>
  <meta name="description" content="[Description 150 caractères max]">
  <meta property="og:title" content="[Titre OG] — WealthWaffle">
  <meta property="og:image" content="https://wealthwaffle.be/img/og-image.jpg">
  <link rel="manifest" href="/manifest.json"><meta name="theme-color" content="#E87CC3">
  <link rel="apple-touch-icon" href="/img/waffy-logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/ww-all.css">
  <script>window.WW_PAGE_META = { updated: "Mois 2026", name: "[Nom page]", basePath: "/[dossier]/" };</script>
</head>
<body>
<div id="ww-ui-placeholder"></div>
<div class="bg-mesh"><div class="bg-orb orb1"></div><div class="bg-orb orb2"></div><div class="bg-orb orb3"></div></div>

<!-- progress-bar et back-to-top injectés automatiquement par ww-bundle.js — NE PAS les mettre ici -->

<div class="page">
<div id="ww-disclaimer-inline"></div>
<div class="breadcrumb"><a href="/">Accueil</a><span>/</span><a href="/[hub]/">[Hub]</a><span>/</span><span>[Page]</span></div>

<nav class="toc-sidebar">
  <a href="#section1">🔍 Titre section 1</a>
  <a href="#section2">📊 Titre section 2</a>
</nav>

<div class="eyebrow eyebrow-[thème]">[Emoji] [Libellé thème]</div>
<h1 class="display">[Titre ligne 1]<br><span class="txt-[couleur]">[Titre ligne 2]</span></h1>
<p class="lead">[Description courte de la page]</p>

<div class="reading-time">
  <span class="reading-time-badge">🌱 Débutant : ~X min</span>
  <span class="reading-time-badge">🚀 Avancé : ~X min</span>
  <span class="reading-meta">· Mois 2026</span>
</div>

<div class="pill-nav">
  <a href="/[hub]/" class="source-pill">🏠 Hub</a>
  <a href="/[dossier]/[page].html" class="source-pill source-pill-active-[thème]">[Emoji] [Page] ←</a>
</div>

<!-- ── SECTION 1 ── -->
<div class="content-card toc-target reveal" id="section1">
  <h3>[Emoji] [Titre section]</h3>
  <div class="level-section">
    <div data-level="debutant">
      <div class="level-badge">🌱 Débutant</div>
      <p>[Contenu débutant]</p>
    </div>
    <div data-level="avance">
      <div class="level-badge">🚀 Avancé</div>
      <p>[Contenu avancé]</p>
    </div>
  </div>
</div>

<div data-ww-cta="pilote"></div>

<div class="source-block">
  <span class="source-block-label">Sources</span>
  <a href="[url]" target="_blank" rel="noopener" class="source-pill">🔗 [Source]</a>
</div>

<div class="see-also">
  <div class="see-also-label">Voir aussi</div>
  <a href="/[page].html" class="see-also-pill">[Emoji] [Titre]</a>
</div>

</div><!-- fin .page -->

<script>
/* Scripts page — window.addEventListener('load', ...) uniquement, jamais DOMContentLoaded */
window.addEventListener('load', () => {
  /* Init outils WW_Tools si nécessaire */
  if (typeof WW_Tools?.monSimulateur === 'function') WW_Tools.monSimulateur('container-id');
});
</script>

<script src="/assets/data.js"></script>
<script src="/assets/tools.js"></script>
<script src="/assets/ww-bundle.js" defer></script>
</body>
</html>
```

-----

## 🎨 CLASSES DISPONIBLES DANS ww-all.css — référence complète

### Eyebrows (badge thématique)

```
.eyebrow-invest   → cyan  #5BB8D4
.eyebrow-fiscal   → violet #9B59B6
.eyebrow-budget   → vert  #7EC8A0
.eyebrow-immo     → terracotta #C4724A
.eyebrow-crypto   → gold  #E8C23A
.eyebrow-parcours → cyan
.eyebrow-radar    → cyan
```

### Pills actives (page courante)

```
.source-pill-active-invest
.source-pill-active-fiscal
.source-pill-active-budget
.source-pill-active-immo
.source-pill-active-crypto
.source-pill-active-assur
```

### Couleurs texte

```
.txt-rose .txt-cyan .txt-green .txt-muted .txt-muted2
.txt-warn .txt-bold .txt-gold .txt-budget .txt-immo .txt-crypto
```

### Dots légende graphique

```
.dot-green .dot-cyan .dot-rose .dot-gold .dot-purple .dot-orange .dot-muted
```

### Liens colorés inline

```
.link-invest .link-fiscal .link-budget .link-immo .link-rose .link-green
```

### KPI

```
.kpi-grid → .kpi-card → .kpi-label + .kpi-value + .kpi-sub
```

### Simulateur

```
.sim-grid → div → .sim-label + input.sim-input
.sim-select
.sim-result → .sim-result-grid → div → .sim-result-label + .sim-result-value
.sim-result-sub
.sim-result-note
.sim-frais-note
```

### Graphique canvas

```
.chart-container → canvas
.chart-label (titre au-dessus)
.chart-legend → span → .chart-legend-dot/.chart-legend-line + texte
.chart-legend-overlay (flottant en haut à droite du canvas)
.chart-results → div → .chart-result-value + texte
```

### Steps numérotés

```
.steps-list → .step-row → .step-badge.step-badge-green/cyan/rose/purple + span
.myminfin-steps → .myminfin-step → .myminfin-step-num + .myminfin-step-text
.myminfin-step-gold (variante gold)
```

### Profils / grilles

```
.profil-grid → .profil-card → .profil-card-title + .profil-card-sub
.alloc-defensif / .alloc-equilibre / .alloc-croissance (couleurs)
.alloc-profil-badge (titre coloré)
```

### Comparatif 2 colonnes

```
.compare-2col → .compare-col → .compare-col-title + .compare-col-item → span + strong
```

### Waffy tip

```
.waffy-tip → .waffy-tip-img + .waffy-tip-content → strong + texte
```

### Immo

```
.immo-steps → .immo-step → .immo-step-num/.immo-step-num-done + .immo-step-text
.immo-kpi-grid → .immo-kpi-card / .immo-kpi-card-accent → .immo-kpi-label + .immo-kpi-value + .immo-kpi-sub
.checklist-2col → .checklist-col → .checklist-col-title.checklist-col-title-immo + ul
.blur-gate → .blur-gate-content + .blur-gate-overlay → .blur-gate-title + .blur-gate-sub + .btn-unlock
.btn-unlock-socle / .btn-unlock-pilote
.blur-gate-note
```

### Budget

```
.piliers-list → .pilier-card.pilier-card-1/2/3/4 → .pilier-title.pilier-title-1/2/3/4 + .pilier-sub
.ep-options-grid → .ep-option-card.ep-option-a/b → .ep-option-label.ep-option-label-a/b + .ep-option-value + .ep-option-sub
.waterfall-list → .waterfall-step.waterfall-step-1/2/3/4 → .waterfall-num.waterfall-num-1/2/3/4 + .waterfall-text
.brut-net-box → .brut-net-label + .brut-net-rows → .brut-net-row → span + .brut-net-val/.brut-net-val-minus/.brut-net-val-final
.budget-ol
.budget-note
.pension-risk-note
```

### Banques / assurances

```
.frais-list → .frais-item / .frais-item-accent → .frais-item-label + .frais-item-value/.frais-item-value-rose
.td-sub .td-free .table-note
.strategie-list → .strategie-card → .strategie-card-title.strategie-title-[profil] + .strategie-card-text
.comparateur-list → .link-card → .link-card-emoji + div → .link-card-title + .link-card-sub
.assur-principes-grid → .assur-oui/.assur-non → .assur-card-label + .assur-card-text
.td-green-bold .td-gold-bold .td-rose-bold
```

### Invest / sectoriels

```
.core-sat-grid → .core-card.core-card-core/.core-card-sat → .core-card-label + .core-card-value + .core-card-sub
.td-rose
```

### Fiscal

```
.td-warn .td-ok .td-cyan (délais déclaration)
.td-dette-urgent .td-dette-warn .td-dette-ok
.td-mica-ok .td-mica-warn .td-mica-no
.list-muted .list-muted-sm
.myminfin-steps / .myminfin-step / .myminfin-step-num / .myminfin-step-text
.deductions-chart-wrap
```

### Crypto

```
.regime-grid → .regime-card.regime-card-normal/spec/pro → .regime-label.regime-label-* + .regime-taux + .regime-desc
.exemple-box / .exemple-box-green
.cta-addon-crypto → .cta-addon-crypto-title + .cta-addon-crypto-desc + .cta-addon-crypto-btn + .cta-addon-crypto-note
```

### Crypto plateformes

```
.wallet-checklist → .wallet-checklist-item → .wallet-check-box + span
```

### Doctrine (.pg-*)

```
.pg-page .pg-section-inner .pg-section-inner-wide
.pg-story .pg-story-line .pg-story-green
.pg-chip-wrap → .pg-chip
.pg-inaction-card → .pg-inaction-label + .pg-inaction-title + .pg-inaction-grid → .pg-inaction-col → .pg-inaction-value + .pg-inaction-sub
.pg-path → .pg-path-step → .pg-path-num.pg-path-num-green/rose/cyan/grad + .pg-path-text
.pg-path-connector
.pg-quote-block → .pg-quote-text
.pg-cmp-table + .pg-cmp-th-* + .pg-cmp-td + .pg-cmp-check + .pg-cmp-none + .pg-cmp-pilote-col
.pg-plan .featured → .pg-plan-badge + .pg-plan-header + .pg-plan-price-wrap + .pg-plan-desc + .pg-plan-features → li.locked
.pg-plan-eyebrow.pg-plan-eyebrow-green/rose/cyan
.pg-plan-annual-text .pg-plan-note-text
.pg-addon-wrap → .pg-addon-inner → .pg-addon-eyebrow + .pg-addon-title + .pg-addon-desc + .pg-addon-features → .pg-addon-feature → .pg-addon-check
.pg-addon-price-wrap → .pg-addon-price + .pg-addon-price-sub + .pg-addon-cta
.pg-waffy-hint → .pg-waffy-hint-img + .pg-waffy-hint-text
.pg-final-cta-btn
```

### Index accueil (.ww-*)

```
.ww-search-wrap .ww-quiz-results-hidden .ww-section-center
.ww-hero-waffy-img .ww-section-sub-narrow .ww-cta-note
```

### Général

```
.page-subtitle (texte intro gris sous h3)
.reading-meta (date mise à jour)
.pill-nav (conteneur pills nav)
.btn-secondary (bouton secondaire)
.page-padded (padding-top si besoin — rare car .page gère déjà)
```

-----

## ✅ CHECKLIST OBLIGATOIRE sur chaque page créée ou modifiée

```
[ ] 1. Zéro style="" dans tout le HTML (vérification automatique)
[ ] 2. Toutes les classes existent dans ww-all.css (vérification automatique)
[ ] 3. og:image = https://wealthwaffle.be/img/og-image.jpg
[ ] 4. apple-touch-icon présent
[ ] 5. data.js + tools.js + ww-bundle.js dans cet ordre en bas de page
[ ] 6. Zéro progress-bar / back-to-top en dur (injectés par ww-bundle.js)
[ ] 7. Zéro padding-top:80px en dur (géré par .page)
[ ] 8. Scripts init → window.addEventListener('load', ...) — pas DOMContentLoaded
[ ] 9. Liens absolus partout (/invest/etf.html jamais etf.html)
[10] 10. eyebrow avec classe thématique (jamais style=)
[11] 11. pill-nav avec source-pill-active-[thème] pour la page courante
[12] 12. reading-time avec reading-meta (pas de style= sur la date)
[13] 13. kpi-grid si chiffres clés en haut de page
[14] 14. Simulateur inline (point 11) avec résultat inline
[15] 15. Graphique canvas animé (point 77) — IntersectionObserver au scroll
[16] 16. waffy-tip (point 78) dans la section la plus impactante
[17] 17. data-ww-cta="pilote" avant les sources
[18] 18. source-block + see-also en bas de page
[19] 19. TOC sidebar (toc-sidebar) avec ancres #section
[20] 20. ROADMAP.md mis à jour après livraison
```

-----

## 🎯 RÈGLE CSS AVANT TOUTE CRÉATION

**Séquence obligatoire :**

1. Lister les composants visuels de la page (kpi-grid, comparatif, steps, graphique, waffy…)
1. Pour chaque composant : vérifier que les classes existent dans `ww-all.css`
1. Ajouter dans `ww-all.css` les classes manquantes avec commentaire de section `/* ══ THÈME / PAGE ══ */`
1. Écrire le HTML uniquement avec des classes — jamais de `style=`
1. Vérification finale : `re.findall(r'style="[^"]*"', html)` → doit retourner `[]`

**Nommage des classes — règle générique :**

- Préfixe par composant : `.kpi-`, `.sim-`, `.chart-`, `.waffy-`, `.step-`, `.compare-`
- Pas de préfixe par page : jamais `.etf-mon-truc` si `.kpi-card` suffit
- Couleurs via modificateurs : `.pilier-card-1`, `.step-badge-green`, `.regime-card-normal`

-----

## 📋 FORMAT ROADMAP — obligatoire

La ROADMAP est structurée en **groupes par fichiers touchés**, pas en liste plate numérotée.

```
## 🟠 GROUPE X — Nom du groupe (fichiers concernés)
> Description courte

- [ ] **N.** Description courte · détails techniques
- [x] ~~**N.** Description — fait~~
```

Emoji de priorité : 🔴 critique · 🟠 court terme · 🟡 moyen terme · 🔵 long terme · 🟣 dédié · ⚪ futur

-----

## 🔄 MISE À JOUR OBLIGATOIRE après chaque tâche

- **ROADMAP.md** : barrer les points faits, ajouter les nouveaux
- **CLAUDE.md** : si une règle change ou une nouvelle convention est décidée
- **PAGE_NAMES.md** : si un nom/emoji de page change
- **Tracker fichiers finaux** : mettre à jour le statut du fichier livré

-----

## 🗂️ CONVENTIONS DE CODE

```
Chemins        : absolus uniquement (/assets/, /invest/)
IDs outils     : underscores (t_urgence jamais t-urgence)
data-level     : "debutant" ou "avance" uniquement
Ordre scripts  : data.js → tools.js → ww-bundle.js
Init outils    : window.addEventListener('load', ...) jamais DOMContentLoaded
Plan utilisateur: localStorage.getItem('ww_plan') — pas du DOM
```

-----

## 🧩 COMPOSANTS INJECTÉS AUTOMATIQUEMENT PAR ww-bundle.js

- `<div class="progress-bar">` + `<button class="back-to-top">` → injectés si absents
- Nav + Footer → injectés via `<div id="ww-ui-placeholder">`
- **Ne jamais les mettre en dur dans le HTML**

-----

## 🖼️ IMAGES

- Toutes les images → `/img/` uniquement (jamais à la racine, jamais dans `/assets/`)
- Chemins absolus : `/img/waffy-logo.png`
- og:image → toujours `https://wealthwaffle.be/img/og-image.jpg`
- Waffy tips → `/img/waffy/waffy-[nom].png` avec `onerror="this.style.display='none'"`

-----

## 💰 PRIX — source unique

Tous les prix dans `WW_DATA.prix` (data.js). Ne jamais écrire 14,99€ ou 99€ en dur.

```js
WW_DATA.prix.pilote_mensuel    // 14.99
WW_DATA.prix.pilote_annuel     // 99
WW_DATA.prix.radar_mensuel     // 24.99
WW_DATA.prix.radar_annuel      // 199
WW_DATA.prix.crypto_addon      // 49
WW_DATA.prix.trial_days        // 7
```

Trial : 7 jours gratuits. Jamais “sans carte bancaire” — toujours “7 jours gratuits”.

-----

## 🏛️ DOCTRINE — page programme (doctrine.html)

Classes `.pg-*` disponibles dans `ww-all.css`. La page a son propre layout (`.pg-page` + `.page`).

-----

## 🔑 MODE GUIDÉ (K1a+K1b)

- Parcours 5 étapes · jamais de prix avant l’étape 5
- Étape 2/5 : bandeau “Sauvegarde ta progression”
- Étape 3/5 : mini-modal si non connecté + “Continuer quand même”
- Étape 5/5 : CTA “Accès complet · 7 jours gratuits”

-----

## 🔍 PREVIEW

- `?ww_preview=radar|pilote|socle|admin` → cookie 7 jours
- `?ww_preview=off` → efface cookie + localStorage
- `admin` = plan radar + role admin + addon crypto + 999 crédits

-----

## ⚠️ DISCLAIMER OBLIGATOIRE

Crypto, fiscalité, immo, investissement → voix off vidéo + description :
*“Cette page est à titre informatif uniquement et ne constitue pas un conseil financier personnalisé.”*

-----

## 📝 FORMAT DE COMMIT

```
git commit -m "feat(scope): titre" -m "description des changements"
```

-----

## 🚚 WORKFLOW DE LIVRAISON

1. Lire le fichier entier
1. Identifier TOUTES les actions (pas juste le CSS)
1. Ajouter les classes manquantes dans `ww-all.css`
1. Écrire le fichier HTML sans aucun `style=`
1. Vérification automatique : 0 `style=`, 0 classe manquante
1. `present_files` sans explication sauf demande
1. Mettre à jour ROADMAP.md

-----

## 🏗️ ARCHITECTURE PAGES HUB

`WW_DATA.pages` dans `data.js` = source unique de toutes les pages.
Nav, footer, accueil et hubs lisent ce tableau — ajouter une page = modifier `data.js` uniquement.
Pages futures commentées dans `data.js` → décommenter quand créées.

-----

## 🤝 PARTENAIRES À ÉVALUER

Easyvest · Spreds · Blast · Finary · Wallons-y · Odoo · Wallonie Entreprendre / Actya / UCM / Partena

-----

## 🔤 SLOGANS

✅ “La finance, ça se déguste.” · “Dans 10 ans, tu te remercieras.”
❌ “La gaufre, elle juge pas.” · “Sans carte bancaire”