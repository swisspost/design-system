// main.ts

import { importProvidersFrom } from '@angular/core';
import { PostComponentsModule } from '@swisspost/design-system-components-angular';

providers: [
  importProvidersFrom(PostComponentsModule),
]
