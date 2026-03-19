---
'@swisspost/design-system-components': patch
---

Removed `tabindex="0"` from the `post-linkarea` component.
The link area is mouse-only and should not be focusable, only the button it contains can receive keyboard focus.
