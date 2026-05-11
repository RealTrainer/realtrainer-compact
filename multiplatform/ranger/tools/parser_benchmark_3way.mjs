import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = process.cwd();

function parseArgs(argv) {
  const out = {
    runs: 3,
    output: 'multiplatform/ranger/dist/bench/PARSER_BENCH_3WAY.md',
  };

  for (const arg of argv) {
    if (arg.startsWith('--runs=')) {
      const val = Number(arg.slice('--runs='.length));
      if (Number.isFinite(val) && val > 0) {
        out.runs = Math.floor(val);
      }
      continue;
    }
    if (arg.startsWith('--output=')) {
      const val = arg.slice('--output='.length).trim();
      if (val.length > 0) {
        out.output = val;
      }
      continue;
    }
  }

  return out;
}

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
    totalMs,
    avgMs: totalMs / iterations,
    iterations,
  };
}

function mean(values) {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, n) => acc + n, 0);
  return sum / values.length;
}

function stddev(values) {
  if (values.length <= 1) return 0;
  const m = mean(values);
  const varSum = values.reduce((acc, n) => {
    const d = n - m;
    return acc + d * d;
  }, 0);
  return Math.sqrt(varSum / values.length);
}

function summarize(values) {
  return {
    samples: values.length,
    minMs: Math.min(...values),
    maxMs: Math.max(...values),
    meanMs: mean(values),
    stdMs: stddev(values),
  };
}

const args = parseArgs(process.argv.slice(2));

const rangerModulePath = resolve(root, 'multiplatform/ranger/dist/index.cjs');
const pegModulePath = resolve(root, 'src/parser-generated.js');
const v2ModulePath = resolve(root, 'dist/index.js');
const ngModulePath = resolve(root, 'multiplatform/ranger/src/ng/bin/token_detector.cjs');

if (!existsSync(rangerModulePath)) {
  throw new Error(`Missing Ranger parser build: ${rangerModulePath}`);
}
if (!existsSync(pegModulePath)) {
  throw new Error(`Missing PegJS parser: ${pegModulePath}`);
}
if (!existsSync(v2ModulePath)) {
  throw new Error(`Missing v2 build: ${v2ModulePath}`);
}
if (!existsSync(ngModulePath)) {
  throw new Error(`Missing NG detector build: ${ngModulePath}`);
}

const { CompactAstParser } = require(rangerModulePath);
const { Parser: NGParser, StandardDetectors } = require(ngModulePath);
const peg = await import(pegModulePath);
const { normalizeCompactText } = await import(v2ModulePath);

const cases = [
  { name: 'MINI_TRAINING_PLAN.compact', file: 'MINI_TRAINING_PLAN.compact', iterations: 400, warmup: 40 },
  { name: 'MONSTER.compact', file: 'MONSTER.compact', iterations: 120, warmup: 20 },
  { name: 'MINIMONSTER.compact', file: 'MINIMONSTER.compact', iterations: 120, warmup: 20 },
].filter((c) => existsSync(resolve(root, c.file)));

if (cases.length === 0) {
  throw new Error('No benchmark input files found.');
}

const results = [];
for (const c of cases) {
  const input = readFileSync(resolve(root, c.file), 'utf8');

  const v2Samples = [];
  const rangerSamples = [];
  const pegSamples = [];
  const ngSamples = [];

  for (let runIndex = 0; runIndex < args.runs; runIndex += 1) {
    const v2Perf = bench((txt) => {
      const normalized = normalizeCompactText(txt);
      if (!normalized.success) {
        throw new Error(`normalizeCompactText failed for ${c.name}`);
      }
      return normalized;
    }, input, c.warmup, c.iterations);

    const rangerPerf = bench((txt) => CompactAstParser.parseText(txt), input, c.warmup, c.iterations);
    const pegPerf = bench((txt) => peg.parse(txt), input, c.warmup, c.iterations);
    const ngPerf = bench((txt) => {
      const parser = new NGParser(txt, StandardDetectors.create());
      parser.start();
      return parser.getCount();
    }, input, c.warmup, c.iterations);

    v2Samples.push(v2Perf.avgMs);
    rangerSamples.push(rangerPerf.avgMs);
    pegSamples.push(pegPerf.avgMs);
    ngSamples.push(ngPerf.avgMs);
  }

  const v2 = summarize(v2Samples);
  const ranger = summarize(rangerSamples);
  const pegjs = summarize(pegSamples);
  const ng = summarize(ngSamples);

  results.push({
    name: c.name,
    inputBytes: Buffer.byteLength(input, 'utf8'),
    config: {
      runs: args.runs,
      iterations: c.iterations,
      warmup: c.warmup,
    },
    v2,
    ranger,
    pegjs,
    ng,
    ratios: {
      v2VsRanger: v2.meanMs / ranger.meanMs,
      pegVsRanger: pegjs.meanMs / ranger.meanMs,
      v2VsPeg: v2.meanMs / pegjs.meanMs,
      ngVsRanger: ng.meanMs / ranger.meanMs,
      v2VsNg: v2.meanMs / ng.meanMs,
      pegVsNg: pegjs.meanMs / ng.meanMs,
    },
  });
}

