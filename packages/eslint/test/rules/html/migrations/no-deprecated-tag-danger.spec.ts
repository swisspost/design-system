import rule, { name } from '../../../../src/rules/html/migrations/no-deprecated-tag-danger';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: '<div class="tag tag-error">Tag content</div>',
    },
  ],
  invalid: [
    {
      code: '<div class="tag tag-danger">Tag content</div>',
      output: '<div class="tag tag-error">Tag content</div>',
      errors: [{ messageId: 'tag-danger' }],
    },
  ],
});
