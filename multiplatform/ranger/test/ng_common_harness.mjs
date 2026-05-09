import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const detectorModulePath = resolve(process.cwd(), 'multiplatform/ranger/src/ng/bin/token_detector.cjs');
const specPath = resolve(process.cwd(), 'multiplatform/ranger/test/ng_common_harness.ngtest');

const {
  NGTestRunner,
} = require(detectorModulePath);

const specText = readFileSync(specPath, 'utf8');
const runner = NGTestRunner.create();
const errors = runner.runSpec(specText);
assert.equal(errors.length, 0, errors.join('\n'));

const jsonRows = runner.exportJson(specText);
const outDir = resolve(process.cwd(), 'multiplatform/ranger/dist/ng/json');
mkdirSync(outDir, { recursive: true });
for (const row of jsonRows) {
  const sep = row.indexOf('\t');
  if (sep < 0) continue;
  const fileName = row.slice(0, sep);
  const jsonText = row.slice(sep + 1);
  writeFileSync(resolve(outDir, fileName), jsonText, 'utf8');
}

console.log('NG common harness ok');
