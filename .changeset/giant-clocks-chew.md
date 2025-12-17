---
'@swisspost/design-system-styles': major
'@swisspost/design-system-icons': major
---

The `post-icon` mixin has been renamed to `icon` and now requires icons to be preloaded using the `custom-property` mixin at the top of the file.

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
// Load icon(s) at the top of your file
// For a single icon:
@include post.custom-property('accessibility', './path/to/icon/folder');

// For multiple icons in the same file:
@include post.custom-property(('accessibility', 'arrow'), './path/to/icon/folder');

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
