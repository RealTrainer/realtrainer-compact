import type { CompactUiRenderers } from '../../../lib/types';
import { normalizeRow } from './types';
import { renderDefaultExerciseScheme } from './utils/renderDefaultExerciseScheme';

export function Exercise({ row, renderers }: { row: Parameters<typeof normalizeRow<'exercise'>>[0]; renderers?: CompactUiRenderers }) {
  const exercise = normalizeRow(row);
  const { schemeParts, node: defaultSchemeNode } = renderDefaultExerciseScheme(exercise);
  const schemeNode = renderers?.renderExerciseScheme
    ? renderers.renderExerciseScheme(exercise, schemeParts, defaultSchemeNode)
    : defaultSchemeNode;

  return (
    <div className="rt-row flex items-center justify-between gap-2 py-1.5">
      <div>
        <div className="text-lg font-medium text-slate-100">{exercise.name}</div>
        {exercise.note && <div className="mt-0.5 text-sm text-slate-400">{exercise.note}</div>}
      </div>
      {schemeNode}
    </div>
  );
}