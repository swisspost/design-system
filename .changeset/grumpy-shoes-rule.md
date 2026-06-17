---
'@swisspost/design-system-components': minor
---

Decoupled the visual value from the model in the `post-date-picker` component. The `selectedStartDate` and `selectedEndDate` properties are no longer mutated by the component itself; user interactions and manual input are now reflected through the `postUpdateDates` event instead. A new `value()` method was added to read the date picker's current value (`string | string[]`).
