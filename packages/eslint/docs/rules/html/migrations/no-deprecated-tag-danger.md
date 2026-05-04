# `no-deprecated-tag-danger`

Flags `tag-danger` class and replaces it with `tag-error`.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="tag tag-danger">Tag</div>
```

### ✅ Valid Code

```html
<div class="tag tag-error">Tag</div>
```
