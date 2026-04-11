import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    globals: false,
    environment: 'node',
    testTimeout: 10000,
    // Don't transform imports from dist folder
    server: {
      deps: {
        inline: [/dist/],
      },
    },
  },
});
