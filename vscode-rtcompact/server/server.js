import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  createConnection,
  DiagnosticSeverity,
  TextDocuments,
  ProposedFeatures,
  TextDocumentSyncKind,
  CompletionItemKind,
  InlayHintKind,
} from 'vscode-languageserver/node.js';
import { TextDocument } from 'vscode-languageserver-textdocument';

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

const KEYWORDS = [
  'Tags',
  'Emojis',
  'Summary',
  'Level0',
  'Level1',
  'Level2',
  'Level3',
  'Duration',
  'Distance',
  'Exercise',
  'Move',
  'Steps',
  'Energy',
  'Sleep',
  'Weight',
  'Mood',
  'Note',
];

const SEMANTIC_TOKEN_TYPES = ['keyword', 'number', 'string', 'type', 'operator', 'comment'];
const TOKEN_TYPE_INDEX = {
  keyword: 0,
  number: 1,
  string: 2,
  type: 3,
  operator: 4,
  comment: 5,
};

const KNOWN_LINE_START =
  /^\s*(?:\[[^\]]+\]\s*$|\[[^\]]+\]\s*##\s+.*$|##\s+.*$|#(?!#).*$|(?:>\s*)+.*$|(?:Tags|Emojis|Summary|Level[0-3]|Duration|Distance|Exercise|Move|Steps|Energy|Sleep|Weight|Mood|Note|Section|Run|Interval|Pyramid|Circuit|Superset|Food|Drinking|Expense|Reminder|Location|URL|BodyFat|Waist|Hip|Health|Derived|Phase\d*|Time|Contacts|Text|Custom|Vitals|Feeling|Pain|Max|Best)\b.*$)/;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_HINT_SETTINGS = {
  mode: 'inlay',
};

let hintSettings = { ...DEFAULT_HINT_SETTINGS };

function normalizeHintMode(value) {
  if (value === 'off' || value === 'codelens' || value === 'inlay') {
    return value;
  }
  return DEFAULT_HINT_SETTINGS.mode;
}

function updateSettings(settings) {
  const rawSettings = settings?.rtcompact ?? settings ?? {};
  const rawHints = rawSettings.hints ?? {};
  hintSettings = {
    mode: normalizeHintMode(rawHints.mode),
  };
}

async function getParserModule() {
  const parserPath = path.join(__dirname, '..', '..', 'dist', 'index.js');
  const parserUrl = pathToFileURL(parserPath).href;
  return import(parserUrl);
}

connection.onInitialize(() => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: false,
      },
      inlayHintProvider: true,
      codeLensProvider: {
        resolveProvider: false,
      },
      semanticTokensProvider: {
        legend: {
          tokenTypes: SEMANTIC_TOKEN_TYPES,
          tokenModifiers: [],
        },
        full: true,
      },
    },
  };
});

connection.onCompletion(() => {
  return KEYWORDS.map((keyword) => ({
    label: keyword,
    kind: CompletionItemKind.Keyword,
    insertText: `${keyword} `,
    detail: 'COMPACT field',
  }));
});

connection.onDidChangeConfiguration((params) => {
  updateSettings(params.settings);
});

function addLineMatchToken(absoluteTokens, lineIndex, lineText, regexp, tokenTypeIndex) {
  const match = lineText.match(regexp);
  if (!match || typeof match.index !== 'number') {
    return;
  }

  absoluteTokens.push({
    line: lineIndex,
    start: match.index,
    length: match[0].length,
    tokenType: tokenTypeIndex,
  });
}

function addPatternTokens(absoluteTokens, lineIndex, lineText, regexp, tokenTypeIndex) {
  const expression = new RegExp(regexp.source, regexp.flags.includes('g') ? regexp.flags : `${regexp.flags}g`);
  let match;
  while ((match = expression.exec(lineText)) !== null) {
    if (typeof match.index !== 'number' || match[0].length === 0) {
      break;
    }
    absoluteTokens.push({
      line: lineIndex,
      start: match.index,
      length: match[0].length,
      tokenType: tokenTypeIndex,
    });
  }
}

function addExactToken(absoluteTokens, lineIndex, start, length, tokenTypeIndex) {
  if (start < 0 || length <= 0) {
    return;
  }

  absoluteTokens.push({
    line: lineIndex,
    start,
    length,
    tokenType: tokenTypeIndex,
  });
}

