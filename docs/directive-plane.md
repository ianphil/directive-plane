# The Directive Plane

## A Control Architecture for Steerable Agentic Engineering

*Optimizing for steerability and coherence over time. Not productivity.*

*February 2026*

---

# Part I: The Dynamics of Loss

Agentic software development introduces a novel failure mode: systems that work correctly while becoming progressively unknowable. This is not a bug. It is the natural consequence of decoupling implementation speed from human comprehension speed.

To understand why this happens — and why it is dangerous — we must model the dynamics precisely.

## 1.1 The Fundamental Decoupling

Software engineering has historically rested on an implicit assumption articulated by Peter Naur in 1985: the people who build a system hold the theory of that system. The theory is not the code, the documentation, or the tests. It is the living mental model that allows a human to explain why the system is the way it is, to predict its behavior in novel situations, and to modify it coherently.

Agentic development breaks this coupling. When an AI agent implements a feature, refactors a module, or resolves a set of failing tests, the resulting code may be technically correct. But the human who initiated the work has not traversed the reasoning path that produced it. They have not built the theory.

> **The Core Asymmetry**
>
> Implementation velocity scales with compute. Comprehension velocity does not. The gap between these two rates is the fundamental instability in agentic development.

## 1.2 System Dynamics Model

We can model the dynamics of agentic development using four primary stocks and their interactions:

### Stocks

**System Complexity:** The total informational content of the codebase — its structure, interdependencies, implicit assumptions, and behavioral surface area. This stock only increases under normal development.

**Human Theory:** The fidelity of the mental model held by the responsible humans. This stock decays naturally and requires active maintenance through engagement with the system.

**Intent Clarity:** The precision and completeness with which human goals are encoded before being transmitted to agents. This stock degrades under time pressure and overconfidence.

**Navigability:** The practical ability of a human to find, understand, and modify any part of the system. This is a derived stock — a function of the ratio between Theory and Complexity.

**Operator Capability:** The meta-skill: the ability to perform LP1–LP5 effectively. Unlike Human Theory — which measures understanding of the current system — Operator Capability is the general engineering judgment that feeds Theory. It grows under Socratic engagement, atrophies under passive agent use, and resets per-system.

### Flows and Loops

**Reinforcing Loop R1 — The Velocity Trap.** As agents produce more output, System Complexity grows. If Theory does not keep pace, Navigability drops. Lower Navigability makes it harder to specify precise intent, which degrades Intent Clarity. Degraded intent produces less coherent agent output, which further increases effective Complexity (through inconsistency and redundancy). The loop accelerates.

**Reinforcing Loop R2 — Trust Erosion.** As the gap between Complexity and Theory widens, humans lose the ability to verify agent output. Unable to verify, they either accept all output uncritically (which compounds Complexity) or reject output defensively (which destroys velocity, creating pressure to bypass controls). Both paths are degenerative.

**Reinforcing Loop R3 — Intent Drift.** When humans cannot fully understand the current state of the system, their intent specifications become detached from reality. They describe what they believe the system is, not what it actually is. Agents execute faithfully against incorrect mental models, producing technically correct but systemically incoherent changes.

### Balancing Loops

The reinforcing loops above are counteracted by three balancing loops introduced through the adaptive operator model:

**Balancing Loop B1 — Socratic Theory Building.** Socratic mode forces manual implementation → Operator Capability grows → Human Theory grows → Navigability improves → Intent Clarity improves. Directly counteracts R1 (Velocity Trap).

**Balancing Loop B2 — Circuit Breaker Recovery.** Theory drops → circuit breaker fires (LP6) → RESTRICTED mode forces manual coding → Human Theory rebuilds → Prediction Accuracy recovers → agent access restored. Converts LP4 from cultural aspiration to automatic balancing mechanism.

**Balancing Loop B3 — Progression Ratchet.** Operator demonstrates competence → scaffolding removed → harder challenges → capability grows further. Evidence-based progression means you can't skip steps.

### Reinforcing Loops (Risks)

**Reinforcing Loop R4 — Velocity Pressure Cascade.** When one operator hits RESTRICTED, their velocity drops. Under deadline pressure, teammates compensate with more agent work → their theory drops → they risk hitting RESTRICTED → cascade. Mitigation: organizational slack capacity. A team that cannot afford a circuit breaker firing is a team that is already unsafe.

**Reinforcing Loop R5 — Confidence Divergence.** The system develops a patchwork — modules built under Socratic mode have high construction depth, modules built by agents under standard review have higher craft reasoning. Neither alone is complete. Mitigation: a two-axis confidence model that tracks construction depth × craft-weighted reasoning per module, directing cognitive maintenance at the specific gap.

### Delay Effects

The most dangerous property of these dynamics is that the damage is delayed. A system can function correctly for months while Theory degrades beneath the surface. The failure mode is not a crash — it is the slow onset of an inability to change direction. By the time the problem is visible, the cost of reconstruction may exceed the cost of replacement.

## 1.3 The Compounding Nature of Theory Loss

Theory loss compounds in a specific and pernicious way. Consider a system that undergoes 50 agent-driven changes over a quarter. If the human maintains theory for the first 10 and then falls behind, the subsequent 40 changes are built on foundations the human does not fully understand. Each successive change is not merely one unit of lost theory — it is one unit built on top of prior lost units. The reconstruction cost grows superlinearly.

