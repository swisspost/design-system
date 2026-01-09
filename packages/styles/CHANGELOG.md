# @swisspost/design-system-styles

## 10.0.0-next.56

### Major Changes

- Updated styles for elements slotted in the `post-header` component. Slotted lists should now omit the `.list-inline` class and will be automatically styled as part of the `post-header`.
  Keeping the `.list-inline` class will cause incorrect spacing between header elements. (by [@alizedebray](https://github.com/alizedebray) with [#6661](https://github.com/swisspost/design-system/pull/6661))

- Removed the `traget-group.css` file, target group styles are now bundled with the `post-header` styles. The `.traget-group` class no longer exist and the component will only work when placed into a `post-header`. (by [@alizedebray](https://github.com/alizedebray) with [#6661](https://github.com/swisspost/design-system/pull/6661))

- Refactored the icon mixins so that icons no longer need to be included separately, imports are now handled automatically. The `custom-property` mixin as therefore be removed entirely.

  The `icon` mixin arguments have also been updated: `$height` and `$width` have been replaced with a single `$size` since all icons are square. (by [@alizedebray](https://github.com/alizedebray) with [#6836](https://github.com/swisspost/design-system/pull/6836))

- Removed the subnavigation component in favor of page tabs. (by [@alizedebray](https://github.com/alizedebray) with [#6913](https://github.com/swisspost/design-system/pull/6913))

### Minor Changes

- Extended Swiss Post Sans font support with Extra Black (950) weight. (by [@alizedebray](https://github.com/alizedebray) with [#6932](https://github.com/swisspost/design-system/pull/6932))

- Implemented a `Divider` html/css component using tokens for styles. Divider documentation is also added to /Components/Divider page. (by [@bucknatt](https://github.com/bucknatt) with [#6783](https://github.com/swisspost/design-system/pull/6783))

### Patch Changes

- Integrated the burger menu button into the `<post-header>` by removing the previous `post-togglebutton` slot and introducing the required `textMenu` prop. (by [@myrta2302](https://github.com/myrta2302) with [#6801](https://github.com/swisspost/design-system/pull/6801))

- Fixed an issue where sections could overflow the body when a scrollbar was present due to incorrect width calculations. (by [@alizedebray](https://github.com/alizedebray) with [#6933](https://github.com/swisspost/design-system/pull/6933))

- Update the `post-megadropdown` to allow full customization of its content. The `post-megadropdown` can now contain any HTML elements, not just lists of links.

  As a result, list styling is no longer applied automatically.
  If you want a properly styled list of links, you must now add the required `post-megadropdown-*` classes to the corresponding elements yourself.

  BEFORE:

  ```html
  <post-megadropdown id="packages" label-close="Close" label-back="Back">
    <a class="post-megadropdown-overview" href="/packages">Overview Packages</a>
    <post-list>
      <p>Send packages</p>
      <post-list-item><a href="/sch">Packages Switzerland</a></post-list-item>
      <post-list-item><a href="/kl">Small goods international</a></post-list-item>
    </post-list>
    <post-list>
      <p><a href="/step-by-step">Step by step</a></p>
      <post-list-item><a href="/sch">Packages Switzerland</a></post-list-item>
      <post-list-item><a href="/kl">Small goods international</a></post-list-item>
    </post-list>
  </post-megadropdown>
  ```

  AFTER:

  ````html
  <post-megadropdown id="packages" label-close="Close" label-back="Back">
    <a class="post-megadropdown-overview" href="/packages">Overview Packages</a>
    <div class="row row-cols-1 row-cols-sm-2">
      <div class="col">
        <p class="post-megadropdown-list-title" id="send-packages">Send packages</p>
        <ul class="post-megadropdown-list" aria-labelledby="send-packages">
          <li><a href="/sch">Packages Switzerland</a></li>
          <li><a href="/kl">Small goods international</a></li>
        </ul>
      </div>
      <div class="col">
        <a class="post-megadropdown-list-title" id="step-by-step-packages" href="/step-by-step"
          >Step by step</a
        >
        <ul class="post-megadropdown-list" aria-labelledby="step-by-step-packages">
          <li><a href="/sch">Packages Switzerland</a></li>
          <li><a href="/kl">Small goods international</a></li>
        </ul>
      </div>
    </div>
  </post-megadropdown>
  ``` (by [@alizedebray](https://github.com/alizedebray) with
  [#6891](https://github.com/swisspost/design-system/pull/6891))
  ````

- Updated the `<post-header>` component to show the local-header when the mobile menu is open and the page is scrolled. (by [@myrta2302](https://github.com/myrta2302) with [#6758](https://github.com/swisspost/design-system/pull/6758))

- Removed `local-controls` and `navigation-controls` slots from the `post-header` component. Use the new `local-nav` slot for all application-specific controls. (by [@alizedebray](https://github.com/alizedebray) with [#6747](https://github.com/swisspost/design-system/pull/6747))

- Simplified the `post-footer` component by removing the `post-list` and `post-list-item`. The footer now only uses simple `ul` and `li` tags. (by [@leagrdv](https://github.com/leagrdv) with [#6740](https://github.com/swisspost/design-system/pull/6740))
- Updated dependencies:
  - @swisspost/design-system-icons@10.0.0-next.56

## 10.0.0-next.55

### Major Changes

- Removed the HTML stepper component and replaced it with new `post-stepper` and `post-stepper-item` web components. (by [@leagrdv](https://github.com/leagrdv) with [#6502](https://github.com/swisspost/design-system/pull/6502))

- Added the `data-type` attribute to the dialog component. The icon is now automatically selected based on this attribute and limited to the four signal types: info, success, warning, and error. (by [@alizedebray](https://github.com/alizedebray) with [#6625](https://github.com/swisspost/design-system/pull/6625))

- Aligned viewport-based utility classes with named percentage sizes. (by [@hugomslv](https://github.com/hugomslv) with [#6191](https://github.com/swisspost/design-system/pull/6191))

- Updated section custom properties: - Renamed `--post-section-container-content-offset` → `--post-section-content-offset`
  - Removed `--post-section-container-width` (use `--post-container-max-width` instead)
  - Removed `--post-section-container-padding` (use `--post-container-padding-inline` instead) (by [@alizedebray](https://github.com/alizedebray) with [#6641](https://github.com/swisspost/design-system/pull/6641))

### Patch Changes

- Removed the need for a palette class on the dialog component. (by [@alizedebray](https://github.com/alizedebray) with [#6625](https://github.com/swisspost/design-system/pull/6625))

- Updated form select arrow's color to be visible in dark mode. (by [@leagrdv](https://github.com/leagrdv) with [#6597](https://github.com/swisspost/design-system/pull/6597))

- Updated sections to ensure they function correctly when nested inside containers. (by [@alizedebray](https://github.com/alizedebray) with [#6641](https://github.com/swisspost/design-system/pull/6641))
- Updated dependencies:
  - @swisspost/design-system-icons@10.0.0-next.55

## 10.0.0-next.54

### Minor Changes

- Updated the `post-header` to use aria-current="location" for active header links outside main navigation to improve accessibility. (by [@myrta2302](https://github.com/myrta2302) with [#6566](https://github.com/swisspost/design-system/pull/6566))

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-icons@10.0.0-next.54

## 10.0.0-next.53

### Patch Changes

- Added Tailwind v3 token output alongside the existing v4 format to support both Tailwind versions. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#6586](https://github.com/swisspost/design-system/pull/6586))
- Updated dependencies:
  - @swisspost/design-system-icons@10.0.0-next.53

## 10.0.0-next.52

### Patch Changes

- Replaced `Post Icons` with their corresponding `UI Icon` equivalents across the package to align icon usage with the current design guidelines. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#6217](https://github.com/swisspost/design-system/pull/6217))

- Fixed an issue with button styles specificity where e.g. icon buttons got overwritten by the button styles. Button styles are now delivered in the correct source order, also when selectively importing component CSS. (by [@gfellerph](https://github.com/gfellerph) with [#6553](https://github.com/swisspost/design-system/pull/6553))
- Updated dependencies:
  - @swisspost/design-system-icons@10.0.0-next.52

## 10.0.0-next.51

### Major Changes

- The `post-icon` mixin has been renamed to `icon` and now requires icons to be preloaded using the `custom-property` mixin at the top of the file.  
  BEFORE:

  ```scss
  .my-icon {
    @include post.post-icon(
      $name: 'accessibility',
      // optional
      $color: '#fc0',
      $width: 1em,
      $height: 1em
    );
  }
  ```

  AFTER:

  ````scss
  // Load icon(s) at the top of your file
  // For a single icon:
  @include post.custom-property('accessibility', './path/to/icon/folder');

  // For multiple icons in the same file:
  @include post.custom-property(('accessibility', 'arrow'), './path/to/icon/folder');

  .my-icon {
    @include post.icon(
      $name: 'accessibility',
      // optional
      $color: '#fc0',
      $width: 1em,
      $height: 1em
    );
  }
  ``` (by [@alionazherdetska](https://github.com/alionazherdetska) with [#6372](https://github.com/swisspost/design-system/pull/6372))
  ````

### Patch Changes

- Changed Tailwind token generation output format to meet the Tailwind v4 configuration requirements. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#6474](https://github.com/swisspost/design-system/pull/6474))

- Fixed header position inside the `<dialog>` element when content becomes scrollable. The header, footer and close button now remain visible while only the body scrolls. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#6509](https://github.com/swisspost/design-system/pull/6509))
- Updated dependencies:
  - @swisspost/design-system-icons@10.0.0-next.51

## 10.0.0-next.50

### Major Changes

- Removed the `.btn-close` and replaced it with the `post-closebutton` component in the dialog, toast and `post-popover` components. (by [@leagrdv](https://github.com/leagrdv) with [#6361](https://github.com/swisspost/design-system/pull/6361))

### Minor Changes

- Added the user menu for logged in users in the `post-header` component. (by [@leagrdv](https://github.com/leagrdv) with [#6402](https://github.com/swisspost/design-system/pull/6402))

- Updated the `<post-header>` component by adding a new slot for auxiliary navigation links on the right side of the main-navigation. (by [@myrta2302](https://github.com/myrta2302) with [#6421](https://github.com/swisspost/design-system/pull/6421))

### Patch Changes

- Disabled automatic browser detection of the dark color scheme. (by [@leagrdv](https://github.com/leagrdv) with [#6173](https://github.com/swisspost/design-system/pull/6173))

- Updated the signal icons. (by [@alizedebray](https://github.com/alizedebray) with [#6268](https://github.com/swisspost/design-system/pull/6268))

- Fixed bottom margin for buttons inside `<dialog>` element when content becomes scrollable. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#6414](https://github.com/swisspost/design-system/pull/6414))

- Added icons to the header meta navigation links. (by [@alizedebray](https://github.com/alizedebray) with [#6413](https://github.com/swisspost/design-system/pull/6413))
- Updated dependencies:
  - @swisspost/design-system-icons@10.0.0-next.50

## 10.0.0-next.49

### Major Changes

- Updated interactive cards to have the `.card` class directly set on the `post-linkarea` component, reducing unnecessary DOM nesting. (by [@leagrdv](https://github.com/leagrdv) with [#6367](https://github.com/swisspost/design-system/pull/6367))

### Minor Changes

- Added back the `.small` utility class (font-size: 80%) for backwards compatibility. (by [@hugomslv](https://github.com/hugomslv) with [#6273](https://github.com/swisspost/design-system/pull/6273))

### Patch Changes

- Added styles to highlight the current navigation item marked with `aria-current="page"` and its potential parent item in the header main navigation. (by [@myrta2302](https://github.com/myrta2302) with [#6216](https://github.com/swisspost/design-system/pull/6216))

- Fixed icon loading by replacing CDN-based icon URLs with `CSS custom properties` and dynamic CSS file loading. Components using the `post-icon mixin` now reliably display icons without external dependencies. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#6214](https://github.com/swisspost/design-system/pull/6214))

- Updated the `toast` component icons. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#6315](https://github.com/swisspost/design-system/pull/6315))

- Fixed the padding on the dialog component, when no action buttons are present. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#6215](https://github.com/swisspost/design-system/pull/6215))

- Fixed the `post-header` component to consistently omit the title container when no title is defined across all configurations. (by [@alizedebray](https://github.com/alizedebray) with [#6244](https://github.com/swisspost/design-system/pull/6244))

- Fixed dialog grid-area implementation. `.dialog-header` and `.dialog-body` do now also span over the icon and/or close-button area, if they are not present. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#6215](https://github.com/swisspost/design-system/pull/6215))
- Updated dependencies:
  - @swisspost/design-system-icons@10.0.0-next.49

## 10.0.0-next.48

### Major Changes

- Renamed the loader classes from `loader-*` to `spinner-*`. (by [@bucknatt](https://github.com/bucknatt) with [#6194](https://github.com/swisspost/design-system/pull/6194))

- Changed the `fonts.scss` import location from `src/elements/body.scss` to `src/components/_index.scss`.  
  This way, we can keep it in the bundled output files, but also allow projects who want to import only specific SASS/CSS files, to self-host their fonts and implement their own `@font-face` definitions.

  Since the usage of the `body.{scss|css}` file is mandatory, this was not possible before. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#6188](https://github.com/swisspost/design-system/pull/6188))

### Patch Changes

- Fixed file input alignment and prevented validation icon from overlapping the selector button on valid/invalid states. (by [@bucknatt](https://github.com/bucknatt) with [#6198](https://github.com/swisspost/design-system/pull/6198))

## 10.0.0-next.47

### Major Changes

- Removed the Standard HTML Banner component (`.banner`, `.banner-*`) in favor of the `post-banner` web component.  
  BEFORE:

  ```html
  <div role="alert" class="banner banner-success">
    <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
  </div>
  ```

  AFTER:

  ````html
  <post-banner type="success">
    <p>This is the content of the banner. It helps to draw attention to critical messages.</p>
  </post-banner>
  ``` (by [@alizedebray](https://github.com/alizedebray) with
  [#6078](https://github.com/swisspost/design-system/pull/6078))
  ````

- Removed classes for the card CSS component, following the removal of bootstrap:
  - `.card-header`
  - `.card-footer`
  - `.card-img`
  - `.card-img-top`
  - `.card-img-bottom` (by [@leagrdv](https://github.com/leagrdv) with [#5966](https://github.com/swisspost/design-system/pull/5966))

### Minor Changes

- Internalized bootstrap visibility utilities. (by [@hugomslv](https://github.com/hugomslv) with [#6079](https://github.com/swisspost/design-system/pull/6079))

- Added the `.z-header`, `.z-spinner`, `.z-toast` and `.z-fixed` z-index utility classes. (by [@leagrdv](https://github.com/leagrdv) with [#6012](https://github.com/swisspost/design-system/pull/6012))

## 10.0.0-next.46

### Major Changes

- Simplified the banner and toast components:
  - Removed the `icon` property; icons are no longer configurable
  - Removed the `neutral` variant; the default is now `info`
  - Renamed the `danger` variant to `error` (by [@alizedebray](https://github.com/alizedebray) with [#6063](https://github.com/swisspost/design-system/pull/6063))

### Minor Changes

- Added missing `bottom` and `end` controls to position utilities for complete configuration. Replaced empty label option with `unset` for better clarity across all position controls (`top`, `bottom`, `start`, `end`).
  Position utilities now use logical CSS inset properties (inset-block-start, inset-block-end, inset-inline-start, inset-inline-end).
  This means `start` and `end` follow the writing direction — left in LTR and right in RTL. (by [@bucknatt](https://github.com/bucknatt) with [#6002](https://github.com/swisspost/design-system/pull/6002))

## 10.0.0-next.45

## 10.0.0-next.44

### Major Changes

- Renamed the following CSS custom properties: - `--post-global-header-height` → `--post-global-header-expanded-height`
  - `--post-local-header-height` → `--post-local-header-expanded-height`
  - `--post-local-header-min-height` → `--post-local-header-expanded-min-height` (by [@alizedebray](https://github.com/alizedebray) with [#5933](https://github.com/swisspost/design-system/pull/5933))

### Minor Changes

- Internalized bootstrap z-index utilities. (by [@hugomslv](https://github.com/hugomslv) with [#5741](https://github.com/swisspost/design-system/pull/5741))

## 10.0.0-next.43

### Major Changes

- Removed the slider (form range) component - as it was depending on bootstrap - which will be replaced by a web component in the future. (by [@leagrdv](https://github.com/leagrdv) with [#5850](https://github.com/swisspost/design-system/pull/5850))

- Updated color palettes to use the `light-dark()` CSS function for setting component color schemes on supporting browsers. A fallback solution is included for unsupported browsers.

  Palettes now require adding the `.palette` class in addition to existing palette classes (e.g., `.palette-default`, `.palette-brand`).

  BEFORE:

  ```html
  <div class="palette-brand">Content</div>
  ```

  AFTER:

  ```html
  <div class="palette palette-brand">Content</div>
  ```

  Also renamed the following CSS custom properties:
  - `--post-current-palette-fg` → `--post-current-fg`
  - `--post-current-palette-bg` → `--post-current-bg` (by [@alizedebray](https://github.com/alizedebray) with [#5250](https://github.com/swisspost/design-system/pull/5250))

- Removed the bootstrap dependency. (by [@leagrdv](https://github.com/leagrdv) with [#5850](https://github.com/swisspost/design-system/pull/5850))

- Removed all of the overrides of SCSS variables and classes of Bootstrap. (by [@leagrdv](https://github.com/leagrdv) with [#5850](https://github.com/swisspost/design-system/pull/5850))

- Removed deprecated classes and SCSS variables for the spinner:
  - `.loader-xs`
  - `.loader-sm`
  - `$spinner-size-xs`
  - `$spinner-size-sm`
  - `$spinner-border-width-xs`
  - `$spinner-border-width-sm` (by [@bucknatt](https://github.com/bucknatt) with [#5951](https://github.com/swisspost/design-system/pull/5951))

- Deleted SCSS map variable `$notification-font-size-map`. (by [@bucknatt](https://github.com/bucknatt) with [#5942](https://github.com/swisspost/design-system/pull/5942))

- Removed the `ng-bootstrap` dependency as well as all of the components built on it:
  - datepicker
  - timepicker
  - pagination
  - typeahead
  - dropdown
  - datatable
  - progressbar (by [@leagrdv](https://github.com/leagrdv) with [#5830](https://github.com/swisspost/design-system/pull/5830))

### Minor Changes

- Added the `target group` css component within the `post-header` component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#5687](https://github.com/swisspost/design-system/pull/5687))

- Add modern text wrapping properties to headings and paragraphs (by [@gfellerph](https://github.com/gfellerph) with [#5902](https://github.com/swisspost/design-system/pull/5902))

### Patch Changes

- Changed Tailwind token generation output format to meet the Tailwind v4 configuration requirements. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#5812](https://github.com/swisspost/design-system/pull/5812))

- Internalized bootstrap interactions utilities (pointer-events and user-select) into the design system. (by [@leagrdv](https://github.com/leagrdv) with [#5868](https://github.com/swisspost/design-system/pull/5868))

- Add caption-side style to the table component. This will place the caption correctly for projects not using the resets.css (by [@gfellerph](https://github.com/gfellerph) with [#5900](https://github.com/swisspost/design-system/pull/5900))

## 10.0.0-next.42

## 10.0.0-next.41

### Major Changes

- Renamed the `chip-filter` to `chip-selectable` and removed the `chip-sm` variant. (by [@leagrdv](https://github.com/leagrdv) with [#5755](https://github.com/swisspost/design-system/pull/5755))

- Renamed the following CSS custom properties and Sass variables:
  - `--post-breakpoint-widths` → `--post-grid-breakpoint-widths`
  - `--post-breakpoint-keys` → `--post-grid-breakpoint-keys`
  - `--post-breakpoint-names` → `--post-grid-breakpoint-devices`
  - `$grid-breakpoints-key-name-map` → `$grid-breakpoint-to-device` (by [@alizedebray](https://github.com/alizedebray) with [#5739](https://github.com/swisspost/design-system/pull/5739))

### Minor Changes

- Updated media utilities to support device names: `mobile`, `tablet`, and `desktop`. (by [@alizedebray](https://github.com/alizedebray) with [#5739](https://github.com/swisspost/design-system/pull/5739))

## 10.0.0-next.40

### Major Changes

- Renamed the `List Group` component to `List Interactive`. (by [@schaertim](https://github.com/schaertim) with [#5675](https://github.com/swisspost/design-system/pull/5675))

## 10.0.0-next.39

### Major Changes

- Removed the file responsible for preventing fouc (flashes of unstyled content) for the web-components: `@swisspost/design-system-styles/components/not-defined.(scss|css)`. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#5696](https://github.com/swisspost/design-system/pull/5696))

### Patch Changes

- Fixed an issue on iOS Chrome where floating labels would appear above the mobile navigation menu after users interacted with multiple form inputs, by increasing the z-index hierarchy for `post-header` components on mobile and tablet devices to ensure proper layering and maintain the navigation menu's top-level priority. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#5550](https://github.com/swisspost/design-system/pull/5550))

- Adjusted label top position to prevent text from appearing between label and border on Windows at 125% scaling. (by [@myrta2302](https://github.com/myrta2302) with [#5547](https://github.com/swisspost/design-system/pull/5547))

## 10.0.0-next.38

## 10.0.0-next.37

### Major Changes

- Fixed the disappearing validation icons on text input fields when browser autocomplete is applied. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#5339](https://github.com/swisspost/design-system/pull/5339))

- Prefixed the following CSS custom variables with `post`:
  - `--section-width` is now `--post-section-width`
  - `--section-container-width` is now `--post-section-container-width`
  - `--section-container-content-offset` is now `--post-section-container-content-offset`
  - `--section-container-padding` is now `--post-section-container-padding` (by [@leagrdv](https://github.com/leagrdv) with [#5354](https://github.com/swisspost/design-system/pull/5354))

### Patch Changes

- Fixed background on disabled textarea labels to maintain readability when content overflows. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#5453](https://github.com/swisspost/design-system/pull/5453))

## 9.0.0-next.36

## 9.0.0-next.35

### Major Changes

- Removed all imports and CSS related to the bootstrap `navbar` component. (by [@leagrdv](https://github.com/leagrdv) with [#5313](https://github.com/swisspost/design-system/pull/5313))

- Removed all of the imports from bootstrap regarding the `modal` component as well as all of its CSS style. (by [@leagrdv](https://github.com/leagrdv) with [#5309](https://github.com/swisspost/design-system/pull/5309))

- Removed the `@mixin scroll-shadows-y` as its only use was in the modal component which has been removed. (by [@leagrdv](https://github.com/leagrdv) with [#5309](https://github.com/swisspost/design-system/pull/5309))

### Patch Changes

- Fixed an issue on iOS where floating labels would appear above the `post-header` component when an input was focused, by lowering their z-index to ensure they remain underneath the header, even during Safari's automatic zoom on form inputs, which alters the rendering context and can mess with layering. (by [@leagrdv](https://github.com/leagrdv) with [#5346](https://github.com/swisspost/design-system/pull/5346))

- Added back the `.text-reset` class as it was deleted accidentally. (by [@leagrdv](https://github.com/leagrdv) with [#5290](https://github.com/swisspost/design-system/pull/5290))

## 9.0.0-next.34

### Major Changes

- Removed all of the font sizes variables (`$font-size-*`) and CSS classes (`.font-size-*`), which can now be replaced by the font sizes utilities. (by [@leagrdv](https://github.com/leagrdv) with [#5205](https://github.com/swisspost/design-system/pull/5205))

- Removed the `@mixin font-curve()`. (by [@leagrdv](https://github.com/leagrdv) with [#5205](https://github.com/swisspost/design-system/pull/5205))

- Updated the file structure for the `post-footer` component global styles:  
  `dist/components/globals/post-footer.(css|scss)` -> `dist/components/footer/index.(css|scss)`

  If you're importing one of these files manually in your project, you'll need to update the import path! (by [@oliverschuerch](https://github.com/oliverschuerch) with [#5180](https://github.com/swisspost/design-system/pull/5180))

- Renamed all of the font curve variables (`$fs-*`) and CSS classes (`.fs-*`) to numbers 1 to 11 (e.g. `fs-huge` is now `fs-1`, and `fs-tiny` would be `fs-11`). (by [@leagrdv](https://github.com/leagrdv) with [#5205](https://github.com/swisspost/design-system/pull/5205))

### Minor Changes

- Added 11 font sizes utilities, from `.fs-1` to `.fs-11`. (by [@leagrdv](https://github.com/leagrdv) with [#5205](https://github.com/swisspost/design-system/pull/5205))

### Patch Changes

- Resolved styling inconsistencies for `segmented-button` component on iOS devices. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4964](https://github.com/swisspost/design-system/pull/4964))

- Updated the `not-defined` selector to ensure server-side rendered components are visible on the client-side even before JavaScript initializes, while client-side rendered web components remain hidden until fully hydrated. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#5163](https://github.com/swisspost/design-system/pull/5163))

## 9.0.0-next.33

### Patch Changes

- Fixed inconsistent paddings in the `post-header` component for wrapped and unwrapped titles across mobile and tablet devices. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4971](https://github.com/swisspost/design-system/pull/4971))

- Adjusted the placement of the Back-to-top button to accommodate the sticky header. (by [@myrta2302](https://github.com/myrta2302) with [#4879](https://github.com/swisspost/design-system/pull/4879))

- Updated `<post-header>` to expose header height custom CSS properties to `:root` and set `scroll-padding-top` to visible header height. (by [@myrta2302](https://github.com/myrta2302) with [#4925](https://github.com/swisspost/design-system/pull/4925))

## 9.0.0-next.32

### Patch Changes

- Removed the `transform` property from the scroll-locked `post-header` parent, to avoid side effects. Updated the mobile menu of the `post-header`, so it works as before. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4957](https://github.com/swisspost/design-system/pull/4957))

## 9.0.0-next.31

### Major Changes

- Removed the deprecated css component `card-button`. (by [@leagrdv](https://github.com/leagrdv) with [#4950](https://github.com/swisspost/design-system/pull/4950))

- Updated CSS and SCSS entry file names to better represent the styles contained. There is now the choice between compact and default appearance instead of internal and external styles. This change better represents the resulting look of the components.
  - post-external.[s]css -> post-default.[s]css
  - post-internal.[s]css -> post-compact.[s]css
  - post-tokens-external.[s]css -> post-tokens-default.[s]css
  - post-tokens-internal.[s]css -> post-tokens-compact.[s]css
  - cargo-external.[s]css -> cargo-default.[s]css
  - cargo-internal.[s]css -> cargo-compact.[s]css
  - cargo-tokens-external.[s]css -> cargo-tokens-default.[s]css
  - cargo-tokens-internal.[s]css -> cargo-tokens-compact.[s]css (by [@gfellerph](https://github.com/gfellerph) with [#4608](https://github.com/swisspost/design-system/pull/4608))

### Minor Changes

- Removed the `@mixin placeholder` as using the `::placeholder` CSS selector is now widely available. (by [@leagrdv](https://github.com/leagrdv) with [#4934](https://github.com/swisspost/design-system/pull/4934))

### Patch Changes

- Replaced usages of `color: inherit` with tokens to improve high contrast mode compatability. (by [@schaertim](https://github.com/schaertim) with [#4933](https://github.com/swisspost/design-system/pull/4933))

- Improved header accessibility by ensuring that elements which are hidden on scroll get visible again if they receive focus. (by [@leagrdv](https://github.com/leagrdv) with [#4767](https://github.com/swisspost/design-system/pull/4767))

- Fixed the stepper as the progress bar was not being filled correctly on steps progress on firefox. (by [@leagrdv](https://github.com/leagrdv) with [#4893](https://github.com/swisspost/design-system/pull/4893))

- Removed the usage of the deprecated pseudo-element `::input-placeholder`. This fixes an issue with CSS validation tools that don't allow deprecated selectors. (by [@leagrdv](https://github.com/leagrdv) with [#4934](https://github.com/swisspost/design-system/pull/4934))

## 9.0.0-next.30

### Major Changes

- Uninstalled **Intranet Header** package and all its style references. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4587](https://github.com/swisspost/design-system/pull/4587))

- Removed z-index scss variables that were no longer necessary as they had been replaced with popover elements. (by [@leagrdv](https://github.com/leagrdv) with [#4658](https://github.com/swisspost/design-system/pull/4658))

### Patch Changes

- Internalized bootstrap border utility classes. (by [@myrta2302](https://github.com/myrta2302) with [#3751](https://github.com/swisspost/design-system/pull/3751))

- Merged utility classes that were setting the same properties, which reduces the size of the CSS output. (by [@leagrdv](https://github.com/leagrdv) with [#4654](https://github.com/swisspost/design-system/pull/4654))

- Fixed the mobile menu height in the `post-header` component when the scrollable parent is not the document's body. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4829](https://github.com/swisspost/design-system/pull/4829))

- Updated header button styles to match the header anchor styles. (by [@myrta2302](https://github.com/myrta2302) with [#4785](https://github.com/swisspost/design-system/pull/4785))

- Switched the outermost scrollable parent of the `post-header` component from the `html` to the `body` element. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4823](https://github.com/swisspost/design-system/pull/4823))

- Cleaned up \_button.scss by moving button-specific variables to button.scss. Redefined cross-referenced variables in respective component files. Removed unused variables. (by [@schaertim](https://github.com/schaertim) with [#4702](https://github.com/swisspost/design-system/pull/4702))

- Improved the consistency of styles for buttons and links in HCM. (by [@leagrdv](https://github.com/leagrdv) with [#4864](https://github.com/swisspost/design-system/pull/4864))

- Corrected icon URL declarations to avoid errors during the build process when using Vite. (by [@alizedebray](https://github.com/alizedebray) with [#4853](https://github.com/swisspost/design-system/pull/4853))

## 9.0.0-next.29

## 9.0.0-next.28

## 9.0.0-next.27

## 9.0.0-next.26

### Patch Changes

- Fixed calculation of `post-mainnavigation` mobile placement and put back the header border on HCM. (by [@leagrdv](https://github.com/leagrdv) with [#4806](https://github.com/swisspost/design-system/pull/4806))

- Applied styles to the slot title selector rather than `h1` on the `post-header` to have consistent styles whether or not `h1` is used. (by [@leagrdv](https://github.com/leagrdv) with [#4782](https://github.com/swisspost/design-system/pull/4782))

## 9.0.0-next.25

### Patch Changes

- Updated `post-header` styles to hide horizontal overflow on desktop only. (by [@myrta2302](https://github.com/myrta2302) with [#4792](https://github.com/swisspost/design-system/pull/4792))

## 9.0.0-next.24

### Patch Changes

- Updated the icon sizes in the `post-header` and the `post-language-switch` components, to match the design specs. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4783](https://github.com/swisspost/design-system/pull/4783))

## 9.0.0-next.23

## 9.0.0-next.22

### Patch Changes

- Added a fixed height to the `post-header` until it's fully loaded to prevent layout shifts. (by [@alizedebray](https://github.com/alizedebray) with [#4769](https://github.com/swisspost/design-system/pull/4769))

## 9.0.0-next.21

## 9.0.0-next.20

### Patch Changes

- Increased gap between header title and local controls in `post-header`. (by [@leagrdv](https://github.com/leagrdv) with [#4739](https://github.com/swisspost/design-system/pull/4739))

- Fixed breakpoint utility, by normalizing the read custom-properties. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4764](https://github.com/swisspost/design-system/pull/4764))

- Updated validation styles to be applied to all input types. (by [@myrta2302](https://github.com/myrta2302) with [#4762](https://github.com/swisspost/design-system/pull/4762))

## 9.0.0-next.19

### Major Changes

- Removed deprecated legacy utility classes. (by [@leagrdv](https://github.com/leagrdv) with [#4631](https://github.com/swisspost/design-system/pull/4631))

- Removed some utility spacing/sizing sizes to better reflect the ones used on Figma. (by [@leagrdv](https://github.com/leagrdv) with [#4588](https://github.com/swisspost/design-system/pull/4588))

### Minor Changes

- Added helper classes to the `.section` component, which allow content to bleed out to the edge of the `.section` or the `.container` element. Either on both sides, or only to the left or right edge. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4741](https://github.com/swisspost/design-system/pull/4741))

- Added new css component `.section` to be used as wrapper for hero elements and/or palettes. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4733](https://github.com/swisspost/design-system/pull/4733))

- Added a new CSS output file that includes all the utility classes. (by [@alizedebray](https://github.com/alizedebray) with [#4613](https://github.com/swisspost/design-system/pull/4613))

### Patch Changes

- Internalized Bootstrap `.text-truncate` class into the Design System. (by [@veyaromain](https://github.com/veyaromain) with [#4599](https://github.com/swisspost/design-system/pull/4599))

- Update the `--header-height` custom property to take the scroll position and reduced header height into account. (by [@alizedebray](https://github.com/alizedebray) with [#4746](https://github.com/swisspost/design-system/pull/4746))

- Added high contrast mode styles for header. (by [@myrta2302](https://github.com/myrta2302) with [#4262](https://github.com/swisspost/design-system/pull/4262))

- Removed the custom properties from the `post-header` component styles and moved them to the styles package. This change allows these properties to be accessed before the component is loaded. (by [@leagrdv](https://github.com/leagrdv) with [#4663](https://github.com/swisspost/design-system/pull/4663))

## 9.0.0-next.18

### Major Changes

- Removed the `.card-group` class. (by [@leagrdv](https://github.com/leagrdv) with [#4577](https://github.com/swisspost/design-system/pull/4577))

### Patch Changes

- Updated styles for the header main navigation and mega dropdown elements. (by [@leagrdv](https://github.com/leagrdv) with [#4621](https://github.com/swisspost/design-system/pull/4621))

- Updated styles of the card component. (by [@leagrdv](https://github.com/leagrdv) with [#4577](https://github.com/swisspost/design-system/pull/4577))

- Fixed segmented button style in HCM. (by [@leagrdv](https://github.com/leagrdv) with [#4311](https://github.com/swisspost/design-system/pull/4311))

## 9.0.0-next.17

### Patch Changes

- Included the `post-linkarea` component in the `not-defined.scss` file. (by [@leagrdv](https://github.com/leagrdv) with [#4648](https://github.com/swisspost/design-system/pull/4648))

- Removed legacy Sass forwards for compilation options. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4642](https://github.com/swisspost/design-system/pull/4642))

## 9.0.0-next.16

## 9.0.0-next.15

## 9.0.0-next.14

### Major Changes

- Removed the `.lh-base` utility class. (by [@leagrdv](https://github.com/leagrdv) with [#4360](https://github.com/swisspost/design-system/pull/4360))

- Removed Bootstrap shadow utility classes from the Design System, as the elevation classes are replacing them. (by [@leagrdv](https://github.com/leagrdv) with [#4361](https://github.com/swisspost/design-system/pull/4361))

- Renamed elevation utility classes and SCSS variables to allow for more variants in the future. (by [@leagrdv](https://github.com/leagrdv) with [#4361](https://github.com/swisspost/design-system/pull/4361))

### Minor Changes

- Removed `post-popovercontainer` from the `post-megadropdown` component and added desktop animations with new slide-down and slide-up effects. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4421](https://github.com/swisspost/design-system/pull/4421))

- Removed deprecated `$displayX-weight` scss variables and font-weight light (`.light`) utilities as the new Swiss Post font does not have a 300 weight version. (by [@leagrdv](https://github.com/leagrdv) with [#4531](https://github.com/swisspost/design-system/pull/4531))

### Patch Changes

- Made the following components hidden until fully loaded to prevent flickering: `post-avatar`, `post-banner`, `post-breadcrumb`, `post-breadcrumb-item`, `post-closebutton`, `post-collapsible-trigger`, `post-footer`, `post-header`, `post-language-option`, `post-language-switch`, `post-mainnavigation`, `post-megadropdown`, `post-megadropdown-trigger`, `post-menu`, `post-menu-item`, and `post-menu-trigger`. (by [@schaertim](https://github.com/schaertim) with [#4544](https://github.com/swisspost/design-system/pull/4544))

- Fixed z-indexes for header components to ensure proper stacking order. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4421](https://github.com/swisspost/design-system/pull/4421))

- Updated the styles for `.focus-ring` and added documentation. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4543](https://github.com/swisspost/design-system/pull/4543))

- Fixed high contrast mode hover and focus styles for `post-avatar` component in anchor and button contexts. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4338](https://github.com/swisspost/design-system/pull/4338))

- Internalized Bootstrap text utilities into the Design System. (by [@leagrdv](https://github.com/leagrdv) with [#4360](https://github.com/swisspost/design-system/pull/4360))

## 9.0.0-next.13

### Major Changes

- Removed the Bootstrap `.text-bg-*` and `.link-*` helper classes. (by [@leagrdv](https://github.com/leagrdv) with [#4448](https://github.com/swisspost/design-system/pull/4448))

### Minor Changes

- Add `interpolate-size: allow-keyword` for all supporting browsers, enabling transitions from and to `height: auto` (https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size) (by [@gfellerph](https://github.com/gfellerph) with [#4524](https://github.com/swisspost/design-system/pull/4524))

### Patch Changes

- Added media mixins to mixin/index.scss to include them in the core file. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4351](https://github.com/swisspost/design-system/pull/4351))

- Replaced previously deleted CSS variables with SASS variables. (by [@leagrdv](https://github.com/leagrdv) with [#4446](https://github.com/swisspost/design-system/pull/4446))

- Refactored hover styling for links in `<post-footer>` to ensure they are underlined, aligning with the design specifications in Figma. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4510](https://github.com/swisspost/design-system/pull/4510))

- Got rid of the page wide yellow background as it can cause yellow flashing between page loads (by [@gfellerph](https://github.com/gfellerph) with [#4523](https://github.com/swisspost/design-system/pull/4523))

- Fixed display of `post-megadropdown` in header. (by [@leagrdv](https://github.com/leagrdv) with [#4350](https://github.com/swisspost/design-system/pull/4350))

- Corrected high contrast mode styles for `checkbox` and `radio-button`. (by [@schaertim](https://github.com/schaertim) with [#4334](https://github.com/swisspost/design-system/pull/4334))

## 9.0.0-next.12

### Patch Changes

- Positioned `ul.list-bullet > li::before` elements statically, so they can't cause render context issues anymore. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4478](https://github.com/swisspost/design-system/pull/4478))

## 9.0.0-next.11

### Major Changes

- Removed the Bootstrap `.stretched-link` helper class. (by [@leagrdv](https://github.com/leagrdv) with [#4428](https://github.com/swisspost/design-system/pull/4428))

- Removed the Bootstrap icon link helper classes. (by [@leagrdv](https://github.com/leagrdv) with [#4435](https://github.com/swisspost/design-system/pull/4435))

- Removed the Bootstrap figures helper classes and css variables. (by [@leagrdv](https://github.com/leagrdv) with [#4426](https://github.com/swisspost/design-system/pull/4426))

- Removed the Bootstrap `.vr` helper class. (by [@leagrdv](https://github.com/leagrdv) with [#4427](https://github.com/swisspost/design-system/pull/4427))

- Removed the Bootstrap ratio helper classes. (by [@leagrdv](https://github.com/leagrdv) with [#4434](https://github.com/swisspost/design-system/pull/4434))

- Removed the Bootstrap `.visually-hidden-focusable` helper class. (by [@leagrdv](https://github.com/leagrdv) with [#4438](https://github.com/swisspost/design-system/pull/4438))

- Removed the Bootstrap stacks helper classes. (by [@leagrdv](https://github.com/leagrdv) with [#4429](https://github.com/swisspost/design-system/pull/4429))

### Minor Changes

- Added Teaser Card component. (by [@leagrdv](https://github.com/leagrdv) with [#4460](https://github.com/swisspost/design-system/pull/4460))

- Added Swiss Post Sans as the new default font (by [@gfellerph](https://github.com/gfellerph) with [#4467](https://github.com/swisspost/design-system/pull/4467))

### Patch Changes

- Fixed visibility of the arrow-icon in Form Select for high contrast mode. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4325](https://github.com/swisspost/design-system/pull/4325))

- Moved the Bootstrap `.clearfix` helper class to the design system and documented it. (by [@leagrdv](https://github.com/leagrdv) with [#4443](https://github.com/swisspost/design-system/pull/4443))

- Moved the Bootstrap `.visually-hidden` helper class to design system styles and documented it. (by [@leagrdv](https://github.com/leagrdv) with [#4438](https://github.com/swisspost/design-system/pull/4438))

## 9.0.0-next.10

### Major Changes

- Removed `.bg-` classes to define background color of elements. (by [@leagrdv](https://github.com/leagrdv) with [#4201](https://github.com/swisspost/design-system/pull/4201))

- Removed deprecated utility sizing and line-height classes as well as `responsive-size`, `generate-utility-class` and all `bezel-*` mixins. (by [@leagrdv](https://github.com/leagrdv) with [#4343](https://github.com/swisspost/design-system/pull/4343))

### Minor Changes

- Implemented gutter utility classes. (by [@myrta2302](https://github.com/myrta2302) with [#4378](https://github.com/swisspost/design-system/pull/4378))

- Updated the output structure of our UI-Icons. Added a `post-icon` mixin, to use any of our icons from within SCSS. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4136](https://github.com/swisspost/design-system/pull/4136))

### Patch Changes

- Fixed alignment of ´form-switch´ label. (by [@schaertim](https://github.com/schaertim) with [#4314](https://github.com/swisspost/design-system/pull/4314))

- Added hover styles in high contrast mode for the css components `Button`, `Chip`, `Form Search` and `Button Close`. (by [@schaertim](https://github.com/schaertim) with [#4331](https://github.com/swisspost/design-system/pull/4331))

- Removed all usage of deprecated utility sizing classes. (by [@leagrdv](https://github.com/leagrdv) with [#4343](https://github.com/swisspost/design-system/pull/4343))

- Added styles for text links and icon-buttons for Composible Footer in HCM. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4333](https://github.com/swisspost/design-system/pull/4333))

- Fixed colors of validation icon in HCM on form elements. (by [@leagrdv](https://github.com/leagrdv) with [#4319](https://github.com/swisspost/design-system/pull/4319))

- Uniformized valid and invalid icons throughout form elements for consistency. (by [@leagrdv](https://github.com/leagrdv) with [#4368](https://github.com/swisspost/design-system/pull/4368))

- Fixed card control checkboxes' text color in HCM. (by [@leagrdv](https://github.com/leagrdv) with [#4321](https://github.com/swisspost/design-system/pull/4321))

- Fixed icon color of banner in high contrast mode. (by [@leagrdv](https://github.com/leagrdv) with [#4304](https://github.com/swisspost/design-system/pull/4304))

- Fixed display of stepper to break words when text is too long to fit in one line. (by [@leagrdv](https://github.com/leagrdv) with [#4401](https://github.com/swisspost/design-system/pull/4401))

- Refactored icon declarations to comply with Angular 18's new build system requirements. (by [@schaertim](https://github.com/schaertim) with [#3518](https://github.com/swisspost/design-system/pull/3518))

- Added breakpoint mixin "only" and updated documentation to reflect new breakpoint mixin naming. (by [@leagrdv](https://github.com/leagrdv) with [#4397](https://github.com/swisspost/design-system/pull/4397))

## 9.0.0-next.9

### Minor Changes

- Added composable footer component. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4190](https://github.com/swisspost/design-system/pull/4190))

- Removed outdated portal-specific styles, including subnavigation-related rules. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4186](https://github.com/swisspost/design-system/pull/4186))

- Added the possibility to define a `$child-selector` parameter with our list mixins, so they can be used also with custom elements. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4190](https://github.com/swisspost/design-system/pull/4190))

- Updated the utility classes for sizing. (by [@myrta2302](https://github.com/myrta2302) with [#4012](https://github.com/swisspost/design-system/pull/4012))

- Updated `.btn-link` to look like a regular link and old `.btn-link` is now `.btn-tertiary .px-0`. (by [@leagrdv](https://github.com/leagrdv) with [#4200](https://github.com/swisspost/design-system/pull/4200))

- Implemented new pixel based sizes. (by [@myrta2302](https://github.com/myrta2302) with [#4012](https://github.com/swisspost/design-system/pull/4012))

### Patch Changes

- Fixed the `btn-icon` styles, so icons within can no longer be rendered too small, because of the inline-padding on the button. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4190](https://github.com/swisspost/design-system/pull/4190))

- Fixed the appstore-badge styles to get rid of the inline gap below. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4190](https://github.com/swisspost/design-system/pull/4190))

## 9.0.0-next.8

### Major Changes

- Removed size variants for textarea form control. The sizing classes `.form-control-sm`, `.form-control-rg` and `.form-control-lg` for textarea no longer have any effect and can be removed safely. (by [@leagrdv](https://github.com/leagrdv) with [#4062](https://github.com/swisspost/design-system/pull/4062))

### Minor Changes

- Internalized bootstrap position utilities into the design system. (by [@leagrdv](https://github.com/leagrdv) with [#3988](https://github.com/swisspost/design-system/pull/3988))

- Implemented simple check list component. (by [@myrta2302](https://github.com/myrta2302) with [#4171](https://github.com/swisspost/design-system/pull/4171))

- Created the `search-input` component. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#4099](https://github.com/swisspost/design-system/pull/4099))

- Added list mixins `list-bullet`, `list-revert` and `list-unstyled`. (by [@leagrdv](https://github.com/leagrdv) with [#4166](https://github.com/swisspost/design-system/pull/4166))

- Updated `.form-control` textarea to new Post design. (by [@leagrdv](https://github.com/leagrdv) with [#4062](https://github.com/swisspost/design-system/pull/4062))

### Patch Changes

- Fixed ´switch´ alignment for long labels. (by [@schaertim](https://github.com/schaertim) with [#4140](https://github.com/swisspost/design-system/pull/4140))

- Updated the ´post-accordion´ styles to match the new Post design. (by [@leagrdv](https://github.com/leagrdv) with [#4166](https://github.com/swisspost/design-system/pull/4166))

- Reverted `ol` lists to use standard display (not grid). (by [@leagrdv](https://github.com/leagrdv) with [#4110](https://github.com/swisspost/design-system/pull/4110))

- Updated fieldset-legend styles with Design Tokens. (by [@leagrdv](https://github.com/leagrdv) with [#4166](https://github.com/swisspost/design-system/pull/4166))

## 9.0.0-next.7

### Major Changes

- Removed deprecated `valid-tooltip` and `invalid-tooltip` classes. (by [@leagrdv](https://github.com/leagrdv) with [#4076](https://github.com/swisspost/design-system/pull/4076))

- Removed the `rg` and `xxl` grid breakpoints, reducing the grid to 5 breakpoints instead of the previous 7. This change affects all CSS classes tied to specific breakpoints (e.g., `col-rg-2`, `m-xxl-4`).  
  **Previous Breakpoints**:
  - `xs: 0px`
  - `sm: 400px`
  - `rg: 600px`
  - `md: 780px`
  - `lg: 1024px`
  - `xl: 1280px`
  - `xxl: 1440px`

  **New Breakpoints**:
  - `xs: 0px`
  - `sm: 600px`
  - `md: 780px`
  - `lg: 1024px`
  - `xl: 1280px`

  To maintain compatibility with the updated grid system, you need to update your code by replacing any `*-rg-*` classes with `*-sm-*`, and any `*-xxl-*` classes with `*-xl-*`. For example:
  - `col-rg-2` → `col-sm-2`
  - `m-xxl-4` → `m-xl-4` (by [@alizedebray](https://github.com/alizedebray) with [#3982](https://github.com/swisspost/design-system/pull/3982))

- Removed deprecated `carousel` component. (by [@leagrdv](https://github.com/leagrdv) with [#4075](https://github.com/swisspost/design-system/pull/4075))

### Patch Changes

- Updated the grid padding and gutters. (by [@alizedebray](https://github.com/alizedebray) with [#4045](https://github.com/swisspost/design-system/pull/4045))

- Updated the styles of the form validation messages to match the new Post design. (by [@myrta2302](https://github.com/myrta2302) with [#3824](https://github.com/swisspost/design-system/pull/3824))

## 9.0.0-next.6

### Major Changes

- Renamed the alert component to banner and updated the styles of banner and toast components. The class `.alert` is still supported for now but is deprecated and will be removed in v10. Changed web component `<post-alert>` to `<post-banner>`. Additionally, the classes `.{toast|alert}-primary`, `.{toast|alert}-gray` and `.toast-notification` have been deprecated. (by [@leagrdv](https://github.com/leagrdv) with [#3862](https://github.com/swisspost/design-system/pull/3862))

- Removed size variants for form select. The sizing classes `.form-select-sm`, `.form-select-rg`, `.form-select-md` and `.form-select-lg` no longer have any effect and can be removed safely. (by [@leagrdv](https://github.com/leagrdv) with [#3978](https://github.com/swisspost/design-system/pull/3978))

- Removed the `alert-fixed-bottom` variant of the alert. (by [@leagrdv](https://github.com/leagrdv) with [#3862](https://github.com/swisspost/design-system/pull/3862))

- Removed sizes option for text inputs. (by [@leagrdv](https://github.com/leagrdv) with [#3946](https://github.com/swisspost/design-system/pull/3946))

- Removed deprecated `topic-teaser`. (by [@leagrdv](https://github.com/leagrdv) with [#4056](https://github.com/swisspost/design-system/pull/4056))

- Changed the class name of assistive text below form fields from `.form-text` to `.form-hint` and improved accessibility by connecting the hint to the form through `aria-describedby`. (by [@leagrdv](https://github.com/leagrdv) with [#3961](https://github.com/swisspost/design-system/pull/3961))

### Minor Changes

- Added a new `segmented-button` component, which allows users to toggle between two or more content sections within the same area on the screen. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#3879](https://github.com/swisspost/design-system/pull/3879))

- Internalized bootstrap overflow utilities into the design system. (by [@leagrdv](https://github.com/leagrdv) with [#4006](https://github.com/swisspost/design-system/pull/4006))

- Updated radio-button styles with Design Tokens. (by [@schaertim](https://github.com/schaertim) with [#3965](https://github.com/swisspost/design-system/pull/3965))

- Addes Cargo theme styles. (by [@alizedebray](https://github.com/alizedebray) with [#3993](https://github.com/swisspost/design-system/pull/3993))

- Updated `.form-select` select to v2. (by [@leagrdv](https://github.com/leagrdv) with [#3978](https://github.com/swisspost/design-system/pull/3978))

- Updated checkbox styles with Design Tokens. (by [@schaertim](https://github.com/schaertim) with [#3965](https://github.com/swisspost/design-system/pull/3965))

- Updated switch styles with Design Tokens. (by [@schaertim](https://github.com/schaertim) with [#3965](https://github.com/swisspost/design-system/pull/3965))

- Added color palettes to easily apply colors to a page section using predefined color sets. (by [@alizedebray](https://github.com/alizedebray) with [#3850](https://github.com/swisspost/design-system/pull/3850))

### Patch Changes

- Updated `.form-control` text input to new Post design. (by [@leagrdv](https://github.com/leagrdv) with [#3946](https://github.com/swisspost/design-system/pull/3946))

- Updated the blockquote styles to match the new Post design. (by [@myrta2302](https://github.com/myrta2302) with [#3882](https://github.com/swisspost/design-system/pull/3882))

## 9.0.0-next.5

### Major Changes

- Removed the deprecated `.pi-*` classes, which were previously used to display icons. The `post-icon` component should now be used instead. (by [@alizedebray](https://github.com/alizedebray) with [#3947](https://github.com/swisspost/design-system/pull/3947))

### Minor Changes

- Added custom styles for the ordered lists. (by [@veyaromain](https://github.com/veyaromain) with [#3755](https://github.com/swisspost/design-system/pull/3755))

### Patch Changes

- Fixed issue where the focus ring was not appearing on inactive chips. (by [@schaertim](https://github.com/schaertim) with [#3820](https://github.com/swisspost/design-system/pull/3820))

## 9.0.0-next.4

### Major Changes

- Removed regular button size. Buttons that were previously using `btn-rg` will now fall back to the default `btn-md` size. (by [@leagrdv](https://github.com/leagrdv) with [#3849](https://github.com/swisspost/design-system/pull/3849))

- Updated list group to v2 and added new options: list links, list documents and list switches. (by [@leagrdv](https://github.com/leagrdv) with [#3740](https://github.com/swisspost/design-system/pull/3740))

- Removed the `btn-animated` class. It no longer has any effect and can be removed from existing buttons. (by [@leagrdv](https://github.com/leagrdv) with [#3849](https://github.com/swisspost/design-system/pull/3849))

- Removed the `.breadcrumb-item` class, which previously handled styling for breadcrumb items. Introduced a new `post-breadcrumb-item` that should be used in place of the `.breadcrumb-item` class. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#3659](https://github.com/swisspost/design-system/pull/3659))

### Minor Changes

- Added Form Footer component. (by [@leagrdv](https://github.com/leagrdv) with [#3616](https://github.com/swisspost/design-system/pull/3616))

- Created token-based styles for `<ul>` elements. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3859](https://github.com/swisspost/design-system/pull/3859))

- Updated vertical-align utility (by [@myrta2302](https://github.com/myrta2302) with [#3805](https://github.com/swisspost/design-system/pull/3805))

- Updated button component to v2. (by [@leagrdv](https://github.com/leagrdv) with [#3849](https://github.com/swisspost/design-system/pull/3849))

- Added the skiplinks component to styles and documentation. (by [@leagrdv](https://github.com/leagrdv) with [#3875](https://github.com/swisspost/design-system/pull/3875))

- Added close button web component. (by [@leagrdv](https://github.com/leagrdv) with [#3880](https://github.com/swisspost/design-system/pull/3880))

- Internalized bootstraps floating utilities into the design system. (by [@myrta2302](https://github.com/myrta2302) with [#3752](https://github.com/swisspost/design-system/pull/3752))

## 9.0.0-next.3

### Major Changes

- Removed deprecated accent colors (nightblue, petrol, coral, olive, purple, aubergine and their light variations) and updated all relevant components, documentation, and utilities. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#3693](https://github.com/swisspost/design-system/pull/3693))

- Removed deprecated grid container helper classes. (by [@veyaromain](https://github.com/veyaromain) with [#3527](https://github.com/swisspost/design-system/pull/3527))

### Minor Changes

- Updated the Link component styles to align with the new design, added a documentation page outlining the usage of the component. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#3590](https://github.com/swisspost/design-system/pull/3590))

- Updated the utility classes for opacity. (by [@myrta2302](https://github.com/myrta2302) with [#3754](https://github.com/swisspost/design-system/pull/3754))

- Added a new App Store Badge component for promoting apps, supporting both Google Play and Apple App Store badges. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#3731](https://github.com/swisspost/design-system/pull/3731))

- Added paragraph style. (by [@bashirkarimi](https://github.com/bashirkarimi) with [#3569](https://github.com/swisspost/design-system/pull/3569))

### Patch Changes

- Updated margin styles according to the contribution guidelines. Content elements like headings and paragraphs no longer have a margin top if they're the first child and no margin bottom if they're the last child in a container. (by [@gfellerph](https://github.com/gfellerph) with [#3667](https://github.com/swisspost/design-system/pull/3667))

## 9.0.0-next.2

### Minor Changes

- Updated and tokenized styles for the legend element. (by [@bashirkarimi](https://github.com/bashirkarimi) with [#3614](https://github.com/swisspost/design-system/pull/3614))

- Added styling support and documentation for the `<dialog>` element. The dialog will replace the current modal and notification overlay components coming from ng-bootstrap. (by [@gfellerph](https://github.com/gfellerph) with [#2772](https://github.com/swisspost/design-system/pull/2772))

### Patch Changes

- Wrapped new token only entry files in a CSS layer called 'design-system'. The two files affected are 'post-tokens-external.scss' and 'post-tokens-internal.scss' as well as their compiled CSS counterparts. (by [@gfellerph](https://github.com/gfellerph) with [#3720](https://github.com/swisspost/design-system/pull/3720))

- Deprecated the ng-bootstrap components Modal and Notification overlay in favor of the new Dialog component. The styles for these ng-bootstrap components will be removed in a future major version. (by [@gfellerph](https://github.com/gfellerph) with [#2772](https://github.com/swisspost/design-system/pull/2772))

- Fixed an issue with element styles that were not compiled to the output as CSS. (by [@gfellerph](https://github.com/gfellerph) with [#3709](https://github.com/swisspost/design-system/pull/3709))

## 9.0.0-next.1

### Major Changes

- Removed the following placeholders: `%list-adjustment`, `%module-container`, `%default-module-spacer`, `%text-container`. (by [@leagrdv](https://github.com/leagrdv) with [#3623](https://github.com/swisspost/design-system/pull/3623))

- Updated the margin, padding, and gap utility classes to use the pixel values (1, 2, ... , 112) instead of size names (hair, line, ..., bigger-giant). (by [@alizedebray](https://github.com/alizedebray) with [#3557](https://github.com/swisspost/design-system/pull/3557))

### Minor Changes

- Added Text Highlighted component. (by [@bashirkarimi](https://github.com/bashirkarimi) with [#3586](https://github.com/swisspost/design-system/pull/3586))

- Added lead text component for introductory paragraphs. (by [@bashirkarimi](https://github.com/bashirkarimi) with [#3575](https://github.com/swisspost/design-system/pull/3575))

### Patch Changes

- styles: Added reset styles (by [@bashirkarimi](https://github.com/bashirkarimi) with [#3545](https://github.com/swisspost/design-system/pull/3545))

- Removed global styles (by [@bashirkarimi](https://github.com/bashirkarimi) with [#3554](https://github.com/swisspost/design-system/pull/3554))

- Updated the style of headings (h1-h6). (by [@bashirkarimi](https://github.com/bashirkarimi) with [#3534](https://github.com/swisspost/design-system/pull/3534))

## 9.0.0-next.0

### Major Changes

- Removed deprecated `datatable` variables. (by [@schaertim](https://github.com/schaertim) with [#3395](https://github.com/swisspost/design-system/pull/3395))

- Removed deprecated `display-size` variables. (by [@schaertim](https://github.com/schaertim) with [#3430](https://github.com/swisspost/design-system/pull/3430))

- Removed deprecated `line-height-calc` function. (by [@schaertim](https://github.com/schaertim) with [#3409](https://github.com/swisspost/design-system/pull/3409))

- Removed deprecated `form-check` variables. (by [@schaertim](https://github.com/schaertim) with [#3393](https://github.com/swisspost/design-system/pull/3393))

- Removed deprecated `stepper` variables. (by [@schaertim](https://github.com/schaertim) with [#3394](https://github.com/swisspost/design-system/pull/3394))

- Removed deprecated line-height variables. (by [@veyaromain](https://github.com/veyaromain) with [#3521](https://github.com/swisspost/design-system/pull/3521))

### Minor Changes

- Added tokens file for elements, components and utilties. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3495](https://github.com/swisspost/design-system/pull/3495))

### Patch Changes

- Improved accessibility of headings with subheadings by removing the <br> element and added the utility class d-block. Consult https://design-system.post.ch/?path=/docs/7ecd87f1-de96-4e39-a057-ba1798eb6959--docs for updated markup. (by [@bashirkarimi](https://github.com/bashirkarimi) with [#3491](https://github.com/swisspost/design-system/pull/3491))

- Aligned chip styles with the latest design specifications from Figma. (by [@schaertim](https://github.com/schaertim) with [#3463](https://github.com/swisspost/design-system/pull/3463))

- Resolved issue where validation message icons repeated on each line of multi-line messages. Implemented flexbox layout to ensure a single, vertically centered icon regardless of message length. (by [@schaertim](https://github.com/schaertim) with [#3517](https://github.com/swisspost/design-system/pull/3517))

## 8.2.0

### Minor Changes

- Added four new entry files that enable working with Design Tokens:
  - post-external.(s)css: For portal and other external pages
  - post-internal.(s)css: For applications and other internal pages
  - post-tokens-external.(s)css: External tokens only
  - post-tokens-internal.(s)css: Internal tokens only (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3477](https://github.com/swisspost/design-system/pull/3477))

### Patch Changes

- Realigned the checkbox and the radio button with the label. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3477](https://github.com/swisspost/design-system/pull/3477))

- Set the `max-width` constraint of the tag component to 100% for improved accessibility. Try to keep tag text as short as possible though. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3477](https://github.com/swisspost/design-system/pull/3477))

## 8.1.0

### Patch Changes

- Fixed a broken CSS selector in the alerts styles. The file now produces valid output again. (by [@gfellerph](https://github.com/gfellerph) with [#3343](https://github.com/swisspost/design-system/pull/3343))

## 8.0.0

### Major Changes

- Upgraded to Angular 18 (by [@gfellerph](https://github.com/gfellerph) with [#3243](https://github.com/swisspost/design-system/pull/3243))

### Patch Changes

- Removed the icon from inside form-controls (`input`, `select`, `textarea`). (by [@davidritter-dotcom](https://github.com/davidritter-dotcom) with [#3229](https://github.com/swisspost/design-system/pull/3229))

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

- Deprecated the post-specific sizing variables (e.g. `$size-hair`, `$size-huge`, etc.) and classes (`.m-1`, `.mt-sm-4`, etc.) for all of the following properties: `margin`, `padding`, `line-height`, `height`, `max-height`, `width`, `max-width` and `gap`. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#1267](https://github.com/swisspost/design-system/pull/1267))

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
