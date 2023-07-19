# Design System Styles

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

Styles for the Swiss Post web platform.

## Documentation

- Technical docs: [Swiss Post Design System](https://design-system.post.ch)
- Design docs: [Experience Hub](https://www.experience-hub.ch/document/2803)

## Installation

<br>
<details>
  <summary>Prerequisites</summary>
  
  In order to be able to use `npm` commands, [node.js](https://nodejs.org/en/) needs to be installed on your machine.

The `scss` files in our styling package make use of the latest features of Sass. If you are planning to compile the .scss files in your project, be sure to use an up to date version of the latest Sass implementation ([dart-sass](https://sass-lang.com/dart-sass), `npm i sass@latest`). LibSass or Ruby Sass are not supported. If you can not meet this prerequisite, you can still use the precompiled CSS files included in the styling package.

</details>
<br>

Install the styling package

```bash
  npm install @swisspost/design-system-styles
```

Import the stylesheet into your project, e.g. `src/styles.scss`.

```scss
@use '@swisspost/design-system-styles/<bundle-name>.scss';
```

Available Sass entrypoints:

- **index.scss** (internet facing applications)
- **intranet.scss** (internal applications)
- **basics.scss** (atomic styles for font, buttons, lists etc.)
- **core.scss** (variables, mixins, functions and placeholders only)

Available CSS bundles:

- **index.css** (internet facing applications)
- **intranet.css** (internal applications)
- **basics.css** (atomic styles for font, buttons, lists etc.)

## Migration guide

To execute the migrations please follow our [migration guide](https://design-system.post.ch/).

## Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

Considering supporting the Swiss Post Design System with your contribution? Whether you like to contribute new patterns, fix a bug, spotted a typo or have ideas for improvement - we'd love to hear from you. Learn how you can contribute to this project in the [styles contribution guidelines](./CONTRIBUTING.md) and also take a look at the [general contribution guidelines](../../CONTRIBUTING.md).

For any questions regarding the pattern library, you can reach out on the [discussions page](https://github.com/swisspost/design-system/discussions).

In order to keep our community open and inclusive, we expect you to read and follow our [Code of Conduct](/CODE_OF_CONDUCT.md).

## License

Software contained in this repository is published by the Swiss Post Ltd. under the [Apache 2.0 License](./LICENSE).

© 2022 Swiss Post, Ltd.