function buildSemanticTokens(text) {
  const lines = text.split(/\r?\n/);
  const absoluteTokens = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];

    addLineMatchToken(absoluteTokens, lineIndex, line, /^\s*\[[^\]]+\]\s*$/, TOKEN_TYPE_INDEX.type);
    const metaTitleMatch = line.match(/^\s*(\[[^\]]+\])(\s+)(##)(\s+)(.*)$/);
    if (metaTitleMatch && typeof metaTitleMatch.index === 'number') {
      const dateStart = metaTitleMatch.index + metaTitleMatch[0].indexOf(metaTitleMatch[1]);
      const markerStart = dateStart + metaTitleMatch[1].length + metaTitleMatch[2].length;
      const titleStart = markerStart + metaTitleMatch[3].length + metaTitleMatch[4].length;
      addExactToken(absoluteTokens, lineIndex, dateStart, metaTitleMatch[1].length, TOKEN_TYPE_INDEX.type);
      addExactToken(absoluteTokens, lineIndex, markerStart, metaTitleMatch[3].length, TOKEN_TYPE_INDEX.operator);
      addExactToken(absoluteTokens, lineIndex, titleStart, metaTitleMatch[5].length, TOKEN_TYPE_INDEX.string);
    }

    const titleMatch = line.match(/^\s*(##)(\s+)(.*)$/);
    if (titleMatch && typeof titleMatch.index === 'number') {
      const markerStart = titleMatch.index + titleMatch[0].indexOf(titleMatch[1]);
      const titleStart = markerStart + titleMatch[1].length + titleMatch[2].length;
      addExactToken(absoluteTokens, lineIndex, markerStart, titleMatch[1].length, TOKEN_TYPE_INDEX.operator);
      addExactToken(absoluteTokens, lineIndex, titleStart, titleMatch[3].length, TOKEN_TYPE_INDEX.string);
    }

    const splitMatch = line.match(/^\s*((?:>\s*)+)(.*)$/);
    if (splitMatch && typeof splitMatch.index === 'number') {
      const markerStart = splitMatch.index + splitMatch[0].indexOf(splitMatch[1]);
      const contentStart = markerStart + splitMatch[1].length;
      addExactToken(absoluteTokens, lineIndex, markerStart, splitMatch[1].length, TOKEN_TYPE_INDEX.operator);
      addExactToken(absoluteTokens, lineIndex, contentStart, splitMatch[2].length, TOKEN_TYPE_INDEX.comment);
    }

    addLineMatchToken(
      absoluteTokens,
      lineIndex,
      line,
      /^\s*(Tags|Emojis|Summary|Level[0-3]|Duration|Distance|Exercise|Move|Steps|Energy|Sleep|Weight|Mood|Note|Section|Run|Interval|Pyramid|Circuit|Superset|Food|Drinking|Expense|Reminder|Location|URL|BodyFat|Waist|Hip|Health|Derived|Phase\d*|Time|Contacts|Text|Custom|Vitals|Feeling|Pain|Max|Best)\b/,
      TOKEN_TYPE_INDEX.keyword,
    );
    addLineMatchToken(absoluteTokens, lineIndex, line, /^\s*#(?!#).*$/, TOKEN_TYPE_INDEX.comment);

    // Highlight common set/rep compact forms like 3x8, 2x10x200m, 3x3+3+2-4, 4x?
    addPatternTokens(absoluteTokens, lineIndex, line, /\b\d+x(?:\d+x)?(?:\d+|\?|\d+(?:\+\d+)*(?:-\d+)?)\b/g, TOKEN_TYPE_INDEX.type);
    addPatternTokens(absoluteTokens, lineIndex, line, /\b\d+(?:[\.,]\d+)?\b/g, TOKEN_TYPE_INDEX.number);
    addPatternTokens(absoluteTokens, lineIndex, line, /\b(?:km|m|min|s|sec|kg|lb|kcal|h|bpm|steps|EUR|USD|dl|l|cm|RM)\b/g, TOKEN_TYPE_INDEX.type);
    addPatternTokens(absoluteTokens, lineIndex, line, /[@|/]/g, TOKEN_TYPE_INDEX.operator);
  }

  absoluteTokens.sort((a, b) => {
    if (a.line !== b.line) {
      return a.line - b.line;
    }
    if (a.start !== b.start) {
      return a.start - b.start;
    }
    return a.tokenType - b.tokenType;
  });

  const encodedTokens = [];
  let previousLine = 0;
  let previousStart = 0;

  for (const token of absoluteTokens) {
    const deltaLine = token.line - previousLine;
    const deltaStart = deltaLine === 0 ? token.start - previousStart : token.start;
    encodedTokens.push(deltaLine, deltaStart, token.length, token.tokenType, 0);
    previousLine = token.line;
    previousStart = token.start;
  }

  return { data: encodedTokens };
}

connection.languages.semanticTokens.on((params) => {
  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return { data: [] };
  }
  return buildSemanticTokens(document.getText());
});

function parseRunHint(lineText) {
  const match = lineText.match(/^\s*Run\s+(.+)$/);
  if (!match) {
    return null;
  }

  const rawBody = match[1].trim();
  if (!rawBody) {
    return null;
  }

  const [specPartRaw, noteRaw] = rawBody.split('|', 2);
  const specPart = (specPartRaw ?? '').trim();
  const note = (noteRaw ?? '').trim();

  const [workloadRaw, intensityRecoveryRaw] = specPart.split('@', 2);
  const workload = (workloadRaw ?? '').trim();
  const intensityRecovery = (intensityRecoveryRaw ?? '').trim();
  const [intensityRaw, recoveryRaw] = intensityRecovery.split('/', 2);

  const intensity = (intensityRaw ?? '').trim();
  const recovery = (recoveryRaw ?? '').trim();

  const durationMatch = workload.match(/\b(\d+(?:[\.,]\d+)?)\s*min\b/i);
  const distanceMatch = workload.match(/\b(\d+(?:[\.,]\d+)?)\s*(km|m)\b/i);
  const stepsMatch = workload.match(/\b(\d+)\s*steps\b/i);

  const parts = ['Run'];

  if (durationMatch) {
    parts.push(`duration ${durationMatch[1]} min`);
  }
  if (distanceMatch) {
    parts.push(`distance ${distanceMatch[1]} ${distanceMatch[2]}`);
  }
  if (stepsMatch) {
    parts.push(`steps ${stepsMatch[1]}`);
  }
  if (intensity) {
    parts.push(`intensity ${intensity}`);
  }
  if (recovery) {
    parts.push(`recovery ${recovery}`);
  }
  if (note) {
    parts.push(`note ${note}`);
  }

  if (parts.length === 1 && workload) {
    parts.push(`spec ${workload}`);
  }

  return `=> ${parts.join(', ')}`;
}

connection.languages.inlayHint.on((params) => {
  if (hintSettings.mode !== 'inlay') {
    return [];
  }

  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return [];
  }

  const lines = document.getText().split(/\r?\n/);
  const startLine = Math.max(params.range.start.line, 0);
  const endLine = Math.min(params.range.end.line, lines.length - 1);
  const hints = [];

  for (let lineIndex = startLine; lineIndex <= endLine; lineIndex += 1) {
    const line = lines[lineIndex] ?? '';
    const hintText = parseRunHint(line);
    if (!hintText) {
      continue;
    }

    hints.push({
      position: { line: lineIndex, character: line.length },
      label: hintText,
      kind: InlayHintKind.Type,
      paddingLeft: true,
    });
  }

  return hints;
});

