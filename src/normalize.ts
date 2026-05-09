export type {
  V2Document as NormalizedDocument,
  V2EnduranceRow as NormalizedEnduranceRow,
  V2LegacyRow as NormalizedLegacyRow,
  V2MigrationResult as NormalizedDocumentResult,
  V2MigrationWarning as NormalizationWarning,
  V2Row as NormalizedRow,
  V2Sport as NormalizedSport,
  V2StrengthRow as NormalizedStrengthRow,
  V2StrengthSet as NormalizedStrengthSet,
  V2StrengthUniformSpec as NormalizedStrengthUniformSpec,
  V2TextMigrationResult as NormalizedTextResult,
  V2Workout as NormalizedWorkout,
} from './normalize-internal.js';

export {
  migrateV1DocumentToV2 as normalizeCompactDocument,
  migrateV1TextToV2 as normalizeCompactText,
  serializeV2Document as serializeNormalizedDocument,
} from './normalize-internal.js';