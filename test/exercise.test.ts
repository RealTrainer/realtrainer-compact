/**
 * Exercise parsing tests
 * Adapted from realtrainer/backend/src/__tests__/exercise.test.ts
 */

import { describe, it, expect } from 'vitest';
import { parseCompact } from '../dist/index.js';
import type { Exercise, Pyramid, Move, Section, Phase, Tags } from '../dist/types.js';

// Helper to parse a single line within a workout context
function parseLine(line: string) {
  const result = parseCompact(`[2025-12-31] ## Test\n${line}\n`);
  if (!result.success) {
    throw new Error(`Parse failed: ${result.error.message}`);
  }
  return result.document.workouts[0].content[0];
}

// =============================================================================
// Exercise tests
// =============================================================================

describe('Exercise', () => {
  it('parses basic exercise with sets, reps, weight', () => {
    const result = parseLine('Exercise hauiskääntö|3x10@60kg') as Exercise;
    expect(result.type).toBe('exercise');
    expect(result.name).toBe('hauiskääntö');
    expect(result.sets).toBe(3);
    expect(result.reps).toBe(10);
    expect(result.weight).toEqual({ value: 60, unit: 'kg' });
  });

  it('parses exercise with bodyweight', () => {
    const result = parseLine('Exercise punnerrukset|3x20@bw') as Exercise;
    expect(result.weight).toEqual({ value: 0, unit: 'bodyweight' });
  });

  it('parses exercise with duration (seconds)', () => {
    const result = parseLine('Exercise lankku|3x30s@bw') as Exercise;
    expect(result.sets).toBe(3);
    expect(result.reps).toBe(30);
    expect(result.unit).toBe('s');
  });

  it('parses exercise with duration range', () => {
    const result = parseLine('Exercise reisivenytys|30-60s') as Exercise;
    expect(result.reps).toBe(30);
    expect(result.repsMax).toBe(60);
    expect(result.unit).toBe('s');
  });

  it('parses exercise name only (no spec)', () => {
    const result = parseLine('Exercise alavatsa') as Exercise;
    expect(result.type).toBe('exercise');
    expect(result.name).toBe('alavatsa');
    expect(result.sets).toBeNull();
  });

  it('parses exercise with note', () => {
    const result = parseLine('Exercise kyykky|5x5@100kg|tempo hidas') as Exercise;
    expect(result.note).toBe('tempo hidas');
  });

  it('parses exercise with extra pipe segments after spec', () => {
    const result = parseLine('Exercise Pakaraliike|3x10|60s|90s') as Exercise;
    expect(result.type).toBe('exercise');
    expect(result.name).toBe('Pakaraliike');
    expect(result.sets).toBe(3);
    expect(result.reps).toBe(10);
    expect(result.note).toBe('60s | 90s');
  });

  it('parses exercise with trailing pipe after spec', () => {
    const result = parseLine('Exercise yhden käden ylöspunnerrukset|3x20|') as Exercise;
    expect(result.type).toBe('exercise');
    expect(result.name).toBe('yhden käden ylöspunnerrukset');
    expect(result.sets).toBe(3);
    expect(result.reps).toBe(20);
    expect(result.note).toBeNull();
  });

  it('parses exercise with multiple text pipe segments as merged description', () => {
    const result = parseLine('Exercise vedot|4x100m|2min') as Exercise;
    expect(result.type).toBe('exercise');
    expect(result.name).toBe('vedot');
    expect(result.description).toBe('4x100m | 2min');
  });

  it('parses exercise with percentage weight', () => {
    const result = parseLine('Exercise penkki|5x5@80%') as Exercise;
    expect(result.weight).toEqual({ percent: 80, of: '1RM' });
  });

  it('parses exercise with weight range', () => {
    const result = parseLine('Exercise vipuvarsi|3x10@20-25kg') as Exercise;
    expect(result.weight).toEqual({ value: 20, valueMax: 25, unit: 'kg' });
  });

  it('parses exercise with set range', () => {
    const result = parseLine('Exercise punnerrus|2-3x10@bw') as Exercise;
    expect(result.sets).toBe(2);
    expect(result.setsMax).toBe(3);
  });

  it('parses exercise with rep range', () => {
    const result = parseLine('Exercise hauiskääntö|3x8-12@20kg') as Exercise;
    expect(result.reps).toBe(8);
    expect(result.repsMax).toBe(12);
  });

  it('parses exercise with custom fields', () => {
    const result = parseLine('Exercise penkki|3x8@80kg [[Tempo:3010]]') as Exercise;
    expect(result.customFields).toHaveLength(1);
    expect(result.customFields![0].name).toBe('Tempo');
    expect(result.customFields![0].value).toBe(3010);
  });

  // Per-side modifier tests: /suunta, /puoli, etc.
  describe('Per-side modifier', () => {
    it('parses exercise with /suunta modifier', () => {
      const result = parseLine('Exercise nilkan mobilisointi|2x15/suunta') as Exercise;
      expect(result.type).toBe('exercise');
      expect(result.name).toBe('nilkan mobilisointi');
      expect(result.sets).toBe(2);
      expect(result.reps).toBe(15);
      expect(result.repsRight).toBe(15); // Same as reps when /suunta
    });

    it('parses exercise with /puoli modifier', () => {
      const result = parseLine('Exercise lonkan kierrot|3x10/puoli') as Exercise;
      expect(result.sets).toBe(3);
      expect(result.reps).toBe(10);
      expect(result.repsRight).toBe(10);
    });

    it('parses exercise with /per side modifier (English)', () => {
      const result = parseLine('Exercise hip circles|3x12/per side') as Exercise;
      expect(result.sets).toBe(3);
      expect(result.reps).toBe(12);
      expect(result.repsRight).toBe(12);
    });

    it('parses exercise with /each modifier', () => {
      const result = parseLine('Exercise lunges|4x8/each') as Exercise;
      expect(result.sets).toBe(4);
      expect(result.reps).toBe(8);
      expect(result.repsRight).toBe(8);
    });

    it('parses exercise with time unit and /suunta', () => {
      const result = parseLine('Exercise venytys|3x30s/suunta') as Exercise;
      expect(result.sets).toBe(3);
      expect(result.reps).toBe(30);
      expect(result.unit).toBe('s');
      expect(result.repsRight).toBe(30);
    });
  });

  it('parses exercise with multiple custom fields', () => {
    const result = parseLine('Exercise kyykky|5x5@100kg [[ROM:90°]] [[Leveys:2]]') as Exercise;
    expect(result.customFields).toHaveLength(2);
    expect(result.customFields![0].name).toBe('ROM');
    expect(result.customFields![1].name).toBe('Leveys');
  });

  // Measured duration tests - pipe note format for recorded times
  describe('Measured durations (pipe note)', () => {
    it('parses duration exercise with measured times note', () => {
      const result = parseLine('Exercise lankku|3x30s|23s, 34s, 28s') as Exercise;
      expect(result.type).toBe('exercise');
      expect(result.name).toBe('lankku');
      expect(result.sets).toBe(3);
      expect(result.reps).toBe(30);
      expect(result.unit).toBe('s');
      expect(result.note).toBe('23s, 34s, 28s');
    });

    it('parses bilateral duration with measured times', () => {
      const result = parseLine('Exercise lonkan venytys|3x30s+30s|23s+28s, 30s+32s, 25s+29s') as Exercise;
      expect(result.type).toBe('exercise');
      expect(result.name).toBe('lonkan venytys');
      expect(result.sets).toBe(3);
      expect(result.reps).toBe(30);
      expect(result.repsRight).toBe(30);
      expect(result.unit).toBe('s');
      expect(result.note).toBe('23s+28s, 30s+32s, 25s+29s');
    });

    it('parses single set duration with measured time', () => {
      const result = parseLine('Exercise plank|60s|45s') as Exercise;
      expect(result.type).toBe('exercise');
      expect(result.name).toBe('plank');
      expect(result.sets).toBe(1);
      expect(result.reps).toBe(60);
      expect(result.unit).toBe('s');
      expect(result.note).toBe('45s');
    });

    it('parses duration with bodyweight and measured times', () => {
      const result = parseLine('Exercise kyykky pitko|3x45s@bw|40s, 38s, 35s') as Exercise;
      expect(result.type).toBe('exercise');
      expect(result.name).toBe('kyykky pitko');
      expect(result.sets).toBe(3);
      expect(result.reps).toBe(45);
      expect(result.unit).toBe('s');
      expect(result.weight).toEqual({ value: 0, unit: 'bodyweight' });
      expect(result.note).toBe('40s, 38s, 35s');
    });
  });
});

