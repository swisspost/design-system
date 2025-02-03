# `no-deprecated-btn-rg`

Flags deprecated `btn-rg` class and suggests removal or replacement with `btn-sm`.
- Type: suggestion
- 🔧 Supports autofix (--fix)


## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<button class="btn btn-primary btn-rg">Submit</button>
```

### ✅ Valid Code

```html
<button class="btn btn-primary btn-sm">Submit</button>
```

Or simply remove the `btn-rg` class:

```html
<button class="btn btn-primary">Submit</button>
```