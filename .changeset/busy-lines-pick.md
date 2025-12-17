---
'@swisspost/design-system-documentation': minor
'@swisspost/design-system-styles': minor
---

Added missing `bottom` and `end` controls to position utilities for complete configuration.
Replaced empty label option with `unset` for better clarity across all position controls (`top`, `bottom`, `start`, `end`).
Position utilities now use logical CSS inset properties (inset-block-start, inset-block-end, inset-inline-start, inset-inline-end).
This means `start` and `end` follow the writing direction — left in LTR and right in RTL.
