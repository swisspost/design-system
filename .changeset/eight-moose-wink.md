---
'@swisspost/design-system-styles': major
'@swisspost/design-system-tokens': major
---

- Updated color palettes to use the `light-dark()` CSS function for setting the color scheme of components on supporting browsers. A fallback solution is provided for unsupported browsers. The palettes now require the addition of a `.palette` class, alongside existing classes (e.g., `.palette-default`, `.palette-brand`, etc.).
  BEFORE:
  ```html
  <div class="palette-brand">
    Content
  </div>
  ```
  AFTER:
  ```html
  <div class="palette palette-brand">
    Content
  </div>
  ```

- Removed the `--post-current-palette-fg` and `--post-current-palette-bg` CSS custom properties.
