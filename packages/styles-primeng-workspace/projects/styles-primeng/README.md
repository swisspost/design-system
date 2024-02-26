# Design System Styles for PrimeNg

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

Swiss Post styles for PrimeNg datatable.

## Documentation

The PrimeNg styles are documented in the Design System storybook.

[Styles for PrimeNg Documentation](https://next.design-system.post.ch/?path=/docs/d2112bed-c611-4098-a1ad-e654f7d622e7--docs)

## Installation

To install the package in a project run:

```bash
npm install primeng @swisspost/design-system-styles-primeng
```

The PrimeNg theme and core styles are the necessary, as well as the Swiss Post styles.
All three should be imported in the main style file of your Angular project, usually `src/styles.scss`.

Be sure to assign a layer to the Design System styles to avoid interference.

### With styles.css
```scss
@use "@swisspost/design-system-styles-primeng/primeng-theme";
@use "primeng/resources/primeng.css";

@layer design-system-styles, primeng;

// refer to the @swisspost/design-system-styles installation guidelines to know which bundle-name and extension to choose for your project
@import '@swisspost/design-system-styles/<bundle-name>.<extension>' layer(design-system-styles);
```

## Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

Considering supporting the Swiss Post Design System with your contribution? Whether you like to contribute new patterns, fix a bug, spotted a typo or have ideas for improvement - we'd love to hear from you. Learn how you can contribute to this project in the [header contribution guidelines](./CONTRIBUTING.md) and also take a look at the [general contribution guidelines](/CONTRIBUTING.md).

For any questions regarding the pattern library, you can reach out on the [discussions page](https://github.com/swisspost/design-system/discussions).

In order to keep our community open and inclusive, we expect you to read and follow our [Code of Conduct](/CODE_OF_CONDUCT.md).

## License

Software contained in this repository is published by the Swiss Post Ltd. under the [Apache 2.0 License](./LICENSE).

© 2024 Swiss Post, Ltd.
