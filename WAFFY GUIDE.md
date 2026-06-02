# WAFFY — Guide de déclinaison par domaine

> Document de référence pour la génération des visuels Waffy.
> Toutes les images vont dans `/img/waffy/` · format PNG fond transparent · 800×800px minimum

-----

## 🎨 Constantes de design (ne changent JAMAIS)

|Élément     |Couleur                                  |Hex                                        |
|------------|-----------------------------------------|-------------------------------------------|
|Corps gaufre|Waffle golden                            |`#D4A574`                                  |
|Sucre glace |Blanc poudré                             |`#F5F5F5` · toujours sur le dessus du corps|
|Yeux        |Slate blue                               |`#4A5568`                                  |
|Chaussures  |Cognac brown                             |`#8B4513`                                  |
|Texture     |Grille gaufre + bords festonnés          |—                                          |
|Style 3D    |Pixar/Disney — rendu photo-réaliste chaud|—                                          |

**La couleur de l’outfit (bras + jambes) change selon le domaine.** Le corps gaufre, les yeux et les chaussures sont toujours identiques.

-----

## 🔤 Base prompt (à compléter avec les variables)

```
Pixar-style 3D rendered waffle character named Waffy. Golden-brown Belgian waffle body with grid texture and powdered sugar dusting on top. Slate blue eyes (#4A5568). Cognac brown shoes (#8B4513). [OUTFIT_COLOR] colored arms and legs — outfit covers arms and legs only, never the waffle body. [POSE]. [EXPRESSION]. [ACCESSORY]. Transparent background. High quality 3D render, warm Pixar lighting, 800x800px.
```

-----

## 🟩 DOMAINE : Parcours & Bases

**Couleur costume :** Sage Green `#9DC183`
**Logique :** couleur de départ, naturelle, rassurante — comme une première pousse

|#|Nom             |Fichier               |Pose                                                       |Expression      |Accessoire                                                  |
|-|----------------|----------------------|-----------------------------------------------------------|----------------|------------------------------------------------------------|
|1|Waffy Professeur|`waffy-professeur.png`|3/4 face, bras gauche levé tenant une craie                |Warm Friendly   |Petit tableau noir avec “Finance 101” et une flèche montante|
|2|Waffy Accueil   |`waffy-accueil.png`   |Face, bras ouverts sur les côtés, paumes vers l’utilisateur|Enthusiastic Joy|Aucun — pose d’accueil pure                                 |

**Prompt complet (Professeur) :**

