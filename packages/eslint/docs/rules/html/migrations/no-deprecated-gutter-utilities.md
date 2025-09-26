# `no-deprecated-gutter-utilities`

Flags all deprecated bootstrap gutter utility classes and replaces them with the new ones.

- Type: problem
- 🔧 Supports autofix (--fix)

## Class list

The classes that are handled by this rule are the following ones:

- Starts with one of those gutter class names: `g-*`, `gx-*`, `gy-*`
- Then, has either no breakpoint or one of the following breakpoint: `*sm-*`,`*md-*`,`*lg-*`, `*xl-*`
- Ends with one of the following class values: `*1`, `*2`, `*3`, `*4`, `*5`

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="g-3">Content</div>
<div class="gx-sm-5">Content</div>
<div class="gy-lg-1">Content</div>
```

### ✅ Valid Code

```html
<div class="g-8">Content</div>
<div class="gx-16">Content</div>
<div class="gy-24">Content</div>
```
