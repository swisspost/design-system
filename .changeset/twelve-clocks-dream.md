---
'@swisspost/design-system-styles': major
---

Changed the `fonts.scss` import location from `src/elements/body.scss` to `src/components/_index.scss`.

This way, we can keep it in the bundled output files, but also allow projects who want to import only specific SASS/CSS files, to self-host their fonts and implement their own `@font-face` definitions.

Since the usage of the `body.{scss|css}` file is mandatory, this was not possible before.
