import { afterEach, describe, expect, it } from 'vitest';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createDiaryService } from '../src/diary/Diary.js';

const tempDirs: string[] = [];

async function makeService() {
  const dir = await mkdtemp(join(tmpdir(), 'rt-diary-'));
  tempDirs.push(dir);
  return createDiaryService(dir);
}

afterEach(async () => {
  for (const dir of tempDirs.splice(0, tempDirs.length)) {
    await rm(dir, { recursive: true, force: true });
  }
});

describe('DiaryService', () => {
  it('initializes default diaries', async () => {
    const service = await makeService();
    const init = await service.init();

    expect(init.initialized).toBe(true);

    const diaries = await service.listDiaries();
    expect(diaries).toHaveLength(2);
    expect(diaries[0].id).toBe('1');
    expect(diaries[1].id).toBe('2');
  });

  it('creates and updates entries with stable ids', async () => {
    const service = await makeService();
    await service.init();

    const created = await service.createEntry({
      diaryId: '1',
      kind: 'workout',
      date: '2026-04-11',
      title: 'Easy run',
      notes: '45 min',
    });

    expect(created.id.length).toBeGreaterThan(10);

    const updated = await service.updateEntry({
      id: created.id,
      title: 'Easy run updated',
    });

    expect(updated.id).toBe(created.id);
    expect(updated.title).toBe('Easy run updated');

    const entries = await service.listEntries({ diaryId: '1' });
    expect(entries).toHaveLength(1);
    expect(entries[0].id).toBe(created.id);
  });

  it('creates and updates exercises', async () => {
    const service = await makeService();
    await service.init();

    const exercise = await service.createExercise({
      name: 'Back Squat',
      tags: ['legs'],
    });

    expect(exercise.name).toBe('Back Squat');

    const patched = await service.updateExercise({
      id: exercise.id,
      description: 'Barbell back squat',
      tags: ['legs', 'strength'],
    });

    expect(patched.description).toBe('Barbell back squat');
    expect(patched.tags).toEqual(['legs', 'strength']);
  });
});
