/**
 * Compact Parser tests
 * Tests for the compact.pegjs parser
 */

import { describe, it, expect } from 'vitest';
import { getDeclaredCompactFormat, parseCompact, validateCompact, formatParseError } from '../dist/index.js';
import type { Exercise, Move, Food, Expense, Tags, Section, SleepEntry, BodyMeasurement, Meta } from '../dist/types.js';

// Helper to get content item by type
function getContent<T>(input: string, type: string): T {
  const result = parseCompact(input);
  if (!result.success) {
    throw new Error(`Parse failed: ${result.error.message}`);
  }
  const workout = result.document.workouts[0];
  return workout.content.find((c) => c.type === type) as T;
}

// =============================================================================
// Basic Parsing tests
// =============================================================================

describe('Basic Parsing', () => {
  it('parses workout with date and title', () => {
    const result = parseCompact('[2026-01-13] ## Jalkatreeni\n');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.document.workouts).toHaveLength(1);
      expect(result.document.workouts[0].title).toBe('Jalkatreeni');
      expect(result.document.workouts[0].date?.type).toBe('date');
      if (result.document.workouts[0].date?.type === 'date') {
        expect(result.document.workouts[0].date.year).toBe(2026);
      }
    }
  });

  it('parses workout with datetime and timezone', () => {
    const result = parseCompact('[2026-01-13T18:00+02] ## Treeni\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const date = result.document.workouts[0].date;
      expect(date?.type).toBe('datetime');
      if (date?.type === 'datetime') {
        expect(date.hour).toBe(18);
        expect(date.timezone).toBe('+02');
      }
    }
  });

  it('parses date on separate line before title', () => {
    const result = parseCompact('[2026-01-24T13:11+02]\n## Välipala\nTags välipala\n');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.document.workouts).toHaveLength(1);
      expect(result.document.workouts[0].title).toBe('Välipala');
      const date = result.document.workouts[0].date;
      expect(date?.type).toBe('datetime');
      if (date?.type === 'datetime') {
        expect(date.year).toBe(2026);
        expect(date.month).toBe(1);
        expect(date.day).toBe(24);
        expect(date.hour).toBe(13);
        expect(date.minute).toBe(11);
      }
    }
  });

  it('parses date inside title header', () => {
    const result = parseCompact('## [2026-01-24T13:11+02] Välipala\nTags välipala\n');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.document.workouts).toHaveLength(1);
      expect(result.document.workouts[0].title).toBe('Välipala');
      const date = result.document.workouts[0].date;
      expect(date?.type).toBe('datetime');
      if (date?.type === 'datetime') {
        expect(date.year).toBe(2026);
        expect(date.hour).toBe(13);
      }
    }
  });

  it('validates correct input', () => {
    const { valid } = validateCompact('[2026-01-13] ## Test\n');
    expect(valid).toBe(true);
  });

  it('validates incorrect input', () => {
    const { valid, error } = validateCompact('[[invalid syntax');
    expect(valid).toBe(false);
    expect(error).toBeDefined();
  });

  it('formats parse error with location', () => {
    const result = parseCompact('[[invalid');
    if (!result.success) {
      const formatted = formatParseError(result.error);
      expect(formatted).toContain('Line');
    }
  });

  it('parses Derived source with multiplication markers', () => {
    const result = parseCompact('[2026-03-11] ## Voimaharjoittelu\nDerived strength.total_volume_load 4850|kg basis:entity confidence:85% source:sets*reps*load goodness:4\n');
    expect(result.success).toBe(true);
    if (!result.success) return;

    const derived = result.document.workouts[0].content.find((c) => c.type === 'derived') as any;
    const unknown = result.document.workouts[0].content.find((c) => c.type === 'unknown');
    expect(derived).toBeDefined();
    expect(derived.name).toBe('strength.total_volume_load');
    expect(derived.value).toBe(4850);
    expect(derived.unit).toBe('kg');
    expect(derived.source).toBe('sets*reps*load');
    expect(derived.goodness).toBe(4);
    expect(unknown).toBeUndefined();
  });

  it('parses explicit Format marker as document format and hides it from workout content', () => {
    const result = parseCompact('[2026-01-13] ## Test\nFormat compact/v2\nExercise Kyykky|3x5@90kg\n');
    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.document.format).toBe('compact/v2');
    expect(getDeclaredCompactFormat(result.document)).toBe('compact/v2');
    expect(result.document.workouts[0].format).toBe('compact/v2');
    expect(result.document.workouts[0].content.find((item) => item.type === 'meta')).toBeUndefined();
    expect(result.document.workouts[0].content.find((item) => item.type === 'exercise')).toBeDefined();
  });

  it('parses Meta format marker as declared format and keeps other meta rows intact', () => {
    const result = parseCompact('[2026-01-13] ## Test\nMeta format=compact/v2\n> goal:kyykky 160kg\nExercise Kyykky|3x5@90kg\n');
    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.document.format).toBe('compact/v2');
    expect(getDeclaredCompactFormat(result.document.workouts[0])).toBe('compact/v2');

    const meta = result.document.workouts[0].content.find((item) => item.type === 'meta') as Meta | undefined;
    expect(meta).toBeDefined();
    expect(meta?.key).toBe('goal');
    expect(meta?.value).toBe('kyykky 160kg');
  });
});

