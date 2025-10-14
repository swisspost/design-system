---
'@swisspost/design-system-components': major
'@swisspost/design-system-documentation': patch
---

Reorganized Global Header structure: introduced `global-controls` and `global-login` slots for the Global Header.

- For elements in the Global Header: Search button must now be placed in the `global-controls` slot (previously in `meta-navigation`), and login button or user menu component must be placed in the `global-login` slot (new slot)
- The `meta-navigation` slot now only contains Jobs and Create Account links (Search removed)

Updated documentation and Storybook examples to reflect the new structure.
