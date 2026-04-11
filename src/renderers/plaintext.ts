/**
 * Plain Text Renderer
 *
 * Converts parsed COMPACT AST to plain text format for display.
 * Useful for terminal output, notifications, or simple displays.
 */

import type {
  Workout,
  Content,
  DateValue,
  Document,
  Exercise,
  Pyramid,
  Move,
  Tags,
} from '../types.js';

export interface PlainTextOptions {
  /** Include date in output (default: true) */
  includeDate?: boolean;
  /** Include tags (default: true) */
  includeTags?: boolean;
  /** Line prefix for content items (default: '  ') */
  indent?: string;
  /** Section separator (default: '\n') */
  sectionSeparator?: string;
}

const defaultOptions: PlainTextOptions = {
  includeDate: true,
  includeTags: true,
  indent: '  ',
  sectionSeparator: '\n',
};

/**
 * Render a complete Document to plain text
 */
export function renderDocumentToPlainText(document: Document, options?: PlainTextOptions): string {
  const opts = { ...defaultOptions, ...options };
  return document.workouts.map(w => renderWorkoutToPlainText(w, opts)).join('\n\n---\n\n');
}

/**
 * Render a single Workout to plain text
 */
export function renderWorkoutToPlainText(workout: Workout, options?: PlainTextOptions): string {
  const opts = { ...defaultOptions, ...options };
  const lines: string[] = [];

  // Header
  let header = '';
  if (opts.includeDate && workout.date) {
    header += formatDateForDisplay(workout.date) + ' - ';
  }
  header += workout.title || 'Untitled';
  lines.push(header);
  lines.push('='.repeat(header.length));

  // Tags
  const tags = workout.content.find(c => c.type === 'tags') as Tags | undefined;
  if (opts.includeTags && tags) {
    lines.push(`Tags: ${tags.tags.join(', ')}`);
  }

  // Content
  for (const item of workout.content) {
    if (item.type === 'tags' || item.type === 'emojis') continue;

    if (item.type === 'section') {
      lines.push(opts.sectionSeparator || '');
      lines.push(`[${item.name}]`);
      continue;
    }

    if (item.type === 'phase') {
      lines.push(opts.sectionSeparator || '');
      const phaseNum = item.number != null ? ` ${item.number}` : '';
      lines.push(`Phase${phaseNum}: ${item.name}`);
      if (item.details) {
        lines.push(`${opts.indent}${item.details}`);
      }
      continue;
    }

    const rendered = renderContentToPlainText(item);
    if (rendered) {
      lines.push(`${opts.indent}${rendered}`);
    }
  }

  return lines.join('\n');
}

/**
 * Format date for display
 */
function formatDateForDisplay(date: DateValue): string {
  if (date.type === 'date') {
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  }
  if (date.type === 'datetime') {
    const d = date as { year: number; month: number; day: number; hour: number; minute: number };
    return `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')} ${String(d.hour).padStart(2, '0')}:${String(d.minute).padStart(2, '0')}`;
  }
  if (date.type === 'week') {
    return `Week ${date.week}, ${date.year}`;
  }
  if (date.type === 'month') {
    return `${date.year}-${String(date.month).padStart(2, '0')}`;
  }
  if (date.type === 'year') {
    return `${date.year}`;
  }
  return '';
}

/**
 * Render a single content item to plain text
 */
