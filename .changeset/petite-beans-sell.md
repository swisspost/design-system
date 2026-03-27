---
'@swisspost/design-system-documentation': patch
'@swisspost/design-system-styles': patch
---

Deprecated `.form-select-empty` CSS class. Floating label behavior is now automatic.

BEFORE:
<select class="form-select form-select-empty">
  <option></option>
  <option value="1">Option 1</option>
</select>

AFTER:

<select class="form-select">
  <option></option>
  <option value="1">Option 1</option>
</select>
