// Entry point for NPM export (no CSS import - CSS is shipped separately)
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
  CircuitRow,
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
export { workoutsFromCompact } from './lib/workoutsFromCompact';
export {
  compactRowFromParsedContent,
  compactRowsFromParsedContent,
  compactWorkoutFromParsedWorkout,
  compactWorkoutsFromDocument,
} from './lib/parsedRowMapping';
export { getDistanceStepMeters, getNextDistanceMetersValue, getNextWeightValue } from './lib/stepperRules';
export { compactStatFromText, statFromDurationRow, statFromExerciseRow, statFromRunRow } from './lib/formatters';
