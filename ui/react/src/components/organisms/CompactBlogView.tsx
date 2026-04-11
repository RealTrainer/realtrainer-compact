import type { CompactWorkoutModel } from '../../lib/types';
import { CompactRowView } from '../molecules/CompactRowView';
import { WorkoutHeader } from '../molecules/WorkoutHeader';

interface CompactBlogViewProps {
  workout: CompactWorkoutModel;
}

export function CompactBlogView({ workout }: CompactBlogViewProps) {
  return (
    <article className="rt-card mx-auto w-full max-w-4xl space-y-5 p-6 sm:p-8">
      <WorkoutHeader
        title={workout.title}
        date={workout.date}
        tags={workout.tags}
        emojis={workout.emojis}
        points={workout.points}
      />
      <div className="space-y-3">
        {workout.rows.map((row) => (
          <CompactRowView key={row.id} row={row} />
        ))}
      </div>
    </article>
  );
}
