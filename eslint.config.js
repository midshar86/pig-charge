import vue from 'eslint-plugin-vue'
// import ts from '@typescript-eslint/eslint-plugin'
// import tsParser from '@typescript-eslint/parser'
// import prettier from 'eslint-plugin-prettier'
// import prettierConfig from 'eslint-config-prettier'

export default [
  ...vue.configs['flat/recommended'],
  // 忽略特定文件（通过 overrides 替代旧版 .eslintignore）
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/*.d.ts']
  }
]
