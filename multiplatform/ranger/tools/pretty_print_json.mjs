import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const inputArg = process.argv[2];

if (!inputArg) {
  throw new Error('Usage: node multiplatform/ranger/tools/pretty_print_json.mjs <file.json>');
}

const filePath = resolve(process.cwd(), inputArg);
const parsed = JSON.parse(readFileSync(filePath, 'utf8'));

function canonicalize(value) {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }

  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = canonicalize(value[key]);
        return acc;
      }, {});
  }

  return value;
}

const canonical = canonicalize(parsed);

writeFileSync(filePath, `${JSON.stringify(canonical, null, 2)}\n`, 'utf8');

console.log(`Pretty-printed JSON: ${filePath}`);