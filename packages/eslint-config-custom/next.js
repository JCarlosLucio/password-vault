import nextFlatConfig from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';

import baseConfig from './index.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default defineConfig([
  nextFlatConfig.configs.recommended,
  {
    extends: [baseConfig],
    rules: {
      // next
      '@next/next/no-html-link-for-pages': 'error',
    },
  },
]);
