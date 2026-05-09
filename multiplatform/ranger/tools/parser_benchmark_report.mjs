import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createRequire } from 'node:module';
import { gzipSync } from 'node:zlib';

const require = createRequire(import.meta.url);

const root = process.cwd();

const rangerModulePath = resolve(root, 'multiplatform/ranger/dist/index.cjs');
const pegModulePath = resolve(root, 'src/parser-generated.js');

const outputArg = process.argv[2] ?? 'multiplatform/ranger/dist/bench/PARSER_SPEED_SIZE_PARITY.md';
const outputPath = resolve(root, outputArg);
const jsonPath = resolve(dirname(outputPath), 'PARSER_SPEED_SIZE_PARITY.json');

const cases = [
  { name: 'MINI_TRAINING_PLAN.compact', file: 'MINI_TRAINING_PLAN.compact', iterations: 400, warmup: 40 },
  { name: 'MONSTER.compact', file: 'MONSTER.compact', iterations: 120, warmup: 20 },
  { name: 'MINIMONSTER.compact', file: 'MINIMONSTER.compact', iterations: 120, warmup: 20 },
].filter((c) => existsSync(resolve(root, c.file)));

if (!existsSync(rangerModulePath)) {
  throw new Error(`Missing Ranger parser build: ${rangerModulePath}`);
}
if (!existsSync(pegModulePath)) {
  throw new Error(`Missing PegJS parser: ${pegModulePath}`);
}

const { CompactAstParser } = require(rangerModulePath);
const peg = await import(pegModulePath);

function asMs(nanosBigInt) {
  return Number(nanosBigInt) / 1e6;
}

function bench(fn, input, warmup, iterations) {
  for (let i = 0; i < warmup; i += 1) {
    fn(input);
  }

  const t0 = process.hrtime.bigint();
  for (let i = 0; i < iterations; i += 1) {
    fn(input);
  }
  const t1 = process.hrtime.bigint();

  const totalMs = asMs(t1 - t0);
  return {
    iterations,
    totalMs,
    avgMs: totalMs / iterations,
  };
}

function addCount(map, key) {
  map[key] = (map[key] ?? 0) + 1;
}

function collectContentTypes(workouts) {
  const counts = {};
  for (const w of workouts ?? []) {
    for (const c of w?.content ?? []) {
      const t = typeof c?.type === 'string' ? c.type : 'unknown';
      addCount(counts, t);
    }
  }
  return counts;
}

function sumCounts(counts) {
  return Object.values(counts).reduce((acc, n) => acc + Number(n), 0);
}

function parityEstimate(pegParsed, rangerParsed) {
  const pegTypes = collectContentTypes(pegParsed?.workouts ?? []);
  const rangerTypes = collectContentTypes(rangerParsed?.workouts ?? []);

  const keys = [...new Set([...Object.keys(pegTypes), ...Object.keys(rangerTypes)])].sort();

  let matchedRows = 0;
  for (const k of keys) {
    matchedRows += Math.min(pegTypes[k] ?? 0, rangerTypes[k] ?? 0);
  }

  const pegRows = sumCounts(pegTypes);
  const rangerRows = sumCounts(rangerTypes);
  const score = pegRows > 0 ? matchedRows / pegRows : 1;

  const pegOnly = keys.filter((k) => (pegTypes[k] ?? 0) > 0 && !(rangerTypes[k] > 0));
  const rangerOnly = keys.filter((k) => (rangerTypes[k] ?? 0) > 0 && !(pegTypes[k] > 0));

  return {
    pegRows,
    rangerRows,
    matchedRows,
    score,
    pegTypes,
    rangerTypes,
    pegOnly,
    rangerOnly,
  };
}

function fileSizeStats(path) {
  const raw = readFileSync(path);
  return {
    path,
    lines: readFileSync(path, 'utf8').split('\n').length,
    bytes: statSync(path).size,
    gzipBytes: gzipSync(raw).length,
  };
}

const sizeStats = {
  ranger: fileSizeStats(rangerModulePath),
  pegjs: fileSizeStats(pegModulePath),
};

