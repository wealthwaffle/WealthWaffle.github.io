/*
 * ═══════════════════════════════════════════════════════════
 * WealthWaffle — tools.js
 * Bibliothèque d'outils interactifs
 *
 * UTILISATION dans une page HTML :
 *   1. Ajouter un div conteneur : <div id="mon-outil"></div>
 *   2. Appeler la fonction après le chargement :
 *      <script>WW_Tools.simulateurObjectifs('mon-outil');</script>
 *
 * Chaque outil est autonome — CSS inline, zero dépendance externe.
 * Le style respecte les variables CSS de ww-all.css (--rose, --cyan, etc.)
 *
 * OUTILS DISPONIBLES :
 *   WW_Tools.simulateurObjectifs(id)   — Combien épargner pour mon projet ?
 *   WW_Tools.decodeur503020(id)        — Décodeur budget 50/30/20
 *   WW_Tools.coutReel(id)              — Coût en heures de travail
 *   WW_Tools.comparateurDette(id)      — Rembourser ou épargner ?
 *   WW_Tools.convertisseurInflation(id) — Valeur dans le temps
 *   WW_Tools.testResistance(id)        — Test fonds d'urgence
 *   WW_Tools.quizBiais(id)             — Quiz biais cognitifs
 *   WW_Tools.arbreDecision(id)         — Arbre décision investissement
 *   WW_Tools.traducteurJargon(id)      — Traducteur jargon bancaire
 *   WW_Tools.journalDecisions(id)      — Journal de bord financier
 *   WW_Tools.fraisCaches(id)           — Impact des frais cachés
 * ═══════════════════════════════════════════════════════════
 */

