import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

export interface DataDirOptions {
  cliDataDir?: string;
  envDataDir?: string;
}

export function resolveDataDir(options: DataDirOptions = {}): string {
  if (options.cliDataDir && options.cliDataDir.trim().length > 0) {
    return resolve(options.cliDataDir);
  }

  if (options.envDataDir && options.envDataDir.trim().length > 0) {
    return resolve(options.envDataDir);
  }

  return join(homedir(), '.realtrainer');
}
