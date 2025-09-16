import { RuleListener, RuleModule } from '@typescript-eslint/utils/ts-eslint';
import { RuleDocs } from '../../src/utils/create-rule';
import { htmlRuleTester } from './html-rule-tester';

export function generatedDataTester(
  name: string,
  rule: RuleModule<string, [], RuleDocs, RuleListener>,
  data: Record<string, [string, string]>,
  validClasses: Array<string>,
) {
  // Generate all of the invalid use cases
  const invalidData = Object.entries(data).map(([key, [oldClass, newClass]]) => ({
    code: `<div class="${oldClass}">Content</div>`,
    output: `<div class="${newClass}">Content</div>`,
    errors: [{ messageId: key }],
  }));

  const validData = validClasses.map(cls => ({ code: `<div class="${cls}">Content</div>` }));

  htmlRuleTester.run(name, rule, {
    valid: validData,
    invalid: invalidData,
  });
}
