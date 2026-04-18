import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default defineConfig(
  globalIgnores(
    ['build/**', 'package/**', '.svelte-kit/**', 'node_modules/**'],
    'techguide/ignores',
  ),
  {
    name: 'techguide/linter-options',
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    name: 'techguide/globals',
    files: ['**/*.{js,mjs,cjs,ts,svelte}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs.recommended,
  {
    name: 'techguide/typed-files',
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    name: 'techguide/svelte-files',
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: tseslint.parser,
        svelteConfig,
      },
    },
  },
  {
    name: 'techguide/javascript-overrides',
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  ...svelte.configs.prettier,
  eslintConfigPrettier,
);
