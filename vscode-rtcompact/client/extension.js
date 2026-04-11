import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import * as vscode from 'vscode';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LanguageClient, TransportKind } from 'vscode-languageclient/node.js';
import { CompactBlogView } from '@realtrainer/compact-ui-react/server';

const require = createRequire(import.meta.url);

let client;

const PREVIEW_VIEW_TYPE = 'rtcompact.preview';

function getNonce() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let value = '';
  for (let i = 0; i < 32; i += 1) {
    value += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return value;
}

async function stopClientSafely(instance) {
  if (!instance) {
    return;
  }

  try {
    await instance.stop();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("Client is not running and can't be stopped")) {
      throw error;
    }
  }
}

export async function activate(context) {
  const extensionPath = path.dirname(fileURLToPath(import.meta.url));
  const serverModule = path.join(extensionPath, '..', 'server', 'server.js');

  const serverOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc,
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: { execArgv: ['--nolazy', '--inspect=6009'] },
    },
  };

  const clientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'rtcompact' },
      { scheme: 'untitled', language: 'rtcompact' },
    ],
    synchronize: {
      configurationSection: 'rtcompact',
    },
  };

  const nextClient = new LanguageClient('rtcompact-lsp', 'RT Compact Language Server', serverOptions, clientOptions);

  context.subscriptions.push(
    vscode.commands.registerCommand('rtcompact.ignoreHintClick', () => {
      // CodeLens needs a command target. Keep this as a no-op.
    }),
  );

  const previewProvider = {
    resolveCustomTextEditor(document, webviewPanel) {
      const mediaRoot = vscode.Uri.joinPath(context.extensionUri, 'media');
      const uiCssPath = getUiLibraryCssPath();
      const localRoots = [mediaRoot];
      if (uiCssPath) {
        localRoots.push(vscode.Uri.file(path.dirname(uiCssPath)));
      }

      webviewPanel.webview.options = {
        enableScripts: true,
        localResourceRoots: localRoots,
      };
      const uiStyleUri = uiCssPath ? webviewPanel.webview.asWebviewUri(vscode.Uri.file(uiCssPath)) : null;
      webviewPanel.webview.html = getCustomEditorHtml(webviewPanel.webview, context.extensionUri, uiStyleUri);

      const updateWebview = async () => {
        const previewHtml = await renderPreviewFromCompact(document.getText());
        webviewPanel.webview.postMessage({
          type: 'setDocument',
          text: document.getText(),
          fileName: path.basename(document.uri.fsPath),
          previewHtml,
        });
      };

      const changeSubscription = vscode.workspace.onDidChangeTextDocument((event) => {
        if (event.document.uri.toString() === document.uri.toString()) {
          updateWebview();
        }
      });

      const saveSubscription = vscode.workspace.onDidSaveTextDocument((savedDoc) => {
        if (savedDoc.uri.toString() === document.uri.toString()) {
          updateWebview();
        }
      });

      const messageSubscription = webviewPanel.webview.onDidReceiveMessage(async (message) => {
        if (!message || message.type !== 'editDocument' || typeof message.text !== 'string') {
          return;
        }

        if (message.text === document.getText()) {
          return;
        }

        const edit = new vscode.WorkspaceEdit();
        edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), message.text);
        await vscode.workspace.applyEdit(edit);
      });

      webviewPanel.onDidDispose(() => {
        changeSubscription.dispose();
        saveSubscription.dispose();
        messageSubscription.dispose();
      });

      updateWebview();
    },
  };

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(PREVIEW_VIEW_TYPE, previewProvider, {
      webviewOptions: { retainContextWhenHidden: true },
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('rtcompact.openPreview', async () => {
      const activeUri = vscode.window.activeTextEditor?.document?.uri;
      if (!activeUri || !activeUri.fsPath.endsWith('.compact')) {
        vscode.window.showInformationMessage('Open a .compact file first to use RealTrainer Compact Custom Editor.');
        return;
      }

      await vscode.commands.executeCommand('vscode.openWith', activeUri, PREVIEW_VIEW_TYPE);
    }),
  );

  try {
    await nextClient.start();
    client = nextClient;
    context.subscriptions.push({
      dispose: () => {
        void stopClientSafely(client);
      },
    });
  } catch (error) {
    await stopClientSafely(nextClient);
    const message = error instanceof Error ? error.message : String(error);
    vscode.window.showWarningMessage(`RT Compact language server failed to start: ${message}. Preview editor is still available.`);
    console.error('[rtcompact] language server start failed', error);
  }
}

