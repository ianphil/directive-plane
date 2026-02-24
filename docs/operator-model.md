# The Operator Model

## Adaptive Execution Modes and Competency-Gated Agent Access

The Execution Plane adapts its behavior based on *who is operating it*, not just *what system* they're operating on. Operator capability is two-dimensional — craft maturity (general engineering skill) × system familiarity (knowledge of this specific codebase). These are orthogonal. A senior joining a new team has high craft but low system familiarity. A junior who has been on a team for a year has growing system familiarity but low craft maturity. The Execution Plane has multiple modes that the protocol selects based on operator capability, with a circuit breaker that can demote any operator when their theory gauges degrade.

---

## Operator Capability Model

### Two Axes

**Craft Maturity** — general engineering judgment, domain expertise, ability to reason about architecture, concurrency, failure modes, security. Accumulated across a career, not specific to any codebase.

**System Familiarity** — fidelity of the operator's mental model of *this* system. Its invariants, coupling patterns, historical decisions, undocumented conventions. Accumulated through direct engagement with the codebase. Resets to zero on a new team or unfamiliar subsystem.

### Per-Subsystem Currency

System familiarity is not uniform across a codebase. An operator can be deeply fluent in one module and completely unfamiliar with another. Currency is tracked per-subsystem:

```
operator_craft_level: SENIOR
operator_system_familiarity: ESTABLISHED
operator_subsystem_currency:
  payments/*: CURRENT (last verified: 2026-02-10)
  notifications/*: UNFAMILIAR
  auth/*: LAPSED (last verified: 2026-01-05)
```

The protocol adjusts gates and challenges based on the subsystem being modified, not just the operator's global status.

---

## Execution Modes

### SOCRATIC Mode (Bound for Juniors, Optional for Seniors)

In Socratic mode, the agent's role inverts. It does not implement. It *teaches* by generating challenges and tests, and the operator writes the code.

- The agent produces the Execution Plan (EE.pre) but does not execute it
- Instead, the agent generates **failing tests** derived from the IC's acceptance criteria, constraints, and invariants
- The operator writes the implementation to make the tests pass
- The agent reviews the operator's code — not to fix it, but to challenge: "What happens when this input is null?" or "You handled the happy path, but the IC constraint says retry logic must be preserved — where is your test for retry failure?"
- Prediction Probes at G5 are explanatory — the operator has genuine theory because they *built* the implementation

**Binding rules:**
- Operators below a craft maturity threshold are **bound** to Socratic mode. It is not optional.
- Operators above the threshold can **opt in** to Socratic mode voluntarily (e.g., working in an unfamiliar subsystem).

### RESTRICTED Mode (Agent Tests, Operator Implements)

In RESTRICTED mode, the agent writes the tests but the operator writes the implementation. This mode is shared across two entry paths — see "The Circuit Breaker" and "Senior Onboarding Mode" below. It is also the default for APPRENTICE_1 on CONSEQUENTIAL and PROFESSIONAL systems.

### STANDARD Mode (Current CFP)

The existing protocol behavior. Agent executes, produces Design Rationale, operator passes Prediction Probes. No changes to current gates or artifacts.

---

## Execution Mode × Risk Tier Matrix

Execution modes are not applied uniformly. The risk tier of the system modifies which modes are enforced.

**Principle:** EXPLORATORY systems are low-stakes by definition — the cost of rebuilding from scratch is low. The protocol does not enforce restrictions that protect systems that don't need protecting. EXPLORATORY is the sandbox where operators can use the agent freely, experiment, and build intuition without the full scaffold.

**Constraint:** EXPLORATORY agent access does not count toward progression or recovery. An APPRENTICE_2 shipping agent code on a prototype proves nothing about their readiness for JOURNEYMAN on a production system. An operator in RESTRICTED who uses agents freely on EXPLORATORY doesn't earn recovery credit — recovery requires demonstrated theory rebuilding on the system where theory was lost.

| Level | CONSEQUENTIAL | PROFESSIONAL | EXPLORATORY |
|-------|--------------|--------------|-------------|
| **APPRENTICE_1** | Socratic — full scaffold (bound) | Socratic — full scaffold (bound) | Socratic — full scaffold (bound) |
| **APPRENTICE_2** | Socratic — tutor only (bound) | Socratic — tutor only (bound) | **Standard — full agent access** |
| **JOURNEYMAN** | Standard + elevated challenges (+1) | Standard + elevated challenges (+1) | Standard |
| **ENGINEER** | Standard | Standard | Standard |
| **RESTRICTED** | Agent writes tests, operator implements | Agent writes tests, operator implements | **Standard — full agent access** |
| **ONBOARDING (senior)** | Agent writes tests, operator implements | Agent writes tests, operator implements | **Standard — full agent access** |

