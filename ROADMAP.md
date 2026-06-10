# ROADMAP WealthWaffle — Mise à jour 2026-06-10 09:37:17

> Groupé par priorité · “attaque le groupe X” ou “attaque le point N”

-----

## 🔴 GROUPE 0 — Mise en ligne (actions manuelles Jonathan)

- [ ] **0a.** Variables Cloudflare ✅ fait
- [ ] **0b.** Webhook Stripe (après accès Stripe)
- [ ] **0c.** Passer son compte en admin après inscription :
  
  ```sql
  UPDATE public.profiles SET plan = 'admin', is_admin = true WHERE email = 'TON@EMAIL.BE';
  ```
- [ ] **0d.** Invoquer `create-stripe-products` une fois Stripe accessible
- [ ] **0e.** Générer les 33 images Waffy via Grok → `/img/waffy/`

-----

## 🔴 GROUPE COL — Système de couleurs (à faire avant tout nouveau CSS)

> Valider et appliquer dans `ww-all.css` + `data.js` + arbre de compétences

### Palette officielle WealthWaffle

|Zone                             |Couleur       |Hex      |Imaginaire                        |
|---------------------------------|--------------|---------|----------------------------------|
|🧇 Global / Nav / Dashboard / Rose|Rose WW       |`#E87CC3`|Identité, chaleur, confiance      |
|💶 Budget                         |Vert menthe   |`#4CAF8A`|Croissance, sécurité, sérénité    |
|📈 Investissement                 |Vert émeraude |`#2ECC71`|Argent qui pousse, rendement      |
|📋 Fiscalité                      |Bleu ardoise  |`#5D7A9E`|Sérieux sans ennui, institutionnel|
|🏠 Immobilier                     |Terracotta    |`#C4724A`|La brique, solide, ancré          |
|₿ Crypto                         |Orange Bitcoin|`#F7931A`|Énergie, risque, Bitcoin          |
|🗺️ Parcours                       |Indigo        |`#6C63FF`|Chemin, orientation, progression  |
|📡 Radar                          |Cyan          |`#5BB8D4`|Veille, technologie, analyse      |

### Actions à faire

- [ ] **COL1.** Mettre à jour les variables CSS dans `ww-all.css` (remplacer les couleurs par thème)
- [ ] **COL2.** Mettre à jour `THEME_COLORS` dans `WW_SkillTree` (bundle.js)
- [ ] **COL3.** Mettre à jour les `.eyebrow-*` classes
- [ ] **COL4.** Mettre à jour les `.source-pill-active-*` classes
- [ ] **COL5.** Mettre à jour les `.dot-*` dans les légendes
- [ ] **COL6.** Vérifier la cohérence visuelle sur 5 pages représentatives

-----

## 🔴 GROUPE PAR — Page de paramétrage onboarding

> 2 minutes max · tout en clics · pas de saisie longue · modifiable à tout moment

- [ ] **PAR1.** Page `/compte/parametres.html` — accessible depuis dashboard + menu profil
- [ ] **PAR2.** Section “Mon profil financier” :
  - Salaire mensuel net (slider ou saisie)
  - Épargne mensuelle souhaitée (%)
  - Objectif principal : [ ] Acheter un bien · [ ] Retraite anticipée · [ ] Liberté financière · [ ] Sécurité · [ ] Faire fructifier
  - Profil risque : slider Sécurité 0% ←→ 100% Croissance
  - Statut : [ ] Salarié · [ ] Indépendant · [ ] Dirigeant · [ ] Étudiant
- [ ] **PAR3.** Section “Mes préférences de rappel” (RGPD-compatible) :
  - Toggle “Recevoir des rappels de progression” (opt-in explicite)
  - Fréquence : [ ] Quotidien · [ ] Hebdomadaire · [ ] Mensuel · [ ] Jamais
  - Jour préféré (si hebdo) : Lundi → Dimanche
  - Heure préférée : matin / midi / soir
  - Ces préférences stockées dans `profiles` + envoyées à Brevo tags
- [ ] **PAR4.** Section “Mon expérience” :
  - Mode par défaut : [ ] 🌱 Débutant · [ ] 🚀 Avancé
  - Style d’expérience : [ ] 🎮 Gamifié · [ ] 📋 Sobre (même contenu, sans animations ni sons)
  - Notifications de mise à jour de pages : [ ] Oui · [ ] Non
- [ ] **PAR5.** Ces données pré-remplissent automatiquement tous les simulateurs
- [ ] **PAR6.** Page présentée automatiquement après inscription (étape 4/4 de l’onboarding)
- [ ] **PAR7.** Colonne `preferences` JSON dans `profiles` Supabase

-----

## 🟠 GROUPE C — Compte & Abonnement

- [ ] **C2.** `dashboard/index.html` — tester avec un vrai compte · valider flux complet

-----

## 🟠 GROUPE B — Edge Functions restantes

- [ ] **EF3.** `notify-admin` — email Brevo à chaque soumission Radar
- [ ] **EF4.** `analyze-project` — scraping Jina+Firecrawl → filtre Haiku → analyse Sonnet → JSON `rapport_ia`
- [ ] **EF5.** `notify-user` — email Brevo à la publication projet Radar
- [ ] **EF6.** `analyze-portfolio` — calcul diversification → recommandations → email Brevo
- [ ] **EF7.** `update-asset-prices` — cron ETF/crypto/actions via APIs

-----

## 🟠 GROUPE GAM — Gamification complète

### Phase 1 — Déjà codé ✅

