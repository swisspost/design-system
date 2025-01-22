import { ESLintUtils } from '@typescript-eslint/utils';

export interface RuleDocs {
  category: 'template';
}

export const createRule = ESLintUtils.RuleCreator<RuleDocs>(
  ruleName =>
    `https://github.com/swisspost/design-system/blob/main/packages/eslint-plugin/docs/rules/${ruleName}.md`,
);
