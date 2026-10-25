import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Alias "@/*" dibaca langsung dari tsconfig.json, jadi cukup diatur di satu tempat.
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
