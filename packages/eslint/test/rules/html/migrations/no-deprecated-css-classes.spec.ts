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
  invalid: classesMap.flatMap(classMap => [
    // Only the deprecated class
    {
      code: `<div class="${classMap.old}"></div>`,
      output: `<div></div>`,
      errors: [{ messageId: classMap.old }],
    },
    // Deprecated class with other classes
    {
      code: `<div class="${classMap.old} extra-class"></div>`,
      output: `<div class="extra-class"></div>`,
      errors: [{ messageId: classMap.old }],
    },
    // Deprecated class in middle of other classes
    {
      code: `<div class="foo ${classMap.old} bar"></div>`,
      output: `<div class="foo bar"></div>`,
      errors: [{ messageId: classMap.old }],
    },
  ]),
});
