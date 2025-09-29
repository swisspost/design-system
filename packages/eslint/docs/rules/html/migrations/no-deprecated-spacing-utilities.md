# `no-deprecated-spacing-utilities`

Flags all deprecated spacing utility classes and replaces them with the new ones.

- Type: problem
- 🔧 Supports autofix (--fix)

## Class list

The classes that are handled by this rule are the following ones:

- Starts with one of those margin/padding class names: `m-*`, `mx-*`, `my-*`, `mt-*`, `mb-*`, `ms-*`, `me-*`, `p-*`, `px-*`, `py-*`, `pt-*`, `pb-*`, `ps-*`, `pe-*`
- Then, has either no breakpoint or one of the following breakpoint: `*sm-*`,`*md-*`,`*lg-*`, `*xl-*`
- Ends with one of the following class values: `*1`, `*2`, `*3`, `*4`, `*5`, `*hair`, `*line`, `*micro`, `*mini`, `*small-regular`, `*regular`, `*small-large`, `*large`, `*big`, `*bigger-big`, `*small-huge`, `*huge`, `*small-giant`, `*giant`, `*bigger-giant`

**Note that the classes that have, as a value, `*small-large` and `*bigger-giant` don't have an exact matching in the new spacing utility classes. Therefore, they should be reviewed carefully.**

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="mt-3">Content</div>
<div class="pb-sm-hair">Content</div>
```

### ✅ Valid Code

```html
<div class="mt-8">Content</div>
<div class="pb-sm-2">Content</div>
```
