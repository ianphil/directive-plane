# Adaptive Operator Model — Review

Post-brainstorm review of `adaptive-operator-model.md`. Cross-referenced against the Directive Plane and CFP compact documents.

---

## Contradictions

### 1. "Three entry paths to RESTRICTED" — actually two

Line 519 claims RESTRICTED has three entry paths: "junior progression (Stage 1), circuit breaker, and senior onboarding." But the document itself explicitly distinguishes RESTRICTED from APPRENTICE in the "Why RESTRICTED Is Not APPRENTICE" section. APPRENTICE_1 is Socratic with full coaching — a different mode. RESTRICTED has two entry paths: circuit breaker and onboarding. The "three" claim contradicts the mode definitions.

### 2. Open Item #4 resolution text omits JOURNEYMAN from EXPLORATORY multi-agent

The Open Item #4 resolution says EXPLORATORY multi-agent is available to "ENGINEER, RESTRICTED, and ONBOARDING." But the multi-agent matrix gives JOURNEYMAN ✅ on EXPLORATORY, and the narrative text says "any operator with agent access (JOURNEYMAN+, RESTRICTED, ONBOARDING)." The open item resolution text is stale — it doesn't match the matrix it was supposed to resolve.

### 3. ~~Per-subsystem currency vs. global RESTRICTED state~~

**Resolved.** Global restriction with scoped trigger and recovery. Circuit breaker fires when any subsystem's Prediction Accuracy drops below threshold → operator is RESTRICTED everywhere. Recovery credit only accrues from the triggering subsystem(s). Operator can work anywhere under RESTRICTED mode (team still gets value), but must demonstrate improvement on the weak area to restore agent access. `circuit_breaker.triggered_by` field tracks the triggering subsystem(s).

### 4. ~~Risk tier declared by operator vs. repo designation controlling different things~~

**Resolved.** G6 now blocks merging EXPLORATORY-tier changes to production repos, regardless of operator level. Operators can still declare EXPLORATORY on production repos for feature-branch exploration (G1 warns, doesn't block), but the code can't ship until re-executed under PROFESSIONAL or CONSEQUENTIAL tier. This makes G6 the hard backstop: repo designation controls mode (G3), declared tier controls intensity, and G6 prevents the loose-intensity path from reaching production.

---

## Gaps

### 5. LP7 is missing

LP1–LP5 exist in the Directive Plane. This document introduces LP6 and LP8. LP7 is never mentioned. Intentional reservation or numbering oversight?

### 6. ~~SUSPENDED state is underspecified~~

**Resolved.** SUSPENDED triggers after 2× the recovery window (default 28 days) in RESTRICTED with no sustained improvement trend. Operationally it's RESTRICTED with tighter scope gates and preceptor paired on every change (direct mentorship, not async trail review). Preceptor designs the recovery path. Recovery is two-step: SUSPENDED → RESTRICTED (preceptor-attested) → CURRENT (normal recovery). Calibration defaults added to the circuit breaker threshold table.

### 7. `craft_level` vs. `progression_stage` — relationship undefined

The IC has both `craft_level: SENIOR | MID | JUNIOR` and `progression_stage: APPRENTICE_1 | ... | ENGINEER`. Can a JUNIOR be JOURNEYMAN? Can a MID be ENGINEER? Is craft_level an input assessment that constrains which progression stages are reachable, or are they independent? The mapping rules are missing.

### 8. `execution_mode` in the IC vs. append-only rule

The IC field shows `execution_mode: SOCRATIC | RESTRICTED | STANDARD`, but the document says G3 "resolves execution mode" at runtime. The CFP requires ICs to be append-only. If execution_mode is pre-populated at IC creation and G3 changes it, that violates append-only. If it's left blank and filled at G3, that's fine but should be stated. When exactly is this field written?

### 9. New gauges have no failure thresholds

The Directive Plane defines yellow/orange/red failure thresholds for its gauges. The three new gauges (Test Quality Gap, Invariant Awareness, Socratic Iteration Count) have degradation signals described qualitatively ("gap not closing," "low or declining") but no quantitative thresholds or integration into the yellow/orange/red framework. They're gauges without alarm setpoints.

### 10. No escalation/override path for RESTRICTED

The nuclear analogy is used throughout, but nuclear plants have documented procedures for overriding safety systems under extraordinary circumstances (with extensive documentation and accountability). The document doesn't address whether RESTRICTED can ever be overridden by organizational authority above the Agentic Engineer/Preceptor. If the answer is "no override, ever" (consistent with "a plant that can't afford to SCRAM is already unsafe"), that should be stated explicitly. If there is an override, it needs documentation.

### 11. THEORY_FAILURE ↔ circuit breaker interaction not specified

The CFP has a per-change THEORY_FAILURE error state (operator fails a challenge → must re-engage). The circuit breaker operates on a rolling Prediction Accuracy window. The connection is implicit (failed challenges presumably feed the rolling window) but never stated. Does a THEORY_FAILURE at G5 count as a 0 in the rolling window? What about partial passes?

---

## Weak Mitigations

### 12. ~~R5 (Confidence Divergence) mitigation is hand-waved~~

**Resolved.** R5 analysis expanded to recognize that theory has two qualities: construction depth (built by hand vs. reconstructed from agent output) and craft-weighted reasoning (craft maturity of the theory holder). Junior-built theory is overconfident (genuine but blind to craft-level concerns). Senior-reconstructed theory is underconfident (shallower direct knowledge, compensated by craft maturity). New **Theory Confidence Distribution** gauge tracks both axes per module and alarms on single-axis coverage. Agentic Engineer directs LP4 cognitive maintenance at the specific gap: seniors do code archaeology on agent-built modules (construction depth), juniors get targeted complex-module exposure under mentorship (craft reasoning).

### 13. RESTRICTED/ONBOARDING multi-agent on EXPLORATORY may undermine recovery

A RESTRICTED operator whose theory degraded can use multi-agent orchestration on EXPLORATORY repos. The document says EXPLORATORY work doesn't count toward recovery. But the operator might spend time on EXPLORATORY multi-agent work *instead of* doing recovery work on the system where they're RESTRICTED. There's no mechanism to ensure recovery work actually happens — just that EXPLORATORY doesn't get credit for it.

---

## Structural Observations

Not bugs — decisions that should be made explicitly.

### 14. SOCRATIC execution_mode covers two very different experiences

`execution_mode` has three values: SOCRATIC, RESTRICTED, STANDARD. But SOCRATIC encompasses both "full scaffold" (agent writes tests + active coaching) and "tutor only" (operator writes tests, agent coaches). These are materially different agent behaviors. The distinction is carried by `progression_stage` (APPRENTICE_1 vs. APPRENTICE_2), but anyone reading the IC's `execution_mode: SOCRATIC` can't tell which mode they're in without cross-referencing. Consider whether SOCRATIC_SCAFFOLD and SOCRATIC_TUTOR should be separate execution modes.

### 15. JOURNEYMAN "elevated challenges" is unquantified

The matrix says JOURNEYMAN gets "Standard + elevated challenges" on CONSEQUENTIAL/PROFESSIONAL. The CFP specifies challenge counts per risk tier (3/2/1). Does "elevated" mean more challenges than ENGINEER gets? Harder challenges? Both? This is a key differentiator for the JOURNEYMAN stage and it's undefined.
