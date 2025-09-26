# `no-deprecated-position-helpers`

Flags deprecated Bootstrap position helpers `fixed-[top/bottom]` and `sticky-[top/bottom]` classes and replace them with a combination of other utility classes.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="fixed-top">Content</div>
<div class="fixed-bottom">Content</div>
<div class="sticky-top">Content</div>
<div class="sticky-bottom">Content</div>
```

### ✅ Valid Code

```html
<div class="position-fixed top-0 start-0 end-0 z-fixed">Content</div>
<div class="position-fixed bottom-0 start-0 end-0 z-fixed">Content</div>
<div class="position-sticky top-0 z-header">Content</div>
<div class="position-sticky bottom-0 z-header">Content</div>
```
