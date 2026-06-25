import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { swissPostPreset } from '@swisspost/design-system-styles-primeng';

export const appConfig: ApplicationConfig = {
  providers: [
    ...
    providePrimeNG({ theme: { preset: swissPostPreset } }),
  ],
};
