import React, { useMemo, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import {
  CompactBlogView,
  CompactRowView,
  workoutsFromCompact,
} from 'realtrainer-compact/ui';

const sampleExercise = {
  id: 'ex-1',
  type: 'exercise',
  name: 'Takakyykky',
  sets: 3,
  reps: 8,
  weightKg: 100,
  note: 'Lämmittelysarjat erikseen',
};

const samplePyramid = {
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

const sampleMove = {
  id: 'move-1',
  type: 'move',
  sport: 'Juoksu',
  duration: { value: 45, unit: 'min' },
  distance: { value: 8, unit: 'km' },
  note: 'Peruskestävyysalueella',
};

const sampleExerciseDocRow = {
  id: 'exercise-doc-1',
  type: 'exercise',
  name: 'Bench Press',
  sets: 3,
  reps: 8,
  weightKg: 70,
  note: 'Tasainen kontrolloitu tempo',
};

const sampleRunningWorkout = {
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
          pace: { value: `8'11"`, unit: '/km' },
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

const sampleWorkout = {
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

function PreviewFrame({ children, padded = true }: { children: React.ReactNode; padded?: boolean }) {
  return (
    <div className={`rt-doc-scope ${padded ? '' : 'rt-doc-scope--embed'}`.trim()}>
      {padded ? <div className="rt-card rt-doc-row-frame">{children}</div> : children}
    </div>
  );
}

function firstNonEmptyLine(text: string): string {
  const lines = text.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }

  return '';
}

function ensureWorkoutWrapper(compact: string, title: string): string {
  const firstLine = firstNonEmptyLine(compact);

  if (firstLine.startsWith('[') || firstLine.startsWith('## ')) {
    return compact;
  }

  return `[2026-01-01] ## ${title}\n${compact}`;
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
            fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
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
          <CompactRowView row={parsed.value as typeof sampleExercise} />
        </PreviewFrame>
      )}

      {!parsed.error && hasValue && target === 'workout' && (
        <PreviewFrame padded={false}>
          <CompactBlogView workout={parsed.value as typeof sampleWorkout} onRowInteraction={() => {}} />
        </PreviewFrame>
      )}
    </div>
  );
}

/**
 * Demo: Single Exercise Row
 */
export function ExerciseDemo() {
  return (
    <JsonEditorDemo initialValue={sampleExercise} target="row" />
  );
}

/**
 * Demo: Pyramid Row
 */
export function PyramidDemo() {
  return (
    <JsonEditorDemo initialValue={samplePyramid} target="row" />
  );
}

/**
 * Demo: Move Row
 */
export function MoveDemo() {
  return (
    <JsonEditorDemo initialValue={sampleMove} target="row" />
  );
}

/**
 * Demo: Full Workout Card
 */
export function WorkoutDemo() {
  return (
    <JsonEditorDemo initialValue={sampleWorkout} target="workout" />
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
  title = 'Example',
}: {
  compact: string;
  title?: string;
}) {
  return (
    <>
      <CodeBlock language="compact">
        {compact}
      </CodeBlock>
      <CompactRenderExample compact={compact} title={title} />
    </>
  );
}

export function CompactExampleBlock({
  children,
  title = 'Example',
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const compact = useMemo(() => extractTextContent(children).trim(), [children]);

  return (
    <>
      {children}
      <CompactRenderExample compact={compact} title={title} />
    </>
  );
}

export function CompactRenderExample({
  compact,
  title = 'Example',
}: {
  compact: string;
  title?: string;
}) {
  const normalized = useMemo(() => ensureWorkoutWrapper(compact, title), [compact, title]);
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

  return (
    <div style={{ marginTop: '1rem' }}>
      {parsed.workouts.map((workout: (typeof parsed.workouts)[number], index: number) => (
        <PreviewFrame key={`${workout.title}-${index}`} padded={false}>
          <CompactBlogView
            workout={workout}
            showHeader={false}
            headerOptions={{
              showMetaStrip: true,
            }}
          />
        </PreviewFrame>
      ))}
    </div>
  );
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
  const [text, setText] = useState(DEFAULT_COMPACT);

  const parsed = useMemo(() => workoutsFromCompact(text), [text]);
  const workout = parsed.workouts[0];

  return (
    <div style={{ marginTop: '1rem' }}>
      {/* Editable code block */}
      <div style={{
        border: '2px solid #3b82f6',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '1.5rem',
      }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          style={{
            width: '100%',
            minHeight: '280px',
            fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
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
        <div style={{ 
          marginBottom: '1rem', 
          padding: '0.75rem', 
          background: '#fee2e2', 
          color: '#b91c1c', 
          borderRadius: '6px', 
          fontSize: '0.85rem',
          border: '1px solid #fca5a5',
        }}>
          {parsed.error}
        </div>
      )}

      {/* Live render label */}
      <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Live render:</p>

      {/* Rendered output */}
      {workout ? (
        <PreviewFrame padded={false}>
          <CompactBlogView workout={workout} onRowInteraction={() => {}} />
        </PreviewFrame>
      ) : (
        <div
          style={{
            border: '1px solid #273447',
            borderRadius: '8px',
            padding: '1rem',
            color: '#97a8c2',
            fontStyle: 'italic',
          }}
        >
          Kirjoita COMPACT-tekstiä ylläolevaan editoriin...
        </div>
      )}
    </div>
  );
}
