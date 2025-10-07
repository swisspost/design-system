---
'@swisspost/design-system-styles': major
'@swisspost/design-system-icons': major
---

The `post-icon` mixin has been removed and replaced with more flexible `mask-image` mixin.

BEFORE:
```scss
.my-icon {
  @include post.post-icon(
    $name: 'accessibility',
    // optional
    $color: '#fc0',
    $width: 1em,
    $height: 1em
  );
}
```

AFTER:
```scss
.my-icon {
  // Add common icon properties manually
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  
  @include post.mask-image(
    $name: 'accessibility',
    // optional
    $color: '#fc0',
  );
}
```