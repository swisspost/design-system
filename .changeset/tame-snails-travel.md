---
'@swisspost/design-system-components-react': patch
---

Removed the hydrate app from Next.js client bundle, without loosing the capability to render declarative shadow DOM during SSR, by importing our server components into Next.js client components.
