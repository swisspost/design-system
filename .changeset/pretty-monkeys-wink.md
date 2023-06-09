---
'@swisspost/design-system-components': minor
---

Refactored the `post-icon` icon integration mechanism. Now the browser handles the file handling.
Therefore we get rid of all the workarounds to load and cache icons and instead profit from the browsers file handling mechanisms.
