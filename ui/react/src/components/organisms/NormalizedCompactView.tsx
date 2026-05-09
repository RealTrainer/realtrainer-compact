import type { ReactNode } from 'react';
import { resolveNormalizedWorkouts } from '../../lib/normalizedWorkouts';
import type { NormalizedCompactRenderableData } from '../../lib/normalized-types';
import { NormalizedWorkoutView } from './NormalizedWorkoutView';
import type { CompactBlogHeaderOptions } from './CompactBlogView';

export interface NormalizedCompactViewProps {
  data: NormalizedCompactRenderableData;
  workoutIndex?: number;
  showHeader?: boolean;
  headerOptions?: CompactBlogHeaderOptions;
  emptyState?: ReactNode;
  errorFallback?: (message: string) => ReactNode;
}

export function NormalizedCompactView({
  data,
  workoutIndex,
  showHeader,
  headerOptions,
  emptyState = null,
  errorFallback,
}: NormalizedCompactViewProps) {
  const { workouts, warnings, error } = resolveNormalizedWorkouts(data);

  if (error) {
    return <>{errorFallback ? errorFallback(error) : <div data-testid="normalized-view-error">{error}</div>}</>;
  }

  if (typeof workoutIndex === 'number') {
    const workout = workouts[workoutIndex];
    if (!workout) {
      return <>{emptyState}</>;
    }

    const workoutWarnings = warnings.filter((warning) => warning.workoutIndex === workoutIndex);
    return <NormalizedWorkoutView workout={workout} warnings={workoutWarnings} showHeader={showHeader} headerOptions={headerOptions} />;
  }

  if (workouts.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <div className="space-y-6" data-testid="normalized-compact-view">
      {workouts.map((workout, index) => (
        <NormalizedWorkoutView
          key={`${workout.title ?? 'workout'}-${index}`}
          workout={workout}
          warnings={warnings.filter((warning) => warning.workoutIndex === index)}
          showHeader={showHeader}
          headerOptions={headerOptions}
        />
      ))}
    </div>
  );
}