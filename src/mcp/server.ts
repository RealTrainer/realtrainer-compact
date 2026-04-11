#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { createDiaryService } from '../diary/Diary.js';
import { resolveDataDir } from '../config/paths.js';
import type { DiaryKind } from '../diary/types.js';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface ServerOptions {
  dataDir: string;
  readOnly: boolean;
  logLevel: LogLevel;
}

function parseArgs(argv: string[]): ServerOptions {
  let dataDirArg: string | undefined;
  let readOnly = false;
  let logLevel: LogLevel = 'info';

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '--data-dir') {
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        throw new Error('--data-dir requires a path value');
      }
      dataDirArg = next;
      i += 1;
      continue;
    }

    if (arg === '--readonly') {
      readOnly = true;
      continue;
    }

    if (arg === '--log-level') {
      const next = argv[i + 1] as LogLevel | undefined;
      if (!next || !['debug', 'info', 'warn', 'error'].includes(next)) {
        throw new Error('--log-level must be one of: debug, info, warn, error');
      }
      logLevel = next;
      i += 1;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    dataDir: resolveDataDir({
      cliDataDir: dataDirArg,
      envDataDir: process.env.REALTRAINER_DATA_DIR,
    }),
    readOnly,
    logLevel,
  };
}

function printHelp(): void {
  console.log(`realtrainer-compact MCP server

Usage:
  node dist/mcp/server.js [options]

Options:
  --data-dir <path>            Override local data directory
  --readonly                   Start server in read-only mode
  --log-level <level>          debug | info | warn | error
  -h, --help                   Show this help

Data dir priority:
  1) --data-dir
  2) REALTRAINER_DATA_DIR
  3) ~/.realtrainer
`);
}

function asObject(input: unknown): Record<string, unknown> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {};
  }
  return input as Record<string, unknown>;
}

function str(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }
  return undefined;
}

function strArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item) => typeof item === 'string').map((item) => item.trim()).filter(Boolean);
}

