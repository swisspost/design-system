# @swisspost/design-system-documentation

## 5.3.9

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@7.4.9
  - @swisspost/design-system-components-react@7.4.9
  - @swisspost/design-system-styles@7.4.9
  - @swisspost/design-system-icons@7.4.9
  - @swisspost/internet-header@1.14.10

## 5.3.8

### Patch Changes

- Updated the avatar url, used to load a users profile picture form the intranet backend.  
  ! The required input value has recently changed !
  Due to the technical conversion of the intranet backend from Sitecore to Sharepoint, the value required for the property to display a user image has changed. Previously the user ID was required, now this property expects the user-specific e-mail address. (by [@leagrdv](https://github.com/leagrdv) with [#4218](https://github.com/swisspost/design-system/pull/4218))
- Updated dependencies:
  - @swisspost/design-system-styles@7.4.8
  - @swisspost/design-system-components@7.4.8
  - @swisspost/design-system-components-react@7.4.8
  - @swisspost/design-system-icons@7.4.8
  - @swisspost/internet-header@1.14.9

## 5.3.7

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@7.4.7
  - @swisspost/design-system-components-react@7.4.7
  - @swisspost/design-system-styles@7.4.7
  - @swisspost/design-system-icons@7.4.7
  - @swisspost/internet-header@1.14.8

## 5.3.6

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.4.6
  - @swisspost/design-system-components@7.4.6
  - @swisspost/internet-header@1.14.7
  - @swisspost/design-system-components-react@7.4.6
  - @swisspost/design-system-icons@7.4.6

## 5.3.5

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@7.4.5
  - @swisspost/design-system-components-react@7.4.5
  - @swisspost/design-system-styles@7.4.5
  - @swisspost/design-system-icons@7.4.5
  - @swisspost/internet-header@1.14.6

## 5.3.4

### Patch Changes

- Fixed the dropdown toggle in the example of the intranet header with a navigation bar. (by [@alizedebray](https://github.com/alizedebray) with [#3762](https://github.com/swisspost/design-system/pull/3762))
- Updated dependencies:
  - @swisspost/design-system-components@7.4.4
  - @swisspost/design-system-components-react@7.4.4
  - @swisspost/design-system-styles@7.4.4
  - @swisspost/design-system-icons@7.4.4
  - @swisspost/internet-header@1.14.5

## 5.3.3

### Patch Changes

- Fixed documentation release workflow. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3691](https://github.com/swisspost/design-system/pull/3691))
- Updated dependencies:
  - @swisspost/design-system-styles@7.4.3
  - @swisspost/design-system-components@7.4.3
  - @swisspost/internet-header@1.14.4
  - @swisspost/design-system-components-react@7.4.3
  - @swisspost/design-system-icons@7.4.3

## 5.3.3-patch.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.4.2
  - @swisspost/design-system-components@7.4.2
  - @swisspost/internet-header@1.14.4
  - @swisspost/design-system-components-react@7.4.2
  - @swisspost/design-system-icons@7.4.2

## 5.3.3

### Patch Changes

- Updated the `collapsed` property of the `post-collapsible` and `post-accordion-item` to toggle the content visibility throughout the component lifecycle, rather than only initially. (by [@alizedebray](https://github.com/alizedebray) with [#3205](https://github.com/swisspost/design-system/pull/3205))
- Updated dependencies:
  - @swisspost/design-system-components@7.4.1
  - @swisspost/design-system-components-react@7.4.1
  - @swisspost/design-system-styles@7.4.1
  - @swisspost/design-system-icons@7.4.1
  - @swisspost/internet-header@1.14.3

## 5.3.2

### Patch Changes

- Added the slot="tabs" attribute on the post-tab-header per default. (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#3282](https://github.com/swisspost/design-system/pull/3282))
- Updated dependencies:
  - @swisspost/design-system-icons@7.4.0
  - @swisspost/design-system-components@7.4.0
  - @swisspost/design-system-styles@7.4.0
  - @swisspost/design-system-components-react@7.4.0
  - @swisspost/internet-header@1.14.2

## 5.3.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.3.1
  - @swisspost/design-system-components@7.3.1
  - @swisspost/design-system-components-react@7.3.1
  - @swisspost/design-system-icons@7.3.1
  - @swisspost/internet-header@1.14.1

## 5.3.0

### Minor Changes

- Added a new stylesheet containing `:root` CSS custom properties to facilitate implementing styles relative to the header. This will allow putting sticky content right below the header. (by [@alizedebray](https://github.com/alizedebray) with [#3200](https://github.com/swisspost/design-system/pull/3200))

- Added the compatibility table entries for v7. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3294](https://github.com/swisspost/design-system/pull/3294))

- Added a `delayed` property to the `post-tooltip` component to allow delaying its display for a few milliseconds after it is triggered. (by [@alizedebray](https://github.com/alizedebray) with [#3245](https://github.com/swisspost/design-system/pull/3245))

- Added documentation on how to get started with the `@swisspost/design-system-styles-primeng` package. (by [@alizedebray](https://github.com/alizedebray) with [#2718](https://github.com/swisspost/design-system/pull/2718))

- Added a `post-collapsible-trigger` component to properly handle the role, ARIA attributes, and event listeners for elements that toggle a `post-collapsible`. (by [@alizedebray](https://github.com/alizedebray) with [#3209](https://github.com/swisspost/design-system/pull/3209))

### Patch Changes

- Fixed the documentation heading links by adding the rehype-slug plugin (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#3279](https://github.com/swisspost/design-system/pull/3279))

- Deprecated accent colors. (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#3195](https://github.com/swisspost/design-system/pull/3195))

- Updated tabs to improve visual continuity and readability. (by [@alizedebray](https://github.com/alizedebray) with [#3254](https://github.com/swisspost/design-system/pull/3254))

- Fixed the wrong implementation of the intranet-header changeset.md file in the changelog/intranet-header docs page. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3293](https://github.com/swisspost/design-system/pull/3293))

- Fix headers for the `versions.json` file. So it can be loaded and used from the version-switcher of older documentation pages. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3267](https://github.com/swisspost/design-system/pull/3267))

- Removed horizontal scrollbar showing up in Firefox, when a docs specific tab component is present on the page. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3268](https://github.com/swisspost/design-system/pull/3268))
- Updated dependencies:
  - @swisspost/design-system-icons@7.3.0
  - @swisspost/design-system-components@7.3.0
  - @swisspost/design-system-styles@7.3.0
  - @swisspost/internet-header@1.14.0
  - @swisspost/design-system-components-react@7.3.0

## 5.2.1

### Patch Changes

- Updated the font used for the documentation page to better distinguish storybook parts and the component preview. The preview of the components still uses Frutiger Neue for Post. (by [@gfellerph](https://github.com/gfellerph) with [#3232](https://github.com/swisspost/design-system/pull/3232))
- Updated dependencies:
  - @swisspost/design-system-styles@7.2.1
  - @swisspost/design-system-components@7.2.1
  - @swisspost/internet-header@1.13.12
  - @swisspost/design-system-components-react@7.2.1
  - @swisspost/design-system-icons@7.2.1

## 5.2.0

### Minor Changes

- Added a small variant for the textarea with floating label (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#2857](https://github.com/swisspost/design-system/pull/2857))

- Added documentation on how to use the Components for Angular with a strict Content Security Policy (CSP). (by [@alizedebray](https://github.com/alizedebray) with [#3125](https://github.com/swisspost/design-system/pull/3125))

### Patch Changes

- Fixed version switcher active state logic, to visualize the current documentation version the user browses on. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3111](https://github.com/swisspost/design-system/pull/3111))
- Updated dependencies:
  - @swisspost/design-system-icons@7.2.0
  - @swisspost/design-system-styles@7.2.0
  - @swisspost/design-system-components@7.2.0
  - @swisspost/internet-header@1.13.11
  - @swisspost/design-system-components-react@7.2.0

## 5.1.0

### Minor Changes

- Added documentation for the CSS-only stepper and deprecated the stepper based on ng-bootstrap progress bar. (by [@alizedebray](https://github.com/alizedebray) with [#3092](https://github.com/swisspost/design-system/pull/3092))

- Added the option for a Button animation to the left. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

### Patch Changes

- Updated storybook version to 8 (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

- Updated the post-accordion documentation: explicitly set the `collapsed` property to `true`, simplified `collapsed` property usage examples, and corrected misnamed `close-others` property to `multiple`. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

- Merged the card-control, checkbox-card and radio button card docs pages and updated the choice-card-control styles. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

- Fixed high-contrast-mode for card-control component. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

- Fixed the product card border missing in the documentation page. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))
- Updated dependencies:
  - @swisspost/design-system-icons@7.1.0
  - @swisspost/design-system-styles@7.1.0
  - @swisspost/internet-header@1.13.10
  - @swisspost/design-system-components@7.1.0
  - @swisspost/design-system-components-react@7.1.0

## 5.0.1

### Patch Changes

- Updated the URL to the version 6 documentation for the version switch (by [@gfellerph](https://github.com/gfellerph) with [#2970](https://github.com/swisspost/design-system/pull/2970))

## 5.0.0

### Major Changes

- Renamed badge into "chip" and improved related examples. (by [@alizedebray](https://github.com/alizedebray) with [#2855](https://github.com/swisspost/design-system/pull/2855))

### Minor Changes

- Added changelogs for all packages. (by [@alizedebray](https://github.com/alizedebray) with [#2877](https://github.com/swisspost/design-system/pull/2877))

- Added new black and white alpha colors. Replaced hardcoded alpha colors with the new color definitions in `card-control` component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Changed mobile navigation trigger to make it more accessible by default using a button element. (by [@imagoiq](https://github.com/imagoiq) with [#2834](https://github.com/swisspost/design-system/pull/2834))

- Added a new `tag` component. This component is available in standard HTML or as webcomponent. (by [@b1aserlu](https://github.com/b1aserlu) with [#2552](https://github.com/swisspost/design-system/pull/2552))

- Added a new web-component `post-card-control`, which works like a native `input[type="checkbox"]` or `input[type="radio"]` but with a custom visual design. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2260](https://github.com/swisspost/design-system/pull/2260))

- Added new focus color variables. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Added a pattern for error pages with an image. Currently available is a graphic for "404 not found" errors. More error types may be supported in the future. (by [@gfellerph](https://github.com/gfellerph) with [#2676](https://github.com/swisspost/design-system/pull/2676))

- Added migration guide for updating the @swisspost/design-system-styles from v.6 to v7. (by [@alizedebray](https://github.com/alizedebray) with [#2877](https://github.com/swisspost/design-system/pull/2877))

- Added the new default slot, to allow the integration of custom HTML in the card-control component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2844](https://github.com/swisspost/design-system/pull/2844))

### Patch Changes

- Updated instructions to run the automated migrations from the migration package. (by [@alizedebray](https://github.com/alizedebray) with [#2783](https://github.com/swisspost/design-system/pull/2783))

- Moved the style package changelog and migration guide to the "Getting Started" section of the documentation. (by [@alizedebray](https://github.com/alizedebray) with [#2877](https://github.com/swisspost/design-system/pull/2877))

- Restricted badges to showcase counts exclusively and set their color to red by default.  
  Use tags to display states, properties, or other metadata. Opt for chips when presenting dismissible or selectable information.

  Use the background utility classes to change the badge color as needed. (by [@alizedebray](https://github.com/alizedebray) with [#2860](https://github.com/swisspost/design-system/pull/2860))

- Refactored brand colors. Renamed `$gray-background` SCSS variable to `$gray` and removed `$gray-background-light` variable because it is a duplication of the already existing variable `$light`.  
  Updated the usage of said variables in dependant packages accordingly. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Fixed missing LinkTo element on post-rating docs page and removed all remaining LinkTo elements. (by [@imagoiq](https://github.com/imagoiq) with [#2962](https://github.com/swisspost/design-system/pull/2962))

- Merged toast live region section with accessibility page. (by [@imagoiq](https://github.com/imagoiq) with [#2731](https://github.com/swisspost/design-system/pull/2731))

- Prefixed all web-component custom-events with the keyword `post`.

  - Changed `post-alert` component `dismissed` event to `postDismissed`.
  - Changed `post-card-control` component `input` and `change` events to `postInput` and `postChange`.
  - Changed `post-collapsible` component `collapseChange` event to `postToggle`.
  - Changed `post-rating` component `input` and `change` events to `postInput` and `postChange`.
  - Changed `post-tabs` component `tabChange` event to `postChange`. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2874](https://github.com/swisspost/design-system/pull/2874))

- Added link to figma for all components. (by [@imagoiq](https://github.com/imagoiq) with [#2875](https://github.com/swisspost/design-system/pull/2875))

- Reworked the getting-started section to better understand the different packages and add more info about Angular. (by [@imagoiq](https://github.com/imagoiq) with [#2722](https://github.com/swisspost/design-system/pull/2722))

- Changed references from https://next.design-system.post.ch to https://design-system.post.ch after the migration of Storybook, which is now our main documentation (by [@gfellerph](https://github.com/gfellerph) with [#2802](https://github.com/swisspost/design-system/pull/2802))

- Updated Sass color variables: - Removed variables `$success-green`, `$error-red`, `$warning-orange`, `$success-text`, `$error-text`, `$danger` as well as the Sass map `$contextual-colors`.
  Instead use the variables `$success`, `$error`, `$warning` and the Sass map `$signal-colors`.

  - Updated the Sass map `$signal-colors` keys and added a new Sass map `$signal-background-colors`.
  - Updated the Sass map `$background-colors` and all the dependant packages accordingly.

  With the exception of the components `notification`, `toast` and `tag`, there is no component providing a `danger` variant anymore. Instead use the `error` variant. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Renamed input range to slider. (by [@imagoiq](https://github.com/imagoiq) with [#2792](https://github.com/swisspost/design-system/pull/2792))

- Fixed table span on Safari for the Introduction page. (by [@imagoiq](https://github.com/imagoiq) with [#2964](https://github.com/swisspost/design-system/pull/2964))
- Updated dependencies:
  - @swisspost/design-system-icons@7.0.0
  - @swisspost/design-system-styles@7.0.0
  - @swisspost/design-system-components@7.0.0
  - @swisspost/internet-header@1.13.9
  - @swisspost/design-system-components-angular@7.0.0
  - @swisspost/design-system-components-react@7.0.0
  - @swisspost/design-system-intranet-header@7.0.0

## 4.0.0

### Patch Changes

- Moved versions.json (used for version switcher) from archive to current documentation. (by [@imagoiq](https://github.com/imagoiq) with [#2748](https://github.com/swisspost/design-system/pull/2748))

- Fixed broken links. (by [@alizedebray](https://github.com/alizedebray) with [#2756](https://github.com/swisspost/design-system/pull/2756))
- Updated dependencies:
  - @swisspost/design-system-icons@1.4.0
  - @swisspost/design-system-components@2.1.0
  - @swisspost/design-system-styles@6.6.4
  - @swisspost/design-system-components-angular@2.0.0
  - @swisspost/design-system-components-react@1.0.30
  - @swisspost/internet-header@1.13.8
  - @swisspost/design-system-intranet-header@5.0.11

## 3.2.0

### Minor Changes

- Added a new documentation page about metadata. It has links to documentations about most common metadata of a webpage as well as an example of an HTML header. (by [@b1aserlu](https://github.com/b1aserlu) with [#2511](https://github.com/swisspost/design-system/pull/2511))

- Added a Button to the toolbar of Storybook to visit older versions of the documentation. (by [@b1aserlu](https://github.com/b1aserlu) with [#2635](https://github.com/swisspost/design-system/pull/2635))

- Added a documentation page for the Subnavigation Component. (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#2574](https://github.com/swisspost/design-system/pull/2574))

### Patch Changes

- Deprecated `rg` breakpoint. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2238](https://github.com/swisspost/design-system/pull/2238))

- Removed the info banner telling everyone that the storybook docs are in beta. They've grown up now. (by [@gfellerph](https://github.com/gfellerph) with [#2739](https://github.com/swisspost/design-system/pull/2739))

- Added example for intranet-header component with optionDropdownContent. (by [@imagoiq](https://github.com/imagoiq) with [#2719](https://github.com/swisspost/design-system/pull/2719))

- Added color value after color title to help for comparison. (by [@imagoiq](https://github.com/imagoiq) with [#2730](https://github.com/swisspost/design-system/pull/2730))
- Updated dependencies:
  - @swisspost/design-system-styles@6.6.3
  - @swisspost/design-system-components@2.0.3
  - @swisspost/internet-header@1.13.7
  - @swisspost/design-system-intranet-header@5.0.10
  - @swisspost/design-system-components-angular@1.0.2
  - @swisspost/design-system-components-react@1.0.29

## 3.1.0

### Minor Changes

- Added contrast ratios agains black & white to color documentation. (by [@b1aserlu](https://github.com/b1aserlu) with [#2376](https://github.com/swisspost/design-system/pull/2376))

- Added override classes to the heading documentation and removed the utitlites/headings, which was previouvly used to document the override classes. (by [@b1aserlu](https://github.com/b1aserlu) with [#2640](https://github.com/swisspost/design-system/pull/2640))

- Added a documentation page for the post spinner component. (by [@imagoiq](https://github.com/imagoiq) with [#2612](https://github.com/swisspost/design-system/pull/2612))

- Migrated documentation for card-button to storybook. (by [@b1aserlu](https://github.com/b1aserlu) with [#2619](https://github.com/swisspost/design-system/pull/2619))

### Patch Changes

- Fixed missing archive links in migrated page. (by [@imagoiq](https://github.com/imagoiq) with [#2663](https://github.com/swisspost/design-system/pull/2663))

- Removed empty pages. (by [@imagoiq](https://github.com/imagoiq) with [#2666](https://github.com/swisspost/design-system/pull/2666))

- Documented `post-accordion-item` properties on Accordion page. (by [@imagoiq](https://github.com/imagoiq) with [#2630](https://github.com/swisspost/design-system/pull/2630))

- Removed input type color variant as it is not compatible with the current input styles. (by [@imagoiq](https://github.com/imagoiq) with [#2628](https://github.com/swisspost/design-system/pull/2628))

- Documented collapseChange event from post-accordion-item on post-accordion. (by [@imagoiq](https://github.com/imagoiq) with [#2620](https://github.com/swisspost/design-system/pull/2620))

- Improved rendering of the home page for high-contrast mode. (by [@imagoiq](https://github.com/imagoiq) with [#2653](https://github.com/swisspost/design-system/pull/2653))
- Updated dependencies:
  - @swisspost/design-system-icons@1.3.0
  - @swisspost/design-system-styles@6.6.2
  - @swisspost/internet-header@1.13.6
  - @swisspost/design-system-components@2.0.2
  - @swisspost/design-system-intranet-header@5.0.9
  - @swisspost/design-system-components-angular@1.0.1
  - @swisspost/design-system-components-react@1.0.28

## 3.0.0

### Minor Changes

- Added a documentation page for the ng-bootstrap modal component. (by [@alizedebray](https://github.com/alizedebray) with [#2531](https://github.com/swisspost/design-system/pull/2531))

- Added a documentation page for the ng-bootstrap progressbar component. (by [@imagoiq](https://github.com/imagoiq) with [#2549](https://github.com/swisspost/design-system/pull/2549))

- Added a documentation page for the ng-bootstrap/post notification-overlay component. (by [@imagoiq](https://github.com/imagoiq) with [#2608](https://github.com/swisspost/design-system/pull/2608))

- Added a documentation page for the angular `custom-select` component based on the ng-bootstrap `dropdown` component. (by [@b1aserlu](https://github.com/b1aserlu) with [#2573](https://github.com/swisspost/design-system/pull/2573))

- Added a documentation page for the ng-bootstrap dropdown component. (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#2551](https://github.com/swisspost/design-system/pull/2551))

- Added a documentation page for the post stepper component. (by [@alizedebray](https://github.com/alizedebray) with [#2556](https://github.com/swisspost/design-system/pull/2556))

- Added a documentation page for the design-system migration process. (by [@imagoiq](https://github.com/imagoiq) with [#2577](https://github.com/swisspost/design-system/pull/2577))

- Added a documentation page for the ng-bootstrap typeahead component. (by [@imagoiq](https://github.com/imagoiq) with [#2547](https://github.com/swisspost/design-system/pull/2547))

- Added a documentation page for the ng-bootstrap pagination component. (by [@imagoiq](https://github.com/imagoiq) with [#2549](https://github.com/swisspost/design-system/pull/2549))

- Added a documentation page for the ng-bootstrap timepicker component. (by [@imagoiq](https://github.com/imagoiq) with [#2549](https://github.com/swisspost/design-system/pull/2549))

- Added a documentation page for the post product card component. (by [@alizedebray](https://github.com/alizedebray) with [#2580](https://github.com/swisspost/design-system/pull/2580))

- Added a getting-started docs page for the new `@swisspost/components-angular` package. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2071](https://github.com/swisspost/design-system/pull/2071))

- Added an alert warning that the documentation is in beta, it will remain until all Design System components are documented. (by [@alizedebray](https://github.com/alizedebray) with [#2563](https://github.com/swisspost/design-system/pull/2563))

### Patch Changes

- Fixed conflict between autolink anchor links and normal anchor links. (by [@imagoiq](https://github.com/imagoiq) with [#2529](https://github.com/swisspost/design-system/pull/2529))
- Updated dependencies:
  - @swisspost/design-system-icons@1.2.0
  - @swisspost/design-system-styles@6.6.1
  - @swisspost/design-system-components-angular@1.0.0
  - @swisspost/internet-header@1.13.5
  - @swisspost/design-system-components@2.0.1
  - @swisspost/design-system-intranet-header@5.0.8
  - @swisspost/design-system-components-react@1.0.27

## 2.8.1

### Patch Changes

- Added a documentation page for the ng-bootstrap progressbar component. (by [@imagoiq](https://github.com/imagoiq) with [#2545](https://github.com/swisspost/design-system/pull/2545))

- Added a documentation page for the ng-bootstrap pagination component. (by [@imagoiq](https://github.com/imagoiq) with [#2540](https://github.com/swisspost/design-system/pull/2540))

- Updated home page technologies table. (by [@imagoiq](https://github.com/imagoiq) with [#2546](https://github.com/swisspost/design-system/pull/2546))

- Migrated carousel documentation to new documentation. (by [@imagoiq](https://github.com/imagoiq) with [#2490](https://github.com/swisspost/design-system/pull/2490))
- Updated dependencies:
  - @swisspost/internet-header@1.13.4

## 2.8.0

### Minor Changes

- Added a documentation page for the ng-bootstrap datepicker component. (by [@alizedebray](https://github.com/alizedebray) with [#2518](https://github.com/swisspost/design-system/pull/2518))

- Added a deprecation message to the badge documentation. (by [@b1aserlu](https://github.com/b1aserlu) with [#2410](https://github.com/swisspost/design-system/pull/2410))

- Updated the tooltip `min-height` and `max-width` and added a new property arrow to the tooltip, that defines wheter or not the pointer arrow is displayed. (by [@b1aserlu](https://github.com/b1aserlu) with [#2394](https://github.com/swisspost/design-system/pull/2394))

### Patch Changes

- Cleaned icon component controls from duplicate and null values. (by [@imagoiq](https://github.com/imagoiq) with [#2501](https://github.com/swisspost/design-system/pull/2501))

- Documented the form patterns and added a usage sample to align buttons together in the button component page. (by [@imagoiq](https://github.com/imagoiq) with [#2463](https://github.com/swisspost/design-system/pull/2463))

- Created a `post-accordion-item` to use as children for the `post-accordion` component. It replaces the `post-collapsible` component. (by [@alizedebray](https://github.com/alizedebray) with [#2466](https://github.com/swisspost/design-system/pull/2466))

- Added autolink to headings to be able to copy anchor link more easily from the documentation. (by [@imagoiq](https://github.com/imagoiq) with [#2467](https://github.com/swisspost/design-system/pull/2467))

- Updated copyright year to 2024 in the footer of all documentation. (by [@imagoiq](https://github.com/imagoiq) with [#2491](https://github.com/swisspost/design-system/pull/2491))

- Convert LinkTo element to regular links to fix location issue. (by [@imagoiq](https://github.com/imagoiq) with [#2496](https://github.com/swisspost/design-system/pull/2496))

- Removed intranet-header nesting in sidebar. (by [@imagoiq](https://github.com/imagoiq) with [#2492](https://github.com/swisspost/design-system/pull/2492))

- Added additional information for setting up projects with content security policies that are using the `<post-icon>` component. (by [@b1aserlu](https://github.com/b1aserlu) with [#2406](https://github.com/swisspost/design-system/pull/2406))

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

- Fixed vertical rythmn which was not applied to content inside tab like Alert component. (by [@imagoiq](https://github.com/imagoiq) with [#2497](https://github.com/swisspost/design-system/pull/2497))

- Disable floating label when input is type color. (by [@imagoiq](https://github.com/imagoiq) with [#2457](https://github.com/swisspost/design-system/pull/2457))
- Updated dependencies:
  - @swisspost/design-system-icons@1.1.0
  - @swisspost/design-system-styles@6.6.0
  - @swisspost/design-system-components@2.0.0
  - @swisspost/internet-header@1.13.3
  - @swisspost/design-system-components-react@1.0.26

## 2.7.1

### Patch Changes

- Enabled import injection for components. This fixes an issue with importing dynamically loaded web components with the vite compiler for storybook. (by [@gfellerph](https://github.com/gfellerph) with [#2448](https://github.com/swisspost/design-system/pull/2448))
- Updated dependencies:
  - @swisspost/design-system-components@1.7.1
  - @swisspost/design-system-components-react@1.0.25

## 2.7.0

### Minor Changes

- Add a page on how to add custom content to the internet header main navigation. (by [@alizedebray](https://github.com/alizedebray) with [#2280](https://github.com/swisspost/design-system/pull/2280))

### Patch Changes

- Added breakpoint specific utility classes to set width to `25%`, `50%`, `75%`, `100%`, or `auto`. (by [@imagoiq](https://github.com/imagoiq) with [#2308](https://github.com/swisspost/design-system/pull/2308))

- Renamed "Text input" component to "Input". (by [@imagoiq](https://github.com/imagoiq) with [#2401](https://github.com/swisspost/design-system/pull/2401))

- Fixed vertical rhythm that didn't apply anymore since migration to Storybook v7. (by [@imagoiq](https://github.com/imagoiq) with [#2349](https://github.com/swisspost/design-system/pull/2349))
- Updated dependencies:
  - @swisspost/design-system-icons@1.0.17
  - @swisspost/internet-header@1.13.2
  - @swisspost/design-system-styles@6.5.1
  - @swisspost/design-system-components@1.7.0
  - @swisspost/design-system-components-react@1.0.24

## 2.6.0

### Minor Changes

- Added a Since v1 label on all the components that got introduced in Version 1 (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#2290](https://github.com/swisspost/design-system/pull/2290))

### Patch Changes

- Removed badge size class at wrapper level. It's only used inside the label. (by [@imagoiq](https://github.com/imagoiq) with [#2294](https://github.com/swisspost/design-system/pull/2294))

- Added small variant to floating label select. (by [@gfellerph](https://github.com/gfellerph) with [#2368](https://github.com/swisspost/design-system/pull/2368))

- Updated select styles to match design. (by [@imagoiq](https://github.com/imagoiq) with [#2312](https://github.com/swisspost/design-system/pull/2312))
- Updated dependencies:
  - @swisspost/design-system-icons@1.0.16
  - @swisspost/design-system-styles@6.5.0
  - @swisspost/internet-header@1.13.1
  - @swisspost/design-system-components@1.6.3
  - @swisspost/design-system-components-react@1.0.23

## 2.5.0

### Minor Changes

- Added a documentation page for the `.container` and `.container-fluid` classes. (by [@b1aserlu](https://github.com/b1aserlu) with [#2030](https://github.com/swisspost/design-system/pull/2030))

### Patch Changes

- Removed empty p and fix CDN examples for internet-header. (by [@imagoiq](https://github.com/imagoiq) with [#2295](https://github.com/swisspost/design-system/pull/2295))

- Added attached stories to changelog and search-icons pages to fix "Edit this page on Github" feature. (by [@imagoiq](https://github.com/imagoiq) with [#2267](https://github.com/swisspost/design-system/pull/2267))
- Updated dependencies:
  - @swisspost/design-system-icons@1.0.15
  - @swisspost/design-system-styles@6.4.4

## 2.4.0

### Minor Changes

- Added docs page on how to use columns. (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#2062](https://github.com/swisspost/design-system/pull/2062))

### Patch Changes

- Added official way to use label in a floating-label select as a placeholder. (by [@imagoiq](https://github.com/imagoiq) with [#2200](https://github.com/swisspost/design-system/pull/2200))

- Extended the `@swisspost/design-system-components` package getting-started docs page to show multiple ways how it can be used/imported in different project setups. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2214](https://github.com/swisspost/design-system/pull/2214))
- Updated dependencies:
  - @swisspost/internet-header@1.13.0
  - @swisspost/design-system-styles@6.4.4
  - @swisspost/design-system-components@1.6.2
  - @swisspost/design-system-components-react@1.0.22

## 2.3.1

### Patch Changes

- Updated dependencies:
  - @swisspost/internet-header@1.12.1
  - @swisspost/design-system-components@1.6.1
  - @swisspost/design-system-icons@1.0.14
  - @swisspost/design-system-components-react@1.0.21
  - @swisspost/design-system-styles@6.4.3

## 2.3.0

### Minor Changes

- Used the new tabs to improve the presentation of some code snippets. (by [@b1aserlu](https://github.com/b1aserlu) with [#2130](https://github.com/swisspost/design-system/pull/2130))

- Added the `post-accordion` component. (by [@alizedebray](https://github.com/alizedebray) with [#2079](https://github.com/swisspost/design-system/pull/2079))

- Added a new documentation for sizing. (by [@b1aserlu](https://github.com/b1aserlu) with [#2028](https://github.com/swisspost/design-system/pull/2028))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-icons@1.0.13
  - @swisspost/design-system-styles@6.4.3
  - @swisspost/internet-header@1.12.0
  - @swisspost/design-system-components@1.6.0
  - @swisspost/design-system-components-react@1.0.20

## 2.2.0

### Minor Changes

- Added a docs page for our spacing utilities (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#1988](https://github.com/swisspost/design-system/pull/1988))

- Added a docs page for our grid-system. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1947](https://github.com/swisspost/design-system/pull/1947))

### Patch Changes

- Refactored the grid-system: adjusted container paddings, added responsive gutter-widths. Updated grid docs. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2045](https://github.com/swisspost/design-system/pull/2045))

- Fixed the "fixed" control in the `post-alert` documentation. (by [@alizedebray](https://github.com/alizedebray) with [#2094](https://github.com/swisspost/design-system/pull/2094))
- Updated dependencies:
  - @swisspost/internet-header@1.11.0
  - @swisspost/design-system-components@1.5.1
  - @swisspost/design-system-styles@6.4.2
  - @swisspost/design-system-components-react@1.0.19

## 2.1.0

### Minor Changes

- Added the `post-tooltip` component. (by [@gfellerph](https://github.com/gfellerph) with [#1879](https://github.com/swisspost/design-system/pull/1879))

- Integrated the google tag manager and the basic events (page_context, page_change) to the documentation. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1951](https://github.com/swisspost/design-system/pull/1951))

- Created the web component variant for the alert component. (by [@alizedebray](https://github.com/alizedebray) with [#1085](https://github.com/swisspost/design-system/pull/1085))

### Patch Changes

- Used the post-icon component instead of `.pi` classes to display icons in stories. (by [@alizedebray](https://github.com/alizedebray) with [#1945](https://github.com/swisspost/design-system/pull/1945))

- Added deprecation alerts for `.form-control-rg`, `.form-control-md`, `.form-select-rg` and `.form-select-md` form-control variants. (by [@b1aserlu](https://github.com/b1aserlu) with [#1882](https://github.com/swisspost/design-system/pull/1882))
- Updated dependencies:
  - @swisspost/design-system-components@1.5.0
  - @swisspost/design-system-styles@6.4.1
  - @swisspost/internet-header@1.10.0
  - @swisspost/design-system-components-react@1.0.18

## 2.0.2

### Patch Changes

- Added a code snippet for patching missing `:has` selector support in Firefox in the Checkbox- and Radiobutton-Card stories. (by [@gfellerph](https://github.com/gfellerph) with [#1917](https://github.com/swisspost/design-system/pull/1917))
- Updated dependencies:
  - @swisspost/design-system-icons@1.0.12
  - @swisspost/design-system-styles@6.4.0

## 2.0.1

### Patch Changes

- Patched the documentation release workflow (by [@gfellerph](https://github.com/gfellerph) with [#1896](https://github.com/swisspost/design-system/pull/1896))

## 2.0.0

### Major Changes

- Updated storybook to version 7 and switched display mode to show documentation pages only (playgrounds are hidden) (by [@gfellerph](https://github.com/gfellerph) with [#1833](https://github.com/swisspost/design-system/pull/1833))

### Minor Changes

- Added the checkbox and radio-button card pattern. These two components are now available in the styles package (by [@gfellerph](https://github.com/gfellerph) with [#1607](https://github.com/swisspost/design-system/pull/1607))

- Added a foundation breakpoints docs page. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1781](https://github.com/swisspost/design-system/pull/1781))

- Added a new post-tabs component. (by [@alizedebray](https://github.com/alizedebray) with [#1181](https://github.com/swisspost/design-system/pull/1181))

### Patch Changes

- Clarified and fixed which internet-header versions are available and how to use them. (by [@imagoiq](https://github.com/imagoiq) with [#1792](https://github.com/swisspost/design-system/pull/1792))

- Added the possibility to open each demo in full screen. (by [@alizedebray](https://github.com/alizedebray) with [#1845](https://github.com/swisspost/design-system/pull/1845))
- Updated dependencies:
  - @swisspost/design-system-icons@1.0.11
  - @swisspost/design-system-styles@6.4.0
  - @swisspost/internet-header@1.9.1
  - @swisspost/design-system-components@1.4.0
  - @swisspost/design-system-components-react@1.0.17

## 1.12.0

### Minor Changes

- Added a gray notification variant for cookie banners. (by [@alizedebray](https://github.com/alizedebray) with [#1350](https://github.com/swisspost/design-system/pull/1350))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-icons@1.0.10
  - @swisspost/design-system-styles@6.3.0
  - @swisspost/internet-header@1.9.0
  - @swisspost/design-system-components@1.3.10
  - @swisspost/design-system-components-react@1.0.16

## 1.11.3

### Patch Changes

- Updated dependencies:
  - @swisspost/internet-header@1.8.3

## 1.11.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-icons@1.0.9
  - @swisspost/internet-header@1.8.2
  - @swisspost/design-system-styles@6.2.6
  - @swisspost/design-system-components@1.3.9
  - @swisspost/design-system-components-react@1.0.15

## 1.11.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-icons@1.0.8
  - @swisspost/design-system-styles@6.2.5
  - @swisspost/design-system-components@1.3.8
  - @swisspost/internet-header@1.8.1
  - @swisspost/design-system-components-react@1.0.14

## 1.11.0

### Minor Changes

- Added a "Getting started" docs page for the intranet-header. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1532](https://github.com/swisspost/design-system/pull/1532))

### Patch Changes

- Updated the paths in the post-install script examples on the "Getting Started" Icons page and added instructions regarding Content-Security-Policy. (by [@alizedebray](https://github.com/alizedebray) with [#1537](https://github.com/swisspost/design-system/pull/1537))

- Deprecated the stickyness option "full". It should not be used anymore as this mode takes up too much screen space (by [@gfellerph](https://github.com/gfellerph) with [#1551](https://github.com/swisspost/design-system/pull/1551))

- Updated the Internet Header configuration and added a shiny new button for ordering new configs or contacting the Portal Team for enquiries about environments. (by [@cococonscious](https://github.com/cococonscious) with [`484edf5`](https://github.com/swisspost/design-system/commit/484edf58c286816e97806dc1ba59dbce8c683e86))
- Updated dependencies:
  - @swisspost/internet-header@1.8.0
  - @swisspost/design-system-styles@6.2.4
  - @swisspost/design-system-components@1.3.7
  - @swisspost/design-system-components-react@1.0.13

## 1.10.0

### Minor Changes

- Added components getting started pages. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1518](https://github.com/swisspost/design-system/pull/1518))

- Included a totally new icons getting-started page. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1531](https://github.com/swisspost/design-system/pull/1531))

### Patch Changes

- Fixed broken links to the storybook documentation. (by [@alizedebray](https://github.com/alizedebray) with [#1514](https://github.com/swisspost/design-system/pull/1514))

- Added a placeholder control to the text input stories. (by [@alizedebray](https://github.com/alizedebray) with [#1509](https://github.com/swisspost/design-system/pull/1509))
- Updated dependencies:
  - @swisspost/internet-header@1.7.4
  - @swisspost/design-system-components@1.3.6
  - @swisspost/design-system-icons@1.0.7
  - @swisspost/design-system-styles@6.2.3
  - @swisspost/design-system-components-react@1.0.12

## 1.9.0

### Minor Changes

- Added getting started page for styles package. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1468](https://github.com/swisspost/design-system/pull/1468))

- Added background utility stories. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1438](https://github.com/swisspost/design-system/pull/1438))

### Patch Changes

- Reorganized internet-header and icon stories in storybook navigation. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1444](https://github.com/swisspost/design-system/pull/1444))

- Stories under hidden subhead in storybook navigation are now hidden (production only). (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1444](https://github.com/swisspost/design-system/pull/1444))
- Updated dependencies:
  - @swisspost/design-system-icons@1.0.6
  - @swisspost/design-system-styles@6.2.2
  - @swisspost/internet-header@1.7.3
  - @swisspost/design-system-components@1.3.5
  - @swisspost/design-system-components-react@1.0.11

## 1.8.4

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-icons@1.0.5
  - @swisspost/internet-header@1.7.2

## 1.8.3

### Patch Changes

- Updated dependencies:
  - @swisspost/internet-header@1.7.1
  - @swisspost/design-system-styles@6.2.1
  - @swisspost/design-system-components@1.3.4

## 1.8.2

### Patch Changes

- Updated the Logo in storybook's sidebar. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1351](https://github.com/swisspost/design-system/pull/1351))

- Updated the favicon and app-icons in the demo-app and the storybook documentation. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1351](https://github.com/swisspost/design-system/pull/1351))
- Updated dependencies:
  - @swisspost/design-system-styles@6.2.0
  - @swisspost/internet-header@1.7.0
  - @swisspost/design-system-components@1.3.4

## 1.8.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-icons@1.0.4

## 1.8.0

### Minor Changes

- Added post-icon component stories. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1312](https://github.com/swisspost/design-system/pull/1312))

- Added "Get Started" documenation page for icons package. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1312](https://github.com/swisspost/design-system/pull/1312))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-icons@1.0.3
  - @swisspost/design-system-components@1.3.4
  - @swisspost/design-system-components-react@1.0.10

## 1.7.0

### Minor Changes

- Added a story showing all interesting dependency version numbers used for this particular build of the documentation. (by [@gfellerph](https://github.com/gfellerph) with [#1284](https://github.com/swisspost/design-system/pull/1284))

### Patch Changes

- Fixed an issue with the button group story that lead to a bug for all following stories where controls did not show up and navigation was janky. (by [@gfellerph](https://github.com/gfellerph) with [#1276](https://github.com/swisspost/design-system/pull/1276))

- Fixed the favicon and app-icon setup. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1296](https://github.com/swisspost/design-system/pull/1296))
- Updated dependencies:
  - @swisspost/internet-header@1.6.0
  - @swisspost/design-system-styles@6.1.0
  - @swisspost/design-system-components@1.3.3
  - @swisspost/design-system-components-react@1.0.9

## 1.6.0

### Minor Changes

- Removed deprecated ng-bootstrap Checkbox and Radio buttons and replaced them with Bootstrap button groups. (by [@alizedebray](https://github.com/alizedebray) with [#1199](https://github.com/swisspost/design-system/pull/1199))

- Decoupled the fixed and the action button styles for the alert component. Alerts can now be fixed to bottom without having action buttons and can have action buttons without being fixed to the bottom of the page. (by [@gfellerph](https://github.com/gfellerph) with [#1230](https://github.com/swisspost/design-system/pull/1230))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-icons@1.0.2
  - @swisspost/design-system-styles@6.0.0
  - @swisspost/internet-header@1.5.6
  - @swisspost/design-system-components@1.3.2
  - @swisspost/design-system-components-react@1.0.8

## 1.5.3

### Patch Changes

- Reverted the update to Bootstrap 5.2 and Angular 15. This update should have been a major release and will be re-released as such as soon as possible. (by [@gfellerph](https://github.com/gfellerph) with [#1207](https://github.com/swisspost/design-system/pull/1207))
- Updated dependencies:
  - @swisspost/internet-header@1.5.5
  - @swisspost/design-system-components@1.3.1
  - @swisspost/design-system-styles@5.4.1
  - @swisspost/design-system-components-react@1.0.7

## 1.5.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-components@1.3.0
  - @swisspost/design-system-styles@5.4.0
  - @swisspost/internet-header@1.5.4
  - @swisspost/design-system-components-react@1.0.6

## 1.5.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-icons@1.0.1

## 1.5.0

### Minor Changes

- Added home page content. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1116](https://github.com/swisspost/design-system/pull/1116))

- Added an icon search and documentation page for the post-icon web-component (by [@gfellerph](https://github.com/gfellerph) with [#933](https://github.com/swisspost/design-system/pull/933))

- Added stories for the list utilities. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1060](https://github.com/swisspost/design-system/pull/1060))

### Patch Changes

- Added stories for the table element and a variation with buttons (by [@gfellerph](https://github.com/gfellerph) with [#1063](https://github.com/swisspost/design-system/pull/1063))

- Refactored storybooks transformSource to create better code preview output. (by [@gfellerph](https://github.com/gfellerph) with [#933](https://github.com/swisspost/design-system/pull/933))

- Fixed jsDelivr package link for the internet header (by [@gfellerph](https://github.com/gfellerph) with [#1089](https://github.com/swisspost/design-system/pull/1089))
- Updated dependencies:
  - @swisspost/design-system-icons@1.0.0
  - @swisspost/design-system-styles@5.3.2
  - @swisspost/internet-header@1.5.3
  - @swisspost/design-system-components@1.2.0
  - @swisspost/design-system-components-react@1.0.5

## 1.4.0

### Minor Changes

- Added badges to stories. Badges give important meta information about the state of a story. (by [@gfellerph](https://github.com/gfellerph) with [#1086](https://github.com/swisspost/design-system/pull/1086))

### Patch Changes

- Headings for the docs have been styled in a way that affected headings inside components. To prevent this, a more specific selector is being used now (by [@gfellerph](https://github.com/gfellerph) with [#1067](https://github.com/swisspost/design-system/pull/1067))
- Updated dependencies:
  - @swisspost/internet-header@1.5.2
  - @swisspost/design-system-components@1.1.0
  - @swisspost/design-system-styles@5.3.1

## 1.3.1

### Patch Changes

- Updated dependencies:
  - @swisspost/internet-header@1.5.1

## 1.3.0

### Minor Changes

- Added stories documenting the Swiss Post Internet Header (by [@gfellerph](https://github.com/gfellerph) with [#972](https://github.com/swisspost/design-system/pull/972))

- Added the storybook accessibility plugin which shows an Accessibility tab with various, non-conclusive tests (by [@gfellerph](https://github.com/gfellerph) with [#979](https://github.com/swisspost/design-system/pull/979))

- Added foundations/typography docs page. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#901](https://github.com/swisspost/design-system/pull/901))

- Added utilities/text docs page. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#901](https://github.com/swisspost/design-system/pull/901))

- Updated the topic-teaser stories to the current format. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#956](https://github.com/swisspost/design-system/pull/956))

- Add heading utility stories. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#955](https://github.com/swisspost/design-system/pull/955))

### Patch Changes

- Updated button stories to the latest format. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#945](https://github.com/swisspost/design-system/pull/945))

- Fixed form component id-attributes (no more duplicates between documentation- and playground-pages). (by [@oliverschuerch](https://github.com/oliverschuerch) with [#968](https://github.com/swisspost/design-system/pull/968))

- Updated the card stories to the current format. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#951](https://github.com/swisspost/design-system/pull/951))

- Updated blockquote stories to the latest format. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#944](https://github.com/swisspost/design-system/pull/944))

- Updated the heading stories to the new format. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#953](https://github.com/swisspost/design-system/pull/953))

- Updated the input stories to the new format. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#967](https://github.com/swisspost/design-system/pull/967))

- Fixed render issues of misc/changelog docs page. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#901](https://github.com/swisspost/design-system/pull/901))

- Refactored form components onChange events to ensure keyboard functionality and managed focus reset after storybook component update for a consistent user experience. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#968](https://github.com/swisspost/design-system/pull/968))

- Fix indeterminate state in checkbox stories. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#968](https://github.com/swisspost/design-system/pull/968))

- Fixed empty-string name of the topic-teaser alignment property. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#949](https://github.com/swisspost/design-system/pull/949))
- Updated dependencies:
  - @swisspost/internet-header@1.5.0
  - @swisspost/design-system-styles@5.3.0
  - @swisspost/design-system-components@1.0.6

## 1.2.0

### Minor Changes

- Added stories for bootstrap/form-switch component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#876](https://github.com/swisspost/design-system/pull/876))

- Added Storybook docs layout. Includes general `Footer` as well as `Header` and `TopicTeaser` components for the welcome page. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#904](https://github.com/swisspost/design-system/pull/904))

- Added stories to describe the bootstrap/alert component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#813](https://github.com/swisspost/design-system/pull/813))

- Refactored the bootstrap/badge component stories to match the common format. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#914](https://github.com/swisspost/design-system/pull/914))

- Added stories for the bootstrap/form-check component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#857](https://github.com/swisspost/design-system/pull/857))

- Added stories for bootstrap/range component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#902](https://github.com/swisspost/design-system/pull/902))

- Added stories for bootstrap/form-radio component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#859](https://github.com/swisspost/design-system/pull/859))

- Added stories for the component bootstrap/form-select. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#831](https://github.com/swisspost/design-system/pull/831))

- Added stories for bootstrap/toast component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#878](https://github.com/swisspost/design-system/pull/878))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.2.0
  - @swisspost/design-system-components@1.0.5

## 1.1.0

### Minor Changes

- Added stories for the component bootstrap/form-textarea. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#833](https://github.com/swisspost/design-system/pull/833))

- Added new Storybook react setup with custom Swiss Post Theme (draft), minimal page structure and draft and example stories. The new Storybook setup also includes the existing stories from the styles package (refactoring required) and is ready for cypress e2e tests. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#799](https://github.com/swisspost/design-system/pull/799))

- Added a story about headings (h1 - h6) and sub-headings. (by [@gfellerph](https://github.com/gfellerph) with [#828](https://github.com/swisspost/design-system/pull/828))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.1.3
  - @swisspost/design-system-components@1.0.4

## 1.0.0
