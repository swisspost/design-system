---
'@swisspost/design-system-components': patch
'@swisspost/design-system-styles': patch
---

Removed the custom properties from the `post-header` component styles and moved them to the styles package. This change allows these properties to be accessed before the component is loaded.
