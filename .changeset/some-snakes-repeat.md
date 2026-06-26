---
'@swisspost/design-system-styles': major
'@swisspost/design-system-documentation': major
'@swisspost/design-system-components': major
---

Changed web component `<post-alert>` to `<post-banner>`, and removed the HTML/CSS `.alert` version. Additionally, the classes `.{toast|alert}-primary`, `.{toast|alert}-gray` and `.toast-notification` have been removed.

BEFORE:

```html
<div role="alert" class="alert alert-success">
  <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
</div>
```

```html
<post-alert type="success">
  <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
</post-alert>
```

AFTER:

```html
<post-banner type="success">
  <p>This is the content of the banner. It helps to draw attention to critical messages.</p>
</post-banner>
```
