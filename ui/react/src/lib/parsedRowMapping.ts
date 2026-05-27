import type {
  Circuit,
  CircuitItem,
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
  Workout,
  Document,
} from '@parser/types';
import type { CompactWorkoutModel, CompactRow, CompactSplitRow, CompactExerciseRow, CompactCircuitRow, CompactCircuitItem } from './types';

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

  if (type === 'feeling') {
    const score = entry.value != null ? `${asText(entry.value)}${asText(entry.scale) === 'rpe' ? ' RPE' : '/10'}` : '';
    const description = asText(entry.description);
    return ['Feeling', score, description ? `| ${description}` : ''].filter(Boolean).join(' ').trim();
  }

  if (type === 'pain') {
    const bodyPart = asText(entry.bodyPart);
    const severity = entry.severity != null ? `${asText(entry.severity)}/10` : '';
    const description = asText(entry.description);
    return ['Pain', bodyPart, severity, description ? `| ${description}` : ''].filter(Boolean).join(' ').trim();
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

export function formatCompactDate(dateValue: DateValue | null | undefined): string {
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

function isNestedSplit(value: NonNullable<Split['splits']>[number]): value is Split {
  return value.type === 'split';
}

function mapSplit(split: Split, splitId: string): CompactSplitRow {
  const nestedSplits = Array.isArray(split.splits)
    ? split.splits
      .filter(isNestedSplit)
      .map((nested, nestedIndex) => mapSplit(nested, `${splitId}-nested-${nestedIndex}`))
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

export function compactRowFromParsedContent(content: Content, index = 0): CompactRow {
  const type = content.type;
  const id = `${type}-${index}`;

  if (type === 'summary') {
    return { id, type: 'summary', text: typeof content.text === 'string' ? content.text : '' };
  }

  if (type === 'phase') {
    return {
      id,
      type: 'phase',
      number: typeof content.number === 'number' ? content.number : null,
      name: typeof content.name === 'string' ? content.name : 'Phase',
      details: typeof content.details === 'string' ? content.details : '',
    };
  }

  if (type === 'section') {
    return { id, type: 'section', name: typeof content.name === 'string' ? content.name : 'Section' };
  }

  if (type === 'custom') {
    return {
      id,
      type: 'custom',
      name: typeof content.name === 'string' ? content.name : 'Custom',
      value: content.value,
      valueMax: typeof content.valueMax === 'number' ? content.valueMax : null,
      unit: typeof content.unit === 'string' ? content.unit : null,
    };
  }

  if (type === 'exercise') {
    const exercise = content as ParsedExercise;
    return {
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
    };
  }

  if (type === 'pyramid') {
    const pyramid = content as Pyramid;
    const sets = Array.isArray(pyramid.sets)
      ? pyramid.sets.map((set) => ({
          reps: typeof set.reps === 'number' ? set.reps : 0,
          weightKg: getWeightValue(set.weight),
        }))
      : [];

    return {
      id,
      type: 'pyramid',
      name: pyramid.name,
      sets,
      note: pyramid.note ?? '',
    };
  }

  if (type === 'circuit') {
    const circuit = content as Circuit;
    const exercises: CompactCircuitItem[] = Array.isArray(circuit.exercises)
      ? circuit.exercises.map((item: CircuitItem) => ({
          name: item.name,
          sets: item.sets ?? null,
          reps: item.reps ?? null,
          repsRight: item.repsRight ?? null,
          unit: item.unit ?? null,
          weightKg: getWeightValue(item.weight),
          recovery: item.recovery as CompactCircuitRow['recovery'],
          note: item.note ?? null,
          customFields: item.customFields as CompactCircuitItem['customFields'],
        }))
      : [];

    return {
      id,
      type: 'circuit',
      variant: circuit.variant,
      rounds: circuit.rounds,
      exercises,
      recovery: circuit.recovery as CompactCircuitRow['recovery'],
      roundRest: circuit.roundRest as CompactCircuitRow['roundRest'],
      note: circuit.note ?? null,
    };
  }

  if (type === 'move') {
    const move = content as Move;
    const splits = Array.isArray(move.splits)
      ? move.splits
        .filter(isNestedSplit)
        .map((split, splitIndex) => mapSplit(split, `${id}-split-${splitIndex}`))
      : null;

    return {
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
    };
  }

  if (type === 'duration') {
    const durationEntry = content as DurationBlock;
    const duration = durationEntry.duration;
    return {
      id,
      type: 'duration',
      value: typeof duration?.value === 'number' ? duration.value : 0,
      unit: duration?.unit === 's' ? 's' : 'min',
      description: durationEntry.description ?? '',
    };
  }

  if (type === 'split') {
    return mapSplit(content as Split, id);
  }

  if (type === 'text') {
    return { id, type: 'text', text: typeof content.value === 'string' ? content.value : '' };
  }

  if (type === 'unknown') {
    return { id, type: 'unknown', raw: typeof content.raw === 'string' ? content.raw : 'Unknown line' };
  }

  return {
    id,
    type: 'text',
    text: fallbackTextForEntry(type, content as unknown as Record<string, unknown>),
  };
}

export function compactRowsFromParsedContent(content: Content[]): CompactRow[] {
  return content
    .filter((item) => item.type !== 'tags' && item.type !== 'emojis' && item.type !== 'derived')
    .map((item, index) => compactRowFromParsedContent(item, index));
}

export function compactWorkoutFromParsedWorkout(workout: Workout): CompactWorkoutModel {
  const tagsEntry = workout.content.find((item) => item?.type === 'tags');
  const emojis = workout.content
    .filter((item): item is Extract<Content, { type: 'emojis' }> => item?.type === 'emojis')
    .map((item) => item.emojis)
    .filter((item): item is string => typeof item === 'string' && item.length > 0)
    .join('');
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
    emojis: emojis.length > 0 ? emojis : undefined,
    derivedValues,
    rows: compactRowsFromParsedContent(Array.isArray(workout.content) ? workout.content : []),
  };
}

export function compactWorkoutsFromDocument(document: Document): CompactWorkoutModel[] {
  return document.workouts.map((workout) => compactWorkoutFromParsedWorkout(workout));
}