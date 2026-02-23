# Adaptive Operator Model — Compressed Reference
## Socratic Execution Mode & Competency-Gated Agent Access

Use this as context when prototyping implementations of the model. Full document available separately.

---

## Third Invariant

The Directive Plane defines two invariants (Outbound Intent Fidelity, Inbound Theory Preservation). Both assume the human is *capable*. This model adds:

3. **Operator Capability Integrity** — the humans directing agents possess and continuously develop the judgment required to specify intent (#1) and reconstruct theory (#2)

The meta-invariant. Without it, the other two fail silently — artifacts exist but controls are performative.

Cross-cutting concern across all three planes: Socratic mode (Execution), circuit breaker (Reconstruction), merge gates (Directive), progression ladder (all three).

## Fifth Stock

| Stock | Description | Behavior |
|-------|-------------|----------|
| Operator Capability | Meta-skill: ability to perform LP1–LP5 effectively | Grows under Socratic engagement, atrophies under passive agent use, resets per-system |

Distinct from Human Theory. A senior joining a new team has high Operator Capability but low Human Theory for that system.

## Extended Leverage Points

| # | Leverage Point | What It Does |
|---|---------------|--------------|
| LP2 | Force theory reconstruction **(refined)** | Now *graduated* — method matches operator capability. Juniors build theory through implementation (Socratic). Seniors reconstruct from agent output. Mechanism adapts; requirement is invariant. |
| **LP6** | **Gate agent access to demonstrated comprehension** | Agent execution gated by Prediction Accuracy. Theory degrades → amplifier removed (RESTRICTED). LP4 says "stay sharp." LP6 says "if you aren't sharp, the machine won't start." |
| **LP7** | **Separate production authority from exploration access** | Use agents freely in non-production, ship only when qualified. Without this, LP6 either blocks learning (too strict) or allows unverified code in production (too loose). |

**Extended dependencies:** LP6 missing → LP4 becomes voluntary, skipped under velocity pressure. LP7 missing → LP6 either blocks learning or allows unverified production code.

## New System Dynamics Loops

### Balancing (Protective)
- **B1 — Socratic Theory Building:** Socratic mode forces manual implementation → Operator Capability grows → Human Theory grows → Navigability improves. Directly counteracts R1 (Velocity Trap).
- **B2 — Circuit Breaker Recovery:** Theory drops → circuit breaker fires (LP6) → RESTRICTED forces manual coding → theory rebuilds → agent access restored. Converts LP4 from cultural aspiration to automatic balancing.
- **B3 — Progression Ratchet:** Demonstrated competence → scaffolding removed → harder challenges → capability grows. Evidence-based, can't skip steps.

### Reinforcing (Risks)
- **R4 — Velocity Pressure Cascade:** One operator RESTRICTED → velocity drops → teammates compensate with more agent work → their theory drops → cascade. Mitigation: organizational slack capacity.
- **R5 — Confidence Divergence:** System develops patchwork — Socratic-built modules (high construction depth, lower craft reasoning) vs. agent-built modules (higher craft reasoning, lower construction depth). Neither alone is complete.

**Two-axis confidence model:** Per-module theory tracked on (1) construction depth (built vs. reconstructed, by whom) and (2) craft-weighted reasoning (craft maturity of theory holders). Alarms on single-axis coverage.

## Operator Capability Model

### Two Axes
- **Craft Maturity** — general engineering judgment. Accumulated across career, not system-specific.
- **System Familiarity** — mental model of *this* system. Resets to zero on new team/unfamiliar subsystem.

### Per-Subsystem Currency
```
operator_craft_level: SENIOR
operator_system_familiarity: ESTABLISHED
operator_subsystem_currency:
  payments/*: CURRENT (last verified: 2026-02-10)
  notifications/*: UNFAMILIAR
  auth/*: LAPSED (last verified: 2026-01-05)
```
Gates and challenges adjust based on subsystem being modified, not global status.

## Execution Modes

| Mode | Agent Role | Tests By | Implementation By | Coaching | When |
|------|-----------|----------|-------------------|----------|------|
| **SOCRATIC** (full scaffold) | Test oracle + tutor | Agent | Operator | Active | APPRENTICE_1 (bound) |
| **SOCRATIC** (tutor only) | Tutor | Operator | Operator | Active | APPRENTICE_2 (bound) |
| **RESTRICTED** | Test writer | Agent | Operator | None | Circuit breaker / senior onboarding |
| **STANDARD** | Executor | Agent | Agent | None | JOURNEYMAN / ENGINEER (current CFP) |

## Execution Mode × Risk Tier Matrix

| Level | CONSEQUENTIAL | PROFESSIONAL | EXPLORATORY |
|-------|--------------|--------------|-------------|
| APPRENTICE_1 | Socratic — full scaffold (bound) | Socratic — full scaffold (bound) | Socratic — full scaffold (bound) |
| APPRENTICE_2 | Socratic — tutor only (bound) | Socratic — tutor only (bound) | Standard — full agent access |
| JOURNEYMAN | Standard + elevated challenges (+1) | Standard + elevated challenges (+1) | Standard |
| ENGINEER | Standard | Standard | Standard |
| RESTRICTED | Agent tests, operator implements | Agent tests, operator implements | Standard — full agent access |
| ONBOARDING | Agent tests, operator implements | Agent tests, operator implements | Standard — full agent access |

### Multi-Agent Orchestration Access

| Level | CONSEQUENTIAL | PROFESSIONAL | EXPLORATORY |
|-------|--------------|--------------|-------------|
| APPRENTICE_1 | ❌ | ❌ | ❌ |
| APPRENTICE_2 | ❌ | ❌ | ❌ |
| JOURNEYMAN | ❌ | ❌ | ✅ |
| ENGINEER | ❌ | ✅ | ✅ |
| RESTRICTED | ❌ | ❌ | ✅ |
| ONBOARDING | ❌ | ❌ | ✅ |

Multi-agent **never allowed on CONSEQUENTIAL**. EXPLORATORY access does not count toward progression or recovery.

## Repository Designation & Merge Gates

Repos designated **production** (CONSEQUENTIAL/PROFESSIONAL) or **non-production** (EXPLORATORY) — external organizational control, inherited at runtime, not stored in IC.

| Level | Prod Repo (merge agent code) | Prod Repo (merge own code) | Non-Prod Repo |
|-------|------------------------------|---------------------------|---------------|
| APPRENTICE_1 | ❌ No agent access | ✅ (Socratic — they wrote it) | ✅ (Socratic) |
| APPRENTICE_2 | ❌ Blocked | ✅ (Socratic — they wrote it) | ✅ (agent or own) |
| JOURNEYMAN | ✅ | ✅ | ✅ |
| ENGINEER | ✅ | ✅ | ✅ |
| RESTRICTED | ❌ Blocked | ✅ (they wrote it) | ✅ (agent or own) |
| ONBOARDING | ❌ Blocked | ✅ (they wrote it) | ✅ (agent or own) |

EXPLORATORY-tier changes **never merge to production repos** regardless of operator level.

### CFP Gate Changes for Repo Designation

| Gate | Addition |
|------|----------|
| G1 | **Soft warning** if risk_tier inconsistent with repo designation (e.g., EXPLORATORY on PRODUCTION repo). Does not block. |
| G3 | **Resolves execution mode** from operator level × repo designation. Gates multi-agent access. |
| G6 | **Merge gate**: PRODUCTION + agent-generated code + below JOURNEYMAN → MERGE_BLOCKED. PRODUCTION + EXPLORATORY tier → MERGE_BLOCKED. |

## Progression Ladder

### Stages

| Stage | Agent Role | Tests By | Impl By | Coaching | Theory Source |
|-------|-----------|----------|---------|----------|---------------|
| 1 — APPRENTICE_1 | Test oracle + tutor | Agent | Operator | Active | Built (operator wrote it) |
| 2 — APPRENTICE_2 | Tutor (no test gen) | Operator | Operator | Active | Built (operator wrote it) |
| 3 — JOURNEYMAN | Executor (reviewed) | Agent | Agent | None | Reconstructed (+1 challenge above ENGINEER) |
| 4 — ENGINEER | Executor (standard) | Agent | Agent | None | Reconstructed (standard CFP) |

### Progression Criteria (Evidence-Based, Not Time-Based)

| Signal | What It Indicates |
|--------|-------------------|
| Prediction Accuracy | Rolling pass rate trending above threshold across N consecutive changes |
| Theory Challenge depth | Answers are explanatory (reasoning, not recall) |
| Test Quality Gap (Stage 2) | Operator tests converge toward agent baseline in coverage/edge cases |
| Subsystem breadth (JOURNEYMAN+) | Currency across minimum number of subsystems |
| Preceptor attestation | Human mentor signs off on readiness |

No algorithm promotes. Protocol provides evidence. Preceptor (human) decides.

## The Circuit Breaker

Theory Challenge performance gates agent access. Applies to **all operators at every level** on CONSEQUENTIAL and PROFESSIONAL systems. EXPLORATORY exempt.

### Scoring

| Outcome | Score |
|---------|-------|
| Pass on 1st attempt | 1.0 |
| Pass on 2nd attempt | 0.5 |
| Pass on 3rd attempt | 0.25 |
| 4th attempt (fail) | 0.0 — Agentic Engineer reconstructs theory and approves merge |

Multiple challenges per change: score = **minimum** across all challenges.

### Mechanism

1. Prediction Accuracy drops below `restriction_threshold` for *any* subsystem
2. `operator_currency` → **RESTRICTED** globally. Triggering subsystem(s) recorded.
3. Agent writes tests, operator implements (rebuilds theory through hands-on coding)
4. Recovery credit accrues **only from triggering subsystem(s)**
5. Recovery: Prediction Accuracy exceeds `recovery_threshold` across hybrid window + preceptor approval → CURRENT

### Calibration Defaults

| Parameter | Default |
|-----------|---------|
| restriction_threshold | 0.6 |
| recovery_threshold | 0.8 (hysteresis) |
| window_changes | 10 |
| window_time_floor | 14 days |
| suspension_time | 28 days (2× window) |
| suspension_trend | no upward trend required for escalation |

Override: Agentic Engineer recommends, preceptor agrees. Logged and auditable.

### State Machine

```
APPRENTICE_1 → APPRENTICE_2 → JOURNEYMAN → ENGINEER
                                    │
                        (any level, theory drops)
                                    │
                               RESTRICTED ──(recovery)──→ restore previous level
                                    │
                        (prolonged failure: 2× window
                         + no sustained improvement)
                                    │
                               SUSPENDED ──(preceptor path)──→ RESTRICTED → restore
```

### SUSPENDED State

Trigger: RESTRICTED for 2× recovery window + no upward trend. Behavior: RESTRICTED + tighter scope gates + preceptor paired on every change + structured recovery path. Recovery is two-step: SUSPENDED → RESTRICTED → CURRENT.

### Escalation Override

Engineering director+ can temporarily restore agent access. Time-boxed, written justification required, scores continue accruing, logged and auditable, does not reset recovery.

## Senior Onboarding

Senior joining new team enters **RESTRICTED** (same mode as circuit breaker). Agent writes tests, operator implements. Plus: tighter scope gates, agent surfaces invariants/coupling pre-execution, system-specific challenges (not craft-specific), guided archaeology of subsystem history. Graduates when system familiarity gauges hit threshold.

## The Preceptor Role

The engineering manager. Distinct from Agentic Engineer.

| | Agentic Engineer | Preceptor |
|---|---|---|
| **Owns** | Control loop — system steerability | Learning loop — operator development |
| **Monitors** | Gauges (Prediction Accuracy, etc.) | Socratic trails, progression readiness |
| **Authority** | Halt authority (stop agent work) | Progression authority (sign off stage transitions) |
| **Per-change role** | Approves ICs, maintains signal integrity | None |
| **Scope** | The system | The people |

### Protocol Appearances

| Transition | Preceptor Gate |
|------------|---------------|
| APPRENTICE_1 → 2 | Attests test design awareness, can implement against agent tests independently |
| APPRENTICE_2 → JOURNEYMAN | Attests subsystem breadth, test quality gap closure, readiness to reconstruct from agent output |
| JOURNEYMAN → ENGINEER | Attests sustained Prediction Accuracy, subsystem breadth, demonstrated judgment |
| SUSPENDED → recovery | Designs recovery path, attests readiness to re-enter ladder |

Also: ongoing Socratic trail review (mentorship), spot-checking challenge quality (Goodhart's Law mitigation).

## Goodhart's Law Mitigations

- **Challenges are agent-generated** — operator does not control difficulty
- **Answers are agent-evaluated against system behavior** — falsifiable predictions, not self-attestation
- **Per-subsystem currency** — narrow expertise accurately reflected, can't claim system-wide credit
- **Progression requires breadth** — JOURNEYMAN/ENGINEER need currency across minimum subsystems
- **Challenge difficulty calibrated to subsystem complexity**, not change size
- **Preceptor spot-checks** — human verification of challenge quality
- **Abnormal change patterns detected** — abnormally low change magnitude is as suspicious as high

## New Gauges

| Gauge | What It Measures | Applies To |
|-------|------------------|------------|
| Test Quality Gap | Delta between operator and agent test coverage/edge cases | APPRENTICE_2 |
| Invariant Awareness | Can operator name invariants before being shown them? | Onboarding / all |
| Socratic Iteration Count | Challenge-response cycles before operator's implementation passes | APPRENTICE_1, APPRENTICE_2 |
| Theory Confidence Distribution | Per-module: construction depth × craft-weighted reasoning | Team-level |

Supplements existing gauges (Prediction Accuracy, Scope Breach Rate, Time-to-Explain, Invariant Staleness) and orchestration gauges.

## IC Field Extensions

```yaml
operator:
  craft_level: SENIOR | MID | JUNIOR              # input assessment by preceptor
  system_familiarity: ESTABLISHED | DEVELOPING | ONBOARDING | UNFAMILIAR
  execution_mode:                                  # blank at IC creation; appended by G3
  progression_stage: APPRENTICE_1 | APPRENTICE_2 | JOURNEYMAN | ENGINEER
  subsystem_currency:
    payments/*: CURRENT
    notifications/*: UNFAMILIAR
    auth/*: LAPSED
  circuit_breaker:
    prediction_accuracy_window: 10
    window_time_floor: 14d
    restriction_threshold: 0.6
    recovery_threshold: 0.8
    applies_to: [CONSEQUENTIAL, PROFESSIONAL]      # EXPLORATORY exempt
    triggered_by: [auth/*]                          # scoped recovery
  exploratory_access: true | false                  # false only for APPRENTICE_1
```

**Field semantics:**
- `craft_level` — input assessment by preceptor, does not mechanically gate transitions
- `progression_stage` — protocol state, drives execution mode and gate behavior
- `execution_mode` — blank at IC creation, appended by G3 (preserves append-only invariant)

## Mapping to Existing Framework

| This Model | Maps To | Relationship |
|------------|---------|-------------|
| Socratic mode | LP4 | Structural implementation — forces engagement |
| Circuit breaker | LP6 (new) | Removes amplifier when theory degrades |
| Merge gates / repo designation | LP7 (new) | Decouples learning from shipping |
| Progression ladder | LP2 (refined) | Graduated reconstruction intensity |
| Per-subsystem currency | Operator Currency (CFP) | More granular — scoped to subsystem |
| Preceptor | Agentic Engineer | Distinct role — learning loop vs. control loop |
| Test Quality Gap | Prediction Accuracy | Analogous — measures test design capability |

## Key Rules

- EXPLORATORY access does **not** count toward progression or recovery
- EXPLORATORY-tier changes **cannot** merge to production repos
- Circuit breaker restriction is **global**, recovery is **scoped** to triggering subsystem(s)
- RESTRICTED is not a demotion — operator already has test design skill, only rebuilding system theory
- Preceptor cannot promote when gauges are below threshold; Agentic Engineer cannot block when gauges and preceptor both support
- Escalation overrides are time-boxed, justified, and auditable — frequent overrides signal organizational understaffing
