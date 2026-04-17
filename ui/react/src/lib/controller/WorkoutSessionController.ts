import type { Content as ParsedContent, Exercise as ParsedExercise, Workout as ParsedWorkout } from '@parser/types';

import { WorkoutTimingController } from './WorkoutTimingController';
import type { Clock } from './VirtualClock';
import type {
  CompleteRepStepInput,
  WorkoutControllerEvent,
  WorkoutControllerState,
} from './workout-controller-types';
import type {
  WorkoutSessionControllerOptions,
  WorkoutSessionEvent,
  WorkoutSessionState,
  WorkoutSessionSummary,
} from './workout-session-controller-types';

interface InternalSessionOptions extends WorkoutSessionControllerOptions {
  clock?: Clock;
}

export class WorkoutSessionController {
  private readonly workouts: ParsedWorkout[];

  private readonly controllers: WorkoutTimingController[];

  private listeners = new Set<(event: WorkoutSessionEvent) => void>();

  private currentWorkoutIndex: number;

  constructor(workouts: ParsedWorkout[], options: InternalSessionOptions = {}) {
    this.workouts = workouts.slice();
    this.controllers = this.workouts.map((workout) => new WorkoutTimingController(workout, options));
    this.currentWorkoutIndex = this.controllers.length > 0 ? 0 : -1;

    this.controllers.forEach((controller, workoutIndex) => {
      controller.subscribe((event) => {
        this.handleWorkoutEvent(workoutIndex, event);
      });
    });
  }

  getState(): WorkoutSessionState {
    const currentWorkout = this.currentWorkoutIndex >= 0 ? this.workouts[this.currentWorkoutIndex] ?? null : null;
    const currentWorkoutState = this.getCurrentWorkoutState();

    return {
      workouts: this.controllers.map((controller, workoutIndex) => this.toSummary(workoutIndex, controller.getState())),
      currentWorkoutIndex: this.currentWorkoutIndex,
      currentWorkout,
      currentWorkoutState,
      status: currentWorkoutState?.status ?? 'completed',
      canGoPrevious: this.currentWorkoutIndex > 0,
      canGoNext: this.currentWorkoutIndex >= 0 && this.currentWorkoutIndex < this.controllers.length - 1,
      completedWorkoutCount: this.controllers.reduce((count, controller) => (
        controller.getState().status === 'completed' ? count + 1 : count
      ), 0),
      totalWorkoutCount: this.controllers.length,
    };
  }

  subscribe(listener: (event: WorkoutSessionEvent) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  startCurrent(): void {
    this.getCurrentController()?.startCurrent();
  }

  pause(): void {
    this.getCurrentController()?.pause();
  }

  resume(): void {
    this.getCurrentController()?.resume();
  }

  stopCurrent(): void {
    this.getCurrentController()?.stopCurrent();
  }

  replaceCurrentStepContent(content: ParsedContent): void {
    this.getCurrentController()?.replaceCurrentStepContent(content);
  }

  completeCurrentTimedExercise(exercise: ParsedExercise): void {
    this.getCurrentController()?.completeCurrentTimedExercise(exercise);
  }

  completeCurrentRepStep(input: CompleteRepStepInput = {}): void {
    this.getCurrentController()?.completeCurrentRepStep(input);
  }

  confirmCurrentTimedSegment(): void {
    this.getCurrentController()?.confirmCurrentTimedSegment();
  }

  skipToNextStep(): void {
    this.getCurrentController()?.skipToNextStep();
  }

  skipToPreviousStep(): void {
    this.getCurrentController()?.skipToPreviousStep();
  }

  nextWorkout(): void {
    if (this.currentWorkoutIndex < 0 || this.currentWorkoutIndex >= this.controllers.length - 1) {
      return;
    }

    this.selectWorkout(this.currentWorkoutIndex + 1);
  }

  previousWorkout(): void {
    if (this.currentWorkoutIndex <= 0) {
      return;
    }

    this.selectWorkout(this.currentWorkoutIndex - 1);
  }

  selectWorkout(nextWorkoutIndex: number): void {
    if (nextWorkoutIndex < 0 || nextWorkoutIndex >= this.controllers.length || nextWorkoutIndex === this.currentWorkoutIndex) {
      return;
    }

    this.pauseCurrentIfRunning();

    const previousIndex = this.currentWorkoutIndex;
    this.currentWorkoutIndex = nextWorkoutIndex;
    this.emit({
      type: 'workout-changed',
      fromIndex: previousIndex,
      toIndex: nextWorkoutIndex,
      reason: 'manual',
    });
    this.emitStateChanged();
  }

  private handleWorkoutEvent(workoutIndex: number, event: WorkoutControllerEvent): void {
    this.emit({ type: 'workout-event', workoutIndex, event });

    if (workoutIndex !== this.currentWorkoutIndex) {
      return;
    }

    if (event.type === 'workout-completed') {
      const nextWorkoutIndex = workoutIndex + 1;
      if (nextWorkoutIndex < this.controllers.length) {
        this.currentWorkoutIndex = nextWorkoutIndex;
        this.emit({
          type: 'workout-changed',
          fromIndex: workoutIndex,
          toIndex: nextWorkoutIndex,
          reason: 'auto',
        });
        this.emitStateChanged();
        return;
      }

      const finalState = this.getState();
      this.emitStateChanged();
      this.emit({ type: 'session-completed', state: finalState });
      return;
    }

    this.emitStateChanged();
  }

  private getCurrentController(): WorkoutTimingController | null {
    if (this.currentWorkoutIndex < 0) {
      return null;
    }

    return this.controllers[this.currentWorkoutIndex] ?? null;
  }

  private getCurrentWorkoutState(): WorkoutControllerState | null {
    return this.getCurrentController()?.getState() ?? null;
  }

  private pauseCurrentIfRunning(): void {
    const currentController = this.getCurrentController();
    if (!currentController) {
      return;
    }

    if (currentController.getState().status === 'running') {
      currentController.pause();
    }
  }

  private toSummary(workoutIndex: number, state: WorkoutControllerState): WorkoutSessionSummary {
    return {
      id: `workout-${workoutIndex}`,
      title: this.workouts[workoutIndex]?.title ?? null,
      status: state.status,
      currentStepLabel: state.currentStep?.label ?? null,
      stepCount: state.steps.length,
    };
  }

  private emitStateChanged(): void {
    this.emit({ type: 'state-changed', state: this.getState() });
  }

  private emit(event: WorkoutSessionEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}