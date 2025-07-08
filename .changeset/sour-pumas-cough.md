---
'@swisspost/design-system-components': minor
---

Improved URL handling in `post-icon` component:

- Enhanced URL construction to properly handle both absolute and relative URLs
- Fixed slug detection to correctly identify root paths ("/") as valid slugs
- Maintained priority order for URL sources: base property > base tag > data-post-icon-base meta attribute
