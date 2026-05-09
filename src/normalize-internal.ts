import {
  parseCompact,
  type ParseError,
  type ParseOutcome,
} from './index.js';
import { serializeContent, serializeDate } from './renderers/compact.js';
import type {
  Content,
  DateValue,
  Document,
  Emojis,
  Exercise,
  Intensity,
  Interval,
  Move,
  Pyramid,
  Recovery,
  RepCount,
  Tags,
  Weight,
} from './types.js';

export type V2Sport = 'run' | 'swim' | 'bike' | 'walk' | 'row' | 'ski' | 'other';

export interface V2MigrationWarning {
  code: 'ambiguous-endurance-sport' | 'unknown-move-sport';
  message: string;
  workoutIndex: number;
  rowIndex: number;
  sourceType: 'move' | 'interval';
}

export interface V2StrengthSet {
  repeat: number | null;
  reps: RepCount;
  repsRight?: number | null;
  load: Weight | null;
}

export interface V2StrengthUniformSpec {
  sets: number | null;
  setsMax: number | null;
  rounds: number | null;
  reps: RepCount;
  repsMax: number | null;
  repsRight: number | null;
  distance: { value: number; unit: 'm' } | null;
  duration: { value: number; unit: 's' | 'min' } | null;
  load: Weight | null;
  recovery: Recovery | null;
}

export interface V2StrengthRow {
  type: 'strength';
  name: string;
  sourceType: 'exercise' | 'pyramid';
  source: Exercise | Pyramid;
  customFields: Exercise['customFields'] | null;
  note: string | null;
  description: string | null;
  scheme:
    | { kind: 'uniform'; spec: V2StrengthUniformSpec }
    | { kind: 'sequence'; sets: V2StrengthSet[]; recovery: Recovery | null };
}

export interface V2EnduranceRow {
  type: 'endurance';
  sport: V2Sport;
  discipline: string | null;
  sourceType: 'move' | 'interval';
  source: Move | Interval;
  structure: 'continuous' | 'interval';
  sets: number;
  repeatCount: number;
  distance: { value: number; unit: string } | null;
  duration: { value: number; unit: string } | null;
  intensity: Intensity | { text: string } | null;
  recovery: Recovery | { value: number | null; max?: number | null; valueMax?: number | null; unit: string | null; text?: string | null } | null;
  note: string | null;
  description: string | null;
  customFields: Move['customFields'] | null;
}

export interface V2LegacyRow {
  type: 'legacy';
  sourceType: Exclude<Content['type'], 'exercise' | 'pyramid' | 'move' | 'interval' | 'tags' | 'emojis'>;
  source: Content;
}

export type V2Row = V2StrengthRow | V2EnduranceRow | V2LegacyRow;

export interface V2Workout {
  type: 'workout';
  id: string | null;
  date: DateValue | null;
  title: string | null;
  tags: string[];
  emojis: string;
  rows: V2Row[];
  sourceFormat: string | null;
  originalInput?: string;
}

export interface V2Document {
  format: 'compact';
  workouts: V2Workout[];
  sourceFormat: string | null;
}

export interface V2MigrationResult {
  document: V2Document;
  warnings: V2MigrationWarning[];
}

export type V2TextMigrationResult =
  | {
      success: true;
      document: V2Document;
      text: string;
      warnings: V2MigrationWarning[];
    }
  | {
      success: false;
      error: ParseError;
      warnings: V2MigrationWarning[];
    };

function normalizeToken(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[äå]/g, 'a')
    .replace(/ö/g, 'o');
}

function collectTags(content: Content[]): string[] {
  return content
    .filter((item): item is Tags => item.type === 'tags')
    .flatMap((item) => item.tags);
}

function collectEmojis(content: Content[]): string {
  return content
    .filter((item): item is Emojis => item.type === 'emojis')
    .map((item) => item.emojis)
    .join('');
}