This is the cognitive analog of technical debt, but worse. Technical debt can be measured, catalogued, and retired through engineering effort. Cognitive debt is invisible until the moment you need the theory and discover it is not there. It lives entirely inside human minds, and its absence is detectable only through its consequences: bad decisions, incoherent changes, and the creeping inability to answer the question "why is it this way?"

## 1.4 What Agents Actually Provide

Before proceeding to the controls, we must be precise about what agents provide under disciplined conditions — because the value proposition is real, and ignoring it makes the framework seem adversarial to the tools it governs.

**Agents handle implementation complexity. Humans handle architectural reasoning.** This is a division of labor, not a reduction of labor. A human who understands a system's architecture but delegates the implementation of a well-specified change to an agent gets something valuable: the change implemented correctly across dozens of files, with consistent style, with test coverage, in minutes rather than hours. What they don't get is freedom from understanding the change. The time savings come from not typing, not from not thinking.

**Agents expand the scope of what one person can maintain.** Without agents, a single engineer can hold theory for maybe 50,000–100,000 lines of code, depending on complexity. With agents handling implementation under controlled conditions, that same engineer can maintain theory over a larger surface area because the reconstruction cost per change is lower — the agent produces the narrative, the human verifies it — even though reconstruction is still required. The bottleneck shifts from "I can't write code fast enough" to "I can't understand changes fast enough," and the framework exists precisely to keep that second bottleneck manageable.

**Agents reduce errors of implementation, not errors of intent.** A human writing code by hand makes typos, forgets edge cases, introduces inconsistencies between modules. An agent operating within a well-specified scope makes fewer of these errors. The errors that remain are errors of intent — the human asked for the wrong thing, or the right thing in the wrong context. The framework is designed to catch exactly those errors. The net effect: fewer low-level bugs, same or better detection of high-level mistakes, at higher speed.

The controls are not the tax on velocity. Theory loss is the tax on velocity. Teams that skip the controls don't avoid the cost — they defer it, with interest, until a production incident or a strategic pivot reveals that no one understands the system anymore. The controls convert a deferred, compounding, invisible cost into a current, manageable, visible one. That's not overhead. That's engineering discipline.

---

## A Third Invariant

The Directive Plane defines two invariants that the architecture exists to protect: outbound intent fidelity and inbound theory preservation. Both assume the human on one end is *capable*. They govern the interface between human and machine but say nothing about whether the human's ability to use that interface is growing, stable, or atrophying. This framework recognizes a third:

**Operator Capability Integrity** — the humans directing agents possess and continuously develop the judgment required to specify intent and reconstruct theory.

This is the *meta-invariant* — it is what makes the other two possible. Without it, the other two fail silently. Intent Briefs get filled out but are vague because the operator lacks the depth to be precise. Theory Challenges get answered but are surface-level because the operator lacks the foundation to reason deeply. The artifacts exist. The controls are performative.

Operator Capability Integrity is not a fourth plane. It is a cross-cutting concern that lives across all three existing planes:

- **Socratic mode** lives in the Execution Plane (changes *how* execution happens)
- **The circuit breaker** lives in the Reconstruction Plane (triggered by theory challenge gauges)
- **Merge gates** live in the Directive Plane (governance mechanism on what gets shipped)
- **The progression ladder** spans all three (determines which mode each plane operates in for a given operator)

The existing framework hints at this with LP4 (Reasoning Capability Preservation), but LP4 is framed as *maintenance* — preventing atrophy in people who already have the skill. The third invariant covers the full lifecycle: **growth** (juniors building capability through Socratic mode), **maintenance** (the circuit breaker catching degradation in experienced operators), and **adaptation** (onboarding rebuilding capability in a new system context).

---

# Part II: The Minimal Stabilizing Set

The dynamics described above will destabilize any agentic development system unless specific balancing loops are introduced. Analysis suggests seven leverage points that together form a minimal stabilizing set. Removing any one eventually makes the system unknowable and unsteerable, regardless of technical correctness.

## 2.1 The Seven Leverage Points

| # | Leverage Point | Balancing Mechanism |
|---|----------------|---------------------|
| 1 | Make intent violations visible | Violations of stated intent surface immediately and automatically, not through review effort |
| 2 | Force graduated reconstruction of theory after changes | The method matches operator capability — juniors build theory through implementation, seniors reconstruct from agent output. The mechanism adapts; the requirement is invariant. |
| 3 | Limit change magnitude without justification | The scope of any single change is bounded unless explicitly expanded with reasoning |
| 4 | Preserve human reasoning capability | The system actively prevents atrophy of human understanding through required engagement |
| 5 | Structure intent explicitly | Human intent is captured in artifacts that are machine-parseable and human-reviewable before execution |
| 6 | Gate agent access to demonstrated comprehension | Agent execution gated by Prediction Accuracy. Theory degrades → amplifier removed. LP4 says "stay sharp." LP6 says "if you aren't sharp, the machine won't start." |
| 7 | Separate production authority from exploration access | Use agents freely in non-production, ship only when qualified. Without this, LP6 either blocks learning or allows unverified production code. |

## 2.2 How Each Creates a Balancing Loop

**LP1 — Intent Violation Visibility** creates a balancing loop against R1 (Velocity Trap). When agent output diverges from specified intent, the divergence becomes a visible signal rather than a silent drift. This converts an open-loop process (fire and forget) into a closed-loop one (fire, observe, correct). The key insight is that visibility must be automatic and structural, not dependent on human vigilance. Humans under velocity pressure will not look for problems; problems must present themselves.

