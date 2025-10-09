---
'@swisspost/design-system-styles': major
'@swisspost/design-system-icons': major
---

The `post-icon` mixin has been removed and replaced with more flexible `mask-image` mixin. Icon must now be loaded separately using the `custom-property` mixin at the top of the file.

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
// load icon CSS at the top of your file
@include post.custom-property('accessibility');

.my-icon {
  // add common icon properties manually
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  
  @include post.mask-image('accessibility');

  // optional
  color: #fc0;
}
```
