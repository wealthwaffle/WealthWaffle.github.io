# WealthWaffle — Plans & Accès

> Référence officielle · Mise à jour : Juin 2026

-----

## Grille tarifaire

|Plan                     |Mensuel|Annuel  |Équiv. mensuel|
|-------------------------|------:|-------:|-------------:|
|🟢 **Socle**              |Gratuit|Gratuit |—             |
|✈️ **Pilote**             |~12,49€|**149€**|12,42€        |
|📡 **Radar**              |~16,58€|**199€**|16,58€        |
|✈️🤖 **Pilote Automatique**|~20,75€|**249€**|20,75€        |
|📡🤖 **Radar Automatique** |~24,92€|**299€**|24,92€        |
|💎 **Admin**              |—      |—       |Interne       |

**Add-on Conformité Crypto**

- Standalone : **49€/an**
- Combiné avec un plan actif : **29€/an**

**Trial : 7 jours gratuits** sur tous les plans payants.

-----

## Accès par plan

### 🟢 Socle — Gratuit

**Sans compte :** guides en lecture, 6 simulateurs publics.
**Avec compte (Socle) :** +

- Dashboard + progression + parcours guidé
- Bouton “Marquer comme lu” avec sauvegarde Supabase
- Préférences (niveau, sujet, profil)
- Parrainage

**Simulateurs Socle (8) :**

- Simulateur objectifs financiers
- Rembourser ou épargner ?
- Test fonds d’urgence
- Journal de décisions
- Budget par étape de vie
- Estimateur budget assurances
- Impact taxe plus-value 10%
- Simulateur FIRE

-----

### ✈️ Pilote — 149€/an

Tout Socle +

**Simulateurs Pilote (9) :**

- Impact frais cachés sur 30 ans
- Bon d’État vs compte épargne
- Calculateur épargne pension (A/B optimisé)
- Simulateur obligations
- Optimiseur rémunération dirigeant
- Simulateur crédit hypothécaire
- Rendement locatif net-net
- ETF direct vs Branche 23 sur 35 ans
- Arbre de décision (+ PLCI · IS vs IPP · VVPRbis · Réserve liq.)

-----

### 📡 Radar — 199€/an

Tout Pilote +

**Feed Radar equity :**

- Projets equity et crowdlending belges analysés
- Scoring conviction / risque / liquidité
- Watchlist personnelle
- Page détail avec analyse complète

-----

### ✈️🤖 Pilote Automatique — 249€/an

Tout Pilote +

**Boussole Portefeuille :**

- Saisie manuelle ou import CSV des actifs (ticker, quantité, prix d’achat, date)
- Valorisation automatique des actifs publics (ETF, actions, crypto)
- Valorisation manuelle pour les actifs privés (equity, immo)
- Analyse de diversification :
  - Répartition géographique (EU / US / EM / Autre)
  - Répartition sectorielle (tech / finance / immo / énergie…)
  - Répartition par type d’actif (ETF / immo / cash / crypto / equity privé)
  - Score de corrélation (diversification inter-actifs)
  - Score de risque global
- **Recommandations personnalisées** : “Pour équilibrer ton portefeuille, tu dois acheter X€ de VEUR et Y€ d’obligations”
- Envoi par email des recommandations

**Phase 2 (post-agrément FSMA) :** investissement automatique à leur place.

-----

### 📡🤖 Radar Automatique — 299€/an

Tout Pilote Automatique +

**Boussole + Equity :**

- Toutes les fonctions Boussole du Pilote Automatique
- Les recommandations intègrent les **projets du Feed Radar**
- L’utilisateur définit ses préférences equity (secteur, montant max, risque accepté)
- Suggestions equity personnalisées : “Cette semaine, ce projet Radar correspond à ton profil”
- Envoi par email des suggestions equity

**Phase 2 (post-agrément FSMA) :** gestion complète du portefeuille incluant equity.

-----

### 💎 Admin — Interne

= Radar Automatique + add-on crypto + 999 crédits + accès zones admin.
`plan = 'admin'` → `effectivePlan = 'radar_auto'` dans le bundle.

-----

## Add-on Conformité Crypto

Disponible en supplément de n’importe quel plan payant.

**Contenu :**

- Simulateur fiscal crypto (plus-value, staking, DeFi)
- Rapport Koinly automatique
- Calcul DAC8 / contribution solidarité 10%
- Taux de change historiques (10 devises · mis à jour quotidiennement)

**Prix :**

- Standalone : **49€/an** (`price_1Te3U0Bn70qxtmXd9FUrlqMZ`)
- Combiné avec plan actif : **29€/an** (à créer dans Stripe)

-----

## Logique technique

### PLAN_RANK (ww-bundle.js)

```js
{ socle:1, pilote:2, radar:3, pilote_auto:4, radar_auto:5, admin:5 }
```

### hasSocle / hasPilote / hasRadar / hasAuto

```js
hasSocle  = plan ∈ [socle, pilote, radar, pilote_auto, radar_auto]
hasPilote = plan ∈ [pilote, radar, pilote_auto, radar_auto]
hasRadar  = plan ∈ [radar, radar_auto]
hasAuto   = plan ∈ [pilote_auto, radar_auto]
```

### Contrainte Supabase `profiles.plan`

```sql
CHECK (plan = ANY (ARRAY['socle','pilote','radar','pilote_auto','radar_auto','admin']))
```

### Tables Supabase nouvelles

- `portfolio_assets` — actifs de l’utilisateur (ticker, quantité, prix d’achat, date, valeur actuelle)
- `boussole_analyses` — analyses générées (répartition geo/secteur/type, score, recommandations JSON)

-----

## Stripe — Price IDs à créer

|Produit           |Période          |Prix  |Price ID              |
|------------------|-----------------|-----:|----------------------|
|Pilote            |Mensuel          |12,49€|À créer               |
|Pilote            |Annuel           |149€  |À créer (remplace 99€)|
|Radar             |Mensuel          |16,58€|À créer               |
|Radar             |Annuel           |199€  |Existant              |
|Pilote Automatique|Mensuel          |20,75€|À créer               |
|Pilote Automatique|Annuel           |249€  |À créer               |
|Radar Automatique |Mensuel          |24,92€|À créer               |
|Radar Automatique |Annuel           |299€  |À créer               |
|Crypto Add-on     |Annuel standalone|49€   |Existant              |
|Crypto Add-on     |Annuel combiné   |29€   |À créer               |

-----

## ROADMAP Boussole

### Phase 1 — MVP (à développer)

- [ ] Page `/radar/boussole.html` — saisie portefeuille + affichage analyse
- [ ] Edge Function `analyze-portfolio` — calcul répartition geo/secteur/corrélation + génération recommandations
- [ ] Edge Function `update-asset-prices` — valorisation auto via API publiques (Yahoo Finance / Crypto.com)
- [ ] Envoi email recommandations (Brevo)
- [ ] Import CSV DEGIRO / Trade Republic

### Phase 2 — Post-agrément FSMA

- [ ] Dépôt de fonds (intégration PSP agréé)
- [ ] Ordres automatiques
- [ ] Reporting réglementaire