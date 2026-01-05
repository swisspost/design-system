---
'@swisspost/design-system-components': patch
---

Fixed a header specific issue with a large visual impact.
Because of the issue, the component ended up in an incorrect visual state, when the focussed element within (e.g. the burger-menu-toggle), was removed from the DOM during a viewport resize event.
