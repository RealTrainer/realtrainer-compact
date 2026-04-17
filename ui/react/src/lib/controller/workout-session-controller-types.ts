import type { Workout as ParsedWorkout } from '@parser/types';

import type { Clock } from './VirtualClock';

import type {
  WorkoutControllerEvent,
  WorkoutControllerOptions,
  WorkoutControllerState,
  WorkoutControllerStatus,
} from './workout-controller-types';

export interface WorkoutSessionSummary {
  id: string;
  title: string | null;
  status: WorkoutControllerStatus;
  currentStepLabel: string | null;
  stepCount: number;
}

export interface WorkoutSessionState {
  workouts: WorkoutSessionSummary[];
  currentWorkoutIndex: number;
  currentWorkout: ParsedWorkout | null;
  currentWorkoutState: WorkoutControllerState | null;
  status: WorkoutControllerStatus;
  canGoPrevious: boolean;
  canGoNext: boolean;
  completedWorkoutCount: number;
  totalWorkoutCount: number;
}

export type WorkoutSessionEvent =
  | { type: 'state-changed'; state: WorkoutSessionState }
  | { type: 'workout-changed'; fromIndex: number; toIndex: number; reason: 'manual' | 'auto' }
  | { type: 'workout-event'; workoutIndex: number; event: WorkoutControllerEvent }
  | { type: 'session-completed'; state: WorkoutSessionState };

export interface WorkoutSessionControllerOptions extends WorkoutControllerOptions {
  clock?: Clock;
}
