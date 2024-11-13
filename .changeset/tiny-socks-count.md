---
'@swisspost/design-system-components': patch
'@swisspost/design-system-components-angular': patch
'@swisspost/design-system-components-react': patch
---

Fixed an issue with property validation where some checks were run before the framework had the chance to add computed properties (for example Angular bindings like `[for]="$id"`). The checks are now delayed to work around this issue.
