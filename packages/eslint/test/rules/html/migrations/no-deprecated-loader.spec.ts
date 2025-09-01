import rule, { name } from '../../../../src/rules/html/migrations/no-deprecated-loader';
import { htmlRuleTester } from '../../../utils/html-rule-tester';

htmlRuleTester.run(name, rule, {
  valid: [
    {
      code: `
        <div role="status" aria-live="polite" class="loader">
          <span class="visually-hidden">Loading…</span>
        </div>
      `,
    },
    {
      code: `
        <div role="status" aria-live="polite" class="loader loader-16">
          <span class="visually-hidden">Loading…</span>
        </div>
      `,
    },
  ],
  invalid: [
    {
      code: `
        <div role="status" aria-live="polite" class="loader loader-xs">
          <span class="visually-hidden">Loading…</span>
        </div>
      `,
      output: `
        <div role="status" aria-live="polite" class="loader loader-16">
          <span class="visually-hidden">Loading…</span>
        </div>
      `,
      errors: [{ messageId: 'deprecatedLoaderXS' }],
    },
    {
      code: `
        <div role="status" aria-live="polite" class="loader loader-sm">
          <span class="visually-hidden">Loading…</span>
        </div>
      `,
      output: `
        <div role="status" aria-live="polite" class="loader loader-40">
          <span class="visually-hidden">Loading…</span>
        </div>
      `,
      errors: [{ messageId: 'deprecatedLoaderSM' }],
    },
  ],
});
