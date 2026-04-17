import './index.css';

export type {
  CompactWorkoutModel,
  CompactUiRenderers,
  CompactRow,
  CompactStatKind,
  CompactStatPart,
  CompactStatTone,
  CompactStatValue,
  CompactSummaryRow,
  CompactPhaseRow,
  CompactSectionRow,
  CompactExerciseRow,
  CompactPyramidRow,
  CompactPyramidSet,
  CompactMoveRow,
  CompactRunRow,
  CompactDurationRow,
  CompactSplitRow,
  CompactTextRow,
  CompactUnknownRow,
} from './lib/types';

export { Badge } from './components/atoms/Badge';
export { DurationStepper, formatDurationValue } from './components/atoms/DurationStepper';
export { FieldLabel } from './components/atoms/FieldLabel';
export { InlineOperator } from './components/atoms/InlineOperator';
export { NumericStepper } from './components/atoms/NumericStepper';
export { StatChip } from './components/atoms/StatChip';

export { WorkoutHeader } from './components/molecules/WorkoutHeader';
export { CompactRowView } from './components/molecules/CompactRowView';
export type { CompactRowViewProps } from './components/molecules/CompactRowView';
export {
  Summary,
  Phase,
  Section,
  Custom,
  Exercise,
  PyramidRow,
  MoveRow,
  Run,
  Duration,
  SplitRow,
  Text,
  Unknown,
} from './components/molecules/CompactRowParts';
export type { CompactRowInput } from './components/molecules/CompactRowParts';
export { ActiveDurationEditControls } from './components/molecules/ActiveDurationEditControls';
export { ActiveDurationTimer } from './components/molecules/ActiveDurationTimer';
export { ActiveRepEditControls } from './components/molecules/ActiveRepEditControls';
export { CompactRowEdit } from './components/molecules/CompactRowEdit';

export { CompactBlogView } from './components/organisms/CompactBlogView';
export type { CompactBlogHeaderOptions } from './components/organisms/CompactBlogView';
export { CompactView } from './components/organisms/CompactView';
export type { CompactRenderableData, CompactViewProps } from './components/organisms/CompactView';
export { CompactBlogEditor } from './components/organisms/CompactBlogEditor';
export { ActiveWorkoutSession } from './components/organisms/ActiveWorkoutSession';
export type { ActiveWorkoutSessionProps } from './components/organisms/ActiveWorkoutSession';
export { workoutsFromCompact } from './lib/workoutsFromCompact';
export {
  compactRowFromParsedContent,
  compactRowsFromParsedContent,
  compactWorkoutFromParsedWorkout,
  compactWorkoutsFromDocument,
} from './lib/parsedRowMapping';
export { getDistanceStepMeters, getNextDistanceMetersValue, getNextWeightValue } from './lib/stepperRules';
export { compactStatFromText, statFromDurationRow, statFromExerciseRow, statFromRunRow } from './lib/formatters';
export { VirtualClock, RealClock } from './lib/controller/VirtualClock';
export { WorkoutTimingController } from './lib/controller/WorkoutTimingController';
export { WorkoutSessionController } from './lib/controller/WorkoutSessionController';
export type {
  ActiveRepSetState,
  CompleteRepStepInput,
  RepWorkoutControllerStep,
  RepWorkoutSetResult,
  TimedWorkoutControllerStep,
  UpdateStepInput,
  WorkoutControllerEvent,
  WorkoutControllerState,
  WorkoutControllerStatus,
  WorkoutControllerStep,
} from './lib/controller/workout-controller-types';
export type {
  WorkoutSessionControllerOptions,
  WorkoutSessionEvent,
  WorkoutSessionState,
  WorkoutSessionSummary,
} from './lib/controller/workout-session-controller-types';
