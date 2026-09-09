---
'@swisspost/design-system-components': minor
'@swisspost/design-system-documentation': patch
---

Enabled client-side routing in the `post-breadcrumbs` component by allowing a routing-aware `<a>` (e.g. a Next.js `Link`) to be slotted into `post-breadcrumb-item` and the home item, instead of relying on the `url`/`home-url` props, so navigation no longer triggers a full page reload.