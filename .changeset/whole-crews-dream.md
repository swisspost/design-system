---
'@swisspost/design-system-components': patch
---

Updated `<post-menu>` and `<post-menu-item>` to prevent accessibility roles from being announced before the menu content is visible, and to ensure correct focus behavior on menu items during keyboard navigation when NVDA is running.

Removed the obsolete `role="menuitem"` from `<post-language-switch>. `<post-language-option>`now assigns`role="listitem"`in case of`variant="list"`, to ensure a correct reference relationship.

Updated the `<post-breadcrumbs>` component by removing an `aria-label` set on the trigger wrapper `<div>`, which was causing an accessibility error. Also added `role="none"` to the wrapper div to reflect its presentational purpose.
