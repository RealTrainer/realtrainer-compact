import type {
  Content,
  Exercise,
  Move,
  Pyramid,
  Tags,
  Emojis,
  Workout,
} from './types.js';
// @ts-expect-error - generated parser has no type declarations
import { parse } from './parser-generated.js';

export interface SimilarityBreakdown {
  overall: number;
  charSimilarity: number;
  numericSimilarity: number;
  structuralSimilarity: number;
  nameSimilarity: number;
  tagBonus: number;
  emojiBonus: number;
}

interface CoreRow {
  kind: 'exercise' | 'move' | 'pyramid' | 'interval' | 'contacts';
  name: string;
  structure: string;
  numbers: number[];
}

export interface SimilarityOptions {
  charWeight?: number;
  numericWeight?: number;
  structuralWeight?: number;
  nameWeight?: number;
  maxTagBonus?: number;
  maxEmojiBonus?: number;
}

const DEFAULT_OPTIONS: Required<SimilarityOptions> = {
  charWeight: 0.14,
  numericWeight: 0.3,
  structuralWeight: 0.24,
  nameWeight: 0.32,
  maxTagBonus: 0.04,
  maxEmojiBonus: 0.02,
};

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function safeLower(value: string | null | undefined): string {
  return (value || '').toLowerCase().trim();
}

