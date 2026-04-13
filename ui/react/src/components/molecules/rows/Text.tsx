import { normalizeRow } from './types';

export function Text({ row }: { row: Parameters<typeof normalizeRow<'text'>>[0] }) {
  const text = normalizeRow(row);
  return <div className="rt-row -mt-1 px-2 pb-1 text-sm italic text-slate-300">{text.text}</div>;
}