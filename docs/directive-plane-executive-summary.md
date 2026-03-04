# The Directive Plane: Keeping Humans in Control of AI-Driven Software

**Executive Summary for Senior Leadership**

---

## The Problem in One Sentence

AI coding agents can now write and change software faster than the engineers directing them can understand what changed—and that gap is a ticking time bomb.

## Why This Matters

Today's AI coding agents are remarkably capable. A single prompt can trigger changes across hundreds of files in minutes. The code compiles, the tests pass, and the feature ships. But there's a catch: the engineer who issued the prompt may not be able to explain *what* the agent did, *why* it chose that approach, or *how* the changes interact with the rest of the system.

This isn't a minor inconvenience. It's a structural vulnerability.

Peter Naur argued in 1985 that programming is fundamentally about *theory building*—the living mental model that lets engineers explain why a system works, predict its behavior, and modify it safely. When AI agents implement changes, the code may be correct, but the engineer hasn't walked the reasoning path that produced it. They haven't built the theory.

The engineer remains responsible for the system's security, reliability, and correctness, but has quietly lost the capacity to fulfill that responsibility. We call this condition **loss of controllability**.

### The Runaway Loop

Without intervention, a self-reinforcing cycle takes hold:

1. **AI writes code faster than humans can absorb it.** Understanding falls behind.
2. **With less understanding, engineers write worse prompts.** They can't specify what they want because they no longer fully grasp what they have.
3. **Worse prompts produce drifting changes.** The system grows more complex without corresponding value.
4. **More complexity further degrades understanding.** The cycle accelerates.

The result is a characteristic pattern: early productivity gains, then a plateau as "cognitive debt" accumulates, and eventually decline as changes become slower and riskier—because nobody truly understands the system anymore.

This is like technical debt, but worse. Technical debt lives in code and can be measured. Cognitive debt lives in people's heads, is invisible until the moment the knowledge is needed, and compounds with every change that passes without comprehension.

## The Solution: A Control Architecture

The Directive Plane is not a productivity tool. It is a **control architecture**—a set of structural guardrails that ensure engineers retain genuine understanding of the systems they're responsible for, even as AI agents do more of the implementation work.

### Three Planes: Plan → Do → Check

The architecture organizes work into three layers:

| Plane | Role | Key Question |
|-------|------|--------------|
| **Directive** (Plan) | Captures what the engineer wants with enough precision to verify later | "Is the intent clear and complete?" |
| **Execution** (Do) | AI agents implement the work under declared constraints | "Did the agent stay within scope?" |
| **Reconstruction** (Check) | Forces the engineer to demonstrate they understand what changed | "Can the engineer predict system behavior?" |

A feedback loop connects Reconstruction back to Directive—each cycle rebuilds understanding before the next round of changes begins.

### Seven Non-Negotiable Controls

The architecture enforces seven leverage points. These aren't optional best practices—they are structural requirements. Removing any one creates failure modes that cascade through the others.

| # | Control | Plain-English Translation |
|---|---------|--------------------------|
| **LP1** | Automatic visibility of intent violations | The system automatically flags when AI changes don't match what was asked for |
| **LP2** | Forced theory reconstruction | Engineers must *predict* system behavior after changes—not just sign off on them |
| **LP3** | Change magnitude limits | A "budget" on how much can change at once, so humans aren't overwhelmed |
| **LP4** | Reasoning capability preservation | Engineers must periodically write code themselves, or their skills atrophy |
| **LP5** | Structured intent artifacts | Requests to the AI are formal contracts (goal, scope, constraints, acceptance criteria) instead of vague prompts |
| **LP6** | Comprehension-gated access | If an engineer can't demonstrate understanding, their AI privileges are automatically restricted |
| **LP7** | Production vs. exploration separation | Learners can use AI freely in sandboxes, but can't ship AI-written code to production until they've proven comprehension |

### The Control Fidelity Protocol: Six Gates

Work passes through six Boolean checkpoints (gates). Each gate is pass/fail—there's no "close enough."

1. **G1 — Intent Approved.** The structured request is reviewed before any AI execution begins.
2. **G2 — Scope Verified.** The AI's plan stays within declared boundaries and doesn't violate system invariants.
3. **G3 — Execution Authorized.** The right execution mode is selected based on the engineer's skill level and the system's risk tier.
4. **G4 — Execution Complete.** The AI finishes without errors and produces required documentation.
5. **G5 — Understanding Verified.** The engineer passes prediction-based comprehension checks ("Given input X, what will happen?").
6. **G6 — Merge Authorized.** Only engineers with demonstrated understanding can merge AI-generated code to production.

### Verification That Actually Works

The architecture uses **Prediction Probes**—not checklists. The difference matters.

A checklist asks: *"Did you review the change?"* The answer is always yes, regardless of whether understanding was achieved.

A Prediction Probe asks: *"If a user submits an expired token, what will this code do?"* The answer is verifiable against actual system behavior. You either know or you don't.

This distinction was learned the hard way in aviation. Early checklists were "read and acknowledge"—pilots confirmed items out of habit. Modern checklists are "challenge and response"—one pilot reads the challenge, the other verifies the actual instrument reading. The check is coupled to reality, not to human assertion.

## Adapting to Different Skill Levels

Not every engineer needs the same level of scaffolding. The framework defines three execution modes:

| Mode | How It Works | When It's Used |
|------|-------------|----------------|
| **Socratic** | AI *teaches*—generates failing tests, engineer writes the code | Junior engineers building skills |
| **Restricted** | AI writes tests, engineer writes code | Engineers whose understanding has degraded (circuit breaker) or seniors onboarding to a new codebase |
| **Standard** | AI implements, engineer verifies understanding via Prediction Probes | Experienced engineers with demonstrated comprehension |

