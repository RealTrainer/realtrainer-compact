import { normalizeRow } from './types';

export function PyramidRow({ row }: { row: Parameters<typeof normalizeRow<'pyramid'>>[0] }) {
  const pyramid = normalizeRow(row);
  const visibleSets = pyramid.sets.filter((set) => set.reps > 0);

  return (
    <div className="rt-row flex flex-col gap-1.5 py-1.5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium text-slate-100" data-testid="pyramid-name">
            {pyramid.name}
          </span>
          <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">pyramid</span>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5 font-mono text-xs sm:text-sm" data-testid="pyramid-sets">
          {visibleSets.map((set, index) => (
            <span key={`${pyramid.id}-set-${index}`} className="py-0.5">
              <span className="text-slate-300">{set.reps}x</span>
              {typeof set.weightKg === 'number' && set.weightKg > 0 && <span className="text-[rgb(255,107,53)]">{set.weightKg}kg</span>}
            </span>
          ))}
        </div>
      </div>
      {pyramid.note && <div className="text-xs text-slate-400">{pyramid.note}</div>}
    </div>
  );
}