# Multi-Agent CFP Extension Specification

> The first concrete extension of the base Control Fidelity Protocol. Defines multi-agent orchestration as a pluggable capability that wraps the base CFP loop rather than replacing it.

**Status:** Draft
**Date:** 2026-02-23
**Extension ID:** `multi-agent`
**Extension Version:** `1.0.0`
**Targets:** Control Fidelity Protocol (base), CFP Extension Layer

---

## Table of Contents

1. [Purpose and Design Principle](#1-purpose-and-design-principle)
2. [Extension Manifest](#2-extension-manifest)
3. [The Wrapper Pattern](#3-the-wrapper-pattern)
4. [Augmented State Machine](#4-augmented-state-machine)
5. [Extended Definitions](#5-extended-definitions)
6. [Extended Artifact Schemas](#6-extended-artifact-schemas)
7. [Orchestration Gates](#7-orchestration-gates)
8. [Error States and Recovery](#8-error-states-and-recovery)
9. [Access Controls and Risk Parameters](#9-access-controls-and-risk-parameters)
10. [Complexity Ceilings](#10-complexity-ceilings)
11. [Orchestration Gauges](#11-orchestration-gauges)
12. [Segregation of Duties](#12-segregation-of-duties)

---

## 1. Purpose and Design Principle

The base CFP defines a single-agent control loop. Multi-agent orchestration — systems where an orchestrator agent decomposes a root intent across multiple specialist agents — introduces failure modes (intent drift, scope overlap, compositional incoherence) that the base loop alone cannot govern.

This extension governs two layers that the base CFP does not address:

- **The decomposition layer** — the orchestrator's transformation of a root Intent Contract into Sub-ICs for specialists.
- **The composition layer** — the aggregation and independent verification of specialist outputs before theory reconstruction begins.

**Key design principle — the Wrapper Pattern.** Each specialist agent runs a *complete, unmodified base CFP loop* (`INTENT → PLANNED → APPROVED → EXECUTING → NARRATED → UNDERSTOOD → MERGED`) for its sub-task. This extension governs the decomposition layer *above* those loops and the composition/verification layer *below* them. It wraps the base loops; it does not replace them. The base CFP's control integrity guarantees — intent formalization, plan approval, scope gating, theory reconstruction — apply in full to every specialist's sub-task.

The formal mechanism by which this extension attaches to the base CFP is defined in the [CFP Extension Layer Specification](cfp-extension-layer.md). The conceptual motivation for multi-agent controls is covered in [Multi-Agent Orchestration](multi-agent.md).

---

## 2. Extension Manifest

```yaml
extension:
  id: multi-agent
  version: 1.0.0
  target_cfp_version: ">=1.0.0"
  status: DRAFT
  description: >
    Governs multi-agent orchestration as a wrapper around the base CFP.
    Adds decomposition and composition/verification layers without
    modifying the base single-agent state machine.

  bindings:
    state_injection_points:
      - hook: POST_G1
        injects:
          - state: MA.DECOMPOSED
            entry_gate: G1           # base G1 opens the path into this state
            exit_gate: MA.G1a
            owner: Orchestrator Agent

      - hook: POST_G4
        injects:
          - state: MA.COMPOSED
            entry_gate: MA.G4a
            exit_gate: MA.G4b
            owner: Orchestrator Agent
          - state: MA.COMPOSITION_VERIFIED
            entry_gate: MA.G4b
            exit_gate: MA.G5a
            owner: Composition Verifier

    artifact_slot_additions:
      - artifact: IC
        slot: ic.extension_fields
        fields:
          - name: MA.orchestration_mode
            type: boolean
            required: false
            description: >
              When true, G1 routes to MA.DECOMPOSED instead of PLANNED.
              Must be false or absent on Sub-ICs.
          - name: MA.root_ic_ref
            type: string
            required: false
            description: >
              Sub-IC only. change_id of the root IC at the top of the
              intent contract chain.
          - name: MA.parent_ic_ref
            type: string
            required: false
            description: >
              Sub-IC only. change_id of the immediate parent IC.
          - name: MA.inherited_constraints
            type: string[]
            required: false
            description: >
              Sub-IC only. Verbatim constraints propagated from the root IC.
              Immutable — the orchestrator may not rephrase or omit them.
          - name: MA.cross_agent_assumptions
            type: string[]
            required: false
            description: >
              Sub-IC only. Explicit assumptions about sibling agents' behavior
              that this specialist's scope depends on.
          - name: MA.traces_to_root
            type: boolean
            required: false
            description: >
              Sub-IC only. Asserts mechanical traceability from this Sub-IC
              to the root IC.
          - name: MA.trace_type
            type: DIRECT | DERIVED
            required: false
            description: >
              Sub-IC only. DIRECT if the sub-task directly fulfills a root
              clause. DERIVED if the sub-task is a decomposition-level
              judgment; a falsifiable justification must accompany DERIVED.

      - artifact: RP
        slot: rp.extension_fields
        fields:
          - name: MA.specialist_rp_chain
            type: object[]
            required: false
            description: >
              Orchestrated RP only. Hash-linked references to every
              specialist's individual RP (anti-laundering requirement).
              Fields per entry: specialist_id, rp_hash, rp_ref.

    new_artifact_types:
      - type_name: MA.OE
        description: >
          Orchestration Envelope. Produced by the orchestrator at
          MA.DECOMPOSED. Records decomposition, scope partitioning,
          coupling metrics, and intent propagation verification.
        schema_ref: "§6.2"

      - type_name: MA.CN
        description: >
          Composition Narrative. Produced by the orchestrator at
          MA.COMPOSED. Explains how specialist outputs combine and
          identifies emergent risks.
        schema_ref: "§6.3"

      - type_name: MA.CP
        description: >
          Composition Proof. Produced by the independent Composition
          Verifier at MA.COMPOSITION_VERIFIED. Authoritative verdict on
          compositional correctness.
        schema_ref: "§6.4"

    gates:
      - id: MA.G1a
        from_state: MA.DECOMPOSED
        to_state: MA.SPECIALIST_EXECUTING
        predicate_ref: "§7.1"

      - id: MA.G4a
        from_state: MA.SPECIALIST_EXECUTING
        to_state: MA.COMPOSED
        predicate_ref: "§7.2"

      - id: MA.G4b
        from_state: MA.COMPOSED
        to_state: MA.COMPOSITION_VERIFIED
        predicate_ref: "§7.3"

      - id: MA.G5a
        from_state: MA.COMPOSITION_VERIFIED
        to_state: NARRATED
        predicate_ref: "§7.4"

    error_states:
      - name: MA.SCOPE_OVERLAP
        trigger: >
          Undocumented overlap detected between two specialist scopes in the OE,
          or cross-agent modification of the same artifact without a declared
          merge strategy.
        recovery_path: >
          Orchestrator re-declares merge strategy (SEQUENTIAL,
          CONVENTION_PARTITIONED, or REQUIRES_MANUAL_MERGE) or re-partitions
          scope. Operator reviews revised OE before MA.G1a re-evaluates.
        resumes_from: MA.DECOMPOSED

      - name: MA.INTENT_DRIFT
        trigger: >
          A Sub-IC fails mechanical traceability: missing clause references,
          altered constraints, or acceptance criteria that cannot be mapped
          to root IC clauses.
        recovery_path: >
          Orchestrator regenerates the affected Sub-IC with corrected
          traceability. If root intent is genuinely ambiguous, operator amends
          the root IC and restarts from INTENT.
        resumes_from: MA.DECOMPOSED

      - name: MA.DECOMPOSITION_FAULT
        trigger: >
          OE contains logical contradictions, violates orchestrator tool
          separation (has_write_access is not false), or coupling density
          exceeds the tier ceiling.
        recovery_path: >
          Orchestrator re-decomposes. Operator may amend root IC scope or
          request a Complexity Reduction Request (CRR, see §10.1).
        resumes_from: MA.DECOMPOSED

      - name: MA.COMPOSITION_INCOHERENCE
        trigger: >
          CP verdict is FAIL, or emergent systemic behavior violates a global
          invariant, or cross-agent assumption contradictions are detected.
        recovery_path: >
          Targeted specialist re-execution for the affected sub-tasks, followed
          by re-entry at MA.G4a. If root decomposition is flawed, full
          re-decomposition from MA.DECOMPOSED. If root intent must change,
          restart from INTENT.
        resumes_from: MA.COMPOSED

    gauges:
      - name: MA.IntentPropagationFidelity
        measures: >
          Percentage of root IC clauses that are mechanically covered (via
          direct or derived trace) by at least one specialist Sub-IC.
        collection: >
          Computed at MA.G1a from the OE intent_propagation_verification
          section. Recorded per change.
        degradation_signal: >
          Coverage below 100%, or growing proportion of DERIVED traces
          without falsifiable justification.
        thresholds:
          yellow: "Coverage < 100% on any change"
          orange: "Coverage < 95% on two consecutive changes, or DERIVED traces > 30%"
          red: "Coverage < 90%, or any root constraint absent from all Sub-ICs"

      - name: MA.CrossAgentContextConsistency
        measures: >
          Whether sibling specialist agents received mutually consistent
          architectural context (no contradictory assumptions).
        collection: >
          Computed from cross_agent_assumptions fields across all Sub-ICs
          in the OE. Contradiction detection is logged in the OE validation
          section.
        degradation_signal: >
          Contradictory assumptions across concurrent agents.
        thresholds:
          yellow: "1 contradictory assumption pair detected"
          orange: "2+ contradictory assumption pairs on a single change"
          red: "Contradictions affect a shared invariant or produce a CP FAIL"

      - name: MA.DecompositionCoherence
        measures: >
          Whether the orchestrator's OE covers the root IC without gaps
          or overlaps.
        collection: >
          Computed from OE coverage_check and overlap_check. Logged per
          change.
        degradation_signal: >
          Missing coverage (root IC clauses not assigned to any specialist)
          or undeclared overlaps.
        thresholds:
          yellow: "Any gap or undeclared overlap detected in OE"
          orange: "Gaps on two consecutive changes, or overlap requires REQUIRES_MANUAL_MERGE on PROFESSIONAL tier"
          red: "Gap in root IC clause coverage, or undeclared overlap on CONSEQUENTIAL tier"

      - name: MA.CompositionVerificationRate
        measures: >
          Percentage of multi-agent changes that reach MA.COMPOSITION_VERIFIED
          with a CP verdict of PASS or CONDITIONAL.
        collection: >
          Tracked per change. Calculated as rolling average over the last 20
          orchestrated changes.
        degradation_signal: >
          Declining rate or increasing FAIL verdicts.
        thresholds:
          yellow: "Rate drops below 95% over rolling window"
          orange: "Rate drops below 85%, or two consecutive FAIL verdicts"
          red: "Rate drops below 70%, or FAIL verdict on CONSEQUENTIAL tier"

    risk_tier_parameters:
      - parameter: Max Specialists / Depth
        definition: >
          Maximum number of concurrent specialists and maximum orchestration
          depth (nesting levels) permitted per change.
        values:
          CONSEQUENTIAL: "N/A — multi-agent not permitted"
          PROFESSIONAL: "8 specialists / depth 2"
          EXPLORATORY: "15 specialists / depth 3"
        evaluated_at: [MA.G1a]

      - parameter: Max Coupling Density
        definition: >
          Maximum permitted ratio of actual dependency/interaction edges
          between specialists to the maximum possible for that specialist
          count.
        values:
          CONSEQUENTIAL: "N/A"
          PROFESSIONAL: "0.5"
          EXPLORATORY: "0.6"
        evaluated_at: [MA.G1a, MA.G4b]

      - parameter: Composition Verifier
        definition: >
          Structural requirement for the agent or human producing the CP.
        values:
          CONSEQUENTIAL: "N/A"
          PROFESSIONAL: "Independent (conditionally adversarial)"
          EXPLORATORY: "Optional"
        evaluated_at: [MA.G4b]

      - parameter: Specialist Plan Approval
        definition: >
          Who must approve each specialist's EE.pre (base CFP G2) before
          execution.
        values:
          CONSEQUENTIAL: "N/A"
          PROFESSIONAL: "All by Operator"
          EXPLORATORY: "Risk-weighted sampling; delegatable to orchestrator"
        evaluated_at: [MA.G1a]

  dependencies: []

  base_gate_additions:
    - gate: G1
      additional_predicate_ref: "§7.0"
      description: >
        When MA.orchestration_mode is true on the IC, G1 also validates that
        clause_ids are present on all goal clauses (required for mechanical
        traceability) and that the operator level and risk tier permit
        multi-agent orchestration per §9.1.
```

---

## 3. The Wrapper Pattern

### 3.1 Architecture

The multi-agent extension introduces two layers around the base CFP specialist loops:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Root IC (human-authored)                                           │
│  INTENT ─G1→ MA.DECOMPOSED ─MA.G1a→ ┄┄┄┄┄ Decomposition Layer     │
│                                       │                             │
│              ┌────────────────────────┼──────────────────────┐      │
│              │  Specialist₁           │  Specialistₙ         │      │
│              │  Sub-IC₁               │  Sub-ICₙ             │      │
│              │  INTENT                │  INTENT               │      │
│              │   ─G1→ PLANNED         │   ─G1→ PLANNED        │      │
│              │   ─G2→ APPROVED        │   ─G2→ APPROVED       │      │
│              │   ─G3→ EXECUTING       │   ─G3→ EXECUTING      │      │
│              │   ─G4→ NARRATED        │   ─G4→ NARRATED       │      │
│              │   ─G5→ UNDERSTOOD      │   ─G5→ UNDERSTOOD     │      │
│              │   ─G6→ MERGED*         │   ─G6→ MERGED*        │      │
│              └────────────────────────┴──────────────────────┘      │
│                                       │                             │
│              ┄┄┄┄ Composition Layer  ─┘                             │
│  MA.G4a→ MA.COMPOSED ─MA.G4b→ MA.COMPOSITION_VERIFIED               │
│  ─MA.G5a→ NARRATED ─G5→ UNDERSTOOD ─G6→ MERGED                     │
└─────────────────────────────────────────────────────────────────────┘

* Specialist MERGED is scoped to the specialist's sub-task; it does
  not finalize the root change. Root MERGED occurs only after MA.G6.
```

### 3.2 Responsibilities by Layer

| Layer | Governed By | Responsible Agent | What It Controls |
|---|---|---|---|
| Decomposition | This extension (above inner loops) | Orchestrator | Root IC → Sub-IC transformation; scope partition; intent propagation |
| Specialist Execution | Base CFP (inner loop) | Each Specialist | Sub-IC execution; plan approval; scope gating; theory reconstruction per sub-task |
| Composition | This extension (below inner loops) | Orchestrator + Verifier | Aggregation of specialist outputs; emergent property detection; independent verification |
| Root Theory Reconstruction | Base CFP (G5, G6) | Operator | Operator passes composition-level Theory Challenges; root change merged |

### 3.3 Operator Review Surface

The protocol restricts what the operator reviews at each gate to prevent cognitive overload.

- At **MA.G1a**: The operator reviews the OE — decomposition rationale, coverage, coupling density, drift check, and scope partition integrity. Drill-down to individual Sub-ICs is available.
- At **specialist G2** (per sub-task): Depending on the risk tier's Specialist Plan Approval parameter (§9.2), the operator reviews some or all specialist EE.pre plans.
- At **MA.G4b / MA.G5a**: The operator reviews the independent CP verdict, any CONDITIONAL conditions, and composition-level Theory Challenges. Drill-down to individual specialist RPs via hash links is always available.
- At **G5 (root)**: Operator passes composition challenges plus the standard minimum theory challenges.

The operator is not required to read every specialist's intermediate artifact. The composition layer surfaces the aggregated picture; hash links guarantee auditability without mandating exhaustive review.

---

## 4. Augmented State Machine

### 4.1 Orchestrated Path

```
INTENT ─G1*→ MA.DECOMPOSED ─MA.G1a→ MA.SPECIALIST_EXECUTING
  ─MA.G4a→ MA.COMPOSED ─MA.G4b→ MA.COMPOSITION_VERIFIED
  ─MA.G5a→ NARRATED ─G5→ UNDERSTOOD ─G6→ MERGED
```

`*` G1 evaluates the additional predicate for `MA.orchestration_mode` (§7.0).

`MA.SPECIALIST_EXECUTING` is a macro-state representing the concurrent execution of all specialist base CFP loops. The root protocol remains in this macro-state until all specialists have reached their `NARRATED` state internally.

### 4.2 State Descriptions

| State | Description | Owner |
|---|---|---|
| `MA.DECOMPOSED` | Orchestrator has produced the OE: Sub-ICs, scope partition, coupling metrics, and intent propagation verification. | Orchestrator |
| `MA.SPECIALIST_EXECUTING` | Each specialist runs a complete unmodified base CFP loop against its Sub-IC. | Specialists |
| `MA.COMPOSED` | All specialists have reached `NARRATED`. Orchestrator produces the Composition Narrative (CN). | Orchestrator |
| `MA.COMPOSITION_VERIFIED` | Independent Composition Verifier produces the Composition Proof (CP). | Verifier |

Base states `NARRATED`, `UNDERSTOOD`, and `MERGED` are entered by the root change after the composition layer completes.

---

## 5. Extended Definitions

The following terms are specific to this extension. Base CFP definitions remain in the [Control Fidelity Protocol](control-fidelity-protocol.md) §1.

| Term | Definition |
|---|---|
| **Orchestrator Agent** | An agent that receives the root Intent Contract and decomposes it into Sub-ICs. Does not modify the system directly (`has_write_access: false` enforced in OE). |
| **Specialist Agent** | An agent that executes a sub-task within a scope partition assigned by the orchestrator. Each specialist runs a full unmodified base CFP loop. |
| **Intent Contract Chain** | The linked sequence of Intent Contracts from the root (human-authored) through each decomposition layer. Hash-linked for auditability. |
| **Scope Partition** | The non-overlapping division of the root IC's scope across specialist agents. Documented in the OE with explicit overlap enforcement strategies. |
| **Composition Verifier** | An independent agent (or operator) that evaluates the composed output for emergent properties. Produces the Composition Proof. Must be structurally adversarial at CONSEQUENTIAL tier. |
| **Intent Drift** | Semantic divergence between the root IC and a Sub-IC. Measured via clause traceability, altered constraints, and acceptance criteria misalignment. |
| **Coupling Density** | Ratio of actual dependency edges and interaction pairs between specialists to the maximum possible for that specialist count. Formula: `actual_edges / (n × (n-1) / 2)` where `n` is the number of specialists. |
| **Structural Adversariality** | Requirement that the Composition Verifier differs from the orchestrator in model family, framing, and objective. Prevents common-mode failure where verifier and executor share the same blind spots. |

---

## 6. Extended Artifact Schemas

> All artifacts are **append-only**. No field may be retroactively modified. Artifacts are named with the `MA.` namespace prefix to distinguish them from base CFP artifacts.

### 6.1 Sub-IC

A Sub-IC is structurally identical to a base IC with additional chain-of-custody fields added via the IC extension slot (§2 manifest). Sub-ICs are authored by the orchestrator, not the human operator, but they are immutably bound to the root IC's constraints.

Key extension fields (full listing in the manifest, §2):

```yaml
MA.root_ic_ref: CHG-2026-0047          # root change_id
MA.parent_ic_ref: CHG-2026-0047        # immediate parent (equals root for depth-1)
MA.inherited_constraints:
  - "Payments module must not increase p99 latency."
  - "No new external dependencies may be added."
MA.cross_agent_assumptions:
  - "Specialist-2 will update the gateway client interface before this specialist reads it."
MA.traces_to_root: true
MA.trace_type: DIRECT                  # or DERIVED (requires justification field)
```

### 6.2 Orchestration Envelope (OE)

Produced by the orchestrator at `MA.DECOMPOSED`. The OE is the formal record of the decomposition layer.

```yaml
oe_id: OE-2026-0047
root_ic_ref: CHG-2026-0047
produced_by: orchestrator-agent-id

capability_declaration:
  has_write_access: false              # enforced; MA.G1a fails if true

decomposition:
  sub_tasks:
    - sub_ic_ref: CHG-2026-0047-S1
      specialist_id: specialist-agent-1
      assigned_scope:
        includes: ["payments/gateway_client.py"]
        excludes: ["payments/ledger.py"]
      context_provided: "Root IC CL-001, inherited constraints, API contract v2.3"
    # ... additional specialists

validation:
  coverage_check:
    root_clauses_total: 3
    root_clauses_covered: 3
    uncovered_clauses: []
  overlap_check:
    overlapping_pairs: []
    merge_strategies: {}             # populated if overlaps exist
    # merge_strategy values: SEQUENTIAL | CONVENTION_PARTITIONED | REQUIRES_MANUAL_MERGE

coupling_metrics:
  specialist_count: 3
  dependency_edges: 2
  interaction_pairs: 1
  coupling_density: 0.33             # 2 / (3 × 2 / 2) = 0.33; must be ≤ tier ceiling

intent_propagation_verification:
  traces_complete: true
  derived_traces:
    - sub_ic_ref: CHG-2026-0047-S2
      clause_id: CL-002
      justification: "Gateway interface update is a necessary precondition for CL-002."
```

### 6.3 Composition Narrative (CN)

Produced by the orchestrator at `MA.COMPOSED`. The CN is the orchestrator's explanatory account of how specialist outputs combine.

```yaml
cn_id: CN-2026-0047
root_ic_ref: CHG-2026-0047
produced_by: orchestrator-agent-id

specialist_summaries:
  - specialist_id: specialist-agent-1
    rp_ref: RP-2026-0047-S1
    rp_hash: sha256:abc123
    outcome_summary: "Gateway client updated; latency p99 unchanged per test results."

interaction_map:
  - agents: [specialist-agent-1, specialist-agent-2]
    interaction_type: INTERFACE_DEPENDENCY
    description: "Agent-2 consumes the interface Agent-1 modified."
    risk_level: MEDIUM
    mitigation: "Interface contract pinned in Sub-IC-2 cross_agent_assumptions."

emergent_properties:
  - description: "Combined change alters request routing for retry paths."
    assessed_risk: LOW
    basis: "Routing logic is deterministically tested."

global_invariant_check:
  invariants_in_scope: [INV-012, INV-019]
  orchestrator_verdict: PASS
  notes: "INV-012 verified deterministically. INV-019 assessed via structured analysis."

note: >
  The CN represents the orchestrator's perspective. It is not an independent
  verdict. The authoritative verdict is provided by the CP (see §6.4).
```

### 6.4 Composition Proof (CP)

Produced by the independent Composition Verifier at `MA.COMPOSITION_VERIFIED`. The CP is the authoritative verdict.

```yaml
cp_id: CP-2026-0047
root_ic_ref: CHG-2026-0047
produced_by: verifier-agent-id
verifier_adversarial: true           # required at CONSEQUENTIAL; declared at all tiers

assumption_verdicts:
  - assumption: "Specialist-2 consumes Agent-1's interface without modification."
    verdict: CONFIRMED
    method: DETERMINISTIC
    evidence: "Integration test suite covers the interface contract."

interaction_risk:
  - interaction_ref: "CN interaction: specialist-agent-1 × specialist-agent-2"
    structural_signal: "Shared state in payments/session.py"
    assessed_risk: LOW
    method: STRUCTURED_ANALYSIS

emergent_properties:
  - description: "Retry path routing change."
    independent_assessment: "Low risk confirmed. Deterministic test coverage present."
    method: DETERMINISTIC

global_invariant_results:
  - invariant: INV-012
    result: PASS
    method: DETERMINISTIC
  - invariant: INV-019
    result: PASS
    method: STRUCTURED_ANALYSIS

deterministic_verdict_ratio: 0.75    # must meet tier threshold (§9.2)

overall_verdict: PASS                # PASS | CONDITIONAL | FAIL
conditions: []                       # populated for CONDITIONAL verdict; operator must accept

verification_method_summary:
  DETERMINISTIC: 3
  STRUCTURED_ANALYSIS: 1
  LLM_ASSESSED: 0
```

---

## 7. Orchestration Gates

> All gate predicates must evaluate to `TRUE`. Any `FALSE` triggers the associated error state.

### 7.0 G1 Additional Predicate (Multi-Agent)

Applied to base `G1` when `MA.orchestration_mode: true` on the IC.

| Check | Condition |
|---|---|
| Clause IDs present | All `goal` clauses carry a `clause_id` (required for mechanical traceability). |
| Access permitted | Operator level and risk tier combination is permitted per §9.1. |
| Risk tier valid | `MA.orchestration_mode` on a CONSEQUENTIAL IC → `G1 FALSE` (multi-agent never permitted on CONSEQUENTIAL). |

### 7.1 MA.G1a (`MA.DECOMPOSED → MA.SPECIALIST_EXECUTING`)

| Check | Condition |
|---|---|
| Tool separation | OE `has_write_access` is `false`. |
| Partition completeness | All root IC clauses are covered by at least one Sub-IC (OE `coverage_check.uncovered_clauses` is empty). |
| No undeclared overlaps | OE `overlap_check.overlapping_pairs` is empty, or every overlap has a declared `merge_strategy`. |
| No context contradictions | No contradictory assumptions detected across sibling Sub-IC `MA.cross_agent_assumptions` fields. |
| Traceability passes | `MA.traces_to_root: true` on every Sub-IC; all DERIVED traces carry a falsifiable justification. |
| Depth within tier limit | Orchestration depth does not exceed the tier's Max Specialists / Depth parameter (§9.2). |
| Coupling within tier limit | OE `coupling_metrics.coupling_density` does not exceed the tier's Max Coupling Density parameter (§9.2). |
| Operator approved | Operator has reviewed and approved the decomposition. |

### 7.2 MA.G4a (`MA.SPECIALIST_EXECUTING → MA.COMPOSED`)

| Check | Condition |
|---|---|
| All specialists narrated | Every specialist has reached `NARRATED` in its inner base CFP loop. |
| Scope negotiations logged | Any scope negotiation between specialists during execution is serialized in the OE audit trail. |
| CN exists | The Composition Narrative artifact is present and structurally valid. |

### 7.3 MA.G4b (`MA.COMPOSED → MA.COMPOSITION_VERIFIED`)

| Check | Condition |
|---|---|
| CP exists | The Composition Proof artifact is present and structurally valid. |
| Segregation of duties | Verifier identity differs from orchestrator identity; at CONSEQUENTIAL, structural adversariality is confirmed (different model family). |
| Verification methods declared | Every CP verdict carries an explicit `method` declaration. |
| Deterministic ratio met | CP `deterministic_verdict_ratio` meets the tier threshold (§9.2). |
| Global invariants hold | All `invariants_in_scope` show `result: PASS` in the CP. |
| Complexity ceiling not exceeded | System-level coupling density ceiling not breached (§10.2). |
| CP verdict acceptable | CP `overall_verdict` is `PASS`, or `CONDITIONAL` and the operator has explicitly accepted the stated conditions. |

### 7.4 MA.G5a (`MA.COMPOSITION_VERIFIED → NARRATED`)

| Check | Condition |
|---|---|
| Specialist chain present | Root RP `MA.specialist_rp_chain` contains a hash-linked entry for every specialist's RP. |
| CN and CP referenced | Root RP references both `cn_id` and `cp_id`. |
| Composition challenges included | Root RP `challenges` includes at least the minimum number of composition-layer challenges for the risk tier. |

---

## 8. Error States and Recovery

| Error State | Trigger | Recovery Path | Resumes From |
|---|---|---|---|
| `MA.SCOPE_OVERLAP` | Undocumented overlap in the OE, or cross-agent modification of the same artifact without a declared merge strategy. | Orchestrator re-declares merge strategy or re-partitions scope. Operator reviews revised OE before MA.G1a re-evaluates. | `MA.DECOMPOSED` |
| `MA.INTENT_DRIFT` | Sub-IC missing traceability to root IC clauses, altered constraints, or acceptance criteria with no clause mapping. | Orchestrator regenerates the affected Sub-IC. If root intent is ambiguous, operator amends root IC and restarts from `INTENT`. | `MA.DECOMPOSED` |
| `MA.DECOMPOSITION_FAULT` | OE contains logical contradictions, orchestrator `has_write_access` is not `false`, or coupling density exceeds the tier ceiling. | Orchestrator re-decomposes. Operator may amend root IC scope or issue a CRR (§10.1). | `MA.DECOMPOSED` |
| `MA.COMPOSITION_INCOHERENCE` | CP `overall_verdict` is `FAIL`, or emergent behavior violates a global invariant, or cross-agent assumption contradictions detected post-execution. | Targeted specialist re-execution for affected sub-tasks, then re-entry at `MA.G4a`. If decomposition is flawed, re-decompose from `MA.DECOMPOSED`. If root intent must change, restart from `INTENT`. | `MA.COMPOSED` |

---

## 9. Access Controls and Risk Parameters

### 9.1 Multi-Agent Orchestration Access Matrix

Multi-agent orchestration is **never permitted on CONSEQUENTIAL systems**. On PROFESSIONAL systems, only operators at ENGINEER level have demonstrated the system mastery required to govern compositional incoherence risk.

| Operator Level | CONSEQUENTIAL | PROFESSIONAL | EXPLORATORY |
|---|---|---|---|
| APPRENTICE_1 | ❌ | ❌ | ❌ |
| APPRENTICE_2 | ❌ | ❌ | ❌ |
| JOURNEYMAN | ❌ | ❌ | ✅ |
| ENGINEER | ❌ | ✅ | ✅ |
| RESTRICTED | ❌ | ❌ | ✅ |
| ONBOARDING | ❌ | ❌ | ✅ |

The rationale for the CONSEQUENTIAL blanket prohibition: the compositional incoherence failure mode — where individually correct agent outputs produce systemically incoherent behavior — is unacceptable at CONSEQUENTIAL risk level given current verification capabilities. See [Multi-Agent Orchestration](multi-agent.md) for the theoretical basis.

See [The Operator Model](operator-model.md) for operator level definitions, progression criteria, and the RESTRICTED/ONBOARDING entry paths.

### 9.2 Extension-Specific Risk Tier Parameters

The following rows extend the base CFP risk tiering table. They are evaluated at the gates specified and apply only when the multi-agent extension is active.

| Parameter | CONSEQUENTIAL | PROFESSIONAL | EXPLORATORY |
|---|---|---|---|
| **Max Specialists / Depth** | N/A | 8 / depth 2 | 15 / depth 3 |
| **Max Coupling Density** | N/A | 0.5 | 0.6 |
| **Composition Verifier** | N/A | Independent (conditionally adversarial) | Optional |
| **Specialist Plan Approval** | N/A | All by Operator | Risk-weighted sampling; delegatable |
| **Min Composition Challenges** | N/A | 1 (in addition to base min) | Optional |
| **Deterministic Verification Ratio** | N/A | ≥50% of CP verdicts | Tracked |

---

## 10. Complexity Ceilings

### 10.1 Complexity Reduction Request (CRR)

At any point before or after `MA.G1a`, the operator can declare a CRR if the decomposition is too dense to permit theory reconstruction. A CRR is a **steering input**, not a `MA.DECOMPOSITION_FAULT`. It forces the orchestrator to produce a simpler decomposition — fewer specialists, lower coupling, or narrower sub-task scope.

A CRR does not block the protocol. The orchestrator re-decomposes and the revised OE is evaluated at `MA.G1a`. The CRR is logged in the OE audit trail as part of the observable record.

### 10.2 System-Level Complexity Ceiling

When coupling density exceeds `0.6`, or when the number of sub-tasks and interactions mathematically exceeds human spot-checking capacity, the orchestration hits a **hard ceiling**. This ceiling is not overridable.

When the ceiling is reached, the operator must choose one of:

- **Decompose the change**: Split into multiple sequential root changes, each with its own IC and root CFP loop.
- **Elevate to Adversarial Monitoring**: Shift to a human-over-the-loop model requiring:
  - Dual independent adversarial verifiers producing independent CPs.
  - Consensus requirement: both CPs must return `PASS` or an agreed `CONDITIONAL`.
  - 100% deterministic global invariant verification.
  - Second-order Theory Challenges (the operator must hold theory of the monitoring layer, not just the change).

Adversarial Monitoring is not an upgrade — it is a last resort before work must be sequenced. The monitoring agents must be structurally adversarial (different model families, different context framing, adversarial reward signal) to prevent common-mode failure.

---

## 11. Orchestration Gauges

The following gauges are registered by this extension via the gauge registration mechanism of the [CFP Extension Layer](cfp-extension-layer.md) (§2.4). Full definitions are in the manifest (§2). They supplement the base gauges (Prediction Accuracy, Scope Breach Rate, Time-to-Explain, Invariant Staleness) and the operator model gauges defined in [Instrumentation](instrumentation.md).

| Gauge | Measures | Degradation Signal |
|---|---|---|
| **MA.IntentPropagationFidelity** | Percentage of root IC clauses mechanically covered by at least one Sub-IC. | Coverage below 100%, or growing proportion of unjustified DERIVED traces. |
| **MA.CrossAgentContextConsistency** | Whether sibling specialists received mutually consistent architectural context. | Contradictory assumptions across concurrent agents. |
| **MA.DecompositionCoherence** | Whether the OE covers the root IC without gaps or overlaps. | Missing coverage or undeclared overlaps. |
| **MA.CompositionVerificationRate** | Percentage of multi-agent changes with a PASS or CONDITIONAL CP verdict. | Declining rate or increasing FAIL verdicts. |

### Failure Thresholds

| Level | Signal | Response |
|---|---|---|
| **🟡 Yellow** | Intent Propagation Fidelity below 100% on any change. Decomposition Coherence gap detected. One contradictory assumption pair. Composition Verification Rate below 95%. | Operator reviews OE more closely. Agentic Engineer audits recent orchestrator decompositions. |
| **🟠 Orange** | Intent Propagation Fidelity below 95% on two consecutive changes. Two or more contradictory assumption pairs on a single change. Composition Verification Rate below 85% or two consecutive FAIL verdicts. | Halt new multi-agent changes. Operator performs manual decomposition review. Agentic Engineer escalates to preceptor if operator progression is relevant. |
| **🔴 Red** | Any root IC constraint absent from all Sub-ICs. Undeclared overlap on CONSEQUENTIAL tier (gate failure). Composition Verification Rate below 70%. CP FAIL on CONSEQUENTIAL tier. | Full stop on multi-agent changes. Comprehensive decomposition audit. System-wide theory reconstruction for affected modules. Review whether multi-agent access should be revoked for the triggering operator. |

---

## 12. Segregation of Duties

### 12.1 Orchestrator and Verifier Roles

The orchestrator produces the Composition Narrative (CN): its own explanatory account of how specialist outputs combine. The CN is transparent about its provenance — it is the account of the agent that designed the decomposition.

The Composition Verifier produces the Composition Proof (CP): an independent, authoritative verdict. The CP is the control artifact; the CN is informational context for the operator and verifier.

This segregation matters because the orchestrator is simultaneously the architect and the narrator of the decomposition. It cannot be the auditor of its own work. The CP gives the operator an independent signal.

### 12.2 Structural Adversariality at PROFESSIONAL and CONSEQUENTIAL

On PROFESSIONAL systems, the Composition Verifier must be independent — a different agent instance with no shared execution context. Conditional adversariality (separate prompt framing) is acceptable.

On CONSEQUENTIAL systems, multi-agent is not permitted. If the ceiling elevation path (§10.2) is invoked under Adversarial Monitoring on PROFESSIONAL, the monitoring agents must be structurally adversarial: different model family, different context framing, and an explicitly adversarial objective (the agent is rewarded for finding incoherence, not for confirming correctness).

### 12.3 Verification Method Hierarchy

CP verdicts must declare their method. Methods are ordered by reliability:

| Method | Description | Minimum Use |
|---|---|---|
| `DETERMINISTIC` | Result determined by automated test, proof, or formal analysis. Not subject to LLM judgment. | Preferred for all invariant checks. |
| `STRUCTURED_ANALYSIS` | Result determined by a structured reasoning process with explicit steps and checkable outputs. | Acceptable when deterministic methods are not available. |
| `LLM_ASSESSED` | Result determined by unstructured LLM judgment without explicit reasoning steps. | Flagged prominently. Counts against the deterministic verification ratio. |

At PROFESSIONAL tier, at least 50% of CP verdicts must use `DETERMINISTIC` methods. `LLM_ASSESSED` verdicts must be explicitly surfaced to the operator at the `MA.G4b` review gate.
