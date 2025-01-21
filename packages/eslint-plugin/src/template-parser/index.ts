import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import { parseForESLint } from './parser';

export = {
  meta: {
    name: '@swisspost-eslint/template-parser',
  },
  parseForESLint,
} satisfies FlatConfig.Parser;
