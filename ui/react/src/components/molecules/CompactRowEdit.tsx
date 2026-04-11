import type { ChangeEvent } from 'react';
import type { CompactPyramidSet, CompactRow } from '../../lib/types';
import { FieldLabel } from '../atoms/FieldLabel';

interface CompactRowEditProps {
  row: CompactRow;
  onChange: (next: CompactRow) => void;
}

export function CompactRowEdit({ row, onChange }: CompactRowEditProps) {
  const pyramidSetsToText = () => {
    if (row.type !== 'pyramid') {
      return '';
    }
    return row.sets
      .map((set) => (typeof set.weightKg === 'number' ? `${set.reps}x${set.weightKg}kg` : `${set.reps}x`))
      .join(', ');
  };

  const parsePyramidSets = (value: string): CompactPyramidSet[] => {
    const parsed: CompactPyramidSet[] = [];
    for (const rawSegment of value.split(',')) {
      const segment = rawSegment.trim();
      if (!segment) {
        continue;
      }
      const match = segment.match(/^(\d+)x(?:([\d.]+)kg)?$/i);
      if (!match) {
        continue;
      }
      parsed.push({
        reps: Number(match[1]),
        weightKg: match[2] ? Number(match[2]) : undefined,
      });
    }
    return parsed;
  };

  const onInput = (key: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;

    if (row.type === 'pyramid' && key === 'setsText') {
      onChange({
        ...row,
        sets: parsePyramidSets(value),
      });
      return;
    }

    if (key === 'number') {
      onChange({ ...row, number: value.length === 0 ? null : Number(value) } as CompactRow);
      return;
    }

    if (key === 'sets' || key === 'reps' || key === 'weightKg' || key === 'distanceValue' || key === 'durationMin' || key === 'value' || key === 'depth') {
      const parsed = value.length === 0 ? undefined : Number(value);
      onChange({ ...row, [key]: parsed } as CompactRow);
      return;
    }

    onChange({ ...row, [key]: value } as CompactRow);
  };

  return (
    <div className="rt-row space-y-2 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-500">{row.type}</p>

      {row.type === 'summary' && (
        <>
          <FieldLabel>Summary</FieldLabel>
          <textarea className="rt-input" value={row.text} onChange={onInput('text')} rows={2} />
        </>
      )}

      {row.type === 'phase' && (
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <FieldLabel>Number</FieldLabel>
            <input className="rt-input" value={row.number ?? ''} onChange={onInput('number')} />
          </div>
          <div>
            <FieldLabel>Name</FieldLabel>
            <input className="rt-input" value={row.name} onChange={onInput('name')} />
          </div>
          <div>
            <FieldLabel>Details</FieldLabel>
            <input className="rt-input" value={row.details ?? ''} onChange={onInput('details')} />
          </div>
        </div>
      )}

      {row.type === 'section' && (
        <>
          <FieldLabel>Section</FieldLabel>
          <input className="rt-input" value={row.name} onChange={onInput('name')} />
        </>
      )}

      {row.type === 'exercise' && (
        <div className="grid gap-2 sm:grid-cols-5">
          <div className="sm:col-span-2">
            <FieldLabel>Name</FieldLabel>
            <input className="rt-input" value={row.name} onChange={onInput('name')} />
          </div>
          <div>
            <FieldLabel>Sets</FieldLabel>
            <input className="rt-input" value={row.sets} onChange={onInput('sets')} />
          </div>
          <div>
            <FieldLabel>Reps</FieldLabel>
            <input className="rt-input" value={row.reps} onChange={onInput('reps')} />
          </div>
          <div>
            <FieldLabel>Weight kg</FieldLabel>
            <input className="rt-input" value={row.weightKg ?? ''} onChange={onInput('weightKg')} />
          </div>
        </div>
      )}

      {row.type === 'pyramid' && (
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <FieldLabel>Name</FieldLabel>
            <input className="rt-input" value={row.name} onChange={onInput('name')} />
          </div>
          <div>
            <FieldLabel>Sets (e.g. 12x52.5kg, 10x40kg)</FieldLabel>
            <input className="rt-input" value={pyramidSetsToText()} onChange={onInput('setsText')} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel>Note</FieldLabel>
            <input className="rt-input" value={row.note ?? ''} onChange={onInput('note')} />
          </div>
        </div>
      )}

      {row.type === 'run' && (
        <div className="grid gap-2 sm:grid-cols-4">
          <div>
            <FieldLabel>Distance</FieldLabel>
            <input className="rt-input" value={row.distanceValue ?? ''} onChange={onInput('distanceValue')} />
          </div>
          <div>
            <FieldLabel>Unit</FieldLabel>
            <input className="rt-input" value={row.distanceUnit ?? ''} onChange={onInput('distanceUnit')} />
          </div>
          <div>
            <FieldLabel>Duration min</FieldLabel>
            <input className="rt-input" value={row.durationMin ?? ''} onChange={onInput('durationMin')} />
          </div>
          <div>
            <FieldLabel>Note</FieldLabel>
            <input className="rt-input" value={row.note ?? ''} onChange={onInput('note')} />
          </div>
        </div>
      )}

      {row.type === 'duration' && (
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <FieldLabel>Value</FieldLabel>
            <input className="rt-input" value={row.value} onChange={onInput('value')} />
          </div>
          <div>
            <FieldLabel>Unit</FieldLabel>
            <input className="rt-input" value={row.unit} onChange={onInput('unit')} />
          </div>
          <div>
            <FieldLabel>Description</FieldLabel>
            <input className="rt-input" value={row.description ?? ''} onChange={onInput('description')} />
          </div>
        </div>
      )}

      {row.type === 'split' && (
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <FieldLabel>Depth</FieldLabel>
            <input className="rt-input" value={row.depth} onChange={onInput('depth')} />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel>Split text</FieldLabel>
            <input className="rt-input" value={row.text} onChange={onInput('text')} />
          </div>
        </div>
      )}

      {row.type === 'text' && (
        <>
          <FieldLabel>Text</FieldLabel>
          <textarea className="rt-input" value={row.text} onChange={onInput('text')} rows={2} />
        </>
      )}

      {row.type === 'unknown' && (
        <>
          <FieldLabel>Unknown raw line</FieldLabel>
          <textarea className="rt-input" value={row.raw} onChange={onInput('raw')} rows={2} />
        </>
      )}
    </div>
  );
}
