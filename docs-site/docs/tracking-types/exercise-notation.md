---
id: exercise-notation
title: Exercise Notation Patterns
---

import { CompactExampleBlock } from '@site/src/components/CompactDemo';

This page summarizes the most important exercise notation patterns in COMPACT format.

## Core Rule

`Exercise <name>|<spec>` and `Pyramid <name>|<set-list>`.

The movement name is free text. The `spec` part carries structure.

## Standard Exercise Patterns

<CompactExampleBlock>
```compact
Exercise Bench Press|3x8@70kg
Exercise Pull-up|4x5@bw
Exercise Mobility Drill|10min
Exercise Isometric Wall Sit|4x45s
```
</CompactExampleBlock>

## Pyramid Patterns

<CompactExampleBlock>
```compact
Pyramid Bench Press|12x60,10x70,8x75kg
Pyramid Leg Press|10x132.5,10x132.5,10x132.5kg
Pyramid Calf Raise|15,15,15
```
</CompactExampleBlock>

## Left / Right Side Patterns

Use one of these consistently:

- `+` for bilateral reps: `10+10`
- `/` for bilateral timed values: `20s/37s`

<CompactExampleBlock>
```compact
Exercise Bulgarian Split Squat|3x10+10@16kg
Exercise Side Plank|2x20s/37s,23s/21s
Pyramid Single-arm Press|12+12x12,10+10x14,8+8x16kg
```
</CompactExampleBlock>

## Patterns Seen in MONSTER Corpus

<CompactExampleBlock>
```compact
Exercise Kiertäjät|15+15@2kg
Exercise Bilateraali aika|3x30s+30s
Exercise Bilateraali ilman painoa|15+15
Exercise Farmer walk|3x40m/2min@2x32kg
```
</CompactExampleBlock>

## Practical Tips

- Keep unit symbols (`kg`, `s`, `min`, `m`) explicit when possible.
- Avoid mixing side notations (`+` and `/`) for the same metric in one line.
- For unknown/open targets, `?` is valid: `Exercise Tempo Drill|2-3x?`.
