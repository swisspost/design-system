---
'@swisspost/design-system-styles': patch
---

Fixed an issue with button styles specificity where e.g. icon buttons got overwritten by the button styles. Button styles are now delivered in the correct source order, also when selectively importing component CSS.
