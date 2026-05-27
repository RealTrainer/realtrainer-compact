#!/usr/bin/env node
/**
 * Regenerate Ranger TS parser in parser-ranger-v1 and sync into this package.
 */
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const compactRoot = resolve(here, '..');
const v1Root = resolve(compactRoot, '../realtrainer/parser-ranger-v1');

function run(cmd, args, cwd) {
  const result = spawnSync(cmd, args, { cwd, stdio: 'inherit', shell: false });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run('npm', ['run', 'sync:parser-ts:compact'], v1Root);
console.log('Parser TypeScript synced from parser-ranger-v1');
