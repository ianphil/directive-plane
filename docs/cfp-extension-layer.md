# CFP Extension Layer Specification

> The formal mechanism by which new capabilities attach to the base Control Fidelity Protocol without modifying it. The base CFP is a stable core; extensions plug in through declared extension points under a versioned contract.

**Status:** Draft
**Date:** 2026-02-23
**Targets:** Control Fidelity Protocol (base)

---

## Table of Contents

1. [Purpose and Scope](#1-purpose-and-scope)
2. [Extension Point Registry](#2-extension-point-registry)
3. [Extension Manifest](#3-extension-manifest)
4. [Composition Rules](#4-composition-rules)
5. [Base CFP Contract](#5-base-cfp-contract)
6. [Activation Mechanism](#6-activation-mechanism)
7. [Extension Lifecycle](#7-extension-lifecycle)

---

## 1. Purpose and Scope

The base CFP defines a single-agent state machine, a fixed set of gate predicates, a canonical artifact schema, and a risk tiering table. That core is intentionally minimal — it captures only the invariant mechanics that apply to every change, regardless of orchestration strategy, operator capability model, or deployment context.

Extensions add capability to the base CFP without forking it. They are declared artifacts that follow a versioned contract, attach at defined injection points, and compose by explicit rules. The base CFP engine loads the extension manifests declared on an IC and wires up the augmented flow at runtime. No extension may remove or modify a base CFP element.

This document specifies:

- Where extensions may attach (the extension point registry)
- What every extension must declare (the manifest schema)
- How multiple extensions coexist (composition rules)
- What the base CFP guarantees to extensions (the stability contract)
- How an IC activates extensions (the activation mechanism)
- How extensions evolve over time (lifecycle)

The first concrete extension defined under this layer is the Multi-Agent CFP Extension; see [Multi-Agent CFP Extension](multi-agent-cfp.md).

---

## 2. Extension Point Registry

Extension points are named hooks in the base CFP at which an extension may inject additional states, gates, artifacts, error states, or gauges. Each extension point has a defined position in the state machine, a declared interface, and a stability guarantee.

### 2.1 State Injection Points

Extensions may inject new states and their associated transitions at the following positions. Injected states do not replace the base states they border; they are inserted between them.

| Hook ID | Position | Permitted Injections |
|---|---|---|
| `POST_G1` | After `G1` passes, before `PLANNED` becomes the active state | New state(s) interposed between `INTENT` and `PLANNED` |
| `POST_G4` | After `G4` passes, before `NARRATED` becomes the active state | New state(s) interposed between `EXECUTING` and `NARRATED` |
| `POST_G5` | After `G5` passes, before `UNDERSTOOD` becomes the active state | New state(s) interposed between `NARRATED` and `UNDERSTOOD` |

Each injected state must declare:

- A unique state name (namespaced to the extension, e.g., `MA.DECOMPOSED`)
- Entry conditions (gate predicate(s) that must pass to enter the state)
- Exit conditions (gate predicate(s) that must pass to leave the state)
- Owner (the role responsible for work in this state)

### 2.2 Artifact Schema Extension Slots

The base artifact schemas (IC, EE, RP) expose named extension slots. An extension may add fields to a slot but may not remove or rename base fields.

| Artifact | Slot Name | Base Fields (Frozen) | Extension May Add |
|---|---|---|---|
| IC | `ic.extension_fields` | `change_id`, `operator_currency`, `risk_tier`, `goal`, `scope`, `constraints`, `non_goals`, `acceptance_criteria`, `invariants_in_scope`, `operator` | Any additional fields, keyed under the extension namespace |
| EE | `ee.extension_fields` | `planned_modifications`, `anticipated_side_effects`, `test_plan`, `invariant_declarations`, `estimated_magnitude`, `actual_modifications`, `unmapped_modifications`, `unplanned_modifications`, `acceptance_results`, `invariant_results` | Any additional fields, keyed under the extension namespace |
| RP | `rp.extension_fields` | `narrative`, `challenges`, `attestation` | Any additional fields, keyed under the extension namespace |

An extension may also register entirely new artifact types (see §3 manifest schema). New artifact types are owned by the extension and do not affect the base schema.

### 2.3 Error State Registration

Extensions may register new error states. Each registered error state must declare:

- A unique error state name (namespaced to the extension)
- The trigger condition (predicate or gate that causes entry)
- The recovery path (sequence of actions required to exit the error state)
- Which base state the protocol resumes from after successful recovery

### 2.4 Gauge Registration

Extensions may register new observability gauges. Each registered gauge must declare:

- A unique gauge name (namespaced to the extension)
- What it measures (one sentence)
- How it is collected (data source and method)
- The degradation signal (the observable pattern indicating the gauge is trending adversely)
- Failure thresholds (Yellow / Orange / Red levels, even if initially placeholder)

Registered gauges are surfaced alongside base gauges in the instrumentation reference. See [Instrumentation](instrumentation.md) for the base gauge set and threshold framework.

### 2.5 Risk Tier Parameter Extension

The base CFP risk tiering table defines parameters for three tiers (CONSEQUENTIAL, PROFESSIONAL, EXPLORATORY). An extension may add new rows (parameters) to this table. Extensions may not modify existing row values in the base table.

Each new risk tier parameter must declare:

- Parameter name
- Definition
- Values for each tier (CONSEQUENTIAL, PROFESSIONAL, EXPLORATORY)
- Which gate(s) evaluate this parameter

---

## 3. Extension Manifest

Every extension must provide a manifest — a structured declaration of its identity, its bindings to extension points, and its compatibility contract. The manifest is the single source of truth the base CFP engine uses to wire up the augmented flow.

### 3.1 Manifest Schema

```yaml
extension:
  id: <string>                  # Unique extension identifier (e.g., multi-agent)
  version: <semver>             # Extension version (e.g., 1.0.0)
  target_cfp_version: <semver>  # Minimum base CFP version this extension requires
  status: DRAFT | STABLE | DEPRECATED

  # Human-readable description
  description: <string>

  # Extension points this extension binds to
  bindings:
    state_injection_points:     # List of POST_G1 | POST_G4 | POST_G5
      - hook: <hook_id>
        injects:
          - state: <namespaced_state_name>
            entry_gate: <namespaced_gate_id>
            exit_gate: <namespaced_gate_id>
            owner: <role>

    artifact_slot_additions:    # Fields added to base artifact slots
      - artifact: IC | EE | RP
        slot: <slot_name>
        fields:
          - name: <namespaced_field_name>
            type: <type>
            required: true | false
            description: <string>

    new_artifact_types:         # Entirely new artifact types registered by this extension
      - type_name: <namespaced_artifact_type>
        description: <string>
        schema_ref: <section_ref>

    gates:                      # New gate predicates registered by this extension
      - id: <namespaced_gate_id>
        from_state: <state>
        to_state: <state>
        predicate_ref: <section_ref>

    error_states:               # New error states registered by this extension
      - name: <namespaced_error_state>
        trigger: <predicate>
        recovery_path: <description>
        resumes_from: <base_or_extension_state>

    gauges:                     # New gauges registered by this extension
      - name: <namespaced_gauge_name>
        measures: <string>
        collection: <string>
        degradation_signal: <string>
        thresholds:
          yellow: <condition>
          orange: <condition>
          red: <condition>

    risk_tier_parameters:       # New rows added to the risk tiering table
      - parameter: <name>
        definition: <string>
        values:
          CONSEQUENTIAL: <value>
          PROFESSIONAL: <value>
          EXPLORATORY: <value>
        evaluated_at: [<gate_id>, ...]

  # Dependencies on other extensions (if any)
  dependencies:
    - extension_id: <string>
      min_version: <semver>

  # Optional: gates on which this extension imposes additional checks
  # to base gates (adds predicates; does not replace base predicates)
  base_gate_additions:
    - gate: G1 | G2 | G3 | G4 | G5 | G6
      additional_predicate_ref: <section_ref>
      description: <string>
```

### 3.2 Manifest Validation Rules

At `G1`, the base CFP engine validates every extension declared on the IC:

1. Extension ID and version exist in the known extension registry.
2. `target_cfp_version` is compatible with the running base CFP version.
3. All declared dependencies are present and version-compatible.
4. No two active extensions bind to the same state injection hook with conflicting state names (conflict detection; see §4.2).
5. The combined set of injected states produces a valid, acyclic state machine.

If any manifest validation fails, `G1` returns `FALSE` and the error `EXTENSION_INCOMPATIBLE` is raised.

---

## 4. Composition Rules

When multiple extensions are active on a single IC, their contributions must be composed into a single coherent augmented state machine. The following rules govern that composition.

### 4.1 Namespace Isolation

Every element registered by an extension — states, gates, artifacts, error states, gauges — must be prefixed with the extension's namespace identifier. Namespace identifiers are assigned at extension registration and are globally unique.

Examples:

| Extension | Namespace | Example Gate ID | Example State Name |
|---|---|---|---|
| `multi-agent@1.0` | `MA` | `MA.G1a` | `MA.DECOMPOSED` |
| A hypothetical future `policy-check` extension | `PC` | `PC.G1x` | `PC.POLICY_REVIEWED` |

Base CFP elements (`G1`–`G6`, `INTENT`, `PLANNED`, etc.) are in the root namespace and may not be claimed by extensions.

### 4.2 Conflict Detection

A conflict occurs when two active extensions attempt to bind to the same injection hook and inject states that would produce an ambiguous ordering in the augmented state machine. The engine detects conflicts at `G1` manifest validation.

Conflict types:

| Conflict Type | Definition | Resolution |
|---|---|---|
| **State ordering conflict** | Two extensions inject states at the same hook and neither declares a dependency on the other | `G1` fails; operator must declare load order or resolve the conflict by extension configuration |
| **Gate predicate conflict** | Two extensions add additional predicates to the same base gate that are mutually exclusive | `G1` fails; reported as `EXTENSION_GATE_CONFLICT` |
| **Artifact field conflict** | Two extensions add a field with the same name to the same artifact slot | `G1` fails; reported as `EXTENSION_ARTIFACT_CONFLICT` |

### 4.3 Load Order and Precedence

When two extensions bind to the same injection hook without a conflict, load order determines the ordering of their injected states. Load order is declared on the IC in the `extensions` field (see §6). Extensions listed earlier are injected closer to the base state.

If an extension declares a dependency on another extension, the dependency is always loaded before the dependent, regardless of IC listing order.

### 4.4 Extension Dependency Graph

Extensions may depend on other extensions. The dependency graph must be acyclic. The engine validates the dependency graph at manifest resolution and fails `G1` with `EXTENSION_CYCLE_DETECTED` if a cycle is found.

An extension that declares a dependency inherits the dependent extension's namespace in the state machine — it may reference the dependency's states and gates in its own manifest. It may not modify them.

---

## 5. Base CFP Contract

The following elements of the base CFP are frozen. Extensions are built against these guarantees; no future change to the base CFP may alter them without a major version increment.

### 5.1 Single-Agent State Machine (Stable)

The base single-agent state machine is:

```
INTENT ─G1→ PLANNED ─G2→ APPROVED ─G3→ EXECUTING ─G4→ NARRATED ─G5→ UNDERSTOOD ─G6→ MERGED
```

This sequence, including the state names and gate identifiers, is stable. Extensions may inject states between existing transitions (at declared injection points); they may not rename, remove, or reorder base states.

### 5.2 Gate Predicate Signatures (Stable)

Each base gate (G1–G6) has a stable signature: a named predicate that accepts the current IC and protocol context and returns `TRUE` or `FALSE`. Extensions may add predicates to a base gate (the gate returns `TRUE` only when both the base predicate and all extension-added predicates return `TRUE`); they may not replace the base predicate.

### 5.3 Artifact Base Fields (Frozen)

The fields listed under the `Base Fields (Frozen)` column in §2.2 are immutable. No extension may rename, remove, retype, or reinterpret them. Extensions add fields; they never subtract them.

### 5.4 Versioning Scheme

The base CFP follows semantic versioning:

| Increment | Trigger |
|---|---|
| **Patch** (x.y.**z**) | Clarifications, editorial corrections, non-normative additions |
| **Minor** (x.**y**.0) | New extension points added; new optional base fields; backward-compatible base changes |
| **Major** (**x**.0.0) | Any change to stable state machine, gate signatures, or frozen artifact fields |

An extension declares a minimum `target_cfp_version`. The engine rejects extensions whose `target_cfp_version` exceeds the running base CFP version. Minor version increments are backward-compatible: an extension targeting `1.0` runs on `1.2` without modification.

---

## 6. Activation Mechanism

### 6.1 Declaring Extensions on an IC

Extensions are activated per-change by declaring them in the `extensions` field of the IC. This field is evaluated at `G1`.

```yaml
change_id: CHG-2026-0047
risk_tier: PROFESSIONAL
extensions:
  - id: multi-agent
    version: "1.0"
goal:
  - clause_id: CL-001
    text: "Refactor the payments module to use the new gateway client."
# ... remainder of IC fields
```

The `extensions` field is an ordered list. Load order follows the list order (see §4.3).

### 6.2 G1 Extension Resolution

When `G1` evaluates an IC with a non-empty `extensions` field, it executes the following additional checks before the base `G1` predicate passes:

1. For each declared extension: manifest exists and version is resolvable.
2. `target_cfp_version` compatibility check for each extension.
3. Dependency graph resolution (all dependencies present and loaded in correct order).
4. Conflict detection across all active extensions.
5. Construction of the augmented state machine: the engine merges all injected states and gates into the base flow.
6. Validation that the resulting augmented state machine is a valid, acyclic directed graph.

If all checks pass, `G1` appends the resolved `augmented_state_machine` to the IC as a read-only field. Subsequent gates operate against the augmented machine.

### 6.3 Runtime Behavior

Once the augmented state machine is resolved, the protocol engine routes state transitions through both base and extension gates. The engine:

- Evaluates base gate predicates as defined in the base CFP.
- Evaluates extension-injected gate predicates as defined in the relevant extension manifest.
- Evaluates base gate additional predicates contributed by active extensions.
- Surfaces all gate results in the protocol audit trail.

An operator interacting with an augmented flow sees the extension states and gates clearly labelled with their extension namespace. The base CFP states and gates are always visually distinct from extension-contributed elements.

---

## 7. Extension Lifecycle

### 7.1 Extension Status States

| Status | Meaning |
|---|---|
| `DRAFT` | Extension is under development. May be activated only on EXPLORATORY risk tier. Not suitable for production use. |
| `STABLE` | Extension has been reviewed, conflict-tested, and approved for use on any risk tier permitted by its own access rules. |
| `DEPRECATED` | Extension is scheduled for removal. New ICs may not declare a deprecated extension. Existing in-flight changes using the extension may complete. |
| `RETIRED` | Extension is no longer loaded by the engine. Any IC declaring it fails `G1` with `EXTENSION_RETIRED`. |

### 7.2 Versioning and Compatibility

Extensions follow the same semantic versioning convention as the base CFP (§5.4):

- **Patch** — bug fixes, clarifications. Backward-compatible. Existing ICs specifying `x.y.*` pick up patch releases automatically.
- **Minor** — new optional fields or new optional extension points claimed. Backward-compatible with the same major version of the base CFP.
- **Major** — breaking change. Existing ICs pinned to an older major version continue to resolve against that version. The engine may run multiple major versions of an extension concurrently during a migration window.

### 7.3 Deprecation and Migration

When an extension is deprecated:

1. The extension registry records a `deprecated_at` date and a `sunset_date`.
2. `G1` emits a non-blocking advisory warning for any IC activating a deprecated extension.
3. A migration guide must be published alongside the deprecation notice, describing how ICs and in-flight changes should transition to the replacement.
4. On or after the `sunset_date`, the extension transitions to `RETIRED`.

### 7.4 Breaking Changes to the Base CFP

When a base CFP major version increment occurs (§5.4), all extensions targeting the previous major version must be reviewed for compatibility. Extensions that are not updated before the migration deadline are treated as `DEPRECATED` for the new major version and `RETIRED` one minor version cycle later.
