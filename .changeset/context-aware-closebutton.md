---
'@swisspost/design-system-components': minor
---

`<post-closebutton>` now automatically detects and closes the nearest closable ancestor (an element with a `popover` attribute, a `<dialog>`, `<post-collapsible>`, `<post-accordion-item>`, `<post-popover>`, `<post-popovercontainer>` or `<post-banner>`) when clicked, without requiring any explicit wiring from the consumer. As part of this change, the manual close wiring previously implemented inside `post-banner` (`@Listen('click')` handler) and `post-popover` (`onClick` binding on its internal close button) has been removed, since it is now handled automatically by `post-closebutton` itself.
