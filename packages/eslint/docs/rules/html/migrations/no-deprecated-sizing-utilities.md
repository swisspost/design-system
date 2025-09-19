# `no-deprecated-sizing-utilities`

Flags all deprecated sizing utility classes and replaces them with the new ones.

- Type: problem
- 🔧 Supports autofix (--fix)

## Class list

The classes that are handled by this rule are the following ones:

- Starts with one of those sizing class names: `w-*`, `mw-*`, `h-*`, `mh-*`
- Then, has either no breakpoint or one of the following breakpoint: `*sm-*`,`*md-*`,`*lg-*`, `*xl-*`
- Ends with one of the following class values: `*1`, `*2`, `*3`, `*4`, `*5`, `*hair`, `*line`, `*micro`, `*mini`, `*small-regular`, `*regular`, `*small-large`, `*large`, `*big`, `*bigger-big`, `*small-huge`, `*huge`, `*small-giant`, `*giant`, `*bigger-giant`, `*25`, `*50`, `*75`, `*100`

**Note that the classes that have, as a value, `*small-large` and `*bigger-giant` don't have an exact matching in the new sizing utility classes. Therefore, they should be reviewed carefully.**

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="w-3">Content</div>
<div class="h-sm-hair">Content</div>
<div class="mh-lg-4">Content</div>
<div class="w-md-25">Content</div>
```

### ✅ Valid Code

```html
<div class="w-16">Content</div>
<div class="h-sm-2">Content</div>
<div class="max-h-lg-4">Content</div>
<div class="w-md-three-quarters">Content</div>
```
