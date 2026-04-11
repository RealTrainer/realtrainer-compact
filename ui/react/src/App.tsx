import { useState } from 'react';
import { CompactBlogEditor } from './components/organisms/CompactBlogEditor';
import { CompactBlogView } from './components/organisms/CompactBlogView';
import type { CompactWorkoutModel } from './lib/types';
import { sampleWorkout } from './preview/fixtures';
import sampleCompactText from './preview/sample.compact?raw';
import { workoutsFromCompact } from './preview/fromCompact';

function App() {
  const parsed = workoutsFromCompact(sampleCompactText);
  const sourceWorkouts = parsed.workouts.length > 0 ? parsed.workouts : [sampleWorkout];

  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [workout, setWorkout] = useState<CompactWorkoutModel>(sourceWorkouts[0]);

  const selectWorkout = (index: number) => {
    setSelectedIndex(index);
    setWorkout(sourceWorkouts[index]);
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto mb-4 w-full max-w-4xl space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-200">RT Compact UI Playground</h1>
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

        <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-3">
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
          {parsed.error && <p className="mt-2 text-xs text-rose-300">{parsed.error}</p>}
        </div>
      </div>

      {mode === 'view' ? <CompactBlogView workout={workout} /> : <CompactBlogEditor workout={workout} onChange={setWorkout} />}
    </main>
  );
}

export default App;
