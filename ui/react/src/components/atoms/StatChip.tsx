interface StatChipProps {
  value: string;
}

export function StatChip({ value }: StatChipProps) {
  return <span className="font-mono text-sm text-[rgb(255,107,53)]">{value}</span>;
}