function classifySport(rawSport: string | null | undefined): { sport: V2Sport; discipline: string | null } {
  const raw = (rawSport ?? '').trim();
  const token = normalizeToken(raw);

  if (!token || token === 'juoksu' || token === 'run' || token === 'running') {
    return { sport: 'run', discipline: null };
  }

  if (token === 'uinti' || token === 'swim' || token === 'swimming') {
    return { sport: 'swim', discipline: null };
  }

  if (
    token === 'vapaauinti' ||
    token === 'rintauinti' ||
    token === 'selkauinti' ||
    token === 'perhosuinti' ||
    token === 'freestyle' ||
    token === 'breaststroke' ||
    token === 'backstroke' ||
    token === 'butterfly'
  ) {
    return { sport: 'swim', discipline: raw };
  }

  if (token === 'pyoraily' || token === 'bike' || token === 'cycling') {
    return { sport: 'bike', discipline: null };
  }

  if (token === 'walk' || token === 'walking' || token === 'kavely') {
    return { sport: 'walk', discipline: null };
  }

  if (token === 'row' || token === 'rowing' || token === 'soutu') {
    return { sport: 'row', discipline: null };
  }

  if (token === 'ski' || token === 'skiing' || token === 'hiihto') {
    return { sport: 'ski', discipline: null };
  }

  return { sport: 'other', discipline: raw || null };
}

function migrateExercise(row: Exercise): V2StrengthRow {
  const duration =
    row.distance == null && row.unit && (row.unit === 's' || row.unit === 'min')
      ? { value: typeof row.reps === 'number' ? row.reps : 0, unit: row.unit }
      : null;

  const distance =
    typeof row.distance === 'number' && row.unit === 'm'
      ? { value: row.distance, unit: 'm' as const }
      : null;

  return {
    type: 'strength',
    name: row.name,
    sourceType: 'exercise',
    source: row,
    customFields: row.customFields,
    note: row.note,
    description: row.description,
    scheme: {
      kind: 'uniform',
      spec: {
        sets: row.sets,
        setsMax: row.setsMax ?? null,
        rounds: row.rounds ?? null,
        reps: row.reps,
        repsMax: row.repsMax ?? null,
        repsRight: row.repsRight ?? null,
        distance,
        duration,
        load: row.weight,
        recovery: row.recovery,
      },
    },
  };
}

function migratePyramid(row: Pyramid): V2StrengthRow {
  return {
    type: 'strength',
    name: row.name,
    sourceType: 'pyramid',
    source: row,
    customFields: null,
    note: row.note,
    description: null,
    scheme: {
      kind: 'sequence',
      recovery: null,
      sets: row.sets.map((set) => ({
        repeat: set.sets ?? null,
        reps: set.reps,
        repsRight: set.repsRight ?? null,
        load: set.weight,
      })),
    },
  };
}

function migrateMove(
  row: Move,
  warnings: V2MigrationWarning[],
  workoutIndex: number,
  rowIndex: number,
): V2EnduranceRow {
  const classification = classifySport(row.sport);
  if (classification.sport === 'other') {
    warnings.push({
      code: 'unknown-move-sport',
      message: `Move sport "${row.sport}" could not be normalized safely to a canonical sport alias.`,
      workoutIndex,
      rowIndex,
      sourceType: 'move',
    });
  }

  const distance = row.distance && typeof row.distance.value === 'number' && typeof row.distance.unit === 'string'
    ? { value: row.distance.value, unit: row.distance.unit }
    : null;
  const duration = row.duration && typeof row.duration.value === 'number' && typeof row.duration.unit === 'string'
    ? { value: row.duration.value, unit: row.duration.unit }
    : null;
  const structure = row.count > 1 || row.sets > 1 || row.recovery ? 'interval' : 'continuous';

  return {
    type: 'endurance',
    sport: classification.sport,
    discipline: classification.discipline,
    sourceType: 'move',
    source: row,
    structure,
    sets: row.sets,
    repeatCount: row.count,
    distance,
    duration,
    intensity: row.intensity,
    recovery: row.recovery,
    note: row.note,
    description: row.description,
    customFields: row.customFields,
  };
}

