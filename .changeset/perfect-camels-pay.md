---
'@swisspost/design-system-components': patch
---

Enhanced the `panel` property of the `post-tab-header` component and the `name` property of the `post-tab-panel` component, to ensure they stay synchronized in the DOM whenever they change, enabling compatibility with `querySelector` and similar methods.
