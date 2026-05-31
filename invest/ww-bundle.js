/* * ═══════════════════════════════════════════════════════════
 * WEALTHWAFFLE — ww-bundle.js
 * Fichier unique regroupant tous les scripts du site
 *
 * NE PAS MODIFIER CE FICHIER DIRECTEMENT
 * → Modifier le fichier source correspondant
 * → Puis reconstruire avec : python3 build_bundle.py
 *
 * Contenu (dans l'ordre de chargement) :
 *   1. ww.js          — Fonctions de base
 *   2. search-index.js — Index de recherche
 *   3. components.js  — Chargeur de composants
 *   4. ww2.js         — Composants interactifs
 *   5. ww3.js         — Système de niveaux
 *   6. ww4.js         — Couche UX
 *   7. waffy-chat.js  — Assistant Waffy
 *   8. ww-infra.js    — Infrastructure (Matomo, raccourcis, print...)
 * ═══════════════════════════════════════════════════════════
 */

/* ── Détection file:// ── */
if (location.protocol === 'file:') {
  console.warn('WealthWaffle: ouvrir en file:// bloque les fetch(). Lance "npx serve ." pour tester.');
}


/* ═══ 1/8 — WW CORE : thème, menu, newsletter, modals, cookies ═══ */


/* ── Initialisation du niveau au chargement ────────────────
   S'assure que body a toujours un data-level dès le départ
   pour que le CSS level-section fonctionne immédiatement.
──────────────────────────────────────────────────────────── */
(function initLevel() {
  var saved = localStorage.getItem('ww_level') || 'debutant';
  document.body.setAttribute('data-level', saved);
})();


/*
 * WealthWaffle — ww.js — Fonctions de base
 *
 * Ce fichier contient les fonctions partagées sur tout le site :
 * - Thème clair/sombre
 * - Menu mobile
 * - Formulaire newsletter (brancher Brevo ici)
 * - Modals (mentions légales, CGU, vie privée)
 * - Cookies
 * - Barre de progression lecture
 * - Retour en haut
 */

/* ─── THÈME CLAIR / SOMBRE ──────────────────────────────
   Stocké dans localStorage sous la clé 'ww_theme'
   Valeurs : 'light' ou 'dark' (défaut : dark)
──────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Applique le thème sauvegardé au chargement
  if (localStorage.getItem('ww_theme') === 'light') {
    document.body.classList.add('light');
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = '☀️';
  }
});

/* ─── MENU MOBILE ───────────────────────────────────────
   Ouvert/fermé via le bouton burger en haut à droite
──────────────────────────────────────────────────────── */

/* ─── NEWSLETTER ─────────────────────────────────────────
   TODO : remplacer le bloc fetch() par l'API Brevo
   Docs Brevo : https://developers.brevo.com/reference/createcontact
──────────────────────────────────────────────────────── */

/* ─── MODALS ─────────────────────────────────────────────
   Les templates HTML sont dans ui-components.html
   Types disponibles : 'legal', 'cgu', 'privacy'
──────────────────────────────────────────────────────── */

/* ─── COOKIES ────────────────────────────────────────────
   Banner affiché si 'ww_cookies' absent de localStorage
──────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  if (banner && localStorage.getItem('ww_cookies')) {
    banner.style.display = 'none';
  }
});

/* ─── PARTAGE ────────────────────────────────────────────
   Copier le lien de la page dans le presse-papier
──────────────────────────────────────────────────────── */
function copyLink() {
  navigator.clipboard?.writeText(location.href).then(() => {
    const btn = document.querySelector('.ww-copy-btn');
    if (btn) {
      btn.textContent = '✓ Copié !';
      setTimeout(() => btn.textContent = '🔗 Copier', 2000);
    }
  });
}


/* ═══ 2/8 — SEARCH INDEX : base de données des pages et recherche ═══ */

/* WealthWaffle — Search Index */
window.WW_SEARCH_INDEX = [
  // Budget
  {title:"Règle 50/30/20",page:"budget.html",anchor:"regles",excerpt:"Divise ton salaire en 3 parties : 50% besoins, 30% envies, 20% épargne.",tags:"budget salaire dépenses épargne"},
  {title:"Fonds d'urgence",page:"budget.html",anchor:"urgence",excerpt:"3 à 6 mois de dépenses sur un compte épargne — priorité absolue avant tout investissement.",tags:"urgence épargne sécurité"},
  {title:"Comptes d'épargne belges",page:"budget.html",anchor:"comptes",excerpt:"Compte réglementé, exonération 1.020€/an, taux de base + prime de fidélité.",tags:"épargne compte banque taux"},
  {title:"Comprendre son salaire net",page:"budget.html",anchor:"salaire",excerpt:"ONSS 13,07%, précompte professionnel, bonus à l'emploi — décoder ta fiche de paie.",tags:"salaire net brut ONSS précompte"},
  {title:"Automatiser ses finances",page:"budget.html",anchor:"automatiser",excerpt:"Vire-toi d'abord le jour du salaire — paye-toi d'abord.",tags:"automatisation virement épargne"},
  {title:"Gérer ses dettes",page:"budget.html",anchor:"dettes",excerpt:"Méthode avalanche vs boule de neige — dans quel ordre rembourser.",tags:"dettes crédit remboursement avalanche boule de neige"},
  {title:"Les 4 piliers de pension belge",page:"budget.html",anchor:"piliers",excerpt:"Pension légale, assurance-groupe, épargne pension, épargne libre — comprendre les 4 piliers.",tags:"pension retraite piliers assurance-groupe"},
  {title:"PLCI et EIP pour indépendants",page:"budget.html",anchor:"plci",excerpt:"PLCI jusqu'à 3.965€/an déductibles à 100%. EIP via la société.",tags:"indépendant PLCI EIP pension retraite"},
  {title:"Agenda financier belge",page:"budget.html",anchor:"agenda",excerpt:"Toutes les dates clés : déclaration fiscale, précompte immobilier, épargne pension.",tags:"calendrier dates fiscalité agenda"},
  // Invest
  {title:"Prérequis avant d'investir",page:"invest.html",anchor:"prereq",excerpt:"Fonds d'urgence, pas de dettes > 4%, horizon 5+ ans — les 3 conditions.",tags:"investissement débutant prérequis"},
  {title:"Intérêts composés",page:"invest.html",anchor:"composes",excerpt:"100€/mois à 25 ans = 262.000€ à 65 ans. La magie des intérêts composés.",tags:"intérêts composés rendement long terme"},
  {title:"ETF — tout comprendre",page:"invest.html",anchor:"etf",excerpt:"Exchange Traded Fund, UCITS, capitalisant, MSCI World — l'outil de base.",tags:"ETF fonds MSCI World tracker"},
  {title:"DCA — Dollar Cost Averaging",page:"invest.html",anchor:"dca",excerpt:"Investir un montant fixe chaque mois — la stratégie anti-stress.",tags:"DCA investissement mensuel stratégie"},
  {title:"ETF concrets avec ISIN",page:"invest.html",anchor:"etf-noms",excerpt:"IWDA IE00B4L5Y983, VWCE IE00BK5BQT80, CSPX IE00B5BMR087.",tags:"ETF ISIN IWDA VWCE CSPX code"},
  {title:"Choisir son broker",page:"invest.html",anchor:"brokers",excerpt:"Trade Republic, DEGIRO, Bolero, Keytrade — comparatif frais et agréments.",tags:"broker courtier DEGIRO Trade Republic Bolero Keytrade"},
  {title:"Fiscalité investissements Belgique",page:"invest.html",anchor:"fiscalite",excerpt:"TOB 0,12% ETF, précompte mobilier 30%, pas de taxe sur plus-values.",tags:"fiscalité TOB précompte plus-value investissement"},
  {title:"Branche 21 et Branche 23",page:"invest.html",anchor:"branches",excerpt:"Assurance-vie garantie vs liée à des fonds — différences et fiscalité.",tags:"branche 21 23 assurance-vie pension"},
  {title:"Le PEA n'existe pas en Belgique",page:"invest.html",anchor:"pea",excerpt:"PEA = France uniquement. Les alternatives belges : épargne pension, ETF.",tags:"PEA plan épargne actions France Belgique"},
  {title:"Crises boursières — rester investi",page:"invest.html",anchor:"crises",excerpt:"Ne pas vendre en panique. Historique des crashes et récupérations.",tags:"crise crash bourse panique 2008 2020"},
  // Immo
  {title:"Marché immobilier belge 2025",page:"immo.html",anchor:"marche",excerpt:"Maison 346.000€, appartement 276.000€, ventes +16,7% S1 2025.",tags:"immobilier marché prix 2025 Belgique"},
  {title:"Droits d'enregistrement 2025",page:"immo.html",anchor:"droits",excerpt:"Flandre 2%, Wallonie 3%, Bruxelles 12,5% avec abattement.",tags:"droits enregistrement taxe achat 2025 région"},
  {title:"Frais totaux achat immobilier",page:"immo.html",anchor:"frais",excerpt:"5-8% en Flandre/Wallonie, 15-18% à Bruxelles ou pour investissement.",tags:"frais achat notaire immobilier"},
  {title:"Acheter vs louer",page:"immo.html",anchor:"achetvsloc",excerpt:"Le calcul honnête : horizon, taux, prix du marché — pas de réponse universelle.",tags:"acheter louer immobilier calcul"},
  {title:"Financer son achat immobilier",page:"immo.html",anchor:"financement",excerpt:"Apport 10-20%, TAEG, taux fixe vs variable, ASRD, règle du 1/3.",tags:"crédit hypothécaire financement immobilier taux"},
  {title:"Baux belges — wallon flamand bruxellois",page:"immo.html",anchor:"bail",excerpt:"Durée, résiliation, indexation des loyers selon la région.",tags:"bail contrat location propriétaire locataire"},
  {title:"Copropriété — syndic et fonds de réserve",page:"immo.html",anchor:"copro",excerpt:"Syndic, fonds de réserve obligatoire, assemblée générale.",tags:"copropriété syndic appartement charges"},
  {title:"Rendement locatif brut et net",page:"immo.html",anchor:"rendement",excerpt:"Formule, charges à déduire, 2,5-3,5% net en Belgique.",tags:"rendement locatif loyer calcul net brut"},
  {title:"Fiscalité revenus locatifs",page:"immo.html",anchor:"fiscloyers",excerpt:"Imposé sur le RC non sur le loyer réel — avantage méconnu.",tags:"fiscalité loyer revenu cadastral impôt"},
  {title:"TVA 6% démolition-reconstruction",page:"immo.html",anchor:"tva6",excerpt:"TVA réduite 6% au lieu de 21% sous conditions.",tags:"TVA 6% rénovation construction"},
  {title:"PEB — performance énergétique",page:"immo.html",anchor:"peb",excerpt:"Obligations rénovation, impact sur valeur et loyer.",tags:"PEB énergie rénovation isolation"},
  {title:"SIR — sociétés immobilières réglementées",page:"immo.html",anchor:"sir",excerpt:"Aedifica, WDP, Cofinimmo — immo en bourse avec PM réduit à 15%.",tags:"SIR immobilier bourse dividende REIT"},
  // Tax
  {title:"Déclaration IPP complète",page:"tax.html",anchor:"declaration",excerpt:"Tax-on-Web, délais, cadres, revenus imposables.",tags:"déclaration impôt IPP fiscalité Tax-on-Web"},
  {title:"Déductions fiscales belges",page:"tax.html",anchor:"deductions",excerpt:"Épargne pension 30%, dons 45%, garde enfants 45%, frais professionnels.",tags:"déductions réductions impôt fiscalité"},
  {title:"MyMinfin — guide complet",page:"tax.html",anchor:"myminfin",excerpt:"Tax-on-Web, avertissement-extrait de rôle, mandats, comptes étrangers.",tags:"MyMinfin myminfin fisc déclaration"},
  {title:"Revenus mobiliers — dividendes intérêts",page:"tax.html",anchor:"mobiliers",excerpt:"Précompte mobilier 30%, exonération épargne 1.020€, PM 15% bons d'État.",tags:"précompte mobilier dividende intérêt fiscalité"},
  {title:"Épargne pension 2025",page:"tax.html",anchor:"pension",excerpt:"1.020€ à 30% ou 1.350€ à 25% — attention à la zone défavorable 1.020-1.224€.",tags:"épargne pension retraite fiscalité réduction"},
  {title:"Bonus à l'emploi",page:"tax.html",anchor:"bonus",excerpt:"Réduction automatique pour bas et moyens salaires — jusqu'à 1.890€/an.",tags:"bonus emploi réduction impôt salaire"},
  {title:"Comptes étrangers à déclarer",page:"tax.html",anchor:"bnb",excerpt:"BNB + déclaration IPP — amende 1.250-6.250€ si oubli.",tags:"comptes étrangers BNB DEGIRO broker déclaration"},
  {title:"Que faire du remboursement d'impôts",page:"tax.html",anchor:"remboursement",excerpt:"Fonds urgence → dettes → épargne pension → ETF — l'ordre optimal.",tags:"remboursement impôt argent investir"},
  {title:"Cheat sheet codes IPP",page:"tax.html",anchor:"cheatsheet",excerpt:"Tous les codes fiscaux : 1075, 1444, 1361, 1440, 1100 et plus.",tags:"codes IPP déclaration fiscale cheat sheet"},
  {title:"Fiscalité indépendants",page:"tax.html",anchor:"indep",excerpt:"Cotisations INASTI, TVA, PLCI, frais pro, versements anticipés.",tags:"indépendant fiscalité INASTI TVA cotisations"},
  // Crypto
  {title:"Bitcoin — les bases",page:"crypto.html",anchor:"bitcoin",excerpt:"Blockchain, 21 millions de BTC, halving, volatilité — comprendre avant d'investir.",tags:"bitcoin BTC crypto blockchain"},
  {title:"Fiscalité crypto belge 2025-2026",page:"crypto.html",anchor:"fiscalite",excerpt:"3 profils : bon père de famille (10% dès 2026), spéculateur (33%), professionnel.",tags:"fiscalité crypto impôt Belgique 2026"},
  {title:"Comment déclarer ses cryptos",page:"crypto.html",anchor:"declarer",excerpt:"Code 1440 spéculateur, code 1444 staking, code 1075 exchanges étrangers.",tags:"déclarer crypto IPP codes fiscaux"},
  {title:"Calcul FIFO crypto",page:"crypto.html",anchor:"fifo",excerpt:"Exemple chiffré FIFO étape par étape avec Bitcoin.",tags:"FIFO crypto calcul plus-value fiscalité"},
  {title:"Checklist 31/12/2025",page:"crypto.html",anchor:"checklist2025",excerpt:"Documenter son portefeuille avant la réforme fiscale 2026.",tags:"crypto 2025 2026 réforme documenter portefeuille"},
  {title:"DCA crypto",page:"crypto.html",anchor:"dca",excerpt:"Trade Republic, Coinbase, Kraken — investir régulièrement en crypto.",tags:"DCA crypto Bitcoin investissement mensuel"},
  {title:"Sécuriser ses cryptos",page:"crypto.html",anchor:"securite",excerpt:"Hardware wallet Ledger, Trezor, seed phrase — not your keys not your coins.",tags:"sécurité crypto wallet Ledger Trezor"},
  {title:"Staking et revenus passifs",page:"crypto.html",anchor:"staking",excerpt:"Staking taxé à 30% comme revenus mobiliers pour tous les profils.",tags:"staking crypto revenus passifs fiscalité"},
  {title:"DeFi — finance décentralisée",page:"crypto.html",anchor:"defi",excerpt:"Uniswap, Aave, risques smart contract, fiscalité floue.",tags:"DeFi décentralisé finance Ethereum"},
  {title:"Altcoins et red flags",page:"crypto.html",anchor:"altcoins",excerpt:"Critères d'évaluation, red flags, FSMA liste des arnaques.",tags:"altcoins crypto arnaques red flags"},
  // Bases
  {title:"Qu'est-ce que l'argent",page:"bases.html",anchor:"argent",excerpt:"Monnaie fiduciaire, 3 fonctions, BCE — comprendre la base.",tags:"argent monnaie BCE fiduciaire"},
  {title:"L'inflation — ennemi de l'épargne",page:"bases.html",anchor:"inflation",excerpt:"Belgique : +9,59% en 2022. Rendement réel = nominal − inflation.",tags:"inflation pouvoir achat épargne rendement"},
  {title:"L'or — valeur refuge",page:"bases.html",anchor:"or",excerpt:"ETF or IGLN, or physique, fiscalité belge — 5-10% max du portefeuille.",tags:"or gold valeur refuge investissement"},
  {title:"Les devises et le risque de change",page:"bases.html",anchor:"devises",excerpt:"ETF en USD exposé EUR/USD — hedge ou non sur le long terme.",tags:"devises change EUR USD hedge ETF"},
  {title:"Les taux d'intérêt BCE",page:"bases.html",anchor:"taux",excerpt:"Impact sur épargne, crédit, bourse et obligations.",tags:"taux intérêt BCE banque centrale épargne crédit"},
  // Alternatives
  {title:"Obligations — prêter contre intérêts",page:"alternatives.html",anchor:"obligations",excerpt:"État, corporate, ETF obligataires, taxe Reynders.",tags:"obligations bons d'État corporate bond"},
  {title:"Crowdlending belge",page:"alternatives.html",anchor:"crowdlending",excerpt:"Look&Fin, Ecco Nova, 5-9%, risque de défaut, illiquidité.",tags:"crowdlending financement PME Look&Fin"},
  {title:"Coopératives avec avantage fiscal",page:"alternatives.html",anchor:"cooperatives",excerpt:"Tax Shelter 45% fédéral + 40% bruxellois pour coopératives agréées.",tags:"coopératives Tax Shelter Bruxelles avantage fiscal"},
  {title:"Equity crowdfunding",page:"alternatives.html",anchor:"equity",excerpt:"Spreds, Lita, Tax Shelter 45%, illiquidité totale, risque de perte totale.",tags:"equity crowdfunding startup investissement"},
  {title:"Effet de levier — risques",page:"alternatives.html",anchor:"levier",excerpt:"Amplifier les gains ET les pertes — simulateur inclus.",tags:"levier effet crédit risque"},
  // Glossaire
  {title:"Glossaire complet — 28 termes",page:"glossaire.html",anchor:"",excerpt:"ETF, DCA, TOB, PM, PLCI, EIP, FIFO, SIR, PEB, UCITS, ISIN et plus.",tags:"glossaire définitions termes financiers"},

  // Invest sub-pages
  {title:"ETF — Guide complet belge",page:"invest-etf.html",anchor:"isin",excerpt:"IWDA IE00B4L5Y983, VWCE IE00BK5BQT80 — ETF UCITS capitalisants, TOB 0,12%, brokers, DCA, taxe Reynders.",tags:"ETF IWDA VWCE UCITS capitalisant TOB DCA broker DEGIRO Trade Republic"},
  {title:"ETF — choisir selon 6 critères",page:"invest-etf.html",anchor:"choisir",excerpt:"UCITS, capitalisant, irlandais, TER bas, AUM > 500M€, tracking difference — les 6 critères essentiels.",tags:"ETF choisir critères UCITS irlande TER tracking difference"},
  {title:"Obligations belges — guide complet",page:"invest-obligations.html",anchor:"bons-etat",excerpt:"Bons d'État belges, ETF obligataires IBGL IEAA AGGH, taxe Reynders sur fonds mixtes.",tags:"obligations bons état ETF obligataire taxe Reynders IBGL IEAA"},
  {title:"Taxe Reynders — mécanisme complet",page:"invest-obligations.html",anchor:"reynders",excerpt:"PM 30% sur la partie obligataire des plus-values des fonds mixtes. Ne s'applique pas aux ETF actions.",tags:"taxe Reynders PM 30% fonds mixte obligations ETF"},
  {title:"Equity non coté — Tax Shelter 45%",page:"invest-equity.html",anchor:"tax-shelter",excerpt:"Tax Shelter startup 45%, PME croissance 25%, conservation 4 ans minimum, codes 2353 et 2354.",tags:"Tax Shelter 45% startup PME equity non coté crowdfunding"},
  {title:"Equity crowdfunding — plateformes agréées",page:"invest-equity.html",anchor:"crowdfunding",excerpt:"Spreds, Lita, Bolero Crowdfunding, Ecco Nova — plateformes agréées FSMA avec Tax Shelter.",tags:"crowdfunding equity Spreds Lita Bolero FSMA startup"},
  {title:"ELTIF 2.0 — private equity accessible",page:"invest-equity.html",anchor:"private-equity",excerpt:"ELTIF 2.0 accessible aux particuliers dès 1.000 € depuis mars 2024. Horizon 5–10 ans minimum.",tags:"ELTIF private equity particuliers fonds 1000 euros"},
  {title:"Fonds actifs vs ETF — SPIVA",page:"invest-fonds.html",anchor:"spiva",excerpt:"92% des fonds actifs actions Europe sous-performent leur indice sur 15 ans (SPIVA 2023).",tags:"fonds actifs ETF SPIVA performance gestion active SICAV"},
  {title:"Rétrocessions — conflit d'intérêts bancaire",page:"invest-fonds.html",anchor:"retrocessions",excerpt:"Commission versée à la banque par le gestionnaire du fonds. 0,5 à 1%/an sur votre capital.",tags:"rétrocession commission banque fonds MiFID conseiller"},
  {title:"Panorama investissements belges",page:"invest-panorama.html",anchor:"",excerpt:"10 véhicules comparés : ETF, actions, immo, obligations, crypto, or, crowdlending, coopératives, SIR, épargne pension.",tags:"panorama investissement comparer tous véhicules Belgique"},
  {title:"Épargne long terme — branche 21 et 23",page:"epargne-long-terme.html",anchor:"branche21",excerpt:"Branche 21 : capital garanti, PM exonéré après 8 ans. Branche 23 : fonds, capital non garanti, PM 30%.",tags:"branche 21 23 assurance vie épargne long terme PM"},
  {title:"Assurance-groupe — 2ème pilier salarié",page:"epargne-long-terme.html",anchor:"assurance-groupe",excerpt:"Sigedis.be pour consulter vos droits. Taxé à 10% si sortie à 65 ans actif. 20% à 60 ans.",tags:"assurance groupe sigedis 2ème pilier salarié pension"},
  {title:"Épargne long terme fiscale (ELT) — plafond 2026",page:"epargne-long-terme.html",anchor:"elt",excerpt:"ELT ~2.450 €/an, réduction 30%, code 1480. Cumulable avec épargne pension.",tags:"ELT épargne long terme 2450 euros code 1480 assurance"},
  {title:"Fonds sectoriels — 2ème pilier oublié",page:"epargne-long-terme.html",anchor:"fonds-sectoriels",excerpt:"Construction, Horeca, Métal — des centaines de milliers de travailleurs ont un fonds sectoriel sans le savoir. Consulter sur sigedis.be.",tags:"fonds sectoriel pension sigedis construction horeca"},
  {title:"Rente — règle des 4% belge",page:"rente.html",anchor:"regle4",excerpt:"Capital = dépenses annuelles × 25. Abattement belge : 0% plus-values sur ETF. Horizon 30 ans minimum.",tags:"règle 4% retraite capital retrait mensuel décumulation"},
  {title:"Simulateur retrait mensuel retraite",page:"rente.html",anchor:"simulateur",excerpt:"Combien retirer chaque mois sans épuiser son capital ? Simulateur avec inflation et pension légale.",tags:"simulateur retrait mensuel retraite capital 4% rente"},
  {title:"Rente viagère — fiscalité belge",page:"rente.html",anchor:"rente-viagere",excerpt:"Fraction imposable : 25% à 65 ans, 20% à 75 ans. Rente avec réversion pour protéger le conjoint.",tags:"rente viagère fiscalité belge fraction imposable réversion"},
  {title:"Outils fiscaux — simulateurs 2026",page:"outils-fiscaux.html",anchor:"",excerpt:"PLCI optimale, IS vs IPP, VVPRbis, réserve de liquidation — tous les simulateurs fiscaux belges.",tags:"simulateur fiscal PLCI IS IPP VVPRbis réserve liquidation"},
  {title:"Plafonds fiscaux 2026 — tableau complet",page:"outils-fiscaux.html",anchor:"plafonds",excerpt:"Épargne pension 1.020€/1.350€, PLCI 4.080€, ELT 2.450€, Tax Shelter, VVPRbis, droits auteur 77.220€.",tags:"plafonds 2026 fiscal épargne pension PLCI ELT Tax Shelter"},
  {title:"Tax Shelter coopératives — 30% fédéral + 40% bruxellois",page:"outils-fiscaux.html",anchor:"taxshelter",excerpt:"Coopératives agréées CNC : réduction 30% fédérale, 40% supplémentaire à Bruxelles. Plafond 100.000 €/an.",tags:"Tax Shelter coopératives 30% 40% Bruxelles parts"},
  {title:"Taxe plus-values 10% — depuis janvier 2026",page:"tax.html",anchor:"plus-values",excerpt:"Contribution de solidarité 10% sur plus-values boursières. Abattement 10.000 €/an. Moins-values déductibles.",tags:"taxe plus-values 10% bourse ETF actions 2026 abattement"},
  {title:"Droits d'auteur IT — régime rétabli 2025",page:"tax.html",anchor:"droits-auteur-it",excerpt:"Développeurs et créateurs IT à nouveau éligibles. PM 15% jusqu'à 77.220 € bruts. Économie jusqu'à 8.000 €/an.",tags:"droits auteur IT informatique PM 15% développeur 2025 régime"},
  {title:"Étudiant-entrepreneur — cotisations réduites",page:"independants.html",anchor:"statuts-speciaux",excerpt:"Moins de 25 ans, cotisations ~170 €/trimestre (au lieu de 850 €). Mini-statut : sous 1.855 €/an.",tags:"étudiant entrepreneur moins 25 ans cotisations réduites mini-statut"},
  {title:"Usufruit nue-propriété — tableau par âge",page:"immo.html",anchor:"succession-immo",excerpt:"Donation nue-propriété avec réserve d'usufruit : tableau des valeurs fiscales de 20 ans à 80 ans.",tags:"usufruit nue propriété donation immobilier tableau âge fiscalité"},
  {title:"Regroupement assurances — économies",page:"budget.html",anchor:"assurances-regroupement",excerpt:"Auto + habitation + hospitalisation : 5–20% de réduction. Jusqu'à 600 €/an d'économies. Délai résiliation 3 mois.",tags:"assurances regroupement économies auto habitation hospitalisation"},

  // FAQ & Découverte
  {title:"FAQ — Questions fréquentes finance belge",page:"faq.html",anchor:"",excerpt:"ETF, fiscalité, immobilier, épargne pension, crypto, Tax Shelter — les réponses directes aux questions les plus posées.",tags:"FAQ questions réponses finance belge ETF fiscalité"},
  {title:"Concept de la semaine",page:"concept-semaine.html",anchor:"",excerpt:"52 concepts financiers belges pour 2026 — un par semaine, calés sur le calendrier fiscal.",tags:"concept semaine calendrier fiscal 2026 apprendre"},
  // Nouveaux termes glossaire
  {title:"ELTIF — fonds européen long terme",page:"invest-equity.html",anchor:"private-equity",excerpt:"ELTIF 2.0 accessible aux particuliers dès 1.000 € depuis mars 2024. Private equity pour tous.",tags:"ELTIF private equity fonds long terme particulier"},
  {title:"Winwinlening — prêt PME flandre",page:"invest-equity.html",anchor:"prets-regionaux",excerpt:"Winwinlening : 2,5%/an de crédit d'impôt pour les prêteurs flamands aux PME flamandes.",tags:"winwinlening prêt flandre PME crédit impôt"},
  {title:"Prêt Proxi — Bruxelles",page:"invest-equity.html",anchor:"prets-regionaux",excerpt:"Prêt Proxi bruxellois : 4%/an de crédit d'impôt les 3 premières années, 2,5% ensuite.",tags:"prêt proxi bruxelles PME crédit impôt particulier"},
  {title:"Prêt Coup de Pouce — Wallonie",page:"invest-equity.html",anchor:"prets-regionaux",excerpt:"Prêt Coup de Pouce wallon : 4%/an les 4 premières années, 2,5% ensuite. Garantie 30%.",tags:"coup de pouce wallonie prêt PME crédit impôt"},
  {title:"Rente viagère belge",page:"rente.html",anchor:"rente-viagere",excerpt:"Fraction imposable à 25% à 65 ans, 20% à 75 ans. Revenu garanti à vie contre capital cédé.",tags:"rente viagère fraction imposable âge assureur vie"},
  {title:"Usufruit et nue-propriété",page:"immo.html",anchor:"succession-immo",excerpt:"Tableau des valeurs fiscales par âge. À 65 ans : usufruit 28%, nue-propriété 72%.",tags:"usufruit nue-propriété tableau donation immobilier âge"},
  {title:"Mini-statut indépendant",page:"independants.html",anchor:"statuts-speciaux",excerpt:"Revenus nets inférieurs à 1.855 €/an — cotisation minimale uniquement. Idéal pour débuter.",tags:"mini-statut indépendant cotisation minimale seuil débutant"},
  {title:"Étudiant-entrepreneur",page:"independants.html",anchor:"statuts-speciaux",excerpt:"Moins de 25 ans : cotisations INASTI réduites à ~170 €/trimestre si revenu < 7.957 €/an.",tags:"étudiant entrepreneur 25 ans cotisation réduite INASTI"},
  {title:"Décumulation — vivre de son capital",page:"rente.html",anchor:"intro",excerpt:"Convertir son capital en revenus réguliers à la retraite. Risque de séquence, stratégie 5 couches.",tags:"décumulation retraite capital revenus retrait stratégie"},
  {title:"SPIVA — la vérité sur les fonds actifs",page:"invest-fonds.html",anchor:"spiva",excerpt:"92% des fonds actifs sous-performent leur indice sur 15 ans. ETF passifs gagnent statistiquement.",tags:"SPIVA fonds actifs ETF passif performance statistique"},
  {title:"Fiche de paie belge décryptée",page:"tax.html",anchor:"fiche-paie",excerpt:"ONSS 13,07%, cotisation spéciale, précompte professionnel. Brut 3.500 € → net ~2.013 €.",tags:"fiche de paie ONSS précompte professionnel salaire brut net"},
  {title:"Dépenses de l'État belge",page:"tax.html",anchor:"depenses-etat",excerpt:"Protection sociale 35%, pensions 27%, santé 16%, éducation 11%, dette 8%.",tags:"dépenses état budget belgique impôt protection sociale"},

];

