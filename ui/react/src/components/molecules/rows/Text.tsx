import { normalizeRow } from './types';

const LIFE_LABELS = new Set([
  'Drinking',
  'Food',
  'Expense',
  'Reminder',
  'Feeling',
  'Pain',
  'Sleep',
  'Health',
  'Vitals',
  'Weight',
  'BodyFat',
  'Waist',
  'Hip',
  'Measurement',
]);

function highlightNumericTokens(text: string) {
  const parts = text.split(/(\d+(?:[.,]\d+)?(?:[a-zA-Z%°]+)?)/g);
  return parts.map((part, index) => {
    if (/^\d/.test(part)) {
      return (
        <span key={`num-${index}`} className="font-semibold text-emerald-300">
          {part}
        </span>
      );
    }
    return <span key={`txt-${index}`}>{part}</span>;
  });
}

export function Text({ row }: { row: Parameters<typeof normalizeRow<'text'>>[0] }) {
  const text = normalizeRow(row);
  const match = text.text.match(/^([A-Za-z]+)\s+(.*)$/);

  if (match && LIFE_LABELS.has(match[1])) {
    const [, label, body] = match;
    return (
      <div className="rt-row -mt-1 px-2 pb-1 text-sm text-slate-200" data-testid="life-text-row">
        <span className="mr-2 font-semibold uppercase tracking-wide text-sky-300">{label}</span>
        <span>{highlightNumericTokens(body)}</span>
      </div>
    );
  }

  return <div className="rt-row -mt-1 px-2 pb-1 text-sm italic text-slate-300">{text.text}</div>;
}