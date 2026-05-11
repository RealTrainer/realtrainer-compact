import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = process.cwd();

function parseArgs(argv) {
  const out = {
    runs: 10,
    iterations: 1000,
    warmup: 50,
    output: 'multiplatform/ranger/dist/bench/PARSER_BENCH_PEGJS_NG_1000.md',
  };

  for (const arg of argv) {
    if (arg.startsWith('--runs=')) {
      const val = Number(arg.slice('--runs='.length));
      if (Number.isFinite(val) && val > 0) out.runs = Math.floor(val);
      continue;
    }
    if (arg.startsWith('--iterations=')) {
      const val = Number(arg.slice('--iterations='.length));
      if (Number.isFinite(val) && val > 0) out.iterations = Math.floor(val);
      continue;
    }
    if (arg.startsWith('--warmup=')) {
      const val = Number(arg.slice('--warmup='.length));
      if (Number.isFinite(val) && val >= 0) out.warmup = Math.floor(val);
      continue;
    }
    if (arg.startsWith('--output=')) {
      const val = arg.slice('--output='.length).trim();
      if (val.length > 0) out.output = val;
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

const pegModulePath = resolve(root, 'src/parser-generated.js');
const ngModulePath = resolve(root, 'multiplatform/ranger/src/ng/bin/token_detector.cjs');
const monsterPath = resolve(root, 'MONSTER.compact');
const minimonsterNgPath = resolve(root, 'data/minimonster.ng.compact');
const minimonsterPegPath = resolve(root, 'data/minimonster.peg.compact');

if (!existsSync(pegModulePath)) {
  throw new Error(`Missing PegJS parser: ${pegModulePath}`);
}
if (!existsSync(ngModulePath)) {
  throw new Error(`Missing NG detector build: ${ngModulePath}`);
}
if (!existsSync(monsterPath)) {
  throw new Error(`Missing input: ${monsterPath}`);
}
if (!existsSync(minimonsterNgPath)) {
  throw new Error(`Missing input: ${minimonsterNgPath}`);
}
if (!existsSync(minimonsterPegPath)) {
  throw new Error(`Missing input: ${minimonsterPegPath}`);
}

const peg = await import(pegModulePath);
const { Parser: NGParser, StandardDetectors } = require(ngModulePath);

const monster = readFileSync(monsterPath, 'utf8');
const minimonsterNg = readFileSync(minimonsterNgPath, 'utf8');
const minimonsterPeg = readFileSync(minimonsterPegPath, 'utf8');

const suites = [
  {
    id: 'pegjs_monster',
    label: 'PEGJS on MONSTER.compact',
    inputName: 'MONSTER.compact',
    inputBytes: Buffer.byteLength(monster, 'utf8'),
    fn: (txt) => peg.parse(txt),
    input: monster,
  },
  {
    id: 'ng_monster',
    label: 'NG on MONSTER.compact',
    inputName: 'MONSTER.compact',
    inputBytes: Buffer.byteLength(monster, 'utf8'),
    fn: (txt) => {
      const p = new NGParser(txt, StandardDetectors.create());
      p.start();
      return p.getCount();
    },
    input: monster,
  },
  {
    id: 'pegjs_minimonster',
    label: 'PEGJS on data/minimonster.peg.compact',
    inputName: 'data/minimonster.peg.compact',
    inputBytes: Buffer.byteLength(minimonsterPeg, 'utf8'),
    fn: (txt) => peg.parse(txt),
    input: minimonsterPeg,
  },
  {
    id: 'ng_minimonster_ng',
    label: 'NG on data/minimonster.ng.compact',
    inputName: 'data/minimonster.ng.compact',
    inputBytes: Buffer.byteLength(minimonsterNg, 'utf8'),
    fn: (txt) => {
      const p = new NGParser(txt, StandardDetectors.create());
      p.start();
      return p.getCount();
    },
    input: minimonsterNg,
  },
];

const results = [];
for (const suite of suites) {
  const samples = [];
  for (let runIndex = 0; runIndex < args.runs; runIndex += 1) {
    const perf = bench(suite.fn, suite.input, args.warmup, args.iterations);
    samples.push(perf.avgMs);
  }
  results.push({
    id: suite.id,
    label: suite.label,
    inputName: suite.inputName,
    inputBytes: suite.inputBytes,
    summary: summarize(samples),
  });
}

const byId = Object.fromEntries(results.map((r) => [r.id, r]));
const ratioPegVsNgMonster = byId.pegjs_monster.summary.meanMs / byId.ng_monster.summary.meanMs;
const ratioPegVsNgMinimonster = byId.pegjs_minimonster.summary.meanMs / byId.ng_minimonster_ng.summary.meanMs;

const outputPath = resolve(root, args.output);
const jsonPath = resolve(dirname(outputPath), 'PARSER_BENCH_PEGJS_NG_1000.json');

const md = [];
md.push('# PEGJS vs NG Benchmark (1000 Iterations)');
md.push('');
md.push(`Generated: ${new Date().toISOString()}`);
md.push(`Runs per suite: ${args.runs}`);
md.push(`Iterations per run: ${args.iterations}`);
md.push(`Warmup iterations: ${args.warmup}`);
md.push('');
md.push('## Mean Speed Comparison');
md.push('');
md.push('| Suite | Input | Input bytes | Mean ms | Min ms | Max ms | Std ms |');
md.push('|---|---|---:|---:|---:|---:|---:|');
for (const r of results) {
  md.push(`| ${r.label} | ${r.inputName} | ${r.inputBytes} | ${r.summary.meanMs.toFixed(3)} | ${r.summary.minMs.toFixed(3)} | ${r.summary.maxMs.toFixed(3)} | ${r.summary.stdMs.toFixed(3)} |`);
}
md.push('');
md.push('## Key Ratio');
md.push('');
md.push(`- PEGJS(MONSTER) / NG(MONSTER): ${ratioPegVsNgMonster.toFixed(2)}x (NOTE: NG stops at first unknown token in MONSTER.compact)`);
md.push(`- PEGJS(minimonster) / NG(minimonster): ${ratioPegVsNgMinimonster.toFixed(2)}x (fair comparison: both parse equivalent content fully)`);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${md.join('\n')}\n`, 'utf8');
writeFileSync(
  jsonPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      runs: args.runs,
      iterations: args.iterations,
      warmup: args.warmup,
      results,
      ratios: {
        pegjsMonsterVsNgMonster: ratioPegVsNgMonster,
        pegjsMinimonsterVsNgMinimonster: ratioPegVsNgMinimonster,
      },
    },
    null,
    2,
  )}\n`,
  'utf8',
);

console.log(`Wrote: ${outputPath}`);
console.log(`Wrote: ${jsonPath}`);
for (const r of results) {
  console.log(`${r.label}: mean=${r.summary.meanMs.toFixed(3)}ms`);
}
console.log(`PEGJS(MONSTER)/NG(MONSTER)=${ratioPegVsNgMonster.toFixed(2)}x  [NOTE: NG stops early in MONSTER.compact]`);
console.log(`PEGJS(minimonster)/NG(minimonster)=${ratioPegVsNgMinimonster.toFixed(2)}x  [fair: both fully parsed]`);
