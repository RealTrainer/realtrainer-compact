import { NumericStepper } from '../atoms/NumericStepper';
import { InlineOperator } from '../atoms/InlineOperator';
import type { Exercise as ParsedExercise, Weight } from '@parser/types';
import { getNextDistanceMetersValue } from '../../lib/stepperRules';
import { getNextWeightValue } from '../../lib/stepperRules';

interface ActiveRepEditControlsProps {
  entity: ParsedExercise;
  onChange: (next: ParsedExercise) => void;
}

export function ActiveRepEditControls({
  entity,
  onChange,
}: ActiveRepEditControlsProps) {
  const isBilateral = typeof entity.repsRight === 'number' && entity.repsRight > 0;
  const isDistanceExercise = entity.unit === 'm' || entity.distance !== null;
  const repsLabel = isBilateral ? 'Vasen' : (isDistanceExercise ? 'Metrit' : 'Toistot');
  const sets = entity.sets ?? 0;
  const reps = typeof entity.reps === 'number' ? entity.reps : 0;
  const repsRight = typeof entity.repsRight === 'number' ? entity.repsRight : reps;
  const weightValue = entity.weight && 'value' in entity.weight && typeof entity.weight.value === 'number'
    ? entity.weight.value
    : 0;
  const showWeightControl = !!entity.weight || weightValue > 0;

  const updateWeight = (nextWeight: number) => {
    const currentWeight = entity.weight;
    if (nextWeight <= 0) {
      onChange({ ...entity, weight: null });
      return;
    }

    if (currentWeight && 'value' in currentWeight) {
      const updated: Weight = {
        ...currentWeight,
        value: nextWeight,
        valueMax: nextWeight,
      };
      onChange({ ...entity, weight: updated });
      return;
    }

    onChange({
      ...entity,
      weight: {
        value: nextWeight,
        valueMax: nextWeight,
        unit: 'kg',
        count: 1,
      },
    });
  };

  if (typeof entity.reps !== 'number' && entity.reps !== null) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-3 text-sm text-slate-300">
        Tälle exercise-entitylle ei ole numeerista reps-arvoa (esim. max tai RM). Numerosäädin tukee tällä hetkellä numeerisia reps/sets-entiteettejä.
      </div>
    );
  }

  if (isDistanceExercise) {
    return (
      <div className="flex items-center justify-center gap-4 py-2 flex-wrap">
        <NumericStepper
          value={sets}
          onChange={(value) => onChange({ ...entity, sets: value })}
          label="Sarjat"
          min={0}
          max={20}
        />
        <InlineOperator symbol="×" />
        <NumericStepper
          value={reps}
          onChange={(value) => onChange({ ...entity, reps: value, distance: value, unit: 'm' })}
          label={repsLabel}
          suffix="m"
          min={0}
          max={100000}
          computeNextValue={getNextDistanceMetersValue}
        />
      </div>
    );
  }

  if (isBilateral) {
    return (
      <div className="flex flex-col items-center gap-3 py-2">
        <NumericStepper
          value={sets}
          onChange={(value) => onChange({ ...entity, sets: value })}
          label="Sarjat"
          min={0}
          max={20}
        />
        <div className="flex items-center justify-center gap-3">
          <NumericStepper
            value={reps}
            onChange={(value) => onChange({ ...entity, reps: value })}
            label={repsLabel}
            min={0}
            max={100}
          />
          {isBilateral && (
            <>
              <InlineOperator symbol="+" />
              <NumericStepper
                value={repsRight}
                onChange={(value) => onChange({ ...entity, repsRight: value })}
                label="Oikea"
                min={0}
                max={100}
              />
            </>
          )}
        </div>
        {showWeightControl && (
          <NumericStepper
            value={weightValue}
            onChange={updateWeight}
            label="Paino"
            suffix="kg"
            min={0}
            max={500}
            computeNextValue={getNextWeightValue}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 py-2 flex-wrap">
      <NumericStepper
        value={sets}
        onChange={(value) => onChange({ ...entity, sets: value })}
        label="Sarjat"
        min={0}
        max={20}
      />
      <InlineOperator symbol="×" />
      <NumericStepper
        value={reps}
        onChange={(value) => onChange({ ...entity, reps: value })}
        label="Toistot"
        min={0}
        max={100}
      />
      {showWeightControl && (
        <>
          <InlineOperator symbol="×" />
          <NumericStepper
            value={weightValue}
            onChange={updateWeight}
            label="Paino"
            suffix="kg"
            min={0}
            max={500}
            computeNextValue={getNextWeightValue}
          />
        </>
      )}
    </div>
  );
}
