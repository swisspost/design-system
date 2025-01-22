# Design System ESLint Plugin

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

ESLint plugin for the Swiss Post Design System.

## Documentation

[Rules documentation](https://github.com/swisspost/design-system/blob/main/packages/eslint-plugin/docs)

## Installation

```bash
npm install @swisspost/design-system-eslint-plugin
```

## Configuration

To Use the Swiss Post Design System ESLint plugin simply add it to your ESLint configuration file:

```js
// eslint.config.js
import designSystemESLint from "@swisspost/design-system-eslint-plugin";

export default [
  designSystemESLint.configs.template
];
```

To override the default configuration, you can extend the rules:

```js
// eslint.config.js
import designSystemESLint from "@swisspost/design-system-eslint-plugin";

export default [
  {
    ...designSystemESLint.configs.template,
    rules: {
      "@swisspost-eslint/template/some-rule-name": "warn"
    }
  }
];
```

_More information in [ESLint plugin documentation](https://eslint.org/docs/latest/use/configure/plugins)_.

## Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://github.com/swisspost/design-system/blob/main/CODE_OF_CONDUCT.md)

Considering supporting the Swiss Post Design System with your contribution? Whether you like to contribute new patterns, fix a bug, spotted a typo or have ideas for improvement - we'd love to hear from you. Learn how you can contribute to this project in the [styles contribution guidelines](./CONTRIBUTING.md) and also take a look at the [general contribution guidelines](https://github.com/swisspost/design-system/blob/main/CONTRIBUTING.md).

For any questions regarding the pattern library, you can reach out on the [discussions page](https://github.com/swisspost/design-system/discussions).

In order to keep our community open and inclusive, we expect you to read and follow our [Code of Conduct](https://github.com/swisspost/design-system/blob/main/CODE_OF_CONDUCT.md).

## License

Software contained in this repository is published by the Swiss Post Ltd. under the [Apache 2.0 License](./LICENSE).

© 2024 Swiss Post, Ltd.
