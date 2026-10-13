---
'@swisspost/design-system-styles': patch
'@swisspost/design-system-components': patch
---

Reduced the size of the compiled CSS by outputting the colour scheme fallback variables only once. Also fixed the status tags, notification variants, selection card, and `post-popover` close button showing incorrect colours in browsers without `light-dark()` support.