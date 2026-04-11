import type { CompactDurationRow, CompactExerciseRow, CompactRunRow } from './types';

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

export function formatExerciseScheme(row: CompactExerciseRow): string {
  if (row.specType === 'measured' && Array.isArray(row.measuredDurations) && row.measuredDurations.length > 0) {
    return row.measuredDurations
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
  return `${spec}${load}`;
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
