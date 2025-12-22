---
'@swisspost/design-system-components': major
'@swisspost/design-system-documentation': patch
'@swisspost/design-system-styles': patch
---

Update the `post-megadropdown` to allow full customization of its content.
The `post-megadropdown` can now contain any HTML elements, not just lists of links.

As a result, list styling is no longer applied automatically.
If you want a properly styled list of links, you must now add the required `post-megadropdown-*` classes to the corresponding elements yourself.

BEFORE:

```html
<post-megadropdown id="packages" label-close="Close" label-back="Back">
  <a class="post-megadropdown-overview" href="/packages">Overview Packages</a>
  <post-list>
    <p>Send packages</p>
    <post-list-item><a href="/sch">Packages Switzerland</a></post-list-item>
    <post-list-item><a href="/kl">Small goods international</a></post-list-item>
  </post-list>
  <post-list>
    <p><a href="/step-by-step">Step by step</a></p>
    <post-list-item><a href="/sch">Packages Switzerland</a></post-list-item>
    <post-list-item><a href="/kl">Small goods international</a></post-list-item>
  </post-list>
</post-megadropdown>
```

AFTER:

```html
<post-megadropdown id="packages" label-close="Close" label-back="Back">
  <a class="post-megadropdown-overview" href="/packages">Overview Packages</a>
  <div class="row row-cols-1 row-cols-sm-2">
    <div class="col">
      <p class="post-megadropdown-list-title" id="send-packages">Send packages</p>
      <ul class="post-megadropdown-list" aria-labelledby="send-packages">
        <li><a href="/sch">Packages Switzerland</a></li>
        <li><a href="/kl">Small goods international</a></li>
      </ul>
    </div>
    <div class="col">
      <a class="post-megadropdown-list-title" id="step-by-step-packages" href="/step-by-step">Step by step</a>
      <ul class="post-megadropdown-list" aria-labelledby="step-by-step-packages">
        <li><a href="/sch">Packages Switzerland</a></li>
        <li><a href="/kl">Small goods international</a></li>
      </ul>
    </div>
  </div>
</post-megadropdown>
```
