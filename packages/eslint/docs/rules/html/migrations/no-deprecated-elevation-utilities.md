# `no-deprecated-elevation-utilities`

Flags deprecated `elevation-{1|2|3|4|5}` classes and replace them with `elevation-{100|200|300|400|500}`.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="elevation-1">Content</div>
<div class="elevation-2">Content</div>
<div class="elevation-3">Content</div>
<div class="elevation-4">Content</div>
<div class="elevation-5">Content</div>
```

### ✅ Valid Code

```html
<div class="elevation-100">Content</div>
<div class="elevation-200">Content</div>
<div class="elevation-300">Content</div>
<div class="elevation-400">Content</div>
<div class="elevation-500">Content</div>
```
