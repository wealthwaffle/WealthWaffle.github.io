# STATUS.md — WealthWaffle · Juin 2026

## État

Site complet · GitHub Pages (test) · Cloudflare Pages configuré mais pas encore live.

## Terminé

- Toutes les pages de contenu (budget, invest, immo, fiscal, parcours, contenu, a-propos, legal, compte, dashboard)
- Nav 3 menus + réglages ⚙️ · Mode débutant/avancé fonctionnel
- 27 simulateurs (`tools.js`) dont 4 fiscaux pro
- Bandeau lead magnet contextuel · `/contenu/downloads.html`
- Parrainage · Dashboard · Signalement erreur · Preview URL
- `supabase-schema.sql` 13 tables · `programme.html`

## En cours

- Radar V2 — architecture décidée, aucune page créée (voir ROADMAP)
- 8 fichiers lead magnets à créer
- 11 emails Brevo à rédiger

## Blocage principal — mise en ligne

1. Variables Cloudflare env (SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_KEY, 6 Price IDs, BREVO_KEY)
1. Exécuter `supabase-schema.sql` dans Supabase
1. Configurer webhook Stripe

## Prochaine étape

Débloquer la mise en ligne (3 actions) → puis Radar V2 par `/radar/soumettre.html`.