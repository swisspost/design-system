---
'@swisspost/design-system-styles': major
'@swisspost/design-system-demo': patch
---

Updated entry file names for the styles package.

```scss
@use '@swisspost/design-system-styles'; // Default internet styles
@use '@swisspost/design-system-styles/intranet'; // Default intranet styles
@use '@swisspost/design-system-styles/core' as post; // Variables, mixins, functions and placeholders
```

1. Default import is now as simple as possible.
2. Intranet styles are clearly named as such.
3. Core functionality is a clear name, but for consistency with other prefixes, the core module can be namespaced as post. The usage would then be `background-color: post.$yellow;`.
