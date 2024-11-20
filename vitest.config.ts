import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // Activate global variables like 'describe', 'test', 'it', 'expect'.
    environment: 'node', // Choose 'node' or 'browser'.
    coverage: {
      provider: 'istanbul', // Choose 'v8' or 'istanbul'.
      reporter: ['text', 'html'], // Generate reports in text and html format.
      all: true, // Coverage for all files.
      include: ['src/**/*.ts'], // Which files to include.
      exclude: ['tests/**', 'dist/**', 'vitest.config.ts'], // Which files to exclude.
      reportsDirectory: './coverage', // Directory to save the reports.
    },
  },
})
