---
'@swisspost/design-system-styles': major
'@swisspost/design-system-documentation': patch
---

Refactored the icon mixins so that icons no longer need to be included separately, imports are now handled automatically.
The `custom-property` mixin as therefore be removed entirely.

The `icon` mixin arguments have also been updated: `$height` and `$width` have been replaced with a single `$size` since all icons are square.
