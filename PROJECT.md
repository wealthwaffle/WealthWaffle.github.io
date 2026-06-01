# PROJECT.md — WealthWaffle

## Mission

Finance personnelle belge francophone · wealthwaffle.be · Public : 25-40 ans · Éducatif (pas de conseil financier FSMA)

## Modèle économique

|Plan  |Prix                            |Accès                |
|------|--------------------------------|---------------------|
|Socle |Gratuit + compte                |Guides + 14 outils   |
|Pilote|14,99€/mois · 99€/an · 7j essai |+ 9 outils + Boussole|
|Radar |24,99€/mois · 199€/an · 7j essai|Pilote + feed equity |

Revenus annexes : 9 lead magnets · affiliations · parrainage (filleul mensuel → +1 semaine, annuel → +1 mois via `bonus_days_remaining` Supabase)

## Stack technique

|Service                |Usage                                                       |
|-----------------------|------------------------------------------------------------|
|Cloudflare Pages       |Hébergement (deploy depuis `main`) + variables env          |
|Supabase               |Auth + 13 tables (voir `supabase-schema.sql`)               |
|Stripe                 |Paiements + webhooks                                        |
|Brevo                  |Emails transactionnels + séquences                          |
|Claude API             |Analyse equity Radar (Sonnet 4.5 analyse · Haiku 4.5 filtre)|
|Jina Reader + Firecrawl|Scraping plateformes equity                                 |

Frontend : Vanilla HTML/CSS/JS — zéro framework, zéro build.

## Sources uniques de vérité

- `assets/data.js` — valeurs fiscales 2026 (mise à jour janvier)
- `assets/tools.js` — 27 outils (14 publics/Socle + 9 Pilote + 4 fiscaux pro)
- `assets/ww-bundle.js` — nav + footer + composants + logique globale
- `assets/ww-all.css` — tout le CSS (commentaires de section obligatoires)
- `supabase-schema.sql` — 13 tables Supabase

## Arborescence

```
assets/               nav.html · footer.html · ui-components.html · ww-all.css · ww-bundle.js · data.js · tools.js · search-index.js
budget/               index · epargne · retraite · rente · banques
invest/               index · panorama · etf · allocation · actions · obligations · fonds · equity · alternatives · or · crypto · comparateurs
immo/                 index · achat · financement · locatif · regions · alternatif · renovation
fiscal/               index · independants · societes · management · remuneration · frais · tva · succession · tax-shelter · assurances · fiscaliste
outils/               index (27 outils)
parcours/             index · bases · glossaire · psychologie
contenu/              videos · newsletter · concept-semaine · downloads
a-propos/             index · faq · sources · affiliation
legal/                cgu · privacy · cookies
compte/               connexion · inscription · mot-de-passe · callback · parrainage
dashboard/            index
radar/                index · watchlist [soumettre · boussole · projet → à créer]
admin/                → à créer (auth Supabase whitelist)
doctrine.html        landing commerciale
```

## Organisation du contenu

- Deux niveaux : `debutant` (toujours visible) + `avance` (toggle)
- Un sujet = une page principale · secondaires = résumé + lien
- Piliers : Budget · Épargne · Investissement · Immobilier · Fiscalité · Crypto · Retraite

## Radar V2 — architecture

- **Public** (gratuit) : URL soumise → admin valide → scraping → Claude → relecture → publication
- **Privé** (9,99€) : idem, jamais public
- Rate limiting : 2/jour · 4/semaine (public) · illimité si crédits (privé)
- Cron : 50 plateformes scrapées/jour · détection nouveaux projets vs `scraping_snapshots`
- Affichage projet : fiche récap sticky + 14 volets accordéon (template `radar_analyse.md`)
- Admin `/admin/` : dashboard · radar · erreurs · leads · users

## Identité visuelle

Rose `#E87CC3` · Bleu nuit `#1E1D38` · Cyan `#5BB8D4` · Terracotta `#C4724A`  
DM Serif Display + DM Sans · Mascotte Waffy (gaufre Pixar, vert sauge, yeux bleu ardoise)