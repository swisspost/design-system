![Swiss Post Logo](https://www.post.ch/-/media/portal-opp/global/logos/logo---die-post.svg?vs=2&sc_lang=en)

<br>

# Web Styles

Common styles for the Swiss Post web platform.

## Usage

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
@use "node_modules/@swisspost/design-system-styles/<bundle-name>.scss
```

Available bundles:
- post.scss (internet facing applications)
- post-intranet.scss (internal applications)
- post-basics.scss (atomic styles for font, buttons, lists etc.)
- _cwf.scss (variables, mixins, functions and placeholders only)


## Contributing

Learn how you can contribute to this project in the [contribution guidelines](./CONTRIBUTING.md).
