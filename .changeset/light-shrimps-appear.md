---
'@swisspost/design-system-styles': patch
---

Fixes utility mixin "not-disabled-focus-hover".
The previous selector did lead to an silent error in scss compilation, when used in stencil components.
