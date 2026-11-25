---
'@swisspost/design-system-components': minor
'@swisspost/design-system-documentation': patch
---

Added a `findable` attribute to collapsibles and accordions for links and browser search to find hidden content. Collapsed content is now properly hidden.
Nested findable collapsibles reveal their findable ancestors across shadow boundaries.
Collapsed findable content is rendered with `hidden="until-found"` during server-side rendering.
Findable accordions render their collapsed items with `hidden="until-found"` during server-side rendering.
Findable content linked by the initial URL fragment now stays open when components mount or hydrate after the browser resolved the fragment, for example in React and Next.js.
Collapsibles skip trigger updates during server rendering and while detached, preventing root lookup errors during React hydration.