// =============================================================================
// Exercise tests
// =============================================================================

describe('Exercise', () => {
  it('parses Exercise with full prefix', () => {
    const content = getContent<Exercise>('[2026-01-13] ## Test\nExercise Kyykky|4x8@80kg\n', 'exercise');
    expect(content.name).toBe('Kyykky');
    expect(content.sets).toBe(4);
    expect(content.reps).toBe(8);
    expect(content.weight).toBeDefined();
    if (content.weight && 'value' in content.weight) {
      expect(content.weight.value).toBe(80);
      expect(content.weight.unit).toBe('kg');
    }
  });

  it('parses Exercise with bodyweight', () => {
    const content = getContent<Exercise>('[2026-01-13] ## Test\nExercise Punnerrus|3x15@bw\n', 'exercise');
    expect(content.weight).toBeDefined();
    if (content.weight && 'unit' in content.weight) {
      expect(content.weight.unit).toBe('bodyweight');
    }
  });

  it('parses Exercise with note', () => {
    const content = getContent<Exercise>('[2026-01-13] ## Test\nExercise Kyykky|5x5@100kg|tempo hidas\n', 'exercise');
    expect(content.note).toBe('tempo hidas');
  });

  it('parses Pyramid with bilateral reps using @ weight', () => {
    const result = parseCompact('[2026-01-13] ## Test\nPyramid yhden jalan prässi|20+20@45,20+20@80,20+20@105kg\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const pyramid = result.document.workouts[0].content.find((c) => c.type === 'pyramid') as any;
      expect(pyramid).toBeDefined();
      expect(pyramid.sets).toHaveLength(3);
      expect(pyramid.sets[0].reps).toBe(20);
      expect(pyramid.sets[0].repsRight).toBe(20);
      expect(pyramid.sets[0].weight.value).toBe(45);
      expect(pyramid.sets[0].weight.unit).toBe('kg');
      expect(pyramid.sets[2].weight.value).toBe(105);
    }
  });

  it('parses Pyramid with setCount + bilateral reps using @ weight', () => {
    const result = parseCompact('[2026-01-13] ## Test\nPyramid yhden jalan prässi|2x20+20@80kg\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const pyramid = result.document.workouts[0].content.find((c) => c.type === 'pyramid') as any;
      expect(pyramid).toBeDefined();
      expect(pyramid.sets).toHaveLength(2);
      expect(pyramid.sets[0].reps).toBe(20);
      expect(pyramid.sets[0].repsRight).toBe(20);
      expect(pyramid.sets[0].weight.value).toBe(80);
      expect(pyramid.sets[0].weight.unit).toBe('kg');
      expect(pyramid.sets[1].repsRight).toBe(20);
    }
  });

  it('parses Exercise with bracket text containing comma after weighted spec', () => {
    const result = parseCompact('[2026-03-07] ## Test\nExercise Rinnalleveto riipusta|3x3@75kg [[Terävä ja puhdas, ei loppuun asti]]\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const exercise = result.document.workouts[0].content.find((c) => c.type === 'exercise') as Exercise | undefined;
      expect(exercise).toBeDefined();
      expect(exercise?.name).toBe('Rinnalleveto riipusta');
      expect(exercise?.sets).toBe(3);
      expect(exercise?.reps).toBe(3);
      expect(exercise?.weight).toBeDefined();
      if (exercise?.weight && 'value' in exercise.weight) {
        expect(exercise.weight.value).toBe(75);
        expect(exercise.weight.unit).toBe('kg');
      }
      expect(exercise?.customFields).toEqual([
        { name: 'Terävä ja puhdas, ei loppuun asti', value: true, unit: null }
      ]);
      const unknown = result.document.workouts[0].content.find((c) => c.type === 'unknown');
      expect(unknown).toBeUndefined();
    }
  });

  it('parses contacts with unknown count fallback', () => {
    const result = parseCompact('[2026-01-13] ## Test\nContacts ? | ulkona\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const contacts = result.document.workouts[0].content.find((c) => c.type === 'contacts') as any;
      expect(contacts).toBeDefined();
      expect(contacts.count).toBeNull();
      expect(contacts.name).toBe('ulkona');
    }
  });

  it('parses contacts with text-only fallback', () => {
    const result = parseCompact('[2026-01-13] ## Test\nContacts riippuu ryhmäläisten määrästä\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const contacts = result.document.workouts[0].content.find((c) => c.type === 'contacts') as any;
      expect(contacts).toBeDefined();
      expect(contacts.count).toBeNull();
      expect(contacts.name).toBe('riippuu ryhmäläisten määrästä');
    }
  });

  it('salvages pipe-form pyramid shorthand into move', () => {
    const result = parseCompact('[2026-01-13] ## Test\nPyramid 3x4|60m\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const move = result.document.workouts[0].content.find((c) => c.type === 'move') as any;
      expect(move).toBeDefined();
      expect(move.sets).toBe(3);
      expect(move.count).toBe(4);
      expect(move.distance.value).toBe(60);
      expect(move.distance.unit).toBe('m');
    }
  });
});

