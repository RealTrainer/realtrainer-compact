export type DiaryKind = 'workout' | 'plan';

export interface DiaryRecord {
  id: string;
  name: string;
  kind: DiaryKind;
  createdAt: string;
  updatedAt: string;
}

export interface EntryRecord {
  id: string;
  diaryId: string;
  kind: DiaryKind;
  date: string;
  title: string;
  notes: string | null;
  compact: string | null;
  exerciseIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseRecord {
  id: string;
  name: string;
  description: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DiaryDb {
  version: 1;
  updatedAt: string;
  diaries: DiaryRecord[];
  entries: EntryRecord[];
  exercises: ExerciseRecord[];
}

export interface CreateDiaryInput {
  name: string;
  kind: DiaryKind;
}

export interface ListEntriesInput {
  diaryId?: string;
  from?: string;
  to?: string;
  limit?: number;
}

export interface CreateEntryInput {
  diaryId: string;
  kind: DiaryKind;
  date: string;
  title: string;
  notes?: string;
  compact?: string;
  exerciseIds?: string[];
}

export interface UpdateEntryInput {
  id: string;
  date?: string;
  title?: string;
  notes?: string | null;
  compact?: string | null;
  exerciseIds?: string[];
}

export interface CreateExerciseInput {
  name: string;
  description?: string;
  tags?: string[];
}

export interface UpdateExerciseInput {
  id: string;
  name?: string;
  description?: string | null;
  tags?: string[];
}

export interface SummaryInput {
  diaryId?: string;
  from?: string;
  to?: string;
}
