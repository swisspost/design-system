import { Component } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import {
  SwissPostDatepickerI18n,
  I18n,
} from '../datepicker-demo-page/datepicker-localization.service';
import { DatepickerSimpleDemoComponent } from './datepicker-simple-demo.component';

@Component({
  selector: 'app-datepicker-simple-lg',
  templateUrl: './datepicker-simple-lg.component.html',
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: SwissPostDatepickerI18n }],
})
export class DatepickerSimpleLgComponent extends DatepickerSimpleDemoComponent {}
