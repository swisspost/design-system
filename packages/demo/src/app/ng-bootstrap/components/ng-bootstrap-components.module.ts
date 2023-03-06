import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HighlightModule } from 'ngx-highlightjs';

import { NgbAlertDemoComponent } from './alert/alert-demo/alert-demo.component';
import { NgbAlertDemoPageComponent } from './alert/alert-demo-page/alert-demo-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule } from './datepicker/datepicker.module';
import { NgbPaginationDemoPageComponent } from './pagination/pagination-demo-page/pagination-demo-page.component';
import { NgbTabsDemoComponent } from './tabs/tabs-demo/tabs-demo.component';
import { NgbTabsDemoPageComponent } from './tabs/tabs-demo-page/tabs-demo-page.component';
import { NgbTimepickerDemoPageComponent } from './timepicker/timepicker-demo-page/timepicker-demo-page.component';
import { NgbTimepickerDemoComponent } from './timepicker/timepicker-demo/timepicker-demo.component';
import { NgbPaginationDemoComponent } from './pagination/pagination-demo/pagination-demo.component';
import { NgbTooltipDemoComponent } from './tooltip/tooltip-demo/tooltip-demo.component';
import { NgbTooltipDemoPageComponent } from './tooltip/tooltip-demo-page/tooltip-demo-page.component';
import { NgbTypeaheadDemoComponent } from './typeahead/typeahead-demo/typeahead-demo.component';
import { NgbTypeaheadDemoPageComponent } from './typeahead/typeahead-demo-page/typeahead-demo-page.component';
import { NgbCollapseDemoComponent } from './collapse/collapse-demo/collapse-demo.component';
import { NgbCollapseDemoPageComponent } from './collapse/collapse-demo-page/collapse-demo-page.component';
import { NgbAccordionDemoComponent } from './accordion/accordion-demo/accordion-demo.component';
import { NgbAccordionDemoPageComponent } from './accordion/accordion-demo-page/accordion-demo-page.component';
import { NgbDropdownDemoComponent } from './dropdown/dropdown-demo/dropdown-demo.component';
import { NgbDropdownDemoPageComponent } from './dropdown/dropdown-demo-page/dropdown-demo-page.component';
import { NgbRatingDemoComponent } from './rating/rating-demo/rating-demo.component';
import { NgbRatingDemoPageComponent } from './rating/rating-demo-page/rating-demo-page.component';
import { NgbModalDemoComponent } from './modal/modal-demo/modal-demo.component';
import { NgbModalDemoPageComponent } from './modal/modal-demo-page/modal-demo-page.component';
import { NgbPopoverDemoComponent } from './popover/popover-demo/popover-demo.component';
import { NgbPopoverDemoPageComponent } from './popover/popover-demo-page/popover-demo-page.component';
import { NgbProgressbarDemoComponent } from './progressbar/progressbar-demo/progressbar-demo.component';
import { NgbProgressbarDemoPageComponent } from './progressbar/progressbar-demo-page/progressbar-demo-page.component';
import { NgbCarouselDemoPageComponent } from './carousel/carousel-demo-page/carousel-demo-page.component';
import { NgbCarouselDemoComponent } from './carousel/carousel-demo/carousel-demo.component';
import { NgbCarouselLightDemoComponent } from './carousel/carousel-light-demo/carousel-light-demo.component';
import { NgbModalDemoContentComponent } from './modal/modal-demo-content/modal-demo-content.component';
import { PostCommonModule } from '../../common/post-common.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    PostCommonModule,
    HighlightModule,
    DatepickerModule,
    NgbCollapseModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    NgbAlertDemoComponent,
    NgbAlertDemoPageComponent,
    NgbTimepickerDemoPageComponent,
    NgbTimepickerDemoComponent,
    NgbPaginationDemoComponent,
    NgbPaginationDemoPageComponent,
    NgbTabsDemoComponent,
    NgbTabsDemoPageComponent,
    NgbTooltipDemoComponent,
    NgbTooltipDemoPageComponent,
    NgbTypeaheadDemoPageComponent,
    NgbTypeaheadDemoComponent,
    NgbCollapseDemoComponent,
    NgbCollapseDemoPageComponent,
    NgbAccordionDemoComponent,
    NgbAccordionDemoPageComponent,
    NgbDropdownDemoComponent,
    NgbDropdownDemoPageComponent,
    NgbRatingDemoComponent,
    NgbRatingDemoPageComponent,
    NgbModalDemoPageComponent,
    NgbPopoverDemoComponent,
    NgbPopoverDemoPageComponent,
    NgbProgressbarDemoComponent,
    NgbProgressbarDemoPageComponent,
    NgbCarouselDemoPageComponent,
    NgbCarouselDemoComponent,
    NgbCarouselLightDemoComponent,
    NgbModalDemoComponent,
    NgbModalDemoContentComponent,
  ],
  exports: [
    NgbAlertDemoComponent,
    NgbAlertDemoPageComponent,
    NgbTimepickerDemoPageComponent,
    NgbTimepickerDemoComponent,
    NgbPaginationDemoComponent,
    NgbPaginationDemoPageComponent,
    NgbTabsDemoComponent,
    NgbTabsDemoPageComponent,
    NgbTooltipDemoComponent,
    NgbTooltipDemoPageComponent,
    NgbTypeaheadDemoPageComponent,
    NgbTypeaheadDemoComponent,
    NgbCollapseDemoComponent,
    NgbCollapseDemoPageComponent,
    NgbAccordionDemoComponent,
    NgbAccordionDemoPageComponent,
    NgbDropdownDemoComponent,
    NgbDropdownDemoPageComponent,
    NgbRatingDemoComponent,
    NgbRatingDemoPageComponent,
    NgbModalDemoComponent,
    NgbModalDemoPageComponent,
    NgbPopoverDemoComponent,
    NgbPopoverDemoPageComponent,
    NgbProgressbarDemoComponent,
    NgbProgressbarDemoPageComponent,
    NgbCarouselDemoPageComponent,
    NgbCarouselDemoComponent,
    NgbCarouselLightDemoComponent,
  ],
})
export class NgBootstrapComponentsModule {}
