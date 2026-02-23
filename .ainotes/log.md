# AI Notes — Log

## 2026-02-23
- architecture: The adaptive operator model introduces a third invariant (Operator Capability Integrity) alongside Outbound Intent Fidelity and Inbound Theory Preservation. It is a cross-cutting concern across all three planes, not a fourth plane.
- architecture: Two new leverage points identified — LP6 (gate agent access to demonstrated comprehension) and LP7 (separate production authority from exploration access). LP2 refined to support graduated reconstruction.
- architecture: Risk tier is a property of the repository (production vs non-production), not just the change. This is a new concept not in the original Directive Plane or CFP.
- dynamics: New balancing loops B1 (Socratic Theory Building), B2 (Circuit Breaker Recovery), B3 (Progression Ratchet). New risk loops R4 (Velocity Pressure Cascade), R5 (Confidence Divergence).
- reference: Russinovich & Hanselman CACM paper (DOI 10.1145/3779312) on EiC developer talent pipeline is the external input that motivated the adaptive operator model.
- doc-structure: Docs restructured from 3 files to 5 topic-focused files (directive-plane, control-fidelity-protocol, operator-model, multi-agent, instrumentation). AOM content fully distributed and source file removed. Compact versions serve as regression tests — verified section-by-section post-refactor.
- doc-structure: docs/README.md serves as the index page with reading order and exec summaries. GitHub renders it automatically when browsing docs/.
- consistency: After restructuring, references to "two invariants" must be updated throughout all docs to "three invariants" — easy to miss in Part III and Conclusion of directive-plane.md.
- docs-governance: Archived compact references can quickly become misleading; once superseded, remove all mentions from public readmes and contributor instructions to prevent stale guidance.

## 2026-02-22
- ui-routing: The UI supports ?view=<screen> URL routing, which enables deterministic page-specific screenshots and review links.
- architecture: Compact doc versions (*-compact.md) are token-optimized and preferred for LLM context over full versions.
- ui: app.js follows a store/state/render pattern — seed data in `store`, UI tracking in `state`, innerHTML-based render functions, post-render event wiring via `attachTimelineListeners()`.

- circuit-breaker: RESTRICTED state is global (simple state machine) but trigger and recovery are scoped to specific subsystem(s). `circuit_breaker.triggered_by` tracks which subsystem(s) caused the restriction. Recovery credit only accrues from triggering subsystem(s).
- merge-gates: EXPLORATORY risk tier cannot merge to production repos regardless of operator level. G6 enforces this as a hard block. G1 remains a soft warning on tier/designation mismatch.
- review: 15 review items identified across contradictions (4), gaps (7), weak mitigations (2), structural observations (2). Tracked in docs/review.md.
