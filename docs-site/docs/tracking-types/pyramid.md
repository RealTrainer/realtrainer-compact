---
id: pyramid
title: Pyramid
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Use `Pyramid` for set lists where reps/load change across sets.

## Base Structure

`Pyramid <name>|<set1>,<set2>,<set3>...`

Typical set forms:

- `reps x load`: `12x60`
- reps only: `15`
- set-rep-load grouped: `3x5x80`

<CompactExampleBlock>
```compact
Pyramid Bench Press|12x60,10x70,8x75kg
Pyramid Calf Raise|15,15,15
Pyramid Back Squat|3x5x80,2x2x85kg
```
</CompactExampleBlock>

## Left / Right in Pyramid Context

If movement is unilateral, keep the side structure explicit in the set values.

<CompactExampleBlock>
```compact
Pyramid Split Squat|10+10x20,8+8x22.5,6+6x25kg
Pyramid Side Plank|30s/30s,35s/30s,35s/35s
```
</CompactExampleBlock>

Weight can be present per set or omitted.
