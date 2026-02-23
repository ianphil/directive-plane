# The Directive Plane — Compressed Reference
## Control Architecture for Steerable Agentic Engineering

Use this as context when prototyping implementations of the framework. Full paper available separately.

---

## Core Thesis

Agentic development introduces a novel failure mode: systems that work correctly while becoming progressively unknowable. Implementation velocity scales with compute. Comprehension velocity does not. The gap is the fundamental instability.

## Two Invariants

Everything in the architecture serves exactly two properties:

1. **Outbound Intent Fidelity** — human will reaches the machine without loss of meaning, scope, or constraint
2. **Inbound Theory Preservation** — human understanding is reconstructed from outcomes with sufficient fidelity to maintain steerability

If either fails, the system becomes unsteerable.

## Four Stocks

| Stock | Description | Behavior |
|-------|-------------|----------|
| System Complexity | Informational content of codebase | Only increases |
| Human Theory | Fidelity of human mental model | Decays without active maintenance |
| Intent Clarity | Precision of goals transmitted to agents | Degrades under pressure |
| Navigability | Ability to find/understand/modify system (Theory ÷ Complexity) | Derived ratio |

## Three Runaway Loops

- **R1 — Velocity Trap:** Complexity↑ → Navigability↓ → Intent Clarity↓ → incoherent output → Complexity↑↑
- **R2 — Trust Erosion:** Theory gap widens → can't verify → accept blindly OR reject defensively → both degenerate
- **R3 — Intent Drift:** Can't understand system → intent detaches from reality → correct execution against wrong model

Damage is delayed. System works for months while Theory drains. Failure = inability to change direction, not a crash.

## Five Leverage Points (Minimal Stabilizing Set)

All five required. Removing any one causes cascading degradation.

| # | Leverage Point | What It Does |
|---|---------------|--------------|
| LP1 | Make intent violations visible | Automatic detection of divergence between stated intent and actual output |
| LP2 | Force theory reconstruction | Human must rebuild understanding after each change, not just acknowledge |
| LP3 | Limit change magnitude | Scope bounded unless explicitly expanded with justification |
| LP4 | Preserve reasoning capability | Prevent atrophy of human ability to perform LP1-3 and LP5 |
| LP5 | Structure intent explicitly | Intent captured in falsifiable, machine-parseable artifacts before execution |

**Dependency structure:** LP5 missing → LP1 impossible. LP4 missing → LP2/LP3 become performative. LP3 missing → LP2 intractable.

## Risk Gradient

Leverage points are invariant. Implementation intensity scales with consequence:

- **Consequential** (finance, medical, defense): Full implementation, dedicated Agentic Engineer, formal thresholds, audited Theory Challenges
- **Professional** (production SaaS, enterprise): All LPs present but lighter — briefs less formal, challenges in PR review, one person owns the loop as a hat
- **Exploratory** (prototypes, personal): LPs collapse into habits — scratchpad intent, read before committing, pause when you don't understand

Gradient scales intensity, not applicability.

## Three-Plane Architecture

```
┌─────────────────────────────────────────┐
│         DIRECTIVE PLANE                  │
│  Intent structured, validated, scoped,   │
│  routed. Serves outbound intent fidelity │
├─────────────────────────────────────────┤
│         EXECUTION PLANE                  │
│  Agents write code, run tests, produce   │
│  changes. The data plane. Does the work. │
├─────────────────────────────────────────┤
│       RECONSTRUCTION PLANE               │
│  Theory flows back. Change Narratives,   │
│  Theory Challenges, Invariant checks.    │
│  Serves inbound theory preservation.     │
└─────────────────────────────────────────┘
```

Borrowed from networking: control plane / data plane separation. When control plane fails, data plane keeps forwarding on stale state — system works but stops being steerable.

### Directive Plane Flow
1. **Intent Capture** — Goal, constraints, scope, acceptance criteria, non-goals (the Intent Brief)
2. **Context Binding** — Brief enriched with current system state automatically
3. **Scope Verification** — Agent proposes plan, checked against brief before execution
4. **Bounded Execution** — Out-of-scope modification requires explicit authorization
5. **Completion Signal** — Structured report mapping actions to intent

