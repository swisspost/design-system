# @swisspost/design-system-tokens

## 10.0.0-next.54

## 10.0.0-next.53

## 10.0.0-next.52

## 10.0.0-next.51

## 10.0.0-next.50

## 10.0.0-next.49

## 10.0.0-next.48

## 10.0.0-next.47

### Patch Changes

- Updated tokens package to use TypeScript. (by [@myrta2302](https://github.com/myrta2302) with [#5557](https://github.com/swisspost/design-system/pull/5557))

## 10.0.0-next.46

## 10.0.0-next.45

### Patch Changes

- Reverted Tailwind token generation format change introduced for Tailwind v4 compatibility. This restores the previous format compatible with Tailwind v3. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#6059](https://github.com/swisspost/design-system/pull/6059))

## 10.0.0-next.44

## 10.0.0-next.43

### Major Changes

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

## 10.0.0-next.42

## 10.0.0-next.41

## 10.0.0-next.40

## 10.0.0-next.39

## 10.0.0-next.38

## 10.0.0-next.37

### Patch Changes

- Added a function to transform font sizes from px to rem. (by [@leagrdv](https://github.com/leagrdv) with [#5321](https://github.com/swisspost/design-system/pull/5321))

## 9.0.0-next.36

## 9.0.0-next.35

## 9.0.0-next.34

## 9.0.0-next.33

## 9.0.0-next.32

## 9.0.0-next.31

## 9.0.0-next.30

## 9.0.0-next.29

## 9.0.0-next.28

## 9.0.0-next.27

## 9.0.0-next.26

## 9.0.0-next.25

## 9.0.0-next.24

## 9.0.0-next.23

## 9.0.0-next.22

## 9.0.0-next.21

## 9.0.0-next.20

## 9.0.0-next.19

### Minor Changes

- Added a new output that includes utility tokens as Sass maps, enabling direct iteration to generate utility classes. (by [@alizedebray](https://github.com/alizedebray) with [#4613](https://github.com/swisspost/design-system/pull/4613))

## 9.0.0-next.18

## 9.0.0-next.17

## 9.0.0-next.16

## 9.0.0-next.15

## 9.0.0-next.14

### Patch Changes

- Added a transform function to avoid unitless zero values for specific token types (like `dimension`, etc.), which allows us to use these tokens also in css `calc()` functions. Because `<number-token>`s are always interpreted as `<number>`s or `<integer>`s, "unitless 0" `<length>`s aren’t supported in calc().
  Source: https://drafts.csswg.org/css-values-3/#calc-type-checking (by [@oliverschuerch](https://github.com/oliverschuerch) with [#4534](https://github.com/swisspost/design-system/pull/4534))

## 9.0.0-next.13

## 9.0.0-next.12

## 9.0.0-next.11

## 9.0.0-next.10

## 9.0.0-next.9

## 9.0.0-next.8

## 9.0.0-next.7

## 9.0.0-next.6

### Minor Changes

- Export new SASS maps for Post and Cargo palettes, directly linking to the raw color values for both light and dark color schemes. (by [@alizedebray](https://github.com/alizedebray) with [#3992](https://github.com/swisspost/design-system/pull/3992))

## 9.0.0-next.5

## 9.0.0-next.4

## 9.0.0-next.3

### Minor Changes

- Added a new App Store Badge component for promoting apps, supporting both Google Play and Apple App Store badges. (by [@alionazherdetska](https://github.com/alionazherdetska) with [#3731](https://github.com/swisspost/design-system/pull/3731))

## 9.0.0-next.2

## 9.0.0-next.1

## 9.0.0-next.0

## 8.2.0

## 0.1.0

### Minor Changes

- Added `Components/Notifications` tokens. Added semantic tokens (`mode/light`, `mode/dark`, `device/desktop`, `device/tablet`, `device/mobile`, `channel/idk`, `channel/edk` and `theme/post`), to link `core` tokens to the `Components/Notifications` tokens. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3262](https://github.com/swisspost/design-system/pull/3262))

- Added core tokens for `color`, `dimensions`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `font-family`, `elevation` and `border`. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3262](https://github.com/swisspost/design-system/pull/3262))

- Added `Components/Interactives` tokens. Added semantic tokens (`mode/light`, `mode/dark`, `device/desktop`, `device/tablet`, `device/mobile`, `channel/idk`, `channel/edk` and `theme/post`), to link `core` tokens to the `Components/Interactives` tokens. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#3262](https://github.com/swisspost/design-system/pull/3262))
