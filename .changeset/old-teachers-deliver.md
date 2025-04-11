---
'@swisspost/design-system-styles': major
'@swisspost/design-system-components-angular': major
'@swisspost/design-system-components-react': major
'@swisspost/design-system-components': major
---

Removed the `not-defined.scss` file, which controlled when web components become visible:

- for server-side rendered components: immediately
- for client-side rendered components: after hydration

On the other side, we introduced the global styles file `post-components.css` in all component packages, which repalces the styling logic which was defind in the `not-defined.scss` in our styles package before.
This file must be included in any project using our component packages to ensure proper functionality of the web components.