// =============================================================================
// Circuit/Superset tests
// =============================================================================

describe('Circuit', () => {
  it('parses basic Circuit with rounds', () => {
    const result = parseCompact(`[2026-01-13] ## Test
Circuit|3
> Penkkipunnerrus 8@80kg
> Etunojapunnerrus 5
`);
    expect(result.success).toBe(true);
    if (result.success) {
      const circuit = result.document.workouts[0].content.find((c) => c.type === 'circuit') as any;
      expect(circuit).toBeDefined();
      expect(circuit.variant).toBe('circuit');
      expect(circuit.rounds).toBe(3);
      expect(circuit.exercises).toHaveLength(2);
      expect(circuit.exercises[0].name).toBe('Penkkipunnerrus');
      expect(circuit.exercises[0].reps).toBe(8);
      expect(circuit.exercises[0].weight.value).toBe(80);
      expect(circuit.exercises[1].name).toBe('Etunojapunnerrus');
      expect(circuit.exercises[1].reps).toBe(5);
    }
  });

  it('parses Circuit with AMRAP (? rounds)', () => {
    const result = parseCompact(`[2026-01-13] ## Test
Circuit|?
> Air Squats 15
> Push-ups 10
> Sit-ups 8
`);
    expect(result.success).toBe(true);
    if (result.success) {
      const circuit = result.document.workouts[0].content.find((c) => c.type === 'circuit') as any;
      expect(circuit).toBeDefined();
      expect(circuit.variant).toBe('circuit');
      expect(circuit.rounds).toBeNull(); // AMRAP = unknown rounds
      expect(circuit.exercises).toHaveLength(3);
      expect(circuit.exercises[0].name).toBe('Air Squats');
      expect(circuit.exercises[0].reps).toBe(15);
    }
  });

  it('parses Circuit with round rest', () => {
    const result = parseCompact(`[2026-01-13] ## Test
Circuit|4/2min
> Kyykky 8@100kg
> Prässi 10@80kg
`);
    expect(result.success).toBe(true);
    if (result.success) {
      const circuit = result.document.workouts[0].content.find((c) => c.type === 'circuit') as any;
      expect(circuit.rounds).toBe(4);
      expect(circuit.roundRest).toEqual({ value: 2, unit: 'min' });
    }
  });

  it('parses Circuit with note', () => {
    const result = parseCompact(`[2026-01-13] ## Test
Circuit|3 | kontrastivoimapiiri
> Kyykky 5@100kg
> Loikat 8
`);
    expect(result.success).toBe(true);
    if (result.success) {
      const circuit = result.document.workouts[0].content.find((c) => c.type === 'circuit') as any;
      expect(circuit.note).toBe('kontrastivoimapiiri');
    }
  });

  it('parses Superset variant', () => {
    const result = parseCompact(`[2026-01-13] ## Test
Superset|3
> Hauiskääntö 12@10kg
> Ojentajapunnerrus 12@10kg
`);
    expect(result.success).toBe(true);
    if (result.success) {
      const circuit = result.document.workouts[0].content.find((c) => c.type === 'circuit') as any;
      expect(circuit.variant).toBe('superset');
      expect(circuit.rounds).toBe(3);
    }
  });

  it('parses Circuit item with sets x reps', () => {
    const result = parseCompact(`[2026-01-13] ## Test
Circuit|2
> Penkkipunnerrus 3x8@60kg
`);
    expect(result.success).toBe(true);
    if (result.success) {
      const circuit = result.document.workouts[0].content.find((c) => c.type === 'circuit') as any;
      expect(circuit.exercises[0].sets).toBe(3);
      expect(circuit.exercises[0].reps).toBe(8);
      expect(circuit.exercises[0].weight.value).toBe(60);
    }
  });

  it('parses Circuit item with bilateral reps', () => {
    const result = parseCompact(`[2026-01-13] ## Test
Circuit|3
> Hauiskääntö 10+10@12kg
`);
    expect(result.success).toBe(true);
    if (result.success) {
      const circuit = result.document.workouts[0].content.find((c) => c.type === 'circuit') as any;
      expect(circuit.exercises[0].reps).toBe(10);
      expect(circuit.exercises[0].repsRight).toBe(10);
    }
  });

  it('parses Circuit item with recovery', () => {
    const result = parseCompact(`[2026-01-13] ## Test
Circuit|3
> Hauiskääntö 10@10kg/30s
`);
    expect(result.success).toBe(true);
    if (result.success) {
      const circuit = result.document.workouts[0].content.find((c) => c.type === 'circuit') as any;
      expect(circuit.exercises[0].recovery).toEqual({ value: 30, max: null, unit: 'sec' });
    }
  });

  it('parses measured bilateral exercise with recovery', () => {
    const result = parseCompact(`[2026-01-13] ## Test
Exercise Side Plank|2x20s+37s,23s+21s/60s
`);
    expect(result.success).toBe(true);
    if (result.success) {
      const exercise = result.document.workouts[0].content.find((c) => c.type === 'exercise') as any;
      expect(exercise.specType).toBe('measured');
      expect(exercise.measuredDurations[0]).toEqual({ left: 20, right: 37, unit: 's' });
      expect(exercise.recovery).toEqual({ value: 60, max: null, unit: 'sec' });
    }
  });

  it('parses distance exercise with recovery before weight', () => {
    const result = parseCompact(`[2026-01-13] ## Test
Exercise Farmer walk|3x40m/2min@32kg
`);
    expect(result.success).toBe(true);
    if (result.success) {
      const exercise = result.document.workouts[0].content.find((c) => c.type === 'exercise') as any;
      expect(exercise.sets).toBe(3);
      expect(exercise.distance).toBe(40);
      expect(exercise.unit).toBe('m');
      expect(exercise.weight).toEqual({ value: 32, unit: 'kg' });
      expect(exercise.recovery).toEqual({ value: 2, max: null, unit: 'min' });
    }
  });

  it('parses Circuit item with duration unit', () => {
    const result = parseCompact(`[2026-01-13] ## Test
Circuit|3
> Lankku 30s
`);
    expect(result.success).toBe(true);
    if (result.success) {
      const circuit = result.document.workouts[0].content.find((c) => c.type === 'circuit') as any;
      expect(circuit.exercises[0].reps).toBe(30);
      expect(circuit.exercises[0].unit).toBe('s');
    }
  });
});

