# @swisspost/design-system-components-angular

## 7.1.0

### Minor Changes

- Added a `heading-level` property on the `post-accordion` component to set the heading level of all `post-accordion-item` children at once. (by [@alizedebray](https://github.com/alizedebray) with [#3067](https://github.com/swisspost/design-system/pull/3067))

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
