module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  plugins: [
    'import',
    'react',
  ],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    camelcase: 0,
    'max-len': 0,
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
    'object-curly-newline': 0,
    'arrow-body-style': 0,
    'no-multiple-empty-lines': ['error', {
      max: 1,
      maxEOF: 0,
      maxBOF: 0,
    }],
    eqeqeq: ['error', 'always', {
      null: 'never',
    }],
    'import/no-unresolved': [2, {
      commonjs: true,
    }],
    'react/no-array-index-key': 1,
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx'],
    }],
    'react/jsx-one-expression-per-line': 0,
    'import/order': ['error', {
      'newlines-between': 'always-and-inside-groups',
    }],
  },
}