export async function deactivate() {
  if (!client) {
    return;
  }
  await stopClientSafely(client);
  client = undefined;
}

function getCustomEditorHtml(webview, extensionUri, uiStyleUri) {
  const nonce = getNonce();
  const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'compactEditor.js'));
  const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'compactEditor.css'));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RT Compact Editor</title>
  <link rel="stylesheet" href="${styleUri}" />
  ${uiStyleUri ? `<link rel="stylesheet" href="${uiStyleUri}" />` : ''}
</head>
<body>
  <main class="wrap" id="root">
    <header class="top">
      <div>
        <div><strong>RT Compact Editor</strong></div>
        <div class="name" id="fileName">No file</div>
      </div>
      <div class="legend">Preview</div>
    </header>

    <section class="layout">
      <div class="pane">
        <div class="pane-title">Preview</div>
        <section class="cards" id="cards"></section>
      </div>
    </section>
  </main>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
}

function getUiLibraryCssPath() {
  try {
    return require.resolve('@realtrainer/compact-ui-react/dist/compact-ui-react.css');
  } catch {
    try {
      const packageRoot = path.dirname(require.resolve('@realtrainer/compact-ui-react/server'));
      const distDir = packageRoot;
      const files = fs.readdirSync(distDir);
      const cssFile = files.find((file) => file.endsWith('.css'));
      return cssFile ? path.join(distDir, cssFile) : null;
    } catch {
      return null;
    }
  }
}

function formatCompactDate(dateValue) {
  if (!dateValue || typeof dateValue !== 'object') {
    return '';
  }

  if (dateValue.type === 'date' && dateValue.year && dateValue.month && dateValue.day) {
    const mm = String(dateValue.month).padStart(2, '0');
    const dd = String(dateValue.day).padStart(2, '0');
    return `${dd}.${mm}.${dateValue.year}`;
  }

  if (dateValue.type === 'datetime' && dateValue.year && dateValue.month && dateValue.day) {
    const mm = String(dateValue.month).padStart(2, '0');
    const dd = String(dateValue.day).padStart(2, '0');
    const hh = String(dateValue.hour ?? 0).padStart(2, '0');
    const min = String(dateValue.minute ?? 0).padStart(2, '0');
    return `${dd}.${mm}.${dateValue.year} ${hh}:${min}`;
  }

  if (dateValue.type === 'week' && dateValue.week && dateValue.year) {
    return `W${dateValue.week}/${dateValue.year}`;
  }

  return '';
}

