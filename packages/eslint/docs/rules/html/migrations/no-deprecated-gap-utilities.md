# `no-deprecated-gap-utilities`

Flags all deprecated bootstrap gap utility classes and replaces them with the new ones.

- Type: problem
- 🔧 Supports autofix (--fix)

## Class list

The classes that are handled by this rule are the following ones:

- Starts with one of those gap class names: `gap-*`, `column-gap-*`, `row-gap-*`
- Then, has either no breakpoint or one of the following breakpoint: `*sm-*`,`*md-*`,`*lg-*`, `*xl-*`
- Ends with one of the following class values: `*1`, `*2`, `*3`, `*4`, `*5`

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="gap-3">Content</div>
<div class="column-gap-sm-5">Content</div>
<div class="row-gap-lg-1">Content</div>
```

### ✅ Valid Code

```html
<div class="gap-8">Content</div>
<div class="column-gap-sm-16">Content</div>
<div class="row-gap-lg-24">Content</div>
```
