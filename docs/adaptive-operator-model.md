# Adaptive Operator Model — Brainstorm Draft

## A Socratic Execution Mode and Competency-Gated Agent Access for the Directive Plane

*Draft — February 2026*

---

## Open Items

### 1. System Dynamics Impact
~~What new stocks does this model introduce?~~ **Resolved.** See "System Dynamics Analysis" section below.

### 2. Threshold Calibration
What are the right thresholds for the Theory Challenge circuit breaker? Too sensitive → constant disruption, breeds resentment and evasion. Too lenient → never fires, becomes decorative. How does calibration vary across risk tiers, team sizes, and system complexity? Who calibrates — the Agentic Engineer? The preceptor? An organizational standard?

### 3. Preceptor Role in Protocol Artifacts
How does the preceptor formally appear in the CFP? Do they co-sign Intent Contracts? Review Socratic trails as a gate? Attest to stage progression? Is the preceptor a specialization of the Agentic Engineer role, or a distinct role that collaborates with it?

### 4. Interaction with Multi-Agent Orchestration
~~Can a junior operator participate in orchestrated (multi-agent) mode at all?~~ **Resolved.** Multi-agent orchestration is gated by both operator level and repo designation:
- **CONSEQUENTIAL:** Multi-agent not allowed. The compositional incoherence risk is too high for systems where failure has legal, safety, or large-scale economic impact. Single-agent only.
- **PROFESSIONAL:** ENGINEER-only. Orchestration requires the full theory reconstruction capacity that comes with demonstrated system mastery.
- **Non-production (EXPLORATORY):** Available to ENGINEER, RESTRICTED, and ONBOARDING — operators who have agent access in EXPLORATORY. APPRENTICE_1 and APPRENTICE_2 do not get multi-agent access anywhere.

Remaining question: does the Socratic mode need any adaptation for operators who use multi-agent on non-production repos, or is standard protocol sufficient since the stakes are low?

### 5. Socratic Mode and Risk Tier Interaction
~~Does Socratic mode sit alongside the risk tier matrix as an independent axis?~~ **Partially resolved.** The Execution Mode × Risk Tier Matrix defines the interaction: EXPLORATORY exempts APPRENTICE_2+, RESTRICTED, and ONBOARDING from mode restrictions. APPRENTICE_1 is bound everywhere. Remaining question: do the gate predicates (G1–G6) need per-cell overrides for the matrix, or is it sufficient to resolve `execution_mode` at IC creation and let existing gates handle it?

### 6. Goodhart's Law on Theory Challenges as Circuit Breaker
When Theory Challenge pass rate determines agent access, the incentive to game challenges intensifies. The current framework already warns about this (adversarial calibration). But tying the gauge directly to a capability gate raises the stakes. How do you prevent challenge difficulty from being softened to avoid triggering restrictions?

### 7. Repository Designation in the Directive Plane and CFP
The current framework assigns risk tiers to *changes*, not to *repositories*. This model requires repos themselves to carry a designation (production vs. non-production) that governs merge gates. How does this integrate into the existing IC and CFP artifacts? Does `repo.designation` become a field on the IC, a repo-level config, or an organizational registry? The G6 gate predicate needs to check repo designation — what changes to the CFP state machine and gate definitions are required? Repo promotion (non-prod → prod) is an organizational control outside the scope of this framework.

---

## Origin

This document explores integrating ideas from Russinovich and Hanselman's "Redefining the Software Engineering Profession for AI" [1] into the Directive Plane framework. Their paper identifies a structural threat to the software engineering talent pipeline: AI amplifies senior engineers ("AI boost") while creating drag on early-in-career (EiC) developers who lack the judgment to direct and verify agent output. They propose preceptor programs — structured mentorship where seniors deliberately grow juniors — and suggest that coding assistants could have an "EiC mode" that defaults to Socratic coaching before code generation.

The insight that connects the two bodies of work: the Directive Plane's Execution Plane could adapt its behavior based on *who is operating it*, not just *what system* they're operating on. The Socratic mode proposed by Russinovich and Hanselman becomes a protocol-level execution mode, and the Directive Plane's Theory Challenge gauges become the mechanism for progression and, critically, for automatic restriction when comprehension degrades.

