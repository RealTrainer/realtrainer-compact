---
id: records
title: Records (Max / Best)
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Use `Max` for strength records (1RM, 3RM, etc.) and `Best` for other personal records.

## Max — Strength Records

### Basic Structure

`Max <exercise>|<RM-type>:<weight><unit> [PR] [@calculation]`

<CompactExampleBlock>
```compact
Max Kyykky|1RM:150kg
Max Penkkipunnerrus|1RM:100kg
Max Maastaveto|1RM:180kg
```
</CompactExampleBlock>

### RM Types

| Type | Meaning |
|------|---------|
| `1RM` | 1 Rep Max (actual) |
| `3RM` | 3 Rep Max |
| `5RM` | 5 Rep Max |
| `eRM` | Estimated 1RM (calculated) |

<CompactExampleBlock>
```compact
Max Kyykky|1RM:150kg
Max Kyykky|3RM:140kg
Max Kyykky|5RM:130kg
Max Penkkipunnerrus|eRM:105kg
```
</CompactExampleBlock>

### Personal Record Flag

Add `PR` to mark a new personal record:

<CompactExampleBlock>
```compact
Max Kyykky|1RM:155kg PR
Max Penkkipunnerrus|1RM:102.5kg PR
Max Maastaveto|3RM:160kg PR
```
</CompactExampleBlock>

### Estimated Max with Calculation

Show how eRM was calculated with `@reps×weight`:

<CompactExampleBlock>
```compact
Max Penkkipunnerrus|eRM:105kg@5x95kg
Max Kyykky|eRM:160kg@3x150kg
```
</CompactExampleBlock>

### Imperial Units

<CompactExampleBlock>
```compact
Max Squat|1RM:330lb
Max Bench Press|1RM:225lb PR
```
</CompactExampleBlock>

## Best — Other Records

### Basic Structure

`Best <event>|<result> [PR]`

<CompactExampleBlock>
```compact
Best 100m|11.2s
Best Cooper|2850m
Best Lankku|3:45
```
</CompactExampleBlock>

### Time-Based Records

<CompactExampleBlock>
```compact
Best 100m|11.25s
Best 400m|52.8s
Best 1500m|4:15
Best 5km|19:45
Best Maraton|3:28:15
```
</CompactExampleBlock>

### Distance-Based Records

<CompactExampleBlock>
```compact
Best Cooper|2950m
Best Pituushyppy|6.45m
Best Kuulantyöntö|14.2m
Best Keihäs|65.5m
```
</CompactExampleBlock>

### Duration-Based Records

<CompactExampleBlock>
```compact
Best Lankku|4:30
Best Wall sit|2:15
Best Dead hang|1:45
```
</CompactExampleBlock>

### Event with Equipment

<CompactExampleBlock>
```compact
Best Kuulantyöntö 4kg|12.5m
Best Kuulantyöntö 7.26kg|10.2m
Best Keihäs 600g|55.0m
```
</CompactExampleBlock>

### Personal Record Flag

<CompactExampleBlock>
```compact
Best 100m|11.15s PR
Best Cooper|3050m PR
Best Lankku|5:00 PR
```
</CompactExampleBlock>

## Complete Examples

### Strength Test Day

<CompactExampleBlock>
```compact
[2026-04-10] ## Max Testing
Phase1 Warm-up
Time 10min | Bike + mobility

Phase2 Squat Max
Exercise Kyykky|3x5@60kg
Exercise Kyykky|3x3@80kg
Exercise Kyykky|1x1@100kg
Exercise Kyykky|1x1@120kg
Exercise Kyykky|1x1@140kg
Max Kyykky|1RM:145kg PR

Phase3 Bench Max
Exercise Penkkipunnerrus|3x5@40kg
Exercise Penkkipunnerrus|3x3@60kg
Exercise Penkkipunnerrus|1x1@80kg
Max Penkkipunnerrus|1RM:92.5kg
```
</CompactExampleBlock>

### Speed Test Day

<CompactExampleBlock>
```compact
[2026-04-10] ## Sprint Testing
Phase1 Warm-up
Time 20min | Drills + accelerations

Phase2 Testing
Run 3x60m@95%/5min | openers
Run 100m@max
Best 100m|11.45s PR

Run 2x5min rest
Run 200m@max
Best 200m|24.2s
```
</CompactExampleBlock>

### Tracking eRM Progress

<CompactExampleBlock>
```compact
[2026-04-10] ## Volume Day
Exercise Kyykky|5x5@120kg
Max Kyykky|eRM:150kg@5x120kg

[2026-04-17] ## Volume Day
Exercise Kyykky|5x5@122.5kg
Max Kyykky|eRM:153kg@5x122.5kg
```
</CompactExampleBlock>

## Tips

- Use `Max` only for lifting exercises (uses RM system)
- Use `Best` for all other records (running, throwing, holds)
- `eRM` is useful for tracking strength without true maxing
- Add `PR` flag when it's a new personal record
- Time format for `Best`: use `m:ss` or just `Xs` for seconds
