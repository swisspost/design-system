---
'@swisspost/design-system-styles': major
'@swisspost/design-system-icons': major
---

The `post-icon` mixin has been renamed to `icon` and refactored. Icons must now be loaded separately using the `custom-property` mixin at the top of the file.

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
@include post.custom-property('./path/to/icon/folder', 'accessibility');

.my-icon {
  @include post.icon(
    $name: 'accessibility',
    // optional
    $color: '#fc0',
    $width: 1em,
    $height: 1em
  );
}
```
