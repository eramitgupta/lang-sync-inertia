import js from '@eslint/js'
import typescriptEslint from 'typescript-eslint'

export default [
  {
    ignores: ['dist', 'node_modules']
  },
  js.configs.recommended,
  ...typescriptEslint.configs.recommended
]