// =============================================================================
// Section and Time tests
// =============================================================================

describe('Section and Time', () => {
  it('parses Section', () => {
    const content = getContent<Section>('[2026-01-13] ## Test\nSection Lämmittely\nExercise juoksu|10min\n', 'section');
    expect(content.name).toContain('Lämmittely');
  });

  it('parses Time/Duration', () => {
    const result = parseCompact('[2026-01-13] ## Test\nTime 10min | venyttely\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const content = result.document.workouts[0].content.find((c) => c.type === 'duration');
      expect(content).toBeDefined();
    }
  });
});

// =============================================================================
// Run tests
// =============================================================================

describe('Run', () => {
  it('parses Run with distance', () => {
    const content = getContent<Move>('[2026-01-13] ## Test\nRun 1x5km@130-150bpm\n', 'move');
    expect(content.distance?.value).toBe(5);
    expect(content.distance?.unit).toBe('km');
  });

  it('parses Run with intervals', () => {
    const content = getContent<Move>('[2026-01-13] ## Test\nRun 4x400m@80%/2m\n', 'move');
    expect(content.count).toBe(4);
    expect(content.distance?.value).toBe(400);
  });

  it('parses Run with distance and steps', () => {
    const content = getContent<Move>('[2026-01-13] ## Test\nRun 3.5km 8228steps\n', 'move');
    expect(content.distance?.value).toBe(3.5);
    expect(content.distance?.unit).toBe('km');
    expect(content.steps).toBe(8228);
  });

  it('parses Run with time and steps', () => {
    const content = getContent<Move>('[2026-01-13] ## Test\nRun 30min 5000steps\n', 'move');
    expect(content.duration?.value).toBe(30);
    expect(content.duration?.unit).toBe('min');
    expect(content.steps).toBe(5000);
  });

  it('parses Run with distance only', () => {
    const content = getContent<Move>('[2026-01-13] ## Lenkki\nRun 10km\n', 'move');
    expect(content.distance?.value).toBe(10);
    expect(content.distance?.unit).toBe('km');
  });

  it('parses Run with distance and quoted duration', () => {
    const content = getContent<Move>('[2026-01-13] ## Lenkki\nRun 9km 41\'34"\n', 'move');
    expect(content.distance?.value).toBe(9);
    expect(content.distance?.unit).toBe('km');
    expect(content.duration).toBeDefined();
    expect(content.duration?.unit).toBe('min');
    expect(content.duration?.value).toBeCloseTo(41 + 34 / 60, 5);
  });

  it('parses Run with distance and min+sec duration', () => {
    const content = getContent<Move>('[2026-01-13] ## Lenkki\nRun 9km 41min 34s\n', 'move');
    expect(content.distance?.value).toBe(9);
    expect(content.distance?.unit).toBe('km');
    expect(content.duration).toBeDefined();
    expect(content.duration?.unit).toBe('min');
    expect(content.duration?.value).toBeCloseTo(41 + 34 / 60, 5);
  });

  it('parses Run with no-space min+sec duration', () => {
    const content = getContent<Move>('[2026-01-13] ## Lenkki\nRun 9km 41min34s\n', 'move');
    expect(content.distance?.value).toBe(9);
    expect(content.distance?.unit).toBe('km');
    expect(content.duration).toBeDefined();
    expect(content.duration?.unit).toBe('min');
    expect(content.duration?.value).toBeCloseTo(41 + 34 / 60, 5);
  });

  it('parses Run with time only', () => {
    const content = getContent<Move>('[2026-01-13] ## Lenkki\nRun 45min\n', 'move');
    expect(content.duration?.value).toBe(45);
    expect(content.duration?.unit).toBe('min');
  });

  it('parses Run with pace intensity as normal field', () => {
    const content = getContent<Move>('[2026-01-13] ## Lenkki\nRun 9km@4:35/km\n', 'move');
    expect(content.intensity).toBeDefined();
    expect((content.intensity as any)?.paceMin?.minutes).toBe(4);
    expect((content.intensity as any)?.paceMin?.seconds).toBe(35);
    expect((content.intensity as any)?.paceUnit).toBe('km');
  });

  it('parses Run with quoted pace intensity as normal field', () => {
    const content = getContent<Move>('[2026-01-13] ## Lenkki\nRun 9km@4\'35"/km\n', 'move');
    expect(content.intensity).toBeDefined();
    expect((content.intensity as any)?.paceMin?.minutes).toBe(4);
    expect((content.intensity as any)?.paceMin?.seconds).toBe(35);
    expect((content.intensity as any)?.paceUnit).toBe('km');
  });

  it('parses swim pace /100m as intensity, not recovery', () => {
    const content = getContent<Move>('[2026-01-13] ## Uinti\nMove "rintauinti" 1x450m@3:11/100m\n', 'move');
    expect(content.intensity).toBeDefined();
    expect((content.intensity as any)?.paceMin?.minutes).toBe(3);
    expect((content.intensity as any)?.paceMin?.seconds).toBe(11);
    expect((content.intensity as any)?.paceUnit).toBe('m');
    expect((content.intensity as any)?.pacePerDistance?.value).toBe(100);
    expect((content.intensity as any)?.pacePerDistance?.unit).toBe('m');
    expect(content.recovery).toBeNull();
  });

  it('parses Run with HR range intensity as normal field', () => {
    const content = getContent<Move>('[2026-01-13] ## Lenkki\nRun 9km@150-165bpm\n', 'move');
    expect((content.intensity as any)?.hr?.min).toBe(150);
    expect((content.intensity as any)?.hr?.max).toBe(165);
  });

  it('parses Run with dual recovery notation as range', () => {
    const content = getContent<Move>('[2026-01-13] ## Test\nRun 5x60m@80%/2m/4m | Rentoja ylämäkivetoja\n', 'move');
    expect(content.sets).toBe(1);
    expect(content.count).toBe(5);
    expect(content.distance?.value).toBe(60);
    expect(content.distance?.unit).toBe('m');
    expect(content.recovery?.value).toBe(2);
    expect(content.recovery?.max).toBe(4);
    expect(content.recovery?.unit).toBe('m');
    expect(content.note).toBe('Rentoja ylämäkivetoja');
  });
});

