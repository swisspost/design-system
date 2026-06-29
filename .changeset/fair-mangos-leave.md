---
'@swisspost/design-system-styles': patch
---

Fixed icon loading by replacing CDN-based icon URLs with `CSS custom properties` and dynamic CSS file loading. Components using the `@mixin post-icon` now reliably display icons without external dependencies.
