---
'@swisspost/design-system-styles': major
'@swisspost/design-system-documentation': patch
---

Removed the `rg` and `xxl` grid breakpoints, reducing the grid to 5 breakpoints instead of the previous 7. This change affects all CSS classes tied to specific breakpoints (e.g., `col-rg-2`, `m-xxl-4`).

**Previous Breakpoints**:
- `xs: 0px`
- `sm: 400px`
- `rg: 600px`
- `md: 780px`
- `lg: 1024px`
- `xl: 1280px`
- `xxl: 1440px`

**New Breakpoints**:
- `xs: 0px`
- `sm: 600px`
- `md: 780px`
- `lg: 1024px`
- `xl: 1280px`

To maintain compatibility with the updated grid system, you need to update your code by replacing any `*-rg-*` classes with `*-sm-*`, and any `*-xxl-*` classes with `*-xl-*`. For example:
- `col-rg-2` → `col-sm-2`
- `m-xxl-4` → `m-xl-4`