> Pixar-style 3D rendered waffle character named Waffy. Golden-brown Belgian waffle body with grid texture and powdered sugar dusting. Slate blue eyes. Cognac brown shoes. Sage green (#9DC183) arms and legs. 3/4 front view, left arm raised holding a small piece of chalk, right arm relaxed at side. Warm friendly expression — soft open smile, eyebrows slightly raised, round approachable eyes. Small black chalkboard floating beside him showing “Finance 101” with an upward arrow. Transparent background. Pixar 3D warm lighting.

**Pages :** `/parcours/`, `/parcours/bases.html`, `/parcours/glossaire.html`, `/parcours/psychologie.html`
**Emplacement :** en-tête H1 (à droite du titre) · taille 180px
**Message :** “Je suis là pour t’expliquer, pas pour t’impressionner”

-----

## 🪣 DOMAINE : Budget & Épargne

**Couleur costume :** Teal `#2A9D8F`
**Logique :** eau, flux d’argent maîtrisé, sérénité financière

|#|Nom           |Fichier               |Pose                                                            |Expression         |Accessoire                               |
|-|--------------|----------------------|----------------------------------------------------------------|-------------------|-----------------------------------------|
|3|Waffy Économe |`waffy-economiste.png`|Face, main droite tenant tirelire cochon, main gauche pouce levé|Enthusiastic Joy   |Tirelire rose, petite pièce € qui vole   |
|4|Waffy Banquier|`waffy-banquier.png`  |3/4 gauche, bras croisés décontractés                           |Curious Intelligent|Petit comparatif flottant avec 3 colonnes|

**Prompt complet (Économe) :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar on top, slate blue eyes, cognac shoes. Teal (#2A9D8F) arms and legs. Front view, right hand holding a small pink ceramic piggy bank, left hand thumbs up. Enthusiastic joyful expression — wide smile, eyes slightly squinting with happiness. A small golden euro coin floating near the piggy bank. Transparent background. Pixar warm 3D lighting.

**Pages :** `/budget/`, `/budget/epargne.html`, `/budget/banques.html`, `/budget/assurances.html`
**Emplacement :** encadré `.waffy-tip` milieu de page · taille 120px inline gauche
**Message :** “L’épargne c’est joyeux, pas punitive”

-----

## 📊 DOMAINE : Investissement (ETF, Actions, Allocation)

**Couleur costume :** Emerald Green `#2ECC71`
**Logique :** croissance, argent qui travaille, dynamisme

|#|Nom            |Fichier              |Pose                                                  |Expression             |Accessoire                                              |
|-|---------------|---------------------|------------------------------------------------------|-----------------------|--------------------------------------------------------|
|5|Waffy Analyste |`waffy-analyste.png` |3/4 gauche 45°, bras croisés haut                     |Curious Intelligent    |Petites lunettes rondes fines posées sur le bas du corps|
|6|Waffy Graphiste|`waffy-graphiste.png`|3/4 droite, bras gauche pointant un graphique flottant|Confident Knowing Smile|Mini graphique en courbe montante avec bougies          |

**Prompt complet (Analyste) :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar dusting, slate blue eyes, cognac brown shoes. Emerald green (#2ECC71) arms and legs. 3/4 left 45-degree view, arms crossed high on chest, slightly leaning forward. Curious intelligent expression — left eyebrow slightly raised, knowing side smirk. Tiny round thin-framed glasses perched low on the waffle face. Transparent background. Pixar 3D warm lighting.

**Pages :** `/invest/`, `/invest/etf.html`, `/invest/allocation.html`, `/invest/actions.html`, `/invest/sectoriels.html`, `/invest/fonds.html`
**Emplacement :** section “ce que font les gens qui s’y connaissent” · taille 140px
**Message :** “Crédibilité — Waffy a fait ses devoirs”

-----

## 🥇 DOMAINE : Or, Matières premières, Alternatifs

**Couleur costume :** Mustard Yellow `#E9C46A`
**Logique :** or, richesse tangible, valeur refuge

|#|Nom                 |Fichier                   |Pose                                                                     |Expression             |Accessoire                               |
|-|--------------------|--------------------------|-------------------------------------------------------------------------|-----------------------|-----------------------------------------|
|7|Waffy Collectionneur|`waffy-collectionneur.png`|3/4 droite, bras gauche tenant un lingot d’or, bras droit derrière le dos|Confident Knowing Smile|Lingot doré brillant, petite lueur autour|
|8|Waffy Sommelier     |`waffy-sommelier.png`     |3/4 gauche, tenant une bouteille de vin dans la main gauche              |Playful Sassy          |Bouteille de vin, verre flottant à côté  |

**Prompt complet (Collectionneur) :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Mustard yellow (#E9C46A) arms and legs. 3/4 right view, left arm raised holding a small gleaming gold bar, right arm relaxed behind back. Confident knowing smile — slight smirk, one eyebrow slightly higher, self-assured gaze. Small golden light sparkles around the gold bar. Transparent background. Pixar warm 3D lighting.

**Pages :** `/invest/or.html`, `/invest/alternatives.html`
**Emplacement :** intro de page à droite du H1 · taille 160px
**Message :** “Ce sont des actifs qui ont traversé les crises”

-----

## 🏠 DOMAINE : Immobilier

**Couleur costume :** Sunset Red `#E76F51`
**Logique :** brique, chaleur du foyer, passion belge pour l’immo

|# |Nom                       |Fichier               |Pose                                                                          |Expression             |Accessoire                                   |
|--|--------------------------|----------------------|------------------------------------------------------------------------------|-----------------------|---------------------------------------------|
|9 |Waffy Proprio             |`waffy-proprio.png`   |3/4 droite, bras gauche appuyé sur mini-maison, bras droit tenant clé levée   |Confident Knowing Smile|Maison miniature à sa gauche, clé dorée levée|
|10|Waffy Investisseur Locatif|`waffy-locatif.png`   |Face, bras gauche tenant un trousseau de clés, bras droit montrant un billet €|Enthusiastic Joy       |Trousseau de clés, billet euro flottant      |
|11|Waffy Rénovateur          |`waffy-renovateur.png`|3/4 gauche, tenant un petit marteau, casque de chantier posé sur la tête      |Playful Sassy          |Marteau, casque jaune de chantier            |

**Prompt complet (Proprio) :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Sunset red (#E76F51) arms and legs. 3/4 right view, left arm casually leaning on a small cute miniature house, right arm raised holding a golden key. Confident knowing smile — relaxed self-assured expression. Small charming miniature Belgian-style house beside him. Transparent background. Pixar 3D warm lighting.

**Pages :** `/immo/`, `/immo/achat.html`, `/immo/locatif.html`, `/immo/financement.html`, `/immo/regions.html`, `/immo/alternatif.html`, `/immo/renovation.html`, `/immo/societe.html`
**Emplacement :** encadré conseil “les pièges à éviter” · taille 140px
**Message :** “Je l’ai fait, tu peux le faire aussi”

-----

## 💡 DOMAINE : Fiscalité Particuliers

**Couleur costume :** Deep Purple `#6C3483`
**Logique :** le fisc est mystérieux mais Waffy a les clés — couleur de la sagesse

|# |Nom            |Fichier              |Pose                                                            |Expression   |Accessoire                          |
|--|---------------|---------------------|----------------------------------------------------------------|-------------|------------------------------------|
|12|Waffy Déducteur|`waffy-deducteur.png`|Face, index droit pointé vers le haut, main gauche sur la hanche|Playful Sassy|Ampoule jaune au-dessus de la tête  |
|13|Waffy Déclarant|`waffy-declarant.png`|3/4 gauche, tenant un formulaire, stylo dans l’autre main       |Warm Friendly|Formulaire MyMinfin simplifié, stylo|

**Prompt complet (Déducteur) :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Deep purple (#6C3483) arms and legs. Front view, right index finger pointing upward (eureka gesture), left hand on hip. Playful sassy expression — right eye slightly squinted in a knowing wink, mischievous grin. Small bright yellow light bulb glowing above his head. Transparent background. Pixar 3D warm lighting.

**Pages :** `/fiscal/`, `/fiscal/declaration.html`, `/fiscal/frais.html`, `/fiscal/succession.html`, `/fiscal/fiscaliste.html`
**Emplacement :** à côté des tips “déduction à ne pas rater” · taille 120px inline
**Message :** “La fiscalité c’est un jeu à gagner, pas à subir”

-----

## 🧑‍💻 DOMAINE : Indépendants & TVA

**Couleur costume :** Forest Dark Green `#1B4332`
**Logique :** croissance terrain, sérieux, roots — l’indépendant belge travaille dur

|# |Nom            |Fichier              |Pose                                                         |Expression         |Accessoire                                                        |
|--|---------------|---------------------|-------------------------------------------------------------|-------------------|------------------------------------------------------------------|
|14|Waffy Freelance|`waffy-freelance.png`|3/4 gauche, tenant laptop miniature ouvert, autre bras OK    |Warm Friendly      |Laptop avec graphique montant à l’écran                           |
|15|Waffy TVA      |`waffy-tva.png`      |Face, sourcil relevé, tenant un reçu/facture dans chaque main|Curious Intelligent|Deux factures — une verte (déductible), une rouge (pas déductible)|

**Prompt complet (Freelance) :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Forest dark green (#1B4332) arms and legs. 3/4 left view, left arm holding a small open laptop showing a rising chart on screen, right hand giving a thumbs up. Warm friendly expression — genuine open smile, direct approachable gaze. Transparent background. Pixar 3D warm lighting.

**Pages :** `/fiscal/independants.html`, `/fiscal/tva.html`, `/fiscal/remuneration.html`
**Emplacement :** intro page, à côté du H1 · taille 160px
**Message :** “Je comprends ton quotidien d’indépendant”

-----

## 🏢 DOMAINE : Sociétés & Dirigeants

**Couleur costume :** Charcoal Grey `#2D3436`
**Logique :** sérieux corporate, costume de dirigeant, crédibilité B2B

|# |Nom            |Fichier              |Pose                                                            |Expression             |Accessoire                                                |
|--|---------------|---------------------|----------------------------------------------------------------|-----------------------|----------------------------------------------------------|
|16|Waffy Dirigeant|`waffy-dirigeant.png`|Face, bras croisés haut, posture droite                         |Confident Knowing Smile|Cravate fine sur le corps (seul cas), mallette à ses pieds|
|17|Waffy Holding  |`waffy-holding.png`  |3/4 droite, bras gauche tenant organigramme, bras droit pointant|Curious Intelligent    |Mini organigramme avec “Holding → SRL”                    |

**Prompt complet (Dirigeant) :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Charcoal grey (#2D3436) arms and legs. Front view, arms crossed high on chest, upright confident posture. Confident knowing smile — controlled assured expression, slightly lowered gaze projecting authority with warmth. A small thin necktie on the waffle body. Small leather briefcase at his feet. Transparent background. Pixar 3D warm lighting.

**Pages :** `/fiscal/societes.html`, `/fiscal/management.html`, `/fiscal/remuneration.html`
**Emplacement :** section IS vs IPP · comparatif salaire/dividendes · taille 140px
**Message :** “Je parle d’égal à égal avec le dirigeant”

-----

## ₿ DOMAINE : Crypto

**Couleur costume :** Coral Orange `#F4845F`
**Logique :** énergie volatile, chaleur du marché crypto, dynamisme orange de Bitcoin

|# |Nom                 |Fichier             |Pose                                                                                              |Expression         |Accessoire                                       |
|--|--------------------|--------------------|--------------------------------------------------------------------------------------------------|-------------------|-------------------------------------------------|
|18|Waffy Crypto-curieux|`waffy-crypto.png`  |3/4 gauche, tête légèrement penchée, main droite sous le menton                                   |Curious Intelligent|Symbole ₿ flottant devant lui, lueur orange/jaune|
|19|Waffy Sécurité      |`waffy-securite.png`|Face, tenant un petit hardware wallet (Ledger) dans la main gauche, index droit levé (attention !)|Playful Sassy      |Ledger miniature, cadenas doré flottant          |

**Prompt complet (Crypto-curieux) :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Coral orange (#F4845F) arms and legs. 3/4 left view, right hand under chin in thinking pose, head slightly tilted to the right. Curious intelligent expression — left eyebrow raised, slight knowing side smile, engaged thoughtful gaze. A glowing Bitcoin ₿ symbol floating in front of him with warm orange-yellow light halo. Transparent background. Pixar 3D warm lighting.

**Pages :** `/invest/crypto.html`, `/invest/crypto-plateformes.html`, `/fiscal/crypto.html`, `/outils/fiscal-crypto.html`
**Emplacement :** section fiscalité crypto / intro platefomes · taille 130px
**Message :** “C’est complexe — mais j’ai les réponses”

-----

## 📡 DOMAINE : Radar Equity & Tax Shelter

**Couleur costume :** Ocean Blue `#0077B6`
**Logique :** profondeur, analyse rigoureuse, confiance — comme un radar qui scrute

|# |Nom                 |Fichier                 |Pose                                                            |Expression         |Accessoire                                 |
|--|--------------------|------------------------|----------------------------------------------------------------|-------------------|-------------------------------------------|
|20|Waffy Investisseur  |`waffy-investisseur.png`|3/4 droite, pointant une fusée qui décolle                      |Surprised Excited  |Petite fusée argentée à côté, étoiles      |
|21|Waffy Analyste Radar|`waffy-radar.png`       |3/4 gauche, tenant un dossier d’analyse, loupe dans l’autre main|Curious Intelligent|Dossier avec “RADAR” et icône signal, loupe|

**Prompt complet (Investisseur) :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Ocean blue (#0077B6) arms and legs. 3/4 right view, right arm extended pointing at a small silver rocket launching upward, left arm slightly back for balance. Surprised excited expression — eyes wide open, mouth slightly open in amazement, eyebrows raised high. Small silver rocket with motion trail beside him, tiny star sparkles around. Transparent background. Pixar 3D warm lighting.

**Pages :** `/radar/`, `/invest/equity.html`, `/fiscal/tax-shelter-startup.html`, `/fiscal/tax-shelter-audiovisuel.html`
**Emplacement :** CTA Radar · présentation Tax Shelter · taille 160px
**Message :** “Ce projet peut vraiment décoller”

-----

## ⏳ DOMAINE : Retraite & Rente

**Couleur costume :** Rose `#E87CC3`
**Logique :** couleur WealthWaffle principale — la retraite c’est LE rêve, la couleur signature

|# |Nom        |Fichier          |Pose                                                           |Expression      |Accessoire                                        |
|--|-----------|-----------------|---------------------------------------------------------------|----------------|--------------------------------------------------|
|22|Waffy Zen  |`waffy-zen.png`  |Face, bras ouverts paumes vers le haut, légèrement incliné     |Warm Friendly   |Transat miniature à ses pieds, petite plante verte|
|23|Waffy Rente|`waffy-rente.png`|3/4 gauche, une main tenant un cocktail, l’autre vers l’horizon|Enthusiastic Joy|Cocktail coloré, soleil miniature en arrière-plan |

**Prompt complet (Zen) :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Rose pink (#E87CC3) arms and legs. Front view, both arms open wide with palms facing upward in a serene welcoming gesture, body slightly relaxed. Warm friendly expression — soft gentle smile, half-closed satisfied eyes. A tiny deck chair at his feet, small green potted plant beside him. Transparent background. Pixar 3D warm lighting.

**Pages :** `/budget/retraite.html`, `/budget/rente.html`
**Emplacement :** simulateur “quand puis-je arrêter” · section règle des 4% · taille 150px
**Message :** “Ce futur est accessible — et il ressemble à ça”

-----

## 🔧 DOMAINE : Outils & Simulateurs

**Couleur costume :** Sage Green `#9DC183` (même que Parcours — outils = accessible)

|# |Nom              |Fichier                |Pose                                                        |Expression      |Accessoire                                        |
|--|-----------------|-----------------------|------------------------------------------------------------|----------------|--------------------------------------------------|
|24|Waffy Calculateur|`waffy-calculateur.png`|3/4 droite, tenant calculatrice géante, pointant le résultat|Enthusiastic Joy|Calculatrice avec chiffres qui débordent, confetti|
|25|Waffy Résultat   |`waffy-resultat.png`   |Face, deux pouces levés, léger bond                         |Enthusiastic Joy|Étoiles et confetti autour, rien dans les mains   |

**Prompt complet (Calculateur) :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Sage green (#9DC183) arms and legs. 3/4 right view, left arm holding an oversized colorful calculator, right arm pointing at the calculator display showing a result. Enthusiastic joyful expression — huge smile, eyebrows raised in delight. Small colorful confetti pieces floating around. Transparent background. Pixar 3D warm lighting.

**Pages :** `/outils/`, résultats de simulateurs
**Emplacement :** après résultat de calcul · taille 120px inline
**Message :** “Voilà ce que ça donne pour toi”

-----

## ✈️ DOMAINE : Programme Doctrine

**Couleur costume :** gradient Rose → Cyan (cas unique — couleur signature WW)

|# |Nom         |Fichier           |Pose                                                                         |Expression             |Accessoire                                         |
|--|------------|------------------|-----------------------------------------------------------------------------|-----------------------|---------------------------------------------------|
|26|Waffy Guide |`waffy-guide.png` |Face, bras gauche pointant chemin/escalier montant, boussole dans main droite|Confident Knowing Smile|Escalier miniature montant, petite boussole        |
|27|Waffy Pilote|`waffy-pilote.png`|3/4 droite, casque de pilote, bras levé V de victoire                        |Enthusiastic Joy       |Casque pilote vintage, petit avion en papier à côté|

**Prompt complet (Guide) :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Arms and legs with gradient from rose pink (#E87CC3) to cyan blue (#5BB8D4). Front view, left arm extended forward pointing at a small ascending staircase path, right hand holding a small golden compass. Confident knowing smile — self-assured expression, direct engaging gaze that says “I know the way”. Transparent background. Pixar 3D warm lighting.

**Pages :** `/doctrine.html`
**Emplacement :** séparation entre niveaux Socle/Pilote/Radar · taille 180px centré
**Message :** “Je sais où aller — suis-moi”

-----

## ⚠️ DOMAINE : Erreurs & Accès refusé

**Couleur costume :** Charcoal Grey `#2D3436` (même que Dirigeant — neutralité)

|# |Nom         |Fichier         |Pose                                                              |Expression                         |Accessoire                        |
|--|------------|----------------|------------------------------------------------------------------|-----------------------------------|----------------------------------|
|28|Waffy Désolé|`waffy-oups.png`|Légèrement voûté, bras gauche grattant la tête, regard vers le bas|Sourcils ∧ inversés, sourire penaud|Petit panneau “Oups 🥺” qu’il tient|

**Prompt complet :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Charcoal grey (#2D3436) arms and legs. Front view, body slightly slouched apologetically, left arm raised with hand scratching the top of the waffle in embarrassment, gaze directed slightly downward. Sheepish apologetic expression — eyebrows in inverted arch, small awkward grin. Holding a small sign reading “Oups” in the right hand. Transparent background. Pixar 3D warm lighting.

**Pages :** `404.html`, modals d’accès refusé, page erreur
**Emplacement :** centre de la page / modal · taille 200px centré
**Message :** “Ça arrive — on ne t’abandonne pas”

-----

## 📁 Récapitulatif fichiers `/img/waffy/`

|Fichier                   |Domaine                |Couleur costume            |
|--------------------------|-----------------------|---------------------------|
|`waffy-professeur.png`    |Parcours / Bases       |Sage Green `#9DC183`       |
|`waffy-accueil.png`       |Parcours / Index       |Sage Green `#9DC183`       |
|`waffy-economiste.png`    |Budget / Épargne       |Teal `#2A9D8F`             |
|`waffy-banquier.png`      |Budget / Banques       |Teal `#2A9D8F`             |
|`waffy-analyste.png`      |Investissement         |Emerald Green `#2ECC71`    |
|`waffy-graphiste.png`     |Investissement         |Emerald Green `#2ECC71`    |
|`waffy-collectionneur.png`|Or / Alternatifs       |Mustard Yellow `#E9C46A`   |
|`waffy-sommelier.png`     |Alternatifs            |Mustard Yellow `#E9C46A`   |
|`waffy-proprio.png`       |Immo / Achat           |Sunset Red `#E76F51`       |
|`waffy-locatif.png`       |Immo / Locatif         |Sunset Red `#E76F51`       |
|`waffy-renovateur.png`    |Immo / Rénovation      |Sunset Red `#E76F51`       |
|`waffy-deducteur.png`     |Fiscalité              |Deep Purple `#6C3483`      |
|`waffy-declarant.png`     |Fiscalité / Déclaration|Deep Purple `#6C3483`      |
|`waffy-freelance.png`     |Indépendants           |Forest Dark Green `#1B4332`|
|`waffy-tva.png`           |TVA                    |Forest Dark Green `#1B4332`|
|`waffy-dirigeant.png`     |Sociétés               |Charcoal Grey `#2D3436`    |
|`waffy-holding.png`       |Sociétés / Holdings    |Charcoal Grey `#2D3436`    |
|`waffy-crypto.png`        |Crypto                 |Coral Orange `#F4845F`     |
|`waffy-securite.png`      |Crypto / Sécurité      |Coral Orange `#F4845F`     |
|`waffy-investisseur.png`  |Radar / Equity         |Ocean Blue `#0077B6`       |
|`waffy-radar.png`         |Radar / Analyse        |Ocean Blue `#0077B6`       |
|`waffy-zen.png`           |Retraite               |Rose `#E87CC3`             |
|`waffy-rente.png`         |Rente                  |Rose `#E87CC3`             |
|`waffy-calculateur.png`   |Outils                 |Sage Green `#9DC183`       |
|`waffy-resultat.png`      |Outils / Résultats     |Sage Green `#9DC183`       |
|`waffy-guide.png`         |Programme Doctrine     |Gradient Rose→Cyan         |
|`waffy-pilote.png`        |Doctrine / Pilote      |Gradient Rose→Cyan         |
|`waffy-oups.png`          |Erreurs / 404          |Charcoal Grey `#2D3436`    |
|`waffy-logo.png`          |Logo / Nav / Global    |Sage Green (original)      |
|`waffy-avatar.png`        |Widget chat            |Sage Green (original)      |

-----

## 🎨 Palette couleurs par domaine

|Domaine              |Couleur          |Hex      |Justification                                           |
|---------------------|-----------------|---------|--------------------------------------------------------|
|Parcours & Bases     |Sage Green       |`#9DC183`|Naturel, départ, rassurance — couleur originale de Waffy|
|Outils / Simulateurs |Sage Green       |`#9DC183`|Accessible, ouvert à tous                               |
|Budget & Épargne     |Teal             |`#2A9D8F`|Flux d’argent maîtrisé, sérénité                        |
|Investissement       |Emerald Green    |`#2ECC71`|Croissance, argent qui travaille                        |
|Or & Alternatifs     |Mustard Yellow   |`#E9C46A`|Or, valeur refuge, tangible                             |
|Immobilier           |Sunset Red       |`#E76F51`|Brique, chaleur du foyer, passion belge                 |
|Fiscalité            |Deep Purple      |`#6C3483`|Sagesse, mystère du fisc, Waffy a les clés              |
|Indépendants         |Forest Dark Green|`#1B4332`|Roots, sérieux, travail terrain                         |
|Sociétés & Dirigeants|Charcoal Grey    |`#2D3436`|Corporate, crédibilité B2B                              |
|Crypto               |Coral Orange     |`#F4845F`|Énergie volatile, Bitcoin orange                        |
|Radar & Equity       |Ocean Blue       |`#0077B6`|Profondeur, analyse rigoureuse                          |
|Retraite & Rente     |Rose             |`#E87CC3`|Couleur WW signature — c’est LE rêve                    |
|Programme Doctrine   |Rose → Cyan      |gradient |Couleur identité WealthWaffle                           |
|Erreurs / 404        |Charcoal Grey    |`#2D3436`|Neutralité, pas d’alarme                                |

-----

## 📍 Règles de placement — où et comment

### Les 4 règles d’or

1. **Jamais deux fois par page** — une seule apparition, sinon perd son effet
1. **Jamais dans le texte dense** — il va dans les pauses naturelles
1. **Toujours à un moment émotionnel fort** — stress, réussite, curiosité, transition
1. **Petit et discret** — 80-140px, aligné gauche/droite d’un texte court. Jamais centré en pleine page (sauf 404)

### Les 7 emplacements validés

|#|Emplacement                              |Taille|Waffy recommandé      |Déclencheur émotionnel |
|-|-----------------------------------------|------|----------------------|-----------------------|
|1|`.waffy-tip` milieu de page              |80px  |Thématique de la page |Après section complexe |
|2|Résultat de simulateur                   |120px |Calculateur / Résultat|Surprise / satisfaction|
|3|CTA fin de page (à côté du bouton)       |100px |Guide / Thématique    |Incitation à l’action  |
|4|Page 404 et erreurs                      |200px |Oups                  |Utilisateur perdu      |
|5|Premier bloc débutant (mode 🌱)           |80px  |Professeur            |Rassurer le débutant   |
|6|Onboarding / inscription                 |150px |Guide                 |Transition importante  |
|7|Toast / email confirmation téléchargement|60px  |Thématique            |Post-action            |

### Ce qu’il ne faut JAMAIS faire

- ❌ Dans les tableaux de données
- ❌ Répété si `.waffy-tip` déjà présent sur la page
- ❌ Dans la navigation
- ❌ En pleine largeur sur mobile
- ❌ En animation boucle infinie
- ❌ Sur `doctrine.html` (CTAs déjà chargés)

### Règle finale

> **Waffy apparaît là où l’utilisateur ressent quelque chose.** Jamais là où il lit de l’information froide.

-----

## 🆕 Versions supplémentaires — emplacements spécifiques

### Waffy Onboarding

**Fichier :** `waffy-bienvenue.png`
**Costume :** Rose → Cyan gradient (Doctrine)
**Pose :** 3/4 droite, bras gauche ouvert vers l’utilisateur en geste d’accueil, bras droit tenant une petite boussole
**Expression :** Enthusiastic Joy — grand sourire franc, yeux pétillants
**Accessoire :** Petite boussole dans la main droite, confetti léger autour
**Emplacement :** Page inscription + page bienvenue post-inscription · 150px centré
**Message :** “Bienvenue — commençons par te trouver le bon point de départ”
**Prompt :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Arms and legs with gradient from rose pink (#E87CC3) to cyan (#5BB8D4). 3/4 right view, left arm open toward viewer in welcoming gesture, right hand holding a small golden compass. Enthusiastic joyful expression — big genuine smile, sparkling eyes. Light confetti pieces floating around. Transparent background. Pixar 3D warm lighting.

-----

### Waffy Inquiet (résultat simulateur mauvais)

**Fichier :** `waffy-inquiet.png`
**Costume :** Deep Purple `#6C3483`
**Pose :** Face, main droite sur la joue (geste de réflexion inquiète), bras gauche croisé sous le droit
**Expression :** Sourcils froncés mais pas alarmants, regard vers le bas, bouche légèrement courbée
**Accessoire :** Petit point d’interrogation flottant, bulle de pensée vide
**Emplacement :** Résultat simulateur décevant — avant le texte “voici ce qu’on peut faire” · 120px
**Message :** “C’est pas là où tu veux être — mais voilà le chemin”
**Prompt :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Deep purple (#6C3483) arms and legs. Front view, right hand raised to cheek in worried-thinking pose, left arm crossed underneath. Concerned but not alarmed expression — furrowed brows, gaze slightly downward, small uncertain curve of mouth. Small floating question mark beside him, empty thought bubble above. Transparent background. Pixar 3D warm lighting.

-----

### Waffy Célébration (résultat simulateur excellent)

**Fichier :** `waffy-celebration.png`
**Costume :** Emerald Green `#2ECC71`
**Pose :** Face, deux bras levés en V de victoire, légèrement bondissant
**Expression :** Enthusiastic Joy maximum — bouche grande ouverte, yeux plissés de joie
**Accessoire :** Confetti multicolores, étoiles dorées, petits feux d’artifice
**Emplacement :** Résultat simulateur très positif · 140px
**Message :** “Tu es sur la bonne voie — voilà ce que ça donne en 20 ans”
**Prompt :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Emerald green (#2ECC71) arms and legs. Front view, both arms raised high in V for victory gesture, body slightly lifted as if jumping. Maximum enthusiastic joy — mouth wide open in celebration, eyes squinting with happiness. Colorful confetti, golden stars, mini fireworks bursting around him. Transparent background. Pixar 3D warm lighting.

-----

### Waffy Email (toast / confirmation)

**Fichier :** `waffy-email.png`
**Costume :** Teal `#2A9D8F`
**Pose :** 3/4 droite, main gauche tenant une petite enveloppe ouverte, main droite pouce levé
**Expression :** Warm Friendly — sourire doux et rassurant
**Accessoire :** Enveloppe ouverte avec une lettre qui sort, petite check ✓ verte
**Emplacement :** Toast confirmation email envoyé · 60px · email de livraison lead magnet
**Message :** “C’est en route !”
**Prompt :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Teal (#2A9D8F) arms and legs. 3/4 right view, left hand holding a small open envelope with a letter emerging, right hand thumbs up. Warm friendly expression — soft reassuring smile. Small green checkmark floating near the envelope. Transparent background. Pixar 3D warm lighting.

-----

### Waffy Débutant (mode lecture 🌱)

**Fichier :** `waffy-debutant.png`
**Costume :** Sage Green `#9DC183`
**Pose :** 3/4 gauche, index levé doucement (pas autoritaire), tête légèrement inclinée vers l’utilisateur
**Expression :** Warm Friendly — sourire bienveillant, sourcils légèrement relevés façon “je t’écoute”
**Accessoire :** Petite étiquette “🌱 Version simple” flottante à côté
**Emplacement :** En-tête du bloc débutant quand mode 🌱 actif · 80px inline droite
**Message :** “Version accessible — tu peux toujours voir la version avancée en dessous”
**Prompt :**

> Pixar-style 3D rendered waffle character. Golden-brown waffle body, powdered sugar, slate blue eyes, cognac shoes. Sage green (#9DC183) arms and legs. 3/4 left view, right index finger gently raised (not commanding, more like a soft reminder), head slightly tilted toward viewer. Warm friendly expression — benevolent smile, eyebrows slightly raised in an “I’m here for you” gesture. Small floating label “Version simple 🌱” beside him. Transparent background. Pixar 3D warm lighting.