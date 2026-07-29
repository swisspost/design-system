---
'@swisspost/design-system-components': patch
---

Fixed a server-side rendering crash (`HTMLInputElement is not defined`) that occurred when importing the components (for example through the `@swisspost/design-system-components-react` barrels) in a Node/SSR environment such as Next.js pre-rendering. The `post-date-picker` mask helper now resolves the native `HTMLInputElement` value descriptor lazily (only on runtime) instead of at module evaluation time.