**Multi-agent orchestration access:**

| Level | CONSEQUENTIAL | PROFESSIONAL | EXPLORATORY |
|-------|--------------|--------------|-------------|
| **APPRENTICE_1** | ❌ | ❌ | ❌ |
| **APPRENTICE_2** | ❌ | ❌ | ❌ |
| **JOURNEYMAN** | ❌ | ❌ | ✅ |
| **ENGINEER** | ❌ | ✅ | ✅ |
| **RESTRICTED** | ❌ | ❌ | ✅ |
| **ONBOARDING (senior)** | ❌ | ❌ | ✅ |

Multi-agent is **never allowed on CONSEQUENTIAL systems** — the compositional incoherence risk is too high. On PROFESSIONAL, only ENGINEER has the demonstrated system mastery for orchestration. On EXPLORATORY, any operator with agent access (JOURNEYMAN+, RESTRICTED, ONBOARDING) can use multi-agent.

### Key Decisions

- **APPRENTICE_1 is bound everywhere.** At this stage they haven't written their own tests yet. They need the full scaffold even on prototypes — the fundamentals aren't built yet.
- **APPRENTICE_2 gets EXPLORATORY access.** They've demonstrated test design skill. Letting them use the agent on low-stakes work gives them early exposure to reviewing agent output — the skill they'll need at JOURNEYMAN — without risk to real systems.
- **RESTRICTED and ONBOARDING get EXPLORATORY access.** The circuit breaker and onboarding restrictions exist to rebuild theory on *specific systems*. Blocking agent access on throwaway prototypes would be punitive, not protective.

---

## Progression Ladder

The Socratic mode is not static. It has internal stages where scaffolding is progressively removed as the operator demonstrates competence. The progression inverts the operator's relationship with the agent — from "agent tests me, I implement" to "agent implements, I verify the agent."

### Stage 1 — Full Scaffold (APPRENTICE_1)

| Aspect | Behavior |
|--------|----------|
| **Agent role** | Test oracle + tutor |
| **Tests written by** | Agent (from IC) |
| **Implementation by** | Operator |
| **Agent coaching** | Active — explains reasoning, suggests approaches, challenges gaps |
| **Theory source** | Operator holds theory by construction (they built it) |

The operator is learning what good tests look like, how acceptance criteria map to code, and how to implement against constraints. Maximum support.

### Stage 2 — Tutor Only (APPRENTICE_2)

| Aspect | Behavior |
|--------|----------|
| **Agent role** | Tutor (no test generation) |
| **Tests written by** | Operator |
| **Implementation by** | Operator |
| **Agent coaching** | Active — reviews tests and code, challenges coverage gaps |
| **Theory source** | Operator holds theory by construction |

The agent stops writing tests. The operator must develop their own sense of what to test — edge cases, failure modes, invariant preservation. The agent can silently generate its own test suite and compare it against the operator's to measure the **test quality gap** (a new gauge).

### Stage 3 — Elevated Review (JOURNEYMAN)

| Aspect | Behavior |
|--------|----------|
| **Agent role** | Executor (standard), reviewed by operator |
| **Tests written by** | Agent |
| **Implementation by** | Agent |
| **Agent coaching** | Inactive — operator must reconstruct without guidance |
| **Theory source** | Operator reconstructs from agent output (with +1 challenge above ENGINEER count per risk tier) |

The operator transitions to the *review* side. The agent implements. But Prediction Probes are more numerous than they would be for an ENGINEER-level operator — JOURNEYMAN gets +1 challenge above the ENGINEER count for the risk tier (CONSEQUENTIAL: 4 vs. 3, PROFESSIONAL: 3 vs. 2). Challenge difficulty stays calibrated to the subsystem, not the operator level. The additional volume forces more reconstruction practice — this is the training ground for the skill of reconstructing theory from agent output, the core competency of the senior workflow.

### Stage 4 — Standard (ENGINEER)

Standard CFP. Full agent execution, normal Prediction Probe requirements, Socratic mode available on-demand.

---

