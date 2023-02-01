# Swiss Post Internet Header

![Swiss Post Design System splash screen](https://user-images.githubusercontent.com/1659006/187683368-d3aa2534-84be-4580-846e-2cad3796b573.png)

The official Swiss Post Internet Header implementation, built with [Stencil JS](https://stenciljs.com/).

## Documentation
The header docs are part of the storybook docs for the Design System.

[Internet Header Documentation](https://next.design-system.post.ch/?path=/story/components-internet-header-getting-started--page)

## Installation
There are two possibilities to install the header on a page.
### npm installation
Use this if your project uses a bundler or a framework like Angular, React or Vue.

```bash
npm install @swisspost/internet-header
```

`main.ts`
```ts
import { defineCustomElements } from '@swisspost/internet-header';

defineCustomElements();
```

### Basic installation
Use this if you want to use the CDN version and if you don't use a bundler or a framework.

`index.html`
```html
<body>
  <swisspost-internet-header project="your-project-id"></swisspost-internet-header>
  ...
  <script
    type="module"
    src="https://unpkg.com/@swisspost/internet-header/dist/swisspost-internet-header/swisspost-internet-header.esm.js"
  ></script>
</body>
```

## Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

Considering supporting the Swiss Post Design System with your contribution? Whether you like to contribute new patterns, fix a bug, spotted a typo or have ideas for improvement - we'd love to hear from you. Learn how you can contribute to this project in the [header contribution guidelines](./CONTRIBUTING.md) and also take a look at the [general contribution guidelines](/CONTRIBUTING.md).

For any questions regarding the pattern library, you can reach out on the [discussions page](https://github.com/swisspost/design-system/discussions).

In order to keep our community open and inclusive, we expect you to read and follow our [Code of Conduct](/CODE_OF_CONDUCT.md).

## License

Software contained in this repository is published by the Swiss Post Ltd. under the [Apache 2.0 License](./LICENSE).

© 2022 Swiss Post, Ltd.
