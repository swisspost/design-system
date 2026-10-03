---
'@swisspost/design-system-components': patch
'@swisspost/design-system-styles': patch
---

Updated `post-menu` to no longer extend past the edge of the screen.

A menu is now limited to the space available in the viewport and scrolls internally when it holds more items than fit, so every item stays accessible.
Menus also close automatically once their trigger is scrolled out of view.