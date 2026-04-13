import { normalizeRow } from './types';
import { deriveMovePace } from './utils/deriveMovePace';
import { formatMoveDuration } from './utils/formatMoveDuration';
import { SplitRow } from './SplitRow';

export function MoveRow({ row }: { row: Parameters<typeof normalizeRow<'move'>>[0] }) {
  const move = normalizeRow(row);
  const reps = move.sets && move.count && !(move.sets === 1 && move.count === 1)
    ? `${move.sets}x${move.count}`
    : null;
  const durationText = formatMoveDuration(move.duration);
  const distanceText = move.distance?.value ? `${move.distance.value}${move.distance.unit ?? ''}` : null;
  const paceText = deriveMovePace(move.duration, move.distance);
  const rightParts = [reps, durationText, distanceText, paceText].filter((part): part is string => !!part);

  return (
    <div className="rt-row flex flex-col gap-1.5 py-1.5" data-testid="move-row">
      <div className="flex items-start justify-between gap-3">
        <div className="text-lg font-semibold text-slate-100">{move.sport || 'Move'}</div>
        <div className="text-right font-mono text-xs text-slate-300 sm:text-sm">
          {rightParts.length > 0 && (
            <div>
              {rightParts.map((part, index) => (
                <span key={`${move.id}-part-${index}`} className={part.startsWith('@') ? 'text-[rgb(255,107,53)]' : ''}>
                  {index > 0 ? ' ' : ''}{part}
                </span>
              ))}
              {typeof move.steps === 'number' && <span> {move.steps} steps</span>}
            </div>
          )}
        </div>
      </div>
      {(move.note || move.description) && <div className="text-sm text-slate-400">{move.note || move.description}</div>}
      {Array.isArray(move.splits) && move.splits.length > 0 && (
        <div className="mt-1 border-l-2 border-slate-600/70 pl-2" data-testid="move-splits">
          {move.splits.map((split, index) => (
            <SplitRow row={split} depth={1} keyPrefix={`${move.id}-split-${index}`} key={`${move.id}-split-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
}