# CFP Reference (Token-Optimized)

## Terms

- **Change**: Human-initiated, agent-executed system modification
- **IC**: Intent Contract — canonical structured intent (goal, scope, constraints, acceptance criteria, invariants)
- **Sub-IC**: IC for specialist agent; inherits constraints verbatim, traces to root IC clauses
- **OE**: Orchestration Envelope — decomposition plan, scope partitions, coupling metrics
- **EE**: Execution Envelope — PRE (plan) + POST (results mapped to IC)
- **CN**: Composition Narrative — orchestrator explains how parts combine
- **CP**: Composition Proof — independent verifier verdict (methods: DETERMINISTIC > STRUCTURED_ANALYSIS > LLM_ASSESSED)
- **RP**: Reconstruction Proof — narrative + theory challenges operator must pass
- **Gate**: Boolean predicate; FALSE → error state
- **Invariant**: Falsifiable system statement; must hold unless IC explicitly modifies
- **Operator Currency**: CURRENT ↔ LAPSED → RESTRICTED → SUSPENDED
- **Intent Drift**: Semantic divergence between root IC and Sub-IC
- **Coupling Density**: actual dependency edges / max possible edges
- **CRR**: Complexity Reduction Request — operator forces simpler decomposition

## Three Planes

1. **Directive**: Intent → constrained action (IC, Sub-IC, OE, Invariants)
2. **Execution**: Agents write code/tests (EE.pre, EE.post, code)
3. **Reconstruction**: Theory flows back to human (RP, CN, CP)

## State Machines

### Single-Agent
```
INTENT →G1→ PLANNED →G2→ APPROVED →G3→ EXECUTING →G4→ NARRATED →G5→ UNDERSTOOD →G6→ MERGED
```

### Orchestrated
```
INTENT →G1→ DECOMPOSED →G1a→ SPECIALIST_EXECUTING* →G4a→ COMPOSED →G4b→ COMPOSITION_VERIFIED →G5a→ NARRATED →G5→ UNDERSTOOD →G6→ MERGED

*Each specialist runs: PLANNED → APPROVED → EXECUTING → NARRATED internally
```

## Gate Predicates

| Gate | Transition | Key Checks |
|---|---|---|
| G1 | INTENT→PLANNED/DECOMPOSED | IC valid, goal+scope non-empty, criteria falsifiable, invariant dispositions known, currency valid. Orchestrated: clause IDs present |
| G1a | DECOMPOSED→SPECIALIST_EXEC | Orchestrator has no write access, partition complete, no contradictions, traceability passes, depth/coupling in tier limits, operator approved |
| G2 | PLANNED→APPROVED | EE.pre within IC scope, magnitude within tier, invariants align |
| G3 | APPROVED→EXECUTING | Sandbox bounded to planned_modifications only |
| G4 | EXECUTING→NARRATED | EE.post complete, no unmapped/unplanned mods, criteria pass, invariants held |
| G4a | SPECIALIST_EXEC→COMPOSED | All specialists NARRATED, scope negotiations logged, CN exists |
| G4b | COMPOSED→COMP_VERIFIED | CP exists, adversariality (CONSEQUENTIAL), methods declared, global invariants hold, verdict PASS/CONDITIONAL, complexity ceiling OK |
| G5a | COMP_VERIFIED→NARRATED | RP has specialist hashes, CN/CP referenced, composition challenges met |
| G5 | NARRATED→UNDERSTOOD | Operator passed theory challenges, theory_reconstructed=true |
| G6 | UNDERSTOOD→MERGED | IR updated, artifacts committed, gauges recorded, no errors |

## Artifact Fields (Key)

### IC / Sub-IC
- Identity: `change_id`, `operator_currency`, `risk_tier`
- Intent: `goal` (with `clause_ids`), `scope` (includes/excludes), `constraints`, `non_goals`, `acceptance_criteria`, `invariants_in_scope`
- Sub-IC adds: `root_ic_ref`, `parent_ic_ref`, `inherited_constraints` (immutable), `cross_agent_assumptions`, `trace_type: DIRECT|DERIVED`

