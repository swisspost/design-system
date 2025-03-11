import rule, { name } from '../../../../src/rules/html/migrations/no-rounded-borders';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: '<div class="rounded-4">My rounded element</div>',
    },
    {
      code: '<span class="rounded-top-4">My rounded element</span>',
    },
    {
      code: '<span class="rounded-bottom-4">My rounded element</span>',
    },
    {
      code: '<span class="rounded-start-4">My rounded element</span>',
    },
    {
      code: '<span class="rounded-end-4">My rounded element</span>',
    },
  ],
  invalid: [
    {
      code: '<p class="rounded">My rounded element</p>',
      output: '<p class="rounded-4">My rounded element</p>',
      errors: [{ messageId: 'rounded' }],
    },
    {
      code: '<h2 class="rounded-top">My rounded element</h2>',
      output: '<h2 class="rounded-top-4">My rounded element</h2>',
      errors: [{ messageId: 'rounded-top' }],
    },
    {
      code: '<div class="rounded-bottom">My rounded element</div>',
      output: '<div class="rounded-bottom-4">My rounded element</div>',
      errors: [{ messageId: 'rounded-bottom' }],
    },
    {
      code: '<span class="rounded-start">My rounded element</span>',
      output: '<span class="rounded-start-4">My rounded element</span>',
      errors: [{ messageId: 'rounded-start' }],
    },
    {
      code: '<button class="rounded-end">My rounded element</button>',
      output: '<button class="rounded-end-4">My rounded element</button>',
      errors: [{ messageId: 'rounded-end' }],
    },
  ],
});
