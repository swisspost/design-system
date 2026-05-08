# @swisspost/design-system-eslint

## 10.0.0-next.68

### Patch Changes

- Fixed serialization issues in automigration rules that caused attribute names to be lowercased and valueless attributes to get `=""` appended. (by [@myrta2302](https://github.com/myrta2302) with [#7510](https://github.com/swisspost/design-system/pull/7510))

## 10.0.0-next.67

## 10.0.0-next.66

## 10.0.0-next.65

## 10.0.0-next.64

## 10.0.0-next.63

## 10.0.0-next.62

## 10.0.0-next.61

### Minor Changes

- Added support for Angular dynamic class bindings in class replacement migration rule, supporting [class.foo], [ngClass], and [class] attributes. (by [@myrta2302](https://github.com/myrta2302) with [#6979](https://github.com/swisspost/design-system/pull/6979))

## 10.0.0-next.60

## 10.0.0-next.59

## 10.0.0-next.58

## 10.0.0-next.57

### Minor Changes

- Added a migration rule that deletes all deprecated CSS classes from the code and removes the class attribute entirely if it becomes empty. (by [@myrta2302](https://github.com/myrta2302) with [#6893](https://github.com/swisspost/design-system/pull/6893))

## 10.0.0-next.56

## 10.0.0-next.55

## 10.0.0-next.54

## 1.1.0-next.2

### Minor Changes

- Added the automigration rule to update the HTML class `h-visibilityhidden` to `visibility-hidden`. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#6141](https://github.com/swisspost/design-system/pull/6141))

- Added the automigration rule to update the HTML class `h-clearfix` to `clearfix`. (by [@oliverschuerch](https://github.com/oliverschuerch) with [#6141](https://github.com/swisspost/design-system/pull/6141))

## 1.0.1-next.1

### Patch Changes

- Added a migration rule to replace deprecated `form-text` class with the updated `form-hint` class. (by [@myrta2302](https://github.com/myrta2302) with [#6142](https://github.com/swisspost/design-system/pull/6142))

## 1.0.1-next.0

### Patch Changes

- Added a migration rule for the updated 'rounded' utility classes. (by [@leagrdv](https://github.com/leagrdv) with [#4907](https://github.com/swisspost/design-system/pull/4907))
