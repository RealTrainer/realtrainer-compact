interface DurationStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  precision?: 'min' | 'sec';
  minuteControlsMode?: 'auto' | 'always' | 'never';
  minuteStepMinutes?: number;
  secondStepSeconds?: number;
  showSecondControlsWithMinutes?: boolean;
}

export function formatDurationValue(seconds: number): string {
  if (seconds >= 60) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}min ${secs}s` : `${mins}min`;
  }
  return `${seconds}s`;
}

export function DurationStepper({
  value,
  onChange,
  min = 0,
  max = 7200,
  step = 5,
  label,
  size = 'md',
  disabled = false,
  precision = 'sec',
  minuteControlsMode = 'auto',
  minuteStepMinutes = 1,
  secondStepSeconds = 1,
  showSecondControlsWithMinutes = false,
}: DurationStepperProps) {
  const updateBy = (delta: number) => {
    const next = value + delta;
    if (next < min || next > max) {
      return;
    }
    onChange(next);
  };

  const buttonSize = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';
  const minWidth = size === 'sm' ? 'min-w-[3.5rem]' : 'min-w-[5.5rem]';

  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  const showMinuteControls =
    precision === 'min'
      ? true
      : minuteControlsMode === 'always'
        ? true
        : minuteControlsMode === 'never'
          ? false
          : minutes > 0;

  const showMinuteValue =
    precision === 'min'
      ? true
      : minuteControlsMode === 'always'
        ? true
        : minuteControlsMode === 'never'
          ? false
          : minutes > 0;

  const minuteValueText = `${minutes}min`;
  const secondValueText = showMinuteValue
    ? `${String(seconds).padStart(2, '0')}s`
    : (minutes > 0
      ? `${minutes}min ${String(seconds).padStart(2, '0')}s`
      : `${seconds}s`);

  const showSecondButtons = precision === 'sec' && (!showMinuteControls || showSecondControlsWithMinutes);

  return (
    <div className="flex flex-col items-center gap-1">
      {label && (
        <span className="text-xs text-slate-400">{label}</span>
      )}
      <div className="flex items-center gap-1">
        {showMinuteControls && (
          <button
            type="button"
            aria-label={label ? `decrease-${label}` : 'decrease-duration'}
            onClick={() => updateBy(precision === 'min' || showSecondControlsWithMinutes ? -(60 * minuteStepMinutes) : -step)}
            disabled={disabled || value <= min}
            className={`${buttonSize} flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95`}
          >
            <span className={iconSize}>-</span>
          </button>
        )}

        {precision === 'min' ? (
          <div className={`${minWidth} ${textSize} text-center font-semibold text-slate-100 tabular-nums`}>
            {minuteValueText}
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {showMinuteValue && (
              <div className={`${minWidth} ${textSize} text-center font-semibold text-slate-100 tabular-nums`}>
                {minuteValueText}
              </div>
            )}
            {showSecondButtons && (
              <button
                type="button"
                aria-label={label ? `decrease-seconds-${label}` : 'decrease-seconds'}
                onClick={() => updateBy(-secondStepSeconds)}
                disabled={disabled || value <= min}
                className={`${buttonSize} flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95`}
              >
                <span className={iconSize}>-</span>
              </button>
            )}
            <div className={`${minWidth} ${textSize} text-center font-semibold text-slate-100 tabular-nums`}>
              {secondValueText}
            </div>
            {showSecondButtons && (
              <button
                type="button"
                aria-label={label ? `increase-seconds-${label}` : 'increase-seconds'}
                onClick={() => updateBy(secondStepSeconds)}
                disabled={disabled || value >= max}
                className={`${buttonSize} flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95`}
              >
                <span className={iconSize}>+</span>
              </button>
            )}
          </div>
        )}

        {showMinuteControls && (
          <button
            type="button"
            aria-label={label ? `increase-${label}` : 'increase-duration'}
            onClick={() => updateBy(precision === 'min' || showSecondControlsWithMinutes ? 60 * minuteStepMinutes : step)}
            disabled={disabled || value >= max}
            className={`${buttonSize} flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95`}
          >
            <span className={iconSize}>+</span>
          </button>
        )}
      </div>
    </div>
  );
}
