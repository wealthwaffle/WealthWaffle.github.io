# WealthWaffle — Arborescence du site

*Mise à jour : Juin 2026 — Pour le todo complet, voir todo.md*

-----

```
wealthwaffle.be/
│
├── index.html
├── 404.html
├── manifest.json / sw.js
├── doctrine.html
├── supabase-schema.sql
├── todo.md
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
│   ├── etf.html
│   ├── allocation.html
│   ├── actions.html
│   ├── obligations.html
│   ├── fonds.html
│   ├── equity.html
│   ├── alternatives.html
│   ├── or.html
│   ├── crypto.html
│   └── comparateurs.html
│
├── immo/
│   ├── index.html
│   ├── achat.html
│   ├── locatif.html
│   ├── financement.html
│   ├── regions.html
│   ├── alternatif.html
│   └── renovation.html
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
│   ├── tax-shelter.html          ← à scinder en tax-shelter-startup.html + tax-shelter-audiovisuel.html
│   ├── assurances.html
│   └── fiscaliste.html
│
├── outils/
│   └── index.html
│
├── parcours/
│   ├── index.html
│   ├── bases.html
│   ├── glossaire.html
│   └── psychologie.html
│
├── contenu/
│   ├── videos.html
│   ├── newsletter.html
│   ├── concept-semaine.html
│   └── downloads.html
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
├── radar/                        ← V2 en cours
│   ├── index.html
│   ├── watchlist.html
│   ├── soumettre.html            ← à créer
│   ├── boussole.html             ← à créer (Pilote + Radar)
│   ├── projet.html               ← à créer (résumé + 14 accordéons)
│   └── watchlist.html
│
└── admin/                        ← à créer (auth Supabase, toi seul)
    ├── index.html                ← tableau de bord admin
    ├── radar.html                ← relecture et publication projets
    ├── erreurs.html              ← gestion signalements erreurs
    ├── leads.html                ← gestion lead magnet requests
    └── users.html                ← gestion utilisateurs
```

-----

## Pages à créer

|Page                                  |Description                                   |
|--------------------------------------|----------------------------------------------|
|`/fiscal/tax-shelter-startup.html`    |Tax Shelter startups particuliers             |
|`/fiscal/tax-shelter-audiovisuel.html`|Tax Shelter audiovisuel entreprises           |
|`/sitemap.html`                       |SEO                                           |
|`/outils/result.html`                 |Page résultat simulateur                      |
|`/radar/projet.html`                  |Détail projet analysé — résumé + 14 accordéons|
|`/radar/soumettre.html`               |Soumission projets (public/privé)             |
|`/radar/boussole.html`                |Simulateur portefeuille (Pilote + Radar)      |
|`/admin/index.html`                   |Tableau de bord admin                         |
|`/admin/radar.html`                   |Relecture et publication projets Radar        |
|`/admin/erreurs.html`                 |Gestion signalements erreurs                  |
|`/admin/leads.html`                   |Gestion lead magnet requests                  |
|`/admin/users.html`                   |Gestion utilisateurs                          |
|`/radar/soumettre.html`               |Soumission projets                            |
|`/radar/boussole.html`                |Simulateur portefeuille                       |
|`/radar/projet.html`                  |Détail projet analysé                         |
|`/radar/admin.html`                   |Supprimé → remplacé par `/admin/`             |

-----

## 3 actions restantes pour la mise en ligne

1. Remplir les variables Cloudflare env (SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_KEY, 6 Price IDs, BREVO_KEY)
1. Exécuter `supabase-schema.sql` dans l’éditeur SQL Supabase
1. Configurer le webhook Stripe