- [x] ~GAM1. XP par page dans data.js (35 pages)~
- [x] ~GAM2. 5 niveaux globaux (Épargnant → WealthWaffle Master)~
- [x] ~GAM3. Toast XP au checkmark (+pts · +compétence)~
- [x] ~GAM5. Streak — trigger Supabase~
- [x] ~GAM6. Arbre Canvas 37 nœuds~
- [x] ~GAM7. Page progression.html (fantôme non-inscrit)~
- [x] ~GAM8. Suggestion ordre sans verrouillage~
- [x] ~GAM9-11. Grimoire 🗒️ FAB + panel + Supabase~

### Phase 2 — Score & Dashboard (prioritaire)

- [ ] **GAM4.** Score de maîtrise par thème dans dashboard — barres XP animées
- [ ] **GAM16.** Classement anonyme — “vous faites partie des X% les plus avancés”
- [ ] **GAM-SCF.** Score de Confiance Financière (SCF) sur 100 dans le dashboard
  - Monte à chaque page lue, simulateur validé, quiz réussi
  - Baisse légèrement après 14 jours sans connexion (simuler l’oubli)
  - Affiché avec une jauge circulaire style Apple Watch

### Phase 3 — Anneaux & Progression hebdo

- [ ] **GAM-ANN.** 3 anneaux hebdomadaires style Apple Watch dans le dashboard :
  - Anneau 1 : Lecture (pages lues cette semaine)
  - Anneau 2 : Pratique (simulateurs utilisés)
  - Anneau 3 : Rigueur (jours consécutifs actifs)
  - Visuellement incomplets = tension psychologique → envie de fermer l’anneau

### Phase 4 — Badges & Succès

> Noms exacts à conserver tels quels

**Badges Mode Débutant :**

- [ ] 🏆 **“Le Briseur de Mythes”** — lire la première page qui démonte une idée reçue (ex: “Le Livret A rend riche”). Augmente la jauge “Clarté”.
- [ ] 🛡️ **“Vacciné contre l’Inflation”** — terminer le simulateur où son argent fond sur compte courant + tester une solution. Débloque un bouclier visuel sur le dashboard.
- [ ] 🌙 **“Insomniaque Financier”** *(Succès Caché)* — consulter ou valider une quête entre minuit et 5h du matin.
- [ ] 🃏 **“Série Panini : Épargne”** — compléter les 5 micro-pages de la section Bases de l’Épargne. Icône passe du gris au neon.
- [ ] 🔓 **“Curiosité Dangereuse”** *(Succès Caché)* — cliquer sur 5 définitions de mots très techniques en moins de 2 minutes. Message : “+5 en audace”.
- [ ] 🎮 **“Premier Pas”** — marquer sa première page comme lue
- [ ] 🔥 **“3 jours de suite”** — streak de 3 jours
- [ ] 💎 **“Semaine parfaite”** — connecté 7 jours consécutifs
- [ ] 🧇 **“WaffleHead”** *(Succès Caché)* — lire la page À propos en entier

**Badges Mode Avancé :**

- [ ] 🧊 **“L’Analyste Sang-Froid”** — répondre correctement à un cas pratique où le marché s’effondre (valider qu’il ne faut pas vendre en panique). +20 SCF.
- [ ] 📚 **“Le Rat de Bibliothèque de la BCE”** — cliquer sur 5 liens de sources brutes (PDF officiels en bas de page). Design du profil devient plus épuré style “Initié”.
- [ ] ↩️ **“Contre-Courant”** — voter pour l’hypothèse minoritaire lors d’un micro-sondage de fin d’article.
- [ ] ⚔️ **“Rigueur Absolue”** — maintenir sa jauge d’assiduité au max pendant 7 jours consécutifs. Confère un “bouclier anti-oubli” de 7 jours sur le SCF.
- [ ] 🌙 **“Sentinelle des Marchés”** *(Succès Caché)* — lire un article de fond jusqu’à la dernière ligne après 22h.
- [ ] 🔭 **“Oracle”** — prédictions mensuelles toutes correctes (voir GAM-ORACLE)
- [ ] 🔬 **“Chercheur”** — télécharger ou consulter 10 sources officielles (BCE, SPF Finances, BNB)

**Badges communs :**

- [ ] 🌱 **“Premier XP”** — gagner ses premiers points
- [ ] 📖 **“Lecteur assidu”** — 10 pages lues
- [ ] 🗺️ **“Explorateur”** — visiter les 5 sections du site (Budget/Invest/Fiscal/Immo/Parcours)
- [ ] 💬 **“Voix de la communauté”** — voter dans 5 micro-sondages
- [ ] 🧮 **“Calculateur”** — utiliser 5 simulateurs différents
- [ ] 🗒️ **“Greffier”** — écrire sa première note dans le grimoire

### Phase 5 — Interactions sociales légères

- [ ] **GAM-VOTE.** Micro-votes binaires dans les textes (Oui/Non) — ex : “As-tu déjà vendu en panique ?”
  - Après 5-6 votes → pop-up profil psychologique : “Ton profil : L’Audacieux Émotif — 2 forces, 1 faiblesse”
  - Stocké localement + anonymement en Supabase pour les stats communautaires
- [ ] **GAM-PRED.** Sondage prédictif en bas d’article — ex : “L’immo va monter ou baisser ?”
  - Dès le vote → graphique communautaire temps réel
  - Revenir plus tard pour voir si la prédiction était juste
- [ ] **GAM-STAT.** Statistiques de positionnement après lecture :
  - Mode débutant : “67% des jeunes pensent que la bourse est un casino. Tu viens de passer dans les 33% qui ont compris.”
  - Mode avancé : “Seuls 12% des lecteurs ont poussé l’analyse jusqu’ici.”
