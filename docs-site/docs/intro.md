---
id: intro
title: COMPACT Documentation
slug: /
---

import Link from '@docusaurus/Link';
import { CompactExampleBlock } from '@site/src/components/CompactDemo';

This site documents the major COMPACT format elements and how data is represented in the file format.

## Live Playground

- [Open the React playground](https://realtrainer.github.io/realtrainer-compact/compact-ui/)
- <Link to="/docs/react-components">Open the React components docs</Link>

## Quick Start

A minimal format example:

<CompactExampleBlock>
```compact
[2026-03-04] ## Lower Body Strength
Tags strength, rehab
Time 20min | Warm-up bike
Exercise Box Squat|4x6@60kg
Pyramid Deadlift|5x60,5x70,5x80kg
Text Knee felt stable today
```
</CompactExampleBlock>

## Format Elements

Use the sidebar to open one page per format element.

Each page includes:

- Purpose of the format element
- COMPACT syntax
- Real examples
- Typical pitfalls

## Sports-Focused Format Guides

If you want to start from practical domain examples, open these guides:

- <Link to="/docs/sports/gym">Kuntosali</Link>
- <Link to="/docs/sports/endurance">Kestävyys</Link>
- <Link to="/docs/sports/bodyweight">Lihaskunto</Link>
