# @swisspost/design-system-tokens

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
