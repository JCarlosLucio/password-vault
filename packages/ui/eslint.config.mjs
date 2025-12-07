import reactConfig from '@repo/eslint-config-custom/react-js';
import { defineConfig } from 'eslint/config';

/** @type {import("eslint").Linter.Config} */
export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    name: 'ui-config',
    extends: [reactConfig],
  },
]);
