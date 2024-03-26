import { APP_INITIALIZER, NgModule } from '@angular/core';
import { defineCustomElements } from '@swisspost/design-system-components/loader';

import { DIRECTIVES } from './stencil-generated';
import { BooleanValueAccessor } from './stencil-generated/boolean-value-accessor';
import { PostCardControlValueAccessorDirective } from './custom/value-accessors/post-card-control-radio-value-accessor';

const DECLARATIONS = [...DIRECTIVES, BooleanValueAccessor, PostCardControlValueAccessorDirective];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true,
    },
  ],
})
export class PostComponentsModule {}
