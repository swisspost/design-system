---
'@swisspost/design-system-components': minor
'@swisspost/design-system-documentation': minor
---

Enabled client-side routing in the `post-logo` and `post-language-menu-item` components by allowing a routing-aware <a> (e.g. a Next.js Link) to be slotted inside, instead of relying on the url props, so navigation no longer triggers a full page reload.
