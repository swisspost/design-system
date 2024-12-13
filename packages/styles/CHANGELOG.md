# @swisspost/design-system-styles

## 7.4.8

## 7.4.7

## 7.4.6

### Patch Changes

- Fixed issue where the focus ring was not appearing on inactive chips. (by [@schaertim](https://github.com/schaertim) with [#3971](https://github.com/swisspost/design-system/pull/3971))

## 7.4.5

## 7.4.4

## 7.4.3

### Patch Changes

- Fixed step numbering in stepper component. Moved `counter-increment`to `stepper-link` selector to ensure correct step numbers are displayed throughout progression. (by [@schaertim](https://github.com/schaertim) with [#3513](https://github.com/swisspost/design-system/pull/3513))

## 7.4.2

### Patch Changes

- Set the `max-width` constraint of the tag component to 100% for improved accessibility. Try to keep tag text as short as possible though. (by [@gfellerph](https://github.com/gfellerph) with [#3387](https://github.com/swisspost/design-system/pull/3387))

## 7.4.1

## 7.4.0

## 7.3.1

## 7.3.0

### Minor Changes

- Added an invalid message for the card-control component and an icon in the invalid message of the checkbox and radio button (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#2978](https://github.com/swisspost/design-system/pull/2978))

- Pre-compiled CSS files are now shipped with the package to enable projects not using Sass to selectively import component styles. (by [@gfellerph](https://github.com/gfellerph) with [#3283](https://github.com/swisspost/design-system/pull/3283))

### Patch Changes

- Fixed visual issues with validated form-elements who receive focus. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3166](https://github.com/swisspost/design-system/pull/3166))

- Updated buttons colors. (by [@imagoiq](https://github.com/imagoiq) with [#2977](https://github.com/swisspost/design-system/pull/2977))

- Updated table colors on dark backgrounds. (by [@alizedebray](https://github.com/alizedebray) with [#2718](https://github.com/swisspost/design-system/pull/2718))

- Switched from light to regular font weight for most texts, excluding sub-titles. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3284](https://github.com/swisspost/design-system/pull/3284))

## 7.2.1

### Patch Changes

- Fixed a bug where the year in the datepicker got cut and fixed the icon placement in the small variant of the datepicker input. (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#3203](https://github.com/swisspost/design-system/pull/3203))

## 7.2.0

### Minor Changes

- Added a small variant for the textarea with floating label. (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#2857](https://github.com/swisspost/design-system/pull/2857))

- Updated disabled styles of form controls to have a dashed border. (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#2857](https://github.com/swisspost/design-system/pull/2857))

### Patch Changes

- Added @angular/core as an optional peer dependency to the styles package to indicate the Angular versions that are compatible with the current version of the styles. (by [@gfellerph](https://github.com/gfellerph) with [#3168](https://github.com/swisspost/design-system/pull/3168))

- Fixed an issue with icon URL declarations when building styles with esbuild. (by [@alizedebray](https://github.com/alizedebray) with [#3123](https://github.com/swisspost/design-system/pull/3123))

- Fixed the misaligned calendar icon in the datepicker input field. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3145](https://github.com/swisspost/design-system/pull/3145))

- Implemented button wrapping for overflow in button groups. (by [@alizedebray](https://github.com/alizedebray) with [#3062](https://github.com/swisspost/design-system/pull/3062))

## 7.1.0

### Minor Changes

- Added the option for a Button animation to the left. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

### Patch Changes

- Fixed missing chevron in valid and invalid select entries. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

- Updated popover styles. - Removed popover `min-width` and updated `max-width`.

  - Simplyfied popover arrow size definition.
  - Removed `:focus` selector fom `.text-auto` utility class (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

- Fixed grid-area behaviour in card-control component, if used without any icon. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3099](https://github.com/swisspost/design-system/pull/3099))

- Updated the stepper styles: changed the colors and font-weights, as well as the current step label position on smaller screens. (by [@alizedebray](https://github.com/alizedebray) with [#3088](https://github.com/swisspost/design-system/pull/3088))

- Merged the card-control, checkbox-card and radio button card docs pages and updated the choice-card-control styles. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

- Fixed high-contrast-mode for card-control component. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

- Added missing focus ring on checkbox and radio button groups. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))

## 7.0.0

### Major Changes

- Restricted badges to showcase counts exclusively and set their color to red by default.  
  Use tags to display states, properties, or other metadata. Opt for chips when presenting dismissible or selectable information.

  Use the background utility classes to change the badge color as needed. (by [@alizedebray](https://github.com/alizedebray) with [#2860](https://github.com/swisspost/design-system/pull/2860))

- Refactored brand colors. Renamed `$gray-background` SCSS variable to `$gray` and removed `$gray-background-light` variable because it is a duplication of the already existing variable `$light`.  
  Updated the usage of said variables in dependant packages accordingly. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Synchronized the versions of the following packages:

  - @swisspost/design-system-styles
  - @swisspost/design-system-components
  - @swisspost/design-system-components-react
  - @swisspost/design-system-components-angular
  - @swisspost/design-system-migrations
  - @swisspost/design-system-icons
  - @swisspost/design-system-intranet-header

  This will help understanding the dependencies between these packages at a glance but also means that for the individual pacakges, semver is no longer being used. This enables us also to talk about and document Design System versions as a whole instead of documenting the fragmented versions in a complex lookup table. (by [@gfellerph](https://github.com/gfellerph) with [#2856](https://github.com/swisspost/design-system/pull/2856))

- Added support for Angular 17 and ng-bootstrap 16. (by [@alizedebray](https://github.com/alizedebray) with [#2760](https://github.com/swisspost/design-system/pull/2760))

- Updated Sass color variables: - Removed variables `$success-green`, `$error-red`, `$warning-orange`, `$success-text`, `$error-text`, `$danger` as well as the Sass map `$contextual-colors`.
  Instead use the variables `$success`, `$error`, `$warning` and the Sass map `$signal-colors`.

  - Updated the Sass map `$signal-colors` keys and added a new Sass map `$signal-background-colors`.
  - Updated the Sass map `$background-colors` and all the dependant packages accordingly.

  With the exception of the components `notification`, `toast` and `tag`, there is no component providing a `danger` variant anymore. Instead use the `error` variant. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Renamed the badge into "chip", added a disable state and updated its styles. (by [@alizedebray](https://github.com/alizedebray) with [#2855](https://github.com/swisspost/design-system/pull/2855))

### Minor Changes

- Added new black and white alpha colors. Replaced hardcoded alpha colors with the new color definitions in `card-control` component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Changed mobile navigation trigger to make it more accessible by default using a button element. (by [@imagoiq](https://github.com/imagoiq) with [#2834](https://github.com/swisspost/design-system/pull/2834))

- Added a new `tag` component. This component is available in standard HTML or as webcomponent. (by [@b1aserlu](https://github.com/b1aserlu) with [#2552](https://github.com/swisspost/design-system/pull/2552))

- Introduced new focus style for text input and select, and added new wrapper element `.focus-control-wrapper`, `.form-range-wrapper`, `.form-select-wrapper`. (by [@imagoiq](https://github.com/imagoiq) with [#2774](https://github.com/swisspost/design-system/pull/2774))

- Added new focus color variables. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Added a pattern for error pages with an image. Currently available is a graphic for "404 not found" errors. More error types may be supported in the future. (by [@gfellerph](https://github.com/gfellerph) with [#2676](https://github.com/swisspost/design-system/pull/2676))

### Patch Changes

- Adjusted focus styles with new color for button, checkbox, radio, switch, rating elements. (by [@imagoiq](https://github.com/imagoiq) with [#2780](https://github.com/swisspost/design-system/pull/2780))

- Updated size of radio button to match design. (by [@imagoiq](https://github.com/imagoiq) with [#2737](https://github.com/swisspost/design-system/pull/2737))

- Fixed the `.form-check-input` background-color, by setting it to white on none or light backgrounds. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2260](https://github.com/swisspost/design-system/pull/2260))

- Added a workaround to display progress bar on input range and on webkit browsers without JavaScript. (by [@imagoiq](https://github.com/imagoiq) with [#2781](https://github.com/swisspost/design-system/pull/2781))

- Fixed color and border-color on hover for checkbox and radio form element. (by [@imagoiq](https://github.com/imagoiq) with [#2961](https://github.com/swisspost/design-system/pull/2961))

- Added new disabled styles for radio and checkbox, fixed color contrast on this state and fixed cursor style. (by [@imagoiq](https://github.com/imagoiq) with [#2813](https://github.com/swisspost/design-system/pull/2813))

- Fixed layout on post-alert with medium (md) breakpoint. (by [@imagoiq](https://github.com/imagoiq) with [#2775](https://github.com/swisspost/design-system/pull/2775))

- Fixed wrongly escaped Sass variables in the form-switch hcm styles, which caused problems in the styles of the card-control component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2965](https://github.com/swisspost/design-system/pull/2965))

- Replaced `system-ui` fallback font with a list of fallbacks to avoid rendering issues with specific writing system (chinese, arabic…). (by [@imagoiq](https://github.com/imagoiq) with [#2735](https://github.com/swisspost/design-system/pull/2735))

- Fixed active button color-contrast on dark background (by [@imagoiq](https://github.com/imagoiq) with [#2823](https://github.com/swisspost/design-system/pull/2823))

- Replace all parts that used the old success color with the new success-green color. (by [@imagoiq](https://github.com/imagoiq) with [#2808](https://github.com/swisspost/design-system/pull/2808))

- Fixed usage of background color on checkbox which make the checkmark invisible on dark background. (by [@imagoiq](https://github.com/imagoiq) with [#2953](https://github.com/swisspost/design-system/pull/2953))

- Made styling more coherent for forms elements with High contrast mode and focus/hover state. (by [@imagoiq](https://github.com/imagoiq) with [#2774](https://github.com/swisspost/design-system/pull/2774))

- Refactored the new focus style to only be visible when using keyboard for form elements. (by [@imagoiq](https://github.com/imagoiq) with [#2810](https://github.com/swisspost/design-system/pull/2810))

- Fixed color contrast of alert component on success background color. (by [@imagoiq](https://github.com/imagoiq) with [#2845](https://github.com/swisspost/design-system/pull/2845))

- Fixed form validation feedback color and indicators in high contrast mode. (by [@imagoiq](https://github.com/imagoiq) with [#2766](https://github.com/swisspost/design-system/pull/2766))

## 6.6.4

### Patch Changes

- Fixed color-contrast on post-tabs with dark background. (by [@imagoiq](https://github.com/imagoiq) with [#2753](https://github.com/swisspost/design-system/pull/2753))

## 6.6.3

### Patch Changes

- Updated the color of success alerts from black to white for a better contrast. (by [@alizedebray](https://github.com/alizedebray) with [#2740](https://github.com/swisspost/design-system/pull/2740))

- Fixed color-contrast on blockquote footer with dark background. (by [@imagoiq](https://github.com/imagoiq) with [#2714](https://github.com/swisspost/design-system/pull/2714))

- Fixed close icon button which is not visible on hover with light theme and high contrast mode enabled. (by [@imagoiq](https://github.com/imagoiq) with [#2705](https://github.com/swisspost/design-system/pull/2705))

- Improved display of badge and switch checked state with high contrast mode. (by [@imagoiq](https://github.com/imagoiq) with [#2706](https://github.com/swisspost/design-system/pull/2706))

- Reduced the `xxl` breakpoint size form 1441px to 1440ppx. (by [@alizedebray](https://github.com/alizedebray) with [#2741](https://github.com/swisspost/design-system/pull/2741))

- Fixed color-contrast issue on valid form-feedback. (by [@imagoiq](https://github.com/imagoiq) with [#2717](https://github.com/swisspost/design-system/pull/2717))

- Removes unwanted margin from heading within the notification overlay component. (by [@b1aserlu](https://github.com/b1aserlu) with [#2407](https://github.com/swisspost/design-system/pull/2407))

## 6.6.2

### Patch Changes

- Updated high contrast styles for the form switch component. (by [@alizedebray](https://github.com/alizedebray) with [#2667](https://github.com/swisspost/design-system/pull/2667))

- Fixed display of icons in high-contrast mode in webkit. (by [@imagoiq](https://github.com/imagoiq) with [#2638](https://github.com/swisspost/design-system/pull/2638))

- Deprecated sizes `loader-sm` and `loader-xs` for the spinner. They are replace respectively with `loader-40` and `loader-16`. (by [@imagoiq](https://github.com/imagoiq) with [#2612](https://github.com/swisspost/design-system/pull/2612))

- Removed transparent background for notification in high-contrast mode. (by [@imagoiq](https://github.com/imagoiq) with [#2653](https://github.com/swisspost/design-system/pull/2653))

- Fixed visibility of select arrow in icon in high-contrast mode with light theme. (by [@imagoiq](https://github.com/imagoiq) with [#2696](https://github.com/swisspost/design-system/pull/2696))

- Sets the font-size of h5 on small mobile devices to 16px as defined in Figma. (by [@gfellerph](https://github.com/gfellerph) with [#2610](https://github.com/swisspost/design-system/pull/2610))

## 6.6.1

### Patch Changes

- Updated `form-control` and `form-select` sizes and added support for floating label small size variant. (by [@imagoiq](https://github.com/imagoiq) with [#2396](https://github.com/swisspost/design-system/pull/2396))

## 6.6.0

### Minor Changes

- Deprecation of legacy grid classes:
  - `.vertical-gutters` (use gutter classes instead, e.g. `.g-*`, `.gy-*` or `.gx-*`)
  - `.row.border-gutters`
  - `.container-reset`
  - `.container-reset-left` and `.container-reset-right`
  - `.container-fluid-#{$breakpoint}` (by [@b1aserlu](https://github.com/b1aserlu) with [#2400](https://github.com/swisspost/design-system/pull/2400))

### Patch Changes

- Fixed the alignment of icons on datatable buttons. (by [@imagoiq](https://github.com/imagoiq) with [#2500](https://github.com/swisspost/design-system/pull/2500))

- Updated styles for the `.is-valid` class. (by [@imagoiq](https://github.com/imagoiq) with [#2391](https://github.com/swisspost/design-system/pull/2391))

- Update the background color of accordion to be white on any background color other than white. The accordion background remains gray on white backgrounds. (by [@alizedebray](https://github.com/alizedebray) with [#2379](https://github.com/swisspost/design-system/pull/2379))

- Fixed a visual regression on the intranet-header with a sidenav. (by [@imagoiq](https://github.com/imagoiq) with [#2521](https://github.com/swisspost/design-system/pull/2521))

## 6.5.1

### Patch Changes

- Added breakpoint specific utility classes to set width to `25%`, `50%`, `75%`, `100%`, or `auto`. (by [@imagoiq](https://github.com/imagoiq) with [#2308](https://github.com/swisspost/design-system/pull/2308))

- Changed color of text on the success background (#2c911c) to white from black for better contrast according to WCAG 3.0 (by [@b1aserlu](https://github.com/b1aserlu) with [#2358](https://github.com/swisspost/design-system/pull/2358))

- Converted padding-bottom to margin after tabs-content so it doesn't impact vertical rhythm. (by [@imagoiq](https://github.com/imagoiq) with [#2349](https://github.com/swisspost/design-system/pull/2349))

- Fixed close button color in high contrast mode. The button is now visible when forced colors are active. (by [@gfellerph](https://github.com/gfellerph) with [#2109](https://github.com/swisspost/design-system/pull/2109))

## 6.5.0

### Minor Changes

- Separated the migration schematics from the styles to their own package `@swisspost/design-system-migrations`. (by [@alizedebray](https://github.com/alizedebray) with [#2270](https://github.com/swisspost/design-system/pull/2270))

### Patch Changes

- Updated the accordion styles. (by [@alizedebray](https://github.com/alizedebray) with [#2310](https://github.com/swisspost/design-system/pull/2310))

- Fixed overflow on datepicker select variant. (by [@imagoiq](https://github.com/imagoiq) with [#2319](https://github.com/swisspost/design-system/pull/2319))

- Added small variant to floating label select. (by [@gfellerph](https://github.com/gfellerph) with [#2368](https://github.com/swisspost/design-system/pull/2368))

- Updated select styles to match design. (by [@imagoiq](https://github.com/imagoiq) with [#2312](https://github.com/swisspost/design-system/pull/2312))

- Fixed intranet-header sticky navigation on mobile which prevent interactivity on the page within a certain viewport width. (by [@imagoiq](https://github.com/imagoiq) with [#2320](https://github.com/swisspost/design-system/pull/2320))

- Fixed spacing regression on form switch label. (by [@imagoiq](https://github.com/imagoiq) with [#2356](https://github.com/swisspost/design-system/pull/2356))

- Fixed active color and chevron display of the ngb-pagination component in High Contrast Mode. (by [@imagoiq](https://github.com/imagoiq) with [#2366](https://github.com/swisspost/design-system/pull/2366))

- Transformed the gap between the label and the radio/checkbox/switch into a clickable area. (by [@imagoiq](https://github.com/imagoiq) with [#2333](https://github.com/swisspost/design-system/pull/2333))

## 6.4.4

### Patch Changes

- Added official way to use label in a floating-label select as a placeholder. (by [@imagoiq](https://github.com/imagoiq) with [#2200](https://github.com/swisspost/design-system/pull/2200))

- Fixed display of button-group input when using checkbox or radio variant. (by [@imagoiq](https://github.com/imagoiq) with [#2133](https://github.com/swisspost/design-system/pull/2133))

- Fixed offset of radio button when checked and in inline layout. (by [@imagoiq](https://github.com/imagoiq) with [#2065](https://github.com/swisspost/design-system/pull/2065))

- The following placeholders from the `\_text.scss` file are depreacted an will be removed in a future version: `%list-adjustment`, `%module-container`, `%default-module-spacer`, `%text-container`. (by [@b1aserlu](https://github.com/b1aserlu) with [#2171](https://github.com/swisspost/design-system/pull/2171))

- Fixed default icon flashing when using a `post-icon` on alerts. (by [@imagoiq](https://github.com/imagoiq) with [#2244](https://github.com/swisspost/design-system/pull/2244))

## 6.4.3

### Patch Changes

- Changed dropdown icon for the select component and adjusted the size of the icon. (by [@b1aserlu](https://github.com/b1aserlu) with [#2164](https://github.com/swisspost/design-system/pull/2164))

- Added `table-mono` variant for table component. (by [@imagoiq](https://github.com/imagoiq) with [#2106](https://github.com/swisspost/design-system/pull/2106))

- Set a `max-width` for badges and add ellipsis for overflowing text. (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#1892](https://github.com/swisspost/design-system/pull/1892))

- Applied autoprefixer to distributed sass files. Sass files will now contain prefixes for supported browsers according to the browserslist file. (by [@imagoiq](https://github.com/imagoiq) with [#2115](https://github.com/swisspost/design-system/pull/2115))

## 6.4.2

### Patch Changes

- Refactored the grid-system: adjusted container paddings, added responsive gutter-widths. Updated grid docs. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2045](https://github.com/swisspost/design-system/pull/2045))

- Added small variants for checkbox and radio buttons. Lowered font-size of validation blocks for form elements. (by [@imagoiq](https://github.com/imagoiq) with [#2086](https://github.com/swisspost/design-system/pull/2086))

- Fixed missing active tab border on HTML component. (by [@imagoiq](https://github.com/imagoiq) with [#2037](https://github.com/swisspost/design-system/pull/2037))

- Fixed active switch control showing a check icon in Chrome. (by [@alizedebray](https://github.com/alizedebray) with [#2090](https://github.com/swisspost/design-system/pull/2090))

## 6.4.1

### Patch Changes

- Removed bound between logo and language to allow any language to display the logo. (by [@imagoiq](https://github.com/imagoiq) with [#2009](https://github.com/swisspost/design-system/pull/2009))

- Reduced the gap between the alert body and action buttons. (by [@alizedebray](https://github.com/alizedebray) with [#1085](https://github.com/swisspost/design-system/pull/1085))

- Removed duplicated close button on toast when using ngx-toastr programatically. (by [@imagoiq](https://github.com/imagoiq) with [#2011](https://github.com/swisspost/design-system/pull/2011))

- Updated and added the gaps between the title and the link-list in the `.topic-teaser-content` class to comply with the figma design. (by [@b1aserlu](https://github.com/b1aserlu) with [#1927](https://github.com/swisspost/design-system/pull/1927))

- Added missing pointer-events to allow a dismissible toast to be closed interactively. (by [@imagoiq](https://github.com/imagoiq) with [#2008](https://github.com/swisspost/design-system/pull/2008))

- Updated icons to display as mask images, this way their color can be set by adjusting the CSS `background-color` property. (by [@alizedebray](https://github.com/alizedebray) with [#1945](https://github.com/swisspost/design-system/pull/1945))

## 6.4.0

### Minor Changes

- Added the checkbox and radio-button card pattern. These two components are now available in the styles package (by [@gfellerph](https://github.com/gfellerph) with [#1607](https://github.com/swisspost/design-system/pull/1607))

### Patch Changes

- Deprecated sizes "regular" and "medium" for text inputs, textareas and select boxes. Future major versions of the Design System will only support the sizes "small" and "large". This change will make it easier to decide what variant to use where: small for internal applications, large for customer facing external applications. (by [@gfellerph](https://github.com/gfellerph) with [#1837](https://github.com/swisspost/design-system/pull/1837))

- Fixed a bug with the ngb-dropdown where the chevron was not shown on primary buttons. This use case is now documented and white chevrons are shown. (by [@gfellerph](https://github.com/gfellerph) with [#1890](https://github.com/swisspost/design-system/pull/1890))

- Fixed the `.pi-calendar` class not showing an icon in the datepicker. (by [@alizedebray](https://github.com/alizedebray) with [#1806](https://github.com/swisspost/design-system/pull/1806))

- Fixed datepicker input value that was overlapping with the calendar button on very narrow datepickers. (by [@gfellerph](https://github.com/gfellerph) with [#1886](https://github.com/swisspost/design-system/pull/1886))

- Fixed a problem where textarea and multiselect had an unexpected height when regular size (form-control-rg / form-select-rg) was used. (by [@b1aserlu](https://github.com/b1aserlu) with [#1830](https://github.com/swisspost/design-system/pull/1830))

- Added a new post-tabs component. (by [@alizedebray](https://github.com/alizedebray) with [#1181](https://github.com/swisspost/design-system/pull/1181))

## 6.3.0

### Minor Changes

- Added a gray notification variant for cookie banners. (by [@alizedebray](https://github.com/alizedebray) with [#1350](https://github.com/swisspost/design-system/pull/1350))

### Patch Changes

- Updated close button styles for Alerts, Toasts, Badges, and Modals. It now has the same colors as the tertiary buttons to be accessible on all our backgrounds. (by [@alizedebray](https://github.com/alizedebray) with [#1350](https://github.com/swisspost/design-system/pull/1350))

- Added custom resizer for textarea elements. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1765](https://github.com/swisspost/design-system/pull/1765))

- Update button styles: padding, gap and border-radius. (by [@imagoiq](https://github.com/imagoiq) with [#1666](https://github.com/swisspost/design-system/pull/1666))

- Updated alert and toast styles.  
  Deprecated classes for alerts/notifications:

  - alert-error becomes alert-danger
  - alert-notification becomes alert-primary
  - toast-notification becomes toast-primary (by [@alizedebray](https://github.com/alizedebray) with [#1350](https://github.com/swisspost/design-system/pull/1350))

- Stepper:

  - Normalize font styles and weights.
  - Position the step label under the badge on small viewport.
  - Center the step label when its is multiline.
  - Use hover step label color only on interactive step.
  - Add contrasted step label color on focus. (by [@imagoiq](https://github.com/imagoiq) with [#1646](https://github.com/swisspost/design-system/pull/1646))

- Adjusted the gap inside the badge. (by [@b1aserlu](https://github.com/b1aserlu) with [#1772](https://github.com/swisspost/design-system/pull/1772))

- Fixed collapsible/accordion styles that broke after Bootstrap removed several CSS custom properties. (by [@alizedebray](https://github.com/alizedebray) with [#1324](https://github.com/swisspost/design-system/pull/1324))

## 6.2.6

### Patch Changes

- Updated button styles:
  - Reduced horizontal padding of tertiary buttons.
  - Updated font-size progression according to button size.
  - Changed transparent color to full-tone colors.
  - Updated the font-color and border-color of secondary and tertiary buttons. (by [@imagoiq](https://github.com/imagoiq) with [#1635](https://github.com/swisspost/design-system/pull/1635))

## 6.2.5

### Patch Changes

- Fixed the placeholder for the file upload in Safari. It's no longer cut off and pluralisation for the button label with a `multiple` attribute is now supported. Also fixed padding when the state is valid or invalid. (by [@imagoiq](https://github.com/imagoiq) with [#1614](https://github.com/swisspost/design-system/pull/1614))

## 6.2.4

### Patch Changes

- Fix an issue with two empty CSS files in the styles package. Empty files are no longer delivered. (by [@imagoiq](https://github.com/imagoiq) with [#1600](https://github.com/swisspost/design-system/pull/1600))

- Fixed default font-size and weight of the legend element (by [@geekrumper](https://github.com/geekrumper) with [#1512](https://github.com/swisspost/design-system/pull/1512))

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
