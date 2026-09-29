# Swiss Post Design System TypeScript Configurations

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

Shared TypeScript configurations used across the Swiss Post Design System.

## Available Configurations

| Configuration           | Use for                                                    |
|-------------------------|------------------------------------------------------------|
| `base.tsconfig.json`    | Platform-agnostic code that brings its own module settings |
| `browser.tsconfig.json` | Browser-facing code that is bundled for the web            |
| `node.tsconfig.json`    | Node.js code such as build scripts and CLI tooling         |
| `stencil.tsconfig.json` | Stencil components and packages                            |
| `angular.tsconfig.json` | Angular libraries and applications                         |

### Selecting a Configuration

Pick configuration that matches your project type.
Each one already includes the shared baseline, so there is no need to combine them.

Reach for `base.tsconfig.json` only if none of the others fit.
It intentionally leaves `module`, `moduleResolution` and `lib` undefined, so you have to set them yourself.

## Installation

```bash
npm i -D @swisspost/design-system-tsconfig
```

## Usage

To use one of the configurations, simply extend `tsconfig.json`.

For example, to use the stencil configuration:

```json
{
  "extends": "@swisspost/design-system-tsconfig/stencil.tsconfig.json"
}
```