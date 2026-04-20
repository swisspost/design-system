// app.module.ts

import { NgModule } from '@angular/core';
import { providePostComponents } from '@swisspost/design-system-components-angular';

@NgModule({
  // ...
  providers: [providePostComponents()],
  /// ...
})
export class AppModule {}
