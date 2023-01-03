---
'@swisspost/design-system-styles': patch
---

Unwrapped complex :is selector. When integrating in another project, the `not-disabled-focus-hover` mixin causes sass to silently fail and generate an empty output.
