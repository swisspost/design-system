---
'@swisspost/design-system-components': patch
---

Updated `<post-popovercontainer>` to emit events: postBeforeShow, postAfterShow, postHide, postBeforeToggle, and postAfterToggle. Updated `<post-menu>` and `<post-tooltip-trigger>` to consume the `onPostAfterToggle` event emitted by `<post-popovercontainer>`.
