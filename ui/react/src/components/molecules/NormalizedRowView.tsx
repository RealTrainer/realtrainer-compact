import type { NormalizedEnduranceRow, NormalizedRow, NormalizedStrengthRow } from '../../lib/normalized-types';
import { Badge } from '../atoms/Badge';
import { CompactRowView } from './CompactRowView';

function formatStrengthLoad(row: NormalizedStrengthRow): string | null {
  const renderLoad = (load: NormalizedStrengthRow['scheme'] extends infer _T ? any : never): string | null => {
    if (!load) return null;
    if ('percent' in load) {
      return load.percent === load.percentMax ? `${load.percent}%1RM` : `${load.percent}-${load.percentMax}%1RM`;
    }
    if ('value' in load) {
      const valueMax = typeof load.valueMax === 'number' ? load.valueMax : load.value;
      const range = load.value !== valueMax ? `-${valueMax}` : '';
      const prefix = load.count > 1 ? `${load.count}x` : '';
      return `${prefix}${load.value}${range}${load.unit}`;
    }
    return null;
  };

  if (row.scheme.kind === 'uniform') {
    return renderLoad(row.scheme.spec.load);
  }

  return null;
}

function formatRepValue(reps: unknown, repsMax?: number | null, repsRight?: number | null): string | null {
  if (reps == null) return null;
  if (typeof reps === 'object' && 'rm' in (reps as { rm?: unknown }) && typeof (reps as { rm?: unknown }).rm === 'number') {
    return `${(reps as { rm: number }).rm}RM`;
  }
  if (reps === 'max') return 'max';
  if (typeof repsRight === 'number' && typeof reps === 'number') return `${reps}+${repsRight}`;
  if (typeof reps === 'number' && typeof repsMax === 'number' && repsMax !== reps) return `${reps}-${repsMax}`;
  return String(reps);
}

function formatRecovery(recovery: { value?: number | null; max?: number | null; valueMax?: number | null; unit?: string | null; text?: string | null } | null | undefined): string | null {
  if (!recovery) return null;
  if (typeof recovery.text === 'string' && recovery.text.trim().length > 0 && recovery.value == null) {
    return recovery.text.trim();
  }
  if (typeof recovery.value !== 'number') return null;
  const max = typeof recovery.max === 'number' ? recovery.max : typeof recovery.valueMax === 'number' ? recovery.valueMax : null;
  const unit = recovery.unit === 'sec' ? 's' : recovery.unit ?? '';
  return max && max !== recovery.value ? `${recovery.value}-${max}${unit}` : `${recovery.value}${unit}`;
}

function formatStrengthScheme(row: NormalizedStrengthRow): string {
  if (row.scheme.kind === 'uniform') {
    const { spec } = row.scheme;
    const reps = formatRepValue(spec.reps, spec.repsMax, spec.repsRight);
    const load = formatStrengthLoad(row);
    const recovery = formatRecovery(spec.recovery);
    const distance = spec.distance ? `${spec.distance.value}${spec.distance.unit}` : null;
    const duration = spec.duration ? `${spec.duration.value}${spec.duration.unit}` : null;

    const base = (() => {
      if (typeof spec.rounds === 'number' && typeof spec.sets === 'number' && reps) return `${spec.rounds}x${spec.sets}x${reps}`;
      if (typeof spec.sets === 'number' && reps) return `${spec.sets}x${reps}`;
      if (typeof spec.sets === 'number' && distance) return `${spec.sets}x${distance}`;
      if (typeof spec.sets === 'number' && duration) return `${spec.sets}x${duration}`;
      return reps ?? distance ?? duration ?? 'Strength';
    })();

    return [base, load ? `@ ${load}` : null, recovery ? `/ ${recovery}` : null].filter(Boolean).join(' ');
  }

  return row.scheme.sets.map((set) => {
    const reps = formatRepValue(set.reps, null, set.repsRight ?? null) ?? '?';
    const load = set.load && 'percent' in set.load
      ? `${set.load.percent}%1RM`
      : set.load && 'value' in set.load
        ? `${set.load.count > 1 ? `${set.load.count}x` : ''}${set.load.value}${set.load.unit}`
        : null;
    const atom = load ? `${reps}@${load}` : reps;
    return typeof set.repeat === 'number' && set.repeat > 1 ? `${set.repeat}x${atom}` : atom;
  }).join(', ');
}

function sportLabel(row: NormalizedEnduranceRow): string {
  if (row.sport === 'other') {
    return row.discipline ? `Endurance ${row.discipline}` : 'Endurance';
  }
  const base = row.sport.charAt(0).toUpperCase() + row.sport.slice(1);
  return row.discipline ? `${base} ${row.discipline}` : base;
}

function formatEnduranceScheme(row: NormalizedEnduranceRow): string {
  const distance = row.distance ? `${row.distance.value}${row.distance.unit}` : null;
  const duration = row.duration ? `${row.duration.value}${row.duration.unit === 'sec' ? 's' : row.duration.unit}` : null;
  const recovery = formatRecovery(row.recovery);
  const intensity = row.intensity && 'text' in row.intensity && typeof row.intensity.text === 'string'
    ? row.intensity.text
    : row.intensity && 'min' in row.intensity && 'max' in row.intensity
      ? row.intensity.min === row.intensity.max ? `${row.intensity.min}%` : `${row.intensity.min}-${row.intensity.max}%`
      : null;

  const main = row.structure === 'interval'
    ? `${row.sets > 1 ? `${row.sets}x` : ''}${row.repeatCount}x${distance ?? duration ?? '?'}`
    : [duration, distance].filter(Boolean).join(' ');

  return [main, recovery ? `/ ${recovery}` : null, intensity ? `| ${intensity}` : null].filter(Boolean).join(' ');
}

function cardTone(sourceType: string): 'accent' | 'warn' | 'good' {
  if (sourceType === 'pyramid' || sourceType === 'interval') return 'warn';
  if (sourceType === 'move') return 'good';
  return 'accent';
}

export interface NormalizedRowViewProps {
  row: NormalizedRow;
}

export function NormalizedRowView({ row }: NormalizedRowViewProps) {
  if (row.type === 'legacy') {
    return <CompactRowView row={row.source} />;
  }

  if (row.type === 'strength') {
    return (
      <section className="rt-row rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={cardTone(row.sourceType)}>Lift</Badge>
          <h3 className="text-sm font-semibold text-slate-100">{row.name}</h3>
          {row.sourceType !== 'exercise' && <Badge tone="warn">from {row.sourceType}</Badge>}
        </div>
        <p className="mt-2 text-sm font-medium text-slate-200">{formatStrengthScheme(row)}</p>
        {(row.note || row.description) && (
          <p className="mt-1 text-sm text-slate-400">{row.note ?? row.description}</p>
        )}
      </section>
    );
  }

  return (
    <section className="rt-row rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={cardTone(row.sourceType)}>{row.structure === 'interval' ? 'Endurance+' : 'Endurance'}</Badge>
        <h3 className="text-sm font-semibold text-slate-100">{sportLabel(row)}</h3>
        {row.sourceType !== 'move' && <Badge tone="warn">from {row.sourceType}</Badge>}
      </div>
      <p className="mt-2 text-sm font-medium text-slate-200">{formatEnduranceScheme(row)}</p>
      {(row.note || row.description) && (
        <p className="mt-1 text-sm text-slate-400">{row.note ?? row.description}</p>
      )}
    </section>
  );
}