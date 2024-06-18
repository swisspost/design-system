---
'@swisspost/design-system-components': patch
---

Fixed a warning on the tooltip when the id was bound using Angular, the ID check now runs at a later stage in the component lifecycle, giving Angular enough time to set the attribute.
