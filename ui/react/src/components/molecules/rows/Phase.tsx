import { normalizeRow } from './types';

export function Phase({ row }: { row: Parameters<typeof normalizeRow<'phase'>>[0] }) {
  const phase = normalizeRow(row);
  const marker = phase.number === null ? 'Phase' : `Phase${phase.number}`;

  return (
    <div className="space-y-1 pt-4">
      <div className="text-xs uppercase tracking-[0.2em] text-orange-400">{marker}</div>
      <div className="text-xl font-bold uppercase tracking-wide text-slate-100">{phase.name}</div>
      {phase.details && <div className="text-sm text-slate-400">{phase.details}</div>}
    </div>
  );
}