**LP2 — Forced Theory Reconstruction** creates a balancing loop against the decay of the Theory stock. After any agent-driven change, the human is required — through process and tooling — to articulate what changed and why. This is not a rubber-stamp review. It is a reconstructive act: the human must build the theory they did not generate through implementation. This is uncomfortable by design. Comfort here is the symptom of failure.

**LP3 — Change Magnitude Limits** create a balancing loop against Complexity growth. By bounding the scope of any single agent action, the system ensures that Theory reconstruction remains tractable. A 50-file refactoring is not inherently wrong, but it is inherently unreviewable by a human who did not perform it. If the change cannot be justified at that scope, it must be decomposed.

**LP4 — Reasoning Capability Preservation** is the meta-stabilizer. It guards against the atrophy of the human ability to perform the other four functions. If humans stop engaging with system internals because agents handle everything, they lose the capacity to specify intent, detect violations, reconstruct theory, or judge change magnitude. This leverage point mandates periodic human engagement with raw complexity — not as busywork, but as cognitive maintenance.

**LP5 — Explicit Intent Structure** creates a balancing loop against R3 (Intent Drift). By requiring intent to be captured in structured, inspectable artifacts before agent execution begins, the system creates a record of what was asked and a basis for comparing it against what was produced. Unstructured intent ("make it work") is the raw material of drift.

**LP6 — Theory-Gated Agent Access** creates a balancing loop against LP4 degradation. When theory maintenance becomes voluntary, it gets skipped under velocity pressure. LP6 makes it involuntary — the system measures comprehension and removes the amplifier when it degrades. The circuit breaker converts LP4 from cultural aspiration into automatic mechanism.

**LP7 — Production/Exploration Separation** creates a balancing loop against the all-or-nothing access problem. Without LP7, restricting agent access to protect production also blocks learning. LP7 decouples the two: operators can use agents freely in non-production environments while production access requires demonstrated competence.

The seven leverage points form a dependency structure. LP5 missing → LP1 impossible. LP4 missing → LP2/LP3 performative. LP3 missing → LP2 intractable. LP6 missing → LP4 becomes voluntary and gets skipped under velocity pressure. LP7 missing → LP6 either blocks learning (too strict) or allows unverified code in production (too loose).

## 2.3 Risk Proportionality — The Control Gradient

The five leverage points are invariant. Their implementation intensity is not.

The dynamics described in Part I operate regardless of whether the system is a banking platform or a personal side project. But the cost of losing steerability varies enormously. The framework must scale investment in control to match the cost of losing it.

**Consequential systems** — financial infrastructure, medical devices, defense, anything where failure has legal, safety, or large-scale economic impact. Full implementation. Dedicated Agentic Engineer role. All four gauges tracked quantitatively. Formal thresholds with halt authority. Theory Challenges recorded and audited. This is the nuclear-grade application of the framework.

**Professional systems** — production SaaS, internal enterprise tools, anything a team ships and maintains for paying users. The leverage points are all present but lighter-weight. Intent Briefs might be less formal. Scope Gates exist but the threshold is higher. Theory Challenges happen in PR review rather than as standalone exercises. Cognitive Maintenance is built into existing practices like architecture reviews rather than scheduled separately. One person owns the loop but it's a hat, not a full-time role.

**Exploratory systems** — prototypes, personal projects, hackathon work, anything where the cost of rebuilding from scratch is low. Here the leverage points collapse into habits rather than process. The developer keeps a scratchpad of intent before prompting an agent. They read the output rather than blindly committing. They notice when they don't understand something and pause. The formal apparatus isn't justified, but the cognitive posture still applies. The question "do I understand what just happened to my system?" is always worth asking, even when the stakes are low.

The gradient scales intensity, not applicability. The temptation will be to read this and conclude "we're low-risk, so none of this applies." That's the path to discovering you were higher-risk than you thought, after the fact.

---

# Part III: The Three-Plane Architecture

The stabilizing set implies a specific architecture. Before describing its structure, we must name the three properties it exists to protect:

> **Outbound Intent Fidelity** — human will reaches the machine without loss of meaning, scope, or constraint.
>
> **Inbound Theory Preservation** — human understanding is reconstructed from machine-driven outcomes with sufficient fidelity to maintain steerability.
>
> **Operator Capability Integrity** — the humans directing agents possess and continuously develop the judgment required to specify intent and reconstruct theory.

These are the invariants. Everything else is mechanism. If outbound intent fidelity fails, the machine does work the human did not ask for. If inbound theory preservation fails, the human loses the ability to steer. If operator capability integrity fails, the other two become performative — artifacts exist but controls are hollow. Any single failure produces an unsteerable system. All three must be designed for, maintained, and defended.

The architecture borrows its structure from modern networks. In networking, the control plane decides where traffic goes; the data plane moves it. They are architecturally separate, they have different failure modes, and critically — when the control plane fails, the data plane keeps forwarding based on stale state. The system keeps working. It just stops being steerable.

That is precisely the failure mode this framework addresses. The architecture separates agentic development into three planes:

**The Directive Plane** — where human intent is structured, validated, scoped, and routed to agents. This is the control plane. It handles intent specification, scope governance, constraint propagation, and in the multi-agent case, the Intent Contracts that travel across agent boundaries. It serves **outbound intent fidelity**.

**The Execution Plane** — where agents write code, run tests, and produce changes. This is the data plane. It does the work.

**The Reconstruction Plane** — where theory flows back to humans. Change Narratives, Theory Challenges, Invariant verification. This is the telemetry and observability layer — the monitoring infrastructure that lets the Directive Plane know whether execution matched intent. It serves **inbound theory preservation**.

