---
'@swisspost/design-system-components': patch
'@swisspost/design-system-documentation': patch
---

Enabled slotting the link in the `post-breadcrumb-item` component and the home item of `post-breadcrumbs`, so consumers can slot their own routing-aware `<a>` element (e.g. a Next.js `Link`) instead of relying on the `url`/`home-url` props, keeping client-side navigation working instead of triggering a full page reload.
