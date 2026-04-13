import { normalizeRow } from './types';

export function Summary({ row }: { row: Parameters<typeof normalizeRow<'summary'>>[0] }) {
  const summary = normalizeRow(row);
  return <p className="rt-row p-3 text-sm text-slate-300">{summary.text}</p>;
}