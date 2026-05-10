import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { parseCompact } from '../index.js';
import { serializeContent, serializeDate } from '../renderers/compact.js';
import type { Content, Document, Pyramid, Weight, Workout } from '../types.js';

interface CliOptions {
  inputPath: string;
  outputPath: string;
}

interface ConversionStats {
  droppedByType: Map<string, number>;
  droppedBrokenLines: number;
  convertedPyramids: number;
}

function createStats(): ConversionStats {
  return {
    droppedByType: new Map<string, number>(),
    droppedBrokenLines: 0,
    convertedPyramids: 0,
  };
}

function markDropped(stats: ConversionStats, type: string): void {
  stats.droppedByType.set(type, (stats.droppedByType.get(type) ?? 0) + 1);
}

function normalizePipesToSemicolons(line: string): string {
  return line.replace(/\s*\|\s*/g, '; ');
}

function normalizeLineForNg(rawLine: string): string | null {
  let line = rawLine.trimEnd();
  if (!line) return null;

  // Drop clearly broken serializer artifacts.
  if (line.includes('[object Object]')) {
    return null;
  }

  // NG tests use plain exercise name line + details separator ';'.
  if (line.startsWith('Exercise ')) {
    line = line.slice('Exercise '.length);
  }

  // L0..L3 are v1 shorthand; NG idiom uses plain heading-like sport text.
  if (/^L[0-3]\s+/.test(line)) {
    line = line.replace(/^L[0-3]\s+/, '');
  }

  line = normalizePipesToSemicolons(line);
  return line.trim().length > 0 ? line : null;
}

function weightToAttemptSuffix(weight: Weight | null): string {
  if (!weight) return '';

  if ('value' in weight) {
    if (weight.unit === 'bodyweight') return '@bw';
    const unit = weight.unit || 'kg';
    return `@${weight.value}${unit}`;
  }

  if ('percent' in weight) {
    const max = weight.percentMax && weight.percentMax !== weight.percent
      ? `-${weight.percentMax}`
      : '';
    const of = weight.of || '';
    return `@${weight.percent}${max}%${of}`;
  }

  if ('template' in weight) {
    return `@{{${weight.template.type}:${weight.template.hint}}}`;
  }

  return '';
}

function convertPyramidToNgLines(pyramid: Pyramid): string[] {
  const lines: string[] = [];
  const title = pyramid.name.trim();
  if (title.length > 0) {
    lines.push(title);
  }

  for (const set of pyramid.sets) {
    const reps = set.repsRight != null ? `${set.reps}+${set.repsRight}` : `${set.reps}`;
    const repsToken = set.sets && set.sets > 1 ? `${set.sets}x${reps}` : reps;
    const suffix = weightToAttemptSuffix(set.weight);
    lines.push(`> Attempt ${repsToken}${suffix}`);
  }

  if (pyramid.note && pyramid.note.trim().length > 0) {
    lines.push(`> Comment ${pyramid.note.trim()}`);
  }

  return lines;
}

function serializeWorkoutHeader(workout: Workout): string | null {
  const dateStr = workout.date ? serializeDate(workout.date) : '';
  const title = typeof workout.title === 'string' ? workout.title.trim() : '';
  const hasTitle = title.length > 0;

  if (dateStr && hasTitle) {
    return `[${dateStr}] ## ${title}`;
  }
  if (dateStr) {
    return `[${dateStr}]`;
  }
  if (hasTitle) {
    return `## ${title}`;
  }

  return null;
}

function convertDocumentToNgText(document: Document, stats: ConversionStats): string {
  const workouts: string[] = [];

  for (const workout of document.workouts) {
    const lines: string[] = [];
    const header = serializeWorkoutHeader(workout);
    if (header) {
      lines.push(header);
    }

    for (const item of workout.content) {
      const entryType = (item as Content).type;

      // Do not pass through clearly unsupported/unsafe lines.
      if (entryType === 'meta' || entryType === 'unknown') {
        markDropped(stats, entryType);
        continue;
      }

      if (entryType === 'pyramid') {
        stats.convertedPyramids += 1;
        const pyramidLines = convertPyramidToNgLines(item as Pyramid)
          .map((line) => normalizeLineForNg(line))
          .filter((line): line is string => line !== null);
        lines.push(...pyramidLines);
        continue;
      }

      const serialized = serializeContent(item as Content);
      if (!serialized) {
        continue;
      }

      for (const rawLine of serialized.split('\n')) {
        const normalized = normalizeLineForNg(rawLine);
        if (!normalized) {
          stats.droppedBrokenLines += 1;
          continue;
        }
        lines.push(normalized);
      }
    }

    if (lines.length > 0) {
      workouts.push(lines.join('\n'));
    }
  }

  return workouts.join('\n\n');
}

function printUsage(): void {
  console.log('Usage: compact-v1-to-ng <input.compact> [output.ng.compact]');
}

function parseArgs(argv: string[]): CliOptions | null {
  const positional = argv.filter((arg) => !arg.startsWith('-'));
  if (positional.length < 1) {
    return null;
  }

  const inputPath = positional[0];
  const outputPath = positional[1] ?? deriveDefaultOutputPath(inputPath);

  return { inputPath, outputPath };
}

function deriveDefaultOutputPath(inputPath: string): string {
  const parsed = path.parse(inputPath);
  return path.join(parsed.dir, `${parsed.name}.ng${parsed.ext || '.compact'}`);
}

async function run(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  if (!options) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const source = await readFile(options.inputPath, 'utf8');
  const parsed = parseCompact(source);
  if (!parsed.success) {
    const location = parsed.error.location?.start;
    const where = location ? ` (line ${location.line}, col ${location.column})` : '';
    throw new Error(`Failed to parse input${where}: ${parsed.error.message}`);
  }

  const stats = createStats();
  const outText = convertDocumentToNgText(parsed.document, stats);
  const normalized = outText.endsWith('\n') ? outText : `${outText}\n`;
  await writeFile(options.outputPath, normalized, 'utf8');

  console.log(`Converted ${options.inputPath} -> ${options.outputPath}`);
  console.log(`Workouts: ${parsed.document.workouts.length}`);
  console.log(`Pyramids converted to Attempt: ${stats.convertedPyramids}`);
  if (stats.droppedByType.size > 0) {
    const summary = [...stats.droppedByType.entries()]
      .map(([type, count]) => `${type}:${count}`)
      .join(', ');
    console.log(`Dropped unsupported entries: ${summary}`);
  }
  if (stats.droppedBrokenLines > 0) {
    console.log(`Dropped broken lines: ${stats.droppedBrokenLines}`);
  }
}

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
