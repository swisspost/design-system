---
'@swisspost/design-system-components': patch
'@swisspost/design-system-styles': patch
---

Updated `post-menu` and `post-popover` to no longer extend past the edge of the screen.

They are now both limited to the available space in the viewport and will scroll internally if they no longer fit, ensuring their contents remain accessible.
Menus also now automatically close once their trigger is scrolled out of view.