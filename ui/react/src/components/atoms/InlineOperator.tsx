interface InlineOperatorProps {
  symbol: '×' | '+';
}

export function InlineOperator({ symbol }: InlineOperatorProps) {
  return <span className="text-slate-400 text-lg">{symbol}</span>;
}