const outputPath = resolve(root, args.output);
const jsonPath = resolve(dirname(outputPath), 'PARSER_BENCH_3WAY.json');

const md = [];
md.push('# 4-Way Parser Benchmark (v2 vs Ranger vs PegJS vs NG)');
md.push('');
md.push(`Generated: ${new Date().toISOString()}`);
md.push(`Runs per case: ${args.runs}`);
md.push('');
md.push('## Mean Speed Comparison');
md.push('');
md.push('| Case | Input bytes | v2 mean ms | Ranger mean ms | PegJS mean ms | NG mean ms | v2/Ranger | PegJS/Ranger | NG/Ranger | v2/PegJS | v2/NG | PegJS/NG |');
md.push('|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|');
for (const r of results) {
  md.push(`| ${r.name} | ${r.inputBytes} | ${r.v2.meanMs.toFixed(3)} | ${r.ranger.meanMs.toFixed(3)} | ${r.pegjs.meanMs.toFixed(3)} | ${r.ng.meanMs.toFixed(3)} | ${r.ratios.v2VsRanger.toFixed(2)}x | ${r.ratios.pegVsRanger.toFixed(2)}x | ${r.ratios.ngVsRanger.toFixed(2)}x | ${r.ratios.v2VsPeg.toFixed(2)}x | ${r.ratios.v2VsNg.toFixed(2)}x | ${r.ratios.pegVsNg.toFixed(2)}x |`);
}
md.push('');
md.push('## Stability (Min/Max/Std)');
md.push('');
for (const r of results) {
  md.push(`### ${r.name}`);
  md.push('');
  md.push('| Parser | Min ms | Mean ms | Max ms | Std ms |');
  md.push('|---|---:|---:|---:|---:|');
  md.push(`| v2 | ${r.v2.minMs.toFixed(3)} | ${r.v2.meanMs.toFixed(3)} | ${r.v2.maxMs.toFixed(3)} | ${r.v2.stdMs.toFixed(3)} |`);
  md.push(`| Ranger | ${r.ranger.minMs.toFixed(3)} | ${r.ranger.meanMs.toFixed(3)} | ${r.ranger.maxMs.toFixed(3)} | ${r.ranger.stdMs.toFixed(3)} |`);
  md.push(`| PegJS | ${r.pegjs.minMs.toFixed(3)} | ${r.pegjs.meanMs.toFixed(3)} | ${r.pegjs.maxMs.toFixed(3)} | ${r.pegjs.stdMs.toFixed(3)} |`);
  md.push(`| NG | ${r.ng.minMs.toFixed(3)} | ${r.ng.meanMs.toFixed(3)} | ${r.ng.maxMs.toFixed(3)} | ${r.ng.stdMs.toFixed(3)} |`);
  md.push('');
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${md.join('\n')}\n`, 'utf8');
writeFileSync(
  jsonPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      runs: args.runs,
      results,
    },
    null,
    2,
  )}\n`,
  'utf8',
);

console.log(`Wrote: ${outputPath}`);
console.log(`Wrote: ${jsonPath}`);
for (const r of results) {
  console.log(`Case ${r.name}: v2=${r.v2.meanMs.toFixed(3)}ms, ranger=${r.ranger.meanMs.toFixed(3)}ms, pegjs=${r.pegjs.meanMs.toFixed(3)}ms, ng=${r.ng.meanMs.toFixed(3)}ms`);
}
