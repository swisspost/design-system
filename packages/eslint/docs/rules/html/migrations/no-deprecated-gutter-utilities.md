# `no-deprecated-gutter-utilities`

Flags all deprecated bootstrap gutter utility classes and replaces them with the new ones.

- Type: problem
- 🔧 Supports autofix (--fix) — **except for classes using values `1` and `4` (see note below)**

## ⚠️ Manual migration required for `*-1` and `*-4` classes

Classes using the values `1` or `4` **cannot be auto-migrated**.

These values form a rename chain that ESLint's `--fix` loop would follow incorrectly:
- `*-1` → renames to `*-4`, but `*-4` is itself deprecated → would chain to `*-24`
- `*-4` → must also be manual-only, so that a user who manually renames `*-1` → `*-4` doesn't have `*-4` auto-renamed to `*-24` on the next run

These classes are flagged as errors so you can find them, but you must rename them by hand.

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
