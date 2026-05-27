import { CompactV1Parser, type DocumentNode } from './parser-ranger/compact_parser_v1.js';
import {
  documentJsonFromAst,
  extractDeclaredFormat,
  preprocessCompactInput,
  stripTrailingEmptySections,
  validateCompactDocumentJson,
  type CompactParseValidationError,
} from './parse-ranger-shared.js';
import { toOldV1Json } from './v1-json-adapter.js';
import type { Document } from './types.js';
import type { ParseFailure, ParseError } from './parse-ranger.js';

export interface ParseAstResult {
  success: true;
  document: DocumentNode;
}

export type ParseAstOutcome = ParseAstResult | ParseFailure;

export type { ParseError };

export { preprocessCompactInput };

export function parseCompactAst(input: string): DocumentNode {
  const outcome = parseCompactAstOutcome(input);
  if (!outcome.success) {
    throw new Error(outcome.error.message);
  }
  return outcome.document;
}

export function parseCompactAstOutcome(input: string): ParseAstOutcome {
  try {
    const text = preprocessCompactInput(input);
    const ast = CompactV1Parser.parseText(text);
    const newJson = documentJsonFromAst(ast);

    const validationError = validateCompactDocumentJson(input, newJson);
    if (validationError) {
      return {
        success: false,
        error: validationError,
      };
    }

    return {
      success: true,
      document: ast,
    };
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

export function astToLegacyDocument(ast: DocumentNode): Document {
  const newJson = documentJsonFromAst(ast);
  extractDeclaredFormat(newJson);
  stripTrailingEmptySections(newJson);
  const adapted = toOldV1Json(newJson);
  return adapted.document as unknown as Document;
}

export type { CompactParseValidationError };
