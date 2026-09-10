# Swiss Post Styles PrimeNG

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

Swiss Post theme for the PrimeNG Datatable component.

## Documentation

- Technical docs: [Swiss Post Design System](https://design-system.post.ch/?path=/docs/d2112bed-c611-4098-a1ad-e654f7d622e7--docs)

## Installation

Install the Theme PrimeNG package

```bash
npm install @swisspost/design-system-styles-primeng
```

## Usage

To use the theme, simply import it from the package and add it in the `app.config.ts` file of your project.

```javascript
import { providePrimeNG } from 'primeng/config';
import SwissPostPreset from '@swisspost/design-system-styles-primeng';

export const appConfig: ApplicationConfig = {
    providers: [
        providePrimeNG({
            theme: {
                preset: SwissPostPreset
            }
        })
    ]
};
```
