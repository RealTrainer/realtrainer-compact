---
id: interval
title: Interval
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Use `Interval` for structured repeat workouts with defined intensity and recovery.

## Basic Structure

`Interval <count>x<distance>@<intensity>/<recovery>`

<CompactExampleBlock>
```compact
[2026-04-10] ## Track Session
Time 15min | Warm-up jog
Interval 6x400m@85%/2min
Time 10min | Cool-down
```
</CompactExampleBlock>

## Distance Units

Intervals support various distance and time units:

<CompactExampleBlock>
```compact
Interval 4x400m@80%/2min
Interval 5x1km@Z4/3min
Interval 8x200m@90%/90s
Interval 3x3min@threshold/2min
```
</CompactExampleBlock>

## Intensity Patterns

### Percentage

<CompactExampleBlock>
```compact
Interval 6x400m@80%/2min
Interval 4x800m@85-90%/3min
```
</CompactExampleBlock>

### Percentage Range

<CompactExampleBlock>
```compact
Interval 5x300m@75-80%/90s
Interval 4x1km@80-85%/3min
```
</CompactExampleBlock>

### Heart Rate Zones

<CompactExampleBlock>
```compact
Interval 5x1km@Z4/3min
Interval 6x400m@Z3/2min
```
</CompactExampleBlock>

### Text Intensity

<CompactExampleBlock>
```compact
Interval 6x200m@Ylämäki/2min
Interval 4x3min@threshold/2min
Interval 8x100m@max/3min
```
</CompactExampleBlock>

## Recovery Patterns

### Single Value

<CompactExampleBlock>
```compact
Interval 6x400m@85%/2min
Interval 8x200m@90%/90s
```
</CompactExampleBlock>

### Recovery Range

<CompactExampleBlock>
```compact
Interval 5x800m@80%/2-3min
Interval 4x400m@85%/90-120s
```
</CompactExampleBlock>

## Time-Based Intervals

Use minutes instead of distance:

<CompactExampleBlock>
```compact
Interval 5x3min@Z4/2min
Interval 4x5min@threshold/3min
Interval 6x90s@90%/90s
```
</CompactExampleBlock>

## With Notes

Add context after the interval:

<CompactExampleBlock>
```compact
Interval 6x3min@Ylämäki/2min recovery jog
Interval 4x400m@85%/2min felt strong
```
</CompactExampleBlock>

## Complete Workout Examples

### Classic Track Session

<CompactExampleBlock>
```compact
[2026-04-10] ## Track 6x400m
Phase1 Warm-up
Time 15min | Easy jog + drills

Phase2 Intervals
Interval 6x400m@85%/2min

Phase3 Cool-down
Time 10min | Easy jog
```
</CompactExampleBlock>

### Hill Repeats

<CompactExampleBlock>
```compact
[2026-04-10] ## Hill Session
Time 20min | Jog to hill
Interval 8x200m@Ylämäki/2min jog down
Time 15min | Jog home
```
</CompactExampleBlock>

### Threshold Intervals

<CompactExampleBlock>
```compact
[2026-04-10] ## Tempo Work
Time 15min | Warm-up
Interval 4x1km@threshold/90s
Time 10min | Cool-down
```
</CompactExampleBlock>

### Swimming Intervals

<CompactExampleBlock>
```compact
[2026-04-10] ## Pool Intervals
Move "uinti" 400m | Warm-up
Interval 8x50m@85%/30s
Interval 4x100m@80%/45s
Move "uinti" 200m | Cool-down
```
</CompactExampleBlock>

## Interval vs Run

Use **Interval** when:
- Structured repeats with same distance
- Defined intensity target
- Recovery between efforts

Use **Run/Move** when:
- Single continuous effort
- Multiple distances in one set (like `2x4x200m`)
- Need splits tracking

<CompactExampleBlock>
```compact
# Interval style - same repeat
Interval 6x400m@85%/2min

# Run style - varied set structure
Run 2x4x200m@90%/90s/5min
```
</CompactExampleBlock>

## Tips

- Recovery unit must match context (`/2min` vs `/90s`)
- Zones (Z1-Z5) map to heart rate training zones
- Text intensity like `Ylämäki` is flexible
- Use `Phase` to organize warm-up / main / cool-down
