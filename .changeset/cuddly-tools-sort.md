---
'@swisspost/design-system-styles': patch
---

Removes the postinstall script from the package.json files, which was previously used to postinstall the Cypress binary in the CI environment. This is now handled on the CI environment itself.