- [ ] **GAM-ORACLE.** Page “Les Prédictions de la Sentinelle” (mensuelle) :
  - 3 questions fermées sur l’actualité financière réelle belge
  - Votes verrouillés → vérification 1 mois plus tard avec données réelles BNB/BCE
  - Badge “Oracle Vérifié” si 100% de réussite

### Phase 6 — Mécanique monnaie virtuelle

- [ ] **GAM-MONNAIE.** Monnaie virtuelle “Francs WW” :
  - Gagnés en lisant des pages, validant des quiz, maintenant le streak
  - Utilisables pour : débloquer des “Spoilers” de fin d’article (flou levé), accéder à des analyses secrètes
  - Taux d’intérêt composé : +2% par jour si connexion quotidienne (simulation pédagogique des intérêts)
- [ ] **GAM-CONTRAT.** Contrat d’engagement virtuel :
  - Avant une section dense : “Mise 200 Francs WW que tu finis ce dossier avant demain soir”
  - Réussi : +100 bonus · Échoué : pièces brûlées
  - Aversion à la perte → retour garanti
- [ ] **GAM-PAPER.** Paper Trading virtuel :
  - Capital de départ : 10.000 Francs WW par utilisateur
  - Dans les articles : bouton “Miser 1.000 Francs WW sur cette stratégie”
  - Dashboard affiche les performances réelles des “paris” placés
  - Connecté aux vraies données de marché via API

### Phase 7 — Contenu interactif avancé

- [ ] **GAM-BOSS.** Pages “Boss de Fin” — notion ultra-complexe avec design différent :
  - Message : “⚠️ Zone de Haute Rigueur : Cette page sépare les amateurs des professionnels”
  - Design modifié (fond plus sombre, typographie différente)
  - Décharge de fierté amplifiée à la validation
- [ ] **GAM-BLIND.** Blind Test graphique historique :
  - Graphique boursier réel sans labels ni dates
  - “Si tu as 10.000€ à ce moment, tu fais quoi ? Acheter / Vendre / Ne pas bouger”
  - Révélation : “C’était Apple en 2008, tu as multiplié par 50” ou “C’était la crise des Tulipes 1637”
- [ ] **GAM-CLIFF.** Cliffhanger de fin de page :
  - Avant le bouton de sortie : “⚠️ Le piège fatal : 90% des gens commettent une erreur à ce stade exact et perdent 20% de leurs gains dès la première année. Découvre comment l’éviter →”
  - Lien vers la page suivante logique
- [ ] **GAM-NEXT.** “Prochaine étape dans 5s” en bas de page (mode débutant) :
  - Décompte visuel avec barre de progression
  - Mode avancé : “Fil d’Ariane Logique” → bouton sobre “[Continuer : L’impact sur les taux directeurs]”
- [ ] **GAM-DAILY.** Daily Graph — 1 graphique mystère par jour :
  - Un graphique à décoder en 1 clic
  - Change chaque jour à minuit
  - Crée un réflexe de connexion quotidienne
- [ ] **GAM-SABOTAGE.** Bouton “Mode Sabotage” en bas de page :
  - Montre comment ruiner ses finances sur le thème de la page
  - Ex page épargne : “Voici le guide pour perdre 5.000€ en 3 ans à coup sûr en Belgique”
  - Psychologie inversée — biais de négativité → très mémorable
- [ ] **GAM-FRICTION.** Friction d’apprentissage valorisante :
  - Question au milieu d’une page qui déverrouille le texte suivant
  - Si réponse juste : “Bien joué, tu as capté le piège” + texte suivant visible
  - Si fausse : renvoi vers le paragraphe exact + invite à relire
- [ ] **GAM-METEO.** Météo financière dans le dashboard :
  - Mode débutant : “Indice de Température du Marché” → 🔴 En surchauffe / 🟢 En solde
  - Mode avancé : 3 widgets macro (Taux BCE · Inflation · Rendement obligataire)
  - Données en temps réel → crée le réflexe de consultation quotidienne

### Phase 8 — Outil Bâtisseur (expert)

- [ ] **GAM-DECK.** Bouton ➕ “Ajouter à ma boîte à outils” sur formules/définitions clés :
  - Ne stocke que des IDs (quelques octets par user) → zéro poids DB
  - Dashboard affiche les blocs sélectionnés comme un “deck de cartes”
  - Effet IKEA : l’utilisateur a l’impression d’avoir construit quelque chose
- [ ] **GAM-PDF.** Générateur de fiche PDF personnalisée :
  - L’utilisateur coche les chapitres/formules au fil de la lecture
  - Bouton “Générer ma feuille de route” → PDF propre téléchargé
  - Aucun stockage côté serveur une fois le PDF généré
- [ ] **GAM-SCAFFOLD.** Bouton Easter Egg en fin de page débutant :
  - “[Débloquer la formule mathématique brute pour les curieux]”
  - Si cliqué → texte avancé affiché + badge de profil évolue
  - Pont invisible entre mode débutant et avancé

### Phase 9 — Statistiques belges chocs (électrochocs textuels)

> À insérer en “Pop-ups d’impact” ou “Notes de marge” dans les pages concernées

- [ ] **GAM-STAT-EP.** Page Épargne : “Les Belges laissent dormir ~300 milliards d’euros sur leurs comptes d’épargne (BNB). Tu fais partie de ce club ?” → lien vers solution
- [ ] **GAM-STAT-PEN.** Page Retraite : “En Belgique, le jour de ta retraite, l’État divise légalement tes revenus par deux (taux de remplacement ~40-50%, l’un des plus bas de l’OCDE). Tu as un plan ?”
- [ ] **GAM-STAT-INV.** Page Investissement/Actions : “Moins de 10-15% des ménages belges détiennent des actions en direct (FSMA/Eurostat). En lisant cette page, tu sors de la norme.”
- [ ] **GAM-STAT-TOB.** Page Fiscalité : “Le fisc belge te fait un cadeau rare : 0% d’impôt sur tes gains en bourse si tu investis sagement. Mais il te coince à l’entrée avec la TOB. Apprends à optimiser tes frictions fiscales ici.”
- [ ] **GAM-STAT-IMMO.** Page Immo : “72% des Belges ont une brique dans le ventre. Mais est-ce une bonne stratégie en 2026 avec la hausse des taux ? Fais le calcul brut.”

