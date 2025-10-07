---
'@swisspost/design-system-styles': patch
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

AFTER:
```scss
.my-icon {
  // Add common icon properties manually
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  
  // Use mask-image mixin with optional color parameter
  @include post.mask-image('accessibility', '#fc0');
}