// =============================================================================
// Section tests
// =============================================================================

describe('Section', () => {
  it('parses section with name only', () => {
    // Section must have content after it (trailing sections are stripped)
    const res = parseCompact('[2025-12-31] ## Test\nSection Alkulämmittely\nExercise juoksu|10min\n');
    if (!res.success) throw new Error(res.error.message);
    const result = res.document.workouts[0].content[0] as Section;
    expect(result.type).toBe('section');
    expect(result.name).toBe('Alkulämmittely');
  });

  it('parses section with intensity', () => {
    const res = parseCompact('[2025-12-31] ## Test\nSection Hypyt 70%\nExercise loikat|3x10@bw\n');
    if (!res.success) throw new Error(res.error.message);
    const result = res.document.workouts[0].content[0] as Section;
    expect(result.name).toBe('Hypyt');
    expect(result.intensity).toBe(70);
  });
});

// =============================================================================
// Phase tests
// =============================================================================

describe('Phase', () => {
  it('parses phase with number and name', () => {
    const result = parseLine('Phase1 Lämmittely') as Phase;
    expect(result.type).toBe('phase');
    expect(result.number).toBe(1);
    expect(result.name).toBe('Lämmittely');
  });

  it('parses phase with details', () => {
    const result = parseLine('Phase1 Lämmittely|10min juoksua') as Phase;
    expect(result.name).toBe('Lämmittely');
    expect(result.details).toBe('10min juoksua');
  });

  it('parses phase without number', () => {
    const result = parseLine('Phase Venyttely') as Phase;
    expect(result.number).toBeNull();
    expect(result.name).toBe('Venyttely');
  });
});