function migrateInterval(
  row: Interval,
  warnings: V2MigrationWarning[],
  workoutIndex: number,
  rowIndex: number,
): V2EnduranceRow {
  const rawInterval = row as Interval & {
    intensityText?: string | null;
    note?: string | null;
    recovery?: { value?: number | null; min?: number | null; max?: number | null; valueMax?: number | null; unit?: string | null } | null;
    distance: { value?: number | null; unit?: string | null };
  };

  warnings.push({
    code: 'ambiguous-endurance-sport',
    message: 'Interval rows do not carry an explicit sport in legacy COMPACT, so normalization cannot infer run vs swim vs bike safely.',
    workoutIndex,
    rowIndex,
    sourceType: 'interval',
  });

  const intervalUnit: string | null = typeof rawInterval.distance.unit === 'string'
    ? (rawInterval.distance.unit as string)
    : null;
  const duration = intervalUnit === 'min' || intervalUnit === 'sec'
    ? { value: rawInterval.distance.value ?? 0, unit: intervalUnit }
    : null;
  const distance = duration === null
    && typeof rawInterval.distance.value === 'number'
    && intervalUnit !== null
    ? { value: rawInterval.distance.value, unit: intervalUnit }
    : null;
  const recovery = rawInterval.recovery
    ? {
        value: typeof rawInterval.recovery.value === 'number'
          ? rawInterval.recovery.value
          : rawInterval.recovery.min ?? null,
        max: rawInterval.recovery.max ?? rawInterval.recovery.valueMax ?? null,
        unit: rawInterval.recovery.unit ?? 'min',
      }
    : null;

  return {
    type: 'endurance',
    sport: 'other',
    discipline: null,
    sourceType: 'interval',
    source: row,
    structure: 'interval',
    sets: 1,
    repeatCount: row.count,
    distance,
    duration,
    intensity: typeof rawInterval.intensityText === 'string'
      ? { text: rawInterval.intensityText }
      : row.intensity,
    recovery,
    note: typeof rawInterval.note === 'string' ? rawInterval.note : null,
    description: null,
    customFields: null,
  };
}

export function migrateV1DocumentToV2(document: Document): V2MigrationResult {
  const warnings: V2MigrationWarning[] = [];

  const workouts: V2Workout[] = document.workouts.map((workout, workoutIndex) => {
    const rows: V2Row[] = [];

    workout.content.forEach((item, rowIndex) => {
      if (item.type === 'tags' || item.type === 'emojis') {
        return;
      }

      if (item.type === 'exercise') {
        rows.push(migrateExercise(item));
        return;
      }

      if (item.type === 'pyramid') {
        rows.push(migratePyramid(item));
        return;
      }

      if (item.type === 'move') {
        rows.push(migrateMove(item, warnings, workoutIndex, rowIndex));
        return;
      }

      if (item.type === 'interval') {
        rows.push(migrateInterval(item, warnings, workoutIndex, rowIndex));
        return;
      }

      rows.push({
        type: 'legacy',
        sourceType: item.type,
        source: item,
      });
    });

    return {
      type: 'workout',
      id: workout.id,
      date: workout.date,
      title: workout.title,
      tags: collectTags(workout.content),
      emojis: collectEmojis(workout.content),
      rows,
      sourceFormat: workout.format ?? document.format ?? null,
      originalInput: workout.originalInput,
    };
  });

  return {
    document: {
      format: 'compact',
      workouts,
      sourceFormat: document.format ?? null,
    },
    warnings,
  };
}

function formatWeight(weight: Weight | null): string | null {
  if (!weight) return null;

  if ('percent' in weight) {
    return weight.percent === weight.percentMax
      ? `${weight.percent}%1RM`
      : `${weight.percent}-${weight.percentMax}%1RM`;
  }

  if ('value' in weight) {
    if (weight.unit === 'bodyweight') {
      return 'bodyweight';
    }

    const count = weight.count > 1 ? `${weight.count}x` : '';
    const valueMax = typeof weight.valueMax === 'number' ? weight.valueMax : weight.value;
    const range = weight.value !== valueMax ? `-${valueMax}` : '';
    return `${count}${weight.value}${range}${weight.unit}`;
  }

  return null;
}

function formatRepCount(reps: RepCount, repsMax: number | null, repsRight: number | null): string | null {
  if (reps == null) return null;
  if (typeof reps === 'object') return `${reps.rm}RM`;
  if (reps === 'max') return 'max';
  if (typeof repsRight === 'number') return `${reps}+${repsRight}`;
  if (typeof repsMax === 'number' && repsMax !== reps) return `${reps}-${repsMax}`;
  return String(reps);
}

