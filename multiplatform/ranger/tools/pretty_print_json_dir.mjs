import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const inputArg = process.argv[2];

if (!inputArg) {
  throw new Error('Usage: node multiplatform/ranger/tools/pretty_print_json_dir.mjs <dir>');
}

const dirPath = resolve(process.cwd(), inputArg);

if (!statSync(dirPath).isDirectory()) {
  throw new Error(`Not a directory: ${dirPath}`);
}

const files = readdirSync(dirPath)
  .filter((name) => name.toLowerCase().endsWith('.json'))
  .sort((a, b) => a.localeCompare(b));

for (const file of files) {
  const filePath = join(dirPath, file);
  const parsed = JSON.parse(readFileSync(filePath, 'utf8'));
  writeFileSync(filePath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
}

console.log(`Pretty-printed ${files.length} JSON files in ${dirPath}`);
