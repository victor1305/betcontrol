import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/']
  },
  {
    rules: {
      semi: ['error', 'always'],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always'
        }
      ],
      'no-console': [
        'error',
        {
          allow: ['warn', 'error']
        }
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'max-lines': [
        'error',
        {
          max: 175,
          skipBlankLines: true
        }
      ]
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
          ],
          extensions: ['.ts', '.js', '.svelte'],
        },
      },
    },
  },
  prettier,
  {
    rules: {
      semi: ['error', 'always']
    }
  },
  ...svelte.configs['flat/prettier']
);
