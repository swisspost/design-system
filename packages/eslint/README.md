# Design System ESLint

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

ESLint rules for linting and migrating projects that use the Swiss Post Design System.

## Documentation

All rules offered by this package are documented individually in the [rules documentation](https://github.com/swisspost/design-system/blob/main/packages/eslint/docs/rules).

## Installation

To install the package, run:

```bash
npm install @swisspost/design-system-eslint --save-dev
```

## Linting Configuration

To use the Swiss Post Design System ESLint package, simply add the predefined to your ESLint configuration file:

```js
// eslint.config.mjs
import post from "@swisspost/design-system-eslint";

export default [
  ...post.configs.tsRecommended,
  ...post.configs.htmlRecommended,
];
```

To override the default configuration, you can extend the rules as follows:

```js
// eslint.config.mjs
import post from "@swisspost/design-system-eslint";

export default [
  ...post.configs.tsRecommended,
  
  // apply html rules only to files in the src/safe directory
  ...post.configs.htmlRecommended.map(config => ({
    ...config,
    files: ["**/src/safe/*.html"],
  })),

  // override rules as needed
  {
    name: "custom-config",
    rules: {
      '@swisspost/design-system/ts-rule-name': 'off',
      '@swisspost/design-system/html/html-rule-name': 'warn',
    },
  },
];
```

For more information, check the [ESLint configuration documentation](https://eslint.org/docs/latest/use/configure/combine-configs).

## Running Linting

To run the linting, use the following command at the root of the project:

```bash
eslint
```

You can also use the `--fix` flag to automatically fix some issues:

```bash
eslint --fix
```

## Inspecting Configuration

To get a better overview of the rules configured in your project, run:

```bash
eslint --inspect-config
```

## Running Migrations

In addition to linting rules, the `@swisspost/design-system-eslint` package provides rules to help migrate from one version of the Design System to another.
These migration rules do not need to be added to your ESLint configuration and can be run once using the following command at the root of the project:

```bash
eslint -c @swisspost/design-system-eslint/migrations.js --fix
```


## Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://github.com/swisspost/design-system/blob/main/CODE_OF_CONDUCT.md)

Considering supporting the Swiss Post Design System with your contribution? Whether you like to contribute new patterns, fix a bug, spotted a typo or have ideas for improvement - we'd love to hear from you. Learn how you can contribute to this project in the [styles contribution guidelines](./CONTRIBUTING.md) and also take a look at the [general contribution guidelines](https://github.com/swisspost/design-system/blob/main/CONTRIBUTING.md).

For any questions regarding the pattern library, you can reach out on the [discussions page](https://github.com/swisspost/design-system/discussions).

In order to keep our community open and inclusive, we expect you to read and follow our [Code of Conduct](https://github.com/swisspost/design-system/blob/main/CODE_OF_CONDUCT.md).

## License

Software contained in this repository is published by the Swiss Post Ltd. under the [Apache 2.0 License](./LICENSE).

© 2025 Swiss Post, Ltd.
