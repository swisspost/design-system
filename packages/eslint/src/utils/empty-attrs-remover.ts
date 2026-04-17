import type { HtmlNode } from '../parsers/html/html-node';
import { TSESLint } from '@typescript-eslint/utils';

export function removeEmptyAttrs(
  serialized: string,
  context: TSESLint.RuleContext<string, []>,
  node: HtmlNode,
): string {
  const originalNodeText = context.sourceCode.getText().slice(node.range[0], node.range[1]);

  if (originalNodeText.includes('=""')) return serialized;

  return serialized.replaceAll('=""', '');
}