// =============================================================================
// Interval tests
// =============================================================================

describe('Interval Parsing', () => {
  it('parses numeric intensity with recovery', () => {
    const result = parseCompact('[2026-01-13] ## Test\nInterval 4x400m@80%/2m\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const interval = result.document.workouts[0].content[0] as any;
      expect(interval.type).toBe('interval');
      expect(interval.count).toBe(4);
      expect(interval.distance.value).toBe(400);
      expect(interval.intensity.min).toBe(80);
      expect(interval.recovery.value).toBe(2);
      expect(interval.recovery.unit).toBe('m');
    }
  });

  it('parses text intensity with recovery and note', () => {
    const result = parseCompact('[2026-01-13] ## Test\nInterval 6x3min@Ylämäki/2m palautus\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const interval = result.document.workouts[0].content[0] as any;
      expect(interval.type).toBe('interval');
      expect(interval.count).toBe(6);
      expect(interval.distance.value).toBe(3);
      expect(interval.distance.unit).toBe('min');
      expect(interval.intensityText).toBe('Ylämäki');
      expect(interval.intensity).toBe(null);
      expect(interval.recovery.value).toBe(2);
      expect(interval.recovery.unit).toBe('m');
      expect(interval.note).toBe('palautus');
    }
  });

  it('parses zone intensity with recovery', () => {
    const result = parseCompact('[2026-01-13] ## Test\nInterval 5x1km@Z4/3min\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const interval = result.document.workouts[0].content[0] as any;
      expect(interval.type).toBe('interval');
      expect(interval.count).toBe(5);
      expect(interval.intensityText).toBe('Z4');
      expect(interval.recovery.value).toBe(3);
      expect(interval.recovery.unit).toBe('min');
    }
  });

  it('parses text intensity without recovery', () => {
    const result = parseCompact('[2026-01-13] ## Test\nInterval 6x200m@Ylämäki\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const interval = result.document.workouts[0].content[0] as any;
      expect(interval.type).toBe('interval');
      expect(interval.count).toBe(6);
      expect(interval.intensityText).toBe('Ylämäki');
      expect(interval.recovery).toBe(null);
    }
  });

  it('parses recovery range', () => {
    const result = parseCompact('[2026-01-13] ## Test\nInterval 4x400m@80-90%/2-3min\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const interval = result.document.workouts[0].content[0] as any;
      expect(interval.type).toBe('interval');
      expect(interval.count).toBe(4);
      expect(interval.intensity.min).toBe(80);
      expect(interval.intensity.max).toBe(90);
      expect(interval.recovery.value).toBe(2);
      expect(interval.recovery.valueMax).toBe(3);
      expect(interval.recovery.unit).toBe('min');
    }
  });
});

