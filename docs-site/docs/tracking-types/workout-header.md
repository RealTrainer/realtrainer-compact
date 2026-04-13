---
id: workout-header
title: Workout Header
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

Every COMPACT workout starts with a header line. The header can include a date, a database ID, and/or a title.

## Basic Structure

`[<date>#<id>] ## <title>`

All parts are optional:
- `[date]` — when the workout occurred
- `#id` — database identifier for the entry
- `## Title` — human-readable workout name

<CompactExampleBlock>
```compact
[2026-04-10#w001] ## Morning Strength
Exercise Bench Press|3x8@70kg
Exercise Row|3x10@60kg
```
</CompactExampleBlock>

## Date Formats

COMPACT supports multiple date/period formats:

### ISO Date (most common)

`[YYYY-MM-DD]`

<CompactExampleBlock>
```compact
[2026-04-10] ## Evening Run
Run 5km
```
</CompactExampleBlock>

### Date with Database ID

`[YYYY-MM-DD#id]`

<CompactExampleBlock>
```compact
[2026-04-10#w001] ## Gym Session
Exercise Squat|4x6@100kg
```
</CompactExampleBlock>

### DateTime with Timezone

`[YYYY-MM-DDTHH:MM+TZ]`

<CompactExampleBlock>
```compact
[2026-04-10T06:30+02] ## Early Morning
Run 3km
```
</CompactExampleBlock>

### Week Period

`[Www/YYYY]` — Calendar week number

<CompactExampleBlock>
```compact
[W15/2026] ## Week Summary
Text Training volume: moderate
```
</CompactExampleBlock>

### Month Period

`[YYYY-MM]`

<CompactExampleBlock>
```compact
[2026-04] ## April Goals
Text Focus on endurance base
```
</CompactExampleBlock>

### Year Period

`[YYYY]`

<CompactExampleBlock>
```compact
[2026] ## Season Plan
Text Competition phase: June-August
```
</CompactExampleBlock>

### Date Range (same month)

`[YYYY-MM-DD..DD]`

<CompactExampleBlock>
```compact
[2026-04-01..07] ## Training Camp
Text Intensive week in Pajulahti
```
</CompactExampleBlock>

### Date Range (cross-month)

`[YYYY-MM-DD..YYYY-MM-DD]`

<CompactExampleBlock>
```compact
[2026-03-25..2026-04-05] ## Easter Break
Text Recovery focus
```
</CompactExampleBlock>

### Rolling Weeks

`[NW:YYYY-MM-DD]` — N weeks ending on date

<CompactExampleBlock>
```compact
[4W:2026-04-10] ## Last 4 Weeks
Text Volume build-up complete
```
</CompactExampleBlock>

### Unknown/Placeholder Date

`[????-??-??]`

<CompactExampleBlock>
```compact
[????-??-??] ## Template Workout
Exercise Warm-up|10min
Exercise Main lift|3x5@?
```
</CompactExampleBlock>

### ID Only (no date)

`[#id]`

<CompactExampleBlock>
```compact
[#template001] ## Standard Warm-up
Time 5min | Light cardio
Exercise Dynamic stretches|10
```
</CompactExampleBlock>

## Title Variations

### Date Inside Title

The date can appear inside the title line:

<CompactExampleBlock>
```compact
## [2026-04-10] Quick Session
Exercise Push-ups|3x20
```
</CompactExampleBlock>

### No Title (content only)

Workout can start directly with content lines:

<CompactExampleBlock>
```compact
[2026-04-10]
Exercise Push-ups|3x15
Exercise Plank|3x30s
```
</CompactExampleBlock>

### Date on Separate Line

<CompactExampleBlock>
```compact
[2026-04-10]
## Evening Recovery
Time 20min | Foam rolling
```
</CompactExampleBlock>

## Common Patterns

| Pattern | Example | Use Case |
|---------|---------|----------|
| Full header | `[2026-04-10#w001] ## Strength` | Database-tracked workouts |
| Date + title | `[2026-04-10] ## Morning Run` | Basic logging |
| Title only | `## Template Workout` | Reusable templates |
| Date only | `[2026-04-10]` | Simple daily entry |
| Week summary | `[W15/2026] ## Week Notes` | Weekly planning |

## Tips

- Use `#?` when you want the system to auto-generate an ID: `[2026-04-10#?]`
- Week numbers follow ISO 8601 (weeks start on Monday)
- Rolling weeks `4W:` are useful for training load summaries
- Unknown dates `????-??-??` are useful for templates
