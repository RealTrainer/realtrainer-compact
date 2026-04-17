import { describe, expect, it } from 'vitest';

import { parseCompact } from '../../../../src/index.ts';
import type { Workout } from '../../../../src/types.ts';
import { WorkoutSessionController } from '../../src/lib/controller/WorkoutSessionController';
import { VirtualClock } from '../../src/lib/controller/VirtualClock';

function parseWorkouts(source: string): Workout[] {
  const result = parseCompact(source);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.document.workouts;
}

function completeRepeatedTimedWorkout(controller: WorkoutSessionController, clock: VirtualClock, repeatCount: number, segmentSeconds: number): void {
  for (let index = 0; index < repeatCount; index += 1) {
    controller.startCurrent();
    clock.advanceBy(segmentSeconds * 1000);
    // Confirm each segment completion
    controller.confirmCurrentTimedSegment();
  }
}

describe('WorkoutSessionController', () => {
  describe('Execution paths: multi-workout session flow', () => {
    it('auto-advances to the next workout when the current timed workout completes', () => {
      const workouts = parseWorkouts(`[2026-04-15] ## Warmup
Exercise March|3x2s

[2026-04-15] ## Main
Exercise Plank|3x2s
`);
      const clock = new VirtualClock();
      const controller = new WorkoutSessionController(workouts, { clock });

      completeRepeatedTimedWorkout(controller, clock, 3, 2);

      const state = controller.getState();
      expect(state.totalWorkoutCount).toBe(2);
      expect(state.completedWorkoutCount).toBe(1);
      expect(state.currentWorkoutIndex).toBe(1);
      expect(state.currentWorkout?.title).toBe('Main');
      expect(state.currentWorkoutState?.status).toBe('idle');
      expect(state.currentWorkoutState?.currentStep?.label).toBe('Plank');
      expect(state.workouts.map((workout) => workout.status)).toEqual(['completed', 'idle']);
    });

    it('supports manual next and previous workout navigation for fullscreen-style session stepping', () => {
      const workouts = parseWorkouts(`[2026-04-15] ## A
Exercise March|3x2s

[2026-04-15] ## B
Exercise Plank|3x2s
`);
      const clock = new VirtualClock();
      const controller = new WorkoutSessionController(workouts, { clock });

      controller.startCurrent();
      clock.advanceBy(1000);
      controller.nextWorkout();

      let state = controller.getState();
      expect(state.currentWorkoutIndex).toBe(1);
      expect(state.currentWorkout?.title).toBe('B');
      expect(state.currentWorkoutState?.status).toBe('idle');
      expect(state.workouts[0]?.status).toBe('paused');

      controller.previousWorkout();

      state = controller.getState();
      expect(state.currentWorkoutIndex).toBe(0);
      expect(state.currentWorkout?.title).toBe('A');
      expect(state.currentWorkoutState?.status).toBe('paused');
      expect(state.currentWorkoutState?.elapsedSeconds).toBe(1);
    });
  });

  describe('Execution paths: session events', () => {
    it('emits a session-completed event when the final workout completes', () => {
      const workouts = parseWorkouts(`[2026-04-15] ## One
Exercise March|2s

[2026-04-15] ## Two
Exercise Plank|2s
`);
      const clock = new VirtualClock();
      const controller = new WorkoutSessionController(workouts, { clock });
      const events: string[] = [];

      controller.subscribe((event) => {
        if (event.type === 'workout-changed') {
          events.push(`change:${event.fromIndex}->${event.toIndex}:${event.reason}`);
        }

        if (event.type === 'session-completed') {
          events.push(`session-completed:${event.state.completedWorkoutCount}`);
        }
      });

      // Complete first workout, then confirm to advance
      controller.startCurrent();
      clock.advanceBy(2000);
      controller.confirmCurrentTimedSegment();
      // Complete second workout, then confirm to complete session
      controller.startCurrent();
      clock.advanceBy(2000);
      controller.confirmCurrentTimedSegment();

      expect(events).toEqual([
        'change:0->1:auto',
        'session-completed:2',
      ]);
      expect(controller.getState().status).toBe('completed');
      expect(controller.getState().completedWorkoutCount).toBe(2);
    });
  });
});