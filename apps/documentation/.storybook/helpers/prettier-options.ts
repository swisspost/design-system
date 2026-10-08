import config from '@swisspost/design-system-prettier-config';
import { Options } from 'prettier';
import * as htmlParser from 'prettier/parser-html';

export const prettierOptions: Options = {
  ...config,
  parser: 'html',
  plugins: [htmlParser],
  singleQuote: false,
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'off',
};
