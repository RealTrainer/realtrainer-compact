/**
 * Markdown Renderer
 *
 * Converts parsed COMPACT AST to Markdown format for display.
 */

import type {
  Workout,
  Content,
  CompactDateValue,
  Document,
  Exercise,
  Pyramid,
  Move,
  Food,
  Expense,
  SleepEntry,
  BodyMeasurement,
  Health,
  Tags,
  DurationBlock,
} from '../types.js';

export interface MarkdownOptions {
  /** Include date in output (default: true) */
  includeDate?: boolean;
  /** Include emojis (default: true) */
  includeEmojis?: boolean;
  /** Include tags as hashtags (default: true) */
  includeTags?: boolean;
  /** Use bullet points for content items (default: true) */
  useBullets?: boolean;
  /** Header level for workout title (default: 2) */
  headerLevel?: 1 | 2 | 3 | 4;
}

const defaultOptions: MarkdownOptions = {
  includeDate: true,
  includeEmojis: true,
  includeTags: true,
  useBullets: true,
  headerLevel: 2,
};

/**
 * Render a complete Document to Markdown
 */
export function renderDocumentToMarkdown(document: Document, options?: MarkdownOptions): string {
  const opts = { ...defaultOptions, ...options };
  return document.workouts.map(w => renderWorkoutToMarkdown(w, opts)).join('\n\n---\n\n');
}

/**
 * Render a single Workout to Markdown
 */
export function renderWorkoutToMarkdown(workout: Workout, options?: MarkdownOptions): string {
  const opts = { ...defaultOptions, ...options };
  const lines: string[] = [];

  // Header with title
  const headerPrefix = '#'.repeat(opts.headerLevel || 2);
  let header = '';

  if (opts.includeDate && workout.date) {
    header += formatDateForDisplay(workout.date) + ' ';
  }

  // Add emojis before title
  const emojis = workout.content.find(c => c.type === 'emojis');
  if (opts.includeEmojis && emojis && emojis.type === 'emojis') {
    header += emojis.emojis + ' ';
  }

  header += workout.title || 'Untitled';
  lines.push(`${headerPrefix} ${header.trim()}`);

  // Tags
  const tags = workout.content.find(c => c.type === 'tags') as Tags | undefined;
  if (opts.includeTags && tags) {
    lines.push('');
    lines.push(tags.tags.map(t => `#${t.replace(/\s+/g, '-')}`).join(' '));
  }

  // Group content by sections
  const bullet = opts.useBullets ? '- ' : '';

  for (const item of workout.content) {
    // Skip already processed items
    if (item.type === 'tags' || item.type === 'emojis') continue;

    if (item.type === 'section') {
      lines.push('');
      lines.push(`### ${item.name}`);
      continue;
    }

    if (item.type === 'phase') {
      lines.push('');
      const phaseNum = item.number != null ? ` ${item.number}` : '';
      lines.push(`**Phase${phaseNum}: ${item.name}**`);
      if (item.details) {
        lines.push(`${bullet}${item.details}`);
      }
      continue;
    }

    const rendered = renderContentToMarkdown(item);
    if (rendered) {
      lines.push(`${bullet}${rendered}`);
    }
  }

  return lines.join('\n');
}

/**
 * Format date for display
 */
