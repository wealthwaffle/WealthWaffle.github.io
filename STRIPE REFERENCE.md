# WealthWaffle — Référence Stripe complète

> Tout ce qu’il faut savoir pour recréer depuis zéro ou diagnostiquer un problème.

-----

## Compte & Mode

- **Mode** : Live (production)
- **Dashboard** : <https://dashboard.stripe.com>
- **Clé publique** : commence par `pk_live_` → variable Cloudflare `STRIPE_KEY`
- **Clé secrète** : commence par `sk_live_` → variable Cloudflare `STRIPE_SECRET_KEY` (encryptée)

-----

## Produits & Prix existants

### ✈️ Pilote

|       |ID                              |Prix  |Interval|
|-------|--------------------------------|------|--------|
|Produit|`prod_UcbjVA0PWPV8XR`           |—     |—       |
|Mensuel|`price_1TdMWMBn70qxtmXd3YeHsxLM`|14,99€|month   |
|Annuel |`price_1TdMWQBn70qxtmXdbzv5V6Vz`|99€   |year    |

### 📡 Radar

|       |ID                              |Prix  |Interval|
|-------|--------------------------------|------|--------|
|Produit|`prod_Ucbj8PXec9DIsr`           |—     |—       |
|Mensuel|`price_1TdMWWBn70qxtmXdBk9pxfSa`|24,99€|month   |
|Annuel |`price_1TdMWaBn70qxtmXdIZgMN94o`|199€  |year    |

### 🎯 Crédit Radar (one-time)

|       |ID                              |Prix |
|-------|--------------------------------|-----|
|Produit|`prod_Ucbjoy2zYzxhsr`           |—    |
|Prix   |`price_1TdMWfBn70qxtmXdqXwABotQ`|9,99€|

### 🪙 Conformité Crypto (add-on annuel)

|       |ID                              |Prix|Interval|
|-------|--------------------------------|----|--------|
|Produit|`prod_UdK80Tj6nphtWT`           |—   |—       |
|Annuel |`price_1Te3U0Bn70qxtmXd9FUrlqMZ`|49€ |year    |

-----

## Webhook

- **URL** : `https://klhhztxvgudefxmciwfz.supabase.co/functions/v1/stripe-webhook`
- **Secret** : `STRIPE_WEBHOOK_SECRET` → variable dans Supabase Edge Functions
- **Événements à écouter** :
  - `checkout.session.completed`
  - `customer.subscription.deleted`
  - `customer.subscription.updated`
  - `invoice.payment_failed`
  - `invoice.upcoming`
  - `payment_intent.succeeded`

-----

## Trial 7 jours

Le trial **ne se configure pas sur le Price ID** mais lors de la création de la session Checkout.

```javascript
// Dans la page doctrine.html — lors du clic "Commencer"
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  line_items: [{ price: 'price_1TdMWQBn70qxtmXdbzv5V6Vz', quantity: 1 }],
  subscription_data: {
    trial_period_days: 7,        // ← Trial ici, pas sur le Price
    metadata: {
      plan: 'pilote',
      billing_interval: 'yearly',
      price_id: 'price_1TdMWQBn70qxtmXdbzv5V6Vz',
    }
  },
  success_url: 'https://wealthwaffle.be/compte/callback.html?session_id={CHECKOUT_SESSION_ID}',
  cancel_url:  'https://wealthwaffle.be/doctrine.html',
});
```

-----

## Variables Cloudflare Pages à configurer

```
STRIPE_KEY             = pk_live_...    (clé publique)
STRIPE_SECRET_KEY      = sk_live_...    (clé secrète — ENCRYPT dans Cloudflare)
PRICE_PILOTE_MONTHLY   = price_1TdMWMBn70qxtmXd3YeHsxLM
PRICE_PILOTE_ANNUAL    = price_1TdMWQBn70qxtmXdbzv5V6Vz
PRICE_RADAR_MONTHLY    = price_1TdMWWBn70qxtmXdBk9pxfSa
PRICE_RADAR_ANNUAL     = price_1TdMWaBn70qxtmXdIZgMN94o
PRICE_RADAR_CREDIT     = price_1TdMWfBn70qxtmXdqXwABotQ
PRICE_CRYPTO_ADDON     = price_1Te3U0Bn70qxtmXd9FUrlqMZ
```

-----

## Variables Supabase Edge Functions (stripe-webhook)

Dans Supabase → Edge Functions → stripe-webhook → Secrets :

```
STRIPE_WEBHOOK_SECRET     = whsec_...   (depuis Stripe → Webhooks → ton endpoint)
STRIPE_SECRET_KEY         = sk_live_... (même clé secrète)
SUPABASE_URL              = https://klhhztxvgudefxmciwfz.supabase.co
SUPABASE_SERVICE_ROLE_KEY = ...         (depuis Supabase → Settings → API → service_role)
```

-----

## Logique webhook — ce qui se passe à chaque événement

|Événement                                                        |Action                                                                                                               |
|-----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
|`checkout.session.completed` mode `subscription`                 |Met à jour `profiles.plan` + `billing_interval` + `stripe_id`. Active le parrainage si filleul (bonus 7j au parrain).|
|`checkout.session.completed` mode `payment` + plan `crypto_addon`|Active `profiles.has_crypto_addon = true`                                                                            |
|`checkout.session.completed` mode `payment` (crédit)             |`profiles.credits_prives + 1` + insert `credits_transactions`                                                        |
|`customer.subscription.deleted`                                  |`profiles.plan = 'socle'`, `has_crypto_addon = false`                                                                |
|`customer.subscription.updated`                                  |Sync `has_crypto_addon` selon les items de l’abonnement                                                              |
|`invoice.payment_failed`                                         |Log + TODO : email Brevo relance                                                                                     |
|`invoice.upcoming`                                               |Si `bonus_days_remaining > 0` → crée coupon Stripe proportionnel + applique sur abonnement → reset à 0               |

-----

## Recréer depuis zéro

1. Créer un compte Stripe (ou utiliser l’existant)
1. Créer les 4 produits avec leurs prix :
- Pilote : mensuel 14,99€ + annuel 99€
- Radar : mensuel 24,99€ + annuel 199€
- Crédit Radar : one-time 9,99€
- Conformité Crypto : annuel 49€
1. Mettre à jour les Price IDs dans `data.js` → `WW_DATA.prix.*_price_id`
1. Créer le webhook → URL Supabase Edge Function
1. Copier le `STRIPE_WEBHOOK_SECRET` dans Supabase Secrets
1. Configurer les variables Cloudflare Pages

-----

## Prix fondateurs (non affichés encore)

Enregistrés dans `data.js` → `WW_DATA.prix_fondateurs` :

- Pilote futur : 149€/an (vs 99€ actuel)
- Radar futur : 299€/an (vs 199€ actuel)
- Message : “Tarif fondateur bloqué à vie”