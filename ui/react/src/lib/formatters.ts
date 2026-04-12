import type { CompactDurationRow, CompactExerciseRow, CompactRunRow } from './types';

export interface ExerciseSchemePart {
  text: string;
  tone: 'default' | 'weight' | 'muted';
  kind: 'spec' | 'weight' | 'recovery';
}

function formatMeasuredDuration(value: number, unit: 's' | 'min'): string {
  if (unit === 'min') {
    return `${value}min`;
  }
  if (value >= 60) {
    const mins = Math.floor(value / 60);
    const secs = value % 60;
    return secs > 0 ? `${mins}min${secs}s` : `${mins}min`;
  }
  return `${value}s`;
}

function formatExerciseRecovery(row: CompactExerciseRow): string {
  if (!row.recovery) {
    return '';
  }

  if (typeof row.recovery.text === 'string' && row.recovery.text.trim().length > 0) {
    return `/${row.recovery.text.trim()}`;
  }

  if (typeof row.recovery.value !== 'number') {
    return '';
  }

  const max = typeof row.recovery.valueMax === 'number'
    ? row.recovery.valueMax
    : typeof row.recovery.max === 'number'
      ? row.recovery.max
      : null;

  const unit = row.recovery.unit === 'sec'
    ? 's'
    : row.recovery.unit ?? '';

  if (typeof max === 'number' && max !== row.recovery.value) {
    return `/${row.recovery.value}-${max}${unit}`;
  }

  return `/${row.recovery.value}${unit}`;
}

function formatExerciseRecoveryLabel(row: CompactExerciseRow): string {
  if (!row.recovery) {
    return '';
  }

  if (typeof row.recovery.text === 'string' && row.recovery.text.trim().length > 0) {
    return `/ palautus ${row.recovery.text.trim()}`;
  }

  if (typeof row.recovery.value !== 'number') {
    return '';
  }

  const max = typeof row.recovery.valueMax === 'number'
    ? row.recovery.valueMax
    : typeof row.recovery.max === 'number'
      ? row.recovery.max
      : null;

  const unit = row.recovery.unit === 'sec'
    ? 's'
    : row.recovery.unit ?? '';

  if (typeof max === 'number' && max !== row.recovery.value) {
    return `/ palautus ${row.recovery.value}-${max}${unit}`;
  }

  return `/ palautus ${row.recovery.value}${unit}`;
}

export function formatExerciseScheme(row: CompactExerciseRow): string {
  return formatExerciseSchemeParts(row).map((part) => part.text).join('');
}

export function formatExerciseSchemeParts(row: CompactExerciseRow): ExerciseSchemePart[] {
  if (row.specType === 'measured' && Array.isArray(row.measuredDurations) && row.measuredDurations.length > 0) {
    const measured = row.measuredDurations
      .map((d) => {
        const left = d.left > 0 ? formatMeasuredDuration(d.left, d.unit) : null;
        const right = typeof d.right === 'number' && d.right > 0 ? formatMeasuredDuration(d.right, d.unit) : null;
        if (left && right) {
          return `${left}+${right}`;
        }
        return left ?? right;
      })
      .filter((part): part is string => !!part)
      .join(', ');

    const recoveryLabel = formatExerciseRecoveryLabel(row);
    return [
      { text: measured, tone: 'default', kind: 'spec' },
      ...(recoveryLabel ? [{ text: ` • ${recoveryLabel}`, tone: 'muted' as const, kind: 'recovery' as const }] : []),
    ];
  }

  if (row.distance && typeof row.distance.value === 'number') {
    const setsPart = typeof row.sets === 'number' && row.sets > 0
      ? `${row.sets}${typeof row.setsMax === 'number' && row.setsMax > row.sets ? `-${row.setsMax}` : ''}x`
      : '';
    const distancePart = `${row.distance.value}${row.distance.unit ?? ''}`;
    const recovery = formatExerciseRecovery(row);
    const load = typeof row.weightKg === 'number' && row.weightKg > 0
      ? `@${typeof row.weightCount === 'number' && row.weightCount > 1 ? `${row.weightCount}x` : ''}${row.weightKg}kg`
      : '';
    return [
      { text: `${setsPart}${distancePart}${recovery}`, tone: 'default', kind: 'spec' },
      ...(load ? [{ text: load, tone: 'weight' as const, kind: 'weight' as const }] : []),
    ];
  }

  const roundsPrefix = typeof row.rounds === 'number' && row.rounds > 0 ? `${row.rounds}x` : '';
  const setsPart = typeof row.sets === 'number' && row.sets > 0
    ? `${row.sets}${typeof row.setsMax === 'number' && row.setsMax > row.sets ? `-${row.setsMax}` : ''}x`
    : '';

  let repsPart = '';
  if (row.reps !== null && row.reps !== undefined && row.reps !== '') {
    const repsValue = typeof row.reps === 'object' && 'rm' in row.reps ? `${row.reps.rm}RM` : String(row.reps);
    repsPart = `${repsValue}${typeof row.repsMax === 'number' ? `-${row.repsMax}` : ''}${row.unit ?? ''}`;
    if (typeof row.repsRight === 'number') {
      repsPart = `${repsPart}+${row.repsRight}${row.unit ?? ''}`;
    }
  }

  const spec = `${roundsPrefix}${setsPart}${repsPart}`;
  const load = typeof row.weightKg === 'number' && row.weightKg > 0 ? `${repsPart ? 'x' : ''}${row.weightKg}kg` : '';
  return [
    { text: spec, tone: 'default', kind: 'spec' },
    ...(load ? [{ text: load, tone: 'weight' as const, kind: 'weight' as const }] : []),
    ...(formatExerciseRecovery(row) ? [{ text: formatExerciseRecovery(row), tone: 'default' as const, kind: 'recovery' as const }] : []),
  ];
}

export function formatRun(row: CompactRunRow): string {
  const chunks: string[] = [];
  if (typeof row.distanceValue === 'number' && row.distanceUnit) {
    chunks.push(`${row.distanceValue}${row.distanceUnit}`);
  }
  if (typeof row.durationMin === 'number') {
    chunks.push(`${row.durationMin}min`);
  }
  if (row.note) {
    chunks.push(`| ${row.note}`);
  }
  return chunks.join(' ');
}

export function formatDuration(row: CompactDurationRow): string {
  return `${row.value}${row.unit}${row.description ? ` | ${row.description}` : ''}`;
}
