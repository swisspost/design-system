# @swisspost/design-system-changelog-github

## 1.0.3

### Patch Changes

- Test (by [@oliverschuerch](https://github.com/oliverschuerch) with [`c56c93d`](https://github.com/swisspost/design-system/commit/c56c93d159575b125e063840d90e08a6e1168348))

## 1.0.2

### Patch Changes

- The &lt;sup&gt; construct does not work as intended in most contexts, adding unnecessary and confusing spacing into changelogs. New intended format:
  - This is a contribution. (by username with #111)
  - This is a multiline contribution that needs
    a lot of text (by username with #111) (by [@gfellerph](https://github.com/gfellerph) with [#795](https://github.com/swisspost/design-system/pull/795))

## 1.0.1

### Patch Changes

- Fixed npm publish config
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#679](https://github.com/swisspost/design-system/pull/679)</sup>

## 1.0.0

### Major Changes

- Added a custom changelog output formatter, heavily inspired by @changeset/changelog-github with just a custom output format
  <br><sup>by [@gfellerph](https://github.com/gfellerph) with [#673](https://github.com/swisspost/design-system/pull/673)</sup>
