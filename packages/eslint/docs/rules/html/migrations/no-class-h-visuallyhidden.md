# `no-class-h-visuallyhidden`

Flags deprecated `h-visuallyhidden` class and suggests removal or replacement with `visually-hidden`.

- Type: suggestion
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

Or simply remove the `h-visuallyhidden` class:

```html
<div>Visible text</div>
```