export function renderContentToPlainText(item: Content): string | null {
  switch (item.type) {
    case 'exercise':
      return renderExercise(item);

    case 'pyramid':
      return renderPyramid(item);

    case 'move':
      return renderMove(item);

    case 'duration': {
      if (item.timeOfDay) {
        const h = String(item.timeOfDay.hour).padStart(2, '0');
        const m = String(item.timeOfDay.minute).padStart(2, '0');
        return `${h}:${m} ${item.description || ''}`.trim();
      }
      const val = item.duration!.value === null ? '?' : item.duration!.value;
      return `${val}${item.duration!.unit} ${item.description || ''}`.trim();
    }

    case 'food': {
      const parts: string[] = [];
      if (item.calories) parts.push(`${item.calories}kcal`);
      if (item.protein) parts.push(`${item.protein}g prot`);
      const nutrition = parts.length > 0 ? ` (${parts.join(', ')})` : '';
      return `Food: ${item.description || '-'}${nutrition}`;
    }

    case 'drinking': {
      const vol = item.volume && item.volumeUnit ? `${item.volume}${item.volumeUnit}` : '';
      return `Drink: ${vol} ${item.description || ''}`.trim();
    }

    case 'expense': {
      let str = `Expense: ${item.amount}${item.currency}`;
      if (item.description) str += ` - ${item.description}`;
      return str;
    }

    case 'sleep': {
      let str = `Sleep: ${item.duration}h`;
      if (item.quality) str += ` (${item.quality})`;
      return str;
    }

    case 'measurement': {
      const labels: Record<string, string> = {
        weight: 'Weight',
        bodyFat: 'Body fat',
        waist: 'Waist',
        hip: 'Hip',
      };
      return `${labels[item.measureType] || item.measureType}: ${item.value}${item.unit}`;
    }

    case 'health':
      return `Health (${item.healthType}): ${item.description || ''}`;

    case 'text':
      return item.value;

    case 'summary':
      return `Summary: ${item.text}`;

    case 'contacts':
      return `Contacts: ${item.count}${item.name ? ` (${item.name})` : ''}`;

    case 'location':
      return `Location: ${item.place}`;

    case 'url':
      return `URL: ${item.url}`;

    case 'reminder':
      return `Reminder ${item.date.year}-${String(item.date.month).padStart(2, '0')}-${String(item.date.day).padStart(2, '0')}: ${item.description || ''}`;

    case 'custom':
      return `${item.name}: ${item.value}${item.unit || ''}`;

    case 'derived': {
      const basis = item.basis ? ` basis:${item.basis}` : '';
      const confidence = item.confidence != null ? ` confidence:${item.confidence}%` : '';
      const source = item.source ? ` source:${item.source}` : '';
      const goodness = item.goodness != null ? ` goodness:${item.goodness}/5` : '';
      const note = item.note ? ` | ${item.note}` : '';
      return `Derived ${item.name}: ${item.value}${item.unit || ''}${basis}${confidence}${source}${goodness}${note}`;
    }

    case 'feeling': {
      const score = item.scale === 'rpe' ? `RPE ${item.value}` : `${item.value}/10`;
      return `Feeling: ${score}${item.description ? ` - ${item.description}` : ''}`;
    }

    case 'pain':
      return `Pain: ${item.bodyPart || '-'}${item.severity ? ` (${item.severity}/10)` : ''} ${item.description || ''}`.trim();

    case 'max': {
      const est = item.estimated ? ' (est)' : '';
      const pr = item.pr ? ' PR!' : '';
      return `Max ${item.name}: ${item.reps}x${item.weight}${item.unit}${est}${pr}`;
    }

    case 'best': {
      const pr = item.pr ? ' PR!' : '';
      return `Best ${item.name}: ${item.result.value}${item.result.unit === 'time' ? '' : item.result.unit}${pr}`;
    }

    case 'sport':
      return `Sport: ${item.name}`;

    case 'interval': {
      const intensity = item.intensity.min === item.intensity.max
        ? `${item.intensity.min}%`
        : `${item.intensity.min}-${item.intensity.max}%`;
      return `Interval: ${item.count}x${item.distance.value}${item.distance.unit} @ ${intensity}`;
    }

    case 'vitals':
      return `${item.key}: ${item.value}${item.unit || ''}`;

    case 'section':
    case 'phase':
    case 'tags':
    case 'emojis':
      return null;

    case 'unknown':
      return item.raw;

    default:
      return null;
  }
}

function renderExercise(item: Exercise): string {
  const parts: string[] = [item.name];

  if (item.sets != null) {
    let spec = '';
    const setsStr = item.setsMax ? `${item.sets}-${item.setsMax}` : `${item.sets}`;

    if (typeof item.reps === 'number') {
      const repsStr = item.repsMax ? `${item.reps}-${item.repsMax}` : `${item.reps}`;
      const bilateral = (item as any).repsRight ? `+${(item as any).repsRight}` : '';
      spec = `${setsStr}x${repsStr}${bilateral}`;
    } else if (item.reps === 'max') {
      spec = `${setsStr}xmax`;
    }

    if (item.unit) spec += item.unit;
    parts.push(spec);
  }

  if (item.weight) {
    if ('value' in item.weight) {
      if (item.weight.unit === 'bodyweight') {
        parts.push('@ bw');
      } else {
        const weightMax = item.weight.valueMax;
        const weightStr = weightMax && weightMax !== item.weight.value
          ? `${item.weight.value}-${weightMax}${item.weight.unit}`
          : `${item.weight.value}${item.weight.unit}`;
        parts.push(`@ ${weightStr}`);
      }
    } else if ('percent' in item.weight) {
      parts.push(`@ ${item.weight.percent}%`);
    }
  }

  if (item.note) parts.push(`(${item.note})`);

  return parts.join(' ');
}

function renderPyramid(item: Pyramid): string {
  const setsStr = item.sets.map(s => {
    let str = '';
    if (s.sets && s.sets > 1) str += `${s.sets}x`;
    str += s.repsRight !== undefined && s.repsRight !== null
      ? `${s.reps}+${s.repsRight}`
      : `${s.reps}`;
    if (s.weight && 'value' in s.weight) {
      str += `@${s.weight.value}${s.weight.unit}`;
    }
    return str;
  }).join(', ');

  return `${item.name} [${setsStr}]${item.note ? ` (${item.note})` : ''}`;
}

function renderMove(item: Move): string {
  const parts: string[] = [];

  if (item.sport && item.sport !== 'juoksu') {
    parts.push(item.sport);
  } else {
    parts.push('Run');
  }

  if (item.duration && item.duration.value) {
    parts.push(`${item.duration.value}${item.duration.unit}`);
  }

  if (item.distance && item.distance.value) {
    parts.push(`${item.distance.value}${item.distance.unit}`);
  }

  if (item.steps) {
    parts.push(`${item.steps} steps`);
  }

  if (item.intensity && 'min' in item.intensity && 'max' in item.intensity) {
    const intensity = item.intensity as { min: number; max: number };
    const intStr = intensity.min === intensity.max
      ? `${intensity.min}%`
      : `${intensity.min}-${intensity.max}%`;
    parts.push(`@ ${intStr}`);
  }

  const note = item.note || item.description;
  if (note) parts.push(`(${note})`);

  return parts.join(' ');
}
