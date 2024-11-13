---
'@swisspost/design-system-documentation': patch
---

Refactored the stepper component to handle `updateArgs` directly within the `getStepperItem` function, fixing the issue where stepper examples were not independent and resolving unreliable step changes that sometimes caused clicks to be unrecognized or froze the page.