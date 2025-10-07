# `no-deprecated-chip-filter`

Flags `chip-filter` class and replaces it with `chip-selectable`.

- Type: problem
- 🔧 Supports autofix (--fix)

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="chip chip-filter">
  <input id="my-chip" name="my-chip" type="checkbox" />
  <label for="my-chip">
    <span class="chip-text">Chip</span>
  </label>
</div>
```

### ✅ Valid Code

```html
<div class="chip chip-selectable">
  <input id="my-chip" name="my-chip" type="checkbox" />
  <label for="my-chip">
    <span class="chip-text">Chip</span>
  </label>
</div>
```