function normalizeText(value: string): string {
  return safeLower(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value: string): string[] {
  const normalized = normalizeText(value);
  if (!normalized) return [];
  return normalized
    .split(/[^\p{L}\p{N}]+/u)
    .map((token) => token.trim())
    .filter(Boolean);
}

function diceCoefficient(a: string, b: string): number {
  const left = normalizeText(a);
  const right = normalizeText(b);
  if (!left && !right) return 1;
  if (!left || !right) return 0;
  if (left === right) return 1;
  if (left.length < 2 || right.length < 2) return left === right ? 1 : 0;

  const leftBigrams = new Map<string, number>();
  for (let i = 0; i < left.length - 1; i += 1) {
    const key = left.slice(i, i + 2);
    leftBigrams.set(key, (leftBigrams.get(key) || 0) + 1);
  }

  let intersection = 0;
  for (let i = 0; i < right.length - 1; i += 1) {
    const key = right.slice(i, i + 2);
    const count = leftBigrams.get(key) || 0;
    if (count > 0) {
      leftBigrams.set(key, count - 1);
      intersection += 1;
    }
  }

  return (2 * intersection) / ((left.length - 1) + (right.length - 1));
}

function overlapScore(left: string[], right: string[]): number {
  if (left.length === 0 && right.length === 0) return 1;
  if (left.length === 0 || right.length === 0) return 0;
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  let inter = 0;
  for (const item of leftSet) {
    if (rightSet.has(item)) inter += 1;
  }
  return (2 * inter) / (leftSet.size + rightSet.size);
}

function isExercise(item: Content): item is Exercise {
  return item.type === 'exercise';
}

function isMove(item: Content): item is Move {
  return item.type === 'move';
}

function isPyramid(item: Content): item is Pyramid {
  return item.type === 'pyramid';
}

function isTags(item: Content): item is Tags {
  return item.type === 'tags';
}

function isEmojis(item: Content): item is Emojis {
  return item.type === 'emojis';
}

function toSeconds(value: number, unit: string | null | undefined): number {
  if (!Number.isFinite(value)) return 0;
  if (unit === 'min') return value * 60;
  return value;
}

function pushFinite(target: number[], value: number | null | undefined): void {
  if (typeof value === 'number' && Number.isFinite(value)) {
    target.push(value);
  }
}

function coreRows(workout: Workout): CoreRow[] {
  const rows: CoreRow[] = [];

  for (const item of workout.content) {
    if (isExercise(item)) {
      const numbers: number[] = [];
      pushFinite(numbers, item.sets);
      pushFinite(numbers, typeof item.reps === 'number' ? item.reps : null);
      pushFinite(numbers, item.repsMax);
      pushFinite(numbers, item.repsRight);
      if (item.weight && 'value' in item.weight) {
        pushFinite(numbers, item.weight.value);
        pushFinite(numbers, item.weight.valueMax);
      }
      if (item.weight && 'percent' in item.weight) {
        pushFinite(numbers, item.weight.percent);
        pushFinite(numbers, item.weight.percentMax);
      }

      rows.push({
        kind: 'exercise',
        name: normalizeText(item.name),
        structure: [
          'exercise',
          item.unit || '-',
          item.weight ? 'w' : '-',
          item.recovery ? 'r' : '-',
          typeof item.reps === 'number' ? 'rep' : 'nrep',
        ].join('|'),
        numbers,
      });
      continue;
    }

    if (isMove(item)) {
      const numbers: number[] = [];
      pushFinite(numbers, item.sets);
      pushFinite(numbers, item.count);
      pushFinite(numbers, item.countMax);
      if (item.distance) {
        pushFinite(numbers, item.distance.value);
        pushFinite(numbers, item.distance.valueMax);
      }
      if (item.duration) {
        pushFinite(numbers, toSeconds(item.duration.value, item.duration.unit));
      }

      rows.push({
        kind: 'move',
        name: normalizeText(item.sport),
        structure: [
          'move',
          item.distance?.unit || '-',
          item.duration?.unit || '-',
          item.intensity ? 'i' : '-',
          item.recovery ? 'r' : '-',
        ].join('|'),
        numbers,
      });
      continue;
    }

    if (isPyramid(item)) {
      const numbers: number[] = [];
      for (const set of item.sets) {
        pushFinite(numbers, set.sets);
        pushFinite(numbers, set.reps);
        pushFinite(numbers, set.repsRight);
        if (set.weight && 'value' in set.weight) {
          pushFinite(numbers, set.weight.value);
          pushFinite(numbers, set.weight.valueMax);
        }
        if (set.weight && 'percent' in set.weight) {
          pushFinite(numbers, set.weight.percent);
          pushFinite(numbers, set.weight.percentMax);
        }
      }

      rows.push({
        kind: 'pyramid',
        name: normalizeText(item.name),
        structure: `pyramid|${item.sets.length}`,
        numbers,
      });
      continue;
    }

    if (item.type === 'interval') {
      const numbers: number[] = [];
      pushFinite(numbers, item.count);
      pushFinite(numbers, item.distance.value);
      pushFinite(numbers, item.intensity.min);
      pushFinite(numbers, item.intensity.max);
      pushFinite(numbers, item.recovery.min);
      pushFinite(numbers, item.recovery.max);

      rows.push({
        kind: 'interval',
        name: 'interval',
        structure: `interval|${item.distance.unit}`,
        numbers,
      });
      continue;
    }

    if (item.type === 'contacts') {
      rows.push({
        kind: 'contacts',
        name: normalizeText(item.name),
        structure: 'contacts',
        numbers: [item.count ?? 0],
      });
    }
  }

  return rows;
}

function vectorSimilarity(left: number[], right: number[]): number {
  if (left.length === 0 && right.length === 0) return 1;
  if (left.length === 0 || right.length === 0) return 0;

  const a = [...left].sort((x, y) => x - y);
  const b = [...right].sort((x, y) => x - y);
  const length = Math.max(a.length, b.length);
  let total = 0;
  for (let i = 0; i < length; i += 1) {
    total += numberCloseness(a[i] ?? 0, b[i] ?? 0);
  }
  return total / length;
}

function rowSimilarity(left: CoreRow, right: CoreRow): number {
  if (left.kind !== right.kind) return 0;

  const nameScore = diceCoefficient(left.name, right.name);
  const structureScore = diceCoefficient(left.structure, right.structure);
  const numbersScore = vectorSimilarity(left.numbers, right.numbers);

  const raw = (nameScore * 0.65) + (structureScore * 0.2) + (numbersScore * 0.15);

  // Near-equal core rows should be treated as full match even with set/rep variation.
  if (nameScore >= 0.93 && structureScore >= 0.55) {
    return 1;
  }
  if (nameScore >= 0.82 && structureScore >= 0.75 && numbersScore >= 0.45) {
    return 1;
  }

  return clamp01(raw);
}

function rowMatchSimilarity(workoutA: Workout, workoutB: Workout): number {
  const left = coreRows(workoutA);
  const right = coreRows(workoutB);
  if (left.length === 0 && right.length === 0) return 1;
  if (left.length === 0 || right.length === 0) return 0;

  let sumLeft = 0;
  for (const l of left) {
    let best = 0;
    for (const r of right) {
      best = Math.max(best, rowSimilarity(l, r));
    }
    sumLeft += best;
  }

  let sumRight = 0;
  for (const r of right) {
    let best = 0;
    for (const l of left) {
      best = Math.max(best, rowSimilarity(r, l));
    }
    sumRight += best;
  }

  return (sumLeft + sumRight) / (left.length + right.length);
}

function flattenNumbers(workout: Workout): number[] {
  const values: number[] = [];

  for (const row of coreRows(workout)) {
    values.push(...row.numbers);
  }

  return values;
}

function numberCloseness(a: number, b: number): number {
  const absA = Math.abs(a);
  const absB = Math.abs(b);
  if (absA === 0 && absB === 0) return 1;
  if (absA === 0 || absB === 0) return 0;
  return Math.min(absA, absB) / Math.max(absA, absB);
}

function numericSimilarity(workoutA: Workout, workoutB: Workout): number {
  const left = flattenNumbers(workoutA).sort((a, b) => a - b);
  const right = flattenNumbers(workoutB).sort((a, b) => a - b);

  if (left.length === 0 && right.length === 0) return 1;
  if (left.length === 0 || right.length === 0) return 0;

  const length = Math.max(left.length, right.length);
  let total = 0;
  for (let i = 0; i < length; i += 1) {
    const a = left[i] ?? 0;
    const b = right[i] ?? 0;
    total += numberCloseness(a, b);
  }
  return total / length;
}

function workoutShapeSignature(workout: Workout): string[] {
  const signatures: string[] = [];

  for (const item of workout.content) {
    if (isExercise(item)) {
      signatures.push(
        [
          'exercise',
          item.unit || '-',
          item.weight ? 'w' : '-',
          item.recovery ? 'r' : '-',
          typeof item.reps === 'number' ? 'rep' : 'nrep',
          item.measuredDurations?.length ? 'meas' : '-',
        ].join('|')
      );
      continue;
    }

    if (isMove(item)) {
      signatures.push(
        [
          'move',
          normalizeText(item.sport),
          item.distance?.unit || '-',
          item.duration?.unit || '-',
          item.recovery ? 'r' : '-',
          item.intensity ? 'i' : '-',
          item.splits?.length ? 'split' : '-',
        ].join('|')
      );
      continue;
    }

    if (isPyramid(item)) {
      signatures.push(`pyramid|${item.sets.length}`);
      continue;
    }

    if (item.type === 'interval') {
      signatures.push(`interval|${item.distance.unit}`);
      continue;
    }

    if (item.type === 'contacts') {
      signatures.push('contacts');
    }
  }

  return signatures;
}

function extractNameStrings(workout: Workout): string[] {
  const names: string[] = [];

  for (const item of workout.content) {
    if (isExercise(item)) {
      names.push(item.name);
      continue;
    }
    if (isMove(item)) {
      names.push(item.sport);
      continue;
    }
    if (isPyramid(item)) {
      names.push(item.name);
    }
  }

  return names.map(normalizeText).filter(Boolean);
}

function nameSimilarity(workoutA: Workout, workoutB: Workout): number {
  const leftNames = extractNameStrings(workoutA);
  const rightNames = extractNameStrings(workoutB);
  if (leftNames.length === 0 && rightNames.length === 0) return 1;
  if (leftNames.length === 0 || rightNames.length === 0) return 0;

  const leftTokens = tokenize(leftNames.join(' '));
  const rightTokens = tokenize(rightNames.join(' '));
  const tokenScore = overlapScore(leftTokens, rightTokens);

  let maxPairSum = 0;
  for (const left of leftNames) {
    let best = 0;
    for (const right of rightNames) {
      best = Math.max(best, diceCoefficient(left, right));
    }
    maxPairSum += best;
  }
  const pairScore = maxPairSum / leftNames.length;

  return (tokenScore * 0.45) + (pairScore * 0.55);
}

function fingerprintText(workout: Workout): string {
  const names = extractNameStrings(workout).join(' ');
  const shape = workoutShapeSignature(workout).join(' ');
  const nums = flattenNumbers(workout)
    .map((n) => String(Math.round(n * 100) / 100))
    .join(' ');
  return `${names} ${shape} ${nums}`.trim();
}

function extractTags(workout: Workout): string[] {
  const tags = workout.content
    .filter(isTags)
    .flatMap((item) => item.tags)
    .map(normalizeText)
    .filter(Boolean);
  return [...new Set(tags)];
}

function extractEmojiSet(workout: Workout): string[] {
  const raw = workout.content
    .filter(isEmojis)
    .map((item) => item.emojis)
    .join('');
  if (!raw) return [];
  const chars = Array.from(raw)
    .map((ch) => ch.trim())
    .filter(Boolean);
  return [...new Set(chars)];
}

function withDefaults(options?: SimilarityOptions): Required<SimilarityOptions> {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
  };
}

