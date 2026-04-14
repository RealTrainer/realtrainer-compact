import React, { useMemo, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { parseCompact, renderDocumentToMarkdown } from 'realtrainer-compact';
import {
  CompactBlogView,
  CompactView,
  CompactRowView,
  workoutsFromCompact,
} from 'realtrainer-compact/ui';
import type {
  CompactExerciseRow,
  CompactMoveRow,
  CompactPyramidRow,
  CompactRow,
  CompactWorkoutModel,
} from 'realtrainer-compact/ui';

const sampleExercise: CompactExerciseRow = {
  id: 'ex-1',
  type: 'exercise',
  name: 'Takakyykky',
  sets: 3,
  reps: 8,
  weightKg: 100,
  note: 'Lämmittelysarjat erikseen',
};

const samplePyramid: CompactPyramidRow = {
  id: 'pyr-1',
  type: 'pyramid',
  name: 'Penkkipunnerrus',
  sets: [
    { reps: 10, weightKg: 60 },
    { reps: 8, weightKg: 70 },
    { reps: 6, weightKg: 80 },
    { reps: 4, weightKg: 90 },
  ],
};

const sampleMove: CompactMoveRow = {
  id: 'move-1',
  type: 'move',
  sport: 'Juoksu',
  duration: { value: 45, unit: 'min' },
  distance: { value: 8, unit: 'km' },
  note: 'Peruskestävyysalueella',
};

const sampleExerciseDocRow: CompactExerciseRow = {
  id: 'exercise-doc-1',
  type: 'exercise',
  name: 'Bench Press',
  sets: 3,
  reps: 8,
  weightKg: 70,
  note: 'Tasainen kontrolloitu tempo',
};

const sampleRunningWorkout: CompactWorkoutModel = {
  title: 'Ulkojuoksu',
  date: '28.03.2026',
  tags: ['juoksu', 'pk'],
  rows: [
    {
      id: 'run-1',
      type: 'move',
      sport: 'Juoksu',
      duration: { value: 8.45, unit: 'min' },
      distance: { value: 1.03, unit: 'km' },
      splits: [
        {
          id: 'run-1-split-1',
          type: 'split',
          distance: { value: 1, unit: 'km' },
          pace: { minutes: 8, seconds: 11, perDistance: { value: 1, unit: 'km' } },
          hr: 140,
          note: null,
          splits: null,
          duration: undefined,
          intensity: null,
          customFields: null,
        },
      ],
      note: 'Rauhallinen ulkojuoksu',
      description: null,
      customFields: null,
      sets: undefined,
      count: undefined,
      countMax: null,
      steps: null,
      intensity: null,
      recovery: null,
    },
  ],
};

const sampleWorkout: CompactWorkoutModel = {
  title: 'Voimaharjoitus',
  date: '11.04.2026',
  tags: ['voima', 'jalat'],
  points: 45,
  rows: [
    { id: 'section-1', type: 'section', name: 'Pääharjoitus' },
    sampleExercise,
    samplePyramid,
    { id: 'section-2', type: 'section', name: 'Kestävyys' },
    sampleMove,
  ],
};

const EXERCISE_COMPACT = 'Exercise Takakyykky|3x8@100kg|Lämmittelysarjat erikseen';

const PYRAMID_COMPACT = 'Pyramid Penkkipunnerrus|10x60,8x70,6x80,4x90kg';

const MOVE_COMPACT = 'Run 8km | Peruskestävyysalueella';

const WORKOUT_COMPACT = `[2026-04-11]
## Voimaharjoitus
Tags voima, jalat
Points 45

Section Lämmittely
Exercise Koordit|2x20

Section Pääharjoitus
Exercise Takakyykky|3x8@100kg|Lämmittelysarjat erikseen
Pyramid Penkkipunnerrus|10x60,8x70,6x80,4x90kg

Section Loppuverryttely
Run 8km | Peruskestävyysalueella`;

const MARKDOWN_RENDERER_COMPACT = `[2026-04-14] ## Voimatreeni
Tags voima, sali
Emojis 💪
Section Lämmittely
Exercise Kyykky|2x10@40kg
Section Pääosa
Exercise Takakyykky|3x5@90kg
Pyramid Penkki|10x60,8x70,6x80kg
Expense 14.90 | Palautusjuoma`;

const EDITOR_FONT_FAMILY = [
  '"Fira Code"',
  '"SFMono-Regular"',
  'Monaco',
  'Consolas',
  '"Liberation Mono"',
  'Menlo',
  'monospace',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Noto Color Emoji"',
  '"EmojiOne Color"',
].join(', ');

function normalizeCompactSnippet(input: string): string {
  const firstLine = input.split('\n').find((line) => line.trim().length > 0)?.trim() ?? '';

  if (!firstLine || firstLine.startsWith('[') || firstLine.startsWith('## ')) {
    return input;
  }

  return input;
}

function PreviewFrame({ children, padded = true }: { children: React.ReactNode; padded?: boolean }) {
  return (
    <div className={`rt-doc-scope ${padded ? '' : 'rt-doc-scope--embed'}`.trim()}>
      {padded ? <div className="rt-card rt-doc-row-frame">{children}</div> : children}
    </div>
  );
}

function extractTextContent(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => extractTextContent(child)).join('');
  }

  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return extractTextContent(props.children);
  }

  return '';
}

