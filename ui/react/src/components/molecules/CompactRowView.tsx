import clsx from 'clsx';
import { formatDuration, formatExerciseScheme, formatRun } from '../../lib/formatters';
import type { CompactRow } from '../../lib/types';
import { Badge } from '../atoms/Badge';
import { StatChip } from '../atoms/StatChip';

interface CompactRowViewProps {
  row: CompactRow;
}

function formatCustomValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function formatMoveDuration(duration: { value?: number | null; unit?: string | null } | null | undefined): string | null {
  if (!duration || typeof duration.value !== 'number') {
    return null;
  }

  if (duration.unit === 'min') {
    const totalSeconds = Math.round(duration.value * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (seconds === 0) {
      return `${minutes}min`;
    }
    return `${minutes}min ${seconds}s`;
  }

  return `${duration.value}${duration.unit ?? ''}`;
}

function deriveMovePace(
  duration: { value?: number | null; unit?: string | null } | null | undefined,
  distance: { value?: number | null; unit?: string | null } | null | undefined,
): string | null {
  if (!duration || !distance) {
    return null;
  }

  if (duration.unit !== 'min' || typeof duration.value !== 'number' || typeof distance.value !== 'number' || !distance.unit) {
    return null;
  }

  const distanceMeters = distance.unit === 'km'
    ? distance.value * 1000
    : distance.unit === 'm'
      ? distance.value
      : null;

  if (!distanceMeters || distanceMeters <= 0) {
    return null;
  }

  const totalSeconds = duration.value * 60;
  const pacePer100mSeconds = totalSeconds / (distanceMeters / 100);
  let minutes = Math.floor(pacePer100mSeconds / 60);
  let seconds = Math.round(pacePer100mSeconds % 60);
  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }
  return `@${minutes}:${String(seconds).padStart(2, '0')}/100m`;
}

function formatSplitPace(pace: { minutes: number; seconds: number; perDistance?: { value?: number | null; unit?: string | null } } | null | undefined): string | null {
  if (!pace) {
    return null;
  }
  const sec = String(pace.seconds ?? 0).padStart(2, '0');
  const distance = pace.perDistance?.value && pace.perDistance?.unit
    ? `/${pace.perDistance.value}${pace.perDistance.unit}`
    : '';
  return `${pace.minutes}'${sec}"${distance}`;
}

function renderSplitRow(split: Extract<CompactRow, { type: 'split' }>, depth = 1, keyPrefix?: string) {
  const pace = formatSplitPace(split.pace);
  const hasStructured = !!split.distance || !!split.duration || !!split.pace || !!split.hr || !!split.note;

  if (!hasStructured && split.text) {
    return (
      <div key={keyPrefix ?? split.id} className="rt-row border-l-2 border-blue-500/60 p-3" style={{ marginLeft: `${(split.depth ?? depth) * 0.75}rem` }}>
        <Badge>Split</Badge>
        <p className="mt-2 text-sm text-blue-200">{split.text}</p>
      </div>
    );
  }

  return (
    <div key={keyPrefix ?? split.id} className="py-0.5 text-xs sm:text-sm" style={{ marginLeft: `${depth * 0.75}rem` }}>
      <div className="flex items-center gap-2 text-slate-300">
        {split.distance?.value && <span>{split.distance.value}{split.distance.unit ?? ''}</span>}
        {pace && <span className="font-mono text-slate-100">{pace}</span>}
        {split.duration?.value && <span>{split.duration.value}{split.duration.unit ?? ''}</span>}
        {typeof split.hr === 'number' && <span className="text-rose-300">{split.hr}bpm</span>}
        {split.note && <span className="italic text-slate-400">{split.note}</span>}
      </div>
      {Array.isArray(split.splits) && split.splits.length > 0 && (
        <div className="mt-1 border-l border-slate-600/50">
          {split.splits.map((nested, index) => renderSplitRow(nested, depth + 1, `${keyPrefix ?? split.id}-nested-${index}`))}
        </div>
      )}
    </div>
  );
}

