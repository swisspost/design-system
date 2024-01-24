import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule } from 'ngx-highlightjs';
import { PostCommonModule } from '../../../common/post-common.module';
import { HighlightProvider } from '../../../common/highlight.provider';
import { NgbDatepickerDemoPageComponent } from './datepicker-demo-page/datepicker-demo-page.component';
import {
  SwissPostDatepickerI18n,
  I18n,
} from './datepicker-demo-page/datepicker-localization.service';
import { DatepickerSimpleDemoComponent } from './datepicker-simple/datepicker-simple-demo.component';
import { DatepickerSimpleLgComponent } from './datepicker-simple/datepicker-simple-lg.component';
import { DatepickerSimpleComponent } from './datepicker-simple/datepicker-simple.component';
import { DatepickerValidationLgComponent } from './datepicker-validation/datepicker-validation-lg.component';
import { DatepickerValidationComponent } from './datepicker-validation/datepicker-validation.component';
import { DatepickerValidationDemoComponent } from './datepicker-validation/datepicker-validation-demo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    PostCommonModule,
    HighlightModule,
  ],
  declarations: [
    DatepickerSimpleDemoComponent,
    DatepickerSimpleComponent,
    DatepickerSimpleLgComponent,
    DatepickerValidationDemoComponent,
    DatepickerValidationComponent,
    DatepickerValidationLgComponent,
    NgbDatepickerDemoPageComponent,
  ],
  exports: [NgbDatepickerDemoPageComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    HighlightProvider.Config,
    I18n,
    { provide: NgbDatepickerI18n, useClass: SwissPostDatepickerI18n },
  ],
})
export class DatepickerModule {}
