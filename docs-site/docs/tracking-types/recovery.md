---
id: recovery
title: Recovery
---

import Link from '@docusaurus/Link';
import { EditableCompactExampleBlock } from '@site/src/components/CompactDemo';

Use recovery suffixes when the exercise spec needs explicit rest timing.

## Core Rule

Recovery is appended after the exercise spec with `/...`.

Common grammar-supported forms:

- single seconds: `/60s`
- single minutes: `/2min`
- range in seconds: `/5-10s`
- range in minutes: `/2-3min`
- unitless value, interpreted as seconds: `/15`

## Basic Recovery Examples

<EditableCompactExampleBlock minHeight={150}>
```compact
Exercise Side Plank|2x20s+37s,23s+21s/60s
Exercise Farmers Walk|3x40m/2min@2x32kg
Exercise Wall Sit|4x45s/30s
```
</EditableCompactExampleBlock>

## Recovery Ranges

The grammar supports both exact recovery and ranges.

<EditableCompactExampleBlock minHeight={140}>
```compact
Exercise Band Pull-Apart|3x20/15-20s
Exercise Isometric Split Squat|3x30s+30s/45-60s
Exercise Carry Drill|4x20m/1-2min@2x20kg
```
</EditableCompactExampleBlock>

## Important Notes

- Recovery belongs after the spec, not inside the note text.
- Unitless recovery like `/15` is allowed and treated as seconds by the parser.
- Distance-based exercises can place recovery before weight, for example `3x40m/2min@2x32kg`.
- Recovery also appears in interval and run syntax, but this page focuses on `Exercise` notation.

## Related Formats

- <Link to="/docs/tracking-types/exercise">Exercise</Link>
- <Link to="/docs/tracking-types/exercise-notation">Exercise Notation Patterns</Link>
- <Link to="/docs/tracking-types/left-right-side-patterns">Left / Right Side Patterns</Link>