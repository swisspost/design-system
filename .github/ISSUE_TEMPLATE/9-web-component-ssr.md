---
name: '[subtask] Web Component SSR'
about: Sub-issue to enable SSR for a web component.
title: '[web component ssr] component_name_here'
labels: '📦 components'
type: feature
assignees: ''
---

### 🧪 How to test

<!-- Follow the steps below to verify SSR compatibility -->

**Run the Next.js SSR page**

After updating the component, ensure it is compiled correctly as a React component by running the following commands:

```bash
pnpm components:build
pnpm components-react:build
```

Then, to focus only on the component being tested, isolate it in the Next.js application.
Comment out all components that are not under test and their imports in the following files:

- `packages/nextjs-integration/src/app/ssr/layout.tsx`
- `packages/nextjs-integration/src/app/ssr/page.tsx`

Finally, serve the application with:

```bash
pnpm nextjs:build:serve
```

**Test SSR in the browser**
<!-- Open the SSR-rendered page with JavaScript disabled -->

- Open the application in two different tabs
- In one tab, disable JavaScript and refresh the page
- Compare both pages, they must look the same

### 📃 Tasks

<!-- Add or remove tasks as needed -->

- [ ] Ensure Shadow DOM is enabled (`shadow: true`)
- [ ] Verify no hydration errors are thrown when running the Next.js SSR page
- [ ] Confirm a `shadowRoot` is present in the DOM tree when JavaScript is disabled
- [ ] Confirm the `[data-hydrated]` attribute is present after hydration
- [ ] Confirm the page looks the same on initial load with JavaScript enabled and disabled
