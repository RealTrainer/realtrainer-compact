export type {
  NormalizedDocument,
  NormalizedDocumentResult,
  NormalizedEnduranceRow,
  NormalizedLegacyRow,
  NormalizationWarning,
  NormalizedRow,
  NormalizedSport,
  NormalizedStrengthRow,
  NormalizedTextResult,
  NormalizedWorkout,
} from '@parser';

import type {
  NormalizedDocument,
  NormalizedDocumentResult,
  NormalizedTextResult,
  NormalizedWorkout,
} from '@parser';

export type NormalizedCompactRenderableData =
  | string
  | NormalizedDocument
  | NormalizedWorkout
  | NormalizedWorkout[]
  | NormalizedDocumentResult
  | NormalizedTextResult;