## Progression Criteria

Stage transitions are **evidence-based, not time-based.** The gauges provide the evidence; the preceptor makes the call.

| Signal | What It Indicates |
|--------|-------------------|
| **Prediction Accuracy** | Rolling pass rate on Prediction Probes trending above threshold across N consecutive changes |
| **Prediction Probe depth** | Operator answers are explanatory, not just correct — they demonstrate reasoning, not recall |
| **Test quality gap** (Stage 2) | Operator-written tests converge toward agent-generated baseline in coverage and edge-case detection |
| **Subsystem breadth** (JOURNEYMAN, ENGINEER) | Demonstrated currency across a minimum number of the system's subsystems — prevents permanent specialization at senior levels |
| **Preceptor attestation** | Human mentor reviews the Socratic trail and signs off on readiness for next stage |

No algorithm promotes an operator. The protocol provides evidence. A human (the preceptor) decides.

---

## The Circuit Breaker: Theory-Gated Agent Access

Prediction Probe performance is not just a gauge — it is a **circuit breaker**. When an operator's Prediction Accuracy drops below a threshold, agent execution privileges are automatically restricted. This applies to *all* operators at *every* level, not just juniors. The restriction applies on CONSEQUENTIAL and PROFESSIONAL systems only — EXPLORATORY systems retain full agent access (see the Execution Mode × Risk Tier Matrix above).

### Prediction Probe Scoring and the Rolling Window

Each change produces a **Prediction Accuracy score** that feeds the rolling window. The score is determined by the Prediction Probe outcome at G5:

| Outcome | Score | What Happens |
|---------|-------|--------------|
| Pass on first attempt | 1.0 | Change proceeds to G6 |
| Pass on second attempt | 0.5 | THEORY_FAILURE fired and recovered — change proceeds |
| Pass on third attempt | 0.25 | THEORY_FAILURE fired and recovered — change proceeds |
| Fourth attempt (fail) | 0.0 | Agentic Engineer is dispatched to understand the change and approve merge |

**Decay logic.** The score halves with each failed attempt. This rewards operators who reconstruct theory quickly while still giving credit for eventual understanding. The decay creates a real consequence for failing — even a second-attempt pass drags the rolling average down, making the circuit breaker progressively more likely to fire.

**Fourth-attempt escalation.** If the operator fails three consecutive challenges on the same change, the protocol stops retrying. The Agentic Engineer reviews the change directly — they reconstruct the theory themselves, verify the change is safe, and approve the merge. The 0.0 score is recorded in the rolling window regardless. This prevents a change from being blocked indefinitely while ensuring someone with sufficient judgment verifies it before it ships.

**Multiple challenges per change.** When a risk tier requires multiple challenges (e.g., CONSEQUENTIAL = 3), each challenge follows the decay independently. The change's score in the rolling window is the **minimum** across all challenges — the weakest understanding determines the score. An operator who aces two challenges but needs three attempts on the third scores 0.25 for that change, not the average.

### Mechanism

Prediction Accuracy is tracked as a rolling window per-operator per-subsystem. The restriction is **global** (simple state machine), but the trigger and recovery are **scoped** to the subsystem(s) where theory degraded.

When Prediction Accuracy drops below the threshold for *any* subsystem:

1. `operator_currency` transitions from CURRENT → **RESTRICTED** globally. The triggering subsystem(s) are recorded in `circuit_breaker.triggered_by`.
2. In RESTRICTED, the agent cannot execute implementation on *any* subsystem — but it **still writes the tests**. The agent generates failing tests from the IC's acceptance criteria and invariants, and the operator writes the implementation to make them pass.
3. The operator codes by hand. This forces the deep engagement with the codebase that rebuilds theory.
4. The operator can work on any subsystem under RESTRICTED mode, but **recovery credit only accrues from the triggering subsystem(s)**. Work on unrelated subsystems is productive (the team still gets value) but does not count toward restoring agent access.
5. Prediction Probes continue on the operator's manual changes. When Prediction Accuracy on the triggering subsystem(s) recovers above the recovery threshold across the hybrid window (N changes over minimum time floor) AND the preceptor approves, currency restores to CURRENT globally.