function formatDateForDisplay(date: CompactDateValue): string {
  if (date.type === 'date') {
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  }
  if (date.type === 'datetime') {
    const d = date as { year: number; month: number; day: number; hour: number; minute: number; timezone: string | null };
    return `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')} ${String(d.hour).padStart(2, '0')}:${String(d.minute).padStart(2, '0')}`;
  }
  if (date.type === 'week') {
    return `Week ${date.week}, ${date.year}`;
  }
  if (date.type === 'month') {
    const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.month]} ${date.year}`;
  }
  if (date.type === 'year') {
    return `${date.year}`;
  }
  return '';
}

/**
 * Render a single content item to Markdown
 */
export function renderContentToMarkdown(item: Content): string | null {
  switch (item.type) {
    case 'exercise':
      return renderExercise(item);

    case 'pyramid':
      return renderPyramid(item);

    case 'move':
      return renderMove(item);

    case 'duration':
      return renderDuration(item);

    case 'food':
      return renderFood(item);

    case 'drinking': {
      const vol = item.volume && item.volumeUnit ? `${item.volume}${item.volumeUnit}` : '';
      const cal = item.calories ? `, ${item.calories}kcal` : '';
      const prot = item.protein ? `, ${item.protein}g protein` : '';
      const desc = item.description ? `: ${item.description}` : '';
      return `🥤 ${vol}${cal}${prot}${desc}`;
    }

    case 'expense':
      return renderExpense(item);

    case 'sleep':
      return renderSleep(item);

    case 'measurement':
      return renderMeasurement(item);

    case 'health':
      return renderHealth(item);

    case 'text':
      return `📝 ${item.value}`;

    case 'summary':
      return `*${item.text}*`;

    case 'contacts':
      return `👟 ${item.count} contacts${item.name ? ` (${item.name})` : ''}`;

    case 'location':
      return `📍 ${item.place}`;

    case 'url':
      return `🔗 [Link](${item.url})`;

    case 'reminder':
      return `⏰ ${item.date.year}-${String(item.date.month).padStart(2, '0')}-${String(item.date.day).padStart(2, '0')}: ${item.description || ''}`;

    case 'custom':
      return `📊 ${item.name}: ${item.value}${item.unit || ''}`;

    case 'derived': {
      const basis = item.basis ? `, basis: ${item.basis}` : '';
      const confidence = item.confidence != null ? `, confidence: ${item.confidence}%` : '';
      const goodness = item.goodness != null ? `, goodness: ${item.goodness}/5` : '';
      const source = item.source ? `, source: ${item.source}` : '';
      const note = item.note ? ` (${item.note})` : '';
      return `🧮 ${item.name}: ${item.value}${item.unit || ''}${basis}${confidence}${goodness}${source}${note}`;
    }

    case 'feeling': {
      const emoji = item.value && item.value >= 7 ? '😊' : item.value && item.value >= 4 ? '😐' : '😫';
      const score = item.scale === 'rpe' ? `RPE ${item.value}` : `${item.value}/10`;
      return `${emoji} ${score}${item.description ? ` - ${item.description}` : ''}`;
    }

    case 'pain': {
      const severity = item.severity ? ` (${item.severity}/10)` : '';
      return `🤕 ${item.bodyPart || 'Pain'}${severity}: ${item.description || ''}`;
    }

    case 'max': {
      const est = item.estimated ? ' (estimated)' : '';
      const pr = item.pr ? ' 🏆 PR!' : '';
      return `💪 Max ${item.name}: ${item.reps}×${item.weight}${item.unit}${est}${pr}`;
    }

    case 'best': {
      const pr = item.pr ? ' 🏆 PR!' : '';
      return `🎯 Best ${item.name}: ${item.result.value}${item.result.unit === 'time' ? '' : item.result.unit}${pr}`;
    }

    case 'sport':
      return `🏃 Sport: ${item.name}`;

    case 'interval': {
      const distValue = item.distance?.value ?? '?';
      const distUnit = item.distance?.unit ?? '';
      const pieces: string[] = [`${item.count}×${distValue}${distUnit}`];

      const intensity = formatIntervalIntensity((item as unknown as { intensity?: unknown }).intensity);
      if (intensity) {
        pieces.push(`@ ${intensity}`);
      }

      const recovery = formatIntervalRecovery((item as unknown as { recovery?: unknown }).recovery);
      if (recovery) {
        pieces.push(`${recovery} rest`);
      }

      return `⏱️ ${pieces.join(', ')}`;
    }

    case 'vitals':
      return `📈 ${item.key}: ${item.value}${item.unit || ''}`;

    // Skip these - handled separately
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

function formatIntervalIntensity(intensity: unknown): string | null {
  if (!intensity || typeof intensity !== 'object') return null;

  if ('min' in intensity && 'max' in intensity) {
    const i = intensity as { min: number; max: number };
    return i.min === i.max ? `${i.min}%` : `${i.min}-${i.max}%`;
  }

  if ('text' in intensity && typeof (intensity as { text?: unknown }).text === 'string') {
    return (intensity as { text: string }).text;
  }

  if ('unknown' in intensity) {
    return '?';
  }

  if ('hrZone' in intensity && (intensity as { hrZone?: { min: number; max: number } }).hrZone) {
    const zone = (intensity as { hrZone: { min: number; max: number } }).hrZone;
    return zone.min === zone.max ? `Z${zone.min}` : `Z${zone.min}-Z${zone.max}`;
  }

  if ('zone' in intensity && (intensity as { zone?: { min?: string; max?: string; combo?: string[] } }).zone) {
    const zone = (intensity as { zone: { min?: string; max?: string; combo?: string[] } }).zone;
    if (Array.isArray(zone.combo) && zone.combo.length > 0) return zone.combo.join('+');
    if (zone.min && zone.max) return zone.min === zone.max ? zone.min : `${zone.min}-${zone.max}`;
  }

  return null;
}

function formatIntervalRecovery(recovery: unknown): string | null {
  if (!recovery || typeof recovery !== 'object') return null;
  if (!('min' in recovery) || !('max' in recovery)) return null;

  const r = recovery as { min: number; max: number };
  return r.min === r.max ? `${r.min}min` : `${r.min}-${r.max}min`;
}

function renderExercise(item: Exercise): string {
  const parts: string[] = [];

  // Name
  parts.push(`**${item.name}**`);

  // Sets x Reps
  if (item.sets != null) {
    let spec = '';
    const setsStr = item.setsMax ? `${item.sets}-${item.setsMax}` : `${item.sets}`;

    if (typeof item.reps === 'number') {
      const repsStr = item.repsMax ? `${item.reps}-${item.repsMax}` : `${item.reps}`;
      const bilateral = (item as any).repsRight ? `+${(item as any).repsRight}` : '';
      spec = `${setsStr}×${repsStr}${bilateral}`;
    } else if (item.reps === 'max') {
      spec = `${setsStr}×max`;
    }

    if (item.unit) {
      spec += item.unit;
    }

    parts.push(spec);
  }

  // Weight
  if (item.weight) {
    if ('value' in item.weight) {
      if (item.weight.unit === 'bodyweight') {
        parts.push('@ bodyweight');
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

  // Note
  if (item.note) {
    parts.push(`*(${item.note})*`);
  }

  return `🏋️ ${parts.join(' ')}`;
}

function renderPyramid(item: Pyramid): string {
  const setsStr = item.sets.map(s => {
    let str = '';
    if (s.sets && s.sets > 1) {
      str += `${s.sets}×`;
    }
    str += s.repsRight !== undefined && s.repsRight !== null
      ? `${s.reps}+${s.repsRight}`
      : `${s.reps}`;
    if (s.weight && 'value' in s.weight) {
      str += `@${s.weight.value}${s.weight.unit}`;
    }
    return str;
  }).join(', ');

  return `🔺 **${item.name}** ${setsStr}${item.note ? ` *(${item.note})*` : ''}`;
}

function renderMove(item: Move): string {
  const parts: string[] = [];

  // Sport prefix for non-running
  if (item.sport && item.sport !== 'juoksu') {
    parts.push(`**${item.sport}**`);
  }

  // Duration
  if (item.duration && item.duration.value != null) {
    parts.push(formatDurationValue(item.duration.value, item.duration.unit));
  }

  // Distance
  if (item.distance && item.distance.value != null) {
    const distMax = item.distance.valueMax;
    const distStr = distMax
      ? `${item.distance.value}-${distMax}${item.distance.unit}`
      : `${item.distance.value}${item.distance.unit}`;
    parts.push(distStr);
  }

  // Steps
  if (item.steps) {
    parts.push(`${item.steps} steps`);
  }

  // Intensity
  if (item.intensity) {
    if ('min' in item.intensity && 'max' in item.intensity) {
      const intensity = item.intensity as { min: number; max: number };
      const intStr = intensity.min === intensity.max
        ? `${intensity.min}%`
        : `${intensity.min}-${intensity.max}%`;
      parts.push(`@ ${intStr}`);
    } else if ('hr' in item.intensity && item.intensity.hr) {
      const hr = item.intensity.hr;
      if ('min' in hr && 'max' in hr) {
        parts.push(`@ ${hr.min}-${hr.max}bpm`);
      }
    }
  }

  // Note
  const note = item.note || item.description;
  if (note) {
    parts.push(`*(${note})*`);
  }

  const emoji = item.sport === 'juoksu' || !item.sport ? '🏃' : '🏊';
  return `${emoji} ${parts.join(' ')}`;
}

function renderDuration(item: DurationBlock): string {
  if (item.timeOfDay) {
    const h = String(item.timeOfDay.hour).padStart(2, '0');
    const m = String(item.timeOfDay.minute).padStart(2, '0');
    return `🕐 ${h}:${m} ${item.description || ''}`.trim();
  }
  if (!item.duration) {
    return `⏱️ ${item.description || ''}`.trim();
  }
  const val = item.duration.value === null ? '?' : item.duration.value;
  const durationText = val === '?' ? `?${item.duration.unit}` : formatDurationValue(val, item.duration.unit);
  return `⏱️ ${durationText} ${item.description || ''}`;
}

function formatDurationValue(value: number, unit: 'min' | 's'): string {
  if (unit === 'min') {
    if (Number.isInteger(value)) {
      return `${value}min`;
    }

    const totalSeconds = Math.round(value * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}'${String(seconds).padStart(2, '0')}"`;
  }

  if (Number.isInteger(value)) {
    return `${value}s`;
  }

  return `${value.toFixed(1).replace(/\.0$/, '')}s`;
}

