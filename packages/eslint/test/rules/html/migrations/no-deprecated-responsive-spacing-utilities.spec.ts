import rule, {
  name,
  data,
} from '../../../../src/rules/html/migrations/no-deprecated-responsive-spacing-utilities';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

const validClasses = ['mt-12 mt-md-16', 'pb-16 pb-md-24', 'gap-24 gap-md-48'];

const invalidData = Object.entries(data.mutations).map(([key, [oldClass, newClasses]]) => ({
  code: `<div class="${oldClass}">Content</div>`,
  output: `<div class="${newClasses.join(' ')}">Content</div>`,
  errors: [{ messageId: key }],
}));

// Look up test classes by name instead of magic indices so the test stays
// correct even if the order of prefixes or size tokens changes
const findMutation = (oldClass: string) => {
  const entry = Object.entries(data.mutations).find(([, [old]]) => old === oldClass);
  if (!entry) throw new Error(`No mutation found for "${oldClass}"`);
  return entry;
};

const [KEY_M_TINY, [OLD_M_TINY, NEW_M_TINY]] = findMutation('m-tiny-r');
const [, [OLD_MT_TINY, NEW_MT_TINY]] = findMutation('mt-tiny-r');
const [, [OLD_MB_TINY, NEW_MB_TINY]] = findMutation('mb-tiny-r');

htmlRuleTester.run(name, rule, {
  valid: validClasses.map(cls => ({ code: `<div class="${cls}">Content</div>` })),
  invalid: [
    ...invalidData,

    // Cheerio removes the deprecated class and appends the new ones at the end
    {
      code: `<div class="${OLD_M_TINY} container text-center">Content</div>`,
      output: `<div class="container text-center ${NEW_M_TINY.join(' ')}">Content</div>`,
      errors: [{ messageId: KEY_M_TINY }],
    },
    {
      code: `<div class="container ${OLD_M_TINY} text-center">Content</div>`,
      output: `<div class="container text-center ${NEW_M_TINY.join(' ')}">Content</div>`,
      errors: [{ messageId: KEY_M_TINY }],
    },
    {
      code: `<div class="container text-center ${OLD_M_TINY}">Content</div>`,
      output: `<div class="container text-center ${NEW_M_TINY.join(' ')}">Content</div>`,
      errors: [{ messageId: KEY_M_TINY }],
    },

    // Multiple deprecated classes on the same element — all fixed in one pass
    {
      code: `<div class="${OLD_M_TINY} ${OLD_MT_TINY} ${OLD_MB_TINY}">Content</div>`,
      output: `<div class="${[...NEW_M_TINY, ...NEW_MT_TINY, ...NEW_MB_TINY].join(' ')}">Content</div>`,
      errors: [{ messageId: KEY_M_TINY }],
    },

    // [ngClass] with string literal — can be auto-fixed inline
    {
      code: `<div [ngClass]="'${OLD_M_TINY}'">Content</div>`,
      output: `<div [ngClass]="'${NEW_M_TINY.join(' ')}'">Content</div>`,
      errors: [{ messageId: KEY_M_TINY }],
    },
    {
      code: `<div [ngClass]="'container ${OLD_M_TINY} text-center'">Content</div>`,
      output: `<div [ngClass]="'container ${NEW_M_TINY.join(' ')} text-center'">Content</div>`,
      errors: [{ messageId: KEY_M_TINY }],
    },

    // [class] with string literal — can be auto-fixed inline
    {
      code: `<div [class]="'${OLD_M_TINY}'">Content</div>`,
      output: `<div [class]="'${NEW_M_TINY.join(' ')}'">Content</div>`,
      errors: [{ messageId: KEY_M_TINY }],
    },

    // [class.old-name] — flagged without autofix because one attribute cannot
    // expand to multiple [class.x] attributes automatically
    {
      code: `<div [class.${OLD_M_TINY}]="expr">Content</div>`,
      errors: [{ messageId: KEY_M_TINY }],
    },
  ],
});