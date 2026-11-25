---
'@swisspost/design-system-components': minor
'@swisspost/design-system-documentation': patch
---

Added a `findable` attribute to collapsibles and accordions for links and browser search to find hidden content. Collapsed content is now properly hidden.
Nested findable collapsibles reveal their findable ancestors across shadow boundaries.
Collapsed findable content is rendered with `hidden="until-found"` during server-side rendering.
Findable accordions render their collapsed items with `hidden="until-found"` during server-side rendering.