-----

-----

## 🟠 GROUPE PROFIL — Page profil & données utilisateur

> Migration Supabase déjà faite (2026-06-10 09:49:37) — 30 colonnes ajoutées à `profiles`

### Données collectées (avec finalité déclarée RGPD)

|Champ                   |Type     |Finalité                                                             |
|------------------------|---------|---------------------------------------------------------------------|
|`date_naissance`        |date     |Personnalisation (“tu as 30 ans, dans 35 ans…”) + conformité paiement|
|`region`                |text     |Optimisation fiscale régionale (Wallonie/BXL/Flandre)                |
|`genre`                 |text     |Ton des contenus — optionnel, non obligatoire                        |
|`code_alias`            |text     |Nom de code investisseur (“Le Bâtisseur”)                            |
|`salaire_net_mensuel`   |int      |Pré-remplit les simulateurs                                          |
|`epargne_mensuelle`     |int      |Pré-remplit les simulateurs                                          |
|`epargne_existante`     |int      |Capital de départ dans les calculs                                   |
|`charges_mensuelles`    |int      |Budget disponible calculé automatiquement                            |
|`objectif_principal`    |text     |Parcours personnalisé                                                |
|`horizon_investissement`|text     |Court / Moyen / Long terme                                           |
|`profil_risque`         |int 0-100|Slider sécurité ↔ croissance                                         |
|`statut_pro`            |text     |Salarié / Indépendant / Dirigeant / Étudiant…                        |
|`secteur_activite`      |text     |Optionnel — personnalisation contenu                                 |
|`situation_familiale`   |text     |Impacte déductions IPP belges                                        |
|`nb_enfants_charge`     |int      |Allocations, déductions                                              |
|`proprietaire`          |boolean  |Oriente conseils immo                                                |
|`niveau_connaissance`   |text     |Auto-évaluation débutant/intermédiaire/avancé                        |
|`style_experience`      |text     |Gamifié ou sobre                                                     |
|`commitment_text`       |text     |Engagement personnel Cialdini                                        |
|`reminder_enabled`      |boolean  |Opt-in RGPD explicite                                                |
|`reminder_frequency`    |text     |daily / weekly / monthly                                             |
|`reminder_day`          |text     |Lundi → Dimanche                                                     |
|`reminder_hour`         |int      |Heure préférée 0-23                                                  |
|`scf_score`             |int      |Score Confiance Financière /100 (commence à 15)                      |
|`badges`                |jsonb    |Liste des badges débloqués                                           |
|`deck_ids`              |jsonb    |Blocs sauvegardés (boîte à outils)                                   |
|`calibration_score`     |int      |Score test calibration /100                                          |
|`onboarding_done`       |boolean  |Onboarding complété                                                  |
|`onboarding_step`       |int      |Étape en cours                                                       |

### Pages à créer/mettre à jour

- [ ] **PRO1.** `compte/profil.html` — section “Mon identité” :
  - Prénom · Nom · Date de naissance · Région (dropdown) · Genre (optionnel)
  - Mention RGPD inline : “Ces données restent privées et servent uniquement à personnaliser ton expérience”
- [ ] **PRO2.** `compte/profil.html` — section “Ma situation financière” :
  - Salaire net mensuel (slider 0-10.000€)
  - Épargne mensuelle souhaitée (slider %)
  - Capital déjà épargné (champ)
  - Charges mensuelles (champ)
  - → Ces données pré-remplissent tous les simulateurs automatiquement
- [ ] **PRO3.** `compte/profil.html` — section “Mon profil investisseur” :
  - Objectif principal (6 boutons visuels avec icônes)
  - Horizon (3 boutons : Court / Moyen / Long)
  - Profil risque (slider animé : 🛡️ Sécurité ←→ 🚀 Croissance)
  - Statut pro (6 boutons)
  - Situation familiale + enfants à charge (impacte déductions IPP)
  - Propriétaire ou locataire
- [ ] **PRO4.** `compte/profil.html` — section “Mes préférences” :
  - Mode d’expérience (Gamifié / Sobre) — toggle animé
  - Rappels de progression (opt-in avec toggle + choix fréquence/jour/heure)
  - Notifications mises à jour pages (opt-in)
  - Mon engagement (textarea 1 phrase)
- [ ] **PRO5.** `compte/profil.html` — section “Mon code alias” :
  - Affichage du nom de code actuel
  - Bouton “Régénérer mon alias”
  - Carte de membre exportable PNG
- [ ] **PRO6.** Logique de personnalisation dans `ww-bundle.js` :
  - Si `region = 'wallonie'` → mettre en avant les aides wallonnes dans les pages concernées
  - Si `statut_pro = 'independant'` → afficher les sections indépendants en premier
  - Si `profil_risque < 30` → désactiver les recommandations crypto/equity dans l’arbre
  - Si `nb_enfants_charge > 0` → mettre en avant les déductions familiales IPP
- [ ] **PRO7.** Pré-remplissage automatique des simulateurs depuis le profil :
  - `WW_Tools.init()` lit `localStorage.ww_profile_cache` (sync depuis Supabase au login)
  - Chaque simulateur vérifie les champs pertinents et les injecte au chargement