connection.onCodeLens((params) => {
  if (hintSettings.mode !== 'codelens') {
    return [];
  }

  const document = documents.get(params.textDocument.uri);
  if (!document) {
    return [];
  }

  const lines = document.getText().split(/\r?\n/);
  const lenses = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex] ?? '';
    const hintText = parseRunHint(line);
    if (!hintText) {
      continue;
    }

    lenses.push({
      range: {
        start: { line: lineIndex, character: 0 },
        end: { line: lineIndex, character: 0 },
      },
      command: {
        title: hintText,
        command: 'rtcompact.ignoreHintClick',
      },
    });
  }

  return lenses;
});

async function validateDocument(document) {
  let parseCompact;
  try {
    const parser = await getParserModule();
    parseCompact = parser.parseCompact;
  } catch (error) {
    connection.sendDiagnostics({
      uri: document.uri,
      diagnostics: [
        {
          severity: DiagnosticSeverity.Error,
          range: {
            start: { line: 0, character: 0 },
            end: { line: 0, character: 1 },
          },
          message: `Parser module not available: ${error instanceof Error ? error.message : String(error)}`,
          source: 'rtcompact',
        },
      ],
    });
    return;
  }

  const text = document.getText();
  const diagnostics = [];
  const lines = text.split(/\r?\n/);

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    if (line.trim().length === 0) {
      continue;
    }
    if (KNOWN_LINE_START.test(line)) {
      continue;
    }

    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      range: {
        start: { line: lineIndex, character: 0 },
        end: { line: lineIndex, character: Math.max(line.length, 1) },
      },
      message: 'Unknown line format',
      source: 'rtcompact',
    });
  }

  const result = parseCompact(text);
  if (!result.success) {
    const startLine = Math.max((result.error.location?.start.line ?? 1) - 1, 0);
    const startChar = Math.max((result.error.location?.start.column ?? 1) - 1, 0);
    const endLine = Math.max((result.error.location?.end.line ?? (startLine + 1)) - 1, startLine);
    const endChar = Math.max((result.error.location?.end.column ?? (startChar + 1)) - 1, startChar + 1);

    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      range: {
        start: { line: startLine, character: startChar },
        end: { line: endLine, character: endChar },
      },
      message: result.error.message,
      source: 'rtcompact',
    });
  }

  connection.sendDiagnostics({ uri: document.uri, diagnostics });
}

documents.onDidOpen((event) => {
  void validateDocument(event.document);
});

documents.onDidChangeContent((event) => {
  void validateDocument(event.document);
});

documents.onDidSave((event) => {
  void validateDocument(event.document);
});

documents.listen(connection);
connection.listen();
