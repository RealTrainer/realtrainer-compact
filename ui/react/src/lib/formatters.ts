import type { CompactDurationRow, CompactExerciseRow, CompactRunRow } from './types';

export function formatExerciseScheme(row: CompactExerciseRow): string {
  const load = typeof row.weightKg === 'number' ? `@${row.weightKg}kg` : '';
  return `${row.sets}x${row.reps}${load}`;
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
