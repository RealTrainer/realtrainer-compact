import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = process.cwd();

const targetFiles = {
  js: 'multiplatform/ranger/dist/parity/ranger_target_js.json',
  kotlin: 'multiplatform/ranger/dist/parity/ranger_target_kotlin.json',
  swift: 'multiplatform/ranger/dist/parity/ranger_target_swift.json',
};

const outputArg = process.argv[2] ?? 'multiplatform/ranger/dist/parity/RANGER_PARITY_SUMMARY.md';
const outputPath = resolve(root, outputArg);

const parserSourcePath = resolve(root, 'multiplatform/ranger/src/compact_ranger_parser.rgr');
const packageJsonPath = resolve(root, 'package.json');

function safeReadText(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch (_err) {
    return null;
  }
}

function isPrettyPrintedJson(text) {
  if (!text) {
    return false;
  }
  return text.startsWith('{\n') && text.includes('\n  "');
}

function collectByPath(obj, predicate, acc = []) {
  if (Array.isArray(obj)) {
    obj.forEach((item) => collectByPath(item, predicate, acc));
    return acc;
  }
  if (obj && typeof obj === 'object') {
    if (predicate(obj)) {
      acc.push(obj);
    }
    Object.values(obj).forEach((value) => collectByPath(value, predicate, acc));
  }
  return acc;
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (a && typeof a === 'object') {
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    if (!deepEqual(aKeys, bKeys)) return false;
    for (const key of aKeys) {
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
}

function collectDiffs(a, b, path = '$', acc = [], limit = 80) {
  if (acc.length >= limit) {
    return acc;
  }

  if (a === b) {
    return acc;
  }

  const aType = Array.isArray(a) ? 'array' : typeof a;
  const bType = Array.isArray(b) ? 'array' : typeof b;

  if (aType !== bType) {
    acc.push(`${path}: type mismatch (${aType} vs ${bType})`);
    return acc;
  }

  if (a && typeof a === 'object' && !Array.isArray(a)) {
    const aKeys = new Set(Object.keys(a));
    const bKeys = new Set(Object.keys(b));
    const allKeys = [...new Set([...aKeys, ...bKeys])].sort();
    for (const key of allKeys) {
      if (!aKeys.has(key)) {
        acc.push(`${path}.${key}: missing in first`);
      } else if (!bKeys.has(key)) {
        acc.push(`${path}.${key}: missing in second`);
      } else {
        collectDiffs(a[key], b[key], `${path}.${key}`, acc, limit);
      }
      if (acc.length >= limit) return acc;
    }
    return acc;
  }

  if (Array.isArray(a)) {
    if (a.length !== b.length) {
      acc.push(`${path}: array length mismatch (${a.length} vs ${b.length})`);
    }
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i += 1) {
      collectDiffs(a[i], b[i], `${path}[${i}]`, acc, limit);
      if (acc.length >= limit) return acc;
    }
    return acc;
  }

  acc.push(`${path}: value mismatch (${JSON.stringify(a)} vs ${JSON.stringify(b)})`);
  return acc;
}

function statsFromJson(data) {
  const workouts = Array.isArray(data?.workouts) ? data.workouts : [];
  const contentEntries = workouts.flatMap((w) => (Array.isArray(w?.content) ? w.content : []));
  const exercises = contentEntries.filter((e) => e?.type === 'exercise');
  const attempts = collectByPath(data, (node) => Object.prototype.hasOwnProperty.call(node, 'raw') && (Object.prototype.hasOwnProperty.call(node, 'sets') || Object.prototype.hasOwnProperty.call(node, 'reps') || Object.prototype.hasOwnProperty.call(node, 'loadUnit') || Object.prototype.hasOwnProperty.call(node, 'duration')));
  const unknownRepeats = attempts.filter((a) => a?.repeatsUnknown === true);
  const targetCase = attempts.find((a) => a?.raw === '2-3x?@bw');

  return {
    workouts: workouts.length,
    contentRows: contentEntries.length,
    exercises: exercises.length,
    attempts: attempts.length,
    unknownRepeatsCount: unknownRepeats.length,
    hasSampleUnknownRepeats: Boolean(targetCase && targetCase.repeatsUnknown === true),
  };
}

const parserSource = safeReadText(parserSourcePath) ?? '';
const packageJsonText = safeReadText(packageJsonPath) ?? '';

const sourceChecks = {
  hasJsonObjectHelper: parserSource.includes('fn jsonObject:string'),
  hasLegacyObjectHelper: parserSource.includes('fn object:string'),
  hasRepeatsUnknownField: parserSource.includes('def repeatsUnknown@(optional):boolean'),
  hasOptionalBooleanSerializer: parserSource.includes('fn addOptionalBooleanField:void'),
  hasJsPrettyPrintScript: packageJsonText.includes('ranger:parity:js') && packageJsonText.includes('pretty_print_json.mjs multiplatform/ranger/dist/parity/ranger_target_js.json'),
};

const targetInfo = {};
for (const [target, relativePath] of Object.entries(targetFiles)) {
  const absPath = resolve(root, relativePath);
  const text = safeReadText(absPath);
  const exists = text !== null;

  let parsed = null;
  let parseError = null;
  if (exists) {
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      parseError = err instanceof Error ? err.message : String(err);
    }
  }

  targetInfo[target] = {
    file: relativePath,
    exists,
    parseOk: exists && !parseError,
    parseError,
    prettyPrinted: isPrettyPrintedJson(text),
    stats: parsed ? statsFromJson(parsed) : null,
    data: parsed,
  };
}

