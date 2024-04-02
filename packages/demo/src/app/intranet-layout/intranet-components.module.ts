import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwissPostIntranetHeaderModule } from '@swisspost/design-system-intranet-header';
import { HighlightModule } from 'ngx-highlightjs';
import { HighlightProvider } from '../common/highlight.provider';
import { IntranetHeaderDemoRegularComponent } from './components/intranet-header-demo-regular/intranet-header-demo-regular.component';
import { IntranetHeaderDemoBigSidebarComponent } from './components/intranet-header-demo-big-sidebar/intranet-header-demo-big-sidebar.component';
import { IntranetHeaderDemoSmallSidebarComponent } from './components/intranet-header-demo-small-sidebar/intranet-header-demo-small-sidebar.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, SwissPostIntranetHeaderModule, HighlightModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    IntranetHeaderDemoRegularComponent,
    IntranetHeaderDemoBigSidebarComponent,
    IntranetHeaderDemoSmallSidebarComponent,
  ],
  exports: [
    IntranetHeaderDemoRegularComponent,
    IntranetHeaderDemoBigSidebarComponent,
    IntranetHeaderDemoSmallSidebarComponent,
  ],
  providers: [HighlightProvider.Config],
})
export class IntranetComponentsModule {}
