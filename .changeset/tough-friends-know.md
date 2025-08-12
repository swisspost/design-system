---
'@swisspost/design-system-components-angular': major
---

Updated Angular components to output as standalone components instead of module-based. This modernizes the package to align with Angular's current best practices and provides better tree-shaking support. Users need to replace `PostComponentsModule` imports with `providePostComponents()` in their app providers and import individual components (e.g., `import { PostIcon, PostButton } from '@swisspost/design-system-components-angular'`) for standalone components.