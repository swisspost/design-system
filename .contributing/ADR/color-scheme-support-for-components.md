## Context

<!-- What is the issue that we're seeing that is motivating this decision or change? -->

With the introduction of design tokens we've also included support for multiple color schemes. While we can control components that we own (palettes), projects might want to introduce their own containers that set background colours or background images where design system components can be nested within. To support these use cases, design system components must react to the CSS `color-scheme` property also when set by non-design-system elements.

## Decision

<!-- What is the change that we're proposing and/or doing? -->

Components and the token system must react to the CSS `color-scheme` property for setting their color scheme. Exempt from this rule are components that must stay in sync with the root colour scheme.

## Consequences

<!-- What becomes easier or more difficult to do because of this change? -->

With this decision, we ensure that our components comply with web standard functionality and maximise their compatibility with third party code. Most components already do this by default through tokens using the `light-dark(#000, #fff)` function. Any other selectors (e.g. `[data-color-scheme="dark"]`) are not allowed since their presence in project specific code is not guaranteed.

## Workaround until support for [`light-dark`](https://caniuse.com/wf-light-dark-image) is good

We're using a space-toggle fallback for browsers not supporting `light-dark` with image values. If projects run into issues with browser support for custom components that set a color-scheme, we can advice them to also set `[data-color-scheme="light/dark"]` to get the needed support in older browsers.
