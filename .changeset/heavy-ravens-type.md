---
'@swisspost/design-system-styles-primeng': major
'@swisspost/design-system-documentation': patch
---

Added back the `@swisspost/design-system-styles-primeng` package. It is no longer overriding the CSS styles behind the hood but now exports a preset to be used as the theme of PrimeNG.

To migrate, update your `app.config.ts` with the new preset:

```typescript
import { providePrimeNG } from 'primeng/config';
import SwissPostPreset from '@swisspost/design-system-styles-primeng';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: SwissPostPreset,
      },
    }),
  ],
};
```