export function CompactRowView({ row }: CompactRowViewProps) {
  if (row.type === 'summary') {
    return <p className="rt-row p-3 text-sm text-slate-300">{row.text}</p>;
  }

  if (row.type === 'phase') {
    const marker = row.number === null ? 'Phase' : `Phase${row.number}`;
    return (
      <div className="space-y-1 pt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-400">{marker}</p>
        <h3 className="text-xl font-bold uppercase tracking-wide text-slate-100">{row.name}</h3>
        {row.details && <p className="text-sm text-slate-400">{row.details}</p>}
      </div>
    );
  }

  if (row.type === 'section') {
    return (
      <div className="flex items-center gap-2 pt-3">
        <span className="h-5 w-1 rounded bg-orange-500" aria-hidden />
        <h4 className="text-lg font-bold uppercase tracking-wide text-slate-100">{row.name}</h4>
      </div>
    );
  }

  if (row.type === 'custom') {
    const valueText = formatCustomValue(row.value);
    return (
      <div className="border-l-2 border-slate-600 py-1 pl-3 text-sm" data-testid="custom-row">
        <span className="text-slate-400">{row.name}: </span>
        <span className="font-mono text-slate-200" data-testid="custom-value">
          ~{valueText}{row.unit ?? ''}
        </span>
      </div>
    );
  }

  if (row.type === 'exercise') {
    return (
      <div className="rt-row flex items-center justify-between gap-3 p-3">
        <div>
          <p className="text-lg font-semibold text-slate-100">{row.name}</p>
          {row.note && <p className="text-sm text-slate-400">{row.note}</p>}
        </div>
        <StatChip value={formatExerciseScheme(row)} />
      </div>
    );
  }

  if (row.type === 'pyramid') {
    return (
      <div className="rt-row flex flex-col gap-2 p-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-100 sm:text-base" data-testid="pyramid-name">
              {row.name}
            </span>
            <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">pyramid</span>
          </div>
          <div className="flex flex-wrap gap-1.5 font-mono text-xs sm:text-sm" data-testid="pyramid-sets">
            {row.sets.map((set, index) => (
              <span key={`${row.id}-set-${index}`} className="rounded bg-slate-700/70 px-1.5 py-0.5">
                <span className="text-slate-400">{set.reps}x</span>
                {typeof set.weightKg === 'number' && <span className="text-orange-300">{set.weightKg}kg</span>}
              </span>
            ))}
          </div>
        </div>
        {row.note && <p className="text-xs text-slate-400">{row.note}</p>}
      </div>
    );
  }

  if (row.type === 'move') {
    const reps = row.sets && row.count && !(row.sets === 1 && row.count === 1)
      ? `${row.sets}x${row.count}`
      : null;
    const durationText = formatMoveDuration(row.duration);
    const distanceText = row.distance?.value ? `${row.distance.value}${row.distance.unit ?? ''}` : null;
    const paceText = deriveMovePace(row.duration, row.distance);
    const rightParts = [reps, durationText, distanceText, paceText].filter((part): part is string => !!part);

    return (
      <div className="rt-row flex flex-col gap-2 p-3" data-testid="move-row">
        <div className="flex items-start justify-between gap-3">
          <p className="text-lg font-semibold text-slate-100">{row.sport || 'Move'}</p>
          <div className="text-right font-mono text-xs text-slate-300 sm:text-sm">
            {rightParts.length > 0 && (
              <div>
                {rightParts.map((part, index) => (
                  <span key={`${row.id}-part-${index}`} className={part.startsWith('@') ? 'text-orange-300' : ''}>
                    {index > 0 ? ' ' : ''}{part}
                  </span>
                ))}
                {typeof row.steps === 'number' && <span> {row.steps} steps</span>}
              </div>
            )}
          </div>
        </div>
        {(row.note || row.description) && <p className="text-sm text-slate-400">{row.note || row.description}</p>}
        {Array.isArray(row.splits) && row.splits.length > 0 && (
          <div className="mt-1 border-l-2 border-slate-600/70 pl-2" data-testid="move-splits">
            {row.splits.map((split, index) => renderSplitRow(split, 1, `${row.id}-split-${index}`))}
          </div>
        )}
      </div>
    );
  }

  if (row.type === 'run') {
    return (
      <div className="rt-row flex items-center justify-between gap-3 p-3">
        <p className="text-lg font-semibold text-slate-100">Run</p>
        <StatChip value={formatRun(row)} />
      </div>
    );
  }

  if (row.type === 'duration') {
    return (
      <div className="rt-row flex items-center justify-between gap-3 p-3">
        <p className="text-lg font-semibold text-slate-100">Time</p>
        <StatChip value={formatDuration(row)} />
      </div>
    );
  }

  if (row.type === 'split') {
    return renderSplitRow(row, row.depth ?? 1);
  }

  if (row.type === 'text') {
    return <p className="rt-row p-3 text-sm italic text-slate-300">{row.text}</p>;
  }

  return <p className={clsx('rt-row rt-row-unknown p-3 text-sm text-rose-200')}>{row.raw}</p>;
}
