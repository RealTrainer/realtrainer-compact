/**
 * COMPACT Serializer
 *
 * Converts parsed COMPACT AST back to COMPACT text format.
 * This enables round-trip: parse -> modify -> serialize
 */

import type {
  Workout,
  Content,
  DateValue,
  Document,
  Weight,
  Exercise,
  Pyramid,
  Circuit,
  Move,
  Split,
  SplitChild,
  CustomField,
} from '../types.js';

interface NutrientLike {
  name?: unknown;
  value?: unknown;
  unit?: unknown;
}

function normalizeNutrientName(name: string): string {
  const key = name.trim().toLowerCase();
  const normalized = key
    .replace(/[äå]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9_-]/g, '');

  const aliases: Record<string, string> = {
    kcal: 'kcal',
    prot: 'prot',
    protein: 'prot',
    proteiini: 'prot',
    carb: 'carb',
    carbs: 'carb',
    carbohydrate: 'carb',
    carbohydrates: 'carb',
    hiilihydraatti: 'carb',
    hiilihydraatit: 'carb',
    fat: 'fat',
    fats: 'fat',
    rasva: 'fat',
    rasvat: 'fat',
    satfat: 'satfat',
    kovarasva: 'satfat',
    unsatfat: 'unsatfat',
    hyvarasva: 'unsatfat',
    omega3: 'omega3',
    'omega-3': 'omega3',
    sodium: 'sodium',
    natrium: 'sodium',
    sugar: 'sugar',
    sokeri: 'sugar',
    fiber: 'fiber',
    kuitu: 'fiber',
  };

  return aliases[key] || aliases[normalized] || normalized || key;
}

function formatNutrientToken(nutrient: NutrientLike): string | null {
  const value = typeof nutrient.value === 'number' && Number.isFinite(nutrient.value)
    ? nutrient.value
    : null;
  const unit = typeof nutrient.unit === 'string' ? nutrient.unit : '';
  const name = typeof nutrient.name === 'string' ? normalizeNutrientName(nutrient.name) : '';
  if (value === null || !unit || !name) return null;

  if (name === 'kcal') {
    return `${value}kcal`;
  }
  return `${value}${unit}/${name}`;
}

function maybeQuoteDerivedSource(source: string): string {
  return /\s/.test(source) ? `"${source}"` : source;
}

/**
 * Serialize a complete Document to COMPACT format
 */
export function serializeDocument(document: Document): string {
  return document.workouts
    .map((workout, index) => serializeWorkout(workout, {
      declaredFormat: workout.format ?? (index === 0 ? document.format ?? null : null),
    }))
    .join('\n\n');
}

interface SerializeWorkoutOptions {
  declaredFormat?: string | null;
}

/**
 * Serialize a single Workout to COMPACT format
 */
export function serializeWorkout(workout: Workout, options: SerializeWorkoutOptions = {}): string {
  const lines: string[] = [];

  // Metadata and Title - only date, no internal ID
  let metaStr = '';
  if (workout.date) {
    const dateStr = serializeDate(workout.date);
    if (dateStr) {
      metaStr = `[${dateStr}] `;
    }
  }
  if (workout.title) {
    lines.push(`${metaStr}## ${workout.title}`);
  } else if (metaStr) {
    lines.push(metaStr);
  }

  const declaredFormat = options.declaredFormat ?? workout.format ?? null;
  if (typeof declaredFormat === 'string' && declaredFormat.trim().length > 0) {
    lines.push(`Format ${declaredFormat.trim()}`);
  }

  // Content
  workout.content.forEach((item) => {
    const serialized = serializeContent(item);
    if (serialized) {
      lines.push(serialized);
    }
  });

  return lines.join('\n');
}

/**
 * Serialize a DateValue to string format
 */
export function serializeDate(date: DateValue): string {
  if (date.type === 'date') {
    if ('unknown' in date && date.unknown) {
      return '????-??-??';
    }
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  }
  if (date.type === 'datetime') {
    const d = date as { year: number; month: number; day: number; hour: number; minute: number; timezone: string | null };
    const dateStr = `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
    const timeStr = `T${String(d.hour).padStart(2, '0')}:${String(d.minute).padStart(2, '0')}`;
    const tzStr = d.timezone || '';
    return `${dateStr}${timeStr}${tzStr}`;
  }
  if (date.type === 'week') {
    return `W${String(date.week).padStart(2, '0')}/${date.year}`;
  }
  if (date.type === 'month') {
    return `${date.year}-${String(date.month).padStart(2, '0')}`;
  }
  if (date.type === 'year') {
    return `${date.year}`;
  }
  if (date.type === 'range') {
    if ('startYear' in date) {
      return `${date.startYear}-${String(date.startMonth).padStart(2, '0')}-${String(date.startDay).padStart(2, '0')}..${date.endYear}-${String(date.endMonth).padStart(2, '0')}-${String(date.endDay).padStart(2, '0')}`;
    }
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.startDay).padStart(2, '0')}..${String(date.endDay).padStart(2, '0')}`;
  }
  if (date.type === 'rolling') {
    return `${date.weeks}W:${date.endYear}-${String(date.endMonth).padStart(2, '0')}-${String(date.endDay).padStart(2, '0')}`;
  }
  return '';
}

