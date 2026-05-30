/*
 * ═══════════════════════════════════════════════════════════
 * WealthWaffle — data.js
 * SOURCE UNIQUE DE VÉRITÉ pour toutes les données fiscales
 *
 * MODIFIER CE FICHIER UNE FOIS PAR AN (janvier)
 * Uploader data.js sur OVH → tout le site se met à jour.
 * Ne jamais mettre de chiffres fiscaux en dur dans les pages HTML.
 *
 * Chargement : <script src="data.js"></script> AVANT ww-bundle.js
 * ═══════════════════════════════════════════════════════════
 */

window.WW_DATA = {

  annee: 2026,
  // ─── YOUTUBE API ──────────────────────────────────────────
  // Pour la page videos.html — mise à jour automatique des vidéos
  // Obtenir l'ID de chaîne : YouTube Studio > Paramètres > Informations sur la chaîne
  // Créer la clé API : console.cloud.google.com > YouTube Data API v3
  yt_channel_id:  'UC_TON_CHANNEL_ID',  // ← Remplacer par ton vrai ID de chaîne
  yt_api_key:     'TA_CLE_API_YOUTUBE', // ← Remplacer par ta clé API YouTube Data v3
  yt_max_results: 12,                   // Nombre de vidéos affichées



  // ─── ÉPARGNE PENSION ──────────────────────────────────────
  // SPF Finances — indexé annuellement en janvier
  // https://finances.belgium.be/fr/particuliers/avantages_fiscaux/epargne_pension
  ep_a_plafond:       1050,    // € — plafond option A
  ep_a_taux:          30,      // % — réduction fiscale option A
  ep_b_plafond:       1350,    // € — plafond option B
  ep_b_taux:          25,      // % — réduction fiscale option B
  ep_zone_basse:      1050,    // € — début zone défavorable (= ep_a_plafond)
  ep_zone_haute:      1260,    // € — fin zone défavorable

  // ─── ÉPARGNE LONG TERME (ELT) ────────────────────────────
  // SPF Finances — 6% du revenu net + 174,30 €, max légal indexé
  elt_plafond:        2450,    // € — plafond approximatif 2026
  elt_taux:           30,      // % — réduction fiscale
  elt_code_ipp:       1480,

  // ─── EXONÉRATION INTÉRÊTS D'ÉPARGNE ──────────────────────
  // SPF Finances art. 21 CIR — indexé annuellement
  interets_exoneres:  1050,    // € — premier montant d'intérêts exonéré de PM

  // ─── PLCI — PENSION LIBRE COMPLÉMENTAIRE INDÉPENDANT ─────
  // INASTI — 8,17% du revenu net professionnel, max indexé
  plci_pct:           8.17,    // % du revenu net professionnel
  plci_max:           4080,    // € — plafond 2026 (approximatif)

  // ─── DROITS D'AUTEUR ──────────────────────────────────────
  // SPF Finances — rétabli pour l'IT en 2025, indexé annuellement
  da_plafond:         77220,   // € bruts — plafond annuel
  da_pm:              15,      // % — taux PM
  da_forfait_1_pct:   50,      // % — déduction forfaitaire tranche 1
  da_forfait_1_seuil: 19305,   // € — fin tranche 1
  da_forfait_2_pct:   25,      // % — déduction forfaitaire tranche 2
  da_forfait_2_seuil: 38610,   // € — fin tranche 2

  // ─── PLUS-VALUES BOURSIÈRES 2026 ─────────────────────────
  // Réforme fiscale De Wever — en vigueur 01/01/2026
  pv_taux:            10,      // % — contribution de solidarité
  pv_abattement:      10000,   // € — abattement annuel exonéré

  // ─── TAX SHELTER PME ──────────────────────────────────────
  // CIR art. 145/26 — non indexé, fixé par la loi
  ts_micro_taux:      45,      // % — micro-entreprise (< 10 ETP)
  ts_pme_taux:        30,      // % — PME débutante (< 50 ETP, < 4 ans)
  ts_scaleup_taux:    25,      // % — scale-up (4-10 ans, croissance 10%/an)
  ts_plafond:         100000,  // € — plafond investisseur/an
  ts_code_pme:        2353,    // code IPP micro + PME
  ts_code_scaleup:    2354,    // code IPP scale-up

  // ─── VVPRbis ──────────────────────────────────────────────
  // CIR art. 269 §2 — non indexé
  vvpr_pm_3ans:       15,      // % — actions détenues 3+ ans
  vvpr_pm_1_2ans:     20,      // % — actions détenues 1-2 ans
  pm_standard:        30,      // % — précompte mobilier standard

  // ─── IS — IMPÔT DES SOCIÉTÉS ──────────────────────────────
  // CIR art. 215 — non indexé
  is_reduit:          20,      // % — sur les 100.000 premiers €
  is_plein:           25,      // % — au-delà de 100.000 €
  is_seuil:           100000,  // € — seuil taux réduit

  // ─── RÉSERVE DE LIQUIDATION ───────────────────────────────
  // Art. 184quater CIR — non indexé
  rl_taxe:            10,      // % — taxe lors de la constitution
  rl_pm:              5,       // % — PM à la distribution (après délai)
  rl_delai:           5,       // années — délai minimal avant distribution

  // ─── COMPTE D'ÉPARGNE RÉGLEMENTÉ ─────────────────────────
  // BNB — taux plancher légal
  epargne_taux_base_min: 0.11, // % — taux de base minimum légal
  epargne_prime_min:     0.11, // % — prime de fidélité minimum légale
  epargne_taux_total_min:0.22, // % — total minimum légal (base + fidélité)

  // ─── PRÊTS RÉGIONAUX AUX PME ─────────────────────────────
  // Source : Régions — crédit d'impôt annuel pour le prêteur particulier
  // Wallonie — Prêt Coup de Pouce
  cdp_taux_1:         4,       // % — crédit d'impôt années 1-4
  cdp_taux_2:         2.5,     // % — crédit d'impôt années suivantes
  cdp_garantie:       30,      // % — garantie régionale en cas de défaut
  cdp_max_preteur:    50000,   // € — max par prêteur et par an
  cdp_max_total:      200000,  // € — max total par prêteur
  // Bruxelles — Prêt Proxi
  proxi_taux_1:       4,       // % — crédit d'impôt années 1-3
  proxi_taux_2:       2.5,     // % — crédit d'impôt années suivantes
  proxi_garantie:     30,      // % — garantie régionale
  proxi_max_preteur:  50000,   // € — max par prêteur et par an
  proxi_max_total:    200000,  // € — max total par prêteur
  // Flandre — Winwinlening
  winwin_taux:        2.5,     // % — crédit d'impôt toute la durée
  winwin_garantie:    30,      // % — garantie régionale
  winwin_max_preteur: 75000,   // € — max par prêteur
  winwin_max_emprunt: 300000,  // € — max par emprunteur

  // ─── DROITS D'ENREGISTREMENT IMMO ────────────────────────
  // Source : SPF Finances + Régions
  de_flandre:         2,       // % — résidence propre
  de_wallonie:        3,       // % — résidence principale
  de_bxl:             12.5,    // % — taux standard Bruxelles
  de_bxl_abattement:  200000,  // € — abattement sur base taxable Bruxelles

  // ─── ASSURANCE-GROUPE — TAUX À LA SORTIE ─────────────────
  // CIR — non indexé
  ag_60ans:           20,      // % — taux si sortie à 60 ans
  ag_61ans:           18,      // % — taux si sortie à 61 ans
  ag_62_64ans:        16.5,    // % — taux si sortie 62-64 ans
  ag_65ans:           10,      // % — taux si sortie à 65 ans (optimal)
  ag_inami:           3.55,    // % — cotisation INAMI à la sortie

  // ─── RENTE VIAGÈRE — FRACTION IMPOSABLE ──────────────────
  // CIR art. 20 — non indexé
  rente_moins_40:     80,      // % imposable si début avant 40 ans
  rente_40_49:        65,      // % imposable si début 40-49 ans
  rente_50_59:        55,      // % imposable si début 50-59 ans
  rente_60_64:        40,      // % imposable si début 60-64 ans
  rente_65_74:        25,      // % imposable si début 65-74 ans
  rente_75_plus:      20,      // % imposable si début 75+ ans

  // ─── ONSS ─────────────────────────────────────────────────
  // Source : ONSS — fixé par loi
  onss_salarie:       13.07,   // % — cotisation salariale
  onss_patronal:      25,      // % — cotisation patronale (approx.)

  // ─── INASTI — INDÉPENDANTS ────────────────────────────────
  // Source : INASTI — indexé annuellement
  inasti_principal:   20.5,    // % — taux cotisation à titre principal
  etudiant_max_rev:   7957,    // € — seuil revenus étudiants-entrepreneurs
  mini_statut_seuil:  1855,    // € — seuil mini-statut/an

  // ─── CRYPTO ───────────────────────────────────────────────
  crypto_taux:        10,      // % — contribution solidarité 2026
  crypto_abattement:  10000,   // € — abattement annuel
  crypto_speculateur: 33,      // % — taux spéculateur

  // ─── TOB ──────────────────────────────────────────────────
  // Source : Code des droits et taxes divers — non indexé
  tob_etf_cap:        0.12,    // % — ETF capitalisants
  tob_etf_dist:       0.35,    // % — ETF distribuants
  tob_actions:        0.35,    // % — actions

  // ─── DIVIDENDES ───────────────────────────────────────────
  div_exoneration_pme: 800,    // € nets/an — exonérés pour PME non cotées

};

/*
 * ─── GUIDE MISE À JOUR ANNUELLE ───────────────────────────
 *
 * INDEXÉS chaque année (vérifier en janvier sur finances.belgium.be) :
 *   ep_a_plafond, ep_b_plafond, ep_zone_basse, ep_zone_haute
 *   interets_exoneres, elt_plafond, plci_max
 *   da_plafond, da_forfait_1_seuil, da_forfait_2_seuil
 *   etudiant_max_rev, mini_statut_seuil
 *
 * NON INDEXÉS (changent uniquement par réforme législative) :
 *   ts_*, vvpr_*, is_*, rl_*, ag_*, rente_*, tob_*, onss_*
 *   cdp_*, proxi_*, winwin_*
 *
 * APRÈS MODIFICATION : uploader data.js sur OVH uniquement.
 * Tout le site se met à jour automatiquement.
 * ──────────────────────────────────────────────────────────
 */
