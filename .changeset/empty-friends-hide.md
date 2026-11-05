---
'@swisspost/design-system-components': patch
---

Fixed ´post-header´ registering redundant ´scroll´ listeners on both its scroll parent and ´window´. Now attaches to only the one that actually fires.