type RenderTarget = 'row' | 'workout';

function parseJsonValue(text: string): { value: unknown | null; error: string | null } {
  try {
    return { value: JSON.parse(text), error: null };
  } catch (error) {
    return {
      value: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function JsonEditorDemo({
  initialValue,
  target,
}: {
  initialValue: unknown;
  target: RenderTarget;
}) {
  const [text, setText] = useState(() => JSON.stringify(initialValue, null, 2));
  const parsed = useMemo(() => parseJsonValue(text), [text]);
  const hasValue = parsed.value !== null;

  return (
    <div style={{ marginTop: '1rem' }}>
      <div
        style={{
          border: '2px solid #3b82f6',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '1rem',
        }}
      >
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          spellCheck={false}
          style={{
            width: '100%',
            minHeight: '260px',
            fontFamily: EDITOR_FONT_FAMILY,
            fontSize: '0.9rem',
            lineHeight: '1.5',
            padding: '1rem',
            border: 'none',
            outline: 'none',
            resize: 'vertical',
            background: '#1e1e1e',
            color: '#d4d4d4',
          }}
        />
      </div>

      {parsed.error && (
        <div
          style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            background: '#fee2e2',
            color: '#b91c1c',
            borderRadius: '6px',
            fontSize: '0.85rem',
            border: '1px solid #fca5a5',
          }}
        >
          JSON error: {parsed.error}
        </div>
      )}

      {!parsed.error && hasValue && target === 'row' && (
        <PreviewFrame>
          <CompactRowView row={parsed.value as CompactRow} />
        </PreviewFrame>
      )}

      {!parsed.error && hasValue && target === 'workout' && (
        <PreviewFrame padded={false}>
          <CompactBlogView workout={parsed.value as CompactWorkoutModel} onRowInteraction={() => {}} />
        </PreviewFrame>
      )}
    </div>
  );
}

function EditableCompactPreview({
  initialCompact,
  minHeight = 160,
  showHeader = false,
}: {
  initialCompact: string;
  minHeight?: number;
  showHeader?: boolean;
}) {
  const [text, setText] = useState(initialCompact);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const normalized = useMemo(() => normalizeCompactSnippet(text), [text]);
  const parsed = useMemo(() => workoutsFromCompact(normalized), [normalized]);
  const parserExport = useMemo(() => parseCompact(normalized), [normalized]);
  const exportedJson = useMemo(() => JSON.stringify(parserExport, null, 2), [parserExport]);

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(exportedJson);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      setCopyState('error');
      window.setTimeout(() => setCopyState('idle'), 2200);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          marginBottom: '0.65rem',
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#94a3b8',
          }}
        >
          Editable COMPACT preview
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {copyState === 'copied' && (
            <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
              JSON copied
            </span>
          )}
          {copyState === 'error' && (
            <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600 }}>
              Copy failed
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              void handleCopyJson();
            }}
            style={{
              border: '1px solid #334155',
              background: '#0f172a',
              color: '#e2e8f0',
              borderRadius: '8px',
              padding: '0.45rem 0.7rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Copy JSON
          </button>
        </div>
      </div>

      <div
        className="rt-editable-preview"
      >
        <textarea
          className="rt-editable-preview__input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          spellCheck={false}
          style={{
            minHeight: `${minHeight}px`,
            fontFamily: EDITOR_FONT_FAMILY,
          }}
        />
      </div>

      {parsed.error && (
        <div
          style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            background: '#fee2e2',
            color: '#b91c1c',
            borderRadius: '6px',
            border: '1px solid #fca5a5',
            fontSize: '0.85rem',
          }}
        >
          {parsed.error}
        </div>
      )}

      {!parsed.error && (
        <CompactPreviewWorkouts
          workouts={parsed.workouts}
          showHeader={showHeader}
          showMetaStrip={!showHeader}
        />
      )}
    </div>
  );
}

