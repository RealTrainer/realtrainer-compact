# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # RT Compact UI Playground

  Reusable React components for COMPACT row rendering and editing.

  ## Goals

  - Mirror RealTrainer visual language and component layering
  - Keep UI standalone for VS Code custom preview and other hosts
  - Provide both read-only and editable row components
  - Export as a reusable React library

  ## Structure

  - `src/components/atoms` small primitives (`Badge`, `FieldLabel`, `StatChip`)
  - `src/components/molecules` row-level composition (`CompactRowView`, `CompactRowEdit`, `WorkoutHeader`)
  - `src/components/organisms` full feature blocks (`CompactBlogView`, `CompactBlogEditor`)
  - `src/lib` type-safe view models and formatters
  - `src/preview` playground fixtures

  ## Scripts

  - `npm run dev` start Vite playground
  - `npm run test` run unit tests
  - `npm run build` build playground app
  - `npm run build:lib` build reusable library bundle

  ## Library Exports

  Entry: `src/index.ts`

  Exports:

  - atoms/molecules/organisms
  - `CompactWorkoutModel` and row subtype interfaces

  ## Integration Direction

  This package is designed so RealTrainer frontend can progressively replace local rendering blocks with imports from this library. Because the component hierarchy follows atoms/molecules/organisms, migration can be done layer-by-layer without changing screen architecture.
      // Other configs...
