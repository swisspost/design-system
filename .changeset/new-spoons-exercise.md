---
'@swisspost/design-system-components': patch
---

Updated `post-header` by moving handleScrollEvent, handleScrollParentResize and lockBody methods from connectedCallback to componentDidRender. Added fallback value to the `--post-header-scroll-top` property within the `--logo-height` calculation.
