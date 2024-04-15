---
'@swisspost/design-system-components': major
---

Updated the package entry properties in the package.json to the by stencil recommended files:

- Updated the `main` property from `loader/index.cjs.js` to `dist/index.cjs.js`
- Updated the `module` property from `loader/index.js` to `dist/loader.js`
- Updated the `types` property from `loader/index.d.ts` to `dist/types/index.d.ts`
- Removed the `es2017` property

The usage of the `@swisspost/design-system-components/loader` entry files are still available and should be used to get the lazy-loaded components.
