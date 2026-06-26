---
'@swisspost/design-system-components': patch
---

Removed conflicting long press event from tooltips. As of now, tooltips are only supported for pointers and focused elements. Alternatively, use an information button (i) that triggers a popover, which is accessible for all users. The tooltip concept will be improved in a future release and remains partially inaccessible for touch devices.
