# AI Notes — Log

## 2026-02-23
- architecture: The adaptive operator model introduces a third invariant (Operator Capability Integrity) alongside Outbound Intent Fidelity and Inbound Theory Preservation. It is a cross-cutting concern across all three planes, not a fourth plane.
- architecture: Two new leverage points identified — LP6 (gate agent access to demonstrated comprehension) and LP8 (separate production authority from exploration access). LP2 refined to support graduated reconstruction.
- architecture: Risk tier is a property of the repository (production vs non-production), not just the change. This is a new concept not in the original Directive Plane or CFP.
- dynamics: New balancing loops B1 (Socratic Theory Building), B2 (Circuit Breaker Recovery), B3 (Progression Ratchet). New risk loops R4 (Velocity Pressure Cascade), R5 (Confidence Divergence).
- reference: Russinovich & Hanselman CACM paper (DOI 10.1145/3779312) on EiC developer talent pipeline is the external input that motivated the adaptive operator model.

## 2026-02-22
- ui-routing: The UI supports ?view=<screen> URL routing, which enables deterministic page-specific screenshots and review links.
- architecture: Compact doc versions (*-compact.md) are token-optimized and preferred for LLM context over full versions.
- ui: app.js follows a store/state/render pattern — seed data in `store`, UI tracking in `state`, innerHTML-based render functions, post-render event wiring via `attachTimelineListeners()`.

- circuit-breaker: RESTRICTED state is global (simple state machine) but trigger and recovery are scoped to specific subsystem(s). `circuit_breaker.triggered_by` tracks which subsystem(s) caused the restriction. Recovery credit only accrues from triggering subsystem(s).
- merge-gates: EXPLORATORY risk tier cannot merge to production repos regardless of operator level. G6 enforces this as a hard block. G1 remains a soft warning on tier/designation mismatch.
- review: 15 review items identified across contradictions (4), gaps (7), weak mitigations (2), structural observations (2). Tracked in docs/review.md.
