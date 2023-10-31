import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IntranetHeaderBigComponent } from './components/intranet-header-big/intranet-header-big.component';
import { IntranetHeaderSmallComponent } from './components/intranet-header-small/intranet-header-small.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwissPostIntranetHeaderModule } from '@swisspost/design-system-intranet-header';
import { HighlightModule } from 'ngx-highlightjs';
import { HighlightProvider } from '../common/highlight.provider';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, SwissPostIntranetHeaderModule, HighlightModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [IntranetHeaderBigComponent, IntranetHeaderSmallComponent],
  exports: [IntranetHeaderBigComponent, IntranetHeaderSmallComponent],
  providers: [HighlightProvider.Config],
})
export class IntranetComponentsModule {}
