# `no-deprecated-shadow-utilities`

Flags deprecated `shadow` and `shadow-{none|sm|lg}` classes and replace them with equivalent elevation classes.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="shadow">Content</div>
<div class="shadow-none">Content</div>
<div class="shadow-sm">Content</div>
<div class="shadow-lg">Content</div>
```

### ✅ Valid Code

```html
<div class="elevation-200">Content</div>
<div class="elevation-none">Content</div>
<div class="elevation-400">Content</div>
<div class="elevation-500">Content</div>
```
