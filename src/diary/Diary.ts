import { randomUUID } from 'node:crypto';
import { JsonDiaryStorage, createEmptyDb } from './storage.js';
import type {
  CreateDiaryInput,
  CreateEntryInput,
  CreateExerciseInput,
  DiaryDb,
  DiaryRecord,
  EntryRecord,
  ExerciseRecord,
  ListEntriesInput,
  SummaryInput,
  UpdateEntryInput,
  UpdateExerciseInput,
} from './types.js';

function nowIso(): string {
  return new Date().toISOString();
}

function inDateRange(date: string, from?: string, to?: string): boolean {
  if (from && date < from) return false;
  if (to && date > to) return false;
  return true;
}

export class DiaryService {
  constructor(private readonly storage: JsonDiaryStorage) {}

  async init(): Promise<{ dataFile: string; initialized: boolean }> {
    await this.storage.ensureReady();

    let db = await this.storage.read();
    let initialized = false;

    if (db.diaries.length === 0) {
      const ts = nowIso();
      db = {
        ...db,
        diaries: [
          {
            id: '1',
            name: 'Training Diary',
            kind: 'workout',
            createdAt: ts,
            updatedAt: ts,
          },
          {
            id: '2',
            name: 'Training Plan',
            kind: 'plan',
            createdAt: ts,
            updatedAt: ts,
          },
        ],
      };
      await this.storage.write(db);
      initialized = true;
    }

    return {
      dataFile: 'db.json',
      initialized,
    };
  }

  async listDiaries(): Promise<DiaryRecord[]> {
    const db = await this.storage.read();
    return db.diaries;
  }

  async createDiary(input: CreateDiaryInput): Promise<DiaryRecord> {
    const db = await this.storage.read();
    const ts = nowIso();

    const diary: DiaryRecord = {
      id: randomUUID(),
      name: input.name,
      kind: input.kind,
      createdAt: ts,
      updatedAt: ts,
    };

    db.diaries.push(diary);
    await this.storage.write(db);
    return diary;
  }

  async listEntries(input: ListEntriesInput = {}): Promise<EntryRecord[]> {
    const db = await this.storage.read();

    let items = db.entries.filter((entry) => {
      if (input.diaryId && entry.diaryId !== input.diaryId) {
        return false;
      }
      return inDateRange(entry.date, input.from, input.to);
    });

    items = items.sort((a, b) => (a.date < b.date ? 1 : -1));

    if (input.limit && input.limit > 0) {
      items = items.slice(0, input.limit);
    }

    return items;
  }

  async createEntry(input: CreateEntryInput): Promise<EntryRecord> {
    const db = await this.storage.read();
    this.assertDiaryExists(db, input.diaryId);

    const ts = nowIso();
    const entry: EntryRecord = {
      id: randomUUID(),
      diaryId: input.diaryId,
      kind: input.kind,
      date: input.date,
      title: input.title,
      notes: input.notes ?? null,
      compact: input.compact ?? null,
      exerciseIds: input.exerciseIds ?? [],
      createdAt: ts,
      updatedAt: ts,
    };

    db.entries.push(entry);
    await this.storage.write(db);
    return entry;
  }

  async updateEntry(input: UpdateEntryInput): Promise<EntryRecord> {
    const db = await this.storage.read();
    const entry = db.entries.find((item) => item.id === input.id);
    if (!entry) {
      throw new Error(`Entry not found: ${input.id}`);
    }

    entry.date = input.date ?? entry.date;
    entry.title = input.title ?? entry.title;
    if (input.notes !== undefined) {
      entry.notes = input.notes;
    }
    if (input.compact !== undefined) {
      entry.compact = input.compact;
    }
    if (input.exerciseIds) {
      entry.exerciseIds = input.exerciseIds;
    }
    entry.updatedAt = nowIso();

    await this.storage.write(db);
    return entry;
  }

  async createExercise(input: CreateExerciseInput): Promise<ExerciseRecord> {
    const db = await this.storage.read();
    const ts = nowIso();

    const exercise: ExerciseRecord = {
      id: randomUUID(),
      name: input.name,
      description: input.description ?? null,
      tags: input.tags ?? [],
      createdAt: ts,
      updatedAt: ts,
    };

    db.exercises.push(exercise);
    await this.storage.write(db);
    return exercise;
  }

  async updateExercise(input: UpdateExerciseInput): Promise<ExerciseRecord> {
    const db = await this.storage.read();
    const exercise = db.exercises.find((item) => item.id === input.id);
    if (!exercise) {
      throw new Error(`Exercise not found: ${input.id}`);
    }

    exercise.name = input.name ?? exercise.name;
    if (input.description !== undefined) {
      exercise.description = input.description;
    }
    if (input.tags) {
      exercise.tags = input.tags;
    }
    exercise.updatedAt = nowIso();

    await this.storage.write(db);
    return exercise;
  }

  async listExercises(): Promise<ExerciseRecord[]> {
    const db = await this.storage.read();
    return db.exercises;
  }

  async summary(input: SummaryInput = {}): Promise<{
    totals: { diaries: number; entries: number; exercises: number };
    entriesByKind: Record<'workout' | 'plan', number>;
    entriesByDiary: Array<{ diaryId: string; diaryName: string; count: number }>;
  }> {
    const db = await this.storage.read();

    const filtered = db.entries.filter((entry) => {
      if (input.diaryId && entry.diaryId !== input.diaryId) {
        return false;
      }
      return inDateRange(entry.date, input.from, input.to);
    });

    const entriesByKind: Record<'workout' | 'plan', number> = {
      workout: 0,
      plan: 0,
    };

    for (const entry of filtered) {
      entriesByKind[entry.kind] += 1;
    }

    const perDiaryMap = new Map<string, number>();
    for (const entry of filtered) {
      perDiaryMap.set(entry.diaryId, (perDiaryMap.get(entry.diaryId) ?? 0) + 1);
    }

    const entriesByDiary = [...perDiaryMap.entries()].map(([diaryId, count]) => {
      const diary = db.diaries.find((item) => item.id === diaryId);
      return {
        diaryId,
        diaryName: diary?.name ?? 'Unknown diary',
        count,
      };
    });

    entriesByDiary.sort((a, b) => b.count - a.count);

    return {
      totals: {
        diaries: db.diaries.length,
        entries: filtered.length,
        exercises: db.exercises.length,
      },
      entriesByKind,
      entriesByDiary,
    };
  }

  private assertDiaryExists(db: DiaryDb, diaryId: string): void {
    const found = db.diaries.some((item) => item.id === diaryId);
    if (!found) {
      throw new Error(`Diary not found: ${diaryId}`);
    }
  }
}

export function createDiaryService(dataDir: string): DiaryService {
  return new DiaryService(new JsonDiaryStorage(dataDir));
}

export function createEmptyDiaryDb(): DiaryDb {
  return createEmptyDb();
}
