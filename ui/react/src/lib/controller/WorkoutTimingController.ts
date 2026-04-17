import type {
  Content as ParsedContent,
  DurationBlock as ParsedDurationBlock,
  Exercise as ParsedExercise,
  MeasuredDuration as ParsedMeasuredDuration,
  Workout as ParsedWorkout,
} from '@parser/types';

import type { Clock } from './VirtualClock';
import { RealClock } from './VirtualClock';
import type {
  CompleteRepStepInput,
  ReplaceStepInput,
  TimedWorkoutControllerStep,
  UpdateStepInput,
  WorkoutControllerEvent,
  WorkoutControllerOptions,
  WorkoutControllerState,
  WorkoutControllerStep,
  WorkoutTimedSegment,
} from './workout-controller-types';
import { isRepWorkoutStep, isTimedWorkoutStep } from './workout-controller-types';

function toSeconds(value: number | null | undefined, unit: 'min' | 's' | 'm' | null | undefined): number | null {
  if (typeof value !== 'number') {
    return null;
  }

  if (unit === 'min') {
    return Math.max(0, Math.round(value * 60));
  }

  if (unit === 's') {
    return Math.max(0, Math.round(value));
  }

  return null;
}

function toPlannedRepCount(value: ParsedExercise['reps']): number | null {
  if (typeof value !== 'number') {
    return null;
  }

  return Math.max(0, Math.round(value));
}

function measuredDurationToSeconds(duration: ParsedMeasuredDuration): number[] {
  const multiplier = duration.unit === 'min' ? 60 : 1;
  const seconds = [Math.max(0, Math.round(duration.left * multiplier))];

  if (typeof duration.right === 'number') {
    seconds.push(Math.max(0, Math.round(duration.right * multiplier)));
  }

  return seconds;
}

function buildTimedExerciseSegments(exercise: ParsedExercise): WorkoutTimedSegment[] {
  const sets = Math.max(1, exercise.sets ?? 1);
  const leftSeconds = toSeconds(typeof exercise.reps === 'number' ? exercise.reps : null, exercise.unit);
  if (leftSeconds === null) {
    return [];
  }

  const rightSeconds = typeof exercise.repsRight === 'number'
    ? toSeconds(exercise.repsRight, exercise.unit)
    : null;

  const segments: WorkoutTimedSegment[] = [];
  let index = 0;

  for (let setNumber = 1; setNumber <= sets; setNumber += 1) {
    segments.push({
      index,
      setNumber,
      side: rightSeconds !== null ? 'left' : 'single',
      plannedSeconds: leftSeconds,
      measuredSeconds: null,
    });
    index += 1;

    if (rightSeconds !== null) {
      segments.push({
        index,
        setNumber,
        side: 'right',
        plannedSeconds: rightSeconds,
        measuredSeconds: null,
      });
      index += 1;
    }
  }

  return segments;
}

function buildDurationBlockSegments(block: ParsedDurationBlock): WorkoutTimedSegment[] {
  const seconds = toSeconds(block.duration?.value ?? null, block.duration?.unit);
  if (seconds === null) {
    return [];
  }

  return [{
    index: 0,
    setNumber: 1,
    side: 'single',
    plannedSeconds: seconds,
    measuredSeconds: null,
  }];
}