/**
 * Serialize a Weight to string format
 */
export function serializeWeight(w: Weight | null): string {
  if (!w) return '';
  if ('value' in w && w.unit === 'bodyweight') return '@bw';
  if ('percent' in w) {
    const percentMax = w.percentMax;
    return percentMax && percentMax !== w.percent
      ? `@${w.percent}-${percentMax}%${w.of || ''}`
      : `@${w.percent}%${w.of || ''}`;
  }
  if ('value' in w) {
    const valueMax = w.valueMax;
    const unit = w.unit || 'kg';
    return valueMax && valueMax !== w.value
      ? `@${w.value}-${valueMax}${unit}`
      : `@${w.value}${unit}`;
  }
  return '';
}

/**
 * Serialize custom fields to string format
 */
export function serializeCustomFields(fields: CustomField[] | null | undefined): string {
  if (!fields || fields.length === 0) return '';
  return ' ' + fields.map(cf => {
    if (cf.value === true) {
      return `[[${cf.name}]]`;
    }
    const unit = cf.unit || '';
    return `[[${cf.name}:${cf.value}${unit}]]`;
  }).join(' ');
}

/**
 * Serialize a Content item to COMPACT format
 */
export function serializeContent(item: Content): string | null {
  switch (item.type) {
    case 'section': {
      let sectionStr = `Section ${item.name}`;
      if (item.intensity) {
        sectionStr += ` ${item.intensity}%`;
      }
      if (item.duration) {
        sectionStr += ` ${item.duration}m`;
      }
      return sectionStr;
    }

    case 'sport':
      return `L${item.level} ${item.name}`;

    case 'phase': {
      const phaseNum = item.number != null ? item.number : '';
      return `Phase${phaseNum} ${item.name}${item.details ? `|${item.details}` : ''}`;
    }

    case 'tags':
      return `Tags ${item.tags.map(t => t.startsWith('#') ? t.slice(1) : t).join(', ')}`;

    case 'emojis':
      return `Emojis ${item.emojis}`;

    case 'expense': {
      let expenseStr = `Expense ${item.amount}${item.currency || 'EUR'}`;
      if (item.vatPercent) {
        expenseStr += ` ALV${item.vatPercent}%`;
        if (item.vatAmount) {
          expenseStr += ` ${item.vatAmount}EUR`;
        }
      }
      if (item.description) {
        expenseStr += ` | ${item.description}`;
      }
      return expenseStr;
    }

    case 'exercise':
      return serializeExercise(item);

    case 'pyramid':
      return serializePyramid(item);

    case 'circuit':
      return serializeCircuit(item as Circuit);

    case 'move':
      return serializeMove(item);

    case 'split':
      return serializeSplit(item as Split, '');

    case 'attempt':
      return serializeSplitChild(item as SplitChild, '');

    case 'recovery':
      return serializeSplitChild(item as SplitChild, '');

    case 'splitMove':
      return serializeSplitChild(item as SplitChild, '');

    case 'duration': {
      if (item.timeOfDay) {
        const h = String(item.timeOfDay.hour).padStart(2, '0');
        const m = String(item.timeOfDay.minute).padStart(2, '0');
        return item.description ? `Time ${h}.${m} | ${item.description}` : `Time ${h}.${m}`;
      }
      const durationVal = item.duration!.value;
      const durationStr = durationVal === null ? '?' : String(durationVal);
      return `Time ${durationStr}${item.duration!.unit} | ${item.description || ''}`;
    }

    case 'interval': {
      const intervalItem = item as any;
      const count = intervalItem.count;
      const dist = intervalItem.distance.value;
      const unit = intervalItem.distance.unit || 's';
      
      // Support both numeric intensity and text intensity
      let intensityStr = '';
      if (intervalItem.intensityText) {
        intensityStr = `@${intervalItem.intensityText}`;
      } else if (intervalItem.intensity) {
        intensityStr = intervalItem.intensity.min === intervalItem.intensity.max
          ? `@${intervalItem.intensity.min}%`
          : `@${intervalItem.intensity.min}-${intervalItem.intensity.max}%`;
      }
      
      // Recovery is optional - uses new { value, valueMax?, unit } format
      let recoveryStr = '';
      if (intervalItem.recovery) {
        const runit = intervalItem.recovery.unit || 'min';
        if (intervalItem.recovery.valueMax && intervalItem.recovery.valueMax !== intervalItem.recovery.value) {
          recoveryStr = `/${intervalItem.recovery.value}-${intervalItem.recovery.valueMax}${runit}`;
        } else {
          recoveryStr = `/${intervalItem.recovery.value}${runit}`;
        }
      }
      
      // Note is optional
      const noteStr = intervalItem.note ? ` ${intervalItem.note}` : '';
      
      return `Interval ${count}x${dist}${unit}${intensityStr}${recoveryStr}${noteStr}`;
    }

    case 'feeling': {
      let scoreStr = '';
      if (item.scale === 'rpe' && item.value !== null) {
        scoreStr = `RPE:${item.value}`;
      } else if (item.value !== null) {
        scoreStr = `${item.value}/10`;
      }
      const descStr = item.description ? `|${item.description}` : '';
      return `Feeling ${scoreStr}${descStr}`;
    }

    case 'vitals': {
      if (!item.key) return null;
      return `Vitals ${item.key}:${item.value}${item.unit || ''}`;
    }

    case 'pain': {
      const body = item.bodyPart || '-';
      const severity = item.severity ? `${item.severity}/10 ` : '';
      return `Pain ${body}|${severity}${item.description || ''}`;
    }

    case 'contacts':
      return `Contacts ${item.count}|${item.name || ''}`;

    case 'food': {
      const tokens: string[] = [];
      const emitted = new Set<string>();

      if (item.calories != null) {
        tokens.push(`${item.calories}kcal`);
        emitted.add('kcal');
      }
      if (item.protein != null) {
        tokens.push(`${item.protein}g/prot`);
        emitted.add('prot');
      }
      if ((item as any).carbs != null) {
        tokens.push(`${(item as any).carbs}g/carb`);
        emitted.add('carb');
      }
      if ((item as any).fat != null) {
        tokens.push(`${(item as any).fat}g/fat`);
        emitted.add('fat');
      }

      const rawNutrients = Array.isArray((item as any).nutrients)
        ? (item as any).nutrients as NutrientLike[]
        : [];
      for (const nutrient of rawNutrients) {
        const key = typeof nutrient.name === 'string' ? normalizeNutrientName(nutrient.name) : '';
        if (!key || emitted.has(key)) continue;
        const token = formatNutrientToken(nutrient);
        if (token) {
          tokens.push(token);
          emitted.add(key);
        }
      }

      const nutrition = tokens.join(' ');
      const hasNutrition = nutrition.length > 0;
      const desc = item.description ? ` | ${item.description}` : '';
      return hasNutrition ? `Food ${nutrition}${desc}` : `Food${desc}`;
    }

    case 'drinking': {
      const tokens: string[] = [];
      const emitted = new Set<string>();

      const vol = item.volume != null && item.volumeUnit ? `${item.volume}${item.volumeUnit}` : '';
      if (vol) tokens.push(vol);

      if (item.calories != null) {
        tokens.push(`${item.calories}kcal`);
        emitted.add('kcal');
      }
      if (item.protein != null) {
        tokens.push(`${item.protein}g/prot`);
        emitted.add('prot');
      }

      const rawNutrients = Array.isArray((item as any).nutrients)
        ? (item as any).nutrients as NutrientLike[]
        : [];
      for (const nutrient of rawNutrients) {
        const key = typeof nutrient.name === 'string' ? normalizeNutrientName(nutrient.name) : '';
        if (!key || emitted.has(key)) continue;
        const token = formatNutrientToken(nutrient);
        if (token) {
          tokens.push(token);
          emitted.add(key);
        }
      }

      if ((item as any).liquid) {
        tokens.push(String((item as any).liquid));
      }

      const desc = item.description ? ` | ${item.description}` : '';
      const body = tokens.join(' ').trim();
      return body ? `Drinking ${body}${desc}` : `Drinking${desc}`;
    }

    case 'measurement': {
      // Weight, BodyFat use their own prefix
      if (item.measureType === 'weight') {
        return `Weight ${item.value}${item.unit || 'kg'}`;
      }
      if (item.measureType === 'bodyFat') {
        return `BodyFat ${item.value}%`;
      }
      return `${item.measureType} ${item.value}${item.unit || ''}`;
    }

    case 'sleep': {
      const quality = item.quality ? ` quality:${item.quality}` : '';
      const hrv = item.hrv ? ` hrv:${item.hrv}` : '';
      const rhr = item.rhr ? ` rhr:${item.rhr}` : '';
      return `Sleep ${item.duration}h${quality}${hrv}${rhr}`;
    }

    case 'health':
      return `Health ${item.healthType}${item.description ? ` | ${item.description}` : ''}`;

    case 'reminder': {
      const dateStr = `${item.date.year}-${String(item.date.month).padStart(2, '0')}-${String(item.date.day).padStart(2, '0')}`;
      return `Reminder ${dateStr}${item.description ? ` | ${item.description}` : ''}`;
    }

    case 'location':
      return `Location ${item.place}`;

    case 'url':
      return `URL ${item.url}`;

    case 'custom': {
      const unit = item.unit ? `|${item.unit}` : '';
      const note = item.note ? ` ${item.note}` : '';
      return `Custom ${item.name} ${item.value}${unit}${note}`;
    }

    case 'derived': {
      const unit = item.unit ? `|${item.unit}` : '';
      const basis = item.basis ? ` basis:${item.basis}` : '';
      const confidence = item.confidence != null ? ` confidence:${item.confidence}%` : '';
      const source = item.source ? ` source:${maybeQuoteDerivedSource(item.source)}` : '';
      const goodness = item.goodness != null ? ` goodness:${item.goodness}` : '';
      const note = item.note ? ` | ${item.note}` : '';
      return `Derived ${item.name} ${item.value}${unit}${basis}${confidence}${source}${goodness}${note}`;
    }

    case 'text':
      return `Text ${item.value}`;

    case 'summary':
      return `Summary ${item.text}`;

    case 'max': {
      const est = item.estimated ? '*' : '';
      const pr = item.pr ? ' PR' : '';
      return `Max${est} ${item.name}|${item.reps}x${item.weight}${item.unit}${pr}`;
    }

    case 'best': {
      const pr = item.pr ? ' PR' : '';
      const unit = item.result.unit === 'time' ? '' : item.result.unit;
      return `Best ${item.name}|${item.result.value}${unit}${pr}`;
    }

    case 'unknown':
      return item.raw;

    default:
      return null;
  }
}

