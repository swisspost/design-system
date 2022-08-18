# @swisspost/design-system-styles

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
