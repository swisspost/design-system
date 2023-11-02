import { Component } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import {
  CustomDatepickerI18n,
  I18n,
} from '../datepicker-demo-page/datepicker-localization.service';
import { DatepickerValidationDemoComponent } from './datepicker-validation-demo.component';

@Component({
  selector: 'app-datepicker-validation',
  templateUrl: './datepicker-validation.component.html',
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
})
export class DatepickerValidationComponent extends DatepickerValidationDemoComponent {}
