# Usage of CSS selectors for variants

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/4386>

There are multiple ways HTML elements can be targeted with CSS selectors to apply styles. In [#3440](https://github.com/swisspost/design-system/discussions/3440) we explored the different possibilities and discussed about benefits/drawbacks of each.

## Decision

We are using classes with kebab-case scoping.

- Attributes would have required a dash to be compatible with future web standards, that would make writing them cumbersome, eliminating the benefits of using attributes
- Bootstrap is using kebab cased scoping. Continuing using this approach enables backwards compatibility, reducing the cost of Design System upgrades for projects
- It's the most widespread approach to writing CSS selectors, reducing the possibility for confusion for users and newcomers

## Example

```css
.size-large {}
.btn-big {}
.btn-primary {}
```

> [!NOTE]
> `[class|="btn"] { /* Targets all elements with btn and btn-something classes */ }`