/**
 * Serialize an Exercise to COMPACT format
 */
function serializeExercise(item: Exercise): string {
  const exerciseAny = item as any;

  // Measured durations format: 3x45s,45s,30s or 2x25s,24s,
  if (exerciseAny.specType === 'measured' && exerciseAny.measuredDurations && exerciseAny.measuredDurations.length > 0) {
    const durations = exerciseAny.measuredDurations as Array<{left: number, right: number | null, unit: string}>;
    const durationsStr = durations.map(d => {
      if (d.right !== null) {
        return `${d.left}${d.unit}/${d.right}${d.unit}`;
      }
      return `${d.left}${d.unit}`;
    }).join(',');
    // Add trailing comma for single measured duration to distinguish from planned
    const needsTrailingComma = durations.length === 1;
    let e = `Exercise ${item.name}|${item.sets || durations.length}x${durationsStr}${needsTrailingComma ? ',' : ''}`;
    e += serializeWeight(item.weight);
    e += serializeCustomFields(item.customFields);
    if (item.note && !item.note.startsWith('[[')) {
      e += `|${item.note}`;
    }
    return e;
  }

  // MultiSet format: 3x3+3+2-4@25kg
  if (exerciseAny.specType === 'multiset' && exerciseAny.parts) {
    const partsStr = exerciseAny.parts.map((p: any) => {
      if (p.sets === 1) {
        return p.repsMax ? `${p.reps}-${p.repsMax}` : `${p.reps}`;
      }
      return p.repsMax ? `${p.sets}x${p.reps}-${p.repsMax}` : `${p.sets}x${p.reps}`;
    }).join('+');
    let e = `Exercise ${item.name}|${partsStr}`;
    e += serializeWeight(item.weight);
    e += serializeCustomFields(item.customFields);
    if (item.note && !item.note.startsWith('[[')) {
      e += `|${item.note}`;
    }
    return e;
  }

  // If sets is null, use description directly
  if (item.sets == null && item.description) {
    return `Exercise ${item.name}|${item.description}`;
  }

  // Duration format (e.g., 10min, 30s) without standard sets
  if (item.sets === 1 && item.reps && item.unit && (item.unit === 'min' || item.unit === 's')) {
    let exerciseStr = `Exercise ${item.name}|${item.reps}${item.unit}`;
    exerciseStr += serializeWeight(item.weight);
    exerciseStr += serializeCustomFields(item.customFields);
    if (item.note && !item.note.startsWith('[[')) {
      exerciseStr += `|${item.note}`;
    }
    return exerciseStr;
  }

  // Build sets string with optional setsMax
  const setsStr = item.setsMax ? `${item.sets}-${item.setsMax}` : `${item.sets}`;

  let repsStr = '';
  if (exerciseAny.distance !== null && exerciseAny.distance !== undefined) {
    repsStr = exerciseAny.distance.toString();
  } else if (typeof item.reps === 'number') {
    repsStr = item.reps.toString();
    if (exerciseAny.repsRight !== null && exerciseAny.repsRight !== undefined) {
      repsStr += `+${exerciseAny.repsRight}`;
    }
  } else if (item.reps === 'max') {
    repsStr = 'max';
  }

  // Add repsMax if NOT bilateral
  if (item.repsMax && !exerciseAny.repsRight) {
    repsStr += `-${item.repsMax}`;
  }

  const unitStr = item.unit ? item.unit : '';
  const weightStr = serializeWeight(item.weight);
  const roundsPrefix = exerciseAny.rounds ? `${exerciseAny.rounds}x` : '';

  let exerciseStr = `Exercise ${item.name}|${roundsPrefix}${setsStr}x${repsStr}${unitStr}${weightStr}`;
  exerciseStr += serializeCustomFields(item.customFields);

  if (item.note && !item.note.startsWith('[[')) {
    exerciseStr += `|${item.note}`;
  }
  return exerciseStr;
}

