# `no-unnumbered-border-radius`

Flags `rounded` and `rounded-{top|bottom|start|end}` classes and replaces them with `rounded-4` and `rounded-{top|bottom|start|end}-4`, respectively.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<p class="rounded">My rounded element</p>
<div class="rounded-bottom">My rounded element</div>
```

### ✅ Valid Code

```html
<p class="rounded-4">My rounded element</p>
<div class="rounded-bottom-4">My rounded element</div>
```
