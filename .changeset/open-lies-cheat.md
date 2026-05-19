---
'@swisspost/design-system-components-react': patch
'@swisspost/design-system-components': patch
---

Removed the usage of StencilJS [build conditionals](https://stenciljs.com/docs/guides/build-conditionals) in utility modules and
updated the generated react icon components imports, to avoid unwanted side-effects in Next.js projects.
