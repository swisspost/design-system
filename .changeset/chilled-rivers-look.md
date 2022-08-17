---
'@swisspost/design-system-demo': major
'@swisspost/web-styles': major
---

Refactored colors. Bootstrap overrides are now clearly separated from Design System colors and only Design System colors are used in the components. This change also prepares for a dynamic dark mode by offering CSS variables for background and text contrast colors (see buttons.scss for an example).
