// ── DATA STORE ────────────────────────────────────────────────────────────────
const store = {
  sessions: [
    {
      id: 'chg-1042',
      objective: 'Add Provider X payments without changing retry behavior.',
      size: 'Medium',
      risk: 'Professional',
      phase: 'Explaining',
      warning: 'Blocked: must accept composition condition before continue.',
      owner: 'Alex',
      currency: 'Current',
      signal: 'warn',
      mode: 'Multi-agent',
      timestamp: '2 hours ago'
    },
    {
      id: 'chg-1037',
      objective: 'Harden token boundary so sessions never leave mesh.',
      size: 'Small',
      risk: 'Consequential',
      phase: 'Approved',
      warning: null,
      owner: 'Sam',
      currency: 'Current',
      signal: 'ok',
      mode: 'Single agent',
      timestamp: '1 day ago'
    },
    {
      id: 'chg-1019',
      objective: 'Refactor retry queue cleanup without touching auth.',
      size: 'Large',
      risk: 'Exploratory',
      phase: 'Planning',
      warning: 'Blocked: plan too tangled for safe human supervision.',
      owner: 'Maya',
      currency: 'Lapsed',
      signal: 'danger',
      mode: 'Multi-agent',
      timestamp: '3 days ago'
    }
  ],
  planDraft: {
    goal: '', scope: '', doNotChange: '', success: '', nonGoals: '',
    mode: 'single', overlap: 'Low', complexity: 'Safe'
  },
  workStatus: {
    planned:    ['payments/provider-x.js', 'payments/router.js', 'tests/provider-x.spec.js'],
    actual:     ['payments/provider-x.js', 'payments/router.js', 'tests/provider-x.spec.js', 'payments/reconcile.js'],
    surprise:   ['payments/reconcile.js'],
    violations: ['Touched file outside allowed scope. Auto-paused change.'],
    criteria:   'Pass',
    rules:      'Pass',
    unexplained:'1 item'
  },
  proveStatus: {
    narrative: {
      why:          'Provider X is added through an adapter so existing provider behavior stays unchanged.',
      architecture: 'Error normalization now happens in payments/router.js before reconciliation enqueue.',
      assumptions:  'Reconciliation worker runs every 15 minutes and pending captures are retried idempotently.'
    },
    dependencies: [
      { component: 'payments/router.js',    impact: 'Now routes Provider X error map before retry queue.' },
      { component: 'payments/reconcile.js', impact: 'Reads pending Provider X captures for delayed completion.' },
      { component: 'audit/events.js',       impact: 'Receives Provider X capture lifecycle events.' }
    ],
    questions: [
      'If reconciliation worker fails, what happens next?',
      'If load doubles, where does this fail first?',
      'Which rule guarantees payment events are auditable?'
    ],
    expectedHints: ['Pending state + retry loop', 'Provider timeout + queue growth', 'INV-012 audit log invariant'],
    invariants: [
      { id: 'INV-012', statement: 'Every payment operation emits an audit event.',      owner: '@sam',  verified: '2026-02-21' },
      { id: 'INV-018', statement: 'Retries must be idempotent across provider adapters.', owner: '@alex', verified: '2026-02-20' }
    ]
  },
  mergeChecks: [
    { label: 'Rules updated',                                                status: 'pass' },
    { label: 'Safety assumptions verified',                                  status: 'pass' },
    { label: 'Monitoring metrics logged',                                    status: 'pass' },
    { label: 'Artifacts committed (brief, plan, report, reconstruction)',     status: 'pass' },
    { label: 'No unresolved error state',                                    status: 'pass' },
    { label: 'Complexity still within safe limit',                           status: 'fail' }
  ],
  health: [
    { label: 'Prediction accuracy', value: '82%',     status: 'warn',   trend: 'slipping', threshold: 'Orange < 80%' },
    { label: 'Scope breach rate',   value: '11%',     status: 'warn',   trend: 'rising',   threshold: 'Yellow > 10%' },
    { label: 'Time-to-explain',     value: '14m',     status: 'ok',     trend: 'steady',   threshold: 'Orange > 18m' },
    { label: 'Invariant staleness', value: '6 stale', status: 'danger', trend: 'rising',   threshold: 'Orange > 5 stale' }
  ]
};

