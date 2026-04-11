import * as esbuild from 'esbuild';
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const common = {
  bundle: true,
  platform: 'browser',
  target: ['es2020'],
  external: ['react', 'react-dom', 'clsx'],
  jsx: 'automatic',
  minify: false,
  sourcemap: true,
};

const uiReactDist = 'ui/react/dist';
const outDir = 'dist/ui';

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

  // Copy TypeScript declarations from ui/react dist
  const declFiles = readdirSync(uiReactDist).filter(f => f.endsWith('.d.ts'));
  for (const file of declFiles) {
    copyFileSync(join(uiReactDist, file), join(outDir, file));
    console.log(`Copied ${file}`);
  }

  console.log('Built dist/ui/index.js and dist/ui/index.cjs');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
