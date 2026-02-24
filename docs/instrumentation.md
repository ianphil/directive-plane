# Instrumentation — Measuring Controllability

The architecture defines what must be controlled; this section addresses how you know the controls are working.

---

## The Core Problem: Evidence vs. Assertion

The central risk in any human-verification system is that the verification becomes performative. A signed checklist asserts that a check was performed. It does not prove that understanding was achieved. A reviewed Design Rationale asserts that the human read it. It does not prove that theory was reconstructed.

Aviation discovered this distinction at the cost of lives. Early checklists were read-and-acknowledge: the pilot read the item and confirmed completion. This failed because pilots confirmed items out of habit without actually verifying the underlying state. Modern checklists are challenge-and-response: one pilot reads the challenge, the other verifies the instrument and states the actual value. The check is coupled to system state, not to human assertion.

> **The Falsifiability Principle**
>
> A control artifact has integrity when it is falsifiable — when it makes a claim that can be checked against reality. An Intent Contract that declares scope is falsifiable: the actual change either stayed within scope or it did not. A Prediction Probe that asks for a prediction is falsifiable: the prediction is either correct or it is not. An artifact that asks only for acknowledgment is unfalsifiable and therefore worthless as a control.

## Combating Goodhart's Law

Metrics in software engineering are notoriously vulnerable to Goodhart's Law: when a measure becomes a target, it ceases to be a good measure. If a team is penalized or slowed down for failing Prediction Probes, the natural systemic response is not to study the system harder, but to ask easier challenges.

A framework that relies on human-generated questions to verify human understanding contains an inherent conflict of interest. If Explanation Latency is consistently dropping while system complexity is rising, the control system must assume the instrument is broken, not that the team has achieved enlightenment.

To prevent the four gauges from degrading into gamified vanity metrics, the framework relies on adversarial calibration. The instruments do not measure themselves; their rigor must be continuously adjusted. A Prediction Probe is only a valid instrument if it contains a genuine risk of failure. Ensuring that these artifacts remain falsifiable, sufficiently difficult, and immune to gamification is the primary operational duty of the Agentic Engineer. They do not just read the gauges — they are responsible for ensuring the gauges are actually connected to the engine.

## Signal Integrity for Each Leverage Point

Each of the five leverage points produces artifacts. Each artifact is vulnerable to a specific mode of degradation. Signal integrity requires coupling each artifact to a verifiable state.

### LP5 — Intent Contracts: Preventing Boilerplate

An Intent Contract degrades into boilerplate when it is written after the fact, when it is copied from a previous contract with minor edits, or when its declarations are never checked against outcomes. The integrity mechanism is automatic scope validation: when the agent completes work, the actual files modified and behaviors changed are compared against the declared scope and constraints in the contract. Any discrepancy is surfaced as a signal, not buried in a diff.

A healthy Intent Contract makes falsifiable claims. "Scope: auth module" is falsifiable — either the change touched only auth or it did not. "Make the login better" is not falsifiable and should be rejected by process before execution begins.

### LP1 — Invariant Register: Preventing Staleness

Invariants degrade through two mechanisms: they stop being checked, or the system evolves to violate them without anyone updating the register. The integrity mechanism is automated invariant checking on every change that touches a registered component, combined with a staleness clock. An invariant that has not been verified — either confirmed or explicitly updated — within a defined period is flagged as potentially stale. Stale invariants are worse than no invariants because they provide false confidence.

### LP3 — Scope Gates: Preventing Normalization

Scope gates degrade when exceptions become the norm. If 60% of changes exceed the declared threshold and are routinely approved, the gate has been normalized away. The integrity mechanism is tracking the violation rate over time. The absolute number of violations matters less than the trend. A rising violation rate is a signal that the gate is losing its function as a control.

### LP2 — Design Rationales and Prediction Probes: Preventing Ritual

This is where signal integrity matters most, because this is the leverage point most vulnerable to performance without substance. A Design Rationale can be fluently written and completely disconnected from reality. A Prediction Probe can be answered from surface-level pattern matching rather than genuine understanding.

