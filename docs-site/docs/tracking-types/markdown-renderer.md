---
id: markdown-renderer
title: Markdown Renderer
---

import { MarkdownRendererDemo } from '@site/src/components/CompactDemo';

`realtrainer-compact` includes a built-in Markdown renderer that converts parsed COMPACT data to readable Markdown.

You can import renderer functions directly from the main package export, or from the dedicated renderer subpath export.

## What It Does

The renderer supports:

- Workout title and date headers
- Tags and emojis
- Sections and phases
- Exercise, pyramid, move, duration, and split rows
- Life tracking rows such as food, drinking, expense, sleep, measurement, and health

## Installation

```bash
npm install realtrainer-compact
```

## Import Options

Main export:

```ts
import { parseCompact, renderDocumentToMarkdown } from 'realtrainer-compact';
```

Renderer subpath export:

```ts
import { renderWorkoutToMarkdown, renderContentToMarkdown } from 'realtrainer-compact/renderers';
```

## Live Markdown Preview

This demo parses COMPACT input, generates markdown with the package renderer, and shows both the raw markdown and rendered preview.

<MarkdownRendererDemo />

## Example: Parse COMPACT and Render Full Document

```ts
import { parseCompact, renderDocumentToMarkdown } from 'realtrainer-compact';

const input = `
[2026-04-14] ## Voimatreeni
Tags voima, sali
Emojis 💪
Section Lämmittely
Exercise Kyykky|2x10@40kg
Section Pääosa
Exercise Takakyykky|3x5@90kg
Pyramid Penkki|10x60,8x70,6x80kg
`;

const result = parseCompact(input);

if (!result.success) {
  throw new Error(result.error.message);
}

const md = renderDocumentToMarkdown(result.document);
console.log(md);
```

Example output (shortened):

```md
## 2026-04-14 💪 Voimatreeni

#voima #sali

### Lämmittely
- 🏋️ Kyykky: 2x10 @ 40kg

### Pääosa
- 🏋️ Takakyykky: 3x5 @ 90kg
- 📈 Penkki: 10x60kg → 8x70kg → 6x80kg
```

## Example: Render a Single Workout

```ts
import { parseCompact } from 'realtrainer-compact';
import { renderWorkoutToMarkdown } from 'realtrainer-compact/renderers';

const result = parseCompact(`
[2026-04-14] ## Kevyt juoksu
Run 30min@easy
`);

if (result.success) {
  const workout = result.document.workouts[0];
  const md = renderWorkoutToMarkdown(workout, {
    useBullets: true,
    headerLevel: 3,
  });

  console.log(md);
}
```

## Example: Render One Content Row

```ts
import { parseCompact } from 'realtrainer-compact';
import { renderContentToMarkdown } from 'realtrainer-compact/renderers';

const result = parseCompact(`
[2026-04-14] ## Päivä
Expense 14.90 | ruokaostokset
`);

if (result.success) {
  const expenseRow = result.document.workouts[0].content.find((r) => r.type === 'expense');
  if (expenseRow) {
    console.log(renderContentToMarkdown(expenseRow));
    // 💰 14.9 EUR - ruokaostokset
  }
}
```

## Markdown Options

```ts
interface MarkdownOptions {
  includeDate?: boolean;
  includeEmojis?: boolean;
  includeTags?: boolean;
  useBullets?: boolean;
  headerLevel?: 1 | 2 | 3 | 4;
}
```

## Notes

- Renderer functions are available in the npm package export map.
- In Docusaurus docs, these examples work with the installed package (published version or local dist install in docs build workflow).
