# @swisspost/internet-header

## 1.7.4

### Patch Changes

- Fixed broken links to the storybook documentation. (by [@alizedebray](https://github.com/alizedebray) with [#1514](https://github.com/swisspost/design-system/pull/1514))

- Fixed an issue, which causes the autofocus of any element on a page to move instantly to the klp-login-widget button on page load, when a user is logged in. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1476](https://github.com/swisspost/design-system/pull/1476))

- Fixed a visual bug where the header was not completely hidden in the stickyness="minimal" mode. The grey line is no longer visible when the header is hidden. (by [@cellcoresystems](https://github.com/cellcoresystems) with [#1517](https://github.com/swisspost/design-system/pull/1517))
- Updated dependencies:
  - @swisspost/design-system-styles@6.2.3

## 1.7.3

### Patch Changes

- Fixed an issue with route detection. Uppercase URLs will now correctly match their lowercase navigation item counterparts. (by [@gfellerph](https://github.com/gfellerph) with [#1435](https://github.com/swisspost/design-system/pull/1435))

- Fixed the focus behavior when navigating the flyout with a mouse. Hovering and leaving navigation items that trigger a flyout will no longer focus the main navigation entry after the flyout has been closed. (by [@gfellerph](https://github.com/gfellerph) with [#1462](https://github.com/swisspost/design-system/pull/1462))

- Added abort controller for all existing post-search search endpoints, to avoid running parallel calls for the same endpoint and therefore get outdated suggestions in the search suggestion list. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1416](https://github.com/swisspost/design-system/pull/1416))

- Fixed focus styles for links and buttons inside the navigation. Focus styles are now defined and uniform across browsers. (by [@gfellerph](https://github.com/gfellerph) with [#1453](https://github.com/swisspost/design-system/pull/1453))
- Updated dependencies:
  - @swisspost/design-system-styles@6.2.2

## 1.7.2

### Patch Changes

- Added `role="search"` to the post-search component and `role="searchbox"` to its search input field. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1403](https://github.com/swisspost/design-system/pull/1403))

- Added an aria-label attribute on the skiplinks ul element to clearify the usage of the links in the list. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1402](https://github.com/swisspost/design-system/pull/1402))

- Setting the focus to the related back-button or main-link element whenever a flyout is opened or closed. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1404](https://github.com/swisspost/design-system/pull/1404))

- Added `aria-label` or `aria-labelledby` attributes to all `<nav>` elements. (by [@alizedebray](https://github.com/alizedebray) with [#1408](https://github.com/swisspost/design-system/pull/1408))

- Added invisible text to mark active main navigation point. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1401](https://github.com/swisspost/design-system/pull/1401))

- Fixed the scroll error in the 2nd-level navigation overlay on mobile devices. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1400](https://github.com/swisspost/design-system/pull/1400))

## 1.7.1

### Patch Changes

- Added current language information in the post-language-switch component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1376](https://github.com/swisspost/design-system/pull/1376))

- Added an `aria-labelledby` attribute to the flyout link lists to bind them to their title. (by [@alizedebray](https://github.com/alizedebray) with [#1370](https://github.com/swisspost/design-system/pull/1370))

- Fixed overlapping of the search input label and the search input icon in the post-search component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1367](https://github.com/swisspost/design-system/pull/1367))

- Removed the `title` and `accessKey` attributes from the skiplinks. (by [@alizedebray](https://github.com/alizedebray) with [#1369](https://github.com/swisspost/design-system/pull/1369))

- Added the name of the active menu item to the hidden label of the flyout close button. (by [@alizedebray](https://github.com/alizedebray) with [#1372](https://github.com/swisspost/design-system/pull/1372))

- Added `aria-label` to the mobile language selector. (by [@alizedebray](https://github.com/alizedebray) with [#1373](https://github.com/swisspost/design-system/pull/1373))

- Added an `aria-labelledby` attribute to the search suggestion list to bind it to its title. (by [@alizedebray](https://github.com/alizedebray) with [#1371](https://github.com/swisspost/design-system/pull/1371))

- Added aria attributes to mobile menu toggle. (by [@alizedebray](https://github.com/alizedebray) with [#1368](https://github.com/swisspost/design-system/pull/1368))

## 1.7.0

### Minor Changes

- Added the new Logo to the internet-header component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1351](https://github.com/swisspost/design-system/pull/1351))

## 1.6.0

### Minor Changes

- Added the possibility to configure the header via `script` tag for Portal specific integrations. A `lang` attribute on the html element is required for this solution to work as well as a `<script id="PPM_HEADER_DATA" type="application/json">` tag containing the header config for the defined language. (by [@gfellerph](https://github.com/gfellerph) with [#1309](https://github.com/swisspost/design-system/pull/1309))

### Patch Changes

- Fixed a bug where a shipment information in the search suggestions was not reset after the search query changed. (by [@gfellerph](https://github.com/gfellerph) with [#1278](https://github.com/swisspost/design-system/pull/1278))

## 1.5.6

### Patch Changes

- Updated the places search filter. The search now shows adresses, localities and regions in addition to points of interest like Post Branches, MyPost 24 and other Post services. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1257](https://github.com/swisspost/design-system/pull/1257))

- Improved the styling for the Internet-Header search input. Text in the input does not overlap the start-search-button anymore. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1257](https://github.com/swisspost/design-system/pull/1257))

## 1.5.5

### Patch Changes

- Reverted the update to Bootstrap 5.2 and Angular 15. This update should have been a major release and will be re-released as such as soon as possible. (by [@gfellerph](https://github.com/gfellerph) with [#1207](https://github.com/swisspost/design-system/pull/1207))

## 1.5.4

### Patch Changes

- Added the environment devs1 to the list of possible environment settings. (by [@gfellerph](https://github.com/gfellerph) with [#1152](https://github.com/swisspost/design-system/pull/1152))

## 1.5.3

### Patch Changes

- Removed @sindresorhus/slugger as dependency, since it's no longer necessary for creating places.post.ch detail page URLs (by [@gfellerph](https://github.com/gfellerph) with [#1120](https://github.com/swisspost/design-system/pull/1120))

- Added more possible environment settings (dev01, dev02, test). (by [@gfellerph](https://github.com/gfellerph) with [#1114](https://github.com/swisspost/design-system/pull/1114))

- Fixed heading level for main navigation from `h2` to `h1` in order to comply to the header level nesting spec. (by [@gfellerph](https://github.com/gfellerph) with [#1123](https://github.com/swisspost/design-system/pull/1123))

## 1.5.2

### Patch Changes

- Updated skiplinks markup to better match the previous implementation and prevent an unnamed landmark error. Also added a title. (by [@gfellerph](https://github.com/gfellerph) with [#1066](https://github.com/swisspost/design-system/pull/1066))

- Updated the styles for the breadcrumb help & contact buttons in order to make the button text accessible for screen readers on mobile (by [@gfellerph](https://github.com/gfellerph) with [#1066](https://github.com/swisspost/design-system/pull/1066))

- Fixed an issue with the footer custom config. The header part of the custom config is optional and is now treated as such. (by [@gfellerph](https://github.com/gfellerph) with [#1066](https://github.com/swisspost/design-system/pull/1066))

- Fixed environment string comparison when upper case characters are used to define the environment property (by [@gfellerph](https://github.com/gfellerph) with [#1082](https://github.com/swisspost/design-system/pull/1082))

## 1.5.1

### Patch Changes

- Fixed a missing margin on the lg viewport for the main navigation (by [@gfellerph](https://github.com/gfellerph) with [#1058](https://github.com/swisspost/design-system/pull/1058))

## 1.5.0

### Minor Changes

- Released the Swiss Post Internet Header to GitHub and NPM (by [@gfellerph](https://github.com/gfellerph) with [#972](https://github.com/swisspost/design-system/pull/972))

### Patch Changes

- Patched relative URLs for the "most searched services" feature of the search box. Relative URLs are always resolved to the base "https://post.ch" (by [@gfellerph](https://github.com/gfellerph) with [#1011](https://github.com/swisspost/design-system/pull/1011))

- Fixed an issue with cross-origin communication between the breadcrumb help and contact overlay iFrames and the host page. Disabled origin checks in the iframeresizer plugin (by [@gfellerph](https://github.com/gfellerph) with [#1008](https://github.com/swisspost/design-system/pull/1008))

- Fixed button alignment in the change company dialog (by [@gfellerph](https://github.com/gfellerph) with [#1010](https://github.com/swisspost/design-system/pull/1010))