### Directive Plane Artifacts
- **Intent Brief** — machine-parseable spec of goal/constraints/scope/acceptance
- **Execution Plan** — agent-generated, reviewed before work begins
- **Completion Report** — maps actions to intent, flags deviations

### Reconstruction Plane Flow
1. **Change Narration** — Architectural-level explanation (not a diff summary)
2. **Theory Challenge** — Prediction-based questions testing genuine understanding
3. **Dependency Mapping** — Shows what else is affected by the change
4. **Invariant Verification** — Confirm or update system invariants

### Reconstruction Plane Artifacts
- **Change Narrative** — why it changed, what it affects, at architectural level
- **Theory Challenges** — falsifiable prediction questions
- **Invariant Register** — living doc of system properties, owner, last-verified date

## Instrumentation

### The Falsifiability Principle
A control artifact has integrity only when it makes claims checkable against reality. Acknowledgment-only artifacts are worthless as controls.

### Goodhart's Law Defense
When a measure becomes a target, it ceases to be a good measure. If Time-to-Explain drops while Complexity rises, assume the instrument is broken. Theory Challenges must carry genuine risk of failure. Adversarial calibration is the Agentic Engineer's primary operational duty.

### Four Gauges

| Gauge | Reads Stock | How Collected | Alarm Signal |
|-------|-------------|---------------|--------------|
| Prediction Accuracy | Human Theory | Track Theory Challenge correctness over time | Declining rate |
| Scope Breach Rate | Complexity control | % changes exceeding declared scope, weekly | Rising rate |
| Time-to-Explain | Navigability | Random subsystem, measure time + completeness | Increasing time |
| Invariant Staleness | System properties | Age since last verification/update | Growing backlog |

### Failure Thresholds

- **🟡 Yellow:** Adverse trend on 1+ gauges over 2 periods → increase reconstruction effort, tighten gates
- **🟠 Orange:** Prediction accuracy or Time-to-Explain past threshold for critical subsystems → halt new agent feature work, dedicate to reconstruction
- **🔴 Red:** No one can predict critical subsystem behavior, or invariant violations found in production → full stop, system-wide reconstruction (reactor SCRAM equivalent)

## The Agentic Engineer

Role accountable for the control loop, not the code:
- **Owns the loop** — steerability of the system, not features
- **Reads the gauges** — monitors all four, knows current state
- **Has halt authority** — can slow/stop agent work when controls degrade (must be real authority, not advisory)
- **Maintains signal integrity** — ensures artifacts stay falsifiable, challenges stay hard, controls don't become ritual

Scale: hat on a senior engineer (small teams) → full-time role (consequential systems). Accountability is not optional.

## Practices (Adoption Order)

### 1. Intent Brief (LP5) — Low friction
```
Goal:        What should be true when done?
Scope:       Which components/files may be modified?
Constraints: What must not change?
Non-goals:   What is explicitly out of scope?
Acceptance:  How will I verify correctness?
```
2–5 min. Lives in repo alongside changes.

### 2. Scope Gate (LP3) — Low friction
Default threshold: 200 lines net change OR 5 files, whichever first. Exceeding requires explicit justification. Pre-commit hook, CI check, or social contract.

### 3. Change Narrative (LP2) — Medium
Agent produces architectural-level explanation + at least one Theory Challenge. Human must answer correctly or engage with code until they can.

### 4. Invariant Tracking (LP1) — Medium
Markdown file in repo root. Humans register invariants. Automated check on every change to registered components. Example:
```
INV-007: Session tokens never transmitted outside service mesh boundary.
Owner: @engineer | Verified: 2026-02-15 | Components: auth/*, gateway/*
```

### 5. Cognitive Maintenance (LP4) — High (cultural)
Weekly/biweekly, without agent assistance:
- Code archaeology sessions (explain agent-modified module to peer)
- Manual bug fixes
- Invariant audits
- Theory reconstruction from scratch (write what you believe, compare to code, measure gap)

