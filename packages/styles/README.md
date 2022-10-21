![Swiss Post Design System splash screen](https://user-images.githubusercontent.com/1659006/187683368-d3aa2534-84be-4580-846e-2cad3796b573.png)

# Design System Styles

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
- index.scss (internet facing applications)
- intranet.scss (internal applications)
- basics.scss (atomic styles for font, buttons, lists etc.)
- core.scss (variables, mixins, functions and placeholders only)

## Migrations Schematics

Schematics are used to transform a software project by adapting it to current Design System Styles.

### Testing

To test the Schematics without writing any changes to your files, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool.<br>
That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Run the following command in the project which uses this package as dependency:

```bash
schematics ./node_modules/@swisspost/design-system-styles:migration-name
```

Replace `migration-name` with any defined migration in the migrations.json file or simply get some help with:

```bash
schematics --help
```

### Migrate

To execute the migrations please follow our [migration-guide](https://design-system.post.ch/).

## Contributing

Learn how you can contribute to this project in the [contribution guidelines](./CONTRIBUTING.md).
