import type { ReactNode } from 'react';
import { isParseSuccess, parseCompact } from '@parser';
import type { ParseFailure, ParseResult } from '@parser';
import type { Document, Workout } from '@parser/types';
import { CompactBlogView, type CompactBlogHeaderOptions } from './CompactBlogView';
import { workoutsFromCompact } from '../../lib/workoutsFromCompact';
import {
  compactWorkoutFromParsedWorkout,
  compactWorkoutsFromDocument,
} from '../../lib/parsedRowMapping';
import type { CompactUiRenderers, CompactWorkoutModel } from '../../lib/types';

type RowInteractionEvent = 'click' | 'press' | 'hover';

export type CompactRenderableData =
  | string
  | ParseResult
  | ParseFailure
  | Document
  | Workout
  | CompactWorkoutModel
  | CompactWorkoutModel[];

export interface CompactViewProps {
  data: CompactRenderableData;
  workoutIndex?: number;
  showHeader?: boolean;
  headerOptions?: CompactBlogHeaderOptions;
  onRowInteraction?: (rowId: string, event: RowInteractionEvent) => void;
  renderers?: CompactUiRenderers;
  emptyState?: ReactNode;
  errorFallback?: (message: string) => ReactNode;
}

function isDocument(value: CompactRenderableData): value is Document {
  return typeof value === 'object' && value !== null && Array.isArray((value as Document).workouts) && Array.isArray((value as Document).stats);
}

function isWorkout(value: CompactRenderableData): value is Workout {
  return typeof value === 'object' && value !== null && (value as Workout).type === 'workout' && Array.isArray((value as Workout).content);
}

function isCompactWorkoutModel(value: CompactRenderableData): value is CompactWorkoutModel {
  return typeof value === 'object' && value !== null && Array.isArray((value as CompactWorkoutModel).rows) && typeof (value as CompactWorkoutModel).date === 'string';
}

function isParseFailure(value: CompactRenderableData): value is ParseFailure {
  return typeof value === 'object' && value !== null && (value as ParseFailure).success === false;
}

function isParseResult(value: CompactRenderableData): value is ParseResult {
  return typeof value === 'object' && value !== null && (value as ParseResult).success === true && isDocument((value as ParseResult).document);
}

function resolveWorkouts(data: CompactRenderableData): { workouts: CompactWorkoutModel[]; error: string | null } {
  if (typeof data === 'string') {
    return workoutsFromCompact(data);
  }

  if (Array.isArray(data)) {
    return { workouts: data, error: null };
  }

  if (isParseFailure(data)) {
    return { workouts: [], error: data.error.message };
  }

  if (isParseResult(data)) {
    return { workouts: compactWorkoutsFromDocument(data.document), error: null };
  }

  if (isDocument(data)) {
    return { workouts: compactWorkoutsFromDocument(data), error: null };
  }

  if (isWorkout(data)) {
    return { workouts: [compactWorkoutFromParsedWorkout(data)], error: null };
  }

  if (isCompactWorkoutModel(data)) {
    return { workouts: [data], error: null };
  }

  const parsed = parseCompact(String(data));
  if (!isParseSuccess(parsed)) {
    return { workouts: [], error: parsed.error.message };
  }
  return { workouts: compactWorkoutsFromDocument(parsed.document), error: null };
}

export function CompactView({
  data,
  workoutIndex,
  showHeader,
  headerOptions,
  onRowInteraction,
  renderers,
  emptyState = null,
  errorFallback,
}: CompactViewProps) {
  const { workouts, error } = resolveWorkouts(data);

  if (error) {
    return <>{errorFallback ? errorFallback(error) : <div data-testid="compact-view-error">{error}</div>}</>;
  }

  if (typeof workoutIndex === 'number') {
    const workout = workouts[workoutIndex];
    if (!workout) {
      return <>{emptyState}</>;
    }

    return (
      <CompactBlogView
        workout={workout}
        showHeader={showHeader}
        headerOptions={headerOptions}
        onRowInteraction={onRowInteraction}
        renderers={renderers}
      />
    );
  }

  if (workouts.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <div className="space-y-6" data-testid="compact-view">
      {workouts.map((workout, index) => (
        <CompactBlogView
          key={`${workout.date}-${workout.title}-${index}`}
          workout={workout}
          showHeader={showHeader}
          headerOptions={headerOptions}
          onRowInteraction={onRowInteraction}
          renderers={renderers}
        />
      ))}
    </div>
  );
}