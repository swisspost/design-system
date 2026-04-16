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
// correct even if the order of prefixes or size tokens changes.
const findMutation = (oldClass: string) => {
  const entry = Object.entries(data.mutations).find(([, [old]]) => old === oldClass);
  if (!entry) throw new Error(`No mutation found for "${oldClass}"`);
  return entry;
};

const [key_m_tiny, [old_m_tiny, new_m_tiny]] = findMutation('m-tiny-r');
const [, [old_mt_tiny, new_mt_tiny]] = findMutation('mt-tiny-r');
const [, [old_mb_tiny, new_mb_tiny]] = findMutation('mb-tiny-r');

htmlRuleTester.run(name, rule, {
  valid: validClasses.map(cls => ({ code: `<div class="${cls}">Content</div>` })),
  invalid: [
    ...invalidData,

    // Cheerio removes the deprecated class and appends the new ones at the end
    {
      code: `<div class="${old_m_tiny} container text-center">Content</div>`,
      output: `<div class="container text-center ${new_m_tiny.join(' ')}">Content</div>`,
      errors: [{ messageId: key_m_tiny }],
    },
    {
      code: `<div class="container ${old_m_tiny} text-center">Content</div>`,
      output: `<div class="container text-center ${new_m_tiny.join(' ')}">Content</div>`,
      errors: [{ messageId: key_m_tiny }],
    },
    {
      code: `<div class="container text-center ${old_m_tiny}">Content</div>`,
      output: `<div class="container text-center ${new_m_tiny.join(' ')}">Content</div>`,
      errors: [{ messageId: key_m_tiny }],
    },

    // Multiple deprecated classes on the same element — all fixed in one pass
    {
      code: `<div class="${old_m_tiny} ${old_mt_tiny} ${old_mb_tiny}">Content</div>`,
      output: `<div class="${[...new_m_tiny, ...new_mt_tiny, ...new_mb_tiny].join(' ')}">Content</div>`,
      errors: [{ messageId: key_m_tiny }],
    },

    // [ngClass] with string literal — can be auto-fixed inline
    {
      code: `<div [ngClass]="'${old_m_tiny}'">Content</div>`,
      output: `<div [ngClass]="'${new_m_tiny.join(' ')}'">Content</div>`,
      errors: [{ messageId: key_m_tiny }],
    },
    {
      code: `<div [ngClass]="'container ${old_m_tiny} text-center'">Content</div>`,
      output: `<div [ngClass]="'container ${new_m_tiny.join(' ')} text-center'">Content</div>`,
      errors: [{ messageId: key_m_tiny }],
    },

    // [class] with string literal — can be auto-fixed inline
    {
      code: `<div [class]="'${old_m_tiny}'">Content</div>`,
      output: `<div [class]="'${new_m_tiny.join(' ')}'">Content</div>`,
      errors: [{ messageId: key_m_tiny }],
    },

    // [class.old-name] — flagged without autofix because one attribute cannot
    // expand to multiple [class.x] attributes automatically
    {
      code: `<div [class.${old_m_tiny}]="expr">Content</div>`,
      errors: [{ messageId: key_m_tiny }],
    },
  ],
});