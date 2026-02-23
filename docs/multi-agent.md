# Multi-Agent Orchestration

The framework presented in Parts I through VII assumes a dyadic control loop: one human, one agent, one channel of intent, one channel of theory reconstruction. This assumption holds for the majority of current agentic development practice. It will not hold for long.

Multi-agent orchestration — systems where agents delegate to other agents, decompose tasks across specialist agents, or coordinate through protocols like A2A — introduces failure modes that are qualitatively different from those in the dyadic model. The five leverage points remain necessary. They are no longer sufficient.

---

## The Intent Transformation Chain

In the dyadic model, intent traverses a single hop: human to agent. The Intent Brief (LP5) governs that hop. The human specifies goal, scope, constraints, and acceptance criteria. The agent executes within those bounds. The channel is lossy but manageable because there is only one translation step.

In orchestrated systems, intent passes through a chain: human to orchestrator agent, orchestrator to specialist agents, specialists to sub-task agents. At each hop, the receiving agent interprets, decomposes, and recontextualizes the intent it received. By the time a leaf agent is writing code, the connection to the original human intent may have passed through three or more layers of LLM interpretation. Each hop is a lossy channel. The losses compound.

This creates a specific problem for LP5: where does the Intent Brief live? In the dyadic model, the answer is simple — the human writes it, the agent executes against it. In an orchestrated system, the orchestrator must generate sub-briefs for each specialist. These sub-briefs are themselves LLM-generated artifacts. They may faithfully decompose the original intent, or they may introduce architectural opinions, scope interpretations, or implicit constraints that the human never specified.

The human cannot validate every sub-brief — that defeats the purpose of orchestration. But if no one validates them, then unstructured intent exists at every layer below the top. The framework's foundational control is absent precisely where the work is being done.

> **The Intent Fidelity Problem**
>
> In a chain of length *n*, intent fidelity degrades at each hop. The human controls the first hop. No one controls the rest. The probability that the leaf agent's understanding matches the human's intent decreases with chain length, even when every individual agent operates correctly.

### Toward Intent Contracts

The Intent Brief must evolve into an **Intent Contract** — a structured artifact that travels with the work across agent boundaries. The contract carries not just the current task specification but the original human intent, the declared constraints, and the scope boundaries from the root of the chain. At each hop, the receiving agent can check its sub-task against the root contract, not just against the immediate parent's instructions.

This is analogous to how financial transactions carry compliance metadata through chains of intermediaries. The originating bank's regulatory constraints do not disappear because a correspondent bank is executing the settlement. The constraints propagate.

Protocol-level support for intent propagation — carrying the original brief's constraints as immutable context through A2A handoffs — is not an optimization. It is a structural requirement for multi-agent steerability.

---

## Emergent Behavior and Compositional Incoherence

The second fundamental problem is that individually correct agent outputs can compose into systemically incoherent results.

In the dyadic model, the human reconstructs theory for one agent's output. The Change Narrative explains what one agent did and why. Theory Challenges verify the human understands that one change. This is tractable because the unit of understanding is a single bounded change.

In orchestrated systems, the unit that matters is the *composition*. Agent A modifies the authentication module. Agent B modifies the API gateway. Both operate within their declared scopes. Both produce correct, well-tested code. But Agent A assumed tokens would be validated at the gateway, and Agent B assumed tokens would be validated at the service level. Neither agent is wrong in isolation. The system is wrong in composition.

This is the 2008 financial crisis analogy from Part IV applied recursively. Individual CDOs were technically sound. The system of interconnections between them was unknowable. In multi-agent orchestration, individual agent outputs are technically sound. The system of interactions between those outputs can be unknowable.

### The Composition Narrative

The Change Narrative practice (LP2) must extend to include a **Composition Narrative** — an explanation of how multiple agents' outputs interact and what emergent properties arise from their combination. The orchestrator agent is the natural entity to produce this, since it holds the decomposition logic and can see all sub-task results.

But this introduces a new trust relationship. In the dyadic model, the human trusts an agent to explain its own work — a relatively constrained task. In the orchestrated model, the human trusts an agent to explain the *behavior of a system of agents*. The orchestrator is reasoning about emergent properties of compositions it designed. It is simultaneously the architect and the auditor. This is the segregation-of-duties violation that Part IV's financial analogy warns against.

Whether this trust is well-placed — whether an orchestrator can reliably detect compositional incoherence in its own decompositions — is an open empirical question. The conservative assumption is that it cannot, which implies the need for independent verification of compositional properties.

---

## Scope Partitioning and Conflict Detection

In the dyadic model, scope is declared once and checked once. The Scope Gate (LP3) verifies that the agent's changes fall within the declared boundary. This works because there is one agent, one scope, one boundary.