/**
 * Serialize a Pyramid to COMPACT format
 */
function serializePyramid(item: Pyramid): string {
  const setsStr = item.sets.map(s => {
    const w = s.weight;
    let wStr = '';
    if (w) {
      if ('value' in w && w.unit === 'bodyweight') {
        wStr = 'xbw';
      } else if ('value' in w && w.unit !== 'bodyweight') {
        wStr = `x${w.value}`;
      } else if ('percent' in w) {
        wStr = `@${w.percent}%`;
      }
    }
    const setsCount = s.sets && s.sets > 1 ? `${s.sets}x` : '';
    const repsPart = s.repsRight !== undefined && s.repsRight !== null
      ? `${s.reps}+${s.repsRight}`
      : `${s.reps}`;
    return `${setsCount}${repsPart}${wStr}`;
  }).join(',');

  const lastWeight = [...item.sets].reverse().find(s => s.weight && 'value' in s.weight && s.weight.unit !== 'bodyweight');
  const unit = lastWeight && lastWeight.weight && 'value' in lastWeight.weight
    ? (lastWeight.weight as any).unit || 'kg'
    : '';

  const parts = [item.name, `${setsStr}${unit}`];
  if (item.note) parts.push(item.note);
  return `Pyramid ${parts.join('|')}`;
}

