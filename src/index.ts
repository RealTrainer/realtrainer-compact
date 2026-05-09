/**
 * Compact Format Parser
 *
 * A parser for COMPACT format - a concise text-based DSL for workout tracking,
 * nutrition, expenses, and life logging.
 *
 * @packageDocumentation
 */

import type { Content, Document, Meta, Workout } from './types.js';

// The generated parser will be imported at runtime
// @ts-expect-error - No type definitions for generated parser
import { parse } from './parser-generated.js';

function extractDeclaredFormat(workout: Workout): string | null {
  const remainingContent: Content[] = [];
  let declaredFormat: string | null = workout.format ?? null;

  for (const entry of workout.content) {
    if (entry.type === 'meta') {
      const metaEntry = entry as Meta;
      if (metaEntry.key === 'format') {
        const value = metaEntry.value.trim();
        if (value.length > 0 && declaredFormat === null) {
          declaredFormat = value;
        }
        continue;
      }
    }

    remainingContent.push(entry);
  }

  workout.content = remainingContent;
  workout.format = declaredFormat;
  return declaredFormat;
}

/**
 * Parse error with location information
 */
export interface ParseError {
  message: string;
  location?: {
    start: { line: number; column: number; offset: number };
    end: { line: number; column: number; offset: number };
  };
  expected?: Array<{ type: string; description: string }>;
  found?: string | null;
}

/**
 * Successful parse result
 */
export interface ParseResult<TDocument extends Document = Document> {
  success: true;
  document: TDocument;
}

/**
 * Failed parse result
 */
export interface ParseFailure {
  success: false;
  error: ParseError;
}

/**
 * Union type for parse outcome
 */
export type ParseOutcome<TDocument extends Document = Document> = ParseResult<TDocument> | ParseFailure;

/**
 * Parse compact format text into a Document AST.
 *
 * @param input - Raw compact format text
 * @returns ParseOutcome with either the parsed document or error details
 *
 * @example
 * ```typescript
 * import { parseCompact } from 'compact-parser';
 *
 * const result = parseCompact(`
 * [2026-01-15T18:00+02]## Jalkatreeni
 * Tags kuntosali, voima, jalat
 * Exercise Kyykky|4x8@80kg
 * Exercise Jalkaprässi|3x12@100kg
 * `);
 *
 * if (result.success) {
 *   console.log(result.document.workouts[0].title); // "Jalkatreeni"
 * } else {
 *   console.error(result.error.message);
 * }
 * ```
 */
export function parseCompact(input: string): ParseOutcome {
  try {
    // Ensure input ends with newline (parser requirement)
    const normalizedInput = input.endsWith('\n') ? input : input + '\n';

    const document = parse(normalizedInput) as Document;

    // Strip trailing empty sections from each workout
    // AI sometimes generates a "Section Sarjat" at the end with no content after it
    for (const workout of document.workouts) {
      const declaredFormat = extractDeclaredFormat(workout);
      if (declaredFormat && !document.format) {
        document.format = declaredFormat;
      }

      while (
        workout.content.length > 0 &&
        workout.content[workout.content.length - 1].type === 'section'
      ) {
        workout.content.pop();
      }
    }

    return {
      success: true,
      document,
    };
  } catch (e: unknown) {
    const error = e as ParseError;
    return {
      success: false,
      error: {
        message: error.message || 'Unknown parse error',
        location: error.location,
        expected: error.expected,
        found: error.found,
      },
    };
  }
}

export function getDeclaredCompactFormat(document: Document | Workout): string | null {
  if ('workouts' in document) {
    if (typeof document.format === 'string' && document.format.trim().length > 0) {
      return document.format;
    }

    for (const workout of document.workouts) {
      const format = getDeclaredCompactFormat(workout);
      if (format) {
        return format;
      }
    }

    return null;
  }

  if (typeof document.format === 'string' && document.format.trim().length > 0) {
    return document.format;
  }

  for (const entry of document.content) {
    if (entry.type === 'meta') {
      const metaEntry = entry as Meta;
      if (metaEntry.key === 'format' && metaEntry.value.trim().length > 0) {
        return metaEntry.value.trim();
      }
    }
  }

  return null;
}

export function isParseSuccess<TDocument extends Document = Document>(
  result: ParseOutcome<TDocument>,
): result is ParseResult<TDocument> {
  return result.success;
}

export type ContentOfType<TType extends Content['type']> = Extract<Content, { type: TType }>;

export function getWorkoutEntries<TType extends Content['type']>(
  workout: Workout,
  type: TType,
): ContentOfType<TType>[] {
  return workout.content.filter((entry): entry is ContentOfType<TType> => entry.type === type);
}

/**
 * Validate compact format without returning full document.
 * Useful for quick validation in UI.
 *
 * @param input - Raw compact format text
 * @returns Object with valid flag and optional error
 *
 * @example
 * ```typescript
 * const { valid, error } = validateCompact(userInput);
 * if (!valid) {
 *   showError(`Line ${error.location?.start.line}: ${error.message}`);
 * }
 * ```
 */
export function validateCompact(input: string): { valid: boolean; error?: ParseError } {
  const result = parseCompact(input);
  if (result.success) {
    return { valid: true };
  }
  return { valid: false, error: result.error };
}

/**
 * Format a parse error for display to users.
 *
 * @param error - The parse error to format
 * @returns Human-readable error message with location
 *
 * @example
 * ```typescript
 * const result = parseCompact(input);
 * if (!result.success) {
 *   console.error(formatParseError(result.error));
 *   // Output: "Line 5, column 12: Expected exercise name"
 * }
 * ```
 */
export function formatParseError(error: ParseError): string {
  if (error.location) {
    const { line, column } = error.location.start;
    return `Line ${line}, column ${column}: ${error.message}`;
  }
  return error.message;
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

/**
 * Get the line number where a parse error occurred.
 *
 * @param error - The parse error
 * @returns Line number (1-based) or null if not available
 */
export function getErrorLine(error: ParseError): number | null {
  return error.location?.start.line ?? null;
}

/**
 * Get the column number where a parse error occurred.
 *
 * @param error - The parse error
 * @returns Column number (1-based) or null if not available
 */
export function getErrorColumn(error: ParseError): number | null {
  return error.location?.start.column ?? null;
}

// Re-export all types
export * from './types.js';

// Re-export renderers
export * from './renderers/index.js';

// Re-export similarity utilities
export * from './similarity.js';