function normalizeContentStep(content: ParsedContent, contentIndex: number): WorkoutControllerStep {
  if (content.type === 'section') {
    return {
      id: `section-${contentIndex}`,
      contentIndex,
      kind: 'section',
      executable: false,
      label: content.name,
      instructionText: null,
      original: content,
    };
  }

  if (content.type === 'text') {
    return {
      id: `text-${contentIndex}`,
      contentIndex,
      kind: 'text',
      executable: false,
      label: 'Text',
      instructionText: content.value,
      original: content,
    };
  }

  if (content.type === 'duration') {
    const segments = buildDurationBlockSegments(content);
    if (segments.length > 0) {
      return {
        id: `duration-${contentIndex}`,
        contentIndex,
        kind: 'timed-duration',
        executable: true,
        label: content.description ?? 'Duration block',
        instructionText: content.description,
        original: content,
        segments,
      };
    }
  }

  if (content.type === 'exercise') {
    const timedSegments = buildTimedExerciseSegments(content);
    if (timedSegments.length > 0) {
      return {
        id: `exercise-${contentIndex}`,
        contentIndex,
        kind: 'timed-exercise',
        executable: true,
        label: content.name,
        instructionText: content.description ?? content.note,
        original: content,
        segments: timedSegments,
      };
    }

    return {
      id: `exercise-${contentIndex}`,
      contentIndex,
      kind: 'rep-exercise',
      executable: true,
      label: content.name,
      instructionText: content.description ?? content.note,
      original: content,
      plannedSets: Math.max(1, content.sets ?? 1),
      plannedReps: toPlannedRepCount(content.reps),
      completedSets: 0,
      actualSets: content.sets ?? null,
      feeling: null,
      setResults: [],
    };
  }

  return {
    id: `unsupported-${contentIndex}`,
    contentIndex,
    kind: 'unsupported',
    executable: false,
    label: content.type,
    instructionText: null,
    original: content,
  };
}

function cloneTimedStep(step: TimedWorkoutControllerStep): TimedWorkoutControllerStep {
  return {
    ...step,
    segments: step.segments.map((segment) => ({ ...segment })),
  };
}

function cloneStep(step: WorkoutControllerStep): WorkoutControllerStep {
  if (isTimedWorkoutStep(step)) {
    return cloneTimedStep(step);
  }

  if (isRepWorkoutStep(step)) {
    return {
      ...step,
      setResults: step.setResults.map((result) => ({ ...result })),
    };
  }

  return { ...step };
}

export class WorkoutTimingController {
  private readonly clock: Clock;

  private readonly countdownThresholdSeconds: number;

  private listeners = new Set<(event: WorkoutControllerEvent) => void>();

  private timerId: number | null = null;

  private thresholdEmittedForStepId: string | null = null;

  private syntheticContentIndex = 10_000;

  private state: WorkoutControllerState;

  constructor(workout: ParsedWorkout, options: WorkoutControllerOptions & { clock?: Clock } = {}) {
    this.clock = options.clock ?? new RealClock();
    this.countdownThresholdSeconds = options.countdownThresholdSeconds ?? 10;

    // Build steps, merging Text rows into previous Exercise's instructionText
    const steps: WorkoutControllerStep[] = [];
    for (let contentIndex = 0; contentIndex < workout.content.length; contentIndex += 1) {
      const content = workout.content[contentIndex];
      const nextContent = workout.content[contentIndex + 1];

      // Skip Text rows that will be merged into previous Exercise
      if (content.type === 'text') {
        // Only skip if parent was Exercise
        const prevStep = steps[steps.length - 1];
        if (prevStep && (prevStep.kind === 'timed-exercise' || prevStep.kind === 'rep-exercise')) {
          continue;
        }
      }

      const step = normalizeContentStep(content, contentIndex);

      // If next content is Text, merge it as instructionText
      if (nextContent?.type === 'text' && (step.kind === 'timed-exercise' || step.kind === 'rep-exercise')) {
        step.instructionText = nextContent.value;
      }

      steps.push(step);
    }

    const currentStepIndex = this.findNextExecutableIndex(steps, 0);

    this.state = {
      workoutTitle: workout.title,
      steps,
      currentStepIndex,
      currentStep: currentStepIndex >= 0 ? cloneStep(steps[currentStepIndex]) : null,
      status: currentStepIndex >= 0 ? 'idle' : 'completed',
      currentSegmentIndex: this.getCurrentSegmentIndex(currentStepIndex >= 0 ? steps[currentStepIndex] : null),
      remainingSeconds: this.getRemainingSeconds(currentStepIndex >= 0 ? steps[currentStepIndex] : null),
      elapsedSeconds: 0,
      lastResultSeconds: null,
      activeRepSet: null,
      activeTimedSegment: null,
    };
  }

