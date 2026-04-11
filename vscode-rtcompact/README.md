# RT Compact Tools (Test Extension)

Local test extension for `.compact` files.

## Features

- File extension association: `.compact`
- Syntax highlighting for core COMPACT fields
- Semantic token highlighting from the language server
- Language Server diagnostics using `realtrainer-compact` parser
- Keyword completions for common fields
- Run-line hints with configurable presentation (`inlay`, `codelens`, `off`)
- Custom editor for `.compact` files (`RT Compact Preview`)

## Settings

- `rtcompact.hints.mode`
	- `inlay` (default): hint at end of the same line
	- `codelens`: smaller hint line above each `Run ...` row
	- `off`: disable hints

The extension also sets a language-specific default:

- `[rtcompact].editor.inlayHints.fontSize = 10`

## Run in VS Code

1. Open folder `realtrainer-compact/vscode-rtcompact` in VS Code.
2. Run `npm install`.
3. Press `F5` to launch Extension Development Host.
4. Create a file like `test.compact` and type COMPACT content.

## Custom Editor

- Run command: `RealTrainer Compact: Open Custom Editor`
- Or right click a `.compact` file tab and choose `Reopen Editor With...` -> `RT Compact Editor`

The editor uses a split view:

- left pane: editable COMPACT source
- right pane: live rendered preview

Edits in the custom editor update the backing text document and participate in normal save/undo/redo flows.

## Note

The language server imports parser from `../dist/index.js` relative to this extension folder. Build parser first:

```bash
cd ..
npm run build
```
