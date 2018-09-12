module.exports = {
  root: true,{{#typescript}}
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
  extends: [
    'plugin:vue/essential',
    'eslint-config-standard-with-typescript'
  ],{{else}}
  parserOptions: {
    parser: 'babel-eslint'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ['plugin:vue/essential', 'standard'],{{/typescript}}
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  'globals': {
    'vue': true
  },
  env: {
    browser: true,
    mocha: true,
    shelljs: true
  },
  // add your custom rules here
  'rules': {
    "semi": 0,
    "eol-last": 0,
    'no-proto': 0,
    "camelcase": 0,
    "space-before-function-paren": 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': 'off',
    'vue/script-indent': ['error', 2, {'baseIndent': 1}]
  }
};