**Why global restriction with scoped recovery.** Per-subsystem restriction would be more precise but creates a parallel state machine — each subsystem carrying its own CURRENT/RESTRICTED/SUSPENDED track, with split-mode handling for changes that span subsystems. Global restriction keeps the state machine simple and conservative: if your theory is degraded somewhere, the amplifier is removed everywhere. But the protocol knows *where* to send you to rebuild — recovery requires demonstrated improvement on the specific subsystem(s) that triggered the breaker, not just any subsystem work.

### Why RESTRICTED Is Not APPRENTICE

The circuit breaker is about *stretching your legs* — getting back into the implementation details, typing code, re-engaging with the system at the level where theory is built. It is not a demotion to the junior learning track. An operator who trips the circuit breaker already knows how to write tests — they proved that during progression. Making them re-learn test design would be punitive, not protective.

The distinction:
- **APPRENTICE_2 (junior):** Must write tests *and* implementation. The goal is learning what to test — developing the instinct for edge cases, failure modes, coverage. This is a skill they haven't built yet.
- **RESTRICTED (circuit breaker):** Agent writes the tests, operator writes the implementation. The goal is rebuilding system theory through hands-on coding. The operator already has test design skill; what they've lost is direct familiarity with the code. The tests guide them back in without adding unnecessary friction.

### State Machine (Extended)

```
                    ┌──────────────────────────────────────┐
                    │                                      │
APPRENTICE_1 ──→ APPRENTICE_2 ──→ JOURNEYMAN ──→ ENGINEER │
                    │                                      │
                    │    (any level, theory drops)          │
                    │              │                        │
                    │              ▼                        │
                    │         RESTRICTED ──(recovery)──→ restore previous level
                    │              │                        │
                    │    (prolonged failure: 2× window      │
                    │     + no sustained improvement)       │
                    │              │                        │
                    │              ▼                        │
                    │         SUSPENDED ──(preceptor path   │
                    │         + gauge recovery)──→ RESTRICTED ──→ restore
                    │                                      │
                    └──────────────────────────────────────┘
```

### SUSPENDED State

SUSPENDED is the escalation when self-directed recovery under RESTRICTED fails. It is not removal from the team — it is closer mentorship with tighter constraints.

**Trigger (automatic):** An operator transitions from RESTRICTED → SUSPENDED when they have been RESTRICTED for 2× the recovery window (default: 2 × 14 days = 28 days minimum) AND Prediction Accuracy on the triggering subsystem(s) has not shown sustained improvement (no upward trend across the window). The time floor prevents premature escalation; the gauge check prevents punishing someone who is improving slowly. A RESTRICTED operator whose accuracy is trending upward stays RESTRICTED regardless of elapsed time.

**Operational behavior:** SUSPENDED is RESTRICTED with tighter constraints and direct preceptor involvement:

| Aspect | RESTRICTED | SUSPENDED |
|--------|-----------|-----------|
| **Agent role** | Writes tests, operator implements | Same — writes tests, operator implements |
| **Scope gates** | Standard for operator level | Tighter — smaller blast radius for each change |
| **Preceptor involvement** | Trail review (async) | Paired on every change (direct mentorship) |
| **Work routing** | Operator chooses work, recovery credit scoped to triggering subsystem(s) | Preceptor designs structured recovery path — specific subsystems, specific change types |
| **EXPLORATORY access** | Full agent access | Full agent access (unchanged) |

**Recovery (two-step):** SUSPENDED recovery exits to RESTRICTED first, not directly to CURRENT. The operator must then complete normal RESTRICTED recovery to regain agent access.

1. **SUSPENDED → RESTRICTED:** Preceptor designs a structured recovery path (targeted subsystems, change types, possibly paired sessions). Recovery requires Prediction Accuracy on the triggering subsystem(s) reaching a preceptor-defined intermediate threshold AND preceptor attestation that the operator has genuinely rebuilt theory. The preceptor makes the call — the gauges provide evidence, not a verdict.
2. **RESTRICTED → CURRENT:** Normal RESTRICTED recovery — Prediction Accuracy exceeds recovery threshold (0.8) across the hybrid window on the triggering subsystem(s), plus preceptor approval.

**Why two-step recovery.** An operator who failed to self-recover under RESTRICTED should not jump straight to full agent access when they start improving. The intermediate step (back to RESTRICTED, self-directed recovery) confirms that the improvement holds without the tighter SUSPENDED scaffolding.

### Why Automatic, Not Voluntary

The current framework's LP4 (Cognitive Maintenance) is a *cultural* practice — "dedicate regular time for manual engagement." The Directive Plane acknowledges this meets the highest resistance because it appears to reduce velocity. Teams skip it under deadline pressure.

