import rule, { name, data } from '../../../../src/rules/html/migrations/no-deprecated-responsive-spacing-utilities';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

const validClasses = ['mt-12 mt-md-16', 'pb-16 pb-md-24', 'gap-24 gap-md-48'];

const invalidData = Object.entries(data.mutations).map(([key, [oldClass, newClasses]]) => ({
  code: `<div class="${oldClass}">Content</div>`,
  output: `<div class="${newClasses.join(' ')}">Content</div>`,
  errors: [{ messageId: key }],
}));

const [key0, [old0, new0]] = Object.entries(data.mutations)[0];   // m-tiny-r
const [, [old1, new1]] = Object.entries(data.mutations)[8];       // mt-tiny-r
const [, [old2, new2]] = Object.entries(data.mutations)[16];      // mb-tiny-r

htmlRuleTester.run(name, rule, {
  valid: validClasses.map(cls => ({ code: `<div class="${cls}">Content</div>` })),
  invalid: [
    ...invalidData,

    // Cheerio removes the deprecated class and appends the new ones at the end
    {
      code: `<div class="${old0} container text-center">Content</div>`,
      output: `<div class="container text-center ${new0.join(' ')}">Content</div>`,
      errors: [{ messageId: key0 }],
    },
    {
      code: `<div class="container ${old0} text-center">Content</div>`,
      output: `<div class="container text-center ${new0.join(' ')}">Content</div>`,
      errors: [{ messageId: key0 }],
    },
    {
      code: `<div class="container text-center ${old0}">Content</div>`,
      output: `<div class="container text-center ${new0.join(' ')}">Content</div>`,
      errors: [{ messageId: key0 }],
    },

    // Multiple deprecated classes on the same element — all fixed in one pass
    {
      code: `<div class="${old0} ${old1} ${old2}">Content</div>`,
      output: `<div class="${[...new0, ...new1, ...new2].join(' ')}">Content</div>`,
      errors: [{ messageId: key0 }],
    },
  ],
});