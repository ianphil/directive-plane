const store = {
  view: 'dashboard',
  selectedSessionId: 'chg-1042',
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
      mode: 'Multi-agent'
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
      mode: 'Single agent'
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
      mode: 'Multi-agent'
    }
  ],
  planDraft: {
    goal: '',
    scope: '',
    doNotChange: '',
    success: '',
    nonGoals: '',
    mode: 'single',
    overlap: 'Low',
    complexity: 'Safe'
  },
  workStatus: {
    planned: ['payments/provider-x.js', 'payments/router.js', 'tests/provider-x.spec.js'],
    actual: ['payments/provider-x.js', 'payments/router.js', 'tests/provider-x.spec.js', 'payments/reconcile.js'],
    surprise: ['payments/reconcile.js'],
    violations: ['Touched file outside allowed scope. Auto-paused change.'],
    criteria: 'Pass',
    rules: 'Pass',
    unexplained: '1 item'
  },
  proveStatus: {
    narrative: {
      why: 'Provider X is added through an adapter so existing provider behavior stays unchanged.',
      architecture: 'Error normalization now happens in payments/router.js before reconciliation enqueue.',
      assumptions: 'Reconciliation worker runs every 15 minutes and pending captures are retried idempotently.'
    },
    dependencies: [
      { component: 'payments/router.js', impact: 'Now routes Provider X error map before retry queue.' },
      { component: 'payments/reconcile.js', impact: 'Reads pending Provider X captures for delayed completion.' },
      { component: 'audit/events.js', impact: 'Receives Provider X capture lifecycle events.' }
    ],
    questions: [
      'If reconciliation worker fails, what happens next?',
      'If load doubles, where does this fail first?',
      'Which rule guarantees payment events are auditable?'
    ],
    expectedHints: ['Pending state + retry loop', 'Provider timeout + queue growth', 'INV-012 audit log invariant'],
    invariants: [
      { id: 'INV-012', statement: 'Every payment operation emits an audit event.', owner: '@sam', verified: '2026-02-21' },
      { id: 'INV-018', statement: 'Retries must be idempotent across provider adapters.', owner: '@alex', verified: '2026-02-20' }
    ]
  },
  mergeChecks: [
    { label: 'Rules updated', status: 'pass' },
    { label: 'Safety assumptions verified', status: 'pass' },
    { label: 'Monitoring metrics logged', status: 'pass' },
    { label: 'Artifacts committed (brief, plan, report, reconstruction)', status: 'pass' },
    { label: 'No unresolved error state', status: 'pass' },
    { label: 'Complexity still within safe limit', status: 'fail' }
  ],
  health: [
    { label: 'Prediction accuracy', value: '82%', status: 'warn', trend: 'slipping', threshold: 'Orange < 80%' },
    { label: 'Scope breach rate', value: '11%', status: 'warn', trend: 'rising', threshold: 'Yellow > 10%' },
    { label: 'Time-to-explain', value: '14m', status: 'ok', trend: 'steady', threshold: 'Orange > 18m' },
    { label: 'Invariant staleness', value: '6 stale', status: 'danger', trend: 'rising', threshold: 'Orange > 5 stale' }
  ]
};

const app = document.getElementById('app');
const navButtons = [...document.querySelectorAll('.nav-btn')];
const newChangeBtn = document.getElementById('new-change-btn');

function chipClass(signal) {
  if (signal === 'ok') return 'chip ok';
  if (signal === 'warn') return 'chip warn';
  if (signal === 'danger') return 'chip danger';
  return 'chip info';
}