The circuit breaker makes LP4 **involuntary and automatic.** It is not "we think you should code manually this week." It is "the protocol detected your theory is degraded — agent execution is suspended until it recovers." The system measured a state and responded. Same as a trading floor's position limits: you don't negotiate with the risk system, it cuts you off.

**The cultural signal:** Agent access is not a right. It is a privilege maintained by demonstrating comprehension. Like a pilot's type rating or a trader's risk authorization.

### Circuit Breaker Calibration

The protocol defines default thresholds. Organizations can override them — the Agentic Engineer recommends adjustments, the preceptor agrees (since threshold changes affect the learning loop).

**Default thresholds:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `restriction_threshold` | 0.6 | Prediction Accuracy below this triggers RESTRICTED |
| `recovery_threshold` | 0.8 | Prediction Accuracy must exceed this to restore agent access |
| `window_changes` | 10 | Minimum number of changes in the rolling window |
| `window_time_floor` | 14 days | Minimum time span the window must cover |
| `suspension_time` | 28 days | Minimum time in RESTRICTED before SUSPENDED escalation (2× window_time_floor) |
| `suspension_trend` | no upward trend | SUSPENDED only triggers if Prediction Accuracy is not trending upward across the window |

**Hysteresis.** The recovery threshold (0.8) is deliberately higher than the restriction threshold (0.6). This prevents flapping — an operator hovering around 0.6 doesn't bounce in and out of RESTRICTED on every change. They must demonstrate sustained improvement to recover.

**Hybrid window.** The rolling window requires both a minimum number of changes AND a minimum time span. "Last 10 changes, but the window must span at least 14 days." This prevents two gaming vectors:
- **Rushing recovery:** An operator can't blast through 10 trivial changes in a day to hit the recovery threshold. The time floor ensures the recovery reflects sustained work over a meaningful period.
- **Thin samples:** A single pass or fail on a thin window doesn't swing the metric. The change count ensures statistical significance.

**Recovery requires preceptor approval.** Hitting the recovery threshold is necessary but not sufficient. The preceptor must also approve the transition out of RESTRICTED. This adds human judgment to the quantitative signal — the preceptor can see whether the recovery reflects genuine theory rebuilding or pattern-gaming.