/**
 * Serialize a Circuit to COMPACT format
 */
function serializeCircuit(item: Circuit): string {
  const lines: string[] = [];
  
  // Header line: Circuit|3 or Superset|4/2min
  const prefix = item.variant === 'superset' ? 'Superset' : 'Circuit';
  let header = `${prefix}|${item.rounds}`;
  
  // Round rest: /2min
  if (item.roundRest && item.roundRest.value !== null) {
    const restUnit = item.roundRest.unit || 'min';
    header += `/${item.roundRest.value}${restUnit}`;
  }
  
  // Note after pipe
  if (item.note) {
    header += ` | ${item.note}`;
  }
  
  lines.push(header);
  
  // Exercise items
  for (const ex of item.exercises) {
    let itemLine = `> ${ex.name}`;
    
    // Spec: 3x8@60kg, 8@80kg, 10, etc.
    if (ex.sets !== null && ex.sets !== undefined && ex.sets > 1) {
      itemLine += ` ${ex.sets}x`;
      if (ex.reps !== null && ex.reps !== undefined) {
        if (ex.repsRight !== null && ex.repsRight !== undefined) {
          itemLine += `${ex.reps}+${ex.repsRight}`;
        } else {
          itemLine += `${ex.reps}`;
        }
      }
    } else if (ex.reps !== null && ex.reps !== undefined) {
      if (ex.repsRight !== null && ex.repsRight !== undefined) {
        itemLine += ` ${ex.reps}+${ex.repsRight}`;
      } else {
        itemLine += ` ${ex.reps}`;
      }
    }
    
    // Unit (s, min)
    if (ex.unit) {
      itemLine += ex.unit;
    }
    
    // Weight
    if (ex.weight) {
      if ('value' in ex.weight && ex.weight.unit !== 'bodyweight') {
        itemLine += `@${ex.weight.value}${ex.weight.unit || 'kg'}`;
      } else if ('value' in ex.weight && ex.weight.unit === 'bodyweight') {
        itemLine += '@bw';
      }
    }
    
    // Recovery
    if (ex.recovery && ex.recovery.value !== null) {
      const recUnit = ex.recovery.unit || 's';
      itemLine += `/${ex.recovery.value}${recUnit}`;
    }
    
    // Custom fields
    if (ex.customFields && ex.customFields.length > 0) {
      itemLine += serializeCustomFields(ex.customFields);
    }
    
    // Note
    if (ex.note) {
      itemLine += ` | ${ex.note}`;
    }
    
    lines.push(itemLine);
  }
  
  return lines.join('\n');
}

