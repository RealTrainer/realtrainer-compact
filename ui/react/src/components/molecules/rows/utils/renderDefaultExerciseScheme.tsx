import { statFromExerciseRow } from '../../../../lib/formatters';
import type { CompactExerciseRow } from '../../../../lib/types';
import { StatChip } from '../../../atoms/StatChip';

export function renderDefaultExerciseScheme(row: CompactExerciseRow) {
  const stat = statFromExerciseRow(row);
  const schemeParts = stat.parts;

  return {
    schemeParts,
    node: <StatChip stat={stat} />,
  };
}