function renderFood(item: Food): string {
  const parts: string[] = [];
  if (item.calories) parts.push(`${item.calories}kcal`);
  if (item.protein) parts.push(`${item.protein}g protein`);
  if (item.carbs) parts.push(`${item.carbs}g carbs`);
  if (item.fat) parts.push(`${item.fat}g fat`);
  const nutrition = parts.length > 0 ? ` (${parts.join(', ')})` : '';
  return `🍽️ ${item.description || 'Food'}${nutrition}`;
}

function renderExpense(item: Expense): string {
  let str = `💰 ${item.amount}${item.currency}`;
  if (item.vatPercent) {
    str += ` (VAT ${item.vatPercent}%`;
    if (item.vatAmount) {
      str += ` = ${item.vatAmount}${item.currency}`;
    }
    str += ')';
  }
  if (item.description) {
    str += `: ${item.description}`;
  }
  return str;
}

function renderSleep(item: SleepEntry): string {
  let str = `😴 ${item.duration}h`;
  if (item.quality) {
    const qualityEmoji: Record<string, string> = {
      excellent: '⭐⭐⭐',
      good: '⭐⭐',
      fair: '⭐',
      poor: '💤',
    };
    str += ` ${qualityEmoji[item.quality] || item.quality}`;
  }
  if (item.hrv) str += ` HRV:${item.hrv}`;
  if (item.rhr) str += ` RHR:${item.rhr}`;
  return str;
}

function renderMeasurement(item: BodyMeasurement): string {
  const labels: Record<string, string> = {
    weight: '⚖️ Weight',
    bodyFat: '📊 Body fat',
    waist: '📏 Waist',
    hip: '📏 Hip',
  };
  return `${labels[item.measureType] || item.measureType}: ${item.value}${item.unit}`;
}

function renderHealth(item: Health): string {
  const icons: Record<string, string> = {
    physio: '🏥',
    injury: '🤕',
    pain: '😣',
    medication: '💊',
    supplement: '💊',
    appointment: '📅',
    checkup: '🩺',
  };
  return `${icons[item.healthType] || '🏥'} ${item.healthType}${item.description ? `: ${item.description}` : ''}`;
}
