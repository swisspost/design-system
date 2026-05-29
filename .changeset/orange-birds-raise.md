---
'@swisspost/design-system-components-react': major
---

Removed the `./standalone` export in the package.json, since it was only there for internal usage and is no longer needed.
Projects can still import standalone components with `import { PostAccordion } from '@swisspost/design-system-components-react/post-accordion';` or `import { PostAccordion } from '@swisspost/design-system-components-react/server/post-accordion';`.