const caseResults = [];
for (const c of cases) {
  const input = readFileSync(resolve(root, c.file), 'utf8');

  const rangerPerf = bench((txt) => CompactAstParser.parseText(txt), input, c.warmup, c.iterations);
  const pegPerf = bench((txt) => peg.parse(txt), input, c.warmup, c.iterations);

  const rangerParsed = CompactAstParser.parseText(input);
  const pegParsed = peg.parse(input);

  caseResults.push({
    name: c.name,
    inputBytes: Buffer.byteLength(input, 'utf8'),
    ranger: rangerPerf,
    pegjs: pegPerf,
    speedupPegVsRanger: pegPerf.avgMs / rangerPerf.avgMs,
    parity: parityEstimate(pegParsed, rangerParsed),
  });
}

const speedupRaw = sizeStats.pegjs.bytes / sizeStats.ranger.bytes;
const speedupGzip = sizeStats.pegjs.gzipBytes / sizeStats.ranger.gzipBytes;
const lineRatio = sizeStats.pegjs.lines / sizeStats.ranger.lines;

const md = [];
md.push('# Parser Speed, Size and Feature Parity Report');
md.push('');
md.push(`Generated: ${new Date().toISOString()}`);
md.push('');
md.push('## Size Comparison');
md.push('');
md.push('| Parser | File | Lines | Bytes | Gzip bytes |');
md.push('|---|---|---:|---:|---:|');
md.push(`| Ranger JS | multiplatform/ranger/dist/index.cjs | ${sizeStats.ranger.lines} | ${sizeStats.ranger.bytes} | ${sizeStats.ranger.gzipBytes} |`);
md.push(`| PegJS generated | src/parser-generated.js | ${sizeStats.pegjs.lines} | ${sizeStats.pegjs.bytes} | ${sizeStats.pegjs.gzipBytes} |`);
md.push('');
md.push(`- Raw size ratio (PegJS/Ranger): ${speedupRaw.toFixed(2)}x`);
md.push(`- Gzip size ratio (PegJS/Ranger): ${speedupGzip.toFixed(2)}x`);
md.push(`- Line count ratio (PegJS/Ranger): ${lineRatio.toFixed(2)}x`);
md.push('');

md.push('## Speed Comparison');
md.push('');
md.push('| Case | Input bytes | Ranger avg ms | PegJS avg ms | PegJS/Ranger |');
md.push('|---|---:|---:|---:|---:|');
for (const r of caseResults) {
  md.push(`| ${r.name} | ${r.inputBytes} | ${r.ranger.avgMs.toFixed(3)} | ${r.pegjs.avgMs.toFixed(3)} | ${r.speedupPegVsRanger.toFixed(2)}x |`);
}
md.push('');

md.push('## Feature Parity Estimate (Content Type Based)');
md.push('');
md.push('- Note: this is an estimate based on content type/count overlap of parsed outputs, not a full semantic equivalence proof.');
md.push('');
for (const r of caseResults) {
  md.push(`### ${r.name}`);
  md.push('');
  md.push(`- Estimated score: ${(r.parity.score * 100).toFixed(1)}%`);
  md.push(`- Peg rows: ${r.parity.pegRows}`);
  md.push(`- Ranger rows: ${r.parity.rangerRows}`);
  md.push(`- Matched rows by type count overlap: ${r.parity.matchedRows}`);
  md.push(`- Types only in PegJS output: ${r.parity.pegOnly.length > 0 ? r.parity.pegOnly.join(', ') : '(none)'}`);
  md.push(`- Types only in Ranger output: ${r.parity.rangerOnly.length > 0 ? r.parity.rangerOnly.join(', ') : '(none)'}`);
  md.push('');
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${md.join('\n')}\n`, 'utf8');
writeFileSync(
  jsonPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sizeStats,
      ratios: {
        rawPegVsRanger: speedupRaw,
        gzipPegVsRanger: speedupGzip,
        linesPegVsRanger: lineRatio,
      },
      cases: caseResults,
    },
    null,
    2,
  )}\n`,
  'utf8',
);

console.log(`Wrote: ${outputPath}`);
console.log(`Wrote: ${jsonPath}`);
