# Styling web components

## Context

<!-- What is the issue that we're seeing that is motivating this decision or change? -->

Reference: <https://github.com/swisspost/design-system/issues/8078>

A web component host (`<post-tooltip>`) element can be styled with the `:host` selector and slotted elements can be styled via the `::slotted` pseudo-selector. The order in the cascade of these selectors however, is very low because the styles are applied from within the shadow DOM. Light DOM styles are applied later in the cascade (see [Cascade Layers on MDN](https://mdn.github.io/shared-assets/images/diagrams/css/at-rules/layer-cascade.svg) and [codepen reproduction](https://codepen.io/tuelsch/pen/pvRWvyj)). Light DOM styles can only be overwritten with `!important`, which is undesirable to use everywhere. This has led to conflicts between project styles and Design System styles. Future unintentional overrides are very likely.

## Decision

<!-- What is the change that we're proposing and/or doing? -->

Host styles should be:

- Reduced to the minimum
- The default display for host elements should be `inline`
- Host styles on existing components should be moved to an element within the component
- The `:host` selector can be used to react to component properties, e.g. `:host([variant="big"]) button { font-size: 2rem; }`

Slotted elements should be:

- Web Components defined in the components package
- HTML/CSS components defined in the styles package
- HTML elements without specific class name styled in the [components global styles](https://github.com/swisspost/design-system/tree/main/packages/components/src/styles)

## Consequences

<!-- What becomes easier or more difficult to do because of this change? -->

`:host` and `::slotted` selector usage is strictly limited. Exceptions can be made where necessary by using `!important` on `::slotted` elements. These exceptions need to be justified, e.g. by reducing overhead, and need to be documented.

## Customizing slotted element styles

Chances are that slotted elements need a little tweak here and there. The preferred method to pass contextual style overrides to a slotted component (needs to be a design system component) is via CSS custom properties:

```CSS
/* Host element styles (post-menu) */
:host {
  --post-menu-item-active-background-color: pink;
}

/* Slotted element styles (post-menu-item) */
.list-item {
  background-color: var(--post-menu-item-active-background-color, --token-value, black);
}
```

_[CodePen example for passing styles as props to child components](https://codepen.io/tuelsch/pen/vEgwpzN?editors=1000)_

The `<post-menu-item>` accepts a custom property that is able to override the default value like a prop on a web component. This custom property should also be documented to make it available to other users if it is necessary. This allows Design System components to override specific values contextually with a namespaced value, reducing the risk of unintentional overrides.
