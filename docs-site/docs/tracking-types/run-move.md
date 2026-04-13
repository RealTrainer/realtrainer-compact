---
id: run-move
title: Run / Move
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Use `Run` and `Move` to represent endurance activities, repeats, and movement patterns.

## Basic Structure

`Run [sport] <spec> [@intensity] [/recovery] [| note]`

- **Run** — defaults to running
- **Move** — preferred for non-running (swimming, cycling, etc.)

<CompactExampleBlock>
```compact
Run 5km
Run 30min
Move "vapaauinti" 1000m
Move "pyöräily" 45min
```
</CompactExampleBlock>

## Distance and Time

### Distance Only

<CompactExampleBlock>
```compact
Run 5km
Run 400m
Move "uinti" 1500m
```
</CompactExampleBlock>

### Time Only

<CompactExampleBlock>
```compact
Run 30min
Run 45min
Move "pyöräily" 1h
```
</CompactExampleBlock>

### Distance + Time

<CompactExampleBlock>
```compact
Run 5km 25min
Run 10km 48min
Move "uinti" 1500m 28min
```
</CompactExampleBlock>

### With Quoted Duration

<CompactExampleBlock>
```compact
Run 9km 41'34"
Run 5km 23'15"
```
</CompactExampleBlock>

## Repeats Notation

### Count × Distance

<CompactExampleBlock>
```compact
Run 4x400m
Run 6x200m
Run 3x1km
```
</CompactExampleBlock>

### Sets × Count × Distance

<CompactExampleBlock>
```compact
Run 2x4x200m
Run 3x3x100m
```
</CompactExampleBlock>

### Range Counts

<CompactExampleBlock>
```compact
Run 4-6x200m
Run 2-3x4x100m
```
</CompactExampleBlock>

### Unknown Distance

<CompactExampleBlock>
```compact
Run 10x?
Run 3x?km
```
</CompactExampleBlock>

## Sport Override

Use quotes to specify the sport:

<CompactExampleBlock>
```compact
Move "vapaauinti" 1000m
Move "rintauinti" 500m
Move "pyöräily" 30km
Move "hiihto" 15km
Move "soutu" 2000m
```
</CompactExampleBlock>

## Intensity Patterns

### Percentage

<CompactExampleBlock>
```compact
Run 5km@70%
Run 4x400m@85%
Run 10km@60-70%
```
</CompactExampleBlock>

### Heart Rate (BPM)

<CompactExampleBlock>
```compact
Run 30min@140bpm
Run 5km@130-150bpm
Run 45min@<150bpm
Run 20min@>120bpm
```
</CompactExampleBlock>

### Heart Rate Zones

<CompactExampleBlock>
```compact
Run 45min@Z2
Run 30min@Z3
Run 20min@Z2-Z3
```
</CompactExampleBlock>

### Pace

<CompactExampleBlock>
```compact
Run 5km@5:00/km
Run 10km@4:30-4:45/km
Run 1km@3'45"/km
```
</CompactExampleBlock>

### Pace per 100m (swimming)

<CompactExampleBlock>
```compact
Move "uinti" 400m@1:45/100m
Move "uinti" 100m@1:30-1:35/100m
```
</CompactExampleBlock>

### Swimming Zones (Roman numerals)

<CompactExampleBlock>
```compact
Move "uinti" 400m@II
Move "uinti" 200m@III-IV
Move "uinti" 100m@IV+I
```
</CompactExampleBlock>

### Text Intensity

<CompactExampleBlock>
```compact
Run 5km@easy
Run 10km@tempo
Run 3x1km@threshold
Move "uinti" 400m@tekniikka
```
</CompactExampleBlock>

### With Bodyweight (resisted)

<CompactExampleBlock>
```compact
Run 6x60m@bw
Run 4x100m@80%@bw
```
</CompactExampleBlock>

## Recovery Patterns

### Time Recovery

<CompactExampleBlock>
```compact
Run 6x400m@85%/2min
Run 4x200m@90%/90s
Run 8x100m/60s
```
</CompactExampleBlock>

### Distance Recovery

<CompactExampleBlock>
```compact
Run 6x400m/100m
Run 4x800m/200m
```
</CompactExampleBlock>

### Recovery Range

<CompactExampleBlock>
```compact
Run 5x400m/2-3min
Run 6x200m/60-90s
```
</CompactExampleBlock>

### Text Recovery

<CompactExampleBlock>
```compact
Run 4x400m/hölkkä
Run 6x200m/kävely
```
</CompactExampleBlock>

### Swimming Notation

<CompactExampleBlock>
```compact
Move "uinti" 8x50m T:20s
Move "uinti" 4x100m L:30s
```
</CompactExampleBlock>

## Steps Tracking

<CompactExampleBlock>
```compact
Run 30min 8228steps
Run 5km 6500steps
Run 45min 3.5km 9500steps
```
</CompactExampleBlock>

## Custom Fields

<CompactExampleBlock>
```compact
Move "uinti" 200m [[käsiräpylät]]
Move "uinti" 400m [[pullbuoy]] [[käsiräpylät]]
Run 5km [[maasto]]
```
</CompactExampleBlock>

## Notes

<CompactExampleBlock>
```compact
Run 5km@easy | recovery jog
Move "uinti" 1000m | technique focus
Run 4x400m@85%/2min | track session
```
</CompactExampleBlock>

## Bilateral Distance

<CompactExampleBlock>
```compact
Run 20+20m
Run 3x20+20m
Move "karioka" 4x15+15m
```
</CompactExampleBlock>

## Complete Examples

### Basic Endurance Run

<CompactExampleBlock>
```compact
[2026-04-10] ## Easy Run
Run 8km 42min@Z2 | morning jog
```
</CompactExampleBlock>

### Track Session

<CompactExampleBlock>
```compact
[2026-04-10] ## Speed Work
Time 15min | warm-up jog
Run 6x400m@85%/2min
Time 10min | cool-down
```
</CompactExampleBlock>

### Swimming with Splits

<CompactExampleBlock>
```compact
[2026-04-10] ## Pool Session
Move "vapaauinti" 400m@II | warm-up
Move "rintauinti" 8x50m@III/20s
> 50m 52s
> 50m 51s
> 50m 53s
Move "vapaauinti" 200m@I | cool-down
```
</CompactExampleBlock>

### Hill Repeats

<CompactExampleBlock>
```compact
[2026-04-10] ## Hills
Time 20min | jog to hill
Run 8x150m@ylämäki/kävely alas
Time 15min | jog home
```
</CompactExampleBlock>

## Tips

- Use `Move` with sport in quotes for non-running activities
- Pace format: `5:00/km` or `3'45"/km` (tick-quote)
- Swimming uses Roman numerals (I-V) for intensity zones
- Recovery can be time (`/2min`), distance (`/100m`), or text (`/hölkkä`)
- Add splits with `>` prefix for detailed tracking