The Agentic Engineer's job is maintaining the integrity of the Directive and Reconstruction Planes. They do not touch the Execution Plane directly — they ensure that what goes into it is well-specified and what comes out of it is well-understood.

## 3.1 The Directive Plane

The Directive Plane is the subsystem through which human intent becomes constrained, high-fidelity action. It answers the question: how does a human thought become a correct machine action without losing meaning in transmission?

### Information Flow

1. **Intent Capture.** The human articulates what they want in a structured format: goal, constraints, scope boundaries, acceptance criteria, and explicitly stated non-goals. This is not a ticket. It is a contract.

2. **Context Binding.** The intent artifact is automatically enriched with the current system state relevant to the goal: affected components, recent changes to those components, existing tests, and known invariants. This prevents intent from being specified against a stale mental model.

3. **Scope Verification.** Before execution, the agent proposes a plan: what it intends to change, what it intends to leave untouched, and what side effects it anticipates. This plan is compared against the intent artifact. Discrepancies surface before any code is written.

4. **Bounded Execution.** The agent executes within declared scope. Any attempt to modify files or components outside the declared boundary requires explicit authorization. This is not a technical limitation — it is a governance mechanism.

5. **Completion Signal.** Upon completion, the agent produces not just the change but a structured completion artifact: what was done, how it maps to the intent, what was intentionally left undone, and what the human should verify.

### Key Artifacts

- **Intent Document:** Machine-parseable, human-readable specification of goal, constraints, scope, and acceptance criteria.
- **Execution Plan:** Agent-generated plan reviewed before work begins. Includes file-level scope, anticipated test changes, and identified risks.
- **Completion Report:** Structured mapping of actions taken to intent specified. Includes explicit callout of anything that deviated from plan.

### Failure Modes Prevented

- Scope creep through undetected agent expansion beyond stated intent.
- Intent-reality mismatch when the human's mental model of the system is stale.
- Silent failure when agent output is technically valid but semantically wrong.

## 3.2 The Reconstruction Plane

The Reconstruction Plane is the subsystem through which humans rebuild accurate mental models after machine-driven changes. It answers the question: how does a human understand what happened and why, when they did not do it themselves?

### Information Flow

1. **Change Narration.** Every agent-driven change produces a narrative explanation written for human consumption. Not a diff. Not a commit message. A narrative: "The authentication module was restructured because the previous approach violated the constraint that session tokens must not traverse the network boundary. Specifically, the TokenValidator was moved from the API gateway to the service mesh sidecar."

2. **Theory Challenge.** The human is presented with questions that can only be answered by someone who understands the change. "What would happen if the sidecar is unavailable? Where does the token now get validated for internal service-to-service calls?" These are not tests of memory. They are tests of theory.

3. **Dependency Mapping.** Changes are presented not in isolation but in the context of what they affect. A change to module A that silently alters the behavior of modules B and C must surface B and C in the reconstruction artifact. Invisible coupling is the primary vector of theory loss.

4. **Invariant Verification.** After reconstruction, the human confirms or updates the system's stated invariants. If a change has altered a fundamental assumption, that assumption must be explicitly acknowledged and the invariant updated. Stale invariants are worse than no invariants.

### Key Artifacts

- **Change Narrative:** Human-readable explanation of what changed, why, and what it affects. Written at the level of architectural reasoning, not line-by-line code review.
- **Theory Challenges:** Comprehension questions that verify the human has internalized the change, not merely acknowledged it.
- **Invariant Register:** Living document of system invariants, updated after every change that affects them. Each invariant has a last-verified date and a responsible human.

### Failure Modes Prevented

- Rubber-stamp reviews where humans approve without understanding.
- Invisible coupling where changes propagate through pathways the human has not modeled.
- Invariant rot where fundamental assumptions become false without anyone noticing.

---

# Part IV: Lessons from Analogous Domains

The problem of maintaining human control under high power amplification is not new. Several domains have evolved sophisticated control architectures to address precisely this dynamic. Their solutions are instructive.

## 4.1 Aviation Automation

### The Dynamic

Modern fly-by-wire aircraft amplify pilot inputs enormously. A small stick movement produces large control surface deflections, mediated by computers that interpret pilot intent and translate it into aerodynamically correct actions. The aircraft can fly itself for extended periods. The pilot's role has shifted from direct control to supervisory control.

### The Failure Mode Discovered

The aviation industry discovered, at the cost of lives, that automation creates a specific pathology: mode confusion. Pilots lost track of what the automation was doing and why. The aircraft was functioning correctly according to its programming, but the pilot's mental model of the aircraft's state had diverged from reality. When manual intervention became necessary, pilots acted on incorrect theories of the system and made catastrophic decisions.

### The Control Principles Evolved

- **Mode Annunciation:** The automation must always announce what it is doing and why. The current mode, its constraints, and its intended behavior are continuously displayed. This maps directly to LP1 (intent violation visibility) and LP2 (theory reconstruction).

- **Envelope Protection:** The automation constrains itself to safe operating boundaries. A pilot can request a maneuver that would exceed structural limits; the aircraft will refuse. This maps to LP3 (change magnitude limits).

- **Manual Reversion Requirements:** Pilots must periodically hand-fly the aircraft to maintain proficiency. Automation cannot be allowed to atrophy the skills needed to supervise and override it. This maps directly to LP4 (reasoning capability preservation).

- **Cleared Intent:** Before any phase of flight, the crew explicitly briefs the intended plan: departure procedure, cruise altitude, approach type, missed approach procedure. This is LP5 (structured intent).

