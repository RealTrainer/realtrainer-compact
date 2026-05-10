# Ranger Mini Parser (Library POC)

This folder contains a simple Ranger-based parser library prototype for COMPACT.

Current scope:
- parse workout headers (`## Title` and `[date] ## Title`)
- collect `Run` lines under the current workout
- expose parser as a Node module via Ranger `-nodemodule`

## Build

```bash
npm run ranger:build
```

## Smoke test

```bash
npm run ranger:test
```

The smoke test compiles the Ranger source and parses `data/minimonster-canonical.compact`.

## Swift and Kotlin smoke tests

Build parser for Swift:

```bash
npm run ranger:build:swift
```

Run Swift smoke test:

```bash
npm run ranger:test:swift
```

Note: the Swift smoke command includes a small shim file (`ranger_swift_shims.swift`) for JS-like numeric helper symbols expected by current Ranger Swift output. For this parser, current Ranger Swift output can still emit unsupported constructs (for example `splice`/`length`), so the command degrades to source generation + informative message if compile fails.

Build parser for Kotlin:

```bash
npm run ranger:build:kotlin
```

Run Kotlin smoke test (requires `kotlinc`):

```bash
npm run ranger:test:kotlin
```

## COMPACT -> JSON transform

```bash
npm run ranger:json
```

Default output:
- `multiplatform/ranger/dist/minimonster.parsed.json`

Custom input/output:

```bash
node multiplatform/ranger/tools/compact_to_json.mjs <input.compact> <output.json>
```

## PegJS vs Ranger parity JSON

```bash
npm run ranger:compare
```

The parity baseline is now the v2 normalized document (`normalizeCompactText`), not raw PegJS content AST.
Comparison is done with unified `type` values (no separate `sourceType` dimension in the report).

Default outputs:
- `multiplatform/ranger/dist/parity/v2_baseline.json`
- `multiplatform/ranger/dist/parity/ranger_ast.json`
- `multiplatform/ranger/dist/parity/parity_report.json`

## JS vs Swift vs Kotlin parity snapshots

```bash
npm run ranger:parity:targets
```

Default outputs:
- `multiplatform/ranger/dist/parity/ranger_target_js.json`
- `multiplatform/ranger/dist/parity/ranger_target_kotlin.json`
- `multiplatform/ranger/dist/parity/ranger_target_swift.json`

These snapshots use the richer `MINI_TRAINING_PLAN.compact` input by default so target output can be diffed directly.

## NG parser and harness status (2026-05)

Recent NG parser updates in `multiplatform/ranger/src/ng`:

- Source layout is split into:
	- `multiplatform/ranger/src/ng/detectors`
	- `multiplatform/ranger/src/ng/values`
- Parsed value JSON export uses value class serialization (`toDictionary`) in the harness runner.
- Harness supports negated assertions:
	- `Expect not tag <tag>`
	- `Expect not child <index> tag <tag>`
	- `Expect not child <index> string <value>`
	- `Expect not json <path> <value>`
- Numeric ranges support both compact and spaced forms when detector allows it:
	- `10-50`
	- `10 - 50`
- Exercise rows support optional separator style for readability:
	- `Run 4:30/1000m 500m Zone3`
	- `Run ; 4:30/1000m ; 500m ; Zone3`
	- `Run;4:30/1000m;500m;Zone3`

The `;` separator is optional and used mainly to make field grouping clearer for LLM-generated text.

Run NG harness:

```bash
npm run ranger:ng:common:test
```

This compiles `token_slice`, detector module, and parser, then runs
`multiplatform/ranger/test/ng_common_harness.ngtest`.
