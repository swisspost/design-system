---
'@swisspost/design-system-components': major
'@swisspost/design-system-styles': major
---

Moved the `not-defined` CSS definition from the styles package to the components package. This change ensures the necessary CSS output is generated without crossing package boundaries.

- **Styles Package**: Removed `not-defined` CSS definitions from the output.
- **Components Package**: Introduced a new global styles output that must be included in the `<head>` of any page using our components.  
  File location: `@swisspost/design-system-components/dist/post-components/post-components.css`
