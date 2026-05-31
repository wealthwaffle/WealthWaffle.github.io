Je vais migrer ce projet vers Claude Code.

Analyse l'ensemble de notre historique ainsi que les fichiers du projet et génère les 4 documents suivants.

Objectif : conserver uniquement les informations réellement utiles à la reprise du projet, sans duplication ni historique inutile.

# 1. CLAUDE.md

Ce fichier doit être optimisé pour Claude Code.

Contenir uniquement :

- règles de travail ;
- conventions de code ;
- conventions de contenu ;
- contraintes techniques ;
- architecture stable ;
- sources uniques de vérité ;
- règles SEO et éditoriales ;
- éléments indispensables à respecter lors des modifications.

Ne pas inclure :

- roadmap ;
- backlog ;
- historique du projet ;
- état actuel ;
- tâches à faire ;
- décisions abandonnées ;
- explications longues.

Format attendu :

- très dense ;
- peu de prose ;
- listes courtes ;
- aucune répétition.

# 2. PROJECT.md

Document unique décrivant le projet.

Contenir :

- mission ;
- public cible ;
- positionnement ;
- modèle économique ;
- architecture fonctionnelle ;
- architecture technique ;
- arborescence importante ;
- organisation du contenu ;
- taxonomie ;
- maillage interne ;
- décisions structurantes encore actives ;
- dépendances importantes ;
- intégrations externes.

Objectif :

Permettre à un nouveau développeur ou à un nouveau Claude de comprendre complètement le projet sans lire l'historique.

# 3. STATUS.md

Document court.

Contenir uniquement :

- état actuel du projet ;
- fonctionnalités terminées ;
- fonctionnalités en cours ;
- blocages éventuels ;
- priorité actuelle ;
- prochaine étape recommandée.

Maximum 100 lignes.

# 4. ROADMAP.md

Backlog propre et priorisé.

Sections :

- Priorité critique
- Court terme
- Moyen terme
- Long terme
- Idées futures

Supprimer les doublons et les tâches obsolètes.

# Contraintes globales

- Ne rien inventer.
- Supprimer les informations obsolètes.
- Supprimer les répétitions.
- Fusionner les informations équivalentes.
- Conserver uniquement les informations utiles pour le développement futur.
- Privilégier la densité d'information.
- Utiliser Markdown uniquement.
- Générer les 4 fichiers complets.
- Chaque information ne doit apparaître qu'à un seul endroit.
- Si une information appartient à PROJECT.md, ne pas la répéter dans CLAUDE.md.
- Si une information appartient à STATUS.md, ne pas la répéter dans ROADMAP.md.

Avant de générer les fichiers, effectue une déduplication complète des informations.