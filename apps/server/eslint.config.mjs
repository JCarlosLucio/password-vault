import baseConfig from '@repo/eslint-config-custom/index-js';
import { defineConfig } from 'eslint/config';

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    name: 'server-config',
    extends: [baseConfig],
  },
]);
