import { normalizeCompactText } from '@parser';
import type {
  NormalizedDocument,
  NormalizedDocumentResult,
  NormalizationWarning,
  NormalizedTextResult,
  NormalizedWorkout,
} from '@parser';
import type { NormalizedCompactRenderableData } from './normalized-types';

function isNormalizedDocument(value: NormalizedCompactRenderableData): value is NormalizedDocument {
  return typeof value === 'object' && value !== null && (value as NormalizedDocument).format === 'compact' && Array.isArray((value as NormalizedDocument).workouts);
}

function isNormalizedWorkout(value: NormalizedCompactRenderableData): value is NormalizedWorkout {
  return typeof value === 'object' && value !== null && (value as NormalizedWorkout).type === 'workout' && Array.isArray((value as NormalizedWorkout).rows);
}

function isNormalizedDocumentResult(value: NormalizedCompactRenderableData): value is NormalizedDocumentResult {
  return typeof value === 'object'
    && value !== null
    && 'document' in value
    && isNormalizedDocument((value as NormalizedDocumentResult).document)
    && Array.isArray((value as NormalizedDocumentResult).warnings);
}

function isNormalizedTextResult(value: NormalizedCompactRenderableData): value is NormalizedTextResult {
  return typeof value === 'object' && value !== null && 'success' in value && Array.isArray((value as NormalizedTextResult).warnings);
}

export function resolveNormalizedWorkouts(
  data: NormalizedCompactRenderableData,
): { workouts: NormalizedWorkout[]; warnings: NormalizationWarning[]; error: string | null } {
  if (typeof data === 'string') {
    if (data.includes('Format compact')) {
      return {
        workouts: [],
        warnings: [],
        error: 'Raw canonical Format compact text parsing is not implemented yet. Pass a normalized document or use normalizeCompactText(...) first.',
      };
    }

    const normalized = normalizeCompactText(data);
    if (!normalized.success) {
      return {
        workouts: [],
        warnings: normalized.warnings,
        error: normalized.error.message,
      };
    }

    return {
      workouts: normalized.document.workouts,
      warnings: normalized.warnings,
      error: null,
    };
  }

  if (Array.isArray(data)) {
    return { workouts: data, warnings: [], error: null };
  }

  if (isNormalizedTextResult(data)) {
    if (!data.success) {
      return { workouts: [], warnings: data.warnings, error: data.error.message };
    }
    return { workouts: data.document.workouts, warnings: data.warnings, error: null };
  }

  if (isNormalizedDocumentResult(data)) {
    return { workouts: data.document.workouts, warnings: data.warnings, error: null };
  }

  if (isNormalizedDocument(data)) {
    return { workouts: data.workouts, warnings: [], error: null };
  }

  if (isNormalizedWorkout(data)) {
    return { workouts: [data], warnings: [], error: null };
  }

  return { workouts: [], warnings: [], error: 'Unsupported normalized data input.' };
}