const doneItems = [];
const missingItems = [];

if (sourceChecks.hasJsonObjectHelper && !sourceChecks.hasLegacyObjectHelper) {
  doneItems.push('CompactAstJson uses jsonObject helper and legacy object helper is absent.');
} else {
  missingItems.push('CompactAstJson helper naming is not fully in expected state (jsonObject without legacy object).');
}

if (sourceChecks.hasRepeatsUnknownField && sourceChecks.hasOptionalBooleanSerializer) {
  doneItems.push('ExerciseAttemptNode supports repeatsUnknown and serializer has optional boolean field support.');
} else {
  missingItems.push('repeatsUnknown support in parser source appears incomplete.');
}

if (sourceChecks.hasJsPrettyPrintScript) {
  doneItems.push('JavaScript parity script includes pretty-print step in package scripts.');
} else {
  missingItems.push('JavaScript parity script is missing pretty-print step.');
}

for (const [target, info] of Object.entries(targetInfo)) {
  if (!info.exists) {
    missingItems.push(`${target}: parity file missing (${info.file}).`);
    continue;
  }
  if (!info.parseOk) {
    missingItems.push(`${target}: parity JSON parse failed (${info.parseError}).`);
    continue;
  }
  doneItems.push(`${target}: parity file exists and JSON is valid.`);
  if (info.prettyPrinted) {
    doneItems.push(`${target}: parity JSON is pretty-printed.`);
  } else {
    missingItems.push(`${target}: parity JSON is not pretty-printed.`);
  }
  if (info.stats?.hasSampleUnknownRepeats) {
    doneItems.push(`${target}: sample attempt 2-3x?@bw includes repeatsUnknown=true.`);
  } else {
    missingItems.push(`${target}: sample attempt 2-3x?@bw is missing repeatsUnknown=true.`);
  }
}

const baseline = targetInfo.js?.data;
const targetComparisons = [];
if (baseline) {
  for (const target of ['kotlin', 'swift']) {
    const candidate = targetInfo[target]?.data;
    if (!candidate) continue;
    const equal = deepEqual(baseline, candidate);
    const diffs = equal ? [] : collectDiffs(baseline, candidate);
    targetComparisons.push({ target, equal, diffs });
    if (equal) {
      doneItems.push(`${target}: JSON structure matches js baseline exactly.`);
    } else {
      missingItems.push(`${target}: JSON differs from js baseline (see diff section).`);
    }
  }
}

const generatedAt = new Date().toISOString();

const statusRows = Object.entries(targetInfo).map(([target, info]) => {
  const s = info.stats;
  return `| ${target} | ${info.exists ? 'yes' : 'no'} | ${info.parseOk ? 'yes' : 'no'} | ${info.prettyPrinted ? 'yes' : 'no'} | ${s ? s.workouts : '-'} | ${s ? s.exercises : '-'} | ${s ? s.unknownRepeatsCount : '-'} |`;
});

const comparisonLines = targetComparisons.length === 0
  ? ['- No cross-target comparison available (js baseline or target files missing).']
  : targetComparisons.flatMap((cmp) => {
      if (cmp.equal) {
        return [`- ${cmp.target}: matches js baseline.`];
      }
      const head = [`- ${cmp.target}: differs from js baseline.`];
      const diffLines = cmp.diffs.map((d) => `  - ${d}`);
      return [...head, ...diffLines];
    });

const markdown = [
  '# Ranger Parser Parity Summary',
  '',
  `Generated: ${generatedAt}`,
  '',
  '## Target Status',
  '',
  '| Target | File exists | JSON valid | Pretty printed | Workouts | Exercises | repeatsUnknown attempts |',
  '|---|---|---|---|---|---|---|',
  ...statusRows,
  '',
  '## Done',
  '',
  ...(doneItems.length > 0 ? doneItems.map((item) => `- ${item}`) : ['- No completed checks detected.']),
  '',
  '## Missing / Open',
  '',
  ...(missingItems.length > 0 ? missingItems.map((item) => `- ${item}`) : ['- No open gaps detected by this script.']),
  '',
  '## Cross-target Diff vs JS',
  '',
  ...comparisonLines,
  '',
  '## Notes',
  '',
  '- This summary is generated from current parity JSON files and selected source/script checks.',
  '- If parity files are stale, run ranger parity scripts first, then regenerate this report.',
  '',
].join('\n');

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${markdown}\n`, 'utf8');

console.log(`Wrote parity summary markdown: ${outputPath}`);
console.log(`Done items: ${doneItems.length}`);
console.log(`Open items: ${missingItems.length}`);
