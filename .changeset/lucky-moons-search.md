---
'@swisspost/design-system-components': patch
---

Fixed `post-avatar` to display slotted images hosted on a different origin, by relying on the image `load` and `error` events instead of fetching the image.
