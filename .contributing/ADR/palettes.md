# Palettes

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/5230>

> [!NOTE]
> This ADR is a draft. See the discussion for the full, evolving implementation details.

Palettes need to support light and dark color schemes across the page and at container level. There are only two possible color modes (`light`, `dark`), which can be set at two levels:

- **Page level** — defined by user settings or overridden using a `[data-color-scheme]` attribute.
- **Container level** — for example, a palette might declare a mode that matches its background color.

This leads to four possible combinations:

- `light` — the container is always in light mode, regardless of the page mode.
- `dark` — the container is always in dark mode, regardless of the page mode.
- `even` — the container uses the same mode as the page.
- `swapped` — the container uses the opposite mode of the page.

## Decision

- **Semantic layer order matters** for setting up the cascade ([POC](https://codepen.io/alizedebray/pen/QwWVXzm?editors=1100)).
- **Static vs. dynamic colour scheme layer**: palette background colours are static based on the root colour scheme. Having palette colours on the static scheme layer enables setting `color-scheme` directly on the palette, because the palette background is not set with `light-dark()`.
- **Body background** is defined in a dedicated component, since it might not be the palette-default in a specific theme; body background and foreground tokens are redefined there.
- **Base solution**: use the CSS `color-scheme` property to set the container's mode (`--post-scheme-light|dark|even|swapped`), then set component colors using the `light-dark()` CSS function.
- **Fallback solution** (temporary, until [`light-dark()` support](https://caniuse.com/?search=light-dark()) improves): instead of setting `color-scheme`, the container sets a `--fallback-prefers-light` custom property mapping to the same four modes. Because these values are static, dependent variables must be re-declared wherever a colour scheme can change (`:root, [data-color-scheme], .palette, .banner, .card, ...`). A `color-scheme.set` mixin and a `%scheme-fallback-variables` placeholder encapsulate this so the CSS is not bloated.

## Consequences

- Minimal fallback, no token resolving at build time, and a single space-toggle variable.
- Scheme tokens must be re-declared at component level wherever schemes can change.
- Hard-coding `color-scheme` mode token overrides can break if static color scheme tokens change in Token Studio.
- The fallback is temporary and will be removed once browser support for `light-dark()` improves.

## Example

```scss
@use '../functions/tokens';
@use '../mixins/color-scheme';

.my-container {
  @include color-scheme.set(tokens.get('scheme-token-name', $token-map));
}
```
