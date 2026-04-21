# `no-deprecated-responsive-spacing-utilities`

Flags all deprecated responsive spacing utility classes and replaces them with the new ones.

- Type: problem
- 🔧 Supports autofix (--fix)

## Class list

The classes that are handled by this rule are the following ones:

- Starts with one of those margin/padding/gap class names: `m-*`, `mt-*`, `mb-*`, `ml-*`, `mr-*`, `p-*`, `pt-*`, `pb-*`, `pl-*`, `pr-*`, `gap-*`
- Ends with one of the following class values: `*-tiny-r`, `*-small-r`, `*-regular-r`, `*-large-r`, `*-big-r`, `*-bigger-big-r`, `*-huge-r`, `*-giant-r`

**Note that the classes that have, as a value, `*-large-r`, `*-big-r` and `*-huge-r` don't have an exact matching in the new spacing utility classes. Therefore, they should be reviewed carefully.**

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="mt-tiny-r">Content</div>
<div class="pb-regular-r">Content</div>
<div class="gap-big-r">Content</div>
```

### ✅ Valid Code

```html
<div class="mt-12 mt-md-16">Content</div>
<div class="pb-16 pb-md-24">Content</div>
<div class="gap-24 gap-md-32 gap-lg-40">Content</div>
```