// =============================================================================
// Tags tests
// =============================================================================

describe('Tags', () => {
  it('parses Tags', () => {
    const content = getContent<Tags>('[2026-01-13] ## Test\nTags voima, jalat, kuntosali\n', 'tags');
    expect(content.tags).toContain('voima');
    expect(content.tags).toContain('jalat');
    expect(content.tags).toContain('kuntosali');
  });

  it('parses Tags with parentheses', () => {
    const result = parseCompact('[2026-02-02] ## Voima (Ylävartalo) & Polven huolto\nTags Voimaharjoittelu, Polven kuntoutus (Isometriset)\n');
    expect(result.success).toBe(true);
    if (!result.success) return;

    const tags = result.document.workouts[0].content.find((c) => c.type === 'tags') as Tags | undefined;
    const unknown = result.document.workouts[0].content.find((c) => c.type === 'unknown');
    expect(tags).toBeDefined();
    expect(tags?.tags).toContain('Voimaharjoittelu');
    expect(tags?.tags).toContain('Polven kuntoutus (Isometriset)');
    expect(unknown).toBeUndefined();
  });
});

// =============================================================================
// Life tracking tests
// =============================================================================

describe('Life Tracking', () => {
  it('parses Custom value+unit before label syntax', () => {
    const result = parseCompact('[2026-01-27] ## Päivän aktiivisuus\nCustom 10000kpl | Askeleet\n');
    expect(result.success).toBe(true);
    if (!result.success) return;

    const custom = result.document.workouts[0].content.find((c) => c.type === 'custom') as any;
    const unknown = result.document.workouts[0].content.find((c) => c.type === 'unknown');
    expect(custom).toBeDefined();
    expect(custom.name).toBe('Askeleet');
    expect(custom.value).toBe(10000);
    expect(custom.unit).toBe('kpl');
    expect(unknown).toBeUndefined();
  });

  it('parses Food', () => {
    const content = getContent<Food>('[2026-01-13] ## Test\nFood 450kcal 30g/prot | kaurapuuro\n', 'food');
    expect(content.calories).toBe(450);
    expect(content.protein).toBe(30);
    expect(content.description).toBe('kaurapuuro');
  });

  it('parses Food and Drinking with bracketed time in description', () => {
    const input = `[2026-03-08] ## Illan ateriat
Food 950kcal 30g/prot | Hesburger Kanawrap -ateria [18:00]
Drinking 4dl 180kcal 8g/prot | Iso Latte [20:00]
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (result.success) {
      const workout = result.document.workouts[0];
      const food = workout.content.find((c) => c.type === 'food') as Food | undefined;
      const drinking = workout.content.find((c) => c.type === 'drinking') as any;
      const unknown = workout.content.find((c) => c.type === 'unknown');

      expect(food).toBeDefined();
      expect(food?.calories).toBe(950);
      expect(food?.protein).toBe(30);
      expect(food?.description).toBe('Hesburger Kanawrap -ateria [18:00]');

      expect(drinking).toBeDefined();
      expect(drinking.volume).toBe(4);
      expect(drinking.volumeUnit).toBe('dl');
      expect(drinking.calories).toBe(180);
      expect(drinking.protein).toBe(8);
      expect(drinking.description).toBe('Iso Latte [20:00]');

      expect(unknown).toBeUndefined();
    }
  });

  it('parses Expense', () => {
    const content = getContent<Expense>('[2026-01-13] ## Test\nExpense 4.50EUR | Bussilippu\n', 'expense');
    expect(content.amount).toBe(4.5);
    expect(content.currency).toBe('EUR');
    expect(content.description).toBe('Bussilippu');
  });

  it('parses Expense with VAT percent only', () => {
    const content = getContent<Expense>('[2026-01-13] ## Test\nExpense 100EUR ALV25.5% | Konsultointi\n', 'expense');
    expect(content.amount).toBe(100);
    expect(content.currency).toBe('EUR');
    expect(content.vatPercent).toBe(25.5);
    expect(content.vatAmount).toBeNull();
    expect(content.description).toBe('Konsultointi');
  });

  it('parses Expense with VAT percent and amount', () => {
    const content = getContent<Expense>('[2026-01-13] ## Test\nExpense 124EUR ALV24% 24EUR | Palvelu\n', 'expense');
    expect(content.amount).toBe(124);
    expect(content.vatPercent).toBe(24);
    expect(content.vatAmount).toBe(24);
  });

  it('parses exercise with recovery, description, custom field and trailing note', () => {
    const content = getContent<Exercise>('[2026-01-13] ## Test\nExercise Isometrinen pito|3x30/10s@20kg (lisäkuvaus) [[Hengitys:nenä]] | note\n', 'exercise');
    expect(content.name).toBe('Isometrinen pito');
    expect(content.sets).toBe(3);
    expect(content.reps).toBe(30);
    expect(content.recovery?.value).toBe(10);
    expect(content.recovery?.unit).toBe('sec');
    expect(content.weight && 'value' in content.weight ? content.weight.value : null).toBe(20);
    expect(content.description).toBe('lisäkuvaus');
    expect(content.note).toBe('note');
    expect(content.customFields?.[0].name).toBe('Hengitys');
  });

  it('parses Sleep', () => {
    const content = getContent<SleepEntry>('[2026-01-13] ## Test\nSleep 7.5h quality:good\n', 'sleep');
    expect(content.duration).toBe(7.5);
    expect(content.quality).toBe('good');
  });

  it('parses Weight', () => {
    const content = getContent<BodyMeasurement>('[2026-01-13] ## Test\nWeight 85.2kg\n', 'measurement');
    expect(content.measureType).toBe('weight');
    expect(content.value).toBe(85.2);
  });

  it('parses Derived with full metadata', () => {
    const result = parseCompact('[2026-01-13] ## Test\nDerived strength.neural_stress 72|score basis:entity confidence:88% source:"exercise+load" goodness:4 | raskas päivä\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const derived = result.document.workouts[0].content.find((c) => c.type === 'derived') as any;
      expect(derived).toBeDefined();
      expect(derived.name).toBe('strength.neural_stress');
      expect(derived.value).toBe(72);
      expect(derived.unit).toBe('score');
      expect(derived.basis).toBe('entity');
      expect(derived.confidence).toBe(88);
      expect(derived.source).toBe('exercise+load');
      expect(derived.goodness).toBe(4);
      expect(derived.note).toBe('raskas päivä');
    }
  });

  it('parses Derived day-level basis for multi-workout aggregate', () => {
    const result = parseCompact('[2026-01-13] ## Test\nDerived endurance.zone2_minutes 95|min basis:day confidence:74 source:"all workouts" goodness:5\n');
    expect(result.success).toBe(true);
    if (result.success) {
      const derived = result.document.workouts[0].content.find((c) => c.type === 'derived') as any;
      expect(derived.basis).toBe('day');
      expect(derived.confidence).toBe(74);
      expect(derived.source).toBe('all workouts');
      expect(derived.goodness).toBe(5);
    }
  });

  it('rejects Derived confidence out of range', () => {
    const result = parseCompact('[2026-01-13] ## Test\nDerived strength.neural_stress 72|score confidence:101\n');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toContain('Derived confidence must be between 1 and 100');
    }
  });

  it('rejects Derived goodness out of range', () => {
    const result = parseCompact('[2026-01-13] ## Test\nDerived strength.neural_stress 72|score goodness:0\n');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toContain('Derived goodness must be between 1 and 5');
    }
  });
});

// =============================================================================
// Full workout test
// =============================================================================

describe('Full Workout', () => {
  it('parses complete gym workout', () => {
    const input = `[2026-01-13T18:00+02]## Jalkatreeni
Tags kuntosali, voima, jalat
Section Lämmittely
Time 10min | Kuntopyörä kevyesti
Section Pääosa
Exercise Takakyykky|4x8@80kg
Exercise Jalkaprässi|3x12@100kg
Section Jäähdyttely
Time 10min | Venyttely
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);

    if (result.success) {
      const workout = result.document.workouts[0];
      expect(workout.title).toBe('Jalkatreeni');

      const date = workout.date;
      if (date?.type === 'datetime') {
        expect(date.hour).toBe(18);
      }

      const tags = workout.content.find((c) => c.type === 'tags') as Tags;
      expect(tags.tags).toContain('kuntosali');

      const exercises = workout.content.filter((c) => c.type === 'exercise');
      expect(exercises).toHaveLength(2);

      const sections = workout.content.filter((c) => c.type === 'section');
      expect(sections).toHaveLength(3);
    }
  });

  it('parses nutrition diary', () => {
    const input = `[2026-01-13T07:30+02]## Aamiainen
Tags aamiainen, proteiini
Food 180kcal 14g/prot | Kananmunat (2kpl)
Food 120kcal 4g/prot | Ruisleipä voilla
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);

    if (result.success) {
      const workout = result.document.workouts[0];
      const foods = workout.content.filter((c) => c.type === 'food');
      expect(foods).toHaveLength(2);

      const food1 = foods[0] as Food;
      expect(food1.calories).toBe(180);

      const food2 = foods[1] as Food;
      expect(food2.calories).toBe(120);
    }
  });

  it('parses expense diary', () => {
    const input = `[2026-01-13]## Kulut
Tags kulut, liikunta
Expense 50EUR | Kuukausijäsenyys kuntosali
Expense 4.50EUR | Bussilippu
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);

    if (result.success) {
      const expenses = result.document.workouts[0].content.filter((c) => c.type === 'expense') as Expense[];
      expect(expenses).toHaveLength(2);
      expect(expenses[0].amount).toBe(50);
      expect(expenses[1].amount).toBe(4.5);
    }
  });
});

