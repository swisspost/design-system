---
'@swisspost/design-system-components': patch
'@swisspost/design-system-documentation': patch
---

Added support for client-side routing frameworks (e.g. Next.js, Angular Router) in `post-breadcrumbs`: slot a routing-aware `<a>` into `post-breadcrumb-item` and the `home` slot instead of using the `url`/`home-url` props, so navigation no longer triggers a full page reload.