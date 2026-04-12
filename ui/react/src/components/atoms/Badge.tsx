import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  tone?: 'default' | 'accent' | 'good' | 'warn' | 'danger';
}

export function Badge({ children, tone = 'default' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
        tone === 'accent' && 'rt-emoji-font',
        tone === 'default' && 'bg-slate-700/70 text-slate-200',
        tone === 'accent' && 'bg-orange-500/20 text-orange-300',
        tone === 'good' && 'bg-emerald-500/20 text-emerald-300',
        tone === 'warn' && 'bg-amber-500/20 text-amber-300',
        tone === 'danger' && 'bg-rose-500/20 text-rose-300',
      )}
    >
      {children}
    </span>
  );
}
