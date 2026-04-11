import type { ChangeEvent } from 'react';
import type { CompactRow, CompactWorkoutModel } from '../../lib/types';
import { FieldLabel } from '../atoms/FieldLabel';
import { CompactRowEdit } from '../molecules/CompactRowEdit';

interface CompactBlogEditorProps {
  workout: CompactWorkoutModel;
  onChange: (next: CompactWorkoutModel) => void;
}

export function CompactBlogEditor({ workout, onChange }: CompactBlogEditorProps) {
  const updateHeader = (key: 'title' | 'date' | 'tags' | 'emojis') => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (key === 'tags') {
      onChange({
        ...workout,
        tags: value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      });
      return;
    }
    onChange({ ...workout, [key]: value });
  };

  const updateRowAt = (index: number) => (row: CompactRow) => {
    const nextRows = workout.rows.map((item, currentIndex) => (currentIndex === index ? row : item));
    onChange({ ...workout, rows: nextRows });
  };

  return (
    <section className="rt-card mx-auto w-full max-w-4xl space-y-4 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-100">Compact Row Editor</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <FieldLabel>Title</FieldLabel>
          <input className="rt-input" value={workout.title} onChange={updateHeader('title')} />
        </div>
        <div>
          <FieldLabel>Date</FieldLabel>
          <input className="rt-input" value={workout.date} onChange={updateHeader('date')} />
        </div>
        <div>
          <FieldLabel>Tags (comma separated)</FieldLabel>
          <input className="rt-input" value={workout.tags.join(', ')} onChange={updateHeader('tags')} />
        </div>
        <div>
          <FieldLabel>Emojis</FieldLabel>
          <input className="rt-input" value={workout.emojis ?? ''} onChange={updateHeader('emojis')} />
        </div>
      </div>
      <div className="space-y-3">
        {workout.rows.map((row, index) => (
          <CompactRowEdit key={row.id} row={row} onChange={updateRowAt(index)} />
        ))}
      </div>
    </section>
  );
}