### Mapping to Agentic Engineering

The aviation parallel is almost exact. The agent is the autopilot. The developer is the pilot. Mode confusion is theory loss. Envelope protection is scope bounding. Manual reversion is cognitive maintenance. The aviation industry learned these lessons through decades of incident investigation. Agentic engineering should not require the same tuition.

## 4.2 Financial Leverage and Risk Management

### The Dynamic

Financial leverage allows a small amount of capital to control a much larger position. A trader with 10x leverage can generate 10x returns — or 10x losses. The amplification is symmetric. The speed of modern algorithmic trading means that positions can move faster than human comprehension.

### The Failure Mode Discovered

The 2008 financial crisis demonstrated what happens when leveraged systems become unknowable. Individual instruments (CDOs, credit default swaps) were technically sound. But the system of interconnections between them was so complex that no human — and, critically, no model — understood the aggregate behavior. When conditions changed, the system behaved in ways no one had predicted because no one held the theory of the whole.

### The Control Principles Evolved

- **Position Limits:** No single trader or desk can accumulate exposure beyond defined thresholds without escalation. This is LP3 (change magnitude limits) applied to risk.

- **Mark-to-Market:** Positions are continuously re-valued against market reality, not held at their original value. This is LP1 (making violations visible) — the gap between belief and reality is surfaced automatically.

- **Stress Testing:** Portfolios are subjected to hypothetical scenarios to test whether the humans managing them understand the behavior under stress. This is LP2 (forced theory reconstruction) applied to risk models.

- **Segregation of Duties:** Those who construct trades and those who verify them are different people. This ensures that at least two independent theories of the system exist. This is an organizational implementation of LP4 (reasoning capability preservation).

### Mapping to Agentic Engineering

Software systems under agentic development are leveraged systems. A small human input (a prompt, a task description) produces a large systemic effect (hundreds of lines of code, architectural changes). The 2008 lesson applies: if the interconnections become unknowable, the system will eventually behave in ways no one predicted. Position limits are scope bounds. Mark-to-market is continuous theory validation. Stress testing is theory challenges.

## 4.3 Nuclear Power Operations

### The Dynamic

Nuclear reactors amplify small control actions into enormous energy outputs. The system operates within tight safety margins, the consequences of error are extreme, and many critical processes occur at timescales and scales that are not directly perceivable by human operators. Much of the operation is automated. But the human operators bear ultimate responsibility for safety.

### The Failure Mode Discovered

The Three Mile Island incident (1979) and the Chernobyl disaster (1986) both involved operators who had lost track of the actual reactor state. At Three Mile Island, a combination of misleading indicators and operator assumptions led to decisions that worsened a partial meltdown. The operators held a theory of the system that was wrong. Their actions were rational given their theory but catastrophic given reality.

### The Control Principles Evolved

- **Defense in Depth:** Multiple independent barriers prevent any single failure from reaching the public. Each barrier has its own monitoring and its own theory. This is a structural implementation of redundancy in human understanding.

- **Procedural Compliance with Understanding:** Operators follow written procedures, but they are trained to understand the physics behind each step. Rote compliance without understanding is itself considered a failure mode. This is LP2 and LP4 combined: forced theory reconstruction and reasoning capability preservation.

- **Conservative Decision Making:** When in doubt, the correct action is to reduce power, not to seek more information while continuing at current power. This maps to LP3: when the magnitude of the situation exceeds current understanding, the system constrains itself.

- **Shift Turnover Briefs:** Every shift change involves a formal transfer of theory: what is the current state of the plant, what is abnormal, what actions are in progress, what should the incoming crew watch for. This is a direct implementation of LP2 (theory reconstruction) at an organizational boundary.

### Mapping to Agentic Engineering

The nuclear parallel illuminates a crucial point: the most dangerous state is not a system that is broken, but a system that is functioning while the operator's theory of it is wrong. In agentic development, this is precisely the state that emerges when agents produce correct code that the human does not understand. The system works. The tests pass. But the human's theory is wrong, and their next decision will be based on that wrong theory.

## 4.4 Synthesis: Universal Control Principles

Across these domains, the same principles emerge independently:

| Principle | Aviation | Finance | Nuclear | Agentic Engineering |
|-----------|----------|---------|---------|---------------------|
| Make state visible | Mode annunciation | Mark-to-market | Control room displays | Intent violation detection |
| Force human understanding | Type ratings, recurrent training | Stress testing | Procedure + physics training | Theory challenges |
| Bound action magnitude | Envelope protection | Position limits | Conservative decision making | Scope constraints |
| Prevent skill atrophy | Manual flying requirements | Segregation of duties | Simulator training | Cognitive maintenance |
| Declare intent before action | Flight briefs, clearances | Trade documentation | Shift turnover briefs | Intent documents |

These are not coincidences. They are convergent solutions to the same structural problem: maintaining human control when machines amplify human action beyond the speed or scale of direct human perception.

---

# Part V: Failure Modes

Each leverage point addresses a specific failure mode. Removing any single one does not merely reduce effectiveness — it creates a qualitatively different failure trajectory that eventually renders the system unsteerable.

## 5.1 Without LP1: Intent Violations Invisible

> **Failure Pattern: Silent Drift**
>
> The system gradually diverges from human intent without any signal. Each individual change may be small enough to pass review, but the cumulative vector of drift is never measured. After months, the system's actual behavior is materially different from what any human believes it to be.

