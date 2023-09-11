import { Options } from 'prettier';
import * as htmlParser from 'prettier/parser-html';

export const prettierOptions: Options = {
  parser: 'html',
  plugins: [htmlParser],
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: 'consistent',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'off',
  singleAttributePerLine: false,
};
