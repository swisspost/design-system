---
'@swisspost/design-system-components': minor
'@swisspost/design-system-documentation': patch
---

Refactored the stencil config:
- Disabled SourceMaps generation.
- The SASS output is now compressed.
- Removed the outputTarget `www`.
- Changed the `ucstomElementsExportBehavior` to `single-export-module` to improve the import possibilities.

Updated the components package `getting-started` docs page accordingly.