// =============================================================================
// Trailing empty Section cleanup
// =============================================================================

describe('Trailing empty Section cleanup', () => {
  it('strips trailing empty Section at end of workout', () => {
    const input = `[2026-02-03T19:00+02] ## Rintauinti
Tags uinti, rintauinti
Run "rintauinti" 800m | 27min 9s
> 150m 3'39"/100m
> 450m 2'55"/100m
> 100m 3'31"/100m
> 100m 3'12"/100m
Section Sarjat
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (result.success) {
      const content = result.document.workouts[0].content;
      // The trailing "Section Sarjat" should be removed
      const lastItem = content[content.length - 1];
      expect(lastItem.type).not.toBe('section');
    }
  });

  it('keeps Section that has content after it', () => {
    const input = `[2026-02-03] ## Treeni
Section Pääosa
Exercise kyykky|3x8@80kg
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (result.success) {
      const content = result.document.workouts[0].content;
      const sections = content.filter((c) => c.type === 'section');
      expect(sections).toHaveLength(1);
      expect((sections[0] as Section).name).toBe('Pääosa');
    }
  });

  it('strips multiple trailing Sections', () => {
    const input = `[2026-02-03] ## Treeni
Exercise kyykky|3x8@80kg
Section Venyttely
Section Lopetus
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (result.success) {
      const content = result.document.workouts[0].content;
      // Both trailing sections should be removed
      expect(content.every((c) => c.type !== 'section')).toBe(true);
      expect(content).toHaveLength(1); // only exercise remains
    }
  });

  it('does not strip Section followed by exercise', () => {
    const input = `[2026-02-03] ## Treeni
Section Lämmittely
Exercise juoksu|10min
Section Pääosa
Exercise kyykky|3x8@80kg
`;
    const result = parseCompact(input);
    expect(result.success).toBe(true);
    if (result.success) {
      const content = result.document.workouts[0].content;
      const sections = content.filter((c) => c.type === 'section');
      expect(sections).toHaveLength(2);
    }
  });
});
