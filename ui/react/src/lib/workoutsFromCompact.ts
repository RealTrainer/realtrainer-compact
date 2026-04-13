import { isParseSuccess, parseCompact } from '@parser';
import type { CompactWorkoutModel } from './types';
import { compactWorkoutsFromDocument } from './parsedRowMapping';

export function workoutsFromCompact(input: string): { workouts: CompactWorkoutModel[]; error: string | null } {
  const result = parseCompact(input);

  if (!isParseSuccess(result)) {
    const where = result.error.location?.start
      ? `Line ${result.error.location.start.line}, column ${result.error.location.start.column}`
      : 'Unknown location';
    return {
      workouts: [],
      error: `Parse error: ${where} - ${result.error.message}`,
    };
  }

  return { workouts: compactWorkoutsFromDocument(result.document), error: null };
}