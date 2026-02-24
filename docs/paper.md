# The Directive Plane: A Control Architecture for Controllable Agentic Software Engineering

## Abstract

Large language model (LLM) agents can autonomously generate, refactor, and test code, increasing implementation velocity while widening the gap between human intent, human understanding, and shipped behavior. When changes are produced faster than operators can reconstruct theory, systems may remain functional yet become operationally uncontrollable (loss of controllability): engineers cannot reliably predict behavior, verify scope, or maintain critical invariants. We present the Directive Plane, a control architecture for controllable agentic software engineering. It is grounded in a system dynamics model of five stocks: Human Theory, System Complexity, Intent Clarity, Operator Capability, and their derived ratio, Navigability. Together, these model the feedback loops that drive cognitive debt under high-velocity execution. From this model we derive seven leverage points and operationalize them through a three-plane architecture (Directive, Execution, Reconstruction) and a Control Fidelity Protocol (CFP) with explicit stage-gates, assurance artifacts, and gauges. We extend the framework to multi-agent orchestration, where intent transformation chains and compositional incoherence require composition-aware verification, and to an adaptive operator model that gates execution privileges on demonstrated comprehension while preserving learning pathways. Drawing on control practices from aviation, nuclear operations, and financial risk management, we propose falsifiable mechanisms—scope verification, invariant checks, and prediction-based comprehension assessments (Prediction Probes)—for maintaining meaningful human control as machine execution speed increases.

![Graphical Abstract: A process infographic showing a left-to-right flow from Human Intent through three color-coded planes — Directive (plan), Execution (do), and Reconstruction (check) — connected by directional arrows. A large feedback loop labeled 'Adjust Tactics' arcs from the Reconstruction plane back to the Directive plane. A bottom legend maps the three planes to a Plan-Do-Check cycle. The output is labeled 'Maintained Navigability.'](screenshots/graphical_abstract_placeholder.png)
*Figure 1: Graphical Abstract illustrating the flow from human intent through the Directive, Execution, and Reconstruction planes, highlighting the feedback loops that maintain Navigability.*

## Introduction

Software engineering stands at an inflection point comparable to the introduction of high-bypass turbofan engines in commercial aviation or algorithmic trading in financial markets. In each case, a technological capability emerged that dramatically amplified the consequences of human decisions while simultaneously exceeding the speed at which humans could directly perceive and respond to those consequences. The result was not immediate catastrophe but rather a gradual accumulation of systemic risk, punctuated by incidents that revealed the gap between nominal human control and actual human understanding.

The agentic coding paradigm—in which large language model agents autonomously write, test, and refactor code based on natural language instructions—represents precisely this kind of amplification. A single human prompt can trigger modifications across hundreds of files in minutes. The changes may be syntactically correct, pass all tests, and satisfy the surface-level requirements specified in the prompt. Yet the human who issued the prompt may be unable to explain what the agent did, why it chose the approach it chose, or how the changes interact with the broader system. The tests pass. The code ships. The human's mental model of the system has not updated.

This gap between system state and human understanding is not merely an inconvenience. It is a structural vulnerability. Peter Naur argued in 1985 that programming is fundamentally theory building: the people who build a system hold a living mental model—the theory—that allows them to explain why the system is the way it is, predict its behavior in novel situations, and modify it coherently. The theory is not the code, the documentation, or the tests. It is the understanding that makes all of those artifacts useful. Agentic development breaks this coupling. When agents implement changes, the resulting code may be correct, but the human who initiated the work has not traversed the reasoning path that produced it. They have not built the theory.

The human remains nominally responsible for the system—for its security, its reliability, its fitness for purpose—but has lost the capacity to discharge that responsibility. They cannot reason about failure modes they do not understand. They cannot direct evolution they cannot predict. They cannot maintain invariants they cannot articulate. The system has become what engineers in other high-amplification domains describe as a loss of controllability—a condition that may persist undetected until an incident forces confrontation with the accumulated cognitive debt.

The challenge is not to slow down agent-driven development. The productivity gains are real and, in competitive contexts, unavoidable. The challenge is to architect the human-agent interface such that speed does not outpace controllability. This requires understanding the system dynamics that govern the accumulation and erosion of human understanding, identifying the minimal set of interventions that prevent runaway degradation, and operationalizing those interventions in protocols and practices that can be adopted by working engineering teams.

This paper presents such an architecture. We begin by establishing the system dynamics model that underlies the control problem, identifying the stocks, flows, and feedback loops that determine whether a human-agent system remains controllable over time. From this model, we derive seven leverage points—structural interventions that, in combination, prevent the runaway loops that lead to loss of controllability. We then describe the three-plane architecture (Directive, Execution, and Reconstruction) that organizes these interventions, and the Control Fidelity Protocol that specifies the stage-gates, assurance artifacts, and state machines required to maintain control. We extend the framework to multi-agent orchestration, where intent passes through chains of agents and individually correct outputs can compose into systemically incoherent results. We introduce an adaptive operator model that differentiates agent access based on demonstrated comprehension, creating protected pathways for skill development while preventing unverified operators from directing agents through systems they do not understand. Throughout, we draw on analogies from aviation, nuclear power, and financial risk management—domains where the control problem has been studied for decades and where hard-won principles have emerged from catastrophic failures.

## System Dynamics Model

![System Dynamics Model: A causal loop diagram with five labeled stock containers — Human Theory, System Complexity, Intent Clarity, Operator Capability, and Navigability — connected by arrows annotated with 'S' (same direction) and 'O' (opposite direction) polarity markers. Four reinforcing loops (R1 Velocity Trap, R2 Trust Erosion, R3 Intent Drift, R4 Velocity Pressure Cascade) show the runaway dynamics where velocity outpaces comprehension. Five balancing loops (B) represent the stabilizing interventions aligned to LP1–LP5: Intent Verification, Theory Reconstruction, Magnitude Limiting, Capability Preservation, and Structured Intent. Comprehension Flow and Velocity Flow are shown as opposing forces. A legend in the lower-right explains the CLD notation.](screenshots/system_dynamics_placeholder.png)
*Figure 2: System Dynamics Model showing the five stocks, four reinforcing loops, and five balancing loops that govern Navigability.*

