# Design System Styles

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

Styles for the Swiss Post web platform.

## Documentation

- Technical docs: [Swiss Post Design System](https://design-system.post.ch)
- Design docs: [Experience Hub](https://www.experience-hub.ch/document/2803)

## Installation

Install the styling package

```bash
npm install @swisspost/design-system-styles
```

> [!Note]
> The `scss` files in our styling package make use of the latest Sass features.
> If you are planning to compile the `.scss` files in your project, make sure you use an up-to-date version of [Dart Sass](https://sass-lang.com/dart-sass). LibSass or Ruby Sass are not supported.
> If you can not meet this prerequisite, you can still use the precompiled CSS files.

## Usage

Import one of our stylesheets into your project:

```scss
@use '@swisspost/design-system-styles/<bundle>.<extension>';
```

### Available bundles

| `<bundle>`       | `<extension>` | Description                                                                 |
| ---------------- | ------------- | --------------------------------------------------------------------------- |
| `post-default`   | `css`, `scss` | Full styles for public websites focused on reading and browsing             |
| `post-compact`   | `css`, `scss` | Full styles for public or internal applications                             |
| `post-condensed` | `css`, `scss` | Full styles for information-dense internal applications                     |
| `basics`         | `css`, `scss` | Base styles for typography, buttons, lists, etc. (excludes components)      |
| `core`           | `scss`        | Core definitions including variables, functions, and mixins (no CSS output) |

### Variables, functions, and mixins

Use the SCSS core for your custom styles and make sure you're always using the most up-to-date definitions:

```scss
@use '@swisspost/design-system-styles/core' as post;

.my-component {
  background-color: post.$yellow; // #FFCC00
}
```

## Migration guide

To execute the migrations please follow our [migration guide](https://design-system.post.ch/).

## Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](/CODE_OF_CONDUCT.md)

Considering supporting the Swiss Post Design System with your contribution? Whether you like to contribute new patterns, fix a bug, spotted a typo or have ideas for improvement - we'd love to hear from you. Learn how you can contribute to this project in the [styles contribution guidelines](./CONTRIBUTING.md) and also take a look at the [general contribution guidelines](../../CONTRIBUTING.md).

For any questions regarding the pattern library, you can reach out on the [discussions page](https://github.com/swisspost/design-system/discussions).

In order to keep our community open and inclusive, we expect you to read and follow our [Code of Conduct](/CODE_OF_CONDUCT.md).

## License

Software contained in this repository is published by the Swiss Post Ltd. under the [Apache 2.0 License](./LICENSE).

© 2024 Swiss Post, Ltd.