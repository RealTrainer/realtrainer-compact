import { parseCompact } from '../../../../src/index.ts';
import type { CompactWorkoutModel, CompactRow, CompactSplitRow } from './types';

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
    const date = formatCompactDate(entry.date);
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

function formatCompactDate(dateValue: unknown): string {
  if (!dateValue || typeof dateValue !== 'object') {
    return '';
  }

  const d = dateValue as Record<string, unknown>;

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

function mapSplit(split: Record<string, unknown>, splitId: string): CompactSplitRow {
  const nestedSplits = Array.isArray(split.splits)
    ? split.splits
        .filter((nested): nested is Record<string, unknown> => !!nested && typeof nested === 'object')
        .map((nested, nestedIndex) => mapSplit(nested, `${splitId}-nested-${nestedIndex}`))
    : null;

  return {
    id: splitId,
    type: 'split',
    distance: split.distance && typeof split.distance === 'object' ? split.distance as CompactSplitRow['distance'] : undefined,
    duration: split.duration && typeof split.duration === 'object' ? split.duration as CompactSplitRow['duration'] : undefined,
    pace: split.pace && typeof split.pace === 'object' ? split.pace as CompactSplitRow['pace'] : undefined,
    intensity: split.intensity,
    hr: typeof split.hr === 'number' ? split.hr : null,
    customFields: Array.isArray(split.customFields) ? split.customFields as CompactSplitRow['customFields'] : null,
    note: typeof split.note === 'string' ? split.note : null,
    splits: nestedSplits,
  };
}

function mapRows(content: unknown[]): CompactRow[] {
  const rows: CompactRow[] = [];

  for (let index = 0; index < content.length; index += 1) {
    const item = content[index];
    if (!item || typeof item !== 'object') {
      continue;
    }

    const entry = item as Record<string, unknown>;
    const type = entry.type;
    if (typeof type !== 'string') {
      continue;
    }

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
      const weight = entry.weight && typeof entry.weight === 'object' ? (entry.weight as Record<string, unknown>) : null;
      rows.push({
        id,
        type: 'exercise',
        name: typeof entry.name === 'string' ? entry.name : 'Exercise',
        sets: typeof entry.sets === 'number' ? entry.sets : null,
        setsMax: typeof entry.setsMax === 'number' ? entry.setsMax : null,
        reps:
          typeof entry.reps === 'number' || typeof entry.reps === 'string' || (entry.reps && typeof entry.reps === 'object')
            ? (entry.reps as number | string | { rm: number })
            : null,
        repsMax: typeof entry.repsMax === 'number' ? entry.repsMax : null,
        repsRight: typeof entry.repsRight === 'number' ? entry.repsRight : null,
        rounds: typeof entry.rounds === 'number' ? entry.rounds : null,
        unit: typeof entry.unit === 'string' ? entry.unit : null,
        weightKg: typeof weight?.value === 'number' ? weight.value : undefined,
        specType:
          entry.specType === 'measured' || entry.specType === 'multiset'
            ? entry.specType
            : null,
        measuredDurations: Array.isArray(entry.measuredDurations)
          ? entry.measuredDurations
              .filter((d): d is Record<string, unknown> => !!d && typeof d === 'object')
              .map((d) => ({
                left: typeof d.left === 'number' ? d.left : 0,
                right: typeof d.right === 'number' ? d.right : null,
                unit: d.unit === 'min' ? 'min' : 's',
              }))
          : undefined,
        isBilateral: typeof entry.isBilateral === 'boolean' ? entry.isBilateral : undefined,
        note: typeof entry.note === 'string' ? entry.note : '',
      });
      continue;
    }

    if (type === 'pyramid') {
      const sets = Array.isArray(entry.sets)
        ? entry.sets.map((set) => {
            const s = (set && typeof set === 'object') ? (set as Record<string, unknown>) : {};
            const weight = s.weight && typeof s.weight === 'object' ? (s.weight as Record<string, unknown>) : null;
            return {
              reps: typeof s.reps === 'number' ? s.reps : 0,
              weightKg: typeof weight?.value === 'number' ? weight.value : undefined,
            };
          })
        : [];

      rows.push({
        id,
        type: 'pyramid',
        name: typeof entry.name === 'string' ? entry.name : 'Pyramid',
        sets,
        note: typeof entry.note === 'string' ? entry.note : '',
      });
      continue;
    }

    if (type === 'move' || type === 'run') {
      const splits = Array.isArray(entry.splits)
        ? entry.splits
            .filter((split): split is Record<string, unknown> => !!split && typeof split === 'object')
            .map((split, splitIndex) => mapSplit(split, `${id}-split-${splitIndex}`))
        : null;

      rows.push({
        id,
        type: 'move',
        sport: typeof entry.sport === 'string' ? entry.sport : null,
        sets: typeof entry.sets === 'number' ? entry.sets : undefined,
        count: typeof entry.count === 'number' ? entry.count : undefined,
        countMax: typeof entry.countMax === 'number' ? entry.countMax : null,
        distance: entry.distance && typeof entry.distance === 'object' ? entry.distance as { value?: number | null; valueMax?: number | null; unit?: string | null } : undefined,
        duration: entry.duration && typeof entry.duration === 'object' ? entry.duration as { value?: number | null; unit?: string | null } : undefined,
        steps: typeof entry.steps === 'number' ? entry.steps : null,
        intensity: entry.intensity,
        recovery: entry.recovery && typeof entry.recovery === 'object' ? entry.recovery as { value?: number | null; max?: number | null; valueMax?: number | null; unit?: string | null; text?: string | null } : null,
        note: typeof entry.note === 'string' ? entry.note : null,
        description: typeof entry.description === 'string' ? entry.description : null,
        customFields: Array.isArray(entry.customFields) ? entry.customFields as Array<{ name: string; value: unknown; unit?: string | null }> : null,
        splits,
      });
      continue;
    }

    if (type === 'duration') {
      const duration = entry.duration && typeof entry.duration === 'object' ? (entry.duration as Record<string, unknown>) : null;
      rows.push({
        id,
        type: 'duration',
        value: typeof duration?.value === 'number' ? duration.value : 0,
        unit: duration?.unit === 's' ? 's' : 'min',
        description: typeof entry.description === 'string' ? entry.description : '',
      });
      continue;
    }

    if (type === 'split') {
      rows.push(mapSplit(entry, id));
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
      text: fallbackTextForEntry(type, entry),
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
        const derived = item as unknown as Record<string, unknown>;
        return {
          name: typeof derived.name === 'string' ? derived.name : 'derived',
          value: typeof derived.value === 'number' ? derived.value : Number(derived.value ?? 0),
          unit: typeof derived.unit === 'string' ? derived.unit : null,
          basis: typeof derived.basis === 'string' ? derived.basis : null,
          goodness: typeof derived.goodness === 'number' ? derived.goodness as 1 | 2 | 3 | 4 | 5 : null,
        };
      })
      .filter((item) => Number.isFinite(item.value));

    return {
      title: workout.title ?? 'Untitled workout',
      date: formatCompactDate(workout.date),
      tags: Array.isArray(tagsEntry?.tags) ? tagsEntry.tags : [],
      emojis: typeof emojisEntry?.emojis === 'string' ? emojisEntry.emojis : undefined,
      derivedValues,
      rows: mapRows(Array.isArray(workout.content) ? workout.content : []),
    } satisfies CompactWorkoutModel;
  });

  return { workouts, error: null };
}