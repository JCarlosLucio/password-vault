import reactPlugin from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

import baseConfig from './index.js';

export default defineConfig([
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    extends: [baseConfig],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // react
      'react/button-has-type': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
        },
      ],
    },
  },
]);
