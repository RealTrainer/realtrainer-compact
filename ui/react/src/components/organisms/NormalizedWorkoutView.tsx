import type { NormalizationWarning, NormalizedWorkout } from '../../lib/normalized-types';
import { Badge } from '../atoms/Badge';
import { WorkoutHeader } from '../molecules/WorkoutHeader';
import { NormalizedRowView } from '../molecules/NormalizedRowView';
import type { CompactBlogHeaderOptions } from './CompactBlogView';

export interface NormalizedWorkoutViewProps {
  workout: NormalizedWorkout;
  warnings?: NormalizationWarning[];
  showHeader?: boolean;
  headerOptions?: CompactBlogHeaderOptions;
}

export function NormalizedWorkoutView({
  workout,
  warnings = [],
  showHeader = true,
  headerOptions,
}: NormalizedWorkoutViewProps) {
  const metadataRequested = headerOptions?.showMetaStrip === true || !showHeader;
  const showTitle = headerOptions?.showTitle ?? showHeader;
  const showDate = headerOptions?.showDate ?? showHeader;
  const showTags = headerOptions?.showTags ?? metadataRequested;
  const showEmojis = headerOptions?.showEmojis ?? metadataRequested;
  const showMetaStrip = headerOptions?.showMetaStrip ?? (!showHeader && (workout.tags.length > 0 || Boolean(workout.emojis)));
  const headerVisible = showHeader && (showTitle || showDate || showTags || showEmojis);

  return (
    <article className="rt-card mx-auto w-full max-w-4xl space-y-5 p-6 sm:p-8" data-testid="normalized-workout-view">
      {headerVisible && (
        <WorkoutHeader
          title={showTitle ? workout.title ?? undefined : undefined}
          date={showDate ? (workout.date ? `${workout.date.type}` : undefined) : undefined}
          tags={showTags ? workout.tags : undefined}
          emojis={showEmojis ? workout.emojis || undefined : undefined}
        />
      )}

      {showMetaStrip && (
        <div className="flex flex-wrap items-center justify-center gap-2" data-testid="workout-meta-strip-normalized">
          {showTags && workout.tags.map((tag) => (
            <Badge key={tag} tone="good">{tag}</Badge>
          ))}
          {showEmojis && workout.emojis && <Badge tone="accent">{workout.emojis}</Badge>}
          <Badge tone="warn">canonical</Badge>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/8 p-4 text-sm text-amber-100" data-testid="normalized-warnings">
          <div className="mb-2 flex items-center gap-2">
            <Badge tone="warn">migration warnings</Badge>
            <span className="text-xs uppercase tracking-[0.18em] text-amber-200/80">manual review recommended</span>
          </div>
          <ul className="space-y-1">
            {warnings.map((warning, index) => (
              <li key={`${warning.code}-${index}`}>{warning.message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        {workout.rows.map((row, index) => (
          <NormalizedRowView key={`${row.type}-${index}`} row={row} />
        ))}
      </div>
    </article>
  );
}