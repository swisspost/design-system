---
'@swisspost/design-system-components': patch
'@swisspost/design-system-components-angular': patch
'@swisspost/design-system-components-react': patch
---

Fixed a type mismatch error when binding `(postChange)` on `post-language-menu`, where `$event` was typed as `Event` instead of `CustomEvent<string>`.
