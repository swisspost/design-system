# Design System Migrations

Scripts to migrate an Angular application from one Design System version to another.

## Usage

The migration package is not intended to be installed as a dependency on your project.
You can install it temporarily while migrating your project to a new version of Design System, then uninstall it directly:

```bash
  npm install @swisspost/design-system-migrations
  npx ng update @swisspost/design-system-migrations --from=[currentVersion] --to=[targetedVersion] --migrate-only --allow-dirty
  npm uninstall @swisspost/design-system-migrations
```

Be sure to update your application one major Design System version at a time as explained in our [migration guide](https://design-system.post.ch/).

## Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](../../CODE_OF_CONDUCT.md)

Considering supporting the Swiss Post Design System with your contribution? Whether you like to contribute new patterns, fix a bug, spotted a typo or have ideas for improvement - we'd love to hear from you. Learn how you can contribute to this project in the [migration contribution guidelines](./CONTRIBUTING.md) and also take a look at the [general contribution guidelines](../../CONTRIBUTING.md).

For any questions regarding the pattern library, you can reach out on the [discussions page](https://github.com/swisspost/design-system/discussions).

In order to keep our community open and inclusive, we expect you to read and follow our [Code of Conduct](/CODE_OF_CONDUCT.md).

## License

Software contained in this repository is published by the Swiss Post Ltd. under the [Apache 2.0 License](./LICENSE).

© 2024 Swiss Post, Ltd.
