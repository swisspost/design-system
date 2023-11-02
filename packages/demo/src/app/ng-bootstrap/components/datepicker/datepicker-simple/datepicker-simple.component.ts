import { Component } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import {
  CustomDatepickerI18n,
  I18n,
} from '../datepicker-demo-page/datepicker-localization.service';
import { DatepickerSimpleDemoComponent } from './datepicker-simple-demo.component';

@Component({
  selector: 'app-datepicker-simple',
  templateUrl: './datepicker-simple.component.html',
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
})
export class DatepickerSimpleComponent extends DatepickerSimpleDemoComponent {}
