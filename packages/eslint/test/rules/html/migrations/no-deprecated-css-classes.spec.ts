import rule, {
  name,
  classesMap,
} from '../../../../src/rules/html/migrations/no-deprecated-css-classes';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: '<div class="valid-class">Click me</div>',
    },
    {
      code: '<div>Click me</div>',
    },
  ],
  invalid: [
    ...classesMap.map(classMap => ({
      code: `<div class="${classMap.old}"></div>`,
      output: `<div class="${classMap.new}"></div>`,
      errors: [{ messageId: classMap.old }],
    })),
  ],
});
