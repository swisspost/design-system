---
'@swisspost/design-system-components-react': minor
---

Add generated React Server Component icon exports built from @swisspost/design-system-icons. It's now possible to import react- and SSR-ready icons directly like `import { PostIconLetter } from @swisspost/design-system-components-react/icons` and use it like `<PostIconLetter size="1.5em"></PostIconLetter`>. With this change, it's no longer necessary to list the `@swisspost/design-system-icons` as a dependency of the project.
