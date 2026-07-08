# Naming Convention - Custom Properties

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/7577>

CSS custom properties (CSS variables) inherit through the entire DOM tree — including into shadow DOM. This means a generic variable like `--max-width` set anywhere on a page will silently propagate into every web component's shadow root. In multi-vendor environments where applications combine components from different libraries, unscoped variable names are virtually guaranteed to collide, causing hard-to-debug visual regressions.

## Decision

All CSS custom properties in Swiss Post web components (HTML/CSS and web components) must follow the naming pattern:

```
--post-<component>-<property>
```

- `--post` — company prefix, attributes the variable to the Swiss Post Design System and prevents cross-vendor collisions.
- `<component>` — component name (e.g. `tooltip`, `footer`), prevents collisions between components within the system.
- `<property>` — descriptive name of the value being controlled.

Shared design tokens that are intentionally global use only the company prefix (e.g. `--post-current-fg`).

## Consequences

- Every override becomes intentional and self-documenting — a consumer must explicitly write `--post-tooltip-max-width` to affect the tooltip.
- Custom properties become a clear public API per component, easy to discover in DevTools by searching `--post-<component>`.
- Variable names are longer, which is an accepted trade-off for safety and clarity.
- All components must be audited to ensure they follow the convention.

## Example

```scss
// Bad — collides easily with any other library or app-level variable
:host {
  // local custom-property (only for this component)
  max-width: var(--max-width, 280px);

  // global custom-property (initially defined on the `body` element)
  color: var(--fg);
}

// Good — scoped to company and component, no accidental overrides
:host {
  // local custom-property (only for this component)
  max-width: var(--post-tooltip-max-width, 280px);

  // global custom-property (initially defined on the `body` element)
  color: var(--post-current-fg);
}
```
