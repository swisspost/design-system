import type { HtmlNode } from '../parsers/html/html-node';
import { TSESLint } from '@typescript-eslint/utils';

export function removeEmptyAttrs(
  serialized: string,
  context: TSESLint.RuleContext<string, []>,
  node: HtmlNode,
): string {
  const originalNodeText = context.sourceCode.getText().slice(node.range[0], node.range[1]);

  // Find all attrs that already had ="" in the original code
  const originallyEmpty = new Set(
    [...originalNodeText.matchAll(/\b([\w:[\].-]+)=""/g)].map(m => m[1]),
  );

  return serialized.replaceAll(/\b([\w:[\].-]+)=""/g, (match, attr) =>
    originallyEmpty.has(attr) ? match : attr,
  );
}
