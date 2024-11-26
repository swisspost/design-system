# @swisspost/design-system-migrations

## 9.0.0-next.6

## 9.0.0-next.5

## 9.0.0-next.4

## 9.0.0-next.3

## 9.0.0-next.2

## 9.0.0-next.1

## 9.0.0-next.0

## 8.2.0

## 8.1.0

## 8.0.0

## 7.4.0

## 7.3.1

## 7.3.0

## 7.2.1

## 7.2.0

## 7.1.0

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

### Minor Changes

- Added migrations to turn badges into chips. (by [@alizedebray](https://github.com/alizedebray) with [#2855](https://github.com/swisspost/design-system/pull/2855))

### Patch Changes

- Updated instructions to run the automated migrations from the migration package. (by [@alizedebray](https://github.com/alizedebray) with [#2783](https://github.com/swisspost/design-system/pull/2783))

## 1.0.2

### Patch Changes

- Fixed paths to the migration entry point. (by [@alizedebray](https://github.com/alizedebray) with [#2757](https://github.com/swisspost/design-system/pull/2757))

## 1.0.1

### Patch Changes

- Fixed missing migration files. (by [@alizedebray](https://github.com/alizedebray) with [#2712](https://github.com/swisspost/design-system/pull/2712))

## 1.0.0

### Major Changes

- Separated the migration schematics from the styles to their own package `@swisspost/design-system-migrations`. (by [@alizedebray](https://github.com/alizedebray) with [#2270](https://github.com/swisspost/design-system/pull/2270))