The relationship between human understanding and system complexity can be modeled as a system of interacting stocks and flows, with feedback loops that determine the long-term trajectory. This model is not a metaphor but a falsifiable description of dynamics that can be measured and influenced.

### Stocks and Flows

The system contains five stocks. Human Theory, which represents the operator's mental-model fidelity, is the depth and fidelity of the mental models held by the humans responsible for the system. This stock is built through direct engagement with code—reading it, writing it, debugging it—and erodes through disuse, turnover, and system evolution that outpaces comprehension. System Complexity represents the behavioral surface area of the software—the number of states, transitions, invariants, and coupling relationships that must be understood to predict system behavior. This stock grows through feature addition, architectural expansion, and the accumulation of implicit dependencies, and shrinks only through deliberate simplification or removal. Intent Clarity represents the precision and completeness with which human goals are encoded before being transmitted to agents. This stock degrades under time pressure and overconfidence, and improves when operators understand the system well enough to specify exactly what they want. Operator Capability represents the meta-skill: the general engineering judgment that feeds Theory. Unlike Human Theory—which measures understanding of the current system—Operator Capability is career-accumulated ability to specify intent, reconstruct theory, and reason about architecture. It grows under Socratic engagement, atrophies under passive agent use, and resets per-system. Navigability is the derived ratio of Human Theory to System Complexity—the degree to which the humans responsible for a system can predict its behavior under novel conditions.

These stocks are connected by flows. The Comprehension Flow adds to Human Theory as humans engage with the system. The Velocity Flow adds to System Complexity as changes are made. Under traditional development, these flows are roughly coupled—humans comprehend approximately as fast as they add complexity because they are doing the implementation work themselves. Under agent-driven development, this coupling breaks. Velocity Flow accelerates dramatically while Comprehension Flow remains bounded by human cognitive limits.

### The Runaway Loop

![Runaway Loops vs Stabilizing Loops: A side-by-side comparison. The left side, labeled 'Without Controls (Runaway)', shows four reinforcing loops in red: R1 Velocity Trap, R2 Trust Erosion, R3 Intent Drift, and R4 Velocity Pressure Cascade, with Human Theory shrinking and System Complexity growing. The right side, labeled 'With Controls (Stabilized)', shows five balancing loops in blue mapped to leverage points: B1 Intent Verification (LP1), B2 Theory Reconstruction (LP2), B3 Magnitude Limiting (LP3), B4 Capability Preservation (LP4), and B5 Structured Intent (LP5), with stocks in balance.](screenshots/runaway_vs_stabilizing_loops_placeholder.png)
*Figure 9: Runaway Loops vs. Stabilizing Loops—the four reinforcing loops that drive cognitive debt (left) and the five balancing loops that arrest them (right).*

When Velocity Flow persistently exceeds Comprehension Flow, a reinforcing feedback loop emerges. As Human Theory falls behind System Complexity, the humans' ability to specify precise intent degrades—they can no longer articulate exactly what they want because they no longer fully understand what they have. Imprecise intent leads to changes that drift from actual need, adding complexity without corresponding value. This additional complexity further degrades the ability to specify intent, creating a self-reinforcing cycle.

Simultaneously, a second reinforcing loop emerges around verification. As Human Theory degrades, the humans' ability to verify agent output also degrades. They cannot tell whether the agent's solution is correct, merely whether it passes tests—and the tests themselves may reflect stale understanding. Undetected errors accumulate. When errors are eventually discovered, the humans lack the theory to diagnose them efficiently, leading to more agent-assisted fixes that add more complexity. The system drifts further from comprehensibility.

A third reinforcing loop emerges around intent. When humans cannot fully understand the current state of the system, their intent specifications become detached from reality. They describe what they believe the system is, not what it actually is. Intent Clarity degrades. Agents execute faithfully against incorrect mental models, producing technically correct but systemically incoherent changes that further increase effective Complexity.

These reinforcing loops, if unchecked, produce a characteristic trajectory: initial productivity gains as agents accelerate development, followed by a plateau as cognitive debt accumulates, and eventual decline as changes become slower and riskier. The timing varies by team and codebase, but the mechanism is the same: sustained velocity without reconstruction erodes navigability.

A fourth reinforcing loop operates at the team level rather than the individual level. When one operator's theory degrades to the point where the circuit breaker fires and their agent access is restricted, their velocity drops. Under deadline pressure, teammates compensate with more agent-driven work, increasing their own cognitive debt. Their theory drops, and they risk hitting the circuit breaker themselves—a cascade. The mitigation is organizational slack capacity. A team that cannot afford a circuit breaker firing is a team that is already operating unsafely. This loop explains why the circuit breaker, though necessary, is not free: its cost must be absorbed by the team, and teams that run at full utilization have no capacity to absorb it.

### The Compounding Nature of Theory Loss

Theory loss compounds in a specific and pernicious way. Consider a system that undergoes fifty agent-driven changes over a quarter. If the human maintains theory for the first ten and then falls behind, the subsequent forty changes are built on foundations the human does not fully understand. Each successive change is not merely one unit of lost theory—it is one unit built on top of prior lost units. The reconstruction cost grows superlinearly.

This is the cognitive analog of technical debt, but worse. Technical debt can be measured, catalogued, and retired through engineering effort. Cognitive debt is invisible until the moment the theory is needed and discovered to be absent. It lives entirely inside human minds, and its absence is detectable only through its consequences: bad decisions, incoherent changes, and the creeping inability to answer the question "why is it this way?" The compounding nature of theory loss is the reason reconstruction must happen continuously—on every change—rather than in periodic batches. Deferred reconstruction is not cheaper reconstruction. It is reconstruction whose cost grows with every change that passes without it.

### Stabilizing Loops

The runaway dynamics can be arrested through balancing feedback loops—structural interventions that counteract the reinforcing cycles. The architecture described in this paper implements a set of such loops aligned to the leverage points below.