/* Search engine */
window.WW_Search = {
  query(q) {
    if (!q || q.length < 2) return [];
    const lq = q.toLowerCase();
    const results = [];
    for (const item of window.WW_SEARCH_INDEX) {
      const score =
        (item.title.toLowerCase().includes(lq) ? 10 : 0) +
        (item.tags.toLowerCase().includes(lq) ? 5 : 0) +
        (item.excerpt.toLowerCase().includes(lq) ? 2 : 0);
      if (score > 0) results.push({ ...item, score });
    }
    return results.sort((a, b) => b.score - a.score).slice(0, 8);
  },

  highlight(text, q) {
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<span class="ww-search-highlight">$1</span>');
  }
};


/* ═══ 3/8 — COMPONENTS : chargement nav/footer/ui dynamique ═══ */

/*
 * WealthWaffle — components.js — Chargeur de composants
 *
 * Ce fichier charge dynamiquement 3 composants HTML partagés :
 *   - nav.html      → barre de navigation (desktop + mobile)
 *   - footer.html   → pied de page
 *   - ui-components.html → modals (légal/CGU/vie privée) + cookie banner
 *
 * Il initialise ensuite :
 *   - Mega-menu desktop (survol/clic)
 *   - Burger mobile + accordéons par profil
 *   - Recherche (connectée à search-index.js)
 *   - Retour en haut
 *   - Thème clair/sombre
 *   - Formulaire newsletter
 *   - Consentement cookies
 */

/* ═══════════════════════════════════════
   WealthWaffle — Components Loader
   Loads nav.html + footer.html dynamically
   Initialises all shared UI after load
═══════════════════════════════════════ */

(function() {

  /* ── Load HTML component into placeholder ── */
  async function loadComponent(url, placeholderId) {
    const el = document.getElementById(placeholderId);
    if (!el) return;
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error('fetch failed');
      el.innerHTML = await r.text();
    } catch(e) {
      console.warn(`WW: Could not load ${url}`);
    }
  }


/* ── Mise à jour CTA auth dans la nav ── */
function updateAuthNav() {
  const session = localStorage.getItem('ww_session');
  const loginBtn    = document.getElementById('ww-btn-login');
  const registerBtn = document.getElementById('ww-btn-register');
  const dashBtn     = document.getElementById('ww-btn-dashboard');
  if (!loginBtn && !registerBtn && !dashBtn) return;
  if (session) {
    if (loginBtn)    loginBtn.style.display    = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    if (dashBtn)     dashBtn.style.display     = 'inline-flex';
    // Mobile
    const mobileAuth = document.getElementById('ww-auth-mobile');
    if (mobileAuth) mobileAuth.innerHTML =
      '<a href="/dashboard/" onclick="closeMenu()" style="display:block;text-align:center;padding:11px;border-radius:11px;background:linear-gradient(135deg,var(--rose),#b8449a);color:#fff;font-family:\'DM Sans\',sans-serif;font-weight:700;font-size:0.86rem;text-decoration:none;">Mon espace →</a>';
  }
}

  /* ── Set active nav link ── */
  function setActiveNav() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#ww-nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  /* ── Mega-menu desktop ── */
  function initMegaMenu() {
    document.querySelectorAll('.mega-trigger').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const group = btn.dataset.group;
        const panel = document.querySelector(`.mega-panel[data-panel="${group}"]`);
        const isOpen = panel?.classList.contains('open');
        // close all
        document.querySelectorAll('.mega-panel').forEach(p => p.classList.remove('open'));
        document.querySelectorAll('.mega-trigger').forEach(b => b.classList.remove('active'));
        if (!isOpen && panel) {
          panel.classList.add('open');
          btn.classList.add('active');
        }
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('.mega-panel').forEach(p => p.classList.remove('open'));
      document.querySelectorAll('.mega-trigger').forEach(b => b.classList.remove('active'));
    });
  }

  /* ── Mobile burger ── */
  window.toggleMenu = function() {
    const menu    = document.getElementById('mobile-menu');
    const btn     = document.getElementById('burger-btn');
    const overlay = document.getElementById('mobile-overlay');
    if (!menu) return;
    const open = !menu.classList.contains('open');
    menu.style.display = 'flex';
    // Forcer reflow avant d'ajouter la classe pour que la transition joue
    menu.offsetHeight;
    menu.classList.toggle('open', open);
    menu.style.transform = open ? 'translateX(0)' : 'translateX(100%)';
    btn?.classList.toggle('open', open);
    if (overlay) overlay.style.display = open ? 'block' : 'none';
    document.body.style.overflow = open ? 'hidden' : '';
  };
  window.closeMenu = function() {
    const menu    = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-overlay');
    if (menu) { menu.classList.remove('open'); menu.style.transform = 'translateX(100%)'; }
    document.getElementById('burger-btn')?.classList.remove('open');
    if (overlay) overlay.style.display = 'none';
    document.body.style.overflow = '';
  };

  window.toggleMobileGroup = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const isOpen = el.classList.toggle('open');
    // Tourner la flèche via la classe open sur le groupe parent
    const group = el.closest('.mob-group');
    if (group) group.classList.toggle('open', isOpen);
  };


  /* ── Search ── */
  window.doSearch = function(q) {
    const box = document.getElementById('ww-search-results');
    if (!box || !window.WW_Search) return;
    if (!q || q.length < 2) { box.classList.remove('open'); return; }
    const results = WW_Search.query(q);
    box.innerHTML = results.length
      ? results.map(r => `
          <a class="ww-search-result-item" href="${r.page}${r.anchor ? '#'+r.anchor : ''}">
            <div class="ww-search-result-title">${WW_Search.highlight(r.title, q)}</div>
            <div class="ww-search-result-page">${r.page.replace('.html','')}</div>
            <div class="ww-search-result-excerpt">${WW_Search.highlight(r.excerpt, q)}</div>
          </a>`).join('')
      : `<div class="ww-search-empty">Aucun résultat pour « ${q} »</div>`;
    box.classList.add('open');
  };
  window.closeSearch = function() {
    document.getElementById('ww-search-results')?.classList.remove('open');
  };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });

  /* ── Back to top ── */
  function initBackTop() {
    const btn = document.getElementById('back-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
  }

  /* ── Modal (legal/cgu/privacy) ── */
  window.openModal = function(type) {
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    const tpl = document.getElementById(`tpl-${type}`);
    if (!overlay || !content || !tpl) return;
    content.innerHTML = tpl.innerHTML;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeModal = function() {
    document.getElementById('modal-overlay')?.classList.remove('open');
    document.body.style.overflow = '';
  };
  window.openCookieSettings = function() {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'flex';
  };

  /* ── Cookie consent ── */
  window.acceptCookies = function() {
    localStorage.setItem('ww_cookies', '1');
    document.getElementById('cookie-banner').style.display = 'none';
  };
  window.refuseCookies = function() {
    localStorage.setItem('ww_cookies', '0');
    document.getElementById('cookie-banner').style.display = 'none';
  };
  function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    if (localStorage.getItem('ww_cookies')) banner.style.display = 'none';
  }

  /* ── Theme toggle ── */
  window.toggleTheme = function() {
    const light = document.body.classList.toggle('light');
    localStorage.setItem('ww_theme', light ? 'light' : 'dark');
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = light ? '☀️' : '🌙';
  };
  function initTheme() {
    const theme = localStorage.getItem('ww_theme');
    if (theme === 'light') {
      document.body.classList.add('light');
      const btn = document.getElementById('theme-btn');
      if (btn) btn.textContent = '☀️';
    }
  }

  /* ── Newsletter submit ── */
  window.submitNL = function(emailId, formId, okId) {
    const email = document.getElementById(emailId)?.value?.trim();
    if (!email || !email.includes('@')) { alert('Merci d\'entrer une adresse e-mail valide.'); return; }
    // TODO: connect to Mailerlite
    // fetch('https://api.mailerlite.com/...', { method:'POST', body: JSON.stringify({email}) })
    document.getElementById(formId)?.style && (document.getElementById(formId).style.display = 'none');
    const ok = document.getElementById(okId);
    if (ok) ok.style.display = 'block';
    localStorage.setItem('ww_nl_done', '1');
  };

  /* ── Init all after DOM ready ── */
  document.addEventListener('DOMContentLoaded', async () => {
    // Charger les composants — injection directe dans le body si placeholders absents
    async function loadOrInject(url, placeholderId, position) {
      const el = document.getElementById(placeholderId);
      try {
        const r = await fetch(url);
        if (!r.ok) throw new Error();
        const html = await r.text();
        if (el) {
          el.innerHTML = html;
        } else {
          // Placeholder absent — injecter directement
          const tmp = document.createElement('div');
          tmp.id = placeholderId;
          tmp.innerHTML = html;
          if (position === 'start') {
            document.body.insertBefore(tmp, document.body.firstChild);
          } else {
            document.body.appendChild(tmp);
          }
        }
      } catch(e) {
        console.warn('WW: Could not load ' + url);
      }
    }

    await Promise.all([
      loadOrInject('/assets/nav.html', 'ww-nav-placeholder', 'start'),
      loadOrInject('/assets/footer.html', 'ww-footer-placeholder', 'end'),
      loadOrInject('/assets/ui-components.html', 'ww-ui-placeholder', 'start'),
    ]);

    // Init after load
    setActiveNav();
    initMegaMenu();
    initBackTop();
    initTheme();
    initCookieBanner();
    updateAuthNav();
  });

})();


