import { parseCompact } from '../../../../src/index.ts';
import type {
  Content,
  DateValue,
  Derived,
  DurationBlock,
  Exercise as ParsedExercise,
  MeasuredDuration,
  Move,
  Pyramid,
  Split,
  Weight,
} from '../../../../src/types.ts';
import type { CompactWorkoutModel, CompactRow, CompactSplitRow, CompactExerciseRow } from './types';

function asText(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function fallbackTextForEntry(type: string, entry: Record<string, unknown>): string {
  if (type === 'derived') {
    const name = asText(entry.name);
    const value = asText(entry.value);
    const unit = asText(entry.unit);
    return `${name} ${value}${unit ? ` ${unit}` : ''}`.trim();
  }

  if (type === 'contacts') {
    const name = asText(entry.name) || 'Contacts';
    const count = asText(entry.count);
    return `${name} ${count}`.trim();
  }

  if (type === 'interval') {
    const count = asText(entry.count);
    const distance = entry.distance && typeof entry.distance === 'object'
      ? `${asText((entry.distance as Record<string, unknown>).value)}${asText((entry.distance as Record<string, unknown>).unit)}`
      : '';
    const intensity = asText(entry.intensityText);
    return `Interval ${count ? `${count}x` : ''}${distance}${intensity ? ` @${intensity}` : ''}`.trim();
  }

  if (type === 'food') {
    const calories = typeof entry.calories === 'number' ? `${entry.calories}kcal` : '';
    const protein = typeof entry.protein === 'number' ? `${entry.protein}g/prot` : '';
    const carbs = typeof entry.carbs === 'number' ? `${entry.carbs}g/carb` : '';
    const fat = typeof entry.fat === 'number' ? `${entry.fat}g/fat` : '';
    const description = asText(entry.description || entry.name);
    const parts = ['Food', calories, protein, carbs, fat].filter(Boolean);
    return description ? `${parts.join(' ')} | ${description}`.trim() : parts.join(' ').trim();
  }

  if (type === 'drinking') {
    const volume = entry.volume != null ? `${asText(entry.volume)}${asText(entry.volumeUnit)}` : '';
    const liquid = asText(entry.liquid);
    const description = asText(entry.description);
    const parts = ['Drinking', volume, liquid].filter(Boolean);
    return description ? `${parts.join(' ')} | ${description}`.trim() : parts.join(' ').trim();
  }

  if (type === 'expense') {
    const amount = entry.amount != null ? `${asText(entry.amount)}${asText(entry.currency)}` : '';
    const description = asText(entry.description);
    return description ? `Expense ${amount} | ${description}`.trim() : `Expense ${amount}`.trim();
  }

  if (type === 'reminder') {
    const date = formatCompactDate(entry.date as DateValue | null | undefined);
    const description = asText(entry.description);
    return ['Reminder', date, description].filter(Boolean).join(' ').trim();
  }

  if (type === 'health') {
    const healthType = asText(entry.healthType);
    const description = asText(entry.description);
    return ['Health', healthType, description].filter(Boolean).join(' | ').replace(' | ', ' ').trim();
  }

  if (type === 'vitals') {
    const key = asText(entry.key);
    const value = entry.value != null ? `${asText(entry.value)}${asText(entry.unit)}` : '';
    return ['Vitals', key, value].filter(Boolean).join(' ').trim();
  }

  if (type === 'sleep') {
    const duration = entry.duration != null ? `${asText(entry.duration)}h` : '';
    const quality = asText(entry.quality);
    return ['Sleep', duration, quality].filter(Boolean).join(' ').trim();
  }

  if (type === 'measurement') {
    const measureType = asText(entry.measureType);
    const value = entry.value != null ? `${asText(entry.value)}${asText(entry.unit)}` : '';
    return [measureType || 'Measurement', value].filter(Boolean).join(' ').trim();
  }

  if (type === 'location') {
    return ['Location', asText(entry.place)].filter(Boolean).join(' ').trim();
  }

  if (type === 'url') {
    return ['URL', asText(entry.url)].filter(Boolean).join(' ').trim();
  }

  const compactBits = [
    asText(entry.name),
    asText(entry.value),
    asText(entry.description),
  ].filter(Boolean);
  return compactBits.length > 0 ? `${type}: ${compactBits.join(' ')}` : `${type}`;
}

function formatCompactDate(dateValue: DateValue | null | undefined): string {
  if (!dateValue) {
    return '';
  }

  const d = dateValue;

  if (d.type === 'date' && d.year && d.month && d.day) {
    const mm = String(d.month).padStart(2, '0');
    const dd = String(d.day).padStart(2, '0');
    return `${dd}.${mm}.${d.year}`;
  }

  if (d.type === 'datetime' && d.year && d.month && d.day) {
    const mm = String(d.month).padStart(2, '0');
    const dd = String(d.day).padStart(2, '0');
    const hh = String(d.hour ?? 0).padStart(2, '0');
    const min = String(d.minute ?? 0).padStart(2, '0');
    return `${dd}.${mm}.${d.year} ${hh}:${min}`;
  }

  if (d.type === 'week' && d.week && d.year) {
    return `W${d.week}/${d.year}`;
  }

  return '';
}

function getWeightValue(weight: Weight | null | undefined): number | undefined {
  return weight && 'value' in weight && typeof weight.value === 'number' ? weight.value : undefined;
}

function getWeightCount(weight: Weight | null | undefined): number | null {
  return weight && 'count' in weight && typeof weight.count === 'number' ? weight.count : null;
}

function mapMeasuredDurations(durations: MeasuredDuration[] | undefined): CompactExerciseRow['measuredDurations'] {
  return durations?.map((duration) => ({
    left: duration.left,
    right: duration.right,
    unit: duration.unit,
  }));
}

function mapSplit(split: Split, splitId: string): CompactSplitRow {
  const nestedSplits = Array.isArray(split.splits)
    ? split.splits.map((nested, nestedIndex) => mapSplit(nested, `${splitId}-nested-${nestedIndex}`))
    : null;

  return {
    id: splitId,
    type: 'split',
    distance: split.distance as CompactSplitRow['distance'],
    duration: split.duration as CompactSplitRow['duration'],
    pace: split.pace as CompactSplitRow['pace'],
    intensity: split.intensity,
    hr: split.hr ?? null,
    customFields: split.customFields as CompactSplitRow['customFields'],
    note: split.note ?? null,
    splits: nestedSplits,
  };
}

function mapRows(content: Content[]): CompactRow[] {
  const rows: CompactRow[] = [];

  for (let index = 0; index < content.length; index += 1) {
    const item = content[index];
    const entry = item as Content;
    const type = entry.type;

    const id = `${type}-${index}`;

    if (type === 'summary') {
      rows.push({ id, type: 'summary', text: typeof entry.text === 'string' ? entry.text : '' });
      continue;
    }

    if (type === 'phase') {
      rows.push({
        id,
        type: 'phase',
        number: typeof entry.number === 'number' ? entry.number : null,
        name: typeof entry.name === 'string' ? entry.name : 'Phase',
        details: typeof entry.details === 'string' ? entry.details : '',
      });
      continue;
    }

    if (type === 'section') {
      rows.push({ id, type: 'section', name: typeof entry.name === 'string' ? entry.name : 'Section' });
      continue;
    }

    if (type === 'custom') {
      rows.push({
        id,
        type: 'custom',
        name: typeof entry.name === 'string' ? entry.name : 'Custom',
        value: entry.value,
        unit: typeof entry.unit === 'string' ? entry.unit : null,
      });
      continue;
    }

    if (type === 'exercise') {
      const exercise = entry as ParsedExercise;
      rows.push({
        id,
        type: 'exercise',
        name: exercise.name,
        sets: exercise.sets ?? null,
        setsMax: exercise.setsMax ?? null,
        reps: exercise.reps ?? null,
        repsMax: exercise.repsMax ?? null,
        repsRight: exercise.repsRight ?? null,
        rounds: exercise.rounds ?? null,
        unit: exercise.unit ?? null,
        distance: typeof exercise.distance === 'number'
          ? {
              value: exercise.distance,
              valueMax: exercise.distanceMax ?? null,
              unit: exercise.unit ?? null,
            }
          : null,
        weightKg: getWeightValue(exercise.weight),
        weightCount: getWeightCount(exercise.weight),
        recovery: exercise.recovery as CompactExerciseRow['recovery'],
        specType:
          exercise.specType === 'measured' || exercise.specType === 'multiset'
            ? exercise.specType
            : null,
        measuredDurations: mapMeasuredDurations(exercise.measuredDurations),
        isBilateral: exercise.isBilateral,
        note: exercise.note ?? '',
      });
      continue;
    }

    if (type === 'pyramid') {
      const pyramid = entry as Pyramid;
      const sets = Array.isArray(pyramid.sets)
        ? pyramid.sets.map((set) => {
            return {
              reps: typeof set.reps === 'number' ? set.reps : 0,
              weightKg: getWeightValue(set.weight),
            };
          })
        : [];

      rows.push({
        id,
        type: 'pyramid',
        name: pyramid.name,
        sets,
        note: pyramid.note ?? '',
      });
      continue;
    }

    if (type === 'move') {
      const move = entry as Move;
      const splits = Array.isArray(move.splits)
        ? move.splits.map((split, splitIndex) => mapSplit(split, `${id}-split-${splitIndex}`))
        : null;

      rows.push({
        id,
        type: 'move',
        sport: move.sport ?? null,
        sets: move.sets,
        count: move.count,
        countMax: move.countMax ?? null,
        distance: move.distance as { value?: number | null; valueMax?: number | null; unit?: string | null } | undefined,
        duration: move.duration as { value?: number | null; unit?: string | null } | undefined,
        steps: move.steps ?? null,
        intensity: move.intensity,
        recovery: move.recovery as { value?: number | null; max?: number | null; valueMax?: number | null; unit?: string | null; text?: string | null } | null,
        note: move.note ?? null,
        description: move.description ?? null,
        customFields: move.customFields as Array<{ name: string; value: unknown; unit?: string | null }> | null,
        splits,
      });
      continue;
    }

    if (type === 'duration') {
      const durationEntry = entry as DurationBlock;
      const duration = durationEntry.duration;
      rows.push({
        id,
        type: 'duration',
        value: typeof duration?.value === 'number' ? duration.value : 0,
        unit: duration?.unit === 's' ? 's' : 'min',
        description: durationEntry.description ?? '',
      });
      continue;
    }

    if (type === 'split') {
      rows.push(mapSplit(entry as Split, id));
      continue;
    }

    if (type === 'text') {
      rows.push({ id, type: 'text', text: typeof entry.value === 'string' ? entry.value : '' });
      continue;
    }

    if (type === 'tags' || type === 'emojis' || type === 'derived') {
      continue;
    }

    if (type === 'unknown') {
      rows.push({ id, type: 'unknown', raw: typeof entry.raw === 'string' ? entry.raw : 'Unknown line' });
      continue;
    }

    rows.push({
      id,
      type: 'text',
      text: fallbackTextForEntry(type, entry as unknown as Record<string, unknown>),
    });
  }

  return rows;
}

export function workoutsFromCompact(input: string): { workouts: CompactWorkoutModel[]; error: string | null } {
  const result = parseCompact(input);

  if (!result.success) {
    const where = result.error.location?.start
      ? `Line ${result.error.location.start.line}, column ${result.error.location.start.column}`
      : 'Unknown location';
    return {
      workouts: [],
      error: `Parse error: ${where} - ${result.error.message}`,
    };
  }

  const workouts = result.document.workouts.map((workout) => {
    const tagsEntry = workout.content.find((item) => item?.type === 'tags');
    const emojisEntry = workout.content.find((item) => item?.type === 'emojis');
    const derivedValues = workout.content
      .filter((item) => item?.type === 'derived')
      .map((item) => {
        const derived = item as Derived;
        return {
          name: derived.name,
          value: derived.value,
          unit: derived.unit ?? null,
          basis: derived.basis ?? null,
          goodness: derived.goodness ?? null,
        };
      })
      .filter((item) => Number.isFinite(item.value));

    return {
      title: workout.title ?? '',
      date: formatCompactDate(workout.date),
      tags: Array.isArray(tagsEntry?.tags) ? tagsEntry.tags : [],
      emojis: typeof emojisEntry?.emojis === 'string' ? emojisEntry.emojis : undefined,
      derivedValues,
      rows: mapRows(Array.isArray(workout.content) ? workout.content : []),
    } satisfies CompactWorkoutModel;
  });

  return { workouts, error: null };
}