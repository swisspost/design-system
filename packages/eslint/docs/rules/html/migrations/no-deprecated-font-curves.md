# `no-deprecated-font-curves`

Flags deprecated `font-curve-{tiny|small|regular|bigger-regular|medium|large|big}` classes and replace them with new font curve classes.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="font-curve-tiny">Content</div>
<div class="font-curve-bigger-regular">Content</div>
<div class="font-curve-large">Content</div>
<div class="font-curve-big">Content</div>
```

### ✅ Valid Code

```html
<div class="fs-1">Content</div>
<div class="fs-4">Content</div>
<div class="fs-7">Content</div>
<div class="fs-9">Content</div>
```