/* ═══ 4/8 — WW2 : quiz, tooltips, accordéons, questionnaire ═══ */

/*
 * WealthWaffle — ww2.js — Composants interactifs
 *
 * - Barre TOC active (suivi de section au scroll)
 * - Tooltips sur les codes fiscaux (badges 📋)
 * - Accordéons
 * - Compteurs animés
 * - Barres de comparaison animées
 * - Scroll reveal (apparition au scroll)
 * - Moteur de quiz
 * - Moteur de questionnaire (index.html)
 * - Panel sources
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── BARRE DE PROGRESSION (lecture) ──────────────────
     Remplit la barre rouge en haut de page selon le scroll
  ────────────────────────────────────────────────────── */
  const progressFill = document.querySelector('.progress-fill');
  if (progressFill) {
    window.addEventListener('scroll', () => {
      const doc = document.documentElement;
      const pct = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100;
      progressFill.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });
  }

  /* ─── TOC ACTIVE (sommaire) ───────────────────────────
     Met en surbrillance le lien actif dans le sommaire
  ────────────────────────────────────────────────────── */
  const tocLinks = document.querySelectorAll('.toc-sidebar a');
  if (tocLinks.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        tocLinks.forEach(a => a.classList.remove('toc-active'));
        const active = document.querySelector(`.toc-sidebar a[href="#${e.target.id}"]`);
        if (active) active.classList.add('toc-active');
      });
    }, { rootMargin: '-10% 0px -80% 0px' });
    document.querySelectorAll('.toc-target').forEach(h => obs.observe(h));
  }

  /* ─── TOOLTIPS CODES FISCAUX ─────────────────────────
     Affiche une info-bulle au clic sur les badges 📋
  ────────────────────────────────────────────────────── */
  const tooltip = Object.assign(document.createElement('div'), { className: 'tax-tooltip' });
  document.body.appendChild(tooltip);

  function showTaxTip(badge) {
    tooltip.innerHTML = badge.dataset.tip || '';
    tooltip.classList.add('visible');
    const rect = badge.getBoundingClientRect();
    const w = tooltip.offsetWidth || 260;
    tooltip.style.left = Math.min(rect.left + 12, window.innerWidth - w - 12) + 'px';
    tooltip.style.top  = (rect.top + window.scrollY - 60) + 'px';
    setTimeout(() => tooltip.classList.remove('visible'), 4000);
  }
  window.showTaxTip = showTaxTip;

  document.querySelectorAll('.tax-badge').forEach(b => {
    b.addEventListener('click', e => { e.stopPropagation(); showTaxTip(b); });
    b.addEventListener('mouseenter', e => showTaxTip(b));
    b.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
  });
  document.addEventListener('click', () => tooltip.classList.remove('visible'));

  /* ─── ACCORDÉONS ─────────────────────────────────────
     Sections dépliables standard (hors expert-expand)
  ────────────────────────────────────────────────────── */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const acc = header.closest('.accordion');
      if (!acc) return;
      const wasOpen = acc.classList.contains('open');
      acc.closest('.accordion-group')?.querySelectorAll('.accordion').forEach(a => a.classList.remove('open'));
      if (!wasOpen) acc.classList.add('open');
    });
  });

  /* ─── COMPTEURS ANIMÉS ───────────────────────────────
     <span class="stat-counter" data-target="42" data-suffix="%">0%</span>
  ────────────────────────────────────────────────────── */
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target   = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || 0);
      const suffix   = el.dataset.suffix || '';
      const prefix   = el.dataset.prefix || '';
      const start    = performance.now();
      const duration = 1400;
      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = prefix + (target * (1 - Math.pow(1 - p, 3))).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target.toFixed(decimals) + suffix;
      };
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-counter').forEach(el => counterObs.observe(el));

  /* ─── BARRES DE COMPARAISON ──────────────────────────
     <div class="compare-bar-fill" data-width="65"></div>
  ────────────────────────────────────────────────────── */
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.compare-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      barObs.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.compare-bars').forEach(el => barObs.observe(el));

  /* ─── SCROLL REVEAL ──────────────────────────────────
     Les éléments .reveal apparaissent en fondu au scroll
  ────────────────────────────────────────────────────── */
  // Signaler que JS est prêt — active les animations reveal
  // Sans cette classe, le contenu est visible sans animation (fallback sûr)
  document.body.classList.add('js-reveal-ready');

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.04, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

}); // fin DOMContentLoaded

/* ─── MOTEUR DE QUIZ ─────────────────────────────────────
   Utilisé sur toutes les pages avec un bloc .quiz-section
   Appelé : initQuiz('id-du-quiz-dans-la-page')
────────────────────────────────────────────────────────── */
function initQuiz(quizId) {
  const wrap = document.getElementById(quizId);
  if (!wrap) return;
  const questions = wrap.querySelectorAll('.quiz-question');
  const dots      = wrap.querySelectorAll('.quiz-dot');
  const counter   = wrap.querySelector('.quiz-counter');
  const result    = wrap.querySelector('.quiz-result');
  let current = 0, score = 0;

  // Gérer les clics sur les options de réponse
  questions.forEach(q => {
    q.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (q.dataset.answered) return; // déjà répondu
        q.dataset.answered = '1';
        const correct = opt.dataset.correct === '1';
        if (correct) score++;
        opt.classList.add(correct ? 'correct' : 'wrong');
        if (!correct) q.querySelectorAll('[data-correct="1"]').forEach(o => o.classList.add('correct'));
        q.querySelector('.quiz-feedback')?.classList.add('show');
        q.querySelector('.quiz-next')?.classList.add('show');
      });
    });
  });

  // Bouton "question suivante"
  wrap.querySelectorAll('.quiz-next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      current++;
      if (current < questions.length) {
        questions.forEach((q, i) => q.classList.toggle('active', i === current));
        dots.forEach((d, i) => { d.classList.toggle('done', i < current); d.classList.toggle('current', i === current); });
        if (counter) counter.textContent = `${current + 1} / ${questions.length}`;
      } else {
        // Afficher le résultat final
        questions.forEach(q => q.classList.remove('active'));
        if (result) {
          result.classList.add('show');
          const pct = score / questions.length;
          result.querySelector('.quiz-score').textContent = `${score}/${questions.length}`;
          result.querySelector('.quiz-score-msg').textContent =
            pct === 1   ? '🎯 Parfait ! Tu maîtrises le sujet.' :
            pct >= 0.6  ? '👍 Bon niveau — quelques points à revoir.' :
                          '📚 Continue à apprendre — relis la page !';
        }
      }
    });
  });
}

/* ─── QUESTIONNAIRE D'ORIENTATION (index.html) ───────────
   3 questions → redirection vers la page recommandée
────────────────────────────────────────────────────────── */
let qAnswers = {}, qStep = 0;

const qTree = [
  { id: 'situation', emoji: '👋', title: 'Quelle est ta situation ?',
    sub: 'En 3 questions, je t\'oriente vers ce dont tu as besoin maintenant.',
    choices: [
      { icon:'🌱', label:'Je débute',           sub:'Je n\'ai pas encore d\'épargne ni d\'investissements', value:'debutant' },
      { icon:'📈', label:'J\'épargne déjà',     sub:'J\'ai un fonds d\'urgence, je veux investir',         value:'epargnant' },
      { icon:'🏠', label:'Je veux acheter',      sub:'Résidence principale ou investissement locatif',         value:'acheteur' },
      { icon:'🧾', label:'Optimiser mes impôts', sub:'Déclaration, déductions, épargne pension',               value:'fiscal' },
    ]
  },
  { id: 'age', emoji: '🗓️', title: 'Tu as quel âge environ ?',
    sub: 'L\'horizon de temps change tout à la stratégie.',
    choices: [
      { icon:'⚡', label:'18–30 ans', sub:'Le temps est ton plus grand avantage',    value:'jeune'   },
      { icon:'🎯', label:'31–45 ans', sub:'Construction active du patrimoine',        value:'milieu'  },
      { icon:'🛡️', label:'46–60 ans', sub:'Consolidation et préparation retraite',   value:'senior'  },
      { icon:'🌅', label:'60+ ans',   sub:'Protection et transmission',               value:'retraite'},
    ]
  },
  { id: 'priority', emoji: '🎯', title: 'Ton objectif principal ?',
    sub: 'Choisis ce qui te parle le plus maintenant.',
    choices: [
      { icon:'🛡️', label:'Sécurité financière',       sub:'Fonds d\'urgence, épargne stable',    value:'securite'  },
      { icon:'📈', label:'Faire fructifier mon argent', sub:'ETF, investissement long terme',       value:'croissance' },
      { icon:'🏠', label:'L\'immobilier',              sub:'Acheter ou investir dans la brique',   value:'immo'      },
      { icon:'₿',  label:'Actifs alternatifs',          sub:'Crypto, or, obligations...',           value:'alternatif'},
    ]
  }
];

const qResults = {
  'debutant-jeune-securite':    { page:'budget.html',  color:'#7EC8A0', label:'Budget & Épargne',   title:'Commence par les bases',         desc:'Fonds d\'urgence d\'abord, règle 50/30/20, puis on construit.' },
  'debutant-jeune-croissance':  { page:'invest.html',  color:'#5BB8D4', label:'Investir',            title:'Le temps joue pour toi',          desc:'Les intérêts composés sur 40 ans, c\'est magique. Commence maintenant.' },
  'debutant-jeune-immo':        { page:'immo.html',    color:'#C4724A', label:'Immobilier',          title:'L\'immo avant 30 ans',            desc:'Droits d\'enregistrement, financement, acheter vs louer — tout est là.' },
  'debutant-jeune-alternatif':  { page:'crypto.html',  color:'#E8C23A', label:'Crypto',             title:'Commence petit, prudent',          desc:'DCA, sécurité, fiscalité belge — les bases avant de plonger.' },
  'debutant-milieu-securite':   { page:'budget.html',  color:'#7EC8A0', label:'Budget & Épargne',   title:'Reprends le contrôle',             desc:'Automatisation, fonds d\'urgence, optimisation — il n\'est jamais trop tard.' },
  'debutant-milieu-croissance': { page:'invest.html',  color:'#5BB8D4', label:'Investir',            title:'Investir à 35+',                  desc:'20 ans d\'intérêts composés restent puissants. Le moment d\'agir, c\'est maintenant.' },
  'epargnant-jeune-croissance': { page:'invest.html',  color:'#5BB8D4', label:'Investir',            title:'ETF & DCA — ton prochain pas',    desc:'Tu as le fonds d\'urgence ? Parfait. Voici comment passer à la vitesse supérieure.' },
  'epargnant-milieu-immo':      { page:'immo.html',    color:'#C4724A', label:'Immobilier',          title:'L\'investissement locatif',       desc:'Rendement, fiscalité des loyers, SIR — tout pour décider en connaissance de cause.' },
  'acheteur-jeune-immo':        { page:'immo.html',    color:'#C4724A', label:'Immobilier',          title:'Ton premier achat',               desc:'Droits d\'enregistrement 2025, financement, frais réels — rien ne t\'échappe.' },
  'acheteur-milieu-immo':       { page:'immo.html',    color:'#C4724A', label:'Immobilier',          title:'Acheter ou investir ?',            desc:'Le calcul honnête entre résidence principale et investissement locatif.' },
  'fiscal-milieu-securite':     { page:'tax.html',     color:'#C8C6E8', label:'Fiscalité',           title:'Optimise ta déclaration',         desc:'Déductions, épargne pension, codes IPP — tout ce que tu rates chaque année.' },
  'fiscal-senior-securite':     { page:'tax.html',     color:'#C8C6E8', label:'Fiscalité',           title:'Prépare ta retraite fiscalement', desc:'Épargne pension, PLCI, tax shelter — les dernières années comptent double.' },
};

function qInit() {
  qAnswers = {}; qStep = 0;
  const wrap = document.getElementById('questionnaire');
  if (!wrap) return;
  wrap.querySelectorAll('.q-step').forEach((s, i) => s.classList.toggle('active', i === 0));
  wrap.querySelector('.q-result')?.classList.remove('show');
  const fill = document.querySelector('.q-progress-fill');
  if (fill) fill.style.width = '0%';
}

function qAnswer(value) {
  qAnswers[qTree[qStep].id] = value;
  qStep++;
  const fill = document.querySelector('.q-progress-fill');
  if (fill) fill.style.width = (qStep / qTree.length * 100) + '%';
  const wrap = document.getElementById('questionnaire');
  if (!wrap) return;
  if (qStep < qTree.length) {
    wrap.querySelectorAll('.q-step').forEach((s, i) => s.classList.toggle('active', i === qStep));
  } else {
    wrap.querySelectorAll('.q-step').forEach(s => s.classList.remove('active'));
    const key    = `${qAnswers.situation}-${qAnswers.age}-${qAnswers.priority}`;
    const result = qResults[key] || { page:'budget.html', color:'#7EC8A0', label:'Budget & Épargne', title:'Commence par les bases', desc:'La meilleure fondation, quel que soit ton profil.' };
    const el = wrap.querySelector('.q-result');
    if (el) {
      el.querySelector('.q-result-tag').textContent = result.label;
      el.querySelector('.q-result-tag').style.cssText = `background:${result.color}22;color:${result.color}`;
      el.querySelector('.q-result-title').textContent = result.title;
      el.querySelector('.q-result-desc').textContent  = result.desc;
      el.querySelector('.q-result-cta').href          = result.page;
      el.classList.add('show');
    }
  }
}

/* ─── PANEL SOURCES ──────────────────────────────────────
   Fenêtre glissante listant les sources d'un contenu
   Appelé via : openSources(btn) où btn a data-sources="[...]"
────────────────────────────────────────────────────────── */
(function() {
  let overlay, panel;
  document.addEventListener('DOMContentLoaded', () => {
    overlay = Object.assign(document.createElement('div'), { className: 'sources-overlay' });
    overlay.onclick = closeSources;
    panel = document.createElement('div');
    panel.className = 'sources-panel';
    panel.innerHTML = '<div class="sources-handle"></div><div class="sources-title">📎 Sources</div><div class="sources-list" id="sources-list"></div>';
    document.body.append(overlay, panel);
  });

  window.openSources = function(btn) {
    try {
      const sources = JSON.parse(btn.dataset.sources);
      document.getElementById('sources-list').innerHTML = sources.map(s =>
        `<a class="source-item" href="${s.url}" target="_blank" rel="noopener">
          <span>🔗</span>
          <div><span class="source-item-label">${s.label}</span><span class="source-item-url">${s.url}</span></div>
        </a>`
      ).join('');
      overlay.classList.add('open');
      panel.classList.add('open');
      document.body.style.overflow = 'hidden';
    } catch(e) {}
  };
  window.closeSources = function() {
    overlay?.classList.remove('open');
    panel?.classList.remove('open');
    document.body.style.overflow = '';
  };
})();


/* ═══ 5/8 — WW3 : système de niveaux Débutant/Expert ═══ */

/*
 * WealthWaffle — ww3.js — Système de niveaux
 *
 * Deux niveaux : 🌱 Débutant / 🎓 Expert
 * Sauvegardé dans localStorage sous la clé 'ww_level'
 *
 * En mode Débutant : les sections .expert-body sont masquées
 *   → L'utilisateur peut les ouvrir en cliquant sur le bouton
 * En mode Expert : toutes les sections sont visibles
 *
 * Le toggle est dans le menu burger (mobile) et
 * via le badge injecté par ww-infra.js (desktop)
 */

(function() {
'use strict';

const LEVELS = [
  { key: 'debutant', label: '🌱 Débutant', color: '#7EC8A0' },
  { key: 'avance',   label: '🚀 Avancé',   color: '#c9b8ff' },
];

let currentLevel = localStorage.getItem('ww_level') || 'debutant';

function applyLevel(level) {
  currentLevel = level;
  localStorage.setItem('ww_level', level);

  // Show/hide expert-only blocks
  document.querySelectorAll('.expert-body').forEach(body => {
    if (level === 'avance') {
      body.classList.add('show');
      const btn = body.previousElementSibling;
      if (btn) btn.classList.add('open');
    } else {
      body.classList.remove('show');
      const btn = body.previousElementSibling;
      if (btn) btn.classList.remove('open');
    }
  });

  // Update pills
  document.querySelectorAll('.level-pill').forEach(pill => {
    const active = pill.dataset.level === level;
    pill.classList.toggle('level-pill-active', active);
    const levelObj = LEVELS.find(l => l.key === pill.dataset.level);
    if (active && levelObj) {
      pill.style.color = levelObj.color;
      pill.style.borderColor = levelObj.color + '50';
      pill.style.background = levelObj.color + '18';
    } else {
      pill.style.color = '';
      pill.style.borderColor = '';
      pill.style.background = '';
    }
  });
}

function buildToggles() {
  document.querySelectorAll('.level-toggle').forEach(toggle => {
    toggle.innerHTML = LEVELS.map(l =>
      `<button class="level-pill" data-level="${l.key}" onclick="setLevel('${l.key}')" title="${l.label}">${l.label}</button>`
    ).join('');
  });
}

// Wire up expert expand buttons
function initExpertButtons() {
  document.querySelectorAll('.expert-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      if (!body) return;
      const open = body.classList.toggle('show');
      btn.classList.toggle('open', open);
    });
  });
}