Without automatic visibility of intent violations, the system relies entirely on human vigilance during code review. But human reviewers under velocity pressure perform pattern-matching, not deep analysis. They check whether the change looks reasonable, not whether it satisfies the original intent. The gap between intent and implementation grows invisibly. The long-term trajectory is a system that passes all tests but serves a purpose no human specified.

## 5.2 Without LP2: Theory Reconstruction Not Required

> **Failure Pattern: Cargo Cult Operation**
>
> Humans continue to direct agent activity but progressively lose the ability to understand what the agents produce. They learn to specify tasks at a level of abstraction that gets results without requiring understanding. The system works, changes are shipped, but no human can explain why the system behaves the way it does.

This is the most insidious failure mode because it is comfortable. Everything appears functional. But the Theory stock has been drawn down to zero. When a novel situation arises — a production incident, a strategic pivot, a security vulnerability — the humans responsible discover they cannot reason about their own system. They have become operators of a black box they nominally own. The reconstruction cost at this point is often prohibitive, and the system enters a state where it can only be maintained, never intentionally evolved.

## 5.3 Without LP3: Unbounded Change Magnitude

> **Failure Pattern: Comprehension Overflow**
>
> Agent-driven changes routinely exceed the human's ability to review or understand them. A single task produces changes across dozens of files, altering behaviors in subsystems the human did not intend to touch. The changes are technically correct and the tests pass, but no human has verified the full scope.

Unbounded change magnitude makes all other controls ineffective. Intent verification fails because the scope of verification exceeds human capacity. Theory reconstruction fails because there is too much to reconstruct. The system evolves in large, incomprehensible jumps. Over time, humans learn to not even attempt understanding large changes, creating a ratchet: each unbounded change makes the next one seem more normal.

## 5.4 Without LP4: Reasoning Capability Not Preserved

> **Failure Pattern: Skill Atrophy Spiral**
>
> Humans gradually lose the ability to reason about their systems at the level of depth required for effective supervision. Their capacity to specify intent, detect violations, and reconstruct theory all degrade simultaneously. The controlling intelligence of the system quietly transfers from human to machine without any deliberate decision.

This is the meta-failure. LP4 is the leverage point that maintains the human's ability to exercise the other four. Without it, the other controls may exist as process artifacts but lose their teeth. Humans fill out intent documents without the skill to write precise ones. They sign off on theory challenges without the depth to answer them honestly. The controls become rituals. The rituals become theater. The theater provides false confidence while the system becomes unsteerable.

## 5.5 Without LP5: Intent Not Structured

> **Failure Pattern: Ambient Delegation**
>
> Humans communicate intent through natural language that is ambiguous, incomplete, or contradictory. Agents interpret this intent through their own biases and training. No record exists of what was actually asked for, making it impossible to determine whether the output matches the input.

Without structured intent, there is no basis for any of the other controls. You cannot detect intent violations if intent was never specified. You cannot reconstruct theory if there is no theory to reconstruct against. You cannot bound change magnitude if the scope was never declared. Unstructured intent is the foundation failure — it makes the human-machine interface a lossy channel by default.

## 5.6 Without LP6: Agent Access Not Gated by Comprehension

> **Failure Pattern: Voluntary Maintenance Collapse**
>
> LP4 (cognitive maintenance) exists as a cultural practice but meets the highest resistance because it reduces velocity. Under deadline pressure, teams skip it. Without LP6's automatic circuit breaker, there is no mechanism to detect when theory has degraded below the threshold for safe agent use. Operators continue directing agents through systems they no longer understand. The failure is identical to LP4's but occurs faster because there is no backstop.

## 5.7 Without LP7: Production and Exploration Coupled

> **Failure Pattern: Binary Access Trap**
>
> Without separating production authority from exploration access, LP6 creates a dilemma. Restrict agent access to protect production → juniors cannot learn to use agents → talent pipeline stalls. Allow agent access to enable learning → unverified agent code reaches production → system becomes unsteerable. The binary choice forces organizations to either accept production risk or abandon agent-assisted learning. Both paths are degenerative.

## 5.8 Compound Failure

In practice, these failures compound. Removing LP5 makes LP1 impossible. Removing LP4 makes LP2 and LP3 performative. Removing LP3 makes LP2 intractable. LP6 missing makes LP4 voluntary and skippable under velocity pressure. LP7 missing makes LP6 either too strict (blocks learning) or too loose (allows unverified production code). The seven leverage points form a dependency structure where each reinforces the others. The minimal stabilizing set is minimal not because any element is optional, but because removing any element causes cascading degradation of the rest.

---

# Part VI: Instrumentation — Measuring Steerability

The architecture described in Parts II through V defines what must be controlled. How to know the controls are working — gauges, failure thresholds, signal integrity, and the Agentic Engineer role — is covered in the [Instrumentation](instrumentation.md) reference.

---

# Part VII: Minimal Implementation

The following practices are designed to install the stabilizing loops in a real engineering team. They are ordered by adoption difficulty (lowest friction first) and designed to compose. A team can adopt them incrementally, though the full stabilizing effect requires all five to be active.

## 7.1 Practice 1: The Intent Brief (LP5)

**Adoption difficulty: Low.** Before any agent task, the human writes a brief structured document:

> **Intent Brief Template**
>
> **Goal:** What should be true when this is done?
> **Scope:** Which components/files/modules may be modified?
> **Constraints:** What must not change? What behaviors must be preserved?
> **Non-goals:** What is explicitly out of scope?
> **Acceptance:** How will I verify this is correct?

