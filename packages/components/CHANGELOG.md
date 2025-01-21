# @swisspost/design-system-components

## 8.8.0

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.8.0

## 8.7.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.7.1

## 8.7.0

### Patch Changes

- Fix tab isolation in nested `post-tabs` components by scoping tab queries and interactions to the current instance. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4214](https://github.com/swisspost/design-system/pull/4214))
- Updated dependencies:
  - @swisspost/design-system-styles@8.7.0

## 8.6.2

### Patch Changes

- Made `post-icon` component use base tag href to define location of icons folder. (by [@leagrdv](https://github.com/leagrdv) with [#4128](https://github.com/swisspost/design-system/pull/4128))
- Updated dependencies:
  - @swisspost/design-system-styles@8.6.2

## 8.6.1

### Patch Changes

- Fixed bug in console upon exiting tooltip. (by [@leagrdv](https://github.com/leagrdv) with [#4014](https://github.com/swisspost/design-system/pull/4014))

- Fixed bug that showed delayed tooltip even after blur event. (by [@leagrdv](https://github.com/leagrdv) with [#4103](https://github.com/swisspost/design-system/pull/4103))

- Removed strikethrough style on disabled elements. (by [@leagrdv](https://github.com/leagrdv) with [#4095](https://github.com/swisspost/design-system/pull/4095))
- Updated dependencies:
  - @swisspost/design-system-styles@8.6.1

## 8.6.0

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.6.0

## 8.5.0

### Patch Changes

- Fixed the `post-card-control` label read twice by screen readers. (by [@leagrdv](https://github.com/leagrdv) with [#3863](https://github.com/swisspost/design-system/pull/3863))
- Updated dependencies:
  - @swisspost/design-system-styles@8.5.0

## 8.4.0

### Patch Changes

- Fixed a bug in nested accordions where closing a child item unintentionally closed all parent accordion elements. (by [@gfellerph](https://github.com/gfellerph) with [#3773](https://github.com/swisspost/design-system/pull/3773))

- Fixed an issue with property validation where some checks were run before the framework had the chance to add computed properties (for example Angular bindings like `[for]="$id"`). The checks are now delayed to work around this issue. (by [@gfellerph](https://github.com/gfellerph) with [#3796](https://github.com/swisspost/design-system/pull/3796))
- Updated dependencies:
  - @swisspost/design-system-styles@8.4.0

## 8.3.0

### Patch Changes

- Fixed an issue with the post-collapsible throwing an invalid selector error. (by [@alizedebray](https://github.com/alizedebray) with [#3727](https://github.com/swisspost/design-system/pull/3727))
- Updated dependencies:
  - @swisspost/design-system-styles@8.3.0

## 8.2.2

### Patch Changes

- Fixed an issue related to conflicting pointer and focus events hiding the tooltip unexpectedly in some situations. The tooltip now behaves as expected in this situation. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3681](https://github.com/swisspost/design-system/pull/3681))
- Updated dependencies:
  - @swisspost/design-system-styles@8.2.2

## 8.2.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.2.1

## 8.2.0

### Minor Changes

- Added the post-logo component, which enables displaying the Post's logo either as a clickable link or as a simple image. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3477](https://github.com/swisspost/design-system/pull/3477))

### Patch Changes

- Fixed the `post-card-control` component to use the correct color scheme when placed on nested colored backgrounds. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3477](https://github.com/swisspost/design-system/pull/3477))

- Simplified individual web component imports. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3477](https://github.com/swisspost/design-system/pull/3477))

- Fixed the post-tabs component throwing an error when imported individually. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3477](https://github.com/swisspost/design-system/pull/3477))
- Updated dependencies:
  - @swisspost/design-system-styles@8.2.0

## 8.1.0

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.1.0

## 8.0.0

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.0.0

## 7.4.0

### Minor Changes

- Added the slot="tabs" attribute on the post-tab-header per default. (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#3282](https://github.com/swisspost/design-system/pull/3282))

### Patch Changes

- Fixed a bug with the post-collapsible-trigger imports (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3302](https://github.com/swisspost/design-system/pull/3302))
- Updated dependencies:
  - @swisspost/design-system-styles@7.4.0

## 7.3.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.3.1

## 7.3.0

### Minor Changes

- Added an invalid message for the card-control component and an icon in the invalid message of the checkbox and radio button (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#2978](https://github.com/swisspost/design-system/pull/2978))

- Added a `delayed` property to the `post-tooltip` component to allow delaying its display for a few milliseconds after it is triggered. (by [@alizedebray](https://github.com/alizedebray) with [#3245](https://github.com/swisspost/design-system/pull/3245))

- Added a `post-collapsible-trigger` component to properly handle the role, ARIA attributes, and event listeners for elements that toggle a `post-collapsible`. (by [@alizedebray](https://github.com/alizedebray) with [#3209](https://github.com/swisspost/design-system/pull/3209))

### Patch Changes

- Fixed an issue with popovers on Firefox ESR that unexpectedly closed popovers when clicking on content. (by [@gfellerph](https://github.com/gfellerph) with [#3211](https://github.com/swisspost/design-system/pull/3211))

- Prevent the `post-tabs` component from triggering a `post Change` event before it is loaded. (by [@alizedebray](https://github.com/alizedebray) with [#3247](https://github.com/swisspost/design-system/pull/3247))
- Updated dependencies:
  - @swisspost/design-system-styles@7.3.0

## 7.2.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.2.1

## 7.2.0

### Patch Changes

- Fixed a warning on the tooltip when the id was bound using Angular, the ID check now runs at a later stage in the component lifecycle, giving Angular enough time to set the attribute. (by [@gfellerph](https://github.com/gfellerph) with [#3155](https://github.com/swisspost/design-system/pull/3155))
- Updated dependencies:
  - @swisspost/design-system-styles@7.2.0

## 7.1.0

### Minor Changes

- Added a `heading-level` property on the `post-accordion` component to set the heading level of all `post-accordion-item` children at once. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

### Patch Changes

- Fixed grid-area behaviour in card-control component, if used without any icon. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3099](https://github.com/swisspost/design-system/pull/3099))

- Merged the card-control, checkbox-card and radio button card docs pages and updated the choice-card-control styles. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

- Fixed high-contrast-mode for card-control component. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

- Fixed the `post-accordion-item` chevron no longer rotating. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))
- Updated dependencies:
  - @swisspost/design-system-styles@7.1.0

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

- Updated the package entry properties in the package.json to the by stencil recommended files:

  - Updated the `main` property from `loader/index.cjs.js` to `dist/index.cjs.js`
  - Updated the `module` property from `loader/index.js` to `dist/loader.js`
  - Updated the `types` property from `loader/index.d.ts` to `dist/types/index.d.ts`
  - Removed the `es2017` property

  The usage of the `@swisspost/design-system-components/loader` entry files are still available and should be used to get the lazy-loaded components. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2886](https://github.com/swisspost/design-system/pull/2886))

- Prefixed all web-component custom-events with the keyword `post`.
  - Changed `post-alert` component `dismissed` event to `postDismissed`.
  - Changed `post-card-control` component `input` and `change` events to `postInput` and `postChange`.
  - Changed `post-collapsible` component `collapseChange` event to `postToggle`.
  - Changed `post-rating` component `input` and `change` events to `postInput` and `postChange`.
  - Changed `post-tabs` component `tabChange` event to `postChange`. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2874](https://github.com/swisspost/design-system/pull/2874))

### Minor Changes

- Added a new `tag` component. This component is available in standard HTML or as webcomponent. (by [@b1aserlu](https://github.com/b1aserlu) with [#2552](https://github.com/swisspost/design-system/pull/2552))

- Added a new web-component `post-card-control`, which works like a native `input[type="checkbox"]` or `input[type="radio"]` but with a custom visual design. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2260](https://github.com/swisspost/design-system/pull/2260))

- Added the new default slot, to allow the integration of custom HTML in the card-control component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2844](https://github.com/swisspost/design-system/pull/2844))

### Patch Changes

- Fixed accessibility of aria controls through post-tabs components. (by [@imagoiq](https://github.com/imagoiq) with [#2777](https://github.com/swisspost/design-system/pull/2777))

- Fixed post-tooltip that doesn't show up when the pointer is on a child element (like an icon). (by [@imagoiq](https://github.com/imagoiq) with [#2814](https://github.com/swisspost/design-system/pull/2814))

- Fixed Collapsible and Accordion element's content which is displayed when hidden on Webkit/Safari. (by [@imagoiq](https://github.com/imagoiq) with [#2963](https://github.com/swisspost/design-system/pull/2963))

- Added new black and white alpha colors. Replaced hardcoded alpha colors with the new color definitions in `card-control` component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Updated Sass color variables: - Removed variables `$success-green`, `$error-red`, `$warning-orange`, `$success-text`, `$error-text`, `$danger` as well as the Sass map `$contextual-colors`.
  Instead use the variables `$success`, `$error`, `$warning` and the Sass map `$signal-colors`.

  - Updated the Sass map `$signal-colors` keys and added a new Sass map `$signal-background-colors`.
  - Updated the Sass map `$background-colors` and all the dependant packages accordingly.

  With the exception of the components `notification`, `toast` and `tag`, there is no component providing a `danger` variant anymore. Instead use the `error` variant. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Updated dependencies:
  - @swisspost/design-system-styles@7.0.0

## 2.1.0

### Minor Changes

- Added a new rating web-component. (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#2411](https://github.com/swisspost/design-system/pull/2411))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.6.4

## 2.0.3

### Patch Changes

- Improved display of tooltip arrow in high contrast mode. (by [@imagoiq](https://github.com/imagoiq) with [#2697](https://github.com/swisspost/design-system/pull/2697))

- Fixes an issue with the post-popover component that stopped working once trigger buttons were removed from the page or new trigger buttons were added to the page asynchronously. (by [@gfellerph](https://github.com/gfellerph) with [#2695](https://github.com/swisspost/design-system/pull/2695))
- Updated dependencies:
  - @swisspost/design-system-styles@6.6.3

## 2.0.2

### Patch Changes

- Fixed double lines between accordion items on chrome/safari. (by [@imagoiq](https://github.com/imagoiq) with [#2615](https://github.com/swisspost/design-system/pull/2615))

- Fixed two issues with tooltips and Angular integration. Tooltips are now being displayed on buttons that are added to the DOM asynchronously and tooltip elements are no longer duplicated on route change. (by [@gfellerph](https://github.com/gfellerph) with [#2621](https://github.com/swisspost/design-system/pull/2621))
- Updated dependencies:
  - @swisspost/design-system-styles@6.6.2

## 2.0.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.6.1

## 2.0.0

### Major Changes

- Restricted `post-collapsible` to collapse behaviour only. The component remains unchanged when used with external controls, however, it no longer has a `header` slot.

  Before:

  ```html
  <post-collapsible collapsed="" headingLevel="6">
    <span slot="header">Titulum</span>
    <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
  </post-collapsible>
  ```

  After:

  ```html
  <post-accordion-item collapsed="" headingLevel="6">
    <span slot="header">Titulum</span>
    <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
  </post-accordion-item>
  ```

  To get the same look and feel as in the previous version, use the `post-accordion-item` component instead. (by [@alizedebray](https://github.com/alizedebray) with [#2379](https://github.com/swisspost/design-system/pull/2379))

### Minor Changes

- Updated the tooltip `min-height` and `max-width` and added a new property arrow to the tooltip, that defines wheter or not the pointer arrow is displayed. (by [@b1aserlu](https://github.com/b1aserlu) with [#2394](https://github.com/swisspost/design-system/pull/2394))

### Patch Changes

- Update the background color of accordion to be white on any background color other than white. The accordion background remains gray on white backgrounds. (by [@alizedebray](https://github.com/alizedebray) with [#2379](https://github.com/swisspost/design-system/pull/2379))

- Added a payload to the `collapseChange` event of the `post-collapsible` component. This payload is a boolean: `true` if the collapsible was opened, `false` if it was closed. (by [@alizedebray](https://github.com/alizedebray) with [#2379](https://github.com/swisspost/design-system/pull/2379))
- Updated dependencies:
  - @swisspost/design-system-styles@6.6.0

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
