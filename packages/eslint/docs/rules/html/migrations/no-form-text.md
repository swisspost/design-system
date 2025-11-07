# `no-form-text`

Replaces deprecated `form-text` class on form elements with the `form-hint` class.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<p class="form-text">This is a form element description.</p>
```

### ✅ Valid Code

```html
<p class="form-hint">This is a form element description.</p>
```
