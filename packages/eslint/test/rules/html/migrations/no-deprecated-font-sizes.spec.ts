import rule, {
  name,
  classesMap,
} from '../../../../src/rules/html/migrations/no-deprecated-font-sizes';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: '<post-icon name="save" class="w-24 h-24"></post-icon>',
    },
    {
      code: '<p class="fs-6">Text content</p>',
    },
  ],
  invalid: [
    ...classesMap.map(classMap => ({
      code: `<post-icon name="save" class="${classMap.old}"></post-icon>`,
      output: `<post-icon name="save" class="${classMap.size}"></post-icon>`,
      errors: [{ messageId: classMap.old }],
    })),
    ...classesMap.map(classMap => ({
      code: `<p class="${classMap.old}">Text content</p>`,
      output: `<p class="${classMap.font}">Text content</p>`,
      errors: [{ messageId: classMap.old }],
    })),
  ],
});
