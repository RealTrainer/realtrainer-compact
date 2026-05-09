import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const parserModulePath = resolve(process.cwd(), 'multiplatform/ranger/src/ng/bin/parser.cjs');
const detectorModulePath = resolve(process.cwd(), 'multiplatform/ranger/src/ng/bin/token_detector.cjs');
const { Parser } = require(parserModulePath);
const { DateTimeDetector, SpaceDetector, NewlineDetector, PositiveIntegerDetector } = require(detectorModulePath);

const detectors = [SpaceDetector.create(), DateTimeDetector.create()];

const p0 = new Parser('no dates here, only text', detectors);
p0.start();
assert.equal(p0.getCount(), 0, 'no datetime in input should produce zero results');

const p1 = new Parser('Start 2026-05-09 end', detectors);
p1.start();
assert.equal(p1.getCount(), 0, 'parser should stop on first no-match at input start');

const p2 = new Parser('A 2026-05-09 and 2026-05-10 done', detectors);
p2.start();
assert.equal(p2.getCount(), 0, 'parser should stop immediately when first token is not datetime');

const p3 = new Parser('2026-05-09', detectors);
p3.start();
assert.equal(p3.getCount(), 1, 'datetime at input start should be parsed');
let r3 = p3.getResults();
assert.equal(r3[0].toString(), '2026-05-09');
assert.equal(r3[0].tag, 'datetime');

const p4 = new Parser('2026-05-09T14:30+02:002026-05-09T15:45Z', detectors);
p4.start();
assert.equal(p4.getCount(), 2, 'two consecutive datetimes with time/timezone should be parsed');
let r4 = p4.getResults();
assert.equal(r4[0].toString(), '2026-05-09T14:30+02:00');
assert.equal(r4[1].toString(), '2026-05-09T15:45Z');
assert.equal(r4[0].tag, 'datetime');
assert.equal(r4[1].tag, 'datetime');

const p5 = new Parser('    2026-05-09', detectors);
p5.start();
assert.equal(p5.getCount(), 1, 'leading spaces should be consumed before datetime');
let r5 = p5.getResults();
assert.equal(r5[0].toString(), '2026-05-09');
assert.equal(r5[0].tag, 'datetime');

const p6 = new Parser('2026-05-09     2026-05-10', detectors);
p6.start();
assert.equal(p6.getCount(), 2, 'spaces between datetimes should be consumed');
let r6 = p6.getResults();
assert.equal(r6[0].toString(), '2026-05-09');
assert.equal(r6[1].toString(), '2026-05-10');
assert.equal(r6[0].tag, 'datetime');
assert.equal(r6[1].tag, 'datetime');

const intDetectors = [SpaceDetector.create(), PositiveIntegerDetector.create()];

const p7 = new Parser('123 45', intDetectors);
p7.start();
assert.equal(p7.getCount(), 2, 'positive integers should be parsed as consecutive tokens');
let r7 = p7.getResults();
assert.equal(r7[0].toString(), '123');
assert.equal(r7[1].toString(), '45');
assert.equal(r7[0].tag, 'positive-integer');
assert.equal(r7[1].tag, 'positive-integer');

const p8 = new Parser('   0012 next', intDetectors);
p8.start();
assert.equal(p8.getCount(), 1, 'leading spaces should be consumed before positive integer');
let r8 = p8.getResults();
assert.equal(r8[0].toString(), '0012');
assert.equal(r8[0].tag, 'positive-integer');

const p9 = new Parser('abc 12', intDetectors);
p9.start();
assert.equal(p9.getCount(), 0, 'parser should stop immediately when first token is not integer');

const p10 = new Parser('2026-05-09\n2026-05-10', detectors);
p10.start();
assert.equal(p10.getCount(), 1, 'without newline detector parser should stop at line break');
let r10 = p10.getResults();
assert.equal(r10[0].toString(), '2026-05-09');
assert.equal(r10[0].tag, 'datetime');

const lineDetectors = [SpaceDetector.create(), NewlineDetector.create(), DateTimeDetector.create()];
const p11 = new Parser('2026-05-09\n2026-05-10', lineDetectors);
p11.start();
assert.equal(p11.getCount(), 2, 'newline detector should allow parsing across lines');
let r11 = p11.getResults();
assert.equal(r11[0].toString(), '2026-05-09');
assert.equal(r11[1].toString(), '2026-05-10');
assert.equal(r11[0].tag, 'datetime');
assert.equal(r11[1].tag, 'datetime');

console.log('Parser smoke ok');
