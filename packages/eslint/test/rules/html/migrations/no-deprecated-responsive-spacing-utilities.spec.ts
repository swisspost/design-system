import rule, { name, data } from '../../../../src/rules/html/migrations/no-deprecated-responsive-spacing-utilities';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

const validClasses = ['mt-12 mt-md-16', 'pb-16 pb-md-24', 'gap-24 gap-md-48'];

// Generate all invalid test cases from the exported mutations data
const invalidData = Object.entries(data.mutations).map(([key, [oldClass, newClasses]]) => ({
  code: `<div class="${oldClass}">Content</div>`,
  output: `<div class="${newClasses.join(' ')}">Content</div>`,
  errors: [{ messageId: key }],
}));

// Pick three known mappings for the combination/multi-class tests
const [key0, [old0, new0]] = Object.entries(data.mutations)[0];  // m-tiny-r
const [key1, [old1, new1]] = Object.entries(data.mutations)[8];  // mt-tiny-r
const [, [old2, new2]] = Object.entries(data.mutations)[16];     // mb-tiny-r

// Helper: simulate what Cheerio does — removes the old class from its position
// and appends the new classes at the end of the class list.
function cheerioOutput(classes: string[], oldClass: string, newClasses: string[]): string {
  const without = classes.filter(c => c !== oldClass);
  return [...without, ...newClasses].join(' ');
}

htmlRuleTester.run(name, rule, {
  valid: validClasses.map(cls => ({ code: `<div class="${cls}">Content</div>` })),
  invalid: [
    ...invalidData,

    // Deprecated class at the start, surrounded by unrelated classes
    {
      code: `<div class="${old0} container text-center">Content</div>`,
      output: `<div class="${cheerioOutput([old0, 'container', 'text-center'], old0, new0)}">Content</div>`,
      errors: [{ messageId: key0 }],
    },

    // Deprecated class in the middle
    {
      code: `<div class="container ${old0} text-center">Content</div>`,
      output: `<div class="${cheerioOutput(['container', old0, 'text-center'], old0, new0)}">Content</div>`,
      errors: [{ messageId: key0 }],
    },

    // Deprecated class at the end
    {
      code: `<div class="container text-center ${old0}">Content</div>`,
      output: `<div class="${cheerioOutput(['container', 'text-center', old0], old0, new0)}">Content</div>`,
      errors: [{ messageId: key0 }],
    },

    // Multiple deprecated classes on the same element — all fixed in one pass.
    // Cheerio removes all old classes first, then appends all new classes in order.
    {
      code: `<div class="${old0} ${old1} ${old2}">Content</div>`,
      output: `<div class="${[...new0, ...new1, ...new2].join(' ')}">Content</div>`,
      errors: [{ messageId: key0 }],
    },
  ],
});
