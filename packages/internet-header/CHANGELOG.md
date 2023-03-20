# @swisspost/internet-header

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
