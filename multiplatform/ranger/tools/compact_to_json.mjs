import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const inputArg = process.argv[2] ?? 'data/minimonster-canonical.compact';
const outputArg = process.argv[3] ?? 'multiplatform/ranger/dist/minimonster.parsed.json';

const root = process.cwd();
const inputPath = resolve(root, inputArg);
const outputPath = resolve(root, outputArg);
const modulePath = resolve(root, 'multiplatform/ranger/dist/index.cjs');

const { CompactAstParser } = require(modulePath);
const compact = readFileSync(inputPath, 'utf8');
const parsed = CompactAstParser.parseText(compact);

const workouts = Array.isArray(parsed?.workouts) ? parsed.workouts.length : 0;
const moveCount = Array.isArray(parsed?.workouts)
  ? parsed.workouts.reduce(
      (acc, w) => acc + ((Array.isArray(w?.content) ? w.content.filter((c) => c?.type === 'move').length : 0)),
      0,
    )
  : 0;

const output = {
  meta: {
    source: inputArg,
    generatedAt: new Date().toISOString(),
    parser: 'ranger-compact-ast-v1',
    workouts,
    moves: moveCount,
  },
  ast: parsed,
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

console.log(`Wrote JSON: ${outputPath}`);
console.log(`Workouts: ${workouts}`);
console.log(`Moves: ${moveCount}`);
