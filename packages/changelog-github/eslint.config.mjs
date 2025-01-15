import js from '@eslint/js';
import ts from 'typescript-eslint';

export default ts.config(
  {
    ignores: ['dist/*'],
  },
  js.configs.recommended,
  ts.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [ts.configs.disableTypeChecked],
  },
);
