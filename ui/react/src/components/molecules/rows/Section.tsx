import { normalizeRow } from './types';

export function Section({ row }: { row: Parameters<typeof normalizeRow<'section'>>[0] }) {
  const section = normalizeRow(row);

  return (
    <div className="flex items-center gap-2 pt-3">
      <span className="h-5 w-1 rounded bg-orange-500" aria-hidden />
      <div className="text-lg font-bold uppercase tracking-wide text-slate-100">{section.name}</div>
    </div>
  );
}