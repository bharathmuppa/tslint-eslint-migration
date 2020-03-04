module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'header'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  rules: {
    'header/header': [
      2,
      'line',
      [
        {
          pattern: 'License: \\(C\\) Entangled Cognition. ((20[0-9]{2}-?)?)((20[0-9]{2}))'
        }
      ]
    ]
  },
  overrides: []
};
