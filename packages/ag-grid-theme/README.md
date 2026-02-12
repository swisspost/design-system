# Swiss Post AG Grid Theme

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

Swiss Post theme for the AG Grid library

## Documentation

- Technical docs: [Swiss Post Design System](https://design-system.post.ch/?path=/docs/e1405db2-fe06-45c6-a7ed-1408f9bf4895--docs)

## Installation

Install the AG Grid Theme package

```bash
npm install @swisspost/ag-grid-theme
```

## Usage

To use the theme, simply import it from the package and use it within the grid options of your table.

```javascript
import { swissPostTheme } from '@swisspost/design-system-ag-grid-theme';

myOptions: GridOptions = {
  theme: swissPostTheme,
};
```
