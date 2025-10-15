import rule, { name } from '../../../../src/rules/html/migrations/no-deprecated-alert';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: '<post-banner><p>Content</p></post-banner>',
    },
  ],
  invalid: [
    {
      code: '<post-alert><p>Content</p></post-alert>',
      output: '<post-banner><p>Content</p></post-banner>',
      errors: [{ messageId: 'deprecatedAlert' }],
    },
    {
      code: '<post-alert type="success"><p>Content</p></post-alert>',
      output: '<post-banner type="success"><p>Content</p></post-banner>',
      errors: [{ messageId: 'deprecatedAlert' }],
    },
  ],
});
