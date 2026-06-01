import { TSESLint } from '@typescript-eslint/utils';
import { RuleDocs } from '../../src/utils/create-rule';
import { htmlRuleTester } from './html-rule-tester';

export function generatedDataTester(
  name: string,
  rule: TSESLint.RuleModule<string, [], RuleDocs>,
  data: Record<string, [string, string, boolean?]>,
  validClasses: Array<string>,
) {
  // Generate all of the invalid use cases.
  // For manual-only entries (tuple[2] === true) ESLint provides no autofix so we
  // must not set `output` — the test runner expects the source to be unchanged.
  const invalidData = Object.entries(data).map(([key, [oldClass, newClass, manualOnly]]) =>
    manualOnly
      ? {
          code: `<div class="${oldClass}">Content</div>`,
          errors: [{ messageId: key }],
        }
      : {
          code: `<div class="${oldClass}">Content</div>`,
          output: `<div class="${newClass}">Content</div>`,
          errors: [{ messageId: key }],
        },
  );

  const validData = validClasses.map(cls => ({ code: `<div class="${cls}">Content</div>` }));

  htmlRuleTester.run(name, rule, {
    valid: validData,
    invalid: invalidData,
  });
}