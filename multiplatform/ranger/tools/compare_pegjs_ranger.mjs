import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const inputArg = process.argv[2] ?? 'data/minimonster-canonical.compact';
const outDirArg = process.argv[3] ?? 'multiplatform/ranger/dist/parity';

const root = process.cwd();
const inputPath = resolve(root, inputArg);
const outDir = resolve(root, outDirArg);
const v2ModulePath = resolve(root, 'dist/index.js');
const rangerModulePath = resolve(root, 'multiplatform/ranger/dist/index.cjs');

const { normalizeCompactText } = await import(v2ModulePath);
const { CompactAstParser } = require(rangerModulePath);

const compact = readFileSync(inputPath, 'utf8');

const v2Result = normalizeCompactText(compact);
if (!v2Result.success) {
  throw new Error(`v2 normalize failed: ${v2Result.error?.message ?? 'unknown error'}`);
}

const v2Baseline = v2Result.document;
const rangerAst = CompactAstParser.parseText(compact);

function addCount(map, key) {
  map[key] = (map[key] ?? 0) + 1;
}

function countMap(items) {
  const m = {};
  for (const k of items) {
    addCount(m, k);
  }
  return m;
}

function sumCounts(counts) {
  return Object.values(counts).reduce((acc, n) => acc + Number(n), 0);
}

function inferRangerRows(workouts) {
  const rows = [];
  for (const workout of workouts ?? []) {
    for (const item of workout?.content ?? []) {
      if (!item?.type) continue;
      if (item.type === 'tags' || item.type === 'emojis') {
        continue;
      }
      rows.push({ type: item.type });
    }
  }
  return rows;
}

function normalizeV2RowType(row) {
  if (!row || typeof row !== 'object') return 'unknown';
  if (row.type === 'strength' || row.type === 'endurance' || row.type === 'legacy') {
    return row.sourceType ?? row.type;
  }
  return row.type ?? 'unknown';
}

const v2Rows = v2Baseline.workouts.flatMap((w) => w.rows ?? []);
const rangerRows = inferRangerRows(rangerAst.workouts ?? []);

const v2RowTypeCounts = countMap(v2Rows.map((r) => normalizeV2RowType(r)));
const rangerRowTypeCounts = countMap(rangerRows.map((r) => r.type));

const v2Types = Object.keys(v2RowTypeCounts).sort();
const rangerTypes = Object.keys(rangerRowTypeCounts).sort();

const commonTypes = v2Types.filter((t) => rangerTypes.includes(t));
const missingFromRanger = v2Types.filter((t) => !rangerTypes.includes(t));
const rangerOnlyTypes = rangerTypes.filter((t) => !v2Types.includes(t));

const matchedRows = commonTypes.reduce((acc, t) => acc + (v2RowTypeCounts[t] ?? 0), 0);
const totalV2Rows = sumCounts(v2RowTypeCounts);
const parityScore = totalV2Rows > 0 ? matchedRows / totalV2Rows : 1;

const v2TagsCount = v2Baseline.workouts.reduce((acc, w) => acc + (Array.isArray(w.tags) ? w.tags.length : 0), 0);
const rangerTagsCount = (rangerAst.workouts ?? []).reduce(
  (acc, w) =>
    acc +
    (w?.content ?? []).reduce((inner, c) => {
      if (c?.type === 'tags' && Array.isArray(c.tags)) return inner + c.tags.length;
      return inner;
    }, 0),
  0,
);

const v2EmojisCount = v2Baseline.workouts.reduce((acc, w) => acc + ((w.emojis ?? '').length > 0 ? 1 : 0), 0);
const rangerEmojisCount = (rangerAst.workouts ?? []).reduce(
  (acc, w) => acc + (w?.content ?? []).filter((c) => c?.type === 'emojis').length,
  0,
);

const perWorkout = v2Baseline.workouts.map((v2w, i) => {
  const rw = rangerAst.workouts?.[i];
  const v2RowTypes = countMap((v2w.rows ?? []).map((r) => normalizeV2RowType(r)));
  const rangerInferred = inferRangerRows([rw]);
  const rangerRowTypes = countMap(rangerInferred.map((r) => r.type));
  return {
    index: i,
    v2Title: v2w.title ?? '',
    rangerTitle: rw?.title ?? '',
    v2Rows: (v2w.rows ?? []).length,
    rangerRows: rangerInferred.length,
    v2RowTypeCounts: v2RowTypes,
    rangerRowTypeCounts: rangerRowTypes,
  };
});

const report = {
  meta: {
    baseline: 'v2-normalized',
    source: inputArg,
    generatedAt: new Date().toISOString(),
    v2Workouts: v2Baseline.workouts.length,
    rangerWorkouts: Array.isArray(rangerAst.workouts) ? rangerAst.workouts.length : 0,
  },
  summary: {
    v2RowTypeCounts,
    rangerRowTypeCounts,
    commonTypes,
    missingFromRanger,
    rangerOnlyTypes,
    totalV2Rows,
    matchedRows,
    parityScore,
    v2TagsCount,
    rangerTagsCount,
    v2EmojisCount,
    rangerEmojisCount,
  },
  perWorkout,
};

mkdirSync(outDir, { recursive: true });

const v2OutPath = resolve(outDir, 'v2_baseline.json');
const rangerOutPath = resolve(outDir, 'ranger_ast.json');
const reportOutPath = resolve(outDir, 'parity_report.json');

writeFileSync(v2OutPath, `${JSON.stringify({ document: v2Baseline, warnings: v2Result.warnings }, null, 2)}\n`, 'utf8');
writeFileSync(rangerOutPath, `${JSON.stringify({ ast: rangerAst }, null, 2)}\n`, 'utf8');
writeFileSync(reportOutPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

console.log(`Wrote: ${v2OutPath}`);
console.log(`Wrote: ${rangerOutPath}`);
console.log(`Wrote: ${reportOutPath}`);
console.log(`Parity score (v2 baseline): ${parityScore.toFixed(4)}`);
