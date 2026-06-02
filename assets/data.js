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
  // ─── PROGRAMME DOCTRINE — PRIX ────────────────────────────
  // Modifier ICI quand les prix changent — se propage partout
  // Ne jamais mettre les prix en dur dans les pages HTML
  prix: {
    pilote_mensuel:    14.99,  // € — Pilote mensuel
    pilote_annuel:     99,     // € — Pilote annuel (facturé en une fois)
    pilote_mensuel_eq: 8.25,   // € — équivalent mensuel si annuel
    radar_mensuel:     24.99,  // € — Radar mensuel
    radar_annuel:      199,    // € — Radar annuel (facturé en une fois)
    radar_mensuel_eq:  10.75,  // € — équivalent mensuel si annuel
    crypto_addon:      49,     // € — Add-on Conformité Crypto (annuel)
    trial_days:        7,      // jours — période d'essai gratuite
  },

  // ─── STATISTIQUES SITE ────────────────────────────────────
  // Modifier ICI quand on ajoute des pages / outils / guides
  stats: {
    nb_pages:       58,   // pages de contenu
    nb_simulateurs: 27,   // outils et simulateurs
    nb_guides:       3,   // lead magnets disponibles
    nb_themes:       5,   // thèmes couverts (budget, invest, immo, fiscal, crypto)
  },

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

  // ─── PAGES DU SITE ────────────────────────────────────────
  // Source unique — nav, footer, accueil, hubs lisent ce tableau
  // Ajouter une page ici = elle apparaît partout automatiquement
  // themes : budget · invest · immo · fiscal · parcours · outils · contenu · programme
  // level  : 'all' = tout le monde · 'pilote' · 'radar'
  pages: [

    // ── PARCOURS ─────────────────────────────────────────────
    { url:'/parcours/bases.html',       emoji:'🧭', titre:'Par où commencer ?',           description:'Les bases pour débuter sans se perdre',                        theme:'parcours', level:'all'    },
    { url:'/parcours/',                 emoji:'📍', titre:'Mon parcours personnalisé',     description:'Un chemin guidé selon ton profil et tes objectifs',             theme:'parcours', level:'all'    },
    { url:'/parcours/psychologie.html', emoji:'🪞', titre:'Mindset & biais cognitifs',     description:'Comprendre ses biais pour mieux investir',                      theme:'parcours', level:'all'    },
    { url:'/parcours/glossaire.html',   emoji:'📖', titre:'Glossaire',                     description:'60+ termes financiers expliqués simplement',                    theme:'parcours', level:'all'    },

    // ── BUDGET ───────────────────────────────────────────────
    { url:'/budget/',                   emoji:'🗂️', titre:'Gérer son budget',              description:'Reprendre le contrôle de ses finances au quotidien',            theme:'budget',   level:'all'    },
    { url:'/budget/epargne.html',       emoji:'🪣', titre:'Épargner efficacement',          description:'Fonds d\'urgence, épargne long terme, stratégies',              theme:'budget',   level:'all'    },
    { url:'/budget/banques.html',       emoji:'🏧', titre:'Quelle banque choisir ?',        description:'Comparatif banques belges et néobanques',                       theme:'budget',   level:'all'    },
    { url:'/budget/assurances.html',    emoji:'🛡️', titre:'Assurances — quoi garder ?',    description:'Quoi garder, quoi supprimer, combien prévoir',                  theme:'budget',   level:'all'    },
    { url:'/budget/retraite.html',      emoji:'⏳', titre:'Préparer sa retraite',           description:'Les 4 piliers pension et comment les optimiser',                theme:'budget',   level:'all'    },
    { url:'/budget/rente.html',         emoji:'🔥', titre:'Vivre de son capital',           description:'Règle des 4%, décumulation, liberté financière',               theme:'budget',   level:'all'    },

    // ── INVESTISSEMENT ───────────────────────────────────────
    { url:'/invest/',                   emoji:'🗺️', titre:'Quel placement choisir ?',      description:'Tour d\'horizon de tous les placements disponibles',            theme:'invest',   level:'all'    },
    { url:'/invest/panorama.html',      emoji:'🌍', titre:'Tour d\'horizon des placements', description:'Comprendre les grandes familles d\'actifs',                    theme:'invest',   level:'all'    },
    { url:'/invest/allocation.html',    emoji:'⚖️', titre:'Répartir son argent',            description:'Construire un portefeuille équilibré selon son profil',         theme:'invest',   level:'all'    },
    { url:'/invest/etf.html',           emoji:'📊', titre:'ETF — Guide complet',            description:'DCA, VWCE, fiscalité TOB — tout sur les ETF en Belgique',      theme:'invest',   level:'all'    },
    { url:'/invest/sectoriels.html',    emoji:'🔬', titre:'ETF thématiques & sectoriels',   description:'IA, santé, énergie verte — surpondérer un secteur',             theme:'invest',   level:'all'    },
    { url:'/invest/fonds.html',         emoji:'🆚', titre:'Fonds actifs vs ETF',            description:'Comprendre la différence et choisir',                          theme:'invest',   level:'all'    },
    { url:'/invest/actions.html',       emoji:'📈', titre:'Bourse & actions',               description:'Investir en actions individuelles depuis la Belgique',          theme:'invest',   level:'all'    },
    { url:'/invest/obligations.html',   emoji:'🏛️', titre:'Obligations & Bons d\'État',    description:'Bons d\'État belges, obligations d\'entreprise, rendements',    theme:'invest',   level:'all'    },
    { url:'/invest/alternatives.html',  emoji:'🍷', titre:'Au-delà de la bourse',           description:'Vin, art, forêts, crowdlending — les alternatifs',              theme:'invest',   level:'all'    },
    { url:'/invest/or.html',            emoji:'🥇', titre:'Or & matières premières',        description:'Lingots, ETF or, fiscalité — investir dans l\'or',             theme:'invest',   level:'all'    },
    { url:'/invest/crypto.html',        emoji:'₿',  titre:'Crypto — Guide',                 description:'Bitcoin, Ethereum, fiscalité belge, stratégies',                theme:'invest',   level:'all'    },
    { url:'/invest/crypto-plateformes.html', emoji:'💳', titre:'Plateformes & Wallets',    description:'Exchanges belges, cold wallets, checklist sécurité',            theme:'invest',   level:'all'    },
    { url:'/invest/equity.html',        emoji:'🚀', titre:'Equity & Tax Shelter',           description:'Investir dans des startups belges et réduire ses impôts',      theme:'invest',   level:'all'    },
    { url:'/invest/comparateurs.html',  emoji:'🔗', titre:'Comparateurs officiels',         description:'Outils officiels FSMA et BNB pour comparer',                   theme:'invest',   level:'all'    },

    // ── IMMOBILIER ───────────────────────────────────────────
    { url:'/immo/',                     emoji:'🏠', titre:'Investir dans la pierre',        description:'L\'immobilier belge de A à Z',                                 theme:'immo',     level:'all'    },
    { url:'/immo/achat.html',           emoji:'🔑', titre:'Devenir propriétaire',           description:'Droits d\'enregistrement, notaire, étapes clés',               theme:'immo',     level:'all'    },
    { url:'/immo/financement.html',     emoji:'💳', titre:'Financer son achat',             description:'Crédit hypothécaire, apport, assurance solde restant dû',      theme:'immo',     level:'all'    },
    { url:'/immo/locatif.html',         emoji:'💶', titre:'Générer des loyers',             description:'Rendement locatif, fiscalité, gestion locative',               theme:'immo',     level:'all'    },
    { url:'/immo/renovation.html',      emoji:'🔨', titre:'Rénover & revendre',             description:'Primes régionales, TVA 6%, rendement avant/après',             theme:'immo',     level:'all'    },
    { url:'/immo/regions.html',         emoji:'🇧🇪',titre:'Bruxelles, Wallonie, Flandre',  description:'Droits d\'enregistrement et avantages par région',             theme:'immo',     level:'all'    },
    { url:'/immo/alternatif.html',      emoji:'🏗️', titre:'Immo sans être propriétaire',   description:'SIR, SCPI, crowdfunding immobilier, tokénisation',              theme:'immo',     level:'all'    },
    { url:'/immo/societe.html',         emoji:'🏢', titre:'Passer son immo en société',     description:'SRL, avantages IS, seuil de bascule, exit strategy',           theme:'immo',     level:'pilote' },

    // ── FISCALITÉ ────────────────────────────────────────────
    { url:'/fiscal/',                   emoji:'💡', titre:'Payer moins d\'impôts',          description:'Hub fiscalité belge — particuliers, indépendants, sociétés',   theme:'fiscal',   level:'all'    },
    { url:'/fiscal/declaration.html',   emoji:'📝', titre:'Remplir sa déclaration',         description:'Guide MyMinfin, codes, délais, déductions à ne pas rater',     theme:'fiscal',   level:'all'    },
    { url:'/fiscal/crypto.html',        emoji:'🪙', titre:'Fiscalité Crypto 2026',          description:'3 régimes, FIFO, step-up, franchise 10K€, déclaration',        theme:'fiscal',   level:'all'    },
    { url:'/fiscal/independants.html',  emoji:'🧑‍💻',titre:'Je suis indépendant',           description:'Cotisations, frais, PLCI, TVA — guide complet',                theme:'fiscal',   level:'all'    },
    { url:'/fiscal/societes.html',      emoji:'📉', titre:'Optimiser sa société',           description:'IS, VVPRbis, réserve de liquidation — les leviers fiscaux',    theme:'fiscal',   level:'pilote' },
    { url:'/fiscal/remuneration.html',  emoji:'💰', titre:'Comment se payer ?',             description:'Salaire vs dividendes, optimisation rémunération dirigeant',   theme:'fiscal',   level:'pilote' },
    { url:'/fiscal/frais.html',         emoji:'🧾', titre:'Frais déductibles',              description:'Quels frais déduire en tant que salarié ou indépendant',       theme:'fiscal',   level:'all'    },
    { url:'/fiscal/tva.html',           emoji:'💱', titre:'TVA & franchise',                description:'Régimes TVA, franchise de taxe, déclarations',                 theme:'fiscal',   level:'all'    },
    { url:'/fiscal/tax-shelter-startup.html',      emoji:'🌱', titre:'Tax Shelter Startups',      description:'Réduction IPP 25-45% en investissant dans des startups belges', theme:'fiscal', level:'all' },
    { url:'/fiscal/tax-shelter-audiovisuel.html',  emoji:'🎬', titre:'Tax Shelter Audiovisuel',   description:'Exonération IS 310% pour les sociétés — productions belges',   theme:'fiscal', level:'pilote' },
    { url:'/fiscal/assurances.html',    emoji:'🔐', titre:'Assurances fiscales',            description:'EIP, PLCI, assurance groupe — déduire ses assurances',         theme:'fiscal',   level:'pilote' },
    { url:'/fiscal/succession.html',    emoji:'🤝', titre:'Protéger ses proches',           description:'Succession, donation, planification patrimoniale',              theme:'fiscal',   level:'all'    },
    { url:'/fiscal/management.html',    emoji:'🏛️', titre:'Créer une holding',              description:'Société de management, avantages fiscaux, structure',          theme:'fiscal',   level:'pilote' },
    { url:'/fiscal/plus-value.html',    emoji:'📉', titre:'Limiter l\'impôt sur ses gains', description:'Plus-values financières et immobilières — taux et exonérations',theme:'fiscal',  level:'all'    },
    { url:'/fiscal/fiscaliste.html',    emoji:'⚖️', titre:'Trouver un fiscaliste',          description:'Quand consulter un expert et comment le choisir',              theme:'fiscal',   level:'all'    },

    // ── OUTILS ───────────────────────────────────────────────
    { url:'/outils/',                   emoji:'🔧', titre:'Calculer ma situation',          description:'27 simulateurs interactifs — résultats instantanés',           theme:'outils',   level:'all'    },
    { url:'/outils/fiscal-crypto.html', emoji:'🪙', titre:'Calculateur Fiscal Crypto',      description:'FIFO, step-up 2025, franchise 10K€ — rapport Excel MyMinfin',  theme:'outils',   level:'pilote' },

    // ── CONTENU ───────────────────────────────────────────────
    { url:'/contenu/videos.html',          emoji:'🎬', titre:'Vidéos',                      description:'Toutes les vidéos WealthWaffle classées par thème',            theme:'contenu',  level:'all'    },
    { url:'/contenu/downloads.html',       emoji:'📥', titre:'Guides PDF',                  description:'8 guides téléchargeables — budgets, ETF, crypto, immo...',    theme:'contenu',  level:'all'    },
    { url:'/contenu/newsletter.html',      emoji:'📬', titre:'Newsletter',                  description:'Rejoindre la newsletter hebdomadaire',                         theme:'contenu',  level:'all'    },
    { url:'/contenu/concept-semaine.html', emoji:'💡', titre:'Concept de la semaine',       description:'Un concept financier expliqué en 2 minutes, chaque semaine',  theme:'contenu',  level:'all'    },

    // ── PROGRAMME ────────────────────────────────────────────
    { url:'/doctrine.html',             emoji:'✈️', titre:'Programme Doctrine',             description:'Socle gratuit, Pilote 99€/an, Radar 199€/an',                 theme:'programme',level:'all'    },
    { url:'/radar/',                    emoji:'📡', titre:'Analyser les projets',           description:'Feed Radar — projets equity belges analysés indépendamment',  theme:'programme',level:'radar'  },
    { url:'/dashboard/',               emoji:'👤', titre:'Mon espace',                      description:'Ton tableau de bord personnel WealthWaffle',                   theme:'programme',level:'all'    },

    // ── À PROPOS ──────────────────────────────────────────────
    { url:'/a-propos/',                 emoji:'ℹ️', titre:'À propos',                       description:'Qui est derrière WealthWaffle ?',                              theme:'apropos',  level:'all'    },
    { url:'/a-propos/faq.html',         emoji:'❓', titre:'FAQ',                            description:'Questions fréquentes sur le site et le programme',             theme:'apropos',  level:'all'    },
    { url:'/a-propos/sources.html',     emoji:'📚', titre:'Sources',                        description:'Toutes les sources utilisées sur le site',                     theme:'apropos',  level:'all'    },
    { url:'/a-propos/affiliation.html', emoji:'🔗', titre:'Transparence',                   description:'Notre politique d\'affiliation et de transparence',            theme:'apropos',  level:'all'    },

    // ── PAGES FUTURES (Groupe J — à créer) ──────────────────
    // Décommenter quand la page est créée
    // { url:'/fiscal/aides-independants.html',       emoji:'🆘', titre:'Aides & subsides indépendants',        description:'ASBL, Wallonie Entreprendre, cotisations, aides',            theme:'fiscal',   level:'all' },
    // { url:'/fiscal/aides-societes.html',           emoji:'🏗️', titre:'Aides & subsides sociétés',            description:'Activa, aides régionales, déductions investissement',          theme:'fiscal',   level:'pilote' },
    // { url:'/fiscal/couts-creation.html',           emoji:'💶', titre:'Coûts de création',                    description:'Comptable, notaire, fiscaliste, SRL/SA — prix réels',          theme:'fiscal',   level:'all' },
    // { url:'/fiscal/investir-independant-societe.html', emoji:'⚖️', titre:'Investir indépendant vs société',  description:'Quel compte, quelle fiscalité, quelle stratégie',              theme:'fiscal',   level:'pilote' },
    // { url:'/parcours/entreprendre.html',           emoji:'🚀', titre:'Entreprendre en Belgique',             description:'Actya, Wallonie Entreprendre, Partena, UCM, étapes',           theme:'parcours', level:'all' },
    // { url:'/immo/subsides.html',                   emoji:'🏘️', titre:'Prêts à 0% et subsides',              description:'Prêt Vert, PIVERT, RENoWatt, primes PAE par région',           theme:'immo',     level:'all' },
    // { url:'/invest/portefeuilles.html',            emoji:'🗂️', titre:'Mes portefeuilles',                    description:'Créer plusieurs portefeuilles, export, Bolero, Finary',        theme:'invest',   level:'pilote' },
    // { url:'/invest/ia-finance.html',               emoji:'🤖', titre:'Finance & IA',                         description:'Robo-advisors, outils IA, Easyvest, limites réglementaires',   theme:'invest',   level:'all' },
    // { url:'/invest/incubateurs.html',              emoji:'🌱', titre:'Incubateurs & startups',               description:'LeanSquare, Blast, Spreds, Wallons-y, Chèque-Entreprise',     theme:'invest',   level:'all' },
    // { url:'/a-propos/partenaires.html',            emoji:'🤝', titre:'Partenaires',                          description:'Fiscalistes, comptables, Easyvest, banques partenaires',       theme:'apropos',  level:'all' },
    // { url:'/contenu/newsletter-archive.html',      emoji:'📬', titre:'Archives newsletter',                  description:'Tous les numéros de la newsletter WealthWaffle',              theme:'contenu',  level:'all' },
    // { url:'/parcours/aide.html',                   emoji:'🧭', titre:'Comment utiliser le site',             description:'Mode interactif — trouver ce que tu cherches en 3 questions',  theme:'parcours', level:'all' },

  ],

  // ─── PRIX FONDATEURS ──────────────────────────────────────
  // Prix actuels = prix fondateurs (bloqués à vie pour les premiers inscrits)
  // Prix futurs = augmentation prévue quand le site atteindra sa vitesse de croisière
  // NE PAS AFFICHER les prix futurs sur le site tant que la décision n'est pas prise
  prix_fondateurs: {
    pilote_annuel_futur:  149,   // € — prix annuel prévu après la période fondateurs
    radar_annuel_futur:   299,   // € — prix annuel prévu après la période fondateurs
    // Note : pilote_mensuel et radar_mensuel futurs pas encore définis
    message: 'Tarif fondateur bloqué à vie',
  },

  // ─── LEAD MAGNETS ─────────────────────────────────────────
  // Source unique pour tous les guides téléchargeables
  // url_cdn = chemin Cloudflare Pages vers le fichier
  // autoroute = séquence Brevo déclenchée après téléchargement (A, B ou C)
  // brevo_tag = tag ajouté au contact dans Brevo
  lead_magnets: [
    {
      id:          1,
      key:         'budget-belge',
      titre:       'Mon Budget Belge',
      description: 'Tableau 50/30/20 prêt à l\'emploi pour reprendre le contrôle',
      emoji:       '🗂️',
      file:        'budget-belge.xlsx',
      url_cdn:     '/downloads/budget-belge.xlsx',  // ← à remplir après upload
      autoroute:   'A',
      brevo_tag:   'lead_budget',
      theme:       'budget',
    },
    {
      id:          2,
      key:         'guide-etf',
      titre:       'Guide ETF Belge 2026',
      description: '5 ETF à connaître + fiscalité TOB + stratégie DCA',
      emoji:       '📊',
      file:        'guide-etf-belge.pdf',
      url_cdn:     '/downloads/guide-etf-belge.pdf',
      autoroute:   'B',
      brevo_tag:   'lead_etf',
      theme:       'invest',
    },
    {
      id:          3,
      key:         'allocation',
      titre:       'Simulateur d\'Allocation',
      description: 'Répartis ton portefeuille selon ton profil et ton horizon',
      emoji:       '⚖️',
      file:        'allocation-portefeuille.xlsx',
      url_cdn:     '/downloads/allocation-portefeuille.xlsx',
      autoroute:   'B',
      brevo_tag:   'lead_allocation',
      theme:       'invest',
    },
    {
      id:          4,
      key:         'checklist-immo',
      titre:       'Checklist Achat Immobilier',
      description: 'Étapes, documents, pièges et questions pour le notaire',
      emoji:       '🔑',
      file:        'checklist-achat-immo.pdf',
      url_cdn:     '/downloads/checklist-achat-immo.pdf',
      autoroute:   'B',
      brevo_tag:   'lead_immo',
      theme:       'immo',
    },
    {
      id:          5,
      key:         'checklist-fiscale',
      titre:       'Checklist Fiscale 2026',
      description: 'Toutes les déductions IPP par profil — à cocher avant le 30 juin',
      emoji:       '📝',
      file:        'checklist-fiscale-2026.pdf',
      url_cdn:     '/downloads/checklist-fiscale-2026.pdf',
      autoroute:   'C',
      brevo_tag:   'lead_fiscal',
      theme:       'fiscal',
    },
    {
      id:          6,
      key:         'guide-crypto',
      titre:       'Guide Crypto Belge',
      description: 'Exchanges, fiscalité 2026, déclaration BNB — tout ce qu\'il faut savoir',
      emoji:       '₿',
      file:        'guide-crypto-belge.pdf',
      url_cdn:     '/downloads/guide-crypto-belge.pdf',
      autoroute:   'B',
      brevo_tag:   'lead_crypto',
      theme:       'crypto',
    },
    {
      id:          7,
      key:         'guide-tax-shelter',
      titre:       'Guide Tax Shelter',
      description: 'Réduire son impôt en investissant dans des startups belges',
      emoji:       '🌱',
      file:        'guide-tax-shelter.pdf',
      url_cdn:     '/downloads/guide-tax-shelter.pdf',
      autoroute:   'C',
      brevo_tag:   'lead_taxshelter',
      theme:       'fiscal',
    },
    {
      id:          8,
      key:         'guide-or',
      titre:       'Guide Or Belgique',
      description: 'Lingots, ETF or, fiscalité — investir dans l\'or depuis la Belgique',
      emoji:       '🥇',
      file:        'guide-or-belgique.pdf',
      url_cdn:     '/downloads/guide-or-belgique.pdf',
      autoroute:   'B',
      brevo_tag:   'lead_or',
      theme:       'invest',
    },
  ],

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
