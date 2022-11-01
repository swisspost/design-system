---
'@swisspost/design-system-styles': patch
---

Removed the `postinstall` script from the `package.json` files, which was previously used to install the cypress binary in the CI environment. This is now handled on the CI environment itself.
