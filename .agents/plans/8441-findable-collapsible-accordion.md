# Findable collapsibles and accordions

Implement [#8441](https://github.com/swisspost/design-system/issues/8441) as an additive, non-breaking update.

## Approved scope

- Add `findable`, default `false`, to collapsible and accordion
- Use no `no-deeplink` property
- Enable browser search and hash-link revelation only for findable content
- Keep unsupported browsers collapsed and manually toggleable, with a JavaScript hash fallback
- Reveal browser matches immediately with the existing `postToggle` event and synchronized ARIA
- Explicitly hide ordinary hidden content with `display: none`, excluding until-found content

## Implementation

1. Add a shadow content wrapper so ordinary hidden content cannot be exposed by consumer display styles
2. Preserve existing host animations and make hiding safe during reversal, revelation, and disconnection
3. Forward findable through accordion items and preserve nested configuration and single-open behavior
4. Keep accordion panel IDs stable and update triggers within the correct document or shadow root
5. Extend Cypress fixtures and tests, Storybook examples, generated APIs, and the changeset

## Verification

- Build components and regenerate the internet header's bundled components before Storybook checks
- Run affected component typechecks, ESLint, Stylelint, and Prettier
- Run the complete collapsible, accordion, and closebutton Cypress specs without retries
- Check Chromium, Firefox, and WebKit revelation, hiding, ARIA, keyboard behavior, reduced motion, and narrow/wide viewports
- Smoke-test server-side rendering
- Report unrelated documentation typecheck failures without changing them
- Leave the pre-existing lockfile modification untouched
