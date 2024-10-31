---
'@swisspost/design-system-styles': major
'@swisspost/design-system-documentation': patch
---

Updated the button component to v2.
Removed the regular button size. The `btn-rg` class no longer has any effect. The available sizes are `btn-sm`, `btn-md` and `btn-lg`. Buttons that were previously using `btn-rg` will now fall back to the default `btn-md` size.
Removed the `btn-animated` class.
