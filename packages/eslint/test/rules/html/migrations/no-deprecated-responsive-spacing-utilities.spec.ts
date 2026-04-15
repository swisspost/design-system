import rule, { name, data } from '../../../../src/rules/html/migrations/no-deprecated-responsive-spacing-utilities';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

const validClasses = ['mt-12 mt-md-16', 'pb-16 pb-md-24', 'gap-24 gap-md-48'];

// The data structure now has mutations as a property
const mutations = data.mutations;

// Generate all invalid test cases from the exported mutations data
const invalidData = Object.entries(mutations).map(([messageId, [oldClass, newClasses]]) => ({
  code: `<div class="${oldClass}">Content</div>`,
  output: `<div class="${newClasses.join(' ')}">Content</div>`,
  errors: [{ messageId }],
}));

// Pick three known mappings for the multi-class test
const [msgId0, [old0, new0]] = Object.entries(mutations)[0]; // m-tiny-r
const [_msgId1, [old1, new1]] = Object.entries(mutations)[8]; // mt-tiny-r
const [_msgId2, [old2, new2]] = Object.entries(mutations)[16]; // mb-tiny-r

htmlRuleTester.run(name, rule, {
  valid: validClasses.map((cls) => ({ code: `<div class="${cls}">Content</div>` })),
  invalid: [
    ...invalidData,

    // Deprecated class at the start, surrounded by unrelated classes
    // Note: Cheerio relocates the new classes to the end
    {
      code: `<div class="${old0} container text-center">Content</div>`,
      output: `<div class="container text-center ${new0.join(' ')}">Content</div>`,
      errors: [{ messageId: msgId0 }],
    },

    // Deprecated class in the middle
    // Note: Cheerio relocates the new classes to the end
    {
      code: `<div class="container ${old0} text-center">Content</div>`,
      output: `<div class="container text-center ${new0.join(' ')}">Content</div>`,
      errors: [{ messageId: msgId0 }],
    },

    // Deprecated class at the end
    {
      code: `<div class="container text-center ${old0}">Content</div>`,
      output: `<div class="container text-center ${new0.join(' ')}">Content</div>`,
      errors: [{ messageId: msgId0 }],
    },

    // Multiple deprecated classes on the same element
    {
      code: `<div class="${old0} ${old1} ${old2}">Content</div>`,
      output: `<div class="${new0.join(' ')} ${new1.join(' ')} ${new2.join(' ')}">Content</div>`,
      errors: [{ messageId: msgId0 }], // Only first match reported due to ESLint single-report constraint
    },
  ],
});

