import type { DocumentNode } from './parser-ranger/compact_parser_v1.js';

export function preprocessCompactInput(input: string): string {
  const preprocessed = input.replace(/(\d+(?:\.\d+)?)€/g, '$1EUROCHAR');
  return preprocessed.endsWith('\n') ? preprocessed : `${preprocessed}\n`;
}

export function documentJsonFromAst(ast: DocumentNode): Record<string, unknown> {
  return JSON.parse(ast.toJSONString()) as Record<string, unknown>;
}

export function extractDeclaredFormat(document: Record<string, unknown>): void {
  const workouts = Array.isArray(document.workouts) ? document.workouts : [];
  for (const w of workouts) {
    const workout = w as Record<string, unknown>;
    const remaining: unknown[] = [];
    let declared =
      typeof workout.format === 'string' && workout.format.trim().length > 0
        ? workout.format.trim()
        : null;

    const content = Array.isArray(workout.content) ? workout.content : [];
    for (const entry of content) {
      const item = entry as Record<string, unknown>;
      if (item?.type === 'meta' && item.key === 'format') {
        const value = String(item.value ?? '').trim();
        if (value.length > 0 && declared === null) {
          declared = value;
        }
        continue;
      }
      remaining.push(entry);
    }

    workout.content = remaining;
    if (declared) {
      workout.format = declared;
      document.format = declared;
    }
  }
}

export function stripTrailingEmptySections(document: Record<string, unknown>): void {
  const workouts = Array.isArray(document.workouts) ? document.workouts : [];
  for (const w of workouts) {
    const workout = w as Record<string, unknown>;
    const content = workout.content;
    while (
      Array.isArray(content) &&
      content.length > 0 &&
      (content[content.length - 1] as Record<string, unknown>)?.type === 'section'
    ) {
      content.pop();
    }
  }
}

export function validateDerivedEntries(document: Record<string, unknown>): string | null {
  const workouts = Array.isArray(document.workouts) ? document.workouts : [];
  for (const w of workouts) {
    const workout = w as Record<string, unknown>;
    const content = Array.isArray(workout.content) ? workout.content : [];
    for (const entry of content) {
      const item = entry as Record<string, unknown>;
      if (item?.type !== 'derived') continue;
      const confidence = item.confidence as number | null | undefined;
      if (confidence != null && (confidence < 1 || confidence > 100)) {
        return 'Derived confidence must be between 1 and 100';
      }
      const goodness = item.goodness as number | null | undefined;
      if (goodness != null && (goodness < 1 || goodness > 5)) {
        return 'Derived goodness must be between 1 and 5';
      }
    }
  }
  return null;
}

export function hasFatalSyntaxError(input: string, document: Record<string, unknown>): boolean {
  const trimmed = input.trim();
  if (trimmed.startsWith('[[')) {
    return true;
  }
  const workouts = Array.isArray(document.workouts) ? document.workouts : [];
  for (const w of workouts) {
    const workout = w as Record<string, unknown>;
    const content = Array.isArray(workout.content) ? workout.content : [];
    for (const entry of content) {
      const item = entry as Record<string, unknown>;
      if (item?.type === 'unknown' && String(item.raw ?? '').trim().startsWith('[[')) {
        return true;
      }
    }
  }
  return false;
}

export interface CompactParseValidationError {
  message: string;
  location?: {
    start: { line: number; column: number; offset: number };
    end?: { line: number; column: number; offset: number };
  };
}

export function validateCompactDocumentJson(
  input: string,
  newJson: Record<string, unknown>,
): CompactParseValidationError | null {
  const derivedError = validateDerivedEntries(newJson);
  if (derivedError) {
    return { message: derivedError };
  }

  if (hasFatalSyntaxError(input, newJson)) {
    return {
      message: 'Syntax error',
      location: { start: { line: 1, column: 1, offset: 0 } },
    };
  }

  return null;
}
