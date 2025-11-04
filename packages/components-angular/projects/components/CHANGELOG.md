# @swisspost/design-system-components-angular

## 10.0.0-next.52

### Patch Changes

- Fixed an issue with dependency managemant around @stencil/core. This package no longer has to be installed as a dependency by projects using the Design System Components or Components Angular packages as it's now declared a dependency of the components package (was a devDependency before). (by [@gfellerph](https://github.com/gfellerph) with [#6554](https://github.com/swisspost/design-system/pull/6554))
- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.52

## 10.0.0-next.51

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.51

## 10.0.0-next.50

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.50

## 10.0.0-next.49

### Major Changes

- Updated Angular components to output as standalone components to align with Angular 20's default approach where components are standalone by default, eliminating the need to declare them within NgModules. Developers using our components should replace `PostComponentsModule` imports with `providePostComponents()` in their app providers and import individual components (e.g., `import { PostIcon, PostButton } from '@swisspost/design-system-components-angular'`) for standalone use.  
  BEFORE:

  ```typescript
  // app.module.ts
  @NgModule({
    imports: [
      PostComponentsModule,
    ],
  })
  ```

  AFTER:

  ````typescript
  //app.module.ts
  @NgModule({
    providers: [
      providePostComponents(),
    ],
  })
  ``` (by [@alionazherdetska](https://github.com/alionazherdetska) with [#5968](https://github.com/swisspost/design-system/pull/5968))
  ````

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.49

## 10.0.0-next.48

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.48

## 10.0.0-next.47

### Patch Changes

- Updated peer dependencies `@angular/core`, `@angular/common` and `@angular/forms` of the package. (by [@myrta2302](https://github.com/myrta2302) with [#5836](https://github.com/swisspost/design-system/pull/5836))
- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.47

## 10.0.0-next.46

### Major Changes

- Simplified the banner and toast components:
  - Removed the `icon` property; icons are no longer configurable
  - Removed the `neutral` variant; the default is now `info`
  - Renamed the `danger` variant to `error` (by [@alizedebray](https://github.com/alizedebray) with [#6063](https://github.com/swisspost/design-system/pull/6063))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.46

## 10.0.0-next.45

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.45

## 10.0.0-next.44

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.44

## 10.0.0-next.43

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.43

## 10.0.0-next.42

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.42

## 10.0.0-next.41

### Patch Changes

- Improved URL handling in `post-icon` component:
  - Enhanced URL construction to properly handle both absolute and relative URLs
  - Fixed slug detection to correctly identify root paths ("/") as valid slugs
  - Maintained priority order for URL sources: base property > base tag > data-post-icon-base meta attribute (by [@schaertim](https://github.com/schaertim) with [#5109](https://github.com/swisspost/design-system/pull/5109))
- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.41

## 10.0.0-next.40

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.40

## 10.0.0-next.39

### Major Changes

- Added the styles responsible for preventing fouc (flashes of unstyled content) for web-, angular- and react-components in the respective component packages:
  - `@swisspost/design-system-components/post-components/post-components.css`
  - `@swisspost/design-system-components-angular/post-components.css`
  - `@swisspost/design-system-components-react/post-components.css` (by [@oliverschuerch](https://github.com/oliverschuerch) with [#5165](https://github.com/swisspost/design-system/pull/5165))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.39

## 10.0.0-next.38

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.38

## 10.0.0-next.37

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@10.0.0-next.37

## 9.0.0-next.36

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.36

## 9.0.0-next.35

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.35

## 9.0.0-next.34

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.34

## 9.0.0-next.33

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.33

## 9.0.0-next.32

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.32

## 9.0.0-next.31

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.31

## 9.0.0-next.30

### Patch Changes

- Updated the project to use Angular version 19. (by [@alizedebray](https://github.com/alizedebray) with [#4853](https://github.com/swisspost/design-system/pull/4853))
- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.30

## 9.0.0-next.29

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.29

## 9.0.0-next.28

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.28

## 9.0.0-next.27

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.27

## 9.0.0-next.26

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.26

## 9.0.0-next.25

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.25

## 9.0.0-next.24

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.24

## 9.0.0-next.23

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.23

## 9.0.0-next.22

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.22

## 9.0.0-next.21

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.21

## 9.0.0-next.20

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.20

## 9.0.0-next.19

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.19

## 9.0.0-next.18

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.18

## 9.0.0-next.17

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.17

## 9.0.0-next.16

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.16

## 9.0.0-next.15

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.15

## 9.0.0-next.14

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.14

## 9.0.0-next.13

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.13

## 9.0.0-next.12

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.12

## 9.0.0-next.11

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.11

## 9.0.0-next.10

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.10

## 9.0.0-next.9

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.9

## 9.0.0-next.8

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.8

## 9.0.0-next.7

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.7

## 9.0.0-next.6

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.6

## 9.0.0-next.5

### Minor Changes

- Added a provisional post-header component with some basic functionality in place. This component is not finished in this state. (by [@gfellerph](https://github.com/gfellerph) with [#3837](https://github.com/swisspost/design-system/pull/3837))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.5

## 9.0.0-next.4

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.4

## 9.0.0-next.3

### Minor Changes

- Added component `post-avatar` to show an avatar, based on different possible input data (gravatar by email, initials by first- and/or lastname, fallback). (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3352](https://github.com/swisspost/design-system/pull/3352))

### Patch Changes

- Fixed an issue with property validation where some checks were run before the framework had the chance to add computed properties (for example Angular bindings like `[for]="$id"`). The checks are now delayed to work around this issue. (by [@gfellerph](https://github.com/gfellerph) with [#3775](https://github.com/swisspost/design-system/pull/3775))
- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.3

## 9.0.0-next.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.2

## 9.0.0-next.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.1

## 9.0.0-next.0

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@9.0.0-next.0

## 8.2.0

### Minor Changes

- Added the post-logo component, which enables displaying the Post's logo either as a clickable link or as a simple image. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3477](https://github.com/swisspost/design-system/pull/3477))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@8.2.0

## 8.1.0

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@8.1.0

## 8.0.0

### Major Changes

- Upgraded to Angular 18 (by [@gfellerph](https://github.com/gfellerph) with [#3243](https://github.com/swisspost/design-system/pull/3243))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@8.0.0

## 7.4.0

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@7.4.0

## 7.3.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@7.3.1

## 7.3.0

### Minor Changes

- Added a `post-collapsible-trigger` component to properly handle the role, ARIA attributes, and event listeners for elements that toggle a `post-collapsible`. (by [@alizedebray](https://github.com/alizedebray) with [#3209](https://github.com/swisspost/design-system/pull/3209))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@7.3.0

## 7.2.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@7.2.1

## 7.2.0

### Patch Changes

- Redefined the dependency to the web components package as a dependency instead of a peer dependency due to a [known bug in changesets](https://github.com/changesets/changesets/issues/1011) that causes major version bumps across all linked workspace packages if one of them is installed as a peer dependency. (by [@gfellerph](https://github.com/gfellerph) with [#3169](https://github.com/swisspost/design-system/pull/3169))

- Updated `PostComponentsModule` to enable its use in lazy-loaded modules. (by [@alizedebray](https://github.com/alizedebray) with [#3118](https://github.com/swisspost/design-system/pull/3118))

- Added `@swisspost/design-system-components` package as a peer dependency as recommended by stenciljs. This way, installing `@swisspost/design-system-components` package as a direct dependency should not be necessary anymore in consumer projects. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3116](https://github.com/swisspost/design-system/pull/3116))
- Updated dependencies:
  - @swisspost/design-system-components@7.2.0

## 7.1.0

### Minor Changes

- Added a `heading-level` property on the `post-accordion` component to set the heading level of all `post-accordion-item` children at once. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

### Patch Changes

- Fixed broken value-accessors for post-card-control. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3101](https://github.com/swisspost/design-system/pull/3101))

## 7.0.0

### Major Changes

- Synchronized the versions of the following packages:

  - @swisspost/design-system-styles
  - @swisspost/design-system-components
  - @swisspost/design-system-components-react
  - @swisspost/design-system-components-angular
  - @swisspost/design-system-migrations
  - @swisspost/design-system-icons
  - @swisspost/design-system-intranet-header

  This will help understanding the dependencies between these packages at a glance but also means that for the individual pacakges, semver is no longer being used. This enables us also to talk about and document Design System versions as a whole instead of documenting the fragmented versions in a complex lookup table. (by [@gfellerph](https://github.com/gfellerph) with [#2856](https://github.com/swisspost/design-system/pull/2856))

- Added support for Angular 17. (by [@alizedebray](https://github.com/alizedebray) with [#2760](https://github.com/swisspost/design-system/pull/2760))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@7.0.0

## 2.0.0

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@2.1.0

## 1.0.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@2.0.3

## 1.0.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@2.0.2

## 1.0.0

### Major Changes

- We are introducing the new package `@swisspost/design-system-components-angular` 🥳, which provides a corresponding Angular component for all our web-components. For those working on an Angular app this means:

  - Instead of the package `@swisspost/design-system-components`, which provides native web components, the new package can be used.
  - The manual creation of Angular wrapper components for our previous web components in every project is no longer necessary.
  - Full support of the standard Angular schema. The use of the `CUSTOM_ELEMENTS_SCHEMA` schema is history.
  - Component properties, events, etc. can be applied to the components in the usual Angular way. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2071](https://github.com/swisspost/design-system/pull/2071))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@2.0.1