The integrity mechanism is prediction. Prediction Probes should not ask "do you understand this change?" They should ask "what will happen if component X receives input Y after this change?" or "which other modules are affected if this component fails?" These are falsifiable questions. The human's prediction is recorded. Over time, predictions can be spot-checked against actual system behavior. A human who consistently predicts correctly holds theory. A human who consistently predicts incorrectly does not, regardless of what they signed off on.

### LP4 — Cognitive Maintenance: Preventing Atrophy

Cognitive maintenance degrades when it becomes a scheduled box-checking exercise rather than genuine engagement with complexity. The integrity mechanism is the Theory Reconstruction from Scratch exercise described in the Minimal Implementation section: write down what you believe a component does, then compare against reality. The gap between belief and reality is a direct, measurable quantity. If the gap is growing over time, LP4 is failing regardless of how many maintenance sessions are scheduled.

## Gauges

From the signal integrity mechanisms above, measurable quantities emerge that together instrument the health of the control system. These gauges are not vanity metrics. They are instruments that read the stocks defined in the system dynamics model.

### Core Gauges

| Gauge | What It Measures | How It's Collected | Degradation Signal |
|-------|------------------|--------------------|--------------------|
| Prediction Accuracy | Fidelity of human theory | Track correctness of Prediction Probe responses over time | Declining accuracy rate |
| Scope Violation Rate | Integrity of magnitude limits | Percentage of changes exceeding declared scope, tracked weekly | Rising violation rate or rising average violation size |
| Explanation Latency | Depth of system understanding | Periodic random sampling: ask an engineer to explain a subsystem, measure time and completeness | Increasing time or decreasing completeness |
| Invariant Verification Lag | Currency of stated system properties | Age of each invariant since last verification or update | Growing number of invariants past verification deadline |

These four gauges are not vanity metrics. They are instruments that read the four stocks defined in Part I. Prediction Accuracy reads Human Theory. Scope Violation Rate reads the effectiveness of the Complexity control. Explanation Latency reads Navigability directly. Invariant Verification Lag reads the gap between stated and actual system properties.

### Orchestration Gauges

| Gauge | What It Measures | Degradation Signal |
|-------|------------------|--------------------|
| Intent Propagation Fidelity | Semantic distance between root intent and leaf-agent sub-briefs | Growing distance at deeper orchestration layers |
| Cross-Agent Context Consistency | Agreement between context provided to sibling agents | Contradictory assumptions across concurrent agents |
| Decomposition Coherence | Whether the orchestrator's task decomposition covers the original intent without gaps or overlaps | Missing coverage or redundant sub-tasks |
| Composition Verification Rate | Percentage of multi-agent outputs verified for emergent behavior, not just individual correctness | Declining rate or increasing undetected composition failures |

### Operator Model Gauges

| Gauge | What It Measures | Applies To | Degradation Signal |
|-------|------------------|------------|--------------------|
| **Test Quality Gap** | Delta between operator-written tests and agent-generated baseline (coverage, edge cases) | APPRENTICE_2 | Gap not closing over time |
| **Invariant Awareness** | Can the operator name the invariants for a component before being shown them? | Onboarding / all | Low or declining awareness score |
| **Socratic Iteration Count** | Number of agent challenge-response cycles before operator's implementation passes | APPRENTICE_1, APPRENTICE_2 | Rising count (not learning) or flat at 1 (challenges too easy) |
| **Theory Confidence Distribution** | Per-module two-axis confidence: construction depth (built vs. reconstructed, by whom) × craft-weighted reasoning (craft maturity of theory holders) | Team-level / Agentic Engineer | Single-axis coverage — modules with high construction depth but low craft reasoning, or high craft reasoning but low construction depth. High-complexity modules with no overlap between axes. |

These supplement the existing four gauges (Prediction Accuracy, Scope Violation Rate, Explanation Latency, Invariant Verification Lag) and the orchestration gauges.

## Failure Thresholds

Gauges without alarm thresholds are decorations. The specific threshold values will vary by team, risk tolerance, and system criticality, but the existence of thresholds must not vary. A team practicing agentic engineering must define, in advance, the conditions under which they will slow or stop agent-driven work to reconstruct theory.

The nuclear principle applies: when the situation exceeds your understanding, reduce power. Do not seek more information at current power.

