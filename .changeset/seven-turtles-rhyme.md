---
'@swisspost/design-system-styles': major
'@swisspost/design-system-components': minor
'@swisspost/design-system-documentation': patch
---

Moved global light-DOM styles for `post-header`, `post-footer`, and `post-tabs` from the styles package into the components package global styles bundle. The following import paths no longer exist and must be removed from your project:

- `@swisspost/design-system-styles/components/header/index`
- `@swisspost/design-system-styles/components/footer/index`
- `@swisspost/design-system-styles/components/tabs/index`

These styles are now compiled into `@swisspost/design-system-components/post-components`and are automatically available as part of the components CSS bundle.
