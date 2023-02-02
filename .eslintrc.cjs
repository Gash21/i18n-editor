module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:sonarjs/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  ignorePatterns: ['node_modules/*'],
  plugins: [
    '@typescript-eslint',
    'react',
    'eslint-comments',
    'jest',
    'promise',
    'import',
    'react-hooks',
    'sonarjs'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-use-before-define': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'max-len': [
      1,
      {
        code: 180,
        ignoreStrings: true
      }
    ],
    'max-lines': [
      1,
      {
        max: 200,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    'operator-linebreak': [
      1,
      'before',
      {
        overrides: {
          '=': 'after'
        }
      }
    ],
    'quote-props': [
      'error',
      'as-needed',
      {
        unnecessary: true,
        numbers: false
      }
    ],
    quotes: [
      'error',
      'double',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': [0, 'never'],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['.svg']
      }
    ],
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: {
          single: 2,
          multi: 1
        }
      }
    ],
    'react/jsx-first-prop-new-line': 1,
    'react/jsx-sort-props': [
      1,
      {
        ignoreCase: true
      }
    ],
    'react/jsx-indent-props': [1, 2],
    'react/jsx-closing-bracket-location': [
      1,
      {
        nonEmpty: 'line-aligned',
        selfClosing: 'line-aligned'
      }
    ],
    'react/jsx-key': 2
  },
  settings: {
    react: {
      version: 'detect' // React version. "detect" automatically picks the version you have installed.
    },
    jest: {
      version: 28
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      alias: {
        map: [
          ['@assets', './src/assets'],
          ['@context', './src/context'],
          ['@hooks', './src/hooks'],
          ['@elements', './src/components/elements'],
          ['@groups', './src/components/groups'],
          ['@modules', './src/components/modules'],
          ['@templates', './src/components/templates'],
          ['@components', './src/components'],
          ['@pages', './src/pages'],
          ['@routes', './src/routes'],
          ['@styles', './src/styles'],
          ['@services', './src/services'],
          ['@types', './src/types'],
          ['@utils', './src/utils'],
          ['^@(.*)$', './src']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg']
      }
    }
  }
}
