import rule, { name } from '../../../../src/rules/html/migrations/no-form-text';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: '<p class="form-hint">This is a hint.</p>',
    },
    {
      code: '<div class="form-hint">This is a hint.</div>',
    },
  ],
  invalid: [
    {
      code: '<p class="form-text">This is a hint.</p>',
      output: '<p class="form-hint">This is a hint.</p>',
      errors: [{ messageId: 'stopUsingFormText' }],
    },
    {
      code: '<div class="form-text">This is a hint.</div>',
      output: '<div class="form-hint">This is a hint.</div>',
      errors: [{ messageId: 'stopUsingFormText' }],
    },
  ],
});
