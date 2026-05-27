/**
 * Compact Format Parser
 *
 * A parser for COMPACT format - a concise text-based DSL for workout tracking,
 * nutrition, expenses, and life logging.
 *
 * @packageDocumentation
 */

import type { Content, Document, Workout } from './types.js';

export * from './parser-ranger/index.js';

export type {
  ParseError,
  ParseFailure,
  ParseOutcome,
  ParseResult,
} from './parse-ranger.js';

export {
  formatParseError,
  getDeclaredCompactFormat,
  getErrorColumn,
  getErrorLine,
  parseCompact,
  validateCompact,
} from './parse-ranger.js';

export type { ParseAstOutcome, ParseAstResult } from './parse-ranger-ast.js';

export {
  astToLegacyDocument,
  parseCompactAst,
  parseCompactAstOutcome,
  preprocessCompactInput,
} from './parse-ranger-ast.js';

export function isParseSuccess<TDocument extends Document = Document>(
  result: import('./parse-ranger.js').ParseOutcome<TDocument>,
): result is import('./parse-ranger.js').ParseResult<TDocument> {
  return result.success;
}

export type ContentOfType<TType extends Content['type']> = Extract<Content, { type: TType }>;

export function getWorkoutEntries<TType extends Content['type']>(
  workout: Workout,
  type: TType,
): ContentOfType<TType>[] {
  return workout.content.filter((entry): entry is ContentOfType<TType> => entry.type === type);
}

export type {
  NormalizedDocument,
  NormalizedDocumentResult,
  NormalizedEnduranceRow,
  NormalizedLegacyRow,
  NormalizedRow,
  NormalizedSport,
  NormalizedStrengthRow,
  NormalizedStrengthSet,
  NormalizedStrengthUniformSpec,
  NormalizedTextResult,
  NormalizedWorkout,
  NormalizationWarning,
} from './normalize.js';

export {
  normalizeCompactDocument,
  normalizeCompactText,
  serializeNormalizedDocument,
} from './normalize.js';

export type * from './document-types.js';
export * from './renderers/index.js';
export * from './similarity.js';
