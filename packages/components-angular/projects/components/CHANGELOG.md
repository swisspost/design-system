# @swisspost/design-system-components-angular

## 8.4.0

### Patch Changes

- Fixed an issue with property validation where some checks were run before the framework had the chance to add computed properties (for example Angular bindings like `[for]="$id"`). The checks are now delayed to work around this issue. (by [@gfellerph](https://github.com/gfellerph) with [#3796](https://github.com/swisspost/design-system/pull/3796))
- Updated dependencies:
  - @swisspost/design-system-components@8.4.0

## 8.3.0

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@8.3.0

## 8.2.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@8.2.2

## 8.2.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@8.2.1

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
