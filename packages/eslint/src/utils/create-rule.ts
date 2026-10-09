import { ESLintUtils } from '@typescript-eslint/utils';

export interface RuleDocs {
  dir: 'html' | 'html/migrations' | 'ts' | 'ts/migrations';
  recommended?: boolean;
}

const getDocsUrl = (ruleName: string, ruleDirectory: RuleDocs['dir']) =>
  `https://github.com/swisspost/design-system/blob/main/packages/eslint/docs/rules/${ruleDirectory}/${ruleName}.md`;

export const createRule: ReturnType<typeof ESLintUtils.RuleCreator<RuleDocs>> = rule =>
  ESLintUtils.RuleCreator<RuleDocs>(ruleName => getDocsUrl(ruleName, rule.meta.docs.dir))(rule);
