# Swiss Post Design System TypeScript Configurations

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

Shared TypeScript configurations used across the Swiss Post Design System.

## Available Configurations

| Configuration           | Use for                                            |
| ----------------------- | -------------------------------------------------- |
| `base.tsconfig.json`    | Options shared by all environments                 |
| `dom.tsconfig.json`     | Bundled browser code                               |
| `node.tsconfig.json`    | Node.js code such as build scripts and CLI tooling |
| `stencil.tsconfig.json` | Stencil packages                                   |
| `angular.tsconfig.json` | Angular libraries and applications                 |

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