# @swisspost/design-system-components

## 1.7.1

### Patch Changes

- Enabled import injection for components. This fixes an issue with importing dynamically loaded web components with the vite compiler for storybook. (by [@gfellerph](https://github.com/gfellerph) with [#2448](https://github.com/swisspost/design-system/pull/2448))

## 1.7.0

### Minor Changes

- Added the `post-popover` component. This component can display text and interactive elements in a popover in front of the page content. (by [@gfellerph](https://github.com/gfellerph) with [#2109](https://github.com/swisspost/design-system/pull/2109))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.5.1

## 1.6.3

### Patch Changes

- Defined @stencil/core and @stencil/store as a devDependency to avoid compatibilities issues. (by [@imagoiq](https://github.com/imagoiq) with [#2313](https://github.com/swisspost/design-system/pull/2313))
- Updated dependencies:
  - @swisspost/design-system-styles@6.5.0

## 1.6.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.4.4

## 1.6.1

### Patch Changes

- Reverted #2152 because of an issue with importing the internet headers `defineCustomElements`. (by [@gfellerph](https://github.com/gfellerph) with [#2208](https://github.com/swisspost/design-system/pull/2208))
- Updated dependencies:
  - @swisspost/design-system-styles@6.4.3

## 1.6.0

### Minor Changes

- Added component exports to the src/index.ts files, to include them in the dist/index.js and dist/index.esm.js output files and therefore fix our stencil setup. (by [@oliverschuerch](https://github.com/oliverschuerch) with [`f74c9662`](https://github.com/swisspost/design-system/commit/f74c96620dc8095c6b2b51b2d3a3ee97c17e5a7d))

- Added a `post-collapsible` event emitted when the collapse element is shown or hidden. (by [@alizedebray](https://github.com/alizedebray) with [#2079](https://github.com/swisspost/design-system/pull/2079))

- Added the `post-accordion` component. (by [@alizedebray](https://github.com/alizedebray) with [#2079](https://github.com/swisspost/design-system/pull/2079))

### Patch Changes

- Upgraded builder Stenciljs from version 3 to 4. No user visible changes are expected. (by [@imagoiq](https://github.com/imagoiq) with [#2116](https://github.com/swisspost/design-system/pull/2116))
- Updated dependencies:
  - @swisspost/design-system-styles@6.4.3

## 1.5.1

### Patch Changes

- Fixed misplaced custom icons in “post-alert” elements with actions. (by [@alizedebray](https://github.com/alizedebray) with [#2094](https://github.com/swisspost/design-system/pull/2094))

- Updated the keyboard navigation on the `post-tabs` component. (by [@alizedebray](https://github.com/alizedebray) with [#2093](https://github.com/swisspost/design-system/pull/2093))

- Fixed tabs count announcement with VoiceOver. (by [@imagoiq](https://github.com/imagoiq) with [#2047](https://github.com/swisspost/design-system/pull/2047))

- Compressed styles output. (by [@imagoiq](https://github.com/imagoiq) with [#2098](https://github.com/swisspost/design-system/pull/2098))
- Updated dependencies:
  - @swisspost/design-system-styles@6.4.2

## 1.5.0

### Minor Changes

- Added the `post-tooltip` component. (by [@gfellerph](https://github.com/gfellerph) with [#1879](https://github.com/swisspost/design-system/pull/1879))

- Created the web component variant for the alert component. (by [@alizedebray](https://github.com/alizedebray) with [#1085](https://github.com/swisspost/design-system/pull/1085))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.4.1

## 1.4.0

### Minor Changes

- Added a new post-tabs component. (by [@alizedebray](https://github.com/alizedebray) with [#1181](https://github.com/swisspost/design-system/pull/1181))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.4.0

## 1.3.10

### Patch Changes

- Fixed collapsible/accordion styles that broke after Bootstrap removed several CSS custom properties. (by [@alizedebray](https://github.com/alizedebray) with [#1324](https://github.com/swisspost/design-system/pull/1324))
- Updated dependencies:
  - @swisspost/design-system-styles@6.3.0

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
