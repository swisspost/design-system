---
'@swisspost/design-system-styles': patch
---

Fixed an issue on iOS where floating labels would appear above the `post-header` component when an input was focused, by lowering their z-index to ensure they remain underneath the header, even during Safari's automatic zoom on form inputs, which alters the rendering context and can mess with layering.
