---
'@swisspost/design-system-components': patch
---

Updated the following props to be `optional`:

- `post-banner`: `dismissLabel`, `icon`
- `post-card-control`: `description`
- `post-language-option`: `active`, `name`, `url`, `variant`
- `post-logo`: `url`
- `post-tabs`: `activePanel`
- `post-tag`: `variant`

Updated the following props to not accept `null`:

- `post-card-control`: `icon`, `name`, `value` no longer accept null;
- `post-icon`: `animation`, `base`, `rotate`, `scale` no longer accept null.
- `post-tag`: `icon`, `size` no longer accept null.
- `post-tooltip`: `animation` no longer accepts null.

Updated prop type:

- `post-card-control`: `validity` type changed to boolean.
