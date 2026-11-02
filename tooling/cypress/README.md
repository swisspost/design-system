# Swiss Post Design System Cypress Configuration

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

Shared Cypress configuration used across the Swiss Post Design System.

## Installation

```bash
npm i -D @swisspost/design-system-cypress-config cypress
```

## Usage

To use the configuration, extend it in your Cypress config file, for example `cypress.config.mjs`:

```js
import { defineConfig } from 'cypress';

import post from '@swisspost/design-system-cypress-config';

export default defineConfig({
  ...post,
  e2e: {
    ...post.e2e,
    baseUrl: 'http://localhost:9001',
  },
});
```