function CompactPreviewWorkouts({
  workouts,
  showHeader = false,
  showMetaStrip = !showHeader,
}: {
  workouts: ReturnType<typeof workoutsFromCompact>['workouts'];
  showHeader?: boolean;
  showMetaStrip?: boolean;
}) {
  /*
<CompactBlogView
            workout={workout}
            showHeader={showHeader}
            headerOptions={{
              showMetaStrip,
            }}
          />  
  */
  return (
    <div style={{ marginTop: '1rem' }}>
      {workouts.map((workout, index) => (
        <PreviewFrame key={`${workout.title || 'workout'}-${index}`} padded={false}>
          <CompactView data={workout} headerOptions={{
            showEmojis: true,
            showTags: true,
            showPoints: true,
          }}/>                    
        </PreviewFrame>
      ))}
    </div>
  );
}

/**
 * Demo: Single Exercise Row
 */
export function ExerciseDemo() {
  return (
    <EditableCompactPreview initialCompact={EXERCISE_COMPACT} minHeight={84} showHeader={false} />
  );
}

/**
 * Demo: Pyramid Row
 */
export function PyramidDemo() {
  return (
    <EditableCompactPreview initialCompact={PYRAMID_COMPACT} minHeight={84} showHeader={false} />
  );
}

/**
 * Demo: Move Row
 */
export function MoveDemo() {
  return (
    <EditableCompactPreview initialCompact={MOVE_COMPACT} minHeight={84} showHeader={false} />
  );
}

/**
 * Demo: Full Workout Card
 */
export function WorkoutDemo() {
  return (
    <EditableCompactPreview initialCompact={WORKOUT_COMPACT} minHeight={280} showHeader />
  );
}

export function CompactViewDemo() {
  return (
    <EditableCompactPreview initialCompact={WORKOUT_COMPACT} minHeight={280} showHeader />
  );
}

export function CompactViewParsedDemo() {
  const parsed = parseCompact(WORKOUT_COMPACT);

  return (
    <PreviewFrame padded={false}>
      <CompactView data={parsed} showHeader />
    </PreviewFrame>
  );
}

export function ExerciseStaticExample() {
  return (
    <PreviewFrame>
      <CompactRowView row={sampleExerciseDocRow} />
    </PreviewFrame>
  );
}

export function RunningWorkoutStaticExample() {
  return (
    <PreviewFrame padded={false}>
      <CompactBlogView workout={sampleRunningWorkout} onRowInteraction={() => {}} />
    </PreviewFrame>
  );
}

export function CompactSnippetExample({
  compact,
}: {
  compact: string;
}) {
  return (
    <>
      <CodeBlock language="compact">
        {compact}
      </CodeBlock>
      <CompactRenderExample compact={compact} />
    </>
  );
}

export function CompactExampleBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  const compact = useMemo(() => extractTextContent(children).trim(), [children]);

  return (
    <>
      {children}
      <CompactRenderExample compact={compact} />
      
    </>
  );
}

export function EditableCompactExampleBlock({
  children,
  minHeight = 160,
  showHeader = false,
}: {
  children: React.ReactNode;
  minHeight?: number;
  showHeader?: boolean;
}) {
  const compact = useMemo(() => extractTextContent(children).trim(), [children]);

  return (
    <EditableCompactPreview
      initialCompact={compact}
      minHeight={minHeight}
      showHeader={showHeader}
    />
  );
}

