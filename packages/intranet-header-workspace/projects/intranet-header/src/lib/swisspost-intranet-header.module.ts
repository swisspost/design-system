import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SwissPostIntranetHeaderComponent } from './swisspost-intranet-header.component';

@NgModule({
  declarations: [SwissPostIntranetHeaderComponent],
  imports: [RouterModule, CommonModule, NgbModule],
  exports: [SwissPostIntranetHeaderComponent],
})
export class SwissPostIntranetHeaderModule {}
