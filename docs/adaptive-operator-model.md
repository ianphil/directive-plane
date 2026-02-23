# Adaptive Operator Model — Brainstorm Draft

## A Socratic Execution Mode and Competency-Gated Agent Access for the Directive Plane

*Draft — February 2026*

---

## Open Items

### 1. System Dynamics Impact
~~What new stocks does this model introduce?~~ **Resolved.** See "System Dynamics Analysis" section below.

### 2. Threshold Calibration
~~What are the right thresholds for the Theory Challenge circuit breaker?~~ **Resolved.** See "Circuit Breaker Calibration" section below. Protocol defines defaults with organizational override (Agentic Engineer recommends, preceptor agrees). Hysteresis prevents flapping. Hybrid window (N changes + minimum time floor) prevents gaming. Recovery requires both gauge recovery AND preceptor approval.

### 3. Preceptor Role in Protocol Artifacts
~~How does the preceptor formally appear in the CFP?~~ **Resolved.** See "The Preceptor Role" section below. The preceptor is the engineering manager — distinct from the Agentic Engineer. They own the learning loop (progression, mentorship, Socratic trail review) while the Agentic Engineer owns the control loop (gauges, halt authority, IC approval). Preceptor sign-off is a formal gate for progression transitions and SUSPENDED recovery.

### 4. Interaction with Multi-Agent Orchestration
~~Can a junior operator participate in orchestrated (multi-agent) mode at all?~~ **Resolved.** Multi-agent orchestration is gated by both operator level and repo designation:
- **CONSEQUENTIAL:** Multi-agent not allowed. The compositional incoherence risk is too high for systems where failure has legal, safety, or large-scale economic impact. Single-agent only.
- **PROFESSIONAL:** ENGINEER-only. Orchestration requires the full theory reconstruction capacity that comes with demonstrated system mastery.
- **Non-production (EXPLORATORY):** Available to JOURNEYMAN, ENGINEER, RESTRICTED, and ONBOARDING — operators who have agent access in EXPLORATORY. APPRENTICE_1 and APPRENTICE_2 do not get multi-agent access anywhere.

Remaining question: does the Socratic mode need any adaptation for operators who use multi-agent on non-production repos, or is standard protocol sufficient since the stakes are low?

### 5. Socratic Mode and Risk Tier Interaction
~~Does Socratic mode sit alongside the risk tier matrix as an independent axis?~~ **Partially resolved.** The Execution Mode × Risk Tier Matrix defines the interaction: EXPLORATORY exempts APPRENTICE_2+, RESTRICTED, and ONBOARDING from mode restrictions. APPRENTICE_1 is bound everywhere. Remaining question: do the gate predicates (G1–G6) need per-cell overrides for the matrix, or is it sufficient to resolve `execution_mode` at IC creation and let existing gates handle it?

### 6. Goodhart's Law on Theory Challenges as Circuit Breaker
~~How do you prevent challenge difficulty from being softened to avoid triggering restrictions?~~ **Resolved.** See "Goodhart's Law Mitigations" section below. Key factors: challenges are agent-generated (operator doesn't control difficulty), answers are agent-evaluated against system behavior (can't bluff), per-subsystem currency tracks specialization honestly, and JOURNEYMAN/ENGINEER progression requires breadth across subsystems.

### 7. Repository Designation in the Directive Plane and CFP
~~How does repo designation integrate into existing IC and CFP artifacts?~~ **Resolved.** See "Repository Designation — CFP Integration" section below. Repo designation is an external organizational control inherited at runtime; not stored in the IC. Gates query it directly. G1 warns on tier/designation mismatch, G3 resolves execution mode, G6 enforces the merge gate.

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
| **LP7** | **Separate production authority from exploration access** | The ability to *use* agents (learning, experimenting) is decoupled from the ability to *ship* agent output to production. Without this, the choice is all-or-nothing: juniors either use agents and ship unverified code, or can't use agents and never learn the tool. LP7 creates the third option: use freely in non-production, ship only when qualified. |

**Dependency structure (extended):** LP5 missing → LP1 impossible. LP4 missing → LP2/LP3 performative. LP3 missing → LP2 intractable. **LP6 missing → LP4 becomes voluntary and gets skipped under velocity pressure. LP7 missing → LP6 either blocks learning (too strict) or allows unverified code in production (too loose).**

### New Balancing Loops