;

document.addEventListener('DOMContentLoaded', () => {
  buildToggles();
  initExpertButtons();
  applyLevel(currentLevel);
});

})();


/* ═══ 6/8 — WW4 : disclaimer, mode lecture, partage, progression ═══ */

/*
 * WealthWaffle — ww4.js — Couche UX
 *
 * - Disclaimer permanent (bandeau en bas)
 * - Mode lecture mobile
 * - Barre de partage social (WhatsApp, LinkedIn, X, copier lien)
 * - Suivi de progression de lecture par page
 * - Analytics locale (localStorage) — Matomo dans ww-infra.js
 */

(function() {
'use strict';

/* ─── DISCLAIMER ─────────────────────────────────────────
   Bandeau "Contenu éducatif — non agréé FSMA"
   Apparaît en bas de chaque page
────────────────────────────────────────────────────────── */
function injectDisclaimer() {
  if (document.querySelector('.ww-disclaimer')) return;
  const d = Object.assign(document.createElement('div'), { className: 'ww-disclaimer' });
  d.innerHTML = '<span>📋 Contenu éducatif — non agréé FSMA — pas de conseil financier personnalisé</span>' +
    '<button class="ww-disclaimer-close" onclick="this.parentElement.style.display=\'none\'" title="Fermer">✕</button>';
  document.body.appendChild(d);
}

/* ─── MODE LECTURE ───────────────────────────────────────
   Sur mobile uniquement — simplifie l'affichage pour lire
────────────────────────────────────────────────────────── */
const ReadMode = {
  active: false,
  toggle() {
    this.active = !this.active;
    document.body.classList.toggle('read-mode', this.active);
    const btn = document.querySelector('.read-mode-btn');
    if (btn) btn.textContent = this.active ? '✕ Quitter lecture' : '📖 Mode lecture';
  },
  init() {
    if (window.innerWidth >= 768) return; // desktop uniquement non affiché
    const btn = Object.assign(document.createElement('button'), {
      className: 'read-mode-btn',
      textContent: '📖 Mode lecture',
      onclick: () => this.toggle()
    });
    document.body.appendChild(btn);
  }
};

/* ─── BARRE DE PARTAGE ───────────────────────────────────
   Insérée automatiquement avant le footer
────────────────────────────────────────────────────────── */
function buildShareBar() {
  const title = document.title.replace(' — WealthWaffle', '');
  const url   = encodeURIComponent(location.href);
  const text  = encodeURIComponent('💡 ' + title + ' — à lire sur WealthWaffle 🧇');

  const bar = Object.assign(document.createElement('div'), { className: 'ww-share-bar' });
  bar.innerHTML =
    '<span class="ww-share-label">Partager</span>' +
    '<a class="ww-share-btn" href="https://wa.me/?text=' + text + '%20' + url + '" target="_blank" rel="noopener">💬 WhatsApp</a>' +
    '<a class="ww-share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=' + url + '" target="_blank" rel="noopener">💼 LinkedIn</a>' +
    '<a class="ww-share-btn" href="https://x.com/intent/tweet?text=' + text + '&url=' + url + '" target="_blank" rel="noopener">✕ X</a>' +
    '<button class="ww-share-btn ww-copy-btn" onclick="copyLink()" title="Copier le lien">🔗 Copier</button>';

  const footer = document.getElementById('ww-footer-placeholder');
  if (footer) footer.before(bar);
}

/* ─── PROGRESSION DE LECTURE ─────────────────────────────
   Marque les sections lues dans le TOC (localStorage)
────────────────────────────────────────────────────────── */
const Progress = {
  PAGE: location.pathname.split('/').pop() || 'index',
  save(id) {
    try {
      const data = JSON.parse(localStorage.getItem('ww_progress') || '{}');
      if (!data[this.PAGE]) data[this.PAGE] = [];
      if (!data[this.PAGE].includes(id)) {
        data[this.PAGE].push(id);
        localStorage.setItem('ww_progress', JSON.stringify(data));
        this.mark(id);
      }
    } catch(e) {}
  },
  mark(id) {
    const link = document.querySelector(`.toc-sidebar a[href="#${id}"]`);
    if (link) link.classList.add('toc-read');
  },
  init() {
    // Observer : quand une section est visible à 50%, on la marque comme lue
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting && e.target.id) this.save(e.target.id); });
    }, { threshold: 0.5 });
    document.querySelectorAll('.toc-target').forEach(el => obs.observe(el));
    // Restaurer les sections déjà lues
    try {
      const data = JSON.parse(localStorage.getItem('ww_progress') || '{}');
      (data[this.PAGE] || []).forEach(id => this.mark(id));
    } catch(e) {}
  }
};

/* ─── INIT ───────────────────────────────────────────────
   Tout s'initialise au chargement de la page
────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectDisclaimer();
  ReadMode.init();
  buildShareBar();
  Progress.init();
});

})();


/* ═══ 7/8 — WAFFY : assistant conversationnel ═══ */

/* ═══════════════════════════════════════
   WaffyChat — Conversational assistant
   Pure JS keyword matching + typewriter
   Persistent bottom-right bubble
═══════════════════════════════════════ */

(function() {

const KB = [
  { patterns: ['etf','fonds indiciel','tracker','msci world','vwce','iwda'],
    response: "Les ETF sont le meilleur outil pour 90% des investisseurs. Un seul ETF MSCI World (IWDA ou VWCE) suffit pour commencer — diversifié sur 1.400 entreprises dans 23 pays.",
    links: [{ label: "Comprendre les ETF", url: "invest.html#etf" }, { label: "ETF concrets avec ISIN", url: "invest.html#etf-noms" }] },

  { patterns: ['broker','courtier','degiro','trade republic','bolero','keytrade'],
    response: "Pour choisir un broker, deux critères essentiels : les frais par ordre et l'agrément réglementaire. Trade Republic (1€/ordre) et DEGIRO (2€+) sont les moins chers. Bolero et Keytrade gèrent la TOB automatiquement.",
    links: [{ label: "Comparatif brokers", url: "invest.html#brokers" }, { label: "Comparateurs", url: "comparateurs.html" }] },

  { patterns: ['dca','investir chaque mois','versement mensuel','automatique'],
    response: "Le DCA (investissement mensuel fixe) est la stratégie la plus efficace pour la plupart des investisseurs. Elle élimine le stress du timing de marché et s'automatise complètement.",
    links: [{ label: "Le DCA expliqué", url: "invest.html#dca" }] },

  { patterns: ['épargne pension','pension','retraite','1361','1310','990'],
    response: "L'épargne pension offre une réduction fiscale immédiate de 30% sur 990€ ou 25% sur 1.310€. Attention à la zone défavorable entre 990€ et 1.188€ — verser soit ≤990€, soit ≥1.188€.",
    links: [{ label: "Épargne pension", url: "tax.html#pension" }, { label: "Simulateur retraite", url: "calculateur-retraite.html" }] },

  { patterns: ['impôt','déclaration','fiscalité','ipp','tax','code fiscal','myminfin'],
    response: "La déclaration fiscale belge via MyMinfin (Tax-on-Web) est à soumettre avant fin juillet. De nombreuses déductions sont souvent ignorées : épargne pension, dons, frais de garde d'enfants.",
    links: [{ label: "Guide déclaration", url: "tax.html#declaration" }, { label: "Cheat sheet codes IPP", url: "tax.html#cheatsheet" }] },

  { patterns: ['crypto','bitcoin','btc','eth','ethereum','staking'],
    response: "La fiscalité crypto belge change dès 2026 : une contribution de solidarité de 10% s'applique aux plus-values, même pour les profils prudents. Documenter son portefeuille avant le 31/12/2025 est urgent.",
    links: [{ label: "Fiscalité crypto 2026", url: "crypto.html#fiscalite" }, { label: "Checklist 31/12/2025", url: "crypto.html#checklist2025" }] },

  { patterns: ['immobilier','acheter','louer','maison','appartement','droits enregistrement'],
    response: "En 2025, les droits d'enregistrement ont été réduits : 2% en Flandre et 3% en Wallonie pour la résidence principale. Bruxelles reste à 12,5% avec abattement.",
    links: [{ label: "Droits d'enregistrement 2025", url: "immo.html#droits" }, { label: "Acheter vs louer", url: "immo.html#achetvsloc" }] },

  { patterns: ['plci','indépendant','freelance','inasti','cotisation','tva'],
    response: "La PLCI est l'outil fiscal le plus puissant pour un indépendant : cotisations déductibles à 100% en frais professionnels, plafond ~3.965€/an en 2025.",
    links: [{ label: "Guide indépendants", url: "independants.html" }, { label: "PLCI détaillée", url: "independants.html#plci-detail" }] },

  { patterns: ['société','srl','vvprbis','is','impôt sociétés','dividende','réserve liquidation'],
    response: "En société, le taux IS est de 20% sur les premiers 100.000€ de bénéfices. Le VVPRbis permet de distribuer des dividendes à 15% PM (au lieu de 30%) pour les sociétés créées après 2013.",
    links: [{ label: "Guide sociétés", url: "societes.html" }, { label: "VVPRbis", url: "societes.html#vvprbis" }] },

  { patterns: ['succession','donation','héritage','droits succession','testament'],
    response: "La donation de son vivant peut réduire drastiquement les droits de succession. Un don bancaire (virement) est exonéré si le donateur survit 3 ans après le don.",
    links: [{ label: "Succession & donation", url: "succession.html" }, { label: "Donation de son vivant", url: "succession.html#donation" }] },

  { patterns: ['fonds urgence','épargne','compte épargne','matelas sécurité'],
    response: "Le fonds d'urgence est la priorité absolue avant tout investissement : 3 mois de dépenses (6 mois pour les indépendants), sur un compte épargne réglementé séparé.",
    links: [{ label: "Fonds d'urgence", url: "budget.html#urgence" }, { label: "Comptes épargne belges", url: "budget.html#comptes" }] },

  { patterns: ['inflation','pouvoir achat','prix','indice'],
    response: "L'inflation érode le pouvoir d'achat de l'épargne. À 2,5% d'inflation, 10.000€ aujourd'hui n'ont que le pouvoir d'achat de 6.070€ dans 20 ans. C'est pourquoi investir est indispensable.",
    links: [{ label: "L'inflation expliquée", url: "bases.html#inflation" }] },

  { patterns: ['obligation','bon etat','tob','reynders'],
    response: "Les obligations d'État belges offrent une fiscalité avantageuse. Attention à la taxe Reynders sur les ETF contenant plus de 10% d'obligations.",
    links: [{ label: "Obligations", url: "alternatives.html#obligations" }] },

  { patterns: ['or','gold','métal précieux'],
    response: "L'or est un actif de diversification, pas un moteur de rendement. Il ne génère ni dividendes ni intérêts. Recommandation : 5-10% maximum du portefeuille, via ETF or (ex: IGLN).",
    links: [{ label: "L'or comme investissement", url: "bases.html#or" }] },

  { patterns: ['commencer','débuter','débutant','par où','premier pas'],
    response: "La meilleure façon de commencer : 1️⃣ Fonds d'urgence (3 mois de dépenses) 2️⃣ Épargne pension (réduction fiscale 30%) 3️⃣ Ouvrir un compte broker 4️⃣ Acheter un ETF MSCI World 5️⃣ Automatiser et oublier.",
    links: [{ label: "Plan d'action complet", url: "invest.html#demarrer" }, { label: "Budget & Épargne", url: "budget.html" }] },

  { patterns: ['succession','donation','héritage','testament','droits succession','3 ans','don manuel'],
    response: "La donation de son vivant est l'outil le plus puissant pour réduire les droits de succession. Un simple virement bancaire suffit — exonéré si le donateur survit 3 ans. On peut donner des ETF, des titres ou des crypto de la même façon.",
    links: [{ label: "Succession & donation", url: "succession.html" }, { label: "Donation portefeuille financier", url: "succession.html#donation-financiere" }] },

  { patterns: ['vvprbis','réserve liquidation','is ','impôt société','dividende société','dirigeant'],
    response: "Pour un dirigeant de société, le VVPRbis réduit le précompte mobilier à 15% sur les dividendes (après 3 ans). La réserve de liquidation permet de distribuer des bénéfices à seulement 5% PM après 5 ans d'attente.",
    links: [{ label: "Guide sociétés", url: "societes.html" }, { label: "VVPRbis", url: "societes.html#vvprbis" }, { label: "Réserve de liquidation", url: "societes.html#reserve-liq" }] },

  { patterns: ['nft','non-fungible','token art','token unique'],
    response: "La fiscalité des NFT en Belgique est une zone grise — pas de circulaire spécifique. Les principes crypto s'appliquent par analogie : 0% (bon père de famille), 33% (spéculateur), droits d'auteur possibles pour les créateurs. DAC8 les couvrira dès 2026.",
    links: [{ label: "NFT — position fiscale belge", url: "crypto.html#nft" }] },

  { patterns: ['voiture','véhicule','co2','atn','avantage toute nature','frais voiture'],
    response: "Les frais de voiture d'un indépendant sont déductibles selon le taux CO₂. Les véhicules électriques sont déductibles à 100% jusqu'en 2030. L'usage professionnel doit être documenté via un carnet de bord.",
    links: [{ label: "Frais voiture indépendant", url: "independants.html#voiture" }] },

  { patterns: ['bureau domicile','bureau maison','espace travail','télétravail'],
    response: "Le bureau à domicile est déductible proportionnellement à sa surface. Formule : m² bureau / m² total du logement. Frais éligibles : loyer, électricité, chauffage, internet, mobilier de bureau.",
    links: [{ label: "Bureau à domicile", url: "independants.html#bureau" }] },

  { patterns: ['domiciliation','changer banque','négocier banque','taux hypothécaire banque'],
    response: "La domiciliation bancaire est un levier de négociation : réduction de taux hypothécaire, carte de crédit gratuite, assurances préférentielles. Ne jamais domicilier sans demander une contrepartie explicite.",
    links: [{ label: "Domiciliation bancaire", url: "budget.html#domiciliation" }] },

  { patterns: ['branche 21','branche 23','assurance vie','assurance-vie','capital garanti'],
    response: "La branche 21 garantit le capital avec un taux minimal. Exonération du PM de 30% après 8 ans et 1 jour si vous êtes le bénéficiaire. La branche 23 est liée à des fonds — potentiel plus élevé mais capital non garanti.",
    links: [{ label: "Branches 21 et 23", url: "invest.html#branches" }] },

  { patterns: ['sir','société immobilière','aedifica','wdp','cofinimmo','xior'],
    response: "Les SIR (Sociétés Immobilières Réglementées) permettent d'investir dans l'immobilier via la bourse. Rendement dividende 3–5%, PM réduit à 15% pour les SIR de santé (Aedifica, Care Property). Liquidité complète contrairement à l'immo physique.",
    links: [{ label: "SIR belges", url: "immo.html#sir" }] },

  { patterns: ['panorama','tous les investissements','comparatif','où investir','quel investissement'],
    response: "WealthWaffle propose un panorama complet de tous les véhicules d'investissement belges : ETF, actions, immo, obligations, crypto, or, crowdlending, coopératives, SIR, épargne pension — avec rendements, fiscalité et capital minimum.",
    links: [{ label: "Panorama des investissements", url: "invest-panorama.html" }] },

  { patterns: ['stock picking','action individuelle','analyser action','per ','dividende action'],
    response: "Le stock picking consiste à sélectionner des actions individuelles. Exigeant : 92% des professionnels sous-performent leur indice sur 15 ans. Les ratios clés à analyser : PER, rendement dividende, P/B, dette/EBITDA, ROE.",
    links: [{ label: "Guide stock picking", url: "invest-actions.html" }] },


  { patterns: ['tax shelter 45','tax shelter 30','tax shelter 25','micro-entreprise investir','scale-up réduction','startup réduction impôt'],
    response: "Le Tax Shelter belge offre 3 niveaux : 45% pour les micro-entreprises (< 10 employés), 30% pour les PME débutantes (< 50 employés, < 4 ans), 25% pour les scale-ups (4-10 ans, croissance 10%/an). Plafond : 100.000 €/an. Actions à garder 4 ans minimum.",
    links: [{ label: "Tax Shelter — 3 niveaux", url: "invest-equity.html#tax-shelter" }, { label: "Outils fiscaux", url: "outils-fiscaux.html" }] },

  { patterns: ['prêt proxi','winwin','winwinlening','coup de pouce','prêt pme région'],
    response: "Les régions belges ont des mécanismes de prêts aux PME avec crédit d'impôt : Wallonie (Coup de Pouce : 4%/an × 4 ans), Bruxelles (Proxi : 4%/an × 3 ans), Flandre (Winwinlening : 2,5%/an). Garantie 30% du capital prêté en cas de faillite.",
    links: [{ label: "Prêts régionaux", url: "invest-equity.html#prets-regionaux" }, { label: "Alternatives", url: "alternatives.html" }] },

  { patterns: ['règle 4%','retrait retraite','décumulation','vivre capital','rente mensuelle'],
    response: "La règle des 4% : capital nécessaire = dépenses annuelles × 25. Pour 2.500 €/mois de revenu depuis le capital : 750.000 €. Abattement belge : pas de taxe sur les plus-values ETF (bon père de famille). Horizon recommandé : calculer sur 30 ans minimum.",
    links: [{ label: "Rente & Décumulation", url: "rente.html" }, { label: "Simulateur retrait", url: "rente.html#simulateur" }] },

  { patterns: ['rente viagère','annuité','revenu garanti vie','assureur rente'],
    response: "La rente viagère garantit un revenu mensuel à vie en échange d'un capital remis à l'assureur. Imposée sur une fraction fixe selon l'âge : 25% à 65 ans, 20% à 75 ans. Irréversible — à comparer soigneusement avec la stratégie de retrait ETF.",
    links: [{ label: "Rente viagère belge", url: "rente.html#rente-viagere" }] },

  { patterns: ['fonds actif','sicav','gestion active','fonds banque','frais fonds'],
    response: "92% des fonds actifs sous-performent leur indice sur 15 ans (SPIVA 2023). Les frais réels (TER + rétrocessions + frais de transaction) atteignent souvent 2-3%/an — un ETF monde coûte 0,07-0,22%/an. La différence sur 25 ans représente des dizaines de milliers d'euros.",
    links: [{ label: "Fonds actifs vs ETF", url: "invest-fonds.html" }, { label: "Impact des frais", url: "invest-fonds.html#frais" }] },

  { patterns: ['rétrocession','commission banque fonds','conflit intérêt conseiller'],
    response: "Une rétrocession est une commission versée par le gestionnaire du fonds à votre banque — 0,5 à 1%/an de votre capital, chaque année. MiFID II oblige sa déclaration mais elle reste souvent enfouie dans les documents contractuels.",
    links: [{ label: "Rétrocessions expliquées", url: "invest-fonds.html#retrocessions" }] },

  { patterns: ['winwinlening','winwin flandre','prêt flamand pme'],
    response: "Le Winwinlening flamand permet aux particuliers domiciliés en Flandre de prêter à des PME flamandes. Crédit d'impôt : 2,5%/an + garantie régionale 30% en cas de défaut. Max 75.000 € par prêteur.",
    links: [{ label: "Winwinlening", url: "invest-equity.html#prets-regionaux" }] },

  { patterns: ['fiche de paie','onss','précompte professionnel','salaire brut net'],
    response: "Sur une fiche de paie belge : cotisation ONSS salariale 13,07% (sécurité sociale), cotisation spéciale SS variable, précompte professionnel (impôt à la source). La différence brut-net est souvent de 35-45% selon le salaire.",
    links: [{ label: "Fiche de paie décryptée", url: "tax.html#fiche-paie" }] },

];

function match(input) {
  const lq = input.toLowerCase();
  for (const item of KB) {
    if (item.patterns.some(p => lq.includes(p))) return item;
  }
  return null;
}

function typewrite(el, text, speed = 18) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

function buildChat() {
  // Container
  const container = document.createElement('div');
  container.id = 'waffy-chat';
  container.innerHTML = `
    <button class="waffy-bubble" id="waffy-toggle" onclick="toggleWaffy()" title="Poser une question à Waffy">
      <img src="IMG_5208.png" alt="Waffy" class="waffy-avatar" onerror="this.style.display='none';this.parentElement.innerHTML='🧇';">
      <span class="waffy-badge" id="waffy-badge">1</span>
    </button>
    <div class="waffy-panel" id="waffy-panel">
      <div class="waffy-header">
        <div class="waffy-header-info">
          <span class="waffy-name">Waffy</span>
          <span class="waffy-status">● En ligne</span>
        </div>
        <button class="waffy-close" onclick="toggleWaffy()">✕</button>
      </div>
      <div class="waffy-messages" id="waffy-messages">
        <div class="waffy-msg waffy-msg-bot">
          <div class="waffy-msg-text">Bonjour ! Je suis Waffy, votre guide financier. Posez-moi une question — budget, investissement, fiscalité, immobilier, crypto — je vous oriente vers la bonne ressource.</div>
        </div>
      </div>
      <div class="waffy-input-wrap">
        <input class="waffy-input" id="waffy-input" type="text" placeholder="Ex: Comment investir en ETF ?"
          onkeydown="if(event.key==='Enter') sendWaffy()">
        <button class="waffy-send" onclick="sendWaffy()">→</button>
      </div>
      <div class="waffy-quick-replies" id="waffy-quick">
        <button onclick="askWaffy('Comment commencer à investir ?')">Par où commencer ?</button>
        <button onclick="askWaffy('Épargne pension Belgique')">Épargne pension</button>
        <button onclick="askWaffy('Fiscalité crypto 2026')">Crypto & fisc</button>
        <button onclick="askWaffy('PLCI indépendant')">Je suis indépendant</button>
      </div>
    </div>
  `;
  document.body.appendChild(container);
}

;

window.askWaffy = function(q) {
  const input = document.getElementById('waffy-input');
  if (input) input.value = q;
  sendWaffy();
};

window.sendWaffy = function() {
  const input = document.getElementById('waffy-input');
  const messages = document.getElementById('waffy-messages');
  const quickReplies = document.getElementById('waffy-quick');
  if (!input || !messages) return;
  const q = input.value.trim();
  if (!q) return;
  input.value = '';

  // Hide quick replies
  if (quickReplies) quickReplies.style.display = 'none';

  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'waffy-msg waffy-msg-user';
  userMsg.innerHTML = `<div class="waffy-msg-text">${q}</div>`;
  messages.appendChild(userMsg);

  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'waffy-msg waffy-msg-bot waffy-typing';
  typing.innerHTML = '<div class="waffy-msg-text"><span class="waffy-dots"><span>.</span><span>.</span><span>.</span></span></div>';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const result = match(q);
    const botMsg = document.createElement('div');
    botMsg.className = 'waffy-msg waffy-msg-bot';

    if (result) {
      const linksHtml = result.links.map(l =>
        `<a href="${l.url}" class="waffy-link">${l.label} →</a>`
      ).join('');
      botMsg.innerHTML = `
        <div class="waffy-msg-text" id="wt-${Date.now()}"></div>
        <div class="waffy-links">${linksHtml}</div>
      `;
      messages.appendChild(botMsg);
      typewrite(botMsg.querySelector('.waffy-msg-text'), result.response);
    } else {
      botMsg.innerHTML = `
        <div class="waffy-msg-text" id="wt-${Date.now()}"></div>
        <div class="waffy-links">
          <a href="glossaire.html" class="waffy-link">📖 Glossaire →</a>
          <a href="outils.html" class="waffy-link">🛠️ Tous les outils →</a>
        </div>
      `;
      messages.appendChild(botMsg);
      typewrite(botMsg.querySelector('.waffy-msg-text'),
        "Je n'ai pas trouvé de réponse précise à cette question. Essayez de reformuler, ou consultez le glossaire et les outils disponibles.");
    }
    messages.scrollTop = messages.scrollHeight;
  }, 900 + Math.random() * 400);
};