async function startServer(options: ServerOptions): Promise<void> {
  const diary = createDiaryService(options.dataDir);

  if (options.logLevel === 'debug' || options.logLevel === 'info') {
    process.stderr.write(`[mcp] starting server with data dir: ${options.dataDir}\n`);
  }

  const server = new Server(
    {
      name: 'realtrainer-local-diary',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: 'rt_init',
        description: 'Initialize local RealTrainer database and default diaries',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      },
      {
        name: 'rt_list_diaries',
        description: 'List local diaries (workout/plan)',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      },
      {
        name: 'rt_create_diary',
        description: 'Create a new diary',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            kind: { type: 'string', enum: ['workout', 'plan'] },
          },
          required: ['name', 'kind'],
          additionalProperties: false,
        },
      },
      {
        name: 'rt_add_entry',
        description: 'Add diary entry (workout or plan)',
        inputSchema: {
          type: 'object',
          properties: {
            diaryId: { type: 'string' },
            kind: { type: 'string', enum: ['workout', 'plan'] },
            date: { type: 'string' },
            title: { type: 'string' },
            notes: { type: 'string' },
            compact: { type: 'string' },
            exerciseIds: { type: 'array', items: { type: 'string' } },
          },
          required: ['diaryId', 'kind', 'date', 'title'],
          additionalProperties: false,
        },
      },
      {
        name: 'rt_update_entry',
        description: 'Update existing entry by id',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            date: { type: 'string' },
            title: { type: 'string' },
            notes: { type: 'string' },
            compact: { type: 'string' },
            exerciseIds: { type: 'array', items: { type: 'string' } },
          },
          required: ['id'],
          additionalProperties: false,
        },
      },
      {
        name: 'rt_list_entries',
        description: 'List entries with optional filters',
        inputSchema: {
          type: 'object',
          properties: {
            diaryId: { type: 'string' },
            from: { type: 'string' },
            to: { type: 'string' },
            limit: { type: 'number' },
          },
          additionalProperties: false,
        },
      },
      {
        name: 'rt_create_exercise',
        description: 'Create exercise definition',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
          },
          required: ['name'],
          additionalProperties: false,
        },
      },
      {
        name: 'rt_update_exercise',
        description: 'Update exercise definition',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
          },
          required: ['id'],
          additionalProperties: false,
        },
      },
      {
        name: 'rt_list_exercises',
        description: 'List exercises',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      },
      {
        name: 'rt_summary',
        description: 'Summarize local diary entries by range/diary',
        inputSchema: {
          type: 'object',
          properties: {
            diaryId: { type: 'string' },
            from: { type: 'string' },
            to: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const name = request.params.name;
    const args = asObject(request.params.arguments);

    try {
      if (options.readOnly && name !== 'rt_list_diaries' && name !== 'rt_list_entries' && name !== 'rt_list_exercises' && name !== 'rt_summary') {
        throw new Error('Server is running in --readonly mode');
      }

      if (name === 'rt_init') {
        const result = await diary.init();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ ok: true, ...result, dataDir: options.dataDir }, null, 2),
            },
          ],
        };
      }

      if (name === 'rt_list_diaries') {
        const diaries = await diary.listDiaries();
        return { content: [{ type: 'text', text: JSON.stringify({ diaries }, null, 2) }] };
      }

      if (name === 'rt_create_diary') {
        const kind = str(args.kind) as DiaryKind | undefined;
        const diaryName = str(args.name);
        if (!kind || (kind !== 'workout' && kind !== 'plan')) {
          throw new Error('kind must be workout or plan');
        }
        if (!diaryName) {
          throw new Error('name is required');
        }
        const created = await diary.createDiary({ name: diaryName, kind });
        return { content: [{ type: 'text', text: JSON.stringify({ diary: created }, null, 2) }] };
      }

      if (name === 'rt_add_entry') {
        const diaryId = str(args.diaryId);
        const kind = str(args.kind) as DiaryKind | undefined;
        const date = str(args.date);
        const title = str(args.title);
        if (!diaryId || !kind || !date || !title) {
          throw new Error('diaryId, kind, date and title are required');
        }
        const entry = await diary.createEntry({
          diaryId,
          kind,
          date,
          title,
          notes: str(args.notes),
          compact: str(args.compact),
          exerciseIds: strArray(args.exerciseIds),
        });
        return { content: [{ type: 'text', text: JSON.stringify({ entry }, null, 2) }] };
      }

      if (name === 'rt_update_entry') {
        const id = str(args.id);
        if (!id) {
          throw new Error('id is required');
        }
        const entry = await diary.updateEntry({
          id,
          date: str(args.date),
          title: str(args.title),
          notes: args.notes === null ? null : str(args.notes),
          compact: args.compact === null ? null : str(args.compact),
          exerciseIds: Array.isArray(args.exerciseIds) ? strArray(args.exerciseIds) : undefined,
        });
        return { content: [{ type: 'text', text: JSON.stringify({ entry }, null, 2) }] };
      }

      if (name === 'rt_list_entries') {
        const entries = await diary.listEntries({
          diaryId: str(args.diaryId),
          from: str(args.from),
          to: str(args.to),
          limit: typeof args.limit === 'number' ? args.limit : undefined,
        });
        return { content: [{ type: 'text', text: JSON.stringify({ entries }, null, 2) }] };
      }

      if (name === 'rt_create_exercise') {
        const exerciseName = str(args.name);
        if (!exerciseName) {
          throw new Error('name is required');
        }
        const exercise = await diary.createExercise({
          name: exerciseName,
          description: str(args.description),
          tags: strArray(args.tags),
        });
        return { content: [{ type: 'text', text: JSON.stringify({ exercise }, null, 2) }] };
      }

      if (name === 'rt_update_exercise') {
        const id = str(args.id);
        if (!id) {
          throw new Error('id is required');
        }
        const exercise = await diary.updateExercise({
          id,
          name: str(args.name),
          description: args.description === null ? null : str(args.description),
          tags: Array.isArray(args.tags) ? strArray(args.tags) : undefined,
        });
        return { content: [{ type: 'text', text: JSON.stringify({ exercise }, null, 2) }] };
      }

      if (name === 'rt_list_exercises') {
        const exercises = await diary.listExercises();
        return { content: [{ type: 'text', text: JSON.stringify({ exercises }, null, 2) }] };
      }

      if (name === 'rt_summary') {
        const summary = await diary.summary({
          diaryId: str(args.diaryId),
          from: str(args.from),
          to: str(args.to),
        });
        return { content: [{ type: 'text', text: JSON.stringify({ summary }, null, 2) }] };
      }

      throw new Error(`Unknown tool: ${name}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        isError: true,
        content: [{ type: 'text', text: message }],
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

async function main(): Promise<void> {
  try {
    const options = parseArgs(process.argv.slice(2));
    await startServer(options);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`MCP server startup failed: ${message}\n`);
    process.exit(1);
  }
}

void main();
