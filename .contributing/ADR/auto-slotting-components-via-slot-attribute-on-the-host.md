# Auto-slotting components via slot attribute on the host

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/3476>

It's possible to render components with a slot attribute by default. This reduces the need for authors to specify the slot attribute every time.

## Decision

Use auto-slotting only on components that are enforcing a parent-child relationship.

## Consequences

Authors are able to reuse components also in default and other named slots but have to specify the slot attribute.

## Example

### Do

`<post-list-item>` can only be placed inside `<post-list>`. Enforce the relationship through auto-slotting.

_post-list-item.tsx_

```tsx
<Host slot="post-list-item">...</Host>
```

### Don't

A `<post-closebutton>` can be used in many different places. Don't use auto-slotting here.

_post-closebutton.tsx_

```tsx
<Host slot="post-closebutton">This is a bad example</Host>
```
