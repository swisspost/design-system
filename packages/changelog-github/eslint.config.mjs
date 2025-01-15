import js from '@eslint/js';
import ts from 'typescript-eslint';

export default ts.config({
  files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
  ignores: ['dist/*'],
  extends: [js.configs.recommended, ts.configs.recommended],
});
