---
'@swisspost/design-system-components-angular': patch
---

Removed `applyPolyfills` promise before defining web-components in components.module definition, because stencil ended IE support.