### Adoption Timeline
- Week 1–2: Intent Briefs
- Week 3–4: Scope Gates
- Month 2: Change Narratives + Theory Challenges
- Month 3: Invariant Tracking (start with 10–15)
- Month 4+: Cognitive Maintenance Rotation

## Multi-Agent Orchestration Extensions

Multi-agent systems (agents delegating to agents, A2A protocols) make the five leverage points necessary but no longer sufficient.

### New Failure Modes
- **Intent Transformation Chain:** Intent passes through n hops of LLM interpretation. Each hop is lossy. Losses compound. Human controls first hop only.
- **Compositional Incoherence:** Agent A and Agent B each produce correct output. Combined output is systemically wrong (conflicting assumptions).
- **Scope Partition Conflicts:** Overlapping partitions, implicit scope expansion (orchestrator grants without human), transitive effects across agent boundaries.
- **Hidden Supervisory Layer:** Orchestrator makes decomposition decisions that shape all downstream behavior but are not subject to the same controls.

### New Mechanisms
- **Intent Contract** (evolves from Intent Brief): Carries original human intent + constraints as immutable context through agent chains. Each hop checks against root contract, not just parent instructions.
- **Composition Narrative** (extends Change Narrative): Explains how multiple agents' outputs interact and what emergent properties arise. Orchestrator produces this but is both architect and auditor (segregation-of-duties violation — requires independent verification).
- **Orchestration-Level Scope Gates:** Detect overlapping partitions, flag transitive dependencies, make agent-to-agent scope negotiations visible to humans.

### Additional Gauges

| Gauge | What It Measures | Alarm |
|-------|------------------|-------|
| Intent Propagation Fidelity | Semantic distance: root intent → leaf sub-briefs | Growing distance at deeper layers |
| Cross-Agent Context Consistency | Agreement between sibling agents' context | Contradictory assumptions |
| Decomposition Coherence | Orchestrator coverage of original intent | Gaps or redundant sub-tasks |
| Composition Verification Rate | % multi-agent outputs checked for emergent behavior | Declining rate |

### The Complexity Ceiling
It is a mathematical certainty that multi-agent orchestration will exceed human theory reconstruction capacity. When this ceiling is breached:

- **Phase shift required:** Human-in-the-loop → human-over-the-loop
- Human supervises adversarial monitoring agents, not execution directly
- **Common-mode failure risk:** If monitoring agents share LLM biases with execution agents, the control loop is illusory
- Verification agents must be structurally adversarial: different models, different context, rewarded for finding incoherence
- The Agentic Engineer's ultimate job: designing the system that watches the system

## Cross-Domain Control Principles

| Principle | Aviation | Finance | Nuclear | Agentic Engineering |
|-----------|----------|---------|---------|---------------------|
| Make state visible | Mode annunciation | Mark-to-market | Control room displays | Intent violation detection |
| Force understanding | Type ratings, recurrent training | Stress testing | Procedure + physics training | Theory challenges |
| Bound magnitude | Envelope protection | Position limits | Conservative decision making | Scope constraints |
| Prevent atrophy | Manual flying requirements | Segregation of duties | Simulator training | Cognitive maintenance |
| Declare intent | Flight briefs, clearances | Trade documentation | Shift turnover briefs | Intent documents |

## Failure Mode Summary (If Leverage Point Removed)

| Removed | Pattern | Trajectory |
|---------|---------|------------|
| LP1 | Silent Drift | System diverges from intent without signal |
| LP2 | Cargo Cult Operation | Humans direct agents but can't explain system |
| LP3 | Comprehension Overflow | Changes exceed review capacity, humans stop trying |
| LP4 | Skill Atrophy Spiral | All other controls become performative ritual |
| LP5 | Ambient Delegation | No basis for any other control to function |

---

## Key Phrases

- "Speed without steerability is not velocity. It is ballistic trajectory."
- "The controls are not the tax on velocity. Theory loss is the tax on velocity."
- "Unbounded multi-agent orchestration applied to consequential systems without independent verification layers is structurally unsafe."
- "The frontier of agentic engineering is not building larger swarms. It is building the defense-in-depth verification architectures that allow us to survive them."
