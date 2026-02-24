import { NgModule } from '@angular/core';
import { SwissPostIntranetHeaderComponent } from './swisspost-intranet-header.component';

/**
 * Keep module for backwards compatibility
 */
@NgModule({
    imports: [SwissPostIntranetHeaderComponent],
    exports: [SwissPostIntranetHeaderComponent],
})
export class SwissPostIntranetHeaderModule {}