// ── UI STATE ──────────────────────────────────────────────────────────────────
const state = {
  expandedId: null,
  cardTabs: {}   // { sessionId: 'plan' | 'do' | 'prove' | 'merge' }
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
function defaultTab(session) {
  const p = session.phase.toLowerCase();
  if (p.includes('plan'))    return 'plan';
  if (p.includes('approv') || p.includes('execut')) return 'do';
  if (p.includes('explain') || p.includes('prov'))  return 'prove';
  if (p.includes('merg'))   return 'merge';
  return 'do';
}

function signalDotClass(signal) {
  return { ok: 'dot-ok', warn: 'dot-warn', danger: 'dot-danger' }[signal] || 'dot-warn';
}

function phaseBadgeClass(phase) {
  const p = phase.toLowerCase();
  if (p.includes('plan'))    return 'phase-planning';
  if (p.includes('approv'))  return 'phase-doing';
  if (p.includes('explain') || p.includes('prov')) return 'phase-proving';
  if (p.includes('merg'))    return 'phase-merge';
  return 'neutral';
}

function trendArrow(trend) {
  if (trend === 'rising')   return '↑';
  if (trend === 'slipping') return '↓';
  return '→';
}

// ── CONTROL PANEL ─────────────────────────────────────────────────────────────
function renderControlPanel() {
  const yellow = store.health.filter(h => h.status === 'warn').length;
  const red    = store.health.filter(h => h.status === 'danger').length;
  const riskLevel = red ? 'RED' : yellow ? 'YELLOW' : 'GREEN';
  const riskClass = red ? 'red' : yellow ? 'yellow' : 'green';
  const riskDesc  = { RED: 'Full stop. Rebuild understanding.', YELLOW: 'Pay attention. Tighten controls.', GREEN: 'System healthy.' }[riskLevel];
  const topBadge  = { RED: 'danger', YELLOW: 'warn', GREEN: 'ok' }[riskLevel];

  document.getElementById('control-panel').innerHTML = `
    <div class="cp-section">
      <div class="cp-label">On Duty</div>
      <div class="cp-operator">
        <div class="cp-avatar">J</div>
        <span class="cp-operator-name">Jordan</span>
      </div>
      <span class="cp-halt-badge">⏹ Halt Authority</span>
    </div>

    <div class="cp-section">
      <div class="cp-label">Health Metrics</div>
      <div class="cp-metrics">
        ${store.health.map(h => `
          <div class="cp-metric">
            <div class="cp-metric-left">
              <div class="cp-metric-label">${h.label}</div>
              <div class="cp-metric-value">${h.value}</div>
              <div class="cp-metric-trend">${trendArrow(h.trend)} ${h.trend}</div>
            </div>
            <div class="cp-metric-dot ${h.status}"></div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="cp-section">
      <div class="cp-label">System Risk</div>
      <div class="cp-risk ${riskClass}">
        <div class="cp-risk-level">${riskLevel}</div>
        <div class="cp-risk-desc">${riskDesc}</div>
      </div>
    </div>
  `;

  document.getElementById('topbar-risk').innerHTML = `
    <span class="badge ${topBadge}">${riskLevel}</span>
    <span>${store.sessions.length} active changes</span>
  `;
}

// ── TIMELINE ──────────────────────────────────────────────────────────────────
function renderTimeline() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = `
    <div class="timeline-heading">Change Log</div>
    ${store.sessions.map(session => {
      const isExpanded = state.expandedId === session.id;
      const tab = state.cardTabs[session.id] || defaultTab(session);
      return buildCardHTML(session, isExpanded, tab);
    }).join('')}
  `;

  attachTimelineListeners();

  if (state.expandedId) {
    const tab = state.cardTabs[state.expandedId] || defaultTab(store.sessions.find(s => s.id === state.expandedId));
    renderCardContent(state.expandedId, tab);
  }
}

function buildCardHTML(session, isExpanded, activeTab) {
  const warningClass = session.signal === 'danger' ? ' danger' : '';
  const tabs = ['plan', 'do', 'prove', 'merge'];

  return `
    <div class="timeline-item" data-id="${session.id}">
      <div class="timeline-dot ${signalDotClass(session.signal)}"></div>
      <div class="timeline-card${isExpanded ? ' is-expanded' : ''}" data-id="${session.id}">

        <div class="card-compact" data-toggle="${session.id}">
          <span class="compact-id">${session.id}</span>
          <span class="compact-objective">${session.objective}</span>
          <div class="compact-meta">
            <span class="badge ${phaseBadgeClass(session.phase)}">${session.phase}</span>
            <span class="badge ${session.signal}">${session.risk}</span>
            <span class="badge ${session.currency === 'Current' ? 'ok' : 'warn'}">${session.currency}</span>
            <span class="compact-owner">${session.owner}</span>
            <span class="compact-time">${session.timestamp}</span>
          </div>
          <span class="expand-icon">▾</span>
        </div>

        ${session.warning ? `
          <div class="card-warning-strip${warningClass}">
            <span>⚠</span><span>${session.warning}</span>
          </div>
        ` : ''}

        <div class="card-expand-wrapper">
          <div class="card-expand-inner">
            <div class="card-tabs">
              ${tabs.map(t => `
                <button class="card-tab-btn${isExpanded && activeTab === t ? ' active' : ''}"
                        data-tab-id="${session.id}" data-tab="${t}">
                  ${t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              `).join('')}
              <button class="card-tab-close" data-close="${session.id}">✕</button>
            </div>
            <div class="card-content-area" id="card-content-${session.id}"></div>
          </div>
        </div>

      </div>
    </div>
  `;
}

function attachTimelineListeners() {
  document.querySelectorAll('[data-toggle]').forEach(el => {
    el.addEventListener('click', () => toggleCard(el.dataset.toggle));
  });
  document.querySelectorAll('[data-tab-id]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      setCardTab(btn.dataset.tabId, btn.dataset.tab);
    });
  });
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      collapseCard(btn.dataset.close);
    });
  });
}

// ── CARD EXPAND / COLLAPSE ────────────────────────────────────────────────────
function toggleCard(id) {
  if (state.expandedId === id) { collapseCard(id); return; }

  const prevId = state.expandedId;
  state.expandedId = id;

  if (!state.cardTabs[id]) {
    state.cardTabs[id] = defaultTab(store.sessions.find(s => s.id === id));
  }

  if (prevId) {
    const prevCard = document.querySelector(`.timeline-card[data-id="${prevId}"]`);
    if (prevCard) prevCard.classList.remove('is-expanded');
  }

  const card = document.querySelector(`.timeline-card[data-id="${id}"]`);
  if (!card) return;
  card.classList.add('is-expanded');

  // Mark correct tab active
  const tab = state.cardTabs[id];
  card.querySelectorAll('.card-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  renderCardContent(id, tab);
}

function collapseCard(id) {
  state.expandedId = null;
  const card = document.querySelector(`.timeline-card[data-id="${id}"]`);
  if (card) card.classList.remove('is-expanded');
}

function setCardTab(id, tab) {
  state.cardTabs[id] = tab;
  const card = document.querySelector(`.timeline-card[data-id="${id}"]`);
  if (!card) return;
  card.querySelectorAll('.card-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  renderCardContent(id, tab);
}

// ── CARD CONTENT ROUTER ───────────────────────────────────────────────────────
function renderCardContent(id, tab) {
  const container = document.getElementById(`card-content-${id}`);
  if (!container) return;
  if (tab === 'plan')  renderPlanContent(container);
  if (tab === 'do')    renderDoContent(container);
  if (tab === 'prove') renderProveContent(container);
  if (tab === 'merge') renderMergeContent(container);
}

// ── PLAN CONTENT ──────────────────────────────────────────────────────────────
function renderPlanContent(container) {
  container.innerHTML = `
    <h2 class="section-title">What Are We Trying to Do?</h2>
    <p class="section-desc">You cannot proceed with vague goals. Ambiguity is blocked on purpose.</p>
    <div class="grid-2">
      <div>
        <label>What should be true when done?</label>
        <textarea data-field="goal" rows="3" placeholder="One clear result."></textarea>
        <label>What parts are allowed to change?</label>
        <textarea data-field="scope" rows="2" placeholder="Modules/files in scope."></textarea>
        <label>What must absolutely not change?</label>
        <textarea data-field="nochange" rows="2" placeholder="Critical constraints."></textarea>
        <label>How will we know it worked?</label>
        <textarea data-field="success" rows="2" placeholder="Testable acceptance criteria."></textarea>
        <label>What are we explicitly not doing?</label>
        <textarea data-field="nongoals" rows="2" placeholder="Out-of-scope work."></textarea>
        <div class="inner-card" style="margin-top:14px;">
          <h3>Context Binding</h3>
          <ul class="list">
            <li>Affected components detected: payments/*, audit/*</li>
            <li>Recent related changes: 3 in last 7 days</li>
            <li>Invariants in scope: INV-012, INV-018</li>
          </ul>
        </div>
      </div>
      <div>
        <div class="inner-card">
          <h3>Large / Multi-agent Breakdown</h3>
          <p class="small">Only shown when work is split across agents.</p>
          <ul class="list">
            <li>Split: API adapter, error mapping, reconciliation updates</li>
            <li>Overlap risk: <span class="badge warn">Medium</span></li>
            <li>Complexity: <span class="badge danger">Too tangled for safe supervision</span></li>
          </ul>
        </div>
        <div class="inner-card">
          <h3>Scope Gate</h3>
          <ul class="list">
            <li>Default limit: 5 files or 200 net lines.</li>
            <li>Forecast for this plan: 8 files / 340 lines.</li>
            <li>Status: <span class="badge warn">Needs explicit justification</span></li>
          </ul>
          <p class="small">If complexity is unsafe, you must simplify before continuing.</p>
        </div>
      </div>
    </div>
    <div class="actions">
      <button class="btn-primary" data-action="validate-brief">Validate Brief</button>
      <button class="btn-secondary" data-action="simplify-plan">Request Simpler Plan</button>
      <span class="result-msg" data-result="plan" style="display:none;"></span>
    </div>
  `;

  container.querySelector('[data-action="validate-brief"]').addEventListener('click', () => {
    const get = f => container.querySelector(`[data-field="${f}"]`).value.trim();
    const goal = get('goal'), scope = get('scope'), nochange = get('nochange'),
          success = get('success'), nongoals = get('nongoals');
    const vague = /make it better|improve|optimize/i;
    const result = container.querySelector('[data-result="plan"]');
    result.style.display = 'inline-block';
    if (!goal || !scope || !nochange || !success || !nongoals || vague.test(goal) || vague.test(success)) {
      result.textContent = 'Blocked: brief must be specific and testable.';
      result.className = 'result-msg danger';
    } else {
      result.textContent = 'Brief passed. You may proceed to Doing.';
      result.className = 'result-msg ok';
    }
  });

  container.querySelector('[data-action="simplify-plan"]').addEventListener('click', () => {
    const result = container.querySelector('[data-result="plan"]');
    result.style.display = 'inline-block';
    result.textContent = 'Complexity Reduction requested. Plan sent back for simplification.';
    result.className = 'result-msg warn';
  });
}

// ── DO CONTENT ────────────────────────────────────────────────────────────────
function renderDoContent(container) {
  container.innerHTML = `
    <h2 class="section-title">Stay Within the Lines</h2>
    <p class="section-desc">The work pauses immediately on out-of-scope changes. No "clean up later."</p>
    <div class="grid-2">
      <div>
        <h3>Execution Plan (what was approved)</h3>
        <pre>${JSON.stringify(store.workStatus.planned, null, 2)}</pre>
        <h3>Completion Report (what actually changed)</h3>
        <pre>${JSON.stringify(store.workStatus.actual, null, 2)}</pre>
      </div>
      <div>
        <h3>Surprises &amp; Violations</h3>
        <pre>${JSON.stringify({ surprise: store.workStatus.surprise, violations: store.workStatus.violations }, null, 2)}</pre>
        <ul class="list" style="margin-top:12px;">
          <li>Success criteria: <span class="badge ok">${store.workStatus.criteria}</span></li>
          <li>Declared rules: <span class="badge ok">${store.workStatus.rules}</span></li>
          <li>Unexplained changes: <span class="badge danger">${store.workStatus.unexplained}</span></li>
          <li>Intent mapping coverage: <span class="badge warn">75% (one file unmapped)</span></li>
          <li>State: <span class="badge danger">Paused — unmapped change must be explained or removed</span></li>
        </ul>
      </div>
    </div>
  `;
}

// ── PROVE CONTENT ─────────────────────────────────────────────────────────────
function renderProveContent(container) {
  container.innerHTML = `
    <h2 class="section-title">Reconstruction Plane — Prove It</h2>
    <p class="section-desc">Read the narrative, map dependencies, answer prediction checks, and verify invariants before merge is allowed.</p>
    <div class="state-line">
      <span class="state-badge done">1. Read Change Narrative</span>
      <span class="state-badge done">2. Review Dependencies</span>
      <span class="state-badge current">3. Pass Theory Challenge</span>
      <span class="state-badge">4. Verify/Update Invariants</span>
    </div>
    <div class="grid-2">
      <div>
        <h3>1) Change Narrative</h3>
        <pre>${JSON.stringify(store.proveStatus.narrative, null, 2)}</pre>
        <h3>2) Dependency Mapping</h3>
        <ul class="list">
          ${store.proveStatus.dependencies.map(d => `<li><strong>${d.component}</strong> — ${d.impact}</li>`).join('')}
        </ul>
      </div>
      <div>
        <h3>3) Theory Challenge</h3>
        ${store.proveStatus.questions.map((q, i) => `
          <div class="inner-card">
            <strong>Q${i + 1}.</strong> ${q}
            <textarea data-answer="${i}" rows="2" placeholder="Type your answer" style="margin-top:7px;"></textarea>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="inner-card">
      <h3>4) Invariant Verification</h3>
      <p class="small">Each invariant in scope must be confirmed or updated. Unknown is not allowed.</p>
      ${store.proveStatus.invariants.map((inv, i) => `
        <div class="inner-card">
          <strong>${inv.id}</strong> — ${inv.statement}
          <div class="small" style="margin:3px 0 7px;">Owner: ${inv.owner} · Last verified: ${inv.verified}</div>
          <select data-inv="${i}">
            <option value="">Select disposition</option>
            <option value="confirmed">Confirmed unchanged</option>
            <option value="updated">Updated intentionally</option>
          </select>
        </div>
      `).join('')}
    </div>
    <div class="inner-card">
      <h3>Evidence Signals</h3>
      <ul class="list">
        <li>Prediction accuracy trend: <span class="badge warn">82% (slipping)</span></li>
        <li>Time-to-explain for payments module: <span class="badge ok">14m</span></li>
      </ul>
    </div>
    <div class="actions">
      <button class="btn-primary" data-action="grade-prove">Check Understanding</button>
      <span class="result-msg" data-result="prove" style="display:none;"></span>
    </div>
  `;

  container.querySelector('[data-action="grade-prove"]').addEventListener('click', () => {
    const invSelects = [...container.querySelectorAll('[data-inv]')].map(el => el.value);
    const answers    = [...container.querySelectorAll('[data-answer]')].map(el => el.value.trim().toLowerCase());
    const matches    = answers.filter((a, i) =>
      a && store.proveStatus.expectedHints[i].toLowerCase().split(' ').some(w => w.length > 4 && a.includes(w))
    );
    const result = container.querySelector('[data-result="prove"]');
    result.style.display = 'inline-block';
    if (invSelects.some(s => !s)) {
      result.textContent = 'Blocked: every invariant in scope must be confirmed or updated.';
      result.className = 'result-msg danger';
    } else if (matches.length < 2) {
      result.textContent = 'Blocked: theory check failed. Rebuild understanding and retry.';
      result.className = 'result-msg danger';
    } else {
      result.textContent = 'Reconstruction complete. You may proceed to Merge.';
      result.className = 'result-msg ok';
    }
  });
}

// ── MERGE CONTENT ─────────────────────────────────────────────────────────────
function renderMergeContent(container) {
  const failed = store.mergeChecks.filter(c => c.status === 'fail').length;
  container.innerHTML = `
    <h2 class="section-title">Are We Still in Control?</h2>
    <p class="section-desc">No silent drift. Every condition must be green.</p>
    ${store.mergeChecks.map(c => `
      <div class="merge-check-item">
        <span>${c.label}</span>
        <span class="badge ${c.status === 'pass' ? 'ok' : 'danger'}">${c.status.toUpperCase()}</span>
      </div>
    `).join('')}
    <div class="actions">
      <button class="btn-primary"${failed ? ' disabled' : ''}>Merge Change</button>
      ${failed ? `<button class="btn-secondary" data-action="split-change">Split this change</button>` : ''}
      <span class="result-msg warn" data-result="merge" style="${failed ? 'display:inline-block;' : 'display:none;'}">
        ${failed ? 'Paused: complexity above safe limit. Split into smaller sequential changes.' : ''}
      </span>
    </div>
  `;

  const splitBtn = container.querySelector('[data-action="split-change"]');
  if (splitBtn) {
    splitBtn.addEventListener('click', () => {
      const result = container.querySelector('[data-result="merge"]');
      result.style.display = 'inline-block';
      result.textContent = 'Split requested: return a sequence of smaller, mergeable changes with clear scope + evidence for each.';
      result.className = 'result-msg warn';
    });
  }
}

// ── NEW CHANGE OVERLAY ────────────────────────────────────────────────────────
function openNewChangeOverlay() {
  document.getElementById('overlay').classList.remove('hidden');
  renderPlanContent(document.getElementById('overlay-content'));
}

function closeNewChangeOverlay() {
  document.getElementById('overlay').classList.add('hidden');
}

// ── INIT ──────────────────────────────────────────────────────────────────────
function init() {
  renderControlPanel();
  renderTimeline();

  document.getElementById('new-change-btn').addEventListener('click', openNewChangeOverlay);
  document.getElementById('overlay-close').addEventListener('click', closeNewChangeOverlay);
  document.getElementById('overlay-backdrop').addEventListener('click', closeNewChangeOverlay);
}

init();
