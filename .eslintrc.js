module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': 'off',
    'func-names': 'off'
  }
}
