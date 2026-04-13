---
id: exercise-notation
title: Exercise Notation Patterns
---

import Link from '@docusaurus/Link';
import { EditableCompactExampleBlock } from '@site/src/components/CompactDemo';

This page summarizes the most important exercise notation patterns in COMPACT format.

## Core Rule

`Exercise <name>|<spec>` and `Pyramid <name>|<set-list>`.

The movement name is free text. The `spec` part carries structure.

## Standard Exercise Patterns

<EditableCompactExampleBlock minHeight={150}>
```compact
Exercise Bench Press|3x8@70kg
Exercise Pull-up|4x5@bw
Exercise Mobility Drill|10min
Exercise Isometric Wall Sit|4x45s
```
</EditableCompactExampleBlock>

## Pyramid Patterns

<EditableCompactExampleBlock minHeight={140}>
```compact
Pyramid Bench Press|12x60,10x70,8x75kg
Pyramid Leg Press|10x132.5,10x132.5,10x132.5kg
Pyramid Calf Raise|15,15,15
```
</EditableCompactExampleBlock>

## Left / Right Side Patterns

Use one of these consistently:

- `+` for bilateral reps: `10+10`
- `+` for bilateral timed values: `20s+37s`

<EditableCompactExampleBlock minHeight={140}>
```compact
Exercise Bulgarian Split Squat|3x10+10@16kg
Exercise Side Plank|2x20s+37s,23s+21s/60s
Pyramid Single-arm Press|12+12x12,10+10x14,8+8x16kg
```
</EditableCompactExampleBlock>

For a grammar-focused breakdown, see <Link to="/docs/tracking-types/left-right-side-patterns">Left / Right Side Patterns</Link>.

## Recovery

Recovery is a first-class part of exercise notation, not just free-text description.

<EditableCompactExampleBlock minHeight={140}>
```compact
Exercise Side Plank|2x20s+37s,23s+21s/60s
Exercise Farmer walk|3x40m/2min@2x32kg
Exercise Band Pull-Apart|3x20/15-20s
```
</EditableCompactExampleBlock>

For a dedicated recovery page, see <Link to="/docs/tracking-types/recovery">Recovery</Link>.

## Patterns Seen in MONSTER Corpus

<EditableCompactExampleBlock minHeight={160}>
```compact
Exercise Kiertäjät|15+15@2kg
Exercise Bilateraali aika|3x30s+30s
Exercise Bilateraali ilman painoa|15+15
Exercise Farmer walk|3x40m/2min@2x32kg
```
</EditableCompactExampleBlock>

## Practical Tips

- Keep unit symbols (`kg`, `s`, `min`, `m`) explicit when possible.
- Avoid mixing side notations (`+` and `/`) for the same metric in one line.
- For unknown/open targets, `?` is valid: `Exercise Tempo Drill|2-3x?`.
- Other grammar-important patterns worth knowing are measured duration lists (`45s,45s,0s`), per-side modifiers (`/side`, `/per side`), set/rep ranges, and `[[custom:field]]` suffixes.
