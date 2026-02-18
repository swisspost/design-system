import rule, { name } from '../../../../src/rules/html/migrations/no-deprecated-font-weight';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: '<p class="fw-bold">My text</p>',
    },
    {
      code: '<p class="fw-regular">My text</p>',
    },
  ],
  invalid: [
    {
      code: '<p class="bold">My text</p>',
      output: '<p class="fw-bold">My text</p>',
      errors: [{ messageId: 'bold' }],
    },
    {
      code: '<p class="regular">My text</p>',
      output: '<p class="fw-regular">My text</p>',
      errors: [{ messageId: 'regular' }],
    },
  ],
});
