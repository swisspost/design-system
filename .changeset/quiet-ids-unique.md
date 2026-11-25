---
'@swisspost/design-system-components': patch
---

Fixed `post-breadcrumbs` rendering a duplicated `id` for its overflow `post-menu`, caused by the off-screen measurement clone of the navigation.

Documented the `id` attribute for `post-breadcrumbs`, including how it determines the overflow menu's `id` and when to set a stable, unique value.