## 🟡 GROUPE SIM — Sauvegarde des simulations

- [ ] **SIM1.** Case à cocher “💾 Sauvegarder ce calcul” dans chaque simulateur
- [ ] **SIM2.** Table Supabase `saved_simulations` (user_id · tool_id · inputs JSON · result JSON · saved_at)
- [ ] **SIM3.** Section “Mes simulations sauvegardées” dans le dashboard
- [ ] **SIM4.** Les données du profil PAR3 pré-remplissent les simulateurs au chargement
- [ ] **SIM5.** Bouton “Comparer avec ma situation” sur tous les simulateurs

-----

## 🟡 GROUPE EMAIL — Rappels personnalisés

> RGPD : opt-in explicite · formulation “rappel de progression” pas “newsletter”

- [ ] **EMAIL1.** Colonnes dans `profiles` : `reminder_enabled` · `reminder_frequency` · `reminder_day` · `reminder_hour`
- [ ] **EMAIL2.** Brevo — segment dynamique par fréquence/jour/heure préférée
- [ ] **EMAIL3.** Template email rappel : “Ton arbre de compétences t’attend — tu étais à X% la semaine dernière”
- [ ] **EMAIL4.** Template email streak en danger : “Ton streak de X jours se termine dans 4h — reviens vite”
- [x] **EMAIL5.** Template email mise à jour page : “La page [X] vient d’être mise à jour avec [changement précis] — revoir le passage”
- [ ] **EMAIL6.** Template email module inachevé (Zeigarnik) : “Ton module [Budget] est bloqué à 75%. Il ne te reste que 2 min pour le valider définitivement.”
- [ ] **EMAIL7.** Tous les emails pointent vers l’ancre précise de la page concernée

-----

## 🟡 GROUPE MIS — Badges “Mis à jour” sur les pages

- [ ] **MIS1.** Attribut `data-updated="YYYY-MM-DD"` sur les paragraphes mis à jour
- [ ] **MIS2.** CSS : badge 🆕 discret en marge avec la date
- [ ] **MIS3.** Notification dashboard : “X pages que tu as lues ont été mises à jour”
- [ ] **MIS4.** Email automatique si page consultée mise à jour (opt-in dans PAR4)

-----

## 🟡 GROUPE MOT — Mots-clés cliquables (Grimoire des Initiés)

- [ ] **MOT1.** Mots techniques soulignés dans les textes → pop-over 2 lignes à l’hover/tap
- [ ] **MOT2.** Métaphore simple dans le pop-over (mode débutant) + définition brute (mode avancé)
- [ ] **MOT3.** Clic sur le mot → s’ajoute au Grimoire + s’allume en couleur dans le texte
- [ ] **MOT4.** Grimoire des Initiés : profil évolue selon nombre de mots collectés :
  - 0-5 : *Citoyen lambda*
  - 6-20 : *Infiltré*
  - 21-50 : *Initié*
  - 51+ : *Maître du Jargon*

-----

## 🟡 GROUPE F — Outils & Simulateurs

- [ ] **F1.** Guillomètre — 5 questions → diagnostic “où tu perds de l’argent”
- [ ] **F2.** Simulateur enveloppe — salaire + épargne → matelas + capacité d’investissement
- [ ] **F3.** Simulateur Tax Shelter — impôt estimé + réduction
- [ ] **F4.** `sitemap.xml` — généré automatiquement
- [ ] **F5.** `ww_markAsRead()` en fin de chaque simulateur dans `tools.js`
- [ ] **F-CURSEUR.** Simulateur curseurs intérêts composés ultra-visuel (3 curseurs max) :
  - Épargne mensuelle / Durée / Niveau risque (3% prudent → 8% agressif)
  - Courbe qui s’envole en temps réel, codes couleur, équivalences concrètes
- [ ] **F-CIGALE.** Widget “Dilemme du Samedi Soir” :
  - Slider 100% Cigale → 100% Fourmi
  - En temps réel : gratification immédiate vs futur dans 20 ans (ex: voyage Rome gratuit)
- [ ] **F-CRISE.** Simulateur de crise / monstre Inflation :
  - L’utilisateur entre son épargne actuelle
  - Graphique animé : l’argent grignoté par “Inflation” mois après mois
  - Bouton suivant : “Découvrir le bouclier contre l’inflation”

-----

## 🔵 GROUPE L — Boussole Portefeuille (Pilote Auto + Radar Auto)

- [ ] **L1.** `/radar/boussole.html` — saisie actifs
- [ ] **L2.** Import CSV DEGIRO / Trade Republic
- [ ] **L3.** EF7 `update-asset-prices`
- [ ] **L4.** EF6 `analyze-portfolio`
- [ ] **L5.** Affichage analyse + recommandations

-----

## 🔵 GROUPE R — Radar V2

- [ ] **R1.** `/radar/soumettre.html`
- [ ] **R3.** Cron scraping 50 plateformes
- [ ] **R4.** JSON `rapport_ia` complet
- [ ] **R5.** TDM cliquable + sticky sidebar
- [ ] **R6.** Radar flouté public → CTA
- [ ] **R7.** Cron reset compteurs

-----

## 🟣 GROUPE G — Brevo + Lead magnets

- [ ] **G1-G8.** 8 guides PDF/Excel à créer
- [ ] **G9.** Upload Cloudflare R2
- [ ] **G10-G13.** Flux livraison lead magnets
- [ ] **G14-G26.** Séquences emails onboarding + upsell

-----

-----

## 🔴 GROUPE ONBOARD — Architecture d’expérience débutant (priorité absolue)

