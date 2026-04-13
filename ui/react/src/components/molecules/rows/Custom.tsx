import { normalizeRow } from './types';
import { formatCustomValue } from './utils/formatCustomValue';

export function Custom({ row }: { row: Parameters<typeof normalizeRow<'custom'>>[0] }) {
  const custom = normalizeRow(row);
  const valueText = formatCustomValue(custom.value);
  const rangeText = typeof custom.valueMax === 'number'
    ? `${valueText}-${formatCustomValue(custom.valueMax)}`
    : valueText;

  return (
    <div className="border-l-2 border-slate-600 py-1 pl-3 text-sm" data-testid="custom-row">
      <span className="text-slate-400">{custom.name}: </span>
      <span className="font-mono text-slate-200" data-testid="custom-value">
        ~{rangeText}{custom.unit ?? ''}
      </span>
    </div>
  );
}