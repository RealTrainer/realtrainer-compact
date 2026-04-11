import type { ReactElement } from 'react';
import type { CompactRow, CompactWorkoutModel } from '../../lib/types';
import { Badge } from '../atoms/Badge';
import { CompactRowView } from '../molecules/CompactRowView';
import { WorkoutHeader } from '../molecules/WorkoutHeader';

type RowInteractionEvent = 'click' | 'press' | 'hover';

export interface CompactBlogHeaderOptions {
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
}

function getDerivedLabel(name: string): string {
  const map: Record<string, string> = {
    'nutrition.sugar_simple': 'sokeri',
    'nutrition.sugar_complex': 'hiilari',
    'nutrition.fat_bad_total': 'paha rasva',
    'nutrition.fat_good_total': 'hyva rasva',
    'endurance.zone1_minutes': 'Zone1',
    'endurance.zone2_minutes': 'Zone2',
    'endurance.zone3_minutes': 'Zone3',
    'endurance.zone4_minutes': 'Zone4',
    'endurance.zone5_minutes': 'Zone5',
    'strength.neural_stress': 'hermokuorma',
    'strength.max_strength_emphasis': 'maksimivoima',
    'strength.power_emphasis': 'rajahdavyys',
    'strength.speed_strength_emphasis': 'nopeusvoima',
    'strength.strength_endurance_emphasis': 'voimakestavyys',
  };
  return map[name] || name.replace(/^[a-z]+\./i, '').replace(/_/g, ' ');
}

export function CompactBlogView({
  workout,
  onRowInteraction,
  showHeader = true,
  headerOptions,
}: CompactBlogViewProps) {
  const derived = workout.derivedValues ?? [];
  const metadataRequested = headerOptions?.showMetaStrip === true || !showHeader;
  const showTitle = headerOptions?.showTitle ?? showHeader;
  const showDate = headerOptions?.showDate ?? showHeader;
  const showTags = headerOptions?.showTags ?? metadataRequested;
  const showEmojis = headerOptions?.showEmojis ?? metadataRequested;
  const showPoints = headerOptions?.showPoints ?? metadataRequested;
  const showMetaStrip = headerOptions?.showMetaStrip ?? (!showHeader && ((workout.tags?.length ?? 0) > 0 || Boolean(workout.emojis) || typeof workout.points === 'number'));
  const hasHeaderContent = showHeader && (showTitle || showDate || showTags || showEmojis || showPoints);
  const renderedRows: ReactElement[] = [];

  for (let index = 0; index < workout.rows.length; index += 1) {
    const row = workout.rows[index];

    // Keep standalone split rows visually grouped like move-attached splits.
    if (row.type === 'split') {
      const splitRows: Extract<CompactRow, { type: 'split' }>[] = [row];
      let scanIndex = index + 1;
      while (scanIndex < workout.rows.length) {
        const candidate = workout.rows[scanIndex];
        if (candidate.type !== 'split') {
          break;
        }
        splitRows.push(candidate);
        scanIndex += 1;
      }

      renderedRows.push(
        <div key={`split-group-${row.id}`} className="mt-1 border-l-2 border-slate-600/70 pl-2" data-testid="standalone-splits-group">
          {splitRows.map((splitRow) => (
            <div
              key={splitRow.id}
              data-testid={`row-${splitRow.id}`}
              role={onRowInteraction ? 'button' : undefined}
              tabIndex={onRowInteraction ? 0 : undefined}
              onClick={onRowInteraction ? () => onRowInteraction(splitRow.id, 'click') : undefined}
              onMouseEnter={onRowInteraction ? () => onRowInteraction(splitRow.id, 'hover') : undefined}
              onKeyDown={onRowInteraction
                ? (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onRowInteraction(splitRow.id, 'press');
                    }
                  }
                : undefined}
              className={onRowInteraction ? 'cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/60' : undefined}
            >
              <CompactRowView row={splitRow} />
            </div>
          ))}
        </div>,
      );

      index = scanIndex - 1;
      continue;
    }

    renderedRows.push(
      <div
        key={row.id}
        data-testid={`row-${row.id}`}
        role={onRowInteraction ? 'button' : undefined}
        tabIndex={onRowInteraction ? 0 : undefined}
        onClick={onRowInteraction ? () => onRowInteraction(row.id, 'click') : undefined}
        onMouseEnter={onRowInteraction ? () => onRowInteraction(row.id, 'hover') : undefined}
        onKeyDown={onRowInteraction
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onRowInteraction(row.id, 'press');
              }
            }
          : undefined}
        className={onRowInteraction ? 'cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500/60' : undefined}
      >
        <CompactRowView row={row} />
      </div>,
    );
  }

  return (
    <article className="rt-card mx-auto w-full max-w-4xl space-y-5 p-6 sm:p-8">
      {hasHeaderContent && (
        <WorkoutHeader
          title={showTitle ? workout.title : undefined}
          date={showDate ? workout.date : undefined}
          tags={showTags ? workout.tags : undefined}
          emojis={showEmojis ? workout.emojis : undefined}
          points={showPoints ? workout.points : undefined}
        />
      )}

      {showMetaStrip && (
        <div className="flex flex-wrap items-center gap-2" data-testid="workout-meta-strip">
          {showTags && workout.tags.map((tag) => (
            <Badge key={tag} tone="good">{tag}</Badge>
          ))}
          {showEmojis && workout.emojis && <Badge tone="accent">{workout.emojis}</Badge>}
          {showPoints && typeof workout.points === 'number' && <Badge tone="warn">{workout.points}/100</Badge>}
        </div>
      )}

      <div className="space-y-1">{renderedRows}</div>

      {derived.length > 0 && (
        <section>
          <div className="rounded-lg bg-slate-800/40 p-3 sm:p-4" data-testid="derived-table">
            <div className="mb-2 text-xs text-slate-400">Johdetut arvot</div>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium sm:gap-6">
              {derived.map((item, index) => {
                const goodnessLabel = item.goodness
                  ? {
                      1: 'huono',
                      2: 'heikko',
                      3: 'ok',
                      4: 'hyva',
                      5: 'top',
                    }[item.goodness]
                  : null;

                const goodnessColor = item.goodness
                  ? {
                      1: 'text-red-300 bg-red-500/10 ring-red-500/20',
                      2: 'text-orange-300 bg-orange-500/10 ring-orange-500/20',
                      3: 'text-yellow-300 bg-yellow-500/10 ring-yellow-500/20',
                      4: 'text-green-300 bg-green-500/10 ring-green-500/20',
                      5: 'text-emerald-300 bg-emerald-500/10 ring-emerald-500/20',
                    }[item.goodness]
                  : 'text-slate-400';

                const displayUnit = item.unit
                  ? item.basis === 'entity' && item.unit.includes('/day')
                    ? item.unit.replace('/day', '')
                    : item.unit
                  : null;

                return (
                  <div key={`${item.name}-${index}`} className="flex items-center gap-1.5" data-testid="derived-row">
                    <span className="text-lg font-medium text-orange-400" data-testid="derived-value">
                      {item.value}
                      {displayUnit && <span className="ml-0.5 text-sm text-slate-400">{displayUnit}</span>}
                    </span>
                    <span className="text-xs text-slate-400" data-testid="derived-name">{getDerivedLabel(item.name)}</span>
                    {goodnessLabel && (
                      <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-full ring-1 leading-none ${goodnessColor}`} data-testid="derived-goodness">
                        {goodnessLabel}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
