# Documentation

## Reading Order

Start with the UI walkthrough, then read the framework and protocol. The operator model, multi-agent, and instrumentation docs extend the core.

### 1. See it in action
- **[UI Sample Walkthrough](ui-sample-walkthrough.md)** — Narrative walkthrough of the cockpit-style UI with screenshots. Fastest way to understand the concept.

### 2. Core framework
- **[The Directive Plane](directive-plane.md)** — Framework thesis: system dynamics, three invariants, seven leverage points, three-plane architecture, cross-domain analogies, failure modes, implementation practices.
- **[Control Fidelity Protocol](control-fidelity-protocol.md)** — Formal protocol spec: state machines, artifact schemas, gate predicates, error states, risk tiers, execution mode matrices.

### 3. Extensions
- **[The Operator Model](operator-model.md)** — Who operates the system: two-axis capability model, Socratic/Restricted/Standard execution modes, progression ladder, circuit breaker, preceptor role, repository designation and merge gates.
- **[Multi-Agent Orchestration](multi-agent.md)** — What changes at scale: intent transformation chains, compositional incoherence, scope partitioning, orchestrator trust boundary, complexity ceiling.
- **[Instrumentation](instrumentation.md)** — How you know it's working: all gauges (core, orchestration, operator model), failure thresholds, signal integrity, Agentic Engineer role.

## Compact References

Token-optimized versions for LLM context windows. Same content, no prose.

- [directive-plane-compact.md](directive-plane-compact.md)
- [control-fidelity-protocol-compact.md](control-fidelity-protocol-compact.md)
- [adaptive-operator-model-compact.md](adaptive-operator-model-compact.md)