**B1 — Socratic Theory Building.** Socratic mode forces manual implementation → Operator Capability grows → Human Theory grows (the operator built the code) → Navigability improves → Intent Clarity improves. Directly counteracts R1 (Velocity Trap). Additionally, modules built under Socratic mode become high-confidence anchors in the system — modules where theory is *known to exist* because someone built them by hand.

**B2 — Circuit Breaker Recovery.** Theory drops → circuit breaker fires (LP6) → RESTRICTED mode forces manual coding → Human Theory rebuilds → Prediction Accuracy recovers → agent access restored. Self-correcting loop that converts LP4 from cultural aspiration into automatic balancing mechanism.

**B3 — Progression Ratchet.** Operator demonstrates competence → scaffolding removed → operator takes on harder challenges → capability grows further. Each stage builds on the last. Evidence-based promotion means you can't skip steps. The ratchet has teeth.

### New Reinforcing Loops (Risks)

**R4 — Velocity Pressure Cascade.** When one operator hits RESTRICTED, their velocity drops. Under deadline pressure, teammates compensate with more agent-driven work → *their* theory engagement decreases → *they* risk hitting RESTRICTED → more velocity drops → more pressure. **Vulnerability:** small teams under deadline pressure. **Mitigation:** organizational — teams need slack capacity, same as any system with circuit breakers. The nuclear analogy holds: a plant that cannot afford to SCRAM is a plant that is already unsafe.

**R5 — Confidence Divergence.** Modules built under Socratic mode have high theory confidence. Modules built by agents under standard review have lower confidence. Over time, the system develops a patchwork — some modules deeply understood, others not. If high-confidence modules cluster around junior work (simpler modules) and low-confidence modules cluster around senior agent-driven work (complex modules), you get an inversion: the most complex parts of the system are the least understood.

The risk is more nuanced than raw confidence levels. Theory has two qualities that differ by acquisition method:

- **Junior-built theory is overconfident.** A junior who built a module by hand in Socratic mode has high measured confidence (passes challenges, can explain the code). But their craft maturity limits what they can *see* — they may miss concurrency issues, subtle security implications, or architectural coupling that a senior would catch. The theory is genuine but has blind spots the junior doesn't know about.
- **Senior-reconstructed theory is underconfident.** A senior who passes Theory Challenges on a complex module has *reconstructed* theory — shallower than built theory for direct system knowledge. But their craft maturity compensates: they can reason about failure modes, architectural implications, and cross-cutting concerns that a junior can't, even with less direct familiarity. The gauges may undercount their effective understanding.

Neither type of theory alone is complete. The ideal is overlap: someone who both built the code AND has the craft maturity to reason about its implications.

**Mitigation — two-axis confidence model.** Module-level theory confidence is tracked on two axes:

1. **Construction depth** — was this module built or reconstructed? By whom? How recently? Modules where the only theory holders built it under Socratic mode have high construction depth but potentially low craft-weighted reasoning. Modules where the only theory holders are seniors who reconstructed from agent output have the inverse.
2. **Craft-weighted reasoning** — does someone with sufficient craft maturity hold theory for this module? A module understood only by APPRENTICE-level operators has a craft reasoning gap regardless of how well they can explain the code.

The **Theory Confidence Distribution** gauge (see "New Gauges" below) tracks both axes per module and alarms on single-axis coverage — modules where theory is either construction-deep but craft-shallow, or craft-strong but construction-shallow. The Agentic Engineer uses this to direct LP4 cognitive maintenance at the specific gap: seniors do code archaeology on agent-built complex modules (build construction depth), juniors get targeted exposure to complex modules under senior mentorship (build craft reasoning).

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

In RESTRICTED mode, the agent writes the tests but the operator writes the implementation. This mode is shared across two entry paths — see "The Circuit Breaker" and "Senior Onboarding Mode" below. It is also the default for APPRENTICE_1 on CONSEQUENTIAL and PROFESSIONAL systems.

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
G6 additional predicates:
  IF repo.designation ∈ {PRODUCTION}
  AND change contains agent-generated implementation
  AND operator.progression_stage ∉ {JOURNEYMAN, ENGINEER}
  THEN → MERGE_BLOCKED

  IF repo.designation ∈ {PRODUCTION}
  AND risk_tier = EXPLORATORY
  THEN → MERGE_BLOCKED
