module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'prettier', 'prettier/vue', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/no-unused-components': 'warn',
    'vue/require-component-is': 'warn',
    'nuxt/no-cjs-in-config': 'off',
    'vue/require-component-is': 'warn',
  },
};