This takes 2–5 minutes. It forces the human to think before acting and creates the reference artifact for all downstream controls. The brief lives in the repository alongside the resulting changes, creating a permanent record of intent.

## 7.2 Practice 2: The Scope Gate (LP3)

**Adoption difficulty: Low.** Establish a default maximum change scope for agent-driven work. A reasonable starting point is 200 lines of net change or 5 files modified, whichever is reached first. Changes exceeding the threshold are not forbidden — they require the human to explicitly acknowledge and justify the scope expansion before the agent proceeds.

This can be implemented as a simple pre-commit hook, a CI check, or even a social contract. The mechanism matters less than the principle: unbounded change must require conscious authorization, not passive acceptance.

## 7.3 Practice 3: The Change Narrative (LP2)

**Adoption difficulty: Medium.** After every agent-driven change, the agent produces a Change Narrative: a structured explanation written for the human who will maintain this code.

The narrative is not a diff summary. It explains the reasoning behind the change, the alternatives considered, the side effects anticipated, and the assumptions made. Critically, it should be written at the architectural level, not the line level. A human reading a good Change Narrative should be able to explain to a colleague what changed and why without looking at the code.

The human then reviews the narrative and confirms understanding by answering at least one theory challenge: a question that can only be answered by someone who understood the change. If they cannot answer, they must engage with the code until they can.

## 7.4 Practice 4: Invariant Tracking (LP1)

**Adoption difficulty: Medium.** Maintain a living document of system invariants: statements that must always be true. After every change that touches a component with registered invariants, the agent checks the change against the invariants and flags any violations or modifications.

Invariants are registered by humans, not generated by agents. They represent the human's theory of what matters — the essential properties that define correct behavior. When an invariant is violated, it is not automatically a bug; it may mean the invariant needs updating. But the violation must be visible and the update must be deliberate.

A minimal invariant register is a markdown file in the repository root with entries like:

> **Example Invariant Entry**
>
> `INV-007: Session tokens must never be transmitted outside the service mesh boundary.`
> `Owner: @engineer | Last verified: 2026-02-15 | Components: auth/*, gateway/*`

## 7.5 Practice 5: Cognitive Maintenance Rotation (LP4)

**Adoption difficulty: High (cultural).** Dedicate regular time — weekly or biweekly — for humans to engage directly with system complexity without agent assistance. This is the engineering equivalent of the pilot's manual flying requirement.

Concrete forms this can take:

- **Code Archaeology Sessions:** Walk through a module that has been heavily agent-modified. Explain to a peer how it works and why. Discover what you cannot explain.

- **Manual Bug Fixes:** Periodically fix bugs by hand, without agent assistance. This forces direct engagement with the codebase and maintains the skill of reading and reasoning about code.

- **Invariant Audits:** Review the invariant register. Are there invariants missing? Are any stale? Can you still explain why each one matters?

- **Theory Reconstruction from Scratch:** Pick a component at random. Without reading the code, write down what you believe it does and how. Then read the code and compare. The gap is your cognitive debt.

This practice meets the highest resistance because it appears to reduce velocity. It does reduce velocity. That is the point. It preserves the human capability without which velocity is meaningless.

## 7.6 Worked Example: The Framework in Operation

To illustrate how the five leverage points and the instrumentation interact in practice, consider a concrete scenario.

A team maintains a payment processing service. They are adding support for a new payment provider. The engineer leading the work uses an agent to implement the integration.

**LP5 — Intent Brief.** Before starting, the engineer writes a brief. Goal: add Provider X as a payment option. Scope: the payments module and its tests. Constraints: existing provider integrations must not be modified; the retry logic must remain unchanged. Non-goal: refactoring the payment abstraction layer (that is a separate task). Acceptance: Provider X processes a test transaction end-to-end in staging.

**LP3 — Scope Gate.** The agent proposes a plan that includes modifying the payment abstraction layer to "better accommodate" the new provider. This exceeds declared scope. The scope gate flags it. The engineer reviews the proposal and decides the abstraction layer change is unnecessary for this task — the new provider can work within the existing abstraction. The agent is redirected to work within the original scope.

**Execution.** The agent implements the integration. It modifies 8 files within the payments module, adds a new provider adapter, and creates tests.

**LP1 — Invariant Check.** The team has an invariant registered: "All payment providers must implement the idempotency interface." The automated check confirms the new adapter implements this interface. A second invariant — "No payment operation may execute without an audit log entry" — is also verified. Both pass.

**LP2 — Change Narrative and Theory Challenge.** The agent produces a narrative explaining the integration approach: adapter pattern, configuration-driven provider selection, error mapping from Provider X's error codes to the internal error taxonomy. The Theory Challenge asks the engineer: "If Provider X returns a timeout during the capture phase, what happens to the transaction state?" The engineer answers correctly — it enters a pending-resolution state and the reconciliation job picks it up within 15 minutes. Theory confirmed for this change.

**LP5 → LP1 loop closure.** The completion report maps actions to the intent brief. All changes are within declared scope. The retry logic was not modified. Existing provider tests still pass. The brief and narrative are committed alongside the code.

**Instrumentation.** This change is logged in the team's tracking. The Theory Challenge was answered correctly (Prediction Accuracy: maintained). The scope gate was triggered and honored (Scope Breach: caught and redirected, not normalized). No invariants were stale. Time-to-Explain for the payments module is tested next week during the regular rotation.

The overhead is real but bounded — roughly 20 minutes of additional human engagement for a change that took the agent 10 minutes to implement and would have taken the engineer 3 hours by hand. The engineer ends the task understanding what changed and why. The invariants are verified. The intent is documented. And next month, when someone needs to modify the payments module, the narrative and brief are there as theory artifacts, not just code.

