import { TSESTree } from '@typescript-eslint/utils';
import { Cheerio } from 'cheerio';
import { type AnyNode } from 'domhandler';

export interface TemplateNode extends Record<string, unknown> {
  type: string;
  name?: string;
  children?: TemplateNode[];
  toCheerio: () => Cheerio<AnyNode>;
  loc: TSESTree.SourceLocation;
  range: TSESTree.Range;
}
