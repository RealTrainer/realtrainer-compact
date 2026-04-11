import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import type { DiaryDb } from './types.js';

function nowIso(): string {
  return new Date().toISOString();
}

export function createEmptyDb(): DiaryDb {
  return {
    version: 1,
    updatedAt: nowIso(),
    diaries: [],
    entries: [],
    exercises: [],
  };
}

function assertDbShape(value: unknown): asserts value is DiaryDb {
  if (!value || typeof value !== 'object') {
    throw new Error('Invalid database: expected object');
  }

  const candidate = value as Partial<DiaryDb>;
  if (candidate.version !== 1) {
    throw new Error('Invalid database: unsupported version');
  }

  if (!Array.isArray(candidate.diaries) || !Array.isArray(candidate.entries) || !Array.isArray(candidate.exercises)) {
    throw new Error('Invalid database: missing collections');
  }
}

export class JsonDiaryStorage {
  private readonly dbFilePath: string;
  private readonly backupDirPath: string;

  constructor(private readonly dataDir: string) {
    this.dbFilePath = join(dataDir, 'db.json');
    this.backupDirPath = join(dataDir, 'backups');
  }

  async ensureReady(): Promise<void> {
    await this.ensureDir();

    try {
      await stat(this.dbFilePath);
    } catch {
      await writeFile(this.dbFilePath, JSON.stringify(createEmptyDb(), null, 2) + '\n', 'utf8');
    }
  }

  async read(): Promise<DiaryDb> {
    await this.ensureReady();
    const raw = await readFile(this.dbFilePath, 'utf8');

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to parse database JSON: ${reason}`);
    }

    assertDbShape(parsed);
    return parsed;
  }

  async write(db: DiaryDb, options: { backup?: boolean } = {}): Promise<void> {
    await this.ensureDir();

    const withTimestamp: DiaryDb = {
      ...db,
      updatedAt: nowIso(),
    };

    if (options.backup ?? true) {
      await this.createBackup();
    }

    const tmpPath = `${this.dbFilePath}.${randomUUID()}.tmp`;
    await writeFile(tmpPath, JSON.stringify(withTimestamp, null, 2) + '\n', 'utf8');
    await rename(tmpPath, this.dbFilePath);
  }

  private async ensureDir(): Promise<void> {
    await mkdir(this.dataDir, { recursive: true });
  }

  private async createBackup(): Promise<void> {
    try {
      await stat(this.dbFilePath);
    } catch {
      return;
    }

    await mkdir(this.backupDirPath, { recursive: true });
    const stamp = nowIso().replace(/[:.]/g, '-');
    const backupFile = join(this.backupDirPath, `db-${stamp}.json`);
    const raw = await readFile(this.dbFilePath, 'utf8');
    await writeFile(backupFile, raw, 'utf8');
  }
}