export function CompactRenderExample({
  compact,
}: {
  compact: string;
}) {
  const normalized = useMemo(() => normalizeCompactSnippet(compact), [compact]);
  const parsed = useMemo(() => workoutsFromCompact(normalized), [normalized]);

  if (parsed.error) {
    return (
      <div
        style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#fee2e2',
          color: '#b91c1c',
          borderRadius: '6px',
          border: '1px solid #fca5a5',
          fontSize: '0.85rem',
        }}
      >
        {parsed.error}
      </div>
    );
  }

  return <CompactPreviewWorkouts workouts={parsed.workouts} showHeader={false} showMetaStrip />;
}

// ─────────────────────────────────────────────────────────────
// Live Editor: Interactive COMPACT text → rendered output
// ─────────────────────────────────────────────────────────────

const DEFAULT_COMPACT = `[2026-02-09] ## Kontrastivoima (Sali) & Kierto
Tags voima, kontrasti, sali, kuntosali
Emojis 🏋️💥
Exercise Takakyykky|3x5@90kg
Exercise Vauhditon pituus|3x4
Exercise Penkkipunnerrus|3x5@80kg
Text Kontrastipari: raskas nosto ja rajahteva toisto vuorotellen, palautus 90 s
Exercise Räjähtävä punnerrus|3x5
Exercise Vatsakiertokone|3x20
Exercise Isometrinen kyykkypito seinää vasten|3x45s,45s,0s
Exercise Lankku|2x25s,24s`;

export function LiveEditor() {
  return <EditableCompactPreview initialCompact={DEFAULT_COMPACT} minHeight={280} showHeader />;
}

export function MarkdownRendererDemo() {
  const [text, setText] = useState(MARKDOWN_RENDERER_COMPACT);
  const [activeTab, setActiveTab] = useState<'markdown' | 'rendered'>('markdown');
  const parseResult = useMemo(() => parseCompact(text), [text]);

  const markdownState = useMemo(() => {
    if (!parseResult.success) {
      return { markdown: '', error: null as string | null };
    }

    try {
      return {
        markdown: renderDocumentToMarkdown(parseResult.document),
        error: null as string | null,
      };
    } catch (error) {
      return {
        markdown: '',
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }, [parseResult]);

  const markdown = markdownState.markdown;

  return (
    <div style={{ marginTop: '1rem' }}>
      <div
        style={{
          border: '2px solid #3b82f6',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '1rem',
        }}
      >
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          spellCheck={false}
          style={{
            width: '100%',
            minHeight: '180px',
            fontFamily: EDITOR_FONT_FAMILY,
            fontSize: '0.9rem',
            lineHeight: '1.5',
            padding: '1rem',
            border: 'none',
            outline: 'none',
            resize: 'vertical',
            background: '#1e1e1e',
            color: '#d4d4d4',
          }}
        />
      </div>

      {!parseResult.success && (
        <div
          style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            background: '#fee2e2',
            color: '#b91c1c',
            borderRadius: '6px',
            border: '1px solid #fca5a5',
            fontSize: '0.85rem',
          }}
        >
          Parse error: {parseResult.error.message}
        </div>
      )}

      {parseResult.success && (
        <>
          {markdownState.error && (
            <div
              style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                background: '#fee2e2',
                color: '#b91c1c',
                borderRadius: '6px',
                border: '1px solid #fca5a5',
                fontSize: '0.85rem',
              }}
            >
              Renderer error: {markdownState.error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setActiveTab('markdown')}
              style={{
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '999px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: activeTab === 'markdown' ? 'var(--ifm-color-primary)' : 'transparent',
                color: activeTab === 'markdown' ? 'white' : 'var(--ifm-font-color-base)',
              }}
            >
              Markdown
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rendered')}
              style={{
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '999px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: activeTab === 'rendered' ? 'var(--ifm-color-primary)' : 'transparent',
                color: activeTab === 'rendered' ? 'white' : 'var(--ifm-font-color-base)',
              }}
            >
              Rendered
            </button>
          </div>

          {activeTab === 'markdown' && <CodeBlock language="md">{markdown}</CodeBlock>}

          {activeTab === 'rendered' && (
            <div
              style={{
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '8px',
                padding: '1rem',
                background: 'var(--ifm-background-surface-color)',
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </div>
          )}
        </>
      )}
    </div>
  );
}
