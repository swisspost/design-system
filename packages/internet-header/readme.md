# Swiss Post Internet Header

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

The official Swiss Post Internet Header implementation, built with [Stencil JS](https://stenciljs.com/).

## Documentation

The header docs are part of the storybook docs for the Design System.

[Internet Header Documentation](https://next.design-system.post.ch/?path=/docs/internet-header-getting-started--docs)

## Installation

There are two possibilities to install the header on a page.

### Npm installation

Use this if your project uses a bundler or a framework like Angular, React or Vue.

```bash
npm install @swisspost/internet-header
```

```html
<!-- index.html -->
<body>
  <swisspost-internet-header project="your-project-id"></swisspost-internet-header>
  ...
</body>
```

#### Lazy-loaded

```javascript
// main.ts / index.js / ...
import { defineCustomElements } from '@swisspost/internet-header/loader';

defineCustomElements();
```

#### Bare component

```javascript
// main.ts / index.js / ...
import '@swisspost/internet-header/dist/swisspost-internet-header/swisspost-internet-header.esm';
```

### Basic installation

Use this if you want to use the CDN version and if you don't use a bundler or a framework.
Make sure to replace `{version}` with the version you want to use or remove `@{version}` to use the latest version.

#### Lazy-loaded

```html
<!DOCTYPE html>
<html>
  <body>
    <swisspost-internet-header project="your-project-id"></swisspost-internet-header>
  </body>
  <script type="module">
    import { defineCustomElements } from 'https://unpkg.com/@swisspost/internet-header@{version}/loader/index.es2017.js';

    defineCustomElements();
  </script>
</html>
```
#### Bare component

```html
<!-- index.html -->
<head>
  <script
    async
    type="module"
    src="https://unpkg.com/@swisspost/internet-header@{version}/dist/swisspost-internet-header/swisspost-internet-header.esm.js"
  ></script>
</head>
<body>
  <swisspost-internet-header project="your-project-id"></swisspost-internet-header>
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
