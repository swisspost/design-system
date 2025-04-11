---
'@swisspost/design-system-components': patch
---

Updated `post-header` by moving `handleScrollEvent` from `connectedCallback` to `componentWillRender`. Added fallback value to the `--post-header-scroll-top` property within the `--logo-height` calculation.
