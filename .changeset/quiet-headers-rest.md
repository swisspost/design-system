---
'@swisspost/design-system-components': patch
'@swisspost/design-system-styles': patch
---

Improved the scroll performance of the `post-header`. The internal `--post-header-scroll-top` custom property now stops updating once the header is fully reduced, so it no longer reflects the page scroll position.
