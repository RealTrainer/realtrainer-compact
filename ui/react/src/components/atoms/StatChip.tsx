interface StatChipProps {
  value: string;
}

export function StatChip({ value }: StatChipProps) {
  return <span className="rounded-md bg-slate-800 px-2 py-1 font-mono text-sm text-orange-300">{value}</span>;
}
