import { statFromRunRow } from '../../../lib/formatters';
import { StatChip } from '../../atoms/StatChip';
import { normalizeRow } from './types';

export function Run({ row }: { row: Parameters<typeof normalizeRow<'run'>>[0] }) {
  const run = normalizeRow(row);

  return (
    <div className="rt-row flex items-center justify-between gap-3 p-3">
      <div className="text-lg font-semibold text-slate-100">Run</div>
      <StatChip stat={statFromRunRow(run)} />
    </div>
  );
}