> C’est le flux complet de J0 à J7 qui transforme un visiteur en utilisateur accro.
> Chaque étape est pensée pour maximiser la rétention avant même l’inscription.

### J0 — Arrivée sur le site

- [ ] **ONB1.** Hero page repensée — une seule question, pas de texte :
  - “Ton argent dort ou travaille ?” → [Il dort] [Il travaille]
  - Le choix détermine le ton du quiz suivant (pas le contenu, le ton)
- [ ] **ONB2.** Quiz 3 questions — 60 secondes max :
  - Q1 : “Ton boss de fin ?” → [ ] Acheter un appart · [ ] Retraite à 45 ans · [ ] Voyager sans compter
  - Q2 : “Tu épargnes ?” → [ ] Jamais · [ ] Un peu · [ ] Régulièrement
  - Q3 : “La bourse pour toi ?” → [ ] Casino · [ ] Mystère total · [ ] Un outil comme un autre
- [ ] **ONB3.** Résultat immédiat AVANT inscription :
  - “Profil détecté : L’Épargnant Prudent” (ou 6 profils selon les réponses)
  - **150 XP déjà attribués** (Endowed Progress — les gens ont l’impression d’avoir déjà commencé)
  - **Nom de code** généré selon le profil (voir ONB4)
  - “Voici ton parcours personnalisé en 6 étapes” — aperçu de l’arbre grisé
- [ ] **ONB4.** Système de noms de code (alias d’investisseur) :
  - Généré selon les réponses quiz · jamais le prénom
  - Exemples : “Le Bâtisseur” · “L’Architecte” · “Le Faucon” · “Le Stratège Discret” · “L’Explorateur” · “La Sentinelle”
  - Affiché partout dans le dashboard et les emails à la place du prénom
  - Renforce l’identité investisseur (James Clear — Atomic Habits)
- [ ] **ONB5.** CTA inscription reformulé :
  - PAS “Créer un compte” → **“Sauvegarder mon profil et mes 150 XP”**
  - L’utilisateur ne crée pas un compte. Il sauvegarde sa progression.
- [ ] **ONB6.** Page de paramétrage 2 min après inscription (voir GROUPE PAR) :
  - Salaire / épargne / objectif / profil risque / préférences rappels
  - Tout en clics — pas de saisie longue
  - Ces données pré-remplissent tous les simulateurs

### J1-J7 — Premiers jours

- [ ] **ONB7.** Email J1 “Bienvenue, [Nom de code]” :
  - Rappel de son engagement formulé au quiz
  - Sa première quête débloquée avec lien direct
  - Son niveau actuel : 🌱 Épargnant · 150 XP
- [ ] **ONB8.** Dashboard J1 — état initial pensé :
  - Arbre de compétences : tout grisé sauf 1 nœud allumé (la première page recommandée)
  - 3 anneaux hebdomadaires à 0% — tension visuelle immédiate
  - SCF affiché à 15/100 (pas 0 — Endowed Progress)
  - Message : “Il te manque 350 XP pour passer Investisseur”
- [ ] **ONB9.** Première page lue — séquence de feedback :
1. Checkmark animé + toast XP
1. Anneau qui se remplit (dopamine)
1. Cliffhanger en bas : “90% des gens ratent l’étape suivante…”
1. Suggestion page suivante avec timer 5s (annulable)
- [ ] **ONB10.** Email J2 “Streak : 🔥 2 jours” :
  - Ton : surpris, pas condescendant — “Tu es revenu. Bon sang.”
  - “Il ne reste que 4h pour ne pas perdre ton streak”
  - 1 seul lien — pas de menu, pas de distraction
- [ ] **ONB11.** J3 : Concept du jour (Variable Reward — machine à sous) :
  - 1 stat choc belge tirée au sort parmi 50 entrées — jamais la même
  - Format : 1 chiffre + 1 phrase + 1 lien vers la page concernée
  - Change chaque jour à minuit
- [ ] **ONB12.** J5 : Premier badge débloqué — “Le Briseur de Mythes” :
  - Notification dashboard + email si pas connecté depuis 24h
  - Animation badge qui s’allume
- [ ] **ONB13.** J7 : Lettre du futur soi (Claude API) :
  - Générée depuis profil : âge · salaire · objectif · habitudes actuelles
  - Format : lettre à la 1ère personne depuis soi-même dans 20 ans
  - “Dans 20 ans, voici ce que tu aurais voulu avoir su à ton âge…”
  - Stockée dans le dashboard · partageble

-----

## 🟠 GROUPE PSY — Psychologie avancée (nouvelles mécaniques)

### Identité & Appartenance

- [ ] **PSY1.** Carte de Membre animée (dashboard) :
  - Style carte bancaire : nom de code · niveau · SCF · badges principaux
  - Exportable en PNG · partageable LinkedIn/stories
  - Acquisition organique gratuite
- [ ] **PSY2.** Identité pas comportement — formulation dans tous les textes :
  - PAS “Lis 3 pages” → “En tant qu’investisseur niveau Stratège, voici ce que tu dois savoir”
  - Les emails de rappel utilisent le nom de code + le niveau
  - Chaque XP gagné = renforcement de l’identité, pas juste un score
- [ ] **PSY3.** Engagement écrit personnel (“Commitment & Consistency” — Cialdini) :
  - Dans l’onboarding : “Formule ton engagement en une phrase”
  - Ex : “Je m’engage à épargner 200€/mois d’ici septembre”
  - Stocké dans `profiles.commitment_text`
  - Rappelé mot pour mot dans les emails de rappel personnalisés

### Biais cognitifs

