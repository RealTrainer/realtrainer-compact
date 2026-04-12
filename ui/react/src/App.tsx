import { useEffect, useState } from 'react';
import { Badge } from './components/atoms/Badge';
import { FieldLabel } from './components/atoms/FieldLabel';
import { StatChip } from './components/atoms/StatChip';
import { CompactRowEdit } from './components/molecules/CompactRowEdit';
import { CompactRowView } from './components/molecules/CompactRowView';
import { WorkoutHeader } from './components/molecules/WorkoutHeader';
import { CompactBlogEditor } from './components/organisms/CompactBlogEditor';
import { CompactBlogView } from './components/organisms/CompactBlogView';
import { compactStatFromText, statFromExerciseRow } from './lib/formatters';
import type { CompactExerciseRow, CompactRow, CompactWorkoutModel } from './lib/types';
import { parseCompact } from '../../../src/index.ts';
import { sampleWorkout } from './preview/fixtures';
import sampleCompactText from '../../../sample.compact?raw';
import minimonsterCompactText from '../../../data/minimonster.compact?raw';
import { workoutsFromCompact } from './preview/fromCompact';

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

type GallerySectionId =
  | 'overview'
  | 'atom-badge'
  | 'atom-field-label'
  | 'atom-stat-chip'
  | 'molecule-workout-header'
  | 'molecule-compact-row-view'
  | 'molecule-compact-row-edit'
  | 'organism-blog-view'
  | 'organism-blog-editor'
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
      { id: 'atom-field-label', label: 'FieldLabel', kind: 'atom', description: 'Lomakekenttien pieni otsake' },
      { id: 'atom-stat-chip', label: 'StatChip', kind: 'atom', description: 'Korostettu numerolabel' },
      { id: 'molecule-workout-header', label: 'WorkoutHeader', kind: 'molecule', description: 'Harjoituksen identiteettiotsake' },
      { id: 'molecule-compact-row-view', label: 'CompactRowView', kind: 'molecule', description: 'Yksittäisen rivin renderer' },
      { id: 'molecule-compact-row-edit', label: 'CompactRowEdit', kind: 'molecule', description: 'Yksittäisen rivin editori' },
    ],
  },
  {
    title: 'Koosteet',
    items: [
      { id: 'organism-blog-view', label: 'CompactBlogView', kind: 'organism', description: 'Koko workout-kortin view' },
      { id: 'organism-blog-editor', label: 'CompactBlogEditor', kind: 'organism', description: 'Koko workout-kortin editori' },
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
  | 'organism-blog-view'
  | 'organism-blog-editor'
  | 'playground-compact-input'
  | 'playground-minimonster'
  | 'playground-workouts';`,
  'atom-badge': `interface BadgeProps {
  children: React.ReactNode;
  tone?: 'default' | 'accent' | 'good' | 'warn' | 'danger';
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  onTouchStart?: React.TouchEventHandler<HTMLSpanElement>;
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
  'molecule-workout-header': `interface WorkoutHeaderProps {
  title?: string;
  date?: string;
  tags?: string[];
  emojis?: string;
  points?: number;
}`,
  'molecule-compact-row-view': `interface CompactRowViewProps {
  row: CompactRow;
  renderers?: CompactUiRenderers;
}`,
  'molecule-compact-row-edit': `interface CompactRowEditProps {
  row: CompactRow;
  onChange: (next: CompactRow) => void;
}`,
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
  'organism-blog-editor': `interface CompactBlogEditorProps {
  workout: CompactWorkoutModel;
  onChange: (next: CompactWorkoutModel) => void;
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
  const activeMeta = galleryNav.flatMap((group) => group.items).find((item) => item.id === activeSection);
  const compactPlaygroundParse = parseCompact(renderedCompactSource);
  const compactPlaygroundPreview = workoutsFromCompact(renderedCompactSource);

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

        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rt-card h-fit p-4 sm:p-5 xl:sticky xl:top-6">
            <div className="space-y-5">
              {galleryNav.map((group) => (
                <div key={group.title} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{group.title}</p>
                  <div className="space-y-1.5">
                    {group.items.map((item) => {
                      const active = item.id === activeSection;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
                            active
                              ? 'border-orange-400/70 bg-orange-500/10 text-white shadow-[0_0_0_1px_rgba(255,107,53,0.18)]'
                              : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-600 hover:bg-slate-900/70'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium">{item.label}</span>
                            <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${NavTone({ kind: item.kind })}`}>
                              {item.kind}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-400">{item.description}</p>
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