[1] Russinovich, M. and Hanselman, S. "Redefining the Software Engineering Profession for AI." *Communications of the ACM*. DOI: [10.1145/3779312](https://dl.acm.org/doi/10.1145/3779312)

---

## A Third Invariant

The Directive Plane defines two invariants that the architecture exists to protect:

1. **Outbound Intent Fidelity** — human will reaches the machine without loss of meaning, scope, or constraint
2. **Inbound Theory Preservation** — human understanding is reconstructed from outcomes with sufficient fidelity to maintain steerability

Both assume the human on one end is *capable*. They govern the interface between human and machine but say nothing about whether the human's ability to use that interface is growing, stable, or atrophying. This model introduces a third:

3. **Operator Capability Integrity** — the humans directing agents possess and continuously develop the judgment required to specify intent (#1) and reconstruct theory (#2)

This is the *meta-invariant* — it is what makes the other two possible. Without it, the other two fail silently. Intent Briefs get filled out but are vague because the operator lacks the depth to be precise. Theory Challenges get answered but are surface-level because the operator lacks the foundation to reason deeply. The artifacts exist. The controls are performative.

The Directive Plane protects #1. The Reconstruction Plane protects #2. The adaptive operator model — Socratic mode, progression ladder, circuit breaker, merge gates — protects #3. It is not a fourth plane. It is a cross-cutting concern that lives across all three existing planes:

- **Socratic mode** lives in the Execution Plane (changes *how* execution happens)
- **The circuit breaker** lives in the Reconstruction Plane (triggered by theory challenge gauges)
- **Merge gates** live in the Directive Plane (governance mechanism on what gets shipped)
- **The progression ladder** spans all three (determines which mode each plane operates in for a given operator)

The existing framework hints at this with LP4 (Reasoning Capability Preservation), but LP4 is framed as *maintenance* — preventing atrophy in people who already have the skill. The third invariant covers the full lifecycle: **growth** (juniors building capability through Socratic mode), **maintenance** (the circuit breaker catching degradation in experienced operators), and **adaptation** (onboarding rebuilding capability in a new system context).

---

## System Dynamics Analysis

### New Stock: Operator Capability

Sits alongside the existing four stocks (System Complexity, Human Theory, Intent Clarity, Navigability). Unlike Human Theory — which measures understanding of the *current system* — Operator Capability is the *meta-skill*: the ability to specify intent, write tests, reconstruct theory, reason about architecture. It feeds Human Theory but is distinct from it. A senior joining a new team has high Operator Capability but low Human Theory for that system.

| Stock | Description | Behavior |
|-------|-------------|----------|
| System Complexity | Informational content of codebase | Only increases |
| Human Theory | Fidelity of mental model for this system | Decays without maintenance |
| Intent Clarity | Precision of goals transmitted to agents | Degrades under pressure |
| Navigability | Ability to find/understand/modify (Theory ÷ Complexity) | Derived ratio |
| **Operator Capability** | **Meta-skill: ability to perform LP1–LP5 effectively** | **Grows under Socratic engagement, atrophies under passive agent use, resets per-system** |

### New Leverage Points

The existing five leverage points still hold. This model adds two and refines one:

| # | Leverage Point | What It Does |
|---|---------------|--------------|
| LP2 | Force theory reconstruction **(refined)** | Now *graduated* — the method of reconstruction matches operator capability. Juniors build theory through implementation (Socratic). Seniors reconstruct from agent output (Change Narratives). The mechanism adapts; the requirement is invariant. |
| **LP6** | **Gate agent access to demonstrated comprehension** | Agent execution is a privilege gated by Prediction Accuracy. When theory degrades, the amplifier is removed (RESTRICTED). Distinct from LP4: LP4 says "stay sharp." LP6 says "if you aren't sharp, the machine won't start." LP4 is recurrent training. LP6 is the medical certificate. |
| **LP8** | **Separate production authority from exploration access** | The ability to *use* agents (learning, experimenting) is decoupled from the ability to *ship* agent output to production. Without this, the choice is all-or-nothing: juniors either use agents and ship unverified code, or can't use agents and never learn the tool. LP8 creates the third option: use freely in non-production, ship only when qualified. |

**Dependency structure (extended):** LP5 missing → LP1 impossible. LP4 missing → LP2/LP3 performative. LP3 missing → LP2 intractable. **LP6 missing → LP4 becomes voluntary and gets skipped under velocity pressure. LP8 missing → LP6 either blocks learning (too strict) or allows unverified code in production (too loose).**

### New Balancing Loops

**B1 — Socratic Theory Building.** Socratic mode forces manual implementation → Operator Capability grows → Human Theory grows (the operator built the code) → Navigability improves → Intent Clarity improves. Directly counteracts R1 (Velocity Trap). Additionally, modules built under Socratic mode become high-confidence anchors in the system — modules where theory is *known to exist* because someone built them by hand.

**B2 — Circuit Breaker Recovery.** Theory drops → circuit breaker fires (LP6) → RESTRICTED mode forces manual coding → Human Theory rebuilds → Prediction Accuracy recovers → agent access restored. Self-correcting loop that converts LP4 from cultural aspiration into automatic balancing mechanism.

**B3 — Progression Ratchet.** Operator demonstrates competence → scaffolding removed → operator takes on harder challenges → capability grows further. Each stage builds on the last. Evidence-based promotion means you can't skip steps. The ratchet has teeth.

### New Reinforcing Loops (Risks)

**R4 — Velocity Pressure Cascade.** When one operator hits RESTRICTED, their velocity drops. Under deadline pressure, teammates compensate with more agent-driven work → *their* theory engagement decreases → *they* risk hitting RESTRICTED → more velocity drops → more pressure. **Vulnerability:** small teams under deadline pressure. **Mitigation:** organizational — teams need slack capacity, same as any system with circuit breakers. The nuclear analogy holds: a plant that cannot afford to SCRAM is a plant that is already unsafe.

**R5 — Confidence Divergence.** Modules built under Socratic mode have high theory confidence. Modules built by agents under standard review have lower confidence. Over time, the system develops a patchwork — some modules deeply understood, others not. If high-confidence modules cluster around junior work (simpler modules) and low-confidence modules cluster around senior agent-driven work (complex modules), you get an inversion: the most complex parts of the system are the least understood. **Mitigation:** the existing gauges (Time-to-Explain, Invariant Staleness) should detect this, but the inversion pattern should be explicitly monitored.

### Interaction with Existing Reinforcing Loops

| Existing Loop | How This Model Interacts |
|---------------|--------------------------|
| **R1 — Velocity Trap** | B1 (Socratic Theory Building) directly counteracts by forcing Human Theory to keep pace with System Complexity for operators in Socratic/RESTRICTED modes. Standard-mode operators still rely on LP1–LP5. |
| **R2 — Trust Erosion** | The progression ladder builds trust on *evidence* rather than assumption. A JOURNEYMAN's theory is verified through challenges, not assumed from seniority. Trust becomes calibrated rather than binary. |
| **R3 — Intent Drift** | Onboarding mode directly counteracts R3 for new team members by forcing them to build system theory before they can direct agents against it. Prevents the "intent specified against a stale mental model" failure. |

---

## Core Idea: The Execution Plane Adapts to the Operator

The current CFP treats the operator as a static role. `operator_currency` tracks whether they are current or lapsed, but the protocol does not differentiate *how* the Execution Plane behaves based on operator capability. A junior engineer and a 20-year veteran interact with the same gates, the same execution flow, the same theory challenges.

This model introduces two changes:

1. **Operator capability becomes two-dimensional** — craft maturity (general engineering skill) × system familiarity (knowledge of this specific codebase). These are orthogonal. A senior joining a new team has high craft but low system familiarity. A junior who has been on a team for a year has growing system familiarity but low craft maturity.

2. **The Execution Plane has multiple modes** that the protocol selects based on operator capability, with a circuit breaker that can demote any operator when their theory gauges degrade.

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
- Theory Challenges at G5 are explanatory — the operator has genuine theory because they *built* the implementation

**Binding rules:**
- Operators below a craft maturity threshold are **bound** to Socratic mode. It is not optional.
- Operators above the threshold can **opt in** to Socratic mode voluntarily (e.g., working in an unfamiliar subsystem).

### RESTRICTED Mode (Agent Tests, Operator Implements)

In RESTRICTED mode, the agent writes the tests but the operator writes the implementation. This mode is shared across three entry paths — see "The Circuit Breaker" and "Senior Onboarding Mode" below. It is also the default for APPRENTICE_1 on CONSEQUENTIAL and PROFESSIONAL systems.

### STANDARD Mode (Current CFP)

The existing protocol behavior. Agent executes, produces Change Narrative, operator passes Theory Challenges. No changes to current gates or artifacts.

---

## Execution Mode × Risk Tier Matrix

Execution modes are not applied uniformly. The risk tier of the system modifies which modes are enforced.

**Principle:** EXPLORATORY systems are low-stakes by definition — the cost of rebuilding from scratch is low. The protocol should not enforce restrictions that protect systems that don't need protecting. EXPLORATORY is the sandbox where operators can use the agent freely, experiment, and build intuition without the full scaffold.

**Constraint:** EXPLORATORY agent access does not count toward progression or recovery. An APPRENTICE_2 shipping agent code on a prototype proves nothing about their readiness for JOURNEYMAN on a production system. An operator in RESTRICTED who uses agents freely on EXPLORATORY doesn't earn recovery credit — recovery requires demonstrated theory rebuilding on the system where theory was lost.

| Level | CONSEQUENTIAL | PROFESSIONAL | EXPLORATORY |
|-------|--------------|--------------|-------------|
| **APPRENTICE_1** | Socratic — full scaffold (bound) | Socratic — full scaffold (bound) | Socratic — full scaffold (bound) |
| **APPRENTICE_2** | Socratic — tutor only (bound) | Socratic — tutor only (bound) | **Standard — full agent access** |
| **JOURNEYMAN** | Standard + elevated challenges | Standard + elevated challenges | Standard |
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

**Key decisions:**

- **APPRENTICE_1 is bound everywhere.** At this stage they haven't written their own tests yet. They need the full scaffold even on prototypes — the fundamentals aren't built yet.
- **APPRENTICE_2 gets EXPLORATORY access.** They've demonstrated test design skill. Letting them use the agent on low-stakes work gives them early exposure to reviewing agent output — the skill they'll need at JOURNEYMAN — without risk to real systems.
- **RESTRICTED and ONBOARDING get EXPLORATORY access.** The circuit breaker and onboarding restrictions exist to rebuild theory on *specific systems*. Blocking agent access on throwaway prototypes would be punitive, not protective.

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

**G6 extension:**

```
G6 additional predicate:
  IF repo.designation ∈ {PRODUCTION}
  AND change contains agent-generated implementation
  AND operator.progression_stage ∉ {JOURNEYMAN, ENGINEER}
  THEN → MERGE_BLOCKED
```

**Key implications:**

- **Operator-written code always merges.** If you wrote it under Socratic mode (APPRENTICE_1/2) or RESTRICTED mode, you built the theory — the code is yours. The merge gate only blocks agent-generated implementation.
- **Feature branches in production repos are fine.** APPRENTICE_2 and RESTRICTED operators can use agents on branches to experiment, learn, and build familiarity. The branch is a learning artifact, not a shipping vehicle.
- **Non-production repos are unrestricted** (except APPRENTICE_1). Prototypes, hackathons, personal sandboxes — merge freely. This is where APPRENTICE_2 and RESTRICTED operators get to experience full agent workflows.

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
| **Theory source** | Operator reconstructs from agent output (with higher challenge bar than ENGINEER) |

The operator transitions to the *review* side. The agent implements. But Theory Challenges are more numerous and more demanding than they would be for an ENGINEER-level operator. This is the training ground for the skill of reconstructing theory from agent output — the core competency of the senior workflow.

### Stage 4 — Standard (ENGINEER)

Standard CFP. Full agent execution, normal theory challenge requirements, Socratic mode available on-demand.

---

## Progression Criteria

Stage transitions are **evidence-based, not time-based.** The gauges provide the evidence; the preceptor makes the call.

| Signal | What It Indicates |
|--------|-------------------|
| **Prediction Accuracy** | Rolling pass rate on Theory Challenges trending above threshold across N consecutive changes |
| **Theory Challenge depth** | Operator answers are explanatory, not just correct — they demonstrate reasoning, not recall |
| **Test quality gap** (Stage 2) | Operator-written tests converge toward agent-generated baseline in coverage and edge-case detection |
| **Preceptor attestation** | Human mentor reviews the Socratic trail and signs off on readiness for next stage |

No algorithm promotes an operator. The protocol provides evidence. A human (the preceptor) decides.

---

## The Circuit Breaker: Theory-Gated Agent Access

Theory Challenge performance is not just a gauge — it is a **circuit breaker**. When an operator's Prediction Accuracy drops below a threshold, agent execution privileges are automatically restricted. This applies to *all* operators at *every* level, not just juniors. The restriction applies on CONSEQUENTIAL and PROFESSIONAL systems only — EXPLORATORY systems retain full agent access (see the Execution Mode × Risk Tier Matrix above).

### Mechanism

Prediction Accuracy is tracked as a rolling window per-operator per-subsystem. When it drops below the defined threshold:

1. `operator_currency` transitions from CURRENT → **RESTRICTED**
2. In RESTRICTED, the agent cannot execute implementation — but it **still writes the tests**. The agent generates failing tests from the IC's acceptance criteria and invariants, and the operator writes the implementation to make them pass.
3. The operator codes by hand. This forces the deep engagement with the codebase that rebuilds theory.
4. Theory Challenges continue on the operator's manual changes. When Prediction Accuracy recovers above threshold for N consecutive changes, currency restores to CURRENT.

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
                    │       (prolonged failure)             │
                    │              │                        │
                    │              ▼                        │
                    │         SUSPENDED                     │
                    │    (preceptor/lead intervention)      │
                    └──────────────────────────────────────┘
```

### Why Automatic, Not Voluntary

The current framework's LP4 (Cognitive Maintenance) is a *cultural* practice — "dedicate regular time for manual engagement." The Directive Plane acknowledges this meets the highest resistance because it appears to reduce velocity. Teams skip it under deadline pressure.

The circuit breaker makes LP4 **involuntary and automatic.** It is not "we think you should code manually this week." It is "the protocol detected your theory is degraded — agent execution is suspended until it recovers." The system measured a state and responded. Same as a trading floor's position limits: you don't negotiate with the risk system, it cuts you off.

**The cultural signal:** Agent access is not a right. It is a privilege maintained by demonstrating comprehension. Like a pilot's type rating or a trader's risk authorization.

---

## Senior Onboarding Mode

A senior engineer joining a new team is senior in the craft but junior in the system. Putting them straight into STANDARD mode means they direct agents through a system they don't understand — the "intent specified against a stale mental model" failure mode (R3 Intent Drift).

Senior onboarding uses the same RESTRICTED mode as the circuit breaker — agent writes the tests, operator writes the implementation. The reasoning is the same: the senior already has craft maturity and test design skill. What they lack is system familiarity. Implementing by hand against agent-generated tests forces them to engage directly with the codebase and build theory for *this* system.

| Aspect | Behavior |
|--------|----------|
| **Execution mode** | RESTRICTED — agent writes tests, operator implements |
| **Scope gates** | Tighter than normal — smaller blast radius for cheaper theory reconstruction on an unfamiliar codebase |
| **Agent pre-execution** | Surfaces invariants and coupling for the target subsystem before execution: "This module has 3 invariants. INV-007 is the one people trip on." |
| **Theory Challenges** | System-specific, not craft-specific: "Why does this service validate tokens in the sidecar instead of the gateway?" not "What is mTLS?" |
| **Guided archaeology** | Agent narrates the history of the subsystem being modified: prior refactors, the problems they solved, the invariants they introduced |
| **Graduation** | System familiarity gauges (Prediction Accuracy, Time-to-Explain, Invariant Awareness) hit threshold for the relevant subsystems |

This makes RESTRICTED a shared mode with three entry paths: junior progression (Stage 1), circuit breaker (theory degradation), and senior onboarding (system unfamiliarity). The experience is the same — agent tests, operator implements — but the reason you're there differs.

---

## New Gauges

| Gauge | What It Measures | Applies To | Degradation Signal |
|-------|------------------|------------|--------------------|
| **Test Quality Gap** | Delta between operator-written tests and agent-generated baseline (coverage, edge cases) | APPRENTICE_2 | Gap not closing over time |
| **Invariant Awareness** | Can the operator name the invariants for a component before being shown them? | Onboarding / all | Low or declining awareness score |
| **Socratic Iteration Count** | Number of agent challenge-response cycles before operator's implementation passes | APPRENTICE_1, APPRENTICE_2 | Rising count (not learning) or flat at 1 (challenges too easy) |

These supplement the existing four gauges (Prediction Accuracy, Scope Breach Rate, Time-to-Explain, Invariant Staleness) and the orchestration gauges.

---

## IC Field Extensions

The Intent Contract gains new fields to support the adaptive model:

```yaml
operator:
  craft_level: SENIOR | MID | JUNIOR
  system_familiarity: ESTABLISHED | DEVELOPING | ONBOARDING | UNFAMILIAR
  execution_mode: SOCRATIC | RESTRICTED | STANDARD   # resolved from operator level × risk tier
  progression_stage: APPRENTICE_1 | APPRENTICE_2 | JOURNEYMAN | ENGINEER
  subsystem_currency:
    payments/*: CURRENT
    notifications/*: UNFAMILIAR
    auth/*: LAPSED
  circuit_breaker:
    prediction_accuracy_window: 10              # rolling N changes
    restriction_threshold: 0.6                  # below this → RESTRICTED
    recovery_threshold: 0.8                     # above this for N consecutive → restore
    applies_to: [CONSEQUENTIAL, PROFESSIONAL]   # EXPLORATORY exempt
  exploratory_access: true | false              # false only for APPRENTICE_1
```

---

## Mapping to Existing Framework Concepts

| This Model | Maps To | Relationship |
|------------|---------|-------------|
| Socratic mode | LP4 (Reasoning Capability Preservation) | Structural implementation — forces engagement rather than relying on cultural practice |
| Circuit breaker | **LP6 (Gate agent access to demonstrated comprehension)** | New leverage point — removes the amplifier when theory degrades |
| Merge gates / repo designation | **LP8 (Separate production authority from exploration access)** | New leverage point — decouples learning from shipping |
| Progression ladder | LP2 (Forced Theory Reconstruction) — refined | Graduated reconstruction intensity matched to operator capability |
| Per-subsystem currency | Operator Currency (CFP) | More granular — currency is not global but scoped to the subsystem being modified |
| Preceptor role | Agentic Engineer | Specialization — the preceptor owns the learning loop, the Agentic Engineer owns the system control loop |
| Test Quality Gap gauge | Prediction Accuracy gauge | Analogous — measures operator capability, but for test design rather than system prediction |

---

## Summary

The Directive Plane currently governs the *human-agent interface* — how intent flows out and theory flows back. This model extends it to govern the *human development interface* — how the protocol itself grows the operator's capability over time, and how it automatically restricts agent access when capability degrades.

The key additions:

1. **Two-dimensional operator capability** (craft × system familiarity), tracked per-subsystem
2. **Socratic execution mode** — agent teaches, operator implements. Bound for juniors, optional for seniors.
3. **Four-stage progression ladder** with decreasing scaffolding, evidence-based promotion, and preceptor attestation
4. **Circuit breaker** — Theory Challenge performance gates agent access. Drop below threshold → RESTRICTED (agent writes tests, operator implements). Applies on CONSEQUENTIAL and PROFESSIONAL systems. EXPLORATORY exempt.
5. **Senior onboarding mode** — RESTRICTED mode with tighter scope gates, guided archaeology, system-specific challenges. Respects craft maturity, builds system familiarity.
6. **Repository designation and merge gates** — Repos are designated production or non-production. Only JOURNEYMAN+ can merge agent-generated code into production repos. APPRENTICE_2, RESTRICTED, and ONBOARDING can experiment on branches but cannot merge agent code to production. Operator-written code (from Socratic/RESTRICTED mode) always merges — they built the theory. Non-production repos are unrestricted (except APPRENTICE_1).

The scaffolding doesn't just decrease — it *inverts*. The operator goes from "I build, agent tests me" to "agent builds, I verify the agent." This mirrors the actual engineering career arc and ensures that the humans directing agents have earned the judgment to do so.

---

*Brainstorm draft. Not yet integrated into the Directive Plane or CFP.*
