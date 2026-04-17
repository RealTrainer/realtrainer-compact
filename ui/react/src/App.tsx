import { useEffect, useMemo, useState } from 'react';
import { Badge } from './components/atoms/Badge';
import { DurationStepper, formatDurationValue } from './components/atoms/DurationStepper';
import { FieldLabel } from './components/atoms/FieldLabel';
import { NumericStepper } from './components/atoms/NumericStepper';
import { StatChip } from './components/atoms/StatChip';
import { ActiveDurationEditControls } from './components/molecules/ActiveDurationEditControls';
import { ActiveDurationTimer } from './components/molecules/ActiveDurationTimer';
import { ActiveRepEditControls } from './components/molecules/ActiveRepEditControls';
import { CompactRowEdit } from './components/molecules/CompactRowEdit';
import {
  Custom,
  Duration,
  Exercise,
  MoveRow,
  Phase,
  PyramidRow,
  Run,
  Section,
  SplitRow,
  Summary,
  Text,
  Unknown,
} from './components/molecules/CompactRowParts';
import { CompactRowView } from './components/molecules/CompactRowView';
import { WorkoutHeader } from './components/molecules/WorkoutHeader';
import { ActiveWorkoutSession } from './components/organisms/ActiveWorkoutSession';
import { CompactBlogEditor } from './components/organisms/CompactBlogEditor';
import { CompactBlogView } from './components/organisms/CompactBlogView';
import { CompactView } from './components/organisms/CompactView';
import { compactStatFromText, statFromExerciseRow } from './lib/formatters';
import { getNextDistanceMetersValue, getNextWeightValue } from './lib/stepperRules';
import type { CompactExerciseRow, CompactRow, CompactRunRow, CompactWorkoutModel } from './lib/types';
import { parseCompact } from '@parser';
import type { DurationBlock as ParsedDurationBlock, Exercise as ParsedExercise } from '@parser/types';
import { activeWorkoutSessionCompactExample, sampleWorkout } from './preview/fixtures';
import sampleCompactText from '../../../sample.compact?raw';
import minimonsterCompactText from '../../../data/minimonster.compact?raw';
import { workoutsFromCompact } from './preview/fromCompact';
import { VirtualClock } from './lib/controller/VirtualClock';

type SupportedAtomEvent = 'onClick' | 'onTouchStart';

interface BadgeExample {
  label: string;
  tone?: 'default' | 'accent' | 'good' | 'warn' | 'danger';
  children: string;
  description: string;
}

interface FieldLabelExample {
  label: string;
  children: string;
  htmlFor: string;
  description: string;
}

interface WorkoutHeaderExampleProps {
  title?: string;
  date?: string;
  tags?: string[];
  emojis?: string;
  points?: number;
}

const durationTimerPlaybackRates = [1, 2, 5] as const;

type GallerySectionId =
  | 'overview'
  | 'atom-badge'
  | 'atom-numeric-stepper'
  | 'atom-duration-stepper'
  | 'atom-field-label'
  | 'atom-stat-chip'
  | 'molecule-active-duration-edit'
  | 'molecule-active-duration-timer'
  | 'molecule-active-rep-edit'
  | 'molecule-workout-header'
  | 'molecule-compact-row-view'
  | 'molecule-compact-row-edit'
  | 'row-summary'
  | 'row-phase'
  | 'row-section'
  | 'row-custom'
  | 'row-exercise'
  | 'row-pyramid'
  | 'row-move'
  | 'row-run'
  | 'row-duration'
  | 'row-split'
  | 'row-text'
  | 'row-unknown'
  | 'organism-blog-view'
  | 'organism-compact-view'
  | 'organism-blog-editor'
  | 'organism-active-workout-session'
  | 'playground-compact-input'
  | 'playground-minimonster'
  | 'playground-workouts';

interface GalleryNavItem {
  id: GallerySectionId;
  label: string;
  kind: 'overview' | 'atom' | 'molecule' | 'organism' | 'playground';
  description: string;
}

const galleryNav: Array<{ title: string; items: GalleryNavItem[] }> = [
  {
    title: 'Yleiset komponentit',
    items: [
      { id: 'overview', label: 'Gallerian aloitus', kind: 'overview', description: 'Rakenne, käyttö ja navigointi' },
      { id: 'atom-badge', label: 'Badge', kind: 'atom', description: 'Pill badge eri tone-varianteilla' },
      { id: 'atom-numeric-stepper', label: 'NumericStepper', kind: 'atom', description: 'Plus/miinus numerosäädin adaptiivisilla askelilla' },
      { id: 'atom-duration-stepper', label: 'DurationStepper', kind: 'atom', description: 'Kestoeditori min+sek tuella' },
      { id: 'atom-field-label', label: 'FieldLabel', kind: 'atom', description: 'Lomakekenttien pieni otsake' },
      { id: 'atom-stat-chip', label: 'StatChip', kind: 'atom', description: 'Korostettu numerolabel' },
      { id: 'molecule-active-duration-edit', label: 'ActiveDurationEditControls', kind: 'molecule', description: 'Sarjat + kesto (+ bilateral) editori' },
      { id: 'molecule-active-duration-timer', label: 'ActiveDurationTimer', kind: 'molecule', description: 'Sarjakohtainen keston kellotus mitatuilla ajoilla' },
      { id: 'molecule-active-rep-edit', label: 'ActiveRepEditControls', kind: 'molecule', description: 'Sarjat/toistot/paino editori' },
      { id: 'molecule-workout-header', label: 'WorkoutHeader', kind: 'molecule', description: 'Harjoituksen identiteettiotsake' },
      { id: 'molecule-compact-row-view', label: 'CompactRowView', kind: 'molecule', description: 'Yksittäisen rivin renderer' },
      { id: 'molecule-compact-row-edit', label: 'CompactRowEdit', kind: 'molecule', description: 'Yksittäisen rivin editori' },
    ],
  },
  {
    title: 'Riviexportit',
    items: [
      { id: 'row-summary', label: 'Summary', kind: 'molecule', description: 'Yksirivinen yhteenveto' },
      { id: 'row-phase', label: 'Phase', kind: 'molecule', description: 'Vaiheotsikko numerolla' },
      { id: 'row-section', label: 'Section', kind: 'molecule', description: 'Ryhmittelevä osio-otsikko' },
      { id: 'row-custom', label: 'Custom', kind: 'molecule', description: 'Mukautettu mittariarvo' },
      { id: 'row-exercise', label: 'Exercise', kind: 'molecule', description: 'Perusvoimarivi' },
      { id: 'row-pyramid', label: 'PyramidRow', kind: 'molecule', description: 'Pyramidi / sarjaporras' },
      { id: 'row-move', label: 'MoveRow', kind: 'molecule', description: 'Liikuntasuoritus matkoilla ja splitteilla' },
      { id: 'row-run', label: 'Run', kind: 'molecule', description: 'Legacy run -rivi' },
      { id: 'row-duration', label: 'Duration', kind: 'molecule', description: 'Kestochip tai kuvaus' },
      { id: 'row-split', label: 'SplitRow', kind: 'molecule', description: 'Valiaika / nested split' },
      { id: 'row-text', label: 'Text', kind: 'molecule', description: 'Vapaamuotoinen tekstikappale' },
      { id: 'row-unknown', label: 'Unknown', kind: 'molecule', description: 'Tuntematon fallback-rivi' },
    ],
  },
  {
    title: 'Koosteet',
    items: [
      { id: 'organism-blog-view', label: 'CompactBlogView', kind: 'organism', description: 'Koko workout-kortin view' },
      { id: 'organism-compact-view', label: 'CompactView', kind: 'organism', description: 'Parseri-ensin renderer tekstille tai AST:lle' },
      { id: 'organism-blog-editor', label: 'CompactBlogEditor', kind: 'organism', description: 'Koko workout-kortin editori' },
      { id: 'organism-active-workout-session', label: 'ActiveWorkoutSession', kind: 'organism', description: 'Monen harjoituksen aktiivinen sessionakyma Active-kontrolleilla' },
      { id: 'playground-compact-input', label: 'COMPACT Playground', kind: 'playground', description: 'Pasteta COMPACT, renderoi ja exportoi JSON' },
      { id: 'playground-minimonster', label: 'MINIMONSTER', kind: 'playground', description: 'Massiivinen all-in-one referenssitreeni' },
      { id: 'playground-workouts', label: 'Sample.compact', kind: 'playground', description: 'Nykyinen data-driven playground' },
    ],
  },
];

const gallerySectionIds = new Set<GallerySectionId>(galleryNav.flatMap((group) => group.items.map((item) => item.id)));

const compactPlaygroundExample = `[2026-04-10T15:35+03] ## Uintiharjoitus (Rintauinti)
Tags uinti, kestävyys, kuntoutus
Emojis 🏊‍♂️🌊
Derived endurance.zone2_minutes 15|min basis:entity confidence:90% source:heart-rate goodness:5
Derived strength.neural_stress 5|score basis:entity confidence:95% source:duration+type goodness:5
Custom Effort 5|Moderate
Custom Altaan-pituus 50|m
Custom Kalorit 239|kcal
Custom Syke-keski 131|bpm
Custom Syke-max 147|bpm
Custom Pituudet 10
Run "rintauinti" 14.7min 500m | Tampere
> 100m 2'58"/100m
> 100m 2'54"/100m
> 100m 2'53"/100m
> 100m 3'06"/100m
> 100m 2'49"/100m
`;