### OE
- `has_write_access: false` (enforced)
- `sub_tasks` → specialist Sub-ICs + `assigned_scope`
- `coverage_check`, `overlap_check`, overlap strategy: SEQUENTIAL | CONVENTION_PARTITIONED | REQUIRES_MANUAL_MERGE
- Coupling: edge counts, interaction pairs, density

### EE
- PRE: `planned_modifications`, `anticipated_side_effects`, `test_plan`, `invariant_declarations`, `estimated_magnitude`
- POST: `actual_modifications` (mapped to IC), `unmapped_modifications` (→error), `unplanned_modifications` (→error), `acceptance_results`, `invariant_results`

### CP
- Assumption verdicts, interaction risk, emergent properties, global invariant verification
- Each verdict declares method: DETERMINISTIC | STRUCTURED_ANALYSIS | LLM_ASSESSED
- CONSEQUENTIAL: ≥80% deterministic

### RP
- Narrative + reasoning + dependencies
- Orchestrated: hash-linked specialist RPs (anti-laundering)
- Theory challenges (falsifiable predictions operator must answer)
- Attestation: `theory_reconstructed`

## Error States

| Error | Trigger | Recovery |
|---|---|---|
| SCOPE_VIOLATION/OVERLAP | Out-of-bounds work or undocumented overlap | Revise plan, expand IC, rollback; declare merge strategy |
| INTENT_MISMATCH/DRIFT | Missing traceability, altered constraints, failed criteria | Regenerate Sub-IC, rework, or amend root IC |
| THEORY_FAILURE | Operator fails challenge | Re-engage code, new challenge. **Cannot bypass** |
| INVARIANT_CONFLICT | Undeclared invariant violation | Revise or amend IC to declare modification |
| DECOMPOSITION_FAULT | OE contradictions or capability violations | Re-decompose, amend intent, reconfigure sandbox |
| COMPOSITION_INCOHERENCE | Emergent failure, assumption violation | Re-execute specialist, full re-decompose, or amend intent |

## Risk Tiers

| | CONSEQUENTIAL | PROFESSIONAL | EXPLORATORY |
|---|---|---|---|
| Files/Lines | 5/200 | 10/500 | 20/1000 |
| Specialists/Depth | 5/1 | 8/2 | 15/3 |
| Max Coupling | 0.4 | 0.5 | 0.6 |
| Theory Challenges | 3 (1 monitoring) | 2 | 1 |
| Deterministic Ratio | ≥80% | ≥50% | Tracked |
| Verifier | Structurally Adversarial | Independent (cond.) | Optional |
| Plan Approval | All by Operator | Risk-weighted sample | Delegatable |
| Invariant Staleness | 30d | 60d | 90d |
| Operator Currency | 14d | 30d | 60d |

## Complexity Ceiling (Hard, Not Overridable)

Triggers when coupling density >0.6, interactions, or sub-tasks exceed human spot-check capacity. Operator must either:
1. **Decompose** into sequential changes, or
2. **Elevate** to adversarial monitoring: dual independent adversarial verifiers, consensus, 100% deterministic global invariant verification, second-order theory challenges

## Key Rules

- All artifacts are **append-only** (no retroactive modification)
- Constraints inherited by Sub-ICs are **immutable**
- Orchestrator **never has write access**
- Traceability is **mechanical** (every Sub-IC clause → root IC clause)
- DERIVED traces require **falsifiable justification**
- Scope overlaps require explicit **merge_strategy**
- Segregation: orchestrator explains (CN), verifier judges (CP)
- CONSEQUENTIAL verifier must be **structurally adversarial** (different model family, framing, objective)
- LLM-assessed verdicts must be **explicitly flagged**
- THEORY_FAILURE **cannot be bypassed**

## Gauges

Prediction Accuracy · Scope Breach Rate · Time-to-Explain · Invariant Staleness · Intent Propagation Fidelity · Decomposition Coherence · Composition Verification Rate · Orchestrator Override Rate · Coupling Density Trend
