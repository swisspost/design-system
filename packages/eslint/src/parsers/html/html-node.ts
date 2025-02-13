import type { TSESTree } from '@typescript-eslint/utils';
import { Cheerio } from 'cheerio';
import { type AnyNode } from 'domhandler';

export interface HtmlNode extends Record<string, unknown> {
  type: string;
  name?: string;
  children?: HtmlNode[];
  toCheerio: () => Cheerio<AnyNode>;
  loc: TSESTree.SourceLocation;
  range: TSESTree.Range;
}