Thresholds operate at three levels:

> **🟡 Yellow — Caution**
>
> One or more gauges showing adverse trend over two consecutive measurement periods. Response: increase theory reconstruction effort, review recent changes for undetected drift, tighten scope gates temporarily.

> **🟠 Orange — Degraded**
>
> Prediction accuracy below team-defined threshold or Explanation Latency exceeding team-defined limit for critical subsystems. Response: halt new agent-driven feature work. Dedicate capacity to theory reconstruction. Resume only when gauges return to acceptable range.

> **🔴 Red — Loss of Controllability**
>
> No team member can accurately predict behavior of a critical subsystem, or invariant violations are being discovered in production rather than in the control loop. Response: full stop on agent-driven changes. Conduct system-wide theory reconstruction. This is the engineering equivalent of a reactor SCRAM — a controlled shutdown to prevent uncontrolled failure.

The crucial insight is that the Red threshold is not hypothetical. Without instrumentation, a team will not know they are in a Red state until a production incident reveals it. The gauges exist to make the Red state visible before it becomes a crisis.

### Failure Thresholds for Operator Model Gauges

The new gauges integrate into the same three-level framework:

| Level | Signal | Response |
|-------|--------|----------|
| **🟡 Yellow** | Test Quality Gap not closing over 3+ consecutive changes for an APPRENTICE_2. Socratic Iteration Count trending upward over 3+ changes. Theory Confidence Distribution shows 1+ high-complexity modules with single-axis coverage. | Preceptor reviews Socratic trails for the affected operator. Agentic Engineer schedules targeted LP4 maintenance for single-axis modules. |
| **🟠 Orange** | Test Quality Gap widening (operator's tests are getting *worse* relative to baseline). Socratic Iteration Count exceeding 2× the operator's rolling average. Invariant Awareness declining for an onboarding operator after initial ramp period. Theory Confidence Distribution shows critical-path modules with single-axis coverage. | Preceptor intervenes directly — adjusts learning focus, considers whether progression pace is appropriate. Agentic Engineer directs code archaeology sessions at critical-path modules. |
| **🔴 Red** | Socratic Iteration Count flat at 1 across multiple changes (challenges are too easy — adversarial calibration has failed). Theory Confidence Distribution shows critical-path modules with *no* theory holders on either axis. | Agentic Engineer recalibrates challenge generation (adversarial calibration duty). Team-wide reconstruction effort for uncovered critical-path modules — equivalent to the existing "full stop, system-wide reconstruction" response. |

## The Agentic Engineer

The existence of instruments and thresholds implies the existence of someone accountable for reading the instruments and responding to the thresholds. Every high-amplification domain has converged on this: aviation has check airmen and crew resource management trainers, finance has risk officers with trading halt authority, nuclear has shift supervisors with SCRAM authority.

In agentic development, this role is the Agentic Engineer.

The Agentic Engineer is not a new invention. It is the recognition that agentic development constitutes a new engineering discipline with its own body of knowledge, its own failure modes, and its own required competencies. Just as software engineering emerged as a discipline distinct from computer science, agentic engineering emerges as a discipline distinct from software engineering.

The defining characteristics of the Agentic Engineer:

- **Owns the control loop, not the code.** Their primary responsibility is the integrity of the human-machine interface — the controllability of the system — not the features it produces.

- **Reads the gauges.** They monitor Prediction Accuracy, Scope Violation Rate, Explanation Latency, and Invariant Verification Lag. They are accountable for knowing the current state of the control system.

- **Has halt authority.** They can slow or stop agent-driven work when the control loops are degrading. This authority must be real — backed by organizational structure — not advisory. Advisory authority gets overridden by velocity pressure every time.

- **Maintains signal integrity.** They are responsible for ensuring that artifacts remain falsifiable and coupled to system state, that Prediction Probes test for genuine understanding, and that controls do not degrade into ritual.

Not every team needs a dedicated Agentic Engineer. In smaller teams, this may be a hat worn by a senior engineer. In larger or higher-risk organizations, it may be a full-time role. The scale is flexible. The accountability is not. Someone must own the loop, and that ownership must include the authority to protect it.