In orchestrated systems, scope must be *partitioned* across agents. The orchestrator decomposes a task and assigns sub-scopes to specialists. Three problems arise:

**Overlapping partitions.** Two specialist agents both modify the same file based on different sub-tasks from the same parent intent. Neither agent exceeds its locally declared scope. But the concurrent modifications create merge conflicts, semantic contradictions, or subtle behavioral inconsistencies. This is not a scope violation in any individual agent's view — it is a coherence problem that only exists at the orchestration level.

**Implicit scope expansion.** A specialist agent determines that completing its sub-task requires modifying a component outside its declared scope. In the dyadic model, this triggers the Scope Gate and the human authorizes or redirects. In the orchestrated model, the specialist may negotiate scope expansion with the orchestrator rather than the human. The orchestrator may grant it based on its own judgment. The human's scope boundary has been modified without their knowledge or consent.

**Transitive effects.** Agent A's changes alter the behavior of a component that Agent B depends on, but Agent B's scope declaration does not include Agent A's components. Agent B operates correctly against the pre-change state. After Agent A's changes propagate, Agent B's output is no longer correct, but no scope violation has occurred because no single agent exceeded its boundaries.

These problems require scope gates that operate at the orchestration level — gates that understand the full partitioning, detect overlaps, flag transitive dependencies, and ensure that scope negotiations between agents are visible to the human. The individual agent-level Scope Gate remains necessary but is no longer sufficient.

---

## Observability Across Agent Boundaries

The four gauges defined in Part VI — Prediction Accuracy, Scope Breach Rate, Time-to-Explain, and Invariant Staleness — are designed to instrument a single control loop. Multi-agent orchestration requires instrumenting the *inter-agent channels* as well.

**Intent fidelity between agents.** What is the semantic distance between the human's original intent and the sub-task specification received by a leaf agent? This is measurable: compare the root Intent Contract against each sub-brief and quantify the drift. A growing distance over successive orchestration layers is a signal that the intent propagation channel is degrading.

**Context consistency across agents.** Are specialist agents receiving context that is consistent with each other? If Agent A is told the system uses architecture X and Agent B is told it uses architecture Y, their individually correct outputs will be compositionally incoherent. Context divergence between sibling agents is a leading indicator of compositional failure.

**Orchestrator decomposition fidelity.** Is the orchestrator's decomposition of the task faithful to the original intent, or has it introduced its own architectural opinions? The orchestrator is itself an LLM making judgment calls about task decomposition. Those judgments are invisible in the current framework. They need instrumentation.

This maps most closely to the nuclear analogy from Part IV. A nuclear plant is not one control loop — it is hundreds of interlocking loops with shared state. The shift supervisor does not monitor each loop individually. They monitor the *plant state* that emerges from all loops together. The Agentic Engineer in a multi-agent system needs something analogous: a system-level view of agent coordination, not a collection of individual agent dashboards.

### Additional Gauges for Orchestrated Systems

| Gauge | What It Measures | Degradation Signal |
|-------|------------------|--------------------|
| Intent Propagation Fidelity | Semantic distance between root intent and leaf-agent sub-briefs | Growing distance at deeper orchestration layers |
| Cross-Agent Context Consistency | Agreement between context provided to sibling agents | Contradictory assumptions across concurrent agents |
| Decomposition Coherence | Whether the orchestrator's task decomposition covers the original intent without gaps or overlaps | Missing coverage or redundant sub-tasks |
| Composition Verification Rate | Percentage of multi-agent outputs verified for emergent behavior, not just individual correctness | Declining rate or increasing undetected composition failures |

---

## The Orchestrator as a Trust Boundary

The orchestrator agent occupies a unique and dangerous position in the control architecture. It is the entity that decomposes human intent into machine-executable sub-tasks. It decides how the work is partitioned, what context each specialist receives, and how results are composed. If the orchestrator's decomposition is wrong, every downstream agent executes faithfully against a flawed plan.

This is mode confusion at the automation layer rather than the human layer. In the aviation analogy: the pilot's autopilot is itself delegating to subsystems the pilot cannot see. The pilot believes the autopilot is executing a certain flight plan. The autopilot has decomposed that plan into sub-tasks for the flight management computer, the autothrottle, and the flight control computers. If the decomposition is flawed — if the autopilot has misinterpreted the flight plan — every subsystem will execute correctly against incorrect instructions, and the pilot will not detect the error until the aircraft is in the wrong place.

The orchestrator is, in control theory terms, a *hidden supervisory layer*. It makes decisions that shape all downstream behavior, but those decisions are not currently subject to the same controls as the agents it supervises. The Intent Brief governs the human-to-orchestrator boundary. Nothing in the current framework governs the orchestrator-to-specialist boundary with equivalent rigor.

