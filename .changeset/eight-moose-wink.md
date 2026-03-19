---
'@swisspost/design-system-styles': major
'@swisspost/design-system-tokens': major
---

Updated color palettes to use the `light-dark()` CSS function for setting component color schemes on supporting browsers.
A fallback solution is included for unsupported browsers.

Palettes now require adding the `.palette` class in addition to existing palette classes (e.g., `.palette-default`, `.palette-brand`).

BEFORE:

```html
<div class="palette-brand">Content</div>
```

AFTER:

```html
<div class="palette palette-brand">Content</div>
```

Also renamed the following CSS custom properties:

- `--post-current-palette-fg` → `--post-current-fg`
- `--post-current-palette-bg` → `--post-current-bg`
