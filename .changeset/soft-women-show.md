---
'@swisspost/design-system-styles': patch
---

Fixed an issue on iOS Chrome where floating labels would appear above the mobile navigation menu after users interacted with multiple form inputs, by increasing the z-index hierarchy for `post-header` components on mobile and tablet devices to ensure proper layering and maintain the navigation menu's top-level priority.
