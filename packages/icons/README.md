# Design System Icons

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

Icons for the Swiss Post Design System.

## Documentation

- Icon search: https://design-system.post.ch/?path=/docs/0dcfe3c0-bfc0-4107-b43b-7e9d825b805f--docs
- `post-icon` component: https://design-system.post.ch/?path=/docs/0dcfe3c0-bfc0-4107-b43b-7e9d825b805f--docs

## Adding new icons

To add a new icon to this package, please contact [corpdesign@post.ch](mailto:corpdesign@post.ch). There is an automated workflow in place that will grab the new icon from the sharing platform and issue a pull request to this repository. After review through maintainers of the Design System, the new icon(s) can be published.

## Downloading icons yourself

The package ships the `post-icons-fetch` command, which downloads and builds the icons into a directory of your choice.

Provide the credentials as environment variables, for example in a `.env` file in the working directory:

```shell
CEN_USERNAME=<username>
CEN_PASSWORD=<password>
CEN_URL_ICONSET_POST=<Censhare URL>
CEN_URL_ICONSET_UI=<Censhare URL>
```

Then run:

```shell
npx --package @swisspost/design-system-icons post-icons-fetch --out ./icons
```

The output directory contains:

- `source/` raw downloads and source reports
- `post-icons/` built SVG icons
- `custom-properties/` CSS files with one custom property per icon
- `report.json` and `report.min.json` icon reports

The `--out` option is required. The command warns if the directory is not empty. It does not delete existing files, but it overwrites files with matching names. Remove outdated files yourself if needed. If you need a proxy, set `HTTP_PROXY`, `HTTPS_PROXY` and optionally `NO_PROXY`.

## Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://github.com/swisspost/design-system/blob/main/CODE_OF_CONDUCT.md)

Considering supporting the Swiss Post Design System with your contribution? Whether you like to contribute new patterns, fix a bug, spotted a typo or have ideas for improvement - we'd love to hear from you. Learn how you can contribute to this project in the [styles contribution guidelines](./CONTRIBUTING.md) and also take a look at the [general contribution guidelines](https://github.com/swisspost/design-system/blob/main/CONTRIBUTING.md).

For any questions regarding the pattern library, you can reach out on the [discussions page](https://github.com/swisspost/design-system/discussions).

In order to keep our community open and inclusive, we expect you to read and follow our [Code of Conduct](https://github.com/swisspost/design-system/blob/main/CODE_OF_CONDUCT.md).

## License

Software contained in this repository is published by the Swiss Post Ltd. under the [Apache 2.0 License](./LICENSE).

© 2024 Swiss Post, Ltd.
