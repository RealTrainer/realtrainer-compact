import { CompactV1Parser } from './parser-ranger/compact_parser_v1.js';
import {
  documentJsonFromAst,
  extractDeclaredFormat,
  preprocessCompactInput,
  stripTrailingEmptySections,
  validateCompactDocumentJson,
} from './parse-ranger-shared.js';
import { toOldV1Json } from './v1-json-adapter.js';
import type { Document, Meta, Workout } from './types.js';

export interface ParseError {
  message: string;
  location?: {
    start: { line: number; column: number; offset: number };
    end?: { line: number; column: number; offset: number };
  };
  expected?: Array<{ type: string; description: string }>;
  found?: string | null;
}

export interface ParseResult<TDocument extends Document = Document> {
  success: true;
  document: TDocument;
}

export interface ParseFailure {
  success: false;
  error: ParseError;
}

export type ParseOutcome<TDocument extends Document = Document> =
  | ParseResult<TDocument>
  | ParseFailure;

export function parseCompact(input: string): ParseOutcome {
  try {
    const text = preprocessCompactInput(input);
    const doc = CompactV1Parser.parseText(text);
    const newJson = documentJsonFromAst(doc);

    const validationError = validateCompactDocumentJson(input, newJson);
    if (validationError) {
      return {
        success: false,
        error: validationError,
      };
    }

    extractDeclaredFormat(newJson);
    stripTrailingEmptySections(newJson);
    return toOldV1Json(newJson) as unknown as ParseOutcome;
  } catch (e: unknown) {
    const err = e as { message?: string };
    return {
      success: false,
      error: {
        message: err?.message ?? String(e),
      },
    };
  }
}

/** Parse and return document; throws on failure (for internal callers). */
export function parseDocument(input: string): Document {
  const result = parseCompact(input);
  if (!result.success) {
    const err = new Error(result.error.message) as Error & ParseError;
    if (result.error.location) err.location = result.error.location;
    if (result.error.expected) err.expected = result.error.expected;
    if (result.error.found !== undefined) err.found = result.error.found;
    throw err;
  }
  return result.document;
}

function extractFormatFromWorkout(workout: Workout): string | null {
  if (typeof workout.format === 'string' && workout.format.trim().length > 0) {
    return workout.format.trim();
  }
  for (const entry of workout.content) {
    if (entry.type === 'meta') {
      const metaEntry = entry as Meta;
      if (metaEntry.key === 'format') {
        const value = metaEntry.value.trim();
        if (value.length > 0) {
          return value;
        }
      }
    }
  }
  return null;
}

export function getDeclaredCompactFormat(document: Document | Workout): string | null {
  if (!document || typeof document !== 'object') {
    return null;
  }
  if ('workouts' in document) {
    if (typeof document.format === 'string' && document.format.trim().length > 0) {
      return document.format;
    }
    for (const workout of document.workouts) {
      const format = extractFormatFromWorkout(workout);
      if (format) {
        return format;
      }
    }
    return null;
  }
  return extractFormatFromWorkout(document);
}

export function validateCompact(input: string): { valid: boolean; error?: ParseError } {
  const result = parseCompact(input);
  if (result.success) {
    return { valid: true };
  }
  return { valid: false, error: result.error };
}

export function formatParseError(error: ParseError): string {
  if (error.location) {
    const { line, column } = error.location.start;
    return `Line ${line}, column ${column}: ${error.message}`;
  }
  return error.message;
}

export function getErrorLine(error: ParseError): number | null {
  return error.location?.start.line ?? null;
}

export function getErrorColumn(error: ParseError): number | null {
  return error.location?.start.column ?? null;
}