// =============================================================================
// Time/Duration tests
// =============================================================================

describe('Time/Duration', () => {
  it('parses time with minutes', () => {
    const result = parseLine('Time 10min | venyttely');
    expect(result.type).toBe('duration');
    expect((result as any).duration.value).toBe(10);
    expect((result as any).duration.unit).toBe('min');
    expect((result as any).description).toBe('venyttely');
  });

  it('parses time with unknown duration', () => {
    const result = parseLine('Time ?min | venyttely kotona');
    expect((result as any).duration.value).toBeNull();
  });

  it('parses clock-like Time line as timeOfDay duration', () => {
    const result = parseLine('Time 18.00 | Kuntosali');
    expect((result as any).type).toBe('duration');
    expect((result as any).duration).toBeNull();
    expect((result as any).timeOfDay).toEqual({ hour: 18, minute: 0 });
    expect((result as any).description).toBe('Kuntosali');
  });

  it('parses clock-like Time without description', () => {
    const result = parseLine('Time 9:30');
    expect((result as any).type).toBe('duration');
    expect((result as any).duration).toBeNull();
    expect((result as any).timeOfDay).toEqual({ hour: 9, minute: 30 });
    expect((result as any).description).toBeNull();
  });
});

// =============================================================================
// Run/Move tests
// =============================================================================

describe('Run/Move', () => {
  it('parses basic run with distance', () => {
    const result = parseLine('Run 1x5km') as Move;
    expect(result.type).toBe('move');
    expect(result.count).toBe(1);
    expect(result.distance!.value).toBe(5);
    expect(result.distance!.unit).toBe('km');
  });

  it('parses run with intensity percentage', () => {
    const result = parseLine('Run 4x400m@80%') as Move;
    expect(result.intensity).toEqual({ min: 80, max: 80 });
  });

  it('parses run with intensity range', () => {
    const result = parseLine('Run 4x400m@80-90%') as Move;
    expect(result.intensity).toEqual({ min: 80, max: 90 });
  });

  it('parses run with heart rate', () => {
    const result = parseLine('Run 1x5km@120-150bpm') as Move;
    expect((result.intensity as any).hr).toEqual({ min: 120, max: 150 });
  });

  it('parses run with recovery time', () => {
    const result = parseLine('Run 4x400m@80%/2m') as Move;
    expect(result.recovery).toEqual({ value: 2, max: null, unit: 'm' });
  });

  it('parses run with sek recovery alias', () => {
    const result = parseLine('Run 4x45s@80%/45sek') as Move;
    expect(result.recovery).toEqual({ value: 45, max: null, unit: 'sec' });
  });

  it('parses run with apostrophe minute recovery', () => {
    const result = parseLine("Run 3x4x60m/2'/5'") as Move;
    expect(result.recovery).toEqual({ value: 2, max: 5, unit: 'min' });
  });

  it('parses run with count range', () => {
    const result = parseLine('Run 3-5x400m@80%') as Move;
    expect(result.count).toBe(3);
    expect(result.countMax).toBe(5);
  });

  it('parses run with note', () => {
    const result = parseLine('Run 4x400m@80%/2m | maastossa') as Move;
    expect(result.note).toBe('maastossa');
  });

  it('parses run with sport name in quotes (swimming)', () => {
    const result = parseLine('Run "uinti" 100m | rintauinti') as Move;
    expect(result.type).toBe('move');
    expect(result.sport).toBe('uinti');
    expect(result.distance!.value).toBe(100);
    expect(result.note).toBe('rintauinti');
  });

  it('parses swim interval with sport name', () => {
    const result = parseLine('Run "uinti" 4x100m@I-II | vapaauinti') as Move;
    expect(result.type).toBe('move');
    expect(result.sport).toBe('uinti');
    expect(result.count).toBe(4);
    expect((result.intensity as any).zone).toEqual({ min: 'I', max: 'II' });
  });

  it('defaults sport to juoksu when not specified', () => {
    const result = parseLine('Run 10km') as Move;
    expect(result.type).toBe('move');
    expect(result.sport).toBe('juoksu');
  });

  it('salvages run-like pyramid shorthand into move', () => {
    const result = parseLine('Pyramid 3x4x60m') as Move;
    expect(result.type).toBe('move');
    expect(result.sport).toBe('juoksu');
    expect(result.sets).toBe(3);
    expect(result.count).toBe(4);
    expect(result.distance!.value).toBe(60);
    expect(result.distance!.unit).toBe('m');
  });
});

