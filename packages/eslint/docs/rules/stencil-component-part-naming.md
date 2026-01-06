# `stencil-component-part-naming`

Enforces that all CSS Shadow Parts in Stencil components use the `post-` prefix to avoid naming confusions with other components.

- Type: problem

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```tsx
<div part="menu"></div>
```

```tsx
<div part="tabs"></div>
```

```tsx
<div part="content"></div>
```

### ✅ Valid Code

```tsx
<div part="post-menu"></div>
```

```tsx
<div part="post-tabs"></div>
```

```tsx
<div part="post-tabs-content"></div>
```
