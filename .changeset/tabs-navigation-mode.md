---
'@swisspost/design-system-components': minor
'@swisspost/design-system-documentation': minor
---

Added navigation variant to the `post-tabs` component, enabling anchor-based navigation. The component now automatically detects whether `post-tab-item` elements contain anchor links and switches between panels and navigation variants accordingly. The `aria-current="page"` attribute must be manually added to the anchor element representing the current page to ensure proper styling and accessibility.
