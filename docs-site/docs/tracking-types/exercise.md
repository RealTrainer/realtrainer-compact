---
id: exercise
title: Exercise
---

import { EditableCompactExampleBlock } from '@site/src/components/CompactDemo';

Use `Exercise` for single movement lines in COMPACT format.

## Base Structure

`Exercise <name>|<spec> [| <note>]`

Where `<spec>` is typically one of:

- `sets x reps @ load`: `3x8@70kg`
- timed holds: `3x45s`
- side-specific reps: `2x10+10`
- unknown/open values: `2-3x?`

<EditableCompactExampleBlock minHeight={180}>
```compact
Exercise Bench Press|3x8@70kg
Exercise Plank|3x45s,45s,0s
Exercise Dead Bug|2x10+10@bw
Exercise Bulgarian Split Squat|3x10+10@16kg
Exercise Single-leg RDL|2x8+8@20kg
```
</EditableCompactExampleBlock>

## Left / Right Side Representation

Common patterns for bilateral exercises:

- reps per side: `10+10`
- timed holds per side: `20s+37s`
- repeated side pairs in sets: `2x20s+37s,23s+21s`
- add set recovery at the end: `2x20s+37s,23s+21s/60s`

<EditableCompactExampleBlock minHeight={140}>
```compact
Exercise Split Squat|3x10+10@bw
Exercise Side Plank|2x20s+37s,23s+21s/60s
Exercise Single-arm Row|3x12+12@22kg
```
</EditableCompactExampleBlock>

## Notes

- `0kg` is hidden in current UI rendering
- `0s` measured entries can be filtered in UI rendering
- Use the same side format consistently inside one workout block
- If load is omitted, keep unitless reps/time only
