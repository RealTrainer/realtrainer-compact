# realtrainer-compact

A parser for **COMPACT format** - a concise text-based DSL for workout tracking, nutrition, expenses, and life logging.

## Installation

```bash
npm install realtrainer-compact
```

### 3.0.0 breaking changes

- **Parser backend:** Peggy-generated `parser-generated.js` is replaced by **Ranger V1** TypeScript (`src/parser-ranger/compact_parser_v1.rgr` via [`parser-ranger-v1`](https://github.com/RealTrainer/realtrainer/tree/main/parser-ranger-v1)). The public API (`parseCompact`, types, renderers) is unchanged.
- **Removed exports:** `./ng` and `./ng/token_detector_ng` are no longer published. NG/multiplatform sources live in the RealTrainer monorepo under `research/parser-ng-archive/`.
- **Regenerating the parser:** `npm run build:parser-ranger` (requires local [Ranger](https://github.com/terotests/Ranger) `dist/rgrc.js` and `parser-ranger-v1` sibling checkout).

## Quick Start

```typescript
import { parseCompact, validateCompact, formatParseError } from 'realtrainer-compact';

const input = `
[2026-01-15T18:00+02]## Jalkatreeni
Tags kuntosali, voima, jalat
Section Lämmittely
Time 10min | Kuntopyörä kevyesti
Section Pääosa
Exercise Takakyykky|4x8@80kg
Exercise Jalkaprässi|3x12@100kg
Section Jäähdyttely
Time 10min | Venyttely
`;

const result = parseCompact(input);

if (result.success) {
  console.log(result.document.workouts[0].title); // "Jalkatreeni"
  console.log(result.document.workouts[0].content.length); // 8 items
} else {
  console.error(formatParseError(result.error));
}
```

## Ranger AST API (programmatic editing)

The package also exports the **Ranger-generated parser** and AST node classes (`CompactV1Parser`, `DocumentNode`, `ExerciseNode`, `MoveNode`, …) from the main entry and from `realtrainer-compact/parser`.

| API | Returns | Use when |
|-----|---------|----------|
| `parseCompact` | `types.ts` `Document` | UI, renderers, existing integrations |
| `parseCompactAst` | `DocumentNode` | You need mutable Ranger nodes (`hasSets`, `sets`, `toJSONString()`, …) |
| `astToLegacyDocument` | `Document` | Convert AST → legacy document for renderers |

```typescript
import {
  parseCompactAst,
  astToLegacyDocument,
  ExerciseNode,
} from 'realtrainer-compact';

const ast = parseCompactAst(`
[2026-01-15]## Voima
Exercise Takakyykky|3x8@80kg
`);

const exercise = ast.workouts[0].content.find((e) => e.type === 'exercise') as ExerciseNode;
exercise.sets = 4;
exercise.hasSets = true;

const legacyDoc = astToLegacyDocument(ast); // for CompactView / renderers
```

**Note:** Ranger nodes use fields like `hasSets` / `sets`; legacy `types.ts` uses `sets: number | null`. Do not mix the two models without `astToLegacyDocument` or `parseCompact`.

The main export exposes Ranger class `DateValue` (serialize helper). Legacy document dates use type `CompactDateValue` (or `DateValue` from `realtrainer-compact/types`).

Advanced parser internals (`MoveParserV1`, detectors, …) are exported but considered unstable.

## API Reference

### `parseCompact(input: string): ParseOutcome`

Parse compact format text into a Document AST.

- **input**: Raw compact format text
- **returns**: `ParseResult` on success, `ParseFailure` on error

```typescript
const result = parseCompact(input);
if (result.success) {
  // result.document contains the parsed AST
} else {
  // result.error contains error details
}
```

### `validateCompact(input: string): { valid: boolean; error?: ParseError }`

Quick validation without returning full document.

```typescript
const { valid, error } = validateCompact(userInput);
if (!valid) {
  showError(`Line ${error.location?.start.line}: ${error.message}`);
}
```

### `formatParseError(error: ParseError): string`

Format a parse error for display to users.

```typescript
const result = parseCompact(input);
if (!result.success) {
  console.error(formatParseError(result.error));
  // Output: "Line 5, column 12: Expected exercise name"
}
```

## COMPACT Format Syntax

### Workout Structure

```
[DATE]## Title
Tags tag1, tag2, tag3
Section SectionName
Content lines...
```

### Date Formats

| Format | Example | Description |
|--------|---------|-------------|
| Date | `[2026-01-15]` | Simple date |
| DateTime | `[2026-01-15T18:00+02]` | Date with time and timezone |
| Week | `[W03/2026]` | Week number |
| Month | `[2026-01]` | Year and month |
| Year | `[2026]` | Year only |
| Range | `[2026-01-01..07]` | Date range |
| Rolling | `[4W:2026-01-15]` | Rolling N weeks ending on date |

### Exercise Entries

```
Exercise name|SETSxREPS@WEIGHT/RECOVERY

# Examples:
Exercise Kyykky|4x8@80kg
Exercise Punnerrukset|3x15@bw
Exercise Penkki|5x5@100kg/2min
Exercise Hauiskääntö|3x8-12@30kg|hitaasti
```

### Run/Cardio Entries

```
Run DISTANCE
Run DURATION
Run COUNTxDISTANCE@INTENSITY/RECOVERY

# Examples:
Run 10km
Run 45min
Run 4x400m@80%/2min
Run 30min 5000steps | Kävely
```

### Life Tracking

```
# Nutrition
Food 450kcal 30g/prot | kaurapuuro
Drinking 5dl | vesi

# Expenses
Expense 4.50EUR | Bussilippu
Expense 100EUR ALV24% 19.35EUR | Konsultointi

# Body measurements
Weight 85.2kg
BodyFat 12.5%

# Sleep
Sleep 7.5h quality:good

# Health
Health physio | Olkapään hoito
```

### Metadata

```
Tags voima, jalat, kuntosali
Emojis 🏋️💪
Text Free-form note
Summary Short workout description
Location Tampere, Pirkkahalli
URL https://kisa.fi/ilmo
```

## Types

All TypeScript types are exported from the package:

```typescript
import type {
  Document,
  Workout,
  Content,
  Exercise,
  Move,
  Food,
  Expense,
  // ... and many more
} from 'realtrainer-compact';
```

See [src/types.ts](src/types.ts) for the complete type definitions.

## Development

```bash
# Install dependencies
npm install

# Generate parser from grammar
npm run generate-parser

# Build TypeScript
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build and run tests (full dev cycle)
npm run dev
```

## Local Development with RealTrainer

This package is designed to be developed alongside the RealTrainer application. There are two ways to use it locally:

### Option 1: File Reference (Recommended)

Add to RealTrainer's `package.json`:

```json
{
  "dependencies": {
    "realtrainer-compact": "file:../realtrainer-compact"
  }
}
```

Then run `npm install` in RealTrainer. Changes require rebuilding this package and reinstalling.

### Option 2: npm link

```bash
# In realtrainer-compact directory
npm run build
npm link

# In realtrainer directory  
npm link realtrainer-compact
```

### Usage in RealTrainer

```typescript
// Import parser functions
import { parseCompact, parseCompactSafe } from 'realtrainer-compact';

// Import renderers
import { renderToMarkdown, renderToPlaintext } from 'realtrainer-compact/renderers';

// Import types
import type { Document, Entry, Exercise, Workout } from 'realtrainer-compact/types';
```

### Development Workflow

1. Make changes to grammar or TypeScript in realtrainer-compact
2. Run `npm run build` (or `npm run dev` for build + test)
3. In RealTrainer, the changes are available immediately (with file reference)

## Grammar

The parser is generated from Ranger source in [`parser-ranger-v1`](https://github.com/RealTrainer/realtrainer/tree/main/parser-ranger-v1) (`compact_parser_v1.rgr`). Sync into this package with `npm run build:parser-ranger`. Legacy Peggy grammar is archived under RealTrainer `research/parser-ng-archive/pegjs-legacy/`.

## License

MIT
