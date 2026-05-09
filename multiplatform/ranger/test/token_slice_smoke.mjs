import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const modulePath = resolve(process.cwd(), 'multiplatform/ranger/dist/ng/token_slice.cjs');
const { TokenSlice } = require(modulePath);

const reader = TokenSlice.fromText('penkki 10kg kevyt');
assert.equal(reader.length(), 17);
assert.equal(reader.read(6).toString(), 'penkki');
assert.equal(reader.peek(7).read(4).toString(), '10kg');
assert.equal(reader.toString(), 'penkki 10kg kevyt');
assert.equal(reader.splitWithToken('kg').toString(), 'penkki 10');
assert.equal(reader.sliceToToken('kg').toString(), 'penkki 10kg');
assert.equal(reader.splitWithToken('zz').toString(), 'penkki 10kg kevyt');
assert.equal(reader.sliceToToken('zz').toString(), 'penkki 10kg kevyt');
assert.equal(reader.endsWith('kevyt'), true);
assert.equal(reader.hasToken('penkki'), true);
assert.equal(reader.peek(7).hasToken('10kg'), true);
assert.equal(reader.hasToken(''), true);

const clamp = TokenSlice.fromText('abc');
assert.equal(clamp.peek(-5).toString(), 'abc');
assert.equal(clamp.peek(50).toString(), '');
assert.equal(clamp.read(-1).toString(), '');
assert.equal(clamp.read(99).toString(), 'abc');
assert.equal(clamp.slice(2).toString(), 'ab');
assert.equal(clamp.step(1).toString(), 'bc');

// Non-copying window invariants on current JS target output.
const peeked = reader.peek(7);
assert.equal(peeked.source, reader.source);
assert.equal(peeked.start, reader.start + 7);
assert.equal(peeked.size, reader.size - 7);

const sliced = reader.slice(6);
assert.equal(sliced.source, reader.source);
assert.equal(sliced.start, reader.start);
assert.equal(sliced.size, 6);

const utf = TokenSlice.fromText('💪a');
// ES6 target currently uses UTF-16 code unit indexing.
assert.equal(utf.length(), 3);
assert.equal(utf.read(2).toString(), '💪');
assert.equal(utf.peek(2).read(1).toString(), 'a');

console.log('TokenSlice smoke ok');
