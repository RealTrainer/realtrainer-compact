import { statFromDurationRow } from '../../../lib/formatters';
import { StatChip } from '../../atoms/StatChip';
import { normalizeRow } from './types';

export function Duration({ row }: { row: Parameters<typeof normalizeRow<'duration'>>[0] }) {
  const duration = normalizeRow(row);
  const durationValue = `${duration.value}${duration.unit}`;
  const durationDescription = duration.description?.trim();

  return (
    <div className="rt-row flex items-center gap-3 py-1">
      <span className="rounded-md bg-[rgba(255,107,53,0.12)] px-3 py-1 font-mono text-base text-[rgb(255,107,53)]" data-testid="duration-badge">{durationValue}</span>
      {durationDescription ? (
        <span className="text-base font-medium text-slate-100" data-testid="duration-description">{durationDescription}</span>
      ) : (
        <StatChip stat={statFromDurationRow(duration)} />
      )}
    </div>
  );
}