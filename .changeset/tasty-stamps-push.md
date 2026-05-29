---
'@swisspost/design-system-components-react': minor
---

Addded the `react-server` export field for the default import paths (e.g. `@swisspost/design-system-components-react` or `@swisspost/design-system-components-react/post-accordion`), so it automatically imports our server components in a Next.js environment, while using client components in all other cases.
This lets projects use the default export and allows us to provide custom icon wrapper components (e.g. `PostIconAdmin`, etc.), which automatically import the correct component version, no matter where they are used (e.g. in a react SPA or a Next.js project).
We'll keep the `@swisspost/design-system-components-react/server` and `@swisspost/design-system-components-react/server/post-accordion` exports, as the explict server entries.
