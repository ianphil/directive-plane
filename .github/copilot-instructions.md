# Copilot Instructions

## Project Overview

Directive Plane is a draft POC for a control system that keeps humans in control of agent-driven software work. It defines a three-plane architecture (Directive → Execution → Reconstruction) and a protocol (Control Fidelity Protocol / CFP) with gates, artifacts, and gauges that enforce three invariants: outbound intent fidelity, inbound theory preservation, and operator capability integrity.

The repo contains framework documentation and a sample cockpit-style web UI that demonstrates the concepts with seeded data.

## Running the UI

```bash
cd src/ui
python3 -m http.server 8000
# open http://127.0.0.1:8000/index.html
```

There is no build step, bundler, test suite, or linter. The UI is vanilla HTML/CSS/JS.

## Architecture

### Documents

- `docs/directive-plane.md` — The framework: stocks, runaway loops, seven leverage points, three-plane architecture, risk gradient, practices, cross-domain analogies.
- `docs/control-fidelity-protocol.md` — The protocol: state machines (single-agent, orchestrated, operator progression), gate predicates (G1–G6), artifact schemas (IC, OE, EE, CN, CP, RP), error states, risk tiers, execution mode × risk tier matrix, complexity ceiling.
- `docs/operator-model.md` — The operator model: two-axis capability (craft × system familiarity), execution modes (Socratic, Restricted, Standard), progression ladder, circuit breaker, preceptor role, repository designation, merge gates.
- `docs/multi-agent.md` — Multi-agent orchestration: intent transformation chains, compositional incoherence, scope partitioning, orchestrator trust boundary, complexity ceiling, verification mechanics.
- `docs/instrumentation.md` — Instrumentation: falsifiability principle, signal integrity, all gauges (core + orchestration + operator model), failure thresholds (Yellow/Orange/Red), Agentic Engineer role.
- `docs/ui-sample-walkthrough.md` — Narrative walkthrough of the UI with screenshots.

### UI (`src/ui/`)

Single-page app with three files, no dependencies:

- `index.html` — Shell layout (topbar, control panel, timeline, overlay drawer)
- `styles.css` — All styling via CSS custom properties in `:root`
- `app.js` — All logic: data store, UI state, render functions, event wiring

**UI patterns:**

- **Data store** (`store`): Hardcoded seed data at the top of `app.js`. Sessions, work status, prove status, merge checks, health metrics.
- **UI state** (`state`): Tracks `expandedId` and per-card active tab (`cardTabs`).
- **Render cycle**: `renderControlPanel()` and `renderTimeline()` build HTML via template literals and inject with `innerHTML`. After injecting, `attachTimelineListeners()` wires up event handlers.
- **Card expansion**: Cards use CSS `grid-template-rows: 0fr → 1fr` animation. Only one card expands at a time.
- **Tab content routing**: `renderCardContent(id, tab)` dispatches to `renderPlanContent`, `renderDoContent`, `renderProveContent`, `renderMergeContent` — one per protocol phase.

## Domain Terminology

When working with docs or UI code, these terms have specific meanings in this framework:

| Term | Meaning |
|------|---------|
| IC (Intent Contract) | Structured intent artifact: goal, scope, constraints, acceptance criteria |
| OE (Orchestration Envelope) | Multi-agent decomposition plan with scope partitions |
| EE (Execution Envelope) | PRE (plan) + POST (results mapped back to IC) |
| CN (Composition Narrative) | How multiple agents' outputs combine |
| CP (Composition Proof) | Independent verification of composition correctness |
| RP (Reconstruction Proof) | Narrative + theory challenges the operator must pass |
| Theory Challenge | Prediction-based questions testing genuine understanding (not acknowledgment) |
| Invariant | Falsifiable system property tracked in a register (e.g., `INV-012`) |
| Navigability | Human Theory ÷ System Complexity — the derived ratio the framework protects |
| LP1–LP7 | The seven leverage points (all required, removing any one causes cascading failure). LP6: gate agent access to demonstrated comprehension. LP7: separate production authority from exploration access. |
| Gate (G1–G6) | Boolean predicates between protocol states; FALSE → error state |
| Operator Currency | CURRENT ↔ LAPSED → RESTRICTED → SUSPENDED |
| Execution Mode | Protocol-level behavior: SOCRATIC (agent teaches, operator implements), RESTRICTED (agent tests, operator implements), STANDARD (current CFP) |
| Progression Stage | APPRENTICE_1 → APPRENTICE_2 → JOURNEYMAN → ENGINEER. Evidence-based, preceptor-attested. |
| Circuit Breaker | Automatic restriction of agent access when Prediction Accuracy drops below threshold |
| Preceptor | Engineering manager who owns the operator learning loop (distinct from Agentic Engineer who owns the system control loop) |
| Repository Designation | PRODUCTION or NON-PRODUCTION — external organizational control inherited at runtime |

## Conventions

- CSS uses a design-token system via `:root` custom properties. Use existing `--badge-*`, `--dot-*`, and `--text-*` variables rather than raw colors.
- Badge variants follow a semantic pattern: `.ok`, `.warn`, `.danger`, `.info`, `.neutral`, plus phase-specific classes (`.phase-planning`, `.phase-doing`, `.phase-proving`, `.phase-merge`).
- The UI has no framework dependency. DOM manipulation uses `querySelector`/`innerHTML` with template literals. Do not introduce a framework.
- Never use MCP. For UI testing or taking screenshots, use the Playwright CLI directly.
- Never add co-authored-by trailers or AI attribution to commit messages.