window.WW_Tools = (function() {
  'use strict';

  /* ── Helpers partagés ───────────────────────────────────── */
  const eur = n => Number(n).toLocaleString('fr-BE', {maximumFractionDigits:0}) + ' €';
  const pct = n => Number(n).toFixed(1) + '%';
  const num = n => Number(n).toLocaleString('fr-BE', {maximumFractionDigits:0});

  // Couleurs du site
  const C = {
    rose:   '#E87CC3',
    cyan:   '#5BB8D4',
    gold:   '#E8C23A',
    green:  '#7EC8A0',
    terra:  '#C4724A',
    purple: '#c9b8ff',
    bg2:    'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.08)',
  };

  // Style de base pour les outils
  const baseStyle = `
    font-family:'DM Sans',sans-serif;
    background:var(--s2,rgba(255,255,255,0.04));
    border:1px solid var(--border,rgba(255,255,255,0.08));
    border-radius:16px;
    padding:22px;
    margin:16px 0;
  `;

  // Input stylé
  const inputStyle = `
    width:100%;box-sizing:border-box;
    background:var(--s3,rgba(255,255,255,0.06));
    border:1px solid var(--border,rgba(255,255,255,0.10));
    border-radius:10px;padding:10px 13px;
    font-family:'DM Sans',sans-serif;font-size:0.92rem;
    color:var(--text,#f0f0f0);outline:none;
    transition:border-color 0.2s;
  `;

  const btnStyle = (color=C.rose) => `
    background:${color};color:#fff;border:none;border-radius:10px;
    padding:10px 20px;font-family:'DM Sans',sans-serif;
    font-size:0.86rem;font-weight:700;cursor:pointer;
    transition:opacity 0.18s;
  `;

  const resultBox = (color=C.rose) => `
    background:${color}14;border:1px solid ${color}33;
    border-radius:12px;padding:16px;margin-top:14px;
    font-size:0.92rem;color:var(--text,#f0f0f0);
  `;

  const label = txt => `<div style="font-size:0.72rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted,#888);margin-bottom:6px;">${txt}</div>`;

  // Titre outil
  const toolTitle = (emoji, titre, sous) => `
    <div style="margin-bottom:18px;">
      <div style="font-size:1.1rem;font-weight:700;color:var(--text,#f0f0f0);margin-bottom:4px;">${emoji} ${titre}</div>
      <div style="font-size:0.80rem;color:var(--muted,#888);line-height:1.5;">${sous}</div>
    </div>`;

  /* ════════════════════════════════════════════════════════
   * 1. SIMULATEUR D'OBJECTIFS
   * "Combien mettre de côté chaque mois pour mon projet ?"
   * ════════════════════════════════════════════════════════ */
  function simulateurObjectifs(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const uid = 'so_' + containerId;

    el.innerHTML = `<div style="${baseStyle}">
      ${toolTitle('🎯', 'Le Planificateur de Projet', 'Combien mettre de côté chaque mois pour atteindre ton objectif ?')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
        <div>
          ${label('Mon objectif (€)')}
          <input id="${uid}_montant" type="number" min="100" placeholder="ex: 5 000" style="${inputStyle}" oninput="${uid}_calc()">
        </div>
        <div>
          ${label('Dans combien de mois ?')}
          <input id="${uid}_mois" type="number" min="1" max="600" placeholder="ex: 24" style="${inputStyle}" oninput="${uid}_calc()">
        </div>
      </div>
      <div style="margin-bottom:12px;">
        ${label('Rendement annuel estimé (0% = compte épargne, 7% = ETF monde)')}
        <input id="${uid}_taux" type="range" min="0" max="10" step="0.5" value="0"
          style="width:100%;accent-color:${C.rose};"
          oninput="${uid}_updateTaux(this.value)">
        <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:var(--muted,#888);margin-top:4px;">
          <span>0% (épargne)</span>
          <span id="${uid}_tauxLabel" style="color:${C.rose};font-weight:700;">0%</span>
          <span>10% (actions)</span>
        </div>
      </div>
      <div id="${uid}_result" style="display:none;${resultBox(C.rose)}">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="text-align:center;padding:12px;background:rgba(255,255,255,0.04);border-radius:10px;">
            <div style="font-size:0.68rem;color:var(--muted,#888);margin-bottom:4px;">EFFORT MENSUEL</div>
            <div id="${uid}_mensuel" style="font-size:1.6rem;font-weight:700;color:${C.rose};font-family:'DM Serif Display',serif;font-style:italic;"></div>
          </div>
          <div style="text-align:center;padding:12px;background:rgba(255,255,255,0.04);border-radius:10px;">
            <div style="font-size:0.68rem;color:var(--muted,#888);margin-bottom:4px;">TOTAL VERSÉ</div>
            <div id="${uid}_verse" style="font-size:1.6rem;font-weight:700;color:${C.cyan};font-family:'DM Serif Display',serif;font-style:italic;"></div>
          </div>
        </div>
        <div id="${uid}_comment" style="margin-top:12px;font-size:0.82rem;color:var(--muted,#888);line-height:1.6;"></div>
      </div>
    </div>`;

    window[`${uid}_updateTaux`] = function(val) {
      document.getElementById(`${uid}_tauxLabel`).textContent = val + '%';
      window[`${uid}_calc`]();
    };

    window[`${uid}_calc`] = function() {
      const montant = parseFloat(document.getElementById(`${uid}_montant`)?.value) || 0;
      const mois    = parseInt(document.getElementById(`${uid}_mois`)?.value) || 0;
      const taux    = parseFloat(document.getElementById(`${uid}_taux`)?.value) || 0;
      const res = document.getElementById(`${uid}_result`);
      if (!montant || !mois) { res.style.display='none'; return; }

      let mensuel;
      if (taux === 0) {
        mensuel = montant / mois;
      } else {
        const r = (taux / 100) / 12;
        mensuel = montant * r / (Math.pow(1 + r, mois) - 1);
      }

      const verse = mensuel * mois;
      const gain  = montant - verse;

      document.getElementById(`${uid}_mensuel`).textContent = eur(mensuel);
      document.getElementById(`${uid}_verse`).textContent   = eur(verse);

      let comment = `En ${mois} mois, tu verseras au total ${eur(verse)}. `;
      if (gain > 10) {
        comment += `Le rendement de ${taux}% t'apportera <strong style="color:${C.green};">${eur(gain)}</strong> d'intérêts — tu économises ce montant par rapport à un simple virement mensuel.`;
      } else if (taux === 0) {
        comment += `Sur un compte épargne à 0%, tu mets de côté exactement ce qu'il te faut. Avec un ETF à 7%, l'effort mensuel tomberait à ${eur(montant * (0.07/100/12) / (Math.pow(1 + 0.07/100/12, mois) - 1))}.`;
      }
      document.getElementById(`${uid}_comment`).innerHTML = comment;
      res.style.display = 'block';
    };
  }

  /* ════════════════════════════════════════════════════════
   * 2. DÉCODEUR BUDGET 50/30/20
   * ════════════════════════════════════════════════════════ */
  function decodeur503020(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const uid = 'b5_' + containerId;

    el.innerHTML = `<div style="${baseStyle}">
      ${toolTitle('⚖️', 'Le Décodeur Budget 50/30/20', 'Entre ton revenu net mensuel — les jauges se calculent en temps réel.')}
      <div style="margin-bottom:16px;">
        ${label('Revenu net mensuel (€)')}
        <input id="${uid}_rev" type="number" min="0" placeholder="ex: 2 500"
          style="${inputStyle};font-size:1.1rem;"
          oninput="${uid}_calc()">
      </div>
      <div id="${uid}_jauges" style="display:none;">
        ${[
          ['besoins',  '🏠 Besoins', 50, C.cyan,  'Loyer, courses, transport, assurances — tout ce qui est incompressible.'],
          ['envies',   '🎉 Envies',  30, C.rose,  'Restaurants, loisirs, shopping — ce qui est plaisant mais facultatif.'],
          ['epargne',  '💰 Épargne', 20, C.green, 'Fonds d\'urgence, ETF, épargne pension — ce qui travaille pour toi.'],
        ].map(([key, name, pct, color, tip]) => `
          <div style="margin-bottom:18px;">
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">
              <div style="font-weight:700;color:var(--text,#f0f0f0);">${name}</div>
              <div>
                <span id="${uid}_${key}_pct" style="font-size:1.2rem;font-weight:700;color:${color};font-family:'DM Serif Display',serif;font-style:italic;">${pct}%</span>
                <span style="font-size:0.82rem;color:var(--muted,#888);margin-left:6px;">= <span id="${uid}_${key}_eur">—</span></span>
              </div>
            </div>
            <div style="background:rgba(255,255,255,0.06);border-radius:20px;height:12px;overflow:hidden;">
              <div id="${uid}_${key}_bar" style="height:100%;width:0%;background:${color};border-radius:20px;transition:width 0.4s ease;"></div>
            </div>
            <div id="${uid}_${key}_tip" style="font-size:0.76rem;color:var(--muted,#888);margin-top:6px;line-height:1.5;display:none;">${tip}</div>
          </div>`
        ).join('')}
        <div id="${uid}_alert" style="display:none;${resultBox(C.gold)}font-size:0.82rem;"></div>
      </div>
    </div>`;

    window[`${uid}_calc`] = function() {
      const rev = parseFloat(document.getElementById(`${uid}_rev`)?.value) || 0;
      const jauges = document.getElementById(`${uid}_jauges`);
      if (!rev) { jauges.style.display='none'; return; }
      jauges.style.display='block';

      const cats = [
        ['besoins', 0.50, C.cyan],
        ['envies',  0.30, C.rose],
        ['epargne', 0.20, C.green],
      ];
      cats.forEach(([key, ratio]) => {
        const montant = rev * ratio;
        document.getElementById(`${uid}_${key}_eur`).textContent = eur(montant);
        document.getElementById(`${uid}_${key}_bar`).style.width = '100%';
        document.getElementById(`${uid}_${key}_tip`).style.display = 'block';
      });

      const alert = document.getElementById(`${uid}_alert`);
      const epargne = rev * 0.20;
      if (epargne < 200) {
        alert.style.display='block';
        alert.innerHTML = `⚠️ <strong>Ton enveloppe épargne est de ${eur(epargne)}/mois.</strong> C'est peu — mais c'est mieux que rien. Priorité : constitution d'un fonds d'urgence de ${eur(rev * 3)} (3 mois de revenus). <a href="budget.html#urgence" style="color:${C.cyan};">Guide →</a>`;
      } else {
        alert.style.display='none';
      }
    };
  }

  /* ════════════════════════════════════════════════════════
   * 3. COÛT RÉEL EN HEURES DE TRAVAIL
   * ════════════════════════════════════════════════════════ */
  function coutReel(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const uid = 'cr_' + containerId;

    el.innerHTML = `<div style="${baseStyle}">
      ${toolTitle('⏱️', 'Le Vrai Prix des Choses', 'Combien d\'heures de ta vie cet achat représente-t-il vraiment ?')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
        <div>
          ${label('Salaire net mensuel (€)')}
          <input id="${uid}_salaire" type="number" min="0" placeholder="ex: 2 500" style="${inputStyle}" oninput="${uid}_calc()">
        </div>
        <div>
          ${label('Prix de l\'achat (€)')}
          <input id="${uid}_prix" type="number" min="0" placeholder="ex: 800" style="${inputStyle}" oninput="${uid}_calc()">
        </div>
      </div>
      <div style="margin-bottom:12px;">
        ${label('Heures travaillées par mois')}
        <input id="${uid}_heures" type="number" min="1" max="300" value="160" style="${inputStyle}" oninput="${uid}_calc()">
      </div>
      <div id="${uid}_result" style="display:none;${resultBox(C.terra)}">
        <div style="text-align:center;padding:16px;">
          <div style="font-size:0.72rem;color:var(--muted,#888);margin-bottom:6px;">CET ACHAT TE COÛTE</div>
          <div id="${uid}_heures_result" style="font-size:2.2rem;font-weight:700;color:${C.terra};font-family:'DM Serif Display',serif;font-style:italic;"></div>
          <div style="font-size:0.82rem;color:var(--muted,#888);margin-top:4px;">de ton temps de vie</div>
        </div>
        <div id="${uid}_comment" style="margin-top:12px;font-size:0.82rem;color:var(--muted,#888);line-height:1.6;border-top:1px solid rgba(255,255,255,0.08);padding-top:12px;"></div>
      </div>
    </div>`;

    window[`${uid}_calc`] = function() {
      const salaire = parseFloat(document.getElementById(`${uid}_salaire`)?.value) || 0;
      const prix    = parseFloat(document.getElementById(`${uid}_prix`)?.value) || 0;
      const heures  = parseFloat(document.getElementById(`${uid}_heures`)?.value) || 160;
      const res = document.getElementById(`${uid}_result`);
      if (!salaire || !prix) { res.style.display='none'; return; }

      const tauxHoraire = salaire / heures;
      const hTravail = prix / tauxHoraire;
      const jours = hTravail / 8;

      let texte;
      if (hTravail < 1) texte = `${Math.round(hTravail * 60)} minutes`;
      else if (hTravail < 8) texte = `${hTravail.toFixed(1)} heures`;
      else texte = `${jours.toFixed(1)} jours`;

      document.getElementById(`${uid}_heures_result`).textContent = texte;

      const equivalent = [];
      if (hTravail > 40)  equivalent.push(`une semaine complète de travail`);
      if (hTravail > 160) equivalent.push(`un mois entier de salaire`);

      document.getElementById(`${uid}_comment`).innerHTML =
        `Ton taux horaire net est de <strong>${eur(tauxHoraire)}/h</strong>. ` +
        `Avant d'acheter quelque chose, demande-toi si ça vaut ${texte} de ta vie. ` +
        (equivalent.length ? `C'est l'équivalent de ${equivalent.join(' ou ')}.` : '') +
        ` <a href="budget.html" style="color:${C.cyan};">Reprendre le contrôle de son budget →</a>`;
      res.style.display='block';
    };
  }

  /* ════════════════════════════════════════════════════════
   * 4. COMPARATEUR ÉPARGNE VS DETTE
   * ════════════════════════════════════════════════════════ */
  function comparateurDette(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const uid = 'cd_' + containerId;

    el.innerHTML = `<div style="${baseStyle}">
      ${toolTitle('⚡', 'Rembourser ou Épargner ?', 'Mathématiquement, quelle est la meilleure option pour toi ?')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
        <div>
          ${label('Taux d\'intérêt de ton prêt (%)')}
          <input id="${uid}_pret" type="number" min="0" max="30" step="0.1" placeholder="ex: 4.5" style="${inputStyle}" oninput="${uid}_calc()">
          <div style="font-size:0.70rem;color:var(--muted,#888);margin-top:4px;">Crédit auto, perso, hypothèque...</div>
        </div>
        <div>
          ${label('Taux de ton épargne (%)')}
          <input id="${uid}_epargne" type="number" min="0" max="20" step="0.1" placeholder="ex: 3.5" style="${inputStyle}" oninput="${uid}_calc()">
          <div style="font-size:0.70rem;color:var(--muted,#888);margin-top:4px;">Livret, ETF, bon d'État...</div>
        </div>
      </div>
      <div id="${uid}_result" style="display:none;">
        <div id="${uid}_verdict" style="border-radius:12px;padding:20px;text-align:center;margin-bottom:12px;"></div>
        <div id="${uid}_detail" style="font-size:0.82rem;color:var(--muted,#888);line-height:1.7;"></div>
      </div>
    </div>`;

    window[`${uid}_calc`] = function() {
      const pret    = parseFloat(document.getElementById(`${uid}_pret`)?.value);
      const epargne = parseFloat(document.getElementById(`${uid}_epargne`)?.value);
      const res = document.getElementById(`${uid}_result`);
      if (isNaN(pret) || isNaN(epargne)) { res.style.display='none'; return; }

      const diff = pret - epargne;
      const verdict = document.getElementById(`${uid}_verdict`);
      const detail  = document.getElementById(`${uid}_detail`);

      if (diff > 1) {
        verdict.style.cssText = `border-radius:12px;padding:20px;text-align:center;margin-bottom:12px;background:${C.rose}14;border:1px solid ${C.rose}33;`;
        verdict.innerHTML = `<div style="font-size:1.4rem;margin-bottom:6px;">💳</div><div style="font-weight:700;color:${C.rose};font-size:1rem;">Rembourse ton prêt en priorité</div><div style="font-size:0.80rem;color:var(--muted,#888);margin-top:4px;">Ton prêt te coûte ${pct(pret)}/an — ton épargne te rapporte ${pct(epargne)}/an. Tu perds ${pct(diff)} chaque année en gardant cet argent de côté.</div>`;
        detail.innerHTML = `Chaque euro remboursé t'économise ${pct(pret)} d'intérêts garanti. Ton épargne ne te rapporte que ${pct(epargne)}. La différence de ${pct(diff)} est certaine — c'est comme un investissement sans risque à ${pct(diff)}. <br><br><strong>Exception :</strong> garde toujours ton fonds d'urgence (3-6 mois) même si tu rembourses. <a href="budget.html#urgence" style="color:${C.cyan};">Guide fonds d'urgence →</a>`;
      } else if (diff < -1) {
        verdict.style.cssText = `border-radius:12px;padding:20px;text-align:center;margin-bottom:12px;background:${C.green}14;border:1px solid ${C.green}33;`;
        verdict.innerHTML = `<div style="font-size:1.4rem;margin-bottom:6px;">💰</div><div style="font-weight:700;color:${C.green};font-size:1rem;">Épargne et investis en priorité</div><div style="font-size:0.80rem;color:var(--muted,#888);margin-top:4px;">Ton épargne rapporte ${pct(epargne)}/an — ton prêt ne coûte que ${pct(pret)}/an. Tu gagnes ${pct(-diff)}/an en investissant plutôt qu'en remboursant.</div>`;
        detail.innerHTML = `Ton prêt est bon marché — tu as raison de l'utiliser comme levier. Investis la différence dans des ETF world. <a href="invest-etf.html" style="color:${C.cyan};">Guide ETF →</a>`;
      } else {
        verdict.style.cssText = `border-radius:12px;padding:20px;text-align:center;margin-bottom:12px;background:${C.gold}14;border:1px solid ${C.gold}33;`;
        verdict.innerHTML = `<div style="font-size:1.4rem;margin-bottom:6px;">⚖️</div><div style="font-weight:700;color:${C.gold};font-size:1rem;">L'écart est minime (${pct(Math.abs(diff))})</div><div style="font-size:0.80rem;color:var(--muted,#888);margin-top:4px;">Mathématiquement quasi-équivalent. Priorité : ton fonds d'urgence d'abord.</div>`;
        detail.innerHTML = `Dans ce cas, la meilleure stratégie dépend de ton profil psychologique. Si les dettes te stressent, rembourse. Si tu veux maximiser, investis. Les deux sont raisonnables. <a href="budget.html" style="color:${C.cyan};">En savoir plus →</a>`;
      }
      res.style.display='block';
    };
  }

  /* ════════════════════════════════════════════════════════
   * 5. CONVERTISSEUR VALEUR DANS LE TEMPS (inflation)
   * ════════════════════════════════════════════════════════ */
  function convertisseurInflation(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const uid = 'ci_' + containerId;

    el.innerHTML = `<div style="${baseStyle}">
      ${toolTitle('🔍', 'Le Détecteur d\'Érosion', 'Que valent vraiment tes euros dans le futur ? L\'inflation mange ton pouvoir d\'achat.')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
        <div>
          ${label('Montant aujourd\'hui (€)')}
          <input id="${uid}_montant" type="number" min="1" placeholder="ex: 10 000" style="${inputStyle}" oninput="${uid}_calc()">
        </div>
        <div>
          ${label('Dans combien d\'années ?')}
          <input id="${uid}_ans" type="number" min="1" max="50" placeholder="ex: 20" style="${inputStyle}" oninput="${uid}_calc()">
        </div>
      </div>
      <div style="margin-bottom:12px;">
        ${label('Taux d\'inflation annuel estimé')}
        <input id="${uid}_inflation" type="range" min="0.5" max="6" step="0.5" value="2"
          style="width:100%;accent-color:${C.terra};"
          oninput="${uid}_updateInfl(this.value)">
        <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:var(--muted,#888);margin-top:4px;">
          <span>0.5% (faible)</span>
          <span id="${uid}_inflLabel" style="color:${C.terra};font-weight:700;">2%</span>
          <span>6% (forte)</span>
        </div>
      </div>
      <div id="${uid}_result" style="display:none;${resultBox(C.terra)}">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
          <div style="text-align:center;padding:12px;background:rgba(255,255,255,0.04);border-radius:10px;">
            <div style="font-size:0.65rem;color:var(--muted,#888);margin-bottom:4px;">VALEUR NOMINALE</div>
            <div id="${uid}_nominal" style="font-size:1.4rem;font-weight:700;color:${C.green};font-family:'DM Serif Display',serif;font-style:italic;"></div>
            <div style="font-size:0.70rem;color:var(--muted,#888);">tu as toujours les mêmes chiffres</div>
          </div>
          <div style="text-align:center;padding:12px;background:rgba(255,255,255,0.04);border-radius:10px;">
            <div style="font-size:0.65rem;color:var(--muted,#888);margin-bottom:4px;">POUVOIR D'ACHAT RÉEL</div>
            <div id="${uid}_reel" style="font-size:1.4rem;font-weight:700;color:${C.terra};font-family:'DM Serif Display',serif;font-style:italic;"></div>
            <div style="font-size:0.70rem;color:var(--muted,#888);">ce que ça vaut vraiment</div>
          </div>
        </div>
        <div id="${uid}_comment" style="font-size:0.82rem;color:var(--muted,#888);line-height:1.6;"></div>
      </div>
    </div>`;

    window[`${uid}_updateInfl`] = v => {
      document.getElementById(`${uid}_inflLabel`).textContent = v + '%';
      window[`${uid}_calc`]();
    };

    window[`${uid}_calc`] = function() {
      const montant   = parseFloat(document.getElementById(`${uid}_montant`)?.value) || 0;
      const ans       = parseInt(document.getElementById(`${uid}_ans`)?.value) || 0;
      const inflation = parseFloat(document.getElementById(`${uid}_inflation`)?.value) || 2;
      const res = document.getElementById(`${uid}_result`);
      if (!montant || !ans) { res.style.display='none'; return; }

      const reel  = montant / Math.pow(1 + inflation/100, ans);
      const perte = montant - reel;

      document.getElementById(`${uid}_nominal`).textContent = eur(montant);
      document.getElementById(`${uid}_reel`).textContent    = eur(reel);
      document.getElementById(`${uid}_comment`).innerHTML =
        `En ${ans} ans avec ${inflation}% d'inflation/an, tes ${eur(montant)} d'aujourd'hui n'auront plus qu'un pouvoir d'achat de <strong style="color:${C.terra};">${eur(reel)}</strong> — une perte de ${eur(perte)}. ` +
        `Laisser dormir son argent sur un compte courant n'est pas "sans risque" : c'est une perte assurée. ` +
        `<a href="invest-etf.html" style="color:${C.cyan};">Comment battre l'inflation avec les ETF →</a>`;
      res.style.display='block';
    };
  }

  /* ════════════════════════════════════════════════════════
   * 6. TEST DE RÉSISTANCE — FONDS D'URGENCE
   * ════════════════════════════════════════════════════════ */
  function testResistance(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const uid = 'tr_' + containerId;

    const scenarios = [
      { emoji:'🧺', label:'Lave-linge en panne', montant:600 },
      { emoji:'🚗', label:'Réparation voiture imprévue', montant:900 },
      { emoji:'🦷', label:'Soins dentaires urgents', montant:1200 },
      { emoji:'📱', label:'Téléphone cassé à remplacer', montant:500 },
      { emoji:'🔥', label:'Chaudière à remplacer', montant:3000 },
      { emoji:'💼', label:'Perte d\'emploi — 1 mois', montant:2500 },
    ];

    el.innerHTML = `<div style="${baseStyle}">
      ${toolTitle('🛡️', 'Et si un imprévu arrive ?', 'Ton fonds d\'urgence tient-il le choc ? Sélectionne un scénario.')}
      <div style="margin-bottom:16px;">
        ${label('Mon fonds d\'urgence actuel (€)')}
        <input id="${uid}_fonds" type="number" min="0" placeholder="ex: 3 000" style="${inputStyle}" oninput="${uid}_calc()">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px;">
        ${scenarios.map((s, i) => `
          <button onclick="${uid}_select(${i})" id="${uid}_btn${i}"
            style="background:var(--s3,rgba(255,255,255,0.06));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:10px;padding:10px 8px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:0.76rem;color:var(--text,#f0f0f0);transition:all 0.18s;text-align:center;">
            <div style="font-size:1.2rem;margin-bottom:4px;">${s.emoji}</div>
            <div style="font-weight:600;font-size:0.72rem;">${s.label}</div>
            <div style="color:${C.rose};font-weight:700;margin-top:2px;">${eur(s.montant)}</div>
          </button>`
        ).join('')}
      </div>
      <div id="${uid}_result" style="display:none;"></div>
    </div>`;

    let selectedIdx = null;
    window[`${uid}_select`] = function(i) {
      selectedIdx = i;
      document.querySelectorAll(`[id^="${uid}_btn"]`).forEach((b, j) => {
        b.style.borderColor = j === i ? C.rose : 'rgba(255,255,255,0.08)';
        b.style.background  = j === i ? C.rose + '18' : 'rgba(255,255,255,0.06)';
      });
      window[`${uid}_calc`]();
    };

    window[`${uid}_calc`] = function() {
      const fonds = parseFloat(document.getElementById(`${uid}_fonds`)?.value) || 0;
      const res   = document.getElementById(`${uid}_result`);
      if (selectedIdx === null) { res.style.display='none'; return; }

      const s = scenarios[selectedIdx];
      const apres = fonds - s.montant;
      const ok    = apres >= 0;

      res.style.display='block';
      res.innerHTML = `<div style="background:${ok ? C.green : C.rose}14;border:1px solid ${ok ? C.green : C.rose}33;border-radius:12px;padding:16px;">
        <div style="font-weight:700;color:${ok ? C.green : C.rose};margin-bottom:8px;">
          ${ok ? '✅ Tu tiens le choc !' : '⚠️ Ton fonds ne suffit pas'}
        </div>
        <div style="font-size:0.84rem;color:var(--muted,#888);line-height:1.7;">
          ${s.emoji} <strong>${s.label}</strong> : ${eur(s.montant)}<br>
          Fonds d'urgence avant : ${eur(fonds)}<br>
          Fonds d'urgence après : <strong style="color:${ok ? C.green : C.rose};">${eur(apres)}</strong><br>
          ${ok
            ? `Tu absorbes l'imprévu et il te reste ${eur(apres)}. Bien joué — tu peux aussi prévoir une réserve pour les imprévus plus grands.`
            : `Il te manque ${eur(-apres)} pour absorber cet imprévu sans t'endetter. Objectif : constituer ${eur(s.montant * 1.5)} de fonds d'urgence.`}
        </div>
        <div style="margin-top:10px;">
          <a href="budget.html#urgence" style="color:${C.cyan};font-size:0.80rem;font-weight:600;">Comment constituer son fonds d'urgence →</a>
        </div>
      </div>`;
    };
  }

  /* ════════════════════════════════════════════════════════
   * 7. QUIZ BIAIS COGNITIFS
   * ════════════════════════════════════════════════════════ */
  function quizBiais(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const uid = 'qb_' + containerId;

    const questions = [
      {
        q: "Tu as investi 500 € dans une action. Elle perd 30% en une semaine. Tu...",
        options: [
          { txt: "Vends immédiatement pour ne pas perdre davantage", biais: "Aversion à la perte", expl: "C'est l'aversion à la perte : la douleur d'une perte est psychologiquement 2x plus forte que le plaisir d'un gain équivalent. Les marchés récupèrent généralement — vendre dans la panique consolide les pertes.", mauvais: true },
          { txt: "Rachètes davantage — c'est une opportunité d'achat", biais: "Bonne réaction !", expl: "Si tes convictions sur la qualité de l'actif n'ont pas changé, une baisse de 30% est une opportunité d'acheter plus à moindre coût. C'est la logique du DCA.", mauvais: false },
          { txt: "Ne fais rien — tu as un plan, tu le suis", biais: "Excellente discipline !", expl: "La meilleure réponse la plupart du temps. Les investisseurs qui regardent rarement leurs portefeuilles surperforment ceux qui réagissent à chaque mouvement.", mauvais: false },
        ]
      },
      {
        q: "Ton conseiller bancaire te recommande un fonds « à haute performance ». Tu...",
        options: [
          { txt: "Suis son conseil — il est expert", biais: "Biais d'autorité", expl: "Le biais d'autorité te pousse à suivre les experts sans questionner. 92% des fonds actifs sous-performent leur indice sur 15 ans (SPIVA). Ton conseiller peut avoir des intérêts à te vendre certains produits.", mauvais: true },
          { txt: "Cherches le TER du fonds et sa performance nette sur 10 ans", biais: "Bonne réaction !", expl: "Regarder les frais réels (TER) et la performance nette sur longue durée est la bonne démarche. Un ETF à 0,20% surpasse souvent un fonds actif à 2% même si sa performance brute est identique.", mauvais: false },
          { txt: "Demandes le document DICI (fiche d'information clé)", biais: "Parfait !", expl: "Le DICI est obligatoire pour tout produit d'investissement en Europe. Il résume les risques, les frais et les performances passées de façon standardisée.", mauvais: false },
        ]
      },
      {
        q: "Tu entends partout que les cryptos explosent. Tu...",
        options: [
          { txt: "Investis massivement — tout le monde en parle", biais: "FOMO + biais de consensus", expl: "Quand tout le monde parle d'un actif dans les médias grand public, c'est souvent proche du sommet. Le FOMO (Fear Of Missing Out) et le biais de troupeau sont les ennemis de l'investisseur rationnel.", mauvais: true },
          { txt: "Alloues maximum 5% de ton portefeuille en crypto", biais: "Approche équilibrée !", expl: "Limiter les actifs spéculatifs à une petite part du portefeuille te permet de bénéficier du potentiel sans mettre en danger ta retraite.", mauvais: false },
          { txt: "Ignores — tu t'en tiens à ta stratégie ETF", biais: "Discipline admirable !", expl: "Rester fidèle à un plan d'investissement préétabli est statistiquement l'une des meilleures stratégies à long terme.", mauvais: false },
        ]
      },
      {
        q: "Tu as raté une opportunité d'investissement qui a ensuite doublé. Tu...",
        options: [
          { txt: "Regrettes intensément — tu aurais dû", biais: "Biais du regret", expl: "Le biais du regret te fait sur-pondérer les décisions du passé. Tu ne pouvais pas savoir à l'avance. Se concentrer sur les regrets conduit souvent à prendre des risques excessifs pour « se rattraper ».", mauvais: true },
          { txt: "Notes la leçon et passes à autre chose", biais: "Bonne mentalité !", expl: "Analyser une opportunité manquée pour améliorer son processus de décision — sans s'y attarder — est la réaction saine.", mauvais: false },
          { txt: "Te souviens que la prochaine fois tu prendras plus de risques", biais: "Attention !", expl: "Prendre plus de risques pour compenser un regret passé est un piège classique. Le risque doit être défini par ta situation personnelle, pas par tes émotions.", mauvais: true },
        ]
      },
    ];

    let step = 0, score = 0;

    function render() {
      if (step >= questions.length) {
        el.innerHTML = `<div style="${baseStyle};text-align:center;">
          <div style="font-size:1.8rem;margin-bottom:8px;">🧠</div>
          <div style="font-family:'DM Serif Display',serif;font-style:italic;font-size:1.4rem;color:var(--text,#f0f0f0);margin-bottom:8px;">Score : ${score}/${questions.length}</div>
          <div style="font-size:0.90rem;color:var(--muted,#888);line-height:1.6;margin-bottom:16px;">
            ${score === questions.length ? '🎯 Parfait ! Tu as une excellente conscience de tes biais — continue à te challenger.' :
              score >= 2 ? '👍 Bon niveau de conscience financière — quelques biais à surveiller.' :
              '📚 Les biais cognitifs nous touchent tous. La connaissance est le premier antidote.'}
          </div>
          <button onclick="location.reload()" style="${btnStyle(C.cyan)}">Recommencer</button>
          <div style="margin-top:12px;"><a href="invest.html" style="color:${C.cyan};font-size:0.82rem;">Guide investissement →</a></div>
        </div>`;
        return;
      }
      const q = questions[step];
      el.innerHTML = `<div style="${baseStyle}">
        ${toolTitle('🧠', 'Le Détecteur de Biais Financiers', `Question ${step + 1} sur ${questions.length}`)}
        <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:16px;margin-bottom:14px;font-size:0.92rem;font-weight:600;line-height:1.6;color:var(--text,#f0f0f0);">${q.q}</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${q.options.map((opt, i) => `
            <button onclick="${uid}_answer(${i})"
              style="text-align:left;background:var(--s3,rgba(255,255,255,0.06));border:1px solid var(--border);border-radius:10px;padding:12px 14px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text,#f0f0f0);transition:all 0.18s;line-height:1.5;">
              ${opt.txt}
            </button>`).join('')}
        </div>
        <div style="margin-top:14px;background:rgba(255,255,255,0.03);border-radius:8px;height:6px;overflow:hidden;">
          <div style="height:100%;width:${(step/questions.length)*100}%;background:linear-gradient(90deg,${C.rose},${C.cyan});transition:width 0.4s;"></div>
        </div>
      </div>`;

      window[`${uid}_answer`] = function(i) {
        const opt = q.options[i];
        if (!opt.mauvais) score++;
        const color = opt.mauvais ? C.rose : C.green;
        el.innerHTML = `<div style="${baseStyle}">
          ${toolTitle('🧠', 'Le Détecteur de Biais Financiers', `Question ${step + 1} sur ${questions.length}`)}
          <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:16px;margin-bottom:14px;font-size:0.92rem;font-weight:600;line-height:1.6;color:var(--text,#f0f0f0);">${q.q}</div>
          <div style="background:${color}14;border:1px solid ${color}33;border-radius:12px;padding:16px;margin-bottom:14px;">
            <div style="font-weight:700;color:${color};margin-bottom:6px;">${opt.biais}</div>
            <div style="font-size:0.84rem;color:var(--muted,#888);line-height:1.7;">${opt.expl}</div>
          </div>
          <button onclick="${uid}_next()" style="${btnStyle(C.cyan)};width:100%;">
            ${step < questions.length - 1 ? 'Question suivante →' : 'Voir mon score →'}
          </button>
        </div>`;
        window[`${uid}_next`] = function() { step++; render(); };
      };
    }

    render();
  }

  /* ════════════════════════════════════════════════════════
   * 8. ARBRE DE DÉCISION — SUIS-JE PRÊT À INVESTIR ?
   * ════════════════════════════════════════════════════════ */
  function arbreDecision(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const uid = 'ad_' + containerId;

    const tree = {
      q: "As-tu un fonds d'urgence couvrant 3 à 6 mois de dépenses ?",
      oui: {
        q: "As-tu des dettes à taux supérieur à 4% (crédit à la consommation, carte de crédit) ?",
        oui: {
          result: { color: C.rose, icon:'💳', titre:'Rembourse tes dettes d\'abord', desc:'Tes dettes à taux élevé te coûtent plus cher que ce que tu peux espérer gagner en bourse. Priorité absolue : liquider ces dettes avant d\'investir.', lien:'budget.html', lienTxt:'Stratégie de remboursement' }
        },
        non: {
          q: "As-tu un horizon d'investissement d'au moins 5 ans ?",
          oui: {
            q: "Peux-tu investir sans avoir besoin de cet argent en cas d'urgence ?",
            oui: {
              result: { color: C.green, icon:'🚀', titre:'Tu es prêt à investir !', desc:'Tu as les fondations solides : fonds d\'urgence, pas de dettes toxiques, horizon long terme. Il est temps de faire travailler ton argent.', lien:'invest.html', lienTxt:'Guide investissement complet' }
            },
            non: {
              result: { color: C.gold, icon:'⚠️', titre:'Consolide encore un peu', desc:'Tu as besoin d\'un coussin de liquidités plus important avant d\'investir. Renforce ton fonds d\'urgence et reviens quand tu as 6 mois de dépenses de côté.', lien:'budget.html#urgence', lienTxt:'Guide fonds d\'urgence' }
            }
          },
          non: {
            result: { color: C.gold, icon:'📅', titre:'Horizon trop court pour la bourse', desc:'Avec moins de 5 ans, la bourse est trop volatile. Préfère un compte épargne réglementé, un bon d\'État ou une assurance-vie branche 21.', lien:'epargne-long-terme.html', lienTxt:'Alternatives à la bourse' }
          }
        }
      },
      non: {
        result: { color: C.cyan, icon:'🛡️', titre:'Commence par le fonds d\'urgence', desc:'Avant tout investissement, tu as besoin d\'un filet de sécurité. 3 à 6 mois de dépenses dans un compte épargne accessible.', lien:'budget.html#urgence', lienTxt:'Comment constituer son fonds d\'urgence' }
      }
    };

    function renderNode(node, path=[]) {
      if (node.result) {
        const r = node.result;
        el.innerHTML = `<div style="${baseStyle}">
          ${toolTitle('🌳', 'Le Planificateur de Liberté', 'Résultat')}
          <div style="background:${r.color}14;border:1px solid ${r.color}33;border-radius:14px;padding:20px;text-align:center;">
            <div style="font-size:2rem;margin-bottom:8px;">${r.icon}</div>
            <div style="font-weight:700;color:${r.color};font-size:1rem;margin-bottom:8px;">${r.titre}</div>
            <div style="font-size:0.84rem;color:var(--muted,#888);line-height:1.7;margin-bottom:14px;">${r.desc}</div>
            <a href="${r.lien}" style="${btnStyle(r.color)};text-decoration:none;display:inline-block;padding:10px 20px;">${r.lienTxt} →</a>
          </div>
          <button onclick="${uid}_restart()" style="width:100%;margin-top:12px;background:transparent;border:1px solid var(--border);border-radius:10px;padding:10px;font-family:'DM Sans',sans-serif;font-size:0.82rem;color:var(--muted,#888);cursor:pointer;">↩ Recommencer</button>
        </div>`;
        window[`${uid}_restart`] = () => renderNode(tree);
        return;
      }

      el.innerHTML = `<div style="${baseStyle}">
        ${toolTitle('🌳', 'Le Planificateur de Liberté', 'Réponds aux questions pour obtenir ta recommandation personnalisée')}
        <div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:16px;margin-bottom:16px;font-size:0.94rem;font-weight:600;color:var(--text,#f0f0f0);line-height:1.5;">${node.q}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <button onclick="${uid}_oui()" style="${btnStyle(C.green)};width:100%;font-size:1rem;">✓ Oui</button>
          <button onclick="${uid}_non()" style="${btnStyle(C.rose)};width:100%;font-size:1rem;">✗ Non</button>
        </div>
        ${path.length > 0 ? `<button onclick="${uid}_back()" style="width:100%;margin-top:10px;background:transparent;border:1px solid var(--border);border-radius:10px;padding:8px;font-family:'DM Sans',sans-serif;font-size:0.78rem;color:var(--muted,#888);cursor:pointer;">← Question précédente</button>` : ''}
      </div>`;

      window[`${uid}_oui`]  = () => renderNode(node.oui, [...path, 'oui']);
      window[`${uid}_non`]  = () => renderNode(node.non, [...path, 'non']);
      window[`${uid}_back`] = () => {
        if (path.length > 0) {
          let node = tree;
          path.slice(0, -1).forEach(d => { node = node[d]; });
          renderNode(node, path.slice(0, -1));
        }
      };
    }

    renderNode(tree);
  }

  /* ════════════════════════════════════════════════════════
   * 9. TRADUCTEUR DE JARGON BANCAIRE
   * (simulation IA — réponses instantanées depuis dictionnaire)
   * ════════════════════════════════════════════════════════ */
  function traducteurJargon(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const uid = 'tj_' + containerId;

    const dico = {
      'taeg': { simple:'Taux Annuel Effectif Global. Le VRAI taux de ton crédit — il inclut tout : intérêts, frais de dossier, assurances. Toujours comparer les TAEG, jamais les taux nominaux.', exemple:'Un crédit auto à "taux nominal 3%" peut avoir un TAEG à 5,2% une fois tous les frais inclus.' },
      'taux nominal': { simple:'Le taux d\'intérêt "de base" d\'un crédit, SANS les frais annexes. Toujours inférieur au TAEG — souvent utilisé pour faire paraître un crédit moins cher.', exemple:'La pub dit "crédit à 2,9%". Le TAEG réel est à 4,7%. La différence, c\'est les frais.' },
      'franchise': { simple:'Montant que tu paies toi-même avant que l\'assurance intervienne. Franchise absolue = tu paies toujours ce montant. Franchise relative = tu ne paies rien si le dommage dépasse ce seuil.', exemple:'Franchise 500 €. Dégât 800 €. Assurance paie 300 €. Dégât 400 € ? Tu paies tout.' },
      'capital restant dû': { simple:'Ce que tu dois encore à la banque après avoir payé tes mensualités. Diminue chaque mois, mais lentement au début (la plupart de tes mensualités couvrent les intérêts).', exemple:'Après 5 ans de crédit immobilier, tu as payé 60.000 € mais réduit ta dette de seulement 20.000 €.' },
      'amortissement': { simple:'Le remboursement progressif du capital d\'un prêt. Au début, tu rembourses surtout des intérêts. Vers la fin, tu rembourses surtout du capital.', exemple:'Crédit 200.000 € sur 25 ans : mois 1 tu rembourses 200 € de capital et 600 € d\'intérêts. Mois 299 : 750 € de capital et 50 € d\'intérêts.' },
      'plus-value': { simple:'La différence entre le prix de vente et le prix d\'achat d\'un actif. Si tu achètes un ETF à 100 € et le vends à 130 €, ta plus-value est 30 €.', exemple:'Tu achètes 50 actions à 20 €. Tu vends à 28 €. Plus-value : (28-20) × 50 = 400 €.' },
      'dividende': { simple:'Part des bénéfices qu\'une société distribue à ses actionnaires. Perçu en cash, soumis au précompte mobilier de 30% en Belgique.', exemple:'Tu as 100 actions Total. Total verse 1,80 €/action de dividende. Tu reçois 180 € bruts, soit 126 € nets après PM 30%.' },
      'liquidité': { simple:'La facilité de convertir un actif en cash rapidement sans perdre de valeur. Cash = liquidité parfaite. Bien immobilier = peu liquide (prend des mois à vendre).', exemple:'ETF en bourse : vendu en quelques secondes. Appartement : vendu en 3-6 mois minimum.' },
      'volatilité': { simple:'L\'amplitude des variations du prix d\'un actif dans le temps. Fort volatilité = grands écarts à la hausse comme à la baisse. Faible volatilité = prix stable.', exemple:'Un ETF monde varie de ±5% par an en conditions normales. Une cryptomonnaie peut varier de ±50% en quelques semaines.' },
      'diversification': { simple:'Ne pas mettre tous ses oeufs dans le même panier. Répartir ses investissements entre actifs, secteurs et zones géographiques pour réduire le risque.', exemple:'Au lieu d\'investir 10.000 € dans 1 action, investis dans un ETF qui détient 1.600 entreprises différentes.' },
      'intérêts composés': { simple:'Les intérêts générés par ton capital génèrent eux-mêmes des intérêts. L\'effet boule de neige de la finance — exponentiellement puissant sur longue durée.', exemple:'1.000 € à 7%/an : après 10 ans = 1.967 €. Après 30 ans = 7.612 €. Après 40 ans = 14.974 €.' },
      'ter': { simple:'Total Expense Ratio. Les frais annuels totaux d\'un fonds ou ETF, exprimés en % du capital investi. Déduits automatiquement — tu ne les vois jamais mais tu les payes.', exemple:'ETF IWDA : TER 0,20%. Fonds actif BNP : TER 1,80%. Sur 100.000 € investis, la différence est 1.600 €/an.' },
      'duration': { simple:'Sensibilité d\'une obligation à la variation des taux d\'intérêt. Duration élevée = cours très sensible aux taux. Utilisé pour mesurer le risque des obligations.', exemple:'Duration 10 : si les taux montent de 1%, ton obligation perd ~10% de valeur.' },
      'benchmark': { simple:'Indice de référence utilisé pour mesurer la performance d\'un fonds. Si ton fonds fait +8% mais son benchmark fait +12%, ton gestionnaire a sous-performé.', exemple:'L\'indice S&P 500 est le benchmark classique des fonds actions américains.' },
      'prime de risque': { simple:'Le rendement supplémentaire attendu en contrepartie d\'un risque plus élevé. Plus c\'est risqué, plus le rendement potentiel doit être élevé pour que ça soit intéressant.', exemple:'Bon du Trésor belge à 3% = sans risque. Actions à 8% = prime de risque de 5% pour compenser la volatilité.' },
      'vrac': { simple:'', exemple:'' }, // fallback
    };

    // Fonction de matching floue
    function findBest(query) {
      const q = query.toLowerCase().trim();
      // Match exact
      if (dico[q]) return { term: q, ...dico[q] };
      // Match partiel
      for (const [key, val] of Object.entries(dico)) {
        if (q.includes(key) || key.includes(q)) return { term: key, ...val };
      }
      // Match mots-clés
      const words = q.split(/\s+/);
      for (const [key, val] of Object.entries(dico)) {
        if (words.some(w => w.length > 3 && key.includes(w))) return { term: key, ...val };
      }
      return null;
    }

    el.innerHTML = `<div style="${baseStyle}">
      ${toolTitle('💬', 'Le Traducteur de Jargon Bancaire', 'Tape un terme financier et je te l\'explique en langage humain — sans blabla.')}
      <div style="display:flex;gap:8px;margin-bottom:14px;">
        <input id="${uid}_input" type="text" placeholder="ex: TAEG, franchise, amortissement..."
          style="${inputStyle};flex:1;"
          onkeydown="if(event.key==='Enter') ${uid}_translate()"
          oninput="${uid}_suggest(this.value)">
        <button onclick="${uid}_translate()" style="${btnStyle(C.cyan)};padding:10px 16px;flex-shrink:0;">→</button>
      </div>
      <div id="${uid}_suggest" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
        ${Object.keys(dico).filter(k=>k!=='vrac').slice(0,8).map(k => 
          `<button onclick="document.getElementById('${uid}_input').value='${k}';${uid}_translate()"
            style="font-size:0.72rem;font-weight:600;padding:4px 10px;border-radius:20px;border:1px solid var(--border);background:var(--s3,rgba(255,255,255,0.06));color:var(--muted,#888);cursor:pointer;font-family:'DM Sans',sans-serif;">${k}</button>`
        ).join('')}
      </div>
      <div id="${uid}_result" style="display:none;"></div>
      <div id="${uid}_typing" style="display:none;padding:12px;color:var(--muted,#888);font-size:0.84rem;">
        <span style="display:inline-block;animation:pulse 1s infinite;">⏳ Traduction en cours...</span>
      </div>
    </div>`;

    window[`${uid}_suggest`] = function(val) {};

    window[`${uid}_translate`] = function() {
      const query = document.getElementById(`${uid}_input`)?.value?.trim();
      if (!query) return;

      const typing = document.getElementById(`${uid}_typing`);
      const result = document.getElementById(`${uid}_result`);
      result.style.display='none';
      typing.style.display='block';

      setTimeout(() => {
        typing.style.display='none';
        const found = findBest(query);

        if (found && found.simple) {
          result.style.display='block';
          result.innerHTML = `<div style="background:${C.cyan}10;border:1px solid ${C.cyan}25;border-radius:12px;padding:16px;">
            <div style="font-size:0.65rem;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:${C.cyan};margin-bottom:6px;">TRADUCTION</div>
            <div style="font-size:0.92rem;color:var(--text,#f0f0f0);line-height:1.7;margin-bottom:12px;">${found.simple}</div>
            ${found.exemple ? `<div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:10px;font-size:0.80rem;color:var(--muted,#888);line-height:1.6;"><strong style="color:${C.gold};">💡 Exemple :</strong> ${found.exemple}</div>` : ''}
          </div>
          <div style="margin-top:8px;text-align:right;"><a href="glossaire.html" style="font-size:0.74rem;color:var(--muted,#888);">Voir le glossaire complet →</a></div>`;
        } else {
          result.style.display='block';
          result.innerHTML = `<div style="background:rgba(255,255,255,0.04);border-radius:12px;padding:14px;font-size:0.84rem;color:var(--muted,#888);">
            Je ne connais pas encore "<strong style="color:var(--text,#f0f0f0);">${query}</strong>". 
            <a href="glossaire.html" style="color:${C.cyan};">Cherche dans le glossaire →</a> ou 
            <a href="faq.html" style="color:${C.cyan};">pose la question à Waffy.</a>
          </div>`;
        }
      }, 600 + Math.random() * 400);
    };
  }

  /* ════════════════════════════════════════════════════════
   * 10. JOURNAL DE BORD DES DÉCISIONS FINANCIÈRES
   * ════════════════════════════════════════════════════════ */
  function journalDecisions(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const uid = 'jd_' + containerId;
    const STORE_KEY = 'ww_journal';

    function load() { try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); } catch(e) { return []; } }
    function save(d) { try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch(e) {} }

    function render() {
      const decisions = load();
      const totalEco = decisions.reduce((sum, d) => sum + (d.eco || 0), 0);

      el.innerHTML = `<div style="${baseStyle}">
        ${toolTitle('📓', 'Mon Journal de Bord Financier', 'Note tes décisions financières et mesure leur impact réel sur ton budget.')}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
          <div>
            ${label('Décision prise')}
            <input id="${uid}_desc" type="text" placeholder='ex: Arrêté abonnement salle 40 €/mois' style="${inputStyle}">
          </div>
          <div>
            ${label('Économie mensuelle (€)')}
            <input id="${uid}_eco" type="number" min="0" placeholder="ex: 40" style="${inputStyle}">
          </div>
        </div>
        <button onclick="${uid}_add()" style="${btnStyle(C.green)};width:100%;margin-bottom:16px;">+ Ajouter cette décision</button>
        ${totalEco > 0 ? `<div style="background:${C.green}14;border:1px solid ${C.green}33;border-radius:12px;padding:14px;text-align:center;margin-bottom:14px;">
          <div style="font-size:0.72rem;color:var(--muted,#888);margin-bottom:4px;">ÉCONOMIES TOTALES</div>
          <div style="font-size:1.6rem;font-weight:700;color:${C.green};font-family:'DM Serif Display',serif;font-style:italic;">${eur(totalEco)}/mois</div>
          <div style="font-size:0.80rem;color:var(--muted,#888);margin-top:4px;">soit ${eur(totalEco * 12)}/an • ${eur(totalEco * 12 * 10)} en 10 ans en ETF</div>
        </div>` : ''}
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${decisions.length === 0 ? `<div style="text-align:center;padding:20px;color:var(--muted,#888);font-size:0.84rem;">Aucune décision enregistrée. Commence par noter la première !</div>` :
            decisions.map((d, i) => `
              <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.04);border-radius:10px;padding:10px 12px;">
                <div>
                  <div style="font-size:0.86rem;font-weight:600;color:var(--text,#f0f0f0);">${d.desc}</div>
                  <div style="font-size:0.74rem;color:${C.green};">${eur(d.eco)}/mois · ${eur(d.eco * 12)}/an</div>
                </div>
                <button onclick="${uid}_del(${i})" style="background:transparent;border:none;cursor:pointer;color:var(--muted,#888);font-size:1rem;padding:4px 8px;">✕</button>
              </div>`).join('')}
        </div>
        <div style="margin-top:12px;font-size:0.72rem;color:var(--muted,#888);text-align:center;">Données sauvegardées localement dans ton navigateur.</div>
      </div>`;

      window[`${uid}_add`] = function() {
        const desc = document.getElementById(`${uid}_desc`)?.value?.trim();
        const eco  = parseFloat(document.getElementById(`${uid}_eco`)?.value) || 0;
        if (!desc) return;
        const d = load();
        d.push({ desc, eco, date: new Date().toLocaleDateString('fr-BE') });
        save(d); render();
      };

      window[`${uid}_del`] = function(i) {
        const d = load(); d.splice(i, 1); save(d); render();
      };
    }

    render();
  }

  /* ════════════════════════════════════════════════════════
   * 11. FRAIS CACHÉS — IMPACT SUR 25 ANS
   * ════════════════════════════════════════════════════════ */
  function fraisCaches(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const uid = 'fc_' + containerId;

    el.innerHTML = `<div style="${baseStyle}">
      ${toolTitle('🔍', 'L\'Outil Anti-Frais Cachés', 'Combien les frais de ton fonds te coûtent-ils vraiment sur 25 ans ?')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
        <div>
          ${label('Capital investi (€)')}
          <input id="${uid}_capital" type="number" min="1000" placeholder="ex: 50 000" style="${inputStyle}" oninput="${uid}_calc()">
        </div>
        <div>
          ${label('Durée (années)')}
          <input id="${uid}_ans" type="number" min="1" max="40" value="25" style="${inputStyle}" oninput="${uid}_calc()">
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
        <div>
          ${label('Frais fonds actif bancaire (%/an)')}
          <input id="${uid}_frais_actif" type="number" min="0" max="5" step="0.1" value="1.8" style="${inputStyle}" oninput="${uid}_calc()">
          <div style="font-size:0.70rem;color:var(--muted,#888);margin-top:3px;">Fonds BNP/ING/Belfius : 1,5-2,5%</div>
        </div>
        <div>
          ${label('Frais ETF (%/an)')}
          <input id="${uid}_frais_etf" type="number" min="0" max="2" step="0.01" value="0.2" style="${inputStyle}" oninput="${uid}_calc()">
          <div style="font-size:0.70rem;color:var(--muted,#888);margin-top:3px;">IWDA/VWCE : 0,20%</div>
        </div>
      </div>
      <div id="${uid}_result" style="display:none;"></div>
    </div>`;

    window[`${uid}_calc`] = function() {
      const capital    = parseFloat(document.getElementById(`${uid}_capital`)?.value) || 0;
      const ans        = parseInt(document.getElementById(`${uid}_ans`)?.value) || 25;
      const fraisActif = parseFloat(document.getElementById(`${uid}_frais_actif`)?.value) || 1.8;
      const fraisEtf   = parseFloat(document.getElementById(`${uid}_frais_etf`)?.value) || 0.2;
      const res = document.getElementById(`${uid}_result`);
      if (!capital) { res.style.display='none'; return; }

      const rendement = 7; // hypothèse neutre
      const finActif = capital * Math.pow(1 + (rendement - fraisActif)/100, ans);
      const finEtf   = capital * Math.pow(1 + (rendement - fraisEtf)/100, ans);
      const diff     = finEtf - finActif;
      const pctPerdu = (diff / finEtf) * 100;

      res.style.display='block';
      res.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
          <div style="background:${C.rose}14;border:1px solid ${C.rose}33;border-radius:12px;padding:14px;text-align:center;">
            <div style="font-size:0.65rem;color:var(--muted,#888);margin-bottom:4px;">FONDS ACTIF (${fraisActif}%/an)</div>
            <div style="font-size:1.3rem;font-weight:700;color:${C.rose};font-family:'DM Serif Display',serif;font-style:italic;">${eur(finActif)}</div>
          </div>
          <div style="background:${C.green}14;border:1px solid ${C.green}33;border-radius:12px;padding:14px;text-align:center;">
            <div style="font-size:0.65rem;color:var(--muted,#888);margin-bottom:4px;">ETF (${fraisEtf}%/an)</div>
            <div style="font-size:1.3rem;font-weight:700;color:${C.green};font-family:'DM Serif Display',serif;font-style:italic;">${eur(finEtf)}</div>
          </div>
        </div>
        <div style="background:${C.gold}14;border:1px solid ${C.gold}33;border-radius:12px;padding:16px;text-align:center;">
          <div style="font-size:0.72rem;color:var(--muted,#888);margin-bottom:4px;">MANQUE À GAGNER À CAUSE DES FRAIS</div>
          <div style="font-size:1.8rem;font-weight:700;color:${C.gold};font-family:'DM Serif Display',serif;font-style:italic;">${eur(diff)}</div>
          <div style="font-size:0.80rem;color:var(--muted,#888);margin-top:4px;">${pctPerdu.toFixed(0)}% de ton capital final part en frais</div>
        </div>
        <div style="margin-top:12px;font-size:0.80rem;color:var(--muted,#888);line-height:1.7;">
          Hypothèse : rendement brut de ${rendement}% pour les deux, sur ${ans} ans. La différence de ${pct(fraisActif - fraisEtf)}/an en frais représente <strong style="color:${C.gold};">${eur(diff)}</strong> de patrimoine en moins. 
          <a href="invest-fonds.html" style="color:${C.cyan};">Comprendre l'impact des frais →</a>
        </div>`;
    };
  }

  /* ── Exports publics ────────────────────────────────────── */
  return {
    simulateurObjectifs:    simulateurObjectifs,
    decodeur503020:         decodeur503020,
    coutReel:               coutReel,
    comparateurDette:       comparateurDette,
    convertisseurInflation: convertisseurInflation,
    testResistance:         testResistance,
    quizBiais:              quizBiais,
    arbreDecision:          arbreDecision,
    traducteurJargon:       traducteurJargon,
    journalDecisions:       journalDecisions,
    fraisCaches:            fraisCaches,
  };

})();

/* ════════════════════════════════════════════════════════
 * 12. LIGNE DU TEMPS DES GRANDS PROJETS
 * L'utilisateur place ses projets sur une frise temporelle.
 * L'outil affiche la distance et recommande le support.
 * ════════════════════════════════════════════════════════ */
window.WW_Tools.ligneTemps = function(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const uid = 'lt_' + containerId;

  const eur = n => Number(n).toLocaleString('fr-BE', {maximumFractionDigits:0}) + ' €';
  const C = { rose:'#E87CC3', cyan:'#5BB8D4', gold:'#E8C23A', green:'#7EC8A0', terra:'#C4724A', purple:'#c9b8ff' };

  const SUPPORTS = [
    { max: 2,  color: C.green,  icon: '💶', label: 'Compte épargne réglementé',
      desc: 'Horizon < 2 ans → liquidité maximale. Bons d\'État courts si taux attractifs.' },
    { max: 5,  color: C.gold,   icon: '📜', label: 'Bons d\'État / ETF obligataires',
      desc: 'Horizon 2-5 ans → sécurité avec un peu de rendement. Éviter les ETF actions.' },
    { max: 10, color: C.cyan,   icon: '📈', label: 'Mix ETF actions (50%) + obligations',
      desc: 'Horizon 5-10 ans → progressivement vers les actions. DCA mensuel recommandé.' },
    { max: 99, color: C.rose,   icon: '🚀', label: 'ETF monde en DCA',
      desc: 'Horizon 10+ ans → 100% ETF actions monde. Le temps absorbe la volatilité.' },
  ];

  function getSupport(years) {
    return SUPPORTS.find(s => years <= s.max) || SUPPORTS[SUPPORTS.length - 1];
  }

  function getColor(years) {
    return getSupport(years).color;
  }

  // State
  let projects = [];
  let nextId = 1;

  function renderTool() {
    const currentYear = new Date().getFullYear();

    el.innerHTML = `
<div style="font-family:'DM Sans',sans-serif;background:var(--s2,rgba(255,255,255,0.04));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:22px;margin:16px 0;">
  <div style="font-size:1.05rem;font-weight:700;color:var(--text,#f0f0f0);margin-bottom:4px;">🗓️ La Ligne du Temps de tes Projets</div>
  <div style="font-size:0.80rem;color:var(--muted,#888);margin-bottom:20px;line-height:1.5;">Place tes projets financiers sur la frise. L'outil te dit où placer ton argent selon l'horizon.</div>

  <div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:8px;align-items:end;margin-bottom:12px;">
    <div>
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted,#888);margin-bottom:5px;">Projet</div>
      <input id="${uid}_nom" type="text" placeholder="ex: Voyage Japon"
        style="width:100%;box-sizing:border-box;background:var(--s3,rgba(255,255,255,0.06));border:1px solid var(--border);border-radius:10px;padding:10px 13px;font-family:'DM Sans',sans-serif;font-size:0.88rem;color:var(--text,#f0f0f0);outline:none;"
        onkeydown="if(event.key==='Enter') ${uid}_add()">
    </div>
    <div>
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted,#888);margin-bottom:5px;">Année cible</div>
      <input id="${uid}_annee" type="number" min="${currentYear+1}" max="${currentYear+40}" placeholder="${currentYear+3}"
        style="width:100%;box-sizing:border-box;background:var(--s3,rgba(255,255,255,0.06));border:1px solid var(--border);border-radius:10px;padding:10px 13px;font-family:'DM Sans',sans-serif;font-size:0.88rem;color:var(--text,#f0f0f0);outline:none;"
        onkeydown="if(event.key==='Enter') ${uid}_add()">
    </div>
    <div>
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted,#888);margin-bottom:5px;">Budget (€)</div>
      <input id="${uid}_budget" type="number" min="0" placeholder="5000"
        style="width:100%;box-sizing:border-box;background:var(--s3,rgba(255,255,255,0.06));border:1px solid var(--border);border-radius:10px;padding:10px 13px;font-family:'DM Sans',sans-serif;font-size:0.88rem;color:var(--text,#f0f0f0);outline:none;"
        onkeydown="if(event.key==='Enter') ${uid}_add()">
    </div>
    <button onclick="${uid}_add()"
      style="background:linear-gradient(135deg,#E87CC3,#b8449a);color:#fff;border:none;border-radius:10px;padding:10px 16px;font-family:'DM Sans',sans-serif;font-weight:700;font-size:0.88rem;cursor:pointer;white-space:nowrap;">
      + Ajouter
    </button>
  </div>

  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;">
    <button onclick="${uid}_quick('Voyage',${currentYear+2},3000)" style="font-size:0.72rem;font-weight:600;padding:4px 10px;border-radius:20px;border:1px solid var(--border);background:var(--s3);color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif;">✈️ Voyage</button>
    <button onclick="${uid}_quick('Voiture',${currentYear+3},15000)" style="font-size:0.72rem;font-weight:600;padding:4px 10px;border-radius:20px;border:1px solid var(--border);background:var(--s3);color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif;">🚗 Voiture</button>
    <button onclick="${uid}_quick('Apport immo',${currentYear+5},40000)" style="font-size:0.72rem;font-weight:600;padding:4px 10px;border-radius:20px;border:1px solid var(--border);background:var(--s3);color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif;">🏠 Apport immo</button>
    <button onclick="${uid}_quick('Retraite',${currentYear+30},500000)" style="font-size:0.72rem;font-weight:600;padding:4px 10px;border-radius:20px;border:1px solid var(--border);background:var(--s3);color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif;">🌅 Retraite</button>
  </div>

  <div id="${uid}_frise" style="min-height:60px;"></div>
  <div id="${uid}_detail" style="margin-top:12px;display:flex;flex-direction:column;gap:8px;"></div>
</div>`;

    window[`${uid}_add`] = function() {
      const nom    = document.getElementById(`${uid}_nom`)?.value?.trim();
      const annee  = parseInt(document.getElementById(`${uid}_annee`)?.value);
      const budget = parseFloat(document.getElementById(`${uid}_budget`)?.value) || 0;
      if (!nom || !annee || annee <= currentYear) return;
      projects.push({ id: nextId++, nom, annee, budget });
      projects.sort((a, b) => a.annee - b.annee);
      document.getElementById(`${uid}_nom`).value   = '';
      document.getElementById(`${uid}_annee`).value = '';
      document.getElementById(`${uid}_budget`).value = '';
      renderFrise();
    };

    window[`${uid}_quick`] = function(nom, annee, budget) {
      projects.push({ id: nextId++, nom, annee, budget });
      projects.sort((a, b) => a.annee - b.annee);
      renderFrise();
    };

    window[`${uid}_del`] = function(id) {
      projects = projects.filter(p => p.id !== id);
      renderFrise();
    };
  }

  function renderFrise() {
    const currentYear = new Date().getFullYear();
    const frise  = document.getElementById(`${uid}_frise`);
    const detail = document.getElementById(`${uid}_detail`);
    if (!frise || !detail) return;

    if (!projects.length) {
      frise.innerHTML  = `<div style="font-size:0.82rem;color:var(--muted);text-align:center;padding:20px;">Ajoute un premier projet ci-dessus.</div>`;
      detail.innerHTML = '';
      return;
    }

    const maxYear = Math.max(...projects.map(p => p.annee));
    const span    = Math.max(maxYear - currentYear, 5);

    // Frise visuelle
    let friseHTML = `<div style="position:relative;height:60px;margin:8px 0 4px;">`;

    // Ligne de base
    friseHTML += `<div style="position:absolute;top:28px;left:0;right:0;height:2px;background:var(--faint);border-radius:2px;"></div>`;

    // Point "Aujourd'hui"
    friseHTML += `<div style="position:absolute;top:18px;left:0;text-align:center;">
      <div style="width:20px;height:20px;border-radius:50%;background:var(--s3);border:2px solid var(--muted);margin:0 auto;"></div>
      <div style="font-size:0.62rem;color:var(--muted);margin-top:4px;white-space:nowrap;">${currentYear}</div>
    </div>`;

    // Projets sur la frise
    projects.forEach(p => {
      const years = p.annee - currentYear;
      const pct   = Math.min(((p.annee - currentYear) / span) * 100, 98);
      const color = getColor(years);
      friseHTML += `<div style="position:absolute;top:14px;left:${pct}%;transform:translateX(-50%);text-align:center;cursor:pointer;" onclick="${uid}_del(${p.id})" title="Cliquer pour supprimer">
        <div style="width:28px;height:28px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;font-size:0.65rem;color:#fff;font-weight:700;margin:0 auto;box-shadow:0 0 0 3px ${color}33;">
          ${years}a
        </div>
        <div style="font-size:0.60rem;color:var(--muted);margin-top:3px;max-width:60px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p.nom}</div>
      </div>`;
    });

    friseHTML += `</div>`;
    friseHTML += `<div style="font-size:0.65rem;color:var(--muted2);text-align:center;">Clique sur un projet pour le supprimer</div>`;
    frise.innerHTML = friseHTML;

    // Détail par projet
    detail.innerHTML = projects.map(p => {
      const years   = p.annee - currentYear;
      const support = getSupport(years);
      const mensuel = p.budget > 0 ? p.budget / (years * 12) : 0;

      return `<div style="background:var(--s3);border:1px solid ${support.color}33;border-left:3px solid ${support.color};border-radius:12px;padding:14px 16px;display:flex;align-items:flex-start;gap:12px;">
        <div style="font-size:1.5rem;flex-shrink:0;">${support.icon}</div>
        <div style="flex:1;">
          <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:4px;flex-wrap:wrap;gap:6px;">
            <div style="font-weight:700;color:var(--text,#f0f0f0);">${p.nom} — ${p.annee}</div>
            <div style="font-size:0.72rem;background:${support.color}18;color:${support.color};padding:3px 10px;border-radius:20px;font-weight:700;">dans ${years} an${years>1?'s':''}</div>
          </div>
          <div style="font-size:0.80rem;font-weight:600;color:${support.color};margin-bottom:4px;">${support.label}</div>
          <div style="font-size:0.78rem;color:var(--muted);line-height:1.6;">${support.desc}</div>
          ${p.budget > 0 ? `<div style="margin-top:8px;font-size:0.78rem;color:var(--muted);">Budget : <strong style="color:var(--text,#f0f0f0);">${eur(p.budget)}</strong> · Effort mensuel : <strong style="color:${support.color};">${eur(mensuel)}/mois</strong></div>` : ''}
        </div>
      </div>`;
    }).join('');
  }

  renderTool();
  renderFrise();
};

/* ════════════════════════════════════════════════════════
 * 13. SIMULATEUR DE BUDGET DE VIE
 * L'utilisateur entre son âge et son style de vie cible.
 * L'outil génère un graphique du capital nécessaire par tranche d'âge.
 * ════════════════════════════════════════════════════════ */
window.WW_Tools.simulateurBudgetVie = function(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const uid = 'bv_' + containerId;

  const eur = n => Number(n).toLocaleString('fr-BE', {maximumFractionDigits:0}) + ' €';
  const C = { rose:'#E87CC3', cyan:'#5BB8D4', gold:'#E8C23A', green:'#7EC8A0' };

  el.innerHTML = `
<div style="font-family:'DM Sans',sans-serif;background:var(--s2,rgba(255,255,255,0.04));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:22px;margin:16px 0;">
  <div style="font-size:1.05rem;font-weight:700;color:var(--text,#f0f0f0);margin-bottom:4px;">🌅 Le Simulateur de Budget de Vie</div>
  <div style="font-size:0.80rem;color:var(--muted,#888);margin-bottom:20px;line-height:1.5;">Pas "combien tu gagnes" — mais "quel mode de vie tu veux financer". Le capital nécessaire à chaque étape.</div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
    <div>
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted,#888);margin-bottom:5px;">Ton âge actuel</div>
      <input id="${uid}_age" type="number" min="18" max="65" value="30"
        style="width:100%;box-sizing:border-box;background:var(--s3);border:1px solid var(--border);border-radius:10px;padding:10px 13px;font-family:'DM Sans',sans-serif;font-size:0.88rem;color:var(--text,#f0f0f0);outline:none;"
        oninput="${uid}_calc()">
    </div>
    <div>
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted,#888);margin-bottom:5px;">Dépenses mensuelles cibles (€)</div>
      <input id="${uid}_dep" type="number" min="500" value="3000"
        style="width:100%;box-sizing:border-box;background:var(--s3);border:1px solid var(--border);border-radius:10px;padding:10px 13px;font-family:'DM Sans',sans-serif;font-size:0.88rem;color:var(--text,#f0f0f0);outline:none;"
        oninput="${uid}_calc()">
    </div>
  </div>

  <div style="margin-bottom:14px;">
    <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted,#888);margin-bottom:8px;">Style de vie cible</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;" id="${uid}_styles">
      <button id="${uid}_s0" onclick="${uid}_setStyle(0)" style="font-size:0.76rem;font-weight:600;padding:7px 14px;border-radius:20px;border:1px solid ${C.green}44;background:${C.green}14;color:${C.green};cursor:pointer;font-family:'DM Sans',sans-serif;">🌱 Essentiel</button>
      <button id="${uid}_s1" onclick="${uid}_setStyle(1)" style="font-size:0.76rem;font-weight:600;padding:7px 14px;border-radius:20px;border:1px solid var(--border);background:var(--s3);color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif;">⚖️ Confortable</button>
      <button id="${uid}_s2" onclick="${uid}_setStyle(2)" style="font-size:0.76rem;font-weight:600;padding:7px 14px;border-radius:20px;border:1px solid var(--border);background:var(--s3);color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif;">✈️ Voyageur</button>
      <button id="${uid}_s3" onclick="${uid}_setStyle(3)" style="font-size:0.76rem;font-weight:600;padding:7px 14px;border-radius:20px;border:1px solid var(--border);background:var(--s3);color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif;">🏖️ Liberté totale</button>
    </div>
  </div>

  <div style="margin-bottom:14px;">
    <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted,#888);margin-bottom:5px;">
      Rendement annuel de tes investissements
    </div>
    <input id="${uid}_rend" type="range" min="2" max="9" step="0.5" value="6"
      style="width:100%;accent-color:${C.rose};"
      oninput="${uid}_updateRend(this.value)">
    <div style="display:flex;justify-content:space-between;font-size:0.70rem;color:var(--muted);">
      <span>2% (épargne)</span>
      <span id="${uid}_rendLabel" style="color:${C.rose};font-weight:700;">6%</span>
      <span>9% (ETF agressif)</span>
    </div>
  </div>

  <div id="${uid}_result" style="display:none;"></div>
</div>`;

  let currentStyle = 0;
  const STYLES = [
    { label:'Essentiel',     mult:1.0, color:C.green, desc:'Loyer, courses, transport. Pas de superflu.' },
    { label:'Confortable',   mult:1.4, color:C.cyan,  desc:'+ Sorties, vacances annuelles, voiture.' },
    { label:'Voyageur',      mult:1.9, color:C.gold,  desc:'+ 2-3 voyages/an, bonne table, liberté.' },
    { label:'Liberté totale',mult:2.6, color:C.rose,  desc:'Travailler à temps partiel ou pas du tout dès 50 ans.' },
  ];

  window[`${uid}_setStyle`] = function(i) {
    currentStyle = i;
    for (let j = 0; j < 4; j++) {
      const btn = document.getElementById(`${uid}_s${j}`);
      if (!btn) continue;
      const s = STYLES[j];
      if (j === i) {
        btn.style.cssText = `font-size:0.76rem;font-weight:700;padding:7px 14px;border-radius:20px;border:1px solid ${s.color}55;background:${s.color}18;color:${s.color};cursor:pointer;font-family:'DM Sans',sans-serif;`;
      } else {
        btn.style.cssText = `font-size:0.76rem;font-weight:600;padding:7px 14px;border-radius:20px;border:1px solid var(--border);background:var(--s3);color:var(--muted);cursor:pointer;font-family:'DM Sans',sans-serif;`;
      }
    }
    window[`${uid}_calc`]();
  };

  window[`${uid}_updateRend`] = function(val) {
    const lbl = document.getElementById(`${uid}_rendLabel`);
    if (lbl) lbl.textContent = val + '%';
    window[`${uid}_calc`]();
  };

  window[`${uid}_calc`] = function() {
    const age  = parseInt(document.getElementById(`${uid}_age`)?.value) || 30;
    const dep  = parseFloat(document.getElementById(`${uid}_dep`)?.value) || 3000;
    const rend = parseFloat(document.getElementById(`${uid}_rend`)?.value) || 6;
    const style = STYLES[currentStyle];
    const res  = document.getElementById(`${uid}_result`);
    if (!res) return;

    // Calcul du capital nécessaire par tranche d'âge
    // Règle des 4% : capital = dépenses annuelles × 25
    const depAnnuelles = dep * 12 * style.mult;
    const capitalRetraite = depAnnuelles * 25; // règle des 4%

    // Jalons de vie
    const jalons = [];

    // Capital fonds urgence (maintenant)
    jalons.push({
      age: age,
      label: 'Maintenant — Fonds d\'urgence',
      capital: dep * 6,
      color: C.green,
      action: 'Compte épargne réglementé.',
    });

    // Capital à 35 ans (si age < 35)
    if (age < 35) {
      jalons.push({
        age: 35,
        label: '35 ans — Socle patrimonial',
        capital: depAnnuelles * 2,
        color: C.cyan,
        action: 'ETF monde en DCA + épargne pension maximisée.',
      });
    }

    // Capital à 45 ans
    if (age < 45) {
      jalons.push({
        age: 45,
        label: '45 ans — Accélération',
        capital: depAnnuelles * 7,
        color: C.gold,
        action: 'Revenu passif partiel possible. Immobilier locatif envisageable.',
      });
    }

    // Capital à 55 ans (semi-retraite possible)
    if (age < 55) {
      jalons.push({
        age: 55,
        label: '55 ans — Semi-liberté',
        capital: capitalRetraite * 0.70,
        color: '#c9b8ff',
        action: 'Temps partiel possible si le capital génère 2-3% de revenus.',
      });
    }

    // Capital retraite complète
    jalons.push({
      age: 65,
      label: '65 ans — Retraite complète',
      capital: capitalRetraite,
      color: C.rose,
      action: 'Règle des 4% : le capital génère tes dépenses annuelles indéfiniment.',
    });

    // Effort mensuel d'épargne pour atteindre le capital retraite
    const anneesRestantes = Math.max(65 - age, 1);
    const r = (rend / 100) / 12;
    const n = anneesRestantes * 12;
    const mensuelNeeded = capitalRetraite * r / (Math.pow(1 + r, n) - 1);

    // Graphique en barres
    const maxCapital = capitalRetraite;
    const bars = jalons.map(j => {
      const pct = Math.min((j.capital / maxCapital) * 100, 100);
      return `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:5px;">
            <div style="font-size:0.80rem;font-weight:600;color:var(--text,#f0f0f0);">${j.label}</div>
            <div style="font-size:0.88rem;font-weight:700;color:${j.color};">${eur(j.capital)}</div>
          </div>
          <div style="background:var(--s3);border-radius:20px;height:12px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:${j.color};border-radius:20px;transition:width 0.6s ease;"></div>
          </div>
          <div style="font-size:0.74rem;color:var(--muted);margin-top:4px;">${j.action}</div>
        </div>`;
    }).join('');

    res.style.display = 'block';
    res.innerHTML = `
      <div style="font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--muted);margin-bottom:14px;display:flex;align-items:center;gap:10px;">
        Ton parcours financier — style "${style.label}"
        <span style="flex:1;height:1px;background:var(--faint);"></span>
      </div>
      ${bars}
      <div style="background:${style.color}12;border:1px solid ${style.color}30;border-radius:14px;padding:16px;margin-top:14px;text-align:center;">
        <div style="font-size:0.70rem;color:var(--muted);margin-bottom:6px;text-transform:uppercase;font-weight:700;letter-spacing:0.08em;">Pour atteindre la liberté à 65 ans</div>
        <div style="font-size:2rem;font-weight:700;color:${style.color};font-family:'DM Serif Display',serif;font-style:italic;">${eur(mensuelNeeded)}/mois</div>
        <div style="font-size:0.78rem;color:var(--muted);margin-top:4px;">à investir en ETF à ${rend}%/an sur ${anneesRestantes} ans</div>
        <div style="font-size:0.74rem;color:var(--muted2);margin-top:8px;">${style.desc}</div>
      </div>
      <div style="margin-top:12px;text-align:right;">
        <a href="rente.html" style="font-size:0.78rem;color:var(--cyan);text-decoration:none;">Règle des 4% expliquée →</a>
      </div>`;
  };

  // Init
  window[`${uid}_setStyle`](0);
  window[`${uid}_calc`]();
};

/* ════════════════════════════════════════════════════════
 * 14. SIMULATEUR BONS D'ÉTAT
 * Rendement net après PM 30% et taxe PV 10% (jan. 2026)
 * vs compte épargne réglementé belge.
 * ════════════════════════════════════════════════════════ */
window.WW_Tools.simulateurBonsEtat = function(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const uid = 'be_' + containerId;
  const eur = n => Number(n).toLocaleString('fr-BE', { maximumFractionDigits: 0 }) + ' €';
  const pct = n => (Math.round(n * 100) / 100).toFixed(2) + '%';
  const C = { gold: '#E8C23A', cyan: '#5BB8D4', rose: '#E87CC3', green: '#7EC8A0' };

  el.innerHTML = `
    <div style="background:var(--s2,rgba(255,255,255,0.04));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:20px 18px;">
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--muted,#888);margin-bottom:14px;">📜 Simulateur Bons d'État</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted,#888);display:block;margin-bottom:5px;">Capital investi (€)</label>
          <input type="number" id="${uid}_capital" value="10000" min="100" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text,#f0f0f0);outline:none;" oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted,#888);display:block;margin-bottom:5px;">Taux bon d'État (%/an)</label>
          <input type="number" id="${uid}_taux_bon" value="3.0" min="0.1" max="10" step="0.1" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text,#f0f0f0);outline:none;" oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted,#888);display:block;margin-bottom:5px;">Taux compte épargne (%/an)</label>
          <input type="number" id="${uid}_taux_ep" value="0.5" min="0" max="5" step="0.1" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text,#f0f0f0);outline:none;" oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted,#888);display:block;margin-bottom:5px;">Durée (années)</label>
          <input type="number" id="${uid}_duree" value="3" min="1" max="30" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text,#f0f0f0);outline:none;" oninput="${uid}_calc()">
        </div>
      </div>
      <div style="font-size:0.70rem;color:var(--muted,#888);margin-bottom:12px;">
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
          <input type="checkbox" id="${uid}_pv" checked onchange="${uid}_calc()">
          <span>Inclure taxe plus-value 10% (si revente anticipée, dès jan. 2026)</span>
        </label>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;margin-top:4px;">
          <input type="checkbox" id="${uid}_exonep" onchange="${uid}_calc()">
          <span>Compte épargne réglementé — 1ère tranche <span data-ww="ep_exon" data-fmt="eur"></span> d'intérêts exonérée de PM</span>
        </label>
      </div>
      <div id="${uid}_result" style="display:none;"></div>
    </div>`;

  window[uid + '_calc'] = function() {
    const capital  = parseFloat(document.getElementById(uid + '_capital')?.value) || 0;
    const tauxBon  = (parseFloat(document.getElementById(uid + '_taux_bon')?.value) || 0) / 100;
    const tauxEp   = (parseFloat(document.getElementById(uid + '_taux_ep')?.value) || 0) / 100;
    const duree    = parseInt(document.getElementById(uid + '_duree')?.value) || 1;
    const inclPV   = document.getElementById(uid + '_pv')?.checked;
    const exonEp   = document.getElementById(uid + '_exonep')?.checked;
    const PM       = 0.30;
    const PV       = 0.10;
    const EXON     = 1050; // exonération PM compte épargne réglementé

    // Bon d'État
    const interetsBruts = capital * tauxBon * duree;
    const pm_bon        = interetsBruts * PM;
    let   net_bon       = interetsBruts - pm_bon;
    let   note_pv       = '';
    if (inclPV) {
      const pv_taxe   = net_bon * PV; // approximation : PV sur le rendement net
      net_bon        -= pv_taxe;
      note_pv         = ` (dont taxe PV 10% : -${eur(pv_taxe)})`;
    }
    const total_bon     = capital + net_bon;
    const rend_net_bon  = (net_bon / capital / duree) * 100;

    // Compte épargne
    const interetsEp   = capital * tauxEp * duree;
    let   pm_ep        = 0;
    if (!exonEp || interetsEp > EXON) {
      pm_ep = Math.max(0, interetsEp - (exonEp ? EXON : 0)) * PM;
    }
    const net_ep       = interetsEp - pm_ep;
    const total_ep     = capital + net_ep;
    const rend_net_ep  = (net_ep / capital / duree) * 100;

    const gain         = net_bon - net_ep;
    const winner       = gain >= 0 ? 'bon' : 'epargne';

    const res = document.getElementById(uid + '_result');
    res.style.display = 'block';
    res.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
        <div style="background:${winner==='bon'?'rgba(126,200,160,0.10)':'var(--s3)'};border:1px solid ${winner==='bon'?'rgba(126,200,160,0.25)':'var(--border)'};border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.62rem;font-weight:700;text-transform:uppercase;color:${C.gold};margin-bottom:4px;">📜 Bon d'État</div>
          <div style="font-size:1.4rem;font-weight:700;color:${C.gold};">${eur(net_bon)}</div>
          <div style="font-size:0.70rem;color:var(--muted);margin-top:2px;">intérêts nets sur ${duree} an${duree>1?'s':''}</div>
          <div style="font-size:0.68rem;color:var(--muted);margin-top:6px;">PM déduit : ${eur(pm_bon)}${note_pv}</div>
          <div style="font-size:0.76rem;font-weight:700;color:var(--text);margin-top:6px;">Capital final : ${eur(total_bon)}</div>
          <div style="font-size:0.68rem;color:${C.gold};margin-top:4px;">Rendement net : ${pct(rend_net_bon)}/an</div>
        </div>
        <div style="background:${winner==='epargne'?'rgba(126,200,160,0.10)':'var(--s3)'};border:1px solid ${winner==='epargne'?'rgba(126,200,160,0.25)':'var(--border)'};border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.62rem;font-weight:700;text-transform:uppercase;color:${C.cyan};margin-bottom:4px;">🏦 Compte épargne</div>
          <div style="font-size:1.4rem;font-weight:700;color:${C.cyan};">${eur(net_ep)}</div>
          <div style="font-size:0.70rem;color:var(--muted);margin-top:2px;">intérêts nets sur ${duree} an${duree>1?'s':''}</div>
          <div style="font-size:0.68rem;color:var(--muted);margin-top:6px;">PM déduit : ${eur(pm_ep)}${exonEp?' (exon. 1.050€ appliq.)':''}</div>
          <div style="font-size:0.76rem;font-weight:700;color:var(--text);margin-top:6px;">Capital final : ${eur(total_ep)}</div>
          <div style="font-size:0.68rem;color:${C.cyan};margin-top:4px;">Rendement net : ${pct(rend_net_ep)}/an</div>
        </div>
      </div>
      <div style="background:${gain>=0?'rgba(126,200,160,0.07)':'rgba(232,124,195,0.07)'};border:1px solid ${gain>=0?'rgba(126,200,160,0.20)':'rgba(232,124,195,0.20)'};border-radius:10px;padding:12px;text-align:center;font-size:0.82rem;color:var(--text);">
        ${gain>=0
          ? `✅ Le bon d'État rapporte <strong style="color:${C.green};">${eur(Math.abs(gain))}</strong> de plus net sur ${duree} an${duree>1?'s':''}.`
          : `⚠️ Le compte épargne est plus avantageux de <strong style="color:${C.rose};">${eur(Math.abs(gain))}</strong> — vérifie le taux et l'exonération.`}
      </div>
      <div style="font-size:0.68rem;color:var(--muted2);margin-top:8px;">PM = précompte mobilier 30% · PV = taxe plus-value 10% (jan. 2026) · Hors TOB 0,12% · Simulation indicative</div>`;
  };

  window[uid + '_calc']();
};

/* ════════════════════════════════════════════════════════
 * 15. CALCULATEUR ÉPARGNE PENSION
 * Capital à 65 ans selon versements, option A vs B,
 * rendement fonds, et taxe anticipative 8% à 60 ans.
 * ════════════════════════════════════════════════════════ */
window.WW_Tools.calculateurEpargnePension = function(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const uid = 'ep_' + containerId;
  const eur = n => Number(n).toLocaleString('fr-BE', { maximumFractionDigits: 0 }) + ' €';
  const C = { green: '#7EC8A0', cyan: '#5BB8D4', gold: '#E8C23A', rose: '#E87CC3', purple: '#c9b8ff' };

  el.innerHTML = `
    <div style="background:var(--s2,rgba(255,255,255,0.04));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:20px 18px;">
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--muted,#888);margin-bottom:14px;">🏛️ Calculateur Épargne Pension</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Ton âge actuel</label>
          <input type="number" id="${uid}_age" value="30" min="18" max="64" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;" oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Versement annuel (€)</label>
          <input type="number" id="${uid}_verse" value="1050" min="100" max="1310" step="10" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;" oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Rendement estimé (%/an)</label>
          <input type="number" id="${uid}_rend" value="4" min="0" max="10" step="0.5" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;" oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Capital déjà constitué (€)</label>
          <input type="number" id="${uid}_deja" value="0" min="0" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;" oninput="${uid}_calc()">
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-bottom:12px;">
        <button id="${uid}_btnA" onclick="${uid}_setOpt('A')" style="flex:1;padding:8px;border-radius:8px;border:2px solid ${C.green};background:rgba(126,200,160,0.12);color:${C.green};font-family:'DM Sans',sans-serif;font-weight:700;font-size:0.80rem;cursor:pointer;">Option A — 30% réduction (max ~1.050€)</button>
        <button id="${uid}_btnB" onclick="${uid}_setOpt('B')" style="flex:1;padding:8px;border-radius:8px;border:2px solid var(--border);background:var(--s3);color:var(--muted);font-family:'DM Sans',sans-serif;font-weight:600;font-size:0.80rem;cursor:pointer;">Option B — 25% réduction (max ~1.310€)</button>
      </div>
      <div id="${uid}_result" style="display:none;"></div>
    </div>`;

  let currentOpt = 'A';
  window[uid + '_setOpt'] = function(opt) {
    currentOpt = opt;
    const btnA = document.getElementById(uid + '_btnA');
    const btnB = document.getElementById(uid + '_btnB');
    if (opt === 'A') {
      btnA.style.border = `2px solid ${C.green}`; btnA.style.background = 'rgba(126,200,160,0.12)'; btnA.style.color = C.green;
      btnB.style.border = '2px solid var(--border)'; btnB.style.background = 'var(--s3)'; btnB.style.color = 'var(--muted)';
    } else {
      btnB.style.border = `2px solid ${C.gold}`; btnB.style.background = 'rgba(232,194,58,0.12)'; btnB.style.color = C.gold;
      btnA.style.border = '2px solid var(--border)'; btnA.style.background = 'var(--s3)'; btnA.style.color = 'var(--muted)';
    }
    window[uid + '_calc']();
  };

  window[uid + '_calc'] = function() {
    const age    = parseInt(document.getElementById(uid + '_age')?.value) || 30;
    const verse  = parseFloat(document.getElementById(uid + '_verse')?.value) || 0;
    const rend   = (parseFloat(document.getElementById(uid + '_rend')?.value) || 4) / 100;
    const deja   = parseFloat(document.getElementById(uid + '_deja')?.value) || 0;
    const opt    = currentOpt;

    const PLAFOND_A   = 1050;
    const PLAFOND_B   = 1310;
    const REDUC_A     = 0.30;
    const REDUC_B     = 0.25;
    const TAXE_60     = 0.08;

    const plafond = opt === 'A' ? PLAFOND_A : PLAFOND_B;
    const reduc   = opt === 'A' ? REDUC_A   : REDUC_B;
    const verseEff = Math.min(verse, plafond);
    const avantageFiscal = verseEff * reduc;

    const annees60 = Math.max(60 - age, 0);
    const annees65 = Math.max(65 - age, 0);

    // Capital à 60 ans (taxe anticipative prélevée)
    const cap60 = deja * Math.pow(1 + rend, annees60) +
      (annees60 > 0 ? verseEff * (Math.pow(1 + rend, annees60) - 1) / rend : 0);

    // Taxe anticipative à 60 ans
    const taxe60 = cap60 * TAXE_60;
    const cap60Net = cap60 - taxe60;

    // Si la personne a moins de 60 ans : peut continuer à verser de 60 à 65 ans SANS avantage fiscal
    // Les versements post-60 ne sont plus déductibles mais s'accumulent
    const anneesPost60 = annees65 - annees60;
    const cap65 = anneesPost60 > 0
      ? cap60Net * Math.pow(1 + rend, anneesPost60) +
        verseEff * (Math.pow(1 + rend, anneesPost60) - 1) / rend
      : cap60Net;

    // Cumul avantages fiscaux sur toute la période
    const cumulAvantage = avantageFiscal * annees65;

    const res = document.getElementById(uid + '_result');
    res.style.display = 'block';

    const optColor = opt === 'A' ? C.green : C.gold;
    res.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
        <div style="background:var(--s3);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Réduction d'impôt/an</div>
          <div style="font-size:1.4rem;font-weight:700;color:${optColor};">${eur(avantageFiscal)}</div>
          <div style="font-size:0.68rem;color:var(--muted);">Option ${opt} · ${reduc*100}% × ${eur(verseEff)}</div>
        </div>
        <div style="background:var(--s3);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Cumul avantage fiscal</div>
          <div style="font-size:1.4rem;font-weight:700;color:${optColor};">${eur(cumulAvantage)}</div>
          <div style="font-size:0.68rem;color:var(--muted);">sur ${annees65} ans</div>
        </div>
        <div style="background:rgba(232,124,195,0.08);border:1px solid rgba(232,124,195,0.20);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Capital à 60 ans (avant taxe)</div>
          <div style="font-size:1.2rem;font-weight:700;color:var(--text);">${eur(cap60)}</div>
          <div style="font-size:0.68rem;color:var(--rose);">Taxe 8% : -${eur(taxe60)}</div>
        </div>
        <div style="background:rgba(126,200,160,0.08);border:1px solid rgba(126,200,160,0.20);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Capital net à 65 ans</div>
          <div style="font-size:1.4rem;font-weight:700;color:${C.green};">${eur(cap65)}</div>
          <div style="font-size:0.68rem;color:var(--muted);">après taxe anticipative</div>
        </div>
      </div>
      <div style="background:${optColor}12;border:1px solid ${optColor}30;border-radius:10px;padding:12px;font-size:0.78rem;color:var(--text);line-height:1.65;">
        💡 <strong>Rendement net de l'opération :</strong> tu verses ${eur(verseEff * annees65)} sur ${annees65} ans, tu récupères ${eur(cumulAvantage)} en réductions d'impôt immédiates + ${eur(cap65)} à 65 ans. La taxe de 8% à 60 ans est déjà déduite.
      </div>
      <div style="font-size:0.68rem;color:var(--muted2);margin-top:8px;">Simulation indicative · Rendement ${((rend)*100).toFixed(1)}%/an non garanti · Versements constants jusqu'à 65 ans · Taxe anticipative 8% calculée sur le capital brut à 60 ans</div>`;
  };

  window[uid + '_setOpt']('A');
};

/* ════════════════════════════════════════════════════════
 * 16. ESTIMATEUR BUDGET ASSURANCES
 * Calcule le budget total assurances + potentiel d'économie
 * selon les postes saisis par l'utilisateur.
 * ════════════════════════════════════════════════════════ */
window.WW_Tools.comparateurAssurances = function(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const uid = 'as_' + containerId;
  const eur = n => Number(n).toLocaleString('fr-BE', { maximumFractionDigits: 0 }) + ' €';
  const C = { cyan: '#5BB8D4', green: '#7EC8A0', gold: '#E8C23A', rose: '#E87CC3' };

  const postes = [
    { id: 'auto',     label: '🚗 RC Automobile', bench: 450, tip: 'Médiane belge ~450€/an. Comparer sur AssurMarket.be à chaque échéance.' },
    { id: 'omnium',   label: '🛡️ Omnium / Mini-omnium', bench: 600, tip: 'Inutile pour une voiture de + de 5 ans à faible valeur. Évaluer la franchise.' },
    { id: 'hab',      label: '🏠 Habitation / Incendie', bench: 280, tip: 'Médiane belge ~280€/an. Vérifier la valeur assurée à neuf.' },
    { id: 'hosp',     label: '🏥 Hospitalisation', bench: 200, tip: 'Souvent moins cher via la mutuelle. Comparer avant de souscrire en privé.' },
    { id: 'rev',      label: '💼 Revenus garantis', bench: 400, tip: 'Indispensable pour les indépendants. Déductible fiscalement à 100%.' },
    { id: 'other',    label: '📋 Autres assurances', bench: 150, tip: 'RC vie privée, protection juridique, assistance voyages...' },
  ];

  el.innerHTML = `
    <div style="background:var(--s2,rgba(255,255,255,0.04));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:20px 18px;">
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--muted,#888);margin-bottom:14px;">🛡️ Estimateur Budget Assurances</div>
      <div style="font-size:0.76rem;color:var(--muted);margin-bottom:14px;line-height:1.6;">Entre tes primes annuelles actuelles. Compare avec les médianes belges et vois où optimiser.</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">
        ${postes.map(p => `
          <div style="display:flex;align-items:center;gap:10px;">
            <label style="font-size:0.80rem;color:var(--text);flex:1;min-width:160px;">${p.label}</label>
            <input type="number" id="${uid}_${p.id}" placeholder="€/an" min="0"
              style="width:90px;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:7px 10px;font-family:'DM Sans',sans-serif;font-size:0.84rem;color:var(--text);outline:none;text-align:right;"
              oninput="${uid}_calc()">
            <div style="font-size:0.68rem;color:var(--muted);width:70px;text-align:right;">~${p.bench}€</div>
          </div>`).join('')}
      </div>
      <div id="${uid}_result" style="display:none;"></div>
    </div>`;

  window[uid + '_calc'] = function() {
    let total = 0, economie = 0;
    const details = [];
    let hasValue = false;
    postes.forEach(p => {
      const val = parseFloat(document.getElementById(uid + '_' + p.id)?.value) || 0;
      if (val > 0) hasValue = true;
      total += val;
      const diff = val - p.bench;
      if (diff > 50) economie += diff * 0.20; // potentiel 20% d'économie sur les postes en surpoids
      details.push({ ...p, val, diff });
    });
    if (!hasValue) { document.getElementById(uid + '_result').style.display = 'none'; return; }

    const mediane = postes.reduce((s, p) => s + p.bench, 0);
    const diffTotal = total - mediane;
    const res = document.getElementById(uid + '_result');
    res.style.display = 'block';

    const rows = details.filter(d => d.val > 0).map(d => {
      const icon = d.diff > 100 ? '🔴' : d.diff > 30 ? '🟡' : '🟢';
      return `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--faint);">
        <span style="font-size:0.78rem;color:var(--text2);">${d.label}</span>
        <span style="font-size:0.78rem;font-weight:700;color:var(--text);">${eur(d.val)}</span>
        <span style="font-size:0.70rem;color:${d.diff>50?C.rose:d.diff>0?C.gold:C.green};">${icon} ${d.diff>0?'+':''}${eur(d.diff)} vs médiane</span>
      </div>`;
    }).join('');

    res.innerHTML = `
      ${rows}
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:12px;">
        <div style="background:var(--s3);border-radius:10px;padding:12px;text-align:center;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Total actuel</div>
          <div style="font-size:1.2rem;font-weight:700;color:var(--text);">${eur(total)}/an</div>
        </div>
        <div style="background:var(--s3);border-radius:10px;padding:12px;text-align:center;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Médiane belge</div>
          <div style="font-size:1.2rem;font-weight:700;color:${C.cyan};">${eur(mediane)}/an</div>
        </div>
        <div style="background:${economie>0?'rgba(126,200,160,0.10)':'var(--s3)'};border:1px solid ${economie>0?'rgba(126,200,160,0.25)':'var(--border)'};border-radius:10px;padding:12px;text-align:center;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Potentiel économie</div>
          <div style="font-size:1.2rem;font-weight:700;color:${C.green};">${eur(Math.round(economie))}/an</div>
        </div>
      </div>
      ${details.filter(d=>d.val>0&&d.diff>50).map(d=>`
        <div style="margin-top:8px;padding:10px 12px;background:rgba(232,194,58,0.07);border-left:3px solid ${C.gold};border-radius:0 8px 8px 0;font-size:0.76rem;color:var(--muted);">
          <strong style="color:var(--text);">${d.label} :</strong> ${d.tip}
        </div>`).join('')}`;
  };
};

/* ════════════════════════════════════════════════════════
 * 17. SIMULATEUR OBLIGATIONS
 * Rendement net d'une obligation (coupon - PM 30%,
 * taxe PV 10%, TOB 0,12%) selon taux nominal et durée.
 * ════════════════════════════════════════════════════════ */
window.WW_Tools.simulateurObligations = function(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const uid = 'ob_' + containerId;
  const eur = n => Number(n).toLocaleString('fr-BE', { maximumFractionDigits: 0 }) + ' €';
  const pct = n => (Math.round(n * 100) / 100).toFixed(2) + '%';
  const C = { cyan: '#5BB8D4', gold: '#E8C23A', rose: '#E87CC3', green: '#7EC8A0' };

  el.innerHTML = `
    <div style="background:var(--s2,rgba(255,255,255,0.04));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:20px 18px;">
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--muted,#888);margin-bottom:14px;">💸 Simulateur Obligations</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Capital investi (€)</label>
          <input type="number" id="${uid}_cap" value="5000" min="100" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;" oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Taux nominal (%/an)</label>
          <input type="number" id="${uid}_taux" value="3.0" min="0" max="15" step="0.1" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;" oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Durée (années)</label>
          <input type="number" id="${uid}_duree" value="5" min="1" max="30" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;" oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Type</label>
          <select id="${uid}_type" onchange="${uid}_calc()" style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;">
            <option value="etat">État belge / OLO</option>
            <option value="corp">Corporate investment grade</option>
            <option value="hy">High Yield</option>
            <option value="etf">ETF obligataire capitalisant</option>
          </select>
        </div>
      </div>
      <div id="${uid}_result" style="display:none;"></div>
    </div>`;

  window[uid + '_calc'] = function() {
    const cap    = parseFloat(document.getElementById(uid + '_cap')?.value) || 0;
    const taux   = (parseFloat(document.getElementById(uid + '_taux')?.value) || 0) / 100;
    const duree  = parseInt(document.getElementById(uid + '_duree')?.value) || 1;
    const type   = document.getElementById(uid + '_type')?.value;
    const PM     = 0.30;
    const TOB    = 0.0012;
    const PV     = 0.10;
    const REYN   = 0.30; // taxe Reynders sur ETF obligataire

    const tob_montant     = cap * TOB;
    const coupons_bruts   = cap * taux * duree;
    const pm_coupons      = coupons_bruts * PM;
    const coupons_nets    = coupons_bruts - pm_coupons;

    let fiscNote = '';
    let fiscSup  = 0;
    let riskNote = '';

    if (type === 'etf') {
      // Taxe Reynders sur composante obligataire à la revente
      const plusvalue_etf = cap * taux * duree * 0.5; // approximation composante
      fiscSup  = plusvalue_etf * REYN;
      fiscNote = `⚠️ ETF obligataire : taxe Reynders estimée ${eur(fiscSup)} + taxe PV 10% dès jan. 2026.`;
    } else if (type === 'hy') {
      riskNote = '⚠️ High Yield : risque de défaut élevé. Taux attractif mais perte en capital possible.';
    }

    const total_net   = coupons_nets - fiscSup;
    const rend_net    = (total_net / cap / duree) * 100;
    const capital_fin = cap + total_net;

    const res = document.getElementById(uid + '_result');
    res.style.display = 'block';
    res.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px;">
        <div style="background:var(--s3);border-radius:10px;padding:12px;text-align:center;">
          <div style="font-size:0.60rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Coupons bruts</div>
          <div style="font-size:1.1rem;font-weight:700;color:var(--text);">${eur(coupons_bruts)}</div>
          <div style="font-size:0.66rem;color:var(--muted);">sur ${duree} an${duree>1?'s':''}</div>
        </div>
        <div style="background:var(--s3);border-radius:10px;padding:12px;text-align:center;">
          <div style="font-size:0.60rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">PM 30% déduit</div>
          <div style="font-size:1.1rem;font-weight:700;color:${C.rose};">-${eur(pm_coupons)}</div>
          <div style="font-size:0.66rem;color:var(--muted);">+ TOB : -${eur(tob_montant)}</div>
        </div>
        <div style="background:rgba(126,200,160,0.08);border:1px solid rgba(126,200,160,0.20);border-radius:10px;padding:12px;text-align:center;">
          <div style="font-size:0.60rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Coupons nets</div>
          <div style="font-size:1.1rem;font-weight:700;color:${C.green};">${eur(coupons_nets)}</div>
          <div style="font-size:0.66rem;color:${C.green};">Rendement net : ${pct(rend_net)}/an</div>
        </div>
      </div>
      <div style="background:rgba(91,184,212,0.07);border:1px solid rgba(91,184,212,0.18);border-radius:10px;padding:12px;display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div style="font-size:0.80rem;color:var(--text);">Capital final à l'échéance</div>
        <div style="font-size:1.2rem;font-weight:700;color:${C.cyan};">${eur(capital_fin)}</div>
      </div>
      ${fiscNote ? `<div style="padding:10px 12px;background:rgba(232,194,58,0.07);border-left:3px solid ${C.gold};border-radius:0 8px 8px 0;font-size:0.76rem;color:var(--muted);margin-bottom:8px;">${fiscNote}</div>` : ''}
      ${riskNote ? `<div style="padding:10px 12px;background:rgba(232,124,195,0.07);border-left:3px solid ${C.rose};border-radius:0 8px 8px 0;font-size:0.76rem;color:var(--muted);margin-bottom:8px;">${riskNote}</div>` : ''}
      <div style="font-size:0.68rem;color:var(--muted2);">Hors TOB ${eur(tob_montant)} · PM 30% sur coupons · Taxe PV 10% si revente avec plus-value (jan. 2026) · Capital remboursé à la valeur nominale si conservé jusqu'à échéance</div>`;
  };

  window[uid + '_calc']();
};

/* ════════════════════════════════════════════════════════
 * 18. SIMULATEUR TAXE PLUS-VALUE 2026
 * Impact de la nouvelle taxe PV 10% sur une plus-value.
 * Comparaison avant/après jan. 2026.
 * ════════════════════════════════════════════════════════ */
window.WW_Tools.simulateurTaxePV = function(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const uid = 'pv_' + containerId;
  const eur = n => Number(n).toLocaleString('fr-BE', { maximumFractionDigits: 0 }) + ' €';
  const C = { rose: '#E87CC3', green: '#7EC8A0', gold: '#E8C23A', cyan: '#5BB8D4' };

  el.innerHTML = `
    <div style="background:var(--s2,rgba(255,255,255,0.04));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:20px 18px;">
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--muted,#888);margin-bottom:14px;">📊 Impact Taxe Plus-Value 2026</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Capital investi (€)</label>
          <input type="number" id="${uid}_invest" value="10000" min="100"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Rendement annuel (%)</label>
          <input type="number" id="${uid}_rend" value="7" min="0" max="20" step="0.5"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Durée de détention (ans)</label>
          <input type="number" id="${uid}_duree" value="15" min="1" max="40"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Type d'actif</label>
          <select id="${uid}_type" onchange="${uid}_calc()"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;">
            <option value="etf">ETF actions capitalisant</option>
            <option value="action">Action individuelle</option>
            <option value="crypto">Crypto</option>
            <option value="oblig">Obligation / Bon d'État</option>
          </select>
        </div>
      </div>
      <div id="${uid}_result" style="display:none;"></div>
    </div>`;

  window[uid + '_calc'] = function() {
    const invest  = parseFloat(document.getElementById(uid + '_invest')?.value) || 0;
    const rend    = (parseFloat(document.getElementById(uid + '_rend')?.value) || 0) / 100;
    const duree   = parseInt(document.getElementById(uid + '_duree')?.value) || 1;
    const type    = document.getElementById(uid + '_type')?.value;
    if (!invest) return;

    const capitalFinal  = invest * Math.pow(1 + rend, duree);
    const plusvalue     = capitalFinal - invest;
    const tob           = invest * 0.0012;

    // Taxe PV 2026
    const taxePV        = plusvalue * 0.10;
    const netApres      = plusvalue - taxePV;
    const rendNetApres  = (netApres / invest / duree) * 100;

    // Avant 2026 (exonéré pour bon père de famille)
    const netAvant      = plusvalue;
    const rendNetAvant  = (netAvant / invest / duree) * 100;

    // Note spécifique selon type
    const notes = {
      etf:    'ETF actions capitalisant : TOB 0,12% à l\'achat + taxe PV 10% sur plus-value à la vente (dès jan. 2026). Pas de PM sur dividendes réinvestis.',
      action: 'Actions : TOB 0,35% à l\'achat + taxe PV 10% sur plus-value (jan. 2026). PM 30% sur dividendes distribués (inchangé).',
      crypto: 'Crypto : taxe PV 10% sur plus-value (jan. 2026) si détention long terme. Opérations spéculatives : 33% (inchangé).',
      oblig:  'Obligation : PM 30% sur coupons (inchangé) + taxe PV 10% si revendue avec plus-value (jan. 2026). TOB 0,12%.',
    };

    const res = document.getElementById(uid + '_result');
    res.style.display = 'block';
    res.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
        <div style="background:rgba(126,200,160,0.08);border:1px solid rgba(126,200,160,0.20);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Avant jan. 2026</div>
          <div style="font-size:1.3rem;font-weight:700;color:${C.green};">${eur(netAvant)}</div>
          <div style="font-size:0.68rem;color:var(--muted);">plus-value nette exonérée</div>
          <div style="font-size:0.76rem;font-weight:700;color:var(--text);margin-top:6px;">${eur(capitalFinal)}</div>
          <div style="font-size:0.66rem;color:${C.green};">~${rendNetAvant.toFixed(2)}%/an net</div>
        </div>
        <div style="background:rgba(232,124,195,0.08);border:1px solid rgba(232,124,195,0.20);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Dès jan. 2026</div>
          <div style="font-size:1.3rem;font-weight:700;color:${C.rose};">${eur(netApres)}</div>
          <div style="font-size:0.68rem;color:var(--muted);">après taxe PV 10% (-${eur(taxePV)})</div>
          <div style="font-size:0.76rem;font-weight:700;color:var(--text);margin-top:6px;">${eur(capitalFinal - taxePV)}</div>
          <div style="font-size:0.66rem;color:${C.rose};">~${rendNetApres.toFixed(2)}%/an net</div>
        </div>
      </div>
      <div style="background:var(--s3);border-radius:10px;padding:12px;margin-bottom:10px;text-align:center;">
        <div style="font-size:0.72rem;color:var(--muted);margin-bottom:4px;">Impact de la taxe PV 10% sur ${duree} ans</div>
        <div style="font-size:1.1rem;font-weight:700;color:${C.rose};">-${eur(taxePV)}</div>
        <div style="font-size:0.70rem;color:var(--muted);">soit ${((taxePV/invest)*100).toFixed(1)}% du capital initial — ${((taxePV/plusvalue)*100).toFixed(0)}% de la plus-value</div>
      </div>
      <div style="padding:10px 12px;background:rgba(91,184,212,0.06);border-left:3px solid ${C.cyan};border-radius:0 8px 8px 0;font-size:0.76rem;color:var(--muted);line-height:1.65;">
        ${notes[type] || ''}
      </div>
      <div style="font-size:0.68rem;color:var(--muted2);margin-top:8px;">TOB déduit (${eur(tob)}) · Rendement ${(rend*100).toFixed(1)}%/an non garanti · Simulation indicative · Première déclaration : exercice 2027</div>`;
  };

  window[uid + '_calc']();
};

/* ════════════════════════════════════════════════════════
 * 19. OPTIMISEUR RÉMUNÉRATION DIRIGEANT
 * Glissières salaire / dividendes VVPRbis / avantages nature.
 * Charge fiscale comparée.
 * ════════════════════════════════════════════════════════ */
window.WW_Tools.optimiseurRemuneration = function(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const uid = 'rem_' + containerId;
  const eur = n => Number(n).toLocaleString('fr-BE', { maximumFractionDigits: 0 }) + ' €';
  const pct = n => Math.round(n) + '%';
  const C = { green: '#7EC8A0', cyan: '#5BB8D4', gold: '#E8C23A', rose: '#E87CC3' };

  el.innerHTML = `
    <div style="background:var(--s2,rgba(255,255,255,0.04));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:20px 18px;">
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--muted,#888);margin-bottom:14px;">💰 Optimiseur Rémunération Dirigeant</div>
      <div style="margin-bottom:12px;">
        <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Bénéfice société avant rémunération (€)</label>
        <input type="number" id="${uid}_benef" value="120000" min="0"
          style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
          oninput="${uid}_calc()">
      </div>
      <div style="margin-bottom:6px;">
        <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:flex;justify-content:space-between;margin-bottom:5px;">
          <span>Salaire brut (€)</span><span id="${uid}_sal_lbl" style="color:${C.cyan};">45.000 €</span>
        </label>
        <input type="range" id="${uid}_sal" min="0" max="120000" step="1000" value="45000"
          style="width:100%;accent-color:${C.cyan};"
          oninput="${uid}_update_sal()">
      </div>
      <div style="margin-bottom:6px;">
        <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:flex;justify-content:space-between;margin-bottom:5px;">
          <span>Dividendes bruts VVPRbis (€)</span><span id="${uid}_div_lbl" style="color:${C.gold};">0 €</span>
        </label>
        <input type="range" id="${uid}_div" min="0" max="120000" step="1000" value="0"
          style="width:100%;accent-color:${C.gold};"
          oninput="${uid}_update_div()">
      </div>
      <div style="margin-bottom:14px;">
        <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:flex;justify-content:space-between;margin-bottom:5px;">
          <span>Avantages en nature estimés (€/an)</span><span id="${uid}_avn_lbl" style="color:${C.green};">0 €</span>
        </label>
        <input type="range" id="${uid}_avn" min="0" max="30000" step="500" value="0"
          style="width:100%;accent-color:${C.green};"
          oninput="${uid}_update_avn()">
      </div>
      <div id="${uid}_result" style="display:none;"></div>
    </div>`;

  window[uid + '_update_sal'] = () => {
    const v = document.getElementById(uid + '_sal')?.value;
    document.getElementById(uid + '_sal_lbl').textContent = eur(parseFloat(v)||0);
    window[uid + '_calc']();
  };
  window[uid + '_update_div'] = () => {
    const v = document.getElementById(uid + '_div')?.value;
    document.getElementById(uid + '_div_lbl').textContent = eur(parseFloat(v)||0);
    window[uid + '_calc']();
  };
  window[uid + '_update_avn'] = () => {
    const v = document.getElementById(uid + '_avn')?.value;
    document.getElementById(uid + '_avn_lbl').textContent = eur(parseFloat(v)||0);
    window[uid + '_calc']();
  };

  window[uid + '_calc'] = function() {
    const benef = parseFloat(document.getElementById(uid + '_benef')?.value) || 0;
    const sal   = parseFloat(document.getElementById(uid + '_sal')?.value)   || 0;
    const div   = parseFloat(document.getElementById(uid + '_div')?.value)   || 0;
    const avn   = parseFloat(document.getElementById(uid + '_avn')?.value)   || 0;

    const total_prel = sal + div + avn;
    if (total_prel > benef * 1.5) { return; }

    // Salaire : IPP ~35% effectif + cotisations sociales ~20.5% dirigeant
    const cot_soc    = sal * 0.205;
    const ipp_sal    = (sal - cot_soc) * 0.35; // taux effectif moyen simplifié
    const net_sal    = sal - cot_soc - ipp_sal;

    // Dividendes VVPRbis : PM 15%
    const pm_div     = div * 0.15;
    const net_div    = div - pm_div;

    // Avantages en nature : imposés forfaitairement ~15% effectif
    const fisc_avn   = avn * 0.15;
    const net_avn    = avn - fisc_avn;

    // Bénéfice restant dans la société
    const benef_resto = Math.max(0, benef - sal - div - avn);
    // IS : 20% si sal >= 45000, sinon 25%
    const taux_is     = sal >= 45000 ? 0.20 : 0.25;
    const is          = benef_resto * taux_is;
    const benef_net_soc = benef_resto - is;

    // Charge fiscale totale
    const charge_totale = cot_soc + ipp_sal + pm_div + fisc_avn + is;
    const net_personnel = net_sal + net_div + net_avn;
    const taux_charge   = benef > 0 ? (charge_totale / benef) * 100 : 0;

    const res = document.getElementById(uid + '_result');
    res.style.display = 'block';
    res.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
        <div style="background:rgba(126,200,160,0.08);border:1px solid rgba(126,200,160,0.20);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Net perçu personnellement</div>
          <div style="font-size:1.4rem;font-weight:700;color:${C.green};">${eur(net_personnel)}</div>
          <div style="font-size:0.68rem;color:var(--muted);">${eur(net_sal)} salaire · ${eur(net_div)} div. · ${eur(net_avn)} avantages</div>
        </div>
        <div style="background:rgba(232,124,195,0.08);border:1px solid rgba(232,124,195,0.20);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Charge fiscale totale</div>
          <div style="font-size:1.4rem;font-weight:700;color:${C.rose};">${eur(charge_totale)}</div>
          <div style="font-size:0.68rem;color:${C.rose};">soit ${pct(taux_charge)} du bénéfice</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:12px;">
        <div style="background:var(--s3);border-radius:10px;padding:10px;text-align:center;">
          <div style="font-size:0.58rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:3px;">Cot. sociales</div>
          <div style="font-size:0.96rem;font-weight:700;color:${C.cyan};">${eur(cot_soc)}</div>
        </div>
        <div style="background:var(--s3);border-radius:10px;padding:10px;text-align:center;">
          <div style="font-size:0.58rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:3px;">IPP + PM</div>
          <div style="font-size:0.96rem;font-weight:700;color:${C.rose};">${eur(ipp_sal + pm_div + fisc_avn)}</div>
        </div>
        <div style="background:${sal>=45000?'rgba(126,200,160,0.08)':'rgba(232,194,58,0.08)'};border:1px solid ${sal>=45000?'rgba(126,200,160,0.20)':'rgba(232,194,58,0.20)'};border-radius:10px;padding:10px;text-align:center;">
          <div style="font-size:0.58rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:3px;">IS ${sal>=45000?'20%':'25%'}</div>
          <div style="font-size:0.96rem;font-weight:700;color:${sal>=45000?C.green:C.gold};">${eur(is)}</div>
        </div>
      </div>
      <div style="background:var(--s3);border-radius:10px;padding:12px;text-align:center;">
        <div style="font-size:0.70rem;color:var(--muted);margin-bottom:4px;">Bénéfice conservé dans la société (après IS)</div>
        <div style="font-size:1.1rem;font-weight:700;color:${C.cyan};">${eur(benef_net_soc)}</div>
        <div style="font-size:0.68rem;color:var(--muted);">Disponible pour investissement via la société · Futur dividende</div>
      </div>
      ${sal < 45000 ? `<div style="margin-top:10px;padding:10px 12px;background:rgba(232,194,58,0.08);border-left:3px solid ${C.gold};border-radius:0 8px 8px 0;font-size:0.76rem;color:var(--muted);">⚠️ Salaire < 45.000 € : IS à 25% au lieu de 20%. Augmente le salaire à 45.000 € pour économiser ${eur(benef_resto * 0.05)} d'IS.</div>` : ''}
      <div style="font-size:0.68rem;color:var(--muted2);margin-top:8px;">Simulation simplifiée · IPP à taux effectif moyen · Cotisations sociales dirigeant ~20,5% · VVPRbis PM 15% · Consulter un comptable pour optimisation précise</div>`;
  };

  window[uid + '_calc']();
};

/* ════════════════════════════════════════════════════════
 * 20. SIMULATEUR CRÉDIT HYPOTHÉCAIRE (exporté depuis tools.js)
 * Mensualité, total remboursé, coût du crédit,
 * tableau d'amortissement simplifié.
 * ════════════════════════════════════════════════════════ */
window.WW_Tools.simulateurCredit = function(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const uid = 'cr_' + containerId;
  const eur = n => Number(n).toLocaleString('fr-BE', { maximumFractionDigits: 0 }) + ' €';
  const C = { cyan: '#5BB8D4', rose: '#E87CC3', green: '#7EC8A0', gold: '#E8C23A', terra: '#C4724A' };

  el.innerHTML = `
    <div style="background:var(--s2,rgba(255,255,255,0.04));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:20px 18px;">
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--muted,#888);margin-bottom:14px;">🏦 Simulateur Crédit Hypothécaire</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:12px;">
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Prix du bien (€)</label>
          <input type="number" id="${uid}_prix" value="300000" min="0"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Apport personnel (€)</label>
          <input type="number" id="${uid}_apport" value="40000" min="0"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Durée (années)</label>
          <input type="number" id="${uid}_duree" value="25" min="5" max="35"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
      </div>
      <div style="margin-bottom:6px;">
        <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:flex;justify-content:space-between;margin-bottom:5px;">
          <span>Taux annuel fixe</span><span id="${uid}_taux_lbl" style="color:${C.cyan};">3,5%</span>
        </label>
        <input type="range" id="${uid}_taux" min="1" max="8" step="0.1" value="3.5"
          style="width:100%;accent-color:${C.cyan};"
          oninput="document.getElementById('${uid}_taux_lbl').textContent=parseFloat(this.value).toFixed(1)+'%';${uid}_calc()">
      </div>
      <div style="margin-bottom:14px;">
        <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Région (pour les frais)</label>
        <select id="${uid}_region" onchange="${uid}_calc()"
          style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;">
          <option value="flandre">Flandre (3% — résidence propre/unique)</option>
          <option value="wallonie" selected>Wallonie (3%/6%/12,5%)</option>
          <option value="bxl">Bruxelles (12,5% avec abattement)</option>
        </select>
      </div>
      <div id="${uid}_result" style="display:none;"></div>
    </div>`;

  window[uid + '_calc'] = function() {
    const prix    = parseFloat(document.getElementById(uid + '_prix')?.value)   || 0;
    const apport  = parseFloat(document.getElementById(uid + '_apport')?.value) || 0;
    const duree   = parseInt(document.getElementById(uid + '_duree')?.value)    || 25;
    const taux    = parseFloat(document.getElementById(uid + '_taux')?.value)   || 3.5;
    const region  = document.getElementById(uid + '_region')?.value;
    if (!prix || apport >= prix) return;

    const emprunt = prix - apport;
    const r       = (taux / 100) / 12;
    const n       = duree * 12;
    const mens    = emprunt * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const total   = mens * n;
    const cout    = total - emprunt;
    const quotite = (emprunt / prix) * 100;

    // Frais d'achat selon région
    let tauxDE = 0, abattDE = 0, noteDE = '';
    if (region === 'flandre') {
      tauxDE = 0.03; noteDE = '3% (résidence propre/unique)';
    } else if (region === 'wallonie') {
      tauxDE = prix * 0.03 <= prix ? 0.03 : 0.125;
      noteDE = '3% si habitation modeste (RC ≤ 745€), sinon 6-12,5%';
      tauxDE = 0.03; // hypothèse favorable
    } else {
      tauxDE = 0.125; abattDE = 200000 * 0.125; noteDE = '12,5% avec abattement ~25.000€ si résidence principale ≤ 600K€';
    }
    const droits_enreg = Math.max(0, prix * tauxDE - abattDE);
    const frais_not    = prix < 100000 ? prix * 0.042 : prix < 200000 ? 4200 + (prix - 100000) * 0.025 : 6700 + (prix - 200000) * 0.018;
    const frais_hyp    = emprunt * 0.005 + 1000;
    const frais_tot    = droits_enreg + frais_not + frais_hyp;
    const frais_pct    = (frais_tot / prix * 100).toFixed(1);

    const res = document.getElementById(uid + '_result');
    res.style.display = 'block';
    res.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;">
        <div style="background:rgba(196,114,74,0.10);border:1px solid rgba(196,114,74,0.25);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.60rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Mensualité</div>
          <div style="font-size:1.4rem;font-weight:700;color:${C.terra};">${eur(mens)}</div>
          <div style="font-size:0.66rem;color:var(--muted);">/mois sur ${duree} ans</div>
        </div>
        <div style="background:var(--s3);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.60rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Total remboursé</div>
          <div style="font-size:1.2rem;font-weight:700;color:var(--text);">${eur(total)}</div>
          <div style="font-size:0.66rem;color:var(--muted);">capital + intérêts</div>
        </div>
        <div style="background:rgba(232,124,195,0.08);border:1px solid rgba(232,124,195,0.20);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.60rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Coût du crédit</div>
          <div style="font-size:1.2rem;font-weight:700;color:${C.rose};">${eur(cout)}</div>
          <div style="font-size:0.66rem;color:var(--muted);">${((cout/emprunt)*100).toFixed(0)}% du capital emprunté</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
        <div style="background:var(--s3);border-radius:12px;padding:12px;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:6px;">Financement</div>
          <div style="font-size:0.78rem;color:var(--text2);">Emprunt : <strong style="color:var(--text);">${eur(emprunt)}</strong></div>
          <div style="font-size:0.78rem;color:var(--text2);">Quotité : <strong style="color:${quotite>90?C.rose:quotite>80?C.gold:C.green};">${quotite.toFixed(0)}%</strong></div>
          <div style="font-size:0.78rem;color:var(--text2);">Taux : <strong style="color:var(--text);">${taux.toFixed(1)}%/an</strong></div>
        </div>
        <div style="background:var(--s3);border-radius:12px;padding:12px;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:6px;">Frais d'achat estimés</div>
          <div style="font-size:0.78rem;color:var(--text2);">Droits enregistrement : <strong>${eur(droits_enreg)}</strong></div>
          <div style="font-size:0.78rem;color:var(--text2);">Frais notaire : <strong>${eur(frais_not)}</strong></div>
          <div style="font-size:0.78rem;color:var(--text2);">Total frais : <strong style="color:${C.terra};">${eur(frais_tot)} (${frais_pct}%)</strong></div>
        </div>
      </div>
      <div style="background:rgba(91,184,212,0.07);border:1px solid rgba(91,184,212,0.18);border-radius:10px;padding:12px;margin-bottom:8px;">
        <div style="font-size:0.70rem;color:var(--muted);margin-bottom:4px;"><strong style="color:var(--text);">Budget total nécessaire (fonds propres) :</strong></div>
        <div style="font-size:1.1rem;font-weight:700;color:${C.cyan};">${eur(apport + frais_tot)}</div>
        <div style="font-size:0.68rem;color:var(--muted);">Apport ${eur(apport)} + frais ${eur(frais_tot)} · ${noteDE}</div>
      </div>
      <div style="font-size:0.68rem;color:var(--muted2);">Taux fixe · Mensualité constante · Frais estimatifs · Hors ASRD · Simulation indicative</div>`;
  };

  window[uid + '_calc']();
};

/* ════════════════════════════════════════════════════════
 * 21. RENDEMENT LOCATIF AVANCÉ (net-net)
 * Brut → Net → Net-net avec tous les postes réels.
 * ════════════════════════════════════════════════════════ */
window.WW_Tools.rendementLocatifAvance = function(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const uid = 'rl_' + containerId;
  const eur = n => Number(n).toLocaleString('fr-BE', { maximumFractionDigits: 0 }) + ' €';
  const pct = n => (Math.round(n * 100) / 100).toFixed(2) + '%';
  const C = { terra: '#C4724A', rose: '#E87CC3', gold: '#E8C23A', green: '#7EC8A0', cyan: '#5BB8D4' };

  el.innerHTML = `
    <div style="background:var(--s2,rgba(255,255,255,0.04));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:20px 18px;">
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--muted,#888);margin-bottom:14px;">🏠 Rendement Locatif Net-Net</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Prix d'achat total (€)</label>
          <input type="number" id="${uid}_prix" value="220000" min="0"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Loyer mensuel (€)</label>
          <input type="number" id="${uid}_loyer" value="900" min="0"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Précompte immobilier (€/an)</label>
          <input type="number" id="${uid}_pi" value="1200" min="0"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Entretien annuel (€)</label>
          <input type="number" id="${uid}_entretien" value="1500" min="0"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Assurance propriétaire (€/an)</label>
          <input type="number" id="${uid}_assur" value="400" min="0"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Gestion agence (% loyer annuel)</label>
          <input type="number" id="${uid}_gestion" value="0" min="0" max="15" step="0.5"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Vacance locative (mois/an)</label>
          <input type="number" id="${uid}_vacance" value="0.5" min="0" max="6" step="0.5"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Tranche IPP applicable (%)</label>
          <select id="${uid}_ipp" onchange="${uid}_calc()"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;">
            <option value="0.40">40%</option>
            <option value="0.45" selected>45%</option>
            <option value="0.50">50%</option>
          </select>
        </div>
      </div>
      <div id="${uid}_result" style="display:none;"></div>
    </div>`;

  window[uid + '_calc'] = function() {
    const prix     = parseFloat(document.getElementById(uid + '_prix')?.value)      || 0;
    const loyer    = parseFloat(document.getElementById(uid + '_loyer')?.value)     || 0;
    const pi       = parseFloat(document.getElementById(uid + '_pi')?.value)        || 0;
    const entret   = parseFloat(document.getElementById(uid + '_entretien')?.value) || 0;
    const assur    = parseFloat(document.getElementById(uid + '_assur')?.value)     || 0;
    const gestion  = (parseFloat(document.getElementById(uid + '_gestion')?.value) || 0) / 100;
    const vacance  = parseFloat(document.getElementById(uid + '_vacance')?.value)   || 0;
    const ipp      = parseFloat(document.getElementById(uid + '_ipp')?.value)       || 0.45;
    if (!prix || !loyer) return;

    const loyer_annuel   = loyer * 12;
    const loyer_effectif = loyer_annuel - loyer * vacance; // déduction vacance
    const gestion_eur    = loyer_annuel * gestion;
    const charges_totales = pi + entret + assur + gestion_eur;

    // Rendement brut
    const rend_brut = (loyer_annuel / prix) * 100;

    // Rendement net (avant fiscalité)
    const rend_net_avant_fisc = (loyer_effectif - charges_totales) / prix * 100;

    // Fiscalité loyers belge : base = RC indexé * 1.4
    // Approximation : RC = ~loyer / 60 * 12 = loyer_annuel / 5
    // Base imposable = RC_indexé * 1.4 ≈ loyer_annuel / 5 * 1.25 * 1.4
    const RC_estime  = loyer_annuel / 5;
    const base_impo  = RC_estime * 1.25 * 1.4;
    const impot      = base_impo * ipp;

    // Rendement net-net
    const revenu_net_net  = loyer_effectif - charges_totales - impot;
    const rend_net_net    = (revenu_net_net / prix) * 100;

    const res = document.getElementById(uid + '_result');
    res.style.display = 'block';
    res.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px;">
        <div style="background:var(--s3);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.60rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Rendement brut</div>
          <div style="font-size:1.3rem;font-weight:700;color:${C.terra};">${pct(rend_brut)}</div>
          <div style="font-size:0.66rem;color:var(--muted);">${eur(loyer_annuel)}/an</div>
        </div>
        <div style="background:var(--s3);border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.60rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Net (avant fisc.)</div>
          <div style="font-size:1.3rem;font-weight:700;color:${C.gold};">${pct(rend_net_avant_fisc)}</div>
          <div style="font-size:0.66rem;color:var(--muted);">-${eur(charges_totales)} charges</div>
        </div>
        <div style="background:${rend_net_net>=3?'rgba(126,200,160,0.10)':'rgba(232,124,195,0.08)'};border:1px solid ${rend_net_net>=3?'rgba(126,200,160,0.25)':'rgba(232,124,195,0.25)'};border-radius:12px;padding:14px;text-align:center;">
          <div style="font-size:0.60rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:4px;">Net-net (après fisc.)</div>
          <div style="font-size:1.3rem;font-weight:700;color:${rend_net_net>=3?C.green:C.rose};">${pct(rend_net_net)}</div>
          <div style="font-size:0.66rem;color:var(--muted);">${eur(revenu_net_net)}/an</div>
        </div>
      </div>
      <div style="background:var(--s3);border-radius:10px;padding:12px;margin-bottom:10px;">
        <div style="font-size:0.62rem;color:var(--muted);font-weight:700;text-transform:uppercase;margin-bottom:8px;">Décomposition des charges annuelles</div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <div style="display:flex;justify-content:space-between;font-size:0.76rem;"><span style="color:var(--muted);">Précompte immobilier</span><span style="color:var(--text);">${eur(pi)}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.76rem;"><span style="color:var(--muted);">Entretien</span><span style="color:var(--text);">${eur(entret)}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.76rem;"><span style="color:var(--muted);">Assurance</span><span style="color:var(--text);">${eur(assur)}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.76rem;"><span style="color:var(--muted);">Gestion agence</span><span style="color:var(--text);">${eur(gestion_eur)}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.76rem;"><span style="color:var(--muted);">Vacance (${vacance} mois)</span><span style="color:${C.rose};">-${eur(loyer * vacance)}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.76rem;border-top:1px solid var(--faint);padding-top:4px;margin-top:2px;"><span style="color:var(--muted);">Impôt IPP (sur RC estimé)</span><span style="color:${C.rose};">-${eur(impot)}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;border-top:1px solid var(--faint);padding-top:4px;"><span>Total charges + fiscalité</span><span style="color:${C.rose};">${eur(charges_totales + impot)}</span></div>
        </div>
      </div>
      <div style="font-size:0.68rem;color:var(--muted2);">Fiscalité belge simplifiée : RC estimé (loyer/5) × 1,25 × 1,4 × taux IPP. En réalité le bien est à déclarer en case 1100-1109. Simulation indicative — consulter un fiscaliste.</div>`;
  };

  window[uid + '_calc']();
};

/* ════════════════════════════════════════════════════════
 * 22. SIMULATEUR FIRE — Financial Independence Retire Early
 * Capital FIRE cible (règle des 25x), années pour y arriver,
 * projection par décennie, Safe Withdrawal Rate personnalisé.
 * ════════════════════════════════════════════════════════ */
window.WW_Tools.simulateurFIRE = function(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const uid = 'fi_' + containerId;
  const eur = n => Number(n).toLocaleString('fr-BE', { maximumFractionDigits: 0 }) + ' €';
  const C = { cyan: '#5BB8D4', rose: '#E87CC3', gold: '#E8C23A', green: '#7EC8A0', terra: '#C4724A' };

  el.innerHTML = `
    <div style="background:var(--s2,rgba(255,255,255,0.04));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:20px 18px;">
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--muted,#888);margin-bottom:14px;">🔥 Simulateur FIRE</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Dépenses mensuelles souhaitées à la retraite (€)</label>
          <input type="number" id="${uid}_dep" value="3000" min="500"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Épargne mensuelle actuelle (€)</label>
          <input type="number" id="${uid}_ep" value="500" min="0"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Capital déjà constitué (€)</label>
          <input type="number" id="${uid}_cap" value="0" min="0"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Rendement annuel estimé (%)</label>
          <input type="number" id="${uid}_rend" value="7" min="1" max="15" step="0.5"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:flex;justify-content:space-between;margin-bottom:5px;">
          <span>Taux de retrait annuel (SWR)</span>
          <span id="${uid}_swr_lbl" style="color:${C.cyan};">4,0%</span>
        </label>
        <input type="range" id="${uid}_swr" min="2" max="6" step="0.5" value="4"
          style="width:100%;accent-color:${C.cyan};"
          oninput="document.getElementById('${uid}_swr_lbl').textContent=parseFloat(this.value).toFixed(1)+'%';${uid}_calc()">
        <div style="display:flex;justify-content:space-between;font-size:0.64rem;color:var(--muted2);margin-top:3px;">
          <span>2% — très prudent</span><span>4% — règle historique</span><span>6% — optimiste</span>
        </div>
      </div>

      <div id="${uid}_result" style="display:none;"></div>
    </div>`;

  window[uid + '_calc'] = function() {
    const dep  = parseFloat(document.getElementById(uid + '_dep')?.value)  || 0;
    const ep   = parseFloat(document.getElementById(uid + '_ep')?.value)   || 0;
    const cap  = parseFloat(document.getElementById(uid + '_cap')?.value)  || 0;
    const rend = (parseFloat(document.getElementById(uid + '_rend')?.value) || 7) / 100;
    const swr  = (parseFloat(document.getElementById(uid + '_swr')?.value)  || 4) / 100;
    if (!dep || !ep) return;

    const r      = rend / 12;
    const target = (dep * 12) / swr;

    // Années pour atteindre la cible
    let months = 0, current = cap;
    while (current < target && months < 720) {
      current = current * (1 + r) + ep;
      months++;
    }
    const annees = Math.ceil(months / 12);

    // Projections par décennie
    const proj = (n) => cap * Math.pow(1 + r, n * 12) + ep * (Math.pow(1 + r, n * 12) - 1) / r;
    const p10 = proj(10), p20 = proj(20), p30 = proj(30);

    // Taux d'épargne (approximation)
    const revenu_est = ep + dep;
    const tx_ep = Math.round((ep / revenu_est) * 100);

    // Revenu mensuel généré par le capital FIRE
    const revenu_fire = (target * swr) / 12;

    const res = document.getElementById(uid + '_result');
    res.style.display = 'block';
    res.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
        <div style="background:rgba(91,184,212,0.10);border:1px solid rgba(91,184,212,0.25);border-radius:14px;padding:16px;text-align:center;">
          <div style="font-size:0.62rem;font-weight:700;text-transform:uppercase;color:${C.cyan};margin-bottom:6px;">🎯 Capital FIRE cible</div>
          <div style="font-size:1.6rem;font-weight:700;color:${C.cyan};font-family:'DM Serif Display',serif;font-style:italic;">${eur(target)}</div>
          <div style="font-size:0.70rem;color:var(--muted);margin-top:4px;">SWR ${(swr*100).toFixed(1)}% → ${eur(revenu_fire)}/mois</div>
        </div>
        <div style="background:${months>=720?'rgba(232,124,195,0.10)':'rgba(126,200,160,0.10)'};border:1px solid ${months>=720?'rgba(232,124,195,0.25)':'rgba(126,200,160,0.25)'};border-radius:14px;padding:16px;text-align:center;">
          <div style="font-size:0.62rem;font-weight:700;text-transform:uppercase;color:${months>=720?C.rose:C.green};margin-bottom:6px;">⏱️ Temps pour y arriver</div>
          <div style="font-size:1.6rem;font-weight:700;color:${months>=720?C.rose:C.green};font-family:'DM Serif Display',serif;font-style:italic;">${months>=720?'+60 ans':annees+' ans'}</div>
          <div style="font-size:0.70rem;color:var(--muted);margin-top:4px;">à ${eur(ep)}/mois à ${(rend*100).toFixed(1)}%/an</div>
        </div>
      </div>

      <div style="background:var(--s3);border-radius:12px;padding:14px;margin-bottom:12px;">
        <div style="font-size:0.62rem;font-weight:700;text-transform:uppercase;color:var(--muted);margin-bottom:10px;">📈 Projection du portefeuille</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
          ${[['10 ans', p10, C.gold], ['20 ans', p20, C.terra], ['30 ans', p30, C.rose]].map(([label, val, color]) => {
            const pct_target = Math.min((val / target) * 100, 100);
            return `<div style="text-align:center;">
              <div style="font-size:0.64rem;color:var(--muted);font-weight:700;margin-bottom:6px;">${label}</div>
              <div style="font-size:1.1rem;font-weight:700;color:${color};">${eur(val)}</div>
              <div style="background:var(--s2);border-radius:20px;height:6px;margin:6px 0;overflow:hidden;">
                <div style="height:100%;width:${pct_target}%;background:${color};border-radius:20px;transition:width 0.5s;"></div>
              </div>
              <div style="font-size:0.62rem;color:var(--muted);">${pct_target.toFixed(0)}% de la cible</div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <div style="background:var(--s3);border-radius:10px;padding:12px;margin-bottom:10px;">
        <div style="font-size:0.70rem;font-weight:700;color:var(--muted);margin-bottom:6px;">💡 Leviers pour accélérer</div>
        <div style="display:flex;flex-direction:column;gap:4px;font-size:0.76rem;color:var(--text2);">
          <div>+100€/mois d'épargne → <strong style="color:${C.green};">${eur(100 * (Math.pow(1+r, months)-1)/r)}</strong> de plus en ${annees} ans</div>
          <div>+1%/an de rendement → capital ~${Math.round(((1.01/1+rend-1))*annees*100)}% plus élevé sur la période</div>
          <div>-10% de dépenses → cible abaissée à <strong style="color:${C.cyan};">${eur(target*0.9)}</strong></div>
        </div>
      </div>

      <div style="font-size:0.68rem;color:var(--muted2);">Règle des 4% = étude Trinity 1998 · Rendement ${(rend*100).toFixed(1)}%/an nominal non garanti · Hors inflation · Hors pension légale belge · Simulation indicative</div>`;
  };

  window[uid + '_calc']();
};

/* ════════════════════════════════════════════════════════
 * 23. COMPARATEUR ETF DIRECT vs ASSURANCE-VIE BRANCHE 23
 * Coût fiscal cumulé sur 10/20/30 ans selon les deux
 * structures. Taxe de 2% sur primes, PM, taxe PV 2026.
 * ════════════════════════════════════════════════════════ */
window.WW_Tools.comparateurETFvsAV = function(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const uid = 'ea_' + containerId;
  const eur = n => Number(n).toLocaleString('fr-BE', { maximumFractionDigits: 0 }) + ' €';
  const pct = n => n.toFixed(2) + '%';
  const C = { cyan: '#5BB8D4', rose: '#E87CC3', gold: '#E8C23A', green: '#7EC8A0' };

  el.innerHTML = `
    <div style="background:var(--s2,rgba(255,255,255,0.04));border:1px solid var(--border,rgba(255,255,255,0.08));border-radius:16px;padding:20px 18px;">
      <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.10em;color:var(--muted,#888);margin-bottom:14px;">⚖️ ETF direct vs Assurance-vie Branche 23</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Versement mensuel (€)</label>
          <input type="number" id="${uid}_verse" value="300" min="10"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Rendement brut annuel (%)</label>
          <input type="number" id="${uid}_rend" value="7" min="1" max="15" step="0.5"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Frais annuels ETF (TER, %)</label>
          <input type="number" id="${uid}_ter" value="0.20" min="0" max="2" step="0.05"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
        <div>
          <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">Frais annuels Branche 23 (%)</label>
          <input type="number" id="${uid}_frais_av" value="1.50" min="0" max="3" step="0.05"
            style="width:100%;background:var(--s3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;font-family:'DM Sans',sans-serif;font-size:0.86rem;color:var(--text);outline:none;"
            oninput="${uid}_calc()">
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <label style="font-size:0.72rem;font-weight:600;color:var(--muted);display:flex;justify-content:space-between;margin-bottom:5px;">
          <span>Horizon de comparaison</span>
          <span id="${uid}_hor_lbl" style="color:${C.cyan};">20 ans</span>
        </label>
        <input type="range" id="${uid}_horizon" min="5" max="35" step="5" value="20"
          style="width:100%;accent-color:${C.cyan};"
          oninput="document.getElementById('${uid}_hor_lbl').textContent=this.value+' ans';${uid}_calc()">
        <div style="display:flex;justify-content:space-between;font-size:0.64rem;color:var(--muted2);margin-top:3px;">
          <span>5 ans</span><span>20 ans</span><span>35 ans</span>
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <label style="font-size:0.70rem;font-weight:600;color:var(--muted);display:block;margin-bottom:6px;">Options fiscales</label>
        <div style="display:flex;flex-direction:column;gap:5px;">
          <label style="display:flex;align-items:center;gap:7px;font-size:0.74rem;color:var(--muted);cursor:pointer;">
            <input type="checkbox" id="${uid}_tob" checked onchange="${uid}_calc()">
            ETF : TOB 0,12% à l'achat
          </label>
          <label style="display:flex;align-items:center;gap:7px;font-size:0.74rem;color:var(--muted);cursor:pointer;">
            <input type="checkbox" id="${uid}_pv" checked onchange="${uid}_calc()">
            Taxe plus-value 10% à la sortie (jan. 2026)
          </label>
          <label style="display:flex;align-items:center;gap:7px;font-size:0.74rem;color:var(--muted);cursor:pointer;">
            <input type="checkbox" id="${uid}_pm_av" checked onchange="${uid}_calc()">
            Branche 23 : PM 30% si retrait avant 8 ans
          </label>
        </div>
      </div>

      <div id="${uid}_result" style="display:none;"></div>
    </div>`;

  window[uid + '_calc'] = function() {
    const verse    = parseFloat(document.getElementById(uid + '_verse')?.value)   || 0;
    const rend     = (parseFloat(document.getElementById(uid + '_rend')?.value)   || 7) / 100;
    const ter      = (parseFloat(document.getElementById(uid + '_ter')?.value)    || 0.20) / 100;
    const frais_av = (parseFloat(document.getElementById(uid + '_frais_av')?.value) || 1.50) / 100;
    const horizon  = parseInt(document.getElementById(uid + '_horizon')?.value)   || 20;
    const inclTOB  = document.getElementById(uid + '_tob')?.checked;
    const inclPV   = document.getElementById(uid + '_pv')?.checked;
    const inclPM   = document.getElementById(uid + '_pm_av')?.checked;
    if (!verse) return;

    const TAXE_PRIME = 0.02; // taxe sur primes B23
    const r_etf = (rend - ter) / 12;
    const r_av  = (rend - frais_av) / 12;
    const n     = horizon * 12;

    // ── ETF direct ──
    const verse_etf = inclTOB ? verse * (1 - 0.0012) : verse;
    const cap_etf_brut = verse_etf * (Math.pow(1 + r_etf, n) - 1) / r_etf;
    const invest_total_etf = verse * n;
    const pv_etf = cap_etf_brut - invest_total_etf;
    const taxe_pv_etf = inclPV && pv_etf > 0 ? pv_etf * 0.10 : 0;
    const cap_etf_net = cap_etf_brut - taxe_pv_etf;
    const cout_fiscal_etf = invest_total_etf * 0.0012 * (inclTOB ? 1 : 0) + taxe_pv_etf;

    // ── Branche 23 ──
    const verse_av = verse * (1 - TAXE_PRIME); // taxe 2% sur prime
    const cap_av_brut = verse_av * (Math.pow(1 + r_av, n) - 1) / r_av;
    const invest_total_av = verse_av * n;
    const pv_av = cap_av_brut - invest_total_av;

    // PM 30% si retrait avant 8 ans (sur intérêts B21 — pas applicable B23 en général, mais certains contrats)
    const pm_av = (inclPM && horizon < 8) ? pv_av * 0.30 : 0;
    const taxe_pv_av = inclPV && pv_av > 0 ? pv_av * 0.10 : 0;
    const taxe_prime_totale = verse * n * TAXE_PRIME;
    const cap_av_net = cap_av_brut - pm_av - taxe_pv_av;
    const cout_fiscal_av = taxe_prime_totale + pm_av + taxe_pv_av;

    const diff = cap_etf_net - cap_av_net;
    const winner = diff >= 0 ? 'etf' : 'av';

    const res = document.getElementById(uid + '_result');
    res.style.display = 'block';
    res.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
        <div style="background:${winner==='etf'?'rgba(126,200,160,0.10)':'var(--s3)'};border:2px solid ${winner==='etf'?'rgba(126,200,160,0.35)':'var(--border)'};border-radius:14px;padding:16px;text-align:center;">
          <div style="font-size:0.62rem;font-weight:700;text-transform:uppercase;color:${C.green};margin-bottom:4px;">📈 ETF direct</div>
          <div style="font-size:0.64rem;color:var(--muted);margin-bottom:8px;">TER ${(ter*100).toFixed(2)}% + TOB + taxe PV</div>
          <div style="font-size:1.4rem;font-weight:700;color:${C.green};">${eur(cap_etf_net)}</div>
          <div style="font-size:0.68rem;color:var(--muted);margin-top:4px;">Capital net à ${horizon} ans</div>
          <div style="font-size:0.68rem;color:${C.rose};margin-top:4px;">Charges fiscales : ${eur(cout_fiscal_etf)}</div>
          ${winner==='etf'?`<div style="font-size:0.70rem;font-weight:700;color:${C.green};margin-top:8px;">✅ +${eur(Math.abs(diff))}</div>`:''}
        </div>
        <div style="background:${winner==='av'?'rgba(91,184,212,0.10)':'var(--s3)'};border:2px solid ${winner==='av'?'rgba(91,184,212,0.35)':'var(--border)'};border-radius:14px;padding:16px;text-align:center;">
          <div style="font-size:0.62rem;font-weight:700;text-transform:uppercase;color:${C.cyan};margin-bottom:4px;">🔒 Branche 23</div>
          <div style="font-size:0.64rem;color:var(--muted);margin-bottom:8px;">Frais ${(frais_av*100).toFixed(2)}% + taxe 2% primes</div>
          <div style="font-size:1.4rem;font-weight:700;color:${C.cyan};">${eur(cap_av_net)}</div>
          <div style="font-size:0.68rem;color:var(--muted);margin-top:4px;">Capital net à ${horizon} ans</div>
          <div style="font-size:0.68rem;color:${C.rose};margin-top:4px;">Charges fiscales : ${eur(cout_fiscal_av)}</div>
          ${winner==='av'?`<div style="font-size:0.70rem;font-weight:700;color:${C.cyan};margin-top:8px;">✅ +${eur(Math.abs(diff))}</div>`:''}
        </div>
      </div>

      <div style="background:var(--s3);border-radius:12px;padding:14px;margin-bottom:12px;">
        <div style="font-size:0.62rem;font-weight:700;text-transform:uppercase;color:var(--muted);margin-bottom:10px;">Décomposition sur ${horizon} ans</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;text-align:center;">
          <div style="font-size:0.62rem;color:var(--muted);font-weight:700;"></div>
          <div style="font-size:0.62rem;color:${C.green};font-weight:700;">ETF</div>
          <div style="font-size:0.62rem;color:${C.cyan};font-weight:700;">Branche 23</div>

          <div style="font-size:0.74rem;color:var(--muted);text-align:left;">Capital brut</div>
          <div style="font-size:0.74rem;color:var(--text);">${eur(cap_etf_brut)}</div>
          <div style="font-size:0.74rem;color:var(--text);">${eur(cap_av_brut)}</div>

          <div style="font-size:0.74rem;color:var(--muted);text-align:left;">Taxe sur primes</div>
          <div style="font-size:0.74rem;color:${C.green};">—</div>
          <div style="font-size:0.74rem;color:${C.rose};">-${eur(taxe_prime_totale)}</div>

          <div style="font-size:0.74rem;color:var(--muted);text-align:left;">Taxe PV 10%</div>
          <div style="font-size:0.74rem;color:${C.rose};">-${eur(taxe_pv_etf)}</div>
          <div style="font-size:0.74rem;color:${C.rose};">-${eur(taxe_pv_av)}</div>

          <div style="font-size:0.74rem;color:var(--muted);text-align:left;">TOB total</div>
          <div style="font-size:0.74rem;color:${C.rose};">-${eur(invest_total_etf * 0.0012 * (inclTOB?1:0))}</div>
          <div style="font-size:0.74rem;color:${C.green};">—</div>

          <div style="font-size:0.74rem;font-weight:700;color:var(--text);text-align:left;border-top:1px solid var(--faint);padding-top:4px;">Capital net</div>
          <div style="font-size:0.74rem;font-weight:700;color:${C.green};border-top:1px solid var(--faint);padding-top:4px;">${eur(cap_etf_net)}</div>
          <div style="font-size:0.74rem;font-weight:700;color:${C.cyan};border-top:1px solid var(--faint);padding-top:4px;">${eur(cap_av_net)}</div>
        </div>
      </div>

      <div style="padding:12px 14px;background:${winner==='etf'?'rgba(126,200,160,0.07)':'rgba(91,184,212,0.07)'};border-left:3px solid ${winner==='etf'?C.green:C.cyan};border-radius:0 10px 10px 0;font-size:0.78rem;color:var(--text2);line-height:1.65;">
        ${winner==='etf'
          ? `✅ <strong>L'ETF direct génère ${eur(Math.abs(diff))} de plus</strong> sur ${horizon} ans. La taxe de 2% sur les primes de la branche 23 pèse ${eur(taxe_prime_totale)} — un handicap structurel difficile à combler même avec des frais plus élevés sur l'ETF.`
          : `⚠️ <strong>La branche 23 génère ${eur(Math.abs(diff))} de plus</strong> dans ce scénario. Cela peut arriver si les frais ETF sont élevés et l'horizon très long. Vérifier les hypothèses.`}
        ${horizon >= 20 && winner === 'av' ? ' Attention : sur de très longues durées, l\'avantage successoral de la B23 peut aussi justifier ce choix indépendamment du rendement pur.' : ''}
      </div>
      <div style="font-size:0.68rem;color:var(--muted2);margin-top:8px;">Rendement ${(rend*100).toFixed(1)}%/an brut non garanti · Frais ETF TER ${(ter*100).toFixed(2)}% · Taxe primes B23 2% · Taxe PV 10% (jan. 2026) · Hors avantage successoral · Simulation indicative</div>`;
  };

  window[uid + '_calc']();
};