**Recovery velocity monitoring.** The preceptor (engineering manager) monitors whether a RESTRICTED operator is making recovery-eligible changes on the triggering subsystem(s). An operator who avoids recovery work — e.g., spending all time on EXPLORATORY repos or unrelated subsystems — is not gaming the system (EXPLORATORY work doesn't earn recovery credit), but they are not recovering either. The preceptor raises this with the operator and adjusts work assignments as needed. This is a management responsibility, not a protocol mechanism — the protocol provides visibility (scoped trigger, recovery credit tracking), the preceptor acts on it.

**Thresholds are uniform across CONSEQUENTIAL and PROFESSIONAL.** The risk tier already controls other knobs (scope gates, challenge count, verifier requirements). The circuit breaker threshold measures operator comprehension, which is either sufficient or it isn't — the system's risk level doesn't change what "understanding" means. EXPLORATORY is exempt from the circuit breaker entirely.

**Override authority.** The Agentic Engineer may recommend threshold adjustments for their team based on observed behavior (e.g., a highly complex system where 0.6 is too lenient, or a team where 0.8 recovery is creating prolonged RESTRICTED states that impede work). The preceptor must agree to the change. Overrides are logged and auditable.

### Escalation Override

An escalation authority (engineering director or above) can temporarily restore agent access for a RESTRICTED or SUSPENDED operator. The override does not heal the circuit breaker — it suspends enforcement. Rules:

- **Time-boxed.** The override has a defined expiration (e.g., 5 business days). When it expires, the operator's actual Prediction Accuracy determines their state — if still below threshold, they return to RESTRICTED.
- **Written justification required.** The escalation authority must document why the override is necessary and what risk they are accepting. This becomes part of the auditable record.
- **Scores continue accruing.** Prediction Probes still happen during the override period. Failures still record 0.0 (or the appropriate decay score) in the rolling window. The override grants agent access, not a gauge holiday.
- **Logged and auditable.** The override, its justification, its duration, and the operator's Prediction Accuracy during the override period are all recorded. Frequent overrides for the same operator or team are a signal that the organization is understaffed or the thresholds need recalibration — not that the circuit breaker should be routinely bypassed.
- **Does not reset recovery.** When the override expires, recovery progress resumes from where it was. The override period's scores feed the rolling window normally.

This mirrors safety-critical domains: overrides exist but are expensive, visible, and create accountability. An organization that routinely overrides the circuit breaker is exhibiting the same pattern as a nuclear plant that routinely overrides safety interlocks — the override mechanism is not the problem; the pressure to use it is.

---

## Senior Onboarding Mode

A senior engineer joining a new team is senior in the craft but junior in the system. Putting them straight into STANDARD mode means they direct agents through a system they don't understand — the "intent specified against a stale mental model" failure mode (R3 Intent Drift).

Senior onboarding uses the same RESTRICTED mode as the circuit breaker — agent writes the tests, operator writes the implementation. The reasoning is the same: the senior already has craft maturity and test design skill. What they lack is system familiarity. Implementing by hand against agent-generated tests forces them to engage directly with the codebase and build theory for *this* system.

| Aspect | Behavior |
|--------|----------|
| **Execution mode** | RESTRICTED — agent writes tests, operator implements |
| **Scope gates** | Tighter than normal — smaller blast radius for cheaper theory reconstruction on an unfamiliar codebase |
| **Agent pre-execution** | Surfaces invariants and coupling for the target subsystem before execution: "This module has 3 invariants. INV-007 is the one people trip on." |
| **Prediction Probes** | System-specific, not craft-specific: "Why does this service validate tokens in the sidecar instead of the gateway?" not "What is mTLS?" |
| **Guided archaeology** | Agent narrates the history of the subsystem being modified: prior refactors, the problems they solved, the invariants they introduced |
| **Graduation** | System familiarity gauges (Prediction Accuracy, Explanation Latency, Invariant Awareness) hit threshold for the relevant subsystems |

This makes RESTRICTED a shared mode with two entry paths: circuit breaker (theory degradation) and senior onboarding (system unfamiliarity). The experience is the same — agent tests, operator implements — but the reason you're there differs. (APPRENTICE_1 in Socratic mode is mechanically similar — agent writes tests, operator implements — but includes active coaching, making it a distinct mode.)

---

## Repository Designation and Merge Gates

The risk tier is a property of the **repository**, not just the change. Repositories are designated as either **production** (CONSEQUENTIAL/PROFESSIONAL) or **non-production** (EXPLORATORY). The merge gate (G6) checks operator level against repo designation.

**Rule:** Only JOURNEYMAN and above can merge agent-generated code into production repositories. APPRENTICE_2, RESTRICTED, and ONBOARDING operators can experiment with agents on feature branches in production repos but **cannot merge** agent-generated code. They can merge freely in non-production repos.

| Level | Production Repo (merge agent code) | Production Repo (merge own code) | Non-Production Repo |
|-------|-----------------------------------|----------------------------------|---------------------|
| **APPRENTICE_1** | ❌ No agent access | ✅ Yes (Socratic — they wrote it) | ✅ Yes (Socratic — they wrote it) |
| **APPRENTICE_2** | ❌ Blocked | ✅ Yes (Socratic — they wrote it) | ✅ Yes (agent or own code) |
| **JOURNEYMAN** | ✅ Yes | ✅ Yes | ✅ Yes |
| **ENGINEER** | ✅ Yes | ✅ Yes | ✅ Yes |
| **RESTRICTED** | ❌ Blocked | ✅ Yes (they wrote it) | ✅ Yes (agent or own code) |
| **ONBOARDING (senior)** | ❌ Blocked | ✅ Yes (they wrote it) | ✅ Yes (agent or own code) |

**G6 extension predicates:**

```
G6 additional predicates:
  IF repo.designation ∈ {PRODUCTION}
  AND change contains agent-generated implementation
  AND operator.progression_stage ∉ {JOURNEYMAN, ENGINEER}
  THEN → MERGE_BLOCKED

  IF repo.designation ∈ {PRODUCTION}
  AND risk_tier = EXPLORATORY
  THEN → MERGE_BLOCKED
```

### Key Implications

- **EXPLORATORY tier never ships to production.** Regardless of operator level, changes made under EXPLORATORY risk tier cannot merge to production repos. EXPLORATORY means lighter scope limits, fewer challenges, and optional verifiers — controls too loose for production-bound code. An ENGINEER who wants to explore on a feature branch in a production repo can use EXPLORATORY tier freely, but must re-execute the change under PROFESSIONAL or CONSEQUENTIAL tier to merge.
- **Operator-written code always merges (at appropriate tier).** If you wrote it under Socratic mode (APPRENTICE_1/2) or RESTRICTED mode, you built the theory — the code is yours. The merge gate only blocks agent-generated implementation (for sub-JOURNEYMAN operators) and EXPLORATORY-tier changes.
- **Feature branches in production repos are fine.** APPRENTICE_2 and RESTRICTED operators can use agents on branches to experiment, learn, and build familiarity. The branch is a learning artifact, not a shipping vehicle.
- **Non-production repos are unrestricted** (except APPRENTICE_1). Prototypes, hackathons, personal sandboxes — merge freely. This is where APPRENTICE_2 and RESTRICTED operators get to experience full agent workflows.

---

## The Preceptor Role

### Definition

The preceptor is the **engineering manager** responsible for the professional development of operators in Socratic and RESTRICTED modes. They are distinct from the Agentic Engineer. The two roles collaborate but have separate accountabilities:

| | Agentic Engineer | Preceptor (Engineering Manager) |
|---|---|---|
| **Owns** | The control loop — system controllability | The learning loop — operator development |
| **Monitors** | Gauges (Prediction Accuracy, Scope Violation, etc.) | Socratic trails, progression readiness |
| **Authority** | Halt authority — can stop agent-driven work when controls degrade | Progression authority — signs off on stage transitions |
| **Per-change role** | Approves Intent Contracts, maintains signal integrity | None — not involved in per-change artifacts |
| **Scope** | The system | The people |

### Where the Preceptor Appears in the Protocol

**Progression gates (formal).** Every stage transition in the progression ladder requires preceptor sign-off as a gate predicate. The protocol provides the evidence (gauges, trails); the preceptor makes the judgment call.

| Transition | Preceptor Gate |
|------------|---------------|
| APPRENTICE_1 → APPRENTICE_2 | Preceptor attests the operator demonstrates test design awareness and can implement against agent-generated tests independently |
| APPRENTICE_2 → JOURNEYMAN | Preceptor attests subsystem breadth, test quality gap closure, and readiness to reconstruct theory from agent output |
| JOURNEYMAN → ENGINEER | Preceptor attests sustained Prediction Accuracy, breadth across subsystems, and demonstrated judgment in elevated review |
| SUSPENDED → recovery | Preceptor designs the recovery path and attests when the operator is ready to re-enter the progression ladder |

**Socratic trail review (ongoing).** The preceptor reviews individual Socratic trails — the full sequence of IC → agent-generated tests → operator implementation → agent challenges → operator responses. This is mentorship, not gatekeeping. The preceptor uses the trails to:

- Identify knowledge gaps and focus areas for the operator
- Assess whether the operator is developing craft maturity, not just passing challenges
- Provide feedback on reasoning quality beyond what the agent evaluates
- Detect patterns the agent might miss (e.g., operator consistently struggles with concurrency but passes challenges on other topics)

**Spot-checking challenge quality.** The preceptor periodically reviews Prediction Probes generated by the agent to verify they are appropriately difficult and well-calibrated to subsystem complexity. This is part of the Goodhart's Law mitigation — the preceptor is the human check on the agent's challenge generation quality.

### What the Preceptor Does NOT Do

- Does not approve or co-sign Intent Contracts — that is the Agentic Engineer's role
- Does not have halt authority over agent-driven work — that is the Agentic Engineer's role
- Does not set circuit breaker thresholds — that is calibrated by the Agentic Engineer
- Does not prescribe apprentice-to-preceptor ratios — that is an organizational decision outside the protocol

### Collaboration Points

The preceptor and Agentic Engineer must coordinate at specific points:

- **Circuit breaker fires:** The Agentic Engineer detects the gauge degradation and triggers RESTRICTED. The preceptor is notified and takes over the recovery mentorship.
- **SUSPENDED state:** The Agentic Engineer escalates prolonged RESTRICTED failure. The preceptor intervenes with direct mentorship and designs the recovery path.
- **Challenge quality concerns:** The preceptor flags Prediction Probes that seem too easy or poorly calibrated. The Agentic Engineer adjusts the adversarial calibration.
- **Progression decisions:** The preceptor makes the call. The Agentic Engineer provides gauge data. Neither can override the other — the preceptor cannot promote an operator whose gauges are below threshold, and the Agentic Engineer cannot block promotion when gauges and preceptor attestation both support it.

---

## Goodhart's Law Mitigations

Tying Prediction Probe performance to agent access (via the circuit breaker) raises Goodhart's Law risk: when a measure becomes a target, it ceases to be a good measure. The existing Directive Plane framework already warns about this and prescribes adversarial calibration. This section analyzes the specific gaming vectors in the adaptive operator model and the structural mitigations.

### Why the Risk Is Lower Than It Appears

**Challenges are agent-generated.** The operator does not control challenge difficulty. They cannot write easier questions for themselves. The agent generates challenges based on the change, the subsystem, and the IC constraints.

**Answers are agent-evaluated against system behavior.** Prediction Probes ask for falsifiable predictions: "What happens if Provider X times out during capture?" The agent evaluates the answer by checking it against actual system behavior — tracing code paths, running scenarios, verifying against tests. The operator cannot bluff a correct answer. This is fundamentally different from a self-attestation ("do you understand this change?"), which is unfalsifiable and worthless as a control.

**Per-subsystem currency tracks specialization honestly.** If an operator only works in payments/*, they are only CURRENT on payments/*. The model doesn't grant system-wide credit for narrow expertise. An operator who avoids unfamiliar subsystems isn't gaming the system — they're accurately reflected as UNFAMILIAR in the areas they avoid.

**Progression requires breadth.** APPRENTICE operators can specialize — deep expertise in one area is valuable during learning. But JOURNEYMAN and ENGINEER progression requires demonstrated currency across a minimum breadth of the system's subsystems. This prevents the "stay in my comfort zone" vector from becoming a permanent avoidance strategy.

### Remaining Vectors and Mitigations

**Challenge difficulty could drift down over time.** The agent might calibrate challenge difficulty to the *change* (small change = easy challenge) rather than to the *subsystem complexity*. An operator could game this by making many small, simple changes to maintain high Prediction Accuracy without ever being tested on hard reasoning.

**Mitigation:** Challenge difficulty must be calibrated to **subsystem complexity and criticality**, not change size. A one-line change in the auth module should still produce a hard challenge if auth has critical invariants and complex coupling. The agent's challenge generation should weight subsystem factors (invariant count, coupling density, historical defect rate) alongside change magnitude.

**Common-mode failure in evaluation.** The same LLM generating the challenge and evaluating the answer is a closed loop. Shared blind spots mean the operator could give an answer that satisfies the evaluator but doesn't reflect genuine understanding.

**Mitigation:** Periodic spot-checks by a human — the preceptor (for apprentices) or the Agentic Engineer (for all levels). Not every challenge — that defeats the purpose of automation — but enough to verify the agent's challenge quality isn't degrading. This is the adversarial calibration duty the Directive Plane already assigns to the Agentic Engineer. The spot-check rate itself is a tunable parameter per risk tier.

**Many small changes to avoid hard challenges.** An operator could decompose work into trivially small changes to stay below the difficulty threshold.

**Mitigation:** The Scope Violation Rate gauge already tracks change patterns. An operator consistently making changes well *below* the scope gate threshold — when the work logically warrants larger changes — is exhibiting a pattern that the Agentic Engineer should investigate. Abnormally low change magnitude is as suspicious as abnormally high.

---

## Mapping to Existing Framework Concepts

| This Model | Maps To | Relationship |
|------------|---------|-------------|
| Socratic mode | LP4 (Reasoning Capability Preservation) | Structural implementation — forces engagement rather than relying on cultural practice |
| Circuit breaker | LP6 (Gate agent access to demonstrated comprehension) | New leverage point — removes the amplifier when theory degrades |
| Merge gates / repo designation | LP7 (Separate production authority from exploration access) | New leverage point — decouples learning from shipping |
| Progression ladder | LP2 (Forced Theory Reconstruction) — refined | Graduated reconstruction intensity matched to operator capability |
| Per-subsystem currency | Operator Currency (CFP) | More granular — currency is not global but scoped to the subsystem being modified |
| Preceptor role | Agentic Engineer | Distinct role — preceptor (engineering manager) owns the learning loop, Agentic Engineer owns the system control loop. They collaborate but have separate authority. |
| Test Quality Gap gauge | Prediction Accuracy gauge | Analogous — measures operator capability, but for test design rather than system prediction |
