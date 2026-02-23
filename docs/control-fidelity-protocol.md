# Control Fidelity Protocol

> A formally enforced sequence of structured artifacts and validation steps that guarantees human intent is faithfully transmitted to machine execution and that human understanding is reconstructed from the results before further change is allowed.

**Status:** Unified Draft (Consolidating base mechanics and orchestration extensions)
**Date:** 2026-02-21

---

## Table of Contents

1. [Definitions](#1-definitions)
2. [Architecture Mapping](#2-architecture-mapping)
3. [Unified State Machine](#3-unified-state-machine)
4. [Artifact Schemas](#4-artifact-schemas)
5. [Gate Predicates](#5-gate-predicates)
6. [Orchestration & Verification Mechanics](#6-orchestration--verification-mechanics)
7. [Error States and Recovery](#7-error-states-and-recovery)
8. [Complexity Ceilings & Adversarial Monitoring](#8-complexity-ceilings--adversarial-monitoring)
9. [Operator Controls (Invariants, Currency, Review)](#9-operator-controls)
10. [Risk Tiering](#10-risk-tiering)
11. [Observability (Gauges)](#11-observability-gauges)

---

## 1. Definitions

| Term | Definition |
|---|---|
| **Change** | Any modification to the system initiated by a human and executed by an agent. |
| **Agent** | Any automated system that modifies code, configuration, or infrastructure. |
| **Operator** | The human responsible for a change. Must hold sufficient Operator Currency. |
| **Theory** | The mental model held by the operator that allows them to predict and explain system behavior. |
| **Artifact** | A structured, versioned, machine-parseable and human-readable document produced at a transition point. |
| **Gate** | A boolean predicate that must evaluate to `TRUE` before a state transition is allowed. |
| **Invariant** | A falsifiable statement about the system that must remain true unless explicitly modified. |
| **Orchestrator Agent** | An agent that receives the root Intent Contract and decomposes it into sub-tasks. Does not modify the system directly. |
| **Specialist Agent** | An agent that executes a sub-task within a partitioned scope assigned by the orchestrator. |
| **Intent Contract Chain** | The linked sequence of Intent Contracts from root (human-authored) through each decomposition layer. |
| **Scope Partition** | The non-overlapping division of the root Intent Contract's scope across specialist agents. |
| **Composition Verifier** | An independent agent (or operator) evaluating the composed output for emergent properties. Produces the Composition Proof. |
| **Intent Drift** | Semantic divergence between the root IC and a Sub-IC (measured via clause traceability, altered constraints, etc.). |
| **Coupling Density** | Ratio of actual dependency edges and interaction pairs between specialists to the maximum possible. |
| **Structural Adversariality** | Requirement that verification agents differ from execution agents in model family, framing, and objective to prevent common-mode failures. |
| **Execution Mode** | The protocol-level behavior mode for the Execution Plane: SOCRATIC, RESTRICTED, or STANDARD. Resolved at G3 from operator level × repo designation. |
| **Progression Stage** | Protocol-tracked operator state: APPRENTICE_1, APPRENTICE_2, JOURNEYMAN, or ENGINEER. Drives execution mode resolution and gate behavior. |
| **Preceptor** | The engineering manager responsible for operator professional development. Owns the learning loop. Distinct from the Agentic Engineer who owns the control loop. |
| **Repository Designation** | External organizational classification of a repository as PRODUCTION or NON-PRODUCTION. Inherited at runtime, not stored in the IC. |
| **Circuit Breaker** | Automatic restriction of agent execution privileges when an operator's Prediction Accuracy drops below a threshold. |

---

## 2. Architecture Mapping

The Control Fidelity Protocol maps to a three-plane architecture. The single-agent flow is a direct path through these planes, while the orchestrated flow utilizes decomposition and composition loops.

- **The Directive Plane:** Through which human intent becomes constrained machine action.
  - *States:* `INTENT`, `DECOMPOSED`, `APPROVED`
  - *Artifacts:* Root IC, Sub-IC, OE, Invariants

- **The Execution Plane:** Where agents write code, run tests, and produce changes.
  - *States:* `EXECUTING`, `SPECIALIST_EXECUTING`
  - *Artifacts:* EE.pre, EE.post, code changes

- **The Reconstruction Plane:** Through which theory flows back to humans.
  - *States:* `NARRATED`, `COMPOSED`, `COMPOSITION_VERIFIED`, `UNDERSTOOD`, `MERGED`
  - *Artifacts:* RP, CN, CP

---

## 3. Unified State Machine

The state machine adapts based on whether the root Intent Contract declares `orchestration_mode: true`. Single agents use the direct v1.0 path.

### 3.1 States

| State | Description | Owner |
|---|---|---|
| `INTENT` | Human has articulated structured intent. IC passes structural validation. | Operator |
| `DECOMPOSED` | *(Orchestrated only)* Orchestrator produces task decomposition, scope partition, and Sub-ICs in the Orchestration Envelope (OE). | Orchestrator |
| `PLANNED` / `SPECIALIST_EXECUTING` | Agents propose execution plans (EE.pre). Specialists run their own `PLANNED → APPROVED → EXECUTING → NARRATED` loops under their Sub-ICs. | Agent(s) |
| `APPROVED` | Operator has reviewed the plan against intent. | Operator |
| `EXECUTING` | Agent(s) performing approved work within defined boundaries. | Agent(s) |
| `COMPOSED` | *(Orchestrated only)* Specialist outputs are available. Orchestrator produces Composition Narrative (CN). | Orchestrator |
| `COMPOSITION_VERIFIED` | *(Orchestrated only)* Verifier produces Composition Proof (CP). | Verifier |
| `NARRATED` | Agent/Orchestrator produces EE (POST) and Reconstruction Proof (RP). | Agent(s) |
| `UNDERSTOOD` | Operator passes the Theory Challenge(s). | Operator |
| `MERGED` | Terminal state. Change committed. Invariants updated. | System |

### 3.2 Transition Flow

**Single-Agent Path:**

```
INTENT ─G1→ PLANNED ─G2→ APPROVED ─G3→ EXECUTING ─G4→ NARRATED ─G5→ UNDERSTOOD ─G6→ MERGED
```

**Orchestrated Path:**

```
INTENT ─G1→ DECOMPOSED ─G1a→ SPECIALIST_EXECUTING (Internal loop per specialist)
  ─G4a→ COMPOSED ─G4b→ COMPOSITION_VERIFIED ─G5a→ NARRATED ─G5→ UNDERSTOOD ─G6→ MERGED
```

### 3.3 Operator Progression State Machine

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

Transitions are evidence-based (gauge thresholds) and require preceptor attestation. See [The Operator Model](operator-model.md) for progression criteria and circuit breaker mechanics.

---

## 4. Artifact Schemas

> All artifacts are **append-only**. No field may be retroactively modified.

### 4.1 Intent Contract (IC) & Sub-IC

The canonical source of human intent. For orchestrated changes, Sub-ICs are structurally identical but carry chain-of-custody data.

- **Identity:** `change_id`, `operator_currency`, `risk_tier`.
- **Intent:** `goal` (with individual `clause_ids` for mechanical tracing), `scope` (includes/excludes), `constraints`, `non_goals`, `acceptance_criteria`, and `invariants_in_scope` (dispositions cannot be `UNKNOWN`).
- **Orchestration Chain** *(Sub-IC only):* `root_ic_ref`, `parent_ic_ref`, `inherited_constraints` (immutable verbatim text), `cross_agent_assumptions`, and mechanical tracing flags (`traces_to_root`, `trace_type: DIRECT|DERIVED`).
- **Operator Block** *(Adaptive Model):*

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

### 4.2 Orchestration Envelope (OE)

Produced by the orchestrator at the `DECOMPOSED` state.

- **Capability Declaration:** `has_write_access` (must be `false`).
- **Decomposition:** `sub_tasks` defining Specialist Sub-ICs, `assigned_scope`, and context provided.
- **Validation:** `coverage_check`, `overlap_check`, overlap enforcement strategies (`SEQUENTIAL`, `CONVENTION_PARTITIONED`, `REQUIRES_MANUAL_MERGE`).
- **Coupling Metrics:** Edge counts, interaction pairs, coupling density.
- **Intent Propagation:** Mechanical verification that every root goal/constraint is assigned to a specialist.

### 4.3 Execution Envelope (EE)

Produced by executing agents.

- **PRE (Execution Plan):** `planned_modifications`, `anticipated_side_effects`, `test_plan`, `invariant_declarations`, `estimated_magnitude`.
- **POST (Completion Report):** `actual_modifications` (mapped to IC), `unmapped_modifications` (triggers error), `unplanned_modifications` (triggers error), `acceptance_results`, `invariant_results`.

### 4.4 Composition Narrative (CN) & Composition Proof (CP)

- **Composition Narrative (CN):** The orchestrator's explanatory account of how parts fit together. Includes interaction maps and subjective risk assessments.
- **Composition Proof (CP):** The independent verifier's authoritative verdict. Assesses assumption verdicts, interaction risk based on structural signals, emergent properties, global invariant verification against the combined state, and explicitly flags the verification method used (`DETERMINISTIC`, `STRUCTURED_ANALYSIS`, `LLM_ASSESSED`).

### 4.5 Reconstruction Proof (RP)

The artifact that proves human theory was rebuilt.

- **Narrative:** Agent-generated summary, reasoning, dependencies affected.
- **Specialist Chain** *(Orchestrated):* Hash-linked references to every specialist's individual RP (anti-laundering requirement).
- **Challenges:** Falsifiable prediction questions the operator must answer. In orchestrated changes, these include composition and monitoring-layer challenges.
- **Attestation:** Operator affirms theory is reconstructed.

---

## 5. Gate Predicates

> All predicates must evaluate to `TRUE`. Any `FALSE` triggers an error state.

- **G1** (`INTENT → PLANNED`/`DECOMPOSED`): IC exists, goal non-empty, scope non-empty, criteria falsifiable, invariant dispositions known, operator currency valid. *For orchestration:* clause IDs present. *For adaptive model:* G1 emits a **soft warning** if `risk_tier` on IC is inconsistent with repo designation (e.g., EXPLORATORY tier declared in a PRODUCTION repo). Does not block — the operator may have a valid reason. Warning is logged in the IC as an advisory.

- **G1a** (`DECOMPOSED → SPECIALIST_EXECUTING`): OE tool separation valid (no write access for orchestrator), partition complete, no context contradictions, mechanical traceability passes (no intent drift), depth/coupling within tier limits, operator approved decomposition.

- **G2** (`PLANNED → APPROVED`): EE.pre within IC scope, magnitude within tier thresholds, invariants align.

- **G3** (`APPROVED → EXECUTING`): Execution sandbox bounded strictly to `planned_modifications`. *For adaptive model:* G3 **resolves execution mode** by checking repo designation against operator level. Determines whether APPRENTICE_2/RESTRICTED/ONBOARDING get agent access (non-production repo) or remain in Socratic/RESTRICTED mode (production repo). Also gates multi-agent orchestration access. The resolved `execution_mode` is appended to the IC at this point.

- **G4** (`EXECUTING → NARRATED`): EE.post completeness, no unmapped/unplanned modifications, criteria pass, invariants maintained.

- **G4a** (`SPECIALIST_EXECUTING → COMPOSED`): All specialists reached `NARRATED` internally, scope negotiations serialized and logged, CN exists.

- **G4b** (`COMPOSED → COMPOSITION_VERIFIED`): CP exists, segregation of duties respected (adversariality at `CONSEQUENTIAL`), all verification methods declared, global invariants hold, CP overall verdict `PASS` or `CONDITIONAL` (if accepted by operator). System complexity ceiling verified.

- **G5a** (`COMPOSITION_VERIFIED → NARRATED`): Orchestration RP includes specialist hashes, CN/CP referenced, minimum composition challenges met.

- **G5** (`NARRATED → UNDERSTOOD`): Operator passed required number of Theory Challenges, `theory_reconstructed == true`.

- **G6** (`UNDERSTOOD → MERGED`): Invariant Register updated, artifacts committed, gauges recorded, no outstanding error states. *For adaptive model:* G6 queries repo designation and enforces merge gate predicates: (1) If PRODUCTION and change contains agent-generated implementation and operator is below JOURNEYMAN → `MERGE_BLOCKED`. (2) If PRODUCTION and risk_tier is EXPLORATORY → `MERGE_BLOCKED`. Operator-written code (from Socratic or RESTRICTED mode) is never blocked at appropriate tier.

---

## 6. Orchestration & Verification Mechanics

Orchestration mechanics — intent propagation, scope partitioning, segregation of duties, and verification method hierarchies — are covered in the [Multi-Agent Orchestration](multi-agent.md) reference.

---

## 7. Error States and Recovery

| Error State | Trigger | Recovery |
|---|---|---|
| `SCOPE_VIOLATION` / `SCOPE_OVERLAP` | Work performed outside bounds, or undocumented cross-agent overlap. | Revise plan (G2), expand IC scope, or reject/rollback. If overlap: declare merge strategy or re-partition. |
| `INTENT_MISMATCH` / `INTENT_DRIFT` | Sub-IC missing traceability, altered constraints, or failed acceptance criteria. | Regenerate Sub-IC (drift), rework execution, or amend root IC. |
| `THEORY_FAILURE` | Operator fails Theory Challenge. | Operator engages code, requests detail, re-attempts new challenge. **Cannot be bypassed.** |
| `INVARIANT_CONFLICT` | Change violates invariant without declaring intent. | Revise to preserve, or operator amends IC to declare modification. |
| `DECOMPOSITION_FAULT` | OE contains contradictions or violates tool capabilities. | Orchestrator re-decomposes, operator amends intent, or sandbox is reconfigured. |
| `COMPOSITION_INCOHERENCE` | Emergent systemic failure, cross-agent assumption violation. | Targeted specialist re-execution, full re-decomposition, or intent amendment. |
| `MERGE_BLOCKED` | Operator below JOURNEYMAN attempting to merge agent-generated code to production repo, or EXPLORATORY-tier change targeting production repo. | Operator builds theory through Socratic/RESTRICTED mode and progresses, or re-executes change under appropriate tier. |

---

## 8. Complexity Ceilings & Adversarial Monitoring

### 8.1 Complexity Reduction Request (CRR)

At any point, the operator can declare a CRR if the decomposition is too dense to reconstruct theory. This is a **steering input**, not a `THEORY_FAILURE`. It forces the orchestrator to produce a simpler decomposition.

### 8.2 System-Level Complexity Ceiling

When coupling density (>0.6), interactions, or sub-tasks mathematically exceed human spot-checking capacity, the orchestration hits a **hard ceiling**. It is **not overridable**. The operator must:

- **Decompose:** Split into multiple sequential changes.
- **Elevate to Adversarial Monitoring:** Shift to a human-over-the-loop model requiring:
  - Dual independent adversarial verifiers
  - Consensus requirements
  - 100% deterministic global invariant verification
  - Second-order theory challenges

---

## 9. Operator Controls

### 9.1 Invariant Register Control Plane

The IR exists outside the per-change protocol. Invariants are falsifiable statements owned by operators. They become `STALE` after a tier-defined period (30–90 days), triggering warnings for any change touching their components.

### 9.2 Operator Currency

Governs human qualification.

- **States:** `CURRENT` ↔ `LAPSED` → `RESTRICTED` → `SUSPENDED`.
- **Recurrent Exercise:** Operators must periodically complete a Theory Reconstruction from Scratch (TRS) to maintain currency.

### 9.3 Review Surface

The protocol restricts what the operator must review at each gate to prevent cognitive overload. LLM-assessed verdicts must be explicitly flagged.

- At **G1a**, the operator reviews rationale, coverage, coupling, and drift.
- At **G4b/G5**, they review the independent CP verdict, conditions, and answer composition challenges.
- Drill-downs to individual specialist artifacts are always available via hash links.

---

## 10. Risk Tiering

| Parameter | CONSEQUENTIAL | PROFESSIONAL | EXPLORATORY |
|---|---|---|---|
| Max Scope (Files / Lines) | 5 / 200 | 10 / 500 | 20 / 1000 |
| Max Specialists / Depth | 5 / 1 | 8 / 2 | 15 / 3 |
| Max Coupling Density | 0.4 | 0.5 | 0.6 |
| Min Theory Challenges | 3 (1 monitoring layer) | 2 | 1 |
| Deterministic Verif. Ratio | ≥80% | ≥50% | Tracked |
| Composition Verifier | Structurally Adversarial | Independent (cond.) | Optional |
| Specialist Plan Approval | All by Operator | Risk-weighted sampling | Delegatable |
| Invariant Staleness | 30 days | 60 days | 90 days |
| Operator Currency | 14 days | 30 days | 60 days |

### 10.1 Execution Mode × Risk Tier

| Level | CONSEQUENTIAL | PROFESSIONAL | EXPLORATORY |
|-------|--------------|--------------|-------------|
| APPRENTICE_1 | Socratic — full scaffold (bound) | Socratic — full scaffold (bound) | Socratic — full scaffold (bound) |
| APPRENTICE_2 | Socratic — tutor only (bound) | Socratic — tutor only (bound) | Standard — full agent access |
| JOURNEYMAN | Standard + elevated challenges (+1) | Standard + elevated challenges (+1) | Standard |
| ENGINEER | Standard | Standard | Standard |
| RESTRICTED | Agent tests, operator implements | Agent tests, operator implements | Standard — full agent access |
| ONBOARDING | Agent tests, operator implements | Agent tests, operator implements | Standard — full agent access |

### 10.2 Multi-Agent Orchestration Access

| Level | CONSEQUENTIAL | PROFESSIONAL | EXPLORATORY |
|-------|--------------|--------------|-------------|
| APPRENTICE_1 | ❌ | ❌ | ❌ |
| APPRENTICE_2 | ❌ | ❌ | ❌ |
| JOURNEYMAN | ❌ | ❌ | ✅ |
| ENGINEER | ❌ | ✅ | ✅ |
| RESTRICTED | ❌ | ❌ | ✅ |
| ONBOARDING | ❌ | ❌ | ✅ |

Multi-agent orchestration is **never allowed on CONSEQUENTIAL systems**. See [The Operator Model](operator-model.md) for execution mode definitions and the Execution Mode × Risk Tier rationale.

---

## 11. Observability (Gauges)

> Gauges ensure the system degrades loudly rather than failing silently.

| Gauge | Measures |
|---|---|
| **Prediction Accuracy** | Operator Theory Challenge correctness. |
| **Scope Breach Rate** | IC amendments that expand scope mid-flight. |
| **Time-to-Explain** | Minutes required to complete Theory Reconstruction. |
| **Invariant Staleness** | Time since active invariants were last verified. |
| **Intent Propagation Fidelity** | % of root clauses mechanically covered by Sub-ICs. |
| **Decomposition Coherence** | Gaps/overlaps in the Orchestration Envelope. |
| **Composition Verification Rate** | % of multi-agent outputs verified for emergent behavior. |
| **Orchestrator Override Rate** | Frequency of human CRRs or decomposition rejections. |
| **Coupling Density Trend** | Growth of dependency/interaction edges over time. |

Additional gauges for the adaptive operator model (Test Quality Gap, Invariant Awareness, Socratic Iteration Count, Theory Confidence Distribution) and for multi-agent orchestration (Intent Propagation Fidelity, Cross-Agent Context Consistency, Decomposition Coherence, Composition Verification Rate) are consolidated in the [Instrumentation](instrumentation.md) reference.