function renderDashboard() {
  app.innerHTML = `
    <section class="card">
      <h2>All Changes</h2>
      <p class="small">Plan it. Do it. Prove you understand it. Then approve.</p>
      <table class="table" id="session-table">
        <thead>
          <tr>
            <th>What we are trying to do</th>
            <th>Size</th>
            <th>Risk</th>
            <th>Stage</th>
            <th>Warnings</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          ${store.sessions.map(s => `
            <tr data-session="${s.id}">
              <td><strong>${s.id}</strong><div class="small">${s.objective}</div></td>
              <td><span class="chip info">${s.size}</span></td>
              <td><span class="chip info">${s.risk}</span></td>
              <td>${s.phase}</td>
              <td>${s.warning ? `<span class="${chipClass(s.signal)}">${s.warning}</span>` : `<span class="chip ok">Healthy</span>`}</td>
              <td>${s.owner} <span class="${chipClass(s.currency === 'Current' ? 'ok' : 'warn')}">${s.currency}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>

    <section class="grid-3">
      <article class="card">
        <h3>Start a New Change</h3>
        <p class="small">Create a brief before any agent work starts.</p>
        <div class="actions"><button class="primary" id="jump-plan">Open Planning Brief</button></div>
      </article>
      <article class="card">
        <h3>Control Role</h3>
        <p class="small">Agentic Engineer on duty: <strong>Jordan</strong></p>
        <p class="small">Halt authority: <span class="chip danger">Enabled</span></p>
      </article>
      <article class="card">
        <h3>Current Risk Signal</h3>
        <p><span class="chip warn">YELLOW</span> Watch drift and complexity.</p>
        <p class="small">Two invariants: <strong>intent gets through</strong> and <strong>understanding comes back</strong>.</p>
      </article>
    </section>
  `;

  document.querySelectorAll('#session-table tbody tr').forEach((row) => {
    row.addEventListener('click', () => {
      store.selectedSessionId = row.dataset.session;
      setView('do');
    });
  });
  document.getElementById('jump-plan').addEventListener('click', () => setView('plan'));
}

function renderPlan() {
  app.innerHTML = `
    <section class="card">
      <h2>What Are We Trying to Do?</h2>
      <p class="small">You cannot proceed with vague goals. Ambiguity is blocked on purpose.</p>
      <div class="grid-2">
        <div>
          <label>What should be true when done?</label>
          <textarea id="goal" rows="3" placeholder="One clear result."></textarea>
          <label>What parts are allowed to change?</label>
          <textarea id="scope" rows="2" placeholder="Modules/files in scope."></textarea>
          <label>What must absolutely not change?</label>
          <textarea id="nochange" rows="2" placeholder="Critical constraints."></textarea>
          <label>How will we know it worked?</label>
          <textarea id="success" rows="2" placeholder="Testable acceptance criteria."></textarea>
          <label>What are we explicitly not doing?</label>
          <textarea id="nongoals" rows="2" placeholder="Out-of-scope work."></textarea>
          <div class="card" style="margin-top:10px;">
            <h3>Context Binding (before execution)</h3>
            <ul class="list">
              <li>Affected components detected: payments/*, audit/*</li>
              <li>Recent related changes: 3 in last 7 days</li>
              <li>Invariants in scope: INV-012, INV-018</li>
            </ul>
          </div>
        </div>
        <div>
          <h3>Large / Multi-agent Breakdown</h3>
          <p class="small">Only shown when work is split across agents.</p>
          <ul class="list">
            <li>Split: API adapter, error mapping, reconciliation updates</li>
            <li>Overlap risk: <span class="chip warn">Medium</span></li>
            <li>Complexity: <span class="chip danger">Too tangled for safe supervision</span></li>
          </ul>
          <h3>Scope Gate</h3>
          <ul class="list">
            <li>Default limit: 5 files or 200 net lines.</li>
            <li>Forecast for this plan: 8 files / 340 lines.</li>
            <li>Status: <span class="chip warn">Needs explicit justification</span></li>
          </ul>
          <p class="small">If complexity is unsafe, you must simplify before continuing.</p>
        </div>
      </div>
      <div class="actions">
        <button class="primary" id="validate-brief">Validate Brief</button>
        <button class="secondary" id="simplify-plan">Request Simpler Plan</button>
      </div>
      <p id="plan-result" class="small"></p>
    </section>
  `;

  document.getElementById('validate-brief').addEventListener('click', () => {
    const goal = document.getElementById('goal').value.trim();
    const scope = document.getElementById('scope').value.trim();
    const nochange = document.getElementById('nochange').value.trim();
    const success = document.getElementById('success').value.trim();
    const nongoals = document.getElementById('nongoals').value.trim();
    const vague = /make it better|improve|optimize/i;
    const result = document.getElementById('plan-result');

    if (!goal || !scope || !nochange || !success || !nongoals || vague.test(goal) || vague.test(success)) {
      result.textContent = 'Blocked: brief must be specific and testable.';
      result.className = 'chip danger';
      return;
    }
    result.textContent = 'Brief passed. You may proceed to Doing.';
    result.className = 'chip ok';
  });

  document.getElementById('simplify-plan').addEventListener('click', () => {
    const result = document.getElementById('plan-result');
    result.textContent = 'Complexity Reduction requested. Plan sent back for simplification.';
    result.className = 'chip warn';
  });
}

function renderDo() {
  app.innerHTML = `
    <section class="card">
      <h2>Stay Within the Lines</h2>
      <p class="small">The work pauses immediately on out-of-scope changes. No “clean up later.”</p>
      <div class="grid-2">
        <div>
          <h3>Execution Plan (what was approved)</h3>
          <pre>${JSON.stringify(store.workStatus.planned, null, 2)}</pre>
          <h3 style="margin-top:10px;">Completion Report (what actually changed)</h3>
          <pre>${JSON.stringify(store.workStatus.actual, null, 2)}</pre>
        </div>
        <div>
          <h3>Surprises & Violations</h3>
          <pre>${JSON.stringify({ surprise: store.workStatus.surprise, violations: store.workStatus.violations }, null, 2)}</pre>
          <ul class="list">
            <li>Success criteria: <span class="chip ok">${store.workStatus.criteria}</span></li>
            <li>Declared rules: <span class="chip ok">${store.workStatus.rules}</span></li>
            <li>Unexplained changes: <span class="chip danger">${store.workStatus.unexplained}</span></li>
            <li>Intent mapping coverage: <span class="chip warn">75% (one file unmapped)</span></li>
            <li>State: <span class="chip danger">Paused until unmapped change is explained or removed</span></li>
          </ul>
        </div>
      </div>
    </section>
  `;
}

function renderProve() {
  app.innerHTML = `
    <section class="card">
      <h2>Reconstruction Plane — Prove It</h2>
      <p class="small">Read the narrative, map dependencies, answer prediction checks, and verify invariants before merge is allowed.</p>
      <div class="state-line" style="margin-bottom:12px;">
        <span class="state done">1. Read Change Narrative</span>
        <span class="state done">2. Review Dependencies</span>
        <span class="state current">3. Pass Theory Challenge</span>
        <span class="state">4. Verify/Update Invariants</span>
      </div>
      <div class="grid-2">
        <div>
          <h3>1) Change Narrative (architectural)</h3>
          <pre>${JSON.stringify(store.proveStatus.narrative, null, 2)}</pre>
          <h3 style="margin-top:10px;">2) Dependency Mapping</h3>
          <ul class="list">
            ${store.proveStatus.dependencies.map((d) => `<li><strong>${d.component}</strong> — ${d.impact}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h3>3) Theory Challenge (prediction, not trivia)</h3>
          ${store.proveStatus.questions.map((q, i) => `
            <div class="card" style="margin-bottom:8px;">
              <strong>Q${i + 1}.</strong> ${q}
              <input class="answer" data-i="${i}" placeholder="Type your answer" />
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card" style="margin-top:12px;">
        <h3>4) Invariant Verification</h3>
        <p class="small">Each invariant in scope must be confirmed or updated. Unknown is not allowed.</p>
        ${store.proveStatus.invariants.map((inv, i) => `
          <div class="card" style="margin-bottom:8px;">
            <strong>${inv.id}</strong> — ${inv.statement}
            <div class="small">Owner: ${inv.owner} • Last verified: ${inv.verified}</div>
            <select class="inv-status" data-i="${i}">
              <option value="">Select disposition</option>
              <option value="confirmed">Confirmed unchanged</option>
              <option value="updated">Updated intentionally</option>
            </select>
          </div>
        `).join('')}
      </div>
      <div class="card" style="margin-top:12px;">
        <h3>Evidence Signals</h3>
        <ul class="list">
          <li>Prediction accuracy trend: <span class="chip warn">82% (slipping)</span></li>
          <li>Time-to-explain for payments module: <span class="chip ok">14m</span></li>
        </ul>
      </div>
      <div class="actions">
        <button class="primary" id="grade-prove">Check Understanding</button>
      </div>
      <p id="prove-result" class="small"></p>
    </section>
  `;

  document.getElementById('grade-prove').addEventListener('click', () => {
    const invariantSelections = [...document.querySelectorAll('.inv-status')].map((el) => el.value);
    const answers = [...document.querySelectorAll('.answer')].map((el) => el.value.trim().toLowerCase());
    const matches = answers.filter((a, i) => a && store.proveStatus.expectedHints[i].toLowerCase().split(' ').some((w) => w.length > 4 && a.includes(w)));
    const result = document.getElementById('prove-result');
    if (invariantSelections.some((s) => !s)) {
      result.textContent = 'Blocked: every invariant in scope must be confirmed or updated.';
      result.className = 'chip danger';
      return;
    }
    if (matches.length < 2) {
      result.textContent = 'Blocked: theory check failed. Rebuild understanding and retry.';
      result.className = 'chip danger';
      return;
    }
    result.textContent = 'Reconstruction complete. You may proceed to Merge.';
    result.className = 'chip ok';
  });
}

function renderMerge() {
  const failed = store.mergeChecks.filter((c) => c.status === 'fail').length;
  app.innerHTML = `
    <section class="card">
      <h2>Are We Still in Control?</h2>
      <p class="small">No silent drift. Every condition must be green.</p>
      <ul class="list">
        ${store.mergeChecks.map((c) => `<li>${c.label}: <span class="${chipClass(c.status === 'pass' ? 'ok' : 'danger')}">${c.status.toUpperCase()}</span></li>`).join('')}
      </ul>
      <div class="actions">
        <button class="primary" ${failed ? 'disabled' : ''}>Merge Change</button>
        ${failed ? '<button class="secondary" id="split-change">Split this change</button>' : ''}
      </div>
      <p id="merge-result" class="small">${failed ? 'Paused: complexity above safe limit. Split into smaller sequential changes.' : 'Ready to merge.'}</p>
    </section>
  `;

  const split = document.getElementById('split-change');
  if (split) {
    split.addEventListener('click', () => {
      const result = document.getElementById('merge-result');
      result.textContent = 'Split requested: return a sequence of smaller, mergeable changes with clear scope + evidence for each.';
      result.className = 'chip warn';
    });
  }
}

function renderHealth() {
  const yellow = store.health.filter((h) => h.status === 'warn').length;
  const red = store.health.filter((h) => h.status === 'danger').length;
  const level = red ? 'RED' : (yellow ? 'YELLOW' : 'GREEN');

  app.innerHTML = `
    <section class="card">
      <h2>Are We Losing the Plot?</h2>
      <p><span class="${chipClass(red ? 'danger' : (yellow ? 'warn' : 'ok'))}">${level}</span>
      ${level === 'RED' ? 'Full stop. Rebuild understanding.' : level === 'YELLOW' ? 'Pay attention and tighten controls.' : 'System healthy.'}</p>
      <div class="grid-2">
        ${store.health.map((h) => `
          <article class="metric">
            <div><strong>${h.label}</strong></div>
            <div class="value">${h.value}</div>
            <div class="small">Trend: ${h.trend}</div>
            <div class="small">Threshold: ${h.threshold}</div>
            <div style="margin-top:8px"><span class="${chipClass(h.status)}">${h.status.toUpperCase()}</span></div>
          </article>
        `).join('')}
      </div>
      <ul class="list">
        <li>Yellow: Adverse trend for two periods → tighten gates and increase reconstruction effort.</li>
        <li>Orange: Threshold crossed in critical gauges → stop new feature work and reconstruct theory.</li>
        <li>Red: No reliable prediction for critical behavior → full stop and system-wide reconstruction.</li>
      </ul>
    </section>
  `;
}

function setView(view) {
  store.view = view;
  const url = new URL(window.location.href);
  url.searchParams.set('view', view);
  window.history.replaceState({}, '', url.toString());
  navButtons.forEach((b) => b.classList.toggle('active', b.dataset.view === view));
  if (view === 'dashboard') renderDashboard();
  if (view === 'plan') renderPlan();
  if (view === 'do') renderDo();
  if (view === 'prove') renderProve();
  if (view === 'merge') renderMerge();
  if (view === 'health') renderHealth();
}

navButtons.forEach((btn) => btn.addEventListener('click', () => setView(btn.dataset.view)));
newChangeBtn.addEventListener('click', () => setView('plan'));

const initialView = new URLSearchParams(window.location.search).get('view');
const allowedViews = new Set(['dashboard', 'plan', 'do', 'prove', 'merge', 'health']);
setView(allowedViews.has(initialView) ? initialView : 'dashboard');
