# `no-deprecated-loader`

Flags deprecated `loader` and `loader-*` classes and replace them with `spinner` and `spinner-*` classes. Sizes `loader-xs` and `loader-sm` are being replaced with `spinner-16` and `spinner-40` respectively.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div role="status" aria-live="polite" class="loader loader-xs">
  <span class="visually-hidden">Loading…</span>
</div>
```

### ✅ Valid Code

```html
<div role="status" aria-live="polite" class="spinner spinner-16">
  <span class="visually-hidden">Loading…</span>
</div>
```
