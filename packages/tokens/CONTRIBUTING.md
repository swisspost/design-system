# Contributing to Design System Tokens

These contribution guidelines extend the [general contribution guidelines](../../CONTRIBUTING.md) found at the root of this repository.

## About Design Tokens

Design tokens are the building blocks of UI elements. The same tokens can be used in designs, tools, and code.

## Setup

Apart from the regular setup described in the general [contribution guidelines](../../CONTRIBUTING.md), you need nothing special to be able to run the build command.

## Building the Design Tokens

Run the following command to create a dist folder and build the output files using [style-dictionary](https://amzn.github.io/style-dictionary) and [tokens-studio/sd-transforms](https://www.npmjs.com/package/@tokens-studio/sd-transforms). This command also copies the source files into the dist folder, making them available for developers.

```shell
  pnpm --filter design-system-tokens build
```
