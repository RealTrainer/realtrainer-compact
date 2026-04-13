---
id: circuit
title: Circuit / Superset
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Use `Circuit` or `Superset` for multiple exercises performed in rotation.

## Basic Structure

```
Circuit|<rounds>[/<recovery>] [| note]
> Exercise1 spec
> Exercise2 spec
...
```

Circuit items use `>` prefix and simplified exercise specs.

<CompactExampleBlock>
```compact
[2026-04-10] ## Full Body Circuit
Circuit|3
> Penkkipunnerrus 8@80kg
> Kyykky 12@60kg
> Soutu 10@50kg
> Lankku 30s
```
</CompactExampleBlock>

## Circuit vs Superset

Both keywords work identically — use whichever fits your training style:

- **Circuit** — typically 3+ exercises, full body or metabolic
- **Superset** — typically 2 exercises, often antagonist pairs

<CompactExampleBlock>
```compact
Superset|4
> Hauiskääntö 10@12kg
> Ojentajapunnerrus 10@12kg
```
</CompactExampleBlock>

## Round Recovery

Add recovery time between rounds with `/<time>`:

<CompactExampleBlock>
```compact
Circuit|4/2min
> Kyykky 15
> Punnerrus 12
> Vatsarutistus 20
```
</CompactExampleBlock>

<CompactExampleBlock>
```compact
Circuit|3/90s | AMRAP style
> Burpees 10
> Box jumps 8
> Kettlebell swings 15@24kg
```
</CompactExampleBlock>

## Circuit Item Specs

Circuit items support simplified exercise notation:

| Pattern | Example | Meaning |
|---------|---------|---------|
| Reps only | `> Push-ups 15` | 15 reps |
| Reps + weight | `> Squat 10@60kg` | 10 reps at 60kg |
| Sets × reps | `> Rows 3x8` | 3 sets of 8 |
| Sets × reps + weight | `> Bench 3x8@70kg` | 3×8 at 70kg |
| Duration | `> Plank 45s` | 45 second hold |
| Bilateral | `> Lunges 10+10` | 10 per side |
| Bilateral + weight | `> Step-ups 8+8@20kg` | 8 per side at 20kg |

<CompactExampleBlock>
```compact
Circuit|3/60s
> Kyykky 12@bodyweight
> Punnerrus 10
> Askelkyykky 8+8
> Lankku 30s
```
</CompactExampleBlock>

## Exercise Recovery

Individual exercises can have recovery with `/`:

<CompactExampleBlock>
```compact
Circuit|4
> Penkkipunnerrus 8@80kg/30s
> Kulmasoutu 10@60kg/30s
> Pystypunnerrus 8@40kg/30s
```
</CompactExampleBlock>

## Custom Fields

Circuit items support custom fields like regular exercises:

<CompactExampleBlock>
```compact
Circuit|3
> Penkkipunnerrus 8@70kg [[Tempo:3010]]
> Kyykky 10@80kg [[Depth:full]]
```
</CompactExampleBlock>

## Notes on Items

Add notes after pipe:

<CompactExampleBlock>
```compact
Circuit|3
> Hauiskääntö 12@10kg | slow eccentric
> Ojentajapunnerrus 12@10kg | pause at bottom
```
</CompactExampleBlock>

## EMOM / AMRAP Style

For time-based circuits, combine with `Time`:

<CompactExampleBlock>
```compact
[2026-04-10] ## EMOM 20
Time 20min | Every minute on the minute
Circuit|20
> Burpees 5
> Kettlebell swings 10@24kg
```
</CompactExampleBlock>

<CompactExampleBlock>
```compact
[2026-04-10] ## AMRAP 15
Time 15min | As many rounds as possible
Circuit|?
> Air squats 15
> Push-ups 10
> Sit-ups 10
```
</CompactExampleBlock>

## Nested in Phases

Circuits work well inside workout phases:

<CompactExampleBlock>
```compact
[2026-04-10] ## Gym Session
Phase1 Warm-up
Time 10min | Bike

Phase2 Strength
Exercise Kyykky|4x6@100kg
Exercise Maastaveto|3x5@120kg

Phase3 Finisher
Circuit|3/60s
> Lunges 10+10
> Mountain climbers 20
> Plank 30s
```
</CompactExampleBlock>

## Tips

- Use `Circuit` for 3+ exercises, `Superset` for pairs
- Round recovery `/2min` is between full rounds, not exercises
- Keep circuit item notation simple — use full `Exercise` lines for complex specs
- `?` for rounds means "as many as completed" (AMRAP style)
