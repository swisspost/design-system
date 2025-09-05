# `no-class-h-clearfix`

Flags deprecated `h-clearfix` class and suggests removal or replacement with `clearfix`.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="h-clearfix">Content</div>
```

### ✅ Valid Code

```html
<button class="clearfix">Content</button>
```

Or simply remove the `h-clearfix` class:

```html
<div>Content</div>
```
