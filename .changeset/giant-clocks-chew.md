---
'@swisspost/design-system-styles': major
'@swisspost/design-system-icons': major
---

The `icon` and `post-icon` mixins have been removed and replaced with more flexible `mask-image` mixin. Icons must now be loaded separately using the `custom-property` mixin at the top of the file.

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
// load icon at the top of your file
@include post.custom-property('accessibility', './path/to/icon/folder');

.my-icon {
  @include post.post-icon('accessibility');
  
  // optionally add styles for the icon
  color: #fc0;
  width: 1em;
  height: 1em;
}
```
