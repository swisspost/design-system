# `no-deprecated-font-sizes`

Flags deprecated `fs-*` and `font-size-*` classes and replaces them with either font curves (new `fs-*` classes) for text content or sizing utility classes (`w-* h-*`) for `post-icon` components.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<post-icon name="save" class="fs-regular"></post-icon>
<post-icon name="edit" class="fs-huge"></post-icon>
<post-icon name="edit" class="font-size-12"></post-icon>
<p class="font-size-14">Text content</p>
<p class="font-size-big">Text content</p>
<p class="font-size-tiny">Text content</p>
```

### ✅ Valid Code

```html
<post-icon name="save" class="w-24 h-24"></post-icon>
<post-icon name="save" class="w-48 h-48"></post-icon>
<p class="fs-6">Text content</p>
<p class="fs-4">Text content</p>
<p class="fs-1">Text content</p>
```
