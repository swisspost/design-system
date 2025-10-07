import rule, {
  name,
  messageId,
} from '../../../../src/rules/html/migrations/no-deprecated-chip-filter';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: '<div class="chip chip-selectable">Chip content</div>',
    },
  ],
  invalid: [
    {
      code: '<div class="chip chip-filter">Chip content</div>',
      output: '<div class="chip chip-selectable">Chip content</div>',
      errors: [{ messageId }],
    },
  ],
});
