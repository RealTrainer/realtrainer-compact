interface FieldLabelProps {
  children: React.ReactNode;
}

export function FieldLabel({ children }: FieldLabelProps) {
  return <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">{children}</label>;
}
