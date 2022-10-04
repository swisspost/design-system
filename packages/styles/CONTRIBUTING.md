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

## Visual tests

One picture says more than a thousand words.<br>
Thanks to [Percy](https://docs.percy.io/) and [cypress](https://www.cypress.io/), we're able to visually test almost anything that runs in a browser. It handles everything from capturing and rendering screenshots, to detecting and notifying your team of visual changes.

A few steps are required before you can run the script to create the snapshots.

1. Login to your [Percy Account](https://percy.io/).
2. Create a project or navigate to an existing one.
3. Copy your write-only percy token.
4. Open a console in the project root folder.
5. Register the following local environment variable:

```bash
# Windows node/bash/cmd
set PERCY_TOKEN={token}

# Windows powershell
$env:PERCY_TOKEN="{token}"

# Unix
export PERCY_TOKEN={token}
```

6. If you want to take snapshots from a localhost url, you need to allow unauthorized node-tls connections:

```bash
# Windows node/bash/cmd
set NODE_TLS_REJECT_UNAUTHORIZED=0

# wWindows powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"

# Unix terminal
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

7. Create your cypress tests

```javascript
// packages/styles/cypress/integration/example.spec.js

describe('Integration test with visual testing', function () {
  it('Loads the homepage', function () {
    // Load the page or perform any other interactions with the app.
    cy.visit('{url-under-test}');
    // Do other stuff (e.g. click button, etc.)
    // Take a snapshot for visual diffing
    cy.percySnapshot();
  });
});
```

8. Run script `pnpm --filter design-system-styles storybook:snapshots`
9. Once the snapshots has been taken, you should see a new build online in your percy project.

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
