# Swiss Post Design System ESLint Configurations

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

Shared ESLint configurations used across the Swiss Post Design System.

## Available Configurations

| Configuration | Use for                                                  |
| ------------- | -------------------------------------------------------- |
| `base`        | Options shared by all packages, **always include first** |
| `angular`     | Angular libraries and applications                       |
| `cypress`     | Cypress end-to-end tests                                 |
| `jest`        | Jest unit tests                                          |
| `mdx`         | MDX documentation files                                  |
| `next`        | Next.js applications                                     |
| `react`       | React libraries and applications                         |
| `stencil`     | Stencil packages                                         |
| `storybook`   | Storybook stories and configuration                      |

## Installation

```bash
npm i -D @swisspost/design-system-eslint-config
```

## Usage

Compose the configurations you need in your `eslint.config.mjs` file.

```js
import { defineConfig } from 'eslint/config';

import post from '@swisspost/design-system-eslint-config/base';
import postStencil from '@swisspost/design-system-eslint-config/stencil';
import postCypress from '@swisspost/design-system-eslint-config/cypress';

export default defineConfig(post, postStencil, postCypress);
```

The `base` configuration enables type-aware linting through the TypeScript project service.
Make sure every linted TypeScript file is covered by a `tsconfig.json`.
