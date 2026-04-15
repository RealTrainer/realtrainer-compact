import { NumericStepper } from '../atoms/NumericStepper';
import { DurationStepper } from '../atoms/DurationStepper';
import { InlineOperator } from '../atoms/InlineOperator';
import type { DurationBlock as ParsedDurationBlock, Exercise as ParsedExercise } from '@parser/types';

interface ActiveDurationEditControlsProps {
  entity: ParsedExercise | ParsedDurationBlock;
  onChange: (next: ParsedExercise | ParsedDurationBlock) => void;
  onMarkDone?: () => void;
}

export function ActiveDurationEditControls({
  entity,
  onChange,
  onMarkDone,
}: ActiveDurationEditControlsProps) {
  const isExercise = entity.type === 'exercise';
  const isBilateral = isExercise && typeof entity.repsRight === 'number' && entity.repsRight > 0;

  const sets = isExercise ? (entity.sets ?? 1) : 1;

  const leftSeconds = (() => {
    if (isExercise) {
      const value = typeof entity.reps === 'number' ? entity.reps : 0;
      if (entity.unit === 'min') return Math.round(value * 60);
      return Math.round(value);
    }

    const value = entity.duration?.value ?? 0;
    const unit = entity.duration?.unit;
    return unit === 'min' ? Math.round(value * 60) : Math.round(value);
  })();

  const rightSeconds = isExercise
    ? (() => {
      const value = typeof entity.repsRight === 'number' ? entity.repsRight : (typeof entity.reps === 'number' ? entity.reps : 0);
      if (entity.unit === 'min') return Math.round(value * 60);
      return Math.round(value);
    })()
    : leftSeconds;

  const durationPrecision: 'min' | 'sec' = (isExercise ? entity.unit : entity.duration?.unit) === 'min' ? 'min' : 'sec';
  const durationMinuteControlsMode: 'always' | 'never' = leftSeconds >= 60 || durationPrecision === 'min' ? 'always' : 'never';

  const mapSecondsToDurationValues = (seconds: number, preferMin: boolean) => {
    if (preferMin && seconds % 60 === 0) {
      return { value: seconds / 60, unit: 'min' as const };
    }
    return { value: seconds, unit: 's' as const };
  };

  const updateExerciseDurations = (next: { sets?: number; leftSeconds?: number; rightSeconds?: number }) => {
    if (!isExercise) return;
    const nextSets = next.sets ?? (entity.sets ?? 1);
    const nextLeftSeconds = next.leftSeconds ?? leftSeconds;
    const nextRightSeconds = next.rightSeconds ?? rightSeconds;
    const preferMin = entity.unit === 'min';
    const left = mapSecondsToDurationValues(nextLeftSeconds, preferMin);
    const right = mapSecondsToDurationValues(nextRightSeconds, preferMin);

    onChange({
      ...entity,
      sets: nextSets,
      reps: left.value,
      repsRight: isBilateral ? right.value : entity.repsRight,
      unit: left.unit,
    });
  };

  const updateDurationBlock = (nextLeftSeconds: number) => {
    if (isExercise) return;
    const preferMin = entity.duration?.unit === 'min';
    const nextDuration = mapSecondsToDurationValues(nextLeftSeconds, preferMin);
    onChange({
      ...entity,
      duration: {
        value: nextDuration.value,
        unit: nextDuration.unit,
      },
    });
  };

  return (
    <div className="flex items-center justify-center gap-3 py-2 flex-wrap">
      {isExercise && (
        <>
          <NumericStepper
            value={sets}
            onChange={(value) => updateExerciseDurations({ sets: value })}
            label="Sarjat"
            min={1}
            max={20}
          />
          <InlineOperator symbol="×" />
        </>
      )}
      <DurationStepper
        value={leftSeconds}
        onChange={(value) => {
          if (isExercise) {
            updateExerciseDurations({ leftSeconds: value });
            return;
          }
          updateDurationBlock(value);
        }}
        label={isBilateral ? 'Vasen' : 'Kesto'}
        min={1}
        max={7200}
        precision={durationPrecision}
        minuteControlsMode={durationMinuteControlsMode}
        minuteStepMinutes={1}
        secondStepSeconds={1}
        showSecondControlsWithMinutes
      />
      {isBilateral && (
        <>
          <InlineOperator symbol="+" />
          <DurationStepper
            value={rightSeconds}
            onChange={(value) => updateExerciseDurations({ rightSeconds: value })}
            label="Oikea"
            min={1}
            max={7200}
            precision={durationPrecision}
            minuteControlsMode={durationMinuteControlsMode}
            minuteStepMinutes={1}
            secondStepSeconds={1}
            showSecondControlsWithMinutes
          />
        </>
      )}
      {onMarkDone && (
        <button
          onClick={onMarkDone}
          className="flex items-center justify-center gap-1 px-4 py-2 bg-slate-800 text-slate-100 font-medium rounded-lg hover:bg-slate-700 transition-colors ml-2 border border-slate-700"
        >
          <span className="text-sm">✓</span>
          Tehty
        </button>
      )}
    </div>
  );
}
