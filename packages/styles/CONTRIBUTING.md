# Contributing to Design System Styles

These contribution guidelines extend the [general contribution guidelines](../../CONTRIBUTING.md), where you can find instructions on how to set up the repository for contributing.

## Design principles

### Bootstrap

The Design System Styles are a collection of independent component styles. Components are based on Bootstrap an its design philosophy. For some components, styles are custom built and don't depend on Bootstrap, e.g. buttons. These components should maintain compatibility with Bootstrap classes. Adhering to this principle will reduce the entry barrier for new developers who might be familiar with Bootstrap.

Bootstrap components use global variables, mixins, functions and placeholders, therefore they are wrapped with custom partials that import those globals, the respective bootstrap file and the variable overrides with Swiss Post styles (see [themes/bootstrap](./src/themes/bootstrap/) for examples). These wrapper files are a workaround until bootstrap supports the newer `@use` syntax.

### Sass

General styling rules are suggested through linting with stylelint. At the moment, these rules are not enforced or applied/fixed automatically. This might change in the future.

Stylesheets define their own dependencies and use namespaces for variables, functions and mixins. Using global scss variables is discouraged.

```scss
// DO
@use 'variables/buttons'; // Creates "buttons" namespace by convention

.btn {
  background: buttons.$background;
}

// DON'T
@import 'variables/buttons'; // Global import, leads to duplicate output

.btn {
  background: $background; // No namespace
}
```

This ensures independent component styles that can be reused. The mechanics of the `@use` keyword also ensures that no file is loaded twice when generating a CSS bundle, even if it is used more than once.

### Components

Component file names are lower- and kebab-cased (`floating-label.scss`) and don't start with an underscore (~~`_floatingLabel.scss`~~) as they are not partial scss files - they can be compiled standalone and produce valid, usable CSS.

Every component file should have a corresponding test file importing the component to check if a standalone build works.

### Themes

The only and default theme used currently is Bootstrap. When adding themings for other libraries, create separate entry files for each theme.

### Dependencies/licensing

Licenses of third party packages that are bundled with the output (e.g. Bootstrap) need to be included in the output and delivered with the output code.

### Margins

Block level content elements (headings, paragraphs, images, lists, ...; html tags without any classes or context) should use the following margin system: define block margins but reset the margin start for the first child and the margin end for the last child. The rules for first and last child should have low specificity.

```html
p {
  margin-block: 1rem;

  :where(:first-child) {
    margin-block-start: 0;
  }

  :where(:last-child) {
    margin-block-end: 0;
  }
}
```

## Bundling the styles

Run the following command to lint all scss files, create a dist folder and build the output CSS files using [gulp](https://gulpjs.com/). This command also copies the entire Scss source files into the dist folder, making them available for developers.

```bash
# Production build
npm run build

# Rebuild on change
npm run start
```

## Unit tests

As of now, possibilities to unit-test scss files are limited. [Jest](https://jestjs.io/) along with a custom [jest transformer](./tests/jest-scss-transformer.js) is used to compile every test file. A simple [matching library](./tests/jest.scss) is available for evaluating with commands like `equal`, `not-equal` or checking if lists are ascending/descending. Tests fail if there was an error during compilation and are successful otherwise, no matter the output.

- **Components**: Check if every component file is able to be built individually.
- **Functions**: Basic unit testing is possible by checking output
- **Mixins**: Check if mixins can be called, output eval however is not possible
- **Placehoders**: Check if file can be compiled, output cannot be evaluated
- **Variables**: No dedicated tests necessary

```bash
npm run test
```

## Integration tests

Automated integration tests are not yet available for the Design System Styles.

## Linting

This project is using [Stylelint](https://stylelint.io/) with a configuration based on the [Sass Guidelines](https://sass-guidelin.es/), properties are sorted according to the [SMACSS sort order](https://www.npmjs.com/package/css-property-sort-order-smacss).

```bash
# Console output only
npm run lint

# Fix all auto-fixable issues
npm run lint:fix
```

## Formatting

[Prettier]() is used to format .scss files with this [configuration](../../.prettierrc). If your editor allows for it, we recommend to enable format on save for .scss files.

```bash
npm run format
```

## Other commands

Common tasks are present as npm scripts:

```bash
# Delete the dist folder
npm run clean
```

## Icons

Please refer to the [icon generation guide](../../Tools/IconReader/README.md) to learn how to generate a new icon variables file.
