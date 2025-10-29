# `no-deprecated-h-visuallyhidden`

Flags deprecated `h-visuallyhidden` class and replaces it with `visually-hidden`.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="h-visuallyhidden">Invisible text</div>
```

### ✅ Valid Code

```html
<button class="visually-hidden">Invisible text</button>
```
