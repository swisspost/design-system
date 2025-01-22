# @swisspost/internet-header

## 2.0.0-next.12

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.12

## 2.0.0-next.11

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.11

## 2.0.0-next.10

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.10

## 2.0.0-next.9

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.9

## 2.0.0-next.8

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.8

## 2.0.0-next.7

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.7

## 2.0.0-next.6

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.6

## 2.0.0-next.5

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.5

## 2.0.0-next.4

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.4

## 2.0.0-next.3

### Major Changes

- Switched stencil hydrated flag from class (`hydrated`) to attribute (`data-hydrated`). This flag indicates when a component finished rendering on the page. If your tests relied on the class being present, please rewrite the selector to use the new attribute selector. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3783](https://github.com/swisspost/design-system/pull/3783))

### Minor Changes

- Added and documented the possibility to create plain links in the main navigation by adding noFlyout: true to the config. The flyout property is now optional and can be omitted. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#3596](https://github.com/swisspost/design-system/pull/3596))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.3

## 1.14.6-next.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.2

## 1.14.6-next.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.1

## 1.14.6-next.0

### Patch Changes

- Applied High Contrast Mode mixin to breadcrumb SVGs for proper color inversion. (by [@schaertim](https://github.com/schaertim) with [#3480](https://github.com/swisspost/design-system/pull/3480))
- Updated dependencies:
  - @swisspost/design-system-styles@9.0.0-next.0

## 1.14.5

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.2.0

## 1.14.4

### Patch Changes

- Improved accessibility of the header search by improving announcement of suggestions to screen reader users. (by [@alizedebray](https://github.com/alizedebray) with [#3328](https://github.com/swisspost/design-system/pull/3328))
- Updated dependencies:
  - @swisspost/design-system-styles@8.1.0

## 1.14.3

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@8.0.0

## 1.14.2

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.4.0

## 1.14.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.3.1

## 1.14.0

### Minor Changes

- Added a new stylesheet containing `:root` CSS custom properties to facilitate implementing styles relative to the header. This will allow putting sticky content right below the header. (by [@alizedebray](https://github.com/alizedebray) with [#3200](https://github.com/swisspost/design-system/pull/3200))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.3.0

## 1.13.12

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@7.2.1

## 1.13.11

### Patch Changes

- Fixed focus trap on overlay of the breadcrumb. Added a focus trap on search overlay (by [@imagoiq](https://github.com/imagoiq) with [#2922](https://github.com/swisspost/design-system/pull/2922))
- Updated dependencies:
  - @swisspost/design-system-styles@7.2.0

## 1.13.10

### Patch Changes

- Fixed display issue with long user/company names being cut off in the user dropdown. (by [@alizedebray](https://github.com/alizedebray) with [#3104](https://github.com/swisspost/design-system/pull/3104))
- Updated dependencies:
  - @swisspost/design-system-styles@7.1.0

## 1.13.9

### Patch Changes

- Refactored brand colors. Renamed `$gray-background` SCSS variable to `$gray` and removed `$gray-background-light` variable because it is a duplication of the already existing variable `$light`.  
  Updated the usage of said variables in dependant packages accordingly. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#2861](https://github.com/swisspost/design-system/pull/2861))

- Fixed logo not scaled properly for header with no meta navigation. (by [@alizedebray](https://github.com/alizedebray) with [#2787](https://github.com/swisspost/design-system/pull/2787))

- Sanitized hours fields in footer against XSS "Incomplete multi-character sanitization" issue. (by [@imagoiq](https://github.com/imagoiq) with [#2807](https://github.com/swisspost/design-system/pull/2807))

- Replaced `system-ui` fallback font with a list of fallbacks to avoid rendering issues with specific writing system (chinese, arabic…). (by [@imagoiq](https://github.com/imagoiq) with [#2735](https://github.com/swisspost/design-system/pull/2735))

- Fixed an issue with invisible focus rings when not using the Design System Styles along with the Swisspost Internet Header. Focus rings are now displayed as expected. (by [@gfellerph](https://github.com/gfellerph) with [#2793](https://github.com/swisspost/design-system/pull/2793))

- Hide the main navigation custom content when empty. (by [@alizedebray](https://github.com/alizedebray) with [#2786](https://github.com/swisspost/design-system/pull/2786))
- Updated dependencies:
  - @swisspost/design-system-styles@7.0.0

## 1.13.8

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.6.4

## 1.13.7

### Patch Changes

- Reinstated original navigation role for post-main-navigation. (by [@imagoiq](https://github.com/imagoiq) with [#2709](https://github.com/swisspost/design-system/pull/2709))
- Updated dependencies:
  - @swisspost/design-system-styles@6.6.3

## 1.13.6

### Patch Changes

- Added secure flag for cookies. (by [@imagoiq](https://github.com/imagoiq) with [#2629](https://github.com/swisspost/design-system/pull/2629))

- Fixed display of internet-header icons on high-contrast mode with light theme. (by [@imagoiq](https://github.com/imagoiq) with [#2669](https://github.com/swisspost/design-system/pull/2669))

- Fixed missing accessible labels on post-meta navigation links. (by [@gfellerph](https://github.com/gfellerph) with [#2700](https://github.com/swisspost/design-system/pull/2700))
- Updated dependencies:
  - @swisspost/design-system-styles@6.6.2

## 1.13.5

### Patch Changes

- Set the size of the logo before it is displayed to avoid a layout jump right after the initial rendering of the header. (by [@alizedebray](https://github.com/alizedebray) with [#2557](https://github.com/swisspost/design-system/pull/2557))
- Updated dependencies:
  - @swisspost/design-system-styles@6.6.1

## 1.13.4

### Patch Changes

- Fixed size of post logo on browser which does not support aspect-ratio property. (by [@imagoiq](https://github.com/imagoiq) with [#2543](https://github.com/swisspost/design-system/pull/2543))

## 1.13.3

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.6.0

## 1.13.2

### Patch Changes

- Improve the main navigation slot placement and styling. (by [@alizedebray](https://github.com/alizedebray) with [#2280](https://github.com/swisspost/design-system/pull/2280))

- Fixed an issue with stickyness scrolling where the logo would not react to scroll events and the header did not appear when scrolling back up. (by [@gfellerph](https://github.com/gfellerph) with [#2377](https://github.com/swisspost/design-system/pull/2377))
- Updated dependencies:
  - @swisspost/design-system-styles@6.5.1

## 1.13.1

### Patch Changes

- Defined @stencil/core and @stencil/store as a devDependency to avoid compatibilities issues. (by [@imagoiq](https://github.com/imagoiq) with [#2313](https://github.com/swisspost/design-system/pull/2313))

- Fixed position of close button on click or on focus in the help overlay. (by [@imagoiq](https://github.com/imagoiq) with [#2365](https://github.com/swisspost/design-system/pull/2365))

- Fixed display of active navigation in High Contrast Mode. (by [@imagoiq](https://github.com/imagoiq) with [#2314](https://github.com/swisspost/design-system/pull/2314))
- Updated dependencies:
  - @swisspost/design-system-styles@6.5.0

## 1.13.0

### Minor Changes

- Added a link to settings in the user drop-down menu for business users. (by [@alizedebray](https://github.com/alizedebray) with [#2234](https://github.com/swisspost/design-system/pull/2234))

### Patch Changes

- Replaced the old twitter logo with the new X logo. (by [@b1aserlu](https://github.com/b1aserlu) with [#2176](https://github.com/swisspost/design-system/pull/2176))
- Updated dependencies:
  - @swisspost/design-system-styles@6.4.4

## 1.12.1

### Patch Changes

- Reverted #2152 because of an issue with importing the internet headers `defineCustomElements`. (by [@gfellerph](https://github.com/gfellerph) with [#2208](https://github.com/swisspost/design-system/pull/2208))
- Updated dependencies:
  - @swisspost/design-system-styles@6.4.3

## 1.12.0

### Minor Changes

- Added component exports to the src/index.ts files, to include them in the dist/index.js and dist/index.esm.js output files and therefore fix our stencil setup. (by [@oliverschuerch](https://github.com/oliverschuerch) with [`f74c9662`](https://github.com/swisspost/design-system/commit/f74c96620dc8095c6b2b51b2d3a3ee97c17e5a7d))

### Patch Changes

- Added logout-url property to override the URL provided by the portal config on the internet-header component. (by [@imagoiq](https://github.com/imagoiq) with [#2114](https://github.com/swisspost/design-system/pull/2114))

- Upgraded builder Stenciljs from version 3 to 4. No user visible changes are expected. (by [@imagoiq](https://github.com/imagoiq) with [#2116](https://github.com/swisspost/design-system/pull/2116))
- Updated dependencies:
  - @swisspost/design-system-styles@6.4.3

## 1.11.0

### Minor Changes

- Added a new button to clear the text in the search box. (by [@b1aserlu](https://github.com/b1aserlu) with [#2036](https://github.com/swisspost/design-system/pull/2036))

### Patch Changes

- Added hide-buttons prop to hide all breadcrumbs buttons. (by [@imagoiq](https://github.com/imagoiq) with [#2027](https://github.com/swisspost/design-system/pull/2027))

- Fixed internet-header search focus truncated on focus-within. (by [@imagoiq](https://github.com/imagoiq) with [#2043](https://github.com/swisspost/design-system/pull/2043))

- Compressed styles output. (by [@imagoiq](https://github.com/imagoiq) with [#2098](https://github.com/swisspost/design-system/pull/2098))
- Updated dependencies:
  - @swisspost/design-system-styles@6.4.2

## 1.10.0

### Minor Changes

- Enabled nesting the header in a different scroll container than the `<body>` element. The header stickyness and logo animation logic will automatically attach to the nearest scrolling container instead of the document when nested in a container that has `overflow: auto | scroll` set. (by [@alizedebray](https://github.com/alizedebray) with [#1855](https://github.com/swisspost/design-system/pull/1855))

- Added ability to toggle programmatically an overlay associated with a button using the `toggleOverlayById` method. (by [@imagoiq](https://github.com/imagoiq) with [#1838](https://github.com/swisspost/design-system/pull/1838))

### Patch Changes

- Fixed an issue with custom configuration that was not applied when the prop "language" was not set on the internet header. (by [@alizedebray](https://github.com/alizedebray) with [#1855](https://github.com/swisspost/design-system/pull/1855))
- Updated dependencies:
  - @swisspost/design-system-styles@6.4.1

## 1.9.1

### Patch Changes

- Clarified and fixed which internet-header versions are available and how to use them. (by [@imagoiq](https://github.com/imagoiq) with [#1792](https://github.com/swisspost/design-system/pull/1792))

- Fixed a line of code that was not compliant with quality rules (by [@b1aserlu](https://github.com/b1aserlu) with [#1872](https://github.com/swisspost/design-system/pull/1872))
- Updated dependencies:
  - @swisspost/design-system-styles@6.4.0

## 1.9.0

### Minor Changes

- Added a cookie settings button to the footer. Applications with integrated UC_UI (through GTM) will see the button and users will be able to edit their preferences. (by [@gfellerph](https://github.com/gfellerph) with [#1730](https://github.com/swisspost/design-system/pull/1730))

- Updated the logo size, the post logo now spans the meta-navigation and scales down on scroll. (by [@gfellerph](https://github.com/gfellerph) with [#1552](https://github.com/swisspost/design-system/pull/1552))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.3.0

## 1.8.3

### Patch Changes

- Fixed an issue with typings that were incorrectly exported, leading to errors when using "defineCustomElements" to import the internet header. (by [@gfellerph](https://github.com/gfellerph) with [#1720](https://github.com/swisspost/design-system/pull/1720))

## 1.8.2

### Patch Changes

- Fixed an issue with uppercase environment strings. Uppercase environment strings caused issues with mapping to datasets throughout the header. Now the property is being converted to lowercase internally. (by [@gfellerph](https://github.com/gfellerph) with [#1670](https://github.com/swisspost/design-system/pull/1670))

- Fixed an issue with the search redirect to track and trace. The track and trace API `ok` response type changed from boolean to string. The new type is now supported in the redirect logic. (by [@gfellerph](https://github.com/gfellerph) with [#1674](https://github.com/swisspost/design-system/pull/1674))

- Fixed broken and outdated output structure of stencil build. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1611](https://github.com/swisspost/design-system/pull/1611))
- Updated dependencies:
  - @swisspost/design-system-styles@6.2.6

## 1.8.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@6.2.5

## 1.8.0

### Minor Changes

- Added tracking calls to the search recommendations. Click events are being sent to the tag manager if it is present on the page (by [@gfellerph](https://github.com/gfellerph) with [#1548](https://github.com/swisspost/design-system/pull/1548))

- Implemented kill-switch for coveo suggestions based on the `isCustomSuggestionHidden` option in the search configuration. (by [@gfellerph](https://github.com/gfellerph) with [#1591](https://github.com/swisspost/design-system/pull/1591))

### Patch Changes

- Deprecated the stickyness option "full". It should not be used anymore as this mode takes up too much screen space (by [@gfellerph](https://github.com/gfellerph) with [#1551](https://github.com/swisspost/design-system/pull/1551))

- Fixed jobs login widget. An optimized widget is now rendered without requesting the whole KLP widget logic (by [@gfellerph](https://github.com/gfellerph) with [#1568](https://github.com/swisspost/design-system/pull/1568))

- Fixed an issue with the search button. Focusing or clicking the button will no longer change its position and search queries can be performed as usual. (by [@gfellerph](https://github.com/gfellerph) with [#1590](https://github.com/swisspost/design-system/pull/1590))
- Updated dependencies:
  - @swisspost/design-system-styles@6.2.4

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
