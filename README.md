# Directive Plane (Draft POC)

This repository is a **draft proof-of-concept** exploring a control system for agent-driven software work.

The goal is to test ideas for staying in control as agent velocity increases: clear intent, bounded execution, and human reconstruction of understanding.

## Start here (recommended)

If you are giving feedback, begin with the UI story first:

1. **UI Walkthrough (lead):** `docs/ui-sample-walkthrough.md`  
   The easiest way to understand the concept and react to it quickly.

2. **Compact references (next):**
   - `docs/directive-plane-compact.md`
   - `docs/control-fidelity-protocol-compact.md`

3. **Full documents (deep dive):**
   - `docs/directive-plane.md`
   - `docs/control-fidelity-protocol.md`

## What this repo currently contains

- `src/ui/` — sample cockpit-style web UI with seeded data
- `docs/ui-sample-walkthrough.md` — narrative walkthrough of the UI
- `docs/screenshots/` — screenshots used in the walkthrough
- protocol and framework docs (compact + full versions)

## Run the UI locally

From the repository root:

```bash
cd src/ui
python3 -m http.server 8000
```

Then open: `http://127.0.0.1:8000/index.html`

## Status

This is exploratory work in progress, not a production system.