function toPreviewRows(content) {
  const rows = [];

  const mapSplit = (split, splitId) => ({
    id: splitId,
    type: 'split',
    distance: split?.distance && typeof split.distance === 'object'
      ? {
          value: split.distance.value,
          valueMax: split.distance.valueMax,
          unit: split.distance.unit,
        }
      : undefined,
    duration: split?.duration && typeof split.duration === 'object'
      ? {
          value: split.duration.value,
          unit: split.duration.unit,
        }
      : undefined,
    pace: split?.pace && typeof split.pace === 'object'
      ? {
          minutes: split.pace.minutes,
          seconds: split.pace.seconds,
          perDistance: split.pace.perDistance,
        }
      : undefined,
    intensity: split?.intensity,
    hr: typeof split?.hr === 'number' ? split.hr : null,
    customFields: Array.isArray(split?.customFields) ? split.customFields : null,
    note: split?.note ?? null,
    splits: Array.isArray(split?.splits)
      ? split.splits.map((nested, nestedIndex) => mapSplit(nested, `${splitId}-nested-${nestedIndex}`))
      : null,
  });

  for (let index = 0; index < content.length; index += 1) {
    const item = content[index];
    if (!item || typeof item !== 'object' || typeof item.type !== 'string') {
      continue;
    }

    const id = `${item.type}-${index}`;

    if (item.type === 'summary') {
      rows.push({ id, type: 'summary', text: item.text ?? '' });
      continue;
    }

    if (item.type === 'phase') {
      rows.push({ id, type: 'phase', number: item.number ?? null, name: item.name ?? 'Phase', details: item.details ?? '' });
      continue;
    }

    if (item.type === 'section') {
      rows.push({ id, type: 'section', name: item.name ?? 'Section' });
      continue;
    }

    if (item.type === 'custom') {
      rows.push({
        id,
        type: 'custom',
        name: item.name ?? 'Custom',
        value: item.value,
        unit: item.unit ?? null,
      });
      continue;
    }

    if (item.type === 'exercise') {
      rows.push({
        id,
        type: 'exercise',
        name: item.name ?? 'Exercise',
        sets: item.sets ?? 0,
        reps: item.reps ?? 0,
        weightKg: item.weight && typeof item.weight === 'object' ? item.weight.value : undefined,
        note: item.note ?? '',
      });
      continue;
    }

    if (item.type === 'pyramid') {
      rows.push({
        id,
        type: 'pyramid',
        name: item.name ?? 'Pyramid',
        sets: Array.isArray(item.sets)
          ? item.sets.map((set) => ({
              reps: set?.reps ?? 0,
              weightKg: set?.weight && typeof set.weight === 'object' ? set.weight.value : undefined,
            }))
          : [],
        note: item.note ?? '',
      });
      continue;
    }

    if (item.type === 'run' || item.type === 'move') {
      rows.push({
        id,
        type: 'move',
        sport: item.sport,
        sets: item.sets,
        count: item.count,
        countMax: item.countMax,
        distance: item.distance && typeof item.distance === 'object'
          ? {
              value: item.distance.value,
              valueMax: item.distance.valueMax,
              unit: item.distance.unit,
            }
          : undefined,
        duration: item.duration && typeof item.duration === 'object'
          ? {
              value: item.duration.value,
              unit: item.duration.unit,
            }
          : undefined,
        steps: item.steps,
        intensity: item.intensity,
        recovery: item.recovery,
        note: item.note,
        description: item.description,
        customFields: Array.isArray(item.customFields) ? item.customFields : null,
        splits: Array.isArray(item.splits)
          ? item.splits.map((split, splitIndex) => mapSplit(split, `${id}-split-${splitIndex}`))
          : null,
      });
      continue;
    }

    if (item.type === 'duration') {
      rows.push({
        id,
        type: 'duration',
        value: item.duration?.value ?? 0,
        unit: item.duration?.unit ?? 'min',
        description: item.description ?? '',
      });
      continue;
    }

    if (item.type === 'split') {
      rows.push(mapSplit(item, id));
      continue;
    }

    if (item.type === 'text') {
      rows.push({ id, type: 'text', text: item.value ?? '' });
      continue;
    }

    if (item.type === 'unknown') {
      rows.push({ id, type: 'unknown', raw: item.raw ?? 'Unknown line' });
    }
  }

  return rows;
}

function mapWorkoutToViewModel(workout) {
  const tagsEntry = workout.content.find((item) => item?.type === 'tags');
  const emojisEntry = workout.content.find((item) => item?.type === 'emojis');

  return {
    title: workout.title ?? 'Untitled workout',
    date: formatCompactDate(workout.date),
    tags: Array.isArray(tagsEntry?.tags) ? tagsEntry.tags : [],
    emojis: emojisEntry?.emojis,
    rows: toPreviewRows(Array.isArray(workout.content) ? workout.content : []),
  };
}

async function renderPreviewFromCompact(text) {
  let parseCompact;

  try {
    ({ parseCompact } = await import('realtrainer-compact'));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `<article class="empty">Parser module unavailable: ${message}</article>`;
  }

  const result = parseCompact(text);
  if (!result.success) {
    const where = result.error.location?.start
      ? `Line ${result.error.location.start.line}, column ${result.error.location.start.column}`
      : 'Unknown location';
    return `<article class="empty">Parse error: ${where} - ${result.error.message}</article>`;
  }

  if (!result.document.workouts.length) {
    return '<article class="empty">No workouts to preview.</article>';
  }

  return result.document.workouts
    .map((workout) => renderToStaticMarkup(React.createElement(CompactBlogView, { workout: mapWorkoutToViewModel(workout) })))
    .join('');
}
