import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  run: { cache: { tasks: true } },
  test: {
    include: ['{apps,packages}/**/*.test.{ts,tsx}'],
    passWithNoTests: true,
  },
  fmt: {
    ignorePatterns: ['pnpm-lock.yaml', '.changeset/**'],
    semi: true,
    useTabs: false,
    tabWidth: 2,
    singleQuote: true,
    jsxSingleQuote: false,
    trailingComma: 'all',
    sortPackageJson: true,
    printWidth: 100,
    endOfLine: 'lf',
    sortImports: {
      order: 'asc',
      newlinesBetween: true,
      sortSideEffects: false,
      internalPattern: ['#/'],
      groups: [
        ['side_effect'],
        ['builtin'],
        ['external'],
        ['internal'],
        ['parent', 'sibling', 'index'],
        ['style'],
      ],
    },
  },
  lint: {
    plugins: ['typescript', 'react', 'react-perf', 'jsx-a11y'],
    env: { builtin: true, node: true, browser: true },
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
});