Addressing the first leverage point (LP1), the Intent Verification Loop makes invisible intent violations visible. When the gap between declared intent and actual implementation is surfaced automatically, the human receives feedback that their specification was inadequate. This creates pressure to improve specification precision, which in turn requires understanding—activating the Comprehension Flow.

Addressing the second leverage point (LP2), the Theory Reconstruction Loop forces humans to rebuild understanding after agent-driven changes. Rather than allowing changes to accumulate without comprehension, this loop requires humans to demonstrate understanding before changes are finalized. The demonstration must be falsifiable—not a signature asserting understanding, but a prediction about system behavior that can be checked.

Addressing the third leverage point (LP3), the Magnitude Limiting Loop acts as a change budget, constraining the rate at which complexity can be added. By requiring explicit authorization for changes that exceed a threshold, this loop prevents the Velocity Flow from outpacing the Comprehension Flow by arbitrary amounts. The human must consciously decide to accept a large change, which creates a decision point for additional comprehension effort.

Addressing the fourth leverage point (LP4), the Capability Preservation Loop maintains the human's underlying capacity to engage with the system. Skills atrophy without use. If humans never write code, debug problems, or reason through architecture, their capacity to do so degrades. This loop ensures that humans periodically engage directly with the system, preserving the cognitive machinery required for the other controls to function.

Addressing the fifth leverage point (LP5), the Structured Intent Loop ensures that intent is captured in a form that can be verified. Unstructured natural language intent is ambiguous by nature. Structured intent—with explicit goals, scope boundaries, constraints, and acceptance criteria—provides the reference against which verification can occur.

## Seven Leverage Points

![Seven Leverage Points Overview: A vertical numbered stack showing LP1 through LP7 with icons, one-line descriptions, and colored side bars indicating which architectural plane each belongs to. LP1 (Automatic Visibility of Intent Violations) and LP5 (Structured Intent Artifacts) belong to the Directive Plane (blue). LP3 (Magnitude Limits) and LP4 (Capability Preservation) belong to the Execution Plane (orange). LP2 (Forced Theory Reconstruction) belongs to the Reconstruction Plane (green). LP6 (Comprehension-Gated Access) and LP7 (Production vs Exploration Separation) belong to the Operator Model (purple). A legend at the bottom maps bar colors to planes.](screenshots/seven_leverage_points_placeholder.png)
*Figure 5: The Seven Leverage Points showing each intervention, its one-line rationale, and the architectural plane it belongs to.*

From the system dynamics model, we identify seven points where intervention has the greatest effect on system trajectory. These leverage points are not independent preferences but a structurally complete set—removing any one creates failure modes that cascade through the others.

### LP1: Automatic Visibility of Intent Violations

The first leverage point addresses the fundamental measurement problem: humans cannot correct what they cannot see. When an agent produces code, the code must be compared against the declared intent—not just syntactically, but semantically. Files modified outside declared scope, behaviors changed that were constrained, invariants violated that were registered—all must surface automatically and visibly.

This is not a suggestion for better code review. It is a requirement for automated instrumentation that makes the gap between intent and implementation measurable. The Intent Contract declares scope; the automation compares actual modifications against declared scope. The Intent Contract declares constraints; the automation verifies constraints are preserved. The human receives a structured report of alignment and deviation, not a diff to be interpreted.

Without LP1, the other leverage points operate blind. Theory reconstruction cannot target the right areas if violations are invisible. Magnitude limits cannot be calibrated if the actual magnitude of changes is unknown. Intent structure is pointless if the structure is never checked against reality.

### LP2: Forced Theory Reconstruction

The second leverage point addresses the accumulation of cognitive debt. After every agent-driven change, the human must demonstrate understanding through a falsifiable mechanism. The mechanism is not acknowledgment ("I have reviewed this change") but prediction ("Given this input, the system will behave as follows").

The Design Rationale produced by the agent explains what changed and why. The Prediction Probe, a prediction-based comprehension assessment, asks the human to predict consequences of the change under specified conditions. If the prediction is correct, the human holds theory. If incorrect, theory must be rebuilt through direct engagement with the code before the change proceeds.

This is expensive. It consumes human time. That is the point. The alternative is accumulating changes without comprehension until the system loses controllability. The cost of reconstruction on every change is bounded and predictable. The cost of reconstruction after months of accumulated cognitive debt is unbounded and often prohibitive.

### LP3: Magnitude Limits on Agent-Driven Changes

The third leverage point addresses the comprehension overflow problem. Human cognitive capacity for understanding a change is finite. A change that modifies two hundred files across fifteen modules exceeds that capacity regardless of how intelligent the human is. When changes routinely exceed comprehension capacity, all other controls become performative.

The magnitude limit is not a prohibition but a gate. Changes exceeding the threshold require explicit authorization after the human acknowledges they cannot fully verify the change. This authorization is logged, creating accountability and visibility. A high rate of threshold-exceeding changes indicates either that the threshold is miscalibrated or that the team is accepting unverified changes as normal. Both conditions are diagnosable from the data.

The appropriate threshold varies by team, codebase, and risk tolerance. The existence of a threshold does not vary. Without LP3, the volume of agent-produced changes can outpace any human's capacity for verification, rendering LP1 and LP2 intractable.

### LP4: Preservation of Reasoning Capability

The fourth leverage point addresses skill atrophy. The capacity to write code, debug problems, and reason about architecture is not static. It is maintained through practice and degrades through disuse. If humans never engage directly with systems—relying entirely on agents for implementation—their capacity to do so atrophies.

This atrophy is particularly insidious because it is invisible until tested. A human may believe they can still reason about their system until an incident requires them to do so. By then, the capability may be irrecoverable in the timeframe required.

LP4 requires periodic direct engagement with system complexity without agent assistance. The forms vary—manual bug fixes, code archaeology sessions, invariant audits, theory reconstruction exercises—but the principle is constant: use it or lose it. This practice meets the highest resistance because it appears to reduce velocity. It does reduce velocity. That is the price of maintaining the human capability without which all other controls are meaningless.

