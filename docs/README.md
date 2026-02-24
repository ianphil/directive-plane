# Documentation

## Reading Order

Start with the UI walkthrough, then read the framework and protocol. The operator model, multi-agent, and instrumentation docs extend the core.

### 1. See it in action
- **[UI Sample Walkthrough](ui-sample-walkthrough.md)** — Narrative walkthrough of the cockpit-style UI with screenshots. Fastest way to understand the concept.

### 2. Paper
- **[The Directive Plane (Paper)](directive-plane-paper.md)** — Self-contained narrative covering the system dynamics model, seven leverage points, three-plane architecture, Control Fidelity Protocol, multi-agent orchestration, and adaptive operator model. Includes all infographics.

### 3. Core framework

- **[The Directive Plane](directive-plane.md)** — Framework thesis: system dynamics, three invariants, seven leverage points, three-plane architecture, cross-domain analogies, failure modes, implementation practices.

  Agentic development creates systems that work correctly while becoming progressively unknowable. Implementation velocity scales with compute; comprehension velocity does not. The framework identifies five stocks (System Complexity, Human Theory, Intent Clarity, Navigability, Operator Capability), three runaway loops that destabilize the system, and seven leverage points that form the minimal stabilizing set. It maps these to a three-plane architecture (Directive → Execution → Reconstruction) serving three invariants: outbound intent fidelity, inbound theory preservation, and operator capability integrity. Cross-domain parallels from aviation, finance, and nuclear power validate the control principles. Concrete practices (Intent Contract, Scope Gate, Design Rationale, Invariant Tracking, Cognitive Maintenance) provide an incremental adoption path.

- **[Control Fidelity Protocol](control-fidelity-protocol.md)** — Formal protocol spec: state machines, artifact schemas, gate predicates, error states, risk tiers, execution mode matrices.

  The mechanical enforcement layer. Defines a unified state machine for both single-agent and orchestrated flows, with boolean gate predicates (G1–G6) that must evaluate TRUE for each transition. Specifies append-only artifact schemas (IC, OE, EE, CN, CP, RP) and their required fields. Includes operator progression state machine (APPRENTICE → ENGINEER, RESTRICTED, SUSPENDED), IC operator block with per-subsystem currency and circuit breaker parameters, and execution mode × risk tier matrices. Error states (SCOPE_VIOLATION, INTENT_DRIFT, THEORY_FAILURE, MERGE_BLOCKED, etc.) define recovery paths. Risk tiering (CONSEQUENTIAL / PROFESSIONAL / EXPLORATORY) scales every parameter.

### 4. Extensions

- **[The Operator Model](operator-model.md)** — Who operates the system: two-axis capability model, Socratic/Restricted/Standard execution modes, progression ladder, circuit breaker, preceptor role, repository designation and merge gates.

  The Execution Plane adapts based on who is operating it. Operator capability is two-dimensional: craft maturity (career-accumulated engineering judgment) × system familiarity (mental model of this specific codebase, tracked per-subsystem). Three execution modes — Socratic (agent teaches, operator implements), Restricted (agent tests, operator implements), and Standard (current CFP) — are selected by a matrix crossing operator level with risk tier. A four-stage progression ladder (APPRENTICE_1 → APPRENTICE_2 → JOURNEYMAN → ENGINEER) removes scaffolding as competence is demonstrated. A circuit breaker automatically restricts agent access when Prediction Accuracy drops below threshold, with hysteresis (restrict at 0.6, recover at 0.8) and preceptor-gated recovery. Repository designation (production vs. non-production) gates who can merge agent-generated code. The preceptor (engineering manager) owns the learning loop, distinct from the Agentic Engineer who owns the control loop.

- **[Multi-Agent Orchestration](multi-agent.md)** — What changes at scale: intent transformation chains, compositional incoherence, scope partitioning, orchestrator trust boundary, complexity ceiling.

  When agents delegate to agents, the dyadic control model breaks down. Intent degrades across hops (each layer of LLM interpretation is a lossy channel). Individually correct agent outputs compose into systemically incoherent results (the 2008 financial crisis pattern). Scope must be partitioned across agents, creating overlaps, implicit expansion, and transitive effects invisible to any single agent. The orchestrator occupies a dangerous position as both architect and auditor. At the complexity ceiling — a mathematical certainty — the human-in-the-loop must shift to human-over-the-loop, supervising structurally adversarial verification agents. Multi-agent orchestration is never allowed on CONSEQUENTIAL systems.

- **[Instrumentation](instrumentation.md)** — How you know it's working: all gauges (core, orchestration, operator model), failure thresholds, signal integrity, Agentic Engineer role.

  Controls without instrumentation are faith. Every control artifact must be falsifiable — coupled to system state, not human assertion. Twelve gauges organized in three tiers (core: Prediction Accuracy, Scope Violation Rate, Explanation Latency, Invariant Verification Lag; orchestration: Intent Propagation Fidelity, Cross-Agent Context Consistency, Decomposition Coherence, Composition Verification Rate; operator model: Test Quality Gap, Invariant Awareness, Socratic Iteration Count, Theory Confidence Distribution) instrument the health of the control system. Three-level failure thresholds (Yellow/Orange/Red) define response escalation. The Agentic Engineer owns the loop: reads the gauges, has halt authority, and maintains signal integrity — ensuring controls don't degrade into ritual.
