---
id: left-right-side-patterns
title: Left / Right Side Patterns
---

import Link from '@docusaurus/Link';
import { EditableCompactExampleBlock } from '@site/src/components/CompactDemo';

Use left/right patterns when the parser needs separate values for both sides of the body.

## Core Rule

The main bilateral separator is `+`.

Supported exercise-side patterns from the grammar include:

- bilateral reps: `10+10`
- bilateral timed holds: `20s+37s`
- set-based bilateral reps: `3x10+10@16kg`
- set-based bilateral timed values: `3x30s+30s`
- measured duration lists with side pairs: `2x20s+37s,23s+21s/60s`

## Standard Examples

<EditableCompactExampleBlock minHeight={170}>
```compact
Exercise Bulgarian Split Squat|3x10+10@16kg
Exercise Single-arm Row|3x12+12@22kg
Exercise Side Plank|2x20s+37s,23s+21s/60s
Exercise Bilateraali ilman painoa|15+15
```
</EditableCompactExampleBlock>

## Timed and Measured Bilateral Patterns

The grammar treats `20s+37s` and `23+28s` as bilateral measured durations.

<EditableCompactExampleBlock minHeight={150}>
```compact
Exercise Side Plank|20s+37s
Exercise Side Plank|3x30s+30s
Exercise Side Plank|2x20s+37s,23s+21s/60s
```
</EditableCompactExampleBlock>

## Per-Side Modifier

The grammar also supports explicit per-side modifiers such as `/side`, `/per side`, `/jalka`, `/käsi`, and `/each`.

<EditableCompactExampleBlock minHeight={140}>
```compact
Exercise Step-up|3x10/side@20kg
Exercise Reverse Lunge|2x8/per side@bw
Exercise Hip Airplane|2x6/jalka
```
</EditableCompactExampleBlock>

## Important Notes

- Use `+` when both sides have their own numeric value in the same spec.
- Keep one bilateral style consistent within one workout block.
- `MeasuredDurationList` is important for holds and rehab work: `20s+37s,23s+21s` is a first-class grammar form, not a workaround.
- Bilateral notation also exists in `Pyramid` patterns, but that has its own page.

## Related Formats

- <Link to="/docs/tracking-types/exercise">Exercise</Link>
- <Link to="/docs/tracking-types/exercise-notation">Exercise Notation Patterns</Link>
- <Link to="/docs/tracking-types/recovery">Recovery</Link>
- <Link to="/docs/tracking-types/pyramid">Pyramid</Link>