### LP5: Structured Intent Artifacts

The fifth leverage point addresses the foundation of the control loop: the human's declaration of what they want. Unstructured natural language is ambiguous, incomplete, and unverifiable. A prompt saying "make the login better" cannot be verified because "better" is undefined. A structured Intent Contract declaring specific goals, permitted scope, preserved constraints, and acceptance criteria can be verified.

The Intent Contract is not a bureaucratic artifact. It is the contract against which all subsequent verification occurs. LP1 compares actual changes against the contract's declared scope. LP2 generates Prediction Probes from the contract's acceptance criteria. LP3 measures magnitude against the contract's implied boundaries. Without LP5, the other leverage points have no reference point.

### LP6: Agent Access Gated by Demonstrated Comprehension

The sixth leverage point addresses the moral hazard in unrestricted agent access. If anyone can direct agents through any system regardless of their understanding of that system, then LP4 becomes voluntary and will be skipped under velocity pressure. There must be a mechanism that automatically restricts agent access when theory gauges degrade below threshold.

This is the circuit breaker. When an operator's prediction accuracy on Prediction Probes drops below threshold, agent execution privileges are automatically suspended. The operator must rebuild theory through direct engagement—writing code by hand—until gauges recover. The restriction is automatic, not discretionary. It cannot be overridden by the operator themselves or waived for deadline pressure.

Without LP6, the cognitive maintenance requirement of LP4 has no enforcement mechanism. Teams will skip maintenance under pressure because there is no structural consequence for doing so. LP6 creates that consequence: lose your theory, lose your amplifier.

### LP7: Separation of Production Authority from Exploration Access

The seventh leverage point addresses the talent pipeline problem. If LP6 restricts agent access to demonstrated comprehension, and comprehension can only be built through experience, then new operators cannot gain experience with agents. This creates a binary trap: either accept risk by allowing inexperienced operators to ship agent code to production, or block learning by preventing them from using agents at all.

LP7 resolves this by separating production authority from exploration access. Operators below the comprehension threshold can use agents freely in designated non-production environments—prototypes, sandboxes, feature branches that will not merge to production. They build familiarity with agent workflows and develop reconstruction skills. But they cannot merge agent-generated code to production repositories until they have demonstrated sufficient comprehension through the progression system.

Without LP7, organizations face an impossible choice between production risk and learning opportunity. LP7 makes both possible simultaneously by distinguishing where code can be used from who can write it.

## Three-Plane Architecture

![Three-Plane Architecture: A pyramid-structured diagram with three horizontal tiers. The top tier, Directive Plane (intent specification), shows a brain/plan icon and an arrow labeled 'Intent Contract (IC)' flowing downward. The middle tier, Execution Plane (actuation), shows a robotic arm icon representing agent-driven implementation. The bottom tier, Reconstruction Plane (model-update), shows a database icon and an arrow labeled 'Reconstruction Proof (RP)' flowing upward. Directional arrows between tiers indicate how the Intent Contract (IC) flows down from Directive to Execution, and the Reconstruction Proof containing the Design Rationale and Prediction Probes flows up from Execution through Reconstruction back to the human operator.](screenshots/three_plane_architecture_placeholder.png)
*Figure 3: The Three-Plane Architecture illustrating the flow of intent through the Directive, Execution, and Reconstruction planes.*

The seven leverage points are organized into a three-plane architecture (intent specification, actuation, and model-update layers) that structures the flow of intent, execution, and understanding.

### The Directive Plane

The Directive Plane, acting as the intent specification layer, is responsible for transforming human will into structured machine-executable intent. This plane receives natural language goals and constraints from the human operator and produces structured intent artifacts that can be verified against outcomes. The plane ensures that what the human wants is captured with sufficient precision that deviation from it is measurable.

The primary artifact of the Directive Plane is the Intent Contract (IC), a formal intent specification that defines goal, scope, constraints, non-goals, and acceptance criteria. The Intent Contract travels with the work through subsequent stages, providing the reference against which verification occurs. In multi-agent contexts, the Intent Contract propagates through orchestration layers, carrying root constraints as immutable context even as sub-tasks are decomposed.

The Directive Plane implements LP5 (structured intent) and the upstream portion of LP1 (intent declaration against which violations can be detected).

### The Execution Plane

The Execution Plane, acting as the actuation layer, is responsible for transforming structured intent into system changes. This plane receives the Intent Contract from the Directive Plane and produces code changes along with explanatory assurance artifacts that enable theory reconstruction. The plane operates under the constraints declared in the Intent Contract and is bounded by the magnitude limits (change budgets) of LP3.

The Execution Plane adapts its behavior based on operator capability. For operators in Socratic (Pedagogical) mode, the plane generates failing tests from the Intent Contract and challenges the operator to write the implementation. For operators in Standard (Agent-Implemented) mode, the plane executes the implementation and generates the Design Rationale explaining what was done and why. The mode selection is determined by the operator's position in the progression ladder and their current theory gauge state.

The Execution Plane implements LP3 (magnitude limits) and the adaptive execution modes described in the operator model.

### The Reconstruction Plane

The Reconstruction Plane, acting as the model-update layer, is responsible for rebuilding human theory from machine-produced changes. This plane receives the execution output and produces structured materials—Design Rationales and Prediction Probes—that force the human to demonstrate understanding. The plane verifies that the Comprehension Flow keeps pace with the Velocity Flow.

The Design Rationale is not a diff summary. It is an architectural explanation of what changed, why that approach was chosen, what alternatives were considered, and what assumptions underlie the implementation. The Prediction Probe is not an acknowledgment prompt. It is a falsifiable prediction question whose answer can be checked against actual system behavior.

The Reconstruction Plane implements LP2 (forced theory reconstruction) and the downstream portion of LP1 (verification that execution aligned with intent).

### Three Invariants

The architecture serves three invariants that must be maintained for the system to remain controllable.