- [ ] **PSY4.** Sunk Cost vertueux — reformuler la progression :
  - PAS “Il te reste 8 pages” → “Tu as déjà investi 40 minutes ici. Ne gâche pas ça.”
  - Affiché dans le dashboard et les emails de relance
  - Particulièrement puissant pour un site finance (les utilisateurs comprennent le coût irrécupérable)
- [ ] **PSY5.** Endowed Progress généralisé :
  - 150 XP de départ à l’inscription (pas 0)
  - SCF commence à 15/100 (pas 0)
  - Message : “Tu as déjà des bases — WealthWaffle a détecté ton niveau de départ”
- [ ] **PSY6.** Test de calibration — “Tes intuitions sont-elles fiables ?” :
  - 5 questions sur des faits financiers belges réels
  - Ex : “Quel % des Belges investissent en bourse ?” → réponse + réalité
  - Score de calibration : “Tes intuitions sont calibrées à X%”
  - Conclusion : “C’est pour ça que ce site existe.”
  - Accessible depuis la page d’accueil et le parcours débutant
- [ ] **PSY7.** Before/After chiffré en bas des pages importantes :
  - “Avant cette page, 73% des lecteurs pensaient que X. Après, 91% ont changé d’avis.”
  - Données des micro-votes collectés réellement au fil du temps
  - Au début : estimations plausibles · Ensuite : données réelles
- [ ] **PSY8.** Peak-End Rule — placement éditorial :
  - La dernière chose vue sur chaque page = stat choc OU victoire (XP gagné)
  - Jamais finir sur un tableau froid ou une liste
  - La page la plus difficile du site placée AVANT la plus satisfaisante (pas à la fin)
  - Note éditoriale dans CLAUDE.md pour les futures pages
- [ ] **PSY9.** Moment de Vérité hebdomadaire (email lundi matin) :
  - 1 seule question — pas de leçon
  - Ex : “Si tu perdais 30% de ton portefeuille demain, tu ferais quoi ?”
  - La réponse ouvre une page dédiée sur le site
  - Très faible friction — très fort engagement

### Social Proof & Comparaison

- [ ] **PSY10.** Social proof hyperlocal (pas générique) :
  - PAS “10.000 utilisateurs” → “247 salariés bruxellois ont lu cette page ce mois-ci”
  - PAS “Économise de l’argent” → “Les indépendants qui ont lu cette page économisent en moyenne 1.800€/an”
  - Données anonymisées depuis Supabase · région/statut détectés depuis le profil
- [ ] **PSY11.** Poison de la comparaison positive (privé, jamais public) :
  - “Tu es dans le top 8% des utilisateurs les plus actifs cette semaine”
  - Visible uniquement par l’utilisateur dans son dashboard
  - Jamais affiché aux autres — flatte l’ego sans pression sociale
  - Calcul dynamique depuis Supabase (% réel)
- [ ] **PSY12.** FOMO calibré — widget “Ce que tu as manqué” :
  - PAS les news générales → ciblé sur SA situation :
  - “Pendant ton absence de 5 jours : 3 pages que tu suivais ont été mises à jour · les taux BCE ont bougé de 0,25% · ton streak a failli tomber”
  - Affiché dans le dashboard au retour après 3+ jours d’absence

### Outils émotionnels

- [ ] **PSY13.** Lettre du futur soi (Claude API — voir ONB13) :
  - Générée en JSON structuré via Claude API
  - Paramètres : âge · salaire · objectif · épargne actuelle · niveau de risque choisi
  - Ton : chaleureux, pas moralisateur — “voici ce que j’aurais voulu savoir”
  - Accessible 1 fois par an depuis le dashboard · se régénère si profil mis à jour
- [ ] **PSY14.** Simulateur “Regret Anticipé” :
  - Pas de curseurs de gains → curseurs de pertes si inaction
  - “Voilà combien tu auras perdu en pouvoir d’achat dans 20 ans en ne faisant rien”
  - Graphique animé — l’argent grignoté mois après mois par l’Inflation
  - Bouton final : “Découvrir le bouclier” → page solution correspondante
- [ ] **PSY15.** Variable Reward — Concept du jour :
  - 1 contenu surprise par jour parmi 200+ entrées
  - Formats variés : stat choc · erreur classique · truc contre-intuitif · formule secrète · anecdote historique belge
  - Change à minuit · crée le réflexe de connexion quotidienne
  - Le même utilisateur ne voit jamais deux fois la même entrée

-----

## 🟡 GROUPE UX — Expérience de lecture

- [ ] **UX1.** Barre de lecture scroll (fine ligne colorée sur le bord de l’écran) :
  - Couleur = couleur de la section (budget=vert · fiscal=bleu ardoise · etc.)
  - Notre cerveau déteste laisser une tâche à 80% → pousse à finir l’article
  - Différent de la progress bar actuelle (celle-ci suit le scroll de la page)
- [ ] **UX2.** Mots-clés cliquables → micro-bulle 2 lignes :
  - Mode débutant : métaphore simple (“Le TER c’est comme les frais de gestion d’un appart”)
  - Mode avancé : définition précise + source officielle
  - Clic → mot s’ajoute au Grimoire + s’allume dans le texte
- [ ] **UX3.** Bouton “Mode Lecture Rapide” (mode avancé) :
  - Surligne automatiquement les concepts structurels et les chiffres clés
  - Le reste du texte passe à 40% d’opacité
  - Permet de scanner un article de 15 min en 3 min
- [ ] **UX4.** Bouton “Voir la version avancée” en bas des pages débutant :
  - Easter egg discret : “[Voir la formule mathématique brute pour les curieux]”
  - Si cliqué → texte avancé revealed + badge évolue
  - Pont invisible débutant → avancé