function formatRecovery(recovery: Recovery | { value: number | null; max?: number | null; valueMax?: number | null; unit: string | null; text?: string | null } | null): string | null {
  if (!recovery) return null;
  if (typeof recovery.text === 'string' && recovery.text.trim().length > 0 && recovery.value == null) {
    return recovery.text.trim();
  }

  if (recovery.value == null) return null;

  const valueMax = 'valueMax' in recovery ? recovery.valueMax : null;
  const max = typeof recovery.max === 'number'
    ? recovery.max
    : typeof valueMax === 'number'
      ? valueMax
      : null;
  const unit = recovery.unit === 'sec'
    ? 's'
    : recovery.unit === 'min' || recovery.unit === 'walk'
      ? recovery.unit
      : recovery.unit;
  const base = max && max !== recovery.value
    ? `${recovery.value}-${max}`
    : String(recovery.value);
  return `${base}${unit ?? ''}`;
}

function formatIntensity(intensity: Intensity | { text: string } | null): string | null {
  if (!intensity) return null;
  if ('text' in intensity && typeof intensity.text === 'string') {
    return intensity.text;
  }
  if ('min' in intensity && 'max' in intensity) {
    return intensity.min === intensity.max ? `${intensity.min}%` : `${intensity.min}-${intensity.max}%`;
  }
  if ('hrZone' in intensity) {
    const value = intensity.hrZone;
    return value.min === value.max ? `Z${value.min}` : `Z${value.min}-Z${value.max}`;
  }
  if ('zone' in intensity) {
    const value = intensity.zone;
    if ('combo' in value) return value.combo.join('+');
    return value.min === value.max ? value.min : `${value.min}-${value.max}`;
  }
  if ('hr' in intensity) {
    const value = intensity.hr;
    if (typeof value.value === 'number') return `${value.value}bpm`;
    if (typeof value.min === 'number' && typeof value.max === 'number') return `${value.min}-${value.max}bpm`;
  }
  if ('paceMin' in intensity && 'paceMax' in intensity) {
    const min = `${intensity.paceMin.minutes}:${String(intensity.paceMin.seconds).padStart(2, '0')}`;
    const max = `${intensity.paceMax.minutes}:${String(intensity.paceMax.seconds).padStart(2, '0')}`;
    const pace = min === max ? min : `${min}-${max}`;
    if (intensity.pacePerDistance) {
      return `${pace}/${intensity.pacePerDistance.value}${intensity.pacePerDistance.unit}`;
    }
    return `${pace}/${intensity.paceUnit}`;
  }
  if ('unknown' in intensity) {
    return '?';
  }
  return null;
}

function formatDistance(distance: { value: number; unit: string } | null): string | null {
  if (!distance) return null;
  return `${distance.value}${distance.unit}`;
}

function formatDuration(duration: { value: number; unit: string } | null): string | null {
  if (!duration) return null;
  const unit = duration.unit === 'sec' ? 's' : duration.unit;
  return `${duration.value}${unit}`;
}