Outbound Intent Fidelity ensures that human will reaches the machine without loss of meaning, scope, or constraint. When the human says "modify only the auth module," the modification must be limited to the auth module. When the human says "preserve retry behavior," the retry behavior must be preserved. The Directive Plane exists to ensure intent survives transmission.

Inbound Theory Preservation ensures that human understanding is rebuilt from machine-driven outcomes with sufficient fidelity to maintain navigability. When the agent produces changes, the human must reconstruct enough theory to predict system behavior in novel situations. The Reconstruction Plane exists to ensure understanding survives translation.

Operator Capability Integrity ensures that the humans directing agents possess and develop the judgment required to do so effectively. Neither intent fidelity nor theory preservation matters if the humans lack the underlying skill to specify intent well or reconstruct theory accurately. The adaptive operator model exists to ensure the human capability that makes the other invariants meaningful.

## Control Fidelity Protocol

![CFP Stage-Gate Pipeline: A horizontal left-to-right flow diagram showing six gates (G1 through G6) as diamond checkpoints connected by arrows. Between the gates, assurance artifacts are produced and consumed: the Intent Contract (IC) emerges from G1, the Orchestration Envelope (OE) from G2, execution mode resolution at G3, the Execution Envelope (EE) with PRE and POST at G4, the Reconstruction Proof (RP) with Design Rationale and Prediction Probes at G5, and merge authorization at G6. Three planes are labeled above: Directive Plane spans G1–G2, Execution Plane spans G3–G4, Reconstruction Plane spans G5–G6. Optional multi-agent artifacts CN (Composition Narrative) and CP (Composition Proof) appear near G4–G5.](screenshots/cfp_stage_gate_pipeline_placeholder.png)
*Figure 6: The Control Fidelity Protocol Stage-Gate Pipeline showing gates G1–G6, assurance artifacts, and the three-plane mapping.*

The architecture is operationalized through the Control Fidelity Protocol (CFP), which specifies the stage-gates, assurance artifacts, and state machines required to maintain control. The protocol defines the precise conditions under which work can proceed from one stage to the next, ensuring that the leverage points are enforced rather than merely recommended.

### Stage-Gates

The protocol defines six stage-gates that work must pass through. Each stage-gate is a Boolean predicate—the condition is either satisfied or it is not. Failure at any stage-gate transitions the system to an error state that must be resolved before work proceeds.

G1 (Intent Contract Approval) requires that the Intent Contract be reviewed and approved by an authorized operator before execution begins. This ensures that unstructured intent does not enter the Execution Plane.

G2 (Scope and Invariant Verification) requires that the execution plan produced by the agent falls within the scope declared in the Intent Contract and does not violate any registered invariants for the components being modified. This catches scope violations and invariant conflicts before execution rather than after.

G3 (Execution Authorization) requires that the execution sandbox is bounded strictly to planned modifications and resolves the execution mode by checking the operator's progression stage against the repository designation. This determines whether the operator receives Socratic, Restricted, or Standard mode and gates multi-agent orchestration access.

G4 (Execution Completion) requires that execution completes without error and produces all required assurance artifacts—the modified code and the Design Rationale.

G5 (Theory Verification) requires that the operator pass the Prediction Probes with prediction accuracy above threshold. This ensures that changes are not finalized without comprehension.

G6 (Merge Authorization) requires that the operator has the authority to merge code of this type (agent-generated or operator-written) to this repository type (production or non-production). This enforces the separation of production authority from exploration access.

### Assurance Artifacts

The protocol specifies six primary assurance artifacts that embody the control data.

**The Intent Contract (IC)** captures structured human intent: goal, scope, constraints, non-goals, and acceptance criteria. It is produced by the human (possibly with agent assistance in structuring) and approved at G1.

**The Orchestration Envelope (OE)** captures the decomposition plan when multiple agents are involved: sub-task partitioning, scope allocations, and merge strategies. It is produced by the orchestrator agent and verified at G2.

**The Execution Envelope (EE)** captures both the plan (PRE) and the results (POST) of execution: what the agent intended to do and what it actually did, mapped back to the Intent Contract clauses.

**The Composition Narrative (CN)**, required in multi-agent contexts, captures the orchestrator's explanatory account of how multiple agents' outputs fit together: interaction maps, assumption verdicts, and risk assessments.

**The Composition Proof (CP)**, required in multi-agent contexts, captures independent verification that multiple agents' outputs compose correctly without emergent misbehavior.