const componentInterfaces: Record<GallerySectionId, string> = {
  overview: `type GallerySectionId =
  | 'overview'
  | 'atom-badge'
  | 'atom-field-label'
  | 'atom-stat-chip'
  | 'molecule-workout-header'
  | 'molecule-compact-row-view'
  | 'molecule-compact-row-edit'
  | 'row-summary'
  | 'row-phase'
  | 'row-section'
  | 'row-custom'
  | 'row-exercise'
  | 'row-pyramid'
  | 'row-move'
  | 'row-run'
  | 'row-duration'
  | 'row-split'
  | 'row-text'
  | 'row-unknown'
  | 'organism-blog-view'
  | 'organism-blog-editor'
  | 'organism-compact-view'
  | 'organism-active-workout-session'
  | 'playground-compact-input'
  | 'playground-minimonster'
  | 'playground-workouts';`,
  'atom-badge': `interface BadgeProps {
  children: React.ReactNode;
  tone?: 'default' | 'accent' | 'good' | 'warn' | 'danger';
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  onTouchStart?: React.TouchEventHandler<HTMLSpanElement>;
}`,
  'atom-numeric-stepper': `interface NumericStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  suffix?: string;
  computeNextValue?: (current: number, direction: 'increase' | 'decrease') => number;
}`,
  'atom-duration-stepper': `interface DurationStepperProps {
  value: number;
  onChange: (value: number) => void;
  precision?: 'min' | 'sec';
  minuteControlsMode?: 'auto' | 'always' | 'never';
  minuteStepMinutes?: number;
  secondStepSeconds?: number;
  showSecondControlsWithMinutes?: boolean;
}`,
  'atom-field-label': `interface FieldLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  onTouchStart?: React.TouchEventHandler<HTMLLabelElement>;
}`,
  'atom-stat-chip': `interface CompactStatValue {
  parts: CompactStatPart[];
  ariaLabel?: string;
}

interface StatChipProps {
  stat: CompactStatValue;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  onTouchStart?: React.TouchEventHandler<HTMLSpanElement>;
}`,
  'molecule-active-duration-edit': `interface ActiveDurationEditControlsProps {
  entity: Exercise | DurationBlock;
  onChange: (next: Exercise | DurationBlock) => void;
  onMarkDone?: () => void;
}`,
  'molecule-active-duration-timer': `interface ActiveDurationTimerProps {
  entity: Exercise;
  onChange?: (next: Exercise) => void;
  onReady?: (next: Exercise) => void;
  onClose?: () => void;
  autoStart?: boolean;
  clock?: Clock;
}`,
  'molecule-active-rep-edit': `interface ActiveRepEditControlsProps {
  entity: Exercise;
  onChange: (next: Exercise) => void;
}`,
  'molecule-workout-header': `interface WorkoutHeaderProps {
  title?: string;
  date?: string;
  tags?: string[];
  emojis?: string;
  points?: number;
}`,
  'molecule-compact-row-view': `interface CompactRowViewProps {
  row: CompactRowInput;
  renderers?: CompactUiRenderers;
}`,
  'molecule-compact-row-edit': `interface CompactRowEditProps {
  row: CompactRow;
  onChange: (next: CompactRow) => void;
}`,
  'row-summary': `type SummaryProps = {
  row: CompactSummaryRow | Extract<Content, { type: 'summary' }>;
};`,
  'row-phase': `type PhaseProps = {
  row: CompactPhaseRow | Extract<Content, { type: 'phase' }>;
};`,
  'row-section': `type SectionProps = {
  row: CompactSectionRow | Extract<Content, { type: 'section' }>;
};`,
  'row-custom': `type CustomProps = {
  row: CompactCustomRow | Extract<Content, { type: 'custom' }>;
};`,
  'row-exercise': `type ExerciseProps = {
  row: CompactExerciseRow | Extract<Content, { type: 'exercise' }>;
};`,
  'row-pyramid': `type PyramidRowProps = {
  row: CompactPyramidRow | Extract<Content, { type: 'pyramid' }>;
};`,
  'row-move': `type MoveRowProps = {
  row: CompactMoveRow | Extract<Content, { type: 'move' }>;
};`,
  'row-run': `type RunProps = {
  row: CompactRunRow | Extract<Content, { type: 'run' }>;
};`,
  'row-duration': `type DurationProps = {
  row: CompactDurationRow | Extract<Content, { type: 'duration' }>;
};`,
  'row-split': `type SplitRowProps = {
  row: CompactSplitRow | Extract<Content, { type: 'split' }>;
  depth?: number;
  keyPrefix?: string;
};`,
  'row-text': `type TextProps = {
  row: CompactTextRow | Extract<Content, { type: 'text' }>;
};`,
  'row-unknown': `type UnknownProps = {
  row: CompactUnknownRow | Extract<Content, { type: 'unknown' }>;
};`,
  'organism-blog-view': `type RowInteractionEvent = 'click' | 'press' | 'hover';

interface CompactBlogHeaderOptions {
  showTitle?: boolean;
  showDate?: boolean;
  showTags?: boolean;
  showEmojis?: boolean;
  showPoints?: boolean;
  showMetaStrip?: boolean;
}

interface CompactBlogViewProps {
  workout: CompactWorkoutModel;
  onRowInteraction?: (rowId: string, event: RowInteractionEvent) => void;
  showHeader?: boolean;
  headerOptions?: CompactBlogHeaderOptions;
  renderers?: CompactUiRenderers;
}`,
  'organism-compact-view': `type CompactRenderableData =
  | string
  | ParseResult
  | ParseFailure
  | Document
  | Workout
  | CompactWorkoutModel
  | CompactWorkoutModel[];

interface CompactViewProps {
  data: CompactRenderableData;
  workoutIndex?: number;
  showHeader?: boolean;
  headerOptions?: CompactBlogHeaderOptions;
  onRowInteraction?: (rowId: string, event: RowInteractionEvent) => void;
  renderers?: CompactUiRenderers;
  emptyState?: ReactNode;
  errorFallback?: (message: string) => ReactNode;
}`,
  'organism-blog-editor': `interface CompactBlogEditorProps {
  workout: CompactWorkoutModel;
  onChange: (next: CompactWorkoutModel) => void;
}`,
  'organism-active-workout-session': `interface ActiveWorkoutSessionProps {
  workouts: Workout[];
  clock?: Clock;
  autoStartTimedSteps?: boolean;
  onSessionComplete?: (state: WorkoutSessionState) => void;
}`,
  'playground-compact-input': `const parseResult = parseCompact(input);
const preview = workoutsFromCompact(input);

if (parseResult.success) {
  downloadJson(parseResult.document);
}`,
  'playground-minimonster': `const minimonster = workoutsFromCompact(minimonsterCompactText).workouts[0];`,
  'playground-workouts': `const parsed = workoutsFromCompact(sampleCompactText);
const sourceWorkouts = parsed.workouts.length > 0 ? parsed.workouts : [sampleWorkout];
const minimonster = workoutsFromCompact(minimonsterCompactText).workouts[0];`,
};

function SectionEyebrow({ kind }: { kind: GalleryNavItem['kind'] }) {
  const map = {
    overview: 'overview',
    atom: 'atom',
    molecule: 'molecule',
    organism: 'organism',
    playground: 'playground',
  } as const;

  return <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300/80">{map[kind]}</span>;
}

function GalleryCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rt-card space-y-4 p-5 sm:p-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-50">{title}</h2>
        {subtitle && <p className="max-w-2xl text-sm text-slate-400">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function InterfaceBlock({ value }: { value: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
      <code>{value}</code>
    </pre>
  );
}

function NpmImportBlock({ imports }: { imports: string[] }) {
  return (
    <pre className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
      <code>{`import { ${imports.join(', ')} } from 'realtrainer-compact/ui';`}</code>
    </pre>
  );
}

function PreviewSurface({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-slate-700/80 bg-slate-950/70 p-4">{children}</div>;
}

function TabView({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: Array<{ id: string; label: string; content: React.ReactNode }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60">
      <div className="flex flex-wrap gap-2 border-b border-slate-800 p-3">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'border border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="p-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

function ExampleIntro({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <PreviewSurface>
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Esimerkki</p>
        <div>
          <p className="text-sm text-slate-400">{title}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
          {children}
        </div>
      </div>
    </PreviewSurface>
  );
}

function RowExportShowcase({
  title,
  subtitle,
  exampleTitle,
  importName,
  interfaceValue,
  code,
  children,
}: {
  title: string;
  subtitle: string;
  exampleTitle: string;
  importName: string;
  interfaceValue: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <GalleryCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        <ExampleIntro title={exampleTitle}>{children}</ExampleIntro>
        <NpmImportBlock imports={[importName]} />
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)]">
          <PreviewSurface>
            <div className="space-y-4">
              {children}
              <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                <code>{code}</code>
              </pre>
            </div>
          </PreviewSurface>
          <InterfaceBlock value={interfaceValue} />
        </div>
      </div>
    </GalleryCard>
  );
}

function pickSampleRow<TType extends CompactRow['type']>(
  type: TType,
  fallback: Extract<CompactRow, { type: TType }>,
): Extract<CompactRow, { type: TType }> {
  return sampleWorkout.rows.find((row): row is Extract<CompactRow, { type: TType }> => row.type === type) ?? fallback;
}

function JsonEditorPanel({
  title,
  description,
  value,
  onChange,
  onApply,
  error,
}: {
  title: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
  error?: string | null;
}) {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{title}</p>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
        <button
          type="button"
          className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-200 transition hover:border-orange-400 hover:bg-orange-500/20"
          onClick={onApply}
        >
          Renderoi JSON
        </button>
      </div>
      <textarea
        className="min-h-[280px] w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-4 font-mono text-xs leading-6 text-slate-200 outline-none transition focus:border-orange-400"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
      />
      {error && <p className="text-sm text-rose-300">{error}</p>}
    </div>
  );
}

function stringifyExample(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function getSectionFromHash(hash: string): GallerySectionId | null {
  const normalizedHash = hash.replace(/^#/, '') as GallerySectionId;
  return gallerySectionIds.has(normalizedHash) ? normalizedHash : null;
}

function downloadJsonFile(fileName: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = fileName;
  anchor.click();

  URL.revokeObjectURL(url);
}

function pickWorkoutByTitle(workouts: CompactWorkoutModel[], needle: string): CompactWorkoutModel | undefined {
  const normalizedNeedle = needle.trim().toLowerCase();

  return workouts.find((workout) => workout.title.trim().toLowerCase().includes(normalizedNeedle))
    ?? workouts.reduce<CompactWorkoutModel | undefined>((best, workout) => {
      if (!best) {
        return workout;
      }

      return workout.rows.length > best.rows.length ? workout : best;
    }, undefined);
}

function NavTone({ kind }: { kind: GalleryNavItem['kind'] }) {
  if (kind === 'atom') {
    return 'bg-emerald-500/15 text-emerald-300';
  }
  if (kind === 'molecule') {
    return 'bg-sky-500/15 text-sky-300';
  }
  if (kind === 'organism') {
    return 'bg-violet-500/15 text-violet-300';
  }
  if (kind === 'playground') {
    return 'bg-amber-500/15 text-amber-300';
  }
  return 'bg-slate-700/60 text-slate-300';
}

function App() {
  const parsed = workoutsFromCompact(sampleCompactText);
  const minimonsterParsed = workoutsFromCompact(minimonsterCompactText);
  const sourceWorkouts = parsed.workouts.length > 0 ? parsed.workouts : [sampleWorkout];
  const minimonsterWorkout = pickWorkoutByTitle(minimonsterParsed.workouts, 'minimonster');

  const [activeSection, setActiveSection] = useState<GallerySectionId>(() => {
    if (typeof window === 'undefined') {
      return 'overview';
    }

    return getSectionFromHash(window.location.hash) ?? 'overview';
  });
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [workout, setWorkout] = useState<CompactWorkoutModel>(sourceWorkouts[0]);
  const [editableRow, setEditableRow] = useState<CompactRow>(sampleWorkout.rows.find((row) => row.type === 'exercise') ?? sampleWorkout.rows[0]);
  const [atomEventLog, setAtomEventLog] = useState<string[]>([]);
  const initialWorkoutHeaderProps: WorkoutHeaderExampleProps = {
    title: sampleWorkout.title,
    date: sampleWorkout.date,
    tags: sampleWorkout.tags,
    emojis: sampleWorkout.emojis,
    points: sampleWorkout.points,
  };
  const initialStatLabRow: CompactExerciseRow = {
    id: 'stat-lab-row',
    type: 'exercise',
    name: 'Bulgarian Split Squat',
    sets: 3,
    reps: 10,
    repsRight: 10,
    weightKg: 16,
    recovery: { value: 60, unit: 'sec' },
    note: 'etu jalka korokkeelle',
  };
  const initialViewRow = sampleWorkout.rows.find((row) => row.type === 'exercise') ?? sampleWorkout.rows[0];
  const [customStatText, setCustomStatText] = useState('3x10+10x16kg/60s');
  const [statLabRow, setStatLabRow] = useState<CompactExerciseRow>(initialStatLabRow);
  const [statLabSource, setStatLabSource] = useState(stringifyExample(initialStatLabRow));
  const [statLabSourceError, setStatLabSourceError] = useState<string | null>(null);
  const [workoutHeaderProps, setWorkoutHeaderProps] = useState<WorkoutHeaderExampleProps>(initialWorkoutHeaderProps);
  const [workoutHeaderSource, setWorkoutHeaderSource] = useState(stringifyExample(initialWorkoutHeaderProps));
  const [workoutHeaderSourceError, setWorkoutHeaderSourceError] = useState<string | null>(null);
  const [rowViewRow, setRowViewRow] = useState<CompactRow>(initialViewRow);
  const [rowViewSource, setRowViewSource] = useState(stringifyExample(initialViewRow));
  const [rowViewSourceError, setRowViewSourceError] = useState<string | null>(null);
  const [rowEditSource, setRowEditSource] = useState(stringifyExample(editableRow));
  const [rowEditSourceError, setRowEditSourceError] = useState<string | null>(null);
  const [compactPlaygroundSource, setCompactPlaygroundSource] = useState(compactPlaygroundExample);
  const [renderedCompactSource, setRenderedCompactSource] = useState(compactPlaygroundExample);
  const [numericBasicValue, setNumericBasicValue] = useState(8);
  const [numericWeightValue, setNumericWeightValue] = useState(7);
  const [numericDistanceValue, setNumericDistanceValue] = useState(1.45);
  const [durationDemoValue, setDurationDemoValue] = useState(95);
  const [durationShortValue, setDurationShortValue] = useState(35);
  const [durationEntity, setDurationEntity] = useState<ParsedExercise>({
    type: 'exercise',
    name: 'Lankku',
    sets: 3,
    setsMax: undefined,
    rounds: null,
    reps: 45,
    repsMax: null,
    repsRight: 45,
    distance: null,
    distanceMin: null,
    distanceMax: null,
    unit: 's',
    weight: null,
    recovery: null,
    note: null,
    description: null,
    customFields: null,
    specType: undefined,
    measuredDurations: undefined,
    isBilateral: true,
  });
  const [durationBlockEntity, setDurationBlockEntity] = useState<ParsedDurationBlock>({
    type: 'duration',
    duration: {
      value: 12,
      unit: 'min',
    },
    description: 'Palauttava osuus',
  });
  const [editDoneCount, setEditDoneCount] = useState(0);
  const [repEntity, setRepEntity] = useState<ParsedExercise>({
    type: 'exercise',
    name: 'Bulgarian Split Squat',
    sets: 3,
    setsMax: undefined,
    rounds: null,
    reps: 10,
    repsMax: null,
    repsRight: 10,
    distance: null,
    distanceMin: null,
    distanceMax: null,
    unit: null,
    weight: {
      value: 15,
      valueMax: 15,
      unit: 'kg',
      count: 1,
    },
    recovery: null,
    note: null,
    description: null,
    customFields: null,
    specType: undefined,
    measuredDurations: undefined,
    isBilateral: true,
  });
  const [durationExerciseTab, setDurationExerciseTab] = useState<'preview' | 'json' | 'compact'>('preview');
  const [durationBlockTab, setDurationBlockTab] = useState<'preview' | 'json' | 'compact'>('preview');
  const [durationTimerTab, setDurationTimerTab] = useState<'preview' | 'json' | 'compact'>('preview');
  const [durationTimerPlaybackRate, setDurationTimerPlaybackRate] = useState<(typeof durationTimerPlaybackRates)[number]>(1);
  const [activeSessionPlaybackRate, setActiveSessionPlaybackRate] = useState<(typeof durationTimerPlaybackRates)[number]>(1);
  const [repStrengthTab, setRepStrengthTab] = useState<'preview' | 'json' | 'compact'>('preview');
  const [repDistanceTab, setRepDistanceTab] = useState<'preview' | 'json' | 'compact'>('preview');
  const [distanceEntity, setDistanceEntity] = useState<ParsedExercise>({
    type: 'exercise',
    name: 'Juoksu',
    sets: 4,
    setsMax: undefined,
    rounds: null,
    reps: 500,
    repsMax: null,
    repsRight: undefined,
    distance: 500,
    distanceMin: null,
    distanceMax: null,
    unit: 'm',
    weight: null,
    recovery: null,
    note: null,
    description: null,
    customFields: null,
    specType: undefined,
    measuredDurations: undefined,
    isBilateral: false,
  });
  const [durationTimerEntity, setDurationTimerEntity] = useState<ParsedExercise>({
    type: 'exercise',
    name: 'Marssi ja hartiat eteen-taakse',
    sets: 1,
    setsMax: undefined,
    rounds: null,
    reps: 30,
    repsMax: null,
    repsRight: undefined,
    distance: null,
    distanceMin: null,
    distanceMax: null,
    unit: 's',
    weight: null,
    recovery: null,
    note: null,
    description: 'Marssi paikallasi ja yhdista liikkeeseen hartioiden pyoritys eteen ja taakse.',
    customFields: null,
    specType: 'measured',
    measuredDurations: [],
    isBilateral: false,
  });
  const durationTimerClock = useMemo(() => new VirtualClock(), []);
  const activeSessionClock = useMemo(() => new VirtualClock(), []);

  const statChipPresets: Array<{ label: string; row: CompactExerciseRow; description: string }> = [
    {
      label: 'Bulgarian Split Squat',
      description: 'Kaksipuoleinen toistomalli kuormalla.',
      row: {
        id: 'stat-preset-bss',
        type: 'exercise',
        name: 'Bulgarian Split Squat',
        sets: 3,
        reps: 10,
        repsRight: 10,
        weightKg: 16,
        recovery: { value: 60, unit: 'sec' },
      },
    },
    {
      label: 'Bench Press',
      description: 'Perinteinen voimasarjan stat-chip ilman palautusta.',
      row: {
        id: 'stat-preset-bench',
        type: 'exercise',
        name: 'Bench Press',
        sets: 3,
        reps: 8,
        weightKg: 70,
      },
    },
    {
      label: 'Pull-up',
      description: 'Bodyweight-esimerkki, jossa kuorma ei tule painokentasta.',
      row: {
        id: 'stat-preset-pullup',
        type: 'exercise',
        name: 'Pull-up',
        sets: 4,
        reps: 5,
        note: 'bodyweight',
      },
    },
    {
      label: 'Mobility Drill',
      description: 'Mitattu kesto ilman oikea/vasen-jakoa.',
      row: {
        id: 'stat-preset-mobility',
        type: 'exercise',
        name: 'Mobility Drill',
        specType: 'measured',
        sets: 1,
        reps: null,
        unit: 'min',
        measuredDurations: [{ left: 10, right: null, unit: 'min' }],
      },
    },
    {
      label: 'Side Plank + palautus',
      description: 'Mitattu bilateralinen kesto ja palautus samassa statissa.',
      row: {
        id: 'stat-preset-plank',
        type: 'exercise',
        name: 'Side Plank',
        specType: 'measured',
        sets: 2,
        reps: null,
        unit: 's',
        isBilateral: true,
        measuredDurations: [
          { left: 20, right: 37, unit: 's' },
          { left: 23, right: 21, unit: 's' },
        ],
        recovery: { value: 60, unit: 'sec' },
      },
    },
  ];

  const badgeExamples: BadgeExample[] = [
    { label: 'Default', tone: 'default', children: 'Default', description: 'Neutraali metadata-pill.' },
    { label: 'Good', tone: 'good', children: 'Voima', description: 'Positiivinen status kuten tavoite saavutettu.' },
    { label: 'Accent', tone: 'accent', children: '🏃⚡💪', description: 'Emoji- tai highlight-badge.' },
    { label: 'Warn', tone: 'warn', children: '75/100', description: 'Varoitus tai huomioitava arvo.' },
    { label: 'Danger', tone: 'danger', children: 'Unknown', description: 'Virhe- tai poikkeustila.' },
  ];

  const fieldLabelExamples: FieldLabelExample[] = [
    { label: 'Exercise name', children: 'Exercise Name', htmlFor: 'field-label-exercise', description: 'Peruskentän label editorissa.' },
    { label: 'Sets', children: 'Sets', htmlFor: 'field-label-sets', description: 'Numeerisen kentän label.' },
    { label: 'Recovery', children: 'Palautus', htmlFor: 'field-label-recovery', description: 'Kenttä, joka liittyy harjoitteen palautukseen.' },
  ];

  const selectWorkout = (index: number) => {
    setSelectedIndex(index);
    setWorkout(sourceWorkouts[index]);
  };

  const loadStatExample = (row: CompactExerciseRow) => {
    setStatLabRow(row);
    setStatLabSource(stringifyExample(row));
    setStatLabSourceError(null);
  };

  const logAtomEvent = (componentName: string, exampleName: string, eventName: SupportedAtomEvent) => {
    setAtomEventLog((current) => [`${componentName}.${eventName} -> ${exampleName}`, ...current].slice(0, 8));
  };

  const applyStatSource = () => {
    try {
      const parsedSource = JSON.parse(statLabSource) as CompactExerciseRow;
      setStatLabRow(parsedSource);
      setStatLabSourceError(null);
    } catch (error) {
      setStatLabSourceError(error instanceof Error ? error.message : 'Virheellinen JSON');
    }
  };

  const applyWorkoutHeaderSource = () => {
    try {
      const parsedSource = JSON.parse(workoutHeaderSource) as WorkoutHeaderExampleProps;
      setWorkoutHeaderProps(parsedSource);
      setWorkoutHeaderSourceError(null);
    } catch (error) {
      setWorkoutHeaderSourceError(error instanceof Error ? error.message : 'Virheellinen JSON');
    }
  };

  const applyRowViewSource = () => {
    try {
      const parsedSource = JSON.parse(rowViewSource) as CompactRow;
      setRowViewRow(parsedSource);
      setRowViewSourceError(null);
    } catch (error) {
      setRowViewSourceError(error instanceof Error ? error.message : 'Virheellinen JSON');
    }
  };

  const applyRowEditSource = () => {
    try {
      const parsedSource = JSON.parse(rowEditSource) as CompactRow;
      setEditableRow(parsedSource);
      setRowEditSourceError(null);
    } catch (error) {
      setRowEditSourceError(error instanceof Error ? error.message : 'Virheellinen JSON');
    }
  };

  const previewMoveRow = sampleWorkout.rows.find((row) => row.type === 'move') ?? sampleWorkout.rows[0];
  const summaryDemoRow = pickSampleRow('summary', { id: 'summary-demo', type: 'summary', text: 'Tiivis nosto harjoituksen teemasta.' });
  const phaseDemoRow = pickSampleRow('phase', { id: 'phase-demo', type: 'phase', number: 2, name: 'Build', details: 'Painotus siirtyy voimaan ja kontrolliin.' });
  const sectionDemoRow = pickSampleRow('section', { id: 'section-demo', type: 'section', name: 'Paaharjoitus' });
  const customDemoRow = pickSampleRow('custom', { id: 'custom-demo', type: 'custom', name: 'RPM', value: 60, valueMax: 110, unit: '' });
  const exerciseDemoRow = pickSampleRow('exercise', initialStatLabRow);
  const pyramidDemoRow = pickSampleRow('pyramid', {
    id: 'pyramid-demo',
    type: 'pyramid',
    name: 'Trap Bar Deadlift',
    sets: [
      { reps: 8, weightKg: 60 },
      { reps: 6, weightKg: 80 },
      { reps: 4, weightKg: 95 },
    ],
  });
  const moveDemoRow = pickSampleRow('move', {
    id: 'move-demo',
    type: 'move',
    sport: 'Trail run',
    duration: { value: 54, unit: 'min' },
    distance: { value: 9.4, unit: 'km' },
    note: 'Kevyt nousuvoittoinen lenkki.',
  });
  const runDemoRow: CompactRunRow = { id: 'run-demo', type: 'run', distanceValue: 8, distanceUnit: 'km', durationMin: 47, note: 'steady aerobic' };
  const durationDemoRow = pickSampleRow('duration', { id: 'duration-demo', type: 'duration', value: 12, unit: 'min', description: 'Dynamic mobility' });
  const splitDemoRow = moveDemoRow.splits?.[0] ?? {
    id: 'split-demo',
    type: 'split',
    distance: { value: 1, unit: 'km' },
    duration: { value: 5, unit: 'min' },
    pace: { minutes: 5, seconds: 0, perDistance: { value: 1, unit: 'km' } },
    hr: 148,
    note: 'steady',
  };
  const textDemoRow = pickSampleRow('text', { id: 'text-demo', type: 'text', text: 'Knee felt better after warm-up and cadence stayed smooth.' });
  const unknownDemoRow = pickSampleRow('unknown', { id: 'unknown-demo', type: 'unknown', raw: 'Custom RPM 60-110 ???' });
  const activeMeta = galleryNav.flatMap((group) => group.items).find((item) => item.id === activeSection);
  const compactPlaygroundParse = parseCompact(renderedCompactSource);
  const compactPlaygroundPreview = workoutsFromCompact(renderedCompactSource);
  const durationEntityCompact = `[2026-01-01] ## Demo\nExercise ${durationEntity.name}|${durationEntity.sets ?? 1}x${durationEntity.reps}${durationEntity.unit ?? ''}\n`;
  const durationBlockLine = `${durationBlockEntity.duration?.value ?? 0}${durationBlockEntity.duration?.unit ?? 's'}${durationBlockEntity.description ? ` ${durationBlockEntity.description}` : ''}`;
  const durationBlockCompact = `[2026-01-01] ## Demo\n${durationBlockLine}\n`;
  const repEntityCompact = `[2026-01-01] ## Demo\nExercise ${repEntity.name}|${repEntity.sets ?? 1}x${repEntity.reps}${repEntity.repsRight ? `+${repEntity.repsRight}` : ''}${repEntity.weight && 'value' in repEntity.weight ? `x${repEntity.weight.value}kg` : ''}\n`;
  const distanceEntityCompact = `[2026-01-01] ## Demo\nExercise ${distanceEntity.name}|${distanceEntity.sets ?? 1}x${distanceEntity.reps}${distanceEntity.unit ?? ''}\n`;
  const durationTimerCompact = `[2026-01-01] ## Demo\nExercise ${durationTimerEntity.name}|${durationTimerEntity.reps}${durationTimerEntity.unit ?? ''}${durationTimerEntity.description ? `\nText ${durationTimerEntity.description}` : ''}${Array.isArray(durationTimerEntity.measuredDurations) && durationTimerEntity.measuredDurations.length > 0 ? `\n# measured: ${durationTimerEntity.measuredDurations.map((setDuration) => `${setDuration.left}${setDuration.unit}${typeof setDuration.right === 'number' ? `+${setDuration.right}${setDuration.unit}` : ''}`).join(', ')}` : ''}\n`;
  const activeSessionParse = parseCompact(activeWorkoutSessionCompactExample);
  const activeSessionWorkouts = activeSessionParse.success ? activeSessionParse.document.workouts : [];

  const loadCompactPlaygroundSource = (nextSource: string) => {
    setCompactPlaygroundSource(nextSource);
    setRenderedCompactSource(nextSource);
  };

  const exportCompactJson = () => {
    if (!compactPlaygroundParse.success) {
      return;
    }

    downloadJsonFile('compact-export.json', compactPlaygroundParse.document);
  };

  useEffect(() => {
    durationTimerClock.setPlaybackRate(durationTimerPlaybackRate);
  }, [durationTimerClock, durationTimerPlaybackRate]);

  useEffect(() => {
    activeSessionClock.setPlaybackRate(activeSessionPlaybackRate);
  }, [activeSessionClock, activeSessionPlaybackRate]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      durationTimerClock.advanceByRealTime(250);
    }, 250);

    return () => {
      window.clearInterval(timerId);
    };
  }, [durationTimerClock]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      activeSessionClock.advanceByRealTime(250);
    }, 250);

    return () => {
      window.clearInterval(timerId);
    };
  }, [activeSessionClock]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncFromHash = () => {
      const nextSection = getSectionFromHash(window.location.hash);

      if (nextSection) {
        setActiveSection(nextSection);
      }
    };

    window.addEventListener('hashchange', syncFromHash);
    syncFromHash();

    return () => {
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const nextHash = `#${activeSection}`;

    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <GalleryCard
            title="RT Compact UI Component Gallery"
            subtitle="Tama playground toimii nyt komponenttigalleriana: vasen valikko vaihtaa komponentin, oikea paneeli nayttaa esimerkin, rajapinnan ja kayttokontekstin. Tavoite on olla kevyt vaihtoehto Storybook-tyyliselle selaamiselle suoraan Vite-playgroundissa."
          >
            <div className="grid gap-4 md:grid-cols-3">
              <PreviewSurface>
                <SectionEyebrow kind="atom" />
                <p className="mt-2 text-lg font-semibold text-slate-100">Atomit</p>
                <p className="mt-1 text-sm text-slate-400">Pienimmat rakennuspalikat kuten labelit, badge-variantit ja stat-arvot.</p>
              </PreviewSurface>
              <PreviewSurface>
                <SectionEyebrow kind="molecule" />
                <p className="mt-2 text-lg font-semibold text-slate-100">Molekyylit</p>
                <p className="mt-1 text-sm text-slate-400">Yhdistetyt rivi- ja header-komponentit, joista organismit rakentuvat.</p>
              </PreviewSurface>
              <PreviewSurface>
                <SectionEyebrow kind="organism" />
                <p className="mt-2 text-lg font-semibold text-slate-100">Organismit</p>
                <p className="mt-1 text-sm text-slate-400">Kokonaiset workout-nakymat ja editorit sample.compact-datalla.</p>
              </PreviewSurface>
            </div>
            <InterfaceBlock value={componentInterfaces.overview} />
          </GalleryCard>
        );
      case 'atom-badge':
        return (
          <GalleryCard title="Badge" subtitle="Pieni status- tai metadataelementti tageille, emojeille ja pisteille. Nyt mukana on myos event-pass-through, joten badge voi reagoida click- ja touch-eventteihin.">
            <div className="space-y-4">
              <ExampleIntro title="Yksinkertainen badge statusmerkintaan.">
                <div className="flex flex-wrap gap-3">
                  <Badge tone="good">Voima</Badge>
                  <Badge tone="accent">🏃⚡💪</Badge>
                </div>
              </ExampleIntro>
              <NpmImportBlock imports={["Badge"]} />
              <PreviewSurface>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Tuetut eventit</p>
                    <p className="mt-2 text-sm text-slate-300">`onClick`, `onTouchStart` ja muut `HTMLSpanElement`-attribuutit välittyvät badge-rootille.</p>
                  </div>

                  <div className="grid gap-3">
                    {badgeExamples.map((example) => (
                      <div key={example.label} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-slate-200">{example.label}</p>
                            <p className="text-xs text-slate-400">{example.description}</p>
                          </div>
                          <Badge
                            tone={example.tone}
                            onClick={() => logAtomEvent('Badge', example.label, 'onClick')}
                            onTouchStart={() => logAtomEvent('Badge', example.label, 'onTouchStart')}
                            className="cursor-pointer select-none"
                          >
                            {example.children}
                          </Badge>
                        </div>
                        <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                          <code>{`<Badge\n  tone="${example.tone ?? 'default'}"\n  onClick={() => ...}\n  onTouchStart={() => ...}\n>\n  ${example.children}\n</Badge>`}</code>
                        </pre>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Event log</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      {atomEventLog.length > 0 ? atomEventLog.map((entry, index) => <p key={`${entry}-${index}`}>{entry}</p>) : <p className="text-slate-500">Klikkaa tai kosketa badgea nahdaksesi eventit tassa.</p>}
                    </div>
                  </div>
                </div>
              </PreviewSurface>
              <InterfaceBlock value={componentInterfaces['atom-badge']} />
            </div>
          </GalleryCard>
        );
      case 'atom-numeric-stepper':
        return (
          <GalleryCard title="NumericStepper" subtitle="Yleinen plus/miinus-atomi, jossa voi käyttää joko kiinteää stepiä tai domain-logiikkaa (paino/metrit).">
            <div className="space-y-4">
              <NpmImportBlock imports={['NumericStepper']} />
              <PreviewSurface>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-500">Perusaskel</p>
                    <NumericStepper value={numericBasicValue} onChange={setNumericBasicValue} label="Sarjat" min={0} max={20} step={1} />
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-500">Paino (1 + 2.5)</p>
                    <NumericStepper
                      value={numericWeightValue}
                      onChange={setNumericWeightValue}
                      label="Paino"
                      suffix="kg"
                      min={0}
                      max={500}
                      computeNextValue={getNextWeightValue}
                    />
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-500">Metrit (adaptiivinen)</p>
                    <NumericStepper
                      value={numericDistanceValue}
                      onChange={setNumericDistanceValue}
                      label="Matka"
                      suffix="m"
                      min={0}
                      max={100000}
                      computeNextValue={getNextDistanceMetersValue}
                    />
                  </div>
                </div>
              </PreviewSurface>
              <InterfaceBlock value={componentInterfaces['atom-numeric-stepper']} />
            </div>
          </GalleryCard>
        );
      case 'atom-duration-stepper':
        return (
          <GalleryCard title="DurationStepper" subtitle="Keston editointiatomi sekunti- ja minuuttitarkkuudella, mukaan lukien dual mode minuutit + sekunnit.">
            <div className="space-y-4">
              <NpmImportBlock imports={['DurationStepper']} />
              <PreviewSurface>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Dual mode (&gt;=60s)</p>
                    <DurationStepper
                      value={durationDemoValue}
                      onChange={setDurationDemoValue}
                      label="Kesto"
                      precision="sec"
                      minuteControlsMode="always"
                      showSecondControlsWithMinutes
                    />
                    <p className="text-xs text-slate-400">Arvo: {formatDurationValue(durationDemoValue)}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Sekuntitarkkuus (&lt;60s)</p>
                    <DurationStepper
                      value={durationShortValue}
                      onChange={setDurationShortValue}
                      label="Sprintti"
                      precision="sec"
                      minuteControlsMode="never"
                    />
                    <p className="text-xs text-slate-400">Arvo: {formatDurationValue(durationShortValue)}</p>
                  </div>
                </div>
              </PreviewSurface>
              <InterfaceBlock value={componentInterfaces['atom-duration-stepper']} />
            </div>
          </GalleryCard>
        );
      case 'atom-field-label':
        return (
          <GalleryCard title="FieldLabel" subtitle="Yhtenainen label lomakekenttien ja editorikenttien ylapuolelle. Label tukee nyt myos click- ja touch-eventteja suoraan root-elementilta.">
            <div className="space-y-4">
              <NpmImportBlock imports={["FieldLabel"]} />
              <ExampleIntro title="FieldLabel kentan otsakkeena.">
                <div className="max-w-md space-y-2">
                  <FieldLabel htmlFor="example-field-label">Exercise Name</FieldLabel>
                  <input id="example-field-label" className="rt-input" value="Side Plank" readOnly />
                </div>
              </ExampleIntro>
              <PreviewSurface>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Tuetut eventit</p>
                    <p className="mt-2 text-sm text-slate-300">`onClick`, `onTouchStart`, `htmlFor` ja muut `HTMLLabelElement`-attribuutit valittyvat labelille.</p>
                  </div>

                  <div className="grid gap-3">
                    {fieldLabelExamples.map((example) => (
                      <div key={example.label} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4">
                        <div className="space-y-2">
                          <FieldLabel
                            htmlFor={example.htmlFor}
                            onClick={() => logAtomEvent('FieldLabel', example.label, 'onClick')}
                            onTouchStart={() => logAtomEvent('FieldLabel', example.label, 'onTouchStart')}
                            className="cursor-pointer"
                          >
                            {example.children}
                          </FieldLabel>
                          <input id={example.htmlFor} className="rt-input" value={example.label} readOnly />
                          <p className="text-xs text-slate-400">{example.description}</p>
                        </div>
                        <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                          <code>{`<FieldLabel\n  htmlFor="${example.htmlFor}"\n  onClick={() => ...}\n  onTouchStart={() => ...}\n>\n  ${example.children}\n</FieldLabel>`}</code>
                        </pre>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Event log</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      {atomEventLog.length > 0 ? atomEventLog.map((entry, index) => <p key={`${entry}-${index}`}>{entry}</p>) : <p className="text-slate-500">Klikkaa labelia tai kokeile kosketusta nahdaksesi eventit tassa.</p>}
                    </div>
                  </div>
                </div>
              </PreviewSurface>
              <InterfaceBlock value={componentInterfaces['atom-field-label']} />
            </div>
          </GalleryCard>
        );
      case 'molecule-active-duration-edit':
        return (
          <GalleryCard title="ActiveDurationEditControls" subtitle="Aktiiviharjoituksen kestoeditori: sarjat + kesto + bilateral + done-action.">
            <div className="space-y-4">
              <NpmImportBlock imports={['ActiveDurationEditControls']} />
              <PreviewSurface>
                <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <p className="text-xs text-slate-400">Tehty-nappia painettu: {editDoneCount} kertaa</p>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Exercise-kesto (bilateral)</p>
                    <TabView
                      activeTab={durationExerciseTab}
                      onTabChange={(tab) => setDurationExerciseTab(tab as 'preview' | 'json' | 'compact')}
                      tabs={[
                        {
                          id: 'preview',
                          label: 'Preview',
                          content: (
                            <ActiveDurationEditControls
                              entity={durationEntity}
                              onChange={(next) => setDurationEntity(next as ParsedExercise)}
                              onMarkDone={() => setEditDoneCount((current) => current + 1)}
                            />
                          ),
                        },
                        {
                          id: 'json',
                          label: 'JSON',
                          content: (
                            <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                              <code>{JSON.stringify(durationEntity, null, 2)}</code>
                            </pre>
                          ),
                        },
                        {
                          id: 'compact',
                          label: 'COMPACT',
                          content: (
                            <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                              <code>{durationEntityCompact}</code>
                            </pre>
                          ),
                        },
                      ]}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">DurationBlock-esimerkki</p>
                    <TabView
                      activeTab={durationBlockTab}
                      onTabChange={(tab) => setDurationBlockTab(tab as 'preview' | 'json' | 'compact')}
                      tabs={[
                        {
                          id: 'preview',
                          label: 'Preview',
                          content: (
                            <ActiveDurationEditControls
                              entity={durationBlockEntity}
                              onChange={(next) => setDurationBlockEntity(next as ParsedDurationBlock)}
                              onMarkDone={() => setEditDoneCount((current) => current + 1)}
                            />
                          ),
                        },
                        {
                          id: 'json',
                          label: 'JSON',
                          content: (
                            <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                              <code>{JSON.stringify(durationBlockEntity, null, 2)}</code>
                            </pre>
                          ),
                        },
                        {
                          id: 'compact',
                          label: 'COMPACT',
                          content: (
                            <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                              <code>{durationBlockCompact}</code>
                            </pre>
                          ),
                        },
                      ]}
                    />
                  </div>
                </div>
              </PreviewSurface>
              <InterfaceBlock value={componentInterfaces['molecule-active-duration-edit']} />
            </div>
          </GalleryCard>
        );
      case 'molecule-active-duration-timer':
        return (
          <GalleryCard title="ActiveDurationTimer" subtitle="Parser-entityyn sidottu setti-/kestotimeri, joka kirjoittaa mitatut ajat suoraan measuredDurations-kenttaan.">
            <div className="space-y-4">
              <NpmImportBlock imports={['ActiveDurationTimer']} />
              <PreviewSurface>
                <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Esimerkki: Exercise Pakaralihakset|30s + Text-ohje fullscreen-aloituksessa</p>
                  <TabView
                    activeTab={durationTimerTab}
                    onTabChange={(tab) => setDurationTimerTab(tab as 'preview' | 'json' | 'compact')}
                    tabs={[
                      {
                        id: 'preview',
                        label: 'Preview',
                        content: (
                          <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-sm text-slate-300">
                              <span className="text-xs uppercase tracking-[0.18em] text-slate-500">Demo speed</span>
                              {durationTimerPlaybackRates.map((rate) => (
                                <button
                                  key={rate}
                                  type="button"
                                  onClick={() => setDurationTimerPlaybackRate(rate)}
                                  className={`rounded-full border px-3 py-1.5 transition ${durationTimerPlaybackRate === rate ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-slate-100'}`}
                                >
                                  {rate}x
                                </button>
                              ))}
                              <span className="text-xs text-slate-500">Virtuaalikello pyorii taustalla oikeaa aikaa vastaan.</span>
                            </div>
                            <ActiveDurationTimer
                              entity={durationTimerEntity}
                              clock={durationTimerClock}
                              onChange={(next) => setDurationTimerEntity(next)}
                            />
                          </div>
                        ),
                      },
                      {
                        id: 'json',
                        label: 'JSON',
                        content: (
                          <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                            <code>{JSON.stringify(durationTimerEntity, null, 2)}</code>
                          </pre>
                        ),
                      },
                      {
                        id: 'compact',
                        label: 'COMPACT',
                        content: (
                          <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                            <code>{durationTimerCompact}</code>
                          </pre>
                        ),
                      },
                    ]}
                  />
                </div>
              </PreviewSurface>
              <InterfaceBlock value={componentInterfaces['molecule-active-duration-timer']} />
            </div>
          </GalleryCard>
        );
      case 'molecule-active-rep-edit':
        return (
          <GalleryCard title="ActiveRepEditControls" subtitle="Aktiiviharjoituksen toistoeditori sarjoille, bilateral-toistoille ja adaptiiviselle painolle.">
            <div className="space-y-4">
              <NpmImportBlock imports={['ActiveRepEditControls']} />
              <PreviewSurface>
                <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Voimaesimerkki: 3x10+10x15kg</p>
                  <TabView
                    activeTab={repStrengthTab}
                    onTabChange={(tab) => setRepStrengthTab(tab as 'preview' | 'json' | 'compact')}
                    tabs={[
                      {
                        id: 'preview',
                        label: 'Preview',
                        content: (
                          <ActiveRepEditControls
                            entity={repEntity}
                            onChange={(next) => setRepEntity(next)}
                          />
                        ),
                      },
                      {
                        id: 'json',
                        label: 'JSON',
                        content: (
                          <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                            <code>{JSON.stringify(repEntity, null, 2)}</code>
                          </pre>
                        ),
                      },
                      {
                        id: 'compact',
                        label: 'COMPACT',
                        content: (
                          <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                            <code>{repEntityCompact}</code>
                          </pre>
                        ),
                      },
                    ]}
                  />
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Matkaesimerkki: 4x500m</p>
                  <TabView
                    activeTab={repDistanceTab}
                    onTabChange={(tab) => setRepDistanceTab(tab as 'preview' | 'json' | 'compact')}
                    tabs={[
                      {
                        id: 'preview',
                        label: 'Preview',
                        content: (
                          <ActiveRepEditControls
                            entity={distanceEntity}
                            onChange={(next) => setDistanceEntity(next)}
                          />
                        ),
                      },
                      {
                        id: 'json',
                        label: 'JSON',
                        content: (
                          <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                            <code>{JSON.stringify(distanceEntity, null, 2)}</code>
                          </pre>
                        ),
                      },
                      {
                        id: 'compact',
                        label: 'COMPACT',
                        content: (
                          <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                            <code>{distanceEntityCompact}</code>
                          </pre>
                        ),
                      },
                    ]}
                  />
                </div>
              </PreviewSurface>
              <InterfaceBlock value={componentInterfaces['molecule-active-rep-edit']} />
            </div>
          </GalleryCard>
        );
      case 'atom-stat-chip':
        return (
          <GalleryCard title="StatChip" subtitle="StatChip ei ota enaa raakaa stringia, vaan parseri-/UI-mallista johdetun `CompactStatValue`-rakenteen. Silloin painot, palautukset ja muut osat voidaan tyylittaa erikseen.">
            <div className="space-y-4">
              <ExampleIntro title="Structured stat parseririvista renderoituna.">
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3">
                  <div>
                    <p className="text-sm text-slate-400">Side Plank</p>
                    <p className="text-xs text-slate-500">measured + palautus</p>
                  </div>
                  <StatChip stat={statFromExerciseRow(statChipPresets[4].row)} />
                </div>
              </ExampleIntro>
              <NpmImportBlock imports={["StatChip", "statFromExerciseRow"]} />
              <PreviewSurface>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Presetit parserirakenteesta</p>
                    <div className="flex flex-wrap gap-2">
                      {statChipPresets.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-orange-400 hover:text-white"
                          onClick={() => loadStatExample(preset.row)}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">JSON editor</p>
                          <p className="mt-1 text-sm text-slate-400">Syota suoraan `CompactExerciseRow`-objekti ja renderoi se `StatChip`-komponentille.</p>
                        </div>
                        <button
                          type="button"
                          className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-200 transition hover:border-orange-400 hover:bg-orange-500/20"
                          onClick={applyStatSource}
                        >
                          Renderoi JSON
                        </button>
                      </div>
                      <textarea
                        className="min-h-[320px] w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-4 font-mono text-xs leading-6 text-slate-200 outline-none transition focus:border-orange-400"
                        value={statLabSource}
                        onChange={(event) => setStatLabSource(event.target.value)}
                        spellCheck={false}
                      />
                      {statLabSourceError && <p className="text-sm text-rose-300">{statLabSourceError}</p>}
                    </div>

                    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Live preview</p>
                        <div className="mt-3 space-y-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                          <div>
                            <p className="text-sm text-slate-500">{statLabRow.name}</p>
                            {statLabRow.note && <p className="text-xs text-slate-400">{statLabRow.note}</p>}
                          </div>
                          <div className="flex justify-end">
                            <StatChip stat={statFromExerciseRow(statLabRow)} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Variaatiot ja kutsuesimerkit</p>
                        <div className="mt-3 space-y-3">
                          {statChipPresets.map((preset) => (
                            <div key={`${preset.label}-preview`} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4">
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-sm font-medium text-slate-200">{preset.label}</p>
                                  <p className="text-xs text-slate-400">{preset.description}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <StatChip stat={statFromExerciseRow(preset.row)} />
                                  <button
                                    type="button"
                                    className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-orange-400 hover:text-white"
                                    onClick={() => loadStatExample(preset.row)}
                                  >
                                    Avaa editoriin
                                  </button>
                                </div>
                              </div>
                              <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                                <code>{`const row: CompactExerciseRow = ${stringifyExample(preset.row)};\nconst stat = statFromExerciseRow(row);\n<StatChip stat={stat} />;`}</code>
                              </pre>
                            </div>
                          ))}
                          <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                            <span className="text-sm text-slate-300">Custom fallback</span>
                            <StatChip stat={compactStatFromText(customStatText)} />
                          </div>
                        </div>
                      </div>

                      <label className="space-y-1 text-sm text-slate-300">
                        <span className="text-xs uppercase tracking-[0.16em] text-slate-500">Custom text fallback</span>
                        <input className="rt-input" value={customStatText} onChange={(event) => setCustomStatText(event.target.value)} />
                      </label>
                    </div>
                  </div>
                </div>
              </PreviewSurface>
              <InterfaceBlock value={componentInterfaces['atom-stat-chip']} />
            </div>
          </GalleryCard>
        );
      case 'molecule-workout-header':
        return (
          <GalleryCard title="WorkoutHeader" subtitle="Harjoituksen otsake, joka kokoaa nimen, paivan, tagit, emojit ja pisteet yhdeksi identiteettialueeksi.">
            <div className="space-y-4">
              <ExampleIntro title="Workout-kortin otsake valmiilla metadatoilla.">
                <WorkoutHeader {...workoutHeaderProps} />
              </ExampleIntro>
              <NpmImportBlock imports={["WorkoutHeader"]} />
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)]">
                <PreviewSurface>
                  <div className="space-y-4">
                    <WorkoutHeader {...workoutHeaderProps} />
                    <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                      <code>{`const props = ${stringifyExample(workoutHeaderProps)};\n<WorkoutHeader {...props} />;`}</code>
                    </pre>
                  </div>
                </PreviewSurface>
                <div className="space-y-4">
                  <InterfaceBlock value={componentInterfaces['molecule-workout-header']} />
                  <JsonEditorPanel
                    title="JSON editor"
                    description="Muokkaa suoraan WorkoutHeader-propsit JSON-muodossa ja renderoi komponentti uudelleen."
                    value={workoutHeaderSource}
                    onChange={setWorkoutHeaderSource}
                    onApply={applyWorkoutHeaderSource}
                    error={workoutHeaderSourceError}
                  />
                </div>
              </div>
            </div>
          </GalleryCard>
        );
      case 'molecule-compact-row-view':
        return (
          <GalleryCard title="CompactRowView" subtitle="Renderer yhdelle COMPACT-riville. Sama komponentti osaa exercise-, move-, pyramid-, split- ja text-rivit.">
            <div className="space-y-4">
              <ExampleIntro title="Exercise-rivi oletusrenderoinnilla.">
                <CompactRowView row={rowViewRow} />
              </ExampleIntro>
              <NpmImportBlock imports={["CompactRowView"]} />
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)]">
                <PreviewSurface>
                  <div className="space-y-4">
                    <CompactRowView row={rowViewRow} />
                    <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                      <code>{`const row: CompactRow = ${stringifyExample(rowViewRow)};\n<CompactRowView row={row} />;`}</code>
                    </pre>
                    <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Toinen valmis esimerkki</p>
                      <CompactRowView row={previewMoveRow} />
                    </div>
                  </div>
                </PreviewSurface>
                <div className="space-y-4">
                  <InterfaceBlock value={componentInterfaces['molecule-compact-row-view']} />
                  <JsonEditorPanel
                    title="JSON editor"
                    description="Syota suoraan `CompactRow`-objekti ja renderoi se `CompactRowView`-komponentille."
                    value={rowViewSource}
                    onChange={setRowViewSource}
                    onApply={applyRowViewSource}
                    error={rowViewSourceError}
                  />
                </div>
              </div>
            </div>
          </GalleryCard>
        );
      case 'molecule-compact-row-edit':
        return (
          <GalleryCard title="CompactRowEdit" subtitle="Muokkaa yksittaista workout-rivia. Tasta on hyva nahda atomien FieldLabel + rt-input kaytto oikeassa yhteydessa.">
            <div className="space-y-4">
              <ExampleIntro title="Yhden rivin editori suoraan kaytossa.">
                <CompactRowEdit row={editableRow} onChange={setEditableRow} />
              </ExampleIntro>
              <NpmImportBlock imports={["CompactRowEdit"]} />
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)]">
                <PreviewSurface>
                  <div className="space-y-4">
                    <CompactRowEdit
                      row={editableRow}
                      onChange={(next) => {
                        setEditableRow(next);
                        setRowEditSource(stringifyExample(next));
                      }}
                    />
                    <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                      <code>{`const row: CompactRow = ${stringifyExample(editableRow)};\n<CompactRowEdit row={row} onChange={setRow} />;`}</code>
                    </pre>
                  </div>
                </PreviewSurface>
                <div className="space-y-4">
                  <InterfaceBlock value={componentInterfaces['molecule-compact-row-edit']} />
                  <JsonEditorPanel
                    title="JSON editor"
                    description="Muokkaa editorille syotettava `CompactRow`-objekti JSONina ja renderoi se editoriin."
                    value={rowEditSource}
                    onChange={setRowEditSource}
                    onApply={applyRowEditSource}
                    error={rowEditSourceError}
                  />
                </div>
              </div>
            </div>
          </GalleryCard>
        );
      case 'row-summary':
        return (
          <RowExportShowcase
            title="Summary"
            subtitle="Kevyin mahdollinen tekstirivi nopeisiin huomioihin tai harjoituksen yhteenvedoksi."
            exampleTitle="Yksi tiivis yhteenvetorivi ilman muuta metadataa."
            importName="Summary"
            interfaceValue={componentInterfaces['row-summary']}
            code={`const row = ${stringifyExample(summaryDemoRow)};\n<Summary row={row} />;`}
          >
            <Summary row={summaryDemoRow} />
          </RowExportShowcase>
        );
      case 'row-phase':
        return (
          <RowExportShowcase
            title="Phase"
            subtitle="Numerollinen vaiheotsikko esimerkiksi blokille, build-jaksolle tai alkuverryttelylle."
            exampleTitle="Phase-rivi erottaa suuremman harjoitusvaiheen omaksi otsakkeekseen."
            importName="Phase"
            interfaceValue={componentInterfaces['row-phase']}
            code={`const row = ${stringifyExample(phaseDemoRow)};\n<Phase row={row} />;`}
          >
            <Phase row={phaseDemoRow} />
          </RowExportShowcase>
        );
      case 'row-section':
        return (
          <RowExportShowcase
            title="Section"
            subtitle="Kevyt osio-otsikko, joka ryhmittelee alle tulevat harjoiterivit."
            exampleTitle="Section toimii hyvin harjoituksen sisäisenä navigaatiotasona."
            importName="Section"
            interfaceValue={componentInterfaces['row-section']}
            code={`const row = ${stringifyExample(sectionDemoRow)};\n<Section row={row} />;`}
          >
            <Section row={sectionDemoRow} />
          </RowExportShowcase>
        );
      case 'row-custom':
        return (
          <RowExportShowcase
            title="Custom"
            subtitle="Mukautettu metriikka kun parserissa on `Custom`-rivi ja haluat renderöidä sen suoraan."
            exampleTitle="Custom tukee myös arvoalueita kuten RPM 60-110."
            importName="Custom"
            interfaceValue={componentInterfaces['row-custom']}
            code={`const row = ${stringifyExample(customDemoRow)};\n<Custom row={row} />;`}
          >
            <Custom row={customDemoRow} />
          </RowExportShowcase>
        );
      case 'row-exercise':
        return (
          <RowExportShowcase
            title="Exercise"
            subtitle="Perusvoimarivi, jossa sarjat, toistot, kuorma ja mahdollinen palautus muodostetaan yhdeksi komponentiksi."
            exampleTitle="Exercise on hyödyllinen silloin kun et tarvitse koko workout-korttia ympärille."
            importName="Exercise"
            interfaceValue={componentInterfaces['row-exercise']}
            code={`const row = ${stringifyExample(exerciseDemoRow)};\n<Exercise row={row} />;`}
          >
            <Exercise row={exerciseDemoRow} />
          </RowExportShowcase>
        );
      case 'row-pyramid':
        return (
          <RowExportShowcase
            title="PyramidRow"
            subtitle="Sarjaporrastus tai pyramidimalli omana rivikomponenttinaan ilman geneeristä dispatcher-kerrosta."
            exampleTitle="PyramidRow näyttää paino- ja toistoporrastuksen sellaisenaan."
            importName="PyramidRow"
            interfaceValue={componentInterfaces['row-pyramid']}
            code={`const row = ${stringifyExample(pyramidDemoRow)};\n<PyramidRow row={row} />;`}
          >
            <PyramidRow row={pyramidDemoRow} />
          </RowExportShowcase>
        );
      case 'row-move':
        return (
          <RowExportShowcase
            title="MoveRow"
            subtitle="Parseri-first liikuntasuoritus, jossa matka, kesto, pace, note ja mahdolliset splitit ovat kaikki samassa rakenteessa."
            exampleTitle="MoveRow on nykyinen pääpolku juoksu-, uinti- ja yleisille move-riveille."
            importName="MoveRow"
            interfaceValue={componentInterfaces['row-move']}
            code={`const row = ${stringifyExample(moveDemoRow)};\n<MoveRow row={row} />;`}
          >
            <MoveRow row={moveDemoRow} />
          </RowExportShowcase>
        );
      case 'row-run':
        return (
          <RowExportShowcase
            title="Run"
            subtitle="Legacy run -komponentti on edelleen exportattu yhteensopivuussyistä vanhemmille row-malleille."
            exampleTitle="Run käyttää edelleen vanhaa `CompactRunRow`-shapea."
            importName="Run"
            interfaceValue={componentInterfaces['row-run']}
            code={`const row = ${stringifyExample(runDemoRow)};\n<Run row={row} />;`}
          >
            <Run row={runDemoRow} />
          </RowExportShowcase>
        );
      case 'row-duration':
        return (
          <RowExportShowcase
            title="Duration"
            subtitle="Pelkkä kestorivi joko tekstiselitteellä tai strukturoituna stat-chipinä."
            exampleTitle="Duration on hyvä esimerkiksi warm-up-, cooldown- tai mobility-osioihin."
            importName="Duration"
            interfaceValue={componentInterfaces['row-duration']}
            code={`const row = ${stringifyExample(durationDemoRow)};\n<Duration row={row} />;`}
          >
            <Duration row={durationDemoRow} />
          </RowExportShowcase>
        );
      case 'row-split':
        return (
          <RowExportShowcase
            title="SplitRow"
            subtitle="Valiaikarivi tukee sekä strukturoituja pace/duration-kenttiä että sisäkkäisiä splittejä."
            exampleTitle="SplitRow voi renderöidä move-rivin alle tulevan yhden splitin myös yksinään."
            importName="SplitRow"
            interfaceValue={componentInterfaces['row-split']}
            code={`const row = ${stringifyExample(splitDemoRow)};\n<SplitRow row={row} />;`}
          >
            <SplitRow row={splitDemoRow} />
          </RowExportShowcase>
        );
      case 'row-text':
        return (
          <RowExportShowcase
            title="Text"
            subtitle="Vapaamuotoinen tekstikappale silloin kun haluat näyttää parserin `Text`-sisällön omana rivinään."
            exampleTitle="Text pitää pitkänkin huomiorivin luettavana ilman editorimallia."
            importName="Text"
            interfaceValue={componentInterfaces['row-text']}
            code={`const row = ${stringifyExample(textDemoRow)};\n<Text row={row} />;`}
          >
            <Text row={textDemoRow} />
          </RowExportShowcase>
        );
      case 'row-unknown':
        return (
          <RowExportShowcase
            title="Unknown"
            subtitle="Fallback-rivi parserilta tuleville sisällöille, joita mapperi tai UI ei vielä tunne."
            exampleTitle="Unknown tekee epäselvän rivin näkyväksi eikä piilota sitä hiljaa."
            importName="Unknown"
            interfaceValue={componentInterfaces['row-unknown']}
            code={`const row = ${stringifyExample(unknownDemoRow)};\n<Unknown row={row} />;`}
          >
            <Unknown row={unknownDemoRow} />
          </RowExportShowcase>
        );
      case 'organism-blog-view':
        return (
          <GalleryCard title="CompactBlogView" subtitle="Koko workout-kortin read-only naytto. Tama on jo lahempana oikeaa lopputuotetta kuin pienemmat showcase-paneelit.">
            <div className="space-y-4">
              <ExampleIntro title="Valmis workout-kortti read-only-muodossa.">
                <CompactBlogView
                  workout={sampleWorkout}
                  headerOptions={{
                    showTags: true,
                    showEmojis: true,
                    showPoints: true,
                  }}
                />
              </ExampleIntro>
              <NpmImportBlock imports={["CompactBlogView"]} />
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)]">
                <PreviewSurface>
                  <CompactBlogView
                    workout={sampleWorkout}
                    headerOptions={{
                      showTags: true,
                      showEmojis: true,
                      showPoints: true,
                    }}
                  />
                </PreviewSurface>
                <InterfaceBlock value={componentInterfaces['organism-blog-view']} />
              </div>
            </div>
          </GalleryCard>
        );
      case 'organism-compact-view':
        return (
          <GalleryCard title="CompactView" subtitle="Parseri-ensin komponentti, jolle voi antaa suoraan COMPACT-tekstin, parseCompact-tuloksen tai parserin AST-workoutin ilman erillista viewmodel-muunnosta.">
            <div className="space-y-4">
              <ExampleIntro title="Anna komponentille pelkka COMPACT-teksti ja renderoi se suoraan.">
                <CompactView
                  data={compactPlaygroundExample}
                  showHeader
                  headerOptions={{
                    showTags: true,
                    showEmojis: true,
                    showPoints: true,
                  }}
                />
              </ExampleIntro>
              <NpmImportBlock imports={['CompactView']} />
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)]">
                <PreviewSurface>
                  <CompactView
                    data={parseCompact(compactPlaygroundExample)}
                    showHeader
                    headerOptions={{
                      showTags: true,
                      showEmojis: true,
                      showPoints: true,
                    }}
                  />
                </PreviewSurface>
                <div className="space-y-4">
                  <InterfaceBlock value={componentInterfaces['organism-compact-view']} />
                  <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                    <code>{`const source = \`${compactPlaygroundExample}\`;

<CompactView data={source} />

const parsed = parseCompact(source);
<CompactView data={parsed} showHeader />;`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </GalleryCard>
        );
      case 'organism-blog-editor':
        return (
          <GalleryCard title="CompactBlogEditor" subtitle="Koko workout-mallin editori. Taalla voi testata header- ja row-editoinnin yhdessa pinnassa.">
            <div className="space-y-4">
              <ExampleIntro title="Koko workoutin editori kaytossa.">
                <CompactBlogEditor workout={workout} onChange={setWorkout} />
              </ExampleIntro>
              <NpmImportBlock imports={["CompactBlogEditor"]} />
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)]">
                <PreviewSurface>
                  <CompactBlogEditor workout={workout} onChange={setWorkout} />
                </PreviewSurface>
                <InterfaceBlock value={componentInterfaces['organism-blog-editor']} />
              </div>
            </div>
          </GalleryCard>
        );
      case 'organism-active-workout-session':
        return (
          <GalleryCard title="ActiveWorkoutSession" subtitle="Top-level aktiivinen sessionakyma usealle harjoitukselle. Demo kayttaa samaa virtuaalikelloa koko sessiolle, jotta playbackin nopeutus toimii heti Vite-playgroundissa.">
            <div className="space-y-4">
              <ExampleIntro title="Proto-polku UI-validointiin: timed warmup, rep strength ja timed cooldown samassa sessionakyvassa.">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
                  <p>Session demon lähde on suoraan COMPACT-tekstistä parsittu kolmen workoutin kokonaisuus.</p>
                </div>
              </ExampleIntro>
              <NpmImportBlock imports={["ActiveWorkoutSession", "VirtualClock"]} />
              <div className="space-y-4">
                {/* Component first */}
                <PreviewSurface>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-sm text-slate-300">
                      <span className="text-xs uppercase tracking-[0.18em] text-slate-500">Session speed</span>
                      {durationTimerPlaybackRates.map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setActiveSessionPlaybackRate(rate)}
                          className={`rounded-full border px-3 py-1.5 transition ${activeSessionPlaybackRate === rate ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-slate-100'}`}
                        >
                          {rate}x
                        </button>
                      ))}
                      <span className="text-xs text-slate-500">Yksi jaettu VirtualClock syottaa koko session etenemista.</span>
                    </div>

                    {activeSessionParse.success ? (
                      <ActiveWorkoutSession
                        workouts={activeSessionWorkouts}
                        clock={activeSessionClock}
                      />
                    ) : (
                      <div className="rounded-2xl border border-rose-700 bg-rose-950/40 p-4 text-sm text-rose-100">
                        Session source parse failed: {activeSessionParse.error.message}
                      </div>
                    )}
                  </div>
                </PreviewSurface>

                {/* Code preview below */}
                <div className="grid gap-4 xl:grid-cols-2">
                  <InterfaceBlock value={componentInterfaces['organism-active-workout-session']} />
                  <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                    <code>{activeWorkoutSessionCompactExample}</code>
                  </pre>
                </div>
              </div>
            </div>
          </GalleryCard>
        );
      case 'playground-compact-input':
        return (
          <GalleryCard title="COMPACT Playground" subtitle="Pasteta COMPACT-koodia, renderoi se UI-komponenteilla ja lataa parserin AST JSON-muodossa.">
            <div className="space-y-4">
              <NpmImportBlock imports={["FieldLabel"]} />
              <NpmImportBlock imports={["parseCompact", "workoutsFromCompact", "CompactBlogView"]} />

              <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">COMPACT input</p>
                    <p className="mt-1 text-sm text-slate-400">Syota yksi tai useampi workout COMPACT-muodossa. Editori on ylhaalla ja renderoity tulos alapuolella.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-orange-400 hover:text-white"
                      onClick={() => loadCompactPlaygroundSource(compactPlaygroundExample)}
                    >
                      Lataa pieni esimerkki
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-orange-400 hover:text-white"
                      onClick={() => loadCompactPlaygroundSource(minimonsterCompactText)}
                    >
                      Lataa MINIMONSTER
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-200 transition hover:border-orange-400 hover:bg-orange-500/20"
                      onClick={() => setRenderedCompactSource(compactPlaygroundSource)}
                    >
                      Renderoi COMPACT
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-200 transition hover:border-sky-400 hover:bg-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={exportCompactJson}
                      disabled={!compactPlaygroundParse.success}
                    >
                      Export JSON
                    </button>
                  </div>
                </div>

                <textarea
                  className="min-h-[420px] w-full rounded-2xl border border-slate-700 bg-slate-950/80 p-4 font-mono text-xs leading-6 text-slate-200 outline-none transition focus:border-orange-400"
                  value={compactPlaygroundSource}
                  onChange={(event) => loadCompactPlaygroundSource(event.target.value)}
                  spellCheck={false}
                />
              </div>

              <PreviewSurface>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Parse status</p>
                      <p className="mt-1 text-sm text-slate-400">Renderointi ja export kayttavat viimeksi renderoitya syotetta.</p>
                    </div>
                    {compactPlaygroundParse.success ? (
                      <div className="flex flex-wrap gap-2">
                        <Badge tone="good">workouts {compactPlaygroundParse.document.workouts.length}</Badge>
                        <Badge tone="accent">preview {compactPlaygroundPreview.workouts.length}</Badge>
                      </div>
                    ) : (
                      <Badge tone="danger">parse error</Badge>
                    )}
                  </div>

                  {compactPlaygroundParse.success ? (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-emerald-100">
                      Parseri onnistui. JSON-export lataa `document`-AST:n sellaisenaan.
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-3 text-sm text-rose-200">
                      {compactPlaygroundParse.error.location?.start
                        ? `Line ${compactPlaygroundParse.error.location.start.line}, column ${compactPlaygroundParse.error.location.start.column}: ${compactPlaygroundParse.error.message}`
                        : compactPlaygroundParse.error.message}
                    </div>
                  )}
                </div>
              </PreviewSurface>

              {compactPlaygroundPreview.error ? (
                <PreviewSurface>
                  <p className="text-sm text-rose-300">{compactPlaygroundPreview.error}</p>
                </PreviewSurface>
              ) : compactPlaygroundPreview.workouts.length > 0 ? (
                compactPlaygroundPreview.workouts.map((item, index) => (
                  <PreviewSurface key={`${item.title}-${index}`}>
                    <CompactBlogView
                      workout={item}
                      headerOptions={{
                        showTags: true,
                        showEmojis: true,
                        showPoints: true,
                      }}
                    />
                  </PreviewSurface>
                ))
              ) : (
                <PreviewSurface>
                  <p className="text-sm text-slate-400">Ei renderoitavia workoutteja. Kokeile liittaa COMPACT-teksti ja paina Renderoi COMPACT.</p>
                </PreviewSurface>
              )}

              {compactPlaygroundParse.success && (
                <PreviewSurface>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">AST preview</p>
                        <p className="mt-1 text-sm text-slate-400">JSON-export vastaa tata rakennetta.</p>
                      </div>
                      <Badge tone="warn">workouts {compactPlaygroundParse.document.workouts.length}</Badge>
                    </div>
                    <pre className="max-h-[420px] overflow-auto rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-xs leading-6 text-slate-200">
                      <code>{JSON.stringify(compactPlaygroundParse.document, null, 2)}</code>
                    </pre>
                  </div>
                </PreviewSurface>
              )}

              <InterfaceBlock value={componentInterfaces['playground-compact-input']} />
            </div>
          </GalleryCard>
        );
      case 'playground-minimonster':
        return (
          <GalleryCard title="MINIMONSTER" subtitle="Massiivinen all-in-one referenssitreeni, jossa on kaytannossa lahes kaikki tuetut content-tyypit samassa workoutissa.">
            <div className="space-y-6">
              {minimonsterWorkout ? (
                <>
                  <NpmImportBlock imports={["CompactBlogView"]} />
                  <PreviewSurface>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-100">MINIMONSTER full render</p>
                          <p className="text-xs text-slate-400">Tama sivu on tarkoitettu raskaan referenssitreeni-datan silmamaaraiseen validointiin.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge tone="good">rows {minimonsterWorkout.rows.length}</Badge>
                          <Badge tone="warn">tags {(minimonsterWorkout.tags ?? []).length}</Badge>
                        </div>
                      </div>
                      <CompactBlogView
                        workout={minimonsterWorkout}
                        headerOptions={{
                          showTags: true,
                          showEmojis: true,
                          showPoints: true,
                        }}
                      />
                    </div>
                  </PreviewSurface>

                  <InterfaceBlock value={componentInterfaces['playground-minimonster']} />
                </>
              ) : (
                <PreviewSurface>
                  <p className="text-sm text-rose-300">MINIMONSTER ei parsittu oikein. Tarkista ylapuolen virheviesti.</p>
                </PreviewSurface>
              )}
            </div>
          </GalleryCard>
        );
      case 'playground-workouts':
        return (
          <GalleryCard title="Sample.compact Playground" subtitle="Nykyinen data-driven playground on edelleen tallella, mutta nyt omana galleriasivunaan. Tasta voi tarkistaa sample.compact-parseroinnin ja organismien kaytokontekstin.">
            <div className="grid gap-6">
              <NpmImportBlock imports={["CompactBlogView", "CompactBlogEditor", "workoutsFromCompact"]} />
              <PreviewSurface>
                <CompactBlogView
                  workout={sourceWorkouts[selectedIndex]}
                  headerOptions={{
                    showTags: true,
                    showEmojis: true,
                    showPoints: true,
                  }}
                />
              </PreviewSurface>
              <PreviewSurface>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">Workout mode</p>
                    <p className="text-xs text-slate-400">Vaihda koko korttipinon view- ja edit-moodin valilla sample.compact-datan sisalla.</p>
                  </div>
                  <div className="flex gap-2 rounded-lg border border-slate-700 bg-slate-900/70 p-1">
                    <button
                      className={`rounded-md px-3 py-1 text-sm ${mode === 'view' ? 'bg-orange-500 text-white' : 'text-slate-300'}`}
                      onClick={() => setMode('view')}
                    >
                      View
                    </button>
                    <button
                      className={`rounded-md px-3 py-1 text-sm ${mode === 'edit' ? 'bg-orange-500 text-white' : 'text-slate-300'}`}
                      onClick={() => setMode('edit')}
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {mode === 'edit' && (
                  <div className="mb-5 rounded-lg border border-slate-700 bg-slate-900/60 p-3">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">sample.compact workout</label>
                    <select
                      value={selectedIndex}
                      onChange={(event) => selectWorkout(Number(event.target.value))}
                      className="w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-200"
                    >
                      {sourceWorkouts.map((item, index) => (
                        <option key={`${item.title}-${index}`} value={index}>
                          {item.date} - {item.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {mode === 'view' ? (
                  <div className="space-y-8">
                    {sourceWorkouts.map((item, index) => (
                      <CompactBlogView
                        key={`${item.title}-${index}`}
                        workout={item}
                        headerOptions={{
                          showTags: true,
                          showEmojis: true,
                          showPoints: true,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <CompactBlogEditor workout={workout} onChange={setWorkout} />
                )}
              </PreviewSurface>
              <InterfaceBlock value={componentInterfaces['playground-workouts']} />
            </div>
          </GalleryCard>
        );
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rt-card flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-300/80">Vite playground</p>
            <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">RT Compact UI Component Gallery</h1>
            <p className="max-w-3xl text-sm text-slate-400">
              Storybook-tyylinen selaus nykyisille atomeille, molekyyleille ja organismeille. Vasemman valikon kautta paasee suoraan yksittaiseen komponenttiin,
              sen previewhin ja prop-rajapintaan.
            </p>
          </div>
          {activeMeta && (
            <div className="rounded-2xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <SectionEyebrow kind={activeMeta.kind} />
                <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${NavTone({ kind: activeMeta.kind })}`}>{activeMeta.label}</span>
              </div>
              <p className="mt-2 max-w-sm text-xs text-slate-400">{activeMeta.description}</p>
            </div>
          )}
        </header>

        {(parsed.error || minimonsterParsed.error) && (
          <div className="space-y-1">
            {parsed.error && <p className="text-xs text-rose-300">sample.compact: {parsed.error}</p>}
            {minimonsterParsed.error && <p className="text-xs text-rose-300">minimonster.compact: {minimonsterParsed.error}</p>}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[264px_minmax(0,1fr)]">
          <aside className="rt-card h-fit p-3.5 sm:p-4 xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-hidden">
            <div className="space-y-4 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto xl:overscroll-contain xl:pr-1">
              {galleryNav.map((group) => (
                <div key={group.title} className="space-y-1.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{group.title}</p>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const active = item.id === activeSection;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full rounded-xl border px-3 py-2.5 text-left transition ${
                            active
                              ? 'border-orange-400/70 bg-orange-500/10 text-white shadow-[0_0_0_1px_rgba(255,107,53,0.18)]'
                              : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-600 hover:bg-slate-900/70'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-medium leading-5">{item.label}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${NavTone({ kind: item.kind })}`}>
                              {item.kind}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
