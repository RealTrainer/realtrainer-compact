import type { Content } from '@parser/types';
import type { CompactUiRenderers } from '../../lib/types';
import { compactRowFromParsedContent } from '../../lib/parsedRowMapping';
import {
  CircuitRow,
  Custom,
  Duration,
  Exercise,
  MoveRow,
  Phase,
  PyramidRow,
  Run,
  Section,
  SplitRow,
  Summary,
  Text,
  Unknown,
} from './CompactRowParts';

export interface CompactRowViewProps {
  row: Content | import('./CompactRowParts').CompactRowInput;
  renderers?: CompactUiRenderers;
}

export function CompactRowView({ row, renderers }: CompactRowViewProps) {
  if (row.type === 'summary') {
    return <Summary row={row} />;
  }

  if (row.type === 'phase') {
    return <Phase row={row} />;
  }

  if (row.type === 'section') {
    return <Section row={row} />;
  }

  if (row.type === 'custom') {
    return <Custom row={row} />;
  }

  if (row.type === 'exercise') {
    return <Exercise row={row} renderers={renderers} />;
  }

  if (row.type === 'pyramid') {
    return <PyramidRow row={row} />;
  }

  if (row.type === 'circuit') {
    return <CircuitRow row={row} />;
  }

  if (row.type === 'move') {
    return <MoveRow row={row} />;
  }

  if (row.type === 'run') {
    return <Run row={row} />;
  }

  if (row.type === 'duration') {
    return <Duration row={row} />;
  }

  if (row.type === 'split') {
    return <SplitRow row={row} depth={'depth' in row ? row.depth ?? 1 : 1} />;
  }

  if (row.type === 'text') {
    return <Text row={row} />;
  }

  const fallbackRow = 'id' in row ? row : compactRowFromParsedContent(row as Content);

  if (fallbackRow.type === 'unknown') {
    return <Unknown row={fallbackRow} />;
  }

  if (fallbackRow.type === 'text') {
    return <Text row={fallbackRow} />;
  }

  return <Unknown row={{ type: 'unknown', raw: `Unsupported row type: ${fallbackRow.type}` }} />;
}
