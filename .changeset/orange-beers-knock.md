---
'@swisspost/design-system-components': major
'@swisspost/design-system-documentation': patch
---

Updated the `post-megadropdown` component to no longer uses named slots, it now provides only a default slot for its content.
The close and back buttons are built into the component and are configured using the `labelClose` and `labelBack` properties instead of slotted markup.
To preserve styling, the overview link should use the `.megadropdown-overview-link` class.

BEFORE:
```html
<post-megadropdown>
  <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
    <post-icon name="arrowleft"></post-icon>
    Back
  </button>
  <post-closebutton slot="close-button">Close</post-closebutton>
  <a slot="megadropdown-overview-link" href="/letters">Overview Letters</a>
  <!-- Mega drop-down links -->
</post-megadropdown>
```

AFTER:
```html
<post-megadropdown label-close="Close" label-back="Back">
  <a class="megadropdown-overview-link" href="/letters">Overview Letters</a>
  <!-- Mega drop-down links -->
</post-megadropdown>
```
