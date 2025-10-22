# `no-deprecated-alert`

Flags deprecated `post-alert` component and replaces it with `post-banner`.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<post-alert><p>Content</p></post-alert>
```

### ✅ Valid Code

```html
<post-banner><p>Content</p></post-banner>
```
