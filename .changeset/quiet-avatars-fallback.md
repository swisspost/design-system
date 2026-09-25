---
'@swisspost/design-system-components': patch
---

Fixed the `post-avatar` component so that it shows the Gravatar image on initial load when the `firstname`, `lastname` and `email` properties are set, and falls back to the initials when the image cannot be loaded.
