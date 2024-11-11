# @swisspost/design-system-demo

## 8.0.7

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.5.0
  - @swisspost/design-system-intranet-header@8.5.0
  - @swisspost/design-system-migrations@8.5.0

## 8.0.6

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.4.0
  - @swisspost/design-system-intranet-header@8.4.0
  - @swisspost/design-system-migrations@8.4.0

## 8.0.5

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.3.0
  - @swisspost/design-system-intranet-header@8.3.0
  - @swisspost/design-system-migrations@8.3.0

## 8.0.4

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.2.2
  - @swisspost/design-system-intranet-header@8.2.2
  - @swisspost/design-system-migrations@8.2.2

## 8.0.3

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.2.1
  - @swisspost/design-system-intranet-header@8.2.1
  - @swisspost/design-system-migrations@8.2.1

## 8.0.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.2.0
  - @swisspost/design-system-intranet-header@8.2.0
  - @swisspost/design-system-migrations@8.2.0

## 8.0.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.1.0
  - @swisspost/design-system-intranet-header@8.1.0
  - @swisspost/design-system-migrations@8.1.0

## 8.0.0

### Major Changes

- Upgraded to Angular 18 (by [@gfellerph](https://github.com/gfellerph) with [#3243](https://github.com/swisspost/design-system/pull/3243))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.0.0
  - @swisspost/design-system-intranet-header@8.0.0
  - @swisspost/design-system-migrations@8.0.0

## 7.3.6

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.4.0
  - @swisspost/design-system-intranet-header@7.4.0
  - @swisspost/design-system-migrations@7.4.0

## 7.3.5

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.3.1
  - @swisspost/design-system-intranet-header@7.3.1
  - @swisspost/design-system-migrations@7.3.1

## 7.3.4

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.3.0
  - @swisspost/design-system-intranet-header@7.3.0
  - @swisspost/design-system-migrations@7.3.0

## 7.3.3

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.2.1
  - @swisspost/design-system-intranet-header@7.2.1
  - @swisspost/design-system-migrations@7.2.1

## 7.3.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.2.0
  - @swisspost/design-system-intranet-header@7.2.0
  - @swisspost/design-system-migrations@7.2.0

## 7.3.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.1.0
  - @swisspost/design-system-intranet-header@7.1.0
  - @swisspost/design-system-migrations@7.1.0

## 7.3.0

### Minor Changes

- Changed mobile navigation trigger to make it more accessible by default using a button element. (by [@imagoiq](https://github.com/imagoiq) with [#2834](https://github.com/swisspost/design-system/pull/2834))

### Patch Changes

- Updated instructions to run the automated migrations from the migration package. (by [@alizedebray](https://github.com/alizedebray) with [#2783](https://github.com/swisspost/design-system/pull/2783))

- Fixed display of version switcher with new versions.json file. (by [@imagoiq](https://github.com/imagoiq) with [#2838](https://github.com/swisspost/design-system/pull/2838))

- Refactored brand colors. Renamed `$gray-background` SCSS variable to `$gray` and removed `$gray-background-light` variable because it is a duplication of the already existing variable `$light`.  
  Updated the usage of said variables in dependant packages accordingly. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Changed references from https://next.design-system.post.ch to https://design-system.post.ch after the migration of Storybook, which is now our main documentation (by [@gfellerph](https://github.com/gfellerph) with [#2802](https://github.com/swisspost/design-system/pull/2802))

- Updated Sass color variables: - Removed variables `$success-green`, `$error-red`, `$warning-orange`, `$success-text`, `$error-text`, `$danger` as well as the Sass map `$contextual-colors`.
  Instead use the variables `$success`, `$error`, `$warning` and the Sass map `$signal-colors`.

  - Updated the Sass map `$signal-colors` keys and added a new Sass map `$signal-background-colors`.
  - Updated the Sass map `$background-colors` and all the dependant packages accordingly.

  With the exception of the components `notification`, `toast` and `tag`, there is no component providing a `danger` variant anymore. Instead use the `error` variant. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Updated Angular to version 17. (by [@alizedebray](https://github.com/alizedebray) with [#2760](https://github.com/swisspost/design-system/pull/2760))
- Updated dependencies:
  - @swisspost/design-system-styles@7.0.0
  - @swisspost/design-system-migrations@7.0.0
  - @swisspost/design-system-intranet-header@7.0.0

## 7.2.4

### Patch Changes

- Fixed broken links. (by [@alizedebray](https://github.com/alizedebray) with [#2756](https://github.com/swisspost/design-system/pull/2756))
- Updated dependencies:
  - @swisspost/design-system-styles@6.6.4
  - @swisspost/design-system-intranet-header@5.0.11

## 7.2.3

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.6.3
  - @swisspost/design-system-intranet-header@5.0.10

## 7.2.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.6.2
  - @swisspost/design-system-intranet-header@5.0.9

## 7.2.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.6.1
  - @swisspost/design-system-intranet-header@5.0.8

## 7.2.0

### Minor Changes

- Added internationalization guidelines for the following ng-bootstrap components: alert, carousel, datepicker, pagination, and timepicker. (by [@alizedebray](https://github.com/alizedebray) with [#2517](https://github.com/swisspost/design-system/pull/2517))

### Patch Changes

- Updated copyright year to 2024 in the footer of all documentation. (by [@imagoiq](https://github.com/imagoiq) with [#2491](https://github.com/swisspost/design-system/pull/2491))

- Fixed links to new icons documentation. (by [@imagoiq](https://github.com/imagoiq) with [#2402](https://github.com/swisspost/design-system/pull/2402))
- Updated dependencies:
  - @swisspost/design-system-styles@6.6.0
  - @swisspost/design-system-intranet-header@5.0.7

## 7.1.2

### Patch Changes

- Documented how to translate specific labels on the ng-bootstrap datepicker. (by [@imagoiq](https://github.com/imagoiq) with [#2315](https://github.com/swisspost/design-system/pull/2315))
- Updated dependencies:
  - @swisspost/design-system-styles@6.5.1
  - @swisspost/design-system-intranet-header@5.0.6

## 7.1.1

### Patch Changes

- Updated ng-bootstrap component-based accordion example in favor of the directive-based implementation. (by [@gfellerph](https://github.com/gfellerph) with [#2368](https://github.com/swisspost/design-system/pull/2368))

- Deprecated Bootstrap accordions in favor of the post-accordion web component. (by [@alizedebray](https://github.com/alizedebray) with [#2310](https://github.com/swisspost/design-system/pull/2310))

- Update the commands to run the Design System migrations. (by [@alizedebray](https://github.com/alizedebray) with [#2270](https://github.com/swisspost/design-system/pull/2270))
- Updated dependencies:
  - @swisspost/design-system-styles@6.5.0
  - @swisspost/design-system-intranet-header@5.0.5

## 7.1.0

### Minor Changes

- Added link to new documentation (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#2142](https://github.com/swisspost/design-system/pull/2142))

- Deprecated standard HTML alerts with a close button in favor of the `post-alert` component designed to correctly handle the dismissal animation. (by [@b1aserlu](https://github.com/b1aserlu) with [#2239](https://github.com/swisspost/design-system/pull/2239))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.4.4

## 7.0.4

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.4.4
  - @swisspost/design-system-intranet-header@5.0.4

## 7.0.3

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.4.3
  - @swisspost/design-system-intranet-header@5.0.3

## 7.0.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.4.2
  - @swisspost/design-system-intranet-header@5.0.2

## 7.0.1

### Patch Changes

- Updated the installation intructions for the Intranet Header. (by [@alizedebray](https://github.com/alizedebray) with [#1942](https://github.com/swisspost/design-system/pull/1942))

- Added deprecation alerts for `.form-control-rg`, `.form-control-md`, `.form-select-rg` and `.form-select-md` form-control variants. (by [@b1aserlu](https://github.com/b1aserlu) with [#1882](https://github.com/swisspost/design-system/pull/1882))

- Fixed ngBootstrap documentation links. (by [@imagoiq](https://github.com/imagoiq) with [#1987](https://github.com/swisspost/design-system/pull/1987))
- Updated dependencies:
  - @swisspost/design-system-intranet-header@5.0.1
  - @swisspost/design-system-styles@6.4.1

## 7.0.0

### Major Changes

- Upgraded major version of Angular from v15 to v16. (by [@imagoiq](https://github.com/imagoiq) with [#1920](https://github.com/swisspost/design-system/pull/1920))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-intranet-header@5.0.0
  - @swisspost/design-system-styles@6.4.0

## 6.1.2

### Patch Changes

- Patched the documentation release workflow (by [@gfellerph](https://github.com/gfellerph) with [#1896](https://github.com/swisspost/design-system/pull/1896))

## 6.1.1

### Patch Changes

- Added the attribute type="button" to the datepicker to prevent submitting a form on click when the datepicker is directly integrated as shown on the demo page. (by [@b1aserlu](https://github.com/b1aserlu) with [#1856](https://github.com/swisspost/design-system/pull/1856))

- Deprecated the `.pi-calendar` class in favor of the `.pi-3203` class to display the calendar icon in the datepicker. (by [@alizedebray](https://github.com/alizedebray) with [#1806](https://github.com/swisspost/design-system/pull/1806))
- Updated dependencies:
  - @swisspost/design-system-styles@6.4.0
  - @swisspost/design-system-intranet-header@4.0.10

## 6.1.0

### Minor Changes

- Added a gray notification variant for cookie banners. (by [@alizedebray](https://github.com/alizedebray) with [#1350](https://github.com/swisspost/design-system/pull/1350))

### Patch Changes

- Stepper: Remove interactivity on inactive next steps. (by [@imagoiq](https://github.com/imagoiq) with [#1646](https://github.com/swisspost/design-system/pull/1646))
- Updated dependencies:
  - @swisspost/design-system-styles@6.3.0
  - @swisspost/design-system-intranet-header@4.0.9

## 6.0.8

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.2.6
  - @swisspost/design-system-intranet-header@4.0.8

## 6.0.7

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.2.5
  - @swisspost/design-system-intranet-header@4.0.7

## 6.0.6

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.2.4
  - @swisspost/design-system-intranet-header@4.0.6

## 6.0.5

### Patch Changes

- Fixed broken links to the storybook documentation. (by [@alizedebray](https://github.com/alizedebray) with [#1514](https://github.com/swisspost/design-system/pull/1514))

- Updated the link in the demo app, to the internet-header documentation. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1528](https://github.com/swisspost/design-system/pull/1528))
- Updated dependencies:
  - @swisspost/design-system-styles@6.2.3
  - @swisspost/design-system-intranet-header@4.0.5

## 6.0.4

### Patch Changes

- Update migration guide with installation instructions for precise major versions. (by [@gfellerph](https://github.com/gfellerph) with [#1473](https://github.com/swisspost/design-system/pull/1473))

- Updated the version selector to correctly display the current demo version. (by [@alizedebray](https://github.com/alizedebray) with [#1502](https://github.com/swisspost/design-system/pull/1502))

- Fixed a regression for the stepper component. Completed items should be links with a href attribute (or a routerLink in Angular) so users can navigate back to previous steps. (by [@gfellerph](https://github.com/gfellerph) with [#1497](https://github.com/swisspost/design-system/pull/1497))

- Added a simple click listener for the stepper. It's now possible to click through the steps for testing purposes. (by [@gfellerph](https://github.com/gfellerph) with [#1317](https://github.com/swisspost/design-system/pull/1317))
- Updated dependencies:
  - @swisspost/design-system-styles@6.2.2
  - @swisspost/design-system-intranet-header@4.0.4

## 6.0.3

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.2.1
  - @swisspost/design-system-intranet-header@4.0.3

## 6.0.2

### Patch Changes

- Updated the favicon and app-icons in the demo-app and the storybook documentation. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1351](https://github.com/swisspost/design-system/pull/1351))
- Updated dependencies:
  - @swisspost/design-system-styles@6.2.0
  - @swisspost/design-system-intranet-header@4.0.2

## 6.0.1

### Patch Changes

- Updated the documentation for tooltips regarding the "auto" placement option which can be used to place the tooltip where it fits if there is not enough space for the initial placement. (by [@gfellerph](https://github.com/gfellerph) with [#1288](https://github.com/swisspost/design-system/pull/1288))

- Added examples of button groups using reactive forms and having an option disabled. (by [@alizedebray](https://github.com/alizedebray) with [#1307](https://github.com/swisspost/design-system/pull/1307))

- Fixed the favicon and app-icon setup. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1296](https://github.com/swisspost/design-system/pull/1296))
- Updated dependencies:
  - @swisspost/design-system-styles@6.1.0
  - @swisspost/design-system-intranet-header@4.0.1

## 6.0.0

### Major Changes

- Removed documentation entry for the paragraph as duplicate, it's already documented under Typography (by [@gfellerph](https://github.com/gfellerph) with [#1238](https://github.com/swisspost/design-system/pull/1238))

- Updated the markup for the stepper component in order to improve accessibility. Completed items now require the prefix "Complete" and incomplete steps are no longer links. (by [@gfellerph](https://github.com/gfellerph) with [#1232](https://github.com/swisspost/design-system/pull/1232))

- Major dependency update. The following versions are now supported:
  - Angular 15
  - Bootstrap 5.2.3
  - ng-bootstrap 14 (by [@gfellerph](https://github.com/gfellerph) with [#1210](https://github.com/swisspost/design-system/pull/1210))

### Minor Changes

- Removed deprecated ng-bootstrap Checkbox and Radio buttons and replaced them with Bootstrap button groups. (by [@alizedebray](https://github.com/alizedebray) with [#1199](https://github.com/swisspost/design-system/pull/1199))

- Added a version switch to the header to keep documentation for older versions available. (by [@gfellerph](https://github.com/gfellerph) with [#1241](https://github.com/swisspost/design-system/pull/1241))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.0.0
  - @swisspost/design-system-intranet-header@4.0.0

## 5.3.1

### Patch Changes

- Reverted the update to Bootstrap 5.2 and Angular 15. This update should have been a major release and will be re-released as such as soon as possible. (by [@gfellerph](https://github.com/gfellerph) with [#1207](https://github.com/swisspost/design-system/pull/1207))
- Updated dependencies:
  - @swisspost/design-system-intranet-header@3.1.1
  - @swisspost/design-system-styles@5.4.1

## 5.3.0

### Minor Changes

- Major dependency update. The following versions are now supported:
  - Angular 15
  - Bootstrap 5.2.3
  - ng-bootstrap 14 (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1146](https://github.com/swisspost/design-system/pull/1146))

### Patch Changes

- Updated the angular version in the migration guide. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1189](https://github.com/swisspost/design-system/pull/1189))
- Updated dependencies:
  - @swisspost/design-system-intranet-header@3.1.0
  - @swisspost/design-system-styles@5.4.0

## 5.2.3

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.3.2
  - @swisspost/design-system-intranet-header@3.0.8

## 5.2.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-intranet-header@3.0.7
  - @swisspost/design-system-styles@5.3.1

## 5.2.1

### Patch Changes

- Added link to the new internet header documentation (by [@gfellerph](https://github.com/gfellerph) with [#1045](https://github.com/swisspost/design-system/pull/1045))

## 5.2.0

### Minor Changes

- Added two new icons number 2307 (roll container) and 2308 (collection container) (by [@gfellerph](https://github.com/gfellerph) with [#977](https://github.com/swisspost/design-system/pull/977))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.3.0
  - @swisspost/design-system-intranet-header@3.0.6

## 5.1.5

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.2.0
  - @swisspost/design-system-intranet-header@3.0.5

## 5.1.4

### Patch Changes

- Added import instructions to the intranet-header documentation (by [@riscie](https://github.com/riscie) with [#812](https://github.com/swisspost/design-system/pull/812))
- Updated dependencies:
  - @swisspost/design-system-styles@5.1.3
  - @swisspost/design-system-intranet-header@3.0.4

## 5.1.3

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.1.2
  - @swisspost/design-system-intranet-header@3.0.3

## 5.1.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@5.1.1
  - @swisspost/design-system-intranet-header@3.0.2

## 5.1.1

### Patch Changes

- Updated migration documentation for post topic-teaser component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Update migration documentation for bootstrap button component btn-icon class.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Updated migration documentation for bootstrap blockquote component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Updated migration documentation for bootstrap blockquote component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added migration documentation jquery accordion component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Updated the migration documentation for close-button.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Updated migration documentation for post custom-select component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Removed alert-fixed-bottom class requirement from bootstrap alert component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Updated migration documentation for bootstrap form-select component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Updated migration documentation rtl helper classes.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Updated migration documentation for bootstrap form-switch component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Moved form-label class requirement form controls to forms migration documentation.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Fixed and updated general classes bg-opacity migration documentation.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Updated migration documentation for ngbootstrap buttons component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Upated migration documentation for bootstrap `form-control`, `form-select` and `textarea` components.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Updated migration documentation post accordion component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added migration documentation for general classes sr-only and sr-only-focusable.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>
- Updated dependencies:
  - @swisspost/design-system-styles@5.1.0
  - @swisspost/design-system-intranet-header@3.0.1

## 5.1.0

### Minor Changes

- Enabled code copy to clipboard
  <br><sup>by [@alizedebray](https://github.com/alizedebray) with [#714](https://github.com/swisspost/design-system/pull/714)</sup>

## 5.0.1

### Patch Changes

- Added migration instructions for changed sass entry file names.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#696](https://github.com/swisspost/design-system/pull/696)</sup>

- Updated the target Angular version to 14 in the migration instructions. The Intranet Header is not compatible with older versions.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#698](https://github.com/swisspost/design-system/pull/698)</sup>

- Fixed typos in the migration docs and removed a duplicated entry
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#688](https://github.com/swisspost/design-system/pull/688)</sup>

- Switched to displaying the styles package version number instead of the demo app version number. The styles version is more important to developers than thenow disconnected demo version number
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#689](https://github.com/swisspost/design-system/pull/689)</sup>

## 5.0.0

### Major Changes

- Refactored the stepper component in order to facilitate its use within a project.
  <br><sup>by [@alizedebray](https://github.com/alizedebray) with [#308](https://github.com/swisspost/design-system/pull/308)</sup>

- Refactored colors. Bootstrap overrides are now clearly separated from Design System colors and only Design System colors are used in the components. This change also prepares for a dynamic dark mode by offering CSS variables for background and text contrast colors (see `buttons.scss` for an example).
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#96](https://github.com/swisspost/design-system/pull/96)</sup>

- Added and extended grid-cols definition for `.topic-teaser-content` and `.topic-teaser-image-container` containers inside css and removed col classes from html. Improved image `aspect-ratios`, as well as `font-size` and `padding` of `.link-list` elements on smaller devices.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#310](https://github.com/swisspost/design-system/pull/310)</sup>

- Renamed Common Web Frontend to Swiss Post Design System.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#355](https://github.com/swisspost/design-system/pull/355)</sup>

- Upgraded to Angular to version 14.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#406](https://github.com/swisspost/design-system/pull/406)</sup>

- Dropped rounded and colored badges, updated dismissible badges and added checkable badges.
  <br><sup>by [@alizedebray](https://github.com/alizedebray) with [#353](https://github.com/swisspost/design-system/pull/353)</sup>

- Added `font-size` in `.link-list` elements, without a `font-size-curve` and removed the corresponding classes from the html-example.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#310](https://github.com/swisspost/design-system/pull/310)</sup>

### Minor Changes

- Added searchengine-, og- and twitter-metatags for better previews when sharing links.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#674](https://github.com/swisspost/design-system/pull/674)</sup>

### Patch Changes

- Added `ng update` command for the styles package to the migration documentation.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#548](https://github.com/swisspost/design-system/pull/548)</sup>

- Added the html property `inputmode="decimal"` to the form-range example with text input control, to improve userexperience. This will open a number-only keyboard on mobile devices, when the user selects the input field.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#309](https://github.com/swisspost/design-system/pull/309)</sup>

- Refactored dynamic attribute bindings. Refactored bindings from `class="class1 class2-{{ angularVariable }}"` to `class="class1" [class]="'class2-' + {{ angularVariable }}"`.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#626](https://github.com/swisspost/design-system/pull/626)</sup>

- Updated entry file names for the styles package.

  ```scss
  @use '@swisspost/design-system-styles'; // Default internet styles
  @use '@swisspost/design-system-styles/intranet'; // Default intranet styles
  @use '@swisspost/design-system-styles/core' as post; // Variables, mixins, functions and placeholders
  ```

  1. Default import is now as simple as possible.
  2. Intranet styles are clearly named as such.
  3. Core functionality is a clear name, but for consistency with other prefixes, the core module can be namespaced as post. The usage would then be `background-color: post.$yellow;`.
     <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#389](https://github.com/swisspost/design-system/pull/389)</sup>

- Fixed heading styles. This includes the html tags `h1`, `h2`, `h3`, `h4`, `h5` and `h6`, as well as there css-class pendants `.h1`, `h2`...
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#115](https://github.com/swisspost/design-system/pull/115)</sup>

- Updated sizes for button components and reduced CSS output size.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#103](https://github.com/swisspost/design-system/pull/103)</sup>

- Refactored tabs component, to get rid of the css-class `text-auto`.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#187](https://github.com/swisspost/design-system/pull/187)</sup>

- Added styles to show floating-label `placeholder` in empty form-select component like a default input placeholder.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#169](https://github.com/swisspost/design-system/pull/169)</sup>

- Updated documentation on toast and alert components for improved accessibility and a better user experience.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#235](https://github.com/swisspost/design-system/pull/235)</sup>

- Fixed floating-label placeholder visibility in textarea component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#390](https://github.com/swisspost/design-system/pull/390)</sup>

- Fixed typo which prevented alert component from being closed properly.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#391](https://github.com/swisspost/design-system/pull/391)</sup>

- Added styles and documentation for ng-datatable component loading indicator.
  <br><sup>by [@Janobob](https://github.com/Janobob) with [#7](https://github.com/swisspost/design-system/pull/7)</sup>

- Moved timepicker validation fix from version 4 to version 5.
  <br><sup>by [@Janobob](https://github.com/Janobob) with [#14](https://github.com/swisspost/design-system/pull/14)</sup>

- Added default timeout-options for the ngbToast component, to close toast properly after mouseenter/mouseleave events.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#436](https://github.com/swisspost/design-system/pull/436)</sup>

- Deprecated the text on image card example and presented it as a no-go. It's very difficult for content editors to always ensure that text is legible on an image for every browser size and all different languages.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#387](https://github.com/swisspost/design-system/pull/387)</sup>

- Included last 2 safari versions in the `.browserslistrc` and aligned `.browserslistrc` files in all projects.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#162](https://github.com/swisspost/design-system/pull/162)</sup>

- Added label "deprecated" to the custom-select component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#416](https://github.com/swisspost/design-system/pull/416)</sup>

- Updated ngb-collapsible demo code from the ng-bootstrap documentation. Improved performance of the demo and prevented margin collapse.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#386](https://github.com/swisspost/design-system/pull/386)</sup>

- Refactored background classes (`.bg-{colorname}`) for the alert and notification component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#357](https://github.com/swisspost/design-system/pull/357)</sup>

- Added `popover` example with markup.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#346](https://github.com/swisspost/design-system/pull/346)</sup>

- Corrected and completed the property documentation for the intranet-header component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#447](https://github.com/swisspost/design-system/pull/447)</sup>

- Switched to the Apache 2.0 License.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#12](https://github.com/swisspost/design-system/pull/12)</sup>

- Fixed heights on `.form-control-lg` and `.floating-label .form-control` elements. Removed some Design System only scss-variables.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#450](https://github.com/swisspost/design-system/pull/450)</sup>
- Updated dependencies:
  - @swisspost/design-system-styles@5.0.0
  - @swisspost/design-system-intranet-header@3.0.0