// =============================================================================
// Pyramid tests
// =============================================================================

describe('Pyramid', () => {
  it('parses pyramid with reps and weights', () => {
    const result = parseLine('Pyramid kyykky|20x50,15x60,10x70kg') as Pyramid;
    expect(result.type).toBe('pyramid');
    expect(result.name).toBe('kyykky');
    expect(result.sets).toHaveLength(3);
    expect(result.sets[0]).toEqual({ reps: 20, weight: { value: 50, unit: 'kg' } });
    expect(result.sets[1]).toEqual({ reps: 15, weight: { value: 60, unit: 'kg' } });
    expect(result.sets[2]).toEqual({ reps: 10, weight: { value: 70, unit: 'kg' } });
  });

  it('parses pyramid with reps only', () => {
    const result = parseLine('Pyramid penkki|10-12-15-12-10') as Pyramid;
    expect(result.type).toBe('pyramid');
    expect(result.sets).toHaveLength(5);
    expect(result.sets[0]).toEqual({ reps: 10, weight: null });
  });

  it('parses pyramid with note', () => {
    const result = parseLine('Pyramid kyykky|10x50,8x60kg | tempo hidas') as Pyramid;
    expect(result.note).toBe('tempo hidas');
  });

  it('parses pyramid with bilateral reps and weights', () => {
    const result = parseLine('Pyramid yhden jalan prässi|20+20x45,20+20x80,20+20x105,20+20x120,20+20x135kg') as Pyramid;
    expect(result.type).toBe('pyramid');
    expect(result.name).toBe('yhden jalan prässi');
    expect(result.sets).toHaveLength(5);
    expect(result.sets[0]).toEqual({ reps: 20, repsRight: 20, weight: { value: 45, unit: 'kg' } });
    expect(result.sets[4]).toEqual({ reps: 20, repsRight: 20, weight: { value: 135, unit: 'kg' } });
  });
});

// =============================================================================
// Tags tests
// =============================================================================

describe('Tags', () => {
  it('parses tags line', () => {
    const result = parseLine('Tags voima, jalat, kyykky') as Tags;
    expect(result.type).toBe('tags');
    expect(result.tags).toContain('voima');
    expect(result.tags).toContain('jalat');
    expect(result.tags).toContain('kyykky');
  });

  it('parses tags with multi-word tags', () => {
    const result = parseLine('Tags dynaaminen venyttely, lyhyt treeni') as Tags;
    expect(result.tags).toContain('dynaaminen venyttely');
    expect(result.tags).toContain('lyhyt treeni');
  });
});

// =============================================================================
// Measured durations tests (actual recorded times from timer)
// =============================================================================

