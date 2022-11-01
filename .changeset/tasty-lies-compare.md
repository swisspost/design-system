---
'@swisspost/design-system-styles': major
---

Refactored `font-size` and `line-height` maps with keys, for easier automation. Variables now are always accessible individually and collected in a loopable map. Font-sizes and line-heights are defined for the same sizes so it's possible to cross-reference a line-height based on font-size (see font-curve mixin).