document.addEventListener('DOMContentLoaded', buildChat);

})();


/* ═══ 8/8 — INFRA : raccourcis, print, page meta, Matomo, niveaux ═══ */


// ── Matomo Analytics (privacy-friendly) ────────────────────
// Replace MATOMO_URL with your Matomo instance URL
(function() {
  var _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  var u = window.WW_MATOMO_URL || ''; // Set window.WW_MATOMO_URL = "https://your.matomo.instance/"
  if (!u) return; // No URL configured — skip tracking
  _paq.push(['setTrackerUrl', u + 'matomo.php']);
  _paq.push(['setSiteId', window.WW_MATOMO_SITE_ID || '1']);
  var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
  g.async = true; g.src = u + 'matomo.js';
  s.parentNode.insertBefore(g, s);
})();


/* ═══════════════════════════════════════════════════════════
   WEALTHWAFFLE — Infrastructure Layer
   Keyboard shortcuts · Print button · Page meta · 
   Waffy profile memory · Waffy contextual replies
   Injected via ww-bundle.js
═══════════════════════════════════════════════════════════ */

(function() {
'use strict';

// ── Page meta injection (last updated + report error) ────────
// Each page sets window.WW_PAGE_META = { updated, name } in a tiny inline script
// Fallback: generic values
function injectPageMeta() {
  const meta    = window.WW_PAGE_META || {};
  const updated = meta.updated || 'Janvier 2026';
  const name    = meta.name || document.title.replace(' — WealthWaffle','');

  // ── Barre page meta ──
  const el = document.createElement('div');
  el.className = 'ww-page-meta';
  el.innerHTML =
    '<span class="ww-last-updated">Mis à jour : ' + updated + '</span>' +
    '<button class="ww-report-error" onclick="openErrorReport()" title="Signaler une erreur de contenu">⚑ Signaler une erreur</button>';
  const footer = document.getElementById('ww-footer-placeholder');
  if (footer) footer.before(el);

  // ── Modal signalement erreur ──
  if (document.getElementById('ww-error-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'ww-error-modal';
  modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(8,7,23,0.80);z-index:9100;align-items:center;justify-content:center;padding:20px;';
  modal.innerHTML = `
    <div style="background:var(--s2);border:1px solid var(--border);border-radius:20px;padding:24px;width:100%;max-width:480px;position:relative;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <div style="font-family:'DM Serif Display',serif;font-style:italic;font-size:1.1rem;color:var(--text);">⚑ Signaler une erreur</div>
        <button onclick="closeErrorReport()" style="background:none;border:none;color:var(--muted);font-size:1.1rem;cursor:pointer;">✕</button>
      </div>
      <p style="font-size:0.76rem;color:var(--muted);margin-bottom:16px;line-height:1.6;">Merci de prendre le temps de signaler une erreur — ça nous aide à améliorer le contenu pour tous.</p>

      <div style="display:flex;flex-direction:column;gap:10px;">
        <div>
          <label style="font-size:0.70rem;font-weight:700;color:var(--muted);display:block;margin-bottom:4px;">Page concernée</label>
          <input id="err-page" readonly style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:9px;padding:8px 12px;font-family:'DM Sans',sans-serif;font-size:0.80rem;color:var(--muted);box-sizing:border-box;" value="">
        </div>
        <div>
          <label style="font-size:0.70rem;font-weight:700;color:var(--muted);display:block;margin-bottom:4px;">L'erreur que tu as trouvée *</label>
          <textarea id="err-description" rows="3" placeholder="Décris l'information incorrecte..." style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:9px;padding:8px 12px;font-family:'DM Sans',sans-serif;font-size:0.80rem;color:var(--text);outline:none;resize:vertical;box-sizing:border-box;"></textarea>
        </div>
        <div>
          <label style="font-size:0.70rem;font-weight:700;color:var(--muted);display:block;margin-bottom:4px;">La correction suggérée (si tu la connais)</label>
          <textarea id="err-correction" rows="2" placeholder="Ce qui devrait être écrit à la place..." style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:9px;padding:8px 12px;font-family:'DM Sans',sans-serif;font-size:0.80rem;color:var(--text);outline:none;resize:vertical;box-sizing:border-box;"></textarea>
        </div>
        <div>
          <label style="font-size:0.70rem;font-weight:700;color:var(--muted);display:block;margin-bottom:4px;">Source ou référence (optionnel)</label>
          <input id="err-source" type="text" placeholder="Lien, document, règlement..." style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:9px;padding:8px 12px;font-family:'DM Sans',sans-serif;font-size:0.80rem;color:var(--text);outline:none;box-sizing:border-box;">
        </div>
        <div>
          <label style="font-size:0.70rem;font-weight:700;color:var(--muted);display:block;margin-bottom:4px;">Ton email (pour qu'on te remercie)</label>
          <input id="err-email" type="email" placeholder="ton@email.be" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:9px;padding:8px 12px;font-family:'DM Sans',sans-serif;font-size:0.80rem;color:var(--text);outline:none;box-sizing:border-box;">
        </div>
        <div id="err-result" style="display:none;"></div>
        <button onclick="submitErrorReport()" id="err-submit"
          style="width:100%;padding:12px;border-radius:11px;border:none;background:linear-gradient(135deg,#E87CC3,#5BB8D4);color:#fff;font-family:'DM Sans',sans-serif;font-weight:700;font-size:0.88rem;cursor:pointer;">
          Envoyer le signalement →
        </button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  // Préremplir la page
  document.getElementById('err-page').value = name + ' (' + location.pathname + ')';
  // Préremplir email si connecté
  if (window.WW?.user?.email) {
    const emailField = document.getElementById('err-email');
    if (emailField) emailField.value = window.WW.user.email;
  }
}

window.openErrorReport = function() {
  const modal = document.getElementById('ww-error-modal');
  if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
};

window.closeErrorReport = function() {
  const modal = document.getElementById('ww-error-modal');
  if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
};

window.submitErrorReport = async function() {
  const description = document.getElementById('err-description')?.value?.trim();
  const correction  = document.getElementById('err-correction')?.value?.trim();
  const source      = document.getElementById('err-source')?.value?.trim();
  const email       = document.getElementById('err-email')?.value?.trim();
  const page        = document.getElementById('err-page')?.value;
  const result      = document.getElementById('err-result');
  const btn         = document.getElementById('err-submit');

  if (!description) {
    document.getElementById('err-description').style.borderColor = 'var(--rose)';
    return;
  }

  btn.textContent = 'Envoi…'; btn.disabled = true;

  const payload = {
    page,
    description,
    correction: correction || null,
    source: source || null,
    email: email || null,
    user_id: window.WW?.user?.id || null,
    status: 'nouveau',
    created_at: new Date().toISOString(),
  };

  try {
    // 1. Supabase
    if (window.WW?.sb) {
      await window.WW.sb.from('error_reports').insert(payload);
    }
    // 2. Brevo — email à erreur@wealthwaffle.be
    const pageName = window.WW_PAGE_META?.name || page;
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': window.WW_CONFIG?.BREVO_KEY || '' },
      body: JSON.stringify({
        sender: { name: 'WealthWaffle Erreurs', email: 'noreply@wealthwaffle.be' },
        to: [{ email: 'erreur@wealthwaffle.be', name: 'WealthWaffle' }],
        subject: '⚑ Erreur signalée — ' + pageName,
        htmlContent:
          '<h2>Erreur signalée sur WealthWaffle</h2>' +
          '<p><strong>Page :</strong> ' + page + '</p>' +
          '<p><strong>Erreur :</strong> ' + description + '</p>' +
          (correction ? '<p><strong>Correction suggérée :</strong> ' + correction + '</p>' : '') +
          (source     ? '<p><strong>Source :</strong> ' + source + '</p>' : '') +
          (email      ? '<p><strong>Signalé par :</strong> ' + email + '</p>' : '<p><em>Anonyme</em></p>'),
      }),
    });
    // 3. Email de remerciement si email fourni
    if (email) {
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': window.WW_CONFIG?.BREVO_KEY || '' },
        body: JSON.stringify({
          sender: { name: 'WealthWaffle', email: 'noreply@wealthwaffle.be' },
          to: [{ email }],
          subject: 'Merci pour ton signalement — WealthWaffle 🧇',
          htmlContent:
            '<p>Merci d\'avoir pris le temps de signaler une erreur sur WealthWaffle.</p>' +
            '<p>Notre équipe va vérifier et corriger si nécessaire. Si la correction est significative, nous t\'en informerons.</p>' +
            '<p>Dans 10 ans, tu te remercieras. 🧇</p>' +
            '<p>L\'équipe WealthWaffle</p>',
        }),
      });
    }
    if (result) {
      result.style.display = 'block';
      result.style.cssText = 'display:block;background:rgba(126,200,160,0.08);border:1px solid rgba(126,200,160,0.25);border-radius:9px;padding:10px 14px;font-size:0.78rem;color:#7EC8A0;text-align:center;';
      result.textContent = '✅ Signalement envoyé — merci ! On vérifie ça rapidement.';
    }
    btn.style.display = 'none';
    setTimeout(closeErrorReport, 3000);
  } catch(e) {
    btn.textContent = 'Envoyer →'; btn.disabled = false;
    if (result) { result.style.display = 'block'; result.textContent = 'Erreur d\'envoi — réessaie dans un instant.'; }
  }
};

// ── Print button (discrete) ──────────────────────────────────
function injectPrintButton() {
  const PRINT_PAGES = [
    'tax.html','outils-fiscaux.html','independants.html',
    'societes.html','crypto.html','invest-etf.html','invest-obligations.html'
  ];
  const page = location.pathname.split('/').pop() || 'index.html';
  if (!PRINT_PAGES.includes(page)) return;

  const btn = document.createElement('button');
  btn.className = 'ww-print-btn';
  btn.innerHTML = '🖨';
  btn.title = 'Imprimer cette page (raccourci : p)';
  btn.setAttribute('aria-label', 'Imprimer');
  btn.onclick = () => window.print();
  document.body.appendChild(btn);
}

// ── Remove theme toggle from top nav bar ─────────────────────
// (it lives in the burger menu — no need for it in the top bar too)
function removeTopBarThemeBtn() {
  // Wait for nav to load then remove the theme-btn from the bar
  // (keep only the one inside mobile-menu)
  setTimeout(() => {
    const navRight = document.querySelector('.nav-right .theme-btn');
    if (navRight) navRight.remove();
  }, 400);
}

// ── Keyboard shortcuts ───────────────────────────────────────
function initKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    // Skip if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' ||
        e.target.tagName === 'SELECT' || e.target.isContentEditable) return;

    switch(e.key) {
      case '/':
        e.preventDefault();
        // Focus search input if available
        const si = document.getElementById('ww-search-input');
        if (si) { si.focus(); si.select(); }
        break;

      case 'p':
      case 'P':
        // Print only on print-eligible pages
        const page = location.pathname.split('/').pop();
        const printPages = ['tax.html','outils-fiscaux.html','independants.html',
          'societes.html','crypto.html','invest-etf.html','invest-obligations.html'];
        if (printPages.includes(page)) window.print();
        break;

      case 'w':
      case 'W':
        // Open/close Waffy
        if (typeof toggleWaffy === 'function') toggleWaffy();
        break;

      case 'Escape':
        // Close search
        if (typeof closeSearch === 'function') closeSearch();
        // Close Waffy panel
        const panel = document.getElementById('waffy-panel');
        if (panel && panel.classList.contains('open')) {
          if (typeof toggleWaffy === 'function') toggleWaffy();
        }
        break;
    }
  });
}

// ── Waffy: profile memory ────────────────────────────────────
function waffyLoadProfile() {
  try {
    const saved = localStorage.getItem('ww_profile');
    if (!saved) return null;
    return JSON.parse(saved);
  } catch(e) { return null; }
}

function waffyProfileGreeting() {
  const profile = waffyLoadProfile();
  if (!profile || !profile.answers) return null;

  const { situation, horizon, priorite } = profile.answers || {};
  const greetings = {
    particulier: 'Bonjour ! En tant que particulier',
    independant: 'Bonjour ! En tant qu\'indépendant',
    dirigeant:   'Bonjour ! En tant que dirigeant de société',
  };
  const contexts = {
    securite: 'je me concentre sur les outils de sécurisation.',
    investir: 'je vous oriente vers les stratégies d\'investissement.',
    optimiser:'je vous aide à optimiser votre fiscalité.',
    comprendre:'je vous explique les bases essentielles.',
  };

  const greeting = greetings[situation] || 'Bonjour !';
  const context  = contexts[priorite]   || 'comment puis-je vous aider ?';
  return `${greeting}, ${context}`;
}

// Inject profile greeting into Waffy on open
const _origToggleWaffy = window.toggleWaffy;
window.toggleWaffy = function() {
  if (typeof _origToggleWaffy === 'function') _origToggleWaffy();
  // After opening, check if we should show profile greeting
  setTimeout(() => {
    const panel = document.getElementById('waffy-panel');
    if (!panel || !panel.classList.contains('open')) return;
    if (panel.dataset.profileGreeted) return; // only once per session

    const greeting = waffyProfileGreeting();
    if (!greeting) return;

    const messages = document.getElementById('waffy-messages');
    if (!messages) return;

    const msg = document.createElement('div');
    msg.className = 'waffy-msg waffy-msg-bot';
    msg.innerHTML = '<div class="waffy-msg-text" style="background:rgba(91,184,212,0.10);border:1px solid rgba(91,184,212,0.15);">' +
      '👤 ' + greeting + '</div>';
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    panel.dataset.profileGreeted = '1';
  }, 350);
};

// ── Waffy: contextual quick replies per page ─────────────────
const WAFFY_CONTEXT = {
  'invest-etf.html': [
    { label: 'IWDA vs VWCE ?',     q: 'Différence entre IWDA et VWCE' },
    { label: 'TOB sur DEGIRO',     q: 'Comment déclarer la TOB avec DEGIRO' },
    { label: 'DCA automatique',    q: 'Comment mettre en place un DCA automatique' },
    { label: 'Taxe Reynders',      q: 'Qu\'est-ce que la taxe Reynders ETF' },
  ],
  'invest-obligations.html': [
    { label: 'Bons d\'État belges',  q: 'Comment acheter des bons d\'État belges' },
    { label: 'Taxe Reynders',        q: 'Taxe Reynders obligations ETF' },
    { label: 'ETF obligataires',     q: 'Meilleur ETF obligataire pour belge' },
  ],
  'invest-equity.html': [
    { label: 'Tax Shelter 45%',     q: 'Comment fonctionne le Tax Shelter startup' },
    { label: 'Plateformes agréées', q: 'Plateformes crowdfunding agréées FSMA' },
    { label: 'ELTIF 2.0',           q: 'Qu\'est-ce que l\'ELTIF accessible particuliers' },
  ],
  'invest-fonds.html': [
    { label: 'Fonds vs ETF',        q: 'Pourquoi les ETF surperforment les fonds actifs' },
    { label: 'Frais réels',         q: 'Quels sont les frais réels d\'un fonds actif' },
    { label: 'Rétrocessions',       q: 'Qu\'est-ce qu\'une rétrocession fonds bancaire' },
  ],
  'invest-panorama.html': [
    { label: 'Par où commencer ?',  q: 'Quel investissement choisir en Belgique' },
    { label: 'ETF ou immo ?',       q: 'ETF ou immobilier en Belgique' },
    { label: 'Crypto en 2026',      q: 'Fiscalité crypto Belgique 2026' },
  ],
  'invest-actions.html': [
    { label: 'Analyser une action', q: 'Comment analyser une action PER dividende' },
    { label: 'Dividendes belges',   q: 'Fiscalité dividendes actions belges' },
    { label: 'Euronext Brussels',   q: 'Comment investir Euronext Bruxelles' },
  ],
  'tax.html': [
    { label: 'Plus-values 2026',    q: 'Taxe plus-values bourse Belgique 2026' },
    { label: 'Épargne pension',     q: 'Épargne pension plafond 2026' },
    { label: 'Codes IPP',           q: 'Codes IPP déclaration fiscale belge' },
    { label: 'Droits d\'auteur IT', q: 'Régime droits d\'auteur informatique 2025' },
  ],
  'crypto.html': [
    { label: 'Taxe 10% 2026',       q: 'Contribution solidarité crypto 10% 2026' },
    { label: 'Guide Koinly',        q: 'Comment utiliser Koinly Belgique' },
    { label: 'Déclarer un exchange',q: 'Déclarer compte exchange étranger BNB' },
    { label: 'NFT fiscalité',       q: 'Fiscalité NFT Belgique' },
  ],
  'immo.html': [
    { label: 'Droits d\'enreg. 2025', q: 'Droits enregistrement Belgique 2025' },
    { label: 'Acheter vs louer',      q: 'Acheter ou louer en Belgique calcul' },
    { label: 'Rendement locatif',     q: 'Calcul rendement locatif net Belgique' },
  ],
  'independants.html': [
    { label: 'PLCI optimale',       q: 'PLCI cotisation optimale indépendant' },
    { label: 'Frais voiture',       q: 'Frais voiture déductibles indépendant' },
    { label: 'Versements anticipés',q: 'Versements anticipés dates 2026' },
    { label: 'TVA seuil',           q: 'Seuil TVA indépendant 2026' },
  ],
  'societes.html': [
    { label: 'VVPRbis',             q: 'VVPRbis dividendes taux réduit' },
    { label: 'Réserve liquidation', q: 'Réserve de liquidation société belge' },
    { label: 'Salaire vs dividende',q: 'Salaire ou dividende dirigeant société' },
  ],
  'budget.html': [
    { label: 'Fonds urgence',       q: 'Fonds urgence combien épargner' },
    { label: 'Domiciliation',       q: 'Domiciliation bancaire avantages' },
    { label: '50/30/20',            q: 'Règle 50 30 20 budget belge' },
  ],
  'succession.html': [
    { label: 'Don manuel 0%',       q: 'Donation argent exonérée Belgique' },
    { label: 'Droits succession',   q: 'Droits succession Belgique par région' },
    { label: 'Donner ETF',          q: 'Donation portefeuille ETF Belgique' },
  ],
  'outils-fiscaux.html': [
    { label: 'Plafonds 2026',       q: 'Plafonds fiscaux 2026 Belgique' },
    { label: 'PLCI simulateur',     q: 'PLCI indépendant calculer' },
    { label: 'IS vs IPP',           q: 'Société ou personne physique impôt' },
  ],
  'rente.html': [
    { label: 'Règle des 4%',        q: 'Règle 4% retraite Belgique' },
    { label: 'Rente viagère',       q: 'Rente viagère belge fiscalité' },
    { label: 'Ordre de retrait',    q: 'Ordre retrait capital retraite Belgique' },
  ],
  'epargne-long-terme.html': [
    { label: 'Branche 21 vs 23',    q: 'Branche 21 ou 23 assurance vie' },
    { label: 'Assurance-groupe',    q: 'Assurance groupe consulter sigedis' },
    { label: 'ELT cumul pension',   q: 'Cumuler épargne pension et ELT' },
  ],
};

function initWaffyContextualReplies() {
  // Wait for Waffy to be built
  const tryInit = () => {
    const quickDiv = document.getElementById('waffy-quick');
    if (!quickDiv) { setTimeout(tryInit, 600); return; }

    const page = location.pathname.split('/').pop() || 'index.html';
    const items = WAFFY_CONTEXT[page];
    if (!items || !items.length) return; // keep defaults

    // Replace quick replies
    quickDiv.innerHTML = items.map(item =>
      '<button onclick="askWaffy(\'' + item.q.replace(/'/g, "\\'") + '\')">' +
      item.label + '</button>'
    ).join('');
  };
  setTimeout(tryInit, 800);
}

// ── Init all on DOMContentLoaded ─────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  injectPageMeta();
  injectPrintButton();
  removeTopBarThemeBtn();
  initKeyboardShortcuts();
  initWaffyContextualReplies();
});

})();


// ── Level system v3 — body data attribute + visual badge ──
// Patch on top of existing ww3.js behaviour
document.addEventListener('DOMContentLoaded', function() {
  function applyLevelVisual(level) {
    // Set data attribute on body for CSS targeting
    document.body.setAttribute('data-level', level);

    // Update or create mode badge next to page eyebrow
    const eyebrow = document.querySelector('.eyebrow');
    if (eyebrow) {
      let badge = document.getElementById('ww-mode-badge');
      if (!badge) {
        badge = document.createElement('span');
        badge.id = 'ww-mode-badge';
        badge.className = 'ww-mode-badge';
        badge.onclick = function() {
          const cur = localStorage.getItem('ww_level') || 'debutant';
          const next = cur === 'debutant' ? 'avance' : 'debutant';
          if (typeof setLevel === 'function') setLevel(next);
          applyLevelVisual(next);
        };
        eyebrow.insertAdjacentElement('afterend', badge);
      }
      if (level === 'avance') {
        badge.className = 'ww-mode-badge avance';
        badge.textContent = '🚀 Mode Avancé';
      } else {
        badge.className = 'ww-mode-badge debutant';
        badge.textContent = '🌱 Mode Débutant';
      }
    }
  }

  // Run once on load
  const saved = localStorage.getItem('ww_level') || 'debutant';
  applyLevelVisual(saved);

  // Watch for level changes from ww3.js
  const orig = window.setLevel;
  window.setLevel = function(level) {
    if (orig) orig(level);
    applyLevelVisual(level);
  };
});



/* ═══ SERVICE WORKER ═══════════════════════════════════════
   Enregistre le service worker pour le mode hors-ligne (PWA)
   sw.js est à la racine du site
═══════════════════════════════════════════════════════════ */
(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(function() {});
  }
})();

/* ═══ MOTEUR D'INJECTION WW_DATA ═══════════════════════════════════════════
 *
 * Lit window.WW_DATA (défini dans data.js) et injecte les valeurs dans les
 * éléments HTML qui ont des attributs data-ww-*.
 *
 * TROIS MODES D'UTILISATION dans le HTML :
 *
 * 1. VALEUR SIMPLE
 *    <span data-ww="ep_a_plafond" data-fmt="eur"></span>
 *    → affiche "1.050 €"
 *    Formats : eur | pct | num | txt
 *
 * 2. PHRASE TEMPLATE (plusieurs valeurs dans une phrase)
 *    <span data-ww-tpl="Versez {ep_a_plafond:eur} et économisez {ep_a_plafond*ep_a_taux/100:eur}"></span>
 *    → affiche "Versez 1.050 € et économisez 315 €"
 *    Syntaxe : {clé:format} ou {expression_js:format}
 *
 * 3. CALCUL (valeur dérivée d'autres valeurs)
 *    <span data-ww-calc="ep_a_plafond * ep_a_taux / 100" data-fmt="eur"></span>
 *    → calcule 1050 × 30 / 100 = 315 → affiche "315 €"
 *
 * Si WW_DATA n'est pas chargé (data.js manquant), le moteur s'arrête
 * silencieusement — la page reste lisible sans les valeurs injectées.
 * ═══════════════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ── Formateurs ───────────────────────────────────────────────────── */
  function fmt(value, format) {
    if (value === null || value === undefined) return '—';
    switch ((format || 'num').toLowerCase()) {
      case 'eur':
        // 1050 → "1.050 €"
        return Number(value).toLocaleString('fr-BE', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        }) + ' €';
      case 'pct':
        // 30 → "30%"
        return Number(value).toLocaleString('fr-BE', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        }) + '%';
      case 'num':
        return Number(value).toLocaleString('fr-BE', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        });
      case 'txt':
      default:
        return String(value);
    }
  }

  /* ── Évaluation sécurisée d'une expression avec les données WW ───── */
  function evalExpr(expr, data) {
    // Remplace les clés par leurs valeurs numériques
    // Ex: "ep_a_plafond * ep_a_taux / 100" → "1050 * 30 / 100"
    let safe = expr.trim();
    // Trier les clés par longueur décroissante pour éviter les remplacements partiels
    const keys = Object.keys(data).sort((a, b) => b.length - a.length);
    keys.forEach(key => {
      const val = data[key];
      if (typeof val === 'number') {
        safe = safe.replace(new RegExp('\\b' + key + '\\b', 'g'), String(val));
      }
    });
    // N'autoriser que les opérations mathématiques de base
    if (!/^[\d\s\+\-\*\/\(\)\.]+$/.test(safe)) return null;
    try { return Function('"use strict"; return (' + safe + ')')(); }
    catch(e) { return null; }
  }

  /* ── Traitement d'un template ─────────────────────────────────────
     "{ep_a_plafond:eur} versés → {ep_a_plafond*ep_a_taux/100:eur} d'économie"
  ─────────────────────────────────────────────────────────────────── */
  function processTemplate(tpl, data) {
    return tpl.replace(/\{([^}:]+)(?::([^}]+))?\}/g, function(_, expr, format) {
      const val = evalExpr(expr, data);
      return val !== null ? fmt(val, format || 'num') : '{' + expr + '}';
    });
  }

  /* ── Injection principale ─────────────────────────────────────────── */
  function injectData() {
    const D = window.WW_DATA;
    if (!D) return; // data.js non chargé — silencieux

    // Mode 1 : data-ww="clé" + data-fmt="format"
    document.querySelectorAll('[data-ww]').forEach(el => {
      const key = el.dataset.ww;
      const val = D[key];
      if (val !== undefined) {
        el.textContent = fmt(val, el.dataset.fmt || 'num');
      }
    });

    // Mode 2 : data-ww-tpl="phrase avec {clés:format}"
    document.querySelectorAll('[data-ww-tpl]').forEach(el => {
      el.textContent = processTemplate(el.dataset.wwTpl, D);
    });

    // Mode 3 : data-ww-calc="expression" + data-fmt="format"
    document.querySelectorAll('[data-ww-calc]').forEach(el => {
      const val = evalExpr(el.dataset.wwCalc, D);
      if (val !== null) {
        el.textContent = fmt(val, el.dataset.fmt || 'num');
      }
    });
  }

  // Injecter au chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectData);
  } else {
    injectData(); // DOM déjà prêt
  }

  // Exposer pour usage manuel si besoin
  window.WW_inject = injectData;
  window.WW_fmt    = fmt;

})();


/* ═══ CORRECTIFS — Fonctions manquantes identifiées lors de l'audit ═══════
 *
 * Ces fonctions étaient appelées dans les pages HTML mais absentes du bundle.
 * Regroupées ici pour faciliter la maintenance future.
 * ══════════════════════════════════════════════════════════════════════════ */

/* ── Recherche — openSearch() manquait ──────────────────────────────────
   La nav contient un bouton loupe qui appellait closeSearch() sans openSearch().
   openSearch ouvre le panel de recherche défini dans ui-components.html.
─────────────────────────────────────────────────────────────────────────── */
window.openSearch = function() {
  // La barre de recherche est intégrée dans nav.html (toujours visible)
  // openSearch() focus simplement l'input de recherche
  const inp = document.getElementById('ww-search-input');
  if (inp) {
    inp.focus();
    inp.select();
    // Déclencher la recherche si une valeur est déjà présente
    if (inp.value && typeof doSearch === 'function') doSearch(inp.value);
  }
};

/* ── Questionnaire index.html — alias manquants ─────────────────────────
   Le questionnaire d'orientation utilise qInit() dans le bundle mais
   certains boutons appelaient qReset() (ancien nom).
─────────────────────────────────────────────────────────────────────────── */
window.qReset = function() {
  if (typeof qInit === 'function') qInit();
};

/* ── Profil utilisateur — clearProfile() ────────────────────────────────
   Efface le profil (débutant/expert + mémorisation) du localStorage.
─────────────────────────────────────────────────────────────────────────── */
window.clearProfile = function() {
  localStorage.removeItem('ww_level');
  localStorage.removeItem('ww_profile');
  localStorage.removeItem('ww_progress');
  document.body.removeAttribute('data-level');
  const badge = document.getElementById('ww-mode-badge');
  if (badge) badge.remove();
  // Recharger pour appliquer l'état vierge
  location.reload();
};

/* ── scrollToSection() — ancre smooth ───────────────────────────────────
   Appelé dans certains boutons "voir plus" / "aller à la section".
─────────────────────────────────────────────────────────────────────────── */
window.scrollToSection = function(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ── filterFAQ() — recherche temps réel sur faq.html ───────────────────
   Défini inline dans faq.html mais exposé globalement pour robustesse.
─────────────────────────────────────────────────────────────────────────── */
window.filterFAQ = window.filterFAQ || function(q) {
  const lq = (q || '').toLowerCase();
  document.querySelectorAll('.faq-item').forEach(function(item) {
    const kw = item.dataset.keywords || item.textContent;
    item.style.display = (!lq || kw.toLowerCase().includes(lq)) ? '' : 'none';
  });
};

/* ── filterGlossary() — recherche temps réel sur glossaire.html ─────────
─────────────────────────────────────────────────────────────────────────── */
window.filterGlossary = window.filterGlossary || function(q) {
  const lq = (q || '').toLowerCase();
  document.querySelectorAll('.glossary-item').forEach(function(item) {
    const txt = item.textContent.toLowerCase();
    item.style.display = (!lq || txt.includes(lq)) ? '' : 'none';
  });
};

/* ── filterVideos() — filtres thématiques videos.html ───────────────────
─────────────────────────────────────────────────────────────────────────── */
window.filterVideos = window.filterVideos || function(theme, btn) {
  document.querySelectorAll('.theme-btn-filter').forEach(function(b) {
    b.classList.remove('active');
  });
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.video-card').forEach(function(card) {
    card.style.display = (theme === 'all' || card.dataset.theme === theme) ? '' : 'none';
  });
};




/* ═══ CONCEPTS 2026 — données pour le widget concept de la semaine ════════
   Utilisées par index.html et concept-semaine.html
   Source unique — modifier ici si un titre ou une URL change
═══════════════════════════════════════════════════════════════════════════ */
window.CONCEPTS_2026_DATA = [{"semaine": 1, "titre": "Plafonds fiscaux 2026 — tout ce qui change", "url": "outils-fiscaux.html#plafonds", "categorie": "Fiscalité"}, {"semaine": 2, "titre": "Épargne pension — bien choisir son montant", "url": "tax.html#pension", "categorie": "Fiscalité"}, {"semaine": 3, "titre": "Fonds d'urgence — le socle de tout", "url": "budget.html#urgence", "categorie": "Budget"}, {"semaine": 4, "titre": "Comprendre sa fiche de paie belge", "url": "tax.html#fiche-paie", "categorie": "Fiscalité"}, {"semaine": 5, "titre": "ETF MSCI World — IWDA ou VWCE ?", "url": "invest-etf.html#isin", "categorie": "Investir"}, {"semaine": 6, "titre": "La règle 50/30/20 expliquée", "url": "budget.html#regles", "categorie": "Budget"}, {"semaine": 7, "titre": "Branche 21 vs Branche 23", "url": "epargne-long-terme.html#branche21", "categorie": "Épargne"}, {"semaine": 8, "titre": "Intérêts composés — la puissance du temps", "url": "invest.html#composes", "categorie": "Investir"}, {"semaine": 9, "titre": "Déclaration fiscale — les dates clés", "url": "tax.html#declaration", "categorie": "Fiscalité"}, {"semaine": 10, "titre": "Les déductions fiscales souvent oubliées", "url": "tax.html#deductions", "categorie": "Fiscalité"}, {"semaine": 11, "titre": "MyMinfin — guide complet", "url": "tax.html#myminfin", "categorie": "Fiscalité"}, {"semaine": 12, "titre": "DCA — investir sans stress chaque mois", "url": "invest-etf.html#dca", "categorie": "Investir"}, {"semaine": 13, "titre": "Codes IPP — le cheat sheet complet", "url": "tax.html#cheatsheet", "categorie": "Fiscalité"}, {"semaine": 14, "titre": "Revenus mobiliers — dividendes et intérêts", "url": "tax.html#mobiliers", "categorie": "Fiscalité"}, {"semaine": 15, "titre": "Épargne long terme (ELT) — bonus fiscal oublié", "url": "epargne-long-terme.html#elt", "categorie": "Épargne"}, {"semaine": 16, "titre": "Comptes étrangers — déclarer à la BNB", "url": "tax.html#bnb", "categorie": "Fiscalité"}, {"semaine": 17, "titre": "Que faire du remboursement d'impôts ?", "url": "tax.html#remboursement", "categorie": "Fiscalité"}, {"semaine": 18, "titre": "Taxe Reynders — ce qu'elle coûte vraiment", "url": "invest-obligations.html#reynders", "categorie": "Investir"}, {"semaine": 19, "titre": "TOB — comment la déclarer avec DEGIRO", "url": "invest-etf.html#fiscalite", "categorie": "Investir"}, {"semaine": 20, "titre": "Droits d'auteur IT — régime rétabli", "url": "tax.html#droits-auteur-it", "categorie": "Fiscalité"}, {"semaine": 21, "titre": "Taxe sur les plus-values 2026 — impact réel", "url": "tax.html#plus-values", "categorie": "Fiscalité"}, {"semaine": 22, "titre": "Acheter ou louer — le vrai calcul belge", "url": "immo.html#achetvsloc", "categorie": "Immobilier"}, {"semaine": 23, "titre": "Droits d'enregistrement 2025 par région", "url": "immo.html#droits", "categorie": "Immobilier"}, {"semaine": 24, "titre": "Rendement locatif net — la formule honnête", "url": "immo.html#rendement", "categorie": "Immobilier"}, {"semaine": 25, "titre": "SIR belges — immo en bourse", "url": "immo.html#sir", "categorie": "Immobilier"}, {"semaine": 26, "titre": "Obligations et bons d'État belges", "url": "invest-obligations.html#bons-etat", "categorie": "Investir"}, {"semaine": 27, "titre": "ETF obligataires — IBGL, IEAA, AGGH", "url": "invest-obligations.html#etf-oblig", "categorie": "Investir"}, {"semaine": 28, "titre": "Crowdlending belge — Look&Fin, Ecco Nova", "url": "alternatives.html#crowdlending", "categorie": "Alternatives"}, {"semaine": 29, "titre": "Prêts régionaux aux PME", "url": "invest-equity.html#prets-regionaux", "categorie": "Alternatives"}, {"semaine": 30, "titre": "Tax Shelter — les 3 niveaux expliqués", "url": "invest-equity.html#tax-shelter", "categorie": "Investir"}, {"semaine": 31, "titre": "ELTIF 2.0 — le private equity accessible", "url": "invest-equity.html#private-equity", "categorie": "Investir"}, {"semaine": 32, "titre": "Stock picking — analyser une action belge", "url": "invest-actions.html", "categorie": "Investir"}, {"semaine": 33, "titre": "Comprendre l'inflation — ennemi de l'épargne", "url": "bases.html#inflation", "categorie": "Bases"}, {"semaine": 34, "titre": "PLCI — le super outil de l'indépendant", "url": "independants.html#plci-detail", "categorie": "Indépendants"}, {"semaine": 35, "titre": "IS vs IPP — société ou personne physique ?", "url": "outils-fiscaux.html#isvipp", "categorie": "Sociétés"}, {"semaine": 36, "titre": "VVPRbis — dividendes à 15% PM", "url": "societes.html#vvprbis", "categorie": "Sociétés"}, {"semaine": 37, "titre": "Réserve de liquidation — stratégie complète", "url": "societes.html#reserve-liq", "categorie": "Sociétés"}, {"semaine": 38, "titre": "Assurance-groupe — consulter sigedis.be", "url": "epargne-long-terme.html#assurance-groupe", "categorie": "Épargne"}, {"semaine": 39, "titre": "Les 4 piliers pension belges", "url": "budget.html#piliers", "categorie": "Budget"}, {"semaine": 40, "titre": "Simulateur retraite — vos 4 piliers chiffrés", "url": "calculateur-retraite.html", "categorie": "Outils"}, {"semaine": 41, "titre": "Épargne pension — dernier moment pour optimiser", "url": "tax.html#pension", "categorie": "Fiscalité"}, {"semaine": 42, "titre": "13ème mois — que faire avec cet argent ?", "url": "invest.html#demarrer", "categorie": "Budget"}, {"semaine": 43, "titre": "Succession — planifier avant la fin d'année", "url": "succession.html", "categorie": "Succession"}, {"semaine": 44, "titre": "Donation de son vivant — règle des 3 ans", "url": "succession.html#donation", "categorie": "Succession"}, {"semaine": 45, "titre": "Checklist crypto 31 décembre", "url": "crypto.html#checklist2025", "categorie": "Crypto"}, {"semaine": 46, "titre": "Fiscalité crypto 2026 — contribution 10%", "url": "crypto.html#fiscalite", "categorie": "Crypto"}, {"semaine": 47, "titre": "Guide Koinly — rapport fiscal belge", "url": "crypto.html#koinly", "categorie": "Crypto"}, {"semaine": 48, "titre": "NFT en Belgique — zone grise fiscale", "url": "crypto.html#nft", "categorie": "Crypto"}, {"semaine": 49, "titre": "Règle des 4% — vivre de son capital", "url": "rente.html#regle4", "categorie": "Retraite"}, {"semaine": 50, "titre": "Stratégie de décumulation belge", "url": "rente.html#strategie", "categorie": "Retraite"}, {"semaine": 51, "titre": "Panorama de tous les investissements belges", "url": "invest-panorama.html", "categorie": "Investir"}, {"semaine": 52, "titre": "Le Parcours du Belge Ordinaire", "url": "parcours.html", "categorie": "Parcours"}];

/* ═══════════════════════════════════════════════════════════
 * SYSTÈME DE CONVERSION — WealthWaffle
 *
 * Triggers :
 *  1. 2 pages vues → bandeau bas (non bloquant)
 *  2. Scroll jusqu'à un blur → modal création compte
 *  3. 3 min sur une page dense → toast 5s
 *  4. Outil Socle utilisé → overlay email après résultat
 *  5. Clic sur outil Pilote → modal prix
 *
 * Aucun trigger si session active (déjà connecté)
 * ═══════════════════════════════════════════════════════════ */
(function() {
  'use strict';

  // Ne rien faire si déjà connecté
  function isConnected() {
    try {
      return !!(localStorage.getItem('ww_session') ||
                sessionStorage.getItem('ww_session') ||
                localStorage.getItem('sb-access-token'));
    } catch(e) { return false; }
  }

  // Compter les pages vues
  function getPageViews() {
    try { return parseInt(localStorage.getItem('ww_pv') || '0', 10); } catch(e) { return 0; }
  }
  function incPageViews() {
    try { localStorage.setItem('ww_pv', getPageViews() + 1); } catch(e) {}
  }

  // ── HTML des modals de conversion ──
  const MODAL_CSS = `
    .ww-conv-overlay {
      position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9990;
      display:flex;align-items:center;justify-content:center;padding:16px;
      animation:ww-fadein 0.22s ease;
    }
    .ww-conv-box {
      background:var(--s2,#111127);border:1px solid rgba(232,124,195,0.25);
      border-radius:20px;padding:28px 24px;max-width:380px;width:100%;
      box-shadow:0 16px 60px rgba(0,0,0,0.6);text-align:center;position:relative;
    }
    .ww-conv-close {
      position:absolute;top:12px;right:14px;background:none;border:none;
      color:#888;font-size:1.1rem;cursor:pointer;line-height:1;padding:4px;
    }
    .ww-conv-title {
      font-family:'DM Serif Display',serif;font-style:italic;
      font-size:1.15rem;color:#f0f0f0;margin:10px 0 6px;
    }
    .ww-conv-sub {
      font-size:0.80rem;color:#888;line-height:1.65;margin-bottom:18px;
    }
    .ww-conv-input {
      width:100%;background:#1a1a30;border:1px solid rgba(255,255,255,0.10);
      border-radius:10px;padding:10px 14px;color:#f0f0f0;
      font-family:'DM Sans',sans-serif;font-size:0.86rem;
      outline:none;margin-bottom:10px;box-sizing:border-box;
    }
    .ww-conv-input:focus { border-color:rgba(232,124,195,0.45); }
    .ww-conv-btn-primary {
      display:block;width:100%;padding:12px;border-radius:11px;border:none;
      background:linear-gradient(135deg,#E87CC3,#5BB8D4);
      color:#fff;font-family:'DM Sans',sans-serif;font-weight:700;
      font-size:0.88rem;cursor:pointer;margin-bottom:8px;
      transition:opacity 0.18s;
    }
    .ww-conv-btn-primary:hover { opacity:0.88; }
    .ww-conv-btn-ghost {
      background:none;border:none;color:#666;font-size:0.74rem;
      cursor:pointer;font-family:'DM Sans',sans-serif;
    }
    .ww-conv-btn-ghost:hover { color:#aaa; }
    .ww-conv-note { font-size:0.68rem;color:#555;margin-top:8px; }

    /* Bandeau bas */
    .ww-conv-banner {
      position:fixed;bottom:0;left:0;right:0;z-index:9980;
      background:linear-gradient(135deg,rgba(30,29,56,0.97),rgba(20,20,40,0.97));
      border-top:1px solid rgba(232,124,195,0.20);
      padding:14px 20px;display:flex;align-items:center;gap:14px;
      flex-wrap:wrap;justify-content:center;
      animation:ww-slidein 0.3s ease;backdrop-filter:blur(10px);
    }
    .ww-conv-banner-text { font-size:0.82rem;color:#ccc;line-height:1.5; }
    .ww-conv-banner-btn {
      padding:9px 18px;border-radius:10px;border:none;
      background:linear-gradient(135deg,#E87CC3,#5BB8D4);
      color:#fff;font-family:'DM Sans',sans-serif;font-weight:700;
      font-size:0.82rem;cursor:pointer;white-space:nowrap;flex-shrink:0;
    }
    .ww-conv-banner-close {
      background:none;border:none;color:#555;font-size:1rem;
      cursor:pointer;padding:4px;flex-shrink:0;
    }

    /* Toast */
    .ww-toast {
      position:fixed;bottom:80px;right:16px;z-index:9985;
      background:var(--s2,#111127);border:1px solid rgba(232,124,195,0.25);
      border-radius:14px;padding:12px 16px;max-width:280px;
      box-shadow:0 8px 30px rgba(0,0,0,0.5);
      animation:ww-fadein 0.22s ease;cursor:pointer;
    }
    .ww-toast-title { font-size:0.82rem;font-weight:700;color:#f0f0f0;margin-bottom:4px; }
    .ww-toast-sub   { font-size:0.74rem;color:#888; }

    @keyframes ww-fadein   { from { opacity:0;transform:translateY(8px); } to { opacity:1;transform:none; } }
    @keyframes ww-slidein  { from { transform:translateY(100%); } to { transform:none; } }
  `;

  function injectCSS() {
    if (document.getElementById('ww-conv-css')) return;
    const s = document.createElement('style');
    s.id = 'ww-conv-css';
    s.textContent = MODAL_CSS;
    document.head.appendChild(s);
  }

  // ── MODAL CRÉATION DE COMPTE ──
  function showModalCompte(context) {
    if (isConnected()) return;
    if (document.getElementById('ww-modal-compte')) return;
    injectCSS();

    const overlay = document.createElement('div');
    overlay.id = 'ww-modal-compte';
    overlay.className = 'ww-conv-overlay';
    overlay.innerHTML = `
      <div class="ww-conv-box">
        <button class="ww-conv-close" onclick="this.closest('.ww-conv-overlay').remove()">✕</button>
        <div style="font-size:2rem">🧇</div>
        <div class="ww-conv-title">Crée ton compte gratuit</div>
        <div class="ww-conv-sub">
          ${context === 'blur'
            ? 'Ce contenu est réservé aux membres Socle — compte gratuit, sans carte bancaire.'
            : 'Sauvegarde ta progression et retrouve tes simulations à tout moment.'}
        </div>
        <button class="ww-conv-btn-primary" onclick="window.location.href='/compte/inscription.html'">
          Créer mon compte — c'est gratuit →
        </button>
        <button class="ww-conv-btn-ghost" onclick="window.location.href='/compte/connexion.html'">
          J'ai déjà un compte — se connecter
        </button>
        <div class="ww-conv-note">Sans carte bancaire · Accès immédiat · Annulable à tout moment</div>
      </div>`;
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  }

  // ── MODAL PILOTE (outil payant) ──
  function showModalPilote(toolName) {
    if (document.getElementById('ww-modal-pilote')) return;
    injectCSS();
    const overlay = document.createElement('div');
    overlay.id = 'ww-modal-pilote';
    overlay.className = 'ww-conv-overlay';
    overlay.innerHTML = `
      <div class="ww-conv-box">
        <button class="ww-conv-close" onclick="this.closest('.ww-conv-overlay').remove()">✕</button>
        <div style="font-size:2rem">✈️</div>
        <div class="ww-conv-title">Outil réservé à Pilote</div>
        <div class="ww-conv-sub">
          <strong style="color:#f0f0f0;">${toolName || 'Ce simulateur avancé'}</strong> est disponible dans le programme Pilote — 7 jours gratuits pour découvrir.
        </div>
        <button class="ww-conv-btn-primary" onclick="window.location.href='/compte/inscription.html?plan=pilote'">
          Essayer Pilote — 7 jours gratuits →
        </button>
        <button class="ww-conv-btn-ghost" onclick="this.closest('.ww-conv-overlay').remove()">
          Pas maintenant
        </button>
        <div class="ww-conv-note">14,99€/mois · 99€/an · Annulation à tout moment</div>
      </div>`;
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  }

  // ── OVERLAY EMAIL (après résultat outil Socle) ──
  window.WW_showEmailCapture = function(simulationData) {
    if (isConnected()) return;
    if (document.getElementById('ww-email-capture')) return;
    injectCSS();
    const overlay = document.createElement('div');
    overlay.id = 'ww-email-capture';
    overlay.className = 'ww-conv-overlay';
    overlay.innerHTML = `
      <div class="ww-conv-box">
        <button class="ww-conv-close" onclick="this.closest('.ww-conv-overlay').remove()">✕</button>
        <div style="font-size:2rem">📩</div>
        <div class="ww-conv-title">Reçois ta simulation par email</div>
        <div class="ww-conv-sub">Entre ton email pour recevoir les résultats — et un guide pour aller plus loin.</div>
        <input class="ww-conv-input" type="email" id="ww-capture-email" placeholder="ton@email.be" inputmode="email">
        <button class="ww-conv-btn-primary" onclick="WW_submitEmailCapture()">
          Envoyer ma simulation →
        </button>
        <button class="ww-conv-btn-ghost" onclick="this.closest('.ww-conv-overlay').remove()">
          Non merci
        </button>
        <div class="ww-conv-note">Pas de spam · Désabonnement en 1 clic</div>
      </div>`;
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  };

  window.WW_submitEmailCapture = function() {
    const email = document.getElementById('ww-capture-email')?.value?.trim();
    if (!email || !email.includes('@')) return;
    // TODO: brancher Brevo ici
    fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': window.WW_BREVO_KEY || '' },
      body: JSON.stringify({ email, listIds: [3], updateEnabled: true })
    }).catch(() => {});
    const box = document.getElementById('ww-email-capture');
    if (box) box.innerHTML = `<div class="ww-conv-box" style="padding:28px 24px;text-align:center;">
      <div style="font-size:2rem;margin-bottom:12px;">✓</div>
      <div style="font-family:'DM Serif Display',serif;font-style:italic;font-size:1.1rem;color:#f0f0f0;margin-bottom:8px;">Simulation envoyée !</div>
      <div style="font-size:0.80rem;color:#888;margin-bottom:16px;">Vérifie ta boîte mail. Tu peux aussi créer un compte gratuit pour sauvegarder tes prochaines simulations.</div>
      <button class="ww-conv-btn-primary" onclick="window.location.href='/compte/inscription.html'">Créer mon compte gratuit →</button>
      <button class="ww-conv-btn-ghost" onclick="this.closest('.ww-conv-overlay').remove()">Pas maintenant</button>
    </div>`;
  };

  // ── BANDEAU BAS (trigger 2 pages vues) ──
  function showBanner() {
    if (isConnected()) return;
    if (document.getElementById('ww-conv-banner')) return;
    if (localStorage.getItem('ww_banner_dismissed')) return;
    injectCSS();
    const banner = document.createElement('div');
    banner.id = 'ww-conv-banner';
    banner.className = 'ww-conv-banner';
    banner.innerHTML = `
      <div class="ww-conv-banner-text">
        🧇 <strong style="color:#f0f0f0;">Tu reviens souvent ?</strong> Crée ton compte gratuit pour sauvegarder tes simulations et suivre ta progression.
      </div>
      <button class="ww-conv-banner-btn" onclick="window.location.href='/compte/inscription.html'">Créer mon compte →</button>
      <button class="ww-conv-banner-close" onclick="document.getElementById('ww-conv-banner').remove();localStorage.setItem('ww_banner_dismissed','1')">✕</button>`;
    document.body.appendChild(banner);
  }

  // ── TOAST (3 minutes sur une page dense) ──
  function showToast() {
    if (isConnected()) return;
    if (document.getElementById('ww-toast')) return;
    if (localStorage.getItem('ww_toast_done')) return;
    injectCSS();
    const toast = document.createElement('div');
    toast.id = 'ww-toast';
    toast.className = 'ww-toast';
    toast.innerHTML = `
      <div class="ww-toast-title">📚 Tu lis encore ?</div>
      <div class="ww-toast-sub">Crée un compte gratuit pour sauvegarder ta progression.</div>`;
    toast.onclick = () => {
      localStorage.setItem('ww_toast_done', '1');
      showModalCompte('lecture');
      toast.remove();
    };
    document.body.appendChild(toast);
    setTimeout(() => { if (toast.isConnected) toast.remove(); }, 5000);
    localStorage.setItem('ww_toast_done', '1');
  }

  // ── INITIALISATION ──
  document.addEventListener('DOMContentLoaded', function() {
    if (isConnected()) return;

    // Compter la page vue
    incPageViews();
    const pv = getPageViews();

    // Trigger 1 : bandeau à 2 pages vues
    if (pv >= 2) {
      setTimeout(showBanner, 2000);
    }

    // Trigger 2 : scroll jusqu'à un blur (IntersectionObserver)
    const blurs = document.querySelectorAll('.blur-gate, [style*="blur("]');
    if (blurs.length && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            obs.disconnect();
            setTimeout(() => showModalCompte('blur'), 400);
          }
        });
      }, { threshold: 0.3 });
      blurs.forEach(el => obs.observe(el));
    }

    // Trigger 3 : 3 minutes sur une page dense
    const isDense = document.querySelectorAll('.content-card').length >= 3;
    if (isDense) {
      setTimeout(showToast, 3 * 60 * 1000);
    }
  });

  // ── API PUBLIQUE ──
  window.WW_showModalCompte  = showModalCompte;
  window.WW_showModalPilote  = showModalPilote;
  window.WW_showBanner       = showBanner;

})();


/* ═══════════════════════════════════════════════════════════
   ONBOARDING POPUP — WealthWaffle
   Apparaît une seule fois à la première visite
   Non bloquante · Fermable · Sauvegarde en localStorage
═══════════════════════════════════════════════════════════ */

(function initOnboarding() {
  // Ne pas afficher sur les pages auth/compte/dashboard
  const skipPaths = ['/compte/', '/dashboard/', '/radar/'];
  if (skipPaths.some(p => location.pathname.startsWith(p))) return;
  // Ne pas afficher si déjà complété
  if (localStorage.getItem('ww_onboarding_done')) return;

  function buildPopup() {
    const overlay = document.createElement('div');
    overlay.id = 'ww-onboarding-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(8,7,23,0.75);z-index:9000;display:flex;align-items:flex-end;justify-content:center;padding:0 0 24px;animation:fadeIn 0.3s ease both;backdrop-filter:blur(4px);';

    overlay.innerHTML = `
      <div style="background:var(--s2,#111127);border:1px solid rgba(255,255,255,0.10);border-radius:22px;padding:24px 22px;width:100%;max-width:420px;box-shadow:0 -8px 60px rgba(0,0,0,0.5);animation:slideUp 0.35s ease both;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div style="font-family:'DM Serif Display',serif;font-style:italic;font-size:1.15rem;color:var(--text);">Bienvenue 🧇</div>
          <button onclick="document.getElementById('ww-onboarding-overlay').remove();localStorage.setItem('ww_onboarding_done','1');"
            style="background:none;border:none;color:var(--muted);font-size:1.1rem;cursor:pointer;padding:4px 8px;border-radius:8px;" title="Fermer">✕</button>
        </div>
        <p style="font-size:0.78rem;color:var(--muted);margin-bottom:16px;line-height:1.6;">Deux questions rapides pour personnaliser ton expérience — rien d'obligatoire, tout est modifiable après.</p>

        <div style="margin-bottom:14px;">
          <div style="font-size:0.70rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted);margin-bottom:8px;">Tu te considères plutôt :</div>
          <div style="display:flex;gap:6px;">
            <button onclick="selectOnboardingLevel('debutant',this)"
              class="ob-btn" style="flex:1;padding:10px 8px;border-radius:10px;border:1px solid var(--border);background:var(--s3);color:var(--muted);font-family:'DM Sans',sans-serif;font-size:0.80rem;cursor:pointer;transition:all 0.18s;">
              🌱 Débutant<br><span style="font-size:0.68rem;opacity:0.7;">Je commence</span>
            </button>
            <button onclick="selectOnboardingLevel('avance',this)"
              class="ob-btn" style="flex:1;padding:10px 8px;border-radius:10px;border:1px solid var(--border);background:var(--s3);color:var(--muted);font-family:'DM Sans',sans-serif;font-size:0.80rem;cursor:pointer;transition:all 0.18s;">
              🚀 Avancé<br><span style="font-size:0.68rem;opacity:0.7;">J'investis déjà</span>
            </button>
          </div>
        </div>

        <div style="margin-bottom:18px;">
          <div style="font-size:0.70rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted);margin-bottom:8px;">Mon profil :</div>
          <div style="display:flex;gap:6px;">
            <button onclick="selectOnboardingProfile('particulier',this)"
              class="ob-btn" style="flex:1;padding:8px 4px;border-radius:10px;border:1px solid var(--border);background:var(--s3);color:var(--muted);font-family:'DM Sans',sans-serif;font-size:0.74rem;cursor:pointer;transition:all 0.18s;">
              🙋 Salarié
            </button>
            <button onclick="selectOnboardingProfile('independant',this)"
              class="ob-btn" style="flex:1;padding:8px 4px;border-radius:10px;border:1px solid var(--border);background:var(--s3);color:var(--muted);font-family:'DM Sans',sans-serif;font-size:0.74rem;cursor:pointer;transition:all 0.18s;">
              💼 Indépendant
            </button>
            <button onclick="selectOnboardingProfile('dirigeant',this)"
              class="ob-btn" style="flex:1;padding:8px 4px;border-radius:10px;border:1px solid var(--border);background:var(--s3);color:var(--muted);font-family:'DM Sans',sans-serif;font-size:0.74rem;cursor:pointer;transition:all 0.18s;">
              🏢 Dirigeant
            </button>
          </div>
        </div>

        <button onclick="closeOnboarding()"
          style="width:100%;padding:12px;border-radius:12px;border:none;background:linear-gradient(135deg,#E87CC3,#5BB8D4);color:#fff;font-family:'DM Sans',sans-serif;font-weight:700;font-size:0.88rem;cursor:pointer;transition:opacity 0.18s;">
          C'est parti →
        </button>

        <div style="text-align:center;margin-top:10px;font-size:0.68rem;color:var(--muted2);">
          Modifiable à tout moment dans <a href="/dashboard/" style="color:var(--muted);">ton dashboard</a>
        </div>
      </div>`;

    document.body.appendChild(overlay);
  }

  window.selectOnboardingLevel = function(level, btn) {
    document.querySelectorAll('#ww-onboarding-overlay .ob-btn[onclick*="Level"]').forEach(b => {
      b.style.borderColor = 'var(--border)'; b.style.background = 'var(--s3)'; b.style.color = 'var(--muted)';
    });
    btn.style.borderColor = 'rgba(126,200,160,0.45)';
    btn.style.background  = 'rgba(126,200,160,0.10)';
    btn.style.color       = '#7EC8A0';
    localStorage.setItem('ww_level', level);
    document.body.setAttribute('data-level', level);
    // Appliquer immédiatement si setLevel existe
    if (typeof setLevel === 'function') setLevel(level);
  };

  window.selectOnboardingProfile = function(prof, btn) {
    document.querySelectorAll('#ww-onboarding-overlay .ob-btn[onclick*="Profile"]').forEach(b => {
      b.style.borderColor = 'var(--border)'; b.style.background = 'var(--s3)'; b.style.color = 'var(--muted)';
    });
    btn.style.borderColor = 'rgba(91,184,212,0.45)';
    btn.style.background  = 'rgba(91,184,212,0.10)';
    btn.style.color       = '#5BB8D4';
    localStorage.setItem('ww_profile', prof);
  };

  window.closeOnboarding = function() {
    const overlay = document.getElementById('ww-onboarding-overlay');
    if (overlay) {
      overlay.style.animation = 'fadeOut 0.2s ease both';
      setTimeout(() => overlay.remove(), 200);
    }
    localStorage.setItem('ww_onboarding_done', '1');
  };

  // Afficher la popup 2 secondes après le chargement (pas intrusif)
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(buildPopup, 2000);
  });

  // CSS pour les animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp { from { transform:translateY(40px);opacity:0; } to { transform:translateY(0);opacity:1; } }
    @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes fadeOut { from { opacity:1; } to { opacity:0; } }
  `;
  document.head.appendChild(style);
})();


/* ═══════════════════════════════════════════════════════════
   BANDEAU NUDGE — lead magnet contextuel sous la nav
   Affiché après 5 pages vues sans compte
═══════════════════════════════════════════════════════════ */
(function initNudgeBar() {
  // Définir le lead magnet selon la page visitée
  const LEAD_MAGNETS = {
    etf:        { text: '📊 <strong>Guide ETF belge</strong> — les 5 ETF à connaître, la fiscalité 2026 et le DCA automatique.', magnet: 'guide-etf' },
    invest:     { text: '📊 <strong>Simulateur d\'allocation</strong> — trouve ta répartition idéale ETF/obligations/cash selon ton profil.', magnet: 'simulateur-allocation' },
    fiscal:     { text: '✅ <strong>Checklist fiscale belge</strong> — toutes les déductions à ne pas manquer pour ta déclaration 2026.', magnet: 'checklist-fiscal' },
    parcours:   { text: '🎁 <strong>10 erreurs financières que font 90% des Belges</strong> — le guide PDF gratuit.', magnet: 'guide-10-erreurs' },
    budget:     { text: '📊 <strong>Excel budget belge</strong> — ton tableau de bord budget/épargne/investissement prêt à l\'emploi.', magnet: 'excel-budget' },
    immo:       { text: '🏠 <strong>Checklist achat immo belge</strong> — toutes les étapes, les pièges et les documents à prévoir.', magnet: 'checklist-immo' },
    crypto:     { text: '₿ <strong>Guide crypto débutant</strong> — wallets, exchanges, fiscalité belge 2026 en une page.', magnet: 'guide-crypto' },
    taxshelter: { text: '🎬 <strong>Guide Tax Shelter startups</strong> — comment réduire votre impôt de 45% légalement.', magnet: 'guide-taxshelter' },
    or:         { text: '🥇 <strong>Guide achat or Belgique</strong> — lingots, pièces, ETF : où acheter et comment éviter les pièges.', magnet: 'guide-or' },
    default:    { text: '🎁 <strong>10 erreurs financières que font 90% des Belges</strong> — le guide PDF gratuit.', magnet: 'guide-10-erreurs' },
  };

  function getContext() {
    const path = location.pathname;
    if (path.includes('/or'))                                              return 'or';
    if (path.includes('/etf'))                                             return 'etf';
    if (path.includes('/crypto'))                                          return 'crypto';
    if (path.includes('/tax-shelter'))                                     return 'taxshelter';
    if (path.startsWith('/invest') || path.startsWith('/invest/actions'))  return 'invest';
    if (path.startsWith('/fiscal') || path.startsWith('/budget/rente') || path.startsWith('/budget/epargne')) return 'fiscal';
    if (path.startsWith('/immo'))                                          return 'immo';
    if (path.startsWith('/budget'))                                        return 'budget';
    if (path.startsWith('/parcours') || path.startsWith('/parcours/bases')) return 'parcours';
    return 'default';
  }

  function shouldShow() {
    if (localStorage.getItem('ww_session'))    return false; // connecté
    if (localStorage.getItem('ww_nudge_done')) return false; // déjà soumis
    if (localStorage.getItem('ww_nudge_closed')) return false; // fermé manuellement
    const views = parseInt(localStorage.getItem('ww_page_views') || '0');
    return views >= 1;
  }

  function showNudge() {
    const bar = document.getElementById('ww-nudge-bar');
    const txt = document.getElementById('nudge-text');
    if (!bar || !txt) return;
    const ctx = getContext();
    const lm  = LEAD_MAGNETS[ctx];
    txt.innerHTML = lm.text;
    bar.setAttribute('data-magnet', lm.magnet);
    bar.style.display = 'block';
    document.body.classList.add('has-nudge');
  }

  window.closeNudge = function() {
    const bar = document.getElementById('ww-nudge-bar');
    if (bar) bar.style.display = 'none';
    document.body.classList.remove('has-nudge');
    localStorage.setItem('ww_nudge_closed', '1');
  };

  window.submitNudge = async function() {
    const email  = document.getElementById('nudge-email')?.value?.trim();
    const magnet = document.getElementById('ww-nudge-bar')?.getAttribute('data-magnet');
    const btn    = document.getElementById('nudge-btn');
    if (!email || !email.includes('@')) {
      document.getElementById('nudge-email').style.borderColor = 'var(--rose)';
      return;
    }
    if (btn) { btn.textContent = '⏳'; btn.disabled = true; }
    try {
      // 1. Brevo
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': window.WW_CONFIG?.BREVO_KEY || '' },
        body: JSON.stringify({ email, listIds: [3], attributes: { LEAD_MAGNET: magnet, SOURCE: 'nudge_bar' }, updateEnabled: true }),
      });
      // 2. Supabase — table lead_magnet_requests
      if (window.WW?.sb) {
        const userId = window.WW?.user?.id || null;
        await window.WW.sb.from('lead_magnet_requests').insert({
          email,
          magnet,
          user_id: userId,
          page: location.pathname,
          source: 'nudge_bar',
          created_at: new Date().toISOString(),
        });
      }
    } catch(e) {}
    localStorage.setItem('ww_nudge_done', '1');
    const bar = document.getElementById('ww-nudge-bar');
    if (bar) bar.innerHTML = '<div style="text-align:center;padding:8px;font-size:0.80rem;color:#7EC8A0;font-weight:600;">✅ C\'est envoyé ! Vérifie ta boîte mail.</div>';
    setTimeout(closeNudge, 3000);
  };

  document.addEventListener('DOMContentLoaded', function() {
    // Incrémenter le compteur de pages vues
    const views = parseInt(localStorage.getItem('ww_page_views') || '0') + 1;
    localStorage.setItem('ww_page_views', views.toString());
    // Afficher le bandeau si conditions remplies
    if (shouldShow()) setTimeout(showNudge, 800);
  });
})();

/* ═══════════════════════════════════════════════════════════
   RÉGLAGE NIVEAU DEPUIS LA NAV
═══════════════════════════════════════════════════════════ */
window.setLevelNav = function(level) {
  localStorage.setItem('ww_level', level);
  document.body.setAttribute('data-level', level);
  // Mettre à jour les boutons desktop
  const deb = document.getElementById('nav-lvl-deb');
  const adv = document.getElementById('nav-lvl-adv');
  const mdeb = document.getElementById('mob-lvl-deb');
  const madv = document.getElementById('mob-lvl-adv');
  const activeStyle  = 'border-color:rgba(126,200,160,0.45);background:rgba(126,200,160,0.10);color:#7EC8A0;';
  const inactiveStyle = 'border:1px solid var(--border);background:var(--s3);color:var(--muted);';
  if (level === 'debutant') {
    [deb, mdeb].forEach(b => b && (b.style.cssText += activeStyle));
    [adv, madv].forEach(b => b && (b.style.cssText += inactiveStyle));
  } else {
    [adv, madv].forEach(b => b && (b.style.cssText += activeStyle));
    [deb, mdeb].forEach(b => b && (b.style.cssText += inactiveStyle));
  }
  // Sync avec Supabase si connecté
  if (window.WW?.sb && window.WW?.user) {
    window.WW.sb.from('profiles').update({ level }).eq('id', window.WW.user.id).then(()=>{});
  }
};

/* Init état des boutons niveau au chargement */
document.addEventListener('DOMContentLoaded', function() {
  const level = localStorage.getItem('ww_level') || 'debutant';
  setLevelNav(level);
});


/* ═══════════════════════════════════════════════════════════
   MODE PREVIEW — simuler un compte sans Supabase
   Usage : ajouter ?ww_preview=radar (ou socle / pilote) dans l'URL
   Enlever avec ?ww_preview=off
═══════════════════════════════════════════════════════════ */
(function initPreviewMode() {
  const param = new URLSearchParams(location.search).get('ww_preview');
  if (!param) return;

  if (param === 'off') {
    ['ww_session','ww_plan','ww_level','ww_profile','ww_topic','ww_onboarding_done'].forEach(k => localStorage.removeItem(k));
    console.info('WW Preview : session effacée');
    return;
  }

  const validPlans = ['socle','pilote','radar'];
  const plan = validPlans.includes(param) ? param : 'socle';

  // Simuler une session
  localStorage.setItem('ww_session', 'preview_token_' + plan);
  localStorage.setItem('ww_plan',    plan);
  localStorage.setItem('ww_level',   'avance');
  localStorage.setItem('ww_profile', 'particulier');
  localStorage.setItem('ww_topic',   'invest');
  localStorage.setItem('ww_onboarding_done', '1');

  // Simuler window.WW pour les pages auth
  window.WW = window.WW || {};
  window.WW.user    = { id: 'preview-user-id', email: 'preview@wealthwaffle.be' };
  window.WW.profile = { plan, level: 'avance', prenom: 'Preview', nom: 'Mode' };

  console.info('%c WW Preview actif — plan : ' + plan.toUpperCase(), 'background:#E87CC3;color:#fff;padding:4px 8px;border-radius:4px;font-weight:bold;');

  // Bandeau de rappel visible
  document.addEventListener('DOMContentLoaded', () => {
    const bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:#1E1D38;border:1px solid rgba(232,124,195,0.40);border-radius:12px;padding:8px 16px;font-family:"DM Sans",sans-serif;font-size:0.74rem;color:#E87CC3;z-index:9999;display:flex;align-items:center;gap:10px;box-shadow:0 4px 20px rgba(0,0,0,0.4);';
    bar.innerHTML = '🧪 Mode preview : <strong>' + plan.toUpperCase() + '</strong> &nbsp;·&nbsp; <a href="?ww_preview=off" style="color:var(--muted);text-decoration:none;">Quitter →</a>';
    document.body.appendChild(bar);
  });
})();


/* ═══════════════════════════════════════════════════════════
   TOGGLE LOCAL AVANCÉ — bouton par section
   En mode débutant, ajoute un bouton "Voir la version avancée"
   sous chaque bloc débutant qui a un bloc avancé correspondant
═══════════════════════════════════════════════════════════ */
function injectLevelToggles() {
  // Ne rien faire en mode avancé (les deux blocs sont déjà visibles)
  if ((localStorage.getItem('ww_level') || 'debutant') === 'avance') return;

  document.querySelectorAll('.level-section').forEach(section => {
    const debBlock = section.querySelector('[data-level="debutant"]');
    const advBlock = section.querySelector('[data-level="avance"]');
    if (!debBlock || !advBlock) return;
    // Ne pas ajouter le bouton si déjà présent
    if (section.querySelector('.ww-toggle-avance')) return;

    const btn = document.createElement('button');
    btn.className = 'ww-toggle-avance';
    btn.innerHTML = '🚀 Voir la version avancée';
    btn.setAttribute('aria-expanded', 'false');

    btn.onclick = function() {
      const expanded = section.classList.toggle('ww-local-avance');
      btn.innerHTML   = expanded ? '🌱 Masquer la version avancée' : '🚀 Voir la version avancée';
      btn.setAttribute('aria-expanded', expanded.toString());
      // Scroll doux vers le bloc avancé
      if (expanded) setTimeout(() => advBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
    };

    debBlock.appendChild(btn);
  });
}

/* Réinjecter les toggles si le niveau change */
const _origSetLevel = window.setLevelNav;
window.setLevelNav = function(level) {
  if (_origSetLevel) _origSetLevel(level);
  // Retirer tous les toggles existants et recréer selon le nouveau niveau
  document.querySelectorAll('.ww-toggle-avance').forEach(b => b.remove());
  document.querySelectorAll('.level-section.ww-local-avance').forEach(s => s.classList.remove('ww-local-avance'));
  if (level === 'debutant') setTimeout(injectLevelToggles, 50);
};

document.addEventListener('DOMContentLoaded', function() {
  // Attendre que le niveau soit appliqué
  setTimeout(injectLevelToggles, 200);
});

