#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const packagePath = join(root, 'package.json');

const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));

function stripDistPrefix(value) {
  if (typeof value !== 'string') return value;
  if (value.startsWith('dist/')) return `./${value.slice('dist/'.length)}`;
  if (value.startsWith('./dist/')) return `./${value.slice('./dist/'.length)}`;
  return value;
}

function normalizeExports(exportsField) {
  if (!exportsField || typeof exportsField !== 'object') return exportsField;
  const normalized = {};
  for (const [key, val] of Object.entries(exportsField)) {
    if (typeof val === 'string') {
      normalized[key] = stripDistPrefix(val);
      continue;
    }
    if (val && typeof val === 'object') {
      const sub = {};
      for (const [subKey, subVal] of Object.entries(val)) {
        if (subKey === 'require') {
          continue;
        }
        sub[subKey] = stripDistPrefix(subVal);
      }
      normalized[key] = sub;
      continue;
    }
    normalized[key] = val;
  }
  return normalized;
}

const publishPackage = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  type: pkg.type,
  main: stripDistPrefix(pkg.main),
  module: stripDistPrefix(pkg.module),
  types: stripDistPrefix(pkg.types),
  bin: Object.fromEntries(
    Object.entries(pkg.bin ?? {}).map(([k, v]) => [k, stripDistPrefix(v)])
  ),
  exports: normalizeExports(pkg.exports),
  files: ['**/*'],
  keywords: pkg.keywords,
  author: pkg.author,
  license: pkg.license,
  repository: pkg.repository,
  bugs: pkg.bugs,
  homepage: pkg.homepage,
  engines: pkg.engines,
  dependencies: pkg.dependencies,
  peerDependencies: pkg.peerDependencies,
};

const packageDist = {
  generatedAt: new Date().toISOString(),
  sourcePackage: {
    name: pkg.name,
    version: pkg.version,
  },
  publishPackage,
};

mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'package.json'), JSON.stringify(publishPackage, null, 2) + '\n', 'utf8');
writeFileSync(join(distDir, 'package-dist.json'), JSON.stringify(packageDist, null, 2) + '\n', 'utf8');

const rootFilesToCopy = ['README.md', 'LICENSE', 'LICENSE.md', 'COPYING'];
for (const file of rootFilesToCopy) {
  const src = join(root, file);
  if (existsSync(src)) {
    copyFileSync(src, join(distDir, file));
  }
}

console.log('Created dist/package.json and dist/package-dist.json');
