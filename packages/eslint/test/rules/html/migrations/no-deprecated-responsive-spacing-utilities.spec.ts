import rule, { name, data } from '../../../../src/rules/html/migrations/no-deprecated-responsive-spacing-utilities';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

const validClasses = ['mt-12 mt-md-16', 'pb-16 pb-md-24', 'gap-24 gap-md-48'];

// Generate all invalid test cases from the exported mutations data
const invalidData = Object.entries(data.mutations).map(([key, [oldClass, newClasses]]) => ({
  code: `<div class="${oldClass}">Content</div>`,
  output: `<div class="${newClasses.join(' ')}">Content</div>`,
  errors: [{ messageId: key }],
}));

htmlRuleTester.run(name, rule, {
  valid: validClasses.map(cls => ({ code: `<div class="${cls}">Content</div>` })),
  invalid: invalidData,
});