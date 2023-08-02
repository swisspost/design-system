# @swisspost/design-system-components

## 1.3.9

### Patch Changes

- Fixed broken and outdated output structure of stencil build. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1611](https://github.com/swisspost/design-system/pull/1611))
- Updated dependencies:
  - @swisspost/design-system-styles@6.2.6

## 1.3.8

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.2.5

## 1.3.7

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.2.4

## 1.3.6

### Patch Changes

- Fixed broken links to the storybook documentation. (by [@alizedebray](https://github.com/alizedebray) with [#1514](https://github.com/swisspost/design-system/pull/1514))

- Reintegrated mistakenly removed inline-styles into the `post-icon` component. Animations and scale modifiers now work as expected again. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1531](https://github.com/swisspost/design-system/pull/1531))

- Implemented a workaround for the crossorigin problem in the `post-icon` component. Icons can now be loaded from cross-origin if the correct `img-src` is set in your CORS policy. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1531](https://github.com/swisspost/design-system/pull/1531))
- Updated dependencies:
  - @swisspost/design-system-styles@6.2.3

## 1.3.5

### Patch Changes

- Refactored the `post-icon` icon loading mechanism. The same icon will no longer be loaded multiple times. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1485](https://github.com/swisspost/design-system/pull/1485))
- Updated dependencies:
  - @swisspost/design-system-styles@6.2.2

## 1.3.4

### Patch Changes

- Updated the flip-v/flip-h properties of the `<post-icon>` component to corectly work with boolean inputs. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1312](https://github.com/swisspost/design-system/pull/1312))

## 1.3.3

### Patch Changes

- Fixed package dependencies. Moved dependencies that are not being used in production to devDependencies in order to simplify and speed up the package install process. (by [@gfellerph](https://github.com/gfellerph) with [#1289](https://github.com/swisspost/design-system/pull/1289))

- Fixed the `post-icon` component to ensure that the icon is properly updated every time the value of the "name" property changes at runtime. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1310](https://github.com/swisspost/design-system/pull/1310))

## 1.3.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.0.0

## 1.3.1

### Patch Changes

- Reverted the update to Bootstrap 5.2 and Angular 15. This update should have been a major release and will be re-released as such as soon as possible. (by [@gfellerph](https://github.com/gfellerph) with [#1207](https://github.com/swisspost/design-system/pull/1207))
- Updated dependencies:
  - @swisspost/design-system-styles@5.4.1

## 1.3.0

### Minor Changes

- Major dependency update. The following versions are now supported:
  - Angular 15
  - Bootstrap 5.2.3
  - ng-bootstrap 14 (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1146](https://github.com/swisspost/design-system/pull/1146))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.4.0

## 1.2.0

### Minor Changes

- Added an icon component that works together with @swisspost/design-system-icons for rendering any Post icon as an SVG. (by [@gfellerph](https://github.com/gfellerph) with [#933](https://github.com/swisspost/design-system/pull/933))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.3.2

## 1.1.0

### Minor Changes

- Created a collapsible component. (by [@alizedebray](https://github.com/alizedebray) with [#683](https://github.com/swisspost/design-system/pull/683))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.3.1

## 1.0.6

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.3.0

## 1.0.5

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.2.0

## 1.0.4

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.1.3

## 1.0.3

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.1.2

## 1.0.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.1.1

## 1.0.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.1.0

## 1.0.0

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.0.0
