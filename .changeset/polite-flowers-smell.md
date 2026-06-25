---
'@swisspost/design-system-styles': major
---

Refactored the icon mixins so that icons no longer need to be included separately, imports are now handled automatically.
The `@mixin custom-property` has therefore been removed entirely.

The `@mixin icon` arguments have also been updated: `$height` and `$width` have been replaced with a single `$size` since all icons are square.
