---
'@swisspost/design-system-components': patch
---

Fixed the used `headingLevel` in the `post-accorddion-item` component. The component now uses the value from its closest `post-accorddion` parent component, if this is specified and falls back to `h2` if not specified.
