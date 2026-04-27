---
'@swisspost/design-system-components': major
---

Updated `post-header` megadropdown to use a responsive grid layout, ensuring columns take up the available space regardless of their count across breakpoints.

The `<div class="row row-cols-1 row-cols-sm-2">` column wrapper switches to `<div class="post-megadropdown-grid">`, and the `col` class is dropped from each column div.

BEFORE:

```html
<post-megadropdown id="letters" text-close="Close" text-back="Back">
  <a class="post-megadropdown-overview" href="/letters">Overview Letters</a>
  <div class="row row-cols-1 row-cols-sm-2">
    <div class="col"></div>
    <div class="col"></div>
  </div>
</post-megadropdown>
```

AFTER:

```html
<post-megadropdown id="letters" text-close="Close" text-back="Back">
  <a class="post-megadropdown-overview" href="/letters">Overview Letters</a>
  <div class="post-megadropdown-grid">
    <div></div>
    <div></div>
  </div>
</post-megadropdown>
```
