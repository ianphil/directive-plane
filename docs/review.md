# Adaptive Operator Model — Review

Post-brainstorm review of `adaptive-operator-model.md`. Cross-referenced against the Directive Plane and CFP compact documents.

---

## Contradictions

### 1. ~~"Three entry paths to RESTRICTED" — actually two~~

**Resolved.** Fixed to "two entry paths" (circuit breaker and onboarding). Added clarifying note that APPRENTICE_1 Socratic mode is mechanically similar but distinct due to active coaching.

### 2. ~~Open Item #4 resolution text omits JOURNEYMAN from EXPLORATORY multi-agent~~

**Resolved.** Added JOURNEYMAN to the Open Item #4 resolution text to match the multi-agent matrix.

### 3. ~~Per-subsystem currency vs. global RESTRICTED state~~

**Resolved.** Global restriction with scoped trigger and recovery. Circuit breaker fires when any subsystem's Prediction Accuracy drops below threshold → operator is RESTRICTED everywhere. Recovery credit only accrues from the triggering subsystem(s). Operator can work anywhere under RESTRICTED mode (team still gets value), but must demonstrate improvement on the weak area to restore agent access. `circuit_breaker.triggered_by` field tracks the triggering subsystem(s).

### 4. ~~Risk tier declared by operator vs. repo designation controlling different things~~

**Resolved.** G6 now blocks merging EXPLORATORY-tier changes to production repos, regardless of operator level. Operators can still declare EXPLORATORY on production repos for feature-branch exploration (G1 warns, doesn't block), but the code can't ship until re-executed under PROFESSIONAL or CONSEQUENTIAL tier. This makes G6 the hard backstop: repo designation controls mode (G3), declared tier controls intensity, and G6 prevents the loose-intensity path from reaching production.

---

## Gaps

### 5. ~~LP7 is missing~~

**Resolved.** Renumbered LP8 → LP7. No gap in leverage point numbering.

### 6. ~~SUSPENDED state is underspecified~~

**Resolved.** SUSPENDED triggers after 2× the recovery window (default 28 days) in RESTRICTED with no sustained improvement trend. Operationally it's RESTRICTED with tighter scope gates and preceptor paired on every change (direct mentorship, not async trail review). Preceptor designs the recovery path. Recovery is two-step: SUSPENDED → RESTRICTED (preceptor-attested) → CURRENT (normal recovery). Calibration defaults added to the circuit breaker threshold table.

### 7. ~~`craft_level` vs. `progression_stage` — relationship undefined~~

**Resolved.** `craft_level` is an input assessment (set by preceptor, not protocol) that constrains the starting point: JUNIOR → APPRENTICE_1, SENIOR on new team → ONBOARDING. `progression_stage` is protocol state driven by gauges + preceptor attestation. craft_level informs preceptor judgment but doesn't mechanically gate transitions.

### 8. ~~`execution_mode` in the IC vs. append-only rule~~

**Resolved.** `execution_mode` is blank at IC creation and appended by G3 when it resolves mode from operator level × repo designation. This is a clean append, not a modification — consistent with the IC append-only invariant.

### 9. ~~New gauges have no failure thresholds~~

**Resolved.** New gauges integrated into the yellow/orange/red failure threshold framework with signal descriptions and response actions at each level. Follows the same pattern as existing gauges — qualitative signals calibrated by the Agentic Engineer, not hardcoded numbers.

### 10. ~~No escalation/override path for RESTRICTED~~

**Resolved.** Escalation override exists: engineering director or above can temporarily restore agent access. Time-boxed, written justification required, scores continue accruing during override, logged and auditable. Override suspends enforcement but doesn't heal the circuit breaker — when it expires, actual Prediction Accuracy determines state. Frequent overrides are a signal of organizational dysfunction, not a reason to weaken the circuit breaker.

### 11. ~~THEORY_FAILURE ↔ circuit breaker interaction not specified~~

**Resolved.** Theory Challenge scoring uses a halving decay: first-attempt pass = 1.0, second = 0.5, third = 0.25, fourth attempt = 0.0 with Agentic Engineer dispatched to understand and approve merge. Score feeds the rolling Prediction Accuracy window. Multiple challenges per change (risk tier dependent) use minimum score across all challenges. Fourth-attempt escalation prevents indefinite blocking while ensuring qualified review.

---

## Weak Mitigations

### 12. ~~R5 (Confidence Divergence) mitigation is hand-waved~~

**Resolved.** R5 analysis expanded to recognize that theory has two qualities: construction depth (built by hand vs. reconstructed from agent output) and craft-weighted reasoning (craft maturity of the theory holder). Junior-built theory is overconfident (genuine but blind to craft-level concerns). Senior-reconstructed theory is underconfident (shallower direct knowledge, compensated by craft maturity). New **Theory Confidence Distribution** gauge tracks both axes per module and alarms on single-axis coverage. Agentic Engineer directs LP4 cognitive maintenance at the specific gap: seniors do code archaeology on agent-built modules (construction depth), juniors get targeted complex-module exposure under mentorship (craft reasoning).

### 13. ~~RESTRICTED/ONBOARDING multi-agent on EXPLORATORY may undermine recovery~~

**Resolved.** The preceptor (engineering manager) monitors recovery velocity — whether the RESTRICTED operator is making recovery-eligible changes on the triggering subsystem(s). If the operator avoids recovery work, the preceptor raises it and adjusts work assignments. This is a management responsibility, not a protocol mechanism. The protocol provides visibility (scoped trigger, recovery credit tracking); the preceptor acts on it.

---

## Structural Observations

Not bugs — decisions that should be made explicitly.

### 14. ~~SOCRATIC execution_mode covers two very different experiences~~

**Resolved.** Keep single SOCRATIC execution_mode. Sub-mode (full scaffold vs. tutor only) is derived from `progression_stage` — APPRENTICE_1 = scaffold, APPRENTICE_2 = tutor. execution_mode answers "how does execution work?", progression_stage answers "what scaffolding level?" Documented in IC field semantics.

### 15. ~~JOURNEYMAN "elevated challenges" is unquantified~~

**Resolved.** Elevated = +1 challenge above ENGINEER count per risk tier (CONSEQUENTIAL: 4 vs. 3, PROFESSIONAL: 3 vs. 2). Challenge difficulty stays calibrated to the subsystem, not the operator level. Additional volume forces more reconstruction practice.
