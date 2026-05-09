import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const inputArg = process.argv[2] ?? 'MINI_TRAINING_PLAN.compact';
const outputArg = process.argv[3] ?? 'multiplatform/ranger/dist/parity/ranger_target_js.json';

const root = process.cwd();
const inputPath = resolve(root, inputArg);
const outputPath = resolve(root, outputArg);
const modulePath = resolve(root, 'multiplatform/ranger/dist/index.cjs');

const { CompactAstParser } = require(modulePath);

const compact = readFileSync(inputPath, 'utf8');
const parsed = CompactAstParser.parseText(compact);
const snapshot = parsed.toJSONString();

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${snapshot}\n`, 'utf8');

console.log(`Wrote parity JSON (js): ${outputPath}`);
console.log(`Workouts: ${Array.isArray(parsed?.workouts) ? parsed.workouts.length : 0}`);