import type { CompactCircuitItem } from '../../../lib/types';
import { normalizeRow } from './types';

function formatRecovery(recovery: CompactCircuitItem['recovery']): string | null {
  if (!recovery) return null;
  if (recovery.text) return recovery.text;
  if (recovery.value != null) {
    const maxPart = recovery.max != null ? `-${recovery.max}` : '';
    return `${recovery.value}${maxPart}${recovery.unit ?? ''}`;
  }
  return null;
}

function formatSpec(item: CompactCircuitItem): string {
  const parts: string[] = [];

  if (item.sets != null && item.sets > 1) {
    parts.push(`${item.sets}x`);
  }

  if (item.reps != null) {
    if (item.repsRight != null) {
      parts.push(`${item.reps}+${item.repsRight}`);
    } else {
      parts.push(`${item.reps}`);
    }
    if (item.unit) {
      parts.push(item.unit);
    }
  }

  if (item.weightKg != null) {
    parts.push(`@${item.weightKg}kg`);
  }

  const recovery = formatRecovery(item.recovery);
  if (recovery) {
    parts.push(`/${recovery}`);
  }

  return parts.join('');
}

export function CircuitRow({ row }: { row: Parameters<typeof normalizeRow<'circuit'>>[0] }) {
  const circuit = normalizeRow(row);
  const variantLabel = circuit.variant === 'superset' ? 'superset' : 'circuit';
  const roundRestText = formatRecovery(circuit.roundRest);

  return (
    <div className="rt-row flex flex-col gap-1.5 py-1.5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium text-slate-100" data-testid="circuit-rounds">
            {circuit.rounds}x
          </span>
          <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">
            {variantLabel}
          </span>
          {roundRestText && (
            <span className="text-xs text-slate-400">/{roundRestText}</span>
          )}
        </div>
      </div>

      <div className="ml-4 flex flex-col gap-1 border-l-2 border-slate-600 pl-3">
        {circuit.exercises.map((item, index) => {
          const spec = formatSpec(item);
          return (
            <div
              key={`${circuit.id}-item-${index}`}
              className="flex items-center justify-between gap-2"
              data-testid="circuit-item"
            >
              <span className="text-sm text-slate-200">{item.name}</span>
              {spec && (
                <span className="font-mono text-xs text-slate-400">{spec}</span>
              )}
            </div>
          );
        })}
      </div>

      {circuit.note && <div className="text-xs text-slate-400">{circuit.note}</div>}
    </div>
  );
}