This is the gap that must be closed. The orchestrator's decomposition decisions — how it partitions scope, what constraints it propagates, what context it provides to each specialist — must be inspectable, challengeable, and subject to the same falsifiability principle that governs all other control artifacts.

---

## The Complexity Ceiling and the Limits of Theory

Multi-agent orchestration forces a confrontation with the fundamental constraint of this entire framework: human cognitive bandwidth.

In the dyadic model, theory reconstruction works because the unit of change is bounded. In orchestrated systems, the unit of change is the composed output of multiple agents interacting across time. The theory required to understand this includes not just what each agent did, but how their outputs interact, what assumptions the orchestrator made during decomposition, and what emergent properties arise from the composition.

Because the space of emergent behaviors in interacting subsystems is combinatorial, it is a mathematical certainty that multi-agent orchestration will eventually exceed the human capacity for theory reconstruction. There is a hard complexity ceiling to human-in-the-loop agentic engineering. When an orchestrator decomposes a task into fifteen sub-tasks across eight specialist agents, no human can verify the full behavioral surface area of the result before it is merged.

The engineering conclusion is stark: unbounded multi-agent orchestration applied to consequential systems without independent, automated verification layers is structurally unsafe.

When the complexity ceiling is breached, the control architecture must undergo a phase shift. The human-in-the-loop model must evolve into a human-over-the-loop model. The human no longer supervises the execution directly; they supervise a layer of independent monitoring agents that verify compositional properties, audit the orchestrator's decompositions, and surface anomalies.

This is not an abdication of control, but it is a dangerous transition. It introduces a second-order theory problem: the human must now hold the theory of the monitoring apparatus. If the orchestrator and the monitoring agents share the same underlying LLM biases or blind spots, the control loop is illusory — a phenomenon known in aviation as **common-mode failure**. When redundant systems share a common flaw, redundancy provides no protection. Two autopilot computers running the same software will make the same wrong decision at the same time.

To operate safely above the complexity ceiling, the verification agents must be structurally adversarial to the execution agents. They must be built on different models, prompted with different context, and explicitly rewarded for finding compositional incoherence. This is defense in depth applied to the monitoring layer itself — the same principle that nuclear engineering uses when it requires diverse and redundant safety systems.

The frontier of agentic engineering is not building larger swarms of agents. It is building the defense-in-depth verification architectures that allow us to survive them. The five leverage points remain the foundation, but the Agentic Engineer's ultimate job will be designing the system that watches the system.

---

## Orchestration & Verification Mechanics

The [Control Fidelity Protocol](control-fidelity-protocol.md) defines the formal mechanics for orchestration. The key provisions are summarized here.

### Intent Propagation & Traceability

Traceability is mechanical. Every Sub-IC clause must reference a root IC clause. If `trace_type` is `DERIVED`, a falsifiable justification must be provided. Constraints are inherited verbatim and are immutable by the orchestrator.

### Scope Partitioning & Conflict

The orchestrator must partition work without overlaps. If overlaps exist, a `merge_strategy` is mandatory.

- **Scope Expansion:** If a specialist requires more scope, the policy determines if it's prohibited, requires orchestrator negotiation (serialized to prevent silent overlaps), or requires human operator amendment.

### Segregation of Duties

The orchestrator explains (CN); the verifier judges (CP).

- At `CONSEQUENTIAL` tier: The verifier must be **structurally adversarial** (different model family, different context framing, explicit adversarial objective).
- **Verification Method Hierarchy:** CP verdicts must explicitly declare their method. Deterministic tests are prioritized over LLM-assessed verdicts. At `CONSEQUENTIAL`, ≥80% of CP verdicts must be deterministic.

See [Control Fidelity Protocol](control-fidelity-protocol.md) §6 for the full specification.

---

## Multi-Agent Access Controls

Multi-agent orchestration access is gated by operator level and risk tier. The key rule: **multi-agent is never allowed on CONSEQUENTIAL systems** — the compositional incoherence risk is too high. On PROFESSIONAL, only ENGINEER has the demonstrated system mastery for orchestration. On EXPLORATORY, any operator with agent access (JOURNEYMAN+, RESTRICTED, ONBOARDING) can use multi-agent.

| Level | CONSEQUENTIAL | PROFESSIONAL | EXPLORATORY |
|-------|--------------|--------------|-------------|
| **APPRENTICE_1** | ❌ | ❌ | ❌ |
| **APPRENTICE_2** | ❌ | ❌ | ❌ |
| **JOURNEYMAN** | ❌ | ❌ | ✅ |
| **ENGINEER** | ❌ | ✅ | ✅ |
| **RESTRICTED** | ❌ | ❌ | ✅ |
| **ONBOARDING (senior)** | ❌ | ❌ | ✅ |

See [The Operator Model](operator-model.md) for the full access matrix and progression mechanics.
