import { describe, expect, it } from 'vitest';

import { parseCompact } from '../../../../src/index.ts';
import type { Workout } from '../../../../src/types.ts';
import { VirtualClock } from '../../src/lib/controller/VirtualClock';
import { WorkoutTimingController } from '../../src/lib/controller/WorkoutTimingController';

function parseWorkout(source: string): Workout {
  const result = parseCompact(source);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  const workout = result.document.workouts[0];
  if (!workout) {
    throw new Error('Expected one parsed workout');
  }

  return workout;
}

describe('WorkoutTimingController', () => {
  describe('Execution paths: normalization', () => {
    it('maps parsed workout content into executable and metadata steps', () => {
      const workout = parseWorkout(`[2026-04-15] ## Demo
Section Warmup
Exercise March|30s
Text Stay tall
Exercise Bench|3x8@80kg
`);

      const controller = new WorkoutTimingController(workout);
      const state = controller.getState();

      // Text row is merged into previous Exercise's instructionText
      expect(state.steps.map((step) => [step.kind, step.label])).toEqual([
        ['section', 'Warmup'],
        ['timed-exercise', 'March'],
        ['rep-exercise', 'Bench'],
      ]);

      // Verify Text was merged as instructionText
      const marchStep = state.steps.find((s) => s.label === 'March');
      expect(marchStep?.instructionText).toBe('Stay tall');

      expect(state.currentStep?.label).toBe('March');
      expect(state.status).toBe('idle');

      const repStep = state.steps[2];
      expect(repStep.kind).toBe('rep-exercise');
      if (repStep.kind === 'rep-exercise') {
        expect(repStep.plannedReps).toBe(8);
        expect(repStep.completedSets).toBe(0);
        expect(repStep.setResults).toEqual([]);
      }
    });
  });

  describe('Execution paths: timed steps', () => {
    it('records timed exercise segments and advances through repeated sets', () => {
      const workout = parseWorkout(`[2026-04-15] ## Demo
Exercise Plank|3x2s
Exercise Bench|3x8@80kg
`);
      const clock = new VirtualClock();
      const controller = new WorkoutTimingController(workout, { clock });

      controller.startCurrent();
      clock.advanceBy(2000);

      // After timer completes, should be awaiting confirmation
      let state = controller.getState();
      expect(state.currentStep?.label).toBe('Plank');
      expect(state.status).toBe('awaiting-timed-confirmation');
      expect(state.activeTimedSegment?.measuredSeconds).toBe(2);

      // Confirm to advance to next segment
      controller.confirmCurrentTimedSegment();
      state = controller.getState();
      expect(state.currentSegmentIndex).toBe(1);
      expect(state.status).toBe('idle');
      expect(state.lastResultSeconds).toBe(2);

      // Complete remaining sets with confirmation
      controller.startCurrent();
      clock.advanceBy(2000);
      controller.confirmCurrentTimedSegment();
      controller.startCurrent();
      clock.advanceBy(2000);
      controller.confirmCurrentTimedSegment();

      state = controller.getState();
      expect(state.currentStep?.label).toBe('Bench');
      expect(state.status).toBe('idle');
      expect(state.lastResultSeconds).toBe(2);
    });

    it('stops a timed step early and completes the workout with the measured result', () => {
      const workout = parseWorkout(`[2026-04-15] ## Demo
Exercise March|5s
`);
      const clock = new VirtualClock();
      const controller = new WorkoutTimingController(workout, { clock });

      controller.startCurrent();
      clock.advanceBy(2000);
      controller.stopCurrent();

      // After manual stop, should be awaiting confirmation
      let state = controller.getState();
      expect(state.status).toBe('awaiting-timed-confirmation');
      expect(state.activeTimedSegment?.measuredSeconds).toBe(2);

      // Confirm to complete workout
      controller.confirmCurrentTimedSegment();
      state = controller.getState();
      expect(state.status).toBe('completed');
      expect(state.lastResultSeconds).toBe(2);

      const step = state.steps[0];
      expect(step.kind).toBe('timed-exercise');
      if (step.kind === 'timed-exercise') {
        expect(step.segments[0].measuredSeconds).toBe(2);
      }
    });
  });

  describe('Execution paths: rep exercises', () => {
    it('supports legacy one-shot confirmation for rep steps and advances immediately', () => {
      const workout = parseWorkout(`[2026-04-15] ## Demo
Exercise Bench|3x8@80kg
Exercise March|30s
`);
      const controller = new WorkoutTimingController(workout);

      controller.completeCurrentRepStep({ actualSets: 4, feeling: 'hard' });

      const state = controller.getState();
      expect(state.currentStep?.label).toBe('March');
      expect(state.steps[0].kind).toBe('rep-exercise');
      if (state.steps[0].kind === 'rep-exercise') {
        expect(state.steps[0].actualSets).toBe(4);
        expect(state.steps[0].completedSets).toBe(4);
        expect(state.steps[0].feeling).toBe('hard');
      }
    });

    it('starts a manual set, tracks elapsed time, stops it, and allows corrected reps before continuing', () => {
      const workout = parseWorkout(`[2026-04-15] ## Demo
Exercise Etunojapunnerrus|3x20
`);
      const clock = new VirtualClock();
      const controller = new WorkoutTimingController(workout, { clock });

      controller.startCurrent();
      clock.advanceBy(4000);

      let state = controller.getState();
      expect(state.status).toBe('running');
      expect(state.activeRepSet).toEqual({
        setNumber: 1,
        plannedReps: 20,
        elapsedSeconds: 4,
        status: 'running',
      });

      controller.stopCurrent();

      state = controller.getState();
      expect(state.status).toBe('awaiting-input');
      expect(state.lastResultSeconds).toBe(4);
      expect(state.activeRepSet).toEqual({
        setNumber: 1,
        plannedReps: 20,
        elapsedSeconds: 4,
        status: 'awaiting-confirmation',
      });

      controller.completeCurrentRepStep({ actualReps: 13 });

      state = controller.getState();
      expect(state.status).toBe('idle');
      expect(state.currentStep?.label).toBe('Etunojapunnerrus');
      expect(state.activeRepSet).toBeNull();
      expect(state.lastResultSeconds).toBe(4);
      expect(state.currentStep?.kind).toBe('rep-exercise');
      if (state.currentStep?.kind === 'rep-exercise') {
        expect(state.currentStep.completedSets).toBe(1);
        expect(state.currentStep.actualSets).toBe(1);
        expect(state.currentStep.setResults).toEqual([
          {
            setNumber: 1,
            plannedReps: 20,
            actualReps: 13,
            elapsedSeconds: 4,
          },
        ]);
      }
    });

    it('confirms rep sets one by one and advances only after the final set', () => {
      const workout = parseWorkout(`[2026-04-15] ## Demo
Exercise Pushup|2x20
Exercise March|30s
`);
      const clock = new VirtualClock();
      const controller = new WorkoutTimingController(workout, { clock });

      controller.startCurrent();
      clock.advanceBy(2000);
      controller.stopCurrent();
      controller.completeCurrentRepStep({ actualReps: 18 });

      let state = controller.getState();
      expect(state.currentStep?.label).toBe('Pushup');
      expect(state.status).toBe('idle');
      expect(state.lastResultSeconds).toBe(2);

      controller.startCurrent();
      clock.advanceBy(3000);
      controller.completeCurrentRepStep({ actualReps: 15, feeling: 'hard' });

      state = controller.getState();
      expect(state.currentStep?.label).toBe('March');
      expect(state.status).toBe('idle');
      expect(state.lastResultSeconds).toBe(3);

      const completedStep = state.steps[0];
      expect(completedStep.kind).toBe('rep-exercise');
      if (completedStep.kind === 'rep-exercise') {
        expect(completedStep.completedSets).toBe(2);
        expect(completedStep.actualSets).toBe(2);
        expect(completedStep.feeling).toBe('hard');
        expect(completedStep.setResults).toEqual([
          {
            setNumber: 1,
            plannedReps: 20,
            actualReps: 18,
            elapsedSeconds: 2,
          },
          {
            setNumber: 2,
            plannedReps: 20,
            actualReps: 15,
            elapsedSeconds: 3,
          },
        ]);
      }
    });
  });

  describe('Execution paths: workout plan editing', () => {
    it('allows reordering and replacing future steps before starting them', () => {
      const workout = parseWorkout(`[2026-04-15] ## Demo
Exercise Bench|3x8@80kg
Exercise Squat|3x5@100kg
`);
      const controller = new WorkoutTimingController(workout);

      controller.moveStep(1, 0);
      controller.selectStep(0);
      controller.replaceStep(1, {
        content: {
          ...workout.content[0],
          type: 'exercise',
          name: 'Incline Bench',
        },
      });

      const state = controller.getState();
      expect(state.steps[0].label).toBe('Squat');
      expect(state.steps[1].label).toBe('Incline Bench');
      expect(state.currentStep?.label).toBe('Squat');
    });

    it('allows inserting a new timed step into the workout plan', () => {
      const workout = parseWorkout(`[2026-04-15] ## Demo
Exercise Bench|3x8@80kg
Exercise Squat|3x5@100kg
`);
      const controller = new WorkoutTimingController(workout);

      controller.insertStep(1, {
        content: {
          ...workout.content[0],
          type: 'exercise',
          name: 'March',
          sets: 1,
          reps: 30,
          repsMax: null,
          repsRight: undefined,
          unit: 's',
          weight: null,
          recovery: null,
          note: null,
          description: 'Keep moving',
          customFields: null,
          specType: undefined,
          measuredDurations: undefined,
          isBilateral: false,
          distance: null,
          distanceMin: null,
          distanceMax: null,
          rounds: null,
        },
      });

      const state = controller.getState();
      expect(state.steps.map((step) => step.label)).toEqual(['Bench', 'March', 'Squat']);
      expect(state.steps[1].kind).toBe('timed-exercise');
      expect(state.currentStep?.label).toBe('Bench');
    });

    it('allows updating a timed step without replacing the whole step', () => {
      const workout = parseWorkout(`[2026-04-15] ## Demo
Exercise March|2x30s
`);
      const controller = new WorkoutTimingController(workout);

      controller.updateStep(0, {
        label: 'Fast March',
        instructionText: 'Lift knees higher',
        segmentPlannedSeconds: [20, 25],
      });

      const state = controller.getState();
      expect(state.currentStep?.label).toBe('Fast March');
      expect(state.currentStep?.kind).toBe('timed-exercise');
      if (state.currentStep?.kind === 'timed-exercise') {
        expect(state.currentStep.segments.map((segment) => segment.plannedSeconds)).toEqual([20, 25]);
        expect(state.currentStep.instructionText).toBe('Lift knees higher');
      }
      expect(state.remainingSeconds).toBe(20);
    });

    it('allows removing the current step and rebinds selection to the next executable step', () => {
      const workout = parseWorkout(`[2026-04-15] ## Demo
Exercise March|30s
Section Main
Exercise Bench|3x8@80kg
`);
      const controller = new WorkoutTimingController(workout);

      controller.removeStep(0);

      const state = controller.getState();
      expect(state.steps.map((step) => step.label)).toEqual(['Main', 'Bench']);
      expect(state.currentStep?.label).toBe('Bench');
      expect(state.status).toBe('idle');
    });

    it('allows updating rep planning fields without replacing the step', () => {
      const workout = parseWorkout(`[2026-04-15] ## Demo
Exercise Bench|3x8@80kg
Exercise March|30s
`);
      const controller = new WorkoutTimingController(workout);

      controller.updateStep(0, {
        plannedSets: 5,
        plannedReps: 10,
        actualSets: 4,
        feeling: 'moderate',
        instructionText: 'Controlled tempo',
        label: 'Incline Bench',
      });

      const state = controller.getState();
      expect(state.currentStep?.label).toBe('Incline Bench');
      expect(state.currentStep?.kind).toBe('rep-exercise');
      if (state.currentStep?.kind === 'rep-exercise') {
        expect(state.currentStep.plannedSets).toBe(5);
        expect(state.currentStep.plannedReps).toBe(10);
        expect(state.currentStep.actualSets).toBe(4);
        expect(state.currentStep.feeling).toBe('moderate');
        expect(state.currentStep.instructionText).toBe('Controlled tempo');
      }
    });
  });

  describe('Execution paths: controller events', () => {
    it('emits a countdown threshold event when remaining time reaches 10 seconds', () => {
      const workout = parseWorkout(`[2026-04-15] ## Demo
Exercise March|12s
`);
      const clock = new VirtualClock();
      const controller = new WorkoutTimingController(workout, { clock, countdownThresholdSeconds: 10 });
      const events: string[] = [];

      controller.subscribe((event) => {
        if (event.type === 'countdown-threshold-reached') {
          events.push(`${event.stepId}:${event.remainingSeconds}`);
        }
      });

      controller.startCurrent();
      clock.advanceBy(2000);

      expect(events).toEqual(['exercise-0:10']);
    });
  });
});