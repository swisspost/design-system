---
'@swisspost/design-system-styles': major
'@swisspost/design-system-documentation': patch
'@swisspost/design-system-components': patch
'@swisspost/design-system-demo': patch
---

- Removed variables `$success-green`, `$error-red`, `$warning-orange`, `$success-text`, `$error-text`, `$danger` as well as the Sass map `$contextual-colors`.
  Instead use the variables `$success`, `$error`, `$warning` and the Sass map `$signal-colors`.
- Updated the Sass map `$signal-colors` keys and added a new Sass map `$signal-background-colors`.
- Updated the Sass map `$background-colors` and all the dependant packages accordingly.

With the exception of the components `notification`, `toast` and `tag`, there is no component providing a `danger` variant anymore. Instead use the `error` variant.