## 7.7 Adoption Sequence

For a team adopting these practices, the recommended sequence is:

1. **Week 1–2:** Intent Briefs for all agent-driven work. This is low-friction and immediately clarifying.
2. **Week 3–4:** Scope Gates. Add the threshold. Observe how often it is exceeded. Calibrate.
3. **Month 2:** Change Narratives. Begin requiring structured post-change explanations and theory challenges.
4. **Month 3:** Invariant Tracking. Start with 10–15 invariants for the most critical components. Grow organically.
5. **Month 4+:** Cognitive Maintenance Rotation. Schedule it. Protect the time. Measure cognitive debt over time.

---

# Part VIII: Multi-Agent Orchestration — The Compounding Control Problem

Multi-agent orchestration introduces failure modes qualitatively different from the dyadic model. The five leverage points remain necessary but are no longer sufficient. Intent transformation chains, compositional incoherence, scope partitioning conflicts, and the complexity ceiling are covered in the [Multi-Agent Orchestration](multi-agent.md) reference.

---

# Conclusion: The Discipline of Agentic Engineering

The framework presented here is not a productivity system. It is a control system. Its purpose is to ensure that as machine-speed implementation becomes the norm, the humans responsible for software systems retain the ability to understand, direct, and correct those systems.

The central claim is that five specific capabilities — intent violation visibility, forced theory reconstruction, change magnitude limits, reasoning capability preservation, and explicit intent structure — form the minimal set of controls required for stable operation. These are not optional enhancements. They are structural requirements. Without them, the system will function correctly while becoming progressively unknowable.

But controls without instrumentation are faith. The four gauges — Prediction Accuracy, Scope Breach Rate, Time-to-Explain, and Invariant Staleness — provide the means to know whether the controls are working. The failure thresholds provide the means to act before degradation becomes crisis. And the Agentic Engineer — the person accountable for reading the gauges and maintaining the integrity of the loop — provides the organizational anchor without which these structures become advisory and eventually ceremonial.

The architecture serves three invariants: **outbound intent fidelity**, **inbound theory preservation**, and **operator capability integrity**. The Directive Plane ensures human will reaches the machine without loss of meaning, scope, or constraint. The Reconstruction Plane ensures human understanding is rebuilt from machine-driven outcomes with sufficient fidelity to maintain steerability. The adaptive operator model ensures the humans directing agents possess and develop the judgment to use both planes effectively. The Execution Plane operates between them. All three planes must be designed, maintained, and defended. Without the Directive Plane, intent is lost in transmission. Without the Reconstruction Plane, theory is lost in translation. Without operator capability integrity, both become performative ritual. Any single failure produces an unsteerable system.

As multi-agent orchestration matures, the control problem compounds. Intent degrades across agent boundaries. Individually correct outputs compose into incoherent systems. Scope partitioning creates conflict surfaces invisible to any single agent. The five leverage points remain necessary but extend into new forms — Intent Contracts that propagate constraints across chains, Composition Narratives that surface emergent behavior, orchestration-level scope gates that detect what no individual agent can see. At the complexity ceiling — and it is a mathematical certainty that this ceiling will be reached — the human-in-the-loop must become human-over-the-loop, supervising structurally adversarial verification architectures rather than execution directly. That transition must be deliberate, not a drift into abdication. The danger of common-mode failure — monitoring agents that share the same blind spots as the agents they monitor — must be designed against from the start.

The analogous domains — aviation, finance, nuclear power — arrived at the same principles independently because the underlying problem is the same: maintaining human control when machines amplify human action beyond the speed and scale of direct perception. Their solutions were purchased with catastrophe. Ours do not have to be.

Agentic engineering is not a subspecialty of software engineering. It is the discipline that emerges when software engineering operates under power amplification. It has its own failure modes, its own instruments, its own required competencies, and its own professional obligation: to ensure that speed never outpaces steerability.

The framework now recognizes a third invariant: **Operator Capability Integrity** — the meta-invariant that makes the other two possible. Without capable operators, intent fidelity is performative and theory preservation is superficial. The adaptive operator model — Socratic execution modes, evidence-based progression, theory-gated agent access — ensures that the humans directing agents possess and continuously develop the judgment required to do so. Two additional leverage points, LP6 (gate agent access to demonstrated comprehension) and LP7 (separate production authority from exploration access), complete the minimal stabilizing set. The progression ladder, circuit breaker, and merge gates that implement these leverage points are detailed in the [Operator Model](operator-model.md).

> **The goal is not to slow down.**
>
> The goal is to move fast while knowing where you are going, knowing where you have been, and retaining the ability to change direction. Speed without steerability is not velocity. It is ballistic trajectory.

---

## Attribution

The adaptive operator model integrates ideas from Russinovich and Hanselman's "Redefining the Software Engineering Profession for AI," which identifies the structural threat to the engineering talent pipeline when AI amplifies seniors while creating drag on early-in-career developers. Their proposal for preceptor programs and Socratic coaching modes became the foundation for the protocol-level execution modes and competency-gated agent access described in the [Operator Model](operator-model.md).

[1] Russinovich, M. and Hanselman, S. "Redefining the Software Engineering Profession for AI." *Communications of the ACM*. DOI: [10.1145/3779312](https://dl.acm.org/doi/10.1145/3779312)

---

*The Directive Plane — A Control Architecture for Steerable Agentic Engineering*
