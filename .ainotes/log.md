# AI Notes — Log

## 2026-02-22
- ui-routing: The UI supports ?view=<screen> URL routing, which enables deterministic page-specific screenshots and review links.
- architecture: Compact doc versions (*-compact.md) are token-optimized and preferred for LLM context over full versions.
- ui: app.js follows a store/state/render pattern — seed data in `store`, UI tracking in `state`, innerHTML-based render functions, post-render event wiring via `attachTimelineListeners()`.

