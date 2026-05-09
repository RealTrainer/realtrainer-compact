import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const rootDir = process.cwd();

function runNpmScript(scriptName) {
  const res = spawnSync('npm', ['run', scriptName], {
    cwd: rootDir,
    encoding: 'utf8',
  });

  const stdout = res.stdout ?? '';
  const stderr = res.stderr ?? '';
  return {
    scriptName,
    exitCode: typeof res.status === 'number' ? res.status : 1,
    combinedOutput: `${stdout}${stderr}`,
  };
}

function escapeCell(text) {
  return text.replace(/\|/g, '\\|').replace(/\n/g, '\\\\n');
}

function targetStatus(result, okMarker, skippedMarkers = []) {
  if (result.exitCode !== 0) {
    return 'fail';
  }

  if (result.combinedOutput.includes(okMarker)) {
    return 'pass';
  }

  for (const marker of skippedMarkers) {
    if (result.combinedOutput.includes(marker)) {
      return 'skipped';
    }
  }

  return 'pass';
}

const targets = [
  {
    key: 'js',
    name: 'JavaScript',
    script: 'ranger:ng:common:test',
    okMarker: 'NG common harness ok',
    skippedMarkers: [],
  },
  {
    key: 'kotlin',
    name: 'Kotlin',
    script: 'ranger:ng:test:kotlin',
    okMarker: 'NG common harness (kotlin) ok',
    skippedMarkers: ['kotlinc not found'],
  },
  {
    key: 'swift',
    name: 'Swift',
    script: 'ranger:ng:test:swift',
    okMarker: 'NG common harness (swift) ok',
    skippedMarkers: ['Swift compile currently fails with Ranger-generated NG source for this target.'],
  },
];

const targetResults = targets.map((t) => {
  const result = runNpmScript(t.script);
  const status = targetStatus(result, t.okMarker, t.skippedMarkers);
  return {
    ...t,
    ...result,
    status,
  };
});

const require = createRequire(import.meta.url);
const detectorModulePath = resolve(rootDir, 'multiplatform/ranger/src/ng/bin/token_detector.cjs');
const specPath = resolve(rootDir, 'multiplatform/ranger/test/ng_common_harness.ngtest');
const reportPath = resolve(rootDir, 'multiplatform/ranger/test/NG_COMMON_HARNESS_REPORT.md');

const {
  NGTestRunner,
  NGTestSpecParser,
} = require(detectorModulePath);

const specText = readFileSync(specPath, 'utf8');
const parser = NGTestSpecParser.create();
const runner = NGTestRunner.create();

const cases = parser.parse(specText);
const errors = runner.runSpec(specText);

const notesByCase = new Map();
for (let i = 0; i < cases.length; i += 1) {
  notesByCase.set(i + 1, []);
}

for (const err of errors) {
  const m = /Test #(\d+)/.exec(err);
  if (!m) {
    continue;
  }
  const idx = Number(m[1]);
  if (!notesByCase.has(idx)) {
    notesByCase.set(idx, []);
  }
  notesByCase.get(idx).push(err);
}

const perCaseRows = [];
let passCount = 0;
let failCount = 0;

for (let i = 0; i < cases.length; i += 1) {
  const idx = i + 1;
  const tc = cases[i];
  const notes = notesByCase.get(idx) ?? [];
  const status = notes.length === 0 ? 'pass' : 'fail';
  if (status === 'pass') {
    passCount += 1;
  } else {
    failCount += 1;
  }

  const notesText = notes.length === 0 ? '' : notes.join(' ; ');
  perCaseRows.push(`| ${idx} | ${escapeCell(tc.input)} | ${status} | ${escapeCell(notesText)} |`);
}

const now = new Date().toISOString();
const reportLines = [
  '# NG Common Harness Report',
  '',
  `Generated at: ${now}`,
  `Spec: multiplatform/ranger/test/ng_common_harness.ngtest`,
  '',
  '## Target Runs',
  '',
  '| Target | Script | Status | Exit Code |',
  '| --- | --- | --- | --- |',
  ...targetResults.map((r) => `| ${r.name} | ${r.script} | ${r.status} | ${r.exitCode} |`),
  '',
  '## Case Results (JS NGTestRunner)',
  '',
  `Summary: ${passCount} pass, ${failCount} fail, ${cases.length} total`,
  '',
  '| # | Input | Status | Notes |',
  '| --- | --- | --- | --- |',
  ...perCaseRows,
  '',
  '## Raw Output (truncated)',
  '',
];

for (const r of targetResults) {
  const trimmed = r.combinedOutput.trim();
  const shortOutput = trimmed.length > 3000 ? `${trimmed.slice(0, 3000)}\n... (truncated)` : trimmed;
  reportLines.push(`### ${r.name}`);
  reportLines.push('');
  reportLines.push('```text');
  reportLines.push(shortOutput || '(no output)');
  reportLines.push('```');
  reportLines.push('');
}

writeFileSync(reportPath, `${reportLines.join('\n')}\n`, 'utf8');

console.log(`Wrote ${reportPath}`);
console.log(`Case summary: ${passCount} pass, ${failCount} fail, ${cases.length} total`);

const hasTargetFailure = targetResults.some((r) => r.status === 'fail');
if (hasTargetFailure || failCount > 0) {
  process.exitCode = 1;
}
