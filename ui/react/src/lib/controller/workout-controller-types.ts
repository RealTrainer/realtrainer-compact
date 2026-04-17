import type {
  Content as ParsedContent,
  DurationBlock as ParsedDurationBlock,
  Exercise as ParsedExercise,
  Section as ParsedSection,
  Text as ParsedText,
  Workout as ParsedWorkout,
} from '@parser/types';

export type WorkoutControllerStatus = 'idle' | 'running' | 'paused' | 'awaiting-input' | 'awaiting-timed-confirmation' | 'completed';

export type WorkoutFeeling = 'easy' | 'moderate' | 'hard';

export type TimedStepKind = 'timed-exercise' | 'timed-duration';

export type WorkoutControllerStepKind = TimedStepKind | 'rep-exercise' | 'section' | 'text' | 'unsupported';

export interface WorkoutTimedSegment {
  index: number;
  setNumber: number;
  side: 'single' | 'left' | 'right';
  plannedSeconds: number;
  measuredSeconds: number | null;
}

interface BaseWorkoutControllerStep {
  id: string;
  contentIndex: number;
  kind: WorkoutControllerStepKind;
  executable: boolean;
  label: string;
  instructionText: string | null;
  original: ParsedContent;
}

export interface TimedWorkoutControllerStep extends BaseWorkoutControllerStep {
  kind: TimedStepKind;
  executable: true;
  original: ParsedExercise | ParsedDurationBlock;
  segments: WorkoutTimedSegment[];
}

export interface RepWorkoutControllerStep extends BaseWorkoutControllerStep {
  kind: 'rep-exercise';
  executable: true;
  original: ParsedExercise;
  plannedSets: number;
  plannedReps: number | null;
  completedSets: number;
  actualSets: number | null;
  feeling: WorkoutFeeling | null;
  setResults: RepWorkoutSetResult[];
}

export interface RepWorkoutSetResult {
  setNumber: number;
  plannedReps: number | null;
  actualReps: number | null;
  elapsedSeconds: number | null;
}

export interface ActiveRepSetState {
  setNumber: number;
  plannedReps: number | null;
  elapsedSeconds: number;
  status: 'running' | 'awaiting-confirmation';
}

export interface ActiveTimedSegmentState {
  segmentIndex: number;
  setNumber: number;
  side: 'single' | 'left' | 'right';
  plannedSeconds: number;
  measuredSeconds: number;
}

export interface SectionWorkoutControllerStep extends BaseWorkoutControllerStep {
  kind: 'section';
  executable: false;
  original: ParsedSection;
}

export interface TextWorkoutControllerStep extends BaseWorkoutControllerStep {
  kind: 'text';
  executable: false;
  original: ParsedText;
}

export interface UnsupportedWorkoutControllerStep extends BaseWorkoutControllerStep {
  kind: 'unsupported';
  executable: false;
}

export type WorkoutControllerStep =
  | TimedWorkoutControllerStep
  | RepWorkoutControllerStep
  | SectionWorkoutControllerStep
  | TextWorkoutControllerStep
  | UnsupportedWorkoutControllerStep;

export interface WorkoutControllerState {
  workoutTitle: string | null;
  steps: WorkoutControllerStep[];
  currentStepIndex: number;
  currentStep: WorkoutControllerStep | null;
  status: WorkoutControllerStatus;
  currentSegmentIndex: number | null;
  remainingSeconds: number | null;
  elapsedSeconds: number | null;
  lastResultSeconds: number | null;
  activeRepSet: ActiveRepSetState | null;
  activeTimedSegment: ActiveTimedSegmentState | null;
}

export type WorkoutControllerEvent =
  | { type: 'state-changed'; state: WorkoutControllerState }
  | { type: 'step-started'; stepId: string; stepIndex: number }
  | { type: 'step-completed'; stepId: string; stepIndex: number }
  | { type: 'workout-completed'; state: WorkoutControllerState }
  | { type: 'countdown-threshold-reached'; stepId: string; stepIndex: number; remainingSeconds: number };

export interface WorkoutControllerOptions {
  countdownThresholdSeconds?: number;
}

export interface CompleteRepStepInput {
  actualSets?: number;
  actualReps?: number | null;
  feeling?: WorkoutFeeling | null;
}

export interface ReplaceStepInput {
  content: ParsedContent;
}

export interface UpdateTimedStepInput {
  label?: string;
  instructionText?: string | null;
  segmentPlannedSeconds?: number[];
}

export interface UpdateRepStepInput {
  label?: string;
  instructionText?: string | null;
  plannedSets?: number;
  plannedReps?: number | null;
  actualSets?: number | null;
  feeling?: WorkoutFeeling | null;
}

export type UpdateStepInput = UpdateTimedStepInput | UpdateRepStepInput;

export interface WorkoutControllerLike {
  getState(): WorkoutControllerState;
  subscribe(listener: (event: WorkoutControllerEvent) => void): () => void;
  startCurrent(): void;
  pause(): void;
  resume(): void;
  stopCurrent(): void;
  replaceCurrentStepContent(content: ParsedContent): void;
  completeCurrentTimedExercise(exercise: ParsedExercise): void;
  completeCurrentRepStep(input?: CompleteRepStepInput): void;
  selectStep(stepIndex: number): void;
  updateStep(stepIndex: number, next: UpdateStepInput): void;
  insertStep(stepIndex: number, next: ReplaceStepInput): void;
  removeStep(stepIndex: number): void;
  moveStep(fromIndex: number, toIndex: number): void;
  replaceStep(stepIndex: number, next: ReplaceStepInput): void;
}

export type ParsedWorkoutLike = ParsedWorkout;

export function isTimedWorkoutStep(step: WorkoutControllerStep | null): step is TimedWorkoutControllerStep {
  return Boolean(step && step.executable && (step.kind === 'timed-exercise' || step.kind === 'timed-duration'));
}

export function isRepWorkoutStep(step: WorkoutControllerStep | null): step is RepWorkoutControllerStep {
  return Boolean(step && step.executable && step.kind === 'rep-exercise');
}