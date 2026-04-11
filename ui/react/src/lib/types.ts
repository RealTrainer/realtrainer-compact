export type CompactRow =
  | CompactSummaryRow
  | CompactPhaseRow
  | CompactSectionRow
  | CompactCustomRow
  | CompactExerciseRow
  | CompactPyramidRow
  | CompactMoveRow
  | CompactRunRow
  | CompactDurationRow
  | CompactSplitRow
  | CompactTextRow
  | CompactUnknownRow;

export interface CompactWorkoutModel {
  title: string;
  date: string;
  tags: string[];
  emojis?: string;
  points?: number;
  rows: CompactRow[];
}

interface CompactBaseRow {
  id: string;
  type: string;
}

export interface CompactSummaryRow extends CompactBaseRow {
  type: 'summary';
  text: string;
}

export interface CompactPhaseRow extends CompactBaseRow {
  type: 'phase';
  number: number | null;
  name: string;
  details?: string;
}

export interface CompactSectionRow extends CompactBaseRow {
  type: 'section';
  name: string;
}

export interface CompactCustomRow extends CompactBaseRow {
  type: 'custom';
  name: string;
  value: unknown;
  unit?: string | null;
}

export interface CompactExerciseRow extends CompactBaseRow {
  type: 'exercise';
  name: string;
  sets: number;
  reps: number;
  weightKg?: number;
  note?: string;
}

export interface CompactPyramidSet {
  reps: number;
  weightKg?: number;
}

export interface CompactPyramidRow extends CompactBaseRow {
  type: 'pyramid';
  name: string;
  sets: CompactPyramidSet[];
  note?: string;
}

export interface CompactDistance {
  value?: number | null;
  valueMax?: number | null;
  unit?: string | null;
}

export interface CompactDurationValue {
  value?: number | null;
  unit?: string | null;
}

export interface CompactSplitPace {
  minutes: number;
  seconds: number;
  perDistance?: {
    value?: number | null;
    unit?: string | null;
  };
}

export interface CompactSplitRow extends CompactBaseRow {
  type: 'split';
  // Structured split fields (RealTrainer-compatible)
  distance?: CompactDistance | null;
  duration?: CompactDurationValue | null;
  pace?: CompactSplitPace | null;
  intensity?: unknown;
  hr?: number | null;
  customFields?: Array<{ name: string; value: unknown; unit?: string | null }> | null;
  note?: string | null;
  splits?: CompactSplitRow[] | null;
  // Legacy flattened support
  depth?: number;
  text?: string;
}

export interface CompactMoveRow extends CompactBaseRow {
  type: 'move';
  sport?: string | null;
  sets?: number;
  count?: number;
  countMax?: number | null;
  distance?: CompactDistance | null;
  duration?: CompactDurationValue | null;
  steps?: number | null;
  intensity?: unknown;
  recovery?: {
    value?: number | null;
    max?: number | null;
    valueMax?: number | null;
    unit?: string | null;
    text?: string | null;
  } | null;
  note?: string | null;
  description?: string | null;
  customFields?: Array<{ name: string; value: unknown; unit?: string | null }> | null;
  splits?: CompactSplitRow[] | null;
}

export interface CompactRunRow extends CompactBaseRow {
  // Legacy row shape kept for compatibility; parser-first mapping should use type 'move'
  type: 'run';
  distanceValue?: number;
  distanceUnit?: 'm' | 'km';
  durationMin?: number;
  note?: string;
}

export interface CompactDurationRow extends CompactBaseRow {
  type: 'duration';
  value: number;
  unit: 'min' | 's';
  description?: string;
}

export interface CompactTextRow extends CompactBaseRow {
  type: 'text';
  text: string;
}

export interface CompactUnknownRow extends CompactBaseRow {
  type: 'unknown';
  raw: string;
}
