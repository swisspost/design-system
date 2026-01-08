# `no-deprecated-scc-classes`

Flags deprecated css classes and removes them.

- Type: suggestion
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="valid-class deprecated-class">Text</div>
```

### ✅ Valid Code

```html
<div class="valid-class">Text</div>
```

If the only class is the `deprecated-class`:

```html
<div>Text</div>
```
