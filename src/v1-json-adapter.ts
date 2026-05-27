function deepClone<T>(value: T): T {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

interface OldDate {
  type: string;
  year?: number;
  month?: number;
  day?: number;
  unknown?: boolean;
}

interface NewDate {
  type: string;
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  timezone?: string;
  unknown?: boolean;
}

function toNewDate(oldDate: OldDate | null | undefined) {
  if (!oldDate || oldDate.type !== 'date') return null;
  return {
    type: 'date',
    year: Number(oldDate.year) || 0,
    month: Number(oldDate.month) || 0,
    day: Number(oldDate.day) || 0,
    unknown: Boolean(oldDate.unknown ?? false),
  };
}

function toOldDate(newDate: NewDate | null | undefined) {
  if (!newDate || typeof newDate !== 'object') return null;
  if (newDate.type === 'datetime') {
    const out: Record<string, unknown> = {
      type: 'datetime',
      year: Number(newDate.year) || 0,
      month: Number(newDate.month) || 0,
      day: Number(newDate.day) || 0,
      hour: Number(newDate.hour) || 0,
      minute: Number(newDate.minute) || 0,
    };
    if (typeof newDate.timezone === 'string' && newDate.timezone.length > 0) {
      out.timezone = newDate.timezone;
    }
    return out;
  }
  if (newDate.type !== 'date') return null;
  const out: Record<string, unknown> = {
    type: 'date',
    year: Number(newDate.year) || 0,
    month: Number(newDate.month) || 0,
    day: Number(newDate.day) || 0,
  };
  if (newDate.unknown === true) out.unknown = true;
  return out;
}

function normalizeNewContentItem(item: unknown): Record<string, unknown> {
  if (!item || typeof item !== 'object') {
    return { type: 'unknown', raw: String(item ?? '') };
  }
  const record = item as Record<string, unknown>;
  const type = String(record.type || 'unknown');
  if (type === 'tags') {
    return {
      type: 'tags',
      tags: Array.isArray(record.tags) ? record.tags.map((x) => String(x)) : [],
    };
  }
  if (type === 'summary') {
    return { type: 'summary', text: String(record.text ?? '') };
  }
  if (type === 'text') {
    return { type: 'text', value: String(record.value ?? '') };
  }
  if (type === 'unknown') {
    return { type: 'unknown', raw: String(record.raw ?? '') };
  }
  if (type === 'expense' && record.currency === 'EUROCHAR') {
    record.currency = '€';
  }
  return deepClone(record);
}

function normalizeOldContentItem(item: unknown): Record<string, unknown> {
  return normalizeNewContentItem(item);
}

export function fromOldV1Json(oldJson: unknown): { workouts: unknown[]; format: string } {
  const source = deepClone(oldJson) as Record<string, unknown>;
  const oldDoc = (source?.document ?? source) as Record<string, unknown>;
  const oldWorkouts = Array.isArray(oldDoc?.workouts) ? oldDoc.workouts : [];

  const workouts = oldWorkouts.map((w) => {
    const workout = w as Record<string, unknown>;
    return {
      type: 'workout',
      title: String(workout?.title ?? 'Untitled'),
      date: toNewDate(workout?.date as OldDate | undefined),
      content: Array.isArray(workout?.content)
        ? workout.content.map(normalizeOldContentItem)
        : [],
    };
  });

  return {
    workouts,
    format: 'compact-v1',
  };
}

export function toOldV1Json(newJson: unknown): { success: true; document: Record<string, unknown> } {
  const source = deepClone(newJson) as Record<string, unknown>;
  const newDoc = (source?.document ?? source) as Record<string, unknown>;
  const newWorkouts = Array.isArray(newDoc?.workouts) ? newDoc.workouts : [];

  const workouts = newWorkouts.map((w) => {
    const workout = w as Record<string, unknown>;
    return {
      type: 'workout',
      id: null,
      date: toOldDate(workout?.date as NewDate | undefined),
      title: workout?.title == null ? null : String(workout.title),
      format: typeof workout?.format === 'string' ? workout.format : undefined,
      content: Array.isArray(workout?.content)
        ? workout.content.map(normalizeNewContentItem)
        : [],
    };
  });

  const document: Record<string, unknown> = {
    workouts,
    stats: [],
  };
  if (typeof newDoc?.format === 'string' && newDoc.format.trim().length > 0) {
    document.format = newDoc.format.trim();
  }

  return {
    success: true,
    document,
  };
}

export function convertV1Json(
  input: unknown,
  direction: 'old-to-new' | 'new-to-old',
): unknown {
  if (direction === 'old-to-new') return fromOldV1Json(input);
  if (direction === 'new-to-old') return toOldV1Json(input);
  throw new Error(`Unsupported direction: ${direction}`);
}