/**
 * Serialize a Move (Run/Swim) to COMPACT format
 */
function serializeMove(item: Move): string {
  const hasDuration = item.duration && item.duration.value !== null;
  const hasDistance = item.distance && item.distance.value !== null;
  const hasSteps = item.steps !== null && item.steps !== undefined;
  const hasIntensity = item.intensity !== null;
  const hasSetsFormat = (item.sets > 1 || item.count > 1 || hasIntensity) && !hasDuration;

  const sportPrefix = item.sport && item.sport !== 'juoksu' ? `"${item.sport}" ` : '';

  // Simple format: duration and/or distance and/or steps
  if ((hasDuration || hasDistance || hasSteps) && !hasSetsFormat) {
    let line = `Run ${sportPrefix}`.trimEnd();

    if (hasDuration) {
      line += ` ${item.duration!.value}${item.duration!.unit || 'min'}`;
    }

    if (hasDistance) {
      const dist = item.distance!;
      const distVal = dist.valueMax
        ? `${dist.value}-${dist.valueMax}`
        : `${dist.value}`;
      line += ` ${distVal}${dist.unit || 'km'}`;
    }

    if (hasSteps) {
      line += ` ${item.steps}steps`;
    }

    line += serializeCustomFields(item.customFields);

    const note = item.note || item.description;
    if (note) {
      line += ` | ${note}`;
    }

    // Serialize splits
    if (item.splits && item.splits.length > 0) {
      const splitLines = item.splits.map((split) => serializeSplitChild(split, ''));
      line += '\n' + splitLines.join('\n');
    }

    return line;
  }

  // Sets/interval format: 4x400m@80%/2m
  const count = item.countMax
    ? `${item.count}-${item.countMax}`
    : (item.count || item.sets || 1);

  let distStr = '';
  if (hasDistance) {
    distStr = item.distance!.valueMax
      ? `${item.distance!.value}-${item.distance!.valueMax}${item.distance!.unit || ''}`
      : `${item.distance!.value}${item.distance!.unit || ''}`;
  }

  let intensityStr = '';
  if (item.intensity) {
    if ('zone' in item.intensity && item.intensity.zone) {
      const zone = item.intensity.zone as any;
      if ('combo' in zone && Array.isArray(zone.combo)) {
        intensityStr = `@${zone.combo.join('+')}`;
      } else if ('min' in zone && 'max' in zone) {
        intensityStr = zone.min === zone.max
          ? `@${zone.min}`
          : `@${zone.min}-${zone.max}`;
      }
    } else if ('paceMin' in item.intensity && item.intensity.paceMin && 'paceMax' in item.intensity && item.intensity.paceMax) {
      const intensity = item.intensity as any;
      const formatPace = (pace: { minutes: number; seconds: number }) => {
        const sec = String(pace.seconds).padStart(2, '0');
        return `${pace.minutes}:${sec}`;
      };

      const paceMinStr = formatPace(intensity.paceMin);
      const paceMaxStr = formatPace(intensity.paceMax);
      const pacePerDistance = intensity.pacePerDistance
        ? `/${intensity.pacePerDistance.value}${intensity.pacePerDistance.unit}`
        : (intensity.paceUnit ? `/${intensity.paceUnit}` : '');

      intensityStr = paceMinStr === paceMaxStr
        ? `@${paceMinStr}${pacePerDistance}`
        : `@${paceMinStr}-${paceMaxStr}${pacePerDistance}`;
    } else if ('min' in item.intensity && 'max' in item.intensity) {
      const intensity = item.intensity as { min: number; max: number };
      intensityStr = intensity.min === intensity.max
        ? `@${intensity.min}%`
        : `@${intensity.min}-${intensity.max}%`;
    } else if ('text' in item.intensity) {
      intensityStr = `@${item.intensity.text}`;
    } else if ('hr' in item.intensity && item.intensity.hr) {
      const hr = item.intensity.hr;
      if ('min' in hr && 'max' in hr) {
        intensityStr = `@${hr.min}-${hr.max}bpm`;
      } else if ('value' in hr) {
        intensityStr = `@${hr.value}bpm`;
      }
    }
  }

  let recoveryStr = '';
  if (item.recovery) {
    const rec = item.recovery as any;
    recoveryStr = `/${rec.value || rec.text}${rec.unit || ''}`;
  }

  const customFieldsStr = serializeCustomFields(item.customFields);
  const note = item.note || item.description;

  let line = `Run ${sportPrefix}${count}x${distStr}${intensityStr}${recoveryStr}${customFieldsStr}${note ? ` | ${note}` : ''}`;

  // Serialize splits
  if (item.splits && item.splits.length > 0) {
    const splitLines = item.splits.map((split) => serializeSplitChild(split, ''));
    line += '\n' + splitLines.join('\n');
  }

  return line;
}

