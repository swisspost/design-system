---
'@swisspost/design-system-styles': major
'@swisspost/design-system-documentation': patch
---

Removed the `index.scss` and `intranet.scss` files. The following entrypoints need to be used instead:

- For internet facing applications, use `post-default.scss` instead of `index.scss`
- For internal applications, use `post-compact.scss` instead of `intranet.scss`
