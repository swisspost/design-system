---
'@swisspost/design-system-tokens': patch
---

Added a transform function to avoid unitless zero values for specific token types (like `dimension`, etc.), which allows us to use these tokens also in css `calc()` functions.
Because `<number-token>`s are always interpreted as `<number>`s or `<integer>`s, "unitless 0" `<length>`s aren’t supported in calc().
Source: https://drafts.csswg.org/css-values-3/#calc-type-checking
