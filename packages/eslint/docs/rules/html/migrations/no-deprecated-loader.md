# `no-deprecated-loader`

Flags deprecated `loader-xs` and `loader-sm` classes and replaces them with `loader-16` and `loader-40` respectively.
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
<div role="status" aria-live="polite" class="loader loader-16">
  <span class="visually-hidden">Loading…</span>
</div>
```