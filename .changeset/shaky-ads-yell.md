---
'@swisspost/design-system-components-angular': patch
'@swisspost/design-system-components': patch
---

Updated the `post-number-input` to emit an input event when the value is changed via the plus and minus buttons. This fixes an issue in Angular where the changes were not detected by the form control assigned to the input element.