function serializeSplitChild(item: SplitChild, prefix: string): string {
  if (item.type === 'derived' || item.type === 'feeling') {
    const serialized = serializeContent(item as Content);
    if (!serialized) {
      return `${prefix}>`;
    }
    return `${prefix}> ${serialized}`;
  }

  if (item.type === 'text') {
    return `${prefix}> Comment ${item.value}`;
  }

  if (item.type === 'attempt') {
    const load = (() => {
      if ('percent' in item.load) {
        return `${item.load.percent}%${item.load.of || ''}`;
      }

      if ('value' in item.load && item.load.unit === 'bodyweight') {
        return 'bw';
      }

      if ('value' in item.load) {
        return `${item.load.value}${item.load.unit || 'kg'}`;
      }

      return '';
    })();

    const note = item.note ? ` | ${item.note}` : '';
    return `${prefix}> Attempt ${item.reps}x${load}${note}`;
  }

  if (item.type === 'recovery') {
    const recoveryValue = (() => {
      if (typeof item.recovery.text === 'string' && item.recovery.text.trim().length > 0) {
        return item.recovery.text.trim();
      }

      if (item.recovery.value == null && item.recovery.unit === 'walk') {
        return 'walk';
      }

      if (item.recovery.value == null) {
        return '';
      }

      const unit = item.recovery.unit === 'sec'
        ? 's'
        : item.recovery.unit || '';
      if (typeof item.recovery.max === 'number' && item.recovery.max !== item.recovery.value) {
        return `${item.recovery.value}-${item.recovery.max}${unit}`;
      }
      return `${item.recovery.value}${unit}`;
    })();

    const note = item.note ? ` | ${item.note}` : '';
    return `${prefix}> Recovery ${recoveryValue}${note}`.trimEnd();
  }

  if (item.type === 'splitMove') {
    const sportToken = (() => {
      const normalized = item.sport.trim().toLowerCase();
      if (normalized === 'uphill run') return 'Uphill Run';
      if (normalized === 'run') return 'Run';
      if (normalized === 'walk') return 'Walk';
      if (normalized === 'swim') return 'Swim';
      if (normalized === 'cycling') return 'Cycling';
      if (normalized === 'skiing') return 'Skiing';
      return item.sport;
    })();

    const distanceToken = item.distance && item.distance.value !== null
      ? `${item.distance.value}${item.distance.unit || ''}`
      : null;
    const durationToken = item.duration && item.duration.value !== null
      ? `${item.duration.value}${item.duration.unit}`
      : null;

    const countToken = item.countMax
      ? `${item.count}-${item.countMax}`
      : String(item.count || item.sets || 1);

    const hasIntervalMultiplicity = item.countMax !== null || item.count > 1 || item.sets > 1;
    const specToken = (() => {
      if (hasIntervalMultiplicity && distanceToken) {
        return `${countToken}x${distanceToken}`;
      }
      if (durationToken && distanceToken) {
        return `${durationToken} ${distanceToken}`;
      }
      return durationToken || distanceToken || '';
    })();

    let intensityStr = '';
    if (item.intensity) {
      if ('zone' in item.intensity && item.intensity.zone) {
        const zone = item.intensity.zone as any;
        if ('combo' in zone && Array.isArray(zone.combo)) {
          intensityStr = `@${zone.combo.join('+')}`;
        } else if ('min' in zone && 'max' in zone) {
          intensityStr = zone.min === zone.max
            ? `@${zone.min}`
            : `@${zone.min}-${zone.max}`;
        }
      } else if ('paceMin' in item.intensity && item.intensity.paceMin && 'paceMax' in item.intensity && item.intensity.paceMax) {
        const intensity = item.intensity as any;
        const formatPace = (pace: { minutes: number; seconds: number }) => {
          const sec = String(pace.seconds).padStart(2, '0');
          return `${pace.minutes}:${sec}`;
        };

        const paceMinStr = formatPace(intensity.paceMin);
        const paceMaxStr = formatPace(intensity.paceMax);
        const pacePerDistance = intensity.pacePerDistance
          ? `/${intensity.pacePerDistance.value}${intensity.pacePerDistance.unit}`
          : (intensity.paceUnit ? `/${intensity.paceUnit}` : '');

        intensityStr = paceMinStr === paceMaxStr
          ? `@${paceMinStr}${pacePerDistance}`
          : `@${paceMinStr}-${paceMaxStr}${pacePerDistance}`;
      } else if ('min' in item.intensity && 'max' in item.intensity) {
        const intensity = item.intensity as { min: number; max: number };
        intensityStr = intensity.min === intensity.max
          ? `@${intensity.min}%`
          : `@${intensity.min}-${intensity.max}%`;
      } else if ('text' in item.intensity) {
        intensityStr = `@${item.intensity.text}`;
      } else if ('hr' in item.intensity && item.intensity.hr) {
        const hr = item.intensity.hr;
        if ('min' in hr && 'max' in hr) {
          intensityStr = `@${hr.min}-${hr.max}bpm`;
        } else if ('value' in hr) {
          intensityStr = `@${hr.value}bpm`;
        }
      }
    }

    let recoveryStr = '';
    if (item.recovery) {
      const rec = item.recovery as any;
      recoveryStr = `/${rec.value || rec.text}${rec.unit || ''}`;
    }

    const customFieldsStr = serializeCustomFields(item.customFields);
    const note = item.note || item.description;
    let line = `${prefix}> ${sportToken}${specToken ? ` ${specToken}` : ''}${intensityStr}${recoveryStr}${customFieldsStr}${note ? ` | ${note}` : ''}`;

    if (item.splits && item.splits.length > 0) {
      const nestedLines = item.splits.map((split) => serializeSplitChild(split, prefix + '> '));
      line += '\n' + nestedLines.join('\n');
    }

    return line;
  }

  return serializeSplit(item, prefix);
}

/**
 * Serialize a Split to COMPACT format
 */
function serializeSplit(item: Split, prefix: string): string {
  let line = `${prefix}> Split`;

  const splitParts: string[] = [];

  // Distance
  if (item.distance && item.distance.value !== null) {
    splitParts.push(`${item.distance.value}${item.distance.unit || 'm'}`);
  }

  if (item.duration && item.duration.value !== null) {
    const durationUnit = item.duration.unit || '';
    splitParts.push(`${item.duration.value}${durationUnit}`);
  }

  // Pace
  if (item.pace) {
    const sec = String(item.pace.seconds).padStart(2, '0');
    splitParts.push(`${item.pace.minutes}'${sec}"/${item.pace.perDistance.value}${item.pace.perDistance.unit}`);
  }

  if (splitParts.length > 0) {
    line += ` ${splitParts.join(' ')}`;
  }

  // Intensity
  if (item.intensity) {
    if ('min' in item.intensity && 'max' in item.intensity) {
      const intensity = item.intensity as { min: number; max: number };
      line += intensity.min === intensity.max
        ? `@${intensity.min}%`
        : `@${intensity.min}-${intensity.max}%`;
    } else if ('hrZone' in item.intensity) {
      const zone = item.intensity.hrZone as { min: number; max: number };
      line += zone.min === zone.max
        ? `@Z${zone.min}`
        : `@Z${zone.min}-Z${zone.max}`;
    }
  }

  // HR
  if (item.hr) {
    line += ` ${item.hr}bpm`;
  }

  // Custom fields
  if (item.customFields) {
    line += serializeCustomFields(item.customFields);
  }

  // Note
  if (item.note) {
    line += ` | ${item.note}`;
  }

  // Nested splits
  if (item.splits && item.splits.length > 0) {
    const nestedLines = item.splits.map((split) => serializeSplitChild(split, prefix + '> '));
    line += '\n' + nestedLines.join('\n');
  }

  return line;
}
