---
'@swisspost/design-system-components': major
'@swisspost/design-system-documentation': patch
---

Restricted `post-collapsible` to collapse behaviour only.
The component remains unchanged when used with external controls, however, it no longer has a `header` slot.

To get the same look and feel as in the previous version, use the `post-accordion-item` component instead.

Before: 
```html
<post-collapsible collapsed="" headingLevel="6">
  <span slot="header">Titulum</span>
  <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
</post-collapsible>
```

After:
```html
<post-accordion-item collapsed="" headingLevel="6">
  <span slot="header">Titulum</span>
  <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
</post-accordion-item>
```
