# @swisspost/design-system-components

## 9.0.0-next.29

### Patch Changes

- Removed console.logs out of the post-header component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4817](https://github.com/swisspost/design-system/pull/4817))

- Fixed post-header component lifecycle hooks and event bindings. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4817](https://github.com/swisspost/design-system/pull/4817))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.29
  - @swisspost/design-system-icons@9.0.0-next.29

## 9.0.0-next.28

### Patch Changes

- Fixed post-header component scrollParent state reset. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4815](https://github.com/swisspost/design-system/pull/4815))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.28
  - @swisspost/design-system-icons@9.0.0-next.28

## 9.0.0-next.27

### Patch Changes

- Fixed post-header disconnectCallback, by removing the eventListeners first and reset internal states and the scrollParent element afterwards. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4813](https://github.com/swisspost/design-system/pull/4813))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.27
  - @swisspost/design-system-icons@9.0.0-next.27

## 9.0.0-next.26

### Patch Changes

- Fixed post-header component scrollParent getter function. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4811](https://github.com/swisspost/design-system/pull/4811))

- Fixed calculation of `post-mainnavigation` mobile placement and put back the header border on HCM. (by [@leagrdv](https://github.com/leagrdv) with [#4806](https://github.com/swisspost/design-system/pull/4806))

- Applied styles to the slot title selector rather than `h1` on the `post-header` to have consistent styles whether or not `h1` is used. (by [@leagrdv](https://github.com/leagrdv) with [#4782](https://github.com/swisspost/design-system/pull/4782))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.26
  - @swisspost/design-system-icons@9.0.0-next.26

## 9.0.0-next.25

### Patch Changes

- Fixed wrong implementation of the relative scroll parent of the `post-header` component.` (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4786](https://github.com/swisspost/design-system/pull/4786))

- Fixed wrong implemented and added missing eventListener removals in the `post-header` component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4786](https://github.com/swisspost/design-system/pull/4786))

- Fixed timeing issue in the calculation of the custom property `--local-header-height`, so it's defined from the very beginning. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4786](https://github.com/swisspost/design-system/pull/4786))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.25
  - @swisspost/design-system-icons@9.0.0-next.25

## 9.0.0-next.24

### Patch Changes

- Updated the icon sizes in the `post-header` and the `post-language-switch` components, to match the design specs. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4783](https://github.com/swisspost/design-system/pull/4783))

- Added an initial event to language switch options to get the initially active language option (by [@gfellerph](https://github.com/gfellerph) with [#4788](https://github.com/swisspost/design-system/pull/4788))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.24
  - @swisspost/design-system-icons@9.0.0-next.24

## 9.0.0-next.23

### Patch Changes

- Fixed the bug with shifting the `post-language-switch` dropdown to the right on language selection. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4751](https://github.com/swisspost/design-system/pull/4751))

- Fixed navigation scrolling in `post-mainnavigation` to ensure scroll buttons persist until the last item is fully visible. (by [@schaertim](https://github.com/schaertim) with [#4777](https://github.com/swisspost/design-system/pull/4777))

- Prevented slide-down animation for already open `post-megadropdown` component when resizing from mobile/tablet to desktop. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4704](https://github.com/swisspost/design-system/pull/4704))

- Disabled body scrolling when mobile navigation is open. (by [@myrta2302](https://github.com/myrta2302) with [#4775](https://github.com/swisspost/design-system/pull/4775))

- Updated the `post-megadropdown` to make the list links wrap to the next line when texts are too long. (by [@leagrdv](https://github.com/leagrdv) with [#4778](https://github.com/swisspost/design-system/pull/4778))

- Adjusted the composable header height to match the design specifications. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4650](https://github.com/swisspost/design-system/pull/4650))

- Implemented auto-closing behavior for `post-megadropdown` and `post-mainnavigation` when clicking a link inside them, to prevent navigation elements from remaining open after user interaction. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4765](https://github.com/swisspost/design-system/pull/4765))

- Fixed an issue with the language switch active state not highlighting only the active language option. The selector now only targets active options. (by [@gfellerph](https://github.com/gfellerph) with [#4776](https://github.com/swisspost/design-system/pull/4776))

- Enabled header navigation to scroll when content exceeds available height on mobile & tablet. (by [@myrta2302](https://github.com/myrta2302) with [#4712](https://github.com/swisspost/design-system/pull/4712))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.23
  - @swisspost/design-system-icons@9.0.0-next.23

## 9.0.0-next.22

### Patch Changes

- Fixed an issue with the main navigation where the scroll arrows were always displayed, even when there were no elements to scroll to. (by [@alizedebray](https://github.com/alizedebray) with [#4766](https://github.com/swisspost/design-system/pull/4766))

- Fixed mobile navigation position and scrolling issues within storybook. (by [@myrta2302](https://github.com/myrta2302) with [#4738](https://github.com/swisspost/design-system/pull/4738))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.22
  - @swisspost/design-system-icons@9.0.0-next.22

## 9.0.0-next.21

### Patch Changes

- Updated hover styles for `post-language-switch` and `post-language-option` components. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4665](https://github.com/swisspost/design-system/pull/4665))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.21
  - @swisspost/design-system-icons@9.0.0-next.21

## 9.0.0-next.20

### Patch Changes

- Increased gap between header title and local controls in `post-header`. (by [@leagrdv](https://github.com/leagrdv) with [#4739](https://github.com/swisspost/design-system/pull/4739))

- Fixed misaligned second level navigation in the `post-megadropdown` component on desktop. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4757](https://github.com/swisspost/design-system/pull/4757))

- Fixed breakpoint utility, by normalizing the read custom-properties. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4764](https://github.com/swisspost/design-system/pull/4764))

- Changed from `vh` to dynamic viewport height (`dvh`) unit on post-header to take into account the mobile devices height change. (by [@leagrdv](https://github.com/leagrdv) with [#4747](https://github.com/swisspost/design-system/pull/4747))

- Aligned prop validation throughout the component library. (by [@myrta2302](https://github.com/myrta2302) with [#4638](https://github.com/swisspost/design-system/pull/4638))

- Fixed the scroll to top that occurs when opening the `post-megadropdown` on desktop. (by [@leagrdv](https://github.com/leagrdv) with [#4761](https://github.com/swisspost/design-system/pull/4761))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.20
  - @swisspost/design-system-icons@9.0.0-next.20

## 9.0.0-next.19

### Minor Changes

- Changed list version of `post-language-switch` to always keep the same order of `post-language-options`. (by [@schaertim](https://github.com/schaertim) with [#4706](https://github.com/swisspost/design-system/pull/4706))

- Added optional safe triangle and trapezoid to `post-popovercontainer` to improve accessability. (by [@schaertim](https://github.com/schaertim) with [#4436](https://github.com/swisspost/design-system/pull/4436))

- Enhanced the `post-linkarea` component so that modifier keys (`ctrl`, `shift`, `alt`, `meta`) are passed along when clicking the component. (by [@alizedebray](https://github.com/alizedebray) with [#4696](https://github.com/swisspost/design-system/pull/4696))

- Updated the `post-icon` component to make it SSR conform. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4697](https://github.com/swisspost/design-system/pull/4697))

### Patch Changes

- Improved keyboard navigation for the `post-megadropdown` by focusing on the first element when it is opened with the Enter key and returning the focus to the trigger when it is closed. (by [@schaertim](https://github.com/schaertim) with [#4625](https://github.com/swisspost/design-system/pull/4625))

- Fixed the correct assignment of the expanded attribute in the `post-menu` component, ensuring proper aria-expanded handling in components utilizing `post-menu`, such as `post-language-switch` and `post-breadcrumb`. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4661](https://github.com/swisspost/design-system/pull/4661))

- Tokenized the back to top button's shadow. (by [@leagrdv](https://github.com/leagrdv) with [#4641](https://github.com/swisspost/design-system/pull/4641))

- Cleaned up possible side effects on `post-header` by adding a `disconnectedCallback()` function. (by [@leagrdv](https://github.com/leagrdv) with [#4736](https://github.com/swisspost/design-system/pull/4736))

- Duplicated `post-mainnavigation` links' content to avoid layout shift on active elements. (by [@leagrdv](https://github.com/leagrdv) with [#4694](https://github.com/swisspost/design-system/pull/4694))

- Added documentation for the `design-system-components-react` package. (by [@leagrdv](https://github.com/leagrdv) with [#4669](https://github.com/swisspost/design-system/pull/4669))

- Fixed the `post-language-switch` component to support any boolean notation for the `active` attribute on `post-language-option`. (by [@alizedebray](https://github.com/alizedebray) with [#4701](https://github.com/swisspost/design-system/pull/4701))

- Fixed focus order on desktop for `post-megadropdown` component. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4379](https://github.com/swisspost/design-system/pull/4379))

- Added high contrast mode styles for header. (by [@myrta2302](https://github.com/myrta2302) with [#4262](https://github.com/swisspost/design-system/pull/4262))

- Fixed the animation glitch when switching between megadropdowns. (by [@leagrdv](https://github.com/leagrdv) with [#4723](https://github.com/swisspost/design-system/pull/4723))

- Fixed the `post-header` component to correctly set the `--local-header-height` property. (by [@alizedebray](https://github.com/alizedebray) with [#4746](https://github.com/swisspost/design-system/pull/4746))

- Switched from thrown error to logged errors when `post-list` title is missing. (by [@leagrdv](https://github.com/leagrdv) with [#4725](https://github.com/swisspost/design-system/pull/4725))

- Fixed overflow handling in the main navigation to ensure all navigation items can be accessed. (by [@alizedebray](https://github.com/alizedebray) with [#4666](https://github.com/swisspost/design-system/pull/4666))

- Added a line separator between the header and the page content. (by [@leagrdv](https://github.com/leagrdv) with [#4637](https://github.com/swisspost/design-system/pull/4637))

- Removed the custom properties from the `post-header` component styles and moved them to the styles package. This change allows these properties to be accessed before the component is loaded. (by [@leagrdv](https://github.com/leagrdv) with [#4663](https://github.com/swisspost/design-system/pull/4663))

- Updated the post-linkarea component so that it no longer uses the `Window` object. (by [@alizedebray](https://github.com/alizedebray) with [#4696](https://github.com/swisspost/design-system/pull/4696))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.19
  - @swisspost/design-system-icons@9.0.0-next.19

## 9.0.0-next.18

### Minor Changes

- Made it possible to use multiple `post-language-switch` components in the `post-header` component. Fixed language switch options being wrapped to multiple lines on mobile. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4674](https://github.com/swisspost/design-system/pull/4674))

### Patch Changes

- Updated styles for the header main navigation and mega dropdown elements. (by [@leagrdv](https://github.com/leagrdv) with [#4621](https://github.com/swisspost/design-system/pull/4621))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.18
  - @swisspost/design-system-icons@9.0.0-next.18

## 9.0.0-next.17

### Patch Changes

- Moved the border styles for the post-accordion-item from the host to an inner element within the shadow DOM to prevent conflicts with external document styles. (by [@alizedebray](https://github.com/alizedebray) with [#4645](https://github.com/swisspost/design-system/pull/4645))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.17
  - @swisspost/design-system-icons@9.0.0-next.17

## 9.0.0-next.16

### Minor Changes

- Updated language switch behavior. (by [@myrta2302](https://github.com/myrta2302) with [#4376](https://github.com/swisspost/design-system/pull/4376))

### Patch Changes

- Updated the URL check on the post-logo component. It now also accepts relative URLs as valid props. (by [@gfellerph](https://github.com/gfellerph) with [#4616](https://github.com/swisspost/design-system/pull/4616))

- Removed megadropdown animation when another one is already opened. (by [@leagrdv](https://github.com/leagrdv) with [#4627](https://github.com/swisspost/design-system/pull/4627))

- Fixed `post-logo` from disappearing on `post-header` scroll. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4606](https://github.com/swisspost/design-system/pull/4606))

- Fixed the `--main-header-height` custom property for `post-header` component, which was previously undefined on initial load. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4614](https://github.com/swisspost/design-system/pull/4614))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.16
  - @swisspost/design-system-icons@9.0.0-next.16

## 9.0.0-next.15

### Patch Changes

- Fixed an occurence of `aria-role` which should be declared as `role` on the `<post-language-switch>` (by [@gfellerph](https://github.com/gfellerph) with [#4598](https://github.com/swisspost/design-system/pull/4598))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.15
  - @swisspost/design-system-icons@9.0.0-next.15

## 9.0.0-next.14

### Minor Changes

- Improved main navigation overflow display. (by [@alizedebray](https://github.com/alizedebray) with [#4273](https://github.com/swisspost/design-system/pull/4273))

- Removed `post-popovercontainer` from the `post-megadropdown` component and added desktop animations with new slide-down and slide-up effects. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4421](https://github.com/swisspost/design-system/pull/4421))

- Added the `post-linkarea` component. (by [@veyaromain](https://github.com/veyaromain) with [#4030](https://github.com/swisspost/design-system/pull/4030))

### Patch Changes

- Removed nav for `post-header` component causing blank space on scroll for screens <1025px. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4532](https://github.com/swisspost/design-system/pull/4532))

- Added z-index to the `post-header` component to display it on top of other contents. (by [@leagrdv](https://github.com/leagrdv) with [#4367](https://github.com/swisspost/design-system/pull/4367))

- Fixed header mobile menu behavior by trapping the focus within it when opened as well as making it scrollable. (by [@leagrdv](https://github.com/leagrdv) with [#4395](https://github.com/swisspost/design-system/pull/4395))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.14
  - @swisspost/design-system-icons@9.0.0-next.14

## 9.0.0-next.13

### Patch Changes

- Replaced previously deleted CSS variables with SASS variables. (by [@leagrdv](https://github.com/leagrdv) with [#4446](https://github.com/swisspost/design-system/pull/4446))

- Added shadow to an optional tooltip arrow for `post-popover` component. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4441](https://github.com/swisspost/design-system/pull/4441))

- Fixed `post-icon` calculated base href. (by [@leagrdv](https://github.com/leagrdv) with [#4491](https://github.com/swisspost/design-system/pull/4491))

- Fixed display of `post-megadropdown` in header. (by [@leagrdv](https://github.com/leagrdv) with [#4350](https://github.com/swisspost/design-system/pull/4350))

- Fixed the way the icon url gets generated in the `post-icon` component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4351](https://github.com/swisspost/design-system/pull/4351))
- Updated dependencies:
  - @swisspost/design-system-icons@9.0.0-next.13
  - @swisspost/design-system-styles@9.0.0-next.13

## 9.0.0-next.12

### Patch Changes

- Positioned the `post-collapsible` host relative so every not static positioned element within uses it as its base render context and therefore gets clipped as it should. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4478](https://github.com/swisspost/design-system/pull/4478))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.12
  - @swisspost/design-system-icons@9.0.0-next.12

## 9.0.0-next.11

### Patch Changes

- Fixed a typo in the `post-accordion-item` component. (by [@schaertim](https://github.com/schaertim) with [#4391](https://github.com/swisspost/design-system/pull/4391))

- Added focus styles for the `post-logo` component, which contains a link, to improve accessibility. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4462](https://github.com/swisspost/design-system/pull/4462))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.11
  - @swisspost/design-system-icons@9.0.0-next.11

## 9.0.0-next.10

### Major Changes

- Renamed the "dropdown" variant to "menu" for the `post-language-switch` and `post-language-option` components. (by [@leagrdv](https://github.com/leagrdv) with [#4260](https://github.com/swisspost/design-system/pull/4260))

- Removed `.bg-` classes to define background color of elements. (by [@leagrdv](https://github.com/leagrdv) with [#4201](https://github.com/swisspost/design-system/pull/4201))

### Patch Changes

- Removed the dependency on utility classes in `post-header` component. The header can now be used without importing CSS utility classes. (by [@leagrdv](https://github.com/leagrdv) with [#4358](https://github.com/swisspost/design-system/pull/4358))

- Updated the documentation of the Post header. (by [@leagrdv](https://github.com/leagrdv) with [#4408](https://github.com/swisspost/design-system/pull/4408))

- Added a `type="button"` attribute to the `post-close-button` to prevent it from submitting forms. (by [@schaertim](https://github.com/schaertim) with [#4332](https://github.com/swisspost/design-system/pull/4332))

- Removed auto slotting from `post-togglebutton` component to enable more flexible usage. (by [@schaertim](https://github.com/schaertim) with [#4346](https://github.com/swisspost/design-system/pull/4346))

- Removed all usage of deprecated utility sizing classes. (by [@leagrdv](https://github.com/leagrdv) with [#4343](https://github.com/swisspost/design-system/pull/4343))

- Reduced the length of random IDs generated in the components; they are now generated using the [nanoid library](https://github.com/ai/nanoid) instead of the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API). (by [@leagrdv](https://github.com/leagrdv) with [#4369](https://github.com/swisspost/design-system/pull/4369))

- Updated style and keyboard navigation of `post-language-switch`. (by [@leagrdv](https://github.com/leagrdv) with [#4260](https://github.com/swisspost/design-system/pull/4260))

- Removed auto slotting from `post-logo` component to enable more flexible usage. (by [@schaertim](https://github.com/schaertim) with [#4345](https://github.com/swisspost/design-system/pull/4345))

- Modified header megadropdown to close when focus is moved outside. (by [@myrta2302](https://github.com/myrta2302) with [#4324](https://github.com/swisspost/design-system/pull/4324))

- Updated header overflow in tablet and mobile for long application titles. (by [@leagrdv](https://github.com/leagrdv) with [#4364](https://github.com/swisspost/design-system/pull/4364))

- Added hover color to `post-accordion` in high contrast mode. (by [@schaertim](https://github.com/schaertim) with [#4316](https://github.com/swisspost/design-system/pull/4316))

- Removed focus from collapsible when in collapsed state. (by [@myrta2302](https://github.com/myrta2302) with [#4309](https://github.com/swisspost/design-system/pull/4309))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.10
  - @swisspost/design-system-icons@9.0.0-next.10

## 9.0.0-next.9

### Major Changes

- Updated the `post-togglebutton` component to offer greater flexibility. You can now control the visibility of elements within the `post-togglebutton` using the `data-showwhen="toggled"` and `data-showwhen="untoggled"` attributes. Any content without a `data-showwhen` attribute will always be visible, regardless of the toggle state. (by [@alizedebray](https://github.com/alizedebray) with [#4223](https://github.com/swisspost/design-system/pull/4223))

### Minor Changes

- Added composable footer component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4190](https://github.com/swisspost/design-system/pull/4190))

- Added the `post-megadropdown` component. (by [@leagrdv](https://github.com/leagrdv) with [#4177](https://github.com/swisspost/design-system/pull/4177))

- Added the parts `button` and `body` in the `post-accordion-item` component, so one can override styles from the outside. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4190](https://github.com/swisspost/design-system/pull/4190))

- Added the `post-breadcrumb` component to provide a standalone breadcrumb navigation solution. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4065](https://github.com/swisspost/design-system/pull/4065))

- Added the css parts `button` and `body` in the `post-accorddion-item` component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4190](https://github.com/swisspost/design-system/pull/4190))

- Added the `post-language-switch` component that enables users to change the language of a page. (by [@leagrdv](https://github.com/leagrdv) with [#4044](https://github.com/swisspost/design-system/pull/4044))

### Patch Changes

- Switched mega dropdown content to one column on mobile. (by [@leagrdv](https://github.com/leagrdv) with [#4300](https://github.com/swisspost/design-system/pull/4300))

- Fixed opening state of megadropdown trigger and expanded detection. (by [@leagrdv](https://github.com/leagrdv) with [#4299](https://github.com/swisspost/design-system/pull/4299))

- Fix tab isolation in nested `post-tabs` components by scoping tab queries and interactions to the current instance. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4211](https://github.com/swisspost/design-system/pull/4211))

- Added a fixed slot `post-list-item` on the `post-list-item` host element, so it is no longer necessary to add it manually. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4190](https://github.com/swisspost/design-system/pull/4190))

- Fixed the used `headingLevel` in the `post-accorddion-item` component. The component now uses the value from its closest `post-accorddion` parent component, if this is specified and falls back to `h2` if not specified. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4190](https://github.com/swisspost/design-system/pull/4190))

- Updated the `post-togglebutton` to function like a real button, including support for keyboard navigation and proper focus styles. (by [@alizedebray](https://github.com/alizedebray) with [#4242](https://github.com/swisspost/design-system/pull/4242))

- Fixed an issue with the post-list component where the `horizontal` property could not be set programmatically. Also, reduced the specificity of the component's styles to make customization easier. (by [@alizedebray](https://github.com/alizedebray) with [#4137](https://github.com/swisspost/design-system/pull/4137))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.9
  - @swisspost/design-system-icons@9.0.0-next.9

## 9.0.0-next.8

### Minor Changes

- Ιmplemented the back-to-top button component. (by [@myrta2302](https://github.com/myrta2302) with [#3991](https://github.com/swisspost/design-system/pull/3991))

- Added the capability to use a slotted img as a logo inside ´accordion-items´. (by [@leagrdv](https://github.com/leagrdv) with [#4166](https://github.com/swisspost/design-system/pull/4166))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-icons@9.0.0-next.8
  - @swisspost/design-system-styles@9.0.0-next.8

## 9.0.0-next.7

### Minor Changes

- Added the `post-togglebutton` component. (by [@veyaromain](https://github.com/veyaromain) with [#3889](https://github.com/swisspost/design-system/pull/3889))

- Refactored `post-icon` component to use the `<use>` tag to load and show icons under the hood. This enables responsive icons, enables better caching and improves render performance slightly. There is no further action required. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3969](https://github.com/swisspost/design-system/pull/3969))

### Patch Changes

- Fixed bug that showed delayed tooltip even after blur event. (by [@leagrdv](https://github.com/leagrdv) with [#4053](https://github.com/swisspost/design-system/pull/4053))

- Made `post-icon` component use base tag href to define location of icons folder. (by [@leagrdv](https://github.com/leagrdv) with [#4069](https://github.com/swisspost/design-system/pull/4069))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.7

## 9.0.0-next.6

### Major Changes

- Renamed the alert component to banner and updated the styles of banner and toast components. The class `.alert` is still supported for now but is deprecated and will be removed in v10. Changed web component `<post-alert>` to `<post-banner>`. Additionally, the classes `.{toast|alert}-primary`, `.{toast|alert}-gray` and `.toast-notification` have been deprecated. (by [@leagrdv](https://github.com/leagrdv) with [#3862](https://github.com/swisspost/design-system/pull/3862))

- Removed the `alert-fixed-bottom` variant of the alert. (by [@leagrdv](https://github.com/leagrdv) with [#3862](https://github.com/swisspost/design-system/pull/3862))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.6

## 9.0.0-next.5

### Minor Changes

- Added a provisional post-header component with some basic functionality in place. This component is not finished in this state. (by [@gfellerph](https://github.com/gfellerph) with [#3837](https://github.com/swisspost/design-system/pull/3837))

- Added new Menu Button components (post-menu-button, post-menu-trigger, and post-menu-item) for creating accessible dropdown menus. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#3795](https://github.com/swisspost/design-system/pull/3795))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.5

## 9.0.0-next.4

### Major Changes

- Removed the `.breadcrumb-item` class, which previously handled styling for breadcrumb items. Introduced a new `post-breadcrumb-item` that should be used in place of the `.breadcrumb-item` class. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#3659](https://github.com/swisspost/design-system/pull/3659))

### Minor Changes

- Created the `post-list` and `post-list-item` components. (by [@myrta2302](https://github.com/myrta2302) with [#3812](https://github.com/swisspost/design-system/pull/3812))

- Added close button web component. (by [@leagrdv](https://github.com/leagrdv) with [#3880](https://github.com/swisspost/design-system/pull/3880))

### Patch Changes

- Fixed an issue with the post-collapsible throwing an invalid selector error. (by [@alizedebray](https://github.com/alizedebray) with [#3726](https://github.com/swisspost/design-system/pull/3726))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.4

## 9.0.0-next.3

### Major Changes

- Switched stencil hydrated flag from class (`hydrated`) to attribute (`data-hydrated`). This flag indicates when a component finished rendering on the page. If your tests relied on the class being present, please rewrite the selector to use the new attribute selector. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3783](https://github.com/swisspost/design-system/pull/3783))

### Minor Changes

- Added the post-language-option component, a header component made to enable users to select their preferred language. (by [@alizedebray](https://github.com/alizedebray) with [#3802](https://github.com/swisspost/design-system/pull/3802))

- Added component `post-avatar` to show an avatar, based on different possible input data (gravatar by email, initials by first- and/or lastname, fallback). (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3352](https://github.com/swisspost/design-system/pull/3352))

### Patch Changes

- Made the ´<post-popovercontainer>´ visually hidden for tooltips to fix accessability issue. (by [@schaertim](https://github.com/schaertim) with [#3619](https://github.com/swisspost/design-system/pull/3619))

- Fixed the `post-card-control` label read twice by screen readers. (by [@myrta2302](https://github.com/myrta2302) with [#3625](https://github.com/swisspost/design-system/pull/3625))

- Fixed an issue with property validation where some checks were run before the framework had the chance to add computed properties (for example Angular bindings like `[for]="$id"`). The checks are now delayed to work around this issue. (by [@gfellerph](https://github.com/gfellerph) with [#3775](https://github.com/swisspost/design-system/pull/3775))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.3

## 9.0.0-next.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.2

## 9.0.0-next.1

### Major Changes

- Made the heading-level property required for the accordion and removed it from the accordion-item docs. (by [@schaertim](https://github.com/schaertim) with [#3383](https://github.com/swisspost/design-system/pull/3383))

### Patch Changes

- Fixed a bug in nested accordions where closing a child item unintentionally closed all parent accordion elements. (by [@schaertim](https://github.com/schaertim) with [#3427](https://github.com/swisspost/design-system/pull/3427))

- Fixed an issue related to conflicting pointer and focus events hiding the tooltip unexpectedly in some situations. The tooltip now behaves as expected in this situation. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#3592](https://github.com/swisspost/design-system/pull/3592))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.1

## 9.0.0-next.0

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.0

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