describe('Measured durations', () => {
  it('parses comma-separated measured durations', () => {
    const result = parseLine('Exercise Lankku|23s, 34s, 28s') as Exercise;
    expect(result.type).toBe('exercise');
    expect(result.name).toBe('Lankku');
    expect(result.specType).toBe('measured');
    expect(result.sets).toBe(3);
    expect(result.measuredDurations).toHaveLength(3);
    expect(result.measuredDurations![0]).toEqual({ left: 23, right: null, unit: 's' });
    expect(result.measuredDurations![1]).toEqual({ left: 34, right: null, unit: 's' });
    expect(result.measuredDurations![2]).toEqual({ left: 28, right: null, unit: 's' });
    expect(result.isBilateral).toBe(false);
  });

  it('parses bilateral measured durations', () => {
    const result = parseLine('Exercise Lonkan venytys|23s+28s, 30s+32s, 25s+29s') as Exercise;
    expect(result.type).toBe('exercise');
    expect(result.name).toBe('Lonkan venytys');
    expect(result.specType).toBe('measured');
    expect(result.sets).toBe(3);
    expect(result.measuredDurations).toHaveLength(3);
    expect(result.measuredDurations![0]).toEqual({ left: 23, right: 28, unit: 's' });
    expect(result.measuredDurations![1]).toEqual({ left: 30, right: 32, unit: 's' });
    expect(result.measuredDurations![2]).toEqual({ left: 25, right: 29, unit: 's' });
    expect(result.isBilateral).toBe(true);
  });

  it('parses bilateral with single unit notation', () => {
    const result = parseLine('Exercise Tasapaino|15+18s, 20+22s') as Exercise;
    expect(result.specType).toBe('measured');
    expect(result.measuredDurations).toHaveLength(2);
    expect(result.measuredDurations![0]).toEqual({ left: 15, right: 18, unit: 's' });
    expect(result.measuredDurations![1]).toEqual({ left: 20, right: 22, unit: 's' });
    expect(result.isBilateral).toBe(true);
  });

  it('parses minutes as measured durations', () => {
    const result = parseLine('Exercise Meditointi|5min, 7min, 6min') as Exercise;
    expect(result.specType).toBe('measured');
    expect(result.measuredDurations).toHaveLength(3);
    expect(result.measuredDurations![0]).toEqual({ left: 5, right: null, unit: 'min' });
    expect(result.isBilateral).toBe(false);
  });

  it('parses AI output with leading set count', () => {
    const result = parseLine('Exercise Lankku|3x45s,45s,0s') as Exercise;
    expect(result.specType).toBe('measured');
    expect(result.measuredDurations).toHaveLength(3);
    expect(result.measuredDurations![0]).toEqual({ left: 45, right: null, unit: 's' });
    expect(result.measuredDurations![1]).toEqual({ left: 45, right: null, unit: 's' });
    expect(result.measuredDurations![2]).toEqual({ left: 0, right: null, unit: 's' });
  });

  it('parses AI output with leading set count (two items)', () => {
    const result = parseLine('Exercise Lankku|2x25s,24s') as Exercise;
    expect(result.specType).toBe('measured');
    expect(result.measuredDurations).toHaveLength(2);
    expect(result.measuredDurations![0]).toEqual({ left: 25, right: null, unit: 's' });
    expect(result.measuredDurations![1]).toEqual({ left: 24, right: null, unit: 's' });
  });

  it('still parses planned format correctly', () => {
    // Ensure backwards compatibility - 3x30s should still work
    const result = parseLine('Exercise Lankku|3x30s') as Exercise;
    expect(result.type).toBe('exercise');
    expect(result.sets).toBe(3);
    expect(result.reps).toBe(30);
    expect(result.unit).toBe('s');
    expect(result.specType).toBeUndefined();
    expect(result.measuredDurations).toBeUndefined();
  });

  it('parses single measured duration with trailing comma', () => {
    // Single measured duration: buildCompactFromResult adds trailing comma
    // to distinguish from planned duration "60s" vs measured "41s,"
    const result = parseLine('Exercise Lankku|41s,') as Exercise;
    expect(result.type).toBe('exercise');
    expect(result.name).toBe('Lankku');
    expect(result.specType).toBe('measured');
    expect(result.measuredDurations).toHaveLength(1);
    expect(result.measuredDurations![0]).toEqual({ left: 41, right: null, unit: 's' });
    expect(result.isBilateral).toBe(false);
  });

  it('single duration without comma is still planned', () => {
    // Without trailing comma, single duration is interpreted as planned
    const result = parseLine('Exercise Lankku|60s') as Exercise;
    expect(result.type).toBe('exercise');
    expect(result.sets).toBe(1);
    expect(result.reps).toBe(60);
    expect(result.unit).toBe('s');
    expect(result.specType).toBeUndefined();
    expect(result.measuredDurations).toBeUndefined();
  });
});
