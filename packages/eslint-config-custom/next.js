import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';

import baseConfig from './index.js';

export default defineConfig([
  nextPlugin.flatConfig.recommended,
  {
    extends: [baseConfig],
    rules: {
      // next
      '@next/next/no-html-link-for-pages': 'error',
    },
  },
]);
