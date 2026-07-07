# @swisspost/design-system-styles-primeng

## 10.0.1

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@10.0.1

## 10.0.0

### Major Changes

- Updated the package output to fit with new PrimeNg API. It is no longer overriding the CSS styles behind the hood but now exports a preset to be used as the theme of PrimeNG.  
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

  And remove the following import from your `styles.scss`:

  ````scss
  @use '@swisspost/design-system-styles-primeng/primeng-theme';
  ``` (by [@leagrdv](https://github.com/leagrdv) with [#7919](https://github.com/swisspost/design-system/pull/7919))
  ````

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@10.0.0

## 10.0.0-next.76

### Major Changes

- Updated the package output to fit with new PrimeNg API. It is no longer overriding the CSS styles behind the hood but now exports a preset to be used as the theme of PrimeNG.  
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

  And remove the following import from your `styles.scss`:

  ````scss
  @use '@swisspost/design-system-styles-primeng/primeng-theme';
  ``` (by [@leagrdv](https://github.com/leagrdv) with [#7919](https://github.com/swisspost/design-system/pull/7919))
  ````

### Patch Changes

- Updated dependencies:
  - @swisspost/design-system-styles@10.0.0-next.76
