import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const configuredBase = process.env.VITE_BASE_PATH?.trim();
  const base = configuredBase && configuredBase.length > 0 ? configuredBase : '/';

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@parser': path.resolve(__dirname, '../../src/index.ts'),
        '@parser/types': path.resolve(__dirname, '../../src/types.ts'),
      },
    },
    server: {
      fs: {
        allow: [path.resolve(__dirname, '..', '..', '..')],
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      globals: true,
    },
    build:
      mode === 'library'
        ? {
            lib: {
              entry: {
                index: path.resolve(__dirname, 'src/index.ts'),
                server: path.resolve(__dirname, 'src/server.ts'),
              },
              name: 'RTCompactUI',
              fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'umd.cjs'}`,
            },
          }
        : undefined,
  };
});