- [ ] **UX5.** Design “Mode Avancé” radicalement différent :
  - Typographie plus dense · interligne réduit · couleurs plus sobres
  - Style Bloomberg terminal / rapport institutionnel
  - Pas de couleurs pop · pas d’emojis dans les titres · données brutes en avant
  - L’expert se sent dans son environnement
- [ ] **UX6.** Estimation de temps Medium-style (déjà partiellement là) :
  - Ajouter : “Niveau de technicité : Élevé / Moyen / Accessible”
  - Mode débutant : temps de lecture + nb d’interactions
  - Mode avancé : temps + sources disponibles + niveau de technicité

-----

## 🟡 GROUPE COULEURS-APP — Application couleurs dans le code

> À faire en une passe après validation COL1-COL6

- [ ] **CAPP1.** Variables CSS globales dans `ww-all.css` :
  
  ```css
  --color-ww:       #E87CC3;  /* Rose WW — Global */
  --color-budget:   #4CAF8A;  /* Vert menthe */
  --color-invest:   #2ECC71;  /* Vert émeraude */
  --color-fiscal:   #5D7A9E;  /* Bleu ardoise */
  --color-immo:     #C4724A;  /* Terracotta */
  --color-crypto:   #F7931A;  /* Orange Bitcoin */
  --color-parcours: #6C63FF;  /* Indigo */
  --color-radar:    #5BB8D4;  /* Cyan */
  ```
- [ ] **CAPP2.** Remplacer tous les hex en dur dans `.eyebrow-*` par `var(--color-*)`
- [ ] **CAPP3.** Remplacer dans `WW_SkillTree.THEME_COLORS`
- [ ] **CAPP4.** Remplacer dans les `.source-pill-active-*`
- [ ] **CAPP5.** Arbre de compétences : couleurs des nœuds depuis variables CSS
- [ ] **CAPP6.** Barre de scroll UX1 : couleur selon `--color-[section]` courante

-----

## ⚪ GROUPE LONG-TERME — Vision (ajouts)

- [ ] **LT1.** Bourse du Savoir — cours dynamique des articles (voir K-BOURSE)
- [ ] **LT2.** Guerre des Clans — Écureuils vs Loups (voir K-CLAN)
- [ ] **LT3.** Oracle Vérifié mensuel (voir K-ORACLE)
- [ ] **LT4.** Paper Trading 10.000 Francs WW (voir GAM-PAPER)
- [ ] **LT5.** Contrat d’engagement virtuel avec mise (voir GAM-CONTRAT)
- [ ] **LT6.** Anneau Apple Watch style — version physique (notification push si appli mobile)
- [ ] **LT7.** Mode Sabotage — guide pour ruiner ses finances (voir GAM-SABOTAGE)
- [ ] **LT8.** Blind Test graphique historique (voir GAM-BLIND)
- [ ] **LT9.** Nom de code partageable — badge LinkedIn “Investisseur niveau Stratège WealthWaffle”

## 🟡 GROUPE E — Pages de contenu restantes

- [ ] **E1.** `/sitemap.html`
- [ ] **E9.** `/invest/portefeuilles.html`
- [ ] **E10.** `/invest/ia-finance.html`
- [ ] **E11.** `/invest/incubateurs.html`
- [ ] **E12.** `/invest/club-investissement.html`
- [ ] **E13.** `/a-propos/partenaires.html`
- [ ] **E14.** `/contenu/newsletter-archive.html`
- [ ] **E15.** `/parcours/aide.html`

-----

## ⚪ GROUPE K — Vision long terme

- [ ] **K1.** Mode “Rails” — parcours guidé linéaire
- [ ] **K2.** IAwaffle V2 — 3 modes
- [ ] **K3.** Multilangue FR · NL · DE · EN
- [ ] **K4.** API Bolero / Keytrade / Finary
- [ ] **K5.** API crypto + Koinly
- [ ] **K6.** Partenariat gestionnaire de fonds
- [ ] **K7.** Plateforme equity directe (agrément FSMA)
- [ ] **K8.** Incubateur startup WW
- [ ] **K9.** Odoo back-office
- [ ] **K-CLAN.** Guerre des Clans invisible :
  - Choix à l’inscription : Écureuils (Sécurité/Immo/Frugalité) vs Loups (Risque/Bourse/Croissance)
  - Stats par clan sur chaque page/graphique
  - Compétition tribale passive → saine émulation
- [ ] **K-BOURSE.** Bourse du Savoir — cours dynamique des articles :
  - Plus un article est lu aujourd’hui → son “cours” monte
  - Article délaissé → cours s’effondre
  - Bonus de points pour lire les articles “en baisse”
- [ ] **K-ORACLE.** Page “Les Prédictions de la Sentinelle” (mensuel) :
  - 3 questions sur l’actualité financière belge réelle
  - Votes verrouillés → vérification 1 mois plus tard avec données BNB/BCE
  - Badge “Oracle Vérifié” si 100% réussite

-----

## 📋 CLAUDE.md — Règles à appliquer

> Ces règles sont actives dès maintenant

1. **Timestamp obligatoire** sur chaque fichier modifié :
- HTML : `<!-- Last modified: YYYY-MM-DD HH:MM:SS -->` dans `<head>`
- JS/CSS : `/* Last modified: YYYY-MM-DD HH:MM:SS */` en tête de fichier
1. **Couleurs** : toujours utiliser les variables CSS `--color-budget`, `--color-invest`, etc. — jamais les hex en dur
1. **Mode débutant/avancé** : toutes les animations/sons/bling uniquement en mode débutant. Mode avancé = information dense, sobre, respectueux.
1. **Simulations** : toujours proposer une case “Sauvegarder” en bas de chaque outil
1. **Badges** : noms exacts dans la ROADMAP — ne jamais les renommer sans accord