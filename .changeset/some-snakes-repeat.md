---
'@swisspost/design-system-styles': major
'@swisspost/design-system-documentation': major
---

Removed the Standard HTML Banner component (`.banner`, `.banner-*`) in favor of the `post-banner` web component.

BEFORE:

```html
<div role="alert" class="banner banner-success">
  <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
</div>
```

AFTER:

```html
<post-banner type="success">
  <p>This is the content of the banner. It helps to draw attention to critical messages.</p>
</post-banner>
```
