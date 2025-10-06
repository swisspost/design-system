---
'@swisspost/design-system-components': patch
---

Updated `<post-popovercontainer>` to emit events: postBeforeShow, postShow, postHide, postBeforeToggle, and postToggle. Updated `<post-menu>` and `<post-tooltip-trigger>` to consume the `onPostToggle` event emitted by `<post-popovercontainer>`.