function serializeStrength(row: V2StrengthRow): string {
  if (row.scheme.kind === 'uniform') {
    const spec = row.scheme.spec;
    const reps = formatRepCount(spec.reps, spec.repsMax, spec.repsRight);
    const load = formatWeight(spec.load);
    const recovery = formatRecovery(spec.recovery);
    const distance = formatDistance(spec.distance);
    const duration = formatDuration(spec.duration);

    const head = (() => {
      if (typeof spec.rounds === 'number' && typeof spec.sets === 'number' && reps) {
        return `${spec.rounds}x${spec.sets}x${reps}`;
      }
      if (typeof spec.sets === 'number' && reps) {
        return `${spec.sets}x${reps}`;
      }
      if (typeof spec.sets === 'number' && distance) {
        return `${spec.sets}x${distance}`;
      }
      if (typeof spec.sets === 'number' && duration) {
        return `${spec.sets}x${duration}`;
      }
      if (reps) return reps;
      if (distance) return distance;
      if (duration) return duration;
      return null;
    })();

    if (!head) {
      return serializeContent(row.source) || '';
    }

    const tail = [
      load ? `@ ${load}` : null,
      recovery ? `/ ${recovery}` : null,
    ].filter(Boolean).join(' ');
    const body = [head, tail].filter(Boolean).join(' ');
    const note = row.note ?? row.description;
    return [`Lift ${row.name} | ${body}`, note ? note : null].filter(Boolean).join(' | ');
  }

  const atoms = row.scheme.sets.map((set) => {
    const reps = formatRepCount(set.reps, null, set.repsRight ?? null);
    const load = formatWeight(set.load);
    if (!reps) return null;
    const base = load ? `${reps}@${load}` : reps;
    return typeof set.repeat === 'number' && set.repeat > 1 ? `${set.repeat}x${base}` : base;
  });

  if (atoms.some((item) => item === null)) {
    return serializeContent(row.source) || '';
  }

  const note = row.note ?? row.description;
  return [`Lift ${row.name} | ${(atoms as string[]).join(', ')}`, note ? note : null].filter(Boolean).join(' | ');
}

function sportAlias(row: V2EnduranceRow): string {
  if (row.sport === 'run') return 'Run';
  if (row.sport === 'swim') return row.discipline ? `Swim ${row.discipline}` : 'Swim';
  if (row.sport === 'bike') return 'Bike';
  if (row.sport === 'walk') return 'Walk';
  if (row.sport === 'row') return 'Row';
  if (row.sport === 'ski') return 'Ski';
  return row.discipline ? `Endurance ${row.discipline}` : 'Endurance';
}

function serializeEndurance(row: V2EnduranceRow): string {
  const prefix = sportAlias(row);
  const distance = formatDistance(row.distance);
  const duration = formatDuration(row.duration);
  const intensity = formatIntensity(row.intensity);
  const recovery = formatRecovery(row.recovery);
  const note = row.note ?? row.description;

  let main: string | null = null;
  if (row.structure === 'interval') {
    const segment = distance ?? duration;
    if (!segment) {
      return serializeContent(row.source) || '';
    }
    const cycle = row.sets > 1 ? `${row.sets}x${row.repeatCount}x${segment}` : `${row.repeatCount}x${segment}`;
    main = recovery ? `${cycle} / ${recovery}` : cycle;
  } else {
    const parts = [duration, distance].filter(Boolean);
    if (parts.length === 0) {
      return serializeContent(row.source) || '';
    }
    main = parts.join(' ');
  }

  const segments = [`${prefix} | ${main}`];
  if (intensity) segments.push(intensity);
  if (note) segments.push(note);
  return segments.join(' | ');
}

function serializeV2Row(row: V2Row): string {
  if (row.type === 'strength') return serializeStrength(row);
  if (row.type === 'endurance') return serializeEndurance(row);
  return serializeContent(row.source) || '';
}

function serializeV2Workout(workout: V2Workout): string {
  const lines: string[] = [];
  const datePrefix = workout.date ? `[${serializeDate(workout.date)}] ` : '';

  if (workout.title) {
    lines.push(`${datePrefix}## ${workout.title}`);
  } else if (datePrefix) {
    lines.push(datePrefix.trimEnd());
  }

  lines.push('Format compact');

  if (workout.tags.length > 0) {
    lines.push(`Tags ${workout.tags.join(', ')}`);
  }

  if (workout.emojis.length > 0) {
    lines.push(`Emojis ${workout.emojis}`);
  }

  for (const row of workout.rows) {
    const serialized = serializeV2Row(row);
    if (serialized) {
      lines.push(serialized);
    }
  }

  return lines.join('\n');
}

export function serializeV2Document(document: V2Document): string {
  return document.workouts.map((workout) => serializeV2Workout(workout)).join('\n\n');
}

export function migrateV1TextToV2(input: string): V2TextMigrationResult {
  const parsed: ParseOutcome = parseCompact(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error,
      warnings: [],
    };
  }

  const migration = migrateV1DocumentToV2(parsed.document);
  return {
    success: true,
    document: migration.document,
    text: serializeV2Document(migration.document),
    warnings: migration.warnings,
  };
}