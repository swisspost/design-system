---
'@swisspost/design-system-components': major
---

Updated the `post-date-picker` component:

- An input is now needed for both inline and non-inline variants, allowing to set and read the value natively as well as accessing the native input and change event. The `selectedStartDate` and `selectedEndDate` have therefore been removed as well as the `postUpdateDates` event.
- The `renderCellCallback` property has been renamed to `cellConfig` and the types it requires are now exported from our package.
- The input mask behavior has also been improved to avoid incorrectly formatted dates.