**The Reconstruction Proof (RP)** captures the Design Rationale (the agent's explanatory account of the change: reasoning, alternatives considered, assumptions made, and dependencies introduced), the Prediction Probes the operator must answer, and the operator's responses—providing an auditable record of demonstrated comprehension.

### Risk Tiers

The protocol recognizes that different systems warrant different levels of control. Three risk tiers determine the rigor of enforcement.

Consequential tier applies to systems where failures have significant business, security, or safety implications. At this tier, the protocol enforces maximum rigor: multiple Prediction Probes, heterogeneously redundant independent verification agents in multi-agent contexts, and prohibition on multi-agent orchestration entirely.

Professional tier applies to production systems with standard business risk. At this tier, the protocol enforces moderate rigor: standard Prediction Probes, verification agents that may share model families with execution agents, and multi-agent orchestration permitted only for operators at the highest progression level.

Exploratory tier applies to prototypes, sandboxes, and learning environments where the cost of failure is low. At this tier, the protocol enforces minimal rigor: reduced Prediction Probes, optional verification, and full agent access for operators at all levels.

The tier is a property of the repository, not the change. Organizations may encode this in repository designation (e.g., production vs. non-production) and associated policy, and the protocol selects the corresponding tier and enforcement profile at runtime.

![Risk Tier × Execution Mode Matrix: A 3×3 grid showing the intersection of three risk tiers (Consequential, Professional, Exploratory) with three execution modes (Socratic, Restricted, Standard). Cells are color-coded by restrictiveness from dark red (Consequential + Standard: maximum rigor, heterogeneous verification, multi-agent prohibited) through yellow to green (Exploratory + Socratic: light coaching, reduced probes). Each cell summarizes the key protocol behaviors for that combination.](screenshots/risk_tier_execution_mode_matrix_placeholder.png)
*Figure 7: Risk Tier × Execution Mode Matrix showing how protocol rigor varies across the nine combinations of risk tier and execution mode.*

## Multi-Agent Orchestration

![Intent Transformation Chain: A tree/DAG diagram showing how a single Intent Contract decomposes through an orchestrator into sub-tasks. At the top, a Human Operator issues an Intent Contract (IC) with goal, scope, constraints, and acceptance criteria. The Orchestrator Agent receives the IC and produces an Orchestration Envelope (OE) that decomposes into three sub-tasks (Auth Agent, Gateway Agent, Config Agent), each with root constraints propagating as immutable context. Outputs flow back up through a Composition Narrative (CN) and Composition Proof (CP). A potential compositional incoherence is highlighted where two agents make conflicting assumptions. A callout notes that multi-agent orchestration is permitted only at Professional tier for ENGINEER-level operators and is prohibited at Consequential tier.](screenshots/intent_transformation_chain_placeholder.png)
*Figure 8: Intent Transformation Chain showing how intent decomposes through orchestration, with root constraint propagation and compositional verification. Multi-agent orchestration is restricted to Professional tier, ENGINEER progression stage only.*

The base protocol assumes a dyadic control loop: one human, one agent, one channel of intent, one channel of reconstruction. This assumption is already being exceeded in practice, as agents delegate to other agents, orchestrate specialist sub-agents, and coordinate through inter-agent protocols. Multi-agent orchestration introduces failure modes that are qualitatively different from the dyadic case.

### Intent Transformation Chains

In the dyadic model, intent traverses a single hop from human to agent. In orchestrated systems, intent passes through chains: human to orchestrator, orchestrator to specialists, specialists to sub-task agents. Each hop is an interpretation step where the receiving agent decomposes and recontextualizes the intent it received. The losses compound.

The Intent Contract must evolve from a single-hop artifact to a propagating contract. At each orchestration hop, the root intent and its immutable constraints must travel with the sub-task. The receiving agent can see not just its immediate instructions but the original human intent against which its work will ultimately be verified. This prevents the semantic drift that occurs when each layer interprets only its immediate parent's instructions.

### Compositional Incoherence

The second fundamental problem is that individually correct agent outputs can compose into systemically incorrect results. Agent A modifies authentication assuming tokens are validated at the gateway. Agent B modifies the gateway assuming tokens are validated at the service. Both outputs are correct in isolation. The system is incorrect in composition.

This requires a new class of verification. Individual agents are verified for correctness against their sub-tasks. The composition must be verified for coherence against the root intent. The orchestrator is the natural entity to produce this verification, but the orchestrator is simultaneously the architect of the composition and its auditor—a segregation-of-duties violation that becomes dangerous at higher risk tiers.

At Consequential tier, the protocol requires independent verification with heterogeneous redundancy: a verifier agent built on a different model family, prompted with different context, and explicitly tasked with finding compositional failures. This defense-in-depth prevents common-mode failure where the orchestrator and verifier share the same blind spots.

### The Complexity Ceiling

Multi-agent orchestration forces confrontation with a hard limit: human cognitive capacity. When an orchestrator decomposes a task into fifteen sub-tasks across eight specialist agents, no human can verify the full behavioral surface area before merge. The theory required to understand the result includes not just what each agent did but how their outputs interact and what assumptions the orchestrator made during decomposition.

There is a complexity ceiling beyond which human-in-the-loop control is structurally inadequate. At that ceiling, the human must transition from supervising execution directly to supervising the monitoring apparatus that watches execution. This is not abdication but a phase shift in the nature of control.

The danger is common-mode failure in the monitoring layer. If the monitoring agents share the same underlying model biases as the execution agents, redundancy provides no protection. The Directive Plane requires that monitoring architectures above the complexity ceiling be designed for independent verification with heterogeneous redundancy from the start—diverse models, diverse prompting, explicit adversarial objectives.

## Adaptive Operator Model

The Execution Plane adapts its behavior based on who is operating it, not just what system they are operating on. This adaptation recognizes that operators vary along two orthogonal dimensions: craft maturity (general engineering skill accumulated across a career) and system familiarity (specific knowledge of this codebase, accumulated through direct engagement). A senior engineer joining a new team has high craft but zero system familiarity. A junior who has been on a team for a year has growing familiarity but limited craft. The protocol must handle both.

### Execution Modes

The protocol defines three execution modes that differ in how work is distributed between agent and operator.

Socratic Mode, which is pedagogical, inverts the standard agent role. The agent does not implement; it teaches. The agent generates failing tests derived from the Intent Contract, and the operator writes the implementation to make the tests pass. The agent reviews the operator's code not to fix it but to challenge it—probing edge cases, questioning assumptions, surfacing gaps in reasoning. Theory is held by construction because the operator built the implementation themselves.

Restricted Mode, which is operator-implemented, places the agent in a testing role. The agent writes the tests; the operator writes the implementation. This mode is shared across two entry paths: the circuit breaker (for operators whose theory has degraded) and senior onboarding (for experienced engineers new to a codebase). In both cases, the operator already has test design skill; what they lack is direct familiarity with the code. Implementing against agent-generated tests forces that engagement.

Standard Mode, which is agent-implemented, is the baseline protocol behavior. The agent executes, produces the Design Rationale, and the operator passes Prediction Probes to demonstrate reconstruction.

### Progression Ladder

![Operator Progression State Machine: A state machine diagram showing operator progression through four stages plus two recovery states. The main progression path flows left to right: APPRENTICE_1 (full scaffold with agent-generated tests and active coaching) to APPRENTICE_2 (tutor only, operator writes own tests) to JOURNEYMAN (elevated review with additional Prediction Probes) to ENGINEER (standard protocol with full agent access). A circuit breaker path descends from any level to RESTRICTED when Prediction Accuracy drops below 0.6, with recovery back to the previous level when accuracy exceeds 0.8. An escalation path descends from RESTRICTED to SUSPENDED after prolonged failure, with two-step recovery through RESTRICTED back to the previous level. Hysteresis thresholds (0.6 restrict, 0.8 recover) and preceptor approval requirements are labeled.](screenshots/operator_progression_placeholder.png)
*Figure 4: Operator Progression State Machine showing the four-stage progression ladder, the circuit breaker path to RESTRICTED, and the escalation to SUSPENDED.*

Operators progress through stages as they demonstrate competence. The progression is evidence-based, not time-based. The protocol provides the evidence through gauges; a human mentor (the Engineering Manager) makes the judgment call.

At the first stage, the operator receives full scaffolding: agent-generated tests, active coaching, explicit guidance through the implementation process. At the second stage, the coaching continues but the operator must write their own tests—developing the instinct for what to test that distinguishes craft maturity. At the third stage, the operator transitions to the review side: the agent implements, and the operator reconstructs theory through challenges. The challenge count is elevated above the final stage to force more reconstruction practice. At the final stage, the operator operates under standard protocol with full agent access.

Each stage transition requires Engineering Manager attestation based on gauge evidence: prediction accuracy trending above threshold, test quality gap closing, breadth of subsystem coverage expanding. No algorithm promotes an operator. The gauges provide evidence; a human decides.

### Circuit Breaker

Prediction Probe performance is not merely a gauge but a circuit breaker. When an operator's prediction accuracy drops below threshold, agent execution privileges are automatically suspended. The operator must rebuild theory through direct coding—implementing against agent-generated tests—until gauges recover above the recovery threshold.

The mechanism includes hysteresis to prevent flapping: the recovery threshold is higher than the restriction threshold, requiring demonstrated sustained improvement. The mechanism includes a hybrid window requiring both a minimum number of changes and a minimum time span, preventing both rushed gaming and thin-sample artifacts. The mechanism includes Engineering Manager approval as a final gate, adding human judgment to the quantitative signal.

If self-directed recovery fails—if an operator remains restricted for an extended period without improvement—the state escalates to suspended, triggering closer mentorship with tighter constraints and an Engineering Manager-designed recovery path. The operator does not lose their position; they receive more support. But agent access remains suspended until theory demonstrably rebuilds.

### Merge Stage-Gates

The repository designation determines who can merge what where. Only operators who have reached the elevated review stage or beyond can merge agent-generated code to production repositories. Operators at earlier stages, or operators whose theory has degraded into restriction, can use agents freely in non-production environments but cannot ship agent code to production.

This separation preserves both safety and learning. Early-stage operators build familiarity with agent workflows in sandboxes where mistakes are cheap. Restricted operators maintain productivity on non-production work while rebuilding theory for production systems. The constraint is not punitive but structural: production systems require demonstrated theory, and the protocol enforces that requirement at the merge gate.

## Instrumentation

Controls without instrumentation are faith. The architecture defines what must be controlled; instrumentation addresses how to know the controls are working.

### The Falsifiability Principle

The central risk in any human-verification system is that verification becomes performative. A signed checklist asserts that a check was performed. It does not prove that understanding was achieved. A reviewed Design Rationale asserts that the human read it. It does not prove that theory was reconstructed.

Aviation discovered this distinction at the cost of lives. Early checklists were read-and-acknowledge: the pilot read the item and confirmed completion. This failed because pilots confirmed items out of habit without verifying the underlying state. Modern checklists are challenge-and-response: one pilot reads the challenge, the other verifies the instrument and states the actual value. The check is coupled to system state, not to human assertion.

A control artifact has integrity when it is falsifiable—when it makes a claim that can be checked against reality. An Intent Contract that declares scope is falsifiable: the actual change either stayed within scope or it did not. A Prediction Probe that asks for a prediction is falsifiable: the prediction is either correct or it is not. An artifact that asks only for acknowledgment is unfalsifiable and worthless as a control.

### Core Gauges

Four gauges instrument the health of the control system. These gauges are not vanity metrics. They are instruments that read the stocks defined in the system dynamics model.

Prediction Accuracy (predictive validity) proxies Human Theory. It tracks the correctness rate of Prediction Probe responses over time. A declining accuracy rate indicates that human understanding is falling behind system evolution.

Scope Violation Rate reads the effectiveness of magnitude limits (change budgets). It tracks the percentage of changes exceeding declared scope. A rising violation rate or rising average violation size indicates that LP3 is losing its function as a control.

Explanation Latency (Time-to-Explain) proxies Navigability. It is measured through periodic sampling: ask an engineer to explain a subsystem, measure the time required and the completeness achieved. Increasing time or decreasing completeness indicates growing cognitive debt.

Invariant Verification Lag reads the gap between stated and actual system properties. It tracks the age of each invariant since last verification or update. A growing number of invariants past their verification deadline indicates that the assurance property registry is becoming disconnected from the system it describes.

### Failure Thresholds

Gauges without alarm thresholds are decorations. The specific threshold values vary by team and risk tolerance, but the existence of thresholds must not vary. A team practicing agentic engineering must define, in advance, the conditions under which they will slow or stop agent-driven work to reconstruct theory.

Three threshold levels correspond to increasing severity. The caution level indicates adverse trends requiring increased attention and tighter controls. The degraded level indicates gauge values outside acceptable range, requiring a halt to new agent-driven feature work while theory is reconstructed. The loss-of-controllability level indicates that no team member can accurately predict behavior of critical subsystems, requiring full stop and system-wide reconstruction.

The nuclear principle applies: when the situation exceeds your understanding, reduce power. Do not seek more information at current power.

### The Agentic Engineer Role

The existence of instruments and thresholds implies the existence of someone accountable for reading the instruments and responding to the thresholds. Every high-amplification domain has converged on this: aviation has check airmen, finance has risk officers with trading halt authority, nuclear has shift supervisors with SCRAM authority.

In agentic development, this role is the Agentic Engineer. They own the control loop, not the code. They read the gauges. They have halt authority that is real—backed by organizational structure—not advisory. They maintain signal integrity, ensuring that artifacts remain falsifiable and coupled to system state.

The Agentic Engineer is distinct from the Engineering Manager, who owns the learning loop rather than the control loop. The Agentic Engineer monitors system gauges and can halt agent-driven work when controls degrade. The Engineering Manager monitors operator progression and signs off on stage transitions. The two roles collaborate at specific points—circuit breaker triggers, challenge quality concerns, progression decisions—but maintain separate authority and accountability.

## Cross-Domain Analogies

![Cross-Domain Analogy Map: A comparison grid mapping control practices from Aviation, Financial Risk Management, and Nuclear Power Operations to the Directive Plane's seven leverage points (LP1–LP7). Each row shows how a leverage point manifests in each domain: LP1 maps to Mode Annunciation, Mark-to-Market, and Defense in Depth; LP2 maps to Challenge-and-Response checklists, Stress Testing, and Procedural Compliance with Understanding; LP3 maps to Sterile Cockpit, Position Limits, and Conservative Decision Making; LP4 maps to Manual Flying requirements and Shift Turnover Briefs; LP5 maps to Flight Plans, Trade Specifications, and Reactor Operating Procedures; LP6 maps to Type Ratings, Licensing, and Operator Certification; LP7 maps to Simulator Training, Paper Trading, and Training Reactors.](screenshots/cross_domain_analogy_map_placeholder.png)
*Figure 10: Cross-Domain Analogy Map showing how each leverage point corresponds to established control practices in aviation, finance, and nuclear operations.*

The control problem addressed by the Directive Plane is not unique to software engineering. Other domains have encountered the same structural challenge—maintaining human control when machines amplify human action beyond the speed or scale of direct perception—and have evolved solutions over decades, often at the cost of catastrophic failures.

### Aviation

The transition from analog cockpits to glass cockpits and fly-by-wire systems in commercial aviation created precisely the gap between automation capability and human comprehension that characterizes agentic coding. The aircraft could do things faster and with more precision than pilots could track. Mode confusion—where the pilot believes the automation is doing one thing while it is doing another—became a new category of accident.

The industry response included explicit mode annunciation requiring the automation to clearly display what it is doing and why, type rating requirements ensuring pilots demonstrate understanding of specific aircraft before operating them, manual flying requirements maintaining pilot skill through mandated hand-flying time, and sterile cockpit rules creating protected periods where cognitive load is managed rather than merely accepted.

These interventions map directly to the leverage points: mode annunciation is LP1 (visibility of state), type ratings are LP6 (access gated to comprehension), manual flying is LP4 (capability preservation), sterile cockpit is LP3 (magnitude management within cognitive limits).

### Financial Risk Management

The 2008 financial crisis revealed what happens when interconnected systems become too complex for any human to understand, when the consequences of decisions are amplified far beyond the decisions themselves, and when the humans nominally in control lose the ability to predict system behavior. The leverage in collateralized debt obligations meant small changes in underlying assumptions produced enormous swings in value. No human could trace the full web of interconnections.

The regulatory response included position limits constraining the magnitude of risk any single actor can take, mark-to-market requirements forcing continuous acknowledgment of current system state rather than historical assumptions, stress testing subjecting portfolios to hypothetical scenarios to verify whether the humans managing them understand behavior under stress, and segregation of duties ensuring that those who construct trades and those who verify them are different people.

These interventions have direct analogs: position limits are LP3, mark-to-market is LP1 and LP2 combined, stress testing is LP2, segregation of duties is the independent verification required at high risk tiers.

### Nuclear Power Operations

Nuclear reactors amplify small control actions into enormous energy outputs within tight safety margins and at timescales not directly perceivable by human operators. The Three Mile Island and Chernobyl incidents both involved operators who had lost track of actual reactor state—their mental models were wrong, and their actions were rational given their models but catastrophic given reality.

The industry response included defense in depth with multiple independent barriers each with its own monitoring, procedural compliance with understanding where rote compliance without comprehension is itself considered a failure mode, conservative decision making where uncertainty triggers power reduction rather than information seeking at current power, and shift turnover briefs providing formal transfer of theory at every organizational boundary.

The nuclear parallel illuminates a crucial point: the most dangerous state is not a broken system but a functioning system where the operator's theory is wrong. In agentic development, this is precisely the state that emerges when agents produce correct code that humans do not understand.

## Conclusion

The Directive Plane is not a productivity system. It is a control architecture. Its purpose is to ensure that as machine-speed implementation becomes the norm, the humans responsible for software systems retain the ability to understand, direct, and correct those systems.

The central claim is that seven specific capabilities—intent violation visibility, forced theory reconstruction, change magnitude limits, reasoning capability preservation, structured intent artifacts, comprehension-gated agent access, and separation of production from exploration access—form the minimal set of controls required for stable operation. These are not optional enhancements. They are structural requirements. Without them, the system will function correctly while becoming progressively unknowable.

The framework recognizes that different operators require different treatment. A senior engineer new to a codebase needs different scaffolding than a junior building craft maturity or a seasoned operator whose theory has temporarily degraded. The adaptive operator model provides this differentiation while maintaining the invariant that production systems require demonstrated comprehension.

The framework extends to multi-agent orchestration, where intent transformation chains and compositional incoherence introduce qualitatively different failure modes. At the complexity ceiling—and it is a mathematical certainty that this ceiling will be reached—the human-in-the-loop must transition to supervisory control, supervising independently redundant verification architectures rather than execution directly.

The analogous domains—aviation, finance, nuclear power—arrived at the same principles independently because the underlying problem is the same. Their solutions were purchased with catastrophe. The software engineering profession has the opportunity to learn from that history rather than repeat it.

The goal is not to slow down. The goal is to move fast while knowing where you are going, knowing where you have been, and retaining the ability to change direction. Speed without controllability is not velocity. It is ballistic trajectory.

## References

Naur, P. "Programming as Theory Building." Microprocessing and Microprogramming, 15(5), 253–261, 1985.

Russinovich, M. and Hanselman, S. "Redefining the Software Engineering Profession for AI." Communications of the ACM. DOI: 10.1145/3779312.