```

**Key implications:**

- **EXPLORATORY tier never ships to production.** Regardless of operator level, changes made under EXPLORATORY risk tier cannot merge to production repos. EXPLORATORY means lighter scope limits, fewer challenges, and optional verifiers — controls too loose for production-bound code. An ENGINEER who wants to explore on a feature branch in a production repo can use EXPLORATORY tier freely, but must re-execute the change under PROFESSIONAL or CONSEQUENTIAL tier to merge.
- **Operator-written code always merges (at appropriate tier).** If you wrote it under Socratic mode (APPRENTICE_1/2) or RESTRICTED mode, you built the theory — the code is yours. The merge gate only blocks agent-generated implementation (for sub-JOURNEYMAN operators) and EXPLORATORY-tier changes.
- **Feature branches in production repos are fine.** APPRENTICE_2 and RESTRICTED operators can use agents on branches to experiment, learn, and build familiarity. The branch is a learning artifact, not a shipping vehicle.
- **Non-production repos are unrestricted** (except APPRENTICE_1). Prototypes, hackathons, personal sandboxes — merge freely. This is where APPRENTICE_2 and RESTRICTED operators get to experience full agent workflows.

---

## Repository Designation — CFP Integration

Repository designation (production vs. non-production) is an **external organizational control**. The framework does not own it, configure it, or manage transitions between designations. It inherits the designation at runtime and uses it at specific gates.

### Design Principles

- **Not stored in the IC.** Repo designation is queried from the external system when needed. This avoids stale data — if an org changes a repo's designation, the gates immediately reflect it without needing to update existing ICs.
- **Risk tier remains the operator's call, with a production merge constraint.** Repo designation does not override `risk_tier` on the IC. An operator can declare any risk tier they choose, including EXPLORATORY on a production repo (useful for exploration on feature branches). The protocol warns on mismatches at G1. However, G6 blocks merging EXPLORATORY-tier changes to production repos — EXPLORATORY intensity controls are too loose for production-bound code.
- **Three gates check designation.** Each serves a different purpose.

### Gate Changes

| Gate | Current CFP | Addition |
|------|-------------|----------|
| **G1** (INTENT→PLANNED) | IC valid, goal+scope non-empty, criteria falsifiable, currency valid | **Soft warning** if `risk_tier` on IC is inconsistent with repo designation (e.g., EXPLORATORY tier declared in a PRODUCTION repo). Does not block — the operator may have a valid reason. Warning is logged in the IC as an advisory. |
| **G3** (APPROVED→EXECUTING) | Sandbox bounded to planned_modifications only | **Resolves execution mode** by checking repo designation against operator level. Determines whether APPRENTICE_2/RESTRICTED/ONBOARDING get agent access (non-production repo) or remain in Socratic/RESTRICTED mode (production repo). Also gates multi-agent orchestration access. |
| **G6** (UNDERSTOOD→MERGED) | IR updated, artifacts committed, gauges recorded, no errors | **Merge gate predicates**: queries repo designation. (1) If PRODUCTION and change contains agent-generated implementation and operator is below JOURNEYMAN → MERGE_BLOCKED. (2) If PRODUCTION and risk_tier is EXPLORATORY → MERGE_BLOCKED. Operator-written code is never blocked at appropriate tier. |

### What the Protocol Does NOT Do

- Does not define how repos are designated — that is organizational policy
- Does not manage repo promotion (non-prod → prod) — that is an external control
- Does not store designation in artifacts — queries it at runtime
- Does not hard-block risk tier mismatches at G1 — warns only, because operators may legitimately choose a higher-intensity tier for a non-production repo (e.g., practicing the full protocol on a prototype) or EXPLORATORY tier on a production repo for branch-level exploration. The hard block is at G6: EXPLORATORY-tier changes cannot merge to production repos.

---

## Goodhart's Law Mitigations

Tying Theory Challenge performance to agent access (via the circuit breaker) raises Goodhart's Law risk: when a measure becomes a target, it ceases to be a good measure. The existing Directive Plane framework already warns about this and prescribes adversarial calibration. This section analyzes the specific gaming vectors in the adaptive operator model and the structural mitigations.

### Why the Risk Is Lower Than It Appears

**Challenges are agent-generated.** The operator does not control challenge difficulty. They cannot write easier questions for themselves. The agent generates challenges based on the change, the subsystem, and the IC constraints.

**Answers are agent-evaluated against system behavior.** Theory Challenges ask for falsifiable predictions: "What happens if Provider X times out during capture?" The agent evaluates the answer by checking it against actual system behavior — tracing code paths, running scenarios, verifying against tests. The operator cannot bluff a correct answer. This is fundamentally different from a self-attestation ("do you understand this change?"), which is unfalsifiable and worthless as a control.

**Per-subsystem currency tracks specialization honestly.** If an operator only works in payments/*, they are only CURRENT on payments/*. The model doesn't grant system-wide credit for narrow expertise. An operator who avoids unfamiliar subsystems isn't gaming the system — they're accurately reflected as UNFAMILIAR in the areas they avoid.

**Progression requires breadth.** APPRENTICE operators can specialize — deep expertise in one area is valuable during learning. But JOURNEYMAN and ENGINEER progression requires demonstrated currency across a minimum breadth of the system's subsystems. This prevents the "stay in my comfort zone" vector from becoming a permanent avoidance strategy.

### Remaining Vectors and Mitigations

**Challenge difficulty could drift down over time.** The agent might calibrate challenge difficulty to the *change* (small change = easy challenge) rather than to the *subsystem complexity*. An operator could game this by making many small, simple changes to maintain high Prediction Accuracy without ever being tested on hard reasoning.

**Mitigation:** Challenge difficulty must be calibrated to **subsystem complexity and criticality**, not change size. A one-line change in the auth module should still produce a hard challenge if auth has critical invariants and complex coupling. The agent's challenge generation should weight subsystem factors (invariant count, coupling density, historical defect rate) alongside change magnitude.

**Common-mode failure in evaluation.** The same LLM generating the challenge and evaluating the answer is a closed loop. Shared blind spots mean the operator could give an answer that satisfies the evaluator but doesn't reflect genuine understanding.

**Mitigation:** Periodic spot-checks by a human — the preceptor (for apprentices) or the Agentic Engineer (for all levels). Not every challenge — that defeats the purpose of automation — but enough to verify the agent's challenge quality isn't degrading. This is the adversarial calibration duty the Directive Plane already assigns to the Agentic Engineer. The spot-check rate itself is a tunable parameter per risk tier.

**Many small changes to avoid hard challenges.** An operator could decompose work into trivially small changes to stay below the difficulty threshold.

**Mitigation:** The Scope Breach Rate gauge already tracks change patterns. An operator consistently making changes well *below* the scope gate threshold — when the work logically warrants larger changes — is exhibiting a pattern that the Agentic Engineer should investigate. Abnormally low change magnitude is as suspicious as abnormally high.

---

## The Preceptor Role

### Definition

The preceptor is the **engineering manager** responsible for the professional development of operators in Socratic and RESTRICTED modes. They are distinct from the Agentic Engineer. The two roles collaborate but have separate accountabilities:

| | Agentic Engineer | Preceptor (Engineering Manager) |
|---|---|---|
| **Owns** | The control loop — system steerability | The learning loop — operator development |
| **Monitors** | Gauges (Prediction Accuracy, Scope Breach, etc.) | Socratic trails, progression readiness |
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

**Spot-checking challenge quality.** The preceptor periodically reviews Theory Challenges generated by the agent to verify they are appropriately difficult and well-calibrated to subsystem complexity. This is part of the Goodhart's Law mitigation — the preceptor is the human check on the agent's challenge generation quality.

### What the Preceptor Does NOT Do

- Does not approve or co-sign Intent Contracts — that is the Agentic Engineer's role
- Does not have halt authority over agent-driven work — that is the Agentic Engineer's role
- Does not set circuit breaker thresholds — that is calibrated by the Agentic Engineer (see open item #2)
- Does not prescribe apprentice-to-preceptor ratios — that is an organizational decision outside the protocol

### Collaboration Points

The preceptor and Agentic Engineer must coordinate at specific points:

- **Circuit breaker fires:** The Agentic Engineer detects the gauge degradation and triggers RESTRICTED. The preceptor is notified and takes over the recovery mentorship.
- **SUSPENDED state:** The Agentic Engineer escalates prolonged RESTRICTED failure. The preceptor intervenes with direct mentorship and designs the recovery path.
- **Challenge quality concerns:** The preceptor flags Theory Challenges that seem too easy or poorly calibrated. The Agentic Engineer adjusts the adversarial calibration.
- **Progression decisions:** The preceptor makes the call. The Agentic Engineer provides gauge data. Neither can override the other — the preceptor cannot promote an operator whose gauges are below threshold, and the Agentic Engineer cannot block promotion when gauges and preceptor attestation both support it.

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
| **Subsystem breadth** (JOURNEYMAN, ENGINEER) | Demonstrated currency across a minimum number of the system's subsystems — prevents permanent specialization at senior levels |
| **Preceptor attestation** | Human mentor reviews the Socratic trail and signs off on readiness for next stage |

No algorithm promotes an operator. The protocol provides evidence. A human (the preceptor) decides.

---

## The Circuit Breaker: Theory-Gated Agent Access

Theory Challenge performance is not just a gauge — it is a **circuit breaker**. When an operator's Prediction Accuracy drops below a threshold, agent execution privileges are automatically restricted. This applies to *all* operators at *every* level, not just juniors. The restriction applies on CONSEQUENTIAL and PROFESSIONAL systems only — EXPLORATORY systems retain full agent access (see the Execution Mode × Risk Tier Matrix above).

### Theory Challenge Scoring and the Rolling Window

Each change produces a **Prediction Accuracy score** that feeds the rolling window. The score is determined by the Theory Challenge outcome at G5:

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
5. Theory Challenges continue on the operator's manual changes. When Prediction Accuracy on the triggering subsystem(s) recovers above the recovery threshold across the hybrid window (N changes over minimum time floor) AND the preceptor approves, currency restores to CURRENT globally.

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

**Thresholds are uniform across CONSEQUENTIAL and PROFESSIONAL.** The risk tier already controls other knobs (scope gates, challenge count, verifier requirements). The circuit breaker threshold measures operator comprehension, which is either sufficient or it isn't — the system's risk level doesn't change what "understanding" means. EXPLORATORY is exempt from the circuit breaker entirely.

**Override authority.** The Agentic Engineer may recommend threshold adjustments for their team based on observed behavior (e.g., a highly complex system where 0.6 is too lenient, or a team where 0.8 recovery is creating prolonged RESTRICTED states that impede work). The preceptor must agree to the change. Overrides are logged and auditable.

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

This makes RESTRICTED a shared mode with two entry paths: circuit breaker (theory degradation) and senior onboarding (system unfamiliarity). The experience is the same — agent tests, operator implements — but the reason you're there differs. (APPRENTICE_1 in Socratic mode is mechanically similar — agent writes tests, operator implements — but includes active coaching, making it a distinct mode.)

---

## New Gauges

| Gauge | What It Measures | Applies To | Degradation Signal |
|-------|------------------|------------|--------------------|
| **Test Quality Gap** | Delta between operator-written tests and agent-generated baseline (coverage, edge cases) | APPRENTICE_2 | Gap not closing over time |
| **Invariant Awareness** | Can the operator name the invariants for a component before being shown them? | Onboarding / all | Low or declining awareness score |
| **Socratic Iteration Count** | Number of agent challenge-response cycles before operator's implementation passes | APPRENTICE_1, APPRENTICE_2 | Rising count (not learning) or flat at 1 (challenges too easy) |
| **Theory Confidence Distribution** | Per-module two-axis confidence: construction depth (built vs. reconstructed, by whom) × craft-weighted reasoning (craft maturity of theory holders) | Team-level / Agentic Engineer | Single-axis coverage — modules with high construction depth but low craft reasoning, or high craft reasoning but low construction depth. High-complexity modules with no overlap between axes. |

These supplement the existing four gauges (Prediction Accuracy, Scope Breach Rate, Time-to-Explain, Invariant Staleness) and the orchestration gauges.

---

## IC Field Extensions

The Intent Contract gains new fields to support the adaptive model:

```yaml
operator:
  craft_level: SENIOR | MID | JUNIOR              # input assessment — set by preceptor, not protocol
  system_familiarity: ESTABLISHED | DEVELOPING | ONBOARDING | UNFAMILIAR
  execution_mode:                                  # blank at IC creation; appended by G3
  progression_stage: APPRENTICE_1 | APPRENTICE_2 | JOURNEYMAN | ENGINEER
  subsystem_currency:
    payments/*: CURRENT
    notifications/*: UNFAMILIAR
    auth/*: LAPSED
  circuit_breaker:
    prediction_accuracy_window: 10              # minimum rolling N changes
    window_time_floor: 14d                      # window must span at least this duration
    restriction_threshold: 0.6                  # below this → RESTRICTED (global)
    recovery_threshold: 0.8                     # above this + preceptor approval → restore
    applies_to: [CONSEQUENTIAL, PROFESSIONAL]   # EXPLORATORY exempt
    triggered_by: [auth/*]                      # subsystem(s) that caused RESTRICTED; recovery credit scoped here
  exploratory_access: true | false              # false only for APPRENTICE_1
```

**Field semantics:**

- **`craft_level`** is an **input assessment** — a human judgment set by the preceptor about the operator's general engineering maturity. It does not change per-change and is not managed by the protocol. It constrains the operator's *starting point*: a JUNIOR enters at APPRENTICE_1, a SENIOR joining a new team enters at ONBOARDING. After that, progression is driven by gauges and preceptor attestation, not craft_level. The preceptor may reference craft_level when making progression decisions, but it does not mechanically gate any transition.
- **`progression_stage`** is **protocol state** — tracked and updated by the protocol based on evidence (gauge thresholds + preceptor sign-off). This is the field that drives execution mode resolution and gate behavior.
- **`execution_mode`** is **blank at IC creation** and **appended by G3** when the gate resolves the mode from operator level × repo designation. This preserves the IC's append-only invariant — G3 writes the field for the first time rather than modifying an existing value. Anyone reading the IC before G3 knows the mode hasn't been resolved yet.

---

## Mapping to Existing Framework Concepts

| This Model | Maps To | Relationship |
|------------|---------|-------------|
| Socratic mode | LP4 (Reasoning Capability Preservation) | Structural implementation — forces engagement rather than relying on cultural practice |
| Circuit breaker | **LP6 (Gate agent access to demonstrated comprehension)** | New leverage point — removes the amplifier when theory degrades |
| Merge gates / repo designation | **LP7 (Separate production authority from exploration access)** | New leverage point — decouples learning from shipping |
| Progression ladder | LP2 (Forced Theory Reconstruction) — refined | Graduated reconstruction intensity matched to operator capability |
| Per-subsystem currency | Operator Currency (CFP) | More granular — currency is not global but scoped to the subsystem being modified |
| Preceptor role | Agentic Engineer | Distinct role — preceptor (engineering manager) owns the learning loop, Agentic Engineer owns the system control loop. They collaborate but have separate authority. |
| Test Quality Gap gauge | Prediction Accuracy gauge | Analogous — measures operator capability, but for test design rather than system prediction |

---

## Summary

The Directive Plane currently governs the *human-agent interface* — how intent flows out and theory flows back. This model extends it to govern the *human development interface* — how the protocol itself grows the operator's capability over time, and how it automatically restricts agent access when capability degrades.

The key additions:

1. **Third invariant** — Operator Capability Integrity. The meta-invariant that makes Outbound Intent Fidelity and Inbound Theory Preservation possible.
2. **Two new leverage points** — LP6 (gate agent access to demonstrated comprehension) and LP7 (separate production authority from exploration access). LP2 refined to support graduated reconstruction.
3. **Two-dimensional operator capability** (craft × system familiarity), tracked per-subsystem
4. **Socratic execution mode** — agent teaches, operator implements. Bound for juniors, optional for seniors.
5. **Four-stage progression ladder** with decreasing scaffolding, evidence-based promotion, and preceptor attestation. JOURNEYMAN/ENGINEER require subsystem breadth.
6. **Circuit breaker** — Theory Challenge performance gates agent access. Hysteresis (restrict at 0.6, recover at 0.8), hybrid window (N changes + time floor), recovery requires preceptor approval. Applies on CONSEQUENTIAL and PROFESSIONAL. EXPLORATORY exempt.
7. **Senior onboarding mode** — RESTRICTED mode with tighter scope gates, guided archaeology, system-specific challenges.
8. **Repository designation and merge gates** — Repos designated production or non-production (external control, inherited at runtime). Only JOURNEYMAN+ can merge agent-generated code to production repos. G1 warns on tier mismatch, G3 resolves execution mode, G6 enforces merge gate.
9. **Preceptor role** — engineering manager, distinct from Agentic Engineer. Owns the learning loop. Formal gate on progression transitions and SUSPENDED recovery. Reviews Socratic trails, spot-checks challenge quality.
10. **System dynamics** — new stock (Operator Capability), balancing loops (B1–B3), reinforcing risk loops (R4–R5), interaction analysis with existing R1–R3.
11. **Goodhart's Law mitigations** — agent-generated/evaluated challenges, subsystem breadth requirements, preceptor spot-checks, abnormal change pattern detection.

The scaffolding doesn't just decrease — it *inverts*. The operator goes from "I build, agent tests me" to "agent builds, I verify the agent." This mirrors the actual engineering career arc and ensures that the humans directing agents have earned the judgment to do so.

---

*Brainstorm draft. All open items resolved. Not yet integrated into the Directive Plane or CFP.*
