import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import type { CompactStatValue } from '../../lib/types';

export interface StatChipProps extends HTMLAttributes<HTMLSpanElement> {
  stat: CompactStatValue;
}

function toneClass(tone: CompactStatValue['parts'][number]['tone']): string {
  if (tone === 'weight') {
    return 'text-[rgb(255,107,53)]';
  }

  if (tone === 'muted') {
    return 'text-slate-400';
  }

  return 'text-slate-200';
}

export function StatChip({ stat, className, ...props }: StatChipProps) {
  const label = stat.ariaLabel ?? stat.parts.map((part) => part.text).join('');

  return (
    <span {...props} className={clsx('inline-flex flex-wrap items-center justify-end font-mono text-sm', className)} aria-label={label}>
      {stat.parts.map((part, index) => (
        <span key={`${part.kind}-${index}-${part.text}`} className={toneClass(part.tone)}>
          {part.text}
        </span>
      ))}
    </span>
  );
}
