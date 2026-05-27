import { describe, expect, it } from 'vitest';
import {
  CompactV1Parser,
  ExerciseNode,
  IntervalNode,
  astToLegacyDocument,
  parseCompact,
  parseCompactAst,
} from '../src/index.js';

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    const out: Record<string, unknown> = {};
    for (const key of keys) {
      out[key] = canonicalize(record[key]);
    }
    return out;
  }
  return value;
}

describe('Ranger AST parser exports', () => {
  it('exports CompactV1Parser and node classes from the main entry', () => {
    expect(CompactV1Parser).toBeDefined();
    expect(ExerciseNode).toBeDefined();
    expect(IntervalNode).toBeDefined();
  });

  it('parseCompactAst parses Interval 5x1km with km unit', () => {
    const ast = parseCompactAst('[2026-01-13] ## Test\nInterval 5x1km@Z4/3min\n');
    const interval = ast.workouts[0].content[0] as IntervalNode;
    expect(interval.type).toBe('interval');
    expect(interval.hasDistance).toBe(true);
    expect(interval.distanceValue).toBe(1);
    expect(interval.distanceUnit).toBe('km');
    expect(interval.intensityText).toBe('Z4');
  });

  it('allows mutating ExerciseNode and serializing with toJSONString', () => {
    const ast = parseCompactAst('[2026-01-13] ## Test\nExercise Penkki|3x8@80kg\n');
    const exercise = ast.workouts[0].content[0] as ExerciseNode;
    expect(exercise.type).toBe('exercise');
    exercise.sets = 4;
    exercise.hasSets = true;

    const json = JSON.parse(exercise.toJSONString()) as { sets: number };
    expect(json.sets).toBe(4);
  });

  it('astToLegacyDocument matches parseCompact document shape', () => {
    const input = `[2026-01-15T18:00+02]## Jalkatreeni
Tags kuntosali
Exercise Takakyykky|4x8@80kg
`;

    const ast = parseCompactAst(input);
    const fromAst = astToLegacyDocument(ast);
    const fromLegacy = parseCompact(input);
    expect(fromLegacy.success).toBe(true);
    if (!fromLegacy.success) return;

    expect(JSON.stringify(canonicalize(fromAst))).toBe(
      JSON.stringify(canonicalize(fromLegacy.document)),
    );
  });
});
