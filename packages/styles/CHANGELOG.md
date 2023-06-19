# @swisspost/design-system-styles

## 6.2.3

### Patch Changes

- Optimized floating-label controls to show placeholders. (by [@alizedebray](https://github.com/alizedebray) with [#1509](https://github.com/swisspost/design-system/pull/1509))

- Added missing definitions for italic font faces. (by [@yannikstuker](https://github.com/yannikstuker) with [#1513](https://github.com/swisspost/design-system/pull/1513))

## 6.2.2

### Patch Changes

- Fixed an issue with the stepper on mobile where the name of the last step was misaligned on mobile devices. (by [@gfellerph](https://github.com/gfellerph) with [#1317](https://github.com/swisspost/design-system/pull/1317))

- Updated dependency Bootstrap to 5.3.0 (by [@gfellerph](https://github.com/gfellerph) with [#1466](https://github.com/swisspost/design-system/pull/1466))

- Removed unused variable `$shadow-color`. It was added by mistake. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1438](https://github.com/swisspost/design-system/pull/1438))

- Fixed an issue in Safari where the input value of a floating label input field was hidden by the floating label. (by [@gfellerph](https://github.com/gfellerph) with [#1461](https://github.com/swisspost/design-system/pull/1461))

## 6.2.1

### Patch Changes

- Fixed the form-selector-button visualisation for firefox. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1323](https://github.com/swisspost/design-system/pull/1323))

- Fixed overlapping of the search input label and the search input icon in the post-search component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1367](https://github.com/swisspost/design-system/pull/1367))

- Updated badge colors. (by [@alizedebray](https://github.com/alizedebray) with [#1349](https://github.com/swisspost/design-system/pull/1349))

## 6.2.0

### Minor Changes

- Updated the new Logo in the intranet-header component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1351](https://github.com/swisspost/design-system/pull/1351))

## 6.1.0

### Minor Changes

- Updated line-heights to match accessibility requirements and added new variables for them. The new values are `$line-height-body: 1.5` for body copy (text) and `$line-height-headings: 1.2` for headings. (by [@gfellerph](https://github.com/gfellerph) with [#1298](https://github.com/swisspost/design-system/pull/1298))

- Added new font-size variables following the new naming convention of using pixel based naming. The font sizes remain defined in `rem` and the new variables are `$font-size-14`, `$font-size-16`, `$font-size-18`, `$font-size-20`, `$font-size-24`, `$font-size-28`, `$font-size-32`, `$font-size-40`, `$font-size-48` and `$font-size-56`. (by [@gfellerph](https://github.com/gfellerph) with [#1315](https://github.com/swisspost/design-system/pull/1315))

### Patch Changes

- Deprecated font-size variables `$font-size-tiny`, `$font-size-small`, `$font-size-regular`, `$font-size-bigger-regular`, `$font-size-medium`, `$font-size-large`, `$font-size-small-big`, `$font-size-big`, `$font-size-bigger-big`, `$font-size-small-huge` and `$font-size-huge`. New variables use a pixel based naming (in accordance with https://github.com/swisspost/design-system/discussions/588). (by [@gfellerph](https://github.com/gfellerph) with [#1298](https://github.com/swisspost/design-system/pull/1298))

- Updated the Angular migration schematic for ngb-buttons to work correctly whith the NgFor directive. (by [@alizedebray](https://github.com/alizedebray) with [#1311](https://github.com/swisspost/design-system/pull/1311))

- Updated heading sizes according to the new Design. (by [@gfellerph](https://github.com/gfellerph) with [#1298](https://github.com/swisspost/design-system/pull/1298))

- Deprecating variables `$display1-size`, `$display2-size`, `$display3-size`, `$display4-size`, `$display1-weight`, `$display2-weight`, `$display3-weight`, `$display4-weight` and `$display-line-height` because they are unused. (by [@gfellerph](https://github.com/gfellerph) with [#1298](https://github.com/swisspost/design-system/pull/1298))

- Deprecating the `line-height-calc` function as unused. (by [@gfellerph](https://github.com/gfellerph) with [#1298](https://github.com/swisspost/design-system/pull/1298))

- Deprecating validation-tooltips like `.valid-tooltip` and `.invalid-tooltip`. Absolutely positioned tooltips are no longer recommended for usage. Use the respective feedback classes instead. (by [@gfellerph](https://github.com/gfellerph) with [#1298](https://github.com/swisspost/design-system/pull/1298))

- Deprecated line-height variables `$line-height-tiny`, `$line-height-small`, `$line-height-regular`, `$line-height-bigger-regular`, `$line-height-medium`, `$line-height-large`, `$line-height-small-big`, `$line-height-big`, `$line-height-bigger-big`, `$line-height-small-huge` and `$line-height-huge`. They will be removed in the next major version. (by [@gfellerph](https://github.com/gfellerph) with [#1298](https://github.com/swisspost/design-system/pull/1298))

## 6.0.0

### Major Changes

- Removed the unused Sass variable `$table-head-bg`. You can use it's value `rgba(var(--post-contrast-color-rgb), 0.6)` directly as an alternative (by [@gfellerph](https://github.com/gfellerph) with [#1240](https://github.com/swisspost/design-system/pull/1240))

- Updated the markup for the stepper component in order to improve accessibility. Completed items now require the prefix "Complete" and incomplete steps are no longer links. (by [@gfellerph](https://github.com/gfellerph) with [#1232](https://github.com/swisspost/design-system/pull/1232))

- Removed deprecated ng-bootstrap Checkbox and Radio buttons and replaced them with Bootstrap button groups. (by [@alizedebray](https://github.com/alizedebray) with [#1199](https://github.com/swisspost/design-system/pull/1199))

- Major dependency update. The following versions are now supported:
  - Angular 15
  - Bootstrap 5.2.3
  - ng-bootstrap 14 (by [@gfellerph](https://github.com/gfellerph) with [#1210](https://github.com/swisspost/design-system/pull/1210))

### Minor Changes

- Decoupled the fixed and the action button styles for the alert component. Alerts can now be fixed to bottom without having action buttons and can have action buttons without being fixed to the bottom of the page. (by [@gfellerph](https://github.com/gfellerph) with [#1230](https://github.com/swisspost/design-system/pull/1230))

### Patch Changes

- Deprecated the `alert-error` and the `alert-notification` variants of the alert component. These variants will be removed in the next major version. (by [@gfellerph](https://github.com/gfellerph) with [#1214](https://github.com/swisspost/design-system/pull/1214))

- Deprecated the current sizing variables in favour of a new naming system that is more consistent with the design in Figma (by [@gfellerph](https://github.com/gfellerph) with [#1251](https://github.com/swisspost/design-system/pull/1251))

- Deprecated the font-weight classes bold, regular and light. (by [@gfellerph](https://github.com/gfellerph) with [#1216](https://github.com/swisspost/design-system/pull/1216))

- Changed the info color to light blue for alerts, notifications and contextual usage (by [@gfellerph](https://github.com/gfellerph) with [#1235](https://github.com/swisspost/design-system/pull/1235))

- Deprecated the text-auto class. It's no longer necessary in combination with background utilities. (by [@gfellerph](https://github.com/gfellerph) with [#1216](https://github.com/swisspost/design-system/pull/1216))

- Deprecated the base64 icons defined as CSS backgrounds. This technology is outdated and contributes a large amount to the CSS bloat. The current approach for using icons is the `post-icon` web-component. (by [@gfellerph](https://github.com/gfellerph) with [#1226](https://github.com/swisspost/design-system/pull/1226))

- Deprecated the post-specific sizing variables (e.g. `$size-hair`, `$size-huge`, etc.) and classes (`.m-hair`, `.mt-sm-micro`, etc.) for all of the following properties: `margin`, `padding`, `line-height`, `height`, `max-height`, `width`, `max-width` and `gap`. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1267](https://github.com/swisspost/design-system/pull/1267))

## 5.4.1

### Patch Changes

- Reverted the update to Bootstrap 5.2 and Angular 15. This update should have been a major release and will be re-released as such as soon as possible. (by [@gfellerph](https://github.com/gfellerph) with [#1207](https://github.com/swisspost/design-system/pull/1207))

## 5.4.0

### Minor Changes

- Major dependency update. The following versions are now supported:
  - Angular 15
  - Bootstrap 5.2.3
  - ng-bootstrap 14 (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1146](https://github.com/swisspost/design-system/pull/1146))

### Patch Changes

- Fixed an issue with the font size of lead text that was too small due to a specificity issue with sass placeholders. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1143](https://github.com/swisspost/design-system/pull/1143))

- Fixed an issue with floating labels on input fields that prevented the label from being truncated correctly if it was overflowing the text box (by [@gfellerph](https://github.com/gfellerph) with [#1155](https://github.com/swisspost/design-system/pull/1155))

- Updated the algorithm for calculating color contrast and optimal text color based on a given background color. Texts on colored buttons now comply with the WCAG 2.1 AA guidelines. (by [@gfellerph](https://github.com/gfellerph) with [#1154](https://github.com/swisspost/design-system/pull/1154))

## 5.3.2

### Patch Changes

- Fixed font-weight for all headings. The default is now bold (700). (by [@gfellerph](https://github.com/gfellerph) with [#1122](https://github.com/swisspost/design-system/pull/1122))

- Fixed table styles for striped, bordered and borderless tables (default HTML table) (by [@gfellerph](https://github.com/gfellerph) with [#1063](https://github.com/swisspost/design-system/pull/1063))

- Added a highlight color for validation messages in Windows High Contrast Mode so these messages are more visible (by [@gfellerph](https://github.com/gfellerph) with [#1121](https://github.com/swisspost/design-system/pull/1121))

## 5.3.1

### Patch Changes

- Fixed the default and bordered table styles (by [@gfellerph](https://github.com/gfellerph) with [#1062](https://github.com/swisspost/design-system/pull/1062))

## 5.3.0

### Minor Changes

- Added two new icons number 2307 (roll container) and 2308 (collection container) (by [@gfellerph](https://github.com/gfellerph) with [#977](https://github.com/swisspost/design-system/pull/977))

## 5.2.0

### Minor Changes

- Added a font-face definition CSS file for use with SAP cloud solutions as they need an externally hosted CSS file. (by [@gfellerph](https://github.com/gfellerph) with [#929](https://github.com/swisspost/design-system/pull/929))

### Patch Changes

- Added `bg-black` as a background utility class with automatic text color (by [@gfellerph](https://github.com/gfellerph) with [#830](https://github.com/swisspost/design-system/pull/830))

- Unwrapped complex :is selector. When integrating in another project, the `not-disabled-focus-hover` mixin causes sass to silently fail and generate an empty output. (by [@gfellerph](https://github.com/gfellerph) with [#889](https://github.com/swisspost/design-system/pull/889))

## 5.1.3

### Patch Changes

- Fixed an issue with the sidebar width. The fixed sidebar no longer spans the whole page and no longer hides the main page content beneath. (by [@gfellerph](https://github.com/gfellerph) with [#858](https://github.com/swisspost/design-system/pull/858))

## 5.1.2

### Patch Changes

- Correctly declares dependencies used in Migration Schematics for Angular projects, fixing an issue when trying to migrate projects. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#794](https://github.com/swisspost/design-system/pull/794))

- When outside days get hidden, they collapse in their flex context and change the alignment of the first days of the month. Adding flex-grow 1 ensures the hidden days still keep their space so the day labels on top match correctly with the calendar days. (by [@gfellerph](https://github.com/gfellerph) with [#793](https://github.com/swisspost/design-system/pull/793))

## 5.1.1

### Patch Changes

- Set the opacity of tooltips to 1 (fully opaque) because text is hardly legible if the tooltip has underlying content.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#784](https://github.com/swisspost/design-system/pull/784)</sup>

## 5.1.0

### Minor Changes

- Added automatic migration for bootstrap close-button component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for bg-opacity classes.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for button component btn-icon class.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for general rtl properties.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for bootstrap button component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for bootstrap form-switch component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for text-auto class.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for required form-label class.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for bootstrap blockquote component with footer.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for form-checkbox component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for post custom-select component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for forms elements.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added floating-labels migration for bootstrap form-control, form-select and textarea components.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for bootstrap badge component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration functionality which includes cheerio. This enalbes us to write migrations to mutate the html files of a project, with a simple jQuery like selector and with jQuery like update functions (e.g. $element.removeClass('test');, etc.).
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#651](https://github.com/swisspost/design-system/pull/651)</sup>

- Added automatic migration for sr-only and sr-only-focusable classes.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for bootstrap blockquote component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for post subnavigation component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for bootstrap form-radio component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for post topic-teaser component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

- Added automatic migration for ngbootstrap buttons component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#687](https://github.com/swisspost/design-system/pull/687)</sup>

## 5.0.0

### Major Changes

- Refactored the stepper component in order to facilitate its use within a project.
  <br><sup>by [@alizedebray](https://github.com/alizedebray) with [#308](https://github.com/swisspost/design-system/pull/308)</sup>

- Refactored colors. Bootstrap overrides are now clearly separated from Design System colors and only Design System colors are used in the components. This change also prepares for a dynamic dark mode by offering CSS variables for background and text contrast colors (see `buttons.scss` for an example).
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#96](https://github.com/swisspost/design-system/pull/96)</sup>

- Added requirement for `width` and `height` attributes on images in the topic-teaser component to be set to `100%`. To be able to display the image properly in firefox and safari.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#350](https://github.com/swisspost/design-system/pull/350)</sup>

- Added and extended grid-cols definition for `.topic-teaser-content` and `.topic-teaser-image-container` containers inside css and removed col classes from html. Improved image `aspect-ratios`, as well as `font-size` and `padding` of `.link-list` elements on smaller devices.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#310](https://github.com/swisspost/design-system/pull/310)</sup>

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

- Added storybook for documenting the basic styles.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#141](https://github.com/swisspost/design-system/pull/141)</sup>

- Renamed Common Web Frontend to Swiss Post Design System.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#355](https://github.com/swisspost/design-system/pull/355)</sup>

- Removed sass-variables such as `$isolate-components`. Moved bootstrap-feature variables ($enable-\*) to a separate file. These will no longer be forwarded and cannot be overriden.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#188](https://github.com/swisspost/design-system/pull/188)</sup>

- Dropped rounded and colored badges, updated dismissible badges and added checkable badges.
  <br><sup>by [@alizedebray](https://github.com/alizedebray) with [#353](https://github.com/swisspost/design-system/pull/353)</sup>

- Removed `inverted` class for the subnavigation component, which is no longer necessary when using any `bg-{colorname}` class.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#361](https://github.com/swisspost/design-system/pull/361)</sup>

- Css variables originating from the Design System are now prefixed with `--post-{variablename}`. Css variables from bootstrap are prefixed with `--bs-{variablename}`.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#361](https://github.com/swisspost/design-system/pull/361)</sup>

- Removed deprecated scss-variables `$font-size-map`, `$font-size-sm`, `$font-size-rg` and `$font-size-lg` from project, in favor of the new `$font-sizes` map.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#189](https://github.com/swisspost/design-system/pull/189)</sup>

- Refactored `font-size` and `line-height` maps with keys, for easier automation. Variables now are always accessible individually and collected in a loopable map. Font-sizes and line-heights are defined for the same sizes so it's possible to cross-reference a line-height based on font-size (see font-curve mixin).
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#115](https://github.com/swisspost/design-system/pull/115)</sup>

- Refactored background classes (`.bg-{colorname}`) for the alert and notification component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#357](https://github.com/swisspost/design-system/pull/357)</sup>

- Fixed heights on `.form-control-lg` and `.floating-label .form-control` elements. Removed some Design System only scss-variables.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#450](https://github.com/swisspost/design-system/pull/450)</sup>

### Minor Changes

- Added a story for the cards component.
  <br><sup>by [@LarissaMS](https://github.com/LarissaMS) with [#250](https://github.com/swisspost/design-system/pull/250)</sup>

- Added migrations for `ng-button` component. This will replace `.btn-primary` with `.btn.btn-secondary` on ng-button label elements.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#628](https://github.com/swisspost/design-system/pull/628)</sup>

- Added migration for `close-button` component. This will remove `.btn` and `.btn-icon` from close-button elements.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#642](https://github.com/swisspost/design-system/pull/642)</sup>

- Added a story for the badge component.
  <br><sup>by [@LarissaMS](https://github.com/LarissaMS) with [#420](https://github.com/swisspost/design-system/pull/420)</sup>

- Added a story for blockquote component.
  <br><sup>by [@LarissaMS](https://github.com/LarissaMS) with [#257](https://github.com/swisspost/design-system/pull/257)</sup>

- Added Angular migration schematics to the `@swisspost/design-system-styles` package. These migrations can be automatically applied by using the `ng update @swisspost/design-system-styles` command in your Angular project. For more information, have a look at the [migration guide](https://design-system.post.ch/).
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#611](https://github.com/swisspost/design-system/pull/611)</sup>

- Added a button story with an overview and two single button stories.
  <br><sup>by [@LarissaMS](https://github.com/LarissaMS) with [#233](https://github.com/swisspost/design-system/pull/233)</sup>

- Added migration for the subnavigation component. This will remove the `subnavigation-inverted` class from the main element.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#640](https://github.com/swisspost/design-system/pull/640)</sup>

- Added a story for topic-teaser component.
  <br><sup>by [@LarissaMS](https://github.com/LarissaMS) with [#449](https://github.com/swisspost/design-system/pull/449)</sup>

- Added migration for the topic-teaser component. This will remove the `grid` and `font-curve` classes.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#643](https://github.com/swisspost/design-system/pull/643)</sup>

- Added migration for secondary-classes. This will remove the classes `bg-secondary`, `border-secondary` and `text-secondary`.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#626](https://github.com/swisspost/design-system/pull/626)</sup>

- Added Angular migration schematics that can be executed with the `ng update` command.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#538](https://github.com/swisspost/design-system/pull/538)</sup>

### Patch Changes

- Changed the form-range component to show the pointer cursor on the thumb element.
  <br><sup>by [@LarissaMS](https://github.com/LarissaMS) with [#302](https://github.com/swisspost/design-system/pull/302)</sup>

- Added high-contrast-mode styles for the form-range component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#159](https://github.com/swisspost/design-system/pull/159)</sup>

- Fixed the contrast color used in alert component with color `success`, the close button styles and icons color in toast and alert component in high-contrast-mode.
  <br><sup>by [@Janobob](https://github.com/Janobob) with [#2](https://github.com/swisspost/design-system/pull/2)</sup>

- Removed the `postinstall` script from the `package.json` files, which was previously used to install the cypress binary in the CI environment. This is now handled on the CI environment itself.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#656](https://github.com/swisspost/design-system/pull/656)</sup>

- Added high-contrast-mode styles for form-switch component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#342](https://github.com/swisspost/design-system/pull/342)</sup>

- Fixed high-contrast-mode styles for tabs component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#252](https://github.com/swisspost/design-system/pull/252)</sup>

- Added high-contrast-mode styles for `.accordion-button` elements.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#388](https://github.com/swisspost/design-system/pull/388)</sup>

- Fixed dropdown `line-height` and an invalid `background-color` style in the intranet-header component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#253](https://github.com/swisspost/design-system/pull/253)</sup>

- Fixed heading styles. This includes the html tags `h1`, `h2`, `h3`, `h4`, `h5` and `h6`, as well as there css-class pendants `.h1`, `h2`...
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#115](https://github.com/swisspost/design-system/pull/115)</sup>

- Updated sizes for button components and reduced CSS output size.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#103](https://github.com/swisspost/design-system/pull/103)</sup>

- Refactored tabs component, to get rid of the css-class `text-auto`.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#187](https://github.com/swisspost/design-system/pull/187)</sup>

- Added styles to show floating-label `placeholder` in empty form-select component like a default input placeholder.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#169](https://github.com/swisspost/design-system/pull/169)</sup>

- Added high-contrast-mode styles for datatable component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#434](https://github.com/swisspost/design-system/pull/434)</sup>

- Fixed `border` styles in form-switch component in high-contrast-mode.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#116](https://github.com/swisspost/design-system/pull/116)</sup>

- Fixed floating-label placeholder `opacity` in high-contrast-mode.
  <br><sup>by [@LarissaMS](https://github.com/LarissaMS) with [#303](https://github.com/swisspost/design-system/pull/303)</sup>

- Added high-contrast-mode styles for all form components with class `form-control`.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#384](https://github.com/swisspost/design-system/pull/384)</sup>

- Fixed safari display error in forms components.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#433](https://github.com/swisspost/design-system/pull/433)</sup>

- Added high-contrast-mode styles for component stepper component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#164](https://github.com/swisspost/design-system/pull/164)</sup>

- Refactored styles for topic-teaser component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#162](https://github.com/swisspost/design-system/pull/162)</sup>

- Added styles and documentation for ng-datatable component loading indicator.
  <br><sup>by [@Janobob](https://github.com/Janobob) with [#7](https://github.com/swisspost/design-system/pull/7)</sup>

- Removed `border` style from the table `body` element.
  <br><sup>by [@Janobob](https://github.com/Janobob) with [#5](https://github.com/swisspost/design-system/pull/5)</sup>

- Added high-contrast-mode styles for the subnavigation component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#403](https://github.com/swisspost/design-system/pull/403)</sup>

- Added high-contrast-mode styles for the form-select component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#348](https://github.com/swisspost/design-system/pull/348)</sup>

- Added high-contrast-mode styles for the progressbar component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#153](https://github.com/swisspost/design-system/pull/153)</sup>

- Added high-contrast-mode styles for link elments. This overrides all `a`, `a:visited`, `a:focus` and `a:hover` colors with `important`, to avoid different styling for visited links in firefox.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#402](https://github.com/swisspost/design-system/pull/402)</sup>

- Added high-contrast-mode styles for the spinner component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#395](https://github.com/swisspost/design-system/pull/395)</sup>

- Added `font-size` in `.link-list` elements, without a `font-size-curve` and removed the corresponding classes from the html-example.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#310](https://github.com/swisspost/design-system/pull/310)</sup>

- Added `padding` for inner elements in nested badge component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#646](https://github.com/swisspost/design-system/pull/646)</sup>

- Moved timepicker validation fix from version 4 to version 5.
  <br><sup>by [@Janobob](https://github.com/Janobob) with [#14](https://github.com/swisspost/design-system/pull/14)</sup>

- Added high-contrast-mode styles to dropdown compoment. Added high-contrast-mode styles to the `.datatale-button` element in the datatable component.
  Fixed high-contrast-mode styles for disabled buttons.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#439](https://github.com/swisspost/design-system/pull/439)</sup>

- Added high-contrast-mode styles for the ng-timepicker component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#394](https://github.com/swisspost/design-system/pull/394)</sup>

- Included last 2 safari versions in the `.browserslistrc` and aligned `.browserslistrc` files in all projects.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#162](https://github.com/swisspost/design-system/pull/162)</sup>

- Added high-contrast-mode styles for the progressbar component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#393](https://github.com/swisspost/design-system/pull/393)</sup>

- Added story for the form-control component.
  <br><sup>by [@alizedebray](https://github.com/alizedebray) with [#560](https://github.com/swisspost/design-system/pull/560)</sup>

- Fixed `font-color` in high-contrast-mode for focussed `.form-select` and `.form-select[multiple]` elements.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#338](https://github.com/swisspost/design-system/pull/338)</sup>

- Removed unnecessary pseudo-element on open sidebar menu icon.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#419](https://github.com/swisspost/design-system/pull/419)</sup>

- Removed search button `border`, from the intranet-header component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#417](https://github.com/swisspost/design-system/pull/417)</sup>

- Add `padding` on `media-breakpoint-down(md)` in the intranet-header component.
  <br><sup>by [@LarissaMS](https://github.com/LarissaMS) with [#451](https://github.com/swisspost/design-system/pull/451)</sup>

- Fixed missing scss-variable imports in the datepicker component.
  <br><sup>by [@oliverschuerch](https://github.com/oliverschuerch) with [#460](https://github.com/swisspost/design-system/pull/460)</sup>

- Created a new package offering migration schematics for the Design System Styles. Removed custom input styles that are no longer used.
  <br><sup>by [@alizedebray](https://github.com/alizedebray) with [#183](https://github.com/swisspost/design-system/pull/183)</sup>

- Switched to the Apache 2.0 License.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#12](https://github.com/swisspost/design-system/pull/12)</sup>

- Removed license text from CSS bundles. The license is included in distributed NPM packages.
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#12](https://github.com/swisspost/design-system/pull/12)</sup>
