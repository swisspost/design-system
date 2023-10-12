# Contributing to the Intranet Header

## Setup

These contribution guidelines extend the [general contribution guidelines](../../../../CONTRIBUTING.md). This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Code scaffolding

**Attention**: When running commands from the design-system root folder, you'd need to prefix your `ng` commands with

`pnpm --filter design-system-angular-components exec ng ...`

Alternatively, you can `cd packages/angular-components` and run commands from this location without prefix.

Run `ng generate component component-name --project intranet-header` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project intranet-header`.

> Note: Don't forget to add `--project intranet-header` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build intranet-header` to build the project. The build artifacts will be stored in the `dist` directory of the components angular package.

## Publishing

Use the publishing workflow as described in the [Contribution Guidelines](../../../../CONTRIBUTING.md).

## Running unit tests

Run `ng test intranet-header` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