/**
 * Compare two parsed workouts with a heuristic similarity score.
 */
export function compareWorkouts(
  workoutA: Workout,
  workoutB: Workout,
  options?: SimilarityOptions
): SimilarityBreakdown {
  const opts = withDefaults(options);

  const charSimilarity = diceCoefficient(fingerprintText(workoutA), fingerprintText(workoutB));
  const numericScore = numericSimilarity(workoutA, workoutB);
  const structuralScore = rowMatchSimilarity(workoutA, workoutB);
  const namesScore = nameSimilarity(workoutA, workoutB);

  const tagsA = extractTags(workoutA);
  const tagsB = extractTags(workoutB);
  const emojisA = extractEmojiSet(workoutA);
  const emojisB = extractEmojiSet(workoutB);

  const tagBonus = overlapScore(tagsA, tagsB);
  const emojiBonus = overlapScore(emojisA, emojisB);

  const weightedBase =
    (charSimilarity * opts.charWeight) +
    (numericScore * opts.numericWeight) +
    (structuralScore * opts.structuralWeight) +
    (namesScore * opts.nameWeight);

  const totalWeights = opts.charWeight + opts.numericWeight + opts.structuralWeight + opts.nameWeight;
  const base = totalWeights > 0 ? weightedBase / totalWeights : 0;

  const overall = clamp01(
    base +
      (tagBonus * opts.maxTagBonus) +
      (emojiBonus * opts.maxEmojiBonus)
  );

  return {
    overall,
    charSimilarity: clamp01(charSimilarity),
    numericSimilarity: clamp01(numericScore),
    structuralSimilarity: clamp01(structuralScore),
    nameSimilarity: clamp01(namesScore),
    tagBonus: clamp01(tagBonus),
    emojiBonus: clamp01(emojiBonus),
  };
}

/**
 * Compare first workout from two COMPACT texts.
 * Useful for quick text-level testing in UI tooling.
 */
export function compareCompactTexts(
  compactA: string,
  compactB: string,
  options?: SimilarityOptions
): SimilarityBreakdown {
  const parseDocument = (input: string): { workouts: Workout[] } => {
    const normalizedInput = input.endsWith('\n') ? input : `${input}\n`;
    const document = parse(normalizedInput) as { workouts: Workout[] };

    for (const workout of document.workouts) {
      while (
        workout.content.length > 0 &&
        workout.content[workout.content.length - 1].type === 'section'
      ) {
        workout.content.pop();
      }
    }

    return document;
  };

  let documentA: { workouts: Workout[] };
  let documentB: { workouts: Workout[] };
  try {
    documentA = parseDocument(compactA);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`First COMPACT parse failed: ${message}`);
  }
  try {
    documentB = parseDocument(compactB);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Second COMPACT parse failed: ${message}`);
  }

  const workoutA = documentA.workouts[0];
  const workoutB = documentB.workouts[0];

  if (!workoutA || !workoutB) {
    throw new Error('Both COMPACT inputs must contain at least one workout');
  }

  return compareWorkouts(workoutA, workoutB, options);
}
