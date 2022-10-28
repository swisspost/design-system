# @swisspost/design-system-styles

## 5.0.0-beta.3

### Minor Changes

- [#628](https://github.com/swisspost/design-system/pull/628) [`3291c55`](https://github.com/swisspost/design-system/commit/3291c550a579a85c502a4545869f45d10a7e5874) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds migrations for ng-button. This will replace `btn-primary` with `btn btn-secondary` on ng-button label elements.

- [#642](https://github.com/swisspost/design-system/pull/642) [`72a5659`](https://github.com/swisspost/design-system/commit/72a56598d4e6d7d35647424247c28ec68953d3ee) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds migration for close-button. This will remove `btn` and `btn-icon` from close-button elements.

- [#611](https://github.com/swisspost/design-system/pull/611) [`c6525ef`](https://github.com/swisspost/design-system/commit/c6525ef254a8ac1457a4af2e31efac68fb07eba3) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds Angular migration Schematics to the @swisspost/design-system-styles package. These migrations will be automatically triggered when using `ng update @swisspost/design-system-styles` in your Angular project. For more information, have a look at the [migration guide](https://design-system.post.ch/).

- [#484](https://github.com/swisspost/design-system/pull/484) [`003cf86`](https://github.com/swisspost/design-system/commit/003cf86513cde0e88e0c3a1fda05025db9a2ad93) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds storybook snapshots with the power of percy and cypress.

- [#640](https://github.com/swisspost/design-system/pull/640) [`48b4ba7`](https://github.com/swisspost/design-system/commit/48b4ba7b574c4ed92c2a84e7fc1d5a219427f09a) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Add migration for post-subnavigation. This will remove the `subnavigation-inverted` class from the main element.

- [#643](https://github.com/swisspost/design-system/pull/643) [`2f37742`](https://github.com/swisspost/design-system/commit/2f37742f4026de9c9e66ece95409bdc9d3dbd66a) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds migration for topic-teaser. This will remove grid- and font-curve-classes.

- [#626](https://github.com/swisspost/design-system/pull/626) [`8b6a08b`](https://github.com/swisspost/design-system/commit/8b6a08bd5fbbfa6e29738cf7bcf3ed28ed99b656) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds migration for secondary-classes, this will remove `bg-secondary`, `border-secondary` and `text-secondary`.

### Patch Changes

- [#646](https://github.com/swisspost/design-system/pull/646) [`44da6be`](https://github.com/swisspost/design-system/commit/44da6beebaf3e4a3bdbdec9ab90ef377f6a0ae67) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds padding for inner nested badges.

## 5.0.0-beta.2

### Minor Changes

- [#538](https://github.com/swisspost/design-system/pull/538) [`7379fe8`](https://github.com/swisspost/design-system/commit/7379fe8e9a8dd4461539812524eeca631a827128) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Add Angular migration schematics that will be executed on `ng update`

### Patch Changes

- [#560](https://github.com/swisspost/design-system/pull/560) [`6a719e2`](https://github.com/swisspost/design-system/commit/6a719e2eaf7409e0700f4e609303845086fe6904) Thanks [@alizedebray](https://github.com/alizedebray)! - Added story for the form control styles

## 5.0.0-beta.1

### Minor Changes

- [#449](https://github.com/swisspost/design-system/pull/449) [`971987d`](https://github.com/swisspost/design-system/commit/971987d839782028fd440c2cc4ceb6a5d3314b48) Thanks [@LarissaMS](https://github.com/LarissaMS)! - Added a story for topic-teaser

### Patch Changes

- [#460](https://github.com/swisspost/design-system/pull/460) [`a96b7b8`](https://github.com/swisspost/design-system/commit/a96b7b8eec5731dc20251296e4849a7b2be2eb2b) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Fixes missing component variables import.

## 5.0.0-beta.0

### Major Changes

- [`894197f`](https://github.com/swisspost/design-system/commit/894197f1c3683e88ab102eed7ebee2c3f434e821) Thanks [@gfellerph](https://github.com/gfellerph)! - Fixes form-control-lg and form-floating form-control heights.
  Removed some DesignSystem only SCSS variables.

### Minor Changes

- [`894197f`](https://github.com/swisspost/design-system/commit/894197f1c3683e88ab102eed7ebee2c3f434e821) Thanks [@gfellerph](https://github.com/gfellerph)! - Add a story for badges

### Patch Changes

- [`894197f`](https://github.com/swisspost/design-system/commit/894197f1c3683e88ab102eed7ebee2c3f434e821) Thanks [@gfellerph](https://github.com/gfellerph)! - Adds high-contrast-mode/forced-color styles

* [`894197f`](https://github.com/swisspost/design-system/commit/894197f1c3683e88ab102eed7ebee2c3f434e821) Thanks [@gfellerph](https://github.com/gfellerph)! - Fixes safari display error.

- [`894197f`](https://github.com/swisspost/design-system/commit/894197f1c3683e88ab102eed7ebee2c3f434e821) Thanks [@gfellerph](https://github.com/gfellerph)! - Add high-contrast-mode/forced-color styles for component subnavigation.

* [`894197f`](https://github.com/swisspost/design-system/commit/894197f1c3683e88ab102eed7ebee2c3f434e821) Thanks [@gfellerph](https://github.com/gfellerph)! - Adds high-contrast-mode/forced-color styles to links. Overrides all a, a:visited, a:focus and a:hover colors with LinkText !important, to avoid different styling for visited links in firefox.

- [`894197f`](https://github.com/swisspost/design-system/commit/894197f1c3683e88ab102eed7ebee2c3f434e821) Thanks [@gfellerph](https://github.com/gfellerph)! - Adds hcm styles to component dropdown.
  Adds hcm styles to element datatable-button of component datatable.
  Fixes disabled buttons highlighting in hcm.

* [`894197f`](https://github.com/swisspost/design-system/commit/894197f1c3683e88ab102eed7ebee2c3f434e821) Thanks [@gfellerph](https://github.com/gfellerph)! - Removes unnecessary pseudo-element on open sidebar menu-icon.

- [`894197f`](https://github.com/swisspost/design-system/commit/894197f1c3683e88ab102eed7ebee2c3f434e821) Thanks [@gfellerph](https://github.com/gfellerph)! - Removed border from intranet-header search button.

* [`894197f`](https://github.com/swisspost/design-system/commit/894197f1c3683e88ab102eed7ebee2c3f434e821) Thanks [@gfellerph](https://github.com/gfellerph)! - Add padding for media-breakpoint-down(md)

## 5.0.0-alpha.7

### Major Changes

- [#308](https://github.com/swisspost/design-system/pull/308) [`13512df`](https://github.com/swisspost/design-system/commit/13512df3ad745b81561aca5e0687e50d8f582b35) Thanks [@alizedebray](https://github.com/alizedebray)! - Refactored the stepper component in order to facilitate its use within a project

* [#350](https://github.com/swisspost/design-system/pull/350) [`b13de55`](https://github.com/swisspost/design-system/commit/b13de555840cc1ae56b2f7ce846947aa9fca9479) Thanks [@gfellerph](https://github.com/gfellerph)! - Topic teaser images need width and height attributes set to 100% so they're properly displayed in Firefox and Safari

- [#310](https://github.com/swisspost/design-system/pull/310) [`63c269d`](https://github.com/swisspost/design-system/commit/63c269d38d4806e9af1786209623a5732a28ee09) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds and extends grid-cols definition for .topic-teaser-content and .topic-teaser-image-container containers inside css and removes col classes from html. This ensures that the widths of these containers cannot be changed too easily.
  Improves image aspect-ratios, as well as font-sizes and paddings of link-list links on smaller devices.

* [#389](https://github.com/swisspost/design-system/pull/389) [`9265af8`](https://github.com/swisspost/design-system/commit/9265af8e9e87d8f0fcd97c05142ec69a6660b5d1) Thanks [@gfellerph](https://github.com/gfellerph)! - Update entry file names for the styles package.

  @use '@swisspost/design-system-styles'; (Default internet styles)
  @use '@swisspost/design-system-styles/intranet'; (Default intranet styles)
  @use '@swisspost/design-system-styles/core' as post; (Variables, mixins, functions and placeholders)

  1. Default import is as simple as possible
  2. Intranet styles are clearly named as such
  3. Core functionality is a clear name, but for consistency with other prefixes, the core module can be namespaced as post. The usage would then be background-color: post.\$yellow;

- [#355](https://github.com/swisspost/design-system/pull/355) [`256b9d8`](https://github.com/swisspost/design-system/commit/256b9d863f16e06dbbf5fc99c3daeb8104d7813f) Thanks [@gfellerph](https://github.com/gfellerph)! - Rename Common Web Frontend to Swiss Post Design System

* [#188](https://github.com/swisspost/design-system/pull/188) [`7be9c03`](https://github.com/swisspost/design-system/commit/7be9c033bd9f2c6eeb788aa3c0df32b4dcd96047) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Removed option-variables such as $isolate-components.
  Moved bootstrap-feature variables ($enable-\*) to a separate file. These will no longer be forwarded and cannot be overriden.

- [#353](https://github.com/swisspost/design-system/pull/353) [`412d640`](https://github.com/swisspost/design-system/commit/412d6408b3dc6b1d139e53619e309136d1e53eaa) Thanks [@alizedebray](https://github.com/alizedebray)! - - Dropped rounded badges
  - Dropped colored badges
  - Updated dismissible badges
  - Added checkable badges

* [#361](https://github.com/swisspost/design-system/pull/361) [`2b52044`](https://github.com/swisspost/design-system/commit/2b52044195834330b0e1af44b3820425e4420670) Thanks [@gfellerph](https://github.com/gfellerph)! - Removed inverted class for the subnavigation which is no longer necessary when using any bg-\* class

- [#361](https://github.com/swisspost/design-system/pull/361) [`2b52044`](https://github.com/swisspost/design-system/commit/2b52044195834330b0e1af44b3820425e4420670) Thanks [@gfellerph](https://github.com/gfellerph)! - Css variables originating from the Design System are now prefixed with --post-_. Css variables from bootstrap are prefixed with --bs-_

* [#357](https://github.com/swisspost/design-system/pull/357) [`ccbc77a`](https://github.com/swisspost/design-system/commit/ccbc77a731c6861cb1b74cbbea8daa96f1258a46) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Refactors backgrounds for bg-\* classes, alerts and notifications.

### Minor Changes

- [#250](https://github.com/swisspost/design-system/pull/250) [`8235cfa`](https://github.com/swisspost/design-system/commit/8235cfae6890de9b2507ce55adc9383016d15799) Thanks [@LarissaMS](https://github.com/LarissaMS)! - Added a story for cards

* [#257](https://github.com/swisspost/design-system/pull/257) [`f3c6118`](https://github.com/swisspost/design-system/commit/f3c61182b16282b6884dd0fe31fe3235677b079d) Thanks [@LarissaMS](https://github.com/LarissaMS)! - Added a story for blockquotes

- [#233](https://github.com/swisspost/design-system/pull/233) [`63c5676`](https://github.com/swisspost/design-system/commit/63c567635598dfac90cac55f0172dbc3f94ba465) Thanks [@LarissaMS](https://github.com/LarissaMS)! - Adds a button story with an overview and two single button stories

### Patch Changes

- [#302](https://github.com/swisspost/design-system/pull/302) [`2c30112`](https://github.com/swisspost/design-system/commit/2c30112a12094b2d10465e57ce8a651a4c0cd96f) Thanks [@LarissaMS](https://github.com/LarissaMS)! - Changed cursor to pointer

* [#249](https://github.com/swisspost/design-system/pull/249) [`00d2d78`](https://github.com/swisspost/design-system/commit/00d2d78d54e85289dc50fc43c951d1feb97b6199) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Fixed storybook EBUSY-error which occured on a npm cache file, sometimes when starting storybook and everytime when saving new content. This error caused the webpack server to crach.
  It's a workaround (for lack of alternative) and not a proper solution.

- [#342](https://github.com/swisspost/design-system/pull/342) [`b106a95`](https://github.com/swisspost/design-system/commit/b106a95b55abfe5b5c5fff982dda3693f816a92e) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds high contrast mode styles for form-switch.

* [#252](https://github.com/swisspost/design-system/pull/252) [`bacb1c0`](https://github.com/swisspost/design-system/commit/bacb1c0a8b6458264bd3312d5fe4d45fc692fb86) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Fixes hcm/forced-color styles for tabs.

- [#388](https://github.com/swisspost/design-system/pull/388) [`f5c1460`](https://github.com/swisspost/design-system/commit/f5c1460a031b214b5c1404d67b74e863834e1554) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds high-contrast-mode/forced-color styles for accordion-button

* [#253](https://github.com/swisspost/design-system/pull/253) [`82d9f17`](https://github.com/swisspost/design-system/commit/82d9f17f9d3d42a568c88593a662b28b7720cc96) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Fixed line-height and background-color. Dropdowns inside the component intranet-header now have the same line-height as simple links. Invalid background-color rule has been fixed (none => transparent).

- [#187](https://github.com/swisspost/design-system/pull/187) [`3ef0da5`](https://github.com/swisspost/design-system/commit/3ef0da5368c99e12181a54eb1eb7b35e8f26431d) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Refactors component tabs, to get rid of the css-class text-auto.

* [#303](https://github.com/swisspost/design-system/pull/303) [`49a163c`](https://github.com/swisspost/design-system/commit/49a163c66bba371185281b5eb63006c84ea1bc0f) Thanks [@LarissaMS](https://github.com/LarissaMS)! - Set placeholder opacity in HCM to 0

- [#384](https://github.com/swisspost/design-system/pull/384) [`5c5bd17`](https://github.com/swisspost/design-system/commit/5c5bd17ac390811f3e8548b60cf1232d4937acb6) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds high-contrast-mode/forced-colors styles for all controls with class 'form-control'

* [#348](https://github.com/swisspost/design-system/pull/348) [`e39e2cc`](https://github.com/swisspost/design-system/commit/e39e2ccb9ea76168ea3d458b02833445791a34b1) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds high contrast mode styles for form-select.

- [#395](https://github.com/swisspost/design-system/pull/395) [`83c9460`](https://github.com/swisspost/design-system/commit/83c94601d6101a6f2a709ed62257784d2e2e2c7a) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds high-contrast-mode/forced-color styles for component spinner.

* [#310](https://github.com/swisspost/design-system/pull/310) [`63c269d`](https://github.com/swisspost/design-system/commit/63c269d38d4806e9af1786209623a5732a28ee09) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Sets font-sizes in link-list without a font-size-curve and removes corresponding classes from the html-example.

- [#394](https://github.com/swisspost/design-system/pull/394) [`2eb45a9`](https://github.com/swisspost/design-system/commit/2eb45a9268c68a6086cec5411efd23aad5ecfeb7) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds high-contrast-mode/forced-color styles for component ng-timepicker.

* [#393](https://github.com/swisspost/design-system/pull/393) [`6571cbe`](https://github.com/swisspost/design-system/commit/6571cbee2e874199b575cbe58f2d78042a26cc57) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds high-contrast-mode/forced-color styles for component progressbar.

- [#338](https://github.com/swisspost/design-system/pull/338) [`6c3a1c6`](https://github.com/swisspost/design-system/commit/6c3a1c60b0c19173206eaa7776ef8552d948bbd2) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Fixes font-color in hcm/forced-color mode for focussed select/select-multiple elements.

## 5.0.0-alpha.6

### Patch Changes

- [#183](https://github.com/swisspost/design-system/pull/183) [`b7392e4`](https://github.com/swisspost/design-system/commit/b7392e4e6d6ad32cc4dcb74f77a2339a023ebe22) Thanks [@alizedebray](https://github.com/alizedebray)! - Created a new package offering Migration Schematics for the Design System Styles
  Removed custom input styles that are no longer used

## 5.0.0-alpha.5

### Major Changes

- [#189](https://github.com/swisspost/design-system/pull/189) [`6ec9d66`](https://github.com/swisspost/design-system/commit/6ec9d667a3aff9aa00b76a2ce208a81749ad85bd) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Removes deprecated SCSS-variables $font-size-map, $font-size-sm, $font-size-rg and $font-size-lg from project, in favor of the new \$font-sizes map.

## 5.0.0-alpha.4

### Major Changes

- [#141](https://github.com/swisspost/design-system/pull/141) [`0b01019`](https://github.com/swisspost/design-system/commit/0b010194b3c64bed8b0f3fdf7015a9f53f19732b) Thanks [@gfellerph](https://github.com/gfellerph)! - Added storybook for documenting the basic styles.

### Patch Changes

- [#103](https://github.com/swisspost/design-system/pull/103) [`e280aae`](https://github.com/swisspost/design-system/commit/e280aaeb4e350e7ea827c13e5108d847ae2608c6) Thanks [@gfellerph](https://github.com/gfellerph)! - fix(button): update button sizes and reduce CSS output size

* [#169](https://github.com/swisspost/design-system/pull/169) [`0cb7149`](https://github.com/swisspost/design-system/commit/0cb7149cf2512293620d6fd01a9348e30803a361) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Shows form-select floating-label like a placeholder for select-elements which are empty (with no option-tags inside).

- [#164](https://github.com/swisspost/design-system/pull/164) [`18f2275`](https://github.com/swisspost/design-system/commit/18f2275de1201a070d41a6aff696de7972febca0) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - adds styles for component stepper in forced-color/high-contrast mode

* [#162](https://github.com/swisspost/design-system/pull/162) [`616f534`](https://github.com/swisspost/design-system/commit/616f534e184e7f48bf1c93fa3311e16e57d4998c) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Refactors topic-teaser styles to work as expected by Design

- [#162](https://github.com/swisspost/design-system/pull/162) [`616f534`](https://github.com/swisspost/design-system/commit/616f534e184e7f48bf1c93fa3311e16e57d4998c) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Includes last 2 safari versions in browserslilstrc and aligns browserslistrc files in all projects

## 5.0.0-alpha.3

### Major Changes

- [#115](https://github.com/swisspost/design-system/pull/115) [`86c4e8f`](https://github.com/swisspost/design-system/commit/86c4e8fda8d4df453e8aee023e07dca24555b9dc) Thanks [@gfellerph](https://github.com/gfellerph)! - feat(type)!: Font size and line height maps are now defined with a key for easier automation. Variables are always accessible individually and collected in a loopable map. Font sizes and line heights are defined for the same sizes so it's possible to cross-reference a line-height based on font-size (see font-curve mixin).

### Patch Changes

- [#159](https://github.com/swisspost/design-system/pull/159) [`d2c903c`](https://github.com/swisspost/design-system/commit/d2c903c6f20afde683e2b31fd30692ea3dee031e) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Add styles for form-range in fourced-color/high-contrast mode

* [#115](https://github.com/swisspost/design-system/pull/115) [`86c4e8f`](https://github.com/swisspost/design-system/commit/86c4e8fda8d4df453e8aee023e07dca24555b9dc) Thanks [@gfellerph](https://github.com/gfellerph)! - fix(typography): update typography for headings

- [#116](https://github.com/swisspost/design-system/pull/116) [`a004d82`](https://github.com/swisspost/design-system/commit/a004d82486c390e713f1b824dacb7f01b63a883e) Thanks [@gfellerph](https://github.com/gfellerph)! - fix(switch): adds a border in windows hcm

* [#153](https://github.com/swisspost/design-system/pull/153) [`e949af9`](https://github.com/swisspost/design-system/commit/e949af95169b2ab589e992c7946cc5d172ea876a) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds styles for progressbar in high-contrast-mode

## 5.0.0-alpha.2

### Patch Changes

- [#133](https://github.com/swisspost/design-system/pull/133) [`b380ded`](https://github.com/swisspost/design-system/commit/b380dedefc6a88626b2ee0706efefe438b519d3b) Thanks [@gfellerph](https://github.com/gfellerph)! - Endeavour the 1st, systems are go

## 5.0.0-alpha.1

### Major Changes

- [#96](https://github.com/swisspost/design-system/pull/96) [`56be7d6`](https://github.com/swisspost/design-system/commit/56be7d64a6a5a2810d830f6fb4307584a0cebff1) Thanks [@gfellerph](https://github.com/gfellerph)! - Refactored colors. Bootstrap overrides are now clearly separated from Design System colors and only Design System colors are used in the components. This change also prepares for a dynamic dark mode by offering CSS variables for background and text contrast colors (see buttons.scss for an example).

### Patch Changes

- [#2](https://github.com/swisspost/design-system/pull/2) [`4c7f1ce`](https://github.com/swisspost/design-system/commit/4c7f1ceaab68f72f97f1c0bc8e3eb83dadbe848d) Thanks [@Janobob](https://github.com/Janobob)! - Alert with color "success" now uses the correct contrast color again. Alert close buttons styles are now corrected. Toast & Alert Icons are now displayed in hcm even in white background.

* [#7](https://github.com/swisspost/design-system/pull/7) [`e0b1611`](https://github.com/swisspost/design-system/commit/e0b1611ec260a173cebeb985d2b992534a62de1f) Thanks [@Janobob](https://github.com/Janobob)! - Added styles and docs for ng-datatable loadingindicator.

- [#5](https://github.com/swisspost/design-system/pull/5) [`dd1beed`](https://github.com/swisspost/design-system/commit/dd1beed80186a3fac80cd072f8c3d7c67eaa2bd2) Thanks [@Janobob](https://github.com/Janobob)! - Fix removes the border from the table body

* [#14](https://github.com/swisspost/design-system/pull/14) [`d75cfeb`](https://github.com/swisspost/design-system/commit/d75cfeb5f1d8add639216a7a842f60f6c277be70) Thanks [@Janobob](https://github.com/Janobob)! - Moved timepicker validation fix from version 4 to version 5.

- [#12](https://github.com/swisspost/design-system/pull/12) [`502598b`](https://github.com/swisspost/design-system/commit/502598b70994c30f98165c831e8a8bc04f2e5ea1) Thanks [@gfellerph](https://github.com/gfellerph)! - Switch to the Apache 2.0 License

* [#12](https://github.com/swisspost/design-system/pull/12) [`502598b`](https://github.com/swisspost/design-system/commit/502598b70994c30f98165c831e8a8bc04f2e5ea1) Thanks [@gfellerph](https://github.com/gfellerph)! - Remove license text from CSS bundles. The license is included in distributed NPM packages.

## 5.0.0-alpha.0

### Patch Changes

- Enter alpha
