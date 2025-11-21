---
'@swisspost/design-system-styles': major
'@swisspost/design-system-documentation': patch
---

Updated styles for elements slotted in the `post-header` component.
Slotted lists should now omit the `.list-inline` class and will be automatically styled as part of the `post-header`.
Keeping the `.list-inline` class will cause incorrect spacing between header elements.