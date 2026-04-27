---
'@swisspost/design-system-components': patch
---

Added a guard, to prevent the use of `ResizeObserver` in the `Breakpoint` utility class during SSR.
