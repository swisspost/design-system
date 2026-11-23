<div align="center">

![The Swiss Post Design System pattern library for a unified and accessible user experience across the web platform](https://github.com/swisspost/design-system/assets/1659006/e58acc52-3e6a-47b3-84b5-0726250ec225)

<h1>Swiss Post Design System</h1>

<p>The pattern library for a unified and accessible user experience across the Swiss Post web platform.</p>

<p>
  <a href="https://design-system.post.ch">Documentation</a> ·
  <a href="https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=3209%3A72270&mode=design&t=jhmGcSqeWq2SgQXT-1">Figma</a> ·
  <a href="https://www.experience-hub.ch/document/2803">Experience Hub</a>
</p>

<p>
  <a href="./LICENSE"><img alt="License" src="https://img.shields.io/github/license/swisspost/design-system?style=flat-square&color=%23fc0"></a>
  <a href="https://github.com/swisspost/design-system/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/swisspost/design-system?style=flat-square"></a>
  <a href="https://github.com/swisspost/design-system/commits"><img alt="Last commit" src="https://img.shields.io/github/last-commit/swisspost/design-system?style=flat-square"></a>
</p>

</div>

The Swiss Post Design System is an open-source monorepo that provides everything needed to build a consistent and accessible web experience: standards-based web components, CSS styles, design tokens, icons, Angular and React framework wrappers, and integrations for PrimeNG and AG Grid.

## Packages

| Package                                                                       | Version                                                                                                                                                                      | Description                                                                                                        | Changelog                                              |
| :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------- |
| [`@swisspost/design-system-styles`](/packages/styles)                         | [![npm](https://img.shields.io/npm/v/%40swisspost%2Fdesign-system-styles?style=flat-square&logo=npm&logoColor=333333&label=%20&color=%23fc0)](https://www.npmjs.com/package/@swisspost/design-system-styles)                         | Design system styles for the Swiss Post web platform, including theming for Bootstrap and ng-bootstrap components. | [Changelog](/packages/styles/CHANGELOG.md)             |
| [`@swisspost/design-system-components`](/packages/components)                 | [![npm](https://img.shields.io/npm/v/%40swisspost%2Fdesign-system-components?style=flat-square&logo=npm&logoColor=333333&label=%20&color=%23fc0)](https://www.npmjs.com/package/@swisspost/design-system-components)                 | A collection of standards-based web components built with Stencil for use with any framework, or none at all.      | [Changelog](/packages/components/CHANGELOG.md)         |
| [`@swisspost/design-system-components-angular`](/packages/components-angular) | [![npm](https://img.shields.io/npm/v/%40swisspost%2Fdesign-system-components-angular?style=flat-square&logo=npm&logoColor=333333&label=%20&color=%23fc0)](https://www.npmjs.com/package/@swisspost/design-system-components-angular) | Angular wrapper components for easy integration with the Angular ecosystem.                                        | [Changelog](/packages/components-angular/CHANGELOG.md) |
| [`@swisspost/design-system-components-react`](/packages/components-react)     | [![npm](https://img.shields.io/npm/v/%40swisspost%2Fdesign-system-components-react?style=flat-square&logo=npm&logoColor=333333&label=%20&color=%23fc0)](https://www.npmjs.com/package/@swisspost/design-system-components-react)     | React wrapper components for easy integration with the React ecosystem.                                            | [Changelog](/packages/components-react/CHANGELOG.md)   |
| [`@swisspost/internet-header`](/packages/internet-header)                     | [![npm](https://img.shields.io/npm/v/%40swisspost%2Finternet-header?style=flat-square&logo=npm&logoColor=333333&label=%20&color=%23fc0)](https://www.npmjs.com/package/@swisspost/internet-header)                                   | The header and footer for client-facing Swiss Post applications.                                                   | [Changelog](/packages/internet-header/CHANGELOG.md)    |
| [`@swisspost/design-system-icons`](/packages/icons)                           | [![npm](https://img.shields.io/npm/v/%40swisspost%2Fdesign-system-icons?style=flat-square&logo=npm&logoColor=333333&label=%20&color=%23fc0)](https://www.npmjs.com/package/@swisspost/design-system-icons)                           | A collection of Swiss Post icons in SVG format.                                                                    | [Changelog](/packages/icons/CHANGELOG.md)              |
| [`@swisspost/design-system-tokens`](/packages/tokens)                         | [![npm](https://img.shields.io/npm/v/%40swisspost%2Fdesign-system-tokens?style=flat-square&logo=npm&logoColor=333333&label=%20&color=%23fc0)](https://www.npmjs.com/package/@swisspost/design-system-tokens)                         | Design tokens for the Swiss Post Design System.                                                                    | [Changelog](/packages/tokens/CHANGELOG.md)             |
| [`@swisspost/design-system-styles-primeng`](/packages/styles-primeng)         | [![npm](https://img.shields.io/npm/v/%40swisspost%2Fdesign-system-styles-primeng?style=flat-square&logo=npm&logoColor=333333&label=%20&color=%23fc0)](https://www.npmjs.com/package/@swisspost/design-system-styles-primeng)         | Swiss Post styles for PrimeNG components.                                                                          | [Changelog](/packages/styles-primeng/CHANGELOG.md)     |
| [`@swisspost/design-system-theme-ag-grid`](/packages/theme-ag-grid)           | [![npm](https://img.shields.io/npm/v/%40swisspost%2Fdesign-system-theme-ag-grid?style=flat-square&logo=npm&logoColor=333333&label=%20&color=%23fc0)](https://www.npmjs.com/package/@swisspost/design-system-theme-ag-grid)           | The Swiss Post Design System theme for AG Grid.                                                                    | [Changelog](/packages/theme-ag-grid/CHANGELOG.md)      |

## Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg?style=flat-square)](CODE_OF_CONDUCT.md)

Considering supporting the Swiss Post Design System with your contribution? Whether you'd like to contribute new patterns, fix a bug, spotted a typo or have ideas for improvement — we'd love to hear from you. Read more about setting up the development environment and the different ways to get involved in our [Contribution Guidelines](/CONTRIBUTING.md).

For any questions regarding the pattern library, you can reach out on the [discussions page](https://github.com/swisspost/design-system/discussions).

In order to keep our community open and inclusive, we expect you to read and follow our [Code of Conduct](/CODE_OF_CONDUCT.md).

## License

Software contained in this repository is published by the Swiss Post Ltd. under the [Apache 2.0 License](./LICENSE).

© 2026 Swiss Post, Ltd.
