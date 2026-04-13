import type { Content } from '@parser/types';
import type { CompactRow } from '../../../lib/types';
import { compactRowFromParsedContent } from '../../../lib/parsedRowMapping';

export type CompactRowInput = CompactRow | Content;

export function normalizeRow<TType extends CompactRow['type']>(
  row: Extract<CompactRowInput, { type: TType }>,
): Extract<CompactRow, { type: TType }> {
  if ('id' in row) {
    return row as Extract<CompactRow, { type: TType }>;
  }

  return compactRowFromParsedContent(row as Content) as Extract<CompactRow, { type: TType }>;
}