---
'@swisspost/design-system-components': major
---

Updated the following props to be `required`:

- `post-breadcrumbs`: `homeUrl` is now required.
- `post-collabpsible-trigger`: `for` is now required.
- `post-language-switch`: `caption` and `description` are now required.
- `post-tab-header`: `panel` is now required.
- `post-tab-panel`: `name` is now required.

Updated the following props to not accept `null`:

- `post-card-control`: `icon`, `name`, `value` no longer accept null;
- `post-icon`: `animation`, `base`, `rotate`, `scale` no longer accept null.
- `post-tag`: `icon`, `size` no longer accept null.
- `post-tooltip`: `animation` no longer accepts null.

Updated prop type:

- `post-card-control`: `validity` type changed to boolean.
