import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DIRECTIVES } from './stencil-generated';
import { defineCustomElements } from '@swisspost/design-system-components';

@NgModule({
  declarations: [
    ...DIRECTIVES
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true,
    }
  ],
  exports: [
    ...DIRECTIVES
  ]
})
export class ComponentsModule { }
