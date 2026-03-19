---
'@swisspost/design-system-components': major
'@swisspost/design-system-documentation': patch
---

Renamed slots in the `post-header` component for improved clarity and consistency. The following slots have been renamed:

- `target-group` → `audience`
- `global-controls` → `global-nav-primary`
- `meta-navigation` → `global-nav-secondary`
- `post-language-switch` → `language-menu`
- `global-login` → `post-login`
- `post-mainnavigation` → `main-nav`

All slot names must be updated in existing implementations to ensure header components render correctly.
