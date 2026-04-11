import { parseCompact } from '../../../../src/index.ts';
import type { CompactWorkoutModel, CompactRow, CompactSplitRow } from '../lib/types';

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
        sets: typeof entry.sets === 'number' ? entry.sets : 0,
        reps: typeof entry.reps === 'number' ? entry.reps : 0,
        weightKg: typeof weight?.value === 'number' ? weight.value : undefined,
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

    if (type === 'unknown') {
      rows.push({ id, type: 'unknown', raw: typeof entry.raw === 'string' ? entry.raw : 'Unknown line' });
    }
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

    return {
      title: workout.title ?? 'Untitled workout',
      date: formatCompactDate(workout.date),
      tags: Array.isArray(tagsEntry?.tags) ? tagsEntry.tags : [],
      emojis: typeof emojisEntry?.emojis === 'string' ? emojisEntry.emojis : undefined,
      rows: mapRows(Array.isArray(workout.content) ? workout.content : []),
    } satisfies CompactWorkoutModel;
  });

  return { workouts, error: null };
}