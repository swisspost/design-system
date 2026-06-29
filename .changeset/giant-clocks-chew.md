---
'@swisspost/design-system-styles': major
'@swisspost/design-system-icons': major
---

The `@mixin post-icon` has been renamed to `@mixin icon` and now requires icons to be preloaded using the `@mixin custom-property` at the top of the file.

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