  getState(): WorkoutControllerState {
    return {
      ...this.state,
      steps: this.state.steps.map((step) => cloneStep(step)),
      currentStep: this.state.currentStep ? cloneStep(this.state.currentStep) : null,
      activeRepSet: this.state.activeRepSet ? { ...this.state.activeRepSet } : null,
      activeTimedSegment: this.state.activeTimedSegment ? { ...this.state.activeTimedSegment } : null,
    };
  }

  subscribe(listener: (event: WorkoutControllerEvent) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  startCurrent(): void {
    const currentStep = this.getMutableCurrentStep();
    if (!currentStep) {
      return;
    }

    if (isTimedWorkoutStep(currentStep)) {
      const segmentIndex = this.getCurrentSegmentIndex(currentStep);
      const currentSegment = typeof segmentIndex === 'number' && segmentIndex >= 0 ? currentStep.segments[segmentIndex] : null;
      if (!currentSegment) {
        this.advanceToNextExecutableStep(currentStep.id);
        return;
      }

      this.clearRunningTimer();
      this.thresholdEmittedForStepId = null;
      this.updateState({
        status: 'running',
        currentSegmentIndex: segmentIndex,
        remainingSeconds: currentSegment.plannedSeconds,
        elapsedSeconds: 0,
        activeRepSet: null,
        activeTimedSegment: null,
      });
      this.emit({ type: 'step-started', stepId: currentStep.id, stepIndex: this.state.currentStepIndex });
      this.timerId = this.clock.setInterval(() => {
        this.tickCurrentSegment();
      }, 1000);
      return;
    }

    if (isRepWorkoutStep(currentStep)) {
      if (this.state.activeRepSet?.status === 'awaiting-confirmation') {
        return;
      }

      const activeRepSet = this.state.activeRepSet ?? {
        setNumber: currentStep.completedSets + 1,
        plannedReps: currentStep.plannedReps,
        elapsedSeconds: 0,
        status: 'running' as const,
      };

      if (activeRepSet.setNumber > currentStep.plannedSets) {
        this.emit({ type: 'step-completed', stepId: currentStep.id, stepIndex: this.state.currentStepIndex });
        this.advanceToNextExecutableStep(currentStep.id, this.state.lastResultSeconds);
        return;
      }

      this.clearRunningTimer();
      const shouldEmitStepStarted = this.state.status !== 'paused';
      this.updateState({
        status: 'running',
        elapsedSeconds: activeRepSet.elapsedSeconds,
        remainingSeconds: null,
        currentSegmentIndex: null,
        activeRepSet: {
          ...activeRepSet,
          status: 'running',
        },
      });
      if (shouldEmitStepStarted) {
        this.emit({ type: 'step-started', stepId: currentStep.id, stepIndex: this.state.currentStepIndex });
      }
      this.timerId = this.clock.setInterval(() => {
        this.tickCurrentRepSet();
      }, 1000);
    }
  }

  pause(): void {
    if (this.state.status !== 'running') {
      return;
    }

    this.clearRunningTimer();
    this.updateState({ status: 'paused' });
  }

  resume(): void {
    if (this.state.status !== 'paused') {
      return;
    }

    this.startCurrent();
  }

  stopCurrent(): void {
    const currentStep = this.getMutableCurrentStep();
    if (!currentStep) {
      return;
    }

    if (isRepWorkoutStep(currentStep)) {
      if (this.state.status !== 'running' || !this.state.activeRepSet) {
        return;
      }

      this.clearRunningTimer();
      const stoppedRepSet = {
        ...this.state.activeRepSet,
        status: 'awaiting-confirmation' as const,
      };
      this.updateState({
        status: 'awaiting-input',
        elapsedSeconds: stoppedRepSet.elapsedSeconds,
        remainingSeconds: null,
        currentSegmentIndex: null,
        lastResultSeconds: stoppedRepSet.elapsedSeconds,
        activeRepSet: stoppedRepSet,
      });
      return;
    }

    if (!isTimedWorkoutStep(currentStep)) {
      return;
    }

    this.recordCurrentTimedSegment(currentStep, this.state.elapsedSeconds ?? 0);
  }

  replaceCurrentStepContent(content: ParsedContent): void {
    if (this.state.currentStepIndex < 0) {
      return;
    }

    this.replaceStep(this.state.currentStepIndex, { content });
  }

  completeCurrentTimedExercise(exercise: ParsedExercise): void {
    const currentStep = this.getMutableCurrentStep();
    if (!currentStep || !isTimedWorkoutStep(currentStep) || currentStep.kind !== 'timed-exercise') {
      return;
    }

    const measuredSeconds = (exercise.measuredDurations ?? []).flatMap((duration) => measuredDurationToSeconds(duration));
    const nextStep: TimedWorkoutControllerStep = {
      ...cloneTimedStep(currentStep),
      label: exercise.name,
      instructionText: exercise.description ?? exercise.note,
      original: exercise,
      segments: currentStep.segments.map((segment, index) => ({
        ...segment,
        measuredSeconds: measuredSeconds[index] ?? segment.measuredSeconds ?? segment.plannedSeconds,
      })),
    };

    const totalMeasuredSeconds = nextStep.segments.reduce((sum, segment) => sum + (segment.measuredSeconds ?? 0), 0);

    this.replaceCurrentStep(nextStep);
    this.emit({ type: 'step-completed', stepId: nextStep.id, stepIndex: this.state.currentStepIndex });
    this.advanceToNextExecutableStep(nextStep.id, totalMeasuredSeconds);
  }

  completeCurrentRepStep(input: CompleteRepStepInput = {}): void {
    const currentStep = this.getMutableCurrentStep();
    if (!currentStep || !isRepWorkoutStep(currentStep)) {
      return;
    }

    const activeRepSet = this.state.activeRepSet;
    if (activeRepSet) {
      this.clearRunningTimer();

      const elapsedSeconds = this.state.status === 'running'
        ? this.state.elapsedSeconds ?? activeRepSet.elapsedSeconds
        : activeRepSet.elapsedSeconds;
      const nextCompletedSets = currentStep.completedSets + 1;
      const nextStep = {
        ...currentStep,
        completedSets: nextCompletedSets,
        actualSets: input.actualSets ?? nextCompletedSets,
        feeling: input.feeling ?? currentStep.feeling,
        setResults: [
          ...currentStep.setResults,
          {
            setNumber: activeRepSet.setNumber,
            plannedReps: activeRepSet.plannedReps,
            actualReps: input.actualReps ?? activeRepSet.plannedReps,
            elapsedSeconds,
          },
        ],
      };

      this.replaceCurrentStep(nextStep);

      if (nextCompletedSets >= nextStep.plannedSets) {
        this.emit({ type: 'step-completed', stepId: nextStep.id, stepIndex: this.state.currentStepIndex });
        this.updateState({ activeRepSet: null, activeTimedSegment: null });
        this.advanceToNextExecutableStep(nextStep.id, elapsedSeconds);
        return;
      }

      this.updateState({
        status: 'idle',
        elapsedSeconds: 0,
        remainingSeconds: null,
        currentSegmentIndex: null,
        lastResultSeconds: elapsedSeconds,
        activeRepSet: null,
        activeTimedSegment: null,
      });
      return;
    }

    currentStep.actualSets = input.actualSets ?? currentStep.actualSets ?? currentStep.plannedSets;
    currentStep.completedSets = currentStep.actualSets ?? currentStep.plannedSets;
    currentStep.feeling = input.feeling ?? currentStep.feeling;
    this.replaceCurrentStep(currentStep);
    this.emit({ type: 'step-completed', stepId: currentStep.id, stepIndex: this.state.currentStepIndex });
    this.advanceToNextExecutableStep(currentStep.id);
  }

  selectStep(stepIndex: number): void {
    const step = this.state.steps[stepIndex] ?? null;
    if (!step || !step.executable) {
      return;
    }

    this.clearRunningTimer();
    this.thresholdEmittedForStepId = null;
    this.updateState({
      currentStepIndex: stepIndex,
      currentStep: cloneStep(step),
      currentSegmentIndex: this.getCurrentSegmentIndex(step),
      remainingSeconds: this.getRemainingSeconds(step),
      elapsedSeconds: 0,
      status: 'idle',
      activeRepSet: null,
      activeTimedSegment: null,
    });
  }

  skipToNextStep(): void {
    const nextIndex = this.findNextExecutableIndex(this.state.steps, this.state.currentStepIndex + 1);
    if (nextIndex >= 0) {
      this.selectStep(nextIndex);
    }
  }

  skipToPreviousStep(): void {
    const prevIndex = this.findPreviousExecutableIndex(this.state.steps, this.state.currentStepIndex - 1);
    if (prevIndex >= 0) {
      this.selectStep(prevIndex);
    }
  }

  moveStep(fromIndex: number, toIndex: number): void {
    if (fromIndex === toIndex) {
      return;
    }

    const nextSteps = this.state.steps.map((step) => cloneStep(step));
    const [moved] = nextSteps.splice(fromIndex, 1);
    if (!moved) {
      return;
    }

    nextSteps.splice(toIndex, 0, moved);
    this.rebindStateToSteps(nextSteps, moved.id === this.state.currentStep?.id ? moved.id : this.state.currentStep?.id ?? null);
  }

  updateStep(stepIndex: number, next: UpdateStepInput): void {
    const step = this.state.steps[stepIndex];
    if (!step || !step.executable) {
      return;
    }

    const updated = this.buildUpdatedStep(step, next);
    const nextSteps = this.state.steps.map((current, index) => (index === stepIndex ? updated : cloneStep(current)));
    const targetId = this.state.currentStep?.id ?? null;
    this.rebindStateToSteps(nextSteps, targetId === step.id ? updated.id : targetId);
  }

  insertStep(stepIndex: number, next: ReplaceStepInput): void {
    const boundedIndex = Math.max(0, Math.min(stepIndex, this.state.steps.length));
    const contentIndex = this.syntheticContentIndex;
    this.syntheticContentIndex += 1;

    const inserted = normalizeContentStep(next.content, contentIndex);
    const nextSteps = this.state.steps.map((step) => cloneStep(step));
    nextSteps.splice(boundedIndex, 0, inserted);

    const currentId = this.state.currentStep?.id ?? null;
    const targetId = currentId ?? (inserted.executable ? inserted.id : this.findNextExecutableIdAfter(nextSteps, boundedIndex));
    this.rebindStateToSteps(nextSteps, targetId);
  }

  removeStep(stepIndex: number): void {
    if (stepIndex < 0 || stepIndex >= this.state.steps.length) {
      return;
    }

    const removedStep = this.state.steps[stepIndex];
    const nextSteps = this.state.steps.map((step) => cloneStep(step));
    nextSteps.splice(stepIndex, 1);

    if (removedStep.id === this.state.currentStep?.id) {
      this.clearRunningTimer();
      this.thresholdEmittedForStepId = null;
      const replacementId = this.findNextExecutableIdAfter(nextSteps, stepIndex)
        ?? this.findPreviousExecutableIdBefore(nextSteps, stepIndex - 1);
      this.rebindStateToSteps(nextSteps, replacementId);
      return;
    }

    this.rebindStateToSteps(nextSteps, this.state.currentStep?.id ?? null);
  }

  replaceStep(stepIndex: number, next: ReplaceStepInput): void {
    if (stepIndex < 0 || stepIndex >= this.state.steps.length) {
      return;
    }

    const replacement = normalizeContentStep(next.content, this.state.steps[stepIndex].contentIndex);
    const nextSteps = this.state.steps.map((step, index) => (index === stepIndex ? replacement : cloneStep(step)));
    const targetId = stepIndex === this.state.currentStepIndex
      ? (replacement.executable ? replacement.id : this.findCurrentExecutableIdAfterReplacement(nextSteps, replacement.id))
      : this.state.currentStep?.id ?? null;
    this.rebindStateToSteps(nextSteps, targetId);
  }

  private tickCurrentSegment(): void {
    const currentStep = this.getMutableCurrentStep();
    if (!currentStep || !isTimedWorkoutStep(currentStep)) {
      this.clearRunningTimer();
      return;
    }

    const remainingSeconds = Math.max(0, (this.state.remainingSeconds ?? 0) - 1);
    const elapsedSeconds = (this.state.elapsedSeconds ?? 0) + 1;

    if (remainingSeconds === this.countdownThresholdSeconds && this.thresholdEmittedForStepId !== currentStep.id) {
      this.thresholdEmittedForStepId = currentStep.id;
      this.emit({
        type: 'countdown-threshold-reached',
        stepId: currentStep.id,
        stepIndex: this.state.currentStepIndex,
        remainingSeconds,
      });
    }

    if (remainingSeconds === 0) {
      this.recordCurrentTimedSegment(currentStep, elapsedSeconds);
      return;
    }

    this.updateState({ remainingSeconds, elapsedSeconds });
  }

  private recordCurrentTimedSegment(step: TimedWorkoutControllerStep, measuredSeconds: number): void {
    this.clearRunningTimer();
    const currentSegmentIndex = this.getCurrentSegmentIndex(step);
    if (typeof currentSegmentIndex !== 'number' || currentSegmentIndex < 0) {
      this.advanceToNextExecutableStep(step.id);
      return;
    }

    const segment = step.segments[currentSegmentIndex];
    const nextStep = cloneTimedStep(step);
    nextStep.segments[currentSegmentIndex].measuredSeconds = measuredSeconds;
    this.replaceCurrentStep(nextStep);

    // Enter awaiting-timed-confirmation state so user can review and confirm
    this.updateState({
      status: 'awaiting-timed-confirmation',
      currentStep: cloneTimedStep(nextStep),
      currentSegmentIndex,
      remainingSeconds: 0,
      elapsedSeconds: measuredSeconds,
      lastResultSeconds: measuredSeconds,
      activeRepSet: null,
      activeTimedSegment: {
        segmentIndex: currentSegmentIndex,
        setNumber: segment.setNumber,
        side: segment.side,
        plannedSeconds: segment.plannedSeconds,
        measuredSeconds,
      },
    });
  }

  confirmCurrentTimedSegment(): void {
    const currentStep = this.getMutableCurrentStep();
    if (!currentStep || !isTimedWorkoutStep(currentStep)) {
      return;
    }

    const activeTimedSegment = this.state.activeTimedSegment;
    if (!activeTimedSegment || this.state.status !== 'awaiting-timed-confirmation') {
      return;
    }

    const measuredSeconds = activeTimedSegment.measuredSeconds;

    // Find next open segment
    const nextOpenSegmentIndex = this.getCurrentSegmentIndex(currentStep);
    if (typeof nextOpenSegmentIndex === 'number' && nextOpenSegmentIndex >= 0) {
      // More segments remain - go to next segment
      this.updateState({
        status: 'idle',
        currentStep: cloneTimedStep(currentStep),
        currentSegmentIndex: nextOpenSegmentIndex,
        remainingSeconds: this.getRemainingSeconds(currentStep),
        elapsedSeconds: 0,
        lastResultSeconds: measuredSeconds,
        activeRepSet: null,
        activeTimedSegment: null,
      });
      return;
    }

    // All segments done - advance to next exercise
    this.updateState({ activeTimedSegment: null });
    this.emit({ type: 'step-completed', stepId: currentStep.id, stepIndex: this.state.currentStepIndex });
    this.advanceToNextExecutableStep(currentStep.id, measuredSeconds);
  }

  private advanceToNextExecutableStep(_completedStepId: string, lastResultSeconds: number | null = null): void {
    const nextIndex = this.findNextExecutableIndex(this.state.steps, this.state.currentStepIndex + 1);
    if (nextIndex < 0) {
      this.updateState({
        currentStepIndex: -1,
        currentStep: null,
        currentSegmentIndex: null,
        remainingSeconds: null,
        elapsedSeconds: 0,
        status: 'completed',
        lastResultSeconds,
        activeRepSet: null,
        activeTimedSegment: null,
      });
      this.emit({ type: 'workout-completed', state: this.getState() });
      return;
    }

    const nextStep = this.state.steps[nextIndex];
    this.updateState({
      currentStepIndex: nextIndex,
      currentStep: cloneStep(nextStep),
      currentSegmentIndex: this.getCurrentSegmentIndex(nextStep),
      remainingSeconds: this.getRemainingSeconds(nextStep),
      elapsedSeconds: 0,
      status: 'idle',
      lastResultSeconds,
      activeRepSet: null,
      activeTimedSegment: null,
    });
  }

  private rebindStateToSteps(nextSteps: WorkoutControllerStep[], preferredStepId: string | null): void {
    const nextCurrentIndex = preferredStepId
      ? nextSteps.findIndex((step) => step.id === preferredStepId)
      : this.findNextExecutableIndex(nextSteps, 0);

    const reboundIndex = nextCurrentIndex >= 0 && nextSteps[nextCurrentIndex]?.executable
      ? nextCurrentIndex
      : this.findNextExecutableIndex(nextSteps, Math.max(0, nextCurrentIndex));

    const reboundStep = reboundIndex >= 0 ? nextSteps[reboundIndex] : null;

    this.state = {
      ...this.state,
      steps: nextSteps,
      currentStepIndex: reboundIndex,
      currentStep: reboundStep ? cloneStep(reboundStep) : null,
      currentSegmentIndex: this.getCurrentSegmentIndex(reboundStep),
      remainingSeconds: this.getRemainingSeconds(reboundStep),
      elapsedSeconds: reboundStep ? 0 : null,
      status: reboundStep ? 'idle' : 'completed',
      activeRepSet: null,
      activeTimedSegment: null,
    };

    this.emitStateChanged();
  }

  private replaceCurrentStep(nextStep: WorkoutControllerStep): void {
    const nextSteps = this.state.steps.map((step, index) => (
      index === this.state.currentStepIndex ? nextStep : step
    ));

    this.state = {
      ...this.state,
      steps: nextSteps,
      currentStep: cloneStep(nextStep),
    };

    this.emitStateChanged();
  }

  private getMutableCurrentStep(): WorkoutControllerStep | null {
    if (this.state.currentStepIndex < 0) {
      return null;
    }

    return this.state.steps[this.state.currentStepIndex] ?? null;
  }

  private getCurrentSegmentIndex(step: WorkoutControllerStep | null): number | null {
    if (!isTimedWorkoutStep(step)) {
      return null;
    }

    return step.segments.findIndex((segment) => segment.measuredSeconds === null);
  }

  private getRemainingSeconds(step: WorkoutControllerStep | null): number | null {
    if (!isTimedWorkoutStep(step)) {
      return null;
    }

    const nextSegmentIndex = this.getCurrentSegmentIndex(step);
    if (typeof nextSegmentIndex !== 'number' || nextSegmentIndex < 0) {
      return 0;
    }

    return step.segments[nextSegmentIndex].plannedSeconds;
  }

  private findCurrentExecutableIdAfterReplacement(nextSteps: WorkoutControllerStep[], replacedStepId: string): string | null {
    const replacementIndex = nextSteps.findIndex((step) => step.id === replacedStepId);
    const nextExecutableIndex = this.findNextExecutableIndex(nextSteps, replacementIndex);
    if (nextExecutableIndex >= 0) {
      return nextSteps[nextExecutableIndex].id;
    }

    return null;
  }

  private buildUpdatedStep(step: WorkoutControllerStep, next: UpdateStepInput): WorkoutControllerStep {
    if (isTimedWorkoutStep(step)) {
      const segmentPlannedSeconds = 'segmentPlannedSeconds' in next ? next.segmentPlannedSeconds : undefined;
      const updatedSegments = segmentPlannedSeconds
        ? step.segments.map((segment, index) => ({
            ...segment,
            plannedSeconds: Math.max(1, Math.round(segmentPlannedSeconds[index] ?? segment.plannedSeconds)),
          }))
        : step.segments.map((segment) => ({ ...segment }));

      return {
        ...step,
        label: typeof next.label === 'string' ? next.label : step.label,
        instructionText: 'instructionText' in next ? next.instructionText ?? null : step.instructionText,
        segments: updatedSegments,
      };
    }

    if (isRepWorkoutStep(step)) {
      return {
        ...step,
        label: typeof next.label === 'string' ? next.label : step.label,
        instructionText: 'instructionText' in next ? next.instructionText ?? null : step.instructionText,
        plannedSets: 'plannedSets' in next && typeof next.plannedSets === 'number'
          ? Math.max(1, Math.round(next.plannedSets))
          : step.plannedSets,
        plannedReps: 'plannedReps' in next
          ? (typeof next.plannedReps === 'number' ? Math.max(0, Math.round(next.plannedReps)) : null)
          : step.plannedReps,
        actualSets: 'actualSets' in next ? next.actualSets ?? null : step.actualSets,
        feeling: 'feeling' in next ? next.feeling ?? null : step.feeling,
      };
    }

    return cloneStep(step);
  }

  private findNextExecutableIdAfter(steps: WorkoutControllerStep[], startIndex: number): string | null {
    const nextIndex = this.findNextExecutableIndex(steps, startIndex);
    return nextIndex >= 0 ? steps[nextIndex].id : null;
  }

  private findPreviousExecutableIdBefore(steps: WorkoutControllerStep[], startIndex: number): string | null {
    for (let index = Math.min(startIndex, steps.length - 1); index >= 0; index -= 1) {
      if (steps[index].executable) {
        return steps[index].id;
      }
    }

    return null;
  }

  private findNextExecutableIndex(steps: WorkoutControllerStep[], startIndex: number): number {
    for (let index = Math.max(0, startIndex); index < steps.length; index += 1) {
      if (steps[index].executable) {
        return index;
      }
    }

    return -1;
  }

  private findPreviousExecutableIndex(steps: WorkoutControllerStep[], startIndex: number): number {
    for (let index = Math.min(steps.length - 1, startIndex); index >= 0; index -= 1) {
      if (steps[index].executable) {
        return index;
      }
    }

    return -1;
  }

  private clearRunningTimer(): void {
    if (this.timerId === null) {
      return;
    }

    this.clock.clearInterval(this.timerId);
    this.timerId = null;
  }

  private tickCurrentRepSet(): void {
    if (!this.state.activeRepSet) {
      this.clearRunningTimer();
      return;
    }

    const elapsedSeconds = (this.state.elapsedSeconds ?? 0) + 1;
    this.updateState({
      elapsedSeconds,
      activeRepSet: {
        ...this.state.activeRepSet,
        elapsedSeconds,
      },
    });
  }

  private updateState(patch: Partial<WorkoutControllerState>): void {
    this.state = {
      ...this.state,
      ...patch,
    };
    this.emitStateChanged();
  }

  private emitStateChanged(): void {
    this.emit({ type: 'state-changed', state: this.getState() });
  }

  private emit(event: WorkoutControllerEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}