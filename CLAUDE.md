Tu travailles sur le projet WealthWaffle — site de finance personnelle belge francophone.

REPO GITHUB : [ton-repo]/wealthwaffle-be
SITE : wealthwaffle.be (Cloudflare Pages, déploiement auto depuis main)

RÈGLES CODE NON-NÉGOCIABLES :
- Zéro nav/footer/head en dur dans les pages — tout est injecté par /assets/ww-bundle.js
- Tous les chemins sont absolus : /assets/, /invest/, /immo/, etc.
- data-level="debutant" et data-level="avance" uniquement (jamais confirme/expert)
- Les composants nav/footer/ui-components sont dans /assets/ et chargés via fetch('/assets/nav.html')
- data.js = source unique des valeurs fiscales — jamais hardcoder un montant fiscal
- Zéro duplication : outils définis dans /assets/tools.js, appelés via container ID

ARCHITECTURE :
- assets/ — ww-all.css, ww-bundle.js, data.js, tools.js, nav.html, footer.html, ui-components.html
- budget/(4) invest/(11) immo/(7) fiscal/(11) outils/(1) parcours/(4) contenu/(2)
- a-propos/(4) legal/(3) compte/(4) dashboard/(1) radar/(2)
- Racine : index.html, 404.html, sw.js, manifest.json

PROGRAMME DOCTRINE :
- Socle (gratuit, compte requis) · Pilote (14,99€/mois ou 99€/an, 7j essai) · Radar (/radar/)
- Blurs → /compte/inscription.html?plan=pilote selon niveau d'accès
- Auth Supabase à /compte/ · Variables env Cloudflare (jamais en dur)

BRAND :
- Palette : Rose #E87CC3 · Bleu nuit #1E1D38 · Cyan #5BB8D4 · Terracotta #C4724A
- Police : DM Serif Display (titres) + DM Sans (body)
- Mascotte : Waffy (waffle Pixar-style, sage green, yeux slate blue, chaussures cognac)
- Slogans actifs : "La finance, ça se déguste." | "Dans 10 ans, tu te remercieras."
- Slogans retirés (ne jamais utiliser) : "La gaufre, elle juge pas." | "Mange une gaufre, investis l'autre."

CONTENU :
- Deux modes : Débutant (data-level="debutant") et Avancé (data-level="avance")
- Sujet traité sur 2 pages → mention courte + lien sur la page secondaire, développement complet sur la page principale
- Disclaimer obligatoire (crypto/fiscal/immo/invest) : "Cette vidéo est à titre informatif uniquement et ne constitue pas un conseil financier personnalisé."
- Taxe PV 10% = actifs financiers uniquement (ETF, actions, crypto) — PAS l'immo direct
- Immo direct : IPP 16,5% si vente <5 ans (hors résidence principale) · 33% terrain <8 ans

AVANT CHAQUE MODIFICATION :
1. Lire le fichier existant avant d'écrire
2. Ne modifier que ce qui est demandé — ne pas réécrire les sections non concernées
3. Vérifier qu'aucune nav/footer n'est ajoutée en dur
4. Commit avec message clair : "feat(immo): ajout section levier hypothécaire"
