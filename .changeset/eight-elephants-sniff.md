---
'@swisspost/design-system-styles': major
'@swisspost/internet-header': patch
'@swisspost/design-system-documentation': patch
'@swisspost/design-system-demo': patch
---

Refactored brand colors. Renamed `$gray-background` SCSS variable to `$gray` and removed `$gray-background-light` variable because it is a duplication of the already existing variable `$light`.

Updated the usage of said variables in dependant packages accordingly.
