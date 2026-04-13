import { Badge } from '../../atoms/Badge';
import { normalizeRow } from './types';
import { formatSplitDuration } from './utils/formatSplitDuration';
import { formatSplitPace } from './utils/formatSplitPace';

export function SplitRow({ row, depth = 1, keyPrefix }: { row: Parameters<typeof normalizeRow<'split'>>[0]; depth?: number; keyPrefix?: string }) {
  const split = normalizeRow(row);
  const pace = formatSplitPace(split.pace);
  const duration = formatSplitDuration(split.duration);
  const hasStructured = !!split.distance || !!split.duration || !!split.pace || !!split.hr || !!split.note;

  if (!hasStructured && split.text) {
    return (
      <div key={keyPrefix ?? split.id} className="rt-row border-l-2 border-blue-500/60 p-3" style={{ marginLeft: `${(split.depth ?? depth) * 0.75}rem` }}>
        <Badge>Split</Badge>
        <div className="mt-2 text-sm text-blue-200">{split.text}</div>
      </div>
    );
  }

  return (
    <div key={keyPrefix ?? split.id} className="py-0.5 text-xs sm:text-sm" style={{ marginLeft: `${depth * 0.75}rem` }}>
      <div className="flex items-center gap-2 text-slate-300">
        {split.distance?.value && <span>{split.distance.value}{split.distance.unit ?? ''}</span>}
        {pace && <span className="font-mono text-slate-100">{pace}</span>}
        {duration && <span className="font-mono text-slate-100">{duration}</span>}
        {typeof split.hr === 'number' && <span className="text-rose-300">{split.hr}bpm</span>}
        {split.note && <span className="italic text-slate-400">{split.note}</span>}
      </div>
      {Array.isArray(split.splits) && split.splits.length > 0 && (
        <div className="mt-1 border-l border-slate-600/50">
          {split.splits.map((nested, index) => (
            <SplitRow
              row={nested}
              depth={depth + 1}
              keyPrefix={`${keyPrefix ?? split.id}-nested-${index}`}
              key={`${keyPrefix ?? split.id}-nested-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}