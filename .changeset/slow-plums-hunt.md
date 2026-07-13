---
'@swisspost/design-system-styles': patch
---

Replaced hardcoded color, spacing and border values in the inline notification component with design tokens (`$post-inline-notification`), and wrapped its title/message in a `.inline-notification-content` element so the icon-to-content gap and title-to-message gap can each be driven by their own token.
