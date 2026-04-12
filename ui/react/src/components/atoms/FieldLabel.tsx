import type { LabelHTMLAttributes, ReactNode } from 'react';

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export function FieldLabel({ children, className, ...props }: FieldLabelProps) {
  return <label {...props} className={['text-xs font-semibold uppercase tracking-wide text-slate-400', className].filter(Boolean).join(' ')}>{children}</label>;
}
