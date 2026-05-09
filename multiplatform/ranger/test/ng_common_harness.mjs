import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
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

console.log('NG common harness ok');
