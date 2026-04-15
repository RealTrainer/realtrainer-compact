interface NumericStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  suffix?: string;
  size?: 'sm' | 'md';
  tone?: 'default' | 'overlay';
  disabled?: boolean;
  computeNextValue?: (current: number, direction: 'increase' | 'decrease') => number;
}

export function NumericStepper({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  label,
  suffix,
  size = 'md',
  tone = 'default',
  disabled = false,
  computeNextValue,
}: NumericStepperProps) {
  const handleDecrease = () => {
    const rawNext = computeNextValue ? computeNextValue(value, 'decrease') : value - step;
    const next = Math.max(min, rawNext);
    if (next !== value) {
      onChange(next);
    }
  };

  const handleIncrease = () => {
    const rawNext = computeNextValue ? computeNextValue(value, 'increase') : value + step;
    const next = Math.min(max, rawNext);
    if (next !== value) {
      onChange(next);
    }
  };

  const buttonSize = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';
  const minWidth = size === 'sm' ? 'min-w-[2.5rem]' : 'min-w-[3rem]';
  const isOverlayTone = tone === 'overlay';

  const labelClass = isOverlayTone ? 'text-white/80' : 'text-slate-400';
  const buttonClass = isOverlayTone
    ? 'bg-white/90 hover:bg-white text-black'
    : 'bg-slate-800 hover:bg-slate-700 text-slate-100';
  const valueClass = isOverlayTone ? 'text-white' : 'text-slate-100';

  return (
    <div className="flex flex-col items-center gap-1">
      {label && (
        <span className={`text-xs ${labelClass}`}>{label}</span>
      )}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={disabled || value <= min}
          className={`${buttonSize} flex items-center justify-center rounded-full ${buttonClass} disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95`}
        >
          <span className={iconSize}>-</span>
        </button>

        <div className={`${minWidth} ${textSize} text-center font-semibold ${valueClass} tabular-nums`}>
          {value}{suffix}
        </div>

        <button
          type="button"
          onClick={handleIncrease}
          disabled={disabled || value >= max}
          className={`${buttonSize} flex items-center justify-center rounded-full ${buttonClass} disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95`}
        >
          <span className={iconSize}>+</span>
        </button>
      </div>
    </div>
  );
}
