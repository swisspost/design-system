---
name: '[subtask] Web Component SSR'
about: Sub-issue to enable SSR for a web component.
title: '[web component ssr] component_name_here'
labels: '📦 components'
type: feature
assignees: ''
---

### 🧾 Findings

<!-- Document observations, issues found, limitations, or follow-up actions.
     Include screenshots, console logs, or references to related issues if relevant. -->

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

- `apps/integration-next/src/app/ssr/layout.tsx`
- `apps/integration-next/src/app/ssr/page.tsx`

Finally, serve the application with:

```bash
pnpm integration-next:start
```

**Test SSR in the browser**

<!-- Open the SSR-rendered page with JavaScript disabled -->

- Open the application in two different tabs
- In one tab, disable JavaScript and refresh the page
- Compare both pages, they must look the same

### 📃 Tasks

<!-- Add or remove tasks as needed -->

- [ ] Ensure Shadow DOM is enabled (explicit `shadow: true`) for the component and potential sub-components
- [ ] Verify no hydration or console errors are thrown when running the Next.js SSR page
- [ ] Confirm the page looks the same on initial load with JavaScript enabled and disabled across all devices and supported configurations
- [ ] Ensure ARIA attribute cross-referencing (e.g. `aria-labelledby`, `aria-describedby`) works as expected
