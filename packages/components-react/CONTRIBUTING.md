# Contributing to @swisspost/design-system-components-react

## Package overview

This package provides React wrappers for the Swiss Post Design System web components. It supports three main use-cases:

1. **Client-side rendering** — Standard React apps using client components with `defineCustomElement` for lazy custom element registration.
2. **Server-side rendering (SSR/RSC)** — React Server Components or SSR frameworks (e.g. Next.js App Router) that hydrate components on the server using the Stencil hydrate module.
3. **Tree-shakeable imports** — Individual component imports so bundlers only include what is actually used.

Additionally, the package exports **icon components** as standalone React wrappers around `<post-icon>`.

> **Note:** Files under `stencil-generated/` and `icons-generated/` are auto-generated during the build. Do not edit them directly.

## Exports map (`exports` in package.json)

Each entry in the `exports` field serves a specific purpose
> **Note:** In your project, replace `.` with `@swisspost/design-system-components-react` in the following export paths.

| Export path | Condition | Purpose |
|---|---|---|
| `./post-components.css` | — | Allows consumers to import the component stylesheet directly. |
| `.` | `default` | Main entry point for client-side React apps. Exports all components as a barrel. |
| `.` | `react-server` | Automatically used by bundlers (e.g. Next.js) when resolving imports in a React Server Component context. Provides SSR-capable wrappers with hydration support. |
| `./*` | `default` | Individual component imports for tree-shaking (e.g. `@swisspost/design-system-components-react/post-accordion`). |
| `./*` | `react-server` | Server-side variant of individual components, resolved automatically by RSC-aware bundlers. |
| `./server` | — | Explicit server entry point. Use this when the `react-server` condition is not available or when you want to explicitly import the server build. |
| `./server/*` | — | Explicit server entry for individual components. |
| `./icons` | — | Barrel export for all icon components. |
| `./icons/*` | — | Individual icon component imports for tree-shaking (e.g. `@swisspost/design-system-components-react/icons/PostIconSearch`). |

## Maintaining the `sideEffects` array

The `sideEffects` field in `package.json` tells bundlers (webpack, Rollup, esbuild, etc.) which files **cannot be safely tree-shaken** because they modify global state at import time (e.g. registering custom elements, injecting styles, or patching globals).

**Add new entires when...**

- You introduce a new entry point (in the `exports` map) that calls `customElements.define()`, `bootstrapLazy()`, or injects global styles/patches at import time.
- You add a non-`.css` file that appends stylesheets or mutates `window`/`document` on import.
- You add a new Stencil output target directory with a different entry path.

**What happens if `sideEffects` is wrong**

- **Missing side-effectful files means:** the bundler tree-shakes them away in production builds. Causing at least visual errors if not worse.<p>:warning: This is hard to catch because it only manifests in optimized builds, not during development!</p>
- **Over-listing files means:** the bundler cannot tree-shake them, resulting in unnecessarily larger bundle sizes for consumers who only import a subset of components.

### How to verify

After changing the `sideEffects` array, verify that:

- Tree-shaking still works: importing a single component from `./*` should not bundle all components.
- SSR still works: server-rendered components must hydrate correctly on the client.
- All custom elements are registered when using the barrel import (`.`).
