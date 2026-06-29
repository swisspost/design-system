---
'@swisspost/design-system-components': major
---

Renamed component events to follow a generic naming convention:

- **post-banner**: `postDismissed` → `postDismiss`
- **post-megadropdown**: `postToggleMegadropdown` → `postToggle`
- **post-menu**: `toggleMenu` → `postToggle`
- **post-listbox**: `postOptionActive` → `postFocusin`
- **post-listbox-option**: `postOptionSelected` → `postChange`
- **post-language-menu-item**: Removed `postLanguageMenuItemInitiallyActive` (the parent `post-language-menu` now queries children directly)