Engineers progress through four stages (Apprentice 1 → Apprentice 2 → Journeyman → Engineer) based on evidence—prediction accuracy, test quality, subsystem coverage—not time served. An engineering manager makes the promotion call based on gauge data.

### The Circuit Breaker

If an engineer's prediction accuracy drops below threshold, their AI execution privileges are **automatically suspended**. This isn't optional, can't be overridden for deadline pressure, and isn't punitive—it's protective. The engineer rebuilds understanding by writing code directly until their gauges recover.

The nuclear power principle applies: *when the situation exceeds your understanding, reduce power. Don't seek more information at current power.*

## Multi-Agent Orchestration

When multiple AI agents collaborate on a task, new risks emerge:

- **Intent drift:** Each agent-to-agent handoff loses fidelity, like a game of telephone.
- **Compositional incoherence:** Agent A assumes tokens are validated at the gateway; Agent B assumes they're validated at the service. Both outputs are correct alone. The system is broken in combination.
- **Complexity ceiling:** When a task decomposes into 15 sub-tasks across 8 agents, no human can verify the full behavioral surface.

The framework addresses this with propagating intent contracts (root constraints travel with every sub-task), independent composition verification (at the highest risk tier, a separate AI from a different model family checks composition), and acknowledgment that beyond a certain complexity ceiling, the human transitions from directly supervising execution to supervising the monitoring system that watches execution.

## Risk Tiers

Different systems warrant different levels of rigor:

| Tier | Applies To | Rigor Level |
|------|-----------|-------------|
| **Consequential** | Systems where failures have significant business, security, or safety implications | Maximum: multiple comprehension checks, independent verification, multi-agent orchestration prohibited |
| **Professional** | Standard production systems | Moderate: standard checks, orchestration permitted for senior engineers only |
| **Exploratory** | Prototypes, sandboxes, learning environments | Minimal: reduced checks, full AI access at all levels |

The tier is a property of the *repository*, not the change. It's set by organizational policy and enforced automatically.

## Instrumentation and Accountability

### Four Key Gauges

| Gauge | What It Measures | Warning Sign |
|-------|-----------------|--------------|
| **Prediction Accuracy** | How often engineers correctly predict system behavior | Declining accuracy = understanding is falling behind |
| **Scope Violation Rate** | How often AI changes exceed declared boundaries | Rising rate = change limits aren't working |
| **Explanation Latency** | How long it takes an engineer to explain a subsystem | Increasing time = growing cognitive debt |
| **Invariant Verification Lag** | How stale the system's documented properties are | Growing lag = documentation is detaching from reality |

### Three Alarm Levels

| Level | Condition | Response |
|-------|-----------|----------|
| **Caution** (Yellow) | Adverse trends detected | Tighten controls, increase attention |
| **Degraded** (Orange) | Gauges outside acceptable range | Halt new AI-driven feature work; reconstruct understanding |
| **Loss of Controllability** (Red) | No team member can predict behavior of critical subsystems | Full stop; system-wide reconstruction |

### The Agentic Engineer Role

Every high-stakes domain has someone accountable for reading the instruments: aviation has check airmen, finance has risk officers with halt authority, nuclear has shift supervisors with SCRAM authority.

In this framework, that role is the **Agentic Engineer**. They own the control loop (not the code), read the gauges, and have real halt authority backed by organizational structure. This is distinct from the Engineering Manager, who owns the *learning* loop—monitoring operator progression and approving stage transitions.

## Lessons from Other Industries

This isn't a new problem. Three industries have faced the exact same challenge—humans losing control when machines amplify action beyond human perception speed—and their hard-won lessons map directly to this framework:

| Domain | What Happened | What They Learned |
|--------|--------------|-------------------|
| **Aviation** | Glass cockpits and fly-by-wire created "mode confusion"—pilots couldn't tell what the automation was doing | Mode annunciation (LP1), type ratings (LP6), mandatory hand-flying time (LP4), sterile cockpit rules (LP3) |
| **Finance** | The 2008 crisis revealed systems too complex for anyone to understand, with massively amplified consequences | Position limits (LP3), mark-to-market (LP1+LP2), stress testing (LP2), segregation of duties |
| **Nuclear** | Three Mile Island and Chernobyl: operators whose mental models were wrong took rational actions with catastrophic results | Defense in depth (LP1), understanding-based compliance (LP2), conservative decision-making (LP3), shift turnover briefs (LP4) |

The most dangerous state isn't a broken system. It's a *functioning* system where the operator's mental model is wrong. That's exactly what emerges when AI agents produce correct code that humans don't understand.

## The Bottom Line

The Directive Plane makes one central claim: **seven specific controls form the minimum viable set for keeping humans in control of AI-driven software development.** They are:

1. Automatic detection of intent violations
2. Forced comprehension checks (prediction-based, not checkbox-based)
3. Limits on change magnitude
4. Mandatory hands-on skill maintenance
5. Structured intent specifications
6. AI access gated to demonstrated understanding
7. Separation of production authority from learning access

These are not optional enhancements. They are structural requirements. Without them, systems will function correctly while becoming progressively unknowable—until the day they don't function correctly, and nobody can explain why.

The goal is not to slow down. The goal is to move fast while knowing where you're going, knowing where you've been, and retaining the ability to change direction.

**Speed without controllability is not velocity. It is ballistic trajectory.**

---

*Based on: "The Directive Plane: A Control Architecture for Controllable Agentic Software Engineering" — full framework documentation available in the directive-plane repository.*

*Reference: Naur, P. "Programming as Theory Building." Microprocessing and Microprogramming, 15(5), 253–261, 1985.*

*Reference: Russinovich, M. and Hanselman, S. "Redefining the Software Engineering Profession for AI." Communications of the ACM. DOI: 10.1145/3779312.*
