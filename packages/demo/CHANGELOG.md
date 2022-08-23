# @swisspost/design-system-demo

## 5.0.0-alpha.5

### Major Changes

- [#308](https://github.com/swisspost/design-system/pull/308) [`13512df`](https://github.com/swisspost/design-system/commit/13512df3ad745b81561aca5e0687e50d8f582b35) Thanks [@alizedebray](https://github.com/alizedebray)! - Refactored the stepper component in order to facilitate its use within a project

* [#310](https://github.com/swisspost/design-system/pull/310) [`63c269d`](https://github.com/swisspost/design-system/commit/63c269d38d4806e9af1786209623a5732a28ee09) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds and extends grid-cols definition for .topic-teaser-content and .topic-teaser-image-container containers inside css and removes col classes from html. This ensures that the widths of these containers cannot be changed too easily.
  Improves image aspect-ratios, as well as font-sizes and paddings of link-list links on smaller devices.

- [#355](https://github.com/swisspost/design-system/pull/355) [`256b9d8`](https://github.com/swisspost/design-system/commit/256b9d863f16e06dbbf5fc99c3daeb8104d7813f) Thanks [@gfellerph](https://github.com/gfellerph)! - Rename Common Web Frontend to Swiss Post Design System

* [#353](https://github.com/swisspost/design-system/pull/353) [`412d640`](https://github.com/swisspost/design-system/commit/412d6408b3dc6b1d139e53619e309136d1e53eaa) Thanks [@alizedebray](https://github.com/alizedebray)! - - Dropped rounded badges
  - Dropped colored badges
  - Updated dismissible badges
  - Added checkable badges

- [#310](https://github.com/swisspost/design-system/pull/310) [`63c269d`](https://github.com/swisspost/design-system/commit/63c269d38d4806e9af1786209623a5732a28ee09) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Sets font-sizes in link-list without a font-size-curve and removes corresponding classes from the html-example.

### Patch Changes

- [#309](https://github.com/swisspost/design-system/pull/309) [`57ebc9c`](https://github.com/swisspost/design-system/commit/57ebc9c01a8ef96bc4d968b2d5018dc25d51cbab) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Add html-property inputmode to controlledvalue inputfield, to improve userexperience. This will open a number-only Keyboard on mobile devices, when the user selects the inputfield.

* [#389](https://github.com/swisspost/design-system/pull/389) [`9265af8`](https://github.com/swisspost/design-system/commit/9265af8e9e87d8f0fcd97c05142ec69a6660b5d1) Thanks [@gfellerph](https://github.com/gfellerph)! - Update entry file names for the styles package.

  @use '@swisspost/design-system-styles'; (Default internet styles)
  @use '@swisspost/design-system-styles/intranet'; (Default intranet styles)
  @use '@swisspost/design-system-styles/core' as post; (Variables, mixins, functions and placeholders)

  1. Default import is as simple as possible
  2. Intranet styles are clearly named as such
  3. Core functionality is a clear name, but for consistency with other prefixes, the core module can be namespaced as post. The usage would then be background-color: post.\$yellow;

- [#187](https://github.com/swisspost/design-system/pull/187) [`3ef0da5`](https://github.com/swisspost/design-system/commit/3ef0da5368c99e12181a54eb1eb7b35e8f26431d) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Refactors component tabs, to get rid of the css-class text-auto.

* [#235](https://github.com/swisspost/design-system/pull/235) [`c962f8a`](https://github.com/swisspost/design-system/commit/c962f8a1ae8d10664a61197bb4196aa43bcbd47b) Thanks [@gfellerph](https://github.com/gfellerph)! - Updated documentation on toastr alerts for improved accessibility user experience

- [#391](https://github.com/swisspost/design-system/pull/391) [`aabce76`](https://github.com/swisspost/design-system/commit/aabce76519ef38fe2f3290098df27b56f9af466f) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Fixes typo which prevented alerts from being closed properly.

* [#387](https://github.com/swisspost/design-system/pull/387) [`65a569c`](https://github.com/swisspost/design-system/commit/65a569caed55412b6fee9739ddc41db67b526c47) Thanks [@gfellerph](https://github.com/gfellerph)! - Deprecated the text on image card example and presented it as a no-go. It's very difficult for content editors to always ensure that text is legible on an image for every browser size and all different languages.

- [#386](https://github.com/swisspost/design-system/pull/386) [`af60d83`](https://github.com/swisspost/design-system/commit/af60d835cd06a7e9c5429ef513433f1429b70da2) Thanks [@gfellerph](https://github.com/gfellerph)! - Updated ngb-collapsible demo code from the ng-bootstrap documentation. Improved performance of the demo and prevented margin collapse.

* [#357](https://github.com/swisspost/design-system/pull/357) [`ccbc77a`](https://github.com/swisspost/design-system/commit/ccbc77a731c6861cb1b74cbbea8daa96f1258a46) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Refactors backgrounds for bg-\* classes, alerts and notifications.

- [#346](https://github.com/swisspost/design-system/pull/346) [`55baa59`](https://github.com/swisspost/design-system/commit/55baa596407f531f68033a333a0c5890a9cfd90d) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Adds popover example with markup.

- Updated dependencies [[`13512df`](https://github.com/swisspost/design-system/commit/13512df3ad745b81561aca5e0687e50d8f582b35), [`2c30112`](https://github.com/swisspost/design-system/commit/2c30112a12094b2d10465e57ce8a651a4c0cd96f), [`8235cfa`](https://github.com/swisspost/design-system/commit/8235cfae6890de9b2507ce55adc9383016d15799), [`b13de55`](https://github.com/swisspost/design-system/commit/b13de555840cc1ae56b2f7ce846947aa9fca9479), [`63c269d`](https://github.com/swisspost/design-system/commit/63c269d38d4806e9af1786209623a5732a28ee09), [`00d2d78`](https://github.com/swisspost/design-system/commit/00d2d78d54e85289dc50fc43c951d1feb97b6199), [`b106a95`](https://github.com/swisspost/design-system/commit/b106a95b55abfe5b5c5fff982dda3693f816a92e), [`bacb1c0`](https://github.com/swisspost/design-system/commit/bacb1c0a8b6458264bd3312d5fe4d45fc692fb86), [`f5c1460`](https://github.com/swisspost/design-system/commit/f5c1460a031b214b5c1404d67b74e863834e1554), [`82d9f17`](https://github.com/swisspost/design-system/commit/82d9f17f9d3d42a568c88593a662b28b7720cc96), [`9265af8`](https://github.com/swisspost/design-system/commit/9265af8e9e87d8f0fcd97c05142ec69a6660b5d1), [`3ef0da5`](https://github.com/swisspost/design-system/commit/3ef0da5368c99e12181a54eb1eb7b35e8f26431d), [`256b9d8`](https://github.com/swisspost/design-system/commit/256b9d863f16e06dbbf5fc99c3daeb8104d7813f), [`f3c6118`](https://github.com/swisspost/design-system/commit/f3c61182b16282b6884dd0fe31fe3235677b079d), [`49a163c`](https://github.com/swisspost/design-system/commit/49a163c66bba371185281b5eb63006c84ea1bc0f), [`5c5bd17`](https://github.com/swisspost/design-system/commit/5c5bd17ac390811f3e8548b60cf1232d4937acb6), [`7be9c03`](https://github.com/swisspost/design-system/commit/7be9c033bd9f2c6eeb788aa3c0df32b4dcd96047), [`63c5676`](https://github.com/swisspost/design-system/commit/63c567635598dfac90cac55f0172dbc3f94ba465), [`e39e2cc`](https://github.com/swisspost/design-system/commit/e39e2ccb9ea76168ea3d458b02833445791a34b1), [`412d640`](https://github.com/swisspost/design-system/commit/412d6408b3dc6b1d139e53619e309136d1e53eaa), [`83c9460`](https://github.com/swisspost/design-system/commit/83c94601d6101a6f2a709ed62257784d2e2e2c7a), [`63c269d`](https://github.com/swisspost/design-system/commit/63c269d38d4806e9af1786209623a5732a28ee09), [`2b52044`](https://github.com/swisspost/design-system/commit/2b52044195834330b0e1af44b3820425e4420670), [`2b52044`](https://github.com/swisspost/design-system/commit/2b52044195834330b0e1af44b3820425e4420670), [`2eb45a9`](https://github.com/swisspost/design-system/commit/2eb45a9268c68a6086cec5411efd23aad5ecfeb7), [`6571cbe`](https://github.com/swisspost/design-system/commit/6571cbee2e874199b575cbe58f2d78042a26cc57), [`6c3a1c6`](https://github.com/swisspost/design-system/commit/6c3a1c60b0c19173206eaa7776ef8552d948bbd2), [`ccbc77a`](https://github.com/swisspost/design-system/commit/ccbc77a731c6861cb1b74cbbea8daa96f1258a46)]:
  - @swisspost/design-system-styles@5.0.0-alpha.7
  - @swisspost/design-system-intranet-header@3.0.0-alpha.4

## 5.0.0-alpha.4

### Patch Changes

- [#103](https://github.com/swisspost/design-system/pull/103) [`e280aae`](https://github.com/swisspost/design-system/commit/e280aaeb4e350e7ea827c13e5108d847ae2608c6) Thanks [@gfellerph](https://github.com/gfellerph)! - fix(button): update button sizes and reduce CSS output size

* [#169](https://github.com/swisspost/design-system/pull/169) [`0cb7149`](https://github.com/swisspost/design-system/commit/0cb7149cf2512293620d6fd01a9348e30803a361) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Shows form-select floating-label like a placeholder for select-elements which are empty (with no option-tags inside).

- [#162](https://github.com/swisspost/design-system/pull/162) [`616f534`](https://github.com/swisspost/design-system/commit/616f534e184e7f48bf1c93fa3311e16e57d4998c) Thanks [@oliverschuerch](https://github.com/oliverschuerch)! - Includes last 2 safari versions in browserslilstrc and aligns browserslistrc files in all projects

- Updated dependencies [[`0b01019`](https://github.com/swisspost/design-system/commit/0b010194b3c64bed8b0f3fdf7015a9f53f19732b), [`e280aae`](https://github.com/swisspost/design-system/commit/e280aaeb4e350e7ea827c13e5108d847ae2608c6), [`0cb7149`](https://github.com/swisspost/design-system/commit/0cb7149cf2512293620d6fd01a9348e30803a361), [`18f2275`](https://github.com/swisspost/design-system/commit/18f2275de1201a070d41a6aff696de7972febca0), [`616f534`](https://github.com/swisspost/design-system/commit/616f534e184e7f48bf1c93fa3311e16e57d4998c), [`616f534`](https://github.com/swisspost/design-system/commit/616f534e184e7f48bf1c93fa3311e16e57d4998c)]:
  - @swisspost/design-system-styles@5.0.0-alpha.4
  - @swisspost/design-system-intranet-header@3.0.0-alpha.3

## 5.0.0-alpha.3

### Patch Changes

- [#115](https://github.com/swisspost/design-system/pull/115) [`86c4e8f`](https://github.com/swisspost/design-system/commit/86c4e8fda8d4df453e8aee023e07dca24555b9dc) Thanks [@gfellerph](https://github.com/gfellerph)! - fix(typography): update typography for headings

- Updated dependencies [[`d2c903c`](https://github.com/swisspost/design-system/commit/d2c903c6f20afde683e2b31fd30692ea3dee031e), [`86c4e8f`](https://github.com/swisspost/design-system/commit/86c4e8fda8d4df453e8aee023e07dca24555b9dc), [`a004d82`](https://github.com/swisspost/design-system/commit/a004d82486c390e713f1b824dacb7f01b63a883e), [`e949af9`](https://github.com/swisspost/design-system/commit/e949af95169b2ab589e992c7946cc5d172ea876a), [`86c4e8f`](https://github.com/swisspost/design-system/commit/86c4e8fda8d4df453e8aee023e07dca24555b9dc)]:
  - @swisspost/design-system-styles@5.0.0-alpha.3

## 5.0.0-alpha.2

### Patch Changes

- [#133](https://github.com/swisspost/design-system/pull/133) [`b380ded`](https://github.com/swisspost/design-system/commit/b380dedefc6a88626b2ee0706efefe438b519d3b) Thanks [@gfellerph](https://github.com/gfellerph)! - Endeavour the 1st, systems are go

- Updated dependencies [[`b380ded`](https://github.com/swisspost/design-system/commit/b380dedefc6a88626b2ee0706efefe438b519d3b)]:
  - @swisspost/design-system-intranet-header@3.0.0-alpha.2
  - @swisspost/design-system-styles@5.0.0-alpha.2

## 5.0.0-alpha.1

### Major Changes

- [#96](https://github.com/swisspost/design-system/pull/96) [`56be7d6`](https://github.com/swisspost/design-system/commit/56be7d64a6a5a2810d830f6fb4307584a0cebff1) Thanks [@gfellerph](https://github.com/gfellerph)! - Refactored colors. Bootstrap overrides are now clearly separated from Design System colors and only Design System colors are used in the components. This change also prepares for a dynamic dark mode by offering CSS variables for background and text contrast colors (see buttons.scss for an example).

### Patch Changes

- [#7](https://github.com/swisspost/design-system/pull/7) [`e0b1611`](https://github.com/swisspost/design-system/commit/e0b1611ec260a173cebeb985d2b992534a62de1f) Thanks [@Janobob](https://github.com/Janobob)! - Added styles and docs for ng-datatable loadingindicator.

* [#14](https://github.com/swisspost/design-system/pull/14) [`d75cfeb`](https://github.com/swisspost/design-system/commit/d75cfeb5f1d8add639216a7a842f60f6c277be70) Thanks [@Janobob](https://github.com/Janobob)! - Moved timepicker validation fix from version 4 to version 5.

- [#12](https://github.com/swisspost/design-system/pull/12) [`502598b`](https://github.com/swisspost/design-system/commit/502598b70994c30f98165c831e8a8bc04f2e5ea1) Thanks [@gfellerph](https://github.com/gfellerph)! - Switch to the Apache 2.0 License

- Updated dependencies [[`56be7d6`](https://github.com/swisspost/design-system/commit/56be7d64a6a5a2810d830f6fb4307584a0cebff1), [`4c7f1ce`](https://github.com/swisspost/design-system/commit/4c7f1ceaab68f72f97f1c0bc8e3eb83dadbe848d), [`e0b1611`](https://github.com/swisspost/design-system/commit/e0b1611ec260a173cebeb985d2b992534a62de1f), [`dd1beed`](https://github.com/swisspost/design-system/commit/dd1beed80186a3fac80cd072f8c3d7c67eaa2bd2), [`d75cfeb`](https://github.com/swisspost/design-system/commit/d75cfeb5f1d8add639216a7a842f60f6c277be70), [`502598b`](https://github.com/swisspost/design-system/commit/502598b70994c30f98165c831e8a8bc04f2e5ea1), [`502598b`](https://github.com/swisspost/design-system/commit/502598b70994c30f98165c831e8a8bc04f2e5ea1)]:
  - @swisspost/design-system-styles@5.0.0-alpha.1
  - @swisspost/design-system-intranet-header@3.0.0-alpha.1

## 5.0.0-alpha.0

### Patch Changes

- Enter alpha

- Updated dependencies []:
  - @swisspost/design-system-intranet-header@3.0.0-alpha.0
  - @swisspost/design-system-styles@5.0.0-alpha.0
