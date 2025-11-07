# `no-deprecated-font-weight`

Flags `bold` and `regular` classes and replaces them with `fw-bold` and `fw-regular`.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<p class="bold">My bold text</p>
<p class="regular">My regular text</p>
```

### ✅ Valid Code

```html
<p class="fw-bold">My bold text</p>
<p class="fw-regular">My regular text</p>
```
