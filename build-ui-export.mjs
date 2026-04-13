import * as esbuild from 'esbuild';
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const common = {
  bundle: true,
  platform: 'browser',
  target: ['es2020'],
  external: ['react', 'react-dom', 'clsx'],
  alias: {
    '@parser': join(process.cwd(), 'src/index.ts'),
    '@parser/types': join(process.cwd(), 'src/types.ts'),
  },
  jsx: 'automatic',
  minify: false,
  sourcemap: true,
};

const uiReactDist = 'ui/react/dist';
const uiReactTypesDir = join(uiReactDist, 'ui/react/src');
const outDir = 'dist/ui';

function copyDeclarationFiles(sourceDir, targetDir) {
  const entries = readdirSync(sourceDir);

  for (const entry of entries) {
    const sourcePath = join(sourceDir, entry);
    const targetPath = join(targetDir, entry);
    const stats = statSync(sourcePath);

    if (stats.isDirectory()) {
      mkdirSync(targetPath, { recursive: true });
      copyDeclarationFiles(sourcePath, targetPath);
      continue;
    }

    if (entry.endsWith('.d.ts')) {
      copyFileSync(sourcePath, targetPath);
      console.log(`Copied ${targetPath}`);
    }
  }
}

async function build() {
  mkdirSync(outDir, { recursive: true });

  // ESM build (use npm entry without CSS import)
  await esbuild.build({
    ...common,
    entryPoints: ['ui/react/src/index.npm.ts'],
    outfile: join(outDir, 'index.js'),
    format: 'esm',
  });

  // CJS build
  await esbuild.build({
    ...common,
    entryPoints: ['ui/react/src/index.npm.ts'],
    outfile: join(outDir, 'index.cjs'),
    format: 'cjs',
  });

  // Copy CSS (pre-built by Vite with Tailwind)
  const cssSource = join(uiReactDist, 'compact-ui-react.css');
  if (existsSync(cssSource)) {
    copyFileSync(cssSource, join(outDir, 'compact-ui-react.css'));
    console.log('Copied compact-ui-react.css');
  } else {
    console.warn('Warning: CSS not found. Run `npm run build:ui` first.');
  }

  // Copy TypeScript declarations from the UI source declaration tree.
  if (existsSync(uiReactTypesDir)) {
    copyDeclarationFiles(uiReactTypesDir, outDir);

    const npmEntryTypes = join(uiReactTypesDir, 'index.npm.d.ts');
    if (existsSync(npmEntryTypes)) {
      copyFileSync(npmEntryTypes, join(outDir, 'index.d.ts'));
      console.log('Copied index.d.ts');
    }

    const serverTypes = join(uiReactTypesDir, 'server.d.ts');
    if (existsSync(serverTypes)) {
      copyFileSync(serverTypes, join(outDir, 'server.d.ts'));
      console.log('Copied server.d.ts');
    }
  } else {
    console.warn('Warning: declaration files not found. Run the UI declaration build first.');
  }

  console.log('Built dist/ui/index.js and dist/ui